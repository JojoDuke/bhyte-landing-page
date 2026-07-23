"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "@neondatabase/auth/next";

const authClient = createAuthClient();

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await authClient.signIn.email({ email, password });
    setIsSubmitting(false);

    if (signInError) {
      setError("Unable to sign in with those credentials.");
      return;
    }

    router.replace("/dashboard/invoices");
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <label className="block text-sm text-zinc-300">
        Email
        <input
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Password
        <input
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300">{error}</p>}
      <button
        className="w-full rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-black transition hover:bg-blue-400 disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
