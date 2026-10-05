"use client";

import { useState } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "create">("login");

  return (
    <main className="inner-page account-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · ACCOUNT</div>
      <h1>Your digital <span>workspace.</span></h1>
      <p className="account-intro">
        Your NEXORA account will be the secure entry point for AI Studio, projects, usage and connected services.
      </p>

      <section className="account-panel">
        <div className="account-side">
          <span className="account-label">NEXORA ACCESS</span>
          <h2>One account.<br /><span>One workspace.</span></h2>
          <p>Account management is being built on the same clean foundation as the platform. Authentication and persistent data will be connected in the next backend stage.</p>
          <div className="account-points">
            <span>01 · Secure account access</span>
            <span>02 · Personal workspace</span>
            <span>03 · Usage &amp; conversations</span>
          </div>
        </div>

        <div className="account-form-area">
          <div className="account-tabs" role="tablist" aria-label="Account mode">
            <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Sign in</button>
            <button type="button" className={mode === "create" ? "is-active" : ""} onClick={() => setMode("create")}>Create account</button>
          </div>

          <form onSubmit={(event) => event.preventDefault()} className="account-form">
            {mode === "create" && (
              <label>Full name<input type="text" placeholder="Your name" autoComplete="name" /></label>
            )}
            <label>Email<input type="email" placeholder="you@example.com" autoComplete="email" required /></label>
            <label>Password<input type="password" placeholder="Your password" autoComplete={mode === "login" ? "current-password" : "new-password"} required /></label>
            <button className="primary-button account-submit" type="submit">
              {mode === "login" ? "Sign in" : "Create account"} <span>→</span>
            </button>
          </form>

          <div className="account-note">
            <strong>Backend connection next</strong>
            <p>This interface does not pretend to authenticate yet. The secure authentication layer will be connected only after the backend and database foundation is added.</p>
          </div>
        </div>
      </section>

      <a className="secondary-button" href="/pricing">View plans →</a>
    </main>
  );
}
