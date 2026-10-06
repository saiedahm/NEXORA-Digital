"use client";

import { FormEvent, useState } from "react";

export default function CreateProjectForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("Creating…");
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      setStatus(data.error || "Could not create project.");
      return;
    }
    setStatus("Project created. Refresh the workspace to see it.");
    setName("");
    setDescription("");
  }

  if (!open) return <button className="secondary-button" type="button" onClick={() => setOpen(true)}>＋ New project</button>;

  return (
    <form className="account-form" onSubmit={submit}>
      <label>Project name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="My first project" required /></label>
      <label>Description<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you building?" /></label>
      <button className="primary-button" type="submit">Create project →</button>
      {status && <p>{status}</p>}
    </form>
  );
}
