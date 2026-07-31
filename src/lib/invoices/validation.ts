import { z } from "zod";

const currencyAliases: Record<string, string> = {
  "$": "usd",
  dollar: "usd",
  dollars: "usd",
  usdollar: "usd",
  usdollars: "usd",
  "us dollar": "usd",
  "us dollars": "usd",
  "€": "eur",
  euro: "eur",
  euros: "eur",
  "£": "gbp",
  pound: "gbp",
  pounds: "gbp",
  sterling: "gbp",
  "british pound": "gbp",
  naira: "ngn",
  "₦": "ngn",
  cedi: "ghs",
  cedis: "ghs",
  "₵": "ghs",
  yen: "jpy",
  "¥": "jpy",
};

function normalizeCurrency(value: unknown) {
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase();
  const compact = normalized.replace(/[^a-z]/g, "");
  return currencyAliases[normalized] ?? currencyAliases[compact] ?? (compact.length === 3 ? compact : normalized);
}

function optionalText(value: unknown) {
  if (value == null) return "";
  if (typeof value !== "string") return value;
  const normalized = value.trim();
  return /^(none|n\/a|not applicable|no)$/i.test(normalized) ? "" : normalized;
}

function normalizeDate(value: unknown) {
  if (value == null || value === "") return "";
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}T00:00:00.000Z`;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/.test(trimmed)) {
    return `${trimmed}Z`;
  }

  const timestamp = Date.parse(trimmed);
  if (!Number.isNaN(timestamp)) return new Date(timestamp).toISOString();

  return value;
}

export const lineItemSchema = z.object({
  description: z.string().min(1).max(500),
  quantity: z.number().int().positive().max(10_000),
  unitAmount: z.number().int().min(0),
});

export const invoiceDraftSchema = z.object({
  customerName: z.string().min(1).max(200),
  customerEmail: z.preprocess(optionalText, z.string().email().or(z.literal(""))),
  customerAddress: z.preprocess(optionalText, z.string().max(1_000).or(z.literal(""))),
  currency: z.preprocess(
    (value) => value == null || value === "" ? "usd" : normalizeCurrency(value),
    z.string().length(3),
  ),
  invoiceType: z.preprocess(
    (value) => {
      if (value == null || value === "") return "one_time";
      const normalized = String(value).trim().toLowerCase();
      if (normalized === "subscription" || normalized === "recurring" || normalized === "sub") return "subscription";
      return "one_time";
    },
    z.enum(["one_time", "subscription"]),
  ),
  billingInterval: z.preprocess(
    (value) => {
      if (value == null || value === "") return null;
      const normalized = String(value).trim().toLowerCase();
      if (normalized === "month" || normalized === "monthly") return "month";
      if (normalized === "year" || normalized === "yearly" || normalized === "annual") return "year";
      return value;
    },
    z.enum(["month", "year"]).nullable(),
  ),
  lineItems: z.array(lineItemSchema).min(1).max(50),
  taxAmount: z.number().int().min(0).default(0),
  discountAmount: z.number().int().min(0).default(0),
  issueDate: z.preprocess(normalizeDate, z.string().datetime({ offset: true })),
  dueDate: z.preprocess(normalizeDate, z.string().datetime({ offset: true })),
  notes: z.preprocess(optionalText, z.string().max(2_000).or(z.literal(""))),
}).superRefine((draft, context) => {
  if (draft.invoiceType === "subscription" && !draft.billingInterval) {
    context.addIssue({
      code: "custom",
      message: "Subscription invoices require a billing interval (month or year).",
      path: ["billingInterval"],
    });
  }
  if (draft.invoiceType === "one_time" && draft.billingInterval) {
    context.addIssue({
      code: "custom",
      message: "One-time invoices cannot include a billing interval.",
      path: ["billingInterval"],
    });
  }
});

export type InvoiceDraft = z.infer<typeof invoiceDraftSchema>;

export function calculateTotals(draft: InvoiceDraft) {
  const subtotal = draft.lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitAmount,
    0,
  );
  const total = subtotal + draft.taxAmount - draft.discountAmount;

  if (total <= 0) {
    throw new Error("Invoice total must be greater than zero.");
  }

  return { subtotal, total };
}
