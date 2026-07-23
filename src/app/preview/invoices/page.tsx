"use client";

import Link from "next/link";
import { useState } from "react";

const invoices = [
  { number: "BHY-2026-A1B2C3", customer: "Acme Inc.", amount: "$2,500.00", status: "OPEN", date: "Jul 20, 2026" },
  { number: "BHY-2026-D4E5F6", customer: "Northstar Labs", amount: "$7,200.00", status: "PAID", date: "Jul 12, 2026" },
  { number: "BHY-2026-G7H8I9", customer: "Luma Group", amount: "$1,800.00", status: "OPEN", date: "Jul 05, 2026" },
];

export default function InvoicePreviewPage() {
  const [draftVisible, setDraftVisible] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-semibold tracking-wide text-white">BHYTE <span className="text-blue-400">INVOICES</span></span>
          <Link className="text-sm text-zinc-400 hover:text-white" href="/preview/login">UI preview</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        <div>
          <p className="text-sm font-medium tracking-[0.22em] text-blue-400">BHYTE STUDIOS</p>
          <h1 className="mt-2 text-3xl font-semibold">Invoice workspace</h1>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="text-lg font-semibold">Describe the work</h2>
            <p className="mt-1 text-sm text-zinc-400">Describe the client, deliverables, price, currency, and deadline.</p>
            <textarea
              className="mt-4 min-h-44 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm outline-none focus:border-blue-500"
              defaultValue="Invoice Acme Inc. $2,500 USD for discovery, design, and delivery of their AI lead qualification tool. Due August 15."
            />
            <button className="mt-3 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-black" onClick={() => setDraftVisible(true)}>
              Generate invoice draft
            </button>
            <p className="mt-3 text-xs text-zinc-500">Preview mode — Claude is not called.</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h2 className="text-lg font-semibold">Review before creating</h2>
            {draftVisible ? (
              <div className="mt-4 space-y-4">
                <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" defaultValue="Acme Inc." aria-label="Customer name" />
                <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" defaultValue="billing@acme.com" aria-label="Customer email" />
                <div className="grid grid-cols-[1fr_72px_100px] gap-2">
                  <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" defaultValue="AI lead qualification tool" aria-label="Description" />
                  <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" defaultValue="1" aria-label="Quantity" />
                  <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" defaultValue="2500.00" aria-label="Unit amount" />
                </div>
                <p className="text-right text-lg font-semibold">Total: $2,500.00</p>
                <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black">Confirm, create payment link, and generate PDF</button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-500">Click “Generate invoice draft” to preview the review state.</p>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Invoices</h2>
            <span className="text-sm text-zinc-500">3 total</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <div className="divide-y divide-zinc-800">
              {invoices.map((invoice) => (
                <div className="flex items-center justify-between gap-4 p-4" key={invoice.number}>
                  <div>
                    <p className="font-medium">{invoice.customer}</p>
                    <p className="mt-1 text-xs text-zinc-500">{invoice.number} · {invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{invoice.amount}</p>
                    <p className={`mt-1 text-xs font-medium ${invoice.status === "PAID" ? "text-emerald-400" : "text-amber-400"}`}>{invoice.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
