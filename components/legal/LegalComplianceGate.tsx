"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const CONSENT_KEY = "nexora-platform-terms-v1-2026";

export function LegalComplianceGate() {
  const [accepted, setAccepted] = useState(true);
  const [checked, setChecked] = useState(false);
  const [document, setDocument] = useState<"impressum" | "privacy" | "terms" | "withdrawal" | "cookies" | null>(null);

  useEffect(() => { setAccepted(window.localStorage.getItem(CONSENT_KEY) === "accepted"); }, []);
  function acceptTerms() { if (!checked) return; window.localStorage.setItem(CONSENT_KEY, "accepted"); setAccepted(true); }

  return (
    <>
      {!accepted && <div className="nexora-legal-gate" role="dialog" aria-modal="true" aria-labelledby="nexora-legal-title"><div className="nexora-legal-card">
        <div className="nexora-legal-brand">NEXORA DIGITAL</div><p className="nexora-legal-kicker">TESTPHASE · LEGAL</p><h1 id="nexora-legal-title">Willkommen bei NEXORA</h1>
        <p className="nexora-legal-text">Die Plattform befindet sich derzeit in der Testphase. Bitte bestätigen Sie vor der Nutzung, dass Sie die Nutzungsbedingungen (AGB) akzeptieren und die Datenschutzerklärung zur Kenntnis genommen haben.</p>
        <label className="nexora-legal-check"><input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} /><span>Ich akzeptiere die <button type="button" onClick={() => setDocument("terms")}>Nutzungsbedingungen (AGB)</button> und bestätige die Kenntnisnahme der <button type="button" onClick={() => setDocument("privacy")}>Datenschutzerklärung</button>.</span></label>
        <button className="nexora-legal-continue" type="button" disabled={!checked} onClick={acceptTerms}>Weiter zur Plattform</button>
        <div className="nexora-legal-links"><button type="button" onClick={() => setDocument("impressum")}>Impressum</button><button type="button" onClick={() => setDocument("privacy")}>Datenschutz</button><button type="button" onClick={() => setDocument("terms")}>AGB</button><button type="button" onClick={() => setDocument("cookies")}>Cookie-Einstellungen</button></div>
      </div></div>}

      <footer className="nexora-legal-footer" aria-label="Rechtliche Informationen">
        <div className="nexora-legal-footer-inner">
          <div className="nexora-footer-brand"><BrandLogo width={108} linkToHome={true} /></div>
          <div className="nexora-footer-middle">
            <div className="nexora-footer-legal-links"><button type="button" onClick={() => setDocument("withdrawal")}>Widerruf</button><button type="button" onClick={() => setDocument("terms")}>AGB</button><button type="button" onClick={() => setDocument("privacy")}>Datenschutz</button><button type="button" onClick={() => setDocument("impressum")}>Impressum</button><button type="button" onClick={() => setDocument("cookies")}>Cookie-Einstellungen</button></div>
            <div className="nexora-footer-contact"><a href="https://www.nexoraonline.de">www.nexoraonline.de</a><span>·</span><a href="mailto:info@nexoraonline.de">info@nexoraonline.de</a></div>
          </div>
          <div className="nexora-footer-copy">© NEXORA DIGITAL 2026<br /><span>Alle Rechte vorbehalten.</span></div>
        </div>
      </footer>

      {document && <div className="nexora-legal-modal" role="dialog" aria-modal="true" aria-labelledby="nexora-document-title"><div className="nexora-legal-modal-card"><button className="nexora-legal-modal-close" type="button" onClick={() => setDocument(null)} aria-label="Schließen">×</button><p className="nexora-legal-kicker">NEXORA DIGITAL · 2026</p>
        {document === "impressum" && <><h2 id="nexora-document-title">Impressum</h2><p><strong>Angaben gemäß § 5 DDG</strong></p><p><strong>digital horizons</strong><br />Akhmed ismail saied<br />Ehndofer Str. 130<br />24537 Neumünster<br />Deutschland</p><p><strong>Kontakt</strong><br />E-Mail: contact@nexoraonline.de<br />E-Mail: info@nexoraonline.de<br />Telefon: +49 151 23937937</p><p>Die Plattform befindet sich derzeit in der Testphase.</p><p>Handelsregister: nicht angegeben<br />USt-IdNr.: nicht angegeben</p></>}
        {document === "privacy" && <><h2 id="nexora-document-title">Datenschutzerklärung</h2><p><strong>Verantwortlicher:</strong> Akhmed ismail saied, digital horizons, Ehndofer Str. 130, 24537 Neumünster, Deutschland.</p><p>Kontakt: contact@nexoraonline.de · info@nexoraonline.de · +49 151 23937937.</p><p>Diese Testplattform verarbeitet personenbezogene Daten nur soweit dies für den Betrieb, die Kommunikation, Sicherheit und die vom Nutzer angeforderten Funktionen erforderlich ist. Die konkreten Verarbeitungen und eingesetzten Dienste werden vor dem produktiven Betrieb vollständig dokumentiert.</p><p>Betroffene Personen haben insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch im Rahmen der gesetzlichen Voraussetzungen.</p></>}
        {document === "terms" && <><h2 id="nexora-document-title">Nutzungsbedingungen (AGB)</h2><p>NEXORA DIGITAL befindet sich derzeit in einer Testphase. Die Plattform dient der Erprobung digitaler Funktionen, KI-gestützter Workflows und Projektabläufe.</p><p>Die Nutzung setzt die Einhaltung geltenden Rechts und dieser Nutzungsbedingungen voraus. Testfunktionen können geändert, vorübergehend deaktiviert oder erweitert werden.</p><p>Verbindliche kostenpflichtige Leistungen werden nur auf Grundlage der jeweils vor Vertragsschluss bereitgestellten Informationen und Vertragsbedingungen angeboten.</p></>}
        {document === "withdrawal" && <><h2 id="nexora-document-title">Widerruf</h2><p>Die Plattform befindet sich derzeit in der Testphase. Soweit künftig kostenpflichtige Verbraucherverträge angeboten werden, werden die jeweils erforderlichen Informationen zur Widerrufsbelehrung und zum Widerrufsformular vor Vertragsschluss bereitgestellt.</p><p>Kontakt für Anfragen: contact@nexoraonline.de</p></>}
        {document === "cookies" && <><h2 id="nexora-document-title">Cookie-Einstellungen</h2><p>Für den Betrieb erforderliche Technologien können technisch notwendig sein. Nicht erforderliche Analyse-, Marketing- oder ähnliche Technologien werden nicht als notwendige Cookies ausgegeben.</p><p>Diese Testversion enthält noch keine abschließende Liste aller produktiven Drittanbieter-Dienste. Die Cookie-Konfiguration wird vor dem produktiven Betrieb entsprechend den tatsächlich eingesetzten Diensten ergänzt.</p></>}
      </div></div>}

      <style jsx global>{`
        .nexora-legal-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(2,8,23,.86);backdrop-filter:blur(14px)}
        .nexora-legal-card,.nexora-legal-modal-card{position:relative;width:min(680px,100%);border:1px solid rgba(56,189,248,.35);border-radius:24px;background:linear-gradient(145deg,#07152e,#0b2345);box-shadow:0 30px 90px rgba(0,0,0,.45);padding:32px;color:#eaf6ff}
        .nexora-legal-brand{font-weight:800;letter-spacing:.16em;color:#67e8f9;font-size:14px}.nexora-legal-kicker{font-size:11px;letter-spacing:.18em;color:#67e8f9;font-weight:700}.nexora-legal-card h1,.nexora-legal-modal-card h2{margin:10px 0 14px;color:#fff}.nexora-legal-text,.nexora-legal-modal-card p{color:#b8c9dc;line-height:1.7}.nexora-legal-check{display:flex;gap:12px;align-items:flex-start;margin:22px 0;color:#dcecff;line-height:1.6}.nexora-legal-check input{margin-top:5px;accent-color:#22d3ee}.nexora-legal-check button,.nexora-legal-links button,.nexora-footer-legal-links button{background:none;border:0;color:#67e8f9;cursor:pointer;padding:0;font:inherit}.nexora-legal-continue{width:100%;border:0;border-radius:12px;padding:13px 18px;font-weight:800;color:#02111f;background:linear-gradient(90deg,#67e8f9,#38bdf8);cursor:pointer}.nexora-legal-continue:disabled{opacity:.4;cursor:not-allowed}.nexora-legal-links{display:flex;flex-wrap:wrap;gap:18px;margin-top:18px;justify-content:center;font-size:13px}
        .nexora-legal-footer{position:relative;z-index:1000;border-top:1px solid rgba(103,232,249,.16);background:#030b18;color:#8fa7bf;padding:16px 20px}.nexora-legal-footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:150px 1fr 220px;gap:24px;align-items:center}.nexora-footer-brand{display:flex;align-items:center;justify-content:flex-start}.nexora-footer-brand .nexora-logo{width:108px!important;height:108px!important;object-fit:contain;border-radius:50%;display:block;filter:drop-shadow(0 0 10px rgba(0,217,255,.18))}.nexora-footer-middle{text-align:center}.nexora-footer-legal-links{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 20px}.nexora-footer-legal-links button{font-size:12px}.nexora-footer-contact{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;margin-top:9px;font-size:13px;color:#d9e9f7}.nexora-footer-contact a{color:#9fefff}.nexora-footer-copy{text-align:right;color:#8ca1b8;font-size:12px;line-height:1.6}.nexora-footer-copy span{color:#d4e0ec}
        .nexora-legal-modal{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.72);overflow:auto}.nexora-legal-modal-card{max-height:90vh;overflow:auto}.nexora-legal-modal-close{position:absolute;right:18px;top:14px;border:0;background:none;color:#fff;font-size:28px;cursor:pointer}
        @media(max-width:800px){.nexora-legal-footer-inner{grid-template-columns:1fr;text-align:center}.nexora-footer-brand{justify-content:center}.nexora-footer-copy{text-align:center}.nexora-footer-brand .nexora-logo{width:88px!important;height:88px!important}}
        @media(max-width:700px){.nexora-legal-card,.nexora-legal-modal-card{padding:24px}.nexora-footer-legal-links{gap:8px 14px}}
      `}</style>
    </>
  );
}
