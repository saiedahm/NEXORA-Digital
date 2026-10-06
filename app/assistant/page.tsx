"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

const knowledge = [
  { keys: ["nexora", "what", "ما هي", "ايه هي"], answer: "NEXORA DIGITAL هي منصة رقمية مدعومة بالذكاء الاصطناعي لإنشاء المواقع الحديثة وتجديد المواقع القديمة وإدارة مشاريعك الرقمية من مساحة عمل واحدة." },
  { keys: ["create", "إنشاء", "انشاء", "موقع جديد"], answer: "يمكنك بدء مشروع جديد من AI Studio، ثم تكتب فكرة مشروعك ووصف نشاطك وأهدافك. بعد ذلك تُبنى خطة المشروع والاتجاه البصري والخطوات التالية." },
  { keys: ["renew", "تجديد", "تطوير", "موقع قديم"], answer: "نعم. NEXORA مصممة أيضًا لتجديد المواقع الموجودة وتحويلها إلى تجربة حديثة، بدل أن تضطر للبدء من الصفر." },
  { keys: ["price", "pricing", "السعر", "الأسعار", "باقات"], answer: "الخطط الحالية هي Starter €99 شهريًا، Business €299، Growth €699، وEnterprise بسعر مخصص." },
  { keys: ["business", "business plan", "باقة الأعمال"], answer: "Business بسعر €299 شهريًا، وهي مناسبة للشركات التي تحتاج إنشاء وتجديد المواقع مع قدرات AI ومساحة عمل للنمو." },
  { keys: ["ai", "ذكاء", "الذكاء الاصطناعي"], answer: "AI Studio هو قلب NEXORA: يساعد في فهم فكرة المشروع، إنشاء اتجاه للموقع، وتجهيز خطوات البناء والتجديد. طبقة الذكاء الحقيقية ستُوصل بمزود AI في مرحلة الخدمات الخلفية." },
  { keys: ["account", "حساب", "تسجيل"], answer: "الحسابات وتسجيل الدخول جزء من المرحلة التالية. حاليًا نبني تجربة المنصة وواجهة Workspace أولًا حتى تكون البنية مستقرة." },
  { keys: ["payment", "stripe", "دفع", "الدفع"], answer: "الدفع سيتم عبر Stripe في مرحلة Payments. لا يتم تخزين بيانات بطاقات الدفع داخل NEXORA." },
  { keys: ["support", "مساعدة", "دعم"], answer: "يمكنك استخدام هذا المساعد لأسئلة NEXORA الأساسية. لاحقًا سيُضاف Human Handoff حتى ينتقل العميل إلى الدعم البشري عند الحاجة." }
];

function getAnswer(input: string) {
  const text = input.toLowerCase().trim();
  if (!text) return "اكتب سؤالك وسأساعدك.";

  let best = knowledge.find((item) =>
    item.keys.some((key) => text.includes(key.toLowerCase()))
  );

  if (best) return best.answer;

  if (text.includes("hello") || text.includes("hi") || text.includes("مرحبا") || text.includes("سلام")) {
    return "أهلًا بك في NEXORA DIGITAL. اسألني عن المنصة، إنشاء المواقع، تجديد المواقع، AI Studio، الأسعار أو الخطط.";
  }

  return "أفهم سؤالك، لكن هذا السؤال يحتاج معرفة إضافية غير موجودة في قاعدة المعرفة الحالية. جرّب السؤال عن NEXORA أو AI Studio أو الأسعار أو إنشاء وتجديد المواقع. في المرحلة التالية سنوصل البوت بنموذج AI حقيقي ليجيب على الأسئلة المفتوحة.";
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "مرحبًا بك في NEXORA DIGITAL. أنا المساعد الذكي للمنصة. كيف يمكنني مساعدتك؟"
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = useMemo(
    () => ["ما هي NEXORA؟", "ما هي الأسعار؟", "كيف أنشئ موقعًا جديدًا؟", "هل يمكن تجديد موقعي القديم؟"],
    []
  );

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const question = input.trim();
    if (!question || typing) return;

    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", text: question }].map((message) => ({
            role: message.role,
            content: message.text
          }))
        })
      });

      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.answer || getAnswer(question) }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: getAnswer(question) }
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <main className="assistant-page">
      <header className="assistant-header">
        <a className="assistant-brand" href="/">NEXORA DIGITAL</a>
        <div className="assistant-status"><span /> AI ASSISTANT ONLINE</div>
        <a className="secondary-button" href="/">Back</a>
      </header>

      <section className="assistant-shell">
        <aside className="assistant-info">
          <p className="section-label">NEXORA AI</p>
          <h1>Ask anything about NEXORA.</h1>
          <p>
            Your first-line digital assistant for platform questions, plans,
            website creation, renewal, and the NEXORA workspace.
          </p>

          <div className="assistant-capabilities">
            <span>✓ Platform questions</span>
            <span>✓ Plans & pricing</span>
            <span>✓ Create a website</span>
            <span>✓ Renew an existing site</span>
          </div>
        </aside>

        <section className="chat-window">
          <div className="chat-top">
            <div>
              <strong>NEXORA Assistant</strong>
              <small>Knowledge assistant</small>
            </div>
            <span className="chat-live"><i /> Live</span>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div className={message.role === "user" ? "message user-message" : "message"} key={index}>
                <span className="message-role">{message.role === "user" ? "YOU" : "NEXORA AI"}</span>
                <p>{message.text}</p>
              </div>
            ))}

            {typing && (
              <div className="message">
                <span className="message-role">NEXORA AI</span>
                <p className="typing">● ● ●</p>
              </div>
            )}
          </div>

          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <button type="button" key={suggestion} onClick={() => setInput(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask NEXORA a question..."
              aria-label="Ask NEXORA a question"
            />
            <button type="submit" aria-label="Send question">→</button>
          </form>
        </section>
      </section>
    </main>
  );
}
