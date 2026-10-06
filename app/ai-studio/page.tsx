"use client";

import { useState, type ReactNode } from "react";

function RichAIText({ text }: { text: string }) {
  const normalized = text
    .replace(/\\(\*\*|__|\.)/g, "$1")
    .replace(/\\([*-])/g, "$1");

  const lines = normalized.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  function inline(value: string) {
    return value.split(/(\*\*[^*]+\*\*|__[^_]+__)/g).map((part, i) => {
      if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  }

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const numbered: string[] = [];
    while (index < lines.length) {
      const match = lines[index].trim().match(/^\d+\.\s+(.+)$/);
      if (!match) break;
      numbered.push(match[1]);
      index += 1;
    }
    if (numbered.length) {
      blocks.push(
        <ol key={`ol-${index}`}>
          {numbered.map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ol>
      );
      continue;
    }

    const bullets: string[] = [];
    while (index < lines.length) {
      const match = lines[index].trim().match(/^[-*]\s+(.+)$/);
      if (!match) break;
      bullets.push(match[1]);
      index += 1;
    }
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${index}`}>
          {bullets.map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ul>
      );
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^\d+\.\s+/.test(lines[index].trim()) && !/^[-*]\s+/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    blocks.push(<p key={`p-${index}`}>{inline(paragraph.join(" "))}</p>);
  }

  return <div className="studio-rich-text">{blocks}</div>;
}


type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");

  async function ensureConversation() {
    if (conversationId) return conversationId;
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "AI Studio conversation" }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.ok) return null;
    setConversationId(data.conversation.id);
    setSignedIn(true);
    return data.conversation.id as string;
  }

  async function saveMessage(id: string, role: "user" | "assistant", content: string) {
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: id, role, content }),
    });
  }

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
    setSavedNotice("");

    try {
      const id = await ensureConversation();
      if (!id) {
        setSignedIn(false);
        setMessages((current) => [...current, { role: "assistant", text: "Please sign in to save your AI Studio conversation." }]);
        return;
      }
      await saveMessage(id, "user", clean);
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean, history }),
      });

      const data = await response.json();

      const aiText = response.ok
        ? data.response
        : data?.error || "The AI request could not be completed.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: aiText,
        },
      ]);
      await saveMessage(id, "assistant", aiText);
      setSavedNotice("Conversation saved to your NEXORA workspace.");
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
      {savedNotice && <div className="account-note"><strong>Saved</strong><p>{savedNotice}</p></div>}
      {!signedIn && <div className="account-note"><strong>Workspace mode</strong><p>Sign in to persist your AI Studio conversations.</p><a className="secondary-button" href="/account">Sign in →</a></div>}

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
                    <RichAIText text={message.text} />
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
