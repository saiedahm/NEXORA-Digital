"use client";

import { FormEvent, useState } from "react";
type Mode = "login" | "create";

export default function AccountPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setMessage(""); setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode === "login" ? "login" : "signup", name, email, password }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Authentication failed.");
      setMessage(data.message || "Signed in successfully.");
      if (data.authenticated) { window.location.href = "/ai-studio"; return; }
      if (data.needsConfirmation) { setPassword(""); return; }
      return;

      if (mode === "create") {
        const { data, error } = await supabase.auth.signUp({
          email, password, options: { data: { full_name: name || null } },
        });
        if (error) throw error;
        if (!data.session || !data.user) {
          setMessage("Account created. Please check your email to confirm your account.");
          setPassword("");
          return;
        }
        await ensureWorkspace(data.user.id, data.user.email ?? email);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data.user) throw error || new Error("Sign in failed.");
        await ensureWorkspace(data.user.id, data.user.email ?? email);
      }
      window.location.href = "/ai-studio";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="inner-page account-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · ACCOUNT</div>
      <h1>Your digital <span>workspace.</span></h1>
      <p className="account-intro">Secure account access for AI Studio, projects, usage and connected services.</p>
      <section className="account-panel">
        <div className="account-side">
          <span className="account-label">NEXORA ACCESS</span>
          <h2>One account.<br /><span>One workspace.</span></h2>
          <p>Your authentication is handled securely by Supabase.</p>
          <div className="account-points">
            <span>01 · Secure email authentication</span>
            <span>02 · Persistent browser session</span>
            <span>03 · Workspace data foundation</span>
          </div>
        </div>
        <div className="account-form-area">
          <div className="account-tabs" role="tablist">
            <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => { setMode("login"); setError(""); setMessage(""); }}>Sign in</button>
            <button type="button" className={mode === "create" ? "is-active" : ""} onClick={() => { setMode("create"); setError(""); setMessage(""); }}>Create account</button>
          </div>
          <form onSubmit={submit} className="account-form">
            {mode === "create" && <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" /></label>}
            <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Minimum 8 characters" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required /></label>
            <button className="primary-button account-submit" type="submit" disabled={loading}>{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"} <span>→</span></button>
          </form>
          {message && <div className="account-note"><strong>Success</strong><p>{message}</p></div>}
          {error && <div className="account-note"><strong>Authentication error</strong><p>{error}</p></div>}
        </div>
      </section>
      <a className="secondary-button" href="/pricing">View plans →</a>
    </main>
  );
}
