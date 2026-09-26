"use client";

import { useMemo, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";

type Language = {
  code: string;
  label: string;
  native: string;
};

type Translation = {
  nav: string[];
  cta: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroEnd: string;
  heroDescription: string;
  start: string;
  howButton: string;
  panel: string;
  workflow: string;
  howTitle: string;
  howDescription: string;
  teamEyebrow: string;
  teamTitle: string;
  teamDescription: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingDescription: string;
  choose: string;
  popular: string;
  serviceDescription: string;
  agentRole: string;
  openAgent: string;
  close: string;
  chatPlaceholder: string;
  send: string;
  videoPlay: string;
  videoPause: string;
  videoSound: string;
  videoMute: string;
  assistantGreeting: string;
  assistantReply: string;
  footer: string;
};

const languages: Language[] = [
  { code: "de", label: "Deutsch", native: "Deutsch" },
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "fr", label: "French", native: "Français" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ja", label: "Japanese", native: "日本語" },
];

const translations: Record<string, Translation> = {
  de: {
    nav: ["So funktioniert es", "KI-Team", "Leistungen", "Preise"],
    cta: "Jetzt starten",
    eyebrow: "KI + WEB + AUTOMATISIERUNG",
    heroTitle: "Ihr Unternehmen.",
    heroAccent: "Gebaut. Verwaltet. Entwickelt.",
    heroEnd: "Mit KI.",
    heroDescription: "NEXORA DIGITAL verbindet echte KI-Agenten, echte Workflows, echte Tools und professionelle Projektausführung.",
    start: "Mit NEXORA starten",
    howButton: "So funktioniert es",
    panel: "KI-gestützte digitale Transformation",
    workflow: "DER WORKFLOW",
    howTitle: "So funktioniert es",
    howDescription: "Von Ihrer ersten Idee bis zum betreuten Digitalprojekt folgt jede Phase einem klaren Workflow.",
    teamEyebrow: "NEXORA KI-TEAM",
    teamTitle: "Das KI-Team",
    teamDescription: "15 spezialisierte Manager mit klaren Rollen, Berechtigungen und echten Aufgabenstatus.",
    servicesEyebrow: "UNSERE LEISTUNGEN",
    servicesTitle: "Leistungen",
    servicesDescription: "Digitale Produkte, Modernisierung und Automatisierung in einem intelligenten Ausführungssystem.",
    pricingEyebrow: "KLARE PAKETE",
    pricingTitle: "Pakete",
    pricingDescription: "Wählen Sie den Umfang der digitalen Umsetzung, der zu Ihrem Projekt passt.",
    choose: "Paket wählen",
    popular: "BELIEBT",
    serviceDescription: "Umgesetzt über den NEXORA-Workflow und als echter Systemstatus dokumentiert.",
    agentRole: "KI-Manager",
    openAgent: "Dialog öffnen",
    close: "Schließen",
    chatPlaceholder: "Nachricht an das KI-Team …",
    send: "Senden",
    videoPlay: "Video starten",
    videoPause: "Video pausieren",
    videoSound: "Ton einschalten",
    videoMute: "Ton ausschalten",
    assistantGreeting: "Willkommen bei NEXORA. Wie kann ich Ihr Projekt unterstützen?",
    assistantReply: "Danke. Ich habe Ihre Anfrage aufgenommen. Ein NEXORA-KI-Manager kann den nächsten Projektschritt vorbereiten.",
    footer: "© NEXORA DIGITAL 2026. Alle Rechte vorbehalten.",
  },
  en: {
    nav: ["How It Works", "AI Team", "Services", "Pricing"],
    cta: "Get Started",
    eyebrow: "AI + WEB + AUTOMATION",
    heroTitle: "Your Business.",
    heroAccent: "Built. Managed. Grown.",
    heroEnd: "By AI.",
    heroDescription: "NEXORA DIGITAL connects real AI agents, real workflows, real tools and professional project execution.",
    start: "Start with NEXORA",
    howButton: "See how it works",
    panel: "AI-powered digital transformation",
    workflow: "THE WORKFLOW",
    howTitle: "How It Works",
    howDescription: "From your first idea to a managed digital project, every stage follows a clear workflow.",
    teamEyebrow: "NEXORA AI TEAM",
    teamTitle: "The AI Team",
    teamDescription: "15 specialized managers with clear roles, permissions and real task state.",
    servicesEyebrow: "WHAT WE DO",
    servicesTitle: "Services",
    servicesDescription: "Digital products, modernization and automation connected to one intelligent execution system.",
    pricingEyebrow: "SIMPLE PLANS",
    pricingTitle: "Plans",
    pricingDescription: "Choose the level of digital execution that matches your project.",
    choose: "Choose plan",
    popular: "POPULAR",
    serviceDescription: "Executed through the NEXORA workflow and recorded as real system state.",
    agentRole: "AI Manager",
    openAgent: "Open dialogue",
    close: "Close",
    chatPlaceholder: "Message the AI team …",
    send: "Send",
    videoPlay: "Play video",
    videoPause: "Pause video",
    videoSound: "Turn sound on",
    videoMute: "Mute sound",
    assistantGreeting: "Welcome to NEXORA. How can I support your project?",
    assistantReply: "Thank you. Your request has been received. A NEXORA AI manager can prepare the next project step.",
    footer: "© NEXORA DIGITAL 2026. All Rights Reserved.",
  },
  ar: {
    nav: ["كيف تعمل المنصة", "فريق الذكاء الاصطناعي", "الخدمات", "الأسعار"],
    cta: "ابدأ الآن",
    eyebrow: "ذكاء اصطناعي + ويب + أتمتة",
    heroTitle: "عملك.",
    heroAccent: "نبنيه. نديره. ونطوره.",
    heroEnd: "بالذكاء الاصطناعي.",
    heroDescription: "NEXORA DIGITAL تربط وكلاء ذكاء اصطناعي حقيقيين وسير عمل وأدوات وتنفيذًا احترافيًا للمشاريع.",
    start: "ابدأ مع NEXORA",
    howButton: "شاهد كيف تعمل",
    panel: "تحول رقمي مدعوم بالذكاء الاصطناعي",
    workflow: "سير العمل",
    howTitle: "كيف تعمل المنصة",
    howDescription: "من الفكرة الأولى حتى المشروع الرقمي المُدار، تمر كل مرحلة عبر سير عمل واضح.",
    teamEyebrow: "فريق NEXORA للذكاء الاصطناعي",
    teamTitle: "فريق الذكاء الاصطناعي",
    teamDescription: "15 مديرًا متخصصًا بأدوار وصلاحيات وحالات مهام واضحة.",
    servicesEyebrow: "ماذا نقدم",
    servicesTitle: "الخدمات",
    servicesDescription: "منتجات رقمية وتحديث وأتمتة مرتبطة بنظام تنفيذ ذكي واحد.",
    pricingEyebrow: "الباقات",
    pricingTitle: "الباقات",
    pricingDescription: "اختر مستوى التنفيذ الرقمي المناسب لمشروعك.",
    choose: "اختر الباقة",
    popular: "الأكثر طلبًا",
    serviceDescription: "يتم التنفيذ عبر سير عمل NEXORA وتسجيل حالة المشروع داخل النظام.",
    agentRole: "مدير ذكاء اصطناعي",
    openAgent: "فتح الحوار",
    close: "إغلاق",
    chatPlaceholder: "اكتب رسالتك لفريق الذكاء الاصطناعي …",
    send: "إرسال",
    videoPlay: "تشغيل الفيديو",
    videoPause: "إيقاف الفيديو",
    videoSound: "تشغيل الصوت",
    videoMute: "كتم الصوت",
    assistantGreeting: "مرحبًا بك في NEXORA. كيف يمكنني مساعدتك في مشروعك؟",
    assistantReply: "شكرًا. تم استلام طلبك. يمكن لمدير ذكاء اصطناعي من NEXORA تجهيز الخطوة التالية للمشروع.",
    footer: "© NEXORA DIGITAL 2026. جميع الحقوق محفوظة.",
  },
  fr: { ...({} as Translation), nav: ["Fonctionnement", "Équipe IA", "Services", "Tarifs"] },
  es: { ...({} as Translation), nav: ["Cómo funciona", "Equipo IA", "Servicios", "Precios"] },
  it: { ...({} as Translation), nav: ["Come funziona", "Team IA", "Servizi", "Prezzi"] },
  nl: { ...({} as Translation), nav: ["Hoe het werkt", "AI-team", "Diensten", "Prijzen"] },
  pl: { ...({} as Translation), nav: ["Jak to działa", "Zespół AI", "Usługi", "Cennik"] },
  tr: { ...({} as Translation), nav: ["Nasıl çalışır", "Yapay zekâ ekibi", "Hizmetler", "Fiyatlar"] },
  pt: { ...({} as Translation), nav: ["Como funciona", "Equipe de IA", "Serviços", "Preços"] },
  ru: { ...({} as Translation), nav: ["Как это работает", "Команда ИИ", "Услуги", "Цены"] },
  zh: { ...({} as Translation), nav: ["工作方式", "AI 团队", "服务", "价格"] },
  ja: { ...({} as Translation), nav: ["仕組み", "AIチーム", "サービス", "料金"] },
};

const baseTranslation = translations.en;
Object.keys(translations).forEach((code) => {
  translations[code] = { ...baseTranslation, ...translations[code] };
});

const agents = ["Alex", "Nora", "Leo", "Mia", "Lina", "Aria", "Eli", "Zoe", "Max", "Kai", "Iris", "Adam", "Ryan", "Luna", "Atlas"];
const services = ["Websites & modernization", "AI integration & automation", "SEO, analytics & marketing"];
const steps = ["Describe your business", "Confirm payment", "Alex creates the plan", "Agents execute and report"];
const plans = [
  ["Starter", "€99/month"],
  ["Business", "€299/month"],
  ["Growth", "€699/month"],
  ["Enterprise", "Custom"],
];
const HERO_VIDEO_SRC = "https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsvideonexora-hero.mp4";

export function HomeClient() {
  const [language, setLanguage] = useState("de");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const t = useMemo(() => translations[language] ?? translations.de, [language]);

  function submitMessage() {
    const clean = message.trim();
    if (!clean) return;
    setMessages((current) => [...current, `You: ${clean}`, `NEXORA: ${t.assistantReply}`]);
    setMessage("");
  }

  function openAgent(agent: string) {
    setActiveAgent(agent);
    setMessages([`NEXORA: ${t.assistantGreeting}`]);
  }

  return (
    <main className="site-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="site-header">
        <div className="site-header-inner">
          <BrandLogo width={165} />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#how">{t.nav[0]}</a>
            <a href="#team">{t.nav[1]}</a>
            <a href="#services">{t.nav[2]}</a>
            <a href="#pricing">{t.nav[3]}</a>
          </nav>
          <div className="header-actions">
            <label className="language-picker">
              <span aria-hidden="true">🌐</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
                {languages.map((item) => <option value={item.code} key={item.code}>{item.native}</option>)}
              </select>
            </label>
            <a className="header-cta" href="#pricing">{t.cta}</a>
          </div>
        </div>
      </header>

      <section className="hero" aria-label="NEXORA DIGITAL hero">
        <video id="nexora-hero-video" className="hero-media" autoPlay={videoPlaying} muted={videoMuted} loop playsInline preload="metadata">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}<br /><span className="gradient-text">{t.heroAccent}</span><br />{t.heroEnd}</h1>
            <p className="hero-description">{t.heroDescription}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#pricing">{t.start}</a>
              <a className="secondary-button" href="#how">{t.howButton}</a>
            </div>
          </div>
          <div className="hero-panel">
            <BrandLogo width={260} linkToHome={false} />
            <p>{t.panel}</p>
            <div className="video-controls" aria-label="Video controls">
              <button type="button" onClick={() => setVideoPlaying((value) => !value)}>{videoPlaying ? `⏸ ${t.videoPause}` : `▶ ${t.videoPlay}`}</button>
              <button type="button" onClick={() => setVideoMuted((value) => !value)}>{videoMuted ? `🔊 ${t.videoSound}` : `🔇 ${t.videoMute}`}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{t.workflow}</p>
            <h2>{t.howTitle}</h2>
            <p>{t.howDescription}</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => <article className="card step-card" key={step}><span className="step-number">0{index + 1}</span><h3>{step}</h3></article>)}
          </div>
        </div>
      </section>

      <section id="team" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">{t.teamEyebrow}</p>
            <h2>{t.teamTitle}</h2>
            <p>{t.teamDescription}</p>
          </div>
          <div className="team-grid">
            {agents.map((agent) => (
              <article className="card team-card" key={agent}>
                <div className="agent-avatar">{agent.charAt(0)}</div>
                <div className="agent-info"><strong>{agent}</strong><span>{t.agentRole}</span></div>
                <button className="agent-button" type="button" onClick={() => openAgent(agent)}>{t.openAgent}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">{t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2><p>{t.servicesDescription}</p></div>
          <div className="services-grid">
            {services.map((service, index) => <article className="card service-card" key={service}><span className="service-icon">0{index + 1}</span><h3>{service}</h3><p>{t.serviceDescription}</p><button className="text-action" type="button" onClick={() => openAgent(agents[index])}>{t.openAgent} →</button></article>)}
          </div>
        </div>
      </section>

      <section id="pricing" className="section section-alt">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">{t.pricingEyebrow}</p><h2>{t.pricingTitle}</h2><p>{t.pricingDescription}</p></div>
          <div className="pricing-grid">
            {plans.map(([name, price], index) => <article className={`card pricing-card ${index === 1 ? "featured" : ""}`} key={name}>{index === 1 && <span className="featured-label">{t.popular}</span>}<h3>{name}</h3><div className="price">{price}</div><button className="plan-button" type="button" onClick={() => openAgent("Alex")}>{t.choose}</button></article>)}
          </div>
        </div>
      </section>

      <footer className="site-footer"><div className="container footer-inner"><BrandLogo width={150} /><p>{t.footer}</p></div></footer>

      {activeAgent && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setActiveAgent(null); }}>
          <section className="ai-dialog" role="dialog" aria-modal="true" aria-labelledby="ai-dialog-title">
            <div className="ai-dialog-head"><div><span className="eyebrow">NEXORA AI</span><h2 id="ai-dialog-title">{activeAgent}</h2></div><button className="dialog-close" type="button" onClick={() => setActiveAgent(null)} aria-label={t.close}>×</button></div>
            <div className="chat-window">{messages.map((item, index) => <p className={item.startsWith("You:") ? "chat-user" : "chat-agent"} key={`${item}-${index}`}>{item}</p>)}</div>
            <div className="chat-form"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submitMessage(); }} placeholder={t.chatPlaceholder} aria-label={t.chatPlaceholder} /><button type="button" onClick={submitMessage}>{t.send}</button></div>
          </section>
        </div>
      )}
    </main>
  );
}
