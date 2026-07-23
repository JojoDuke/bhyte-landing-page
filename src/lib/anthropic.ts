import Anthropic from "@anthropic-ai/sdk";
import { InvoiceDraft, invoiceDraftSchema } from "./invoices/validation";

const invoiceTool = {
  name: "create_invoice_draft",
  description:
    "Extract an invoice draft from the operator's request. Amounts must be integer minor currency units, such as 125000 for $1,250.00. Ask for no follow-up questions: omit unknown optional values and use a single best line item when needed.",
  input_schema: {
    type: "object" as const,
    properties: {
      customerName: { type: "string" },
      customerEmail: { type: "string" },
      customerAddress: { type: "string" },
      currency: { type: "string", description: "ISO 4217 lowercase code" },
      lineItems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: { type: "string" },
            quantity: { type: "integer" },
            unitAmount: { type: "integer", description: "Minor currency units" },
          },
          required: ["description", "quantity", "unitAmount"],
        },
      },
      taxAmount: { type: "integer" },
      discountAmount: { type: "integer" },
      dueDate: { type: "string", description: "ISO 8601 date-time" },
      notes: { type: "string" },
    },
    required: ["customerName", "currency", "lineItems"],
  },
};

export async function createInvoiceDraft(message: string): Promise<InvoiceDraft> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured.");
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1_200,
    system:
      "You are Bhyte Studios' invoice assistant. Convert only the supplied operator text into an accurate invoice draft. Never invent customer contact details, prices, taxes, or discount values. If a price is absent, return a single clearly labeled line item with unitAmount 0 and say it needs review in notes.",
    messages: [{ role: "user", content: message }],
    tools: [invoiceTool],
    tool_choice: { type: "tool", name: invoiceTool.name },
  });

  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Claude did not return an invoice draft.");
  }

  return invoiceDraftSchema.parse(toolUse.input);
}
