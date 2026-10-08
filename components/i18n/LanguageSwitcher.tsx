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

declare global {
  interface Window {
    google?: { translate?: { TranslateElement?: new (options: Record<string, unknown>, elementId: string) => unknown } };
    googleTranslateElementInit?: () => void;
  }
}

function hideGoogleUi() {
  const style = document.getElementById("nexora-google-hide");
  if (style) return;
  const css = document.createElement("style");
  css.id = "nexora-google-hide";
  css.textContent = `
    .goog-te-banner-frame, .goog-te-balloon-frame, .goog-te-menu-frame,
    .goog-te-spinner-pos, .goog-te-gadget, .goog-tooltip, .goog-tooltip:hover,
    .goog-text-highlight, #google_translate_element { display:none !important; }
    body { top:0 !important; }
  `;
  document.head.appendChild(css);
}

function loadGoogleTranslate() {
  hideGoogleUi();
  if (window.google?.translate?.TranslateElement) {
    try { new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element"); } catch {}
    return;
  }
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    try {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
      }
    } catch {}
    hideGoogleUi();
  };
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

function applyGoogleLanguage(language: string) {
  if (language === "en") {
    document.cookie = "googtrans=/en/en; Path=/; Max-Age=31536000; SameSite=Lax";
    return;
  }
  const code = GOOGLE_CODES[language] || "en";
  document.cookie = "googtrans=/en/" + code + "; Path=/; Max-Age=31536000; SameSite=Lax";
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event("change"));
  }
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
    loadGoogleTranslate();
    const timer = window.setTimeout(() => applyGoogleLanguage(next), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function changeLanguage(next: string) {
    setLanguage(next);
    window.localStorage.setItem("nexora-language", next);
    document.cookie = "nexora-language=" + encodeURIComponent(next) + "; Path=/; Max-Age=31536000; SameSite=Lax";
    document.documentElement.lang = next;
    document.documentElement.dir = RTL.has(next) ? "rtl" : "ltr";
    loadGoogleTranslate();
    window.setTimeout(() => applyGoogleLanguage(next), 500);
    window.dispatchEvent(new CustomEvent("nexora-language-change", { detail: next }));
  }

  return (
    <>
      <div id="google_translate_element" aria-hidden="true" />
      <label className="language-switcher" aria-label="Language">
        <span aria-hidden="true">🌐</span>
        <select value={language} onChange={(event) => changeLanguage(event.target.value)}>
          {LANGUAGES.map(([code, name]) => <option value={code} key={code}>{name}</option>)}
        </select>
      </label>
    </>
  );
}
