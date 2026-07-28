"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ChatHistory } from "./chat-history";
import { LogoutButton } from "./logout-button";

export function DashboardShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-zinc-100">
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-white/[0.07] bg-[#08090c]/90 backdrop-blur-2xl transition-[width] duration-300 ${
          collapsed ? "w-[76px]" : "w-[240px]"
        }`}
      >
        <div className={`flex h-20 items-center border-b border-white/[0.06] ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}>
          <Link href="/dashboard/invoices" className="overflow-hidden">
            {collapsed ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg font-semibold text-white">
                B
              </span>
            ) : (
              <Image
                src="/logos/BhyteLogo.png"
                alt="Bhyte"
                width={105}
                height={38}
                className="h-auto w-[92px]"
                priority
              />
            )}
          </Link>
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="cursor-pointer rounded-lg p-2 text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
              aria-label="Collapse sidebar"
            >
              <CollapseIcon />
            </button>
          )}
        </div>

        <nav className="px-3 py-5">
          <Link
            href="/dashboard/invoices"
            title="Invoices"
            className={`flex h-11 items-center rounded-xl border border-blue-400/10 bg-blue-400/[0.08] text-blue-100 transition hover:bg-blue-400/[0.12] ${
              collapsed ? "justify-center px-0" : "gap-3 px-3"
            }`}
          >
            <PaperIcon />
            {!collapsed && <span className="text-sm font-medium">Invoices</span>}
          </Link>
        </nav>

        <Suspense fallback={null}>
          <ChatHistory collapsed={collapsed} />
        </Suspense>

        <div className="border-t border-white/[0.06] p-3">
          {collapsed ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="flex h-10 w-full cursor-pointer items-center justify-center rounded-xl text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
                aria-label="Expand sidebar"
              >
                <ExpandIcon />
              </button>
              <LogoutButton compact />
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <p className="truncate text-xs text-zinc-500">{email}</p>
              <LogoutButton />
            </div>
          )}
        </div>
      </aside>

      <main
        className={`relative z-10 min-h-screen bg-[#0b121c] transition-[margin] duration-300 ${
          collapsed ? "ml-[76px]" : "ml-[240px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

function PaperIcon() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3.5h7l4 4V20a.5.5 0 01-.5.5H6.5a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 3.5v4h4M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
