import { createNeonAuth } from "@neondatabase/auth/next/server";

type NeonAuth = ReturnType<typeof createNeonAuth>;

let authInstance: NeonAuth | undefined;

function createAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!baseUrl || !secret) {
    throw new Error("NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be configured.");
  }

  return createNeonAuth({
    baseUrl,
    cookies: {
      secret,
      sameSite: "strict",
    },
  });
}

export function getAuth() {
  if (!authInstance) {
    authInstance = createAuth();
  }

  return authInstance;
}

export async function requireAdmin() {
  const { data: session } = await getAuth().getSession();

  const adminEmail = process.env.DASHBOARD_ADMIN_EMAIL?.toLowerCase();

  if (!session?.user || !adminEmail || session.user.email.toLowerCase() !== adminEmail) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
