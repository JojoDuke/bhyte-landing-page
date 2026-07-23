import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/server";
import { createInvoice, listInvoices } from "@/lib/invoices/service";
import { invoiceDraftSchema } from "@/lib/invoices/validation";

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
    const draft = invoiceDraftSchema.parse(await request.json());
    const invoice = await createInvoice(draft, user.id);
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create invoice.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
