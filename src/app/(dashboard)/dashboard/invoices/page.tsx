import Link from "next/link";
import { requireAdmin } from "@/lib/auth/server";
import { listInvoices } from "@/lib/invoices/service";
import { InvoiceComposer } from "./invoice-composer";

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export default async function InvoicesPage() {
  await requireAdmin();
  const invoiceList = await listInvoices();

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm font-medium tracking-[0.22em] text-blue-400">BHYTE STUDIOS</p>
        <h1 className="mt-2 text-3xl font-semibold">Invoice workspace</h1>
      </div>
      <InvoiceComposer />
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <span className="text-sm text-zinc-500">{invoiceList.length} total</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-800">
          {invoiceList.length === 0 ? (
            <p className="p-6 text-sm text-zinc-500">No invoices created yet.</p>
          ) : (
            <div className="divide-y divide-zinc-800">
              {invoiceList.map((invoice) => (
                <Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`} className="flex items-center justify-between gap-4 p-4 transition hover:bg-zinc-900">
                  <div>
                    <p className="font-medium">{invoice.customerName}</p>
                    <p className="mt-1 text-xs text-zinc-500">{invoice.number} · {new Date(invoice.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{money(invoice.total, invoice.currency)}</p>
                    <p className={`mt-1 text-xs font-medium uppercase ${invoice.status === "paid" ? "text-emerald-400" : "text-amber-400"}`}>{invoice.status}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
