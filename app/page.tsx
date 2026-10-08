import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">GLOBAL RECRUITMENT PLATFORM</div>
            <h1>
              Talent and opportunity,
              <span> intelligently</span> connected.
            </h1>
            <p>
              Find the right talent or the right job — faster, smarter, and
              without borders. NEXORA-Digital connects professionals and
              employers through trusted global opportunities.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/jobs">Find a Job</Link>
              <Link className="btn secondary" href="/register/company">Post a Job</Link>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-woman" src="/nexora-hero-woman.png" alt="NEXORA global recruitment" />
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          {[
            ["◎", "Smart Matching", "AI-powered job recommendations"],
            ["◉", "Global Reach", "Opportunities worldwide"],
            ["◇", "Trusted & Secure", "Your data, our priority"],
            ["ϟ", "Fast & Easy", "Simple. Modern. Effective."]
          ].map(([icon, title, text]) => (
            <article className="feature" key={title}>
              <div className="feature-icon">{icon}</div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><strong>12,000+</strong><span>Active Job Listings</span></div>
          <div><strong>5,000+</strong><span>Trusted Companies</span></div>
          <div><strong>250,000+</strong><span>Registered Candidates</span></div>
          <div><strong>120+</strong><span>Countries</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="badge">THE NEXORA JOURNEY</span>
          <h2>Search. Match. Apply. Hire.</h2>
          <div className="grid">
            {[
              ["Global Jobs", "Discover published opportunities from employers around the world."],
              ["AI Matching", "Connect skills and experience with relevant vacancies."],
              ["Professional CV", "Build a clear candidate profile and professional CV."],
              ["Recruiter Workspace", "Create, publish and manage vacancies and applicants."],
              ["Hiring Pipeline", "Move applications from submission through review to hire."],
              ["Verified Employers", "Company verification and moderation help build trust."]
            ].map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3><p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section plans-section">
        <div className="container card plan-card">
          <span className="badge">PLANS</span>
          <h2>Built for professionals and growing employers.</h2>
          <p className="muted">Start free as a candidate or choose a professional plan. Companies get a dedicated recruitment workspace.</p>
          <div className="actions">
            <Link className="btn primary" href="/pricing">View Plans</Link>
            <Link className="btn secondary" href="/companies">Explore Companies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
