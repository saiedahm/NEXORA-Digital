"use client";

import { useState } from "react";

export default function PricingActions({ plan, featured }: { plan: string; featured: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (!response.ok || !data?.url) {
        setError(data?.error || "Unable to start checkout.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button className={featured ? "primary-button" : "secondary-button"} onClick={startCheckout} disabled={loading}>
        {loading ? "Opening checkout…" : `Start with ${plan.charAt(0).toUpperCase() + plan.slice(1)}`} <span>→</span>
      </button>
      {error && <p className="pricing-error">{error}</p>}
    </div>
  );
}
