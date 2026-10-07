"use client";

import { useState } from "react";

type Project = {
  id: string;
  name: string;
  description: string | null;
};

export default function ProjectManager({ projects }: { projects: Project[] }) {
  const [items, setItems] = useState(projects);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function startEdit(project: Project) {
    setEditing(project.id);
    setName(project.name);
    setDescription(project.description || "");
    setStatus("");
  }

  async function save() {
    if (!editing || !name.trim()) return;
    setStatus("Saving…");
    const response = await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: editing, name: name.trim(), description }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      setStatus(data.error || "Could not update project.");
      return;
    }
    setItems((current) => current.map((item) => item.id === editing ? data.project : item));
    setEditing(null);
    setStatus("Project updated.");
  }

  if (!items.length) {
    return (
      <article className="feature-card">
        <span>PROJECTS</span>
        <h3>Create a project</h3>
        <p>Start a project and keep its data inside your NEXORA organization.</p>
      </article>
    );
  }

  return (
    <>
      {items.map((project) => (
        <article className="feature-card" key={project.id}>
          {editing === project.id ? (
            <div className="account-form">
              <span className="account-label">EDIT PROJECT</span>
              <label>Project name<input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} /></label>
              <label>Description<input value={description} onChange={(e) => setDescription(e.target.value)} /></label>
              <div>
                <button className="primary-button" type="button" onClick={save}>Save changes →</button>
                <button className="secondary-button" type="button" onClick={() => setEditing(null)}>Cancel</button>
              </div>
              {status && <p>{status}</p>}
            </div>
          ) : (
            <>
              <span>PROJECT</span>
              <h3>{project.name}</h3>
              <p>{project.description || "NEXORA project workspace."}</p>
              <button className="secondary-button" type="button" onClick={() => startEdit(project)}>Edit project →</button>
            </>
          )}
        </article>
      ))}
    </>
  );
}
