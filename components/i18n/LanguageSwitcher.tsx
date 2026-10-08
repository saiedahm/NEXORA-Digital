"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  ["de", "Deutsch"],
  ["en", "English"],
  ["es", "Español"],
  ["fr", "Français"],
  ["it", "Italiano"],
  ["pt", "Português"],
  ["ar", "العربية"],
  ["zh", "中文"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["ru", "Русский"],
  ["tr", "Türkçe"],
  ["az", "Azərbaycan"],
  ["hi", "हिन्दी"],
  ["bn", "বাংলা"],
  ["ur", "اردو"],
  ["fa-AF", "دری"],
  ["ps", "پښتو"],
  ["ku", "Kurdî"],
  ["uk", "Українська"],
] as const;

const RTL = new Set(["ar", "ur", "fa-AF", "ps", "ku"]);

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexora-language");
    const browser = navigator.language.toLowerCase();
    const match = LANGUAGES.find(([code]) => browser === code || browser.startsWith(code + "-"));
    const next = saved || match?.[0] || "en";
    setLanguage(next);
    document.documentElement.lang = next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
  }, []);

  function changeLanguage(next: string) {
    setLanguage(next);
    window.localStorage.setItem("nexora-language", next);
    document.cookie = "nexora-language=" + encodeURIComponent(next) + "; Path=/; Max-Age=31536000; SameSite=Lax";
    document.documentElement.lang = next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
    window.dispatchEvent(new CustomEvent("nexora-language-change", { detail: next }));
  }

  return (
    <label className="language-switcher" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)}>
        {LANGUAGES.map(([code, name]) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
