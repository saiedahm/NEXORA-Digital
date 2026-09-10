"use strict";

/*
  NEXORA Digital
  Frontend Application
  Default language: German
  Supported languages: 20
*/

const API_BASE = "/api";


/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = {
  de: { name: "Deutsch", flag: "🇩🇪", native: "Deutsch" },
  en: { name: "English", flag: "🇬🇧", native: "English" },
  ar: { name: "Arabic", flag: "🇸🇦", native: "العربية", rtl: true },
  fr: { name: "French", flag: "🇫🇷", native: "Français" },
  es: { name: "Spanish", flag: "🇪🇸", native: "Español" },
  it: { name: "Italian", flag: "🇮🇹", native: "Italiano" },
  nl: { name: "Dutch", flag: "🇳🇱", native: "Nederlands" },
  pl: { name: "Polish", flag: "🇵🇱", native: "Polski" },
  tr: { name: "Turkish", flag: "🇹🇷", native: "Türkçe" },
  pt: { name: "Portuguese", flag: "🇵🇹", native: "Português" },
  ru: { name: "Russian", flag: "🇷🇺", native: "Русский" },
  uk: { name: "Ukrainian", flag: "🇺🇦", native: "Українська" },
  zh: { name: "Chinese", flag: "🇨🇳", native: "中文" },
  ja: { name: "Japanese", flag: "🇯🇵", native: "日本語" },
  ko: { name: "Korean", flag: "🇰🇷", native: "한국어" },
  hi: { name: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
  sv: { name: "Swedish", flag: "🇸🇪", native: "Svenska" },
  da: { name: "Danish", flag: "🇩🇰", native: "Dansk" },
  no: { name: "Norwegian", flag: "🇳🇴", native: "Norsk" },
  fi: { name: "Finnish", flag: "🇫🇮", native: "Suomi" }
};

const LANGUAGE_FLAGS = LANGUAGES;


/* =========================================================
   BASE TRANSLATION — GERMAN
========================================================= */

const DE_TRANSLATION = {

  nav_design: "Design",
  nav_requirements: "Anforderungen",
  nav_execution: "Umsetzung",
  nav_ai_team: "AI Team",
  nav_pricing: "Preise",
  nav_booking: "Termin",
  nav_contact: "Kontakt",

  hero_tag: "KI-GESTÜTZTE DIGITALE AGENTUR",
  hero_title_1: "Wir gestalten",
  hero_title_2: "die digitale Zukunft.",

  hero_text:
    "NEXORA Digital entwickelt moderne Websites, intelligente KI-Lösungen, Automatisierung und KI-Werbung für Unternehmen.",

  hero_check:
    "Website kostenlos prüfen",

  hero_ad:
    "KI-Werbung",

  hero_project:
    "Projekt starten",

  stat_team:
    "AI Team Mitglieder",

  stat_pipeline:
    "Automatisierte Workflow-Stufen",

  stat_languages:
    "Sprachen",

  stat_online:
    "Digital verfügbar",

  design_title:
    "Digitale Erlebnisse für die nächste Generation.",

  design_text:
    "Design, Technologie und künstliche Intelligenz werden zu einem digitalen System verbunden.",

  service_1_title:
    "Neue Website",

  service_1_text:
    "Moderne, responsive und conversion-orientierte Websites.",

  service_2_title:
    "Website Modernisierung",

  service_2_text:
    "Bestehende Websites werden technisch und visuell modernisiert.",

  service_3_title:
    "KI Integration",

  service_3_text:
    "KI-Assistenten, Automatisierung und intelligente Prozesse.",

  requirements_title:
    "Ihre Anforderungen werden zum digitalen Plan.",

  requirements_text:
    "Analyse, Strategie, Design, Entwicklung und Launch werden über einen strukturierten Workflow geführt.",

  step_1_title:
    "Analyse",

  step_1_text:
    "Unternehmen und Ziel werden analysiert.",

  step_2_title:
    "Research",

  step_2_text:
    "Markt, Website und Chancen werden untersucht.",

  step_3_title:
    "Audit",

  step_3_text:
    "Technische und digitale Schwachstellen werden erkannt.",

  step_4_title:
    "Design",

  step_4_text:
    "Ein individuelles UI/UX-Konzept wird erstellt.",

  step_5_title:
    "Freigabe",

  step_5_text:
    "Der Kunde bestätigt den nächsten Schritt.",

  team_title:
    "Ein virtueller 9-köpfiger AI-Workforce.",

  team_text:
    "Ein AI General Manager koordiniert acht spezialisierte Agenten und verteilt Aufgaben automatisch.",

  agent_manager:
    "Koordination & Aufgabenverteilung",

  agent_lead:
    "Lead- und Unternehmensanalyse",

  agent_audit:
    "Website- und SEO-Analyse",

  agent_design:
    "UI/UX und kreative Konzepte",

  agent_quote:
    "Angebote und Preisplanung",

  agent_ad:
    "KI-Werbung Kampagnen",

  agent_dev:
    "Entwicklung und Automatisierung",

  agent_qa:
    "Qualitätssicherung",

  agent_launch:
    "Deployment und Launch",

  ai_title:
    "Ihr intelligenter AI Manager.",

  ai_text:
    "Schreiben Sie einen Auftrag. Der AI Manager analysiert die Anfrage und weist die passende Aufgabe einem Agenten zu.",

  command_title:
    "AI COMMAND CENTER",

  command_placeholder:
    "Beschreiben Sie Ihren Auftrag...",

  ai_run:
    "Command ausführen",

  advertising_title:
    "KI-Werbung",

  advertising_text:
    "Beschreiben Sie Ihre gewünschte Werbung. Der AI Manager entwickelt daraus eine Kampagnenstruktur und bereitet die Distribution für geeignete Plattformen vor.",

  advertising_form_title:
    "Ihre AI-Werbeanfrage",

  company_placeholder:
    "Unternehmen",

  product_placeholder:
    "Produkt oder Dienstleistung",

  ad_placeholder:
    "Beschreiben Sie Ihre Werbung...",

  create_campaign:
    "AI Kampagne erstellen",

  campaign_empty:
    "Ihre AI-Kampagne wird hier angezeigt.",

  pricing_title:
    "Transparente digitale Pakete.",

  pricing_text:
    "Der AI Manager kann anhand Ihrer Anforderungen ein individuelles Angebot vorbereiten.",

  price_1_title:
    "New Website Design",

  price_1_text:
    "Moderne Unternehmenswebsite mit responsive Design.",

  price_2_title:
    "Website Modernization",

  price_2_text:
    "Modernisierung einer bestehenden Website.",

  price_3_title:
    "AI Integration",

  price_3_text:
    "Integration intelligenter KI-Funktionen.",

  price_4_title:
    "AI Advertising",

  price_4_text:
    "KI-basierte Kampagnenplanung und Werbematerial.",

  pricing_note:
    "Endpreise werden anhand des Projektumfangs individuell kalkuliert.",

  choose:
    "Auswählen",

  checker_title:
    "Prüfen Sie Ihre Website.",

  checker_text:
    "Der Website Audit Agent analysiert technische Basisdaten, SEO-Signale und erkannte Optimierungsmöglichkeiten.",

  url_placeholder:
    "https://ihre-website.de",

  audit_button:
    "Website analysieren",

  request_title:
    "Starten wir Ihr Projekt.",

  request_text:
    "Senden Sie Ihre Anfrage direkt an den NEXORA AI Manager.",

  form_title:
    "Projekt anfragen",

  name_placeholder:
    "Name / Unternehmen",

  email_placeholder:
    "E-Mail",

  message_placeholder:
    "Erzählen Sie uns von Ihrem Projekt...",

  form_send:
    "Anfrage senden",

  pipeline_title:
    "14-Stage Pipeline",

  execution_title:
    "Von der Anfrage bis zum Launch.",

  booking_title:
    "Buchen Sie ein kostenloses Erstgespräch.",

  booking_text:
    "Lassen Sie uns über Ihre digitale Zukunft sprechen.",

  booking_button:
    "Termin buchen",

  contact_title:
    "Let's build the future.",

  footer_company:
    "NEXORA DIGITAL",

  footer_legal:
    "LEGAL",

  privacy:
    "Datenschutz (DSGVO)",

  privacy_policy:
    "Datenschutzerklärung",

  impressum:
    "Impressum",

  terms:
    "Nutzungsbedingungen (AGB)",

  rights:
    "Alle Rechte vorbehalten.",


  /* =======================================================
     COOKIE CONSENT
  ======================================================= */

  cookie_title:
    "Wir verwenden Cookies",

  cookie_text:
    "Wir verwenden notwendige Cookies und lokale Speicherfunktionen, damit diese Website sicher und zuverlässig funktioniert. Nicht notwendige Analyse- oder Marketing-Technologien werden nur nach Ihrer Einwilligung aktiviert.",

  cookie_accept:
    "Alle akzeptieren",

  cookie_necessary:
    "Nur notwendige",

  cookie_settings:
    "Einstellungen",

  cookie_close:
    "Schließen",

  cookie_settings_title:
    "Cookie-Einstellungen",

  cookie_settings_text:
    "Sie können auswählen, welche optionalen Technologien Sie zulassen möchten.",

  cookie_necessary_title:
    "Notwendige Technologien",

  cookie_necessary_text:
    "Erforderlich für grundlegende Funktionen, Sicherheit, Spracheinstellungen und die Speicherung Ihrer Consent-Auswahl.",

  cookie_analytics_title:
    "Analyse / Statistik",

  cookie_analytics_text:
    "Ermöglicht optionale statistische Messungen und die Analyse der Nutzung dieser Website.",

  cookie_marketing_title:
    "Marketing",

  cookie_marketing_text:
    "Ermöglicht optionale Marketing- und Werbetechnologien.",

  cookie_save:
    "Auswahl speichern",

  cookie_privacy:
    "Datenschutzerklärung"
};


/* =========================================================
   ENGLISH
========================================================= */

const EN_TRANSLATION = {
  ...DE_TRANSLATION,

  nav_design: "Design",
  nav_requirements: "Requirements",
  nav_execution: "Execution",
  nav_ai_team: "AI Team",
  nav_pricing: "Pricing",
  nav_booking: "Booking",
  nav_contact: "Contact",

  hero_tag:
    "AI-POWERED DIGITAL AGENCY",

  hero_title_1:
    "We design",

  hero_title_2:
    "the digital future.",

  hero_text:
    "NEXORA Digital builds modern websites, intelligent AI solutions, automation and AI advertising systems for businesses.",

  hero_check:
    "Free Website Audit",

  hero_ad:
    "AI Advertising",

  hero_project:
    "Start Project",

  stat_team:
    "AI Team Members",

  stat_pipeline:
    "Automated Workflow Stages",

  stat_languages:
    "Languages",

  stat_online:
    "Digital Availability",

  design_title:
    "Digital experiences for the next generation.",

  design_text:
    "We connect design, technology and artificial intelligence into one digital system.",

  service_1_title:
    "New Website",

  service_1_text:
    "Modern, responsive and conversion-focused websites.",

  service_2_title:
    "Website Modernization",

  service_2_text:
    "Existing websites are technically and visually modernized.",

  service_3_title:
    "AI Integration",

  service_3_text:
    "AI assistants, automation and intelligent processes.",

  requirements_title:
    "Your requirements become a digital plan.",

  requirements_text:
    "Analysis, strategy, design, development and launch are managed through a structured workflow.",

  step_1_title:
    "Analysis",

  step_1_text:
    "The company and its objectives are analyzed.",

  step_2_title:
    "Research",

  step_2_text:
    "Market, website and opportunities are researched.",

  step_3_title:
    "Audit",

  step_3_text:
    "Technical and digital weaknesses are identified.",

  step_4_title:
    "Design",

  step_4_text:
    "An individual UI/UX concept is created.",

  step_5_title:
    "Approval",

  step_5_text:
    "The client approves the next step.",

  team_title:
    "A virtual 9-member AI workforce.",

  team_text:
    "An AI General Manager coordinates eight specialized agents and automatically distributes tasks.",

  agent_manager:
    "Coordination & task distribution",

  agent_lead:
    "Lead & company analysis",

  agent_audit:
    "Website & SEO analysis",

  agent_design:
    "UI/UX & creative concepts",

  agent_quote:
    "Quotes & pricing",

  agent_ad:
    "AI advertising campaigns",

  agent_dev:
    "Development & automation",

  agent_qa:
    "Quality assurance",

  agent_launch:
    "Deployment & launch",

  ai_title:
    "Your intelligent AI Manager.",

  ai_text:
    "Write a task. The AI Manager analyzes the request and assigns the appropriate task to an agent.",

  command_title:
    "AI COMMAND CENTER",

  command_placeholder:
    "Describe your task...",

  ai_run:
    "Run Command",

  advertising_title:
    "AI Advertising",

  advertising_text:
    "Describe your desired advertising campaign. The AI Manager turns it into a campaign structure and prepares distribution for suitable platforms.",

  advertising_form_title:
    "Your AI advertising request",

  company_placeholder:
    "Company",

  product_placeholder:
    "Product or service",

  ad_placeholder:
    "Describe your advertising...",

  create_campaign:
    "Create AI Campaign",

  campaign_empty:
    "Your AI campaign will appear here.",

  pricing_title:
    "Transparent digital packages.",

  pricing_text:
    "The AI Manager can prepare an individual offer based on your requirements.",

  price_1_title:
    "New Website Design",

  price_1_text:
    "Modern corporate website with responsive design.",

  price_2_title:
    "Website Modernization",

  price_2_text:
    "Modernization of an existing website.",

  price_3_title:
    "AI Integration",

  price_3_text:
    "Integration of intelligent AI functions.",

  price_4_title:
    "AI Advertising",

  price_4_text:
    "AI-based campaign planning and advertising material.",

  pricing_note:
    "Final prices are calculated individually based on project scope.",

  choose:
    "Choose",

  checker_title:
    "Check your website.",

  checker_text:
    "The Website Audit Agent analyzes technical basics, SEO signals and detected optimization opportunities.",

  url_placeholder:
    "https://your-website.com",

  audit_button:
    "Analyze Website",

  request_title:
    "Let's start your project.",

  request_text:
    "Send your request directly to the NEXORA AI Manager.",

  form_title:
    "Request a project",

  name_placeholder:
    "Name / Company",

  email_placeholder:
    "Email",

  message_placeholder:
    "Tell us about your project...",

  form_send:
    "Send Request",

  pipeline_title:
    "14-Stage Pipeline",

  execution_title:
    "From request to launch.",

  booking_title:
    "Book a free consultation.",

  booking_text:
    "Let's talk about your digital future.",

  booking_button:
    "Book Appointment",

  contact_title:
    "Let's build the future."
};


/* =========================================================
   LANGUAGE TRANSLATIONS
========================================================= */

const TRANSLATIONS = {
  de: DE_TRANSLATION,
  en: EN_TRANSLATION
};


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentLanguage =
  localStorage.getItem("nexora_language") || "de";

let currentService = "";

let lastAIResponse = null;

let systemStatus = null;


/* =========================================================
   DOM HELPERS
========================================================= */

function $(selector, root = document) {
  return root.querySelector(selector);
}


function $$(selector, root = document) {
  return Array.from(
    root.querySelectorAll(selector)
  );
}


function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function safeJSON(value, fallback = {}) {

  try {

    if (
      typeof value === "string"
    ) {

      return JSON.parse(value);

    }

    return value ?? fallback;

  }

  catch {

    return fallback;

  }

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function getTranslationLanguage() {

  if (
    TRANSLATIONS[currentLanguage]
  ) {

    return TRANSLATIONS[currentLanguage];

  }

  return DE_TRANSLATION;

}


function applyTranslations() {

  const translation =
    getTranslationLanguage();


  $$("[data-i18n]").forEach(
    element => {

      const key =
        element.getAttribute(
          "data-i18n"
        );


      if (
        key &&
        Object.prototype.hasOwnProperty.call(
          translation,
          key
        )
      ) {

        element.textContent =
          translation[key];

      }

    }
  );


  $$("[data-i18n-placeholder]").forEach(
    element => {

      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );


      if (
        key &&
        Object.prototype.hasOwnProperty.call(
          translation,
          key
        )
      ) {

        element.placeholder =
          translation[key];

      }

    }
  );


  document.documentElement.lang =
    currentLanguage;


  if (
    LANGUAGES[currentLanguage]?.rtl
  ) {

    document.documentElement.dir =
      "rtl";

  }

  else {

    document.documentElement.dir =
      "ltr";

  }


  updateLanguageButton();

}


function updateLanguageButton() {

  const button =
    $("[data-language-current]");


  if (!button)
    return;


  const language =
    LANGUAGES[currentLanguage] ||
    LANGUAGES.de;


  button.textContent =
    `${language.flag} ${language.native}`;

}


function setLanguage(languageCode) {

  if (
    !LANGUAGES[languageCode]
  ) {

    languageCode = "de";

  }


  currentLanguage =
    languageCode;


  localStorage.setItem(
    "nexora_language",
    currentLanguage
  );


  applyTranslations();

  closeLanguageMenu();

}


function toggleLanguageMenu() {

  const menu =
    $("#languageMenu");


  if (!menu)
    return;


  menu.classList.toggle(
    "is-open"
  );

}


function closeLanguageMenu() {

  const menu =
    $("#languageMenu");


  if (!menu)
    return;


  menu.classList.remove(
    "is-open"
  );

}


/* =========================================================
   LANGUAGE MENU
========================================================= */

function renderLanguageMenu() {

  const menu =
    $("#languageMenu");


  if (!menu)
    return;


  menu.innerHTML = "";


  Object.entries(LANGUAGES)
    .forEach(
      ([code, language]) => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.className =
          "language-option";


        button.dataset.language =
          code;


        button.innerHTML =
          `<span>${escapeHTML(language.flag)}</span>
           <span>${escapeHTML(language.native)}</span>`;


        if (
          code === currentLanguage
        ) {

          button.classList.add(
            "active"
          );

        }


        button.addEventListener(
          "click",
          () => {

            setLanguage(code);

          }
        );


        menu.appendChild(
          button
        );

      }
    );

}


/* =========================================================
   API HELPERS
========================================================= */

async function apiRequest(
  path,
  options = {}
) {

  const controller =
    new AbortController();


  const timeout =
    setTimeout(
      () => controller.abort(),
      options.timeout || 20000
    );


  try {

    const response =
      await fetch(
        `${API_BASE}${path}`,
        {
          ...options,
          credentials:
            options.credentials ||
            "same-origin",
          signal:
            controller.signal,
          headers: {
            "Content-Type":
              "application/json",
            ...(options.headers || {})
          }
        }
      );


    const contentType =
      response.headers.get(
        "content-type"
      ) || "";


    const data =
      contentType.includes(
        "application/json"
      )
        ? await response.json()
        : await response.text();


    if (!response.ok) {

      const message =
        typeof data === "object"
          ? (
              data.message ||
              data.error ||
              `Request failed (${response.status})`
            )
          : (
              data ||
              `Request failed (${response.status})`
            );


      const error =
        new Error(message);


      error.status =
        response.status;


      error.data =
        data;


      throw error;

    }


    return data;

  }

  finally {

    clearTimeout(timeout);

  }

}


/* =========================================================
   AI RESPONSE FORMATTER
========================================================= */

function formatAIResult(data) {

  if (!data)
    return "";


  const response =
    data.response ||
    data.message ||
    data.result ||
    data.output ||
    "";


  const assignedAgent =
    data.assignedAgent ||
    data.nextAgent ||
    "";


  const actions =
    Array.isArray(data.actions)
      ? data.actions
      : [];


  const parts = [];


  if (assignedAgent) {

    parts.push(
      `<div class="ai-result-agent">
        <strong>Agent:</strong>
        ${escapeHTML(assignedAgent)}
      </div>`
    );

  }


  if (response) {

    parts.push(
      `<div class="ai-result-response">
        ${escapeHTML(response)}
      </div>`
    );

  }


  if (actions.length) {

    parts.push(
      `<div class="ai-result-actions">
        <strong>Next actions</strong>
        <ul>
          ${actions
            .map(
              action =>
                `<li>${escapeHTML(action)}</li>`
            )
            .join("")}
        </ul>
      </div>`
    );

  }


  if (!parts.length) {

    parts.push(
      `<div class="ai-result-response">
        Anfrage wurde verarbeitet.
      </div>`
    );

  }


  return parts.join("");

}


/* =========================================================
   AI COMMAND CENTER
========================================================= */

async function runAICommand() {

  const input =
    $("#aiCommandInput") ||
    $("#aiCommand");


  const output =
    $("#aiCommandResult") ||
    $("#aiResponse");


  const button =
    $("#runAICommandBtn") ||
    $("[onclick*='runAICommand']");


  const command =
    input?.value?.trim() || "";


  if (!command) {

    if (output) {

      output.innerHTML =
        `<div class="ai-result-error">
          Bitte beschreiben Sie zuerst Ihren Auftrag.
        </div>`;

    }

    input?.focus();

    return;

  }


  const startedAt =
    performance.now();


  if (button) {

    button.disabled = true;

    button.dataset.originalText =
      button.textContent;

    button.textContent =
      "AI Manager arbeitet…";

  }


  if (output) {

    output.innerHTML =
      `<div class="ai-result-loading">
        <span class="ai-loading-dot"></span>
        AI General Manager analysiert und routet Ihren Auftrag…
      </div>`;

  }


  try {

    const data =
      await apiRequest(
        "/command",
        {
          method: "POST",
          body:
            JSON.stringify({
              command,
              language:
                currentLanguage
            }),
          timeout:
            20000
        }
      );


    const elapsed =
      Math.round(
        performance.now() -
        startedAt
      );


    lastAIResponse =
      data;


    if (output) {

      output.innerHTML =
        formatAIResult(data);

      output.dataset.responseMs =
        String(elapsed);

    }


    return data;

  }

  catch (error) {

    if (output) {

      output.innerHTML =
        `<div class="ai-result-error">
          ${escapeHTML(
            error.message ||
            "Der AI Manager ist momentan nicht erreichbar."
          )}
        </div>`;

    }


    console.error(
      "NEXORA AI command error:",
      error
    );


    return null;

  }

  finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        button.dataset.originalText ||
        "Command ausführen";

    }

  }

}
  requirements_title:
    "Your requirements become a digital plan.",

  requirements_text:
    "Analysis, strategy, design, development and launch are managed through a structured workflow.",

  step_1_title:
    "Analysis",

  step_1_text:
    "The business and objective are analyzed.",

  step_2_title:
    "Research",

  step_2_text:
    "Market, website and opportunities are researched.",

  step_3_title:
    "Audit",

  step_3_text:
    "Technical and digital weaknesses are identified.",

  step_4_title:
    "Design",

  step_4_text:
    "A custom UI/UX concept is created.",

  step_5_title:
    "Approval",

  step_5_text:
    "The client approves the next step.",

  team_title:
    "A virtual 9-member AI workforce.",

  team_text:
    "An AI General Manager coordinates eight specialized agents and automatically assigns tasks.",

  agent_manager:
    "Coordination & task routing",

  agent_lead:
    "Lead and company research",

  agent_audit:
    "Website and SEO analysis",

  agent_design:
    "UI/UX and creative concepts",

  agent_quote:
    "Quotes and pricing",

  agent_ad:
    "AI advertising campaigns",

  agent_dev:
    "Development and automation",

  agent_qa:
    "Quality assurance",

  agent_launch:
    "Deployment and launch",

  ai_title:
    "Your intelligent AI Manager.",

  ai_text:
    "Write an instruction. The AI Manager analyzes it and routes the task to the appropriate agent.",

  command_title:
    "AI COMMAND CENTER",

  command_placeholder:
    "Describe your request...",

  ai_run:
    "Run Command",

  advertising_title:
    "AI Advertising",

  advertising_text:
    "Describe your advertising request. The AI Manager turns it into a campaign structure and prepares distribution for suitable platforms.",

  advertising_form_title:
    "Your AI Advertising Request",

  company_placeholder:
    "Company",

  product_placeholder:
    "Product or service",

  ad_placeholder:
    "Describe your advertisement...",

  create_campaign:
    "Create AI Campaign",

  campaign_empty:
    "Your AI campaign will appear here.",

  pricing_title:
    "Transparent digital packages.",

  pricing_text:
    "The AI Manager can prepare a tailored proposal based on your requirements.",

  pricing_note:
    "Final prices are calculated according to project scope.",

  choose:
    "Choose",

  checker_title:
    "Check your website.",

  checker_text:
    "The Website Audit Agent analyzes technical signals, SEO data and detected optimization opportunities.",

  url_placeholder:
    "https://your-website.com",

  audit_button:
    "Analyze Website",

  request_title:
    "Let's start your project.",

  request_text:
    "Send your request directly to the NEXORA AI Manager.",

  form_title:
    "Request a Project",

  name_placeholder:
    "Name / Company",

  email_placeholder:
    "Email",

  message_placeholder:
    "Tell us about your project...",

  form_send:
    "Send Request",

  execution_title:
    "From request to launch.",

  booking_title:
    "Book a free initial consultation.",

  booking_text:
    "Let's discuss your digital future.",

  booking_button:
    "Book Meeting",

  contact_title:
    "Let's build the future.",

  footer_company:
    "NEXORA DIGITAL",

  footer_legal:
    "LEGAL",

  privacy:
    "Privacy Policy",

  privacy_policy:
    "Privacy Policy",

  impressum:
    "Legal Notice",

  terms:
    "Terms & Conditions",

  rights:
    "All Rights Reserved.",

  cookie_title:
    "We use cookies",

  cookie_text:
    "We use necessary cookies and local storage functions so this website can work securely and reliably. Optional analytics or marketing technologies are activated only with your consent.",

  cookie_accept:
    "Accept all",

  cookie_necessary:
    "Necessary only",

  cookie_settings:
    "Settings",

  cookie_close:
    "Close",

  cookie_settings_title:
    "Cookie Settings",

  cookie_settings_text:
    "Choose which optional technologies you allow.",

  cookie_necessary_title:
    "Necessary technologies",

  cookie_necessary_text:
    "Required for core functions, security, language preferences and storing your consent choice.",

  cookie_analytics_title:
    "Analytics / Statistics",

  cookie_analytics_text:
    "Allows optional statistical measurement and analysis of website usage.",

  cookie_marketing_title:
    "Marketing",

  cookie_marketing_text:
    "Allows optional marketing and advertising technologies.",

  cookie_save:
    "Save selection",

  cookie_privacy:
    "Privacy Policy"
};


/* =========================================================
   ARABIC
========================================================= */

const AR_TRANSLATION = {
  ...DE_TRANSLATION,

  nav_design: "التصميم",
  nav_requirements: "المتطلبات",
  nav_execution: "التنفيذ",
  nav_ai_team: "فريق الذكاء الاصطناعي",
  nav_pricing: "الأسعار",
  nav_booking: "الحجز",
  nav_contact: "اتصل بنا",

  hero_tag:
    "وكالة رقمية مدعومة بالذكاء الاصطناعي",

  hero_title_1:
    "نصمم",

  hero_title_2:
    "المستقبل الرقمي.",

  hero_text:
    "تطوّر NEXORA Digital مواقع حديثة وحلول ذكاء اصطناعي وأتمتة وإعلانات ذكية للشركات.",

  hero_check:
    "فحص الموقع مجاناً",

  hero_ad:
    "الإعلانات بالذكاء الاصطناعي",

  hero_project:
    "ابدأ مشروعك",

  stat_team:
    "أعضاء فريق AI",

  stat_pipeline:
    "مراحل سير العمل",

  stat_languages:
    "اللغات",

  stat_online:
    "متاح رقمياً",

  design_title:
    "تجارب رقمية للجيل القادم.",

  design_text:
    "نربط التصميم والتكنولوجيا والذكاء الاصطناعي في نظام رقمي واحد.",

  service_1_title:
    "موقع جديد",

  service_1_text:
    "مواقع حديثة ومتجاوبة ومصممة للتحويل.",

  service_2_title:
    "تحديث الموقع",

  service_2_text:
    "تحديث المواقع الحالية تقنياً وبصرياً.",

  service_3_title:
    "دمج الذكاء الاصطناعي",

  service_3_text:
    "مساعدون وأتمتة وعمليات ذكية.",

  requirements_title:
    "متطلباتك تتحول إلى خطة رقمية.",

  requirements_text:
    "يتم تنظيم التحليل والاستراتيجية والتصميم والتطوير والإطلاق ضمن سير عمل واضح.",

  step_1_title:
    "تحليل",

  step_1_text:
    "تحليل الشركة والهدف.",

  step_2_title:
    "بحث",

  step_2_text:
    "بحث السوق والموقع والفرص.",

  step_3_title:
    "تدقيق",

  step_3_text:
    "اكتشاف المشاكل التقنية والرقمية.",

  step_4_title:
    "تصميم",

  step_4_text:
    "إنشاء مفهوم UI/UX مخصص.",

  step_5_title:
    "موافقة",

  step_5_text:
    "يؤكد العميل الخطوة التالية.",

  team_title:
    "فريق افتراضي من 9 أعضاء بالذكاء الاصطناعي.",

  team_text:
    "يدير AI General Manager ثمانية وكلاء متخصصين ويوزع المهام تلقائياً.",

  agent_manager:
    "التنسيق وتوزيع المهام",

  agent_lead:
    "بحث العملاء والشركات",

  agent_audit:
    "تحليل الموقع وSEO",

  agent_design:
    "UI/UX والأفكار الإبداعية",

  agent_quote:
    "العروض والأسعار",

  agent_ad:
    "حملات الإعلانات بالذكاء الاصطناعي",

  agent_dev:
    "التطوير والأتمتة",

  agent_qa:
    "ضمان الجودة",

  agent_launch:
    "الإطلاق والنشر",

  ai_title:
    "مدير AI الذكي.",

  ai_text:
    "اكتب طلبك وسيقوم المدير بتحليله وتوجيه المهمة إلى الوكيل المناسب.",

  command_title:
    "مركز أوامر AI",

  command_placeholder:
    "اكتب طلبك...",

  ai_run:
    "تنفيذ الأمر",

  advertising_title:
    "الإعلانات بالذكاء الاصطناعي",

  advertising_text:
    "صف الإعلان الذي تريده وسيقوم مدير AI ببناء هيكل الحملة وتجهيزها للمنصات المناسبة.",

  advertising_form_title:
    "طلب إعلان بالذكاء الاصطناعي",

  company_placeholder:
    "الشركة",

  product_placeholder:
    "المنتج أو الخدمة",

  ad_placeholder:
    "صف الإعلان...",

  create_campaign:
    "إنشاء حملة AI",

  campaign_empty:
    "ستظهر حملة AI هنا.",

  pricing_title:
    "باقات رقمية واضحة.",

  pricing_text:
    "يمكن لمدير AI إعداد عرض مخصص بناءً على متطلباتك.",

  pricing_note:
    "يتم تحديد السعر النهائي حسب نطاق المشروع.",

  choose:
    "اختيار",

  checker_title:
    "افحص موقعك.",

  checker_text:
    "يقوم وكيل تدقيق المواقع بتحليل البيانات التقنية وإشارات SEO وفرص التحسين.",

  url_placeholder:
    "https://example.com",

  audit_button:
    "تحليل الموقع",

  request_title:
    "لنبدأ مشروعك.",

  request_text:
    "أرسل طلبك مباشرة إلى مدير NEXORA AI.",

  form_title:
    "طلب مشروع",

  name_placeholder:
    "الاسم / الشركة",

  email_placeholder:
    "البريد الإلكتروني",

  message_placeholder:
    "أخبرنا عن مشروعك...",

  form_send:
    "إرسال الطلب",

  execution_title:
    "من الطلب حتى الإطلاق.",

  booking_title:
    "احجز استشارة أولية مجانية.",

  booking_text:
    "لنتحدث عن مستقبلك الرقمي.",

  booking_button:
    "حجز موعد",

  contact_title:
    "لنبنِ المستقبل.",

  footer_company:
    "NEXORA DIGITAL",

  footer_legal:
    "قانوني",

  privacy:
    "الخصوصية (DSGVO)",

  privacy_policy:
    "بيان الخصوصية",

  impressum:
    "الإشعار القانوني",

  terms:
    "الشروط والأحكام",

  rights:
    "جميع الحقوق محفوظة.",

  cookie_title:
    "نستخدم ملفات تعريف الارتباط",

  cookie_text:
    "نستخدم ملفات الارتباط الضرورية والتخزين المحلي لكي يعمل الموقع بشكل آمن وموثوق. لا يتم تفعيل تقنيات التحليل أو التسويق الاختيارية إلا بعد موافقتك.",

  cookie_accept:
    "قبول الكل",

  cookie_necessary:
    "الضرورية فقط",

  cookie_settings:
    "الإعدادات",

  cookie_close:
    "إغلاق",

  cookie_settings_title:
    "إعدادات ملفات الارتباط",

  cookie_settings_text:
    "اختر التقنيات الاختيارية التي تسمح بها.",

  cookie_necessary_title:
    "التقنيات الضرورية",

  cookie_necessary_text:
    "مطلوبة للوظائف الأساسية والأمان وإعدادات اللغة وحفظ اختيار الموافقة.",

  cookie_analytics_title:
    "التحليل والإحصاءات",

  cookie_analytics_text:
    "تسمح بالقياس الإحصائي الاختياري وتحليل استخدام الموقع.",

  cookie_marketing_title:
    "التسويق",

  cookie_marketing_text:
    "تسمح بتقنيات التسويق والإعلانات الاختيارية.",

  cookie_save:
    "حفظ الاختيار",

  cookie_privacy:
    "بيان الخصوصية"
};

    cookie_necessary:
      "Yalnızca gerekli",

    cookie_settings:
      "Ayarlar",

    cookie_close:
      "Kapat",

    cookie_settings_title:
      "Çerez ayarları",

    cookie_settings_text:
      "İzin verdiğiniz isteğe bağlı teknolojileri seçin.",

    cookie_necessary_title:
      "Gerekli teknolojiler",

    cookie_necessary_text:
      "Temel işlevler, güvenlik, dil tercihleri ve izin seçiminizin saklanması için gereklidir.",

    cookie_analytics_title:
      "Analiz / İstatistik",

    cookie_analytics_text:
      "İsteğe bağlı istatistiksel ölçüm ve site kullanım analizine izin verir.",

    cookie_marketing_title:
      "Pazarlama",

    cookie_marketing_text:
      "İsteğe bağlı pazarlama ve reklam teknolojilerine izin verir.",

    cookie_save:
      "Seçimi kaydet",

    cookie_privacy:
      "Gizlilik Politikası"
  },

  pt: {
    nav_design: "Design",
    nav_requirements: "Requisitos",
    nav_execution: "Execução",
    nav_ai_team: "Equipe IA",
    nav_pricing: "Preços",
    nav_booking: "Agendamento",
    nav_contact: "Contato",

    hero_tag:
      "AGÊNCIA DIGITAL COM IA",

    hero_title_1:
      "Nós criamos",

    hero_title_2:
      "o futuro digital.",

    hero_check:
      "Auditoria gratuita do site",

    hero_ad:
      "Publicidade com IA",

    hero_project:
      "Iniciar projeto",

    design_title:
      "Experiências digitais para a próxima geração.",

    team_title:
      "Uma força de trabalho virtual com 9 agentes de IA.",

    ai_title:
      "Seu AI Manager inteligente.",

    command_placeholder:
      "Descreva sua solicitação...",

    ai_run:
      "Executar comando",

    advertising_title:
      "Publicidade com IA",

    company_placeholder:
      "Empresa",

    product_placeholder:
      "Produto ou serviço",

    ad_placeholder:
      "Descreva seu anúncio...",

    create_campaign:
      "Criar campanha de IA",

    checker_title:
      "Verifique seu site.",

    audit_button:
      "Analisar site",

    request_title:
      "Vamos começar seu projeto.",

    form_title:
      "Solicitar projeto",

    name_placeholder:
      "Nome / Empresa",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Conte-nos sobre seu projeto...",

    form_send:
      "Enviar solicitação",

    booking_title:
      "Agende uma consulta inicial gratuita.",

    booking_button:
      "Agendar reunião",

    contact_title:
      "Vamos construir o futuro.",

    cookie_title:
      "Utilizamos cookies",

    cookie_text:
      "Utilizamos cookies necessários e funções de armazenamento local para garantir que este site funcione de forma segura e confiável. Tecnologias opcionais de análise ou marketing só são ativadas com o seu consentimento.",

    cookie_accept:
      "Aceitar tudo",

    cookie_necessary:
      "Apenas necessários",

    cookie_settings:
      "Definições",

    cookie_close:
      "Fechar",

    cookie_settings_title:
      "Definições de cookies",

    cookie_settings_text:
      "Escolha as tecnologias opcionais que autoriza.",

    cookie_necessary_title:
      "Tecnologias necessárias",

    cookie_necessary_text:
      "Necessárias para funções básicas, segurança, idioma e armazenamento da sua escolha de consentimento.",

    cookie_analytics_title:
      "Análise / Estatísticas",

    cookie_analytics_text:
      "Permite medições estatísticas e análise opcional do uso do site.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Permite tecnologias opcionais de marketing e publicidade.",

    cookie_save:
      "Guardar seleção",

    cookie_privacy:
      "Política de privacidade"
  },

  ru: {
    nav_design: "Дизайн",
    nav_requirements: "Требования",
    nav_execution: "Реализация",
    nav_ai_team: "AI-команда",
    nav_pricing: "Цены",
    nav_booking: "Встреча",
    nav_contact: "Контакты",

    hero_tag:
      "ЦИФРОВОЕ АГЕНТСТВО НА ОСНОВЕ ИИ",

    hero_title_1:
      "Мы создаём",

    hero_title_2:
      "цифровое будущее.",

    hero_check:
      "Бесплатный аудит сайта",

    hero_ad:
      "Реклама с ИИ",

    hero_project:
      "Начать проект",

    design_title:
      "Цифровой опыт нового поколения.",

    team_title:
      "Виртуальная команда из 9 AI-агентов.",

    ai_title:
      "Ваш интеллектуальный AI Manager.",

    command_placeholder:
      "Опишите задачу...",

    ai_run:
      "Выполнить команду",

    advertising_title:
      "Реклама с ИИ",

    company_placeholder:
      "Компания",

    product_placeholder:
      "Продукт или услуга",

    ad_placeholder:
      "Опишите рекламу...",

    create_campaign:
      "Создать AI-кампанию",

    checker_title:
      "Проверьте свой сайт.",

    audit_button:
      "Анализировать сайт",

    request_title:
      "Начнём ваш проект.",

    form_title:
      "Запросить проект",

    name_placeholder:
      "Имя / Компания",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Расскажите о проекте...",

    form_send:
      "Отправить запрос",

    booking_title:
      "Забронируйте бесплатную консультацию.",

    booking_button:
      "Забронировать встречу",

    contact_title:
      "Создадим будущее вместе.",

    cookie_title:
      "Мы используем файлы cookie",

    cookie_text:
      "Мы используем необходимые файлы cookie и локальное хранилище для безопасной и надёжной работы сайта. Необязательные аналитические или маркетинговые технологии активируются только с вашего согласия.",

    cookie_accept:
      "Принять всё",

    cookie_necessary:
      "Только необходимые",

    cookie_settings:
      "Настройки",

    cookie_close:
      "Закрыть",

    cookie_settings_title:
      "Настройки cookie",

    cookie_settings_text:
      "Выберите, какие необязательные технологии вы разрешаете.",

    cookie_necessary_title:
      "Необходимые технологии",

    cookie_necessary_text:
      "Необходимы для основных функций, безопасности, языка и сохранения вашего выбора согласия.",

    cookie_analytics_title:
      "Аналитика / Статистика",

    cookie_analytics_text:
      "Позволяет использовать необязательные статистические измерения и анализ использования сайта.",

    cookie_marketing_title:
      "Маркетинг",

    cookie_marketing_text:
      "Позволяет использовать необязательные маркетинговые и рекламные технологии.",

    cookie_save:
      "Сохранить выбор",

    cookie_privacy:
      "Политика конфиденциальности"
  },

  uk: {
    nav_design: "Дизайн",
    nav_requirements: "Вимоги",
    nav_execution: "Реалізація",
    nav_ai_team: "AI команда",
    nav_pricing: "Ціни",
    nav_booking: "Зустріч",
    nav_contact: "Контакти",

    hero_tag:
      "ЦИФРОВА АГЕНЦІЯ НА ОСНОВІ ШІ",

    hero_title_1:
      "Ми створюємо",

    hero_title_2:
      "цифрове майбутнє.",

    hero_check:
      "Безкоштовний аудит сайту",

    hero_ad:
      "Реклама з ШІ",

    hero_project:
      "Почати проєкт",

    design_title:
      "Цифровий досвід нового покоління.",

    team_title:
      "Віртуальна команда з 9 AI-агентів.",

    ai_title:
      "Ваш інтелектуальний AI Manager.",

    command_placeholder:
      "Опишіть завдання...",

    ai_run:
      "Виконати команду",

    advertising_title:
      "Реклама з ШІ",

    company_placeholder:
      "Компанія",

    product_placeholder:
      "Продукт або послуга",

    ad_placeholder:
      "Опишіть рекламу...",

    create_campaign:
      "Створити AI-кампанію",

    checker_title:
      "Перевірте свій сайт.",

    audit_button:
      "Аналізувати сайт",

    request_title:
      "Почнімо ваш проєкт.",

    form_title:
      "Запит на проєкт",

    name_placeholder:
      "Ім'я / Компанія",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Розкажіть про ваш проєкт...",

    form_send:
      "Надіслати запит",

    booking_title:
      "Забронюйте безкоштовну консультацію.",

    booking_button:
      "Забронювати зустріч",

    contact_title:
      "Створюймо майбутнє разом.",

    cookie_title:
      "Ми використовуємо файли cookie",

    cookie_text:
      "Ми використовуємо необхідні файли cookie та локальне сховище для безпечної та надійної роботи сайту. Необов'язкові аналітичні чи маркетингові технології активуються лише за вашою згодою.",

    cookie_accept:
      "Прийняти все",

    cookie_necessary:
      "Лише необхідні",

    cookie_settings:
      "Налаштування",

    cookie_close:
      "Закрити",

    cookie_settings_title:
      "Налаштування cookie",

    cookie_settings_text:
      "Виберіть необов'язкові технології, які ви дозволяєте.",

    cookie_necessary_title:
      "Необхідні технології",

    cookie_necessary_text:
      "Потрібні для основних функцій, безпеки, мови та збереження вашого вибору згоди.",

    cookie_analytics_title:
      "Аналітика / Статистика",

    cookie_analytics_text:
      "Дозволяє необов'язкові статистичні вимірювання та аналіз використання сайту.",

    cookie_marketing_title:
      "Маркетинг",

    cookie_marketing_text:
      "Дозволяє необов'язкові маркетингові та рекламні технології.",

    cookie_save:
      "Зберегти вибір",

    cookie_privacy:
      "Політика конфіденційності"
  },

  zh: {
    nav_design: "设计",
    nav_requirements: "需求",
    nav_execution: "实施",
    nav_ai_team: "AI团队",
    nav_pricing: "价格",
    nav_booking: "预约",
    nav_contact: "联系我们",

    hero_tag:
      "AI 驱动的数字机构",

    hero_title_1:
      "我们设计",

    hero_title_2:
      "数字未来。",

    hero_check:
      "免费网站审核",

    hero_ad:
      "AI 广告",

    hero_project:
      "开始项目",

    design_title:
      "面向下一代的数字体验。",

    team_title:
      "虚拟9人AI工作团队。",

    ai_title:
      "您的智能 AI Manager。",

    command_placeholder:
      "描述您的需求...",

    ai_run:
      "执行命令",

    advertising_title:
      "AI 广告",

    company_placeholder:
      "公司",

    product_placeholder:
      "产品或服务",

    ad_placeholder:
      "描述您的广告...",

    create_campaign:
      "创建AI广告活动",

    checker_title:
      "检查您的网站。",

    audit_button:
      "分析网站",

    request_title:
      "开始您的项目。",

    form_title:
      "项目申请",

    name_placeholder:
      "姓名 / 公司",

    email_placeholder:
      "电子邮件",

    message_placeholder:
      "告诉我们您的项目...",

    form_send:
      "发送请求",

    booking_title:
      "预约免费的初次咨询。",

    booking_button:
      "预约会议",

    contact_title:
      "共同打造未来。",

    cookie_title:
      "我们使用 Cookie",

    cookie_text:
      "我们使用必要的 Cookie 和本地存储功能，以确保网站安全可靠地运行。可选的分析或营销技术仅在获得您的同意后启用。",

    cookie_accept:
      "全部接受",

    cookie_necessary:
      "仅必要功能",

    cookie_settings:
      "设置",

    cookie_close:
      "关闭",

    cookie_settings_title:
      "Cookie 设置",

    cookie_settings_text:
      "选择您允许的可选技术。",

    cookie_necessary_title:
      "必要技术",

    cookie_necessary_text:
      "用于基本功能、安全、语言设置以及保存您的同意选择。",

    cookie_analytics_title:
      "分析 / 统计",

    cookie_analytics_text:
      "允许可选的网站统计和使用分析。",

    cookie_marketing_title:
      "营销",

    cookie_marketing_text:
      "允许可选的营销和广告技术。",

    cookie_save:
      "保存选择",

    cookie_privacy:
      "隐私政策"
  },

  ja: {
    nav_design: "デザイン",
    nav_requirements: "要件",
    nav_execution: "実装",
    nav_ai_team: "AIチーム",
    nav_pricing: "料金",
    nav_booking: "予約",
    nav_contact: "お問い合わせ",

    hero_tag:
      "AIを活用したデジタルエージェンシー",

    hero_title_1:
      "私たちは創造します",

    hero_title_2:
      "デジタルの未来を。",

    hero_check:
      "無料ウェブサイト監査",

    hero_ad:
      "AI広告",

    hero_project:
      "プロジェクトを開始",

    design_title:
      "次世代のデジタル体験。",

    team_title:
      "9人の仮想AIワークフォース。",

    ai_title:
      "あなたのインテリジェントAI Manager。",

    command_placeholder:
      "依頼内容を入力してください...",

    ai_run:
      "コマンド実行",

    advertising_title:
      "AI広告",

    company_placeholder:
      "会社名",

    product_placeholder:
      "製品またはサービス",

    ad_placeholder:
      "広告内容を入力してください...",

    create_campaign:
      "AIキャンペーンを作成",

    checker_title:
      "ウェブサイトをチェック。",

    audit_button:
      "サイトを分析",

    request_title:
      "プロジェクトを始めましょう。",

    form_title:
      "プロジェクトを依頼",

    name_placeholder:
      "名前 / 会社",

    email_placeholder:
      "メール",

    message_placeholder:
      "プロジェクトについて教えてください...",

    form_send:
      "依頼を送信",

    booking_title:
      "無料の初回相談を予約。",

    booking_button:
      "予約する",

    contact_title:
      "未来を一緒につくりましょう。",

    cookie_title:
      "Cookieを使用しています",

    cookie_text:
      "このウェブサイトを安全かつ安定して機能させるため、必要なCookieとローカルストレージを使用しています。任意の分析・マーケティング技術は同意後にのみ有効になります。",

    cookie_accept:
      "すべて許可",

    cookie_necessary:
      "必要なもののみ",

    cookie_settings:
      "設定",
```javascript
  fr: {
    nav_design: "Design",
    nav_requirements: "Exigences",
    nav_execution: "Mise en œuvre",
    nav_ai_team: "Équipe IA",
    nav_pricing: "Tarifs",
    nav_booking: "Rendez-vous",
    nav_contact: "Contact",

    hero_tag:
      "AGENCE DIGITALE PROPULSÉE PAR L'IA",

    hero_title_1:
      "Nous créons",

    hero_title_2:
      "le futur numérique.",

    hero_check:
      "Auditer gratuitement le site",

    hero_ad:
      "Publicité IA",

    hero_project:
      "Démarrer le projet",

    design_title:
      "Des expériences numériques pour la prochaine génération.",

    team_title:
      "Une équipe virtuelle de 9 agents IA.",

    ai_title:
      "Votre AI Manager intelligent.",

    command_placeholder:
      "Décrivez votre demande...",

    ai_run:
      "Exécuter",

    advertising_title:
      "Publicité IA",

    company_placeholder:
      "Entreprise",

    product_placeholder:
      "Produit ou service",

    ad_placeholder:
      "Décrivez votre publicité...",

    create_campaign:
      "Créer une campagne IA",

    checker_title:
      "Analysez votre site.",

    audit_button:
      "Analyser le site",

    request_title:
      "Commençons votre projet.",

    form_title:
      "Demander un projet",

    name_placeholder:
      "Nom / Entreprise",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Parlez-nous de votre projet...",

    form_send:
      "Envoyer la demande",

    booking_title:
      "Réservez une première consultation gratuite.",

    booking_button:
      "Réserver un rendez-vous",

    contact_title:
      "Construisons le futur.",

    cookie_title:
      "Nous utilisons des cookies",

    cookie_text:
      "Nous utilisons des cookies nécessaires et des fonctions de stockage local pour assurer le fonctionnement sécurisé et fiable du site. Les technologies optionnelles d'analyse ou de marketing ne sont activées qu'avec votre consentement.",

    cookie_accept:
      "Tout accepter",

    cookie_necessary:
      "Nécessaires uniquement",

    cookie_settings:
      "Paramètres",

    cookie_close:
      "Fermer",

    cookie_settings_title:
      "Paramètres des cookies",

    cookie_settings_text:
      "Choisissez les technologies optionnelles que vous autorisez.",

    cookie_necessary_title:
      "Technologies nécessaires",

    cookie_necessary_text:
      "Nécessaires pour les fonctions principales, la sécurité, la langue et l'enregistrement de votre consentement.",

    cookie_analytics_title:
      "Analyse / Statistiques",

    cookie_analytics_text:
      "Permet des mesures statistiques et une analyse facultative de l'utilisation du site.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Permet les technologies facultatives de marketing et de publicité.",

    cookie_save:
      "Enregistrer",

    cookie_privacy:
      "Politique de confidentialité"
  },

  es: {
    nav_design: "Diseño",
    nav_requirements: "Requisitos",
    nav_execution: "Ejecución",
    nav_ai_team: "Equipo IA",
    nav_pricing: "Precios",
    nav_booking: "Cita",
    nav_contact: "Contacto",

    hero_tag:
      "AGENCIA DIGITAL IMPULSADA POR IA",

    hero_title_1:
      "Diseñamos",

    hero_title_2:
      "el futuro digital.",

    hero_check:
      "Auditoría web gratuita",

    hero_ad:
      "Publicidad IA",

    hero_project:
      "Iniciar proyecto",

    design_title:
      "Experiencias digitales para la próxima generación.",

    team_title:
      "Una fuerza de trabajo virtual de 9 agentes de IA.",

    ai_title:
      "Tu AI Manager inteligente.",

    command_placeholder:
      "Describe tu solicitud...",

    ai_run:
      "Ejecutar comando",

    advertising_title:
      "Publicidad IA",

    company_placeholder:
      "Empresa",

    product_placeholder:
      "Producto o servicio",

    ad_placeholder:
      "Describe tu anuncio...",

    create_campaign:
      "Crear campaña de IA",

    checker_title:
      "Comprueba tu sitio web.",

    audit_button:
      "Analizar sitio",

    request_title:
      "Comencemos tu proyecto.",

    form_title:
      "Solicitar proyecto",

    name_placeholder:
      "Nombre / Empresa",

    email_placeholder:
      "Correo electrónico",

    message_placeholder:
      "Cuéntanos sobre tu proyecto...",

    form_send:
      "Enviar solicitud",

    booking_title:
      "Reserva una consulta inicial gratuita.",

    booking_button:
      "Reservar cita",

    contact_title:
      "Construyamos el futuro.",

    cookie_title:
      "Utilizamos cookies",

    cookie_text:
      "Utilizamos cookies necesarias y funciones de almacenamiento local para que el sitio funcione de forma segura y fiable. Las tecnologías opcionales de análisis o marketing solo se activan con su consentimiento.",

    cookie_accept:
      "Aceptar todo",

    cookie_necessary:
      "Solo necesarias",

    cookie_settings:
      "Configuración",

    cookie_close:
      "Cerrar",

    cookie_settings_title:
      "Configuración de cookies",

    cookie_settings_text:
      "Elija qué tecnologías opcionales permite.",

    cookie_necessary_title:
      "Tecnologías necesarias",

    cookie_necessary_text:
      "Necesarias para las funciones básicas, la seguridad, el idioma y el almacenamiento de su elección de consentimiento.",

    cookie_analytics_title:
      "Análisis / Estadísticas",

    cookie_analytics_text:
      "Permite mediciones estadísticas y análisis opcionales del uso del sitio.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Permite tecnologías opcionales de marketing y publicidad.",

    cookie_save:
      "Guardar selección",

    cookie_privacy:
      "Política de privacidad"
  },

  it: {
    nav_design: "Design",
    nav_requirements: "Requisiti",
    nav_execution: "Realizzazione",
    nav_ai_team: "Team IA",
    nav_pricing: "Prezzi",
    nav_booking: "Appuntamento",
    nav_contact: "Contatti",

    hero_tag:
      "AGENZIA DIGITALE POTENZIATA DALL'IA",

    hero_title_1:
      "Progettiamo",

    hero_title_2:
      "il futuro digitale.",

    hero_check:
      "Controllo gratuito del sito",

    hero_ad:
      "Pubblicità IA",

    hero_project:
      "Inizia il progetto",

    design_title:
      "Esperienze digitali per la prossima generazione.",

    team_title:
      "Una forza lavoro virtuale di 9 agenti IA.",

    ai_title:
      "Il tuo AI Manager intelligente.",

    command_placeholder:
      "Descrivi la tua richiesta...",

    ai_run:
      "Esegui comando",

    advertising_title:
      "Pubblicità IA",

    company_placeholder:
      "Azienda",

    product_placeholder:
      "Prodotto o servizio",

    ad_placeholder:
      "Descrivi la tua pubblicità...",

    create_campaign:
      "Crea campagna IA",

    checker_title:
      "Controlla il tuo sito.",

    audit_button:
      "Analizza sito",

    request_title:
      "Iniziamo il tuo progetto.",

    form_title:
      "Richiedi un progetto",

    name_placeholder:
      "Nome / Azienda",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Parlaci del tuo progetto...",

    form_send:
      "Invia richiesta",

    booking_title:
      "Prenota una consulenza iniziale gratuita.",

    booking_button:
      "Prenota appuntamento",

    contact_title:
      "Costruiamo il futuro.",

    cookie_title:
      "Utilizziamo i cookie",

    cookie_text:
      "Utilizziamo cookie necessari e funzioni di archiviazione locale per garantire un funzionamento sicuro e affidabile del sito. Le tecnologie opzionali di analisi o marketing vengono attivate solo con il tuo consenso.",

    cookie_accept:
      "Accetta tutto",

    cookie_necessary:
      "Solo necessari",

    cookie_settings:
      "Impostazioni",

    cookie_close:
      "Chiudi",

    cookie_settings_title:
      "Impostazioni cookie",

    cookie_settings_text:
      "Scegli quali tecnologie opzionali autorizzare.",

    cookie_necessary_title:
      "Tecnologie necessarie",

    cookie_necessary_text:
      "Necessarie per funzioni di base, sicurezza, lingua e memorizzazione della scelta del consenso.",

    cookie_analytics_title:
      "Analisi / Statistiche",

    cookie_analytics_text:
      "Consente misurazioni statistiche e analisi facoltative dell'utilizzo del sito.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Consente tecnologie facoltative di marketing e pubblicità.",

    cookie_save:
      "Salva selezione",

    cookie_privacy:
      "Informativa sulla privacy"
  },

  nl: {
    nav_design: "Design",
    nav_requirements: "Vereisten",
    nav_execution: "Uitvoering",
    nav_ai_team: "AI Team",
    nav_pricing: "Prijzen",
    nav_booking: "Afspraak",
    nav_contact: "Contact",

    hero_tag:
      "AI-GEDREVEN DIGITAAL BUREAU",

    hero_title_1:
      "Wij ontwerpen",

    hero_title_2:
      "de digitale toekomst.",

    hero_check:
      "Gratis website-audit",

    hero_ad:
      "AI-advertising",

    hero_project:
      "Project starten",

```
    "Afspraak boeken",

    contact_title:
      "Laten we de toekomst bouwen.",

    cookie_title:
      "Wij gebruiken cookies",

    cookie_text:
      "We gebruiken noodzakelijke cookies en lokale opslagfuncties zodat deze website veilig en betrouwbaar werkt. Optionele analyse- of marketingtechnologieën worden alleen met uw toestemming geactiveerd.",

    cookie_accept:
      "Alles accepteren",

    cookie_necessary:
      "Alleen noodzakelijke",

    cookie_settings:
      "Instellingen",

    cookie_close:
      "Sluiten",

    cookie_settings_title:
      "Cookie-instellingen",

    cookie_settings_text:
      "Kies welke optionele technologieën u toestaat.",

    cookie_necessary_title:
      "Noodzakelijke technologieën",

    cookie_necessary_text:
      "Nodig voor basisfuncties, beveiliging, taalvoorkeuren en het opslaan van uw toestemmingskeuze.",

    cookie_analytics_title:
      "Analyse / Statistieken",

    cookie_analytics_text:
      "Maakt optionele statistische metingen en analyse van websitegebruik mogelijk.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Maakt optionele marketing- en reclametechnologieën mogelijk.",

    cookie_save:
      "Selectie opslaan",

    cookie_privacy:
      "Privacybeleid"
  },

  pl: {
    nav_design: "Design",
    nav_requirements: "Wymagania",
    nav_execution: "Realizacja",
    nav_ai_team: "Zespół AI",
    nav_pricing: "Cennik",
    nav_booking: "Spotkanie",
    nav_contact: "Kontakt",

    hero_tag:
      "AGENCJA CYFROWA WSPOMAGANA PRZEZ AI",

    hero_title_1:
      "Projektujemy",

    hero_title_2:
      "cyfrową przyszłość.",

    hero_check:
      "Bezpłatny audyt strony",

    hero_ad:
      "Reklama AI",

    hero_project:
      "Rozpocznij projekt",

    design_title:
      "Cyfrowe doświadczenia dla nowej generacji.",

    team_title:
      "Wirtualny 9-osobowy zespół AI.",

    ai_title:
      "Twój inteligentny AI Manager.",

    command_placeholder:
      "Opisz swoje zadanie...",

    ai_run:
      "Wykonaj polecenie",

    advertising_title:
      "Reklama AI",

    company_placeholder:
      "Firma",

    product_placeholder:
      "Produkt lub usługa",

    ad_placeholder:
      "Opisz reklamę...",

    create_campaign:
      "Utwórz kampanię AI",

    checker_title:
      "Sprawdź swoją stronę.",

    audit_button:
      "Analizuj stronę",

    request_title:
      "Zacznijmy Twój projekt.",

    form_title:
      "Zapytanie o projekt",

    name_placeholder:
      "Imię / Firma",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Opowiedz nam o projekcie...",

    form_send:
      "Wyślij zapytanie",

    booking_title:
      "Umów bezpłatną konsultację.",

    booking_button:
      "Umów spotkanie",

    contact_title:
      "Budujmy przyszłość.",

    cookie_title:
      "Używamy plików cookie",

    cookie_text:
      "Używamy niezbędnych plików cookie i funkcji pamięci lokalnej, aby strona działała bezpiecznie i niezawodnie. Opcjonalne technologie analityczne i marketingowe są aktywowane tylko za Twoją zgodą.",

    cookie_accept:
      "Akceptuj wszystkie",

    cookie_necessary:
      "Tylko niezbędne",

    cookie_settings:
      "Ustawienia",

    cookie_close:
      "Zamknij",

    cookie_settings_title:
      "Ustawienia plików cookie",

    cookie_settings_text:
      "Wybierz opcjonalne technologie, na które zezwalasz.",

    cookie_necessary_title:
      "Technologie niezbędne",

    cookie_necessary_text:
      "Wymagane do podstawowych funkcji, bezpieczeństwa, języka i zapisania wyboru zgody.",

    cookie_analytics_title:
      "Analityka / Statystyki",

    cookie_analytics_text:
      "Umożliwia opcjonalne pomiary statystyczne i analizę korzystania ze strony.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Umożliwia opcjonalne technologie marketingowe i reklamowe.",

    cookie_save:
      "Zapisz wybór",

    cookie_privacy:
      "Polityka prywatności"
  },

  tr: {
    nav_design: "Tasarım",
    nav_requirements: "Gereksinimler",
    nav_execution: "Uygulama",
    nav_ai_team: "Yapay Zeka Ekibi",
    nav_pricing: "Fiyatlar",
    nav_booking: "Randevu",
    nav_contact: "İletişim",

    hero_tag:
      "YAPAY ZEKA DESTEKLİ DİJİTAL AJANS",

    hero_title_1:
      "Tasarlıyoruz",

    hero_title_2:
      "dijital geleceği.",

    hero_check:
      "Ücretsiz web sitesi denetimi",

    hero_ad:
      "Yapay Zeka Reklamcılığı",

    hero_project:
      "Projeyi başlat",

    design_title:
      "Yeni nesil için dijital deneyimler.",

    team_title:
      "9 yapay zeka ajanından oluşan sanal ekip.",

    ai_title:
      "Akıllı AI Manager'ınız.",

    command_placeholder:
      "Talebinizi açıklayın...",

    ai_run:
      "Komutu çalıştır",

    advertising_title:
      "Yapay Zeka Reklamcılığı",

    company_placeholder:
      "Şirket",

    product_placeholder:
      "Ürün veya hizmet",

    ad_placeholder:
      "Reklamınızı açıklayın...",

    create_campaign:
      "Yapay zeka kampanyası oluştur",

    checker_title:
      "Web sitenizi kontrol edin.",

    audit_button:
      "Siteyi analiz et",

    request_title:
      "Projenize başlayalım.",

    form_title:
      "Proje talep et",

    name_placeholder:
      "Ad / Şirket",

    email_placeholder:
      "E-posta",

    message_placeholder:
      "Projenizden bahsedin...",

    form_send:
      "Talebi gönder",

    booking_title:
      "Ücretsiz ilk görüşme için randevu alın.",

    booking_button:
      "Randevu al",

    contact_title:
      "Geleceği birlikte inşa edelim.",

    cookie_title:
      "Çerezleri kullanıyoruz",

    cookie_text:
      "Web sitesinin güvenli ve güvenilir çalışmasını sağlamak için gerekli çerezleri ve yerel depolama işlevlerini kullanıyoruz. İsteğe bağlı analiz veya pazarlama teknolojileri yalnızca izninizle etkinleştirilir.",

    cookie_accept:
      "Tümünü kabul et",

    cookie_necessary:
      "Yalnızca gerekli",

    cookie_settings:
      "Ayarlar",

    cookie_close:
      "Kapat",

    cookie_settings_title:
      "Çerez ayarları",

    cookie_settings_text:
      "İzin verdiğiniz isteğe bağlı teknolojileri seçin.",

    cookie_necessary_title:
      "Gerekli teknolojiler",

    cookie_necessary_text:
      "Temel işlevler, güvenlik, dil ve onay tercihinizin kaydedilmesi için gereklidir.",

    cookie_analytics_title:
      "Analiz / İstatistik",

    cookie_analytics_text:
      "İsteğe bağlı istatistiksel ölçüm ve web sitesi kullanım analizine izin verir.",

    cookie_marketing_title:
      "Pazarlama",

    cookie_marketing_text:
      "İsteğe bağlı pazarlama ve reklam teknolojilerine izin verir.",

    cookie_save:
      "Seçimi kaydet",

    cookie_privacy:
      "Gizlilik politikası"
  },
  pt: {
    nav_design: "Design",
    nav_requirements: "Requisitos",
    nav_execution: "Execução",
    nav_ai_team: "Equipe IA",
    nav_pricing: "Preços",
    nav_booking: "Agendamento",
    nav_contact: "Contato",

    hero_tag:
      "AGÊNCIA DIGITAL COM IA",

    hero_title_1:
      "Nós criamos",

    hero_title_2:
      "o futuro digital.",

    hero_check:
      "Auditoria gratuita do site",

    hero_ad:
      "Publicidade com IA",

    hero_project:
      "Iniciar projeto",

    design_title:
      "Experiências digitais para a próxima geração.",

    team_title:
      "Uma força de trabalho virtual com 9 agentes de IA.",

    ai_title:
      "Seu AI Manager inteligente.",

    command_placeholder:
      "Descreva sua solicitação...",

    ai_run:
      "Executar comando",

    advertising_title:
      "Publicidade com IA",

    company_placeholder:
      "Empresa",

    product_placeholder:
      "Produto ou serviço",

    ad_placeholder:
      "Descreva seu anúncio...",

    create_campaign:
      "Criar campanha de IA",

    checker_title:
      "Verifique seu site.",

    audit_button:
      "Analisar site",

    request_title:
      "Vamos começar seu projeto.",

    form_title:
      "Solicitar projeto",

    name_placeholder:
      "Nome / Empresa",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Conte-nos sobre seu projeto...",

    form_send:
      "Enviar solicitação",

    booking_title:
      "Agende uma consulta inicial gratuita.",

    booking_button:
      "Agendar reunião",

    contact_title:
      "Vamos construir o futuro.",

    cookie_title:
      "Utilizamos cookies",

    cookie_text:
      "Utilizamos cookies necessários e funções de armazenamento local para garantir que este site funcione de forma segura e confiável. Tecnologias opcionais de análise ou marketing só são ativadas com o seu consentimento.",

    cookie_accept:
      "Aceitar tudo",

    cookie_necessary:
      "Apenas necessários",

    cookie_settings:
      "Definições",

    cookie_close:
      "Fechar",

    cookie_settings_title:
      "Definições de cookies",

    cookie_settings_text:
      "Escolha as tecnologias opcionais que autoriza.",

    cookie_necessary_title:
      "Tecnologias necessárias",

    cookie_necessary_text:
      "Necessárias para funções básicas, segurança, idioma e armazenamento da sua escolha de consentimento.",

    cookie_analytics_title:
      "Análise / Estatísticas",

    cookie_analytics_text:
      "Permite medições estatísticas e análise opcional do uso do site.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Permite tecnologias opcionais de marketing e publicidade.",

    cookie_save:
      "Guardar seleção",

    cookie_privacy:
      "Política de privacidade"
  },

  ru: {
    nav_design: "Дизайн",
    nav_requirements: "Требования",
    nav_execution: "Реализация",
    nav_ai_team: "AI-команда",
    nav_pricing: "Цены",
    nav_booking: "Встреча",
    nav_contact: "Контакты",

    hero_tag:
      "ЦИФРОВОЕ АГЕНТСТВО НА ОСНОВЕ ИИ",

    hero_title_1:
      "Мы создаём",

    hero_title_2:
      "цифровое будущее.",

    hero_check:
      "Бесплатный аудит сайта",

    hero_ad:
      "Реклама с ИИ",

    hero_project:
      "Начать проект",

    design_title:
      "Цифровой опыт нового поколения.",

    team_title:
      "Виртуальная команда из 9 AI-агентов.",

    ai_title:
      "Ваш интеллектуальный AI Manager.",

    command_placeholder:
      "Опишите задачу...",

    ai_run:
      "Выполнить команду",

    advertising_title:
      "Реклама с ИИ",

    company_placeholder:
      "Компания",

    product_placeholder:
      "Продукт или услуга",

    ad_placeholder:
      "Опишите рекламу...",

    create_campaign:
      "Создать AI-кампанию",

    checker_title:
      "Проверьте свой сайт.",

    audit_button:
      "Анализировать сайт",

    request_title:
      "Начнём ваш проект.",

    form_title:
      "Запросить проект",

    name_placeholder:
      "Имя / Компания",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Расскажите о проекте...",

    form_send:
      "Отправить запрос",

    booking_title:
      "Забронируйте бесплатную консультацию.",

    booking_button:
      "Забронировать встречу",

    contact_title:
      "Создадим будущее вместе.",

    cookie_title:
      "Мы используем файлы cookie",

    cookie_text:
      "Мы используем необходимые файлы cookie и локальное хранилище для безопасной и надёжной работы сайта. Необязательные аналитические или маркетинговые технологии активируются только с вашего согласия.",

    cookie_accept:
      "Принять всё",

    cookie_necessary:
      "Только необходимые",

    cookie_settings:
      "Настройки",

    cookie_close:
      "Закрыть",

    cookie_settings_title:
      "Настройки cookie",

    cookie_settings_text:
      "Выберите, какие необязательные технологии вы разрешаете.",

    cookie_necessary_title:
      "Необходимые технологии",

    cookie_necessary_text:
      "Необходимы для основных функций, безопасности, языка и сохранения вашего выбора согласия.",

    cookie_analytics_title:
      "Аналитика / Статистика",

    cookie_analytics_text:
      "Позволяет использовать необязательные статистические измерения и анализ использования сайта.",

    cookie_marketing_title:
      "Маркетинг",

    cookie_marketing_text:
      "Позволяет использовать необязательные маркетинговые и рекламные технологии.",

    cookie_save:
      "Сохранить выбор",

    cookie_privacy:
      "Политика конфиденциальности"
  },

  uk: {
    nav_design: "Дизайн",
    nav_requirements: "Вимоги",
    nav_execution: "Реалізація",
    nav_ai_team: "AI команда",
    nav_pricing: "Ціни",
    nav_booking: "Зустріч",
    nav_contact: "Контакти",

    hero_tag:
      "ЦИФРОВА АГЕНЦІЯ НА ОСНОВІ ШІ",

    hero_title_1:
      "Ми створюємо",

    hero_title_2:
      "цифрове майбутнє.",

    hero_check:
      "Безкоштовний аудит сайту",

    hero_ad:
      "Реклама з ШІ",

    hero_project:
      "Почати проєкт",

    design_title:
      "Цифровий досвід нового покоління.",

    team_title:
      "Віртуальна команда з 9 AI-агентів.",

    ai_title:
      "Ваш інтелектуальний AI Manager.",

    command_placeholder:
      "Опишіть завдання...",

    ai_run:
      "Виконати команду",

    advertising_title:
      "Реклама з ШІ",

    company_placeholder:
      "Компанія",

    product_placeholder:
      "Продукт або послуга",

    ad_placeholder:
      "Опишіть рекламу...",

    create_campaign:
      "Створити AI-кампанію",

    checker_title:
      "Перевірте свій сайт.",

    audit_button:
      "Аналізувати сайт",

    request_title:
      "Почнімо ваш проєкт.",

    form_title:
      "Запит на проєкт",

    name_placeholder:
      "Ім'я / Компанія",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Розкажіть про ваш проєкт...",

    form_send:
      "Надіслати запит",

    booking_title:
      "Забронюйте безкоштовну консультацію.",

    booking_button:
      "Забронювати зустріч",

    contact_title:
      "Створюймо майбутнє разом.",

    cookie_title:
      "Ми використовуємо файли cookie",

    cookie_text:
      "Ми використовуємо необхідні файли cookie та локальне сховище для безпечної та надійної роботи сайту. Необов'язкові аналітичні чи маркетингові технології активуються лише за вашою згодою.",

    cookie_accept:
      "Прийняти все",

    cookie_necessary:
      "Лише необхідні",

    cookie_settings:
      "Налаштування",

    cookie_close:
      "Закрити",

    cookie_settings_title:
      "Налаштування cookie",

    cookie_settings_text:
      "Виберіть необов'язкові технології, які ви дозволяєте.",

    cookie_necessary_title:
      "Необхідні технології",

    cookie_necessary_text:
      "Потрібні для основних функцій, безпеки, мови та збереження вашого вибору згоди.",

    cookie_analytics_title:
      "Аналітика / Статистика",

    cookie_analytics_text:
      "Дозволяє необов'язкові статистичні вимірювання та аналіз використання сайту.",

    cookie_marketing_title:
      "Маркетинг",

    cookie_marketing_text:
      "Дозволяє необов'язкові маркетингові та рекламні технології.",

    cookie_save:
      "Зберегти вибір",

    cookie_privacy:
      "Політика конфіденційності"
  },

  zh: {
    nav_design: "设计",
    nav_requirements: "需求",
    nav_execution: "实施",
    nav_ai_team: "AI团队",
    nav_pricing: "价格",
    nav_booking: "预约",
    nav_contact: "联系我们",

    hero_tag:
      "AI 驱动的数字机构",

    hero_title_1:
      "我们设计",

    hero_title_2:
      "数字未来。",

    hero_check:
      "免费网站审核",

    hero_ad:
      "AI 广告",

    hero_project:
      "开始项目",

    design_title:
      "面向下一代的数字体验。",

    team_title:
      "虚拟9人AI工作团队。",

    ai_title:
      "您的智能 AI Manager。",

    command_placeholder:
      "描述您的需求...",

    ai_run:
      "执行命令",

    advertising_title:
      "AI 广告",

    company_placeholder:
      "公司",

    product_placeholder:
      "产品或服务",

    ad_placeholder:
      "描述您的广告...",

    create_campaign:
      "创建AI广告活动",

    checker_title:
      "检查您的网站。",

    audit_button:
      "分析网站",

    request_title:
      "开始您的项目。",

    form_title:
      "项目申请",

    name_placeholder:
      "姓名 / 公司",

    email_placeholder:
      "电子邮件",

    message_placeholder:
      "告诉我们您的项目...",

    form_send:
      "发送请求",

    booking_title:
      "预约免费的初次咨询。",

    booking_button:
      "预约会议",

    contact_title:
      "共同打造未来。",

    cookie_title:
      "我们使用 Cookie",

    cookie_text:
      "我们使用必要的 Cookie 和本地存储功能，以确保网站安全可靠地运行。可选的分析或营销技术仅在获得您的同意后启用。",

    cookie_accept:
      "全部接受",

    cookie_necessary:
      "仅必要功能",

    cookie_settings:
      "设置",

    cookie_close:
      "关闭",

    cookie_settings_title:
      "Cookie 设置",

    cookie_settings_text:
      "选择您允许的可选技术。",

    cookie_necessary_title:
      "必要技术",

    cookie_necessary_text:
      "用于基本功能、安全、语言设置以及保存您的同意选择。",

    cookie_analytics_title:
      "分析 / 统计",

    cookie_analytics_text:
      "允许可选的网站统计和使用分析。",

    cookie_marketing_title:
      "营销",

    cookie_marketing_text:
      "允许可选的营销和广告技术。",

    cookie_save:
      "保存选择",

    cookie_privacy:
      "隐私政策"
  },

  ja: {
    nav_design: "デザイン",
    nav_requirements: "要件",
    nav_execution: "実装",
    nav_ai_team: "AIチーム",
    nav_pricing: "料金",
    nav_booking: "予約",
    nav_contact: "お問い合わせ",

    hero_tag:
      "AIを活用したデジタルエージェンシー",

    hero_title_1:
      "私たちは創造します",

    hero_title_2:
      "デジタルの未来を。",

    hero_check:
      "無料ウェブサイト監査",

    hero_ad:
      "AI広告",

    hero_project:
      "プロジェクトを開始",

    design_title:
      "次世代のデジタル体験。",

    team_title:
      "9人の仮想AIワークフォース。",

    ai_title:
      "あなたのインテリジェントAI Manager.",

    command_placeholder:
      "依頼内容を入力してください...",

    ai_run:
      "コマンド実行",

    advertising_title:
      "AI広告",

    company_placeholder:
      "会社名",

    product_placeholder:
      "製品またはサービス",

    ad_placeholder:
      "広告内容を入力してください...",

    create_campaign:
      "AIキャンペーンを作成",

    checker_title:
      "ウェブサイトをチェック。",

    audit_button:
      "サイトを分析",

    request_title:
      "プロジェクトを始めましょう。",

    form_title:
      "プロジェクトを依頼",

    name_placeholder:
      "名前 / 会社",

    email_placeholder:
      "メール",

    message_placeholder:
      "プロジェクトについて教えてください...",

    form_send:
      "依頼を送信",

    booking_title:
      "無料の初回相談を予約。",

    booking_button:
      "予約する",

    contact_title:
      "未来を一緒につくりましょう。",

    cookie_title:
      "Cookieを使用しています",

    cookie_text:
      "このウェブサイトを安全かつ安定して機能させるため、必要なCookieとローカルストレージを使用しています。任意の分析・マーケティング技術は同意後にのみ有効になります。",

    cookie_accept:
      "すべて許可",

    cookie_necessary:
      "必要なもののみ",

    cookie_settings:
      "設定",

    cookie_close:
      "閉じる",

    cookie_settings_title:
      "Cookie設定",

    cookie_settings_text:
      "許可する任意の技術を選択してください。",

    cookie_necessary_title:
      "必要な技術",

    cookie_necessary_text:
      "基本機能、安全性、言語設定、同意選択の保存に必要です。",

    cookie_analytics_title:
      "分析 / 統計",

    cookie_analytics_text:
      "任意の統計測定とウェブサイト利用分析を許可します。",

    cookie_marketing_title:
      "マーケティング",

    cookie_marketing_text:
      "任意のマーケティングおよび広告技術を許可します。",

    cookie_save:
      "選択を保存",

    cookie_privacy:
      "プライバシーポリシー"
  },

  ko: {
    nav_design: "디자인",
    nav_requirements: "요구사항",
    nav_execution: "실행",
    nav_ai_team: "AI 팀",
    nav_pricing: "가격",
    nav_booking: "예약",
    nav_contact: "문의",

    hero_tag:
      "AI 기반 디지털 에이전시",

    hero_title_1:
      "우리는 설계합니다",

    hero_title_2:
      "디지털 미래를.",

    hero_check:
      "무료 웹사이트 감사",

    hero_ad:
      "AI 광고",

    hero_project:
      "프로젝트 시작",

    design_title:
      "차세대를 위한 디지털 경험.",

    team_title:
      "9명의 가상 AI 워크포스.",

    ai_title:
      "당신의 지능형 AI Manager.",

    command_placeholder:
      "요청을 입력하세요...",

    ai_run:
      "명령 실행",

    advertising_title:
      "AI 광고",

    company_placeholder:
      "회사",

    product_placeholder:
      "제품 또는 서비스",

    ad_placeholder:
      "광고를 설명하세요...",

    create_campaign:
      "AI 캠페인 만들기",

    checker_title:
      "웹사이트를 확인하세요.",

    audit_button:
      "웹사이트 분석",

    request_title:
      "프로젝트를 시작하세요.",

    form_title:
      "프로젝트 요청",

    name_placeholder:
      "이름 / 회사",

    email_placeholder:
      "이메일",

    message_placeholder:
      "프로젝트를 알려주세요...",

    form_send:
      "요청 보내기",

    booking_title:
      "무료 초기 상담을 예약하세요.",

    booking_button:
      "미팅 예약",

    contact_title:
      "미래를 함께 만들어갑시다.",

    cookie_title:
      "쿠키를 사용합니다",

    cookie_text:
      "이 웹사이트의 안전하고 안정적인 작동을 위해 필요한 쿠키와 로컬 저장 기능을 사용합니다. 선택적 분석 또는 마케팅 기술은 동의한 경우에만 활성화됩니다.",

    cookie_accept:
      "모두 허용",

    cookie_necessary:
      "필수 항목만",

    cookie_settings:
      "설정",

    cookie_close:
      "닫기",

    cookie_settings_title:
      "Cookie 설정",
           cookie_settings:
      "Asetukset",

    cookie_close:
      "Sulje",

    cookie_settings_title:
      "Evästeasetukset",

    cookie_settings_text:
      "Valitse, mitkä valinnaiset tekniikat sallit.",

    cookie_necessary_title:
      "Välttämättömät tekniikat",

    cookie_necessary_text:
      "Tarvitaan perustoimintoihin, turvallisuuteen, kieleen ja suostumusvalintasi tallentamiseen.",

    cookie_analytics_title:
      "Analytiikka / Tilastot",

    cookie_analytics_text:
      "Sallii valinnaisen tilastollisen mittauksen ja verkkosivuston käytön analysoinnin.",

    cookie_marketing_title:
      "Markkinointi",

    cookie_marketing_text:
      "Sallii valinnaiset markkinointi- ja mainostekniikat.",

    cookie_save:
      "Tallenna valinta",

    cookie_privacy:
      "Tietosuojakäytäntö"
  },

  el: {
    nav_design: "Σχεδιασμός",
    nav_requirements: "Απαιτήσεις",
    nav_execution: "Υλοποίηση",
    nav_ai_team: "Ομάδα AI",
    nav_pricing: "Τιμές",
    nav_booking: "Κράτηση",
    nav_contact: "Επικοινωνία",

    hero_tag:
      "ΨΗΦΙΑΚΟ ΓΡΑΦΕΙΟ ΜΕ AI",

    hero_title_1:
      "Δημιουργούμε",

    hero_title_2:
      "το ψηφιακό μέλλον.",

    hero_check:
      "Δωρεάν έλεγχος ιστοσελίδας",

    hero_ad:
      "Διαφήμιση με AI",

    hero_project:
      "Ξεκινήστε το έργο",

    design_title:
      "Ψηφιακές εμπειρίες για την επόμενη γενιά.",

    team_title:
      "Ένα εικονικό εργατικό δυναμικό 9 AI agents.",

    ai_title:
      "Ο έξυπνος AI Manager σας.",

    command_placeholder:
      "Περιγράψτε το αίτημά σας...",

    ai_run:
      "Εκτέλεση εντολής",

    advertising_title:
      "Διαφήμιση με AI",

    company_placeholder:
      "Εταιρεία",

    product_placeholder:
      "Προϊόν ή υπηρεσία",

    ad_placeholder:
      "Περιγράψτε τη διαφήμισή σας...",

    create_campaign:
      "Δημιουργία καμπάνιας AI",

    checker_title:
      "Ελέγξτε την ιστοσελίδα σας.",

    audit_button:
      "Ανάλυση ιστοσελίδας",

    request_title:
      "Ας ξεκινήσουμε το έργο σας.",

    form_title:
      "Αίτημα έργου",

    name_placeholder:
      "Όνομα / Εταιρεία",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Πείτε μας για το έργο σας...",

    form_send:
      "Αποστολή αιτήματος",

    booking_title:
      "Κλείστε δωρεάν αρχική συμβουλευτική.",

    booking_button:
      "Κλείστε συνάντηση",

    contact_title:
      "Ας χτίσουμε το μέλλον.",

    cookie_title:
      "Χρησιμοποιούμε cookies",

    cookie_text:
      "Χρησιμοποιούμε απαραίτητα cookies και τοπική αποθήκευση ώστε η ιστοσελίδα να λειτουργεί με ασφάλεια και αξιοπιστία. Οι προαιρετικές τεχνολογίες ανάλυσης ή marketing ενεργοποιούνται μόνο με τη συγκατάθεσή σας.",

    cookie_accept:
      "Αποδοχή όλων",

    cookie_necessary:
      "Μόνο απαραίτητα",

    cookie_settings:
      "Ρυθμίσεις",

    cookie_close:
      "Κλείσιμο",

    cookie_settings_title:
      "Ρυθμίσεις cookies",

    cookie_settings_text:
      "Επιλέξτε ποιες προαιρετικές τεχνολογίες επιτρέπετε.",

    cookie_necessary_title:
      "Απαραίτητες τεχνολογίες",

    cookie_necessary_text:
      "Απαιτούνται για βασικές λειτουργίες, ασφάλεια, γλώσσα και αποθήκευση της επιλογής συγκατάθεσής σας.",

    cookie_analytics_title:
      "Ανάλυση / Στατιστικά",

    cookie_analytics_text:
      "Επιτρέπει προαιρετικές στατιστικές μετρήσεις και ανάλυση χρήσης της ιστοσελίδας.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Επιτρέπει προαιρετικές τεχνολογίες marketing και διαφήμισης.",

    cookie_save:
      "Αποθήκευση επιλογής",

    cookie_privacy:
      "Πολιτική απορρήτου"
  },

  he: {
    nav_design: "עיצוב",
    nav_requirements: "דרישות",
    nav_execution: "ביצוע",
    nav_ai_team: "צוות AI",
    nav_pricing: "מחירים",
    nav_booking: "קביעת פגישה",
    nav_contact: "צור קשר",

    hero_tag:
      "סוכנות דיגיטלית המופעלת באמצעות AI",

    hero_title_1:
      "אנחנו יוצרים",

    hero_title_2:
      "את העתיד הדיגיטלי.",

    hero_check:
      "ביקורת אתר בחינם",

    hero_ad:
      "פרסום באמצעות AI",

    hero_project:
      "התחלת פרויקט",

    design_title:
      "חוויות דיגיטליות לדור הבא.",

    team_title:
      "כוח עבודה וירטואלי של 9 סוכני AI.",

    ai_title:
      "מנהל ה-AI החכם שלך.",

    command_placeholder:
      "תאר את הבקשה שלך...",

    ai_run:
      "הפעל פקודה",

    advertising_title:
      "פרסום באמצעות AI",

    company_placeholder:
      "חברה",

    product_placeholder:
      "מוצר או שירות",

    ad_placeholder:
      "תאר את המודעה שלך...",

    create_campaign:
      "צור קמפיין AI",

    checker_title:
      "בדוק את האתר שלך.",

    audit_button:
      "נתח אתר",

    request_title:
      "בואו נתחיל את הפרויקט שלכם.",

    form_title:
      "בקשת פרויקט",

    name_placeholder:
      "שם / חברה",

    email_placeholder:
      "אימייל",

    message_placeholder:
      "ספרו לנו על הפרויקט שלכם...",

    form_send:
      "שלח בקשה",

    booking_title:
      "קבעו ייעוץ ראשוני בחינם.",

    booking_button:
      "קביעת פגישה",

    contact_title:
      "בואו נבנה את העתיד.",

    cookie_title:
      "אנו משתמשים בקובצי Cookie",

    cookie_text:
      "אנו משתמשים בקובצי Cookie חיוניים ובאחסון מקומי כדי להבטיח שהאתר יפעל בצורה בטוחה ואמינה. טכנולוגיות ניתוח או שיווק אופציונליות מופעלות רק בהסכמתך.",

    cookie_accept:
      "קבל הכל",

    cookie_necessary:
      "חיוניים בלבד",

    cookie_settings:
      "הגדרות",

    cookie_close:
      "סגור",

    cookie_settings_title:
      "הגדרות Cookie",

    cookie_settings_text:
      "בחר אילו טכנולוגיות אופציונליות אתה מאשר.",

    cookie_necessary_title:
      "טכנולוגיות חיוניות",

    cookie_necessary_text:
      "נדרשות עבור פונקציות בסיסיות, אבטחה, שפה ושמירת בחירת ההסכמה שלך.",

    cookie_analytics_title:
      "ניתוח / סטטיסטיקה",

    cookie_analytics_text:
      "מאפשר מדידה סטטיסטית אופציונלית וניתוח השימוש באתר.",

    cookie_marketing_title:
      "שיווק",

    cookie_marketing_text:
      "מאפשר טכנולוגיות שיווק ופרסום אופציונליות.",

    cookie_save:
      "שמור בחירה",

    cookie_privacy:
      "מדיניות פרטיות"
  },

  ar: {
    nav_design: "التصميم",
    nav_requirements: "المتطلبات",
    nav_execution: "التنفيذ",
    nav_ai_team: "فريق الذكاء الاصطناعي",
    nav_pricing: "الأسعار",
    nav_booking: "الحجز",
    nav_contact: "اتصل بنا",

    hero_tag:
      "وكالة رقمية مدعومة بالذكاء الاصطناعي",

    hero_title_1:
      "نحن نصنع",

    hero_title_2:
      "المستقبل الرقمي.",

    hero_check:
      "تدقيق مجاني للموقع",

    hero_ad:
      "إعلانات بالذكاء الاصطناعي",

    hero_project:
      "ابدأ مشروعك",

    design_title:
      "تجارب رقمية للجيل القادم.",

    team_title:
      "قوة عمل افتراضية تضم 9 وكلاء ذكاء اصطناعي.",

    ai_title:
      "مدير الذكاء الاصطناعي الذكي الخاص بك.",

    command_placeholder:
      "اكتب طلبك...",

    ai_run:
      "تنفيذ الأمر",

    advertising_title:
      "الإعلانات بالذكاء الاصطناعي",

    company_placeholder:
      "الشركة",

    product_placeholder:
      "المنتج أو الخدمة",

    ad_placeholder:
      "صف إعلانك...",

    create_campaign:
      "إنشاء حملة بالذكاء الاصطناعي",

    checker_title:
      "افحص موقعك.",

    audit_button:
      "تحليل الموقع",

    request_title:
      "لنبدأ مشروعك.",

    form_title:
      "طلب مشروع",

    name_placeholder:
      "الاسم / الشركة",

    email_placeholder:
      "البريد الإلكتروني",

    message_placeholder:
      "أخبرنا عن مشروعك...",

    form_send:
      "إرسال الطلب",

    booking_title:
      "احجز استشارة أولية مجانية.",

    booking_button:
      "حجز اجتماع",

    contact_title:
      "لنبنِ المستقبل معًا.",

    cookie_title:
      "نستخدم ملفات تعريف الارتباط",

    cookie_text:
      "نستخدم ملفات تعريف الارتباط الضرورية والتخزين المحلي لضمان عمل الموقع بأمان وموثوقية. لا يتم تفعيل تقنيات التحليل أو التسويق الاختيارية إلا بعد موافقتك.",

    cookie_accept:
      "قبول الكل",

    cookie_necessary:
      "الضرورية فقط",

    cookie_settings:
      "الإعدادات",

    cookie_close:
      "إغلاق",

    cookie_settings_title:
      "إعدادات ملفات تعريف الارتباط",

    cookie_settings_text:
      "اختر التقنيات الاختيارية التي تسمح بها.",

    cookie_necessary_title:
      "التقنيات الضرورية",

    cookie_necessary_text:
      "مطلوبة للوظائف الأساسية والأمان واللغة وحفظ اختيار الموافقة.",

    cookie_analytics_title:
      "التحليلات / الإحصائيات",

    cookie_analytics_text:
      "تسمح بالقياس الإحصائي الاختياري وتحليل استخدام الموقع.",

    cookie_marketing_title:
      "التسويق",

    cookie_marketing_text:
      "تسمح بتقنيات التسويق والإعلانات الاختيارية.",

    cookie_save:
      "حفظ الاختيار",

    cookie_privacy:
      "سياسة الخصوصية"
  },
      "설정",

    cookie_close:
      "닫기",

    cookie_settings_title:
      "쿠키 설정",

    cookie_settings_text:
      "허용할 선택적 기술을 선택하세요.",

    cookie_necessary_title:
      "필수 기술",

    cookie_necessary_text:
      "기본 기능, 보안, 언어 설정 및 동의 선택 저장에 필요합니다.",

    cookie_analytics_title:
      "분석 / 통계",

    cookie_analytics_text:
      "선택적 통계 측정 및 웹사이트 사용 분석을 허용합니다.",

    cookie_marketing_title:
      "마케팅",

    cookie_marketing_text:
      "선택적 마케팅 및 광고 기술을 허용합니다.",

    cookie_save:
      "선택 저장",

    cookie_privacy:
      "개인정보 처리방침"
  },

  hi: {
    nav_design: "डिज़ाइन",
    nav_requirements: "आवश्यकताएँ",
    nav_execution: "क्रियान्वयन",
    nav_ai_team: "AI टीम",
    nav_pricing: "कीमतें",
    nav_booking: "अपॉइंटमेंट",
    nav_contact: "संपर्क",

    hero_tag:
      "AI-संचालित डिजिटल एजेंसी",

    hero_title_1:
      "हम डिज़ाइन करते हैं",

    hero_title_2:
      "डिजिटल भविष्य।",

    hero_check:
      "मुफ़्त वेबसाइट ऑडिट",

    hero_ad:
      "AI विज्ञापन",

    hero_project:
      "प्रोजेक्ट शुरू करें",

    design_title:
      "अगली पीढ़ी के लिए डिजिटल अनुभव।",

    team_title:
      "9 सदस्यीय वर्चुअल AI वर्कफोर्स।",

    ai_title:
      "आपका बुद्धिमान AI Manager।",

    command_placeholder:
      "अपना अनुरोध लिखें...",

    ai_run:
      "कमांड चलाएँ",

    advertising_title:
      "AI विज्ञापन",

    company_placeholder:
      "कंपनी",

    product_placeholder:
      "उत्पाद या सेवा",

    ad_placeholder:
      "अपना विज्ञापन लिखें...",

    create_campaign:
      "AI अभियान बनाएँ",

    checker_title:
      "अपनी वेबसाइट जाँचें.",

    audit_button:
      "वेबसाइट का विश्लेषण करें",

    request_title:
      "अपना प्रोजेक्ट शुरू करें।",

    form_title:
      "प्रोजेक्ट अनुरोध",

    name_placeholder:
      "नाम / कंपनी",

    email_placeholder:
      "ई-मेल",

    message_placeholder:
      "अपने प्रोजेक्ट के बारे में बताएँ...",

    form_send:
      "अनुरोध भेजें",

    booking_title:
      "निःशुल्क प्रारंभिक परामर्श बुक करें।",

    booking_button:
      "अपॉइंटमेंट बुक करें",

    contact_title:
      "आइए भविष्य बनाएँ।",

    cookie_title:
      "हम कुकीज़ का उपयोग करते हैं",

    cookie_text:
      "हम वेबसाइट को सुरक्षित और विश्वसनीय रूप से चलाने के लिए आवश्यक कुकीज़ और स्थानीय स्टोरेज सुविधाओं का उपयोग करते हैं। वैकल्पिक विश्लेषण या मार्केटिंग तकनीकें केवल आपकी सहमति से सक्रिय होती हैं।",

    cookie_accept:
      "सभी स्वीकार करें",

    cookie_necessary:
      "केवल आवश्यक",

    cookie_settings:
      "सेटिंग्स",

    cookie_close:
      "बंद करें",

    cookie_settings_title:
      "कुकी सेटिंग्स",

    cookie_settings_text:
      "चुनें कि आप किन वैकल्पिक तकनीकों की अनुमति देते हैं।",

    cookie_necessary_title:
      "आवश्यक तकनीकें",

    cookie_necessary_text:
      "मूल कार्यों, सुरक्षा, भाषा और आपकी सहमति की पसंद को सहेजने के लिए आवश्यक।",

    cookie_analytics_title:
      "विश्लेषण / आँकड़े",

    cookie_analytics_text:
      "वैकल्पिक सांख्यिकीय मापन और वेबसाइट उपयोग विश्लेषण की अनुमति देता है।",

    cookie_marketing_title:
      "मार्केटिंग",

    cookie_marketing_text:
      "वैकल्पिक मार्केटिंग और विज्ञापन तकनीकों की अनुमति देता है।",

    cookie_save:
      "चयन सहेजें",

    cookie_privacy:
      "गोपनीयता नीति"
  },

  sv: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Genomförande",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Bokning",
    nav_contact: "Kontakt",

    hero_tag:
      "AI-DRIVEN DIGITAL BYRÅ",

    hero_title_1:
      "Vi skapar",

    hero_title_2:
      "den digitala framtiden.",

    hero_check:
      "Gratis webbplatsgranskning",

    hero_ad:
      "AI-reklam",

    hero_project:
      "Starta projekt",

    design_title:
      "Digitala upplevelser för nästa generation.",

    team_title:
      "En virtuell AI-arbetsstyrka med 9 medlemmar.",

    ai_title:
      "Din intelligenta AI Manager.",

    command_placeholder:
      "Beskriv din förfrågan...",

    ai_run:
      "Kör kommando",

    advertising_title:
      "AI-reklam",

    company_placeholder:
      "Företag",

    product_placeholder:
      "Produkt eller tjänst",

    ad_placeholder:
      "Beskriv din annons...",

    create_campaign:
      "Skapa AI-kampanj",

    checker_title:
      "Kontrollera din webbplats.",

    audit_button:
      "Analysera webbplats",

    request_title:
      "Låt oss starta ditt projekt.",

    form_title:
      "Begär projekt",

    name_placeholder:
      "Namn / Företag",

    email_placeholder:
      "E-post",

    message_placeholder:
      "Berätta om ditt projekt...",

    form_send:
      "Skicka förfrågan",

    booking_title:
      "Boka ett kostnadsfritt första samtal.",

    booking_button:
      "Boka möte",

    contact_title:
      "Låt oss bygga framtiden.",

    cookie_title:
      "Vi använder cookies",

    cookie_text:
      "Vi använder nödvändiga cookies och lokal lagring för att webbplatsen ska fungera säkert och tillförlitligt. Valfria analys- eller marknadsföringstekniker aktiveras endast med ditt samtycke.",

    cookie_accept:
      "Acceptera alla",

    cookie_necessary:
      "Endast nödvändiga",

    cookie_settings:
      "Inställningar",

    cookie_close:
      "Stäng",

    cookie_settings_title:
      "Cookie-inställningar",

    cookie_settings_text:
      "Välj vilka valfria tekniker du tillåter.",

    cookie_necessary_title:
      "Nödvändiga tekniker",

    cookie_necessary_text:
      "Krävs för grundläggande funktioner, säkerhet, språk och lagring av ditt samtycke.",

    cookie_analytics_title:
      "Analys / Statistik",

    cookie_analytics_text:
      "Tillåter valfri statistisk mätning och analys av webbplatsanvändning.",

    cookie_marketing_title:
      "Marknadsföring",

    cookie_marketing_text:
      "Tillåter valfria tekniker för marknadsföring och annonsering.",

    cookie_save:
      "Spara val",

    cookie_privacy:
      "Integritetspolicy"
  },

  da: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Implementering",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Booking",
    nav_contact: "Kontakt",

    hero_tag:
      "AI-DREVET DIGITALT BUREAU",

    hero_title_1:
      "Vi designer",

    hero_title_2:
      "den digitale fremtid.",

    hero_check:
      "Gratis website-audit",

    hero_ad:
      "AI-annoncering",

    hero_project:
      "Start projekt",

    design_title:
      "Digitale oplevelser til næste generation.",

    team_title:
      "En virtuel AI-arbejdsstyrke på 9 medlemmer.",

    ai_title:
      "Din intelligente AI Manager.",

    command_placeholder:
      "Beskriv din forespørgsel...",

    ai_run:
      "Kør kommando",

    advertising_title:
      "AI-annoncering",

    company_placeholder:
      "Virksomhed",

    product_placeholder:
      "Produkt eller service",

    ad_placeholder:
      "Beskriv din annonce...",

    create_campaign:
      "Opret AI-kampagne",

    checker_title:
      "Tjek din hjemmeside.",

    audit_button:
      "Analyser hjemmeside",

    request_title:
      "Lad os starte dit projekt.",

    form_title:
      "Anmod om projekt",

    name_placeholder:
      "Navn / Virksomhed",

    email_placeholder:
      "E-mail",

    message_placeholder:
      "Fortæl os om dit projekt...",

    form_send:
      "Send forespørgsel",

    booking_title:
      "Book en gratis indledende samtale.",

    booking_button:
      "Book møde",

    contact_title:
      "Lad os bygge fremtiden.",

    cookie_title:
      "Vi bruger cookies",

    cookie_text:
      "Vi bruger nødvendige cookies og lokal lagring, så hjemmesiden fungerer sikkert og pålideligt. Valgfrie analyse- eller marketingteknologier aktiveres kun med dit samtykke.",

    cookie_accept:
      "Accepter alle",

    cookie_necessary:
      "Kun nødvendige",

    cookie_settings:
      "Indstillinger",

    cookie_close:
      "Luk",

    cookie_settings_title:
      "Cookie-indstillinger",

    cookie_settings_text:
      "Vælg hvilke valgfrie teknologier du tillader.",

    cookie_necessary_title:
      "Nødvendige teknologier",

    cookie_necessary_text:
      "Nødvendige for grundlæggende funktioner, sikkerhed, sprog og lagring af dit samtykke.",

    cookie_analytics_title:
      "Analyse / Statistik",

    cookie_analytics_text:
      "Tillader valgfri statistisk måling og analyse af brugen af hjemmesiden.",

    cookie_marketing_title:
      "Marketing",

    cookie_marketing_text:
      "Tillader valgfrie marketing- og reklameteknologier.",

    cookie_save:
      "Gem valg",

    cookie_privacy:
      "Privatlivspolitik"
  },

  no: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Gjennomføring",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Bestilling",
    nav_contact: "Kontakt",

    hero_tag:
      "AI-DREVET DIGITALT BYRÅ",

    hero_title_1:
      "Vi designer",

    hero_title_2:
      "den digitale fremtiden.",

    hero_check:
      "Gratis nettsideanalyse",

    hero_ad:
      "AI-reklame",

    hero_project:
      "Start prosjekt",

    design_title:
      "Digitale opplevelser for neste generasjon.",

    team_title:
      "En virtuell AI-arbeidsstyrke på 9 medlemmer.",

    ai_title:
      "Din intelligente AI Manager.",

    command_placeholder:
      "Beskriv forespørselen din...",

    ai_run:
      "Kjør kommando",

    advertising_title:
      "AI-reklame",

    company_placeholder:
      "Bedrift",

    product_placeholder:
      "Produkt eller tjeneste",

    ad_placeholder:
      "Beskriv annonsen...",

    create_campaign:
      "Opprett AI-kampanje",

    checker_title:
      "Sjekk nettstedet ditt.",

    audit_button:
      "Analyser nettsted",

    request_title:
      "La oss starte prosjektet ditt.",

    form_title:
      "Be om prosjekt",

    name_placeholder:
      "Navn / Bedrift",

    email_placeholder:
      "E-post",

    message_placeholder:
      "Fortell oss om prosjektet ditt...",

    form_send:
      "Send forespørsel",

    booking_title:
      "Bestill en gratis innledende samtale.",

    booking_button:
      "Bestill møte",

    contact_title:
      "La oss bygge fremtiden.",

    cookie_title:
      "Vi bruker informasjonskapsler",

    cookie_text:
      "Vi bruker nødvendige informasjonskapsler og lokal lagring for at nettstedet skal fungere sikkert og pålitelig. Valgfrie analyse- eller markedsføringsteknologier aktiveres bare med ditt samtykke.",

    cookie_accept:
      "Godta alle",

    cookie_necessary:
      "Kun nødvendige",

    cookie_settings:
      "Innstillinger",

    cookie_close:
      "Lukk",

    cookie_settings_title:
      "Innstillinger for informasjonskapsler",

    cookie_settings_text:
      "Velg hvilke valgfrie teknologier du tillater.",

    cookie_necessary_title:
      "Nødvendige teknologier",

    cookie_necessary_text:
      "Nødvendige for grunnleggende funksjoner, sikkerhet, språk og lagring av samtykket ditt.",

    cookie_analytics_title:
      "Analyse / Statistikk",

    cookie_analytics_text:
      "Tillater valgfri statistisk måling og analyse av nettstedbruken.",

    cookie_marketing_title:
      "Markedsføring",

    cookie_marketing_text:
      "Tillater valgfrie markedsførings- og annonseringsteknologier.",

    cookie_save:
      "Lagre valg",

    cookie_privacy:
      "Personvernpolicy"
  },
};


/* =========================================================
   TRANSLATION REGISTRY
========================================================= */

const TRANSLATIONS = {
  de: DE_TRANSLATION,
  en: EN_TRANSLATION,
  ar: AR_TRANSLATION
};

Object.keys(LANGUAGES).forEach(
  language => {

    if (!TRANSLATIONS[language]) {

      TRANSLATIONS[language] = {
        ...EN_TRANSLATION,
        ...(LANGUAGE_OVERRIDES[language] || {})
      };

    }

  }
);


/* =========================================================
   CURRENT LANGUAGE
========================================================= */

let currentLanguage =
  localStorage.getItem(
    "nexora_language"
  ) || "de";

if (!LANGUAGES[currentLanguage]) {
  currentLanguage = "de";
}


/* =========================================================
   COOKIE CONSENT
========================================================= */

const COOKIE_CONSENT_KEY =
  "nexora_cookie_consent_v1";

const COOKIE_PREFERENCES_KEY =
  "nexora_cookie_preferences_v1";

let cookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false
};

let cookieBannerInitialized =
  false;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    const year =
      document.getElementById(
        "year"
      );

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

    buildLanguageMenu();

    applyLanguage(
      currentLanguage
    );

    renderPipeline();

    initializeCookieConsent();

    const form =
      document.getElementById(
        "projectForm"
      );

    if (form) {

      form.addEventListener(
        "submit",
        submitProject
      );

    }

    document.addEventListener(
      "click",
      event => {

        const menu =
          document.getElementById(
            "languageMenu"
          );

        const wrapper =
          document.querySelector(
            ".language-wrapper"
          );

        const button =
          document.getElementById(
            "languageButton"
          );

        if (
          menu &&
          wrapper &&
          !wrapper.contains(
            event.target
          )
        ) {

          menu.classList.remove(
            "active"
          );

          if (button) {

            button.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }

      }
    );

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape"
        ) {

          const menu =
            document.getElementById(
              "languageMenu"
            );

          const button =
            document.getElementById(
              "languageButton"
            );

          if (menu) {

            menu.classList.remove(
              "active"
            );

          }

          if (button) {

            button.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }

      }
    );

  }
);
