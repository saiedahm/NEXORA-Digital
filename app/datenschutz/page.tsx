import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="legal-page">
      <a className="back-link" href="/">← NEXORA</a>
      <section className="legal-card">
        <div className="legal-meta">LEGAL · 02</div>
        <h1>Datenschutz<span>.</span></h1>
        <p>Der Schutz personenbezogener Daten ist ein zentraler Bestandteil von NEXORA DIGITAL.</p>
        <h2>Grundsätze</h2>
        <p>Wir verarbeiten personenbezogene Daten nur soweit dies für den Betrieb, die Sicherheit, die Kommunikation und die von Ihnen gewünschten Funktionen erforderlich ist.</p>
        <h2>Technische Dienste</h2>
        <p>NEXORA kann technische Dienste für Hosting, Datenbank, Authentifizierung, KI-Verarbeitung und Zahlungsabwicklung einsetzen. Die konkrete Anbieter- und Auftragsverarbeiterliste wird vor dem öffentlichen Launch ergänzt.</p>
        <h2>Ihre Rechte</h2>
        <p>Betroffene Personen haben insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit, soweit die gesetzlichen Voraussetzungen erfüllt sind.</p>
        <div className="legal-nav">
          <Link href="/impressum">Impressum</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/widerruf">Widerruf</Link>
          <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link>
        </div>
      </section>
    </main>
  );
}
