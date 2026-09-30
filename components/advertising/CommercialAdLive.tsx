"use client";

import { useEffect, useState } from "react";

export function CommercialAdLive() {
  const [ads, setAds] = useState<any[]>([]);
  useEffect(() => { const load = async () => { try { const r = await fetch("/api/commercial-ads/active", { cache: "no-store" }); const d = await r.json(); setAds(Array.isArray(d.ads) ? d.ads : []); } catch {} }; void load(); const timer = window.setInterval(load, 30000); return () => window.clearInterval(timer); }, []);
  if (!ads.length) return null;
  return <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow">LIVE CAMPAIGNS</p><h2>Aktive Werbekampagnen</h2></div><div className="services-grid">{ads.map(ad=><article className="card" key={ad.id}><small>Werbefläche {ad.space}</small><h3>{ad.companyName}</h3><p>{ad.message}</p>{ad.destination&&<a href={ad.destination} target="_blank" rel="noopener noreferrer" className="primary-button">Mehr erfahren</a>}</article>)}</div></div></section>;
}
