"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type ConversationSummary = {
  id: string;
  title: string;
  updatedAt: string;
  invoiceId: string | null;
  invoice?: {
    id: string;
    number: string;
    status: string;
  } | null;
};

export function ChatHistory({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("chat");
  const [items, setItems] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const onInvoicesPage = pathname === "/dashboard/invoices";

  const loadConversations = useCallback(async () => {
    try {
      const response = await fetch("/api/conversations");
      if (!response.ok) return;
      const body = await response.json();
      setItems(body.conversations ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!onInvoicesPage) return;
    void loadConversations();
  }, [loadConversations, onInvoicesPage]);

  useEffect(() => {
    if (!onInvoicesPage) return;

    const refresh = () => {
      void loadConversations();
    };

    window.addEventListener("conversations:changed", refresh);
    return () => window.removeEventListener("conversations:changed", refresh);
  }, [loadConversations, onInvoicesPage]);

  useEffect(() => {
    if (!menuId) return;
    const close = () => setMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuId]);

  if (!onInvoicesPage) return null;

  function openChat(id: string) {
    router.push(`/dashboard/invoices?chat=${id}`);
  }

  function startNewChat() {
    router.push("/dashboard/invoices");
    window.dispatchEvent(new Event("conversations:new"));
  }

  async function renameConversation(id: string) {
    const title = renameValue.trim();
    if (!title) return;

    const response = await fetch(`/api/conversations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      setRenamingId(null);
      setRenameValue("");
      window.dispatchEvent(new Event("conversations:changed"));
    }
  }

  async function deleteChat(id: string) {
    if (!window.confirm("Delete this chat? This cannot be undone.")) return;

    const response = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    if (!response.ok) return;

    if (activeId === id) {
      router.push("/dashboard/invoices");
      window.dispatchEvent(new Event("conversations:new"));
    }
    window.dispatchEvent(new Event("conversations:changed"));
  }

  if (collapsed) {
    return (
      <div className="mt-4 space-y-2 px-3">
        <button
          type="button"
          onClick={startNewChat}
          title="New chat"
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          <PlusIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 flex min-h-0 flex-1 flex-col px-3">
      <button
        type="button"
        onClick={startNewChat}
        className="mb-3 flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
      >
        <PlusIcon />
        New chat
      </button>

      <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        {loading ? (
          <p className="px-2 py-3 text-xs text-zinc-600">Loading chats…</p>
        ) : items.length === 0 ? (
          <p className="px-2 py-3 text-xs leading-5 text-zinc-600">No chats yet. Start one to draft an invoice.</p>
        ) : (
          <ul className="space-y-1 pb-3">
            {items.map((item) => {
              const active = activeId === item.id;
              const renaming = renamingId === item.id;

              return (
                <li key={item.id} className="relative">
                  {renaming ? (
                    <form
                      className="rounded-xl border border-blue-400/20 bg-white/[0.04] p-2"
                      onSubmit={(event) => {
                        event.preventDefault();
                        void renameConversation(item.id);
                      }}
                    >
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(event) => setRenameValue(event.target.value)}
                        className="w-full rounded-lg border border-white/[0.08] bg-[#0b121c] px-2 py-1.5 text-xs text-zinc-100 outline-none focus:border-blue-400/30"
                      />
                      <div className="mt-2 flex gap-2">
                        <button type="submit" className="cursor-pointer rounded-md bg-white px-2 py-1 text-[10px] font-medium text-zinc-950">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRenamingId(null);
                            setRenameValue("");
                          }}
                          className="cursor-pointer rounded-md px-2 py-1 text-[10px] text-zinc-500 hover:text-zinc-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div
                      className={`group flex items-center gap-2 rounded-xl px-2 py-2 transition ${
                        active ? "bg-white/[0.08] text-white" : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => openChat(item.id)}
                        className="min-w-0 flex-1 cursor-pointer text-left"
                      >
                        <p className="truncate text-sm">{item.title}</p>
                        {item.invoice && (
                          <p className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-emerald-400/80">
                            {item.invoice.number}
                          </p>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setMenuId(menuId === item.id ? null : item.id);
                        }}
                        className="cursor-pointer rounded-md p-1 text-zinc-600 opacity-0 transition group-hover:opacity-100 hover:bg-white/[0.06] hover:text-zinc-300"
                        aria-label="Chat options"
                      >
                        <DotsIcon />
                      </button>
                    </div>
                  )}

                  {menuId === item.id && !renaming && (
                    <div
                      className="absolute right-2 top-10 z-20 min-w-[120px] rounded-xl border border-white/[0.08] bg-[#0d141f] p-1 shadow-xl"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs text-zinc-300 hover:bg-white/[0.05]"
                        onClick={() => {
                          setMenuId(null);
                          setRenamingId(item.id);
                          setRenameValue(item.title);
                        }}
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs text-red-300 hover:bg-red-500/10"
                        onClick={() => {
                          setMenuId(null);
                          void deleteChat(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
