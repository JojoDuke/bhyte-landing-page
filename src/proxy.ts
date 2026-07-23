import { auth } from "@/lib/auth/server";

export const proxy = auth.middleware({
  loginUrl: "/login",
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/invoices/:path*"],
};
