const features = [
  ["AI Studio", "Turn ideas and existing websites into clear, structured digital projects."],
  ["Project Workspace", "Keep projects, progress, decisions, and future improvements in one place."],
  ["Smart Renewal", "Plan the modernization of an existing website without starting from zero."],
  ["Growth Ready", "Move from a simple website to a complete digital platform when your business is ready."]
];

export default function PlatformPage() {
  return (
    <main className="product-page">
      <a className="back-link" href="/">← NEXORA DIGITAL</a>
      <section className="product-hero">
        <p className="section-label">NEXORA PLATFORM</p>
        <h1>A smarter way to build your digital future.</h1>
        <p>
          The NEXORA platform is designed as a focused workspace for creating,
          renewing, and managing modern websites.
        </p>
      </section>

      <section className="feature-grid">
        {features.map(([title, text], index) => (
          <article className="feature-panel" key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="product-bottom">
        <div>
          <p className="section-label">NEXT STEP</p>
          <h2>Your workspace will grow with your project.</h2>
        </div>
        <a className="primary-button" href="/">Back to NEXORA <span>→</span></a>
      </section>
    </main>
  );
}
