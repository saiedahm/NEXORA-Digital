import { BrandLogo } from "@/components/brand/BrandLogo";

const agents = ["Alex", "Nora", "Leo", "Mia", "Lina", "Aria", "Eli", "Zoe", "Max", "Kai", "Iris", "Adam", "Ryan", "Luna", "Atlas"];
const services = ["Websites & modernization", "AI integration & automation", "SEO, analytics & marketing"];
const steps = ["Describe your business", "Confirm payment", "Alex creates the plan", "Agents execute and report"];
const plans = [
  ["Starter", "€99/month"],
  ["Business", "€299/month"],
  ["Growth", "€699/month"],
  ["Enterprise", "Custom"],
];

const HERO_VIDEO_SRC = "https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsvideonexora-hero.mp4";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <BrandLogo width={165} />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#how">How It Works</a>
            <a href="#team">AI Team</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <a className="header-cta" href="#pricing">Get Started</a>
        </div>
      </header>

      <section className="hero" aria-label="NEXORA DIGITAL hero">
        <video className="hero-media" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-copy">
            <p className="eyebrow">AI + WEB + AUTOMATION</p>
            <h1>Your Business.<br /><span className="gradient-text">Built. Managed. Grown.</span><br />By AI.</h1>
            <p className="hero-description">NEXORA DIGITAL connects real AI agents, real workflows, real tools and real project execution.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#pricing">Start with NEXORA</a>
              <a className="secondary-button" href="#how">See how it works</a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-panel-glow" />
            <BrandLogo width={260} linkToHome={false} />
            <p>AI-powered digital transformation</p>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">THE WORKFLOW</p>
            <h2>How It Works</h2>
            <p>From your first idea to a managed digital project, every stage follows a clear workflow.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <article className="card step-card" key={step}>
                <span className="step-number">0{index + 1}</span>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">NEXORA AI TEAM</p>
            <h2>The AI Team</h2>
            <p>15 specialized managers operating under controlled permissions and real task state.</p>
          </div>
          <div className="team-grid">
            {agents.map((agent) => (
              <article className="card team-card" key={agent}>
                <div className="agent-avatar">{agent.charAt(0)}</div>
                <div><strong>{agent}</strong><span>AI Manager</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">WHAT WE DO</p>
            <h2>Services</h2>
            <p>Digital products, modernization and automation connected to one execution system.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="card service-card" key={service}>
                <span className="service-icon">0{index + 1}</span>
                <h3>{service}</h3>
                <p>Executed through the NEXORA project workflow and recorded as real system state.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">SIMPLE PLANS</p>
            <h2>Plans</h2>
            <p>Choose the level of digital execution that matches your project.</p>
          </div>
          <div className="pricing-grid">
            {plans.map(([name, price], index) => (
              <article className={`card pricing-card ${index === 1 ? "featured" : ""}`} key={name}>
                {index === 1 && <span className="featured-label">POPULAR</span>}
                <h3>{name}</h3>
                <div className="price">{price}</div>
                <a className="plan-button" href="/login">Choose plan</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <BrandLogo width={150} />
          <p>© NEXORA DIGITAL 2026. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
