import { z } from "zod";

export const lineItemSchema = z.object({
  description: z.string().min(1).max(500),
  quantity: z.number().int().positive().max(10_000),
  unitAmount: z.number().int().min(0),
});

export const invoiceDraftSchema = z.object({
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerAddress: z.string().max(1_000).optional().or(z.literal("")),
  currency: z.string().length(3).transform((value) => value.toLowerCase()),
  lineItems: z.array(lineItemSchema).min(1).max(50),
  taxAmount: z.number().int().min(0).default(0),
  discountAmount: z.number().int().min(0).default(0),
  dueDate: z.string().datetime().optional().or(z.literal("")),
  notes: z.string().max(2_000).optional().or(z.literal("")),
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
