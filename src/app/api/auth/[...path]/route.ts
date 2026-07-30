import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "@/lib/auth/server";

type AuthRouteContext = {
  params: Promise<{ path: string[] }>;
};

function authConfigErrorResponse(error: unknown) {
  if (!(error instanceof Error)) return null;

  if (
    error.message.includes("NEON_AUTH_BASE_URL")
    || error.message.includes("NEON_AUTH_COOKIE_SECRET")
    || error.message.includes("must be configured")
  ) {
    return NextResponse.json(
      { error: "Authentication is not configured on this server." },
      { status: 503 },
    );
  }

  return null;
}

async function handleAuthRequest(
  request: NextRequest,
  context: AuthRouteContext,
  method: "GET" | "POST",
) {
  try {
    const handler = getAuth().handler();
    return await handler[method](request, context);
  } catch (error) {
    const configError = authConfigErrorResponse(error);
    if (configError) return configError;

    console.error(`Auth ${method} handler failed:`, error);
    return NextResponse.json(
      { error: "Authentication request failed." },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, context: AuthRouteContext) {
  return handleAuthRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: AuthRouteContext) {
  return handleAuthRequest(request, context, "POST");
}
