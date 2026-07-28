import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/server";
import { createPastInvoice } from "@/lib/invoices/service";
import { invoiceDraftSchema } from "@/lib/invoices/validation";

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    const body = invoiceDraftSchema.parse({
      ...(await request.json()),
      invoiceType: "one_time",
      billingInterval: null,
      taxAmount: 0,
    });
    const invoice = await createPastInvoice(body, user.id);

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create past invoice.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
