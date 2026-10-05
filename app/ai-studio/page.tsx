"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function runStudio() {
    const clean = prompt.trim();

    if (!clean || loading) return;

    const history = messages.map((message) => ({
      role: message.role,
      content: message.text,
    }));

    setPrompt("");
    setMessages((current) => [...current, { role: "user", text: clean }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean, history }),
      });

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: response.ok
            ? data.response
            : data?.error || "The AI request could not be completed.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Unable to connect to the NEXORA AI service.",
        },
      ]);
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

          <div className="studio-history studio-user-history">
            {messages.filter((message) => message.role === "user").length > 0 ? (
              messages
                .filter((message) => message.role === "user")
                .map((message, index) => (
                  <div className="studio-message studio-message-user" key={`user-${index}`}>
                    <span>YOU</span>
                    <p>{message.text}</p>
                  </div>
                ))
            ) : (
              <div className="studio-empty">Your requests will appear here as the conversation grows.</div>
            )}
          </div>

          <label htmlFor="studio-prompt">New message</label>
          <textarea
            id="studio-prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                runStudio();
              }
            }}
            placeholder="Write your idea, question, website task or digital request..."
            rows={7}
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

          <div className="studio-history studio-ai-history" role="status">
            {messages.filter((message) => message.role === "assistant").length > 0 ? (
              messages
                .filter((message) => message.role === "assistant")
                .map((message, index) => (
                  <div className="studio-message studio-message-ai" key={`ai-${index}`}>
                    <span>NEXORA AI</span>
                    <p>{message.text}</p>
                  </div>
                ))
            ) : (
              <div className="studio-empty">NEXORA AI responses will appear here.</div>
            )}

            {loading && (
              <div className="studio-message studio-message-ai studio-thinking">
                <span>NEXORA AI</span>
                <p>Thinking...</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
