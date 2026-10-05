"use client";

import { useState } from "react";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function runStudio() {
    const clean = prompt.trim();

    if (!clean) {
      setResult("Write your request on the left to start the conversation.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data?.error || "The AI request could not be completed.");
        return;
      }

      setResult(data.response);
    } catch {
      setResult("Unable to connect to the NEXORA AI service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="inner-page studio-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">01 · NEXORA PLATFORM</div>
      <h1>AI <span>Studio</span></h1>
      <p>Talk with NEXORA in one workspace: write on the left and receive the AI response on the right.</p>

      <div className="studio-chat">
        <section className="studio-pane studio-input-pane">
          <div className="studio-pane-head">
            <span>YOUR REQUEST</span>
            <span>01</span>
          </div>
          <label htmlFor="studio-prompt">What would you like NEXORA to help with?</label>
          <textarea
            id="studio-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Write your idea, question, website task or digital request..."
            rows={12}
            disabled={loading}
          />
          <button
            className="primary-button studio-button"
            type="button"
            onClick={runStudio}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send to NEXORA"} <span>→</span>
          </button>
        </section>

        <section className="studio-pane studio-response-pane">
          <div className="studio-pane-head">
            <span>NEXORA AI</span>
            <span>02</span>
          </div>
          <div className={`studio-response ${result ? "has-response" : ""}`} role="status">
            {result || "Your NEXORA AI response will appear here."}
          </div>
        </section>
      </div>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
