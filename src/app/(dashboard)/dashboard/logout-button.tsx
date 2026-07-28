"use client";

import { useRouter } from "next/navigation";
import { createAuthClient } from "@neondatabase/auth/next";

const authClient = createAuthClient();

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function onLogout() {
    await authClient.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      className={`flex cursor-pointer items-center rounded-lg text-sm text-zinc-500 transition hover:bg-white/[0.05] hover:text-white ${
        compact ? "h-10 w-full justify-center" : "mt-2 w-full gap-2 px-2 py-2"
      }`}
      onClick={onLogout}
      type="button"
      title="Log out"
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 8V5.5A1.5 1.5 0 0012.5 4h-7A1.5 1.5 0 004 5.5v13A1.5 1.5 0 005.5 20h7a1.5 1.5 0 001.5-1.5V16M10 12h10m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && <span>Log out</span>}
    </button>
  );
}
