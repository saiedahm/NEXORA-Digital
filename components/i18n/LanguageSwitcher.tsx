"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  ["de", "Deutsch"],["en", "English"],["es", "Español"],["fr", "Français"],["it", "Italiano"],["pt", "Português"],
  ["ar", "العربية"],["zh", "中文"],["ja", "日本語"],["ko", "한국어"],["ru", "Русский"],["tr", "Türkçe"],
  ["az", "Azərbaycan"],["hi", "हिन्दी"],["bn", "বাংলা"],["ur", "اردو"],["fa-AF", "دری"],["ps", "پښتو"],["ku", "Kurdî"],["uk", "Українська"],
] as const;

const RTL = new Set(["ar","ur","fa-AF","ps","ku"]);
const GOOGLE_CODES: Record<string,string> = {
  en:"en",de:"de",es:"es",fr:"fr",it:"it",pt:"pt",ar:"ar",zh:"zh-CN",ja:"ja",ko:"ko",ru:"ru",tr:"tr",
  az:"az",hi:"hi",bn:"bn",ur:"ur","fa-AF":"fa",ps:"ps",ku:"ku",uk:"uk",
};

function setGoogleLanguage(language: string) {
  const code = GOOGLE_CODES[language] || "en";
  document.cookie = "googtrans=/en/" + code + "; Path=/; Max-Age=31536000; SameSite=Lax";
  document.cookie = "googtrans=/en/" + code + "; Path=/; Domain=" + window.location.hostname + "; Max-Age=31536000; SameSite=Lax";
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexora-language");
    const browser = navigator.language.toLowerCase();
    const match = LANGUAGES.find(([code]) => browser === code || browser.startsWith(code + "-"));
    const next = saved && LANGUAGES.some(([code]) => code === saved) ? saved : match?.[0] || "en";
    setLanguage(next);
    document.documentElement.lang = next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
    if (next !== "en") setGoogleLanguage(next);
  }, []);

  function changeLanguage(next: string) {
    setLanguage(next);
    window.localStorage.setItem("nexora-language", next);
    document.cookie = "nexora-language=" + encodeURIComponent(next) + "; Path=/; Max-Age=31536000; SameSite=Lax";
    document.documentElement.lang = next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
    setGoogleLanguage(next);
    window.dispatchEvent(new CustomEvent("nexora-language-change", { detail: next }));
    window.location.reload();
  }

  return (
    <label className="language-switcher" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)}>
        {LANGUAGES.map(([code, name]) => <option value={code} key={code}>{name}</option>)}
      </select>
    </label>
  );
}
