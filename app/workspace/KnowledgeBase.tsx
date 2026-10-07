"use client";

import { useEffect, useState } from "react";

type DocumentItem = {
  id: string;
  title: string;
  source_type: string;
  content: string;
  created_at: string;
};

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState("text");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/knowledge", { cache: "no-store" });
    const data = await response.json();
    if (response.ok) setDocuments(data.documents || []);
    else setMessage(data.error || "Unable to load knowledge base.");
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addDocument(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, source_type: sourceType }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Unable to save knowledge.");
        return;
      }
      setDocuments((current) => [data.document, ...current]);
      setTitle("");
      setContent("");
      setMessage("Knowledge saved to your workspace.");
    } catch {
      setMessage("Unable to save knowledge.");
    } finally {
      setSaving(false);
    }
  }

  async function removeDocument(id: string) {
    setDeleting(id);
    setMessage("");
    try {
      const response = await fetch("/api/knowledge", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Unable to delete knowledge.");
        return;
      }
      setDocuments((current) => current.filter((item) => item.id !== id));
      setMessage("Knowledge source removed.");
    } catch {
      setMessage("Unable to delete knowledge.");
    } finally {
      setDeleting("");
    }
  }

  return (
    <section className="account-panel">
      <div className="account-side">
        <span className="account-label">AI KNOWLEDGE BASE</span>
        <h2>Teach NEXORA<br /><span>your business.</span></h2>
        <p>Add trusted information that can later power your AI assistant, website chatbot and business workflows.</p>
        <div className="pricing-features">
          <span>✓ Workspace-isolated knowledge</span>
          <span>✓ Text and Q&A sources</span>
          <span>✓ Ready for AI retrieval</span>
        </div>
      </div>

      <div className="account-form-area">
        <form onSubmit={addDocument}>
          <label className="account-label" htmlFor="knowledge-title">TITLE</label>
          <input id="knowledge-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. About NEXORA" required />
          <label className="account-label" htmlFor="knowledge-type">SOURCE</label>
          <select id="knowledge-type" value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
            <option value="text">Text</option>
            <option value="qa">Q&A</option>
            <option value="url">URL</option>
            <option value="file">File</option>
          </select>
          <label className="account-label" htmlFor="knowledge-content">CONTENT</label>
          <textarea id="knowledge-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter trusted information for your AI..." rows={7} required />
          <button className="primary-button" disabled={saving}>{saving ? "Saving…" : "Add to Knowledge Base →"}</button>
        </form>

        <div className="feature-grid">
          {loading ? <p>Loading knowledge…</p> : documents.length ? documents.map((item) => (
            <article className="feature-card" key={item.id}>
              <span>{item.source_type.toUpperCase()}</span>
              <h3>{item.title}</h3>
              <p>{item.content.slice(0, 180)}{item.content.length > 180 ? "…" : ""}</p>
              <button className="secondary-button" type="button" onClick={() => removeDocument(item.id)} disabled={deleting === item.id}>
                {deleting === item.id ? "Removing…" : "Remove source"}
              </button>
            </article>
          )) : <p>No knowledge sources yet.</p>}
        </div>

        {message && <p className="account-intro">{message}</p>}
      </div>
    </section>
  );
}
