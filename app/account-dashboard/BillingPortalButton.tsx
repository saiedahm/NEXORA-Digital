"use client";

import { useState } from "react";

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPortal() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/billing/portal", { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data?.url) {
        setError(data?.error || "Unable to open billing management.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Unable to open billing management.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className="secondary-button" onClick={openPortal} disabled={loading}>
        {loading ? "Opening billing…" : "Manage billing →"}
      </button>
      {error && <p className="pricing-error">{error}</p>}
    </div>
  );
}
