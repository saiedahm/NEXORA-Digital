import Link from "next/link";

export default function Widerruf() {
  return (
    <main className="legal-page">
      <a className="back-link" href="/">← NEXORA</a>
      <section className="legal-card">
        <div className="legal-meta">LEGAL · 04</div>
        <h1>Widerruf<span>.</span></h1>
        <p>Informationen zum Widerrufsrecht für Verbraucher bei Fernabsatzverträgen.</p>
        <h2>Widerrufsrecht</h2>
        <p>Soweit gesetzlich ein Widerrufsrecht besteht, erhalten Verbraucher vor Vertragsschluss die dafür erforderlichen Informationen und Bedingungen.</p>
        <h2>Digitale Leistungen</h2>
        <p>Bei digitalen Inhalten oder Dienstleistungen können besondere gesetzliche Voraussetzungen gelten, insbesondere wenn mit der Ausführung vor Ablauf der Widerrufsfrist begonnen wird.</p>
        <h2>Finale Fassung</h2>
        <p>Die vollständige Widerrufsbelehrung wird vor dem kommerziellen Start mit den konkreten Unternehmens- und Vertragsdaten ergänzt.</p>
        <div className="legal-nav">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/cookie-einstellungen">Cookie-Einstellungen</Link>
        </div>
      </section>
    </main>
  );
}
