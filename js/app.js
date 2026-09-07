
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
   BASE TRANSLATION
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
    "NEXORA Digital entwickelt moderne Websites, intelligente KI-Lösungen, Automatisierung und AI Advertising für Unternehmen.",
  hero_check: "Website kostenlos prüfen",
  hero_ad: "KI-Werbung",
  hero_project: "Projekt starten",

  stat_team: "AI Team Mitglieder",
  stat_pipeline: "Automatisierte Workflow-Stufen",
  stat_languages: "Sprachen",
  stat_online: "Digital verfügbar",

  design_title: "Digitale Erlebnisse für die nächste Generation.",
  design_text:
    "Design, Technologie und künstliche Intelligenz werden zu einem digitalen System verbunden.",

  service_1_title: "Neue Website",
  service_1_text:
    "Moderne, responsive und conversion-orientierte Websites.",

  service_2_title: "Website Modernisierung",
  service_2_text:
    "Bestehende Websites werden technisch und visuell modernisiert.",

  service_3_title: "KI Integration",
  service_3_text:
    "KI-Assistenten, Automatisierung und intelligente Prozesse.",

  requirements_title:
    "Ihre Anforderungen werden zum digitalen Plan.",
  requirements_text:
    "Analyse, Strategie, Design, Entwicklung und Launch werden über einen strukturierten Workflow geführt.",

  step_1_title: "Analyse",
  step_1_text: "Unternehmen und Ziel werden analysiert.",

  step_2_title: "Research",
  step_2_text:
    "Markt, Website und Chancen werden untersucht.",

  step_3_title: "Audit",
  step_3_text:
    "Technische und digitale Schwachstellen werden erkannt.",

  step_4_title: "Design",
  step_4_text:
    "Ein individuelles UI/UX-Konzept wird erstellt.",

  step_5_title: "Freigabe",
  step_5_text:
    "Der Kunde bestätigt den nächsten Schritt.",

  team_title: "Ein virtueller 9-köpfiger AI-Workforce.",
  team_text:
    "Ein AI General Manager koordiniert acht spezialisierte Agenten und verteilt Aufgaben automatisch.",

  agent_manager: "Koordination & Aufgabenverteilung",
  agent_lead: "Lead- und Unternehmensanalyse",
  agent_audit: "Website- und SEO-Analyse",
  agent_design: "UI/UX und kreative Konzepte",
  agent_quote: "Angebote und Preisplanung",
  agent_ad: "AI Advertising Kampagnen",
  agent_dev: "Entwicklung und Automatisierung",
  agent_qa: "Qualitätssicherung",
  agent_launch: "Deployment und Launch",

  ai_title: "Ihr intelligenter AI Manager.",
  ai_text:
    "Schreiben Sie einen Auftrag. Der AI Manager analysiert die Anfrage und weist die passende Aufgabe einem Agenten zu.",

  command_title: "AI COMMAND CENTER",
  command_placeholder: "Beschreiben Sie Ihren Auftrag...",
  ai_run: "Command ausführen",

  advertising_title: "KI-Werbung",
  advertising_text:
    "Beschreiben Sie Ihre gewünschte Werbung. Der AI Manager entwickelt daraus eine Kampagnenstruktur und bereitet die Distribution für geeignete Plattformen vor.",

  advertising_form_title: "Ihre AI-Werbeanfrage",
  company_placeholder: "Unternehmen",
  product_placeholder: "Produkt oder Dienstleistung",
  ad_placeholder: "Beschreiben Sie Ihre Werbung...",
  create_campaign: "AI Kampagne erstellen",
  campaign_empty: "Ihre AI-Kampagne wird hier angezeigt.",

  pricing_title: "Transparente digitale Pakete.",
  pricing_text:
    "Der AI Manager kann anhand Ihrer Anforderungen ein individuelles Angebot vorbereiten.",

  price_1_title: "New Website Design",
  price_1_text:
    "Moderne Unternehmenswebsite mit responsive Design.",

  price_2_title: "Website Modernization",
  price_2_text:
    "Modernisierung einer bestehenden Website.",

  price_3_title: "AI Integration",
  price_3_text:
    "Integration intelligenter KI-Funktionen.",

  price_4_title: "AI Advertising",
  price_4_text:
    "AI-basierte Kampagnenplanung und Werbematerial.",

  pricing_note:
    "Endpreise werden anhand des Projektumfangs individuell kalkuliert.",
  choose: "Auswählen",

  checker_title: "Prüfen Sie Ihre Website.",
  checker_text:
    "Der Website Audit Agent analysiert technische Basisdaten, SEO-Signale und erkannte Optimierungsmöglichkeiten.",
  url_placeholder: "https://ihre-website.de",
  audit_button: "Website analysieren",

  request_title: "Starten wir Ihr Projekt.",
  request_text:
    "Senden Sie Ihre Anfrage direkt an den NEXORA AI Manager.",

  form_title: "Projekt anfragen",
  name_placeholder: "Name / Unternehmen",
  email_placeholder: "E-Mail",
  message_placeholder:
    "Erzählen Sie uns von Ihrem Projekt...",
  form_send: "Anfrage senden",

  pipeline_title: "14-Stage Pipeline",

  execution_title: "Von der Anfrage bis zum Launch.",

  booking_title:
    "Buchen Sie ein kostenloses Erstgespräch.",
  booking_text:
    "Lassen Sie uns über Ihre digitale Zukunft sprechen.",
  booking_button: "Termin buchen",

  contact_title: "Let's build the future.",

  footer_company: "NEXORA DIGITAL",
  footer_legal: "LEGAL",
  privacy: "Datenschutzerklärung",
  impressum: "Impressum",
  terms: "Terms & Conditions",
  rights: "Alle Rechte vorbehalten."
};


/* =========================================================
   ENGLISH
========================================================= */

const EN_TRANSLATION = {
  ...DE_TRANSLATION,

  nav_requirements: "Requirements",
  nav_execution: "Execution",
  nav_pricing: "Pricing",
  nav_booking: "Booking",
  nav_contact: "Contact",

  hero_tag: "AI-POWERED DIGITAL AGENCY",
  hero_title_1: "We design",
  hero_title_2: "the digital future.",
  hero_text:
    "NEXORA Digital builds modern websites, intelligent AI solutions, automation and AI advertising systems for businesses.",
  hero_check: "Free Website Audit",
  hero_ad: "AI Advertising",
  hero_project: "Start Project",

  stat_team: "AI Team Members",
  stat_pipeline: "Automated Workflow Stages",
  stat_languages: "Languages",
  stat_online: "Digital Availability",

  design_title:
    "Digital experiences for the next generation.",
  design_text:
    "We connect design, technology and artificial intelligence into one digital system.",

  service_1_title: "New Website",
  service_1_text:
    "Modern, responsive and conversion-focused websites.",
  service_2_title: "Website Modernization",
  service_2_text:
    "Existing websites are technically and visually modernized.",
  service_3_title: "AI Integration",
  service_3_text:
    "AI assistants, automation and intelligent processes.",

  requirements_title:
    "Your requirements become a digital plan.",
  requirements_text:
    "Analysis, strategy, design, development and launch are managed through a structured workflow.",

  step_1_title: "Analysis",
  step_1_text: "The business and objective are analyzed.",
  step_2_title: "Research",
  step_2_text:
    "Market, website and opportunities are researched.",
  step_3_title: "Audit",
  step_3_text:
    "Technical and digital weaknesses are identified.",
  step_4_title: "Design",
  step_4_text:
    "A custom UI/UX concept is created.",
  step_5_title: "Approval",
  step_5_text:
    "The client approves the next step.",

  team_title: "A virtual 9-member AI workforce.",
  team_text:
    "An AI General Manager coordinates eight specialized agents and automatically assigns tasks.",

  agent_manager: "Coordination & task routing",
  agent_lead: "Lead and company research",
  agent_audit: "Website and SEO analysis",
  agent_design: "UI/UX and creative concepts",
  agent_quote: "Quotes and pricing",
  agent_ad: "AI advertising campaigns",
  agent_dev: "Development and automation",
  agent_qa: "Quality assurance",
  agent_launch: "Deployment and launch",

  ai_title: "Your intelligent AI Manager.",
  ai_text:
    "Write an instruction. The AI Manager analyzes it and routes the task to the appropriate agent.",
  command_title: "AI COMMAND CENTER",
  command_placeholder: "Describe your request...",
  ai_run: "Run Command",

  advertising_title: "AI Advertising",
  advertising_text:
    "Describe your advertising request. The AI Manager turns it into a campaign structure and prepares distribution for suitable platforms.",
  advertising_form_title: "Your AI Advertising Request",
  company_placeholder: "Company",
  product_placeholder: "Product or service",
  ad_placeholder: "Describe your advertisement...",
  create_campaign: "Create AI Campaign",
  campaign_empty:
    "Your AI campaign will appear here.",

  pricing_title: "Transparent digital packages.",
  pricing_text:
    "The AI Manager can prepare a tailored proposal based on your requirements.",
  price_1_title: "New Website Design",
  price_1_text:
    "Modern business website with responsive design.",
  price_2_title: "Website Modernization",
  price_2_text:
    "Modernization of an existing website.",
  price_3_title: "AI Integration",
  price_3_text:
    "Integration of intelligent AI functionality.",
  price_4_title: "AI Advertising",
  price_4_text:
    "AI campaign planning and advertising materials.",
  pricing_note:
    "Final prices are calculated according to project scope.",
  choose: "Choose",

  checker_title: "Check your website.",
  checker_text:
    "The Website Audit Agent analyzes technical signals, SEO data and detected optimization opportunities.",
  url_placeholder: "https://your-website.com",
  audit_button: "Analyze Website",

  request_title: "Let's start your project.",
  request_text:
    "Send your request directly to the NEXORA AI Manager.",
  form_title: "Request a Project",
  name_placeholder: "Name / Company",
  email_placeholder: "Email",
  message_placeholder:
    "Tell us about your project...",
  form_send: "Send Request",

  execution_title: "From request to launch.",
  booking_title:
    "Book a free initial consultation.",
  booking_text:
    "Let's discuss your digital future.",
  booking_button: "Book Meeting",

  contact_title: "Let's build the future.",

  footer_company: "NEXORA DIGITAL",
  footer_legal: "LEGAL",
  privacy: "Privacy Policy",
  impressum: "Legal Notice",
  terms: "Terms & Conditions",
  rights: "All Rights Reserved."
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

  hero_tag: "وكالة رقمية مدعومة بالذكاء الاصطناعي",
  hero_title_1: "نصمم",
  hero_title_2: "المستقبل الرقمي.",
  hero_text:
    "تطوّر NEXORA Digital مواقع حديثة وحلول ذكاء اصطناعي وأتمتة وإعلانات ذكية للشركات.",
  hero_check: "فحص الموقع مجاناً",
  hero_ad: "KI-Werbung",
  hero_project: "ابدأ مشروعك",

  stat_team: "أعضاء فريق AI",
  stat_pipeline: "مراحل سير العمل",
  stat_languages: "اللغات",
  stat_online: "متاح رقمياً",

  design_title:
    "تجارب رقمية للجيل القادم.",
  design_text:
    "نربط التصميم والتكنولوجيا والذكاء الاصطناعي في نظام رقمي واحد.",

  service_1_title: "موقع جديد",
  service_1_text:
    "مواقع حديثة ومتجاوبة ومصممة للتحويل.",
  service_2_title: "تحديث الموقع",
  service_2_text:
    "تحديث المواقع الحالية تقنياً وبصرياً.",
  service_3_title: "دمج الذكاء الاصطناعي",
  service_3_text:
    "مساعدون وأتمتة وعمليات ذكية.",

  requirements_title:
    "متطلباتك تتحول إلى خطة رقمية.",
  requirements_text:
    "يتم تنظيم التحليل والاستراتيجية والتصميم والتطوير والإطلاق ضمن سير عمل واضح.",

  step_1_title: "تحليل",
  step_1_text: "تحليل الشركة والهدف.",
  step_2_title: "بحث",
  step_2_text: "بحث السوق والموقع والفرص.",
  step_3_title: "تدقيق",
  step_3_text:
    "اكتشاف المشاكل التقنية والرقمية.",
  step_4_title: "تصميم",
  step_4_text:
    "إنشاء مفهوم UI/UX مخصص.",
  step_5_title: "موافقة",
  step_5_text:
    "يؤكد العميل الخطوة التالية.",

  team_title:
    "فريق افتراضي من 9 أعضاء بالذكاء الاصطناعي.",
  team_text:
    "يدير AI General Manager ثمانية وكلاء متخصصين ويوزع المهام تلقائياً.",

  agent_manager: "التنسيق وتوزيع المهام",
  agent_lead: "بحث العملاء والشركات",
  agent_audit: "تحليل الموقع وSEO",
  agent_design: "UI/UX والأفكار الإبداعية",
  agent_quote: "العروض والأسعار",
  agent_ad: "حملات KI-Werbung",
  agent_dev: "التطوير والأتمتة",
  agent_qa: "ضمان الجودة",
  agent_launch: "الإطلاق والنشر",

  ai_title: "مدير AI الذكي.",
  ai_text:
    "اكتب طلبك وسيقوم المدير بتحليله وتوجيه المهمة إلى الوكيل المناسب.",
  command_title: "مركز أوامر AI",
  command_placeholder: "اكتب طلبك...",
  ai_run: "تنفيذ الأمر",

  advertising_title: "KI-Werbung",
  advertising_text:
    "صف الإعلان الذي تريده وسيقوم مدير AI ببناء هيكل الحملة وتجهيزها للمنصات المناسبة.",
  advertising_form_title:
    "طلب KI-Werbung",
  company_placeholder: "الشركة",
  product_placeholder: "المنتج أو الخدمة",
  ad_placeholder: "صف الإعلان...",
  create_campaign: "إنشاء حملة AI",
  campaign_empty:
    "ستظهر حملة AI هنا.",

  pricing_title:
    "باقات رقمية واضحة.",
  pricing_text:
    "يمكن لمدير AI إعداد عرض مخصص بناءً على متطلباتك.",

  price_1_title: "تصميم موقع جديد",
  price_1_text:
    "موقع شركة حديث ومتجاوب.",
  price_2_title: "تحديث الموقع",
  price_2_text:
    "تحديث موقع قائم.",
  price_3_title: "دمج AI",
  price_3_text:
    "دمج وظائف الذكاء الاصطناعي.",
  price_4_title: "KI-Werbung",
  price_4_text:
    "تخطيط الحملات والمواد الإعلانية.",

  pricing_note:
    "يتم تحديد السعر النهائي حسب نطاق المشروع.",
  choose: "اختيار",

  checker_title: "افحص موقعك.",
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

  form_title: "طلب مشروع",
  name_placeholder:
    "الاسم / الشركة",
  email_placeholder:
    "البريد الإلكتروني",
  message_placeholder:
    "أخبرنا عن مشروعك...",
  form_send:
    "إرسال الطلب",

  pipeline_title:
    "مراحل المشروع الـ14",

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
    "سياسة الخصوصية",
  impressum:
    "الإشعار القانوني",
  terms:
    "الشروط والأحكام",
  rights:
    "جميع الحقوق محفوظة."
};


/* =========================================================
   ADDITIONAL LANGUAGES
   Each language is fully selectable.
   Missing detailed content safely falls back to English.
========================================================= */

const LANGUAGE_OVERRIDES = {

  fr: {
    nav_design: "Design",
    nav_requirements: "Exigences",
    nav_execution: "Mise en œuvre",
    nav_ai_team: "Équipe IA",
    nav_pricing: "Tarifs",
    nav_booking: "Rendez-vous",
    nav_contact: "Contact",
    hero_tag: "AGENCE DIGITALE PROPULSÉE PAR L'IA",
    hero_title_1: "Nous créons",
    hero_title_2: "le futur numérique.",
    hero_text:
      "NEXORA Digital développe des sites modernes, des solutions IA intelligentes, de l'automatisation et de la publicité IA.",
    hero_check: "Auditer gratuitement le site",
    hero_ad: "KI-Werbung",
    hero_project: "Démarrer le projet",
    design_title: "Des expériences numériques pour la prochaine génération.",
    design_text:
      "Nous réunissons design, technologie et intelligence artificielle dans un système numérique.",
    service_1_title: "Nouveau site web",
    service_1_text: "Sites modernes, responsives et orientés conversion.",
    service_2_title: "Modernisation du site",
    service_2_text: "Modernisation technique et visuelle des sites existants.",
    service_3_title: "Intégration IA",
    service_3_text: "Assistants IA, automatisation et processus intelligents.",
    requirements_title: "Vos exigences deviennent un plan numérique.",
    requirements_text:
      "Analyse, stratégie, design, développement et lancement sont gérés dans un workflow structuré.",
    team_title: "Une équipe virtuelle de 9 agents IA.",
    team_text:
      "Un AI General Manager coordonne huit agents spécialisés et répartit automatiquement les tâches.",
    ai_title: "Votre AI Manager intelligent.",
    command_title: "CENTRE DE COMMANDE IA",
    command_placeholder: "Décrivez votre demande...",
    ai_run: "Exécuter",
    advertising_title: "KI-Werbung",
    advertising_form_title: "Votre demande publicitaire IA",
    company_placeholder: "Entreprise",
    product_placeholder: "Produit ou service",
    ad_placeholder: "Décrivez votre publicité...",
    create_campaign: "Créer une campagne IA",
    pricing_title: "Des forfaits numériques transparents.",
    checker_title: "Analysez votre site.",
    audit_button: "Analyser le site",
    request_title: "Commençons votre projet.",
    form_title: "Demander un projet",
    name_placeholder: "Nom / Entreprise",
    email_placeholder: "E-mail",
    message_placeholder: "Parlez-nous de votre projet...",
    form_send: "Envoyer la demande",
    booking_title: "Réservez une première consultation gratuite.",
    booking_button: "Réserver un rendez-vous",
    contact_title: "Construisons le futur."
  },

  es: {
    nav_design: "Diseño",
    nav_requirements: "Requisitos",
    nav_execution: "Ejecución",
    nav_ai_team: "Equipo IA",
    nav_pricing: "Precios",
    nav_booking: "Cita",
    nav_contact: "Contacto",
    hero_tag: "AGENCIA DIGITAL IMPULSADA POR IA",
    hero_title_1: "Diseñamos",
    hero_title_2: "el futuro digital.",
    hero_text:
      "NEXORA Digital desarrolla sitios web modernos, soluciones de IA, automatización y publicidad con IA.",
    hero_check: "Auditoría web gratuita",
    hero_ad: "KI-Werbung",
    hero_project: "Iniciar proyecto",
    design_title: "Experiencias digitales para la próxima generación.",
    design_text:
      "Unimos diseño, tecnología e inteligencia artificial en un sistema digital.",
    service_1_title: "Nuevo sitio web",
    service_2_title: "Modernización web",
    service_3_title: "Integración de IA",
    requirements_title: "Tus requisitos se convierten en un plan digital.",
    team_title: "Una fuerza de trabajo virtual de 9 agentes de IA.",
    ai_title: "Tu AI Manager inteligente.",
    command_placeholder: "Describe tu solicitud...",
    ai_run: "Ejecutar comando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Empresa",
    product_placeholder: "Producto o servicio",
    ad_placeholder: "Describe tu anuncio...",
    create_campaign: "Crear campaña de IA",
    pricing_title: "Paquetes digitales transparentes.",
    checker_title: "Comprueba tu sitio web.",
    audit_button: "Analizar sitio",
    request_title: "Comencemos tu proyecto.",
    form_title: "Solicitar proyecto",
    name_placeholder: "Nombre / Empresa",
    email_placeholder: "Correo electrónico",
    message_placeholder: "Cuéntanos sobre tu proyecto...",
    form_send: "Enviar solicitud",
    booking_title: "Reserva una consulta inicial gratuita.",
    booking_button: "Reservar cita",
    contact_title: "Construyamos el futuro."
  },

  it: {
    nav_design: "Design",
    nav_requirements: "Requisiti",
    nav_execution: "Realizzazione",
    nav_ai_team: "Team IA",
    nav_pricing: "Prezzi",
    nav_booking: "Appuntamento",
    nav_contact: "Contatti",
    hero_tag: "AGENZIA DIGITALE POTENZIATA DALL'IA",
    hero_title_1: "Progettiamo",
    hero_title_2: "il futuro digitale.",
    hero_check: "Controllo gratuito del sito",
    hero_ad: "KI-Werbung",
    hero_project: "Inizia il progetto",
    design_title: "Esperienze digitali per la prossima generazione.",
    service_1_title: "Nuovo sito web",
    service_2_title: "Modernizzazione del sito",
    service_3_title: "Integrazione IA",
    requirements_title: "Le tue esigenze diventano un piano digitale.",
    team_title: "Una forza lavoro virtuale di 9 agenti IA.",
    ai_title: "Il tuo AI Manager intelligente.",
    command_placeholder: "Descrivi la tua richiesta...",
    ai_run: "Esegui comando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Azienda",
    product_placeholder: "Prodotto o servizio",
    ad_placeholder: "Descrivi la tua pubblicità...",
    create_campaign: "Crea campagna IA",
    pricing_title: "Pacchetti digitali trasparenti.",
    checker_title: "Controlla il tuo sito.",
    audit_button: "Analizza sito",
    request_title: "Iniziamo il tuo progetto.",
    form_title: "Richiedi un progetto",
    name_placeholder: "Nome / Azienda",
    email_placeholder: "E-mail",
    message_placeholder: "Parlaci del tuo progetto...",
    form_send: "Invia richiesta",
    booking_title: "Prenota una consulenza iniziale gratuita.",
    booking_button: "Prenota appuntamento",
    contact_title: "Costruiamo il futuro."
  },

  nl: {
    nav_design: "Design",
    nav_requirements: "Vereisten",
    nav_execution: "Uitvoering",
    nav_ai_team: "AI Team",
    nav_pricing: "Prijzen",
    nav_booking: "Afspraak",
    nav_contact: "Contact",
    hero_tag: "AI-GEDREVEN DIGITAAL BUREAU",
    hero_title_1: "Wij ontwerpen",
    hero_title_2: "de digitale toekomst.",
    hero_check: "Gratis website-audit",
    hero_ad: "KI-Werbung",
    hero_project: "Project starten",
    design_title: "Digitale ervaringen voor de volgende generatie.",
    service_1_title: "Nieuwe website",
    service_2_title: "Website moderniseren",
    service_3_title: "AI-integratie",
    requirements_title: "Uw eisen worden een digitaal plan.",
    team_title: "Een virtuele AI-werkforce van 9 leden.",
    ai_title: "Uw intelligente AI Manager.",
    command_placeholder: "Beschrijf uw verzoek...",
    ai_run: "Opdracht uitvoeren",
    advertising_title: "KI-Werbung",
    company_placeholder: "Bedrijf",
    product_placeholder: "Product of dienst",
    ad_placeholder: "Beschrijf uw advertentie...",
    create_campaign: "AI-campagne maken",
    pricing_title: "Transparante digitale pakketten.",
    checker_title: "Controleer uw website.",
    audit_button: "Website analyseren",
    request_title: "Laten we uw project starten.",
    form_title: "Project aanvragen",
    name_placeholder: "Naam / Bedrijf",
    email_placeholder: "E-mail",
    message_placeholder: "Vertel ons over uw project...",
    form_send: "Aanvraag versturen",
    booking_title: "Boek een gratis eerste gesprek.",
    booking_button: "Afspraak boeken",
    contact_title: "Laten we de toekomst bouwen."
  },

  pl: {
    nav_design: "Design",
    nav_requirements: "Wymagania",
    nav_execution: "Realizacja",
    nav_ai_team: "Zespół AI",
    nav_pricing: "Cennik",
    nav_booking: "Spotkanie",
    nav_contact: "Kontakt",
    hero_tag: "AGENCJA CYFROWA WSPOMAGANA PRZEZ AI",
    hero_title_1: "Projektujemy",
    hero_title_2: "cyfrową przyszłość.",
    hero_check: "Bezpłatny audyt strony",
    hero_ad: "KI-Werbung",
    hero_project: "Rozpocznij projekt",
    design_title: "Cyfrowe doświadczenia dla nowej generacji.",
    service_1_title: "Nowa strona internetowa",
    service_2_title: "Modernizacja strony",
    service_3_title: "Integracja AI",
    requirements_title: "Twoje wymagania stają się planem cyfrowym.",
    team_title: "Wirtualny 9-osobowy zespół AI.",
    ai_title: "Twój inteligentny AI Manager.",
    command_placeholder: "Opisz swoje zadanie...",
    ai_run: "Wykonaj polecenie",
    advertising_title: "KI-Werbung",
    company_placeholder: "Firma",
    product_placeholder: "Produkt lub usługa",
    ad_placeholder: "Opisz reklamę...",
    create_campaign: "Utwórz kampanię AI",
    pricing_title: "Przejrzyste pakiety cyfrowe.",
    checker_title: "Sprawdź swoją stronę.",
    audit_button: "Analizuj stronę",
    request_title: "Zacznijmy Twój projekt.",
    form_title: "Zapytanie o projekt",
    name_placeholder: "Imię / Firma",
    email_placeholder: "E-mail",
    message_placeholder: "Opowiedz nam o projekcie...",
    form_send: "Wyślij zapytanie",
    booking_title: "Umów bezpłatną konsultację.",
    booking_button: "Umów spotkanie",
    contact_title: "Budujmy przyszłość."
  },

  tr: {
    nav_design: "Tasarım",
    nav_requirements: "Gereksinimler",
    nav_execution: "Uygulama",
    nav_ai_team: "AI Ekibi",
    nav_pricing: "Fiyatlar",
    nav_booking: "Randevu",
    nav_contact: "İletişim",
    hero_tag: "YAPAY ZEKA DESTEKLİ DİJİTAL AJANS",
    hero_title_1: "Tasarlıyoruz",
    hero_title_2: "dijital geleceği.",
    hero_check: "Ücretsiz web sitesi analizi",
    hero_ad: "KI-Werbung",
    hero_project: "Projeyi başlat",
    design_title: "Yeni nesil dijital deneyimler.",
    service_1_title: "Yeni web sitesi",
    service_2_title: "Web sitesi modernizasyonu",
    service_3_title: "AI entegrasyonu",
    requirements_title: "Gereksinimleriniz dijital plana dönüşür.",
    team_title: "9 üyeli sanal AI iş gücü.",
    ai_title: "Akıllı AI Manager'ınız.",
    command_placeholder: "Talebinizi açıklayın...",
    ai_run: "Komutu çalıştır",
    advertising_title: "KI-Werbung",
    company_placeholder: "Şirket",
    product_placeholder: "Ürün veya hizmet",
    ad_placeholder: "Reklamınızı açıklayın...",
    create_campaign: "AI kampanyası oluştur",
    pricing_title: "Şeffaf dijital paketler.",
    checker_title: "Web sitenizi kontrol edin.",
    audit_button: "Siteyi analiz et",
    request_title: "Projenize başlayalım.",
    form_title: "Proje talebi",
    name_placeholder: "Ad / Şirket",
    email_placeholder: "E-posta",
    message_placeholder: "Projenizi anlatın...",
    form_send: "Talep gönder",
    booking_title: "Ücretsiz ilk görüşme için randevu alın.",
    booking_button: "Randevu al",
    contact_title: "Geleceği birlikte inşa edelim."
  },

  pt: {
    nav_design: "Design",
    nav_requirements: "Requisitos",
    nav_execution: "Execução",
    nav_ai_team: "Equipe IA",
    nav_pricing: "Preços",
    nav_booking: "Agendamento",
    nav_contact: "Contato",
    hero_tag: "AGÊNCIA DIGITAL COM IA",
    hero_title_1: "Nós criamos",
    hero_title_2: "o futuro digital.",
    hero_check: "Auditoria gratuita do site",
    hero_ad: "KI-Werbung",
    hero_project: "Iniciar projeto",
    design_title: "Experiências digitais para a próxima geração.",
    service_1_title: "Novo site",
    service_2_title: "Modernização do site",
    service_3_title: "Integração de IA",
    requirements_title: "Seus requisitos tornam-se um plano digital.",
    team_title: "Uma força de trabalho virtual com 9 agentes de IA.",
    ai_title: "Seu AI Manager inteligente.",
    command_placeholder: "Descreva sua solicitação...",
    ai_run: "Executar comando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Empresa",
    product_placeholder: "Produto ou serviço",
    ad_placeholder: "Descreva seu anúncio...",
    create_campaign: "Criar campanha de IA",
    pricing_title: "Pacotes digitais transparentes.",
    checker_title: "Verifique seu site.",
    audit_button: "Analisar site",
    request_title: "Vamos começar seu projeto.",
    form_title: "Solicitar projeto",
    name_placeholder: "Nome / Empresa",
    email_placeholder: "E-mail",
    message_placeholder: "Conte-nos sobre seu projeto...",
    form_send: "Enviar solicitação",
    booking_title: "Agende uma consulta inicial gratuita.",
    booking_button: "Agendar reunião",
    contact_title: "Vamos construir o futuro."
  },

  ru: {
    nav_design: "Дизайн",
    nav_requirements: "Требования",
    nav_execution: "Реализация",
    nav_ai_team: "AI-команда",
    nav_pricing: "Цены",
    nav_booking: "Встреча",
    nav_contact: "Контакты",
    hero_tag: "ЦИФРОВОЕ АГЕНТСТВО НА ОСНОВЕ ИИ",
    hero_title_1: "Мы создаём",
    hero_title_2: "цифровое будущее.",
    hero_check: "Бесплатный аудит сайта",
    hero_ad: "KI-Werbung",
    hero_project: "Начать проект",
    design_title: "Цифровой опыт нового поколения.",
    service_1_title: "Новый сайт",
    service_2_title: "Модернизация сайта",
    service_3_title: "Интеграция ИИ",
    requirements_title: "Ваши требования становятся цифровым планом.",
    team_title: "Виртуальная команда из 9 AI-агентов.",
    ai_title: "Ваш интеллектуальный AI Manager.",
    command_placeholder: "Опишите задачу...",
    ai_run: "Выполнить команду",
    advertising_title: "KI-Werbung",
    company_placeholder: "Компания",
    product_placeholder: "Продукт или услуга",
    ad_placeholder: "Опишите рекламу...",
    create_campaign: "Создать AI-кампанию",
    pricing_title: "Прозрачные цифровые пакеты.",
    checker_title: "Проверьте свой сайт.",
    audit_button: "Анализировать сайт",
    request_title: "Начнём ваш проект.",
    form_title: "Запросить проект",
    name_placeholder: "Имя / Компания",
    email_placeholder: "E-mail",
    message_placeholder: "Расскажите о проекте...",
    form_send: "Отправить запрос",
    booking_title: "Забронируйте бесплатную консультацию.",
    booking_button: "Забронировать встречу",
    contact_title: "Создадим будущее вместе."
  },

  uk: {
    nav_design: "Дизайн",
    nav_requirements: "Вимоги",
    nav_execution: "Реалізація",
    nav_ai_team: "AI команда",
    nav_pricing: "Ціни",
    nav_booking: "Зустріч",
    nav_contact: "Контакти",
    hero_tag: "ЦИФРОВА АГЕНЦІЯ НА ОСНОВІ ШІ",
    hero_title_1: "Ми створюємо",
    hero_title_2: "цифрове майбутнє.",
    hero_check: "Безкоштовний аудит сайту",
    hero_ad: "KI-Werbung",
    hero_project: "Почати проєкт",
    design_title: "Цифровий досвід нового покоління.",
    service_1_title: "Новий сайт",
    service_2_title: "Модернізація сайту",
    service_3_title: "Інтеграція ШІ",
    requirements_title: "Ваші вимоги стають цифровим планом.",
    team_title: "Віртуальна команда з 9 AI-агентів.",
    ai_title: "Ваш інтелектуальний AI Manager.",
    command_placeholder: "Опишіть завдання...",
    ai_run: "Виконати команду",
    advertising_title: "KI-Werbung",
    company_placeholder: "Компанія",
    product_placeholder: "Продукт або послуга",
    ad_placeholder: "Опишіть рекламу...",
    create_campaign: "Створити AI-кампанію",
    pricing_title: "Прозорі цифрові пакети.",
    checker_title: "Перевірте свій сайт.",
    audit_button: "Аналізувати сайт",
    request_title: "Почнімо ваш проєкт.",
    form_title: "Запит на проєкт",
    name_placeholder: "Ім'я / Компанія",
    email_placeholder: "E-mail",
    message_placeholder: "Розкажіть про ваш проєкт...",
    form_send: "Надіслати запит",
    booking_title: "Забронюйте безкоштовну консультацію.",
    booking_button: "Забронювати зустріч",
    contact_title: "Створюймо майбутнє разом."
  },

  zh: {
    nav_design: "设计",
    nav_requirements: "需求",
    nav_execution: "实施",
    nav_ai_team: "AI团队",
    nav_pricing: "价格",
    nav_booking: "预约",
    nav_contact: "联系我们",
    hero_tag: "AI 驱动的数字机构",
    hero_title_1: "我们设计",
    hero_title_2: "数字未来。",
    hero_check: "免费网站审核",
    hero_ad: "KI-Werbung",
    hero_project: "开始项目",
    design_title: "面向下一代的数字体验。",
    service_1_title: "新网站",
    service_2_title: "网站现代化",
    service_3_title: "AI 集成",
    requirements_title: "您的需求将成为数字计划。",
    team_title: "虚拟9人AI工作团队。",
    ai_title: "您的智能 AI Manager。",
    command_placeholder: "描述您的需求...",
    ai_run: "执行命令",
    advertising_title: "KI-Werbung",
    company_placeholder: "公司",
    product_placeholder: "产品或服务",
    ad_placeholder: "描述您的广告...",
    create_campaign: "创建AI广告活动",
    pricing_title: "透明的数字服务套餐。",
    checker_title: "检查您的网站。",
    audit_button: "分析网站",
    request_title: "开始您的项目。",
    form_title: "项目申请",
    name_placeholder: "姓名 / 公司",
    email_placeholder: "电子邮件",
    message_placeholder: "告诉我们您的项目...",
    form_send: "发送请求",
    booking_title: "预约免费的初次咨询。",
    booking_button: "预约会议",
    contact_title: "共同打造未来。"
  },

  ja: {
    nav_design: "デザイン",
    nav_requirements: "要件",
    nav_execution: "実装",
    nav_ai_team: "AIチーム",
    nav_pricing: "料金",
    nav_booking: "予約",
    nav_contact: "お問い合わせ",
    hero_tag: "AIを活用したデジタルエージェンシー",
    hero_title_1: "私たちは創造します",
    hero_title_2: "デジタルの未来を。",
    hero_check: "無料ウェブサイト監査",
    hero_ad: "KI-Werbung",
    hero_project: "プロジェクトを開始",
    design_title: "次世代のデジタル体験。",
    service_1_title: "新しいウェブサイト",
    service_2_title: "ウェブサイトの刷新",
    service_3_title: "AI統合",
    requirements_title: "要件をデジタルプランへ。",
    team_title: "9人の仮想AIワークフォース。",
    ai_title: "あなたのインテリジェントAI Manager。",
    command_placeholder: "依頼内容を入力してください...",
    ai_run: "コマンド実行",
    advertising_title: "KI-Werbung",
    company_placeholder: "会社名",
    product_placeholder: "製品またはサービス",
    ad_placeholder: "広告内容を入力してください...",
    create_campaign: "AIキャンペーンを作成",
    pricing_title: "透明性のあるデジタルパッケージ。",
    checker_title: "ウェブサイトをチェック。",
    audit_button: "サイトを分析",
    request_title: "プロジェクトを始めましょう。",
    form_title: "プロジェクトを依頼",
    name_placeholder: "名前 / 会社",
    email_placeholder: "メール",
    message_placeholder: "プロジェクトについて教えてください...",
    form_send: "依頼を送信",
    booking_title: "無料の初回相談を予約。",
    booking_button: "予約する",
    contact_title: "未来を一緒につくりましょう。"
  },

  ko: {
    nav_design: "디자인",
    nav_requirements: "요구사항",
    nav_execution: "실행",
    nav_ai_team: "AI 팀",
    nav_pricing: "가격",
    nav_booking: "예약",
    nav_contact: "문의",
    hero_tag: "AI 기반 디지털 에이전시",
    hero_title_1: "우리는 설계합니다",
    hero_title_2: "디지털 미래를.",
    hero_check: "무료 웹사이트 감사",
    hero_ad: "KI-Werbung",
    hero_project: "프로젝트 시작",
    design_title: "차세대를 위한 디지털 경험.",
    service_1_title: "새 웹사이트",
    service_2_title: "웹사이트 현대화",
    service_3_title: "AI 통합",
    requirements_title: "요구사항을 디지털 계획으로.",
    team_title: "9명의 가상 AI 워크포스.",
    ai_title: "당신의 지능형 AI Manager.",
    command_placeholder: "요청을 입력하세요...",
    ai_run: "명령 실행",
    advertising_title: "KI-Werbung",
    company_placeholder: "회사",
    product_placeholder: "제품 또는 서비스",
    ad_placeholder: "광고를 설명하세요...",
    create_campaign: "AI 캠페인 만들기",
    pricing_title: "투명한 디지털 패키지.",
    checker_title: "웹사이트를 확인하세요.",
    audit_button: "웹사이트 분석",
    request_title: "프로젝트를 시작하세요.",
    form_title: "프로젝트 요청",
    name_placeholder: "이름 / 회사",
    email_placeholder: "이메일",
    message_placeholder: "프로젝트를 알려주세요...",
    form_send: "요청 보내기",
    booking_title: "무료 초기 상담을 예약하세요.",
    booking_button: "미팅 예약",
    contact_title: "미래를 함께 만들어갑시다."
  },

  hi: {
    nav_design: "डिज़ाइन",
    nav_requirements: "आवश्यकताएँ",
    nav_execution: "क्रियान्वयन",
    nav_ai_team: "AI टीम",
    nav_pricing: "कीमतें",
    nav_booking: "अपॉइंटमेंट",
    nav_contact: "संपर्क",
    hero_tag: "AI-संचालित डिजिटल एजेंसी",
    hero_title_1: "हम डिज़ाइन करते हैं",
    hero_title_2: "डिजिटल भविष्य।",
    hero_check: "मुफ़्त वेबसाइट ऑडिट",
    hero_ad: "KI-Werbung",
    hero_project: "प्रोजेक्ट शुरू करें",
    design_title: "अगली पीढ़ी के लिए डिजिटल अनुभव।",
    service_1_title: "नई वेबसाइट",
    service_2_title: "वेबसाइट आधुनिकीकरण",
    service_3_title: "AI एकीकरण",
    requirements_title: "आपकी आवश्यकताएँ डिजिटल योजना बनती हैं।",
    team_title: "9 सदस्यीय वर्चुअल AI वर्कफोर्स।",
    ai_title: "आपका बुद्धिमान AI Manager।",
    command_placeholder: "अपना अनुरोध लिखें...",
    ai_run: "कमांड चलाएँ",
    advertising_title: "KI-Werbung",
    company_placeholder: "कंपनी",
    product_placeholder: "उत्पाद या सेवा",
    ad_placeholder: "अपना विज्ञापन लिखें...",
    create_campaign: "AI अभियान बनाएँ",
    pricing_title: "पारदर्शी डिजिटल पैकेज।",
    checker_title: "अपनी वेबसाइट जाँचें।",
    audit_button: "वेबसाइट का विश्लेषण करें",
    request_title: "अपना प्रोजेक्ट शुरू करें।",
    form_title: "प्रोजेक्ट अनुरोध",
    name_placeholder: "नाम / कंपनी",
    email_placeholder: "ई-मेल",
    message_placeholder: "अपने प्रोजेक्ट के बारे में बताएँ...",
    form_send: "अनुरोध भेजें",
    booking_title: "निःशुल्क प्रारंभिक परामर्श बुक करें।",
    booking_button: "अपॉइंटमेंट बुक करें",
    contact_title: "आइए भविष्य बनाएँ।"
  },

  sv: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Genomförande",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Bokning",
    nav_contact: "Kontakt",
    hero_tag: "AI-DRIVEN DIGITAL BYRÅ",
    hero_title_1: "Vi skapar",
    hero_title_2: "den digitala framtiden.",
    hero_check: "Gratis webbplatsgranskning",
    hero_ad: "KI-Werbung",
    hero_project: "Starta projekt",
    design_title: "Digitala upplevelser för nästa generation.",
    service_1_title: "Ny webbplats",
    service_2_title: "Modernisering av webbplats",
    service_3_title: "AI-integration",
    requirements_title: "Dina krav blir en digital plan.",
    team_title: "En virtuell AI-arbetsstyrka med 9 medlemmar.",
    ai_title: "Din intelligenta AI Manager.",
    command_placeholder: "Beskriv din förfrågan...",
    ai_run: "Kör kommando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Företag",
    product_placeholder: "Produkt eller tjänst",
    ad_placeholder: "Beskriv din annons...",
    create_campaign: "Skapa AI-kampanj",
    pricing_title: "Transparenta digitala paket.",
    checker_title: "Kontrollera din webbplats.",
    audit_button: "Analysera webbplats",
    request_title: "Låt oss starta ditt projekt.",
    form_title: "Begär projekt",
    name_placeholder: "Namn / Företag",
    email_placeholder: "E-post",
    message_placeholder: "Berätta om ditt projekt...",
    form_send: "Skicka förfrågan",
    booking_title: "Boka ett kostnadsfritt första samtal.",
    booking_button: "Boka möte",
    contact_title: "Låt oss bygga framtiden."
  },

  da: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Implementering",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Booking",
    nav_contact: "Kontakt",
    hero_tag: "AI-DREVET DIGITALT BUREAU",
    hero_title_1: "Vi designer",
    hero_title_2: "den digitale fremtid.",
    hero_check: "Gratis website-audit",
    hero_ad: "KI-Werbung",
    hero_project: "Start projekt",
    design_title: "Digitale oplevelser til næste generation.",
    service_1_title: "Ny hjemmeside",
    service_2_title: "Modernisering af hjemmeside",
    service_3_title: "AI-integration",
    requirements_title: "Dine krav bliver til en digital plan.",
    team_title: "En virtuel AI-arbejdsstyrke på 9 medlemmer.",
    ai_title: "Din intelligente AI Manager.",
    command_placeholder: "Beskriv din forespørgsel...",
    ai_run: "Kør kommando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Virksomhed",
    product_placeholder: "Produkt eller service",
    ad_placeholder: "Beskriv din annonce...",
    create_campaign: "Opret AI-kampagne",
    pricing_title: "Gennemsigtige digitale pakker.",
    checker_title: "Tjek din hjemmeside.",
    audit_button: "Analyser hjemmeside",
    request_title: "Lad os starte dit projekt.",
    form_title: "Anmod om projekt",
    name_placeholder: "Navn / Virksomhed",
    email_placeholder: "E-mail",
    message_placeholder: "Fortæl os om dit projekt...",
    form_send: "Send forespørgsel",
    booking_title: "Book en gratis indledende samtale.",
    booking_button: "Book møde",
    contact_title: "Lad os bygge fremtiden."
  },

  no: {
    nav_design: "Design",
    nav_requirements: "Krav",
    nav_execution: "Gjennomføring",
    nav_ai_team: "AI-team",
    nav_pricing: "Priser",
    nav_booking: "Bestilling",
    nav_contact: "Kontakt",
    hero_tag: "AI-DREVET DIGITALT BYRÅ",
    hero_title_1: "Vi designer",
    hero_title_2: "den digitale fremtiden.",
    hero_check: "Gratis nettsideanalyse",
    hero_ad: "KI-Werbung",
    hero_project: "Start prosjekt",
    design_title: "Digitale opplevelser for neste generasjon.",
    service_1_title: "Ny nettside",
    service_2_title: "Modernisering av nettside",
    service_3_title: "AI-integrasjon",
    requirements_title: "Dine krav blir en digital plan.",
    team_title: "En virtuell AI-arbeidsstyrke på 9 medlemmer.",
    ai_title: "Din intelligente AI Manager.",
    command_placeholder: "Beskriv forespørselen din...",
    ai_run: "Kjør kommando",
    advertising_title: "KI-Werbung",
    company_placeholder: "Bedrift",
    product_placeholder: "Produkt eller tjeneste",
    ad_placeholder: "Beskriv annonsen...",
    create_campaign: "Opprett AI-kampanje",
    pricing_title: "Transparente digitale pakker.",
    checker_title: "Sjekk nettstedet ditt.",
    audit_button: "Analyser nettsted",
    request_title: "La oss starte prosjektet ditt.",
    form_title: "Be om prosjekt",
    name_placeholder: "Navn / Bedrift",
    email_placeholder: "E-post",
    message_placeholder: "Fortell oss om prosjektet...",
    form_send: "Send forespørsel",
    booking_title: "Bestill en gratis førstesamtale.",
    booking_button: "Bestill møte",
    contact_title: "La oss bygge fremtiden."
  },

  fi: {
    nav_design: "Suunnittelu",
    nav_requirements: "Vaatimukset",
    nav_execution: "Toteutus",
    nav_ai_team: "AI-tiimi",
    nav_pricing: "Hinnat",
    nav_booking: "Varaus",
    nav_contact: "Yhteystiedot",
    hero_tag: "TEKOÄLYLLÄ TOIMIVA DIGITAALINEN TOIMISTO",
    hero_title_1: "Suunnittelemme",
    hero_title_2: "digitaalista tulevaisuutta.",
    hero_check: "Ilmainen verkkosivuston auditointi",
    hero_ad: "KI-Werbung",
    hero_project: "Aloita projekti",
    design_title: "Digitaalisia kokemuksia seuraavalle sukupolvelle.",
    service_1_title: "Uusi verkkosivusto",
    service_2_title: "Verkkosivuston uudistus",
    service_3_title: "AI-integraatio",
    requirements_title: "Vaatimuksistasi tulee digitaalinen suunnitelma.",
    team_title: "Virtuaalinen 9-jäseninen AI-työryhmä.",
    ai_title: "Älykäs AI Managerisi.",
    command_placeholder: "Kuvaile pyyntösi...",
    ai_run: "Suorita komento",
    advertising_title: "KI-Werbung",
    company_placeholder: "Yritys",
    product_placeholder: "Tuote tai palvelu",
    ad_placeholder: "Kuvaile mainostasi...",
    create_campaign: "Luo AI-kampanja",
    pricing_title: "Selkeät digitaaliset paketit.",
    checker_title: "Tarkista verkkosivustosi.",
    audit_button: "Analysoi verkkosivusto",
    request_title: "Aloitetaan projektisi.",
    form_title: "Pyydä projekti",
    name_placeholder: "Nimi / Yritys",
    email_placeholder: "Sähköposti",
    message_placeholder: "Kerro meille projektistasi...",
    form_send: "Lähetä pyyntö",
    booking_title: "Varaa ilmainen ensikonsultaatio.",
    booking_button: "Varaa tapaaminen",
    contact_title: "Rakennetaan tulevaisuus yhdessä."
  }
};


/* =========================================================
   TRANSLATION REGISTRY
========================================================= */

const TRANSLATIONS = {
  de: DE_TRANSLATION,
  en: EN_TRANSLATION,
  ar: AR_TRANSLATION
};

Object.keys(LANGUAGES).forEach(language => {
  if (!TRANSLATIONS[language]) {
    TRANSLATIONS[language] = {
      ...EN_TRANSLATION,
      ...(LANGUAGE_OVERRIDES[language] || {})
    };
  }
});


/* =========================================================
   CURRENT LANGUAGE
========================================================= */

let currentLanguage =
  localStorage.getItem("nexora_language") || "de";

if (!LANGUAGES[currentLanguage]) {
  currentLanguage = "de";
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /*
    Build the complete 20-language selector.
    This restores the complete language menu even if
    index.html currently contains only Deutsch.
  */

  buildLanguageMenu();

  applyLanguage(currentLanguage);

  renderPipeline();

  const form =
    document.getElementById("projectForm");

  if (form) {
    form.addEventListener(
      "submit",
      submitProject
    );
  }

  document.addEventListener("click", event => {

    const menu =
      document.getElementById("languageMenu");

    const wrapper =
      document.querySelector(".language-wrapper");

    const button =
      document.getElementById("languageButton");

    if (
      menu &&
      wrapper &&
      !wrapper.contains(event.target)
    ) {

      menu.classList.remove("active");

      if (button) {
        button.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }

  });

  /*
    Make sure language menu buttons work even when
    generated dynamically.
  */

  const menu =
    document.getElementById("languageMenu");

  if (menu) {

    menu.addEventListener("click", event => {

      const languageButton =
        event.target.closest(
          "[data-language]"
        );

      if (!languageButton) return;

      const language =
        languageButton.dataset.language;

      setLanguage(language);

    });

  }

  await refreshSystemStatus();
});


/* =========================================================
   LANGUAGE MENU
========================================================= */

function buildLanguageMenu() {

  const menu =
    document.getElementById("languageMenu");

  if (!menu) return;

  menu.innerHTML = "";

  Object.entries(LANGUAGES).forEach(
    ([code, language]) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.dataset.language = code;

      button.setAttribute(
        "aria-label",
        `${language.name} - ${language.native}`
      );

      button.innerHTML = `
        <span aria-hidden="true">
          ${language.flag}
        </span>
        <span>
          ${language.native}
        </span>
        <small>
          ${code.toUpperCase()}
        </small>
      `;

      menu.appendChild(button);

    }
  );
}


function toggleLanguageMenu() {

  const menu =
    document.getElementById("languageMenu");

  const button =
    document.getElementById("languageButton");

  if (!menu) return;

  const isOpen =
    menu.classList.toggle("active");

  if (button) {

    button.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  }

}


/* =========================================================
   SET LANGUAGE
========================================================= */

async function setLanguage(language) {

  if (!LANGUAGES[language]) {
    language = "de";
  }

  currentLanguage = language;

  localStorage.setItem(
    "nexora_language",
    currentLanguage
  );

  applyLanguage(currentLanguage);

  const menu =
    document.getElementById("languageMenu");

  const button =
    document.getElementById("languageButton");

  if (menu) {
    menu.classList.remove("active");
  }

  if (button) {
    button.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  /*
    Send selected language to backend.
  */

  try {

    await fetch(`${API_BASE}/language`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: currentLanguage
      })
    });

  } catch (error) {

    console.warn(
      "Language backend unavailable:",
      error
    );

  }

}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage(language) {

  const dictionary =
    TRANSLATIONS[language] ||
    TRANSLATIONS.en ||
    TRANSLATIONS.de;

  const metadata =
    LANGUAGES[language] ||
    LANGUAGES.de;

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    metadata.rtl ? "rtl" : "ltr";

  if (document.body) {
    document.body.dir =
      metadata.rtl ? "rtl" : "ltr";
  }

  /*
    Normal text translation
  */

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.getAttribute(
          "data-i18n"
        );

      if (
        Object.prototype.hasOwnProperty.call(
          dictionary,
          key
        )
      ) {

        element.textContent =
          dictionary[key];

      }

    });

  /*
    Placeholder translation
  */

  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
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
      ) {

        element.placeholder =
          dictionary[key];

      }

    });

  /*
    Active language button
  */

  const button =
    document.getElementById(
      "languageButton"
    );

  if (button) {

    button.textContent =
      `${metadata.flag} ${language.toUpperCase()}`;

  }

  /*
    Page title
  */

  const titles = {

    de:
      "NEXORA Digital | AI • Web • Digital Intelligence",

    en:
      "NEXORA Digital | AI • Web • Digital Intelligence",

    ar:
      "NEXORA Digital | الذكاء الاصطناعي • الويب • الأتمتة",

    fr:
      "NEXORA Digital | IA • Web • Intelligence Digitale",

    es:
      "NEXORA Digital | IA • Web • Inteligencia Digital",

    it:
      "NEXORA Digital | IA • Web • Intelligenza Digitale",

    nl:
      "NEXORA Digital | AI • Web • Digitale Intelligentie",

    pl:
      "NEXORA Digital | AI • Web • Inteligencja Cyfrowa",

    tr:
      "NEXORA Digital | AI • Web • Dijital Zeka",

    pt:
      "NEXORA Digital | IA • Web • Inteligência Digital",

    ru:
      "NEXORA Digital | ИИ • Web • Цифровой интеллект",

    uk:
      "NEXORA Digital | ШІ • Web • Цифровий інтелект",

    zh:
      "NEXORA Digital | AI • Web • 数字智能",

    ja:
      "NEXORA Digital | AI • Web • デジタルインテリジェンス",

    ko:
      "NEXORA Digital | AI • Web • 디지털 인텔리전스",

    hi:
      "NEXORA Digital | AI • Web • डिजिटल इंटेलिजेंस",

    sv:
      "NEXORA Digital | AI • Web • Digital intelligens",

    da:
      "NEXORA Digital | AI • Web • Digital intelligens",

    no:
      "NEXORA Digital | AI • Web • Digital intelligens",

    fi:
      "NEXORA Digital | AI • Web • Digitaalinen älykkyys"

  };

  document.title =
    titles[language] ||
    titles.en;

  updateServiceOptions(language);

  renderPipeline();

}


/* =========================================================
   SERVICE OPTIONS — ALL 20 LANGUAGES
========================================================= */

function updateServiceOptions(language) {

  const select =
    document.getElementById(
      "serviceType"
    );

  if (!select) return;

  const options = {

    de: [
      ["New Website Design", "Neue Website"],
      ["Website Modernization", "Website Modernisierung"],
      ["AI Integration", "KI Integration"],
      ["AI Advertising", "AI Advertising"],
      ["Digital Automation", "Digitale Automatisierung"]
    ],

    en: [
      ["New Website Design", "New Website"],
      ["Website Modernization", "Website Modernization"],
      ["AI Integration", "AI Integration"],
      ["AI Advertising", "AI Advertising"],
      ["Digital Automation", "Digital Automation"]
    ],

    ar: [
      ["New Website Design", "موقع جديد"],
      ["Website Modernization", "تحديث الموقع"],
      ["AI Integration", "دمج الذكاء الاصطناعي"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "الأتمتة الرقمية"]
    ],

    fr: [
      ["New Website Design", "Nouveau site web"],
      ["Website Modernization", "Modernisation du site"],
      ["AI Integration", "Intégration IA"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Automatisation numérique"]
    ],

    es: [
      ["New Website Design", "Nuevo sitio web"],
      ["Website Modernization", "Modernización web"],
      ["AI Integration", "Integración de IA"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Automatización digital"]
    ],

    it: [
      ["New Website Design", "Nuovo sito web"],
      ["Website Modernization", "Modernizzazione del sito"],
      ["AI Integration", "Integrazione IA"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Automazione digitale"]
    ],

    nl: [
      ["New Website Design", "Nieuwe website"],
      ["Website Modernization", "Website moderniseren"],
      ["AI Integration", "AI-integratie"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Digitale automatisering"]
    ],

    pl: [
      ["New Website Design", "Nowa strona internetowa"],
      ["Website Modernization", "Modernizacja strony"],
      ["AI Integration", "Integracja AI"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Automatyzacja cyfrowa"]
    ],

    tr: [
      ["New Website Design", "Yeni web sitesi"],
      ["Website Modernization", "Web sitesi modernizasyonu"],
      ["AI Integration", "AI entegrasyonu"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Dijital otomasyon"]
    ],

    pt: [
      ["New Website Design", "Novo site"],
      ["Website Modernization", "Modernização do site"],
      ["AI Integration", "Integração de IA"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Automação digital"]
    ],

    ru: [
      ["New Website Design", "Новый сайт"],
      ["Website Modernization", "Модернизация сайта"],
      ["AI Integration", "Интеграция ИИ"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Цифровая автоматизация"]
    ],

    uk: [
      ["New Website Design", "Новий сайт"],
      ["Website Modernization", "Модернізація сайту"],
      ["AI Integration", "Інтеграція ШІ"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Цифрова автоматизація"]
    ],

    zh: [
      ["New Website Design", "新网站"],
      ["Website Modernization", "网站现代化"],
      ["AI Integration", "AI 集成"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "数字自动化"]
    ],

    ja: [
      ["New Website Design", "新しいウェブサイト"],
      ["Website Modernization", "ウェブサイト刷新"],
      ["AI Integration", "AI統合"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "デジタル自動化"]
    ],

    ko: [
      ["New Website Design", "새 웹사이트"],
      ["Website Modernization", "웹사이트 현대화"],
      ["AI Integration", "AI 통합"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "디지털 자동화"]
    ],

    hi: [
      ["New Website Design", "नई वेबसाइट"],
      ["Website Modernization", "वेबसाइट आधुनिकीकरण"],
      ["AI Integration", "AI एकीकरण"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "डिजिटल ऑटोमेशन"]
    ],

    sv: [
      ["New Website Design", "Ny webbplats"],
      ["Website Modernization", "Modernisering av webbplats"],
      ["AI Integration", "AI-integration"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Digital automatisering"]
    ],

    da: [
      ["New Website Design", "Ny hjemmeside"],
      ["Website Modernization", "Modernisering af hjemmeside"],
      ["AI Integration", "AI-integration"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Digital automatisering"]
    ],

    no: [
      ["New Website Design", "Ny nettside"],
      ["Website Modernization", "Modernisering av nettside"],
      ["AI Integration", "AI-integrasjon"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Digital automatisering"]
    ],

    fi: [
      ["New Website Design", "Uusi verkkosivusto"],
      ["Website Modernization", "Verkkosivuston uudistus"],
      ["AI Integration", "AI-integraatio"],
      ["AI Advertising", "KI-Werbung"],
      ["Digital Automation", "Digitaalinen automaatio"]
    ]

  };

  const list =
    options[language] ||
    options.en;

  select.innerHTML = "";

  list.forEach(
    ([value, label]) => {

      const option =
        document.createElement(
          "option"
        );

      option.value = value;
      option.textContent = label;

      select.appendChild(option);

    }
  );

}


/* =========================================================
   HERO VIDEO
========================================================= */

function toggleHeroVideo() {

  const video =
    document.getElementById(
      "heroVideo"
    );

  const button =
    document.getElementById(
      "videoPlayButton"
    );

  if (!video) return;

  if (video.paused) {

    video
      .play()
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


/* =========================================================
   AI COMMAND
========================================================= */

async function runAICommand() {

  const input =
    document.getElementById(
      "aiCommand"
    );

  const output =
    document.getElementById(
      "aiResponse"
    );

  if (!input || !output) return;

  const command =
    input.value.trim();

  if (!command) {

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

  try {

    const response =
      await fetch(
        `${API_BASE}/command`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            command,
            language: currentLanguage
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
        "AI request failed"
      );
    }

    output.textContent =
      formatAIResult(data);

  } catch (error) {

    output.textContent =
      error.message ||
      "AI Manager unavailable.";

  }

}


/* =========================================================
   AI ADVERTISING
========================================================= */

async function createAICampaign() {

  const company =
    document
      .getElementById("adCompany")
      ?.value
      .trim();

  const product =
    document
      .getElementById("adProduct")
      ?.value
      .trim();

  const goal =
    document.getElementById(
      "adGoal"
    )?.value;

  const brief =
    document
      .getElementById("adBrief")
      ?.value
      .trim();

  const result =
    document.getElementById(
      "campaignResult"
    );

  const platforms =
    [
      ...document.querySelectorAll(
        ".platforms input:checked"
      )
    ].map(
      input => input.value
    );

  if (
    !company ||
    !product ||
    !brief
  ) {

    if (result) {

      result.textContent =
        currentLanguage === "de"
          ? "Bitte Unternehmen, Produkt und Werbebeschreibung ausfüllen."
          : currentLanguage === "ar"
            ? "يرجى إدخال الشركة والمنتج ووصف الإعلان."
            : "Please provide company, product and advertisement brief.";

    }

    return;
  }

  if (result) {

    result.textContent =
      currentLanguage === "de"
        ? "Advertising Agent erstellt Ihre Kampagne..."
        : currentLanguage === "ar"
          ? "وكيل الإعلانات يقوم بإنشاء الحملة..."
          : "Advertising Agent is creating your campaign...";

  }

  try {

    const response =
      await fetch(
        `${API_BASE}/advertising`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            company,
            product,
            goal,
            brief,
            platforms,
            language: currentLanguage
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "Campaign creation failed"
      );

    }

    if (result) {

      result.textContent =
        formatAIResult(data);

    }

  } catch (error) {

    if (result) {
      result.textContent =
        error.message;
    }

  }

}


/* =========================================================
   WEBSITE AUDIT
========================================================= */

async function runWebsiteAudit() {

  const input =
    document.getElementById(
      "auditUrl"
    );

  const output =
    document.getElementById(
      "auditResult"
    );

  if (!input || !output) return;

  const url =
    input.value.trim();

  if (!url) {

    output.style.display = "block";

    output.textContent =
      currentLanguage === "de"
        ? "Bitte eine Website-URL eingeben."
        : currentLanguage === "ar"
          ? "يرجى إدخال رابط الموقع."
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

  try {

    const response =
      await fetch(
        `${API_BASE}/audit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url,
            language: currentLanguage
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "Audit failed"
      );

    }

    output.textContent =
      formatAIResult(data);

  } catch (error) {

    output.textContent =
      error.message;

  }

}


/* =========================================================
   PROJECT FORM
========================================================= */

async function submitProject(event) {

  event.preventDefault();

  const form =
    event.currentTarget;

  const payload = {

    name:
      document
        .getElementById("clientName")
        ?.value
        .trim(),

    email:
      document
        .getElementById("clientEmail")
        ?.value
        .trim(),

    service:
      document
        .getElementById("serviceType")
        ?.value,

    message:
      document
        .getElementById("clientMessage")
        ?.value
        .trim(),

    language:
      currentLanguage

  };

  const button =
    form.querySelector(
      "button[type='submit']"
    );

  if (button) {

    button.disabled = true;

    button.classList.add(
      "loading"
    );

  }

  try {

    const response =
      await fetch(
        `${API_BASE}/clients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(
            payload
          )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "Request failed"
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

    renderPipeline(
      data.client
    );

  } catch (error) {

    alert(
      error.message
    );

  } finally {

    if (button) {

      button.disabled = false;

      button.classList.remove(
        "loading"
      );

    }

  }

}


/* =========================================================
   SERVICE SELECT
========================================================= */

function selectService(service) {

  const select =
    document.getElementById(
      "serviceType"
    );

  if (select) {
    select.value = service;
  }

  document
    .getElementById("requests")
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


/* =========================================================
   PIPELINE
========================================================= */

function renderPipeline(client = null) {

  const pipeline =
    document.getElementById(
      "pipelineContainer"
    );

  const execution =
    document.getElementById(
      "executionPipeline"
    );

  if (!pipeline && !execution) {
    return;
  }

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
    Number(
      client?.stage || 1
    );

  if (pipeline) {

    pipeline.innerHTML = "";

    stages.forEach(
      (stage, index) => {

        const number =
          index + 1;

        const item =
          document.createElement(
            "div"
          );

        item.className =
          "request-item" +
          (
            number === currentStage
              ? " active"
              : ""
          );

        const percent =
          Math.round(
            Math.max(
              0,
              Math.min(
                100,
                (
                  (
                    currentStage - 1
                  ) /
                  (
                    stages.length - 1
                  )
                ) * 100
              )
            )
          );

        item.innerHTML = `
          <strong>
            ${String(number).padStart(2, "0")}
            — ${stage}
          </strong>

          <div class="pipeline-progress">
            <span
              style="
                width:${
                  number <= currentStage
                    ? 100
                    : percent
                }%
              "
            ></span>
          </div>
        `;

        pipeline.appendChild(
          item
        );

      }
    );

  }

  if (execution) {

    execution.innerHTML = "";

    stages.forEach(
      (stage, index) => {

        const item =
          document.createElement(
            "div"
          );

        item.className =
          "step";

        item.innerHTML = `
          <div class="step-number">
            ${String(index + 1).padStart(2, "0")}
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

        execution.appendChild(
          item
        );

      }
    );

  }

}


/* =========================================================
   SYSTEM STATUS
========================================================= */

async function refreshSystemStatus() {

  try {

    const response =
      await fetch(
        `${API_BASE}/health`
      );

    if (!response.ok) {
      return;
    }

    const data =
      await response.json();

    if (data.pipeline) {

      renderPipeline({
        stage:
          data.pipeline.currentStage
      });

    }

  } catch (error) {

    console.warn(
      "NEXORA backend not connected:",
      error
    );

  }

}


/* =========================================================
   AI RESULT FORMATTER
========================================================= */

function formatAIResult(data) {

  if (!data) {
    return "";
  }

  if (
    typeof data.result === "string"
  ) {
    return data.result;
  }

  if (
    typeof data.output === "string"
  ) {
    return data.output;
  }

  if (
    data.ai &&
    typeof data.ai === "string"
  ) {
    return data.ai;
  }

  return JSON.stringify(
    data,
    null,
    2
  );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  const toast =
    document.createElement(
      "div"
    );

  toast.textContent =
    message;

  toast.style.position =
    "fixed";

  toast.style.bottom =
    "25px";

  toast.style.left =
    "50%";

  toast.style.transform =
    "translateX(-50%)";

  toast.style.zIndex =
    "99999";

  toast.style.padding =
    "14px 20px";

  toast.style.borderRadius =
    "12px";

  toast.style.background =
    "#0b1728";

  toast.style.color =
    "#fff";

  toast.style.border =
    "1px solid rgba(255,255,255,.15)";

  document.body.appendChild(
    toast
  );

  setTimeout(
    () => {
      toast.remove();
    },
    3000
  );

}


/* =========================================================
   BOOKING
========================================================= */

function bookMeeting() {

  window.location.href =
    "mailto:info@nexoraonline.de?subject=NEXORA%20Digital%20-%20Erstgespräch";

}


/* =========================================================
   LEGAL MODALS
========================================================= */

function openModal(type) {

  const modal =
    document.getElementById(
      type
    );

  if (!modal) return;

  const content =
    modal.querySelector(
      ".modal-box > div:last-child"
    );

  if (!content) return;

  const legal = {

    privacy: {

      de: `
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

      en: `
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

      de: `
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

      en: `
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

      de: `
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

      en: `
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

  content.innerHTML =
    selected;

  modal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";

}


function closeModal(type) {

  const modal =
    document.getElementById(
      type
    );

  if (!modal) return;

  modal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";

}


/* =========================================================
   MODAL EVENTS
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    document
      .querySelectorAll(".modal")
      .forEach(modal => {

        modal.addEventListener(
          "click",
          event => {

            if (
              event.target === modal
            ) {

              modal.classList.remove(
                "active"
              );

              document.body.style.overflow =
                "";

            }

          }
        );

      });

  }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {
      return;
    }

    document
      .querySelectorAll(
        ".modal.active"
      )
      .forEach(modal => {

        modal.classList.remove(
          "active"
        );

      });

    document.body.style.overflow =
      "";

  }
);
