"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState("");

  async function register() {
    setMessage("");
    if (!email.trim()) { setMessage("Please enter your email address."); return; }
    if (password.length < 8) { setMessage("Password must contain at least 8 characters."); return; }
    if (password !== confirm) { setMessage("Passwords do not match."); return; }
    if (!terms) { setMessage("Please accept the NEXORA terms and conditions."); return; }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password, termsAccepted: terms }),
    });

    const data = await response.json();
    setMessage(response.ok ? "Registration successful. Check your email and confirm your address before signing in." : (data.error || "Registration failed."));
  }

  return (
    <main className="nexora-auth-page">
      <section className="nexora-auth-card nexora-register-card">
        <div className="nexora-auth-logo"><img src="/nexora-logo.png" alt="NEXORA DIGITAL" /></div>
        <p className="nexora-auth-kicker">NEXORA DIGITAL</p>
        <h1>Create your account</h1>
        <p className="nexora-auth-subtitle">Become a NEXORA customer with your email address.</p>

        <div className="nexora-auth-form">
          <label htmlFor="register-email">Email address</label>
          <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          <label htmlFor="register-password">Password</label>
          <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 8 characters" autoComplete="new-password" />
          <label htmlFor="register-confirm">Confirm password</label>
          <input id="register-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your password" autoComplete="new-password" />

          <label className="nexora-auth-check">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span>I accept the NEXORA terms and conditions.</span>
          </label>

          <button type="button" onClick={register}>Create customer account</button>
        </div>

        {message && <p className="nexora-auth-message">{message}</p>}

        <div className="nexora-auth-divider"><span>Or register with</span></div>
        <div className="nexora-social-actions">
          <button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Continue with Google</button>
          <button type="button" onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}>Continue with Facebook</button>
        </div>

        <Link href="/login" className="nexora-auth-secondary">Already have an account? Sign in</Link>
        <Link href="/" className="nexora-auth-back">← Back to NEXORA</Link>
      </section>
    </main>
  );
}
