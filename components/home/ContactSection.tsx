"use client";

import { FormEvent, useEffect, useState } from "react";

type ContactCopy = {
  contact: string; eyebrow: string; title: string; intro: string; subject: string; subjectPlaceholder: string;
  message: string; messagePlaceholder: string; email: string; send: string; sending: string; success: string; error: string;
  legal: string; privacy: string; terms: string; imprint: string; copyright: string;
};

const copy: Record<string, ContactCopy> = {
  de: { contact: "Kontakt", eyebrow: "NEXORA DIGITAL", title: "Kontaktieren Sie uns", intro: "Senden Sie Ihre Nachricht an unser Team. Wir prüfen Ihre Anfrage und melden uns bei Ihnen.", subject: "Betreff", subjectPlaceholder: "Betreff eingeben", message: "Nachricht", messagePlaceholder: "Schreiben Sie Ihre Nachricht hier (max. 500 Zeichen)", email: "Ihre E-Mail-Adresse", send: "Nachricht senden", sending: "Wird gesendet…", success: "Ihre Nachricht wurde erfolgreich an unser Team gesendet.", error: "Die Nachricht konnte momentan nicht gesendet werden. Bitte versuchen Sie es erneut.", legal: "Rechtliche Informationen", privacy: "Datenschutz", terms: "Nutzungsbedingungen (AGB)", imprint: "Impressum", copyright: "© NEXORA DIGITAL 2026. Alle Rechte vorbehalten." },
  en: { contact: "Contact Us", eyebrow: "NEXORA DIGITAL", title: "Contact Us", intro: "Send your message to our team. We will review your request and get back to you.", subject: "Subject", subjectPlaceholder: "Enter subject", message: "Message", messagePlaceholder: "Write your message here (max. 500 characters)", email: "Your email address", send: "Send message", sending: "Sending…", success: "Your message was sent successfully.", error: "The message could not be sent right now. Please try again.", legal: "Legal information", privacy: "Privacy Policy", terms: "Terms & Conditions", imprint: "Imprint", copyright: "© NEXORA DIGITAL 2026. All Rights Reserved." },
  ar: { contact: "اتصل بنا", eyebrow: "NEXORA DIGITAL", title: "اتصل بنا", intro: "أرسل رسالتك إلى فريقنا وسنراجع طلبك ونتواصل معك.", subject: "عنوان الرسالة", subjectPlaceholder: "اكتب عنوان الرسالة", message: "الرسالة", messagePlaceholder: "اكتب رسالتك هنا (حد أقصى 500 حرف)", email: "إيميل صاحب الرسالة", send: "إرسال الرسالة", sending: "جاري الإرسال…", success: "تم إرسال رسالتك بنجاح.", error: "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى.", legal: "المعلومات القانونية", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", imprint: "بيانات الشركة", copyright: "© NEXORA DIGITAL 2026. جميع الحقوق محفوظة." },
  fr: { contact: "Contact", eyebrow: "NEXORA DIGITAL", title: "Contactez-nous", intro: "Envoyez votre message à notre équipe. Nous examinerons votre demande et vous répondrons.", subject: "Objet", subjectPlaceholder: "Saisissez l’objet", message: "Message", messagePlaceholder: "Écrivez votre message ici (500 caractères max.)", email: "Votre adresse e-mail", send: "Envoyer", sending: "Envoi…", success: "Votre message a été envoyé.", error: "Impossible d’envoyer le message. Réessayez.", legal: "Informations légales", privacy: "Confidentialité", terms: "Conditions d’utilisation", imprint: "Mentions légales", copyright: "© NEXORA DIGITAL 2026. Tous droits réservés." },
  es: { contact: "Contacto", eyebrow: "NEXORA DIGITAL", title: "Contáctenos", intro: "Envíe su mensaje a nuestro equipo. Revisaremos su solicitud y responderemos.", subject: "Asunto", subjectPlaceholder: "Escriba el asunto", message: "Mensaje", messagePlaceholder: "Escriba su mensaje aquí (máx. 500 caracteres)", email: "Su correo electrónico", send: "Enviar mensaje", sending: "Enviando…", success: "Su mensaje se ha enviado correctamente.", error: "No se pudo enviar el mensaje. Inténtelo de nuevo.", legal: "Información legal", privacy: "Privacidad", terms: "Términos y condiciones", imprint: "Aviso legal", copyright: "© NEXORA DIGITAL 2026. Todos los derechos reservados." },
  it: { contact: "Contatti", eyebrow: "NEXORA DIGITAL", title: "Contattaci", intro: "Invia il tuo messaggio al nostro team. Esamineremo la richiesta e ti ricontatteremo.", subject: "Oggetto", subjectPlaceholder: "Inserisci l'oggetto", message: "Messaggio", messagePlaceholder: "Scrivi qui il tuo messaggio (max. 500 caratteri)", email: "La tua e-mail", send: "Invia messaggio", sending: "Invio…", success: "Messaggio inviato con successo.", error: "Impossibile inviare il messaggio. Riprova.", legal: "Informazioni legali", privacy: "Privacy", terms: "Termini e condizioni", imprint: "Note legali", copyright: "© NEXORA DIGITAL 2026. Tutti i diritti riservati." },
  nl: { contact: "Contact", eyebrow: "NEXORA DIGITAL", title: "Neem contact op", intro: "Stuur uw bericht naar ons team. We bekijken uw aanvraag en nemen contact met u op.", subject: "Onderwerp", subjectPlaceholder: "Voer onderwerp in", message: "Bericht", messagePlaceholder: "Schrijf hier uw bericht (max. 500 tekens)", email: "Uw e-mailadres", send: "Bericht verzenden", sending: "Verzenden…", success: "Uw bericht is verzonden.", error: "Het bericht kon niet worden verzonden. Probeer het opnieuw.", legal: "Juridische informatie", privacy: "Privacy", terms: "Voorwaarden", imprint: "Colofon", copyright: "© NEXORA DIGITAL 2026. Alle rechten voorbehouden." },
  pl: { contact: "Kontakt", eyebrow: "NEXORA DIGITAL", title: "Skontaktuj się z nami", intro: "Wyślij wiadomość do naszego zespołu. Sprawdzimy Twoją prośbę i odpowiemy.", subject: "Temat", subjectPlaceholder: "Wpisz temat", message: "Wiadomość", messagePlaceholder: "Napisz wiadomość (maks. 500 znaków)", email: "Twój e-mail", send: "Wyślij wiadomość", sending: "Wysyłanie…", success: "Wiadomość została wysłana.", error: "Nie można teraz wysłać wiadomości. Spróbuj ponownie.", legal: "Informacje prawne", privacy: "Prywatność", terms: "Warunki", imprint: "Nota prawna", copyright: "© NEXORA DIGITAL 2026. Wszelkie prawa zastrzeżone." },
  tr: { contact: "İletişim", eyebrow: "NEXORA DIGITAL", title: "Bize Ulaşın", intro: "Mesajınızı ekibimize gönderin. Talebinizi inceleyip size dönüş yapacağız.", subject: "Konu", subjectPlaceholder: "Konuyu yazın", message: "Mesaj", messagePlaceholder: "Mesajınızı buraya yazın (maks. 500 karakter)", email: "E-posta adresiniz", send: "Mesaj gönder", sending: "Gönderiliyor…", success: "Mesajınız başarıyla gönderildi.", error: "Mesaj gönderilemedi. Lütfen tekrar deneyin.", legal: "Yasal bilgiler", privacy: "Gizlilik", terms: "Kullanım şartları", imprint: "Künye", copyright: "© NEXORA DIGITAL 2026. Tüm hakları saklıdır." },
};

const fallback = copy.en;

export function ContactSection() {
  const [language, setLanguage] = useState("de");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const sync = () => setLanguage(localStorage.getItem("nexora-language") || "de");
    sync();
    window.addEventListener("nexora-language-change", sync);
    return () => window.removeEventListener("nexora-language-change", sync);
  }, []);

  const t = copy[language] ?? fallback;
  const rtl = language === "ar";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.length > 500) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subject, message, email }) });
      if (!response.ok) throw new Error("Contact request failed");
      setSubject(""); setMessage(""); setEmail(""); setStatus("success");
    } catch { setStatus("error"); }
  }

  return (
    <>
      <a className="contact-floating-button" href="#contact">{t.contact}</a>
      <section id="contact" className="contact-section" aria-labelledby="contact-title" dir={rtl ? "rtl" : "ltr"}>
        <div className="container contact-inner">
          <div className="section-heading">
            <p className="eyebrow">{t.eyebrow}</p><h2 id="contact-title">{t.title}</h2><p>{t.intro}</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-subject">{t.subject}</label>
            <input id="contact-subject" name="subject" type="text" value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={160} required placeholder={t.subjectPlaceholder} />
            <label htmlFor="contact-message">{t.message}</label>
            <textarea id="contact-message" name="message" value={message} onChange={(event) => setMessage(event.target.value.slice(0, 500))} maxLength={500} rows={8} required placeholder={t.messagePlaceholder} />
            <div className="contact-counter">{message.length}/500</div>
            <label htmlFor="contact-email">{t.email}</label>
            <input id="contact-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={160} required placeholder="name@example.com" />
            <button className="contact-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.send}</button>
            {status === "success" && <p className="contact-success" role="status">{t.success}</p>}
            {status === "error" && <p className="contact-error" role="alert">{t.error}</p>}
          </form>
        </div>
      </section>

      <footer className="nexora-footer" dir={rtl ? "rtl" : "ltr"}>
        <div className="nexora-footer-inner">
          <div className="nexora-footer-brand"><span className="nexora-footer-mark">N</span><div><strong>NEXORA DIGITAL</strong><small>AI + WEB + AUTOMATION</small></div></div>
          <div><h3>{t.legal}</h3><nav className="nexora-footer-links"><a href="/privacy">{t.privacy}</a><a href="/terms">{t.terms}</a><a href="/impressum">{t.imprint}</a></nav></div>
          <div><h3>{t.contact}</h3><a href="#contact">{t.send}</a></div>
        </div>
        <div className="nexora-footer-copy">{t.copyright}</div>
      </footer>

      <style jsx global>{`
        .contact-floating-button{position:fixed;right:22px;bottom:22px;z-index:120;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:14px;background:linear-gradient(90deg,#6c63ff,#00d9ff);color:#fff;font-weight:800;font-size:14px;box-shadow:0 12px 35px rgba(0,217,255,.22)}
        .contact-floating-button:hover{transform:translateY(-2px)}
        .contact-section{padding:110px 0 125px;background:#080d20;border-top:1px solid rgba(0,217,255,.16)}
        .contact-inner{display:grid;grid-template-columns:.7fr 1.3fr;gap:60px;align-items:start}
        .contact-form{display:flex;flex-direction:column;gap:10px;padding:30px;border:1px solid rgba(0,217,255,.24);border-radius:24px;background:rgba(5,8,22,.72);box-shadow:0 25px 80px rgba(0,0,0,.24)}
        .contact-form label{margin-top:8px;color:#fff;font-size:14px;font-weight:700}.contact-form input,.contact-form textarea{width:100%;border:1px solid rgba(80,101,150,.45);border-radius:12px;background:#050816;color:#fff;outline:none;padding:13px 15px}.contact-form textarea{resize:vertical;min-height:190px;line-height:1.65}.contact-form input:focus,.contact-form textarea:focus{border-color:#00d9ff;box-shadow:0 0 0 3px rgba(0,217,255,.08)}.contact-counter{margin-top:-4px;text-align:right;color:#7f93ad;font-size:11px}.contact-submit{margin-top:12px;min-height:50px;border:0;border-radius:12px;background:linear-gradient(90deg,#6c63ff,#00d9ff);color:#fff;font-weight:800}.contact-submit:disabled{opacity:.65;cursor:wait}.contact-success{margin:4px 0 0;color:#6ff0b0;font-size:14px}.contact-error{margin:4px 0 0;color:#ff8e9e;font-size:14px}
        .nexora-footer{padding:34px 24px 20px;background:#050816;border-top:1px solid rgba(0,217,255,.18);color:#fff}.nexora-footer-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.3fr 1fr .7fr;gap:40px;align-items:start}.nexora-footer-brand{display:flex;gap:12px;align-items:center}.nexora-footer-mark{display:grid;place-items:center;width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#6c63ff,#00d9ff);font-weight:900;font-size:24px}.nexora-footer-brand strong{display:block;font-size:17px;letter-spacing:.08em}.nexora-footer-brand small{display:block;margin-top:4px;color:#7f93ad;font-size:10px;letter-spacing:.12em}.nexora-footer h3{margin:0 0 12px;font-size:13px;color:#00d9ff}.nexora-footer-links{display:flex;flex-wrap:wrap;gap:8px 18px}.nexora-footer a{color:#dce6f4;text-decoration:none;font-size:13px}.nexora-footer a:hover{color:#00d9ff}.nexora-footer-copy{max-width:1180px;margin:25px auto 0;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:#71839b;font-size:11px}
        .hero-content{grid-template-columns:.82fr 1.18fr!important;gap:48px!important}.hero-copy{max-width:620px}.hero-panel{border:0!important;background:transparent!important;box-shadow:none!important;padding:20px 0!important}.mini-video-player{width:min(100%,680px)!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}.mini-video{border:0!important;border-radius:0!important}.language-picker{transform:translateY(8px)}.language-picker select{max-width:130px}
        @media(max-width:1000px){.contact-inner{grid-template-columns:1fr;gap:30px}.hero-content{grid-template-columns:1fr!important}.mini-video-player{width:min(100%,760px)!important}.nexora-footer-inner{grid-template-columns:1fr 1fr}}
        @media(max-width:680px){.contact-floating-button{right:14px;bottom:14px}.contact-section{padding:80px 0 105px}.contact-form{padding:20px}.language-picker{transform:none}.language-picker select{max-width:90px}.nexora-footer-inner{grid-template-columns:1fr}.nexora-footer{padding-bottom:80px}}
      `}</style>
    </>
  );
}
