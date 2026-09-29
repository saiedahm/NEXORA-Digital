"use client";

import { useEffect } from "react";

const text: Record<string, { button: string; eyebrow: string; title: string; intro: string; subject: string; subjectPlaceholder: string; message: string; messagePlaceholder: string; email: string; submit: string; sending: string; success: string; error: string }> = {
  de: { button: "Kontakt", eyebrow: "NEXORA DIGITAL", title: "Kontaktieren Sie uns", intro: "Senden Sie uns Ihre Nachricht. Wir prüfen Ihre Anfrage und melden uns bei Ihnen.", subject: "Betreff", subjectPlaceholder: "Betreff eingeben", message: "Nachricht", messagePlaceholder: "Schreiben Sie Ihre Nachricht hier (max. 500 Zeichen)", email: "E-Mail des Absenders", submit: "Senden", sending: "Wird gesendet…", success: "Ihre Nachricht wurde erfolgreich an die Verwaltung gesendet.", error: "Die Nachricht konnte jetzt nicht gesendet werden. Bitte versuchen Sie es erneut." },
  en: { button: "Contact us", eyebrow: "NEXORA DIGITAL", title: "Contact us", intro: "Send us your message. We will review your request and get back to you.", subject: "Subject", subjectPlaceholder: "Enter the subject", message: "Message", messagePlaceholder: "Write your message here (max. 500 characters)", email: "Sender email", submit: "Send", sending: "Sending…", success: "Your message was sent successfully.", error: "The message could not be sent. Please try again." },
  ar: { button: "اتصل بنا", eyebrow: "NEXORA DIGITAL", title: "اتصل بنا", intro: "أرسل رسالتك إلى الإدارة وسنراجع طلبك ونتواصل معك.", subject: "عنوان الرسالة", subjectPlaceholder: "اكتب عنوان الرسالة", message: "الرسالة", messagePlaceholder: "اكتب رسالتك هنا (حد أقصى 500 حرف)", email: "إيميل صاحب الرسالة", submit: "إرسال", sending: "جاري الإرسال…", success: "تم إرسال رسالتك إلى الإدارة بنجاح.", error: "تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى." },
};

export function ContactLanguageBridge() {
  useEffect(() => {
    const apply = (code: string) => {
      const t = text[code] ?? text.en;
      const root = document.getElementById("contact");
      if (!root) return;
      const button = document.querySelector<HTMLAnchorElement>(".contact-floating-button");
      const eyebrow = root.querySelector<HTMLElement>(".section-heading .eyebrow");
      const title = root.querySelector<HTMLElement>("#contact-title");
      const intro = root.querySelector<HTMLElement>(".section-heading p:not(.eyebrow)");
      const labels = root.querySelectorAll<HTMLLabelElement>(".contact-form label");
      const inputs = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".contact-form input, .contact-form textarea");
      const submit = root.querySelector<HTMLButtonElement>(".contact-submit");
      if (button) button.textContent = t.button;
      if (eyebrow) eyebrow.textContent = t.eyebrow;
      if (title) title.textContent = t.title;
      if (intro) intro.textContent = t.intro;
      if (labels[0]) labels[0].textContent = t.subject;
      if (labels[1]) labels[1].textContent = t.message;
      if (labels[2]) labels[2].textContent = t.email;
      if (inputs[0]) inputs[0].placeholder = t.subjectPlaceholder;
      if (inputs[1]) inputs[1].placeholder = t.messagePlaceholder;
      if (inputs[2]) inputs[2].placeholder = "name@example.com";
      if (submit) submit.textContent = submit.disabled ? t.sending : t.submit;
      document.documentElement.lang = code;
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    };
    const onChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (target && target.matches("select")) apply(target.value);
    };
    document.addEventListener("change", onChange, true);
    const observer = new MutationObserver(() => {
      const select = document.querySelector<HTMLSelectElement>(".language-picker select");
      if (select) apply(select.value);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const select = document.querySelector<HTMLSelectElement>(".language-picker select");
    if (select) apply(select.value);
    return () => { document.removeEventListener("change", onChange, true); observer.disconnect(); };
  }, []);
  return null;
}
