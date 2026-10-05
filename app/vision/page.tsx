export default function VisionPage() {
  const principles = [
    ["01", "AI first", "Intelligent assistance should be part of the workflow, not an isolated feature."],
    ["02", "Modular by design", "Every capability can grow independently while keeping the core clean."],
    ["03", "Built for people", "Powerful technology should remain clear, useful and easy to operate."],
    ["04", "Ready to scale", "The foundation is designed so future services can connect without rebuilding everything."],
  ];

  return (
    <main className="inner-page vision-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · OUR VISION</div>
      <h1>Build the <span>next layer.</span></h1>
      <p className="vision-intro">
        NEXORA is being built from a clean technical foundation: AI, workspace and automation working together as one digital platform.
      </p>

      <section className="vision-statement">
        <span className="vision-label">THE IDEA</span>
        <h2>Technology should remove <span>friction.</span></h2>
        <p>
          Instead of collecting disconnected tools, NEXORA brings the essential digital layers into one coherent experience.
          The platform grows step by step, with every new layer connected to the same foundation.
        </p>
      </section>

      <section className="vision-principles">
        <div className="section-kicker">OUR PRINCIPLES</div>
        <div className="vision-grid">
          {principles.map(([number, title, text]) => (
            <article className="vision-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vision-roadmap">
        <div>
          <span className="vision-label">BUILD ROADMAP</span>
          <h2>Foundation <span>→</span> intelligence <span>→</span> scale.</h2>
        </div>
        <p>
          Core platform first. Real AI second. Workspace and automation next. Connected services, accounts and advanced business capabilities can then be added on top.
        </p>
      </section>

      <div className="hero-actions">
        <a className="primary-button" href="/ai-studio">Open AI Studio <span>→</span></a>
        <a className="secondary-button" href="/">Back to platform</a>
      </div>
    </main>
  );
}
