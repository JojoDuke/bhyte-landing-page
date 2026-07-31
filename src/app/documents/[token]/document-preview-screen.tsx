import Link from "next/link";

type DocumentPreviewScreenProps = {
  token: string;
  number: string;
  customerName: string;
  amount: string;
  statusLabel: string;
  settled: boolean;
  isSubscription: boolean;
  billingInterval: "month" | "year" | null;
};

export function DocumentPreviewScreen({
  token,
  number,
  customerName,
  amount,
  statusLabel,
  settled,
  isSubscription,
  billingInterval,
}: DocumentPreviewScreenProps) {
  const intervalSuffix = isSubscription ? `/${billingInterval === "year" ? "yr" : "mo"}` : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050608] px-6 py-16 text-zinc-100">
      <div className="w-full max-w-lg rounded-[28px] border border-white/[0.08] bg-[#0b121c] p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-blue-300/70">Bhyte Software</p>
            <h1 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white">
              {isSubscription ? "Subscription invoice" : "Invoice"}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">{number}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
            settled ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"
          }`}>
            {statusLabel}
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <p className="text-[10px] uppercase tracking-wider text-zinc-600">Bill to</p>
          <p className="mt-2 text-lg font-medium text-white">{customerName}</p>
          <p className="mt-5 text-[10px] uppercase tracking-wider text-zinc-600">
            {isSubscription ? "Recurring amount" : "Amount"}
          </p>
          <p className="mt-2 text-3xl font-medium tracking-[-0.04em] text-white">
            {amount}{intervalSuffix}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/documents/${token}/pdf`}
            className="rounded-xl bg-white px-4 py-3.5 text-center text-sm font-semibold text-zinc-950 transition hover:bg-blue-50"
          >
            View PDF
          </Link>
          <Link
            href={`/documents/${token}/pdf`}
            className="rounded-xl border border-white/[0.08] px-4 py-3.5 text-center text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            Download PDF
          </Link>
        </div>
      </div>
    </main>
  );
}
