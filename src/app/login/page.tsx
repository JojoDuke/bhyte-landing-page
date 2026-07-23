import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl">
          <p className="text-sm font-medium tracking-[0.24em] text-blue-400">BHYTE STUDIOS</p>
          <h1 className="mt-3 text-3xl font-semibold">Invoice dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Sign in with the administrator account provisioned in Neon.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
