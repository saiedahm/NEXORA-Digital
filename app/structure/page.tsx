"use client";

import { useEffect, useState } from "react";

type PageItem = { id: string; name: string; purpose: string; enabled: boolean };

const defaults: PageItem[] = [
  { id: "home", name: "Home", purpose: "Main landing page and primary customer action.", enabled: true },
  { id: "about", name: "About", purpose: "Business story, trust and company information.", enabled: true },
  { id: "services", name: "Services", purpose: "Products, services or solutions offered.", enabled: true },
  { id: "contact", name: "Contact", purpose: "Contact details, form and conversion path.", enabled: true },
  { id: "faq", name: "FAQ", purpose: "Answers to common customer questions.", enabled: false },
  { id: "legal", name: "Legal", purpose: "Legal and privacy information.", enabled: true }
];

export default function StructurePage() {
  const [pages, setPages] = useState<PageItem[]>(defaults);
  const [projectName, setProjectName] = useState("NEXORA Project");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const projects = JSON.parse(window.localStorage.getItem("nexora-projects") || "[]");
      const project = projects.find((item: { id: string }) => item.id === id) || projects[0];
      if (project) setProjectName(project.name);

      const stored = id ? window.localStorage.getItem(`nexora-structure-${id}`) : null;
      if (stored) setPages(JSON.parse(stored));
    } catch {}
  }, []);

  function toggle(id: string) {
    setSaved(false);
    setPages((current) => current.map((page) =>
      page.id === id ? { ...page, enabled: !page.enabled } : page
    ));
  }

  function saveStructure() {
    try {
      const id = new URLSearchParams(window.location.search).get("id") || "draft";
      window.localStorage.setItem(`nexora-structure-${id}`, JSON.stringify(pages));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  const enabledCount = pages.filter((page) => page.enabled).length;

  return (
    <main className="structure-page">
      <header className="structure-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/workspace">Projects</a>
          <a href="/assistant">AI Assistant</a>
        </div>
      </header>

      <section className="structure-header">
        <div>
          <p className="section-label">PROJECT / STRUCTURE</p>
          <h1>Build the structure before the design.</h1>
          <p>{projectName} · Choose the pages your website needs before moving to the build stage.</p>
        </div>
        <span className="structure-status"><i /> {enabledCount} PAGES SELECTED</span>
      </section>

      <section className="structure-layout">
        <div className="page-list-card">
          <div className="structure-title">
            <div><p className="section-label">SITE MAP</p><h2>Website pages</h2></div>
            <span>02 / 04</span>
          </div>

          <div className="page-list">
            {pages.map((page, index) => (
              <button type="button" key={page.id} onClick={() => toggle(page.id)} className={page.enabled ? "page-item enabled" : "page-item"}>
                <span className="page-number">0{index + 1}</span>
                <span className="page-copy"><strong>{page.name}</strong><small>{page.purpose}</small></span>
                <span className="page-toggle">{page.enabled ? "ON" : "OFF"}</span>
              </button>
            ))}
          </div>

          <button type="button" className="primary-button structure-save" onClick={() => { saveStructure(); window.setTimeout(() => { window.location.href = `/builder?id=${encodeURIComponent(new URLSearchParams(window.location.search).get("id") || "")}`; }, 150); }}>
            Save structure <span>→</span>
          </button>
          {saved && <p className="save-message">Structure saved and ready for the build stage.</p>}
        </div>

        <aside className="structure-side">
          <p className="section-label">AI STRUCTURE</p>
          <h2>Recommended foundation</h2>
          <p>NEXORA starts with a focused structure so every page has a clear purpose and customer journey.</p>
          <div className="structure-rule"><span>01</span><div><strong>Clear navigation</strong><small>Keep the main journey simple.</small></div></div>
          <div className="structure-rule"><span>02</span><div><strong>Conversion focused</strong><small>Give visitors a clear next action.</small></div></div>
          <div className="structure-rule"><span>03</span><div><strong>Mobile first</strong><small>Structure must work on every screen.</small></div></div>
        </aside>
      </section>

      <section className="structure-progress">
        <a href="/project">01 · AI Direction</a>
        <strong>02 · Structure</strong>
        <span>03 · Build</span>
        <span>04 · Launch</span>
      </section>
    </main>
  );
}
