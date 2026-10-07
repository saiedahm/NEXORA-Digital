"use client";

import { useEffect, useState } from "react";
import KnowledgeFileImport from "./KnowledgeFileImport";

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
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/knowledge", { cache: "no-store" });
    const data = await response.json();
    if (response.ok) setDocuments(data.documents || []);
    else setMessage(data.error || "Unable to load knowledge base.");
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function importWebsite(event: React.FormEvent) {
    event.preventDefault();
    setImporting(true);
    setMessage("");
    try {
      const response = await fetch("/api/knowledge/import-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Unable to import this website.");
        return;
      }
      setDocuments((current) => [data.document, ...current]);
      setImportUrl("");
      setMessage("Website content imported into your Knowledge Base.");
    } catch {
      setMessage("Unable to import this website.");
    } finally {
      setImporting(false);
    }
  }

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

  function startEditing(item: DocumentItem) {
    setEditing(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
    setMessage("");
  }

  async function saveEdit() {
    if (!editing) return;
    setMessage("");
    try {
      const response = await fetch("/api/knowledge", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing, title: editTitle, content: editContent }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Unable to update knowledge.");
        return;
      }
      setDocuments((current) => current.map((item) => item.id === editing ? data.document : item));
      setEditing(null);
      setMessage("Knowledge source updated.");
    } catch {
      setMessage("Unable to update knowledge.");
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

        <KnowledgeFileImport
          onImported={(document) => {
            setDocuments((current) => [document as DocumentItem, ...current]);
            setMessage("File imported into your Knowledge Base.");
          }}
        />

        <form onSubmit={importWebsite}>
          <label className="account-label" htmlFor="knowledge-url">IMPORT WEBSITE URL</label>
          <input id="knowledge-url" type="url" value={importUrl} onChange={(e) => setImportUrl(e.target.value)} placeholder="https://your-website.com" required />
          <button className="secondary-button" disabled={importing}>
            {importing ? "Importing…" : "Import website →"}
          </button>
        </form>

        <div className="feature-grid">
          {loading ? <p>Loading knowledge…</p> : documents.length ? documents.map((item) => (
            <article className="feature-card" key={item.id}>
              <span>{item.source_type.toUpperCase()}</span>
              <h3>{item.title}</h3>
              {editing === item.id ? (
                <>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} aria-label="Knowledge title" />
                  <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={5} aria-label="Knowledge content" />
                  <button className="primary-button" type="button" onClick={saveEdit}>Save changes →</button>
                  <button className="secondary-button" type="button" onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{item.content.slice(0, 180)}{item.content.length > 180 ? "…" : ""}</p>
                  <button className="secondary-button" type="button" onClick={() => startEditing(item)}>Edit source</button>
                  <button className="secondary-button" type="button" onClick={() => removeDocument(item.id)} disabled={deleting === item.id}>
                    {deleting === item.id ? "Removing…" : "Remove source"}
                  </button>
                </>
              )}
            </article>
          )) : <p>No knowledge sources yet.</p>}
        </div>

        {message && <p className="account-intro">{message}</p>}
      </div>
    </section>
  );
}
