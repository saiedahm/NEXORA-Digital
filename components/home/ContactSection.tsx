"use client";

import { FormEvent, useState } from "react";

export function ContactSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message.length > 500) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message, email }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setSubject("");
      setMessage("");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <a className="contact-floating-button" href="#contact">اتصل بنا</a>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <div className="section-heading">
            <p className="eyebrow">NEXORA DIGITAL</p>
            <h2 id="contact-title">اتصل بنا</h2>
            <p>أرسل رسالتك إلى الإدارة وسنراجع طلبك ونتواصل معك.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-subject">عنوان الرسالة</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              maxLength={160}
              required
              placeholder="اكتب عنوان الرسالة"
            />

            <label htmlFor="contact-message">الرسالة</label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value.slice(0, 500))}
              maxLength={500}
              rows={8}
              required
              placeholder="اكتب رسالتك هنا (حد أقصى 500 حرف)"
            />
            <div className="contact-counter">{message.length}/500</div>

            <label htmlFor="contact-email">إيميل صاحب الرسالة</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={160}
              required
              placeholder="name@example.com"
            />

            <button className="contact-submit" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "جاري الإرسال…" : "إرسال"}
            </button>

            {status === "success" && <p className="contact-success" role="status">تم إرسال رسالتك إلى الإدارة بنجاح.</p>}
            {status === "error" && <p className="contact-error" role="alert">تعذر إرسال الرسالة الآن. يرجى المحاولة مرة أخرى.</p>}
          </form>
        </div>
      </section>

      <style jsx global>{`
        .contact-floating-button{position:fixed;right:22px;bottom:22px;z-index:120;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:14px;background:linear-gradient(90deg,#6c63ff,#00d9ff);color:#fff;font-weight:800;font-size:14px;box-shadow:0 12px 35px rgba(0,217,255,.22)}
        .contact-floating-button:hover{transform:translateY(-2px)}
        .contact-section{padding:110px 0 125px;background:#080d20;border-top:1px solid rgba(0,217,255,.16)}
        .contact-inner{display:grid;grid-template-columns:.7fr 1.3fr;gap:60px;align-items:start}
        .contact-form{display:flex;flex-direction:column;gap:10px;padding:30px;border:1px solid rgba(0,217,255,.24);border-radius:24px;background:rgba(5,8,22,.72);box-shadow:0 25px 80px rgba(0,0,0,.24)}
        .contact-form label{margin-top:8px;color:#fff;font-size:14px;font-weight:700}
        .contact-form input,.contact-form textarea{width:100%;border:1px solid rgba(80,101,150,.45);border-radius:12px;background:#050816;color:#fff;outline:none;padding:13px 15px}
        .contact-form textarea{resize:vertical;min-height:190px;line-height:1.65}
        .contact-form input:focus,.contact-form textarea:focus{border-color:#00d9ff;box-shadow:0 0 0 3px rgba(0,217,255,.08)}
        .contact-counter{margin-top:-4px;text-align:right;color:#7f93ad;font-size:11px}
        .contact-submit{margin-top:12px;min-height:50px;border:0;border-radius:12px;background:linear-gradient(90deg,#6c63ff,#00d9ff);color:#fff;font-weight:800}
        .contact-submit:disabled{opacity:.65;cursor:wait}
        .contact-success{margin:4px 0 0;color:#6ff0b0;font-size:14px}.contact-error{margin:4px 0 0;color:#ff8e9e;font-size:14px}
        .hero-content{grid-template-columns:.82fr 1.18fr!important;gap:48px!important}.hero-copy{max-width:620px}.hero-panel{border:0!important;background:transparent!important;box-shadow:none!important;padding:20px 0!important}.mini-video-player{width:min(100%,680px)!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}.mini-video{border:0!important;border-radius:0!important}
        .language-picker{transform:translateY(8px)}.language-picker select{max-width:130px}
        @media(max-width:1000px){.contact-inner{grid-template-columns:1fr;gap:30px}.hero-content{grid-template-columns:1fr!important}.mini-video-player{width:min(100%,760px)!important}}
        @media(max-width:680px){.contact-floating-button{right:14px;bottom:14px}.contact-section{padding:80px 0 105px}.contact-form{padding:20px}.language-picker{transform:none}.language-picker select{max-width:90px}}
      `}</style>
    </>
  );
}
