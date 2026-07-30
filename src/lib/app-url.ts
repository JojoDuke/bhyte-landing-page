export function getAppOrigin(request?: Request) {
  if (request) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (host) {
      const protocol = request.headers.get("x-forwarded-proto")
        ?? (host.includes("localhost") ? "http" : "https");
      return `${protocol}://${host}`.replace(/\/$/, "");
    }

    try {
      return new URL(request.url).origin;
    } catch {
      // Fall through to env defaults.
    }
  }

  const configured = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}
