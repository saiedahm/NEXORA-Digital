"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  brief: string;
  status: string;
};

const stages = [
  ["01", "Project brief", "Define the business, audience and goals."],
  ["02", "AI direction", "Turn the brief into a clear digital direction."],
  ["03", "Structure", "Plan pages, content and user journeys."],
  ["04", "Build", "Prepare the website for implementation."]
];

export default function WorkspacePage() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brief = params.get("brief");
    if (brief) setProject(brief);

    try {
      const stored = window.localStorage.getItem("nexora-projects");
      if (stored) setProjects(JSON.parse(stored));
    } catch {
      setProjects([]);
    }
  }, []);

  function createProject(event: FormEvent) {
    event.preventDefault();
    const brief = project.trim();
    if (!brief) return;

    const newProject: Project = {
      id: String(Date.now()),
      name: brief.length > 45 ? brief.slice(0, 45) + "…" : brief,
      brief,
      status: "Brief ready"
    };

    const next = [newProject, ...projects];
    setProjects(next);
    setSelected(newProject.id);
    setSaved(true);
    try {
      window.localStorage.setItem("nexora-projects", JSON.stringify(next));
    } catch {}
  }

  return (
    <main className="workspace-page">
      <header className="workspace-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/ai-studio">AI Studio</a>
          <a href="/pricing">Plans</a>
        </nav>
        <a className="secondary-button" href="/assistant">AI Assistant</a>
      </header>

      <section className="workspace-hero">
        <div>
          <p className="section-label">PROJECT WORKSPACE</p>
          <h1>Turn your idea into a digital project.</h1>
          <p>Start with a simple project brief. NEXORA keeps the project organized through every stage.</p>
        </div>
        <div className="workspace-status"><span /> WORKSPACE READY</div>
      </section>

      <section className="workspace-grid">
        <form className="project-card" onSubmit={createProject}>
          <div className="card-heading">
            <div><p className="section-label">NEW PROJECT</p><h2>What are you building?</h2></div>
            <span className="project-number">NEXORA / {String(projects.length + 1).padStart(2, "0")}</span>
          </div>

          <label htmlFor="project">Project brief</label>
          <textarea
            id="project"
            value={project}
            onChange={(event) => { setProject(event.target.value); setSaved(false); }}
            placeholder="Example: I need a modern website for a dental clinic in Germany..."
          />

          <div className="brief-hint"><span>AI</span> Describe your idea naturally. No technical knowledge required.</div>
          <button className="primary-button workspace-submit" type="submit">Create project <span>→</span></button>

          {saved && <div className="project-created"><strong>Project created.</strong><span>Its brief is saved on this device and ready for the next stage.</span></div>}
        </form>

        <aside className="roadmap-card">
          <p className="section-label">PROJECT ROADMAP</p>
          <h2>From idea to launch.</h2>
          <div className="roadmap">
            {stages.map(([number, title, description], index) => (
              <div className={index === 0 && (saved || selected) ? "roadmap-step active" : "roadmap-step"} key={number}>
                <span className="step-number">{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="saved-projects">
        <div className="projects-title">
          <div><p className="section-label">PROJECTS</p><h2>Your projects</h2></div>
          <span>{projects.length} saved</span>
        </div>

        {projects.length === 0 ? (
          <div className="empty-projects">No projects yet. Create your first project above.</div>
        ) : (
          <div className="saved-project-list">
            {projects.map((item) => (
              <button
                type="button"
                className={selected === item.id ? "saved-project selected" : "saved-project"}
                key={item.id}
                onClick={() => { setSelected(item.id); setProject(item.brief); setSaved(false); }}
              >
                <span className="saved-project-index">NEXORA / {item.id.slice(-2)}</span>
                <strong>{item.name}</strong>
                <span>{item.status}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="workspace-bottom">
        <div><p className="section-label">NEXT GENERATION WORKFLOW</p><h2>Your project stays organized from the first idea to the final website.</h2></div>
        <a className="primary-button" href="/ai-studio">Open AI Studio <span>→</span></a>
      </section>
    </main>
  );
}
