"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const registered = params.get("registered");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(f.get("email") || "").trim(),
          password: String(f.get("password") || ""),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <span className="badge">SECURE LOGIN</span>
        <h1>Welcome back.</h1>
        <p className="muted">Access your NEXORA career or recruitment workspace.</p>
        {registered && (
          <article className="card" style={{ maxWidth: 520, marginBottom: 16 }}>
            <p>Account created successfully. Sign in to continue.</p>
          </article>
        )}
        <form className="card" onSubmit={submit} style={{ maxWidth: 520 }}>
          <input name="email" required type="email" autoComplete="email" placeholder="Email" style={input} />
          <input name="password" required type="password" autoComplete="current-password" placeholder="Password" style={input} />
          {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
          <button className="btn primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
          <p className="muted">New to NEXORA? <Link href="/register">Create an account</Link></p>
        </form>
      </div>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<main className="section"><div className="container"><p>Loading…</p></div></main>}>
      <LoginForm />
    </Suspense>
  );
}

const input = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #29435f",
  background: "#081525",
  color: "#fff",
};
