"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DashboardSelect } from "../dashboard-select";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type InvoiceDraft = {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  currency: string;
  invoiceType: "one_time" | "subscription";
  billingInterval: "month" | "year" | null;
  lineItems: Array<{ description: string; quantity: number; unitAmount: number }>;
  issueDate: string;
  dueDate: string;
  taxAmount: number;
  discountAmount: number;
  notes: string;
};

type UsageStats = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  costUsd: number;
  model: string;
};

export function ClaudeChat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("chat");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const loadedConversationRef = useRef<string | null>(null);
  const sessionConversationRef = useRef<string | null>(null);
  const pendingNavigationRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversationId);
  const [isLoadingConversation, setIsLoadingConversation] = useState(Boolean(conversationId));
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<InvoiceDraft | null>(null);
  const [createdInvoice, setCreatedInvoice] = useState<{ documentUrl: string; paymentUrl: string } | null>(null);
  const [invoiceUsage, setInvoiceUsage] = useState<UsageStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  messagesRef.current = messages;

  useEffect(() => {
    setActiveConversationId(conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) {
      if (isStreaming || sessionConversationRef.current) return;
      loadedConversationRef.current = null;
      sessionConversationRef.current = null;
      setMessages([]);
      setPendingDraft(null);
      setCreatedInvoice(null);
      setInvoiceUsage(null);
      setError(null);
      setIsLoadingConversation(false);
      return;
    }

    if (isStreaming) return;

    if (loadedConversationRef.current === conversationId) return;

    if (sessionConversationRef.current === conversationId && messagesRef.current.length > 0) {
      loadedConversationRef.current = conversationId;
      setIsLoadingConversation(false);
      return;
    }

    let cancelled = false;

    async function loadConversation() {
      if (messagesRef.current.length === 0) {
        setIsLoadingConversation(true);
      }
      setError(null);

      try {
        const response = await fetch(`/api/conversations/${conversationId}`);
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Unable to load chat.");

        if (cancelled) return;

        const loadedMessages = (body.conversation.messages ?? []).map((message: { id: string; role: "user" | "assistant"; content: string }) => ({
          id: message.id,
          role: message.role,
          content: message.content,
        }));

        setMessages(loadedMessages);
        setPendingDraft((current) => body.conversation.pendingDraft ?? current);

        const lastMessage = loadedMessages.at(-1);
        if (lastMessage?.role === "user" && !body.conversation.pendingDraft && !body.conversation.linkedInvoice) {
          window.setTimeout(async () => {
            if (cancelled || messagesRef.current.length > loadedMessages.length) return;

            try {
              const retryResponse = await fetch(`/api/conversations/${conversationId}`);
              const retryBody = await retryResponse.json();
              if (!retryResponse.ok || cancelled) return;

              const retryMessages = (retryBody.conversation.messages ?? []).map((message: { id: string; role: "user" | "assistant"; content: string }) => ({
                id: message.id,
                role: message.role,
                content: message.content,
              }));

              if (retryMessages.length > loadedMessages.length || retryBody.conversation.pendingDraft) {
                setMessages(retryMessages);
                setPendingDraft((current) => retryBody.conversation.pendingDraft ?? current);
              }
            } catch {
              // Ignore background refresh failures.
            }
          }, 1500);
        }

        if (body.conversation.linkedInvoice?.documentToken) {
          const origin = window.location.origin;
          setCreatedInvoice({
            documentUrl: `${origin}/documents/${body.conversation.linkedInvoice.documentToken}`,
            paymentUrl: body.conversation.linkedInvoice.stripePaymentLinkUrl ?? "",
          });
          setInvoiceUsage(body.conversation.invoiceUsage ?? null);
        } else {
          setCreatedInvoice(null);
          setInvoiceUsage(null);
        }

        loadedConversationRef.current = conversationId;
      } catch (caught) {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Unable to load chat.");
        }
      } finally {
        if (!cancelled) setIsLoadingConversation(false);
      }
    }

    void loadConversation();
    return () => {
      cancelled = true;
    };
  }, [conversationId, isStreaming]);

  useEffect(() => {
    const reset = () => {
      abortRef.current?.abort();
      setInput("");
      setMessages([]);
      setActiveConversationId(null);
      loadedConversationRef.current = null;
      sessionConversationRef.current = null;
      pendingNavigationRef.current = null;
      setPendingDraft(null);
      setCreatedInvoice(null);
      setInvoiceUsage(null);
      setError(null);
      setIsStreaming(false);
      setIsLoadingConversation(false);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    window.addEventListener("conversations:new", reset);
    return () => window.removeEventListener("conversations:new", reset);
  }, []);

  useEffect(() => {
    if (isLoadingConversation) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isLoadingConversation, pendingDraft, createdInvoice]);

  function updateInput(value: string) {
    setInput(value);
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
  }

  async function sendMessage() {
    const content = input.trim();
    if (!content || isStreaming || isLoadingConversation) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content };
    const assistantId = crypto.randomUUID();
    const nextMessages = [...messages, userMessage];

    setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setIsStreaming(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const controller = new AbortController();
    abortRef.current = controller;
    const now = new Date();
    const currentDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeConversationId ?? undefined,
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
          context: {
            currentDate,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Claude could not respond.");
      }

      if (!response.body) throw new Error("Claude returned an empty response.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const processLine = (line: string) => {
        if (!line.trim()) return;
        const event = JSON.parse(line) as
          | { type: "conversation"; id: string }
          | { type: "text"; text: string }
          | { type: "invoice"; draft: InvoiceDraft }
          | { type: "error"; error: string };

        if (event.type === "conversation") {
          sessionConversationRef.current = event.id;
          loadedConversationRef.current = event.id;
          setActiveConversationId(event.id);
          pendingNavigationRef.current = event.id;
        } else if (event.type === "text") {
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId
                ? { ...message, content: message.content + event.text }
                : message,
            ),
          );
        } else if (event.type === "invoice") {
          setPendingDraft(event.draft);
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantId && !message.content
                ? { ...message, content: "Everything is ready. Review the final invoice below, then create it when you’re satisfied." }
                : message,
            ),
          );
        } else {
          throw new Error(event.error);
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        lines.forEach(processLine);
      }
      buffer += decoder.decode();
      processLine(buffer);
    } catch (caught) {
      if (!(caught instanceof DOMException && caught.name === "AbortError")) {
        const message = caught instanceof Error ? caught.message : "Unable to reach Claude.";
        setError(message);
        setMessages((current) =>
          current.map((entry) =>
            entry.id === assistantId && entry.role === "assistant" && !entry.content
              ? { ...entry, content: message }
              : entry,
          ),
        );
      }
    } finally {
      abortRef.current = null;
      setIsStreaming(false);

      const nextConversationId = pendingNavigationRef.current ?? sessionConversationRef.current;
      if (nextConversationId && nextConversationId !== conversationId) {
        pendingNavigationRef.current = null;
        router.replace(`/dashboard/invoices?chat=${nextConversationId}`, { scroll: false });
      }
      window.dispatchEvent(new Event("conversations:changed"));
    }
  }

  function stopResponse() {
    abortRef.current?.abort();
  }

  async function createInvoice(paymentDescription: string) {
    if (!pendingDraft || isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pendingDraft,
          paymentDescription,
          conversationId: activeConversationId ?? undefined,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to create invoice.");

      const origin = window.location.origin;
      setCreatedInvoice({
        documentUrl: `${origin}/documents/${body.invoice.documentToken}`,
        paymentUrl: body.invoice.stripePaymentLinkUrl,
      });
      setInvoiceUsage(body.usage ?? null);
      setPendingDraft(null);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Invoice **${body.invoice.number}** is ready. You can open the PDF or copy its share link below.`,
        },
      ]);
      window.dispatchEvent(new Event("conversations:changed"));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create invoice.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="mx-auto flex h-screen w-full max-w-4xl flex-col px-6">
      <div className="min-h-0 flex-1 overflow-y-auto py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {isLoadingConversation && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-zinc-500">Loading chat…</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="relative flex h-full items-end justify-center pb-1">
            <EmptyInvoiceHero />
            <Prompt input={input} isStreaming={isStreaming || isLoadingConversation} textareaRef={textareaRef} updateInput={updateInput} sendMessage={sendMessage} stopResponse={stopResponse} />
          </div>
        ) : (
          <div className="flex min-h-full flex-col">
            <div className="mx-auto mt-auto w-full max-w-3xl space-y-9 pb-8">
            {messages.map((message) => (
              <Message key={message.id} message={message} isStreaming={isStreaming} />
            ))}
            {createdInvoice && (
              <>
                <CreatedInvoiceActions invoice={createdInvoice} />
                {invoiceUsage && <InvoiceUsageSummary usage={invoiceUsage} />}
              </>
            )}
            {error && (
              <div className="rounded-xl border border-red-400/15 bg-red-500/[0.07] px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
            </div>
          </div>
        )}
      </div>

      {pendingDraft && (
        <div className="shrink-0 border-t border-white/[0.06] bg-[#0b121c] px-0 pb-2 pt-4">
          <div className="mx-auto max-h-[min(52vh,520px)] w-full max-w-3xl overflow-y-auto [scrollbar-width:thin]">
            <InvoiceReview
              draft={pendingDraft}
              setDraft={setPendingDraft}
              isCreating={isCreating}
              onCreate={createInvoice}
            />
          </div>
        </div>
      )}

      {(messages.length > 0 || pendingDraft) && (
        <div className="shrink-0 bg-gradient-to-t from-[#0b121c] via-[#0b121c] to-transparent pb-6 pt-5">
          <Prompt input={input} isStreaming={isStreaming} textareaRef={textareaRef} updateInput={updateInput} sendMessage={sendMessage} stopResponse={stopResponse} />
        </div>
      )}
    </section>
  );
}

function EmptyInvoiceHero() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[58%] flex-col items-center text-center">
      <div className="group relative flex h-36 w-36 cursor-default items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] shadow-[inset_0_0_45px_rgba(59,130,246,0.035)] pointer-events-auto">
        <div className="absolute inset-3 rounded-full border border-dashed border-white/[0.06]" />
        <div className="absolute left-[33px] top-[37px] h-[70px] w-[51px] -rotate-8 rounded-[7px] border border-white/[0.09] bg-[#101a27] shadow-[0_12px_25px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out group-hover:-translate-x-2 group-hover:translate-y-1 group-hover:-rotate-12" />
        <div className="relative h-[76px] w-[56px] rotate-6 rounded-[8px] border border-blue-300/20 bg-[#152235] shadow-[0_14px_30px_rgba(0,0,0,0.32)] transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-10">
          <div className="absolute right-0 top-0 h-4 w-4 rounded-bl-md border-b border-l border-blue-300/15 bg-blue-300/[0.07]" />
          <div className="absolute left-3 top-7 h-1 w-7 rounded-full bg-blue-300/25" />
          <div className="absolute left-3 top-10 h-1 w-8 rounded-full bg-white/10" />
          <div className="absolute left-3 top-[52px] h-1 w-5 rounded-full bg-white/10" />
        </div>
        <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/10 text-blue-300 shadow-[0_0_22px_rgba(59,130,246,0.12)] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1 group-hover:rotate-90 group-hover:scale-105">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <p className="mt-6 w-[360px] max-w-[70vw] text-sm leading-6 text-zinc-500">
        Describe the details of your invoice and let us generate it for you
      </p>
      <Link
        href="/dashboard/invoices/past"
        className="pointer-events-auto mt-4 text-sm text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition hover:text-zinc-300"
      >
        Record a past payment
      </Link>
    </div>
  );
}

function Message({ message, isStreaming }: { message: ChatMessage; isStreaming: boolean }) {
  const waiting = message.role === "assistant" && !message.content && isStreaming;

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-[22px] rounded-br-md border border-white/[0.07] bg-white/[0.075] px-5 py-3.5 text-[15px] leading-6 text-zinc-100">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/[0.08] text-blue-300">
        <ClaudeMark />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {waiting ? (
          <div className="flex h-6 items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500 [animation-delay:300ms]" />
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-[15px] leading-7 text-zinc-300 prose-headings:font-medium prose-headings:tracking-[-0.02em] prose-p:my-3 prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function InvoiceReview({
  draft,
  setDraft,
  isCreating,
  onCreate,
}: {
  draft: InvoiceDraft;
  setDraft: React.Dispatch<React.SetStateAction<InvoiceDraft | null>>;
  isCreating: boolean;
  onCreate: (paymentDescription: string) => void;
}) {
  const subtotal = draft.lineItems.reduce((sum, item) => sum + item.quantity * item.unitAmount, 0);
  const total = subtotal + draft.taxAmount - draft.discountAmount;
  const isSubscription = draft.invoiceType === "subscription";
  const [paymentDescription, setPaymentDescription] = useState("");
  const [paymentDescriptionError, setPaymentDescriptionError] = useState<string | null>(null);
  const update = (changes: Partial<InvoiceDraft>) => setDraft((current) => current ? { ...current, ...changes } : current);

  function handleCreate() {
    if (!paymentDescription.trim()) {
      setPaymentDescriptionError("Payment description is required.");
      return;
    }
    setPaymentDescriptionError(null);
    onCreate(paymentDescription.trim());
  }

  const canCreate = total > 0
    && draft.customerName.trim().length > 0
    && draft.customerAddress.trim().length > 0
    && paymentDescription.trim().length > 0
    && (!isSubscription || Boolean(draft.billingInterval));

  return (
    <div className="dashboard-review rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-300/70">Final review</p>
          <h2 className="mt-1.5 text-xl font-medium tracking-[-0.025em] text-white">
            {isSubscription ? "Create subscription invoice" : "Create invoice"}
          </h2>
        </div>
        <span className="rounded-full border border-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
          {isSubscription ? `${draft.billingInterval === "year" ? "Yearly" : "Monthly"} · USD` : "One-time · USD · No tax"}
        </span>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <ReviewField label="Invoice type">
          <DashboardSelect
            value={draft.invoiceType}
            options={[
              { value: "one_time", label: "One-time payment" },
              { value: "subscription", label: "Subscription" },
            ]}
            onChange={(invoiceType) => update({
              invoiceType,
              billingInterval: invoiceType === "subscription" ? (draft.billingInterval ?? "month") : null,
            })}
          />
        </ReviewField>
        {isSubscription && (
          <ReviewField label="Billing interval">
            <DashboardSelect
              value={draft.billingInterval ?? "month"}
              options={[
                { value: "month", label: "Monthly" },
                { value: "year", label: "Yearly" },
              ]}
              onChange={(billingInterval) => update({ billingInterval })}
            />
          </ReviewField>
        )}
      </div>

      <ReviewField label="Payment Description" required>
        <textarea
          className={`dashboard-input min-h-24 resize-none ${paymentDescriptionError ? "border-red-400/40" : ""}`}
          value={paymentDescription}
          placeholder="Detailed description shown under the title on the Stripe checkout page"
          aria-invalid={Boolean(paymentDescriptionError)}
          aria-describedby={paymentDescriptionError ? "invoice-payment-description-error" : undefined}
          onChange={(event) => {
            setPaymentDescriptionError(null);
            setPaymentDescription(event.target.value);
          }}
        />
        {paymentDescriptionError && (
          <p id="invoice-payment-description-error" className="mt-2 text-xs text-red-300">
            {paymentDescriptionError}
          </p>
        )}
      </ReviewField>

      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewField label="Client legal name">
          <input className="dashboard-input" value={draft.customerName} onChange={(event) => update({ customerName: event.target.value })} />
        </ReviewField>
        <ReviewField label="Client email (optional)">
          <input className="dashboard-input" type="email" value={draft.customerEmail} onChange={(event) => update({ customerEmail: event.target.value })} />
        </ReviewField>
      </div>

      <ReviewField label="Client billing address">
        <textarea className="dashboard-input min-h-20 resize-none" value={draft.customerAddress} onChange={(event) => update({ customerAddress: event.target.value })} />
      </ReviewField>

      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewField label="Issue date">
          <input className="dashboard-input" type="date" value={draft.issueDate.slice(0, 10)} onChange={(event) => update({ issueDate: `${event.target.value}T00:00:00.000Z` })} />
        </ReviewField>
        <ReviewField label={isSubscription ? "First billing date" : "Due date"}>
          <input className="dashboard-input" type="date" value={draft.dueDate.slice(0, 10)} onChange={(event) => update({ dueDate: `${event.target.value}T00:00:00.000Z` })} />
        </ReviewField>
      </div>

      <div className="mt-5">
        <div className="mb-2 grid grid-cols-[1fr_64px_110px] gap-2 px-1 text-[10px] uppercase tracking-wider text-zinc-600">
          <span>Title</span><span>Qty</span><span>Rate</span>
        </div>
        <div className="space-y-2">
          {draft.lineItems.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_64px_110px] gap-2">
              <div className="dashboard-input flex min-h-[42px] items-center text-zinc-300">
                {item.description}
              </div>
              <input
                className="dashboard-input text-center"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => update({ lineItems: draft.lineItems.map((line, itemIndex) => itemIndex === index ? { ...line, quantity: Number(event.target.value) } : line) })}
              />
              <input
                className="dashboard-input text-right"
                type="number"
                min="0"
                step="0.01"
                value={(item.unitAmount / 100).toFixed(2)}
                onChange={(event) => update({ lineItems: draft.lineItems.map((line, itemIndex) => itemIndex === index ? { ...line, unitAmount: Math.round(Number(event.target.value) * 100) } : line) })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ReviewField label="Discount">
          <input className="dashboard-input" type="number" min="0" step="0.01" value={(draft.discountAmount / 100).toFixed(2)} onChange={(event) => update({ discountAmount: Math.round(Number(event.target.value) * 100) })} />
        </ReviewField>
        <ReviewField label="Notes (optional)">
          <input className="dashboard-input" value={draft.notes} onChange={(event) => update({ notes: event.target.value })} />
        </ReviewField>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-white/[0.07] pt-5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-600">Invoice number</p>
          <p className="mt-1 text-xs text-zinc-400">Assigned as A4B2886C-0000 format</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-zinc-600">
            {isSubscription ? "Recurring amount" : "Amount due"}
          </p>
          <p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-white">
            {formatMoney(total, draft.currency)}
            {isSubscription && <span className="text-base text-zinc-400">/{draft.billingInterval === "year" ? "yr" : "mo"}</span>}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCreate}
        disabled={isCreating || !canCreate}
        className="mt-5 w-full cursor-pointer rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isCreating
          ? "Creating invoice…"
          : isSubscription
            ? "Create subscription PDF & link"
            : "Create PDF & payment link"}
      </button>
    </div>
  );
}

function ReviewField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-3 block">
      <span className="mb-2 block text-[10px] uppercase tracking-wider text-zinc-600">
        {label}
        {required && <span className="text-red-300"> *</span>}
      </span>
      {children}
    </label>
  );
}

function CreatedInvoiceActions({ invoice }: { invoice: { documentUrl: string; paymentUrl: string } }) {
  return (
    <div className="grid gap-3 rounded-[18px] border border-emerald-300/10 bg-emerald-300/[0.035] p-4 sm:grid-cols-3">
      <a className="rounded-xl bg-white px-4 py-3 text-center text-xs font-semibold text-zinc-950 transition hover:bg-blue-50" href={invoice.documentUrl} target="_blank" rel="noreferrer">
        Open PDF
      </a>
      <button type="button" className="cursor-pointer rounded-xl border border-white/[0.09] px-4 py-3 text-xs text-zinc-300 transition hover:bg-white/[0.05]" onClick={() => navigator.clipboard.writeText(invoice.documentUrl)}>
        Copy share link
      </button>
      <a className="rounded-xl border border-blue-300/15 bg-blue-300/[0.05] px-4 py-3 text-center text-xs text-blue-200 transition hover:bg-blue-300/[0.1]" href={invoice.paymentUrl} target="_blank" rel="noreferrer">
        Open payment link
      </a>
    </div>
  );
}

function InvoiceUsageSummary({ usage }: { usage: UsageStats }) {
  const formattedTokens = new Intl.NumberFormat("en-US").format(usage.totalTokens);
  const formattedCost = usage.costUsd >= 0.01
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(usage.costUsd)
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(usage.costUsd);

  return (
    <p className="px-1 text-center text-xs text-zinc-500">
      {formattedTokens} tokens used · {formattedCost} estimated Claude cost
    </p>
  );
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function Prompt({
  input,
  isStreaming,
  textareaRef,
  updateInput,
  sendMessage,
  stopResponse,
}: {
  input: string;
  isStreaming: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  updateInput: (value: string) => void;
  sendMessage: () => void;
  stopResponse: () => void;
}) {
  return (
    <div className="dashboard-prompt mx-auto flex min-h-[50px] w-full max-w-3xl items-end rounded-[25px] border border-white/[0.1] bg-white/[0.055] p-1.5 pl-5 backdrop-blur-2xl transition-colors duration-300 focus-within:border-blue-400/35 focus-within:bg-white/[0.07]">
      <textarea
        ref={textareaRef}
        rows={1}
        className="max-h-[140px] min-h-[38px] flex-1 resize-none overflow-y-auto bg-transparent py-2 pr-3 text-sm leading-[22px] text-zinc-100 outline-none placeholder:text-zinc-600 [scrollbar-width:thin]"
        placeholder="Type here"
        value={input}
        onChange={(event) => updateInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void sendMessage();
          }
        }}
      />
      <button
        type="button"
        className="flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-zinc-950 transition hover:bg-blue-50 disabled:cursor-default disabled:bg-white/10 disabled:text-zinc-700"
        disabled={!isStreaming && !input.trim()}
        onClick={isStreaming ? stopResponse : sendMessage}
        aria-label={isStreaming ? "Stop response" : "Send message"}
      >
        {isStreaming ? (
          <span className="h-3.5 w-3.5 rounded-[3px] bg-current" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5m-5 5 5-5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

function ClaudeMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5v17M4.64 7.75l14.72 8.5M4.64 16.25l14.72-8.5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}
