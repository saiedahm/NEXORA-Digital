"use client";

import { useState } from "react";

const initialProjects = [
  { name: "My first website", type: "New project", status: "Ready to start" },
  { name: "Website renewal", type: "Renewal", status: "Planning" }
];

export default function DashboardPage() {
  const [projects] = useState(initialProjects);

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <a className="dashboard-logo" href="/">NEXORA</a>
        <p className="dashboard-label">WORKSPACE</p>
        <a className="dashboard-link active" href="/dashboard">Overview</a>
        <a className="dashboard-link" href="/workspace">Projects</a>
        <a className="dashboard-link" href="/ai-studio">AI Studio</a>
        <a className="dashboard-link" href="/assistant">AI Assistant</a>
        <a className="dashboard-link" href="/pricing">Plans</a>
        <div className="dashboard-spacer" />
        <a className="dashboard-link" href="/">Back to website</a>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="section-label">NEXORA WORKSPACE</p>
            <h1>Good to see you.</h1>
          </div>
          <a className="primary-button" href="/workspace">New project <span>+</span></a>
        </header>

        <section className="dashboard-welcome">
          <div>
            <p className="section-label">AI DIGITAL WORKSPACE</p>
            <h2>Build your next digital experience.</h2>
            <p>Start a project, explore AI Studio, or ask NEXORA Assistant for guidance.</p>
          </div>
          <a href="/assistant" className="welcome-action">Ask AI →</a>
        </section>

        <section className="dashboard-stats">
          <div><span>PROJECTS</span><strong>{projects.length}</strong></div>
          <div><span>AI USAGE</span><strong>0%</strong></div>
          <div><span>PLAN</span><strong>FREE</strong></div>
        </section>

        <section className="projects-section">
          <div className="projects-title">
            <div><p className="section-label">YOUR PROJECTS</p><h2>Recent work</h2></div>
            <a href="/workspace">View workspace →</a>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.name}>
                <div><strong>{project.name}</strong><span>{project.type}</span></div>
                <span className="project-status">{project.status}</span>
                <a href="/workspace">Open →</a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
