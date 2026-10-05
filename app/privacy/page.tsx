export default function PrivacyPage() {
  return (
    <main className="inner-page legal-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · LEGAL</div>
      <h1>Privacy <span>Policy.</span></h1>
      <p className="legal-intro">This page is the privacy-policy foundation for NEXORA. Final legal text and company details will be completed before public launch.</p>
      <section className="legal-card">
        <h2>Data protection</h2>
        <p>NEXORA is designed with data minimization and secure processing in mind. Account data, conversations and service information will only be processed for defined platform purposes.</p>
        <h2>AI services</h2>
        <p>AI requests may be processed by connected AI infrastructure. The final production configuration will document the applicable provider, processing purpose and retention rules.</p>
        <h2>Your rights</h2>
        <p>Users may have rights including access, correction, deletion and restriction of processing under applicable data-protection law.</p>
        <p className="legal-note">Template status: complete the responsible entity, contact details, providers and retention periods before launch.</p>
      </section>
    </main>
  );
}