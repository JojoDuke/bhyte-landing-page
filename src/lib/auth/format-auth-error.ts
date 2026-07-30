import { isAuthError } from "@neondatabase/auth/next";

export function formatAuthError(error: unknown) {
  if (isAuthError(error)) {
    const status = error.status ?? 0;

    if (status === 401 || status === 400) {
      return "Incorrect email or password.";
    }

    if (status === 403) {
      return "This account is not allowed to sign in here.";
    }

    if (status === 429) {
      return "Too many sign-in attempts. Wait a moment and try again.";
    }

    if (status === 503) {
      return "Sign-in is not configured on this server yet.";
    }

    if (status >= 500) {
      return "Sign-in is temporarily unavailable. Try again in a moment.";
    }

    const message = error.message?.trim();
    if (message && !/^HTTP \d+/i.test(message)) {
      return message;
    }
  }

  if (error instanceof TypeError) {
    return "Unable to reach the sign-in server. Check your connection.";
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Unable to sign in. Please try again.";
}
