export default function ImprintPage() {
  return (
    <main className="inner-page legal-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · LEGAL</div>
      <h1>Imprint <span>/ Impressum.</span></h1>
      <p className="legal-intro">Legal provider information will be published here before NEXORA is made publicly available.</p>
      <section className="legal-card">
        <h2>Provider</h2>
        <p>NEXORA / digitalfuture</p>
        <p>Registered company details and responsible person: to be inserted after company registration.</p>
        <h2>Contact</h2>
        <p>Official business address, email address and other mandatory contact information will be added here.</p>
        <p className="legal-note">Template status: do not publish this page as the final Impressum until the registered company information is inserted.</p>
      </section>
    </main>
  );
}