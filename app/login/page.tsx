"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const verified = params.get("verified");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setError("Email or password is incorrect, or your email has not been confirmed yet.");
      return;
    }

    window.location.href = result?.url || "/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="card w-full max-w-md p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to NEXORA DIGITAL</h1>
        <p className="mt-3 text-[#A7B0C0]">Sign in with your email and password.</p>

        {verified === "1" && (
          <p className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-3 text-sm text-cyan-300">
            Email confirmed successfully. You can now sign in.
          </p>
        )}

        {verified === "0" && (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
            This confirmation link is invalid or expired.
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

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
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none focus:border-cyan-400"
          />
          <button
            type="button"
            onClick={login}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Sign in with email
          </button>

          <Link
            href="/register"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Create a new account
          </Link>
        </div>
      </section>
    </main>
  );
}
