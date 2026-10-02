"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const verified = params.get("verified");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }
    setLoading(true);
    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setLoading(false);
      setError("Email or password is incorrect, or your email has not been confirmed yet.");
      return;
    }

    window.location.href = result?.url || "/dashboard";
  }

  return (
    <main className="nexora-auth-page">
      <section className="nexora-auth-card">
        <div className="nexora-auth-logo" aria-hidden="true">N</div>
        <p className="nexora-auth-kicker">NEXORA DIGITAL</p>
        <h1>Welcome back</h1>
        <p className="nexora-auth-subtitle">Sign in to your NEXORA customer account.</p>

        {verified === "1" && <p className="nexora-auth-message success">Email confirmed successfully. You can now sign in.</p>}
        {verified === "0" && <p className="nexora-auth-message error">This confirmation link is invalid or expired.</p>}
        {error && <p className="nexora-auth-message error">{error}</p>}

        <div className="nexora-auth-form">
          <label htmlFor="login-email">Email address</label>
          <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          <label htmlFor="login-password">Password</label>
          <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" />
          <button type="button" onClick={login} disabled={loading}>
            {loading ? "Signing in…" : "Sign in with email"}
          </button>
        </div>

        <div className="nexora-auth-divider"><span>New to NEXORA?</span></div>
        <Link href="/register" className="nexora-auth-secondary">Create a new customer account</Link>
        <Link href="/" className="nexora-auth-back">← Back to NEXORA</Link>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="nexora-auth-page"><section className="nexora-auth-card"><p className="nexora-auth-kicker">NEXORA DIGITAL</p><h1>Loading…</h1></section></main>}>
      <LoginForm />
    </Suspense>
  );
}
