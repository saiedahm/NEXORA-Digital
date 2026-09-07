 "use strict";

/*
  NEXORA Digital
  Frontend Application
  Default language: German
  Supported languages: 20
*/

const API_BASE = "/api";

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

const TRANSLATIONS = {

  de: {
    nav_design:"Design",
    nav_requirements:"Anforderungen",
    nav_execution:"Umsetzung",
    nav_ai_team:"AI Team",
    nav_pricing:"Preise",
    nav_booking:"Termin",
    nav_contact:"Kontakt",

    hero_tag:"KI-GESTÜTZTE DIGITALE AGENTUR",
    hero_title_1:"Wir gestalten",
    hero_title_2:"die digitale Zukunft.",
    hero_text:"NEXORA Digital entwickelt moderne Websites, intelligente KI-Lösungen, Automatisierung und AI Advertising für Unternehmen.",
    hero_check:"Website kostenlos prüfen",
    hero_ad:"اعلانك بل اي اي",
    hero_project:"Projekt starten",

    stat_team:"AI Team Mitglieder",
    stat_pipeline:"Automatisierte Workflow-Stufen",
    stat_languages:"Sprachen",
    stat_online:"Digital verfügbar",

    design_title:"Digitale Erlebnisse für die nächste Generation.",
    design_text:"Design, Technologie und künstliche Intelligenz werden zu einem digitalen System verbunden.",
    service_1_title:"Neue Website",
    service_1_text:"Moderne, responsive und conversion-orientierte Websites.",
    service_2_title:"Website Modernisierung",
    service_2_text:"Bestehende Websites werden technisch und visuell modernisiert.",
    service_3_title:"KI Integration",
    service_3_text:"KI-Assistenten, Automatisierung und intelligente Prozesse.",

    requirements_title:"Ihre Anforderungen werden zum digitalen Plan.",
    requirements_text:"Analyse, Strategie, Design, Entwicklung und Launch werden über einen strukturierten Workflow geführt.",
    step_1_title:"Analyse",
    step_1_text:"Unternehmen und Ziel werden analysiert.",
    step_2_title:"Research",
    step_2_text:"Markt, Website und Chancen werden untersucht.",
    step_3_title:"Audit",
    step_3_text:"Technische und digitale Schwachstellen werden erkannt.",
    step_4_title:"Design",
    step_4_text:"Ein individuelles UI/UX-Konzept wird erstellt.",
    step_5_title:"Freigabe",
    step_5_text:"Der Kunde bestätigt den nächsten Schritt.",

    team_title:"Ein virtueller 9-köpfiger AI-Workforce.",
    team_text:"Ein AI General Manager koordiniert acht spezialisierte Agenten und verteilt Aufgaben automatisch.",
    agent_manager:"Koordination & Aufgabenverteilung",
    agent_lead:"Lead- und Unternehmensanalyse",
    agent_audit:"Website- und SEO-Analyse",
    agent_design:"UI/UX und kreative Konzepte",
    agent_quote:"Angebote und Preisplanung",
    agent_ad:"AI Advertising Kampagnen",
    agent_dev:"Entwicklung und Automatisierung",
    agent_qa:"Qualitätssicherung",
    agent_launch:"Deployment und Launch",

    ai_title:"Ihr intelligenter AI Manager.",
    ai_text:"Schreiben Sie einen Auftrag. Der AI Manager analysiert die Anfrage und weist die passende Aufgabe einem Agenten zu.",
    command_title:"AI COMMAND CENTER",
    command_placeholder:"Beschreiben Sie Ihren Auftrag...",
    ai_run:"Command ausführen",

    advertising_title:"اعلانك بل اي اي",
    advertising_text:"Beschreiben Sie Ihre gewünschte Werbung. Der AI Manager entwickelt daraus eine Kampagnenstruktur und bereitet die Distribution für geeignete Plattformen vor.",
    advertising_form_title:"Ihre AI-Werbeanfrage",
    company_placeholder:"Unternehmen",
    product_placeholder:"Produkt oder Dienstleistung",
    ad_placeholder:"Beschreiben Sie Ihre Werbung...",
    create_campaign:"AI Kampagne erstellen",
    campaign_empty:"Ihre AI-Kampagne wird hier angezeigt.",

    pricing_title:"Transparente digitale Pakete.",
    pricing_text:"Der AI Manager kann anhand Ihrer Anforderungen ein individuelles Angebot vorbereiten.",
    price_1_title:"New Website Design",
    price_1_text:"Moderne Unternehmenswebsite mit responsive Design.",
    price_2_title:"Website Modernization",
    price_2_text:"Modernisierung einer bestehenden Website.",
    price_3_title:"AI Integration",
    price_3_text:"Integration intelligenter KI-Funktionen.",
    price_4_title:"AI Advertising",
    price_4_text:"AI-basierte Kampagnenplanung und Werbematerial.",
    pricing_note:"Endpreise werden anhand des Projektumfangs individuell kalkuliert.",
    choose:"Auswählen",

    checker_title:"Prüfen Sie Ihre Website.",
    checker_text:"Der Website Audit Agent analysiert technische Basisdaten, SEO-Signale und erkannte Optimierungsmöglichkeiten.",
    url_placeholder:"https://ihre-website.de",
    audit_button:"Website analysieren",

    request_title:"Starten wir Ihr Projekt.",
    request_text:"Senden Sie Ihre Anfrage direkt an den NEXORA AI Manager.",
    form_title:"Projekt anfragen",
    name_placeholder:"Name / Unternehmen",
    email_placeholder:"E-Mail",
    message_placeholder:"Erzählen Sie uns von Ihrem Projekt...",
    form_send:"Anfrage senden",
    pipeline_title:"14-Stage Pipeline",

    execution_title:"Von der Anfrage bis zum Launch.",
    booking_title:"Buchen Sie ein kostenloses Erstgespräch.",
    booking_text:"Lassen Sie uns über Ihre digitale Zukunft sprechen.",
    booking_button:"Termin buchen",
    contact_title:"Let's build the future.",

    footer_company:"NEXORA DIGITAL",
    footer_legal:"LEGAL",
    privacy:"Datenschutzerklärung",
    impressum:"Impressum",
    terms:"Terms & Conditions",
    rights:"Alle Rechte vorbehalten."
  },

  en: {
    nav_design:"Design",
    nav_requirements:"Requirements",
    nav_execution:"Execution",
    nav_ai_team:"AI Team",
    nav_pricing:"Pricing",
    nav_booking:"Booking",
    nav_contact:"Contact",

    hero_tag:"AI-POWERED DIGITAL AGENCY",
    hero_title_1:"We design",
    hero_title_2:"the digital future.",
    hero_text:"NEXORA Digital builds modern websites, intelligent AI solutions, automation and AI advertising systems for businesses.",
    hero_check:"Free Website Audit",
    hero_ad:"Your AI Ad",
    hero_project:"Start Project",

    stat_team:"AI Team Members",
    stat_pipeline:"Automated Workflow Stages",
    stat_languages:"Languages",
    stat_online:"Digital Availability",

    design_title:"Digital experiences for the next generation.",
    design_text:"We connect design, technology and artificial intelligence into one digital system.",
    service_1_title:"New Website",
    service_1_text:"Modern, responsive and conversion-focused websites.",
    service_2_title:"Website Modernization",
    service_2_text:"Existing websites are technically and visually modernized.",
    service_3_title:"AI Integration",
    service_3_text:"AI assistants, automation and intelligent processes.",

    requirements_title:"Your requirements become a digital plan.",
    requirements_text:"Analysis, strategy, design, development and launch are managed through a structured workflow.",
    step_1_title:"Analysis",
    step_1_text:"The business and objective are analyzed.",
    step_2_title:"Research",
    step_2_text:"Market, website and opportunities are researched.",
    step_3_title:"Audit",
    step_3_text:"Technical and digital weaknesses are identified.",
    step_4_title:"Design",
    step_4_text:"A custom UI/UX concept is created.",
    step_5_title:"Approval",
    step_5_text:"The client approves the next step.",

    team_title:"A virtual 9-member AI workforce.",
    team_text:"An AI General Manager coordinates eight specialized agents and automatically assigns tasks.",
    agent_manager:"Coordination & task routing",
    agent_lead:"Lead and company research",
    agent_audit:"Website and SEO analysis",
    agent_design:"UI/UX and creative concepts",
    agent_quote:"Quotes and pricing",
    agent_ad:"AI advertising campaigns",
    agent_dev:"Development and automation",
    agent_qa:"Quality assurance",
    agent_launch:"Deployment and launch",

    ai_title:"Your intelligent AI Manager.",
    ai_text:"Write an instruction. The AI Manager analyzes it and routes the task to the appropriate agent.",
    command_title:"AI COMMAND CENTER",
    command_placeholder:"Describe your request...",
    ai_run:"Run Command",

    advertising_title:"Your AI Ad",
    advertising_text:"Describe your advertising request. The AI Manager turns it into a campaign structure and prepares distribution for suitable platforms.",
    advertising_form_title:"Your AI Advertising Request",
    company_placeholder:"Company",
    product_placeholder:"Product or service",
    ad_placeholder:"Describe your advertisement...",
    create_campaign:"Create AI Campaign",
    campaign_empty:"Your AI campaign will appear here.",

    pricing_title:"Transparent digital packages.",
    pricing_text:"The AI Manager can prepare a tailored proposal based on your requirements.",
    price_1_title:"New Website Design",
    price_1_text:"Modern business website with responsive design.",
    price_2_title:"Website Modernization",
    price_2_text:"Modernization of an existing website.",
    price_3_title:"AI Integration",
    price_3_text:"Integration of intelligent AI functionality.",
    price_4_title:"AI Advertising",
    price_4_text:"AI campaign planning and advertising materials.",
    pricing_note:"Final prices are calculated according to project scope.",
    choose:"Choose",

    checker_title:"Check your website.",
    checker_text:"The Website Audit Agent analyzes technical signals, SEO data and detected optimization opportunities.",
    url_placeholder:"https://your-website.com",
    audit_button:"Analyze Website",

    request_title:"Let's start your project.",
    request_text:"Send your request directly to the NEXORA AI Manager.",
    form_title:"Request a Project",
    name_placeholder:"Name / Company",
    email_placeholder:"Email",
    message_placeholder:"Tell us about your project...",
    form_send:"Send Request",
    pipeline_title:"14-Stage Pipeline",

    execution_title:"From request to launch.",
    booking_title:"Book a free initial consultation.",
    booking_text:"Let's discuss your digital future.",
    booking_button:"Book Meeting",
    contact_title:"Let's build the future.",

    footer_company:"NEXORA DIGITAL",
    footer_legal:"LEGAL",
    privacy:"Privacy Policy",
    impressum:"Legal Notice",
    terms:"Terms & Conditions",
    rights:"All Rights Reserved."
  },

  ar: {
    nav_design:"التصميم",
    nav_requirements:"المتطلبات",
    nav_execution:"التنفيذ",
    nav_ai_team:"فريق الذكاء الاصطناعي",
    nav_pricing:"الأسعار",
    nav_booking:"الحجز",
    nav_contact:"اتصل بنا",

    hero_tag:"وكالة رقمية مدعومة بالذكاء الاصطناعي",
    hero_title_1:"نصمم",
    hero_title_2:"المستقبل الرقمي.",
    hero_text:"تطوّر NEXORA Digital مواقع حديثة وحلول ذكاء اصطناعي وأتمتة وإعلانات ذكية للشركات.",
    hero_check:"فحص الموقع مجاناً",
    hero_ad:"إعلانك بالـ AI",
    hero_project:"ابدأ مشروعك",

    stat_team:"أعضاء فريق AI",
    stat_pipeline:"مراحل سير العمل",
    stat_languages:"اللغات",
    stat_online:"متاح رقمياً",

    design_title:"تجارب رقمية للجيل القادم.",
    design_text:"نربط التصميم والتكنولوجيا والذكاء الاصطناعي في نظام رقمي واحد.",
    service_1_title:"موقع جديد",
    service_1_text:"مواقع حديثة ومتجاوبة ومصممة للتحويل.",
    service_2_title:"تحديث الموقع",
    service_2_text:"تحديث المواقع الحالية تقنياً وبصرياً.",
    service_3_title:"دمج الذكاء الاصطناعي",
    service_3_text:"مساعدون وأتمتة وعمليات ذكية.",

    requirements_title:"متطلباتك تتحول إلى خطة رقمية.",
    requirements_text:"يتم تنظيم التحليل والاستراتيجية والتصميم والتطوير والإطلاق ضمن سير عمل واضح.",
    step_1_title:"تحليل",
    step_1_text:"تحليل الشركة والهدف.",
    step_2_title:"بحث",
    step_2_text:"بحث السوق والموقع والفرص.",
    step_3_title:"تدقيق",
    step_3_text:"اكتشاف المشاكل التقنية والرقمية.",
    step_4_title:"تصميم",
    step_4_text:"إنشاء مفهوم UI/UX مخصص.",
    step_5_title:"موافقة",
    step_5_text:"يؤكد العميل الخطوة التالية.",

    team_title:"فريق افتراضي من 9 أعضاء بالذكاء الاصطناعي.",
    team_text:"يدير AI General Manager ثمانية وكلاء متخصصين ويوزع المهام تلقائياً.",
    agent_manager:"التنسيق وتوزيع المهام",
    agent_lead:"بحث العملاء والشركات",
    agent_audit:"تحليل الموقع وSEO",
    agent_design:"UI/UX والأفكار الإبداعية",
    agent_quote:"العروض والأسعار",
    agent_ad:"الحملات الإعلانية",
    agent_dev:"التطوير والأتمتة",
    agent_qa:"ضمان الجودة",
    agent_launch:"الإطلاق والنشر",

    ai_title:"مدير AI الذكي.",
    ai_text:"اكتب طلبك وسيقوم المدير بتحليله وتوجيه المهمة إلى الوكيل المناسب.",
    command_title:"مركز أوامر AI",
    command_placeholder:"اكتب طلبك...",
    ai_run:"تنفيذ الأمر",

    advertising_title:"إعلانك بالـ AI",
    advertising_text:"صف الإعلان الذي تريده وسيقوم مدير AI ببناء هيكل الحملة وتجهيزها للمنصات المناسبة.",
    advertising_form_title:"طلب إعلان بالذكاء الاصطناعي",
    company_placeholder:"الشركة",
    product_placeholder:"المنتج أو الخدمة",
    ad_placeholder:"صف الإعلان...",
    create_campaign:"إنشاء حملة AI",
    campaign_empty:"ستظهر حملة AI هنا.",

    pricing_title:"باقات رقمية واضحة.",
    pricing_text:"يمكن لمدير AI إعداد عرض مخصص بناءً على متطلباتك.",
    price_1_title:"تصميم موقع جديد",
    price_1_text:"موقع شركة حديث ومتجاوب.",
    price_2_title:"تحديث الموقع",
    price_2_text:"تحديث موقع قائم.",
    price_3_title:"دمج AI",
    price_3_text:"دمج وظائف الذكاء الاصطناعي.",
    price_4_title:"إعلانات AI",
    price_4_text:"تخطيط الحملات والمواد الإعلانية.",
    pricing_note:"يتم تحديد السعر النهائي حسب نطاق المشروع.",
    choose:"اختيار",

    checker_title:"افحص موقعك.",
    checker_text:"يقوم وكيل تدقيق المواقع بتحليل البيانات التقنية وإشارات SEO وفرص التحسين.",
    url_placeholder:"https://example.com",
    audit_button:"تحليل الموقع",

    request_title:"لنبدأ مشروعك.",
    request_text:"أرسل طلبك مباشرة إلى مدير NEXORA AI.",
    form_title:"طلب مشروع",
    name_placeholder:"الاسم / الشركة",
    email_placeholder:"البريد الإلكتروني",
    message_placeholder:"أخبرنا عن مشروعك...",
    form_send:"إرسال الطلب",
    pipeline_title:"مراحل المشروع الـ14",

    execution_title:"من الطلب حتى الإطلاق.",
    booking_title:"احجز استشارة أولية مجانية.",
    booking_text:"لنتحدث عن مستقبلك الرقمي.",
    booking_button:"حجز موعد",
    contact_title:"لنبنِ المستقبل.",

    footer_company:"NEXORA DIGITAL",
    footer_legal:"قانوني",
    privacy:"سياسة الخصوصية",
    impressum:"الإشعار القانوني",
    terms:"الشروط والأحكام",
    rights:"جميع الحقوق محفوظة."
  }
};

const LANGUAGE_FLAGS = LANGUAGES;

let currentLanguage =
  localStorage.getItem("nexora_language") || "de";

if (!LANGUAGES[currentLanguage]) {
  currentLanguage = "de";
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("year").textContent =
    new Date().getFullYear();

  applyLanguage(currentLanguage);

  renderPipeline();

  const form = document.getElementById("projectForm");

  if (form) {
    form.addEventListener("submit", submitProject);
  }

  document.addEventListener("click", event => {
    const menu = document.getElementById("languageMenu");
    const wrapper = document.querySelector(".language-wrapper");

    if (
      menu &&
      wrapper &&
      !wrapper.contains(event.target)
    ) {
      menu.classList.remove("active");
    }
  });

  await refreshSystemStatus();
});


function toggleLanguageMenu(){
  const menu = document.getElementById("languageMenu");
  menu.classList.toggle("active");
}


async function setLanguage(language){

  if (!LANGUAGES[language]) {
    language = "de";
  }

  currentLanguage = language;

  localStorage.setItem(
    "nexora_language",
    currentLanguage
  );

  applyLanguage(currentLanguage);

  document
    .getElementById("languageMenu")
    ?.classList.remove("active");

  /*
    The selected language is sent to the backend with
    every AI request. This prevents the previous
    DE/EN reversal problem.
  */

  try {
    await fetch(`${API_BASE}/language`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        language:currentLanguage
      })
    });
  } catch(error){
    console.warn("Language backend unavailable:", error);
  }
}


function applyLanguage(language){

  const dictionary =
    TRANSLATIONS[language] ||
    TRANSLATIONS.en ||
    TRANSLATIONS.de;

  const metadata =
    LANGUAGES[language] ||
    LANGUAGES.de;

  document.documentElement.lang = language;

  document.documentElement.dir =
    metadata.rtl ? "rtl" : "ltr";

  document.body.dir =
    metadata.rtl ? "rtl" : "ltr";

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.getAttribute("data-i18n");

      if (
        Object.prototype.hasOwnProperty.call(
          dictionary,
          key
        )
      ){
        element.textContent =
          dictionary[key];
      }

    });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {

      const key =
        element.getAttribute(
          "data-i18n-placeholder"
        );

      if (
        Object.prototype.hasOwnProperty.call(
          dictionary,
          key
        )
      ){
        element.placeholder =
          dictionary[key];
      }

    });

  const button =
    document.getElementById("languageButton");

  if (button) {
    button.textContent =
      `${metadata.flag} ${language.toUpperCase()}`;
  }

  document.title =
    language === "de"
      ? "NEXORA Digital | AI • Web • Digital Intelligence"
      : language === "ar"
        ? "NEXORA Digital | الذكاء الاصطناعي • الويب • الأتمتة"
        : "NEXORA Digital | AI • Web • Digital Intelligence";

  updateServiceOptions(language);

  renderPipeline();
}


function updateServiceOptions(language){

  const select =
    document.getElementById("serviceType");

  if (!select) return;

  const options = {

    de:[
      ["New Website Design","Neue Website"],
      ["Website Modernization","Website Modernisierung"],
      ["AI Integration","KI Integration"],
      ["AI Advertising","AI Advertising"],
      ["Digital Automation","Digitale Automatisierung"]
    ],

    en:[
      ["New Website Design","New Website"],
      ["Website Modernization","Website Modernization"],
      ["AI Integration","AI Integration"],
      ["AI Advertising","AI Advertising"],
      ["Digital Automation","Digital Automation"]
    ],

    ar:[
      ["New Website Design","موقع جديد"],
      ["Website Modernization","تحديث الموقع"],
      ["AI Integration","دمج الذكاء الاصطناعي"],
      ["AI Advertising","إعلانات AI"],
      ["Digital Automation","الأتمتة الرقمية"]
    ]

  };

  const list =
    options[language] ||
    options.en;

  select.innerHTML = "";

  list.forEach(([value,label]) => {

    const option =
      document.createElement("option");

    option.value = value;
    option.textContent = label;

    select.appendChild(option);

  });
}


function toggleHeroVideo(){

  const video =
    document.getElementById("heroVideo");

  const button =
    document.getElementById("videoPlayButton");

  if (!video) return;

  if (video.paused){

    video.play()
      .then(() => {
        if (button) {
          button.textContent = "❚❚";
        }
      })
      .catch(() => {
        showToast(
          "Video could not be started."
        );
      });

  } else {

    video.pause();

    if (button) {
      button.textContent = "▶";
    }

  }
}


async function runAICommand(){

  const input =
    document.getElementById("aiCommand");

  const output =
    document.getElementById("aiResponse");

  if (!input || !output) return;

  const command =
    input.value.trim();

  if (!command){

    output.style.display = "block";

    output.textContent =
      currentLanguage === "de"
        ? "Bitte geben Sie einen Auftrag ein."
        : currentLanguage === "ar"
          ? "يرجى كتابة الطلب."
          : "Please enter a command.";

    return;
  }

  output.style.display = "block";
  output.textContent =
    currentLanguage === "de"
      ? "AI Manager analysiert den Auftrag..."
      : currentLanguage === "ar"
        ? "مدير AI يقوم بتحليل الطلب..."
        : "AI Manager is analyzing the request...";

  try{

    const response =
      await fetch(`${API_BASE}/command`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          command,
          language:currentLanguage
        })
      });

    const data =
      await response.json();

    if (!response.ok){
      throw new Error(
        data.error || "AI request failed"
      );
    }

    output.textContent =
      formatAIResult(data);

  }catch(error){

    output.textContent =
      error.message ||
      "AI Manager unavailable.";

  }
}


async function createAICampaign(){

  const company =
    document.getElementById("adCompany")?.value.trim();

  const product =
    document.getElementById("adProduct")?.value.trim();

  const goal =
    document.getElementById("adGoal")?.value;

  const brief =
    document.getElementById("adBrief")?.value.trim();

  const result =
    document.getElementById("campaignResult");

  const platforms =
    [...document.querySelectorAll(
      ".platforms input:checked"
    )].map(input => input.value);

  if (!company || !product || !brief){

    if (result){
      result.textContent =
        currentLanguage === "de"
          ? "Bitte Unternehmen, Produkt und Werbebeschreibung ausfüllen."
          : currentLanguage === "ar"
            ? "يرجى إدخال الشركة والمنتج ووصف الإعلان."
            : "Please provide company, product and advertisement brief.";
    }

    return;
  }

  if (result){
    result.textContent =
      currentLanguage === "de"
        ? "Advertising Agent erstellt Ihre Kampagne..."
        : currentLanguage === "ar"
          ? "وكيل الإعلانات يقوم بإنشاء الحملة..."
          : "Advertising Agent is creating your campaign...";
  }

  try{

    const response =
      await fetch(`${API_BASE}/advertising`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          company,
          product,
          goal,
          brief,
          platforms,
          language:currentLanguage
        })
      });

    const data =
      await response.json();

    if (!response.ok){
      throw new Error(
        data.error || "Campaign creation failed"
      );
    }

    if (result){
      result.textContent =
        formatAIResult(data);
    }

  }catch(error){

    if (result){
      result.textContent =
        error.message;
    }

  }
}


async function runWebsiteAudit(){

  const input =
    document.getElementById("auditUrl");

  const output =
    document.getElementById("auditResult");

  if (!input || !output) return;

  const url =
    input.value.trim();

  if (!url){

    output.style.display = "block";
    output.textContent =
      currentLanguage === "de"
        ? "Bitte eine Website-URL eingeben."
        : "Please enter a website URL.";

    return;
  }

  output.style.display = "block";
  output.textContent =
    currentLanguage === "de"
      ? "Website Audit Agent analysiert die Website..."
      : currentLanguage === "ar"
        ? "وكيل تدقيق المواقع يقوم بتحليل الموقع..."
        : "Website Audit Agent is analyzing the website...";

  try{

    const response =
      await fetch(`${API_BASE}/audit`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          url,
          language:currentLanguage
        })
      });

    const data =
      await response.json();

    if (!response.ok){
      throw new Error(
        data.error || "Audit failed"
      );
    }

    output.textContent =
      formatAIResult(data);

  }catch(error){

    output.textContent =
      error.message;

  }
}


async function submitProject(event){

  event.preventDefault();

  const form =
    event.currentTarget;

  const payload = {

    name:
      document.getElementById("clientName")?.value.trim(),

    email:
      document.getElementById("clientEmail")?.value.trim(),

    service:
      document.getElementById("serviceType")?.value,

    message:
      document.getElementById("clientMessage")?.value.trim(),

    language:currentLanguage

  };

  const button =
    form.querySelector("button[type='submit']");

  if (button){
    button.disabled = true;
    button.classList.add("loading");
  }

  try{

    const response =
      await fetch(`${API_BASE}/clients`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      });

    const data =
      await response.json();

    if (!response.ok){
      throw new Error(
        data.error || "Request failed"
      );
    }

    form.reset();

    alert(
      currentLanguage === "de"
        ? "Ihre Anfrage wurde erfolgreich an den NEXORA AI Manager übergeben."
        : currentLanguage === "ar"
          ? "تم إرسال طلبك بنجاح إلى مدير NEXORA AI."
          : "Your request has been successfully sent to the NEXORA AI Manager."
    );

    renderPipeline(data.client);

  }catch(error){

    alert(error.message);

  }finally{

    if (button){
      button.disabled = false;
      button.classList.remove("loading");
    }

  }
}


function selectService(service){

  const select =
    document.getElementById("serviceType");

  if (select){
    select.value = service;
  }

  document
    .getElementById("requests")
    ?.scrollIntoView({
      behavior:"smooth"
    });
}


function renderPipeline(client = null){

  const pipeline =
    document.getElementById("pipelineContainer");

  const execution =
    document.getElementById("executionPipeline");

  if (!pipeline && !execution) return;

  const stages = [
    "Lead Intake",
    "Lead Research",
    "Website Audit",
    "Opportunity Analysis",
    "Design Brief",
    "Client Portal",
    "Design Approval",
    "Quote",
    "Contract / Terms",
    "Invoice",
    "Payment Confirmation",
    "Development",
    "QA",
    "Launch"
  ];

  const currentStage =
    Number(client?.stage || 1);

  if (pipeline){

    pipeline.innerHTML = "";

    stages.forEach((stage,index) => {

      const number = index + 1;

      const item =
        document.createElement("div");

      item.className =
        "request-item" +
        (number === currentStage ? " active" : "");

      const percent =
        Math.round(
          Math.max(
            0,
            Math.min(
              100,
              ((currentStage - 1) / (stages.length - 1)) * 100
            )
          )
        );

      item.innerHTML = `
        <strong>${String(number).padStart(2,"0")} — ${stage}</strong>
        <div class="pipeline-progress">
          <span style="width:${number <= currentStage ? 100 : percent}%"></span>
        </div>
      `;

      pipeline.appendChild(item);

    });

  }

  if (execution){

    execution.innerHTML = "";

    stages.forEach((stage,index) => {

      const item =
        document.createElement("div");

      item.className = "step";

      item.innerHTML = `
        <div class="step-number">
          ${String(index + 1).padStart(2,"0")}
        </div>
        <h3>${stage}</h3>
        <p>
          ${
            index + 1 <= currentStage
              ? "ACTIVE / COMPLETED"
              : "READY"
          }
        </p>
      `;

      execution.appendChild(item);

    });

  }
}


async function refreshSystemStatus(){

  try{

    const response =
      await fetch(`${API_BASE}/health`);

    if (!response.ok) return;

    const data =
      await response.json();

    if (data.pipeline){
      renderPipeline({
        stage:data.pipeline.currentStage
      });
    }

  }catch(error){

    console.warn(
      "NEXORA backend not connected:",
      error
    );

  }
}


function formatAIResult(data){

  if (!data) {
    return "";
  }

  if (typeof data.result === "string"){
    return data.result;
  }

  if (typeof data.output === "string"){
    return data.output;
  }

  if (data.ai && typeof data.ai === "string"){
    return data.ai;
  }

  return JSON.stringify(
    data,
    null,
    2
  );
}


function showToast(message){

  const toast =
    document.createElement("div");

  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.bottom = "25px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.zIndex = "99999";
  toast.style.padding = "14px 20px";
  toast.style.borderRadius = "12px";
  toast.style.background = "#0b1728";
  toast.style.color = "#fff";
  toast.style.border = "1px solid rgba(255,255,255,.15)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  },3000);
}


function bookMeeting(){

  window.location.href =
    "mailto:info@nexoraonline.de?subject=NEXORA%20Digital%20-%20Erstgespräch";
}


function openModal(type){

  const modal =
    document.getElementById(type);

  if (!modal) return;

  const content =
    modal.querySelector(".modal-box > div:last-child");

  if (!content) return;

  const legal = {

    privacy: {

      de:`
        <h2>Datenschutzerklärung</h2>
        <p>
          NEXORA Digital verarbeitet personenbezogene Daten nur
          im Rahmen der geltenden Datenschutzbestimmungen.
        </p>
        <h3>Kontakt</h3>
        <p>
          info@nexoraonline.de<br>
          contact@nexoraonline.de
        </p>
      `,

      en:`
        <h2>Privacy Policy</h2>
        <p>
          NEXORA Digital processes personal data in accordance
          with applicable data protection requirements.
        </p>
        <h3>Contact</h3>
        <p>
          info@nexoraonline.de<br>
          contact@nexoraonline.de
        </p>
      `

    },

    impressum: {

      de:`
        <h2>Impressum</h2>

        <h3>Angaben gemäß § 5 DDG</h3>

        <p>
          Diensteanbieter & inhaltlich verantwortliche Person:
        </p>

        <p>
          Akhmed Ismail Saied<br>
          Ehndorfer Str. 130<br>
          24537 Neumünster<br>
          Deutschland
        </p>

        <h3>Kontakt</h3>

        <p>
          Website: www.nexoraonline.de<br>
          E-Mail Allgemein: info@nexoraonline.de<br>
          E-Mail Support / Datenschutz: contact@nexoraonline.de
        </p>

        <h3>Plattformstatus</h3>

        <p>
          NEXORA Digital befindet sich derzeit in Entwicklung
          und Testbetrieb. Stripe-Transaktionen werden ausschließlich
          im Testmodus durchgeführt.
        </p>

        <p>
          Gewerbliche Angaben sowie Steuer-/USt.-ID werden ergänzt,
          sobald der reguläre kommerzielle Betrieb aufgenommen wird.
        </p>
      `,

      en:`
        <h2>Legal Notice</h2>

        <h3>Information pursuant to § 5 DDG</h3>

        <p>
          Service Provider & responsible person:
        </p>

        <p>
          Akhmed Ismail Saied<br>
          Ehndorfer Str. 130<br>
          24537 Neumünster<br>
          Germany
        </p>

        <h3>Contact</h3>

        <p>
          Website: www.nexoraonline.de<br>
          General email: info@nexoraonline.de<br>
          Support / Privacy: contact@nexoraonline.de
        </p>

        <h3>Platform Status</h3>

        <p>
          NEXORA Digital is currently in development and testing.
          Stripe transactions are used exclusively in test mode.
        </p>

        <p>
          Commercial and tax/VAT information will be added when
          regular commercial operation begins.
        </p>
      `

    },

    terms: {

      de:`
        <h2>Terms & Conditions</h2>
        <p>
          Leistungen, Projektumfang, Preise, Zahlungsbedingungen,
          Freigaben und Nutzungsrechte werden vor Beginn eines
          kostenpflichtigen Projekts in einem individuellen Angebot
          bzw. Vertrag festgelegt.
        </p>
        <p>
          AI-generierte Inhalte können einer menschlichen Prüfung
          und Freigabe unterliegen.
        </p>
      `,

      en:`
        <h2>Terms & Conditions</h2>
        <p>
          Services, project scope, pricing, payment conditions,
          approvals and usage rights are defined in an individual
          proposal or agreement before a paid project begins.
        </p>
        <p>
          AI-generated content may require human review and approval.
        </p>
      `

    }

  };

  const selected =
    legal[type]?.[currentLanguage] ||
    legal[type]?.en ||
    legal[type]?.de ||
    "<h2>Legal information</h2>";

  content.innerHTML = selected;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";
}


function closeModal(type){

  const modal =
    document.getElementById(type);

  if (!modal) return;

  modal.classList.remove("active");

  document.body.style.overflow = "";
}


document.querySelectorAll(".modal").forEach(modal => {

  modal.addEventListener("click", event => {

    if (event.target === modal){
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

  });

});


document.addEventListener("keydown", event => {

  if (event.key !== "Escape") return;

  document
    .querySelectorAll(".modal.active")
    .forEach(modal => {
      modal.classList.remove("active");
    });

  document.body.style.overflow = "";

});
