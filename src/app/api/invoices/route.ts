import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/server";
import { appendMessage, linkConversationToInvoice } from "@/lib/conversations/service";
import { createInvoice, listInvoices } from "@/lib/invoices/service";
import { invoiceDraftSchema } from "@/lib/invoices/validation";
import { getAppOrigin } from "@/lib/app-url";

const createInvoiceSchema = invoiceDraftSchema.extend({
  conversationId: z.string().uuid().optional(),
  paymentDescription: z.string().trim().min(1).max(500),
});

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json({ invoices: await listInvoices() });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    const body = createInvoiceSchema.parse(await request.json());
    const { conversationId, paymentDescription, ...draft } = body;
    const invoice = await createInvoice(draft, user.id, {
      appOrigin: getAppOrigin(request),
      paymentDescription,
    });

    if (conversationId) {
      const linked = await linkConversationToInvoice(conversationId, user.id, invoice.id);
      await appendMessage(
        conversationId,
        user.id,
        "assistant",
        `Invoice **${invoice.number}** is ready. You can open the PDF or copy its share link below.`,
      );

      return NextResponse.json({
        invoice,
        usage: linked.invoiceUsage,
      }, { status: 201 });
    }

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create invoice.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
