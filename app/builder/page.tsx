"use client";

import { useEffect, useMemo, useState } from "react";

type SitePage = { id: string; name: string; purpose: string; enabled: boolean };

const fallbackPages: SitePage[] = [
  { id: "home", name: "Home", purpose: "Main landing page", enabled: true },
  { id: "about", name: "About", purpose: "Business story and trust", enabled: true },
  { id: "services", name: "Services", purpose: "Products and solutions", enabled: true },
  { id: "contact", name: "Contact", purpose: "Contact and conversion", enabled: true }
];

export default function BuilderPage() {
  const [pages, setPages] = useState<SitePage[]>(fallbackPages);
  const [active, setActive] = useState("home");
  const [projectName, setProjectName] = useState("NEXORA Website");
  const [projectId, setProjectId] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id") || "";
      setProjectId(id);

      const projects = JSON.parse(window.localStorage.getItem("nexora-projects") || "[]");
      const project = projects.find((item: { id: string }) => item.id === id) || projects[0];
      if (project) setProjectName(project.name);

      const stored = id ? window.localStorage.getItem(`nexora-structure-${id}`) : null;
      if (stored) {
        const selected = JSON.parse(stored).filter((item: SitePage) => item.enabled);
        if (selected.length) setPages(selected);
      }
    } catch {}
  }, []);

  const current = useMemo(() => pages.find((page) => page.id === active) || pages[0], [pages, active]);

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="builder-page">
      <header className="builder-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <span className="builder-project">{projectName}</span>
        <div className="builder-nav-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/assistant">AI Assistant</a>
        </div>
      </header>

      <section className="builder-header">
        <div>
          <p className="section-label">PROJECT / BUILD</p>
          <h1>Shape the website before it goes live.</h1>
          <p>Preview your selected pages, review the structure, and prepare the website for the final implementation stage.</p>
        </div>
        <span className="builder-status"><i /> BUILD PREVIEW</span>
      </section>

      <section className="builder-workspace">
        <aside className="builder-pages">
          <p className="section-label">SITE PAGES</p>
          {pages.map((page, index) => (
            <button type="button" className={page.id === current?.id ? "builder-page active" : "builder-page"} key={page.id} onClick={() => setActive(page.id)}>
              <span>0{index + 1}</span>
              <strong>{page.name}</strong>
              <small>↗</small>
            </button>
          ))}
        </aside>

        <section className="browser-frame">
          <div className="browser-bar">
            <div className="browser-dots"><i /><i /><i /></div>
            <div className="browser-address">preview.nexora.digital / {current?.id || "home"}</div>
            <span>PREVIEW</span>
          </div>
          <div className="site-preview">
            <div className="preview-nav">
              <strong>NEXORA</strong>
              <div>{pages.slice(0, 3).map((page) => <span key={page.id}>{page.name}</span>)}</div>
              <b>Get started</b>
            </div>
            <div className="preview-hero">
              <small>MODERN DIGITAL EXPERIENCE</small>
              <h2>{current?.name === "Home" ? "Your business. Ready for the next generation." : current?.name}</h2>
              <p>{current?.purpose}. This is the visual foundation generated from your NEXORA project structure.</p>
              <button type="button">Explore →</button>
            </div>
            <div className="preview-cards">
              <div /><div /><div />
            </div>
          </div>
        </section>
      </section>

      <section className="builder-actions">
        <div>
          <p className="section-label">BUILD STAGE</p>
          <h2>Structure is ready for implementation.</h2>
          <span>{pages.length} pages selected · responsive preview enabled</span>
        </div>
        <div className="builder-buttons">
          <button type="button" className="secondary-button" onClick={save}>Save progress</button>
          <a className="primary-button" href={`/design?id=${encodeURIComponent(projectId)}`}>Continue <span>→</span></a>
        </div>
      </section>

      {saved && <div className="builder-toast">Build progress saved.</div>}
    </main>
  );
}
