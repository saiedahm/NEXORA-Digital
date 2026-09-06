 let currentLanguage = "de";

let requests = [];

let stats = {
  leads: 0,
  analyzed: 0,
  requests: 0,
  projects: 0
};


/* =========================
   LANGUAGES
========================= */

const languageNames = {
  de: "🇩🇪 DE",
  en: "🇬🇧 EN",
  ar: "🇸🇦 AR",
  fr: "🇫🇷 FR",
  es: "🇪🇸 ES",
  it: "🇮🇹 IT",
  nl: "🇳🇱 NL",
  pl: "🇵🇱 PL",
  tr: "🇹🇷 TR",
  pt: "🇵🇹 PT",
  ru: "🇷🇺 RU",
  uk: "🇺🇦 UK",
  zh: "🇨🇳 ZH",
  ja: "🇯🇵 JA",
  ko: "🇰🇷 KO",
  hi: "🇮🇳 HI",
  sv: "🇸🇪 SV",
  da: "🇩🇰 DA",
  no: "🇳🇴 NO",
  fi: "🇫🇮 FI"
};


/* =========================
   TRANSLATIONS
========================= */

const translations = {

  de: {

    nav_design: "Design",
    nav_requirements: "Anforderungen",
    nav_execution: "Umsetzung",
    nav_booking: "Termin",
    nav_showcase: "Projekte",
    nav_requests: "Anfragen",
    nav_about: "Über uns",
    nav_contact: "Kontakt",

    hero_tag: "KI-GESTÜTZTE DIGITALE AGENTUR",
    hero_title_1: "Wir gestalten",
    hero_title_2: "die digitale Zukunft.",

    hero_text:
      "NEXORA Digital entwickelt moderne Websites, intelligente KI-Lösungen und digitale Systeme für Unternehmen.",

    hero_check: "Website kostenlos prüfen",
    hero_project: "Projekt starten",

    stat_ai: "Intelligente Automatisierung",
    stat_online: "Digital verfügbar",
    stat_web: "Modern & Responsive",
    stat_growth: "Bereit für Wachstum",

    design_title:
      "Digitale Erlebnisse für die nächste Generation.",

    design_text:
      "Wir verbinden modernes Design, Technologie und künstliche Intelligenz.",

    service_1_title: "Neue Website",
    service_1_text:
      "Moderne und responsive Websites für Unternehmen.",

    service_2_title: "Website Modernisierung",
    service_2_text:
      "Bestehende Websites werden modernisiert und optimiert.",

    service_3_title: "KI Integration",
    service_3_text:
      "Intelligente KI-Lösungen und digitale Automatisierung.",

    requirements_title:
      "Ihre Anforderungen werden zum digitalen Plan.",

    requirements_text:
      "Analyse, Strategie und klare Ziele bilden die Grundlage jedes Projekts.",

    step_1_title: "Analyse",
    step_1_text: "Wir verstehen Ihr Unternehmen.",

    step_2_title: "Konzept",
    step_2_text: "Strategie und Anforderungen.",

    step_3_title: "Design",
    step_3_text: "Modernes digitales Konzept.",

    step_4_title: "Freigabe",
    step_4_text: "Der Kunde bestätigt das Konzept.",

    step_5_title: "Start",
    step_5_text: "Die Umsetzung beginnt.",

    ai_title:
      "Ihr intelligenter AI Manager.",

    ai_text:
      "Die Kommandozentrale für Leads, Website-Analysen und Projekte.",

    ai_run: "Command ausführen",

    request_title:
      "Starten wir Ihr Projekt.",

    request_text:
      "Senden Sie uns Ihre Anfrage.",

    form_title:
      "Projekt anfragen",

    form_send:
      "Anfrage senden",

    current_requests:
      "Aktuelle Anfragen",

    no_requests:
      "Noch keine Anfragen",

    about_title:
      "Wir verbinden Unternehmen mit der digitalen Zukunft.",

    about_heading:
      "Über NEXORA Digital",

    about_text:
      "NEXORA Digital ist eine moderne Plattform für Websites, künstliche Intelligenz und digitale Transformation.",

    value_1: "Innovation",
    value_2: "Intelligenz",
    value_3: "Wachstum",

    booking_title:
      "Buchen Sie ein kostenloses Erstgespräch.",

    booking_text:
      "Lassen Sie uns über Ihre digitale Zukunft sprechen.",

    booking_button:
      "Termin buchen",

    contact_title:
      "Gemeinsam gestalten wir die Zukunft.",

    footer_company:
      "NEXORA DIGITAL",

    footer_legal:
      "RECHTLICHES",

    privacy:
      "Datenschutzerklärung"
  },


  en: {

    nav_design: "Design",
    nav_requirements: "Requirements",
    nav_execution: "Execution",
    nav_booking: "Booking",
    nav_showcase: "Showcase",
    nav_requests: "Client Requests",
    nav_about: "About Us",
    nav_contact: "Contact",

    hero_tag: "AI-POWERED DIGITAL AGENCY",
    hero_title_1: "We build",
    hero_title_2: "the digital future.",

    hero_text:
      "NEXORA Digital creates modern websites, intelligent AI solutions and digital systems for companies.",

    hero_check: "Check Your Website",
    hero_project: "Start a Project",

    stat_ai: "Intelligent Automation",
    stat_online: "Always Available",
    stat_web: "Modern & Responsive",
    stat_growth: "Built for Growth",

    design_title:
      "Digital experiences for the next generation.",

    design_text:
      "We combine modern design, technology and artificial intelligence.",

    service_1_title: "New Website",
    service_1_text:
      "Modern and responsive websites for companies.",

    service_2_title: "Website Modernization",
    service_2_text:
      "Existing websites are modernized and optimized.",

    service_3_title: "AI Integration",
    service_3_text:
      "Intelligent AI solutions and digital automation.",

    requirements_title:
      "Your requirements become a digital plan.",

    requirements_text:
      "Analysis, strategy and clear goals form the foundation of every project.",

    step_1_title: "Analysis",
    step_1_text: "We understand your business.",

    step_2_title: "Concept",
    step_2_text: "Strategy and requirements.",

    step_3_title: "Design",
    step_3_text: "Modern digital concept.",

    step_4_title: "Approval",
    step_4_text: "The client approves the concept.",

    step_5_title: "Start",
    step_5_text: "Development begins.",

    ai_title:
      "Your intelligent AI Manager.",

    ai_text:
      "The command center for leads, website analysis and projects.",

    ai_run:
      "Run Command",

    request_title:
      "Let's start your project.",

    request_text:
      "Send us your request.",

    form_title:
      "Request a Project",

    form_send:
      "Send Request",

    current_requests:
      "Current Requests",

    no_requests:
      "No requests yet",

    about_title:
      "We connect businesses with the digital future.",

    about_heading:
      "About NEXORA Digital",

    about_text:
      "NEXORA Digital is a modern platform for websites, artificial intelligence and digital transformation.",

    value_1: "Innovation",
    value_2: "Intelligence",
    value_3: "Growth",

    booking_title:
      "Book a free initial consultation.",

    booking_text:
      "Let's talk about your digital future.",

    booking_button:
      "Book Appointment",

    contact_title:
      "Let's build the future.",

    footer_company:
      "NEXORA DIGITAL",

    footer_legal:
      "LEGAL",

    privacy:
      "Privacy Policy"
  },


  ar: {

    nav_design: "التصميم",
    nav_requirements: "المتطلبات",
    nav_execution: "التنفيذ",
    nav_booking: "الحجز",
    nav_showcase: "المشاريع",
    nav_requests: "طلبات العملاء",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",

    hero_tag: "وكالة رقمية مدعومة بالذكاء الاصطناعي",
    hero_title_1: "نحن نصنع",
    hero_title_2: "المستقبل الرقمي.",

    hero_text:
      "تقوم NEXORA Digital بتطوير مواقع حديثة وحلول ذكاء اصطناعي وأنظمة رقمية للشركات.",

    hero_check: "فحص الموقع مجاناً",
    hero_project: "ابدأ مشروعك",

    stat_ai: "أتمتة ذكية",
    stat_online: "متاح رقمياً",
    stat_web: "حديث ومتجاوب",
    stat_growth: "جاهز للنمو",

    design_title:
      "تجارب رقمية للجيل القادم.",

    design_text:
      "نجمع بين التصميم الحديث والتكنولوجيا والذكاء الاصطناعي.",

    service_1_title: "موقع جديد",
    service_1_text:
      "مواقع حديثة وسريعة ومتجاوبة.",

    service_2_title: "تحديث الموقع",
    service_2_text:
      "تطوير وتحديث المواقع القديمة.",

    service_3_title: "دمج الذكاء الاصطناعي",
    service_3_text:
      "حلول ذكية وأتمتة رقمية.",

    requirements_title:
      "متطلباتك تتحول إلى خطة رقمية.",

    requirements_text:
      "التحليل والاستراتيجية والأهداف الواضحة هي أساس المشروع.",

    step_1_title: "تحليل",
    step_1_text: "نفهم شركتك واحتياجاتك.",

    step_2_title: "المفهوم",
    step_2_text: "الاستراتيجية والمتطلبات.",

    step_3_title: "التصميم",
    step_3_text: "تصميم رقمي حديث.",

    step_4_title: "الموافقة",
    step_4_text: "العميل يوافق على التصميم.",

    step_5_title: "البدء",
    step_5_text: "يبدأ التنفيذ.",

    ai_title:
      "مدير الذكاء الاصطناعي الذكي.",

    ai_text:
      "مركز التحكم للعملاء والتحليل والمشاريع.",

    ai_run:
      "تنفيذ الأمر",

    request_title:
      "لنبدأ مشروعك.",

    request_text:
      "أرسل لنا طلبك.",

    form_title:
      "طلب مشروع",

    form_send:
      "إرسال الطلب",

    current_requests:
      "الطلبات الحالية",

    no_requests:
      "لا توجد طلبات حتى الآن",

    about_title:
      "نربط الشركات بالمستقبل الرقمي.",

    about_heading:
      "عن NEXORA Digital",

    about_text:
      "NEXORA Digital منصة حديثة للمواقع والذكاء الاصطناعي والتحول الرقمي.",

    value_1: "الابتكار",
    value_2: "الذكاء",
    value_3: "النمو",

    booking_title:
      "احجز استشارة أولية مجانية.",

    booking_text:
      "دعنا نتحدث عن مستقبلك الرقمي.",

    booking_button:
      "احجز موعداً",

    contact_title:
      "لنصنع المستقبل معاً.",

    footer_company:
      "نيكسورا ديجيتال",

    footer_legal:
      "المعلومات القانونية",

    privacy:
      "سياسة الخصوصية"
  }

};


/* =========================
   LANGUAGE MENU
========================= */

function toggleLanguageMenu() {

  document
    .getElementById("languageMenu")
    .classList
    .toggle("active");

}


/* =========================
   SET LANGUAGE
========================= */

function setLanguage(lang) {

  if (!translations[lang]) {

    /* اللغات التي لم نكتب ترجمتها الكاملة بعد
       تستخدم الإنجليزية مؤقتاً */

    lang = "en";

  }

  currentLanguage = lang;

  const dictionary =
    translations[currentLanguage];


  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.getAttribute("data-i18n");

      if (dictionary[key]) {

        element.textContent =
          dictionary[key];

      }

    });


  document.documentElement.lang =
    currentLanguage;


  if (currentLanguage === "ar") {

    document.body.dir = "rtl";

  } else {

    document.body.dir = "ltr";

  }


  document
    .getElementById("languageButton")
    .textContent =
    languageNames[currentLanguage] ||
    languageNames.en;


  document
    .getElementById("languageMenu")
    .classList
    .remove("active");


  updateLegalContent();

}


/* =========================
   PRIVACY
========================= */

function getPrivacyContent() {

  if (currentLanguage === "de") {

    return `
      <h2>Datenschutzerklärung</h2>

      <h3>1. Datenschutz auf einen Blick</h3>

      <p>
      Der Schutz Ihrer persönlichen Daten ist uns wichtig.
      Diese Datenschutzerklärung informiert über die Verarbeitung
      personenbezogener Daten bei der Nutzung der Plattform
      NEXORA Digital.
      </p>

      <h3>2. Verantwortlicher</h3>

      <p>
      Akhmed Ismail Saied<br>
      Ehndorfer Str. 130<br>
      24537 Neumünster<br>
      Deutschland
      </p>

      <p>
      E-Mail: contact@nexoraonline.de
      </p>

      <h3>3. Verarbeitung personenbezogener Daten</h3>

      <p>
      Personenbezogene Daten werden verarbeitet,
      soweit dies zur Bearbeitung von Anfragen,
      zur Kommunikation, zur Durchführung von Projekten
      und zur Bereitstellung der digitalen Dienste erforderlich ist.
      </p>

      <h3>4. KI-gestützte Dienste</h3>

      <p>
      NEXORA Digital kann KI-gestützte Technologien
      zur Analyse, Automatisierung und Unterstützung
      digitaler Prozesse einsetzen.
      </p>

      <h3>5. Ihre Rechte</h3>

      <p>
      Sie haben grundsätzlich das Recht auf Auskunft,
      Berichtigung, Löschung, Einschränkung der Verarbeitung
      und Widerspruch im Rahmen der geltenden gesetzlichen Vorschriften.
      </p>
    `;

  }


  return `
    <h2>Privacy Policy</h2>

    <h3>1. Overview</h3>

    <p>
    The protection of your personal data is important to us.
    This Privacy Policy explains how personal data is processed
    when using the NEXORA Digital platform.
    </p>

    <h3>2. Data Controller</h3>

    <p>
    Akhmed Ismail Saied<br>
    Ehndorfer Str. 130<br>
    24537 Neumünster<br>
    Germany
    </p>

    <p>
    Email: contact@nexoraonline.de
    </p>

    <h3>3. Personal Data Processing</h3>

    <p>
    Personal data may be processed where necessary
    to respond to requests, communicate with clients,
    manage projects and provide digital services.
    </p>

    <h3>4. AI-Powered Services</h3>

    <p>
    NEXORA Digital may use AI-powered technologies
    for analysis, automation and support of digital processes.
    </p>

    <h3>5. Your Rights</h3>

    <p>
    Depending on applicable law, you may have rights
    regarding access, correction, deletion and restriction
    of the processing of your personal data.
    </p>
  `;

}


/* =========================
   IMPRESSUM
========================= */

function getImpressumContent() {

  if (currentLanguage === "de") {

    return `
      <h2>Impressum</h2>

      <h3>
      Angaben gemäß § 5 Digital-Dienste-Gesetz (DDG)
      </h3>

      <p>
      <strong>
      Diensteanbieter & Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV:
      </strong>
      <br><br>
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

      <h3>Gewerbliche Angaben & Status der Plattform</h3>

      <p>
      Die Plattform NEXORA Digital befindet sich derzeit
      in der Entwicklungs- und Testphase.
      </p>

      <p>
      Eventuelle Zahlungstransaktionen werden im Testbetrieb
      ausschließlich zu Testzwecken durchgeführt.
      </p>

      <h3>Haftung für Inhalte</h3>

      <p>
      Als Diensteanbieter sind wir gemäß den allgemeinen
      gesetzlichen Vorschriften für eigene Inhalte verantwortlich.
      </p>

      <h3>Haftung für Links</h3>

      <p>
      Für Inhalte externer Websites sind die jeweiligen
      Betreiber verantwortlich.
      </p>

      <h3>Urheberrecht</h3>

      <p>
      Die durch die Seitenbetreiber erstellten Inhalte
      unterliegen dem deutschen Urheberrecht.
      </p>
    `;

  }


  return `
    <h2>Legal Notice (Impressum)</h2>

    <h3>
    Information pursuant to § 5 Digital Services Act (DDG)
    </h3>

    <p>
    <strong>
    Service Provider & Content Responsible Person
    pursuant to § 18 Para. 2 MStV:
    </strong>
    <br><br>

    Akhmed Ismail Saied<br>
    Ehndorfer Str. 130<br>
    24537 Neumünster<br>
    Germany
    </p>

    <h3>Contact</h3>

    <p>
    Website: www.nexoraonline.de<br>
    General Email: info@nexoraonline.de<br>
    Support / Privacy Email: contact@nexoraonline.de
    </p>

    <h3>Commercial Details & Platform Status</h3>

    <p>
    NEXORA Digital is currently in the development
    and testing phase.
    </p>

    <p>
    Any payment transactions during test mode
    are conducted exclusively for testing purposes.
    </p>

    <h3>Liability for Content</h3>

    <p>
    As a service provider, we are responsible
    for our own content in accordance with applicable law.
    </p>

    <h3>Liability for Links</h3>

    <p>
    External websites are the responsibility
    of their respective operators.
    </p>

    <h3>Copyright</h3>

    <p>
    Content created by the website operators
    is subject to German copyright law.
    </p>
  `;

}


/* =========================
   UPDATE LEGAL CONTENT
========================= */

function updateLegalContent() {

  document
    .getElementById("privacyContent")
    .innerHTML =
    getPrivacyContent();


  document
    .getElementById("impressumContent")
    .innerHTML =
    getImpressumContent();

}


/* =========================
   MODALS
========================= */

function openModal(id) {

  updateLegalContent();

  document
    .getElementById(id)
    .classList
    .add("active");

}


function closeModal(id) {

  document
    .getElementById(id)
    .classList
    .remove("active");

}


/* =========================
   AI COMMAND DEMO
========================= */

function runAICommand() {

  const command =
    document
    .getElementById("aiCommand")
    .value
    .trim();


  if (!command) {

    alert(
      currentLanguage === "de"
      ? "Bitte geben Sie einen Command ein."
      : "Please enter a command."
    );

    return;

  }


  const response =
    document
    .getElementById("aiResponse");


  response.style.display = "block";


  response.innerHTML = `
    <strong>NEXORA AI MANAGER</strong>
    <br><br>
    ${escapeHtml(command)}
    <br><br>
    ✓ Command analyzed
    <br>
    ✓ Workflow prepared
    <br>
    ✓ Ready for AI Agent pipeline
  `;


  stats.leads += 1;

  updateDashboard();

}


/* =========================
   CLIENT REQUEST
========================= */

document
.getElementById("projectForm")
.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const name =
      document
      .getElementById("clientName")
      .value;


    const email =
      document
      .getElementById("clientEmail")
      .value;


    const service =
      document
      .getElementById("serviceType")
      .value;


    requests.unshift({
      name,
      email,
      service
    });


    stats.requests++;


    updateRequests();

    updateDashboard();

    this.reset();


    alert(
      currentLanguage === "de"
      ? "Vielen Dank! Ihre Anfrage wurde gespeichert."
      : "Thank you! Your request has been saved."
    );

  }
);


/* =========================
   UPDATE REQUESTS
========================= */

function updateRequests() {

  const container =
    document
    .getElementById("requestsContainer");


  if (!requests.length) {

    return;

  }


  container.innerHTML =
    requests.map(request => `

      <div class="request-item">

        <strong>
          ${escapeHtml(request.name)}
        </strong>

        <br>

        <span>
          ${escapeHtml(request.email)}
        </span>

        <br><br>

        <span>
          ${escapeHtml(request.service)}
        </span>

      </div>

    `).join("");

}


/* =========================
   BOOKING
========================= */

function bookMeeting() {

  const message =
    currentLanguage === "de"
    ? "Vielen Dank. Bitte kontaktieren Sie uns unter info@nexoraonline.de"
    : "Thank you. Please contact us at info@nexoraonline.de";


  alert(message);

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

  document
    .getElementById("leadCount")
    .textContent =
    stats.leads;


  document
    .getElementById("analysisCount")
    .textContent =
    stats.analyzed;


  document
    .getElementById("requestCount")
    .textContent =
    stats.requests;


  document
    .getElementById("projectCount")
    .textContent =
    stats.projects;

}


/* =========================
   SECURITY
========================= */

function escapeHtml(text) {

  return String(text).replace(
    /[&<>"']/g,
    character => {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];

    }
  );

}


/* =========================
   CLOSE LANGUAGE MENU
========================= */

document.addEventListener(
  "click",
  function(event) {

    const wrapper =
      document.querySelector(".language-wrapper");


    if (!wrapper.contains(event.target)) {

      document
        .getElementById("languageMenu")
        .classList
        .remove("active");

    }

  }
);


/* =========================
   START
========================= */

document
.getElementById("year")
.textContent =
new Date().getFullYear();


updateDashboard();

setLanguage("de");
