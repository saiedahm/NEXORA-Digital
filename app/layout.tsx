import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXORA-Digital | Global Recruitment Platform",
  description: "Global recruitment platform connecting candidates and companies with intelligent matching."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container nav-inner">
            <Link href="/" className="logo-link" aria-label="NEXORA-Digital home">
              <Image className="site-logo" src="/nexora-logo.png" alt="NEXORA Digital" width={58} height={58} priority />
            </Link>
            <nav className="nav-links">
              <Link href="/jobs">Find a Job</Link>
              <Link href="/companies">Companies</Link>
              <Link href="/candidates">Candidates</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/notifications">Activity</Link>
              <Link href="/account">Account</Link>
              <span className="language">◉ EN⌄</span>
              <Link className="post-job" href="/register/company">Post a Job</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container footer-inner">
            <nav className="legal">
              <Link href="/widerruf">Widerruf</Link>
              <Link href="/terms">AGB</Link>
              <Link href="/privacy">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/cookies">Cookie-Einstellungen</Link>
            </nav>
            <Link href="/" aria-label="NEXORA-Digital home">
              <Image className="footer-logo" src="/nexora-logo.png" alt="NEXORA Digital" width={92} height={92} />
            </Link>
            <div className="copyright">© 2026 NEXORA Digital. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
