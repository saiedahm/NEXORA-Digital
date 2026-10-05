export default function Home() {
  return (
    <main className="site-shell">
      <header className="nav">
        <a className="logo" href="/">NEXORA</a>
        <nav aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#vision">Vision</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-button" href="#contact">Get started</a>
      </header>

      <section className="hero" id="platform">
        <div className="eyebrow"><span /> AI-powered digital platform</div>
        <h1>From idea to <span>next generation.</span></h1>
        <p className="hero-copy">
          NEXORA is being built from the ground up to make modern digital work
          simpler, smarter and ready for what comes next.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#contact">Explore NEXORA <span>→</span></a>
          <a className="secondary-button" href="#vision">Our vision</a>
        </div>
        <div className="hero-note">Neue Plattform · Sauber von Grund auf entwickelt</div>
      </section>

      <section className="feature-grid" id="vision">
        <article><div className="feature-number">01</div><h2>AI first</h2><p>Intelligent technology at the core of the platform.</p></article>
        <article><div className="feature-number">02</div><h2>Built clean</h2><p>A fresh foundation designed for reliable growth.</p></article>
        <article><div className="feature-number">03</div><h2>Made modern</h2><p>A focused experience without unnecessary complexity.</p></article>
      </section>

      <footer id="contact">
        <div><strong>NEXORA</strong><span>Digital. Intelligent. Next.</span></div>
        <span>© {new Date().getFullYear()} NEXORA</span>
      </footer>
    </main>
  );
}
