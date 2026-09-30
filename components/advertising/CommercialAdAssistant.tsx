"use client";

import { useState } from "react";

const questions = [
  ["category", "Was möchten Sie bewerben?", "Restaurant, Shop, Immobilie, Fahrzeug, Dienstleistung, Produkt …"],
  ["companyName", "Wie heißt Ihr Unternehmen oder Produkt?", "Der Name, der im Werbemittel erscheinen soll."],
  ["message", "Was soll der Kunde wissen?", "Beschreiben Sie Ihre Idee frei. NEXORA formt daraus professionelle Werbetexte."],
  ["audience", "Wer ist Ihre Zielgruppe?", "Zum Beispiel Kunden in Neumünster, Schleswig-Holstein oder ganz Deutschland."],
  ["destination", "Wohin soll der Besucher gehen?", "Ihre Website oder Landingpage, z. B. https://example.de"],
  ["durationMonths", "Wie lange soll die Kampagne laufen?", "1, 3, 6 oder 12 Monate."],
] as const;

const prices: Record<number, Record<number, number>> = { 1: { 1: 499, 2: 299, 3: 299, 4: 149 }, 3: { 1: 1299, 2: 799, 3: 799, 4: 399 }, 6: { 1: 2399, 2: 1499, 3: 1499, 4: 749 }, 12: { 1: 4499, 2: 2799, 3: 2799, 4: 1399 } };

export function CommercialAdAssistant() {
  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState(1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function start(selectedSpace: number) { setSpace(selectedSpace); setStep(0); setAnswers({}); setPreview(null); setError(""); setOpen(true); }

  async function next() {
    const [key] = questions[step];
    const value = answers[key]?.trim();
    if (!value) { setError("Bitte beantworten Sie diese Frage."); return; }
    setError("");
    if (step < questions.length - 1) { setStep(step + 1); return; }
    setLoading(true);
    try {
      const chat = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ language: "de", message: `Erstelle eine kommerzielle Werbekampagne. Werbefläche ${space}. Daten: ${JSON.stringify(answers)}. Erstelle eine konkrete Headline, Werbetext, Call-to-Action und erkläre den nächsten Schritt vor der Zahlung.`, history: [] }) });
      const data = await chat.json();
      if (!chat.ok) throw new Error(data.error || "NEXORA AI konnte die Anfrage nicht bearbeiten.");
      setPreview({ reply: data.reply, nextStep: data.nextStep, price: prices[Number(answers.durationMonths) || 1]?.[space] || 0 });
    } catch (e) { setError(e instanceof Error ? e.message : "Fehler"); }
    finally { setLoading(false); }
  }

  async function pay() {
    setLoading(true); setError("");
    try {
      const project = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: `Commercial Advertisement — ${answers.companyName}`, description: JSON.stringify({ advertising: true, space, ...answers, aiPreview: preview }), type: "COMMERCIAL_AD" }) });
      const projectData = await project.json();
      if (!project.ok) throw new Error(projectData.error || "Project could not be created.");
      const checkout = await fetch(`/api/projects/${projectData.project.id}/payment/checkout`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ space, durationMonths: Number(answers.durationMonths) || 1 }) });
      const checkoutData = await checkout.json();
      if (!checkout.ok) throw new Error(checkoutData.error || "Stripe checkout could not be created.");
      window.location.href = checkoutData.url;
    } catch (e) { setError(e instanceof Error ? e.message : "Payment error"); setLoading(false); }
  }

  return <>
    <section className="section section-alt" id="commercial-advertising">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">AI ADVERTISING</p><h2>Ihr Werbemittel. Von der Idee bis zur Veröffentlichung.</h2><p>Wählen Sie eine Fläche. NEXORA führt Sie durch Briefing, KI-Text, Freigabe und Stripe-Zahlung.</p></div>
        <div className="services-grid">{[1,2,3,4].map((n)=><button key={n} type="button" className="card" onClick={()=>start(n)} style={{textAlign:"left",cursor:"pointer"}}><strong>Werbefläche {n}</strong><span>Anzeige mit NEXORA AI erstellen</span><small>Ab €{prices[1][n]} / Monat</small></button>)}</div>
      </div>
    </section>
    {open && <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,.8)",display:"grid",placeItems:"center",padding:20}}><div style={{width:"min(760px,95vw)",maxHeight:"90vh",overflow:"auto",background:"#071522",color:"white",borderRadius:20,padding:28,border:"1px solid rgba(216,180,93,.6)"}}><button onClick={()=>setOpen(false)} style={{float:"right",fontSize:28,background:"transparent",color:"white",border:0}}>×</button><p className="eyebrow">NEXORA AI ADVERTISING MANAGER</p><h2>Willkommen. Bereit für Ihre Anzeige.</h2>{!preview ? <>{<p>Werbefläche {space}. Frage {step+1} von {questions.length}</p>}<h3>{questions[step][1]}</h3><p>{questions[step][2]}</p><input value={answers[questions[step][0]]||""} onChange={e=>setAnswers({...answers,[questions[step][0]]:e.target.value})} style={{width:"100%",padding:14,boxSizing:"border-box",background:"#102536",color:"white",border:"1px solid #405467",borderRadius:10}} />{error&&<p style={{color:"#ff9b9b"}}>{error}</p>}<button className="primary-button" onClick={next} disabled={loading} style={{marginTop:16}}>{loading?"AI arbeitet …":step===questions.length-1?"Anzeige mit AI erstellen":"Weiter"}</button></> : <><div style={{padding:20,border:"1px solid rgba(216,180,93,.35)",borderRadius:14}}><h3>AI-Entwurf</h3><p style={{whiteSpace:"pre-wrap"}}>{preview.reply}</p><p><strong>Nächster Schritt:</strong> {preview.nextStep}</p><p><strong>Werbefläche:</strong> {space} · <strong>Preis:</strong> €{preview.price}</p></div><p>Sie zahlen erst nach Ihrer Freigabe. Nach bestätigter Stripe-Zahlung wird die Projektausführung freigeschaltet.</p>{error&&<p style={{color:"#ff9b9b"}}>{error}</p>}<button className="primary-button" onClick={pay} disabled={loading}>{loading?"Stripe wird vorbereitet …":"Anzeige freigeben und bezahlen"}</button><button className="secondary-button" onClick={()=>{setPreview(null);setStep(questions.length-1)}} style={{marginLeft:10}}>Ändern</button></>}</div></div>}
  </>;
}
