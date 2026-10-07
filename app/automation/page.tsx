"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = { id: string; name: string };
type Workflow = {
  id: string;
  project_id: string | null;
  name: string;
  description: string | null;
  status: "draft" | "active" | "paused" | "archived";
  trigger_type: "manual" | "schedule" | "webhook" | "event";
};

export default function AutomationPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [triggerType, setTriggerType] = useState<Workflow["trigger_type"]>("manual");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load(selectedProject = projectId) {
    setLoading(true);
    const [projectsResponse, workflowsResponse] = await Promise.all([
      fetch("/api/projects"),
      fetch(selectedProject ? `/api/automation?project_id=${encodeURIComponent(selectedProject)}` : "/api/automation"),
    ]);
    if (projectsResponse.ok) {
      const data = await projectsResponse.json();
      setProjects(data.projects ?? []);
    }
    if (workflowsResponse.ok) {
      const data = await workflowsResponse.json();
      setWorkflows(data.workflows ?? []);
    } else {
      setMessage("Sign in to manage automation workflows.");
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function createWorkflow(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/automation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        description: description.trim(),
        projectId: projectId || null,
        triggerType,
        definition: { steps: [] },
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      setMessage(data.error || "Could not create workflow.");
      setSaving(false);
      return;
    }
    setWorkflows((current) => [data.workflow, ...current]);
    setName("");
    setDescription("");
    setMessage("Workflow created as draft.");
    setSaving(false);
  }

  return (
    <main className="inner-page automation-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">03 · NEXORA PLATFORM</div>
      <h1>Smart <span>Automation</span></h1>
      <p className="automation-intro">Create and manage secure workflows inside your NEXORA workspace.</p>

      <section className="automation-builder">
        <div className="automation-builder-head">
          <div>
            <span className="automation-label">WORKFLOW BUILDER</span>
            <h2>Create a <span>workflow.</span></h2>
          </div>
          <span className="automation-status">● {loading ? "LOADING" : "SYSTEM READY"}</span>
        </div>

        <form className="account-form" onSubmit={createWorkflow}>
          <label>Workflow name<input value={name} onChange={(e) => setName(e.target.value)} maxLength={120} placeholder="Website content workflow" required /></label>
          <label>Description<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What should this workflow do?" /></label>
          <label>Project<select value={projectId} onChange={(e) => { setProjectId(e.target.value); load(e.target.value); }}><option value="">Workspace-wide</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label>Trigger<select value={triggerType} onChange={(e) => setTriggerType(e.target.value as Workflow["trigger_type"])}><option value="manual">Manual</option><option value="schedule">Schedule</option><option value="webhook">Webhook</option><option value="event">Event</option></select></label>
          <button className="primary-button" type="submit" disabled={saving}>{saving ? "Creating…" : "Create workflow →"}</button>
          {message && <p>{message}</p>}
        </form>
      </section>

      <section className="automation-library">
        <div className="automation-section-head">
          <div><div className="section-kicker">AUTOMATION LIBRARY</div><h2>Your <span>workflows.</span></h2></div>
          <span className="automation-count">{workflows.length} WORKFLOW{workflows.length === 1 ? "" : "S"}</span>
        </div>

        {loading ? <p>Loading workflows…</p> : workflows.length === 0 ? <p>No workflows yet. Create your first workflow above.</p> : (
          <div className="automation-grid">
            {workflows.map((workflow) => (
              <article className="automation-card" key={workflow.id}>
                <div className="automation-card-top"><span>{workflow.trigger_type.toUpperCase()}</span><b>{workflow.status.toUpperCase()}</b></div>
                <h3>{workflow.name}</h3>
                <p>{workflow.description || "NEXORA automation workflow."}</p>
                <span className="automation-select">{workflow.project_id ? projects.find((project) => project.id === workflow.project_id)?.name || "Project" : "Workspace-wide"}</span>
              </article>
            ))}
          </div>
        )}
      </section>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
