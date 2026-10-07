import Link from "next/link";

export default function Impressum() {
  return (
    <main className="legal-page">
      <a className="back-link" href="/">← NEXORA</a>
      <section className="legal-card">
        <div className="legal-meta">LEGAL · 01</div>
        <h1>Impressum<span>.</span></h1>
        <p>Angaben gemäß den gesetzlichen Vorschriften.</p>
        <h2>Anbieter</h2>
        <p>Digitalfuture / NEXORA DIGITAL</p>
        <p>Die vollständigen Unternehmens-, Register- und Kontaktdaten werden nach Abschluss der Unternehmensgründung hier veröffentlicht.</p>
        <h2>Kontakt</h2>
        <p>Bitte verwenden Sie bis zur finalen Veröffentlichung die offizielle Kontaktseite.</p>
        <div className="legal-nav">
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/widerruf">Widerruf</Link>
          <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link>
        </div>
      </section>
    </main>
  );
}
