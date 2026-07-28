import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { invoiceDocuments } from "@/lib/invoices/schema";
import { renderInvoicePdf } from "@/lib/invoices/pdf";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const document = await getDb().query.invoiceDocuments.findFirst({
    where: eq(invoiceDocuments.token, token),
    with: { invoice: { with: { invoiceLineItems: true } } },
  });

  if (!document?.invoice) {
    return new NextResponse("Document not found.", { status: 404 });
  }

  const settled = document.invoice.status === "paid" || document.invoice.status === "active";
  const bytes = await renderInvoicePdf(
    document.invoice,
    settled || document.kind === "paid" ? { hidePaymentSection: true } : undefined,
  );
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${document.invoice.number}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
