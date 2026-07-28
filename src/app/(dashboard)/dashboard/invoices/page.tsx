import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/server";
import { ClaudeChat } from "./claude-chat";

export default async function InvoicesPage() {
  await requireAdmin();

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm text-zinc-500">Loading…</div>}>
      <ClaudeChat />
    </Suspense>
  );
}
