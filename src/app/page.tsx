"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { configured } = useAuth();
  return configured ? <CloudHome /> : <LocalHome />;
}

/* ============================ local-only mode ============================ */

function LocalHome() {
  const { state, hydrated, setName, setPlacement } = useProgress();
  const [draft, setDraft] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (hydrated && state.name && state.placed) router.replace("/learn");
  }, [hydrated, state.name, state.placed, router]);

  if (!hydrated) return <Splash subtitle="Loading…" />;

  if (!state.name) {
    return (
      <Splash>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) setName(draft);
          }}
          className="flex w-full flex-col gap-3"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Pick a display name"
            className="w-full rounded-2xl border-2 border-line px-4 py-3 text-center text-lg outline-none focus:border-brand"
            maxLength={20}
            autoFocus
          />
          <BigButton type="submit" disabled={!draft.trim()}>
            Get started
          </BigButton>
          <p className="text-xs text-muted">
            Running in local mode. Add Supabase keys to enable accounts &amp; friends.
          </p>
        </form>
      </Splash>
    );
  }

  return <Placement subtitle={`Welcome, ${state.name}! 🎉`} onSkip={() => setPlacement(1)} />;
}

/* ============================ Supabase mode ============================ */

function CloudHome() {
  const { user, loading } = useAuth();
  const { state, synced, username, setPlacement } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (user && synced && username && state.placed) router.replace("/learn");
  }, [user, synced, username, state.placed, router]);

  if (loading || (user && !synced)) return <Splash subtitle="Loading…" />;
  if (!user) return <AuthScreen />;
  if (!username) return <UsernameSetup />;
  if (!state.placed)
    return <Placement subtitle="Find your level" onSkip={() => setPlacement(1)} />;
  return <Splash subtitle="Loading…" />;
}

function AuthScreen() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setBusy(true);
    const res = mode === "in" ? await signIn(email, password) : await signUp(email, password);
    setBusy(false);
    if (res.error) setError(res.error);
    else if (res.needsConfirmation) setMsg("Check your email to confirm your account, then sign in.");
  }

  return (
    <Splash subtitle={mode === "in" ? "Welcome back!" : "Create your account"}>
      <form onSubmit={submit} className="flex w-full flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-2xl border-2 border-line px-4 py-3 outline-none focus:border-brand"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-2xl border-2 border-line px-4 py-3 outline-none focus:border-brand"
          minLength={6}
          required
        />
        {error && <p className="text-sm font-semibold text-danger">{error}</p>}
        {msg && <p className="text-sm font-semibold text-brand-dark">{msg}</p>}
        <BigButton type="submit" disabled={busy}>
          {busy ? "…" : mode === "in" ? "Sign in" : "Sign up"}
        </BigButton>
      </form>

      <button
        onClick={() => signInWithGoogle()}
        className="btn-3d w-full rounded-2xl border-line bg-white px-6 py-3 font-bold"
      >
        Continue with Google
      </button>

      <button
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setError(null);
          setMsg(null);
        }}
        className="text-sm font-bold text-sky"
      >
        {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </Splash>
  );
}

function UsernameSetup() {
  const { updateUsername } = useProgress();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await updateUsername(name);
    setBusy(false);
    if (res.error) setError(res.error);
  }

  return (
    <Splash subtitle="Pick a username">
      <form onSubmit={submit} className="flex w-full flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
          className="w-full rounded-2xl border-2 border-line px-4 py-3 text-center text-lg outline-none focus:border-brand"
          maxLength={20}
          autoFocus
        />
        {error && <p className="text-sm font-semibold text-danger">{error}</p>}
        <BigButton type="submit" disabled={busy || name.trim().length < 3}>
          Continue
        </BigButton>
        <p className="text-xs text-muted">
          Letters, numbers and underscores. Friends find you by this name.
        </p>
      </form>
    </Splash>
  );
}

/* ============================ shared ============================ */

function Placement({ subtitle, onSkip }: { subtitle: string; onSkip: () => void }) {
  return (
    <Splash subtitle={subtitle}>
      <p className="text-center text-muted">
        Let&apos;s find your level with a quick placement check — about 10 taps.
      </p>
      <Link
        href="/diagnostic"
        className="btn-3d w-full rounded-2xl border-brand-dark bg-brand px-6 py-3 text-center text-lg font-extrabold text-white"
      >
        Take the placement test
      </Link>
      <button
        onClick={onSkip}
        className="btn-3d w-full rounded-2xl border-line bg-white px-6 py-3 text-lg font-bold text-muted"
      >
        Skip — I&apos;m a total beginner
      </button>
    </Splash>
  );
}

function BigButton({
  children,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="btn-3d rounded-2xl border-brand-dark bg-brand px-6 py-3 text-lg font-extrabold text-white"
    >
      {children}
    </button>
  );
}

function Splash({ children, subtitle }: { children?: React.ReactNode; subtitle?: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-7xl">🇹🇭</span>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Thai <span className="text-brand">Buddy</span>
        </h1>
        {subtitle && <p className="text-lg font-semibold text-muted">{subtitle}</p>}
      </div>
      <div className="flex w-full max-w-xs flex-col items-center gap-3">{children}</div>
    </main>
  );
}
