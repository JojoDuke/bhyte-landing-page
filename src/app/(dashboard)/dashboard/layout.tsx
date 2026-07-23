import Link from "next/link";
import { requireAdmin } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/dashboard/invoices" className="font-semibold tracking-wide text-white">
            BHYTE <span className="text-blue-400">INVOICES</span>
          </Link>
          <span className="text-sm text-zinc-400">{user.email}</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
