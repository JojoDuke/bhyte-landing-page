import { requireAdmin } from "@/lib/auth/server";
import { DashboardShell } from "./dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <DashboardShell email={user.email}>{children}</DashboardShell>
  );
}
