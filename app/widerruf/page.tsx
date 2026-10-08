import Link from "next/link";

export default function WiderrufPage() {
  return (
    <main className="section">
      <div className="container card">
        <span className="badge">LEGAL</span>
        <h1>Widerruf</h1>
        <p className="muted">
          Informationen zum Widerrufsrecht und zu digitalen Leistungen von
          NEXORA-Digital werden hier bereitgestellt.
        </p>
        <p className="muted">
          Für konkrete vertragliche Fragen wenden Sie sich bitte an den
          Vertragspartner über die im Impressum angegebenen Kontaktdaten.
        </p>
        <div className="actions">
          <Link className="btn primary" href="/impressum">Zum Impressum</Link>
          <Link className="btn secondary" href="/">Zur Startseite</Link>
        </div>
      </div>
    </main>
  );
}
