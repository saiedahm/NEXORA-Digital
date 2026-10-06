"use client";

import { useEffect, useState } from "react";

type Data = {
  account: { email: string; role: string; workspace: { name: string; slug: string } | null };
  usage: { projects: number; conversations: number; messages: number; aiMessages: number; aiResponses: number };
};

export default function AccountDashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/account").then(async (r) => {
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || "Unable to load account.");
      setData(d);
    }).catch((e) => setError(e.message));
  }, []);

  return (
    <main className="inner-page account-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · ACCOUNT</div>
      <h1>Account <span>dashboard.</span></h1>

      {error && <div className="account-note"><strong>Account access</strong><p>{error}</p><a className="secondary-button" href="/account">Sign in →</a></div>}

      {data && <>
        <section className="account-panel">
          <div className="account-side">
            <span className="account-label">ACCOUNT</span>
            <h2>{data.account.workspace?.name || "NEXORA Workspace"}</h2>
            <p>{data.account.email}</p>
            <div className="account-points">
              <span>Role · {data.account.role}</span>
              <span>Workspace · {data.account.workspace?.slug || "—"}</span>
            </div>
          </div>
          <div className="account-form-area">
            <span className="account-label">USAGE</span>
            <div className="feature-grid">
              <article className="feature-card"><span>PROJECTS</span><h3>{data.usage.projects}</h3><p>Workspace projects</p></article>
              <article className="feature-card"><span>CONVERSATIONS</span><h3>{data.usage.conversations}</h3><p>Saved AI conversations</p></article>
              <article className="feature-card"><span>MESSAGES</span><h3>{data.usage.messages}</h3><p>Your saved messages</p></article>
              <article className="feature-card"><span>AI RESPONSES</span><h3>{data.usage.aiResponses}</h3><p>AI responses recorded</p></article>
            </div>
          </div>
        </section>
        <div className="studio-toolbar">
          <a className="primary-button" href="/workspace">Open Workspace →</a>
          <a className="secondary-button" href="/ai-studio">Open AI Studio →</a>
        </div>
      </>}
    </main>
  );
}
