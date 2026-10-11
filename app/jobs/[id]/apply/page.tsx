"use client";

import { use, useState } from "react";
import Link from "next/link";

export default function Apply({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [coverMessage, setCoverMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: id, coverMessage }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error || (response.status === 401 ? "Please sign in as a candidate before applying." : "Unable to submit application."));
        return;
      }
      setSuccess(true);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <span className="badge">APPLICATION</span>
        <h1>Apply for this opportunity.</h1>
        {success ? (
          <article className="card" style={{ maxWidth: 760 }}>
            <h2>Application submitted</h2>
            <p className="muted">Your application has been received. You can track its status in your candidate workspace.</p>
            <Link className="btn primary" href="/candidates/applications">Track my application</Link>
          </article>
        ) : (
          <form className="card" style={{ maxWidth: 760 }} onSubmit={submit}>
            <p className="muted">Submit your application using your registered candidate account. Your profile will be shared with the employer for this vacancy.</p>
            <label htmlFor="coverMessage">Cover message (optional)</label>
            <textarea id="coverMessage" value={coverMessage} onChange={(event) => setCoverMessage(event.target.value)} maxLength={3000} rows={7} placeholder="Explain briefly why you are a good fit for this role." style={input} />
            <label className="muted" style={{ display: "flex", gap: 10, alignItems: "center", margin: "16px 0" }}>
              <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} required />
              I confirm that the information in my candidate profile is accurate.
            </label>
            {error && <p role="alert" style={{ color: "#fca5a5", marginBottom: 16 }}>{error} {error.toLowerCase().includes("sign in") && <Link href="/login">Sign in</Link>}</p>}
            <button className="btn primary" type="submit" disabled={busy || !confirmed}>{busy ? "Submitting..." : "Submit application"}</button>
          </form>
        )}
        <p style={{ marginTop: 20 }}><Link href={"/jobs/" + id}>← Back to job</Link></p>
      </div>
    </main>
  );
}

const input = { display: "block", width: "100%", padding: "12px", marginTop: "8px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #29435f", background: "#081525", color: "#fff" };