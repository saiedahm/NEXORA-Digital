"use client";

import { useState } from "react";

const workflows = [
  { number: "01", title: "Website updates", text: "Prepare repeatable website tasks and content changes.", status: "READY" },
  { number: "02", title: "AI content flow", text: "Turn an idea into a structured content workflow.", status: "AI" },
  { number: "03", title: "Business process", text: "Connect repetitive steps into one simple workflow.", status: "NEXT" },
];

export default function AutomationPage() {
  const [active, setActive] = useState("01");

  return (
    <main className="inner-page automation-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">03 · NEXORA PLATFORM</div>
      <h1>Smart <span>Automation</span></h1>
      <p className="automation-intro">
        Build simple digital workflows that reduce repetitive work and keep important steps connected.
      </p>

      <section className="automation-builder">
        <div className="automation-builder-head">
          <div>
            <span className="automation-label">WORKFLOW BUILDER</span>
            <h2>Create a <span>workflow.</span></h2>
          </div>
          <span className="automation-status">● SYSTEM READY</span>
        </div>

        <div className="automation-flow">
          <div className="automation-step">
            <span>01</span>
            <strong>TRIGGER</strong>
            <p>Something happens</p>
          </div>
          <div className="automation-line" />
          <div className="automation-step">
            <span>02</span>
            <strong>AI ACTION</strong>
            <p>NEXORA processes it</p>
          </div>
          <div className="automation-line" />
          <div className="automation-step">
            <span>03</span>
            <strong>RESULT</strong>
            <p>Your next step is ready</p>
          </div>
        </div>
      </section>

      <section className="automation-library">
        <div className="automation-section-head">
          <div>
            <div className="section-kicker">AUTOMATION LIBRARY</div>
            <h2>Choose a <span>flow.</span></h2>
          </div>
          <span className="automation-count">03 FLOWS</span>
        </div>

        <div className="automation-grid">
          {workflows.map((workflow) => (
            <button
              className={`automation-card ${active === workflow.number ? "is-active" : ""}`}
              key={workflow.number}
              type="button"
              onClick={() => setActive(workflow.number)}
            >
              <div className="automation-card-top">
                <span>{workflow.number}</span>
                <b>{workflow.status}</b>
              </div>
              <h3>{workflow.title}</h3>
              <p>{workflow.text}</p>
              <span className="automation-select">{active === workflow.number ? "SELECTED ✓" : "SELECT FLOW →"}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="automation-preview">
        <span className="automation-label">SELECTED FLOW</span>
        <h2>{workflows.find((workflow) => workflow.number === active)?.title}</h2>
        <p>This is the foundation for the next automation layer. Real triggers, actions and connected services can be added here without changing the platform structure.</p>
      </section>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
