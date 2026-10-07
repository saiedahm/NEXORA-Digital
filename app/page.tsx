import Link from "next/link";

const features = [
  ["AI Matching", "Intelligent matching between candidate profiles and relevant jobs."],
  ["Global Jobs", "Search opportunities by country, region, city, profession and employment conditions."],
  ["Candidate Profiles", "Professional profiles, CV information and application tracking in one place."],
  ["Company Profiles", "Verified company presence, vacancies and recruitment workflow."],
  ["Gulf Recruitment Hub", "Dedicated recruitment flow for Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman."],
  ["Secure by Design", "Privacy, account security, GDPR-aware architecture and controlled access."],
];

export default function Home() {
  return (
    <>
      <header className="nav"><div className="container nav-inner">
        <Link href="/" className="brand">NEXORA<span>-Digital</span></Link>
        <nav className="nav-links">
          <Link href="/jobs">Find a Job</Link>
          <Link href="/companies">For Companies</Link>
          <Link href="/candidates">Candidates</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
      </div></header>

      <main>
        <section className="hero"><div className="container">
          <div className="eyebrow">Global Recruitment Platform</div>
          <h1>From talent to opportunity — intelligently connected.</h1>
          <p>NEXORA-Digital is being built as a global recruitment platform connecting candidates and employers through structured job search, professional profiles and AI-powered matching.</p>
          <div className="actions">
            <Link className="btn primary" href="/jobs">Find a Job</Link>
            <Link className="btn secondary" href="/companies">Hire Talent</Link>
          </div>
        </div></section>

        <section className="section"><div className="container">
          <h2>One platform for global recruitment</h2>
          <p className="muted">The foundation follows the agreed recruitment architecture rather than the previous website-creation direction.</p>
          <div className="grid">{features.map(([title, text]) => <article className="card" key={title}><span className="badge">NEXORA</span><h3>{title}</h3><p className="muted">{text}</p></article>)}</div>
        </div></section>
      </main>

      <footer className="footer"><div className="container">© 2026 NEXORA-Digital · Global Recruitment Platform</div></footer>
    </>
  );
}
