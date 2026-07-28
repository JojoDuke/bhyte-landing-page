"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "@neondatabase/auth/next";

const authClient = createAuthClient();

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <label className="block text-xs font-medium tracking-wide text-zinc-300">
        Email
        <span className="mt-2.5 flex items-center rounded-xl border border-white/[0.09] bg-black/25 px-4 transition duration-300 focus-within:border-blue-400/55 focus-within:bg-black/40 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]">
          <svg className="h-4 w-4 shrink-0 text-zinc-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6.5h16v11H4zM4.5 7l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            className="w-full bg-transparent px-3 py-3.5 text-sm font-normal text-white outline-none placeholder:text-zinc-700"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </span>
      </label>
      <label className="block text-xs font-medium tracking-wide text-zinc-300">
        Password
        <span className="mt-2.5 flex items-center rounded-xl border border-white/[0.09] bg-black/25 px-4 transition duration-300 focus-within:border-blue-400/55 focus-within:bg-black/40 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]">
          <svg className="h-4 w-4 shrink-0 text-zinc-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8.5 10V7.5a3.5 3.5 0 017 0V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            className="w-full bg-transparent px-3 py-3.5 text-sm font-normal text-white outline-none placeholder:text-zinc-700"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            className="cursor-pointer p-1 text-zinc-600 transition hover:text-zinc-300"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </span>
      </label>
      {error && (
        <p className="rounded-xl border border-red-400/15 bg-red-500/[0.08] px-3.5 py-3 text-xs text-red-200">
          {error}
        </p>
      )}
      <button
        className="login-submit relative w-full cursor-pointer overflow-hidden rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition duration-300 hover:bg-blue-50 hover:shadow-[0_12px_35px_rgba(59,130,246,0.2)] disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        <span className="relative z-10">{isSubmitting ? "Signing in…" : "Enter workspace"}</span>
      </button>
    </form>
  );
}
