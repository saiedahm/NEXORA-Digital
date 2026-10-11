"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const legalPaths = ["/widerruf", "/terms", "/privacy", "/impressum", "/cookies", "/contact"];
export default function LegalCloseButton() {
  const pathname = usePathname();
  if (!legalPaths.includes(pathname)) return null;
  return <Link className="legal-close" href="/" aria-label="Seite schließen und zur Startseite zurückkehren" title="Schließen">×</Link>;
}
