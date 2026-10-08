import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const base = (configured || "https://www.nexora-digital.de").replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: base + "/sitemap.xml",
  };
}
