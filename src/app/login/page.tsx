import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="login-stage relative isolate flex min-h-screen overflow-hidden bg-[#050608] px-5 py-10 text-white">
      <div className="login-grid pointer-events-none absolute inset-0" />
      <div className="login-glow login-glow-one pointer-events-none absolute" />
      <div className="login-glow login-glow-two pointer-events-none absolute" />
      <div className="login-orbit pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]">
        <span className="absolute left-[11%] top-[22%] h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_18px_5px_rgba(96,165,250,0.65)]" />
      </div>

      <div className="relative z-10 m-auto w-full max-w-[460px]">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logos/BhyteLogo.png"
            alt="Bhyte"
            width={150}
            height={55}
            className="h-auto w-[128px] drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            priority
          />
        </div>

        <div className="login-card relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.045] p-7 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.07] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
              </span>
              Secure workspace
            </div>

            <h1 className="text-[2rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-[2.35rem]">
              Welcome back.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Sign in to manage invoices, payment links, and client activity.
            </p>

            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          Bhyte Studios · Internal access
        </p>
      </div>
    </main>
  );
}
