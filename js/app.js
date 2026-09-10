 /* =========================================================
   NEXORA Digital — stable frontend
   Fixes:
   - Language selector
   - Broken JavaScript
   - Navigation buttons
   - Project form
   - AI command
   - Booking button
   - Legal modals
========================================================= */

"use strict";


/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = {

  de: {
    native: "Deutsch",
    flag: "🇩🇪"
  },

  en: {
    native: "English",
    flag: "🇬🇧"
  },

  ar: {
    native: "العربية",
    flag: "🇸🇦",
    rtl: true
  },

  fr: {
    native: "Français",
    flag: "🇫🇷"
  },

  es: {
    native: "Español",
    flag: "🇪🇸"
  },

  it: {
    native: "Italiano",
    flag: "🇮🇹"
  },

  nl: {
    native: "Nederlands",
    flag: "🇳🇱"
  },

  pl: {
    native: "Polski",
    flag: "🇵🇱"
  },

  tr: {
    native: "Türkçe",
    flag: "🇹🇷"
  },

  pt: {
    native: "Português",
    flag: "🇵🇹"
  },

  ru: {
    native: "Русский",
    flag: "🇷🇺"
  },

  uk: {
    native: "Українська",
    flag: "🇺🇦"
  },

  zh: {
    native: "中文",
    flag: "🇨🇳"
  },

  ja: {
    native: "日本語",
    flag: "🇯🇵"
  },

  ko: {
    native: "한국어",
    flag: "🇰🇷"
  },

  hi: {
    native: "हिन्दी",
    flag: "🇮🇳"
  },

  sv: {
    native: "Svenska",
    flag: "🇸🇪"
  },

  da: {
    native: "Dansk",
    flag: "🇩🇰"
  },

  no: {
    native: "Norsk",
    flag: "🇳🇴"
  },

  fi: {
    native: "Suomi",
    flag: "🇫🇮"
  }

};


/* =========================================================
   GERMAN
========================================================= */

const DE = {

  nav_design: "Design",
  nav_requirements: "Anforderungen",
  nav_execution: "Umsetzung",
  nav_ai_team: "AI Team",
  nav_pricing: "Preise",
  nav_booking: "Termin",
  nav_contact: "Kontakt",

  hero_tag:
    "KI-GESTÜTZTE DIGITALE AGENTUR",

  hero_title_1:
    "Wir gestalten",

  hero_title_2:
    "die digitale Zukunft.",

  hero_text:
    "NEXORA Digital entwickelt moderne Websites, intelligente KI-Lösungen, Automatisierung und KI-Werbung für Unternehmen.",

  hero_check:
    "Website kostenlos prüfen",

  hero_project:
    "Projekt starten",

  hero_ad:
    "KI-Werbung",

  design_title:
    "Digitale Erlebnisse für die nächste Generation.",

  design_text:
    "Design, Technologie und künstliche Intelligenz werden zu einem digitalen System verbunden.",

  requirements_title:
    "Ihre Anforderungen werden zum digitalen Plan.",

  requirements_text:
    "Analyse, Strategie, Design, Entwicklung und Launch werden über einen strukturierten Workflow geführt.",

  ai_team_title:
    "Ein virtuelles AI-Team für Ihr Projekt.",

  ai_team_text:
    "Spezialisierte AI-Agenten unterstützen Analyse, Design, Entwicklung, Marketing und Qualität.",

  execution_title:
    "Von der Anfrage bis zum Launch.",

  execution_text:
    "Klare Schritte, strukturierte Übergaben und nachvollziehbare Projektprozesse.",

  pricing_title:
    "Transparente digitale Pakete.",

  pricing_text:
    "Der AI Manager kann anhand Ihrer Anforderungen ein individuelles Angebot vorbereiten.",

  footer_company:
    "NEXORA DIGITAL",

  footer_legal:
    "LEGAL",

  privacy:
    "Datenschutz (DSGVO)",

  privacy_policy:
    "Datenschutzerklärung",

  terms:
    "Nutzungsbedingungen (AGB)",

  impressum:
    "Impressum",

  rights:
    "Alle Rechte vorbehalten.",

  stat_team:
    "AI Team Mitglieder",

  stat_pipeline:
    "Automatisierte Workflow-Stufen",

  stat_languages:
    "Sprachen",

  stat_online:
    "Digital verfügbar",

  cookie_settings:
    "Einstellungen"

};


/* =========================================================
   ENGLISH
========================================================= */

const EN = {

  ...DE,

  nav_design:
    "Design",

  nav_requirements:
    "Requirements",

  nav_execution:
    "Execution",

  nav_ai_team:
    "AI Team",

  nav_pricing:
    "Pricing",

  nav_booking:
    "Booking",

  nav_contact:
    "Contact",

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

  hero_project:
    "Start Project",

  hero_ad:
    "AI Advertising",

  design_title:
    "Digital experiences for the next generation.",

  design_text:
    "We connect design, technology and artificial intelligence into one digital system.",

  requirements_title:
    "Your requirements become a digital plan.",

  requirements_text:
    "Analysis, strategy, design, development and launch are managed through a structured workflow.",

  ai_team_title:
    "A virtual AI team for your project.",

  ai_team_text:
    "Specialized AI agents support analysis, design, development, marketing and quality.",

  execution_title:
    "From request to launch.",

  execution_text:
    "Clear steps, structured handovers and transparent project processes.",

  pricing_title:
    "Transparent digital packages.",

  pricing_text:
    "The AI Manager can prepare an individual offer based on your requirements.",

  footer_legal:
    "LEGAL",

  privacy:
    "Privacy (GDPR)",

  privacy_policy:
    "Privacy Policy",

  terms:
    "Terms & Conditions",

  impressum:
    "Legal Notice",

  rights:
    "All rights reserved.",

  stat_team:
    "AI Team Members",

  stat_pipeline:
    "Automated Workflow Stages",

  stat_languages:
    "Languages",

  stat_online:
    "Digital Availability",

  cookie_settings:
    "Settings"

};


/* =========================================================
   ARABIC
========================================================= */

const AR = {

  ...DE,

  nav_design:
    "التصميم",

  nav_requirements:
    "المتطلبات",

  nav_execution:
    "التنفيذ",

  nav_ai_team:
    "فريق الذكاء الاصطناعي",

  nav_pricing:
    "الأسعار",

  nav_booking:
    "الحجز",

  nav_contact:
    "اتصل بنا",

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

  hero_project:
    "ابدأ مشروعك",

  hero_ad:
    "الإعلانات بالذكاء الاصطناعي",

  design_title:
    "تجارب رقمية للجيل القادم.",

  design_text:
    "نربط التصميم والتكنولوجيا والذكاء الاصطناعي في نظام رقمي واحد.",

  requirements_title:
    "متطلباتك تتحول إلى خطة رقمية.",

  requirements_text:
    "يتم تنظيم التحليل والاستراتيجية والتصميم والتطوير والإطلاق ضمن سير عمل واضح.",

  ai_team_title:
    "فريق AI افتراضي لمشروعك.",

  ai_team_text:
    "وكلاء متخصصون لدعم التحليل والتصميم والتطوير والتسويق والجودة.",

  execution_title:
    "من الطلب حتى الإطلاق.",

  execution_text:
    "خطوات واضحة وتسليمات منظمة وعمليات مشروع قابلة للمتابعة.",

  pricing_title:
    "باقات رقمية واضحة.",

  pricing_text:
    "يمكن لمدير AI إعداد عرض مخصص بناءً على متطلباتك.",

  footer_legal:
    "قانوني",

  privacy:
    "الخصوصية (DSGVO)",

  privacy_policy:
    "بيان الخصوصية",

  terms:
    "الشروط والأحكام",

  impressum:
    "الإشعار القانوني",

  rights:
    "جميع الحقوق محفوظة.",

  stat_team:
    "أعضاء فريق AI",

  stat_pipeline:
    "مراحل سير العمل",

  stat_languages:
    "اللغات",

  stat_online:
    "متاح رقمياً",

  cookie_settings:
    "الإعدادات"

};


const TRANSLATIONS = {
  de: DE,
  en: EN,
  ar: AR
};


/*
   Keep every language visible and functional.
   Languages without a dedicated translation bundle
   use English instead of breaking the page.
*/

Object.keys(LANGUAGES).forEach(
  code => {

    if (!TRANSLATIONS[code]) {

      TRANSLATIONS[code] = EN;

    }

  }
);


/* =========================================================
   STATE
========================================================= */

let currentLanguage =
  localStorage.getItem(
    "nexora_language"
  ) || "de";


if (!LANGUAGES[currentLanguage]) {

  currentLanguage = "de";

}


/* =========================================================
   HELPERS
========================================================= */

const $ = (
  selector,
  root = document
) => root.querySelector(selector);


const $$ = (
  selector,
  root = document
) => [
  ...root.querySelectorAll(selector)
];


/* =========================================================
   TRANSLATIONS
========================================================= */

function applyTranslations() {

  const translation =
    TRANSLATIONS[currentLanguage] ||
    DE;


  $$("[data-i18n]").forEach(
    element => {

      const key =
        element.getAttribute(
          "data-i18n"
        );


      if (
        key &&
        translation[key] !== undefined
      ) {

        element.textContent =
          translation[key];

      }

    }
  );


  document.documentElement.lang =
    currentLanguage;


  document.documentElement.dir =
    LANGUAGES[currentLanguage].rtl
      ? "rtl"
      : "ltr";


  updateLanguageButton();

}


function updateLanguageButton() {

  const button =
    $("#languageButton");


  if (!button)
    return;


  const language =
    LANGUAGES[currentLanguage];


  button.textContent =
    `${language.flag} ${language.native}`;

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


        if (
          code === currentLanguage
        ) {

          button.classList.add(
            "active"
          );

        }


        button.setAttribute(
          "role",
          "menuitem"
        );


        button.innerHTML =
          `<span>${language.flag}</span>
           <span>${language.native}</span>`;


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


function toggleLanguageMenu() {

  const menu =
    $("#languageMenu");


  const button =
    $("#languageButton");


  if (!menu)
    return;


  const open =
    !menu.classList.contains(
      "is-open"
    );


  menu.classList.toggle(
    "is-open",
    open
  );


  if (button) {

    button.setAttribute(
      "aria-expanded",
      String(open)
    );

  }

}


function closeLanguageMenu() {

  const menu =
    $("#languageMenu");


  const button =
    $("#languageButton");


  if (menu) {

    menu.classList.remove(
      "is-open"
    );

  }


  if (button) {

    button.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function setLanguage(code) {

  if (!LANGUAGES[code]) {

    code = "de";

  }


  currentLanguage =
    code;


  localStorage.setItem(
    "nexora_language",
    code
  );


  renderLanguageMenu();

  applyTranslations();

  closeLanguageMenu();

}


/* =========================================================
   SERVICE BUTTONS
========================================================= */

function selectService(service) {

  const select =
    $("#serviceType");


  if (select) {

    select.value =
      service;

  }


  const description =
    $("#projectDescription");


  if (
    description &&
    !description.value
  ) {

    description.value =
      service;

  }


  const requests =
    $("#requests");


  if (requests) {

    requests.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  setTimeout(
    () => {

      $("#clientName")?.focus();

    },
    500
  );

}


function createAICampaign() {

  selectService(
    "AI Advertising"
  );

}


function bookMeeting() {

  $("#contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   API
========================================================= */

async function apiRequest(
  path,
  options = {}
) {

  const controller =
    new AbortController();


  const timer =
    setTimeout(
      () => controller.abort(),
      options.timeout || 20000
    );


  try {

    const response =
      await fetch(
        `/api${path}`,
        {
          ...options,

          credentials:
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

      throw new Error(
        typeof data === "object"
          ? (
              data.message ||
              data.error ||
              "Server error"
            )
          : (
              data ||
              "Server error"
            )
      );

    }


    return data;

  }

  finally {

    clearTimeout(timer);

  }

}


/* =========================================================
   AI COMMAND
========================================================= */

async function runAICommand() {

  const input =
    $("#aiCommand");


  const output =
    $("#aiResponse");


  const button =
    $("#aiCommandButton");


  const command =
    input?.value.trim();


  if (!command) {

    showStatus(
      "aiResponse",
      "Bitte beschreiben Sie zuerst Ihren Auftrag."
    );

    input?.focus();

    return;

  }


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "AI Manager arbeitet…";

  }


  showStatus(
    "aiResponse",
    "Analyse läuft…"
  );


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
            })
        }
      );


    const agent =
      data?.assignedAgent?.name ||
      data?.nextAgent?.name ||
      "";


    const response =
      data?.response ||
      data?.ai?.content ||
      data?.ai?.message ||
      data?.message ||
      "Anfrage wurde verarbeitet.";


    if (output) {

      output.style.display =
        "block";


      output.innerHTML =
        (
          agent
            ? `<strong>Agent:</strong> ${agent}<br>`
            : ""
        ) +
        response;

    }

  }

  catch (error) {

    showStatus(
      "aiResponse",
      "Der AI Manager ist momentan nicht erreichbar. Bitte prüfen Sie die Server-/Datenbank-Konfiguration."
    );


    console.error(
      "NEXORA AI:",
      error
    );

  }

  finally {

    if (button) {

      button.disabled =
        false;

      button.textContent =
        "AI Manager starten";

    }

  }

}


/* =========================================================
   PROJECT FORM
========================================================= */

async function submitProject(
  event
) {

  if (event) {

    event.preventDefault();

  }


  const form =
    $("#projectForm");


  if (!form)
    return;


  const formData =
    new FormData(form);


  const payload = {

    name:
      String(
        formData.get("name") || ""
      ).trim(),

    company:
      String(
        formData.get("company") || ""
      ).trim(),

    email:
      String(
        formData.get("email") || ""
      ).trim(),

    service:
      String(
        formData.get("serviceType") || ""
      ).trim(),

    message:
      String(
        formData.get("description") || ""
      ).trim(),

    language:
      currentLanguage

  };


  if (
    !payload.name ||
    !payload.email ||
    !payload.message
  ) {

    showStatus(
      "projectFormStatus",
      "Bitte Name, E-Mail und Projektbeschreibung ausfüllen."
    );

    return;

  }


  const button =
    form.querySelector(
      'button[type="submit"]'
    );


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Wird gesendet…";

  }


  showStatus(
    "projectFormStatus",
    "Ihre Anfrage wird verarbeitet…"
  );


  try {

    const data =
      await apiRequest(
        "/clients",
        {
          method: "POST",

          body:
            JSON.stringify(
              payload
            )
        }
      );


    if (
      data?.nextAgent?.name
    ) {

      showStatus(
        "projectFormStatus",
        `Anfrage erfolgreich registriert. Zuständig: ${data.nextAgent.name}.`
      );

    }

    else {

      showStatus(
        "projectFormStatus",
        "Anfrage erfolgreich registriert."
      );

    }


    form.reset();

  }

  catch (error) {

    showStatus(
      "projectFormStatus",
      "Die Anfrage konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@nexoraonline.de."
    );


    console.error(
      "NEXORA project form:",
      error
    );

  }

  finally {

    if (button) {

      button.disabled =
        false;

      button.textContent =
        "Anfrage an AI Manager senden";

    }

  }

}


/* =========================================================
   WEBSITE AUDIT
========================================================= */

function runWebsiteAudit() {

  const input =
    $("#auditUrl");


  const url =
    input?.value.trim();


  if (!url) {

    showStatus(
      "auditResponse",
      "Bitte geben Sie zuerst eine Website-URL ein."
    );

    return;

  }


  try {

    new URL(url);

  }

  catch {

    showStatus(
      "auditResponse",
      "Bitte geben Sie eine gültige URL ein, z. B. https://example.com."
    );

    return;

  }


  showStatus(
    "auditResponse",
    "Die URL ist gültig. Der technische Audit-Dienst muss im Backend noch aktiviert werden."
  );

}


/* =========================================================
   STATUS
========================================================= */

function showStatus(
  id,
  text
) {

  const element =
    document.getElementById(
      id
    );


  if (!element)
    return;


  element.style.display =
    "block";


  element.textContent =
    text;

}


/* =========================================================
   LEGAL MODALS
========================================================= */

const LEGAL = {

  privacy: [
    "Datenschutzerklärung (DSGVO)",
    "Diese Seite verarbeitet personenbezogene Daten nur soweit dies für den Betrieb, die Kommunikation und die Bearbeitung von Anfragen erforderlich ist. Bitte ergänzen Sie die Angaben entsprechend den tatsächlich eingesetzten Diensten."
  ],

  terms: [
    "Nutzungsbedingungen (AGB)",
    "Die Website informiert über NEXORA Digital. Verbindliche Leistungen, Preise und Verträge entstehen nur durch ausdrückliche Vereinbarung."
  ],

  impressum: [
    "Impressum",
    "NEXORA Digital<br>Web: www.nexoraonline.de<br>E-Mail: info@nexoraonline.de<br><br>Bitte ergänzen Sie hier die vollständigen gesetzlich erforderlichen Anbieterangaben."
  ]

};


function openModal(type) {

  const ids = {
    privacy: "privacyModal",
    terms: "termsModal",
    impressum: "impressumModal"
  };

  const modal =
    document.getElementById(ids[type]);

  if (!modal) {
    return;
  }

  modal.classList.add("is-open");
  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );

}


function closeModal(type) {

  const ids = {

    privacy:
      "privacyModal",

    terms:
      "termsModal",

    impressum:
      "impressumModal"

  };


  const modal =
    $("#" + ids[type]);


  if (modal) {

    modal.classList.remove(
      "is-open"
    );


    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  if (
    !$(".modal.is-open")
  ) {

    document.body.classList.remove(
      "modal-open"
    );

  }

}


/* =========================================================
   COOKIE SETTINGS
========================================================= */

function openCookiePreferences() {

  const existing =
    $("#nexoraCookieDialog");


  if (existing) {

    existing.classList.add(
      "is-open"
    );

    return;

  }


  const dialog =
    document.createElement(
      "div"
    );


  dialog.id =
    "nexoraCookieDialog";


  dialog.className =
    "modal is-open";


  dialog.innerHTML = `

    <div class="modal-box">

      <button
        class="close"
        type="button"
        aria-label="Schließen"
      >
        ×
      </button>

      <div class="modal-body">

        <h2>
          Cookie-Einstellungen
        </h2>

        <p>
          Notwendige Cookies und lokaler Speicher
          werden für Sprache und grundlegende
          Funktionen verwendet.
        </p>

        <button
          class="btn btn-primary"
          type="button"
          data-save-cookie
        >
          Auswahl speichern
        </button>

      </div>

    </div>

  `;


  document.body.appendChild(
    dialog
  );


  const close =
    () => dialog.remove();


  dialog
    .querySelector(".close")
    .addEventListener(
      "click",
      close
    );


  dialog
    .querySelector(
      "[data-save-cookie]"
    )
    .addEventListener(
      "click",
      close
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderLanguageMenu();

    applyTranslations();


    const year =
      $("#year");


    if (year) {

      year.textContent =
        new Date().getFullYear();

    }


    $("#projectForm")
      ?.addEventListener(
        "submit",
        submitProject
      );


    document.addEventListener(
      "click",
      event => {

        const wrapper =
          $(".language-wrapper");


        if (
          wrapper &&
          !wrapper.contains(
            event.target
          )
        ) {

          closeLanguageMenu();

        }


        if (
          event.target.classList?.contains(
            "modal"
          )
        ) {

          if (
            event.target.id ===
            "privacyModal"
          ) {

            closeModal(
              "privacy"
            );

          }


          if (
            event.target.id ===
            "termsModal"
          ) {

            closeModal(
              "terms"
            );

          }


          if (
            event.target.id ===
            "impressumModal"
          ) {

            closeModal(
              "impressum"
            );

          }

        }

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Escape"
        ) {

          closeLanguageMenu();

          closeModal(
            "privacy"
          );

          closeModal(
            "terms"
          );

          closeModal(
            "impressum"
          );

        }

      }
    );

  }
);
