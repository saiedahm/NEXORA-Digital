import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import LegalCloseButton from "@/components/LegalCloseButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXORA-Digital | Global Recruitment Platform",
  description: "Global recruitment platform connecting candidates and companies with intelligent matching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div id="google_translate_element" aria-hidden="true" />
        <Script id="google-translate-init" strategy="afterInteractive">{`
          window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({
              pageLanguage: "en",
              autoDisplay: false,
              includedLanguages: "de,en,es,fr,it,pt,ar,zh-CN,ja,ko,ru,tr,az,hi,bn,ur,fa,ps,ku,uk"
            }, "google_translate_element");
          };
        `}</Script>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <div
          role="status"
          aria-label="Trial period notice"
          lang="ar"
          dir="rtl"
          style={{
            width: "100%",
            padding: "10px 16px",
            textAlign: "center",
            background: "linear-gradient(90deg, #082744, #0b3555, #082744)",
            borderBottom: "1px solid rgba(212, 175, 55, .8)",
            color: "#f5f9ff",
            fontWeight: 700,
            lineHeight: 1.65
          }}
        >
          نحن في الفترة التجريبية حتى تاريخ 30/10/2026
        </div>
        <header className="nav">
          <div className="container nav-inner">
            <Link href="/" className="logo-link" aria-label="NEXORA-Digital home">
              <Image className="site-logo" src="/nexora-logo.png" alt="NEXORA Digital" width={58} height={58} priority />
            </Link>
            <nav className="nav-links">
              <Link href="/jobs">Find a Job</Link><Link href="/companies">Companies</Link><Link href="/candidates">Candidates</Link><Link href="/pricing">Pricing</Link><Link href="/notifications">Activity</Link><Link href="/contact">Contact</Link><Link href="/account">Account</Link>
              <LanguageSwitcher /><Link className="post-job" href="/register/company">Post a Job</Link>
            </nav>
          </div>
        </header>
        <LegalCloseButton />
        {children}
        <footer className="footer">
          <div className="container footer-inner">
            <nav className="legal"><Link href="/widerruf">Widerruf</Link><Link href="/terms">AGB</Link><Link href="/privacy">Datenschutz</Link><Link href="/impressum">Impressum</Link><Link href="/cookies">Cookie-Einstellungen</Link><Link href="/contact">Contact</Link></nav>
            <Link href="/" aria-label="NEXORA-Digital home"><Image className="footer-logo" src="/nexora-logo.png" alt="NEXORA Digital" width={92} height={92} /></Link>
            <div className="copyright">© 2026 NEXORA Digital. All rights reserved.</div>
            <div className="digitalfuture-footer"><a href="https://www.digital-future.ai" target="_blank" rel="noreferrer">https://www.digital-future.ai</a><span>server@digital-future.ai</span></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
