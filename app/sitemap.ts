import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const base = (configured || "https://www.nexora-digital.de").replace(/\/$/, "");

  return [
    "/",
    "/jobs",
    "/companies",
    "/candidates",
    "/pricing",
    "/register",
    "/login",
    "/privacy",
    "/terms",
    "/impressum",
    "/cookies",
  ].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
}
