const modules = [
  { number: "01", title: "AI Studio", text: "Create, improve and transform digital work with intelligent tools.", href: "/ai-studio" },
  { number: "02", title: "Digital Workspace", text: "A clear foundation for projects, content and the work that moves them forward.", href: "/workspace" },
  { number: "03", title: "Smart Automation", text: "Turn repetitive digital processes into simpler, connected workflows.", href: "/automation" },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="nav">
        <a className="brand-lockup" href="/" aria-label="NEXORA"><span className="brand-logo"><img src="https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsimagesnexora-logo.png" alt="NEXORA" /></span><strong>NEXORA</strong></a>
        <nav aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#modules">Solutions</a>
          <a href="/vision">Vision</a>
          <a href="/contact">Contact</a>
          <a href="/account">Account</a>
        </nav>
        <a className="nav-button" href="/pricing">Plans</a>
      </header>

      <section className="hero" id="platform">
        <div className="eyebrow"><span /> AI-powered digital platform</div>
        <h1>From idea to <span>next generation.</span></h1>
        <p className="hero-copy">
          NEXORA brings intelligent digital tools into one modern foundation —
          designed to create, improve and move digital work forward.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#modules">Explore NEXORA <span>→</span></a>
          <a className="secondary-button" href="#vision">Our vision</a>
        </div>
        <div className="hero-note">Neue Plattform · Sauber von Grund auf entwickelt</div>
      </section>

      <section className="section-intro" id="modules">
        <div className="section-kicker">THE NEXORA PLATFORM</div>
        <h2>One foundation.<br /><span>Many possibilities.</span></h2>
        <p>Built modularly, so every part of NEXORA can grow without making the platform harder to use.</p>
      </section>

      <section className="module-grid">
        {modules.map((module) => (
          <a className="module-card" href={module.href} key={module.number}>
            <div className="module-top">
              <span className="feature-number">{module.number}</span>
              <span className="module-arrow">↗</span>
            </div>
            <h3>{module.title}</h3>
            <p>{module.text}</p>
          </a>
        ))}
      </section>

      <section className="vision-band" id="vision">
        <div>
          <div className="section-kicker">OUR VISION</div>
          <h2>Digital work should feel <span>simple.</span></h2>
        </div>
        <p>
          NEXORA is being built step by step: a clean technical core first,
          then powerful capabilities around it. No unnecessary legacy. No shortcuts.
        </p>
      </section>

      <footer id="contact">
        <div className="footer-brand"><a className="brand-lockup" href="/" aria-label="NEXORA"><span className="brand-logo footer-brand-logo"><img src="https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsimagesnexora-logo.png" alt="NEXORA" /></span><strong>NEXORA</strong></a></div>
        <a href="/contact">Contact NEXORA →</a>
        <span>© {new Date().getFullYear()} NEXORA</span>
      </footer>
    </main>
  );
}
