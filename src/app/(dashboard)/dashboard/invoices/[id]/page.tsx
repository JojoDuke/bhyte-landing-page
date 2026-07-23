import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/server";
import { getInvoice } from "@/lib/invoices/service";

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const invoice = await getInvoice(id);
  if (!invoice) notFound();

  const document = invoice.invoiceDocuments.find((item) => item.kind === (invoice.status === "paid" ? "paid" : "open")) ?? invoice.invoiceDocuments[0];
  const documentUrl = document ? `/documents/${document.token}` : null;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard/invoices" className="text-sm text-blue-400">← All invoices</Link>
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">{invoice.number}</p>
            <h1 className="mt-1 text-3xl font-semibold">{invoice.customerName}</h1>
            {invoice.customerEmail && <p className="mt-2 text-zinc-400">{invoice.customerEmail}</p>}
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium uppercase ${invoice.status === "paid" ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-300"}`}>{invoice.status}</span>
        </div>
        <div className="mt-8 divide-y divide-zinc-800">
          {invoice.invoiceLineItems.map((item) => (
            <div key={item.id} className="flex justify-between py-3 text-sm">
              <span>{item.description} × {item.quantity}</span>
              <span>{money(item.unitAmount * item.quantity, invoice.currency)}</span>
            </div>
          ))}
          <div className="flex justify-between py-4 text-lg font-semibold">
            <span>Total</span><span>{money(invoice.total, invoice.currency)}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {documentUrl && <a className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black" href={documentUrl} target="_blank" rel="noreferrer">Open PDF</a>}
          {invoice.stripePaymentLinkUrl && invoice.status !== "paid" && <a className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-300" href={invoice.stripePaymentLinkUrl} target="_blank" rel="noreferrer">Open payment link</a>}
        </div>
      </div>
    </div>
  );
}
