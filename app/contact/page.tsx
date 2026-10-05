"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="inner-page contact-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · CONTACT</div>
      <h1>Let&apos;s build <span>what&apos;s next.</span></h1>
      <p className="contact-intro">
        Tell us what you want to build, improve or automate. This contact layer is prepared for the next connected communication stage.
      </p>

      <section className="contact-panel">
        <div className="contact-info">
          <span className="contact-label">START A PROJECT</span>
          <h2>Bring your <span>idea.</span></h2>
          <p>Whether it is a website, AI workflow or a new digital product, start with a clear request.</p>
          <div className="contact-points">
            <span>01 · Website &amp; digital platforms</span>
            <span>02 · AI &amp; automation</span>
            <span>03 · Digital product ideas</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <label>
            Name
            <input name="name" type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Project
            <select name="project" defaultValue="website">
              <option value="website">Website / platform</option>
              <option value="ai">AI / automation</option>
              <option value="product">Digital product</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Message
            <textarea name="message" placeholder="Tell us briefly what you want to build..." rows={6} required />
          </label>
          <button className="primary-button contact-submit" type="submit">
            Send request <span>→</span>
          </button>
          {sent && <div className="contact-success" role="status">Request prepared successfully. The live delivery connection will be added in the communication stage.</div>}
        </form>
      </section>

      <a className="secondary-button" href="/">Back to platform</a>
    </main>
  );
}
