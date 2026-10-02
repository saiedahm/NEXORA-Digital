"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Project = {
  id: string; name: string; description: string | null; type: string | null;
  status: string; paymentStatus: string; executionUnlocked: boolean; progress: number;
};

export default function DashboardClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState(""); const [description, setDescription] = useState(""); const [type, setType] = useState("");
  const [loading, setLoading] = useState(true); const [creating, setCreating] = useState(false); const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setError("");
      const response = await fetch("/api/projects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load projects.");
      setProjects(data.projects ?? []);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load projects."); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadProjects(); }, []);

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) { setError("Please enter a project name."); return; }
    try {
      setCreating(true); setError("");
      const response = await fetch("/api/projects", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:name.trim(),description:description.trim()||undefined,type:type.trim()||undefined})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create project.");
      setProjects(current => [data.project, ...current]); setName(""); setDescription(""); setType("");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to create project."); }
    finally { setCreating(false); }
  }

  return <main className="nexora-dashboard">
    <div className="nexora-dashboard-inner">
      <header className="nexora-dashboard-header">
        <div><p className="nexora-dashboard-kicker">NEXORA DIGITAL · CUSTOMER AREA</p><h1>Dashboard</h1><p>Create and manage your AI projects.</p></div>
        <Link href="/" className="nexora-dashboard-back">Back to website</Link>
      </header>

      <section className="nexora-dashboard-stats">
        <div><span>Projects</span><strong>{projects.length}</strong></div>
        <div><span>AI Managers</span><strong>15</strong></div>
        <div><span>Execution</span><strong>{projects.some(p=>p.executionUnlocked)?"Ready":"Locked"}</strong></div>
      </section>

      <section className="nexora-dashboard-panel">
        <div className="nexora-dashboard-section-title"><div><p>PROJECT WORKSPACE</p><h2>Create a project</h2></div></div>
        <form onSubmit={createProject} className="nexora-project-form">
          <label>Project name<input value={name} onChange={e=>setName(e.target.value)} placeholder="My new project" maxLength={120}/></label>
          <label>Project type<input value={type} onChange={e=>setType(e.target.value)} placeholder="Website, app, online platform..." maxLength={100}/></label>
          <label className="nexora-project-description">Project brief<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe what you want NEXORA to build..." maxLength={5000} rows={5}/></label>
          {error && <div className="nexora-dashboard-error">{error}</div>}
          <button type="submit" disabled={creating}>{creating ? "Creating..." : "Create Project"}</button>
        </form>
      </section>

      <section className="nexora-projects-section">
        <div className="nexora-dashboard-section-title"><div><p>YOUR WORK</p><h2>Your Projects</h2></div>{loading && <span>Loading...</span>}</div>
        {!loading && projects.length===0 && <div className="nexora-empty-projects">No projects yet. Create your first NEXORA project above.</div>}
        <div className="nexora-project-list">{projects.map(project=><Link key={project.id} href={`/dashboard/${project.id}`} className="nexora-project-card">
          <div><h3>{project.name}</h3>{project.description&&<p>{project.description}</p>}</div>
          <div className="nexora-project-tags"><span>{project.status}</span><span>Payment: {project.paymentStatus}</span><span>{project.executionUnlocked?"Execution unlocked":"Execution locked"}</span></div>
          <div className="nexora-progress"><div><span>Progress</span><b>{project.progress}%</b></div><i><em style={{width:`${Math.min(Math.max(project.progress,0),100)}%`}}/></i></div>
        </Link>)}</div>
      </section>
    </div>
  </main>;
}
