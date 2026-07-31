import { z } from "zod";
import { requireAdmin } from "@/lib/auth/server";
import { getAnthropic } from "@/lib/anthropic";
import {
  appendMessage,
  createConversation,
  addConversationUsage,
  setPendingDraft,
} from "@/lib/conversations/service";
import { invoiceDraftSchema } from "@/lib/invoices/validation";

export const runtime = "nodejs";

const requestSchema = z.object({
  conversationId: z.string().uuid().optional(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().trim().min(1).max(50_000),
    }),
  ).min(1).max(40),
  context: z.object({
    currentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    timeZone: z.string().min(1).max(100),
  }),
});

const createInvoiceTool = {
  name: "create_invoice",
  description: "Prepare the final confirmed invoice for review and PDF generation. Use only after the user explicitly confirms the complete invoice summary.",
  input_schema: {
    type: "object" as const,
    properties: {
      customerName: { type: "string" },
      customerEmail: { type: "string", description: "Optional. Use an empty string when not supplied." },
      customerAddress: { type: "string", description: "Optional. Use an empty string when not supplied; Stripe checkout can collect it when the customer pays." },
      currency: { type: "string", description: "Three-letter ISO currency code. Defaults to usd." },
      lineItems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: { type: "string" },
            quantity: { type: "integer", minimum: 1 },
            unitAmount: { type: "integer", minimum: 0, description: "Price per item in minor currency units, such as cents." },
          },
          required: ["description", "quantity", "unitAmount"],
          additionalProperties: false,
        },
      },
      issueDate: { type: "string", description: "ISO 8601 date-time ending in Z, for example 2026-07-25T00:00:00.000Z." },
      dueDate: { type: "string", description: "ISO 8601 date-time ending in Z, for example 2026-08-01T00:00:00.000Z." },
      taxAmount: { type: "integer", description: "Always 0 unless the user explicitly requests tax." },
      discountAmount: { type: "integer", minimum: 0, description: "Discount in minor currency units." },
      notes: { type: "string" },
      invoiceType: {
        type: "string",
        enum: ["one_time", "subscription"],
        description: "Use one_time for standard invoices. Use subscription for recurring retainers or monthly/yearly billing.",
      },
      billingInterval: {
        type: "string",
        enum: ["month", "year", ""],
        description: "Required for subscription invoices (month or year). Use an empty string for one_time invoices.",
      },
    },
    required: ["customerName", "currency", "lineItems", "issueDate", "dueDate", "taxAmount", "discountAmount", "invoiceType", "billingInterval"],
    additionalProperties: false,
  },
};

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    const { messages, context, conversationId: incomingConversationId } = requestSchema.parse(await request.json());
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!latestUserMessage) {
      return Response.json({ error: "A user message is required." }, { status: 400 });
    }

    let conversationId = incomingConversationId;
    if (!conversationId) {
      const conversation = await createConversation(user.id, latestUserMessage.content);
      conversationId = conversation.id;
    }

    await appendMessage(conversationId, user.id, "user", latestUserMessage.content);

    const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";

    const response = await getAnthropic().messages.create({
      model,
      max_tokens: 4_096,
      stream: true,
      system: `You are Bhyte Studios' friendly invoice generator inside its private workspace.

Your job is to conversationally collect, verify, and summarize everything required to create a professional invoice.

Date context:
- The user's current local date is ${context.currentDate}.
- The user's timezone is ${context.timeZone}.
- Resolve "today", "tomorrow", weekday names, and relative periods from this date automatically.
- Never ask the user what today's date is.
- When the user gives payment terms such as "due in 2 days" or "Net 30", calculate the exact due date yourself and confirm it in the summary.

When the user greets you, sends a vague opening message, or asks what you do:
- Greet them warmly.
- Briefly introduce yourself as Bhyte's invoice generator.
- Explain that you turn their client and project details into a ready-to-send invoice.
- Give them this concise checklist of what to provide:
  1. Invoice type: one-time payment or recurring subscription
  2. Client legal name
  3. Client billing address (optional — leave blank to collect from the customer at Stripe checkout)
  4. Deliverables or services, ideally as line items
  5. Quantity and price/rate for each item, or an agreed total
  6. Invoice issue date
  7. Due date, first billing date, or payment terms
  8. Any discount, purchase order number, or notes (say "none" if not applicable)
  Mention that client email is optional and the default currency is USD.

Invoice types:
- one_time: a standard invoice paid once. Use invoiceType "one_time" and billingInterval "".
- subscription: recurring billing such as a monthly retainer or annual plan. Use invoiceType "subscription" and billingInterval "month" or "year".
- Infer the type from phrases like "monthly retainer", "recurring", "every month", or "annual subscription".
- If unclear, ask whether this is a one-time invoice or a recurring subscription before preparing the final summary.
- For subscriptions, the line item amounts represent the recurring charge each billing period.
- For subscriptions, dueDate is the first billing date unless the user specifies otherwise.

Invoice rules:
- The fixed issuer is Bhyte Software, LLC, 2261 Market Street STE 5800 #5800, San Francisco, California 94114, United States, phone +1 870 888 3133. The Bhyte logo is also fixed. Do not ask the user to re-enter these details.
- Do not request, mention, or include banking, routing, account, wire, ACH, or SWIFT details.
- Payment is handled through a Pay Invoice or Subscribe button linked to the invoice's Stripe payment link.
- USD is the default currency. Tax is always none unless the user explicitly requests otherwise.
- Client address is optional when creating an invoice. If omitted, Stripe checkout collects the billing address during payment and it is added to the paid invoice PDF and receipt email.
- Client email is optional and should only be requested when the user wants it on this invoice.
- Never invent client details, dates, deliverables, amounts, taxes, discounts, or payment terms.
- Track information already supplied across the conversation and ask only for what is still missing.
- Keep questions natural and manageable; group closely related missing details instead of repeating the entire checklist.
- If the user gives an overall project price, do not force them to break it into rates unless clarification is genuinely needed.
- If optional tax, discount, PO number, or notes are not needed, record them as none.
- Be conversational, friendly, clear, and concise. Avoid stiff form-like language.
- Once every required detail is present, show a clean invoice summary and ask the user to confirm or correct it.
- Only after the user clearly confirms that summary, call the create_invoice tool with the final details. Do not merely say it is ready.
- Never claim that a PDF, payment link, or invoice file was created before the tool succeeds.
- Stay focused on helping the user prepare an invoice.`,
      messages,
      tools: [createInvoiceTool],
    });

    const encoder = new TextEncoder();
    const encodeEvent = (event: object) => encoder.encode(`${JSON.stringify(event)}\n`);
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let toolJson = "";
        let collectingInvoice = false;
        let assistantText = "";
        let inputTokens = 0;
        let outputTokens = 0;
        let cacheCreationInputTokens = 0;
        let cacheReadInputTokens = 0;

        controller.enqueue(encodeEvent({ type: "conversation", id: conversationId }));

        try {
          for await (const event of response) {
            if (event.type === "message_start") {
              inputTokens = event.message.usage.input_tokens;
              outputTokens = event.message.usage.output_tokens;
              cacheCreationInputTokens = event.message.usage.cache_creation_input_tokens ?? 0;
              cacheReadInputTokens = event.message.usage.cache_read_input_tokens ?? 0;
            }
            if (event.type === "message_delta" && event.usage) {
              outputTokens = event.usage.output_tokens;
            }
            if (event.type === "content_block_start" && event.content_block.type === "tool_use" && event.content_block.name === "create_invoice") {
              collectingInvoice = true;
              toolJson = "";
            }
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              assistantText += event.delta.text;
              controller.enqueue(encodeEvent({ type: "text", text: event.delta.text }));
            }
            if (event.type === "content_block_delta" && event.delta.type === "input_json_delta" && collectingInvoice) {
              toolJson += event.delta.partial_json;
            }
            if (event.type === "content_block_stop" && collectingInvoice) {
              const draft = invoiceDraftSchema.parse(JSON.parse(toolJson));
              await setPendingDraft(conversationId!, user.id, draft);
              controller.enqueue(encodeEvent({ type: "invoice", draft }));
              collectingInvoice = false;
            }
          }

          const savedContent = assistantText.trim()
            || "Everything is ready. Review the final invoice below, then create it when you're satisfied.";
          await appendMessage(conversationId!, user.id, "assistant", savedContent);

          const usage = await addConversationUsage(
            conversationId!,
            user.id,
            { inputTokens, outputTokens, cacheCreationInputTokens, cacheReadInputTokens },
            model,
          );
          controller.enqueue(encodeEvent({ type: "usage", usage }));
          controller.close();
        } catch (error) {
          const message = error instanceof z.ZodError
            ? "Claude returned an invalid invoice field. Please ask it to prepare the invoice again."
            : error instanceof Error
              ? error.message
              : "Claude returned invoice details that could not be validated.";
          controller.enqueue(encodeEvent({ type: "error", error: message }));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reach Claude.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return Response.json({ error: message }, { status });
  }
}
