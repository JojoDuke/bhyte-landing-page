"use client";

import Link from "next/link";
import { useState } from "react";

type PastInvoiceForm = {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  currency: string;
  lineItems: Array<{ description: string; quantity: number; unitAmount: number }>;
  issueDate: string;
  dueDate: string;
  discountAmount: number;
  notes: string;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function defaultForm(): PastInvoiceForm {
  const date = today();
  return {
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    currency: "usd",
    lineItems: [{ description: "", quantity: 1, unitAmount: 0 }],
    issueDate: date,
    dueDate: date,
    discountAmount: 0,
    notes: "",
  };
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export function PastPaymentForm() {
  const [form, setForm] = useState(defaultForm);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);

  const subtotal = form.lineItems.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0);
  const total = subtotal - form.discountAmount;
  const update = (changes: Partial<PastInvoiceForm>) => setForm((current) => ({ ...current, ...changes }));

  async function submit() {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/invoices/past", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          taxAmount: 0,
          invoiceType: "one_time",
          billingInterval: null,
          issueDate: `${form.issueDate}T00:00:00.000Z`,
          dueDate: `${form.dueDate}T00:00:00.000Z`,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to create invoice.");

      const origin = window.location.origin;
      setDocumentUrl(`${origin}/documents/${body.invoice.documentToken}`);
      setInvoiceNumber(body.invoice.number);
      setForm(defaultForm());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create invoice.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/dashboard/invoices" className="text-sm text-blue-400">← Back to invoices</Link>

      <div className="mt-6">
        <h1 className="text-3xl font-semibold">Past payment</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Record a payment you already received and generate a clean invoice PDF.
        </p>
      </div>

      {documentUrl && invoiceNumber && (
        <div className="mt-6 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.035] p-5">
          <p className="text-sm text-emerald-200">Invoice {invoiceNumber} is ready.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black" href={documentUrl} target="_blank" rel="noreferrer">
              Open PDF
            </a>
            <button
              type="button"
              className="cursor-pointer rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
              onClick={() => navigator.clipboard.writeText(documentUrl)}
            >
              Copy link
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-review mt-8 rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Client name">
            <input className="dashboard-input" value={form.customerName} onChange={(event) => update({ customerName: event.target.value })} />
          </Field>
          <Field label="Client email (optional)">
            <input className="dashboard-input" type="email" value={form.customerEmail} onChange={(event) => update({ customerEmail: event.target.value })} />
          </Field>
        </div>

        <Field label="Client billing address">
          <textarea className="dashboard-input min-h-20 resize-none" value={form.customerAddress} onChange={(event) => update({ customerAddress: event.target.value })} />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Issue date">
            <input className="dashboard-input" type="date" value={form.issueDate} onChange={(event) => update({ issueDate: event.target.value })} />
          </Field>
          <Field label="Payment date">
            <input className="dashboard-input" type="date" value={form.dueDate} onChange={(event) => update({ dueDate: event.target.value })} />
          </Field>
        </div>

        <div className="mt-5">
          <div className="mb-2 grid grid-cols-[1fr_64px_110px] gap-2 px-1 text-[10px] uppercase tracking-wider text-zinc-600">
            <span>Description</span><span>Qty</span><span>Amount</span>
          </div>
          <div className="space-y-2">
            {form.lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr_64px_110px] gap-2">
                <input
                  className="dashboard-input"
                  value={item.description}
                  onChange={(event) => update({
                    lineItems: form.lineItems.map((line, itemIndex) => itemIndex === index ? { ...line, description: event.target.value } : line),
                  })}
                />
                <input
                  className="dashboard-input text-center"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => update({
                    lineItems: form.lineItems.map((line, itemIndex) => itemIndex === index ? { ...line, quantity: Number(event.target.value) } : line),
                  })}
                />
                <input
                  className="dashboard-input text-right"
                  type="number"
                  min="0"
                  step="0.01"
                  value={(item.unitAmount / 100).toFixed(2)}
                  onChange={(event) => update({
                    lineItems: form.lineItems.map((line, itemIndex) => itemIndex === index ? { ...line, unitAmount: Math.round(Number(event.target.value) * 100) } : line),
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Discount">
            <input className="dashboard-input" type="number" min="0" step="0.01" value={(form.discountAmount / 100).toFixed(2)} onChange={(event) => update({ discountAmount: Math.round(Number(event.target.value) * 100) })} />
          </Field>
          <Field label="Notes (optional)">
            <input className="dashboard-input" value={form.notes} onChange={(event) => update({ notes: event.target.value })} />
          </Field>
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-white/[0.07] pt-5">
          <p className="text-xs text-zinc-500">No payment link · clean PDF only</p>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-zinc-600">Total</p>
            <p className="mt-1 text-2xl font-medium text-white">{formatMoney(total, form.currency)}</p>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

        <button
          type="button"
          onClick={() => void submit()}
          disabled={isCreating || total <= 0 || !form.customerName.trim() || !form.customerAddress.trim() || !form.lineItems[0]?.description.trim()}
          className="mt-5 w-full cursor-pointer rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isCreating ? "Generating…" : "Generate clean invoice"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-3 block">
      <span className="mb-2 block text-[10px] uppercase tracking-wider text-zinc-600">{label}</span>
      {children}
    </label>
  );
}
