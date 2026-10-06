const projects = [
  { name: "My first website", type: "New project", status: "Ready to start" },
  { name: "Website renewal", type: "Renewal", status: "Planning" }
];

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <aside className="dashboard-side">
        <a className="dash-brand" href="/">NEXORA</a>
        <nav>
          <a className="active" href="/dashboard">Overview</a>
          <a href="/dashboard">Projects</a>
          <a href="/platform">AI Studio</a>
          <a href="/pricing">Plans</a>
          <a href="/dashboard">Account</a>
        </nav>
        <a className="side-home" href="/">← Back to website</a>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-top">
          <div>
            <p className="section-label">WORKSPACE</p>
            <h1>Good to see you.</h1>
          </div>
          <div className="profile-chip">
            <span className="profile-avatar">N</span>
            <span>My account</span>
          </div>
        </header>

        <div className="welcome-card">
          <div>
            <span className="ai-badge">✦ NEXORA AI</span>
            <h2>What will you build next?</h2>
            <p>Start a new website or bring an existing project into the next generation.</p>
          </div>
          <a className="primary-button" href="#new-project">New project <span>→</span></a>
        </div>

        <div className="dashboard-stats">
          <article><span>PROJECTS</span><strong>0</strong><small>Active projects</small></article>
          <article><span>AI USAGE</span><strong>0%</strong><small>Starter allowance</small></article>
          <article><span>PLAN</span><strong>Free</strong><small>Foundation access</small></article>
        </div>

        <section className="projects">
          <div className="section-heading">
            <div>
              <p className="section-label">YOUR WORKSPACE</p>
              <h2>Projects</h2>
            </div>
            <a className="secondary-button" href="#new-project">+ New project</a>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.name}>
                <div className="project-icon">N</div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.type}</p>
                </div>
                <span className="project-status">{project.status}</span>
                <span className="project-arrow">→</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
