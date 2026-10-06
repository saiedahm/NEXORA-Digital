"use client";

import { useEffect, useState } from "react";

type Project = { id: string; name: string; brief: string; status: string };

const recommendations = [
  "Use a clear homepage focused on the main customer action.",
  "Keep the visual language modern, fast, and mobile-first.",
  "Organize content around customer needs instead of technical features."
];

export default function ProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("id");
      const stored = window.localStorage.getItem("nexora-projects");
      const projects: Project[] = stored ? JSON.parse(stored) : [];
      setProject(projects.find((item) => item.id === id) || projects[0] || null);
    } catch {
      setProject(null);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) return <main className="project-page"><div className="project-loading">Loading project...</div></main>;

  if (!project) {
    return (
      <main className="project-page">
        <div className="project-empty">
          <p className="section-label">PROJECT NOT FOUND</p>
          <h1>Start with a new NEXORA project.</h1>
          <a className="primary-button" href="/workspace">Open Workspace <span>→</span></a>
        </div>
      </main>
    );
  }

  return (
    <main className="project-page">
      <header className="project-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <div className="project-nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/workspace">Projects</a>
          <a href="/assistant">AI Assistant</a>
        </div>
      </header>

      <section className="project-header">
        <div>
          <p className="section-label">PROJECT / AI DIRECTION</p>
          <h1>{project.name}</h1>
          <p>{project.brief}</p>
        </div>
        <span className="project-live"><i /> BRIEF READY</span>
      </section>

      <section className="project-content">
        <div className="direction-card">
          <div className="card-title">
            <div><p className="section-label">AI DIRECTION</p><h2>Your project direction</h2></div>
            <span>01 / 04</span>
          </div>

          <div className="direction-preview">
            <div className="preview-orb" />
            <div>
              <span>PROJECT FOUNDATION</span>
              <h3>Modern digital experience</h3>
              <p>NEXORA will use your brief as the foundation for structure, content, visual direction, and the next build stage.</p>
            </div>
          </div>

          <button className="primary-button direction-button" type="button" onClick={() => setReady(true)}>
            Continue to structure <span>→</span>
          </button>
        </div>

        <aside className="recommendation-card">
          <p className="section-label">AI RECOMMENDATIONS</p>
          <h2>Initial guidance</h2>
          <div className="recommendations">
            {recommendations.map((item, index) => (
              <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
            ))}
          </div>
        </aside>
      </section>

      <section className="project-progress">
        {["Brief", "AI Direction", "Structure", "Build"].map((item, index) => (
          <div className={index === 0 ? "progress-item complete" : index === 1 ? "progress-item current" : "progress-item"} key={item}>
            <span>0{index + 1}</span><strong>{item}</strong>
          </div>
        ))}
      </section>
    </main>
  );
}
