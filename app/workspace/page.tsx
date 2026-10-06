"use client";

import { FormEvent, useState } from "react";

const stages = [
  ["01", "Project brief", "Define the business, audience and goals."],
  ["02", "AI direction", "Turn the brief into a clear digital direction."],
  ["03", "Structure", "Plan pages, content and user journeys."],
  ["04", "Build", "Prepare the website for implementation."]
];

export default function WorkspacePage() {
  const [project, setProject] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!project.trim()) return;
    setSaved(true);
  }

  return (
    <main className="workspace-page">
      <header className="workspace-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <nav>
          <a href="/platform">Platform</a>
          <a href="/ai-studio">AI Studio</a>
          <a href="/pricing">Plans</a>
        </nav>
        <a className="secondary-button" href="/assistant">AI Assistant</a>
      </header>

      <section className="workspace-hero">
        <div>
          <p className="section-label">PROJECT WORKSPACE</p>
          <h1>Turn your idea into a digital project.</h1>
          <p>
            Start with a simple project brief. NEXORA will use it as the
            foundation for the next stages of your website.
          </p>
        </div>
        <div className="workspace-status">
          <span />
          WORKSPACE READY
        </div>
      </section>

      <section className="workspace-grid">
        <form className="project-card" onSubmit={submit}>
          <div className="card-heading">
            <div>
              <p className="section-label">NEW PROJECT</p>
              <h2>What are you building?</h2>
            </div>
            <span className="project-number">NEXORA / 01</span>
          </div>

          <label htmlFor="project">Project brief</label>
          <textarea
            id="project"
            value={project}
            onChange={(event) => {
              setProject(event.target.value);
              setSaved(false);
            }}
            placeholder="Example: I need a modern website for a dental clinic in Germany..."
          />

          <div className="brief-hint">
            <span>AI</span>
            Describe your idea naturally. You do not need technical knowledge.
          </div>

          <button className="primary-button workspace-submit" type="submit">
            Create project <span>→</span>
          </button>

          {saved && (
            <div className="project-created">
              <strong>Project brief saved.</strong>
              <span>Your project is ready for the AI direction stage.</span>
            </div>
          )}
        </form>

        <aside className="roadmap-card">
          <p className="section-label">PROJECT ROADMAP</p>
          <h2>From idea to launch.</h2>
          <div className="roadmap">
            {stages.map(([number, title, description], index) => (
              <div className={index === 0 && saved ? "roadmap-step active" : "roadmap-step"} key={number}>
                <span className="step-number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="workspace-bottom">
        <div>
          <p className="section-label">NEXT GENERATION WORKFLOW</p>
          <h2>Your project stays organized from the first idea to the final website.</h2>
        </div>
        <a className="primary-button" href="/ai-studio">Open AI Studio <span>→</span></a>
      </section>
    </main>
  );
}
