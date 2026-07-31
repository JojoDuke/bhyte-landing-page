import { NextResponse } from "next/server";
import { renderInvoicePdf } from "@/lib/invoices/pdf";
import { getInvoiceDocumentByToken } from "@/lib/invoices/document-access";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const document = await getInvoiceDocumentByToken(token);

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
