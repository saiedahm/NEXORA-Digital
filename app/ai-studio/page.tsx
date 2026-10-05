"use client";

import { useState } from "react";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  function runStudio() {
    const clean = prompt.trim();
    setResult(
      clean
        ? `NEXORA AI Studio received your request:\n\n“${clean}”\n\nThe AI engine connection will be added in the next backend stage.`
        : "Enter an idea above to start your first NEXORA AI Studio request."
    );
  }

  return (
    <main className="inner-page studio-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">01 · NEXORA PLATFORM</div>
      <h1>AI <span>Studio</span></h1>
      <p>Create an idea, improvement request or digital task. This is the first interactive layer of NEXORA.</p>
      <div className="studio-card">
        <label htmlFor="studio-prompt">What would you like NEXORA to help with?</label>
        <textarea id="studio-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe your idea, website, content or digital task..." rows={7} />
        <button className="primary-button studio-button" type="button" onClick={runStudio}>Start AI Studio <span>→</span></button>
        {result && <div className="studio-result" role="status">{result}</div>}
      </div>
      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
