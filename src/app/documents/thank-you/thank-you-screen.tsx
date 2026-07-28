"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const steps = [
  { label: "Payment received", detail: "Stripe processed your payment securely." },
  { label: "Confirming transaction", detail: "We're verifying everything on our end." },
            { label: "Receipt on the way", detail: "A clean invoice PDF is being sent to your email." },
];

export function ThankYouScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setActiveStep(1), 900),
      window.setTimeout(() => setActiveStep(2), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="thank-you-stage login-stage relative isolate flex min-h-screen overflow-hidden bg-[#050608] px-5 py-10 text-white">
      <div className="login-grid pointer-events-none absolute inset-0" />
      <div className="login-glow login-glow-one pointer-events-none absolute" />
      <div className="login-glow login-glow-two pointer-events-none absolute" />
      <div className="thank-you-orbit login-orbit pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]">
        <span className="absolute left-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_5px_rgba(110,231,183,0.55)]" />
        <span className="absolute bottom-[20%] right-[12%] h-1 w-1 rounded-full bg-blue-300 shadow-[0_0_14px_4px_rgba(96,165,250,0.45)]" />
      </div>

      <div className="thank-you-spark thank-you-spark-one pointer-events-none absolute" />
      <div className="thank-you-spark thank-you-spark-two pointer-events-none absolute" />
      <div className="thank-you-spark thank-you-spark-three pointer-events-none absolute" />

      <div className="relative z-10 m-auto w-full max-w-[520px]">
        <div className="mb-8 flex justify-center thank-you-fade-in">
          <Image
            src="/logos/BhyteLogo.png"
            alt="Bhyte"
            width={150}
            height={55}
            className="h-auto w-[118px] drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            priority
          />
        </div>

        <div className="thank-you-card login-card relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.045] p-7 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-24 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="thank-you-badge mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-200/85">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Payment successful
            </div>

            <div className="thank-you-check-wrap relative mb-7 flex h-24 w-24 items-center justify-center">
              <span className="thank-you-ring thank-you-ring-one absolute inset-0 rounded-full border border-emerald-400/20" />
              <span className="thank-you-ring thank-you-ring-two absolute inset-2 rounded-full border border-emerald-300/15" />
              <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-b from-emerald-400/20 to-emerald-500/5 shadow-[0_0_40px_rgba(52,211,153,0.18)]">
                <svg className="thank-you-check h-10 w-10" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                  <circle className="thank-you-check-circle" cx="26" cy="26" r="23" stroke="rgba(110,231,183,0.35)" strokeWidth="2" />
                  <path className="thank-you-check-mark" d="M15 27l7 7 15-16" stroke="#6ee7b7" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <h1 className="thank-you-title text-[2rem] font-medium leading-tight tracking-[-0.04em] text-white sm:text-[2.35rem]">
              Thank you for your payment
            </h1>
            <p className="thank-you-copy mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Your transaction went through. We&apos;re confirming the details now and preparing your receipt.
            </p>

            <div className="thank-you-steps mt-8 w-full space-y-3 text-left">
              {steps.map((step, index) => {
                const done = index <= activeStep;
                const current = index === activeStep;
                return (
                  <div
                    key={step.label}
                    className={`thank-you-step flex items-start gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-500 ${
                      done
                        ? "border-emerald-400/12 bg-emerald-400/[0.06]"
                        : "border-white/[0.05] bg-white/[0.02] opacity-45"
                    }`}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors duration-500 ${
                        done
                          ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-200"
                          : "border-white/10 bg-white/[0.03] text-zinc-500"
                      }`}
                    >
                      {done ? "✓" : index + 1}
                    </span>
                    <span>
                      <span className={`block text-sm font-medium ${done ? "text-white" : "text-zinc-500"}`}>
                        {step.label}
                        {current && (
                          <span className="thank-you-pulse ml-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 align-middle" />
                        )}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-zinc-500">{step.detail}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              href="https://bhytesoftware.com"
              className="thank-you-cta mt-8 inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white"
            >
              Back to Bhyte Software
            </Link>
          </div>
        </div>

        <p className="thank-you-footer mt-6 text-center text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          Bhyte Software, LLC · Secure checkout
        </p>
      </div>
    </main>
  );
}
