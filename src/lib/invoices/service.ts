import { randomBytes } from "crypto";
import { and, desc, eq, inArray, isNull, like } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { sendPaidInvoiceEmail } from "@/lib/email/send-paid-invoice-email";
import { renderInvoicePdf } from "@/lib/invoices/pdf";
import { invoiceDocuments, invoiceLineItems, invoices, stripeEvents } from "./schema";
import { calculateTotals, InvoiceDraft } from "./validation";

async function nextInvoiceNumber() {
  const prefix = "A4B2886C-";
  const [latest] = await getDb()
    .select({ number: invoices.number })
    .from(invoices)
    .where(like(invoices.number, `${prefix}%`))
    .orderBy(desc(invoices.number))
    .limit(1);
  const previous = latest ? Number.parseInt(latest.number.slice(prefix.length), 10) : 0;
  return `${prefix}${String((Number.isFinite(previous) ? previous : 0) + 1).padStart(4, "0")}`;
}

function token() {
  return randomBytes(32).toString("base64url");
}

async function createSettledDocument(invoiceId: string) {
  const db = getDb();
  const paidDocument = await db.query.invoiceDocuments.findFirst({
    where: and(eq(invoiceDocuments.invoiceId, invoiceId), eq(invoiceDocuments.kind, "paid")),
  });
  if (paidDocument) return paidDocument;

  const [document] = await db.insert(invoiceDocuments).values({
    invoiceId,
    token: token(),
    version: 2,
    kind: "paid",
  }).returning();

  return document;
}

export function isSettledInvoiceStatus(status: string) {
  return status === "paid" || status === "active";
}

export async function ensureSettledDocument(invoiceId: string) {
  return createSettledDocument(invoiceId);
}

export async function listInvoices() {
  return getDb().query.invoices.findMany({
    orderBy: [desc(invoices.createdAt)],
    with: { invoiceLineItems: true, invoiceDocuments: true },
  });
}

export async function getInvoice(id: string) {
  return getDb().query.invoices.findFirst({
    where: eq(invoices.id, id),
    with: { invoiceLineItems: true, invoiceDocuments: true },
  });
}

export async function createInvoice(draft: InvoiceDraft, userId: string) {
  const db = getDb();
  const { subtotal, total } = calculateTotals(draft);
  const number = await nextInvoiceNumber();
  const isSubscription = draft.invoiceType === "subscription";

  const [invoice] = await db
    .insert(invoices)
    .values({
      number,
      customerName: draft.customerName,
      customerEmail: draft.customerEmail || null,
      customerAddress: draft.customerAddress || null,
      currency: draft.currency,
      subtotal,
      taxAmount: draft.taxAmount,
      discountAmount: draft.discountAmount,
      total,
      issueDate: new Date(draft.issueDate),
      dueDate: new Date(draft.dueDate),
      notes: draft.notes || null,
      invoiceType: draft.invoiceType,
      billingInterval: isSubscription ? draft.billingInterval : null,
      status: "draft",
      createdBy: userId,
    })
    .returning();

  await db.insert(invoiceLineItems).values(
    draft.lineItems.map((item, position) => ({
      invoiceId: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
      position,
    })),
  );

  const stripe = getStripe();
  const paymentLink = await stripe.paymentLinks.create(
    {
      line_items: [{
        quantity: 1,
        price_data: {
          currency: draft.currency,
          unit_amount: total,
          ...(isSubscription && draft.billingInterval
            ? { recurring: { interval: draft.billingInterval } }
            : {}),
          product_data: {
            name: draft.lineItems[0].description,
            description: isSubscription
              ? `Bhyte Software subscription ${number}`
              : `Bhyte Software invoice ${number}`,
          },
        },
      }],
      metadata: {
        invoiceId: invoice.id,
        invoiceNumber: invoice.number,
        invoiceType: draft.invoiceType,
      },
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/documents/thank-you`,
        },
      },
    },
    { idempotencyKey: `invoice-payment-link-${invoice.id}` },
  );

  const [document] = await db
    .insert(invoiceDocuments)
    .values({
      invoiceId: invoice.id,
      token: token(),
      version: 1,
      kind: "open",
    })
    .returning();

  await db
    .update(invoices)
    .set({
      status: "open",
      stripePaymentLinkId: paymentLink.id,
      stripePaymentLinkUrl: paymentLink.url,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, invoice.id));

  return {
    ...invoice,
    invoiceType: draft.invoiceType,
    billingInterval: isSubscription ? draft.billingInterval : null,
    status: "open" as const,
    stripePaymentLinkUrl: paymentLink.url,
    documentToken: document.token,
  };
}

export async function createPastInvoice(draft: InvoiceDraft, userId: string) {
  const db = getDb();
  const { subtotal, total } = calculateTotals(draft);
  const number = await nextInvoiceNumber();
  const paidAt = new Date(draft.dueDate);

  const [invoice] = await db
    .insert(invoices)
    .values({
      number,
      customerName: draft.customerName,
      customerEmail: draft.customerEmail || null,
      customerAddress: draft.customerAddress || null,
      currency: draft.currency,
      subtotal,
      taxAmount: draft.taxAmount,
      discountAmount: draft.discountAmount,
      total,
      issueDate: new Date(draft.issueDate),
      dueDate: paidAt,
      notes: draft.notes || null,
      invoiceType: "one_time",
      billingInterval: null,
      status: "paid",
      paidAt,
      paidInvoiceEmailSkippedAt: new Date(),
      createdBy: userId,
    })
    .returning();

  await db.insert(invoiceLineItems).values(
    draft.lineItems.map((item, position) => ({
      invoiceId: invoice.id,
      description: item.description,
      quantity: item.quantity,
      unitAmount: item.unitAmount,
      position,
    })),
  );

  const document = await createSettledDocument(invoice.id);

  return {
    ...invoice,
    status: "paid" as const,
    documentToken: document.token,
  };
}

export async function sendPaidInvoiceEmailForInvoice(invoiceId: string) {
  const db = getDb();
  const invoice = await db.query.invoices.findFirst({
    where: eq(invoices.id, invoiceId),
    with: { invoiceLineItems: true },
  });

  if (!invoice) return { ok: false as const, error: "Invoice not found" };
  if (invoice.paidInvoiceEmailSentAt) return { ok: true as const, skipped: true as const };
  if (invoice.paidInvoiceEmailSkippedAt) return { ok: false as const, error: "No recipient email" };
  if (!isSettledInvoiceStatus(invoice.status)) return { ok: false as const, error: "Invoice not settled" };

  const recipientEmail = invoice.customerEmail;
  if (!recipientEmail) {
    await db
      .update(invoices)
      .set({ paidInvoiceEmailSkippedAt: new Date(), updatedAt: new Date() })
      .where(eq(invoices.id, invoice.id));
    return { ok: false as const, error: "No recipient email" };
  }

  try {
    const pdfBytes = await renderInvoicePdf(
      { ...invoice, stripePaymentLinkUrl: null },
      { hidePaymentSection: true },
    );
    await sendPaidInvoiceEmail({
      to: recipientEmail,
      invoiceNumber: invoice.number,
      pdfBytes: Buffer.from(pdfBytes),
    });
    await db
      .update(invoices)
      .set({ paidInvoiceEmailSentAt: new Date(), updatedAt: new Date() })
      .where(eq(invoices.id, invoice.id));
    return { ok: true as const };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Failed to send paid invoice email for ${invoice.id}:`, message);
    return { ok: false as const, error: message };
  }
}

export async function markInvoicePaid(checkoutSessionId: string, eventId: string, eventType: string, payload: unknown) {
  const db = getDb();
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  const invoiceId = session.metadata?.invoiceId;

  const seen = await db.query.stripeEvents.findFirst({ where: eq(stripeEvents.id, eventId) });
  if (seen) {
    if (invoiceId && session.payment_status === "paid") {
      await sendPaidInvoiceEmailForInvoice(invoiceId);
    }
    return;
  }

  if (!invoiceId || session.payment_status !== "paid") return;

  await db.insert(stripeEvents).values({ id: eventId, type: eventType, payload });

  const isSubscription = session.mode === "subscription";
  const subscriptionId = typeof session.subscription === "string"
    ? session.subscription
    : session.subscription?.id ?? null;

  const checkoutEmail = session.customer_details?.email ?? session.customer_email ?? null;

  await db
    .update(invoices)
    .set({
      status: isSubscription ? "active" : "paid",
      paidAt: new Date(),
      stripeCheckoutSessionId: session.id,
      ...(subscriptionId ? { stripeSubscriptionId: subscriptionId } : {}),
      ...(checkoutEmail ? { customerEmail: checkoutEmail } : {}),
      updatedAt: new Date(),
    })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.status, "open")));

  await createSettledDocument(invoiceId);
  await sendPaidInvoiceEmailForInvoice(invoiceId);
}

export async function sendDuePaidInvoiceEmails() {
  const db = getDb();
  const dueInvoices = await db.query.invoices.findMany({
    where: and(
      inArray(invoices.status, ["paid", "active"]),
      isNull(invoices.paidInvoiceEmailSentAt),
      isNull(invoices.paidInvoiceEmailSkippedAt),
    ),
    with: { invoiceLineItems: true },
  });

  const results: Array<{ invoiceId: string; ok: boolean; error?: string }> = [];

  for (const invoice of dueInvoices) {
    const result = await sendPaidInvoiceEmailForInvoice(invoice.id);
    results.push({
      invoiceId: invoice.id,
      ok: result.ok,
      error: "error" in result ? result.error : undefined,
    });
  }

  return results;
}

export async function syncSubscriptionStatus(
  subscriptionId: string,
  subscriptionStatus: string,
  eventId: string,
  eventType: string,
  payload: unknown,
) {
  const db = getDb();
  const seen = await db.query.stripeEvents.findFirst({ where: eq(stripeEvents.id, eventId) });
  if (seen) return;

  const invoice = await db.query.invoices.findFirst({
    where: eq(invoices.stripeSubscriptionId, subscriptionId),
  });
  if (!invoice) return;

  await db.insert(stripeEvents).values({ id: eventId, type: eventType, payload });

  let nextStatus: "active" | "past_due" | "cancelled" | null = null;
  if (subscriptionStatus === "active" || subscriptionStatus === "trialing") {
    nextStatus = "active";
  } else if (subscriptionStatus === "past_due" || subscriptionStatus === "unpaid") {
    nextStatus = "past_due";
  } else if (subscriptionStatus === "canceled" || subscriptionStatus === "incomplete_expired") {
    nextStatus = "cancelled";
  }

  if (!nextStatus || nextStatus === invoice.status) return;

  await db
    .update(invoices)
    .set({ status: nextStatus, updatedAt: new Date() })
    .where(eq(invoices.id, invoice.id));

  if (nextStatus === "active") {
    await createSettledDocument(invoice.id);
  }
}
