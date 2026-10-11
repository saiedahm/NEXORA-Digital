import Link from "next/link";

export default function Impressum() {
  return (
    <main className="section">
      <div className="container">
        <span className="badge">LEGAL</span>
        <h1>Impressum</h1>

        <article className="card">
          <h2>Betreiber / Anbieter</h2>

          <p>
            <strong>Name:</strong><br />
            Akhmed Ismail Saied
          </p>

          <p>
            <strong>Unternehmensname:</strong><br />
            digital future
          </p>

          <p>
            <strong>Anschrift:</strong><br />
            Ehndofer Str. 130<br />
            24537 Neumünster<br />
            Deutschland
          </p>

          <p>
            <strong>Kontakt / E-Mail:</strong><br />
            <a href="mailto:contact@digital-future.ai">contact@digital-future.ai</a><br />
            <a href="mailto:info@digital-future.ai">info@digital-future.ai</a><br />
            <a href="mailto:server@digital-future.ai">server@digital-future.ai</a>
          </p>

          <p>
            <strong>Telefon:</strong><br />
            +49 151 23937937
          </p>

          <p>
            <strong>Weitere Website:</strong><br />
            <a href="https://www.digital-future.ai" target="_blank" rel="noreferrer">https://www.digital-future.ai</a>
          </p>
        </article>

        <Link href="/" className="btn secondary">Back to NEXORA</Link>
      </div>
    </main>
  );
}
