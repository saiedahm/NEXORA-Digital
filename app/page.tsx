const pillars = [
  {n:"01", title:"Create", text:"Launch a modern digital presence from a clear idea."},
  {n:"02", title:"Transform", text:"Turn an existing website or workflow into a smarter experience."},
  {n:"03", title:"Automate", text:"Connect AI to the work that matters and reduce repetitive effort."},
  {n:"04", title:"Grow", text:"Measure, improve and evolve your digital platform continuously."},
];

export default function Home() {
  return (
    <main className="shell">
      <header className="header">
        <a className="brand" href="/" aria-label="NEXORA home"><span className="brand-mark">N</span><span>NEXORA</span></a>
        <nav><a href="#platform">Platform</a><a href="#how">How it works</a><a href="#contact">Contact</a></nav>
        <a className="header-button" href="#start">Start with NEXORA</a>
      </header>

      <section className="hero" id="start">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">AI DIGITAL PLATFORM</p>
          <h1>From idea to <span>next generation.</span></h1>
          <p className="lead">NEXORA is being built as a new-generation AI platform for creating, transforming and growing digital products.</p>
          <div className="actions">
            <a className="primary" href="#platform">Explore the platform</a>
            <a className="secondary" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="core"><b>N</b><small>AI CORE</small></div>
        </div>
      </section>

      <section className="section" id="platform">
        <div className="section-head"><p className="eyebrow">THE FOUNDATION</p><h2>One platform. Built clean from the ground up.</h2><p>No legacy architecture is being carried into the new foundation. Every layer will be added deliberately and verified before the next one.</p></div>
        <div className="grid">{pillars.map((p)=><article className="card" key={p.n}><span>{p.n}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
      </section>

      <section className="section dark" id="how">
        <div className="section-head"><p className="eyebrow">BUILD METHOD</p><h2>Stable first. Powerful next.</h2></div>
        <div className="steps"><div><b>01</b><strong>Foundation</strong><span>Clean Next.js application and deployment.</span></div><div><b>02</b><strong>Identity</strong><span>NEXORA visual system and responsive shell.</span></div><div><b>03</b><strong>Core services</strong><span>Authentication, data and AI added independently.</span></div><div><b>04</b><strong>Production</strong><span>Testing, security and real integrations.</span></div></div>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">NEXORA</p><h2>The new build starts here.</h2><p>First milestone: a clean application that builds successfully before any complex service is introduced.</p>
      </section>

      <footer><span>© 2026 NEXORA</span><span>AI Digital Platform</span></footer>
    </main>
  );
}
