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

  const settled = invoice.status === "paid" || invoice.status === "active";
  const document = invoice.invoiceDocuments.find((item) => item.kind === (settled ? "paid" : "open")) ?? invoice.invoiceDocuments[0];
  const documentUrl = document ? `/documents/${document.token}` : null;
  const isSubscription = invoice.invoiceType === "subscription";
  const statusClass = settled
    ? "bg-emerald-950 text-emerald-400"
    : invoice.status === "past_due"
      ? "bg-red-950 text-red-300"
      : invoice.status === "cancelled"
        ? "bg-zinc-800 text-zinc-400"
        : "bg-amber-950 text-amber-300";

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard/invoices" className="text-sm text-blue-400">← Invoices</Link>
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">{invoice.number}</p>
            <h1 className="mt-1 text-3xl font-semibold">{invoice.customerName}</h1>
            {invoice.customerEmail && <p className="mt-2 text-zinc-400">{invoice.customerEmail}</p>}
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium uppercase ${statusClass}`}>{invoice.status}</span>
        </div>
        {isSubscription && (
          <p className="mt-3 text-sm text-zinc-400">
            {invoice.billingInterval === "year" ? "Yearly" : "Monthly"} subscription · {money(invoice.total, invoice.currency)}/{invoice.billingInterval === "year" ? "yr" : "mo"}
          </p>
        )}
        <div className="mt-8 divide-y divide-zinc-800">
          {invoice.invoiceLineItems.map((item) => (
            <div key={item.id} className="flex justify-between py-3 text-sm">
              <span>{item.description} × {item.quantity}</span>
              <span>{money(item.unitAmount * item.quantity, invoice.currency)}</span>
            </div>
          ))}
          <div className="flex justify-between py-4 text-lg font-semibold">
            <span>{isSubscription ? "Recurring total" : "Total"}</span>
            <span>
              {money(invoice.total, invoice.currency)}
              {isSubscription && `/${invoice.billingInterval === "year" ? "yr" : "mo"}`}
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {documentUrl && <a className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black" href={documentUrl} target="_blank" rel="noreferrer">Open PDF</a>}
          {invoice.stripePaymentLinkUrl && !settled && invoice.status !== "cancelled" && (
            <a className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-300" href={invoice.stripePaymentLinkUrl} target="_blank" rel="noreferrer">
              {isSubscription ? "Open subscription link" : "Open payment link"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
