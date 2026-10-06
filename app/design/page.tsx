"use client";

import { useEffect, useState } from "react";

const palettes = [
  { id: "cyan", name: "NEXORA Cyan", primary: "#66dcff", secondary: "#071827", background: "#030914" },
  { id: "violet", name: "Electric Violet", primary: "#a78bfa", secondary: "#111024", background: "#070611" },
  { id: "emerald", name: "Digital Emerald", primary: "#4ade80", secondary: "#06150d", background: "#020b07" }
];

const fonts = ["Inter", "Manrope", "Space Grotesk"];

export default function DesignPage() {
  const [palette, setPalette] = useState(palettes[0]);
  const [font, setFont] = useState(fonts[0]);
  const [radius, setRadius] = useState("Soft");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("id") || "draft";
      const stored = window.localStorage.getItem(`nexora-design-${id}`);
      if (stored) {
        const data = JSON.parse(stored);
        const found = palettes.find((item) => item.id === data.palette);
        if (found) setPalette(found);
        if (fonts.includes(data.font)) setFont(data.font);
        if (data.radius) setRadius(data.radius);
      }
    } catch {}
  }, []);

  function save() {
    const id = new URLSearchParams(window.location.search).get("id") || "draft";
    try {
      window.localStorage.setItem(`nexora-design-${id}`, JSON.stringify({
        palette: palette.id,
        font,
        radius
      }));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch {}
  }

  return (
    <main className="design-page">
      <header className="design-nav">
        <a className="workspace-logo" href="/">NEXORA DIGITAL</a>
        <span>DESIGN SYSTEM</span>
        <nav><a href="/dashboard">Dashboard</a><a href="/builder">Builder</a></nav>
      </header>

      <section className="design-header">
        <div>
          <p className="section-label">PROJECT / DESIGN</p>
          <h1>Give the project its visual identity.</h1>
          <p>Choose the visual foundation before the website is generated. Every selection can be refined later.</p>
        </div>
        <div className="design-step">03 / 04</div>
      </section>

      <section className="design-layout">
        <div className="design-controls">
          <section className="design-card">
            <p className="section-label">01 · COLOR SYSTEM</p>
            <h2>Choose a visual direction.</h2>
            <div className="palette-grid">
              {palettes.map((item) => (
                <button type="button" className={palette.id === item.id ? "palette selected" : "palette"} key={item.id} onClick={() => { setPalette(item); setSaved(false); }}>
                  <span className="palette-swatch" style={{ background: item.primary }} />
                  <strong>{item.name}</strong>
                  <small>{item.primary}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="design-card">
            <p className="section-label">02 · TYPOGRAPHY</p>
            <h2>Choose the voice of the interface.</h2>
            <div className="font-grid">
              {fonts.map((item) => (
                <button type="button" className={font === item ? "font-option selected" : "font-option"} key={item} onClick={() => { setFont(item); setSaved(false); }}>
                  <strong style={{ fontFamily: item }}>{item}</strong><span>Aa</span>
                </button>
              ))}
            </div>
          </section>

          <section className="design-card">
            <p className="section-label">03 · UI SHAPE</p>
            <h2>Set the interface character.</h2>
            <div className="radius-grid">
              {["Sharp", "Soft", "Rounded"].map((item) => (
                <button type="button" className={radius === item ? "radius-option selected" : "radius-option"} key={item} onClick={() => { setRadius(item); setSaved(false); }}>{item}</button>
              ))}
            </div>
          </section>
        </div>

        <aside className="design-preview" style={{ "--preview-primary": palette.primary, "--preview-bg": palette.background } as React.CSSProperties}>
          <div className="preview-label">LIVE VISUAL PREVIEW</div>
          <div className="preview-site">
            <div className="preview-site-nav"><b>NEXORA</b><span>Home</span><span>Services</span><span>About</span><i>Start</i></div>
            <div className="preview-site-hero">
              <small>YOUR DIGITAL FUTURE</small>
              <h2 style={{ fontFamily: font }}>Build something people remember.</h2>
              <p>A visual direction generated from your project choices.</p>
              <button type="button">Get started →</button>
            </div>
            <div className="preview-blocks"><div /><div /><div /></div>
          </div>
          <div className="preview-meta"><span>{palette.name}</span><span>{font}</span><span>{radius} UI</span></div>
        </aside>
      </section>

      <section className="design-footer">
        <div><p className="section-label">DESIGN SYSTEM READY</p><h2>Your visual foundation is ready for the final build stage.</h2></div>
        <button type="button" className="primary-button" onClick={save}>Save design <span>→</span></button>
      </section>

      {saved && <div className="design-toast">Design system saved.</div>}
    </main>
  );
}
