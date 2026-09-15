"use strict";

/* =========================================================
   NEXORA DIGITAL
   MAIN FRONTEND
   German default + 20 languages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     YEAR
  ===================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     20 LANGUAGES
     German is FIRST / DEFAULT
  ===================================================== */

  const LANGUAGES = [
    ["de", "🇩🇪", "Deutsch"],
    ["en", "🇬🇧", "English"],
    ["fr", "🇫🇷", "Français"],
    ["es", "🇪🇸", "Español"],
    ["it", "🇮🇹", "Italiano"],
    ["nl", "🇳🇱", "Nederlands"],
    ["pt", "🇵🇹", "Português"],
    ["pl", "🇵🇱", "Polski"],
    ["sv", "🇸🇪", "Svenska"],
    ["da", "🇩🇰", "Dansk"],
    ["no", "🇳🇴", "Norsk"],
    ["fi", "🇫🇮", "Suomi"],
    ["cs", "🇨🇿", "Čeština"],
    ["sk", "🇸🇰", "Slovenčina"],
    ["hu", "🇭🇺", "Magyar"],
    ["ro", "🇷🇴", "Română"],
    ["tr", "🇹🇷", "Türkçe"],
    ["ar", "🇸🇦", "العربية"],
    ["ja", "🇯🇵", "日本語"],
    ["zh", "🇨🇳", "中文"]
  ];


  const TRANSLATIONS = {

    de: {
      nav_design: "Design",
      nav_team: "AI Team",
      nav_prices: "Preise",
      nav_ads: "KI-Werbung",
      nav_contact: "Kontakt",

      hero_title: "Die digitale Zukunft beginnt",
      hero_now: "jetzt.",
      hero_text:
        "Du bist hier in der Welt moderner künstlicher Intelligenz, eleganter Websites und intelligenter Automatisierung.",

      start_project: "Projekt starten",
      watch_film: "NEXORA Film ansehen ▶",

      indicator_ai: "Intelligente Systeme",
      indicator_247: "Digitale Erreichbarkeit",
      indicator_languages: "Sprachen",

      design_title: "Digitale Erlebnisse mit Charakter.",
      design_text:
        "Von der ersten Idee bis zum Launch entwickeln wir klare, schnelle und responsive digitale Produkte – mit Fokus auf UX/UI, Automatisierung und messbare Ergebnisse.",

      team_title:
        "Neun spezialisierte Rollen. Eine gemeinsame Mission.",
      team_text:
        "Jeder AI-Verantwortliche hat eine klare Aufgabe. Mit dem Pfeil können Sie sofort den jeweiligen AI-Dialog öffnen.",

      pricing_title:
        "Transparente Pakete für deinen nächsten Schritt.",
      pricing_text:
        "Wähle ein Paket. Danach öffnet sich direkt die Zahlungs- und Informationsansicht.",

      ads_title:
        "Mehr Sichtbarkeit. Weniger Routine.",
      ads_text:
        "Konzeption, Content-Workflows und Kampagnenplanung mit intelligenten Werkzeugen.",

      talk_ads:
        "Mit Advertising AI sprechen →",

      contact_title:
        "Erzähl uns von deinem Projekt.",

      contact_text:
        "Sende deine Anfrage. Die Oberfläche validiert die Angaben und öffnet anschließend deinen E-Mail-Client.",

      send_request:
        "Anfrage vorbereiten"
    },

    en: {
      nav_design: "Design",
      nav_team: "AI Team",
      nav_prices: "Pricing",
      nav_ads: "AI Advertising",
      nav_contact: "Contact",

      hero_title: "The digital future starts",
      hero_now: "now.",
      hero_text:
        "You are entering a world of modern artificial intelligence, elegant websites and intelligent automation.",

      start_project: "Start Project",
      watch_film: "Watch NEXORA Film ▶",

      indicator_ai: "Intelligent Systems",
      indicator_247: "Digital Availability",
      indicator_languages: "Languages",

      design_title:
        "Digital experiences with character.",
      design_text:
        "From the first idea to launch, we build clear, fast and responsive digital products focused on UX/UI, automation and measurable results.",

      team_title:
        "Nine specialized roles. One shared mission.",
      team_text:
        "Every AI specialist has a clear responsibility. Use the arrow to open an AI conversation instantly.",

      pricing_title:
        "Transparent packages for your next step.",
      pricing_text:
        "Choose a package and the payment information window opens immediately.",

      ads_title:
        "More visibility. Less routine.",
      ads_text:
        "Concepts, content workflows and campaign planning with intelligent tools.",

      talk_ads:
        "Talk to Advertising AI →",

      contact_title:
        "Tell us about your project.",

      contact_text:
        "Send your request. The interface validates the information and then opens your email client.",

      send_request:
        "Prepare Request"
    },

    fr: {
      nav_design: "Design",
      nav_team: "Équipe IA",
      nav_prices: "Prix",
      nav_ads: "Publicité IA",
      nav_contact: "Contact",
      hero_title: "Le futur numérique commence",
      hero_now: "maintenant.",
      start_project: "Démarrer le projet",
      watch_film: "Voir le film NEXORA ▶"
    },

    es: {
      nav_design: "Diseño",
      nav_team: "Equipo IA",
      nav_prices: "Precios",
      nav_ads: "Publicidad IA",
      nav_contact: "Contacto",
      hero_title: "El futuro digital comienza",
      hero_now: "ahora.",
      start_project: "Iniciar proyecto",
      watch_film: "Ver película NEXORA ▶"
    },

    it: {
      nav_design: "Design",
      nav_team: "Team AI",
      nav_prices: "Prezzi",
      nav_ads: "Pubblicità AI",
      nav_contact: "Contatto",
      hero_title: "Il futuro digitale inizia",
      hero_now: "ora.",
      start_project: "Avvia progetto",
      watch_film: "Guarda film NEXORA ▶"
    },

    nl: {
      nav_design: "Design",
      nav_team: "AI Team",
      nav_prices: "Prijzen",
      nav_ads: "AI Reclame",
      nav_contact: "Contact",
      hero_title: "De digitale toekomst begint",
      hero_now: "nu.",
      start_project: "Project starten",
      watch_film: "NEXORA-film bekijken ▶"
    },

    pt: {
      nav_design: "Design",
      nav_team: "Equipe IA",
      nav_prices: "Preços",
      nav_ads: "Publicidade IA",
      nav_contact: "Contato",
      hero_title: "O futuro digital começa",
      hero_now: "agora.",
      start_project: "Iniciar projeto",
      watch_film: "Ver filme NEXORA ▶"
    },

    pl: {
      nav_design: "Design",
      nav_team: "Zespół AI",
      nav_prices: "Ceny",
      nav_ads: "Reklama AI",
      nav_contact: "Kontakt",
      hero_title: "Cyfrowa przyszłość zaczyna się",
      hero_now: "teraz.",
      start_project: "Rozpocznij projekt",
      watch_film: "Obejrzyj film NEXORA ▶"
    },

    sv: {
      nav_design: "Design",
      nav_team: "AI-team",
      nav_prices: "Priser",
      nav_ads: "AI-reklam",
      nav_contact: "Kontakt",
      hero_title: "Den digitala framtiden börjar",
      hero_now: "nu.",
      start_project: "Starta projekt",
      watch_film: "Se NEXORA-film ▶"
    },

    da: {
      nav_design: "Design",
      nav_team: "AI-team",
      nav_prices: "Priser",
      nav_ads: "AI-annoncering",
      nav_contact: "Kontakt",
      hero_title: "Den digitale fremtid begynder",
      hero_now: "nu.",
      start_project: "Start projekt",
      watch_film: "Se NEXORA-film ▶"
    },

    no: {
      nav_design: "Design",
      nav_team: "AI-team",
      nav_prices: "Priser",
      nav_ads: "AI-reklame",
      nav_contact: "Kontakt",
      hero_title: "Den digitale fremtiden begynner",
      hero_now: "nå.",
      start_project: "Start prosjekt",
      watch_film: "Se NEXORA-film ▶"
    },

    fi: {
      nav_design: "Design",
      nav_team: "AI-tiimi",
      nav_prices: "Hinnat",
      nav_ads: "AI-mainonta",
      nav_contact: "Yhteys",
      hero_title: "Digitaalinen tulevaisuus alkaa",
      hero_now: "nyt.",
      start_project: "Aloita projekti",
      watch_film: "Katso NEXORA-elokuva ▶"
    },

    cs: {
      nav_design: "Design",
      nav_team: "AI tým",
      nav_prices: "Ceny",
      nav_ads: "AI reklama",
      nav_contact: "Kontakt",
      hero_title: "Digitální budoucnost začíná",
      hero_now: "nyní.",
      start_project: "Zahájit projekt",
      watch_film: "Přehrát film NEXORA ▶"
    },

    sk: {
      nav_design: "Dizajn",
      nav_team: "AI tím",
      nav_prices: "Ceny",
      nav_ads: "AI reklama",
      nav_contact: "Kontakt",
      hero_title: "Digitálna budúcnosť začína",
      hero_now: "teraz.",
      start_project: "Spustiť projekt",
      watch_film: "Pozrieť film NEXORA ▶"
    },

    hu: {
      nav_design: "Design",
      nav_team: "AI csapat",
      nav_prices: "Árak",
      nav_ads: "AI reklám",
      nav_contact: "Kapcsolat",
      hero_title: "A digitális jövő kezdődik",
      hero_now: "most.",
      start_project: "Projekt indítása",
      watch_film: "NEXORA film ▶"
    },

    ro: {
      nav_design: "Design",
      nav_team: "Echipa AI",
      nav_prices: "Prețuri",
      nav_ads: "Publicitate AI",
      nav_contact: "Contact",
      hero_title: "Viitorul digital începe",
      hero_now: "acum.",
      start_project: "Începe proiectul",
      watch_film: "Vezi filmul NEXORA ▶"
    },

    tr: {
      nav_design: "Tasarım",
      nav_team: "AI Ekibi",
      nav_prices: "Fiyatlar",
      nav_ads: "AI Reklam",
      nav_contact: "İletişim",
      hero_title: "Dijital gelecek",
      hero_now: "şimdi başlıyor.",
      start_project: "Projeyi Başlat",
      watch_film: "NEXORA Filmini İzle ▶"
    },

    ar: {
      nav_design: "التصميم",
      nav_team: "فريق AI",
      nav_prices: "الأسعار",
      nav_ads: "إعلانات AI",
      nav_contact: "اتصل بنا",
      hero_title: "المستقبل الرقمي يبدأ",
      hero_now: "الآن.",
      hero_text:
        "أنت الآن في عالم الذكاء الاصطناعي الحديث والمواقع الرقمية والأتمتة الذكية.",
      start_project: "ابدأ المشروع",
      watch_film: "شاهد فيلم NEXORA ▶"
    },

    ja: {
      nav_design: "デザイン",
      nav_team: "AIチーム",
      nav_prices: "料金",
      nav_ads: "AI広告",
      nav_contact: "お問い合わせ",
      hero_title: "デジタルの未来は",
      hero_now: "今始まります。",
      start_project: "プロジェクト開始",
      watch_film: "NEXORA動画を見る ▶"
    },

    zh: {
      nav_design: "设计",
      nav_team: "AI 团队",
      nav_prices: "价格",
      nav_ads: "AI 广告",
      nav_contact: "联系我们",
      hero_title: "数字未来",
      hero_now: "从现在开始。",
      start_project: "开始项目",
      watch_film: "观看 NEXORA 视频 ▶"
    }
  };


  /* =====================================================
     LANGUAGE MENU
  ===================================================== */

  const languageButton =
    document.getElementById("languageButton");

  const languageMenu =
    document.getElementById("languageMenu");

  let currentLanguage =
    localStorage.getItem("nexora_language") || "de";

  if (!TRANSLATIONS[currentLanguage]) {
    currentLanguage = "de";
  }


  function buildLanguageMenu() {

    if (!languageMenu) return;

    languageMenu.innerHTML = "";

    LANGUAGES.forEach(
      ([code, flag, name]) => {

        const button =
          document.createElement("button");

        button.type = "button";

        button.dataset.language = code;

        button.setAttribute(
          "role",
          "menuitem"
        );

        button.innerHTML = `
          <span>${flag}</span>
          <span>${name}</span>
          <small>${code.toUpperCase()}</small>
        `;

        button.addEventListener(
          "click",
          () => {

            setLanguage(code);

          }
        );

        languageMenu.appendChild(button);

      }
    );

  }


  function updateLanguageButton() {

    const language =
      LANGUAGES.find(
        item => item[0] === currentLanguage
      ) || LANGUAGES[0];

    if (languageButton) {

      languageButton.innerHTML =
        `${language[1]} ${language[0].toUpperCase()} <span>▾</span>`;

    }

  }


  function setLanguage(language) {

    if (
      !LANGUAGES.some(
        item => item[0] === language
      )
    ) {
      language = "de";
    }

    currentLanguage = language;

    localStorage.setItem(
      "nexora_language",
      language
    );

    applyLanguage(language);

    if (languageMenu) {
      languageMenu.classList.remove("active");
    }

    if (languageButton) {
      languageButton.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  }


  function applyLanguage(language) {

    const dictionary =
      {
        ...TRANSLATIONS.de,
        ...(TRANSLATIONS[language] || {})
      };

    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === "ar"
        ? "rtl"
        : "ltr";


    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.dataset.i18n;

        if (
          dictionary[key] !== undefined
        ) {

          element.textContent =
            dictionary[key];

        }

      });


    updateLanguageButton();

  }


  if (languageButton) {

    languageButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const open =
          languageMenu.classList.toggle(
            "active"
          );

        languageButton.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      if (
        !event.target.closest(
          ".language-wrap"
        )
      ) {

        languageMenu?.classList.remove(
          "active"
        );

        languageButton?.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  buildLanguageMenu();

  applyLanguage(currentLanguage);


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".nav");


  if (menuToggle && nav) {

    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          nav.classList.toggle("open");

        menuToggle.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );

    nav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            nav.classList.remove(
              "open"
            );

          }
        );

      });

  }


  /* =====================================================
     AI TEAM
  ===================================================== */

  const teamGrid =
    document.getElementById(
      "teamGrid"
    );


  const teamMembers = [

    {
      id: "general-manager",
      icon: "◉",
      name: "AI General Manager",
      role:
        "Strategische Koordination & Projektmanagement"
    },

    {
      id: "lead-research",
      icon: "⌕",
      name: "AI Lead Research",
      role:
        "Markt-, Wettbewerbs- und Unternehmensanalyse"
    },

    {
      id: "website-audit",
      icon: "◎",
      name: "AI Website Audit",
      role:
        "Website-, UX-, SEO- und Technikprüfung"
    },

    {
      id: "design-agent",
      icon: "✦",
      name: "AI Design Agent",
      role:
        "UI/UX, Branding und digitale Konzepte"
    },

    {
      id: "quote-generator",
      icon: "€",
      name: "AI Quote Generator",
      role:
        "Angebote, Preise und Projektumfang"
    },

    {
      id: "advertising-agent",
      icon: "◈",
      name: "AI Advertising Agent",
      role:
        "KI-Werbung und Kampagnenplanung"
    },

    {
      id: "development-agent",
      icon: "⌘",
      name: "AI Development Agent",
      role:
        "Frontend, Backend, APIs und Automation"
    },

    {
      id: "qa-agent",
      icon: "✓",
      name: "AI QA Agent",
      role:
        "Qualitätssicherung und Tests"
    },

    {
      id: "launch-agent",
      icon: "➜",
      name: "AI Launch Agent",
      role:
        "Deployment und digitaler Launch"
    }

  ];


  if (teamGrid) {

    teamGrid.innerHTML =
      teamMembers
        .map(
          member => `

          <article
            class="team-card ai-agent-card"
          >

            <div
              class="team-icon"
              aria-hidden="true"
            >
              ${member.icon}
            </div>

            <h3>
              ${member.name}
            </h3>

            <p>
              ${member.role}
            </p>

            <button
              class="ai-open-button"
              type="button"
              data-ai-agent="${member.id}"
              aria-label="Open ${member.name}"
            >
              ${member.name} →
            </button>

          </article>

        `
        )
        .join("");

  }


  /* =====================================================
     PRICING
  ===================================================== */

  const pricingGrid =
    document.getElementById(
      "pricingGrid"
    );


  const pricingPlans = [

    {
      id: "new-website",
      name: "New Website Design",
      price: "€499",
      description:
        "Moderner Website-Neubau.",
      featured: false
    },

    {
      id: "ai-close",
      name: "Website + AI Close",
      price: "€649",
      description:
        "Website plus AI-gestützter Verkaufsprozess.",
      featured: true
    },

    {
      id: "modernization",
      name: "Website Modernization",
      price: "€299",
      description:
        "Modernisierung einer bestehenden Website.",
      featured: false
    },

    {
      id: "ai-integration",
      name: "AI Integration",
      price: "€699",
      description:
        "Integration intelligenter KI-Funktionen.",
      featured: false
    },

    {
      id: "global-platform",
      name: "Global Multi-Language",
      price: "€799",
      description:
        "Globale mehrsprachige Plattform.",
      featured: false
    },

    {
      id: "advertising",
      name: "AI Advertising",
      price: "€349 / Monat",
      description:
        "KI-basierte Marketing- und Werbeplanung.",
      featured: false
    },

    {
      id: "maintenance",
      name: "Maintenance",
      price: "€99 / Monat",
      description:
        "Laufende technische Wartung.",
      featured: false
    },

    {
      id: "vip",
      name: "VIP Intelligent Empire",
      price: "€1.499",
      description:
        "Premium-Komplettlösung.",
      featured: true
    }

  ];


  function openPayment(plan) {

    const modal =
      document.getElementById(
        "paymentModal"
      );

    const title =
      document.getElementById(
        "paymentTitle"
      );

    const description =
      document.getElementById(
        "paymentDescription"
      );

    if (!modal) return;

    title.textContent =
      plan.name;

    description.textContent =
      `${plan.price} — ${plan.description}`;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  if (pricingGrid) {

    pricingGrid.innerHTML =
      pricingPlans
        .map(
          plan => `

          <article
            class="price-card
            ${plan.featured ? "featured" : ""}"
          >

            <h3>
              ${plan.name}
            </h3>

            <div class="price">
              ${plan.price}
            </div>

            <p>
              ${plan.description}
            </p>

            <button
              class="btn ${
                plan.featured
                  ? "primary"
                  : "ghost"
              }"
              type="button"
              data-price-id="${plan.id}"
            >
              Preis & Zahlung →
            </button>

          </article>

        `
        )
        .join("");


    pricingGrid
      .querySelectorAll(
        "[data-price-id]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const plan =
              pricingPlans.find(
                item =>
                  item.id ===
                  button.dataset.priceId
              );

            if (plan) {
              openPayment(plan);
            }

          }
        );

      });

  }


  /* =====================================================
     PAYMENT CLOSE
  ===================================================== */

  const paymentModal =
    document.getElementById(
      "paymentModal"
    );

  const closePayment =
    document.getElementById(
      "closePayment"
    );


  function closePaymentModal() {

    if (!paymentModal) return;

    paymentModal.classList.remove(
      "active"
    );

    paymentModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  closePayment?.addEventListener(
    "click",
    closePaymentModal
  );


  paymentModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        paymentModal
      ) {

        closePaymentModal();

      }

    }
  );


  /* =====================================================
     STRIPE
     IMPORTANT:
     Replace this with the REAL Stripe Payment Link.
  ===================================================== */

  const STRIPE_PAYMENT_LINK =
    "PASTE_REAL_STRIPE_PAYMENT_LINK_HERE";


  document
    .getElementById("stripeButton")
    ?.addEventListener(
      "click",
      () => {

        if (
          STRIPE_PAYMENT_LINK.startsWith(
            "https://buy.stripe.com/"
          )
        ) {

          window.open(
            STRIPE_PAYMENT_LINK,
            "_blank",
            "noopener,noreferrer"
          );

        } else {

          alert(
            currentLanguage === "de"
              ? "Der echte Stripe Payment Link muss zuerst hinterlegt werden."
              : "The real Stripe Payment Link must be configured first."
          );

        }

      }
    );


  /* =====================================================
     AI CHAT
  ===================================================== */

  const aiModal =
    document.getElementById(
      "aiChatModal"
    );

  const aiMessages =
    document.getElementById(
      "aiChatMessages"
    );

  const aiInput =
    document.getElementById(
      "aiChatInput"
    );

  const aiForm =
    document.getElementById(
      "aiChatForm"
    );

  const aiTitle =
    document.getElementById(
      "aiChatTitle"
    );

  const aiRole =
    document.getElementById(
      "aiChatRole"
    );

  const closeAI =
    document.getElementById(
      "closeAIChat"
    );


  let activeAgent =
    "general-manager";


  const agentNames = {

    "general-manager":
      "AI General Manager",

    "lead-research":
      "AI Lead Research",

    "website-audit":
      "AI Website Audit",

    "design-agent":
      "AI Design Agent",

    "quote-generator":
      "AI Quote Generator",

    "advertising-agent":
      "AI Advertising Agent",

    "development-agent":
      "AI Development Agent",

    "qa-agent":
      "AI QA Agent",

    "launch-agent":
      "AI Launch Agent"

  };


  function addMessage(
    text,
    type = "ai"
  ) {

    const message =
      document.createElement(
        "div"
      );

    message.className =
      `ai-message ${type}`;

    message.textContent =
      text;

    aiMessages.appendChild(
      message
    );

    aiMessages.scrollTop =
      aiMessages.scrollHeight;

  }


  function openAIChat(
    agent = "general-manager"
  ) {

    activeAgent =
      agent;

    aiTitle.textContent =
      agentNames[agent] ||
      "NEXORA AI Assistant";

    aiRole.textContent =
      "AI Beratung & digitale Unterstützung";

    aiModal.classList.add(
      "active"
    );

    aiModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

    if (
      aiMessages.children.length ===
      0
    ) {

      addMessage(
        currentLanguage === "de"
          ? `Hallo. Ich bin ${
              agentNames[agent] ||
              "NEXORA AI"
            }. Was möchten Sie umsetzen?`
          : "Hello. What would you like to build?"
      );

    }

    setTimeout(
      () => aiInput?.focus(),
      100
    );

  }


  function closeAIChat() {

    aiModal.classList.remove(
      "active"
    );

    aiModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  document
    .querySelectorAll(
      "[data-ai-agent]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openAIChat(
            button.dataset.aiAgent
          );

        }
      );

    });


  closeAI?.addEventListener(
    "click",
    closeAIChat
  );


  aiModal?.addEventListener(
    "click",
    event => {

      if (
        event.target === aiModal
      ) {

        closeAIChat();

      }

    }
  );


  /* =====================================================
     AI RESPONSE
     ===================================================== */

  async function sendAICommand(
    command
  ) {

    addMessage(
      command,
      "user"
    );

    addMessage(
      currentLanguage === "de"
        ? "AI analysiert Ihre Anfrage..."
        : "AI is analyzing your request...",
      "loading"
    );


    try {

      const response =
        await fetch(
          "/api/command",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify({
                command,
                language:
                  currentLanguage,
                agent:
                  activeAgent
              })
          }
        );


      const data =
        await response
          .json()
          .catch(
            () => ({})
          );


      const loading =
        aiMessages.querySelector(
          ".loading"
        );

      loading?.remove();


      if (
        !response.ok ||
        !data.success
      ) {

        throw new Error(
          data.message ||
          data.error ||
          "AI service unavailable."
        );

      }


      const answer =
        data.result?.content ||
        data.ai?.content ||
        data.content ||
        "Ihre Anfrage wurde empfangen.";


      addMessage(
        answer,
        "ai"
      );


    } catch (error) {

      const loading =
        aiMessages.querySelector(
          ".loading"
        );

      loading?.remove();


      addMessage(
        currentLanguage === "de"
          ? "Der AI Manager konnte momentan nicht erreicht werden. Bitte versuchen Sie es erneut."
          : "The AI Manager is currently unavailable. Please try again.",
        "ai"
      );

    }

  }


  aiForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const command =
        aiInput.value.trim();

      if (!command) return;

      aiInput.value = "";

      sendAICommand(
        command
      );

    }
  );


  /* =====================================================
     VIDEO
  ===================================================== */

  const videoModal =
    document.getElementById(
      "videoModal"
    );

  const openVideo =
    document.getElementById(
      "openVideo"
    );

  const closeVideo =
    document.getElementById(
      "closeVideo"
    );

  const mainVideo =
    document.getElementById(
      "mainVideo"
    );


  function closeVideoModal() {

    videoModal?.classList.remove(
      "active"
    );

    videoModal?.setAttribute(
      "aria-hidden",
      "true"
    );

    mainVideo?.pause();

    document.body.style.overflow =
      "";

  }


  openVideo?.addEventListener(
    "click",
    () => {

      videoModal.classList.add(
        "active"
      );

      videoModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

    }
  );


  closeVideo?.addEventListener(
    "click",
    closeVideoModal
  );


  videoModal?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        videoModal
      ) {

        closeVideoModal();

      }

    }
  );


  /* =====================================================
     LEGAL
  ===================================================== */

  const modal =
    document.getElementById(
      "modal"
    );

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalBody =
    document.getElementById(
      "modalBody"
    );

  const closeModal =
    document.getElementById(
      "closeModal"
    );


  const legalContent = {

    legal: {
      title: "LEGAL",
      body: `
        <h3>NEXORA Digital</h3>
        <p>
          Digitale Dienstleistungen in den Bereichen
          Webdesign, künstliche Intelligenz,
          Automation und digitale Transformation.
        </p>
      `
    },

    privacy: {
      title: "Datenschutz (DSGVO)",
      body: `
        <p>
          Der Schutz personenbezogener Daten ist
          ein zentraler Bestandteil der NEXORA
          Digital Plattform.
        </p>

        <p>
          Personenbezogene Daten werden nur im
          erforderlichen Umfang verarbeitet.
        </p>
      `
    },

    terms: {
      title:
        "Nutzungsbedingungen (AGB)",
      body: `
        <p>
          Leistungen, Preise, Umfang und
          Projektbedingungen werden vor
          Projektbeginn verbindlich vereinbart.
        </p>
      `
    },

    impressum: {
      title: "Impressum",
      body: `
        <h3>NEXORA Digital</h3>

        <p>
          Inhaber: Akhmed Ismail Saied
        </p>

        <p>
          Ehndorfer Str. 130<br>
          24537 Neumünster<br>
          Deutschland
        </p>

        <p>
          Website:<br>
          www.nexoraonline.de
        </p>

        <p>
          E-Mail:<br>
          info@nexoraonline.de
        </p>
      `
    }

  };


  function openLegalModal(
    type
  ) {

    if (
      !legalContent[type]
    ) return;

    modalTitle.textContent =
      legalContent[type].title;

    modalBody.innerHTML =
      legalContent[type].body;

    modal.classList.add(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeLegalModal() {

    modal.classList.remove(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  document
    .querySelectorAll(
      "[data-modal]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openLegalModal(
            button.dataset.modal
          );

        }
      );

    });


  closeModal?.addEventListener(
    "click",
    closeLegalModal
  );


  modal?.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeLegalModal();

      }

    }
  );


  /* =====================================================
     CONTACT
  ===================================================== */

  const contactForm =
    document.getElementById(
      "contactForm"
    );

  const formStatus =
    document.getElementById(
      "formStatus"
    );


  contactForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (
        !contactForm.checkValidity()
      ) {

        contactForm.reportValidity();

        return;

      }


      const formData =
        new FormData(
          contactForm
        );


      const name =
        String(
          formData.get("name") ||
          ""
        ).trim();

      const email =
        String(
          formData.get("email") ||
          ""
        ).trim();

      const service =
        String(
          formData.get("service") ||
          ""
        ).trim();

      const message =
        String(
          formData.get("message") ||
          ""
        ).trim();


      formStatus.textContent =
        "Anfrage wird vorbereitet...";


      const subject =
        encodeURIComponent(
          `NEXORA Projektanfrage – ${service}`
        );


      const body =
        encodeURIComponent(
`Neue NEXORA Projektanfrage

Name:
${name}

E-Mail:
${email}

Service:
${service}

Nachricht:
${message}
`
        );


      setTimeout(
        () => {

          window.location.href =
            `mailto:info@nexoraonline.de?subject=${subject}&body=${body}`;

        },
        400
      );

    }
  );


  /* =====================================================
     ESC
  ===================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      ) return;

      closeAIChat();

      closeVideoModal();

      closeLegalModal();

      closePaymentModal();

    }
  );

});
