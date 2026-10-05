const projects = [
  { name: "NEXORA Platform", type: "Digital platform", status: "ACTIVE", detail: "Core platform rebuild", href: "/ai-studio" },
  { name: "AI Studio", type: "AI workspace", status: "READY", detail: "Prompt and conversation workspace", href: "/ai-studio" },
  { name: "Smart Automation", type: "Automation", status: "NEXT", detail: "Workflow foundation", href: "/automation" },
];

export default function WorkspacePage() {
  return (
    <main className="inner-page workspace-page">
      <a className="back-link" href="/">← NEXORA</a>

      <div className="inner-kicker">02 · NEXORA PLATFORM</div>
      <h1>Digital <span>Workspace</span></h1>
      <p className="workspace-intro">
        One place for your digital projects, AI work and the systems you build with NEXORA.
      </p>

      <section className="workspace-overview">
        <div className="workspace-overview-card">
          <span className="workspace-label">WORKSPACE STATUS</span>
          <strong>FOUNDATION READY</strong>
          <p>The workspace is being built as a clean, modular layer around NEXORA AI.</p>
        </div>
        <a className="workspace-action" href="/ai-studio">
          Open AI Studio <span>↗</span>
        </a>
      </section>

      <section className="workspace-projects">
        <div className="workspace-section-head">
          <div>
            <div className="section-kicker">YOUR WORK</div>
            <h2>Projects &amp; <span>modules.</span></h2>
          </div>
          <span className="workspace-count">03 MODULES</span>
        </div>

        <div className="workspace-grid">
          {projects.map((project, index) => (
            <a className="workspace-card" href={project.href} key={project.name}>
              <div className="workspace-card-top">
                <span>0{index + 1}</span>
                <b>{project.status}</b>
              </div>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              <small>{project.type}</small>
              <span className="workspace-card-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="workspace-next">
        <span className="workspace-label">NEXT LAYER</span>
        <h2>Build. Organize. <span>Automate.</span></h2>
        <p>
          The next workspace layers will add project data, saved work and connected automation without changing the clean foundation.
        </p>
      </section>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
