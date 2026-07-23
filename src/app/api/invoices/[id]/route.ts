import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/server";
import { getInvoice } from "@/lib/invoices/service";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const invoice = await getInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
    }

    return NextResponse.json({ invoice });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
