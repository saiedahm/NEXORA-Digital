"use client";

import { useState } from "react";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function runStudio() {
    const clean = prompt.trim();

    if (!clean) {
      setResult("Enter an idea above to start your first NEXORA AI Studio request.");
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
      <p>Create an idea, improvement request or digital task. NEXORA will process it through the secure AI service.</p>
      <div className="studio-card">
        <label htmlFor="studio-prompt">What would you like NEXORA to help with?</label>
        <textarea
          id="studio-prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Describe your idea, website, content or digital task..."
          rows={7}
          disabled={loading}
        />
        <button
          className="primary-button studio-button"
          type="button"
          onClick={runStudio}
          disabled={loading}
        >
          {loading ? "Processing..." : "Start AI Studio"} <span>→</span>
        </button>
        {result && <div className="studio-result" role="status">{result}</div>}
      </div>
      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
