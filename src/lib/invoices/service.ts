import { randomBytes } from "crypto";
import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { invoiceDocuments, invoiceLineItems, invoices, stripeEvents } from "./schema";
import { calculateTotals, InvoiceDraft } from "./validation";

function invoiceNumber() {
  return `BHY-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function token() {
  return randomBytes(32).toString("base64url");
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
  const number = invoiceNumber();
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
      dueDate: draft.dueDate ? new Date(draft.dueDate) : null,
      notes: draft.notes || null,
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
      // Stripe's Payment Link needs to charge the exact PDF total. A single
      // finalized line prevents tax/discount adjustments from drifting from
      // the payment amount while the detailed items remain on the PDF.
      line_items: [{
        quantity: 1,
        price_data: {
          currency: draft.currency,
          unit_amount: total,
          product_data: { name: `Bhyte Studios invoice ${number}` },
        },
      }],
      metadata: { invoiceId: invoice.id, invoiceNumber: invoice.number },
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
    status: "open" as const,
    stripePaymentLinkUrl: paymentLink.url,
    documentToken: document.token,
  };
}

export async function markInvoicePaid(checkoutSessionId: string, eventId: string, eventType: string, payload: unknown) {
  const db = getDb();
  const seen = await db.query.stripeEvents.findFirst({ where: eq(stripeEvents.id, eventId) });
  if (seen) return;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  const invoiceId = session.metadata?.invoiceId;
  if (!invoiceId || session.payment_status !== "paid") return;

  await db.insert(stripeEvents).values({ id: eventId, type: eventType, payload });
  await db
    .update(invoices)
    .set({
      status: "paid",
      paidAt: new Date(),
      stripeCheckoutSessionId: session.id,
      updatedAt: new Date(),
    })
    .where(and(eq(invoices.id, invoiceId), eq(invoices.status, "open")));

  const paidDocument = await db.query.invoiceDocuments.findFirst({
    where: and(eq(invoiceDocuments.invoiceId, invoiceId), eq(invoiceDocuments.kind, "paid")),
  });
  if (!paidDocument) {
    await db.insert(invoiceDocuments).values({
      invoiceId,
      token: token(),
      version: 2,
      kind: "paid",
    });
  }
}
