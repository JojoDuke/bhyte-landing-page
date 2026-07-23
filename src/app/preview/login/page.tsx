import Link from "next/link";

export default function PreviewLoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl">
          <p className="text-sm font-medium tracking-[0.24em] text-blue-400">BHYTE STUDIOS</p>
          <h1 className="mt-3 text-3xl font-semibold">Invoice dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            UI preview only — no credentials or backend connection required.
          </p>
          <div className="mt-8 space-y-5">
            <label className="block text-sm text-zinc-300">
              Email
              <div className="mt-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-500">owner@bhytesoftware.com</div>
            </label>
            <label className="block text-sm text-zinc-300">
              Password
              <div className="mt-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-500">••••••••••••</div>
            </label>
            <Link
              className="block w-full rounded-lg bg-blue-500 px-4 py-2.5 text-center font-medium text-black transition hover:bg-blue-400"
              href="/preview/invoices"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
