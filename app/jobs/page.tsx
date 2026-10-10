"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const countries = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman",
  "Germany", "Austria", "Switzerland", "United Kingdom", "France", "Netherlands",
  "Belgium", "Spain", "Italy", "Poland", "Türkiye", "United States", "Canada",
  "Australia", "India", "Pakistan", "Egypt", "Jordan", "Lebanon", "Morocco",
  "Tunisia", "South Africa", "Other"
];

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const p = new URLSearchParams();
      if (q.trim()) p.set("q", q.trim());
      if (country) p.set("country", country);
      if (city.trim()) p.set("city", city.trim());
      if (type) p.set("employmentType", type);
      const r = await fetch("/api/jobs?" + p.toString());
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || "Unable to load jobs");
        setJobs([]);
      } else {
        setJobs(Array.isArray(d) ? d : []);
      }
    } catch {
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function clear() {
    setQ("");
    setCountry("");
    setCity("");
    setType("");
    setTimeout(() => {
      const p = new URLSearchParams();
      fetch("/api/jobs").then(async (r) => {
        const d = await r.json();
        if (r.ok && Array.isArray(d)) setJobs(d);
        else setError(d.error || "Unable to load jobs");
      }).catch(() => setError("Unable to load jobs. Please try again."));
    }, 0);
  }

  return (
    <main className="section">
      <div className="container">
        <span className="badge">GLOBAL JOBS</span>
        <h1>Find your next opportunity.</h1>
        <p className="muted">Search published vacancies from verified employers worldwide, including the Gulf region and Europe.</p>
        <div className="card" style={{ marginBottom: 24 }}>
          <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter") load(); }} placeholder="Job title, skills or keyword" aria-label="Job title, skills or keyword" style={input} />
          <select value={country} onChange={e => setCountry(e.target.value)} aria-label="Select country" style={input}>
            <option value="">All countries</option>
            {countries.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <input value={city} onChange={e => setCity(e.target.value)} onKeyDown={e => { if (e.key === "Enter") load(); }} placeholder="City (optional)" aria-label="City" style={input} />
          <select value={type} onChange={e => setType(e.target.value)} aria-label="Employment type" style={input}>
            <option value="">All employment types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Remote</option>
            <option>Temporary</option>
            <option>Internship</option>
          </select>
          <div className="actions">
            <button className="btn primary" onClick={load} disabled={loading}>{loading ? "Searching..." : "Search jobs"}</button>
            <button className="btn secondary" onClick={clear} disabled={loading}>Clear filters</button>
          </div>
        </div>
        {error && <article className="card"><h3>Job search is temporarily unavailable</h3><p className="muted">{error}</p><button className="btn secondary" onClick={load}>Retry</button></article>}
        <div className="grid">
          {jobs.map(j => <article className="card" key={j.id}>
            <span className="badge">{j.employmentType}</span>
            <h3>{j.title}</h3>
            <p className="muted">{j.company.name} · {j.country}{j.city ? " · " + j.city : ""}</p>
            <p>{j.description.slice(0, 180)}{j.description.length > 180 ? "…" : ""}</p>
            {j.salaryRange && <p><strong>{j.salaryRange}</strong></p>}
            <Link className="btn primary" href={"/jobs/" + j.id}>View vacancy</Link>
          </article>)}
        </div>
        {!loading && !error && !jobs.length && <article className="card"><h3>No matching vacancies found.</h3><p className="muted">There are no published vacancies matching these filters yet. Try a broader search or another location.</p></article>}
      </div>
    </main>
  );
}

const input = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #29435f",
  background: "#081525",
  color: "#fff"
};
