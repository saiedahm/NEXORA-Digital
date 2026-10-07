"use client";

import { useRef, useState } from "react";

type Props = {
  onImported: (document: Record<string, unknown>) => void;
};

export default function KnowledgeFileImport({ onImported, projectId = "" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function uploadFile(event: React.FormEvent) {
    event.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage("Choose a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("file", file);\n      if (projectId) form.append("project_id", projectId);

      const response = await fetch("/api/knowledge/import-file", {
        method: "POST",
        body: form,
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Unable to import this file.");
        return;
      }

      onImported(data.document);
      if (inputRef.current) inputRef.current.value = "";
      setMessage("File imported into your Knowledge Base.");
    } catch {
      setMessage("Unable to import this file.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={uploadFile}>
      <label className="account-label" htmlFor="knowledge-file">IMPORT KNOWLEDGE FILE</label>
      <input
        ref={inputRef}
        id="knowledge-file"
        type="file"
        accept=".txt,.md,.csv,.json,text/plain,text/markdown,text/csv,application/json"
        required
      />
      <p className="muted-copy">TXT, Markdown, CSV or JSON · max 2 MB</p>
      <button className="secondary-button" disabled={uploading}>
        {uploading ? "Importing…" : "Import file →"}
      </button>
      {message ? <p className="muted-copy">{message}</p> : null}
    </form>
  );
}
