"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  ["de","Deutsch"],["en","English"],["es","Español"],["fr","Français"],["it","Italiano"],["pt","Português"],
  ["ar","العربية"],["zh","中文"],["ja","日本語"],["ko","한국어"],["ru","Русский"],["tr","Türkçe"],
  ["az","Azərbaycan"],["hi","हिन्दी"],["bn","বাংলা"],["ur","اردو"],["fa-AF","دری"],["ps","پښتو"],["ku","Kurdî"],["uk","Українська"],
] as const;

const RTL = new Set(["ar","ur","fa-AF","ps","ku"]);
const GOOGLE_CODES: Record<string,string> = {
  en:"en",de:"de",es:"es",fr:"fr",it:"it",pt:"pt",ar:"ar","zh":"zh-CN",ja:"ja",ko:"ko",ru:"ru",tr:"tr",
  az:"az",hi:"hi",bn:"bn",ur:"ur","fa-AF":"fa",ps:"ps",ku:"ku",uk:"uk"
};

function setGoogleTranslateCookie(code: string) {
  const value = encodeURIComponent("/en/" + code);
  document.cookie = "googtrans=" + value + "; Path=/; Max-Age=31536000; SameSite=Lax";
  // Also set a host-scoped cookie; this helps when an older Google cookie was created on another host.
  const host = window.location.hostname;
  if (host.includes(".") && !host.endsWith("vercel.app")) {
    const parts = host.split(".");
    const baseDomain = "." + parts.slice(-2).join(".");
    document.cookie = "googtrans=" + value + "; Domain=" + baseDomain + "; Path=/; Max-Age=31536000; SameSite=Lax";
  }
}

export default function LanguageSwitcher() {
  const [language,setLanguage] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexora-language");
    const browser = navigator.language.toLowerCase();
    const match = LANGUAGES.find(([code]) => browser === code.toLowerCase() || browser.startsWith(code.toLowerCase() + "-"));
    const googleCookie = document.cookie.split("; ").find(item => item.startsWith("googtrans="))?.split("=").slice(1).join("=");
    const cookieLanguage = googleCookie ? decodeURIComponent(googleCookie).split("/").pop() : "";
    const fromCookie = Object.entries(GOOGLE_CODES).find(([,google]) => google === cookieLanguage)?.[0];
    const next = (saved && LANGUAGES.some(([code]) => code === saved) ? saved : fromCookie || match?.[0] || "en");
    setLanguage(next);
    document.documentElement.lang = GOOGLE_CODES[next] || next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
  }, []);

  function changeLanguage(next: string) {
    setLanguage(next);
    window.localStorage.setItem("nexora-language", next);
    document.cookie = "nexora-language=" + encodeURIComponent(next) + "; Path=/; Max-Age=31536000; SameSite=Lax";
    const googleCode = GOOGLE_CODES[next] || "en";
    setGoogleTranslateCookie(googleCode);
    document.documentElement.lang = googleCode;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";

    // Apply the selection immediately if Google Translate has initialized.
    const googleSelect = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (googleSelect) {
      googleSelect.value = googleCode;
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    // Google Translate reads its cookie on load. Reload only when its widget is not ready yet.
    window.location.reload();
  }

  return (
    <label className="language-switcher" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      <select value={language} onChange={event => changeLanguage(event.target.value)}>
        {LANGUAGES.map(([code,name]) => <option value={code} key={code}>{name}</option>)}
      </select>
    </label>
  );
}
