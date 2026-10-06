const modes = [
  {
    title: "Create a new website",
    text: "Describe your business and let NEXORA help shape the structure, experience, and visual direction.",
    icon: "✦"
  },
  {
    title: "Renew an existing website",
    text: "Bring an old website forward with a clearer structure, modern design, and smarter digital experience.",
    icon: "↗"
  }
];

export default function AIStudioPage() {
  return (
    <main className="studio">
      <aside className="studio-side">
        <a className="studio-logo" href="/">NEXORA</a>
        <div className="studio-side-label">AI STUDIO</div>
        <a className="studio-nav active" href="/ai-studio">Studio</a>
        <a className="studio-nav" href="/dashboard">Projects</a>
        <a className="studio-nav" href="/pricing">Plans</a>
        <div className="studio-side-bottom">
          <span className="online-dot" /> AI system ready
        </div>
      </aside>

      <section className="studio-main">
        <header className="studio-header">
          <div>
            <p className="section-label">NEXORA AI STUDIO</p>
            <h1>What are we building?</h1>
          </div>
          <a href="/dashboard" className="secondary-button">← Workspace</a>
        </header>

        <div className="studio-layout">
          <section className="studio-center">
            <div className="mode-grid">
              {modes.map((mode) => (
                <article className="mode-card" key={mode.title}>
                  <span className="mode-icon">{mode.icon}</span>
                  <h2>{mode.title}</h2>
                  <p>{mode.text}</p>
                  <button type="button">Choose direction <span>→</span></button>
                </article>
              ))}
            </div>

            <div className="prompt-box">
              <div className="prompt-top">
                <span>YOUR PROJECT BRIEF</span>
                <span className="prompt-ai">✦ AI READY</span>
              </div>
              <textarea
                aria-label="Project brief"
                placeholder="Tell NEXORA about your business, website, goals, style, or what you want to improve..."
              />
              <div className="prompt-bottom">
                <span>Describe your idea in your own words.</span>
                <button type="button" className="primary-button">Start with AI <span>→</span></button>
              </div>
            </div>
          </section>

          <aside className="studio-insight">
            <div className="insight-label">PROJECT INSIGHT</div>
            <div className="insight-orb">✦</div>
            <h2>Your AI workspace will appear here.</h2>
            <p>
              Once a project starts, NEXORA will organize the brief, direction,
              tasks, and next steps in one focused space.
            </p>
            <div className="insight-list">
              <div><span>01</span> Project direction</div>
              <div><span>02</span> AI recommendations</div>
              <div><span>03</span> Build roadmap</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
