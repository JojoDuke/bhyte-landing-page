"use client";

import { useState } from "react";

type LineItem = { description: string; quantity: number; unitAmount: number };
type Draft = {
  customerName: string;
  customerEmail?: string;
  customerAddress?: string;
  currency: string;
  lineItems: LineItem[];
  taxAmount: number;
  discountAmount: number;
  dueDate?: string;
  notes?: string;
};

function dollars(cents: number) {
  return (cents / 100).toFixed(2);
}

export function InvoiceComposer() {
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState<{ documentUrl: string; paymentUrl: string } | null>(null);

  const subtotal = draft?.lineItems.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0) ?? 0;
  const total = draft ? subtotal + draft.taxAmount - draft.discountAmount : 0;

  async function generateDraft() {
    setIsLoading(true);
    setStatus(null);
    setCreated(null);
    const response = await fetch("/api/invoices/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const body = await response.json();
    setIsLoading(false);
    if (!response.ok) return setStatus(body.error ?? "Unable to generate a draft.");
    setDraft(body.draft);
  }

  async function createInvoice() {
    if (!draft) return;
    setIsLoading(true);
    setStatus(null);
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const body = await response.json();
    setIsLoading(false);
    if (!response.ok) return setStatus(body.error ?? "Unable to create invoice.");
    const origin = window.location.origin;
    setCreated({
      documentUrl: `${origin}/documents/${body.invoice.documentToken}`,
      paymentUrl: body.invoice.stripePaymentLinkUrl,
    });
    setStatus("Invoice created. The shareable PDF and payment link are ready.");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 className="text-lg font-semibold">Describe the work</h2>
        <p className="mt-1 text-sm text-zinc-400">Include client, deliverables, price, currency, and any deadline. Claude creates an editable draft.</p>
        <textarea
          className="mt-4 min-h-44 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm outline-none focus:border-blue-500"
          placeholder="Invoice Acme Inc. $2,500 USD for discovery, design, and delivery of their AI lead qualification tool. Due August 15. Send to billing@acme.com."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="mt-3 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
          disabled={isLoading || message.trim().length < 10}
          onClick={generateDraft}
        >
          {isLoading ? "Generating…" : "Generate invoice draft"}
        </button>
        {status && <p className="mt-3 text-sm text-zinc-300">{status}</p>}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 className="text-lg font-semibold">Review before creating</h2>
        {!draft ? (
          <p className="mt-4 text-sm text-zinc-500">Your editable invoice draft will appear here.</p>
        ) : (
          <div className="mt-4 space-y-4">
            <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={draft.customerName} onChange={(e) => setDraft({ ...draft, customerName: e.target.value })} aria-label="Customer name" />
            <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2" value={draft.customerEmail ?? ""} onChange={(e) => setDraft({ ...draft, customerEmail: e.target.value })} placeholder="Customer email" aria-label="Customer email" />
            {draft.lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_72px_100px] gap-2">
                <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" value={item.description} onChange={(e) => setDraft({ ...draft, lineItems: draft.lineItems.map((line, i) => i === index ? { ...line, description: e.target.value } : line) })} />
                <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" type="number" min="1" value={item.quantity} onChange={(e) => setDraft({ ...draft, lineItems: draft.lineItems.map((line, i) => i === index ? { ...line, quantity: Number(e.target.value) } : line) })} />
                <input className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm" type="number" min="0" step="0.01" value={dollars(item.unitAmount)} onChange={(e) => setDraft({ ...draft, lineItems: draft.lineItems.map((line, i) => i === index ? { ...line, unitAmount: Math.round(Number(e.target.value) * 100) } : line) })} aria-label="Unit amount" />
              </div>
            ))}
            <p className="text-right text-lg font-semibold">Total: {new Intl.NumberFormat("en-US", { style: "currency", currency: draft.currency.toUpperCase() }).format(total / 100)}</p>
            <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50" disabled={isLoading || total <= 0} onClick={createInvoice}>
              {isLoading ? "Creating…" : "Confirm, create payment link, and generate PDF"}
            </button>
            {created && (
              <div className="grid gap-2 sm:grid-cols-2">
                <a className="rounded-lg border border-blue-500 px-3 py-2 text-center text-sm text-blue-300" href={created.documentUrl} target="_blank" rel="noreferrer">Open or download PDF</a>
                <button className="rounded-lg border border-zinc-600 px-3 py-2 text-sm" onClick={() => navigator.clipboard.writeText(created.documentUrl)}>Copy share link</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
