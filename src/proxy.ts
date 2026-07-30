import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth/server";

export function proxy(request: NextRequest) {
  try {
    return getAuth().middleware({ loginUrl: "/login" })(request);
  } catch (error) {
    console.error("Auth middleware failed:", error);
    return NextResponse.redirect(new URL("/login?error=config", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
