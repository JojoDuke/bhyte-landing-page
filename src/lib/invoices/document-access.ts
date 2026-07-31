import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { invoiceDocuments } from "@/lib/invoices/schema";

export async function getInvoiceDocumentByToken(token: string) {
  return getDb().query.invoiceDocuments.findFirst({
    where: eq(invoiceDocuments.token, token),
    with: { invoice: { with: { invoiceLineItems: true } } },
  });
}
