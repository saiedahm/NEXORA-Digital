import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Create",
    text: "Build a modern website from a clear idea, business goal, or simple brief."
  },
  {
    number: "02",
    title: "Renew",
    text: "Transform an existing website into a faster, cleaner, next-generation experience."
  },
  {
    number: "03",
    title: "Grow",
    text: "Manage your digital projects from one intelligent workspace as NEXORA evolves."
  }
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="nav">
        <a className="brand" href="/" aria-label="NEXORA DIGITAL home">
          <Image
            src="/nexora-logo.png"
            alt="NEXORA DIGITAL"
            width={170}
            height={62}
            priority
          />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#create">Create</a>
          <a href="#renew">Renew</a>
          <a href="#platform">Platform</a>
          <a href="#pricing">Plans</a>
        </nav>

        <a className="nav-button" href="#start">
          Get started
        </a>
      </header>

      <section className="hero" id="start">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="pulse" />
            AI DIGITAL PLATFORM
          </div>

          <h1>
            From old
            <span>to next-gen.</span>
          </h1>

          <p>
            Create, renew, and evolve your website with an intelligent digital
            platform built for the next generation.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#create">
              Start your project <span>→</span>
            </a>
            <a className="secondary-button" href="#platform">
              Explore NEXORA
            </a>
          </div>

          <div className="hero-note">
            <span>✦</span> AI-assisted. Human-directed. Built for growth.
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="grid-plane" />
          <div className="visual-card card-main">
            <div className="mini-label">NEXORA AI</div>
            <div className="visual-title">Digital transformation</div>
            <div className="visual-line long" />
            <div className="visual-line medium" />
            <div className="visual-line short" />
            <div className="visual-status">
              <span className="status-dot" />
              Ready to build
            </div>
          </div>
          <div className="visual-card card-small">
            <span>AI</span>
            <strong>Studio</strong>
          </div>
        </div>
      </section>

      <section className="intro-section" id="platform">
        <div>
          <p className="section-label">THE NEXORA WAY</p>
          <h2>One platform for your digital next step.</h2>
        </div>
        <p>
          NEXORA is designed around one simple idea: your website should not
          hold your business back. Start new, modernize what you have, and
          continue improving from one focused workspace.
        </p>
      </section>

      <section className="services" id="create">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <span className="service-number">{service.number}</span>
            <div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
            <span className="service-arrow">↗</span>
          </article>
        ))}
      </section>

      <section className="cta" id="renew">
        <div>
          <p className="section-label">READY FOR THE NEXT VERSION?</p>
          <h2>Your digital future starts here.</h2>
        </div>
        <a className="primary-button" href="#start">
          Begin with NEXORA <span>→</span>
        </a>
      </section>

      <footer id="pricing">
        <div className="footer-brand">NEXORA DIGITAL</div>
        <p>AI-powered website creation &amp; renewal.</p>
        <span>© 2026 NEXORA DIGITAL</span>
      </footer>
    </main>
  );
}
