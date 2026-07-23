import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
    sameSite: "strict",
  },
});

export async function requireAdmin() {
  const { data: session } = await auth.getSession();

  const adminEmail = process.env.DASHBOARD_ADMIN_EMAIL?.toLowerCase();

  if (!session?.user || !adminEmail || session.user.email.toLowerCase() !== adminEmail) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
