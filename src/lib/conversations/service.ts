import { and, asc, desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  type ConversationUsage,
  emptyUsage,
  mergeUsage,
} from "@/lib/anthropic/usage";
import { conversations, invoiceMessages, invoices } from "@/lib/invoices/schema";
import type { InvoiceDraft } from "@/lib/invoices/validation";

function parseUsage(value: unknown, model: string): ConversationUsage | null {
  if (!value || typeof value !== "object") return null;
  const usage = value as Partial<ConversationUsage>;
  if (
    typeof usage.inputTokens !== "number"
    || typeof usage.outputTokens !== "number"
    || typeof usage.totalTokens !== "number"
    || typeof usage.costUsd !== "number"
  ) {
    return null;
  }

  return {
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cacheCreationInputTokens: usage.cacheCreationInputTokens ?? 0,
    cacheReadInputTokens: usage.cacheReadInputTokens ?? 0,
    totalTokens: usage.totalTokens,
    costUsd: usage.costUsd,
    model: usage.model ?? model,
  };
}

function titleFromMessage(content: string) {
  const trimmed = content.trim().replace(/\s+/g, " ");
  if (!trimmed) return "New chat";
  return trimmed.length > 60 ? `${trimmed.slice(0, 57)}…` : trimmed;
}

export async function listConversations(userId: string) {
  return getDb().query.conversations.findMany({
    where: eq(conversations.createdBy, userId),
    orderBy: [desc(conversations.updatedAt)],
    limit: 50,
    with: {
      invoice: {
        columns: {
          id: true,
          number: true,
          status: true,
        },
      },
    },
  });
}

export async function getConversation(id: string, userId: string) {
  const conversation = await getDb().query.conversations.findFirst({
    where: and(eq(conversations.id, id), eq(conversations.createdBy, userId)),
    with: {
      messages: {
        orderBy: [asc(invoiceMessages.createdAt)],
      },
      invoice: {
        with: {
          invoiceDocuments: true,
        },
      },
    },
  });

  if (!conversation) return null;

  const documentToken = conversation.invoice?.invoiceDocuments.find((doc) => doc.kind === "open")?.token
    ?? conversation.invoice?.invoiceDocuments[0]?.token;

  return {
    ...conversation,
    pendingDraft: conversation.pendingDraft as InvoiceDraft | null,
    usageStats: parseUsage(conversation.usageStats, process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5"),
    invoiceUsage: parseUsage(conversation.invoiceUsage, process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5"),
    linkedInvoice: conversation.invoice
      ? {
          id: conversation.invoice.id,
          number: conversation.invoice.number,
          status: conversation.invoice.status,
          documentToken,
          stripePaymentLinkUrl: conversation.invoice.stripePaymentLinkUrl,
        }
      : null,
  };
}

export async function createConversation(userId: string, firstMessage?: string) {
  const [conversation] = await getDb()
    .insert(conversations)
    .values({
      createdBy: userId,
      title: firstMessage ? titleFromMessage(firstMessage) : "New chat",
    })
    .returning();

  return conversation;
}

export async function renameConversation(id: string, userId: string, title: string) {
  const trimmed = title.trim();
  if (!trimmed) throw new Error("Title is required.");

  const [updated] = await getDb()
    .update(conversations)
    .set({ title: trimmed.slice(0, 200), updatedAt: new Date() })
    .where(and(eq(conversations.id, id), eq(conversations.createdBy, userId)))
    .returning();

  if (!updated) throw new Error("Conversation not found.");
  return updated;
}

export async function deleteConversation(id: string, userId: string) {
  const [deleted] = await getDb()
    .delete(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.createdBy, userId)))
    .returning({ id: conversations.id });

  if (!deleted) throw new Error("Conversation not found.");
  return deleted;
}

export async function appendMessage(
  conversationId: string,
  userId: string,
  role: "user" | "assistant",
  content: string,
) {
  const conversation = await getDb().query.conversations.findFirst({
    where: and(eq(conversations.id, conversationId), eq(conversations.createdBy, userId)),
    columns: { id: true, title: true },
  });
  if (!conversation) throw new Error("Conversation not found.");

  const [message] = await getDb()
    .insert(invoiceMessages)
    .values({ conversationId, role, content })
    .returning();

  await getDb()
    .update(conversations)
    .set({
      updatedAt: new Date(),
      ...(role === "user" && conversation.title === "New chat"
        ? { title: titleFromMessage(content) }
        : {}),
    })
    .where(eq(conversations.id, conversationId));

  return message;
}

export async function setPendingDraft(
  conversationId: string,
  userId: string,
  pendingDraft: InvoiceDraft | null,
) {
  const [updated] = await getDb()
    .update(conversations)
    .set({ pendingDraft, updatedAt: new Date() })
    .where(and(eq(conversations.id, conversationId), eq(conversations.createdBy, userId)))
    .returning();

  if (!updated) throw new Error("Conversation not found.");
  return updated;
}

export async function addConversationUsage(
  conversationId: string,
  userId: string,
  delta: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationInputTokens?: number;
    cacheReadInputTokens?: number;
  },
  model: string,
) {
  const conversation = await getDb().query.conversations.findFirst({
    where: and(eq(conversations.id, conversationId), eq(conversations.createdBy, userId)),
    columns: { id: true, usageStats: true },
  });
  if (!conversation) throw new Error("Conversation not found.");

  const current = parseUsage(conversation.usageStats, model);
  const usageStats = mergeUsage(current, {
    inputTokens: delta.inputTokens,
    outputTokens: delta.outputTokens,
    cacheCreationInputTokens: delta.cacheCreationInputTokens ?? 0,
    cacheReadInputTokens: delta.cacheReadInputTokens ?? 0,
  }, model);

  await getDb()
    .update(conversations)
    .set({ usageStats, updatedAt: new Date() })
    .where(eq(conversations.id, conversationId));

  return usageStats;
}

export async function linkConversationToInvoice(
  conversationId: string,
  userId: string,
  invoiceId: string,
) {
  const conversation = await getDb().query.conversations.findFirst({
    where: and(eq(conversations.id, conversationId), eq(conversations.createdBy, userId)),
    columns: { id: true, usageStats: true },
  });
  if (!conversation) throw new Error("Conversation not found.");

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";
  const invoiceUsage = parseUsage(conversation.usageStats, model) ?? emptyUsage(model);

  const [updated] = await getDb()
    .update(conversations)
    .set({
      invoiceId,
      pendingDraft: null,
      invoiceUsage,
      updatedAt: new Date(),
    })
    .where(and(eq(conversations.id, conversationId), eq(conversations.createdBy, userId)))
    .returning();

  if (!updated) throw new Error("Conversation not found.");

  await getDb()
    .update(invoices)
    .set({ updatedAt: new Date() })
    .where(eq(invoices.id, invoiceId));

  return { conversation: updated, invoiceUsage };
}
