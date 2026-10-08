import Link from "next/link";

export default function Impressum() {
  return (
    <main className="section">
      <div className="container">
        <span className="badge">LEGAL</span>
        <h1>Impressum</h1>

        <article className="card">
          <h2>Angaben zum Anbieter</h2>

          <p>
            <strong>Rechtsname / Vollständiger Name:</strong><br />
            Akhmed Ismail Saied
          </p>

          <p>
            <strong>Firmenname:</strong><br />
            digital horizons
          </p>

          <p>
            <strong>Vollständige Adresse:</strong><br />
            Ehndofer Str. 130<br />
            24537 Neumünster<br />
            Deutschland
          </p>

          <p>
            <strong>Telefon:</strong><br />
            +4915123937937
          </p>
        </article>

        <Link href="/" className="btn secondary">Back to NEXORA</Link>
      </div>
    </main>
  );
}
