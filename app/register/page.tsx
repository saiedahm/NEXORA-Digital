"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [message, setMessage] = useState("");

  async function register() {
    setMessage("");
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, termsAccepted: terms }),
    });

    const data = await response.json();
    setMessage(response.ok ? "Registration successful. Check your email and confirm your address before signing in." : (data.error || "Registration failed."));
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="card w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold">Create your NEXORA account</h1>
        <p className="mt-3 text-[#A7B0C0]">Accept the terms, create your password, then confirm your email.</p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (minimum 8 characters)"
            autoComplete="new-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none focus:border-cyan-400"
          />

          <label className="flex items-start gap-3 text-left text-sm text-[#A7B0C0]">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
            <span>I accept the NEXORA terms and conditions.</span>
          </label>

          <button
            type="button"
            onClick={register}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Create account
          </button>

          {message && <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-[#A7B0C0]">{message}</p>}

          <Link href="/login" className="text-sm text-cyan-300 hover:underline">
            Back to sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
