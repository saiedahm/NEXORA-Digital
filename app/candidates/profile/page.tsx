"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type CandidateProfile = {
  headline?: string | null;
  summary?: string | null;
  skills?: string[];
  yearsExperience?: number | null;
  education?: string | null;
  languages?: string[];
  preferredLocations?: string[];
  employmentPreference?: string | null;
};

const input = { display: "block", width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #29435f", background: "#081525", color: "#fff" };

export default function Profile() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/candidate/profile")
      .then(async response => {
        const data = await response.json().catch(() => ({}));
        if (!active) return;
        if (!response.ok) setError(data.error || "Unable to load profile.");
        else setProfile(data);
      })
      .catch(() => active && setError("Unable to load profile. Please try again."));
    return () => { active = false; };
  }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage("");
    setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      headline: form.get("headline"),
      summary: form.get("summary"),
      skills: String(form.get("skills") || "").split(",").map(value => value.trim()).filter(Boolean),
      yearsExperience: form.get("yearsExperience") === "" ? null : Number(form.get("yearsExperience")),
      education: form.get("education"),
      languages: String(form.get("languages") || "").split(",").map(value => value.trim()).filter(Boolean),
      preferredLocations: String(form.get("preferredLocations") || "").split(",").map(value => value.trim()).filter(Boolean),
      employmentPreference: form.get("employmentPreference"),
    };
    try {
      const response = await fetch("/api/candidate/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) setError(data.error || "Unable to save profile.");
      else {
        setProfile(data);
        setMessage("Profile saved successfully.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (error && !profile) return <main className="section"><div className="container"><h1>Professional profile</h1><p role="alert">{error}</p><Link className="btn primary" href="/login">Sign in</Link></div></main>;
  if (!profile) return <main className="section"><div className="container"><p>Loading profile...</p></div></main>;

  return <main className="section"><div className="container">
    <Link href="/candidates" className="muted">← Candidate workspace</Link>
    <span className="badge" style={{ marginTop: 24 }}>PROFESSIONAL PROFILE</span>
    <h1>Build your global career profile.</h1>
    <p className="muted">Your saved profile helps employers review applications and supports job matching.</p>
    <form className="card" onSubmit={save} style={{ maxWidth: 820 }}>
      <label htmlFor="headline">Professional headline</label><input id="headline" name="headline" defaultValue={profile.headline || ""} maxLength={160} placeholder="Professional headline" style={input}/>
      <label htmlFor="summary">Professional summary</label><textarea id="summary" name="summary" defaultValue={profile.summary || ""} maxLength={5000} rows={6} placeholder="Professional summary" style={input}/>
      <label htmlFor="skills">Skills (separated by commas)</label><input id="skills" name="skills" defaultValue={(profile.skills || []).join(", ")} placeholder="Skills" style={input}/>
      <label htmlFor="yearsExperience">Years of experience</label><input id="yearsExperience" name="yearsExperience" type="number" min="0" max="60" defaultValue={profile.yearsExperience ?? ""} placeholder="Years of experience" style={input}/>
      <label htmlFor="education">Education</label><input id="education" name="education" defaultValue={profile.education || ""} placeholder="Education" style={input}/>
      <label htmlFor="languages">Languages (separated by commas)</label><input id="languages" name="languages" defaultValue={(profile.languages || []).join(", ")} placeholder="Languages" style={input}/>
      <label htmlFor="preferredLocations">Preferred locations (separated by commas)</label><input id="preferredLocations" name="preferredLocations" defaultValue={(profile.preferredLocations || []).join(", ")} placeholder="Preferred locations" style={input}/>
      <label htmlFor="employmentPreference">Employment preference</label><select id="employmentPreference" name="employmentPreference" defaultValue={profile.employmentPreference || ""} style={input}><option value="">Choose preference</option><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Temporary</option><option>Internship</option><option>Remote</option></select>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert" style={{ color: "#fca5a5" }}>{error}</p>}
      <button className="btn primary" disabled={busy}>{busy ? "Saving..." : "Save profile"}</button>
    </form>
    <p style={{ marginTop: 20 }}><Link className="btn secondary" href="/candidates/cv">Open CV builder</Link></p>
  </div></main>;
}