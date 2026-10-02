"use client";

import { useEffect, useMemo, useState } from "react";

type ActiveAd = {
  id: string;
  space: number;
  companyName: string;
  message: string;
  destination?: string;
};

const questions = [
  ["category", "ماذا تريد أن تعلن؟", "مطعم، متجر، عقار، سيارة، خدمة أو منتج."],
  ["companyName", "ما اسم الشركة أو المنتج؟", "الاسم الذي سيظهر في الإعلان."],
  ["message", "ماذا تريد أن يعرف الزائر؟", "اكتب فكرتك، وسيساعدك NEXORA AI في صياغتها."],
  ["audience", "من هي الفئة المستهدفة؟", "مثال: عملاء في Neumünster أو ألمانيا."],
  ["format", "ما شكل الإعلان؟", "شعار وصورة، عرض، إعلان نصي أو تصميم حديث بالـAI."],
  ["destination", "إلى أين ينتقل الزائر؟", "رابط موقعك أو صفحة الهبوط."],
  ["durationMonths", "كم شهرًا تريد الإعلان؟", "اختر 1 أو 3 أو 6 أو 12 شهرًا."],
] as const;

const prices: Record<number, Record<number, number>> = {
  1: { 1: 499, 2: 299, 3: 299 },
  3: { 1: 1299, 2: 799, 3: 799 },
  6: { 1: 2399, 2: 1499, 3: 1499 },
  12: { 1: 4499, 2: 2799, 3: 2799 },
};

const slots = [
  { id: 1, icon: "✦" },
  { id: 2, icon: "◈" },
  { id: 3, icon: "✧" },
];

const monthly = (months: number, space: number) =>
  Math.ceil((prices[months]?.[space] ?? 0) / months);

export function CommercialAdAssistant() {
  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState(1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<any>(null);
  const [ads, setAds] = useState<ActiveAd[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");

  async function loadAds() {
    try {
      const r = await fetch("/api/commercial-ads/active", { cache: "no-store" });
      const d = await r.json();
      setAds(Array.isArray(d.ads) ? d.ads : []);
    } catch {}
  }

  useEffect(() => {
    void loadAds();
    const fast = window.setInterval(loadAds, 3000);
    const slow = window.setInterval(loadAds, 30000);
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setPaymentMessage("تم تأكيد الدفع. الإعلان سيظهر تلقائيًا بعد تأكيد Stripe.");
      window.setTimeout(() => setPaymentMessage(""), 9000);
    }
    return () => {
      window.clearInterval(fast);
      window.clearInterval(slow);
    };
  }, []);

  function start(selected: number) {
    setSpace(selected);
    setStep(0);
    setAnswers({});
    setPreview(null);
    setError("");
    setOpen(true);
  }

  async function next() {
    const [key] = questions[step];
    if (!answers[key]?.trim()) {
      setError("من فضلك أكمل هذه الخطوة أولًا.");
      return;
    }
    setError("");
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    try {
      const r = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "ar",
          message:
            "أنت مدير الإعلانات في NEXORA. أنشئ معاينة احترافية لإعلان رقمي. " +
            "أخرج عنوانًا جذابًا، نصًا مختصرًا، CTA، واقتراحًا لتكوين التصميم والألوان. " +
            "لا تنفذ الدفع ولا تدّعي إنشاء صورة فعلية. البيانات: " +
            JSON.stringify({ advertisingSpace: space, ...answers }),
          history: [],
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "تعذر إنشاء معاينة الإعلان.");
      setPreview({
        reply: data.reply,
        nextStep: data.nextStep,
        price: prices[Number(answers.durationMonths) || 1]?.[space] || 0,
        monthly: monthly(Number(answers.durationMonths) || 1, space),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ أثناء تصميم الإعلان.");
    } finally {
      setLoading(false);
    }
  }

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const p = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Commercial Advertisement — ${answers.companyName}`,
          description: JSON.stringify({
            advertising: true,
            space,
            ...answers,
            aiPreview: preview,
            monthlyPrice: preview.monthly,
            totalPrice: preview.price,
          }),
          type: "COMMERCIAL_AD",
        }),
      });
      const pd = await p.json();
      if (!p.ok) throw new Error(pd.error || "تعذر إنشاء طلب الإعلان.");

      const c = await fetch(`/api/projects/${pd.project.id}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          space,
          durationMonths: Number(answers.durationMonths) || 1,
        }),
      });
      const cd = await c.json();
      if (!c.ok) throw new Error(cd.error || "تعذر إنشاء الدفع.");
      window.location.href = cd.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ أثناء الدفع.");
      setLoading(false);
    }
  }

  const adBySpace = useMemo(() => new Map(ads.map((ad) => [ad.space, ad])), [ads]);

  return (
    <>
      <section
        id="commercial-advertising"
        aria-label="مساحات إعلانية"
        style={{
          background: "linear-gradient(180deg,#071522,#091c2c)",
          padding: "18px 0 22px",
          borderBottom: "1px solid rgba(255,255,255,.14)",
        }}
      >
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:14}}>
            <div>
              <p className="eyebrow" style={{marginBottom:4}}>NEXORA AI ADVERTISING</p>
            </div>
            {paymentMessage && <span style={{color:"#fff",border:"1px solid rgba(255,255,255,.5)",borderRadius:999,padding:"7px 12px",fontSize:12}}>{paymentMessage}</span>}
          </div>

          <div className="commercial-ad-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14}}>
            {slots.map((slot) => {
              const ad = adBySpace.get(slot.id);
              return (
                <article key={slot.id} style={{
                  minHeight:118,position:"relative",overflow:"hidden",border:"1px solid rgba(255,255,255,.92)",
                  borderRadius:16,background:ad?"linear-gradient(135deg,#09263a,#0d354b)":"linear-gradient(135deg,#0a1c2b,#0e2638)",
                  boxShadow:"0 10px 30px rgba(0,0,0,.22)",padding:16
                }}>
                  <div style={{position:"absolute",top:-35,right:-25,width:100,height:100,borderRadius:"50%",background:"rgba(48,198,255,.12)"}} />
                  {ad ? (
                    <>
                      <small style={{color:"#9edfff"}}>مساحة إعلانية {slot.id} · LIVE</small>
                      <h3 style={{color:"#fff",margin:"7px 0 5px",fontSize:18}}>{ad.companyName}</h3>
                      <p style={{color:"rgba(255,255,255,.78)",margin:0,fontSize:13}}>{ad.message}</p>
                      {ad.destination && <a href={ad.destination} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:10,color:"#fff",textDecoration:"none",fontSize:12,border:"1px solid rgba(255,255,255,.7)",borderRadius:999,padding:"5px 10px"}}>اكتشف الإعلان →</a>}
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => start(slot.id)} aria-label={`أعلن معنا في المساحة ${slot.id}`} style={{position:"absolute",top:12,right:12,width:40,height:40,borderRadius:12,border:"1px solid #fff",background:"rgba(5,18,29,.72)",color:"#fff",cursor:"pointer",fontSize:19}}>{slot.icon}</button>
                      <small style={{color:"#9edfff"}}>مساحة إعلانية 0{slot.id}</small>
                      <div style={{display:"grid",placeItems:"center",minHeight:64,color:"rgba(255,255,255,.88)",textAlign:"center"}}>
                        <div><div style={{fontSize:17,fontWeight:700}}>مساحة إعلانية</div><div style={{fontSize:12,opacity:.72}}>تصميم AI حسب طلبك</div></div>
                      </div>
                      <button type="button" onClick={() => start(slot.id)} style={{border:"1px solid #fff",background:"transparent",color:"#fff",borderRadius:999,padding:"7px 14px",cursor:"pointer",fontWeight:700,fontSize:12}}>أعلن معنا</button>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {open && (
        <div role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setOpen(false); }} style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,.82)",display:"grid",placeItems:"center",padding:20}}>
          <section role="dialog" aria-modal="true" aria-labelledby="ad-dialog-title" style={{width:"min(820px,96vw)",maxHeight:"92vh",overflow:"auto",background:"#071522",color:"#fff",borderRadius:22,padding:28,border:"1px solid rgba(255,255,255,.9)",boxShadow:"0 30px 100px rgba(0,0,0,.55)"}}>
            <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق" style={{float:"right",fontSize:28,background:"transparent",color:"#fff",border:0,cursor:"pointer"}}>×</button>
            <p className="eyebrow">NEXORA AI ADVERTISING MANAGER</p>
            <h2 id="ad-dialog-title" style={{color:"#fff"}}>محادثة إنشاء الإعلان — المساحة {space}</h2>

            {!preview ? (
              <>
                <p style={{opacity:.72}}>الخطوة {step + 1} من {questions.length} · سيصمم AI المعاينة بعد اكتمال البيانات.</p>
                <h3 style={{color:"#fff"}}>{questions[step][1]}</h3>
                <p style={{opacity:.72}}>{questions[step][2]}</p>
                <input value={answers[questions[step][0]] || ""} onChange={(e) => setAnswers({...answers,[questions[step][0]]:e.target.value})} onKeyDown={(e) => {if(e.key==="Enter") void next();}} style={{width:"100%",padding:14,boxSizing:"border-box",background:"#102536",color:"#fff",border:"1px solid rgba(255,255,255,.45)",borderRadius:10}} />

                {step === questions.length - 1 && (
                  <div style={{marginTop:14,display:"flex",gap:10,flexWrap:"wrap"}}>
                    {[1,3,6,12].map((m) => (
                      <button key={m} type="button" onClick={() => setAnswers({...answers,durationMonths:String(m)})} style={{border:"1px solid rgba(255,255,255,.65)",background:Number(answers.durationMonths)===m?"rgba(48,198,255,.18)":"transparent",color:"#fff",borderRadius:999,padding:"8px 14px",cursor:"pointer"}}>
                        {m} شهر · €{monthly(m,space)}/شهر
                      </button>
                    ))}
                  </div>
                )}

                {error && <p style={{color:"#ff9b9b"}}>{error}</p>}
                <button className="primary-button" type="button" onClick={() => void next()} disabled={loading} style={{marginTop:18}}>
                  {loading ? "NEXORA AI يصمم الإعلان …" : step === questions.length - 1 ? "إنشاء تصميم الإعلان بالـAI" : "التالي"}
                </button>
              </>
            ) : (
              <>
                <div className="commercial-ad-preview-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1.2fr) minmax(240px,.8fr)",gap:18}}>
                  <div style={{padding:20,border:"1px solid rgba(255,255,255,.28)",borderRadius:14}}>
                    <h3 style={{color:"#fff",marginTop:0}}>نتيجة NEXORA AI</h3>
                    <p style={{whiteSpace:"pre-wrap",lineHeight:1.7}}>{preview.reply}</p>
                    <p><strong>الخطوة التالية:</strong> {preview.nextStep}</p>
                  </div>
                  <div style={{minHeight:220,borderRadius:16,border:"1px solid rgba(255,255,255,.9)",padding:18,background:"linear-gradient(145deg,#0b2638,#102f42)",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div>
                      <small style={{color:"#9edfff"}}>AI AD PREVIEW · SPACE {space}</small>
                      <h2 style={{color:"#fff",margin:"18px 0 8px"}}>{answers.companyName || "اسم شركتك"}</h2>
                      <p style={{color:"rgba(255,255,255,.82)"}}>{answers.message || "رسالة الإعلان ستظهر هنا."}</p>
                    </div>
                    <span style={{display:"inline-block",width:"fit-content",border:"1px solid rgba(255,255,255,.85)",borderRadius:999,padding:"7px 12px",color:"#fff",fontSize:12}}>{answers.format || "تصميم AI"}</span>
                  </div>
                </div>

                <div style={{marginTop:18,padding:16,border:"1px solid rgba(255,255,255,.35)",borderRadius:14}}>
                  <strong>€{preview.monthly} / شهر</strong>
                  <span style={{opacity:.7,marginInlineStart:10}}>إجمالي {Number(answers.durationMonths) || 1} شهر: €{preview.price}</span>
                </div>
                <p style={{opacity:.72}}>بعد موافقتك على التصميم يتم تحويلك مباشرة إلى الدفع. بعد تأكيد Stripe يتم فتح الإعلان تلقائيًا ليظهر في المساحة المختارة.</p>
                {error && <p style={{color:"#ff9b9b"}}>{error}</p>}
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <button className="primary-button" type="button" onClick={() => void pay()} disabled={loading}>{loading ? "جاري تحويلك للدفع …" : "موافق على التصميم — ادفع الآن"}</button>
                  <button className="secondary-button" type="button" onClick={() => {setPreview(null);setStep(questions.length - 1);}}>تعديل الإعلان</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
