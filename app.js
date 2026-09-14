const team = [
["Dr. Mark Weber","Geschäftsführender CEO","Strategie, Führung und Vision"],
["Sarah Wagner","Operations & Executive Assistant","Abläufe, Koordination und Support"],
["Lena Schmidt","Management & Kundenempfang","Erstkontakt, Organisation und Kommunikation"],
["Thomas Hoffmann","CFO","Finanzen, Kalkulation und Controlling"],
["RA Matthias Klein","Legal & GDPR","Recht, Datenschutz und Compliance"],
["Alexander Kirsch","UI/UX Design Engineer","Designsysteme, UX und Prototyping"],
["Yasemin Yilmaz","KI-Marketing & Advertising","Kampagnen, Content und Performance"],
["David Miller","AI Systems Engineer","Software, Integrationen und KI-Workflows"],
["Michael Schulz","Infrastructure & Cybersecurity","Infrastruktur, Sicherheit und Betrieb"]
];
const prices = [
["Website neu","€499","Konzeption und neues Website-Design","ca. 5 Minuten Erstaufnahme"],
["Website + AI Close","€649","Website mit Conversion-orientiertem AI-Konzept",""],
["Website-Update","€299","Modernisierung eines bestehenden Auftritts","ca. 10 Minuten Erstaufnahme"],
["AI-Integration","€699","Einbindung intelligenter Workflows","ca. 15 Minuten Erstaufnahme"],
["Global Multilingual","€799","Mehrsprachige Plattform-Konzeption",""],
["KI-Werbung","€349 / Monat","Intelligente Marketing- und Werbeplanung",""],
["Wartung","€99 / Monat","Pflege, Monitoring und Updates",""],
["VIP Smart Empire","€1.499","Oder €199 / Monat","Individuelles Premium-Konzept"]
];
const $ = s => document.querySelector(s);
$("#teamGrid").innerHTML = team.map((t,i)=>`<article class="team-card"><div class="eyebrow">AI ROLE ${String(i+1).padStart(2,"0")}</div><h3>${t[0]}</h3><p><b>${t[1]}</b><br>${t[2]}</p><button data-chat="${t[0]}">↗ Mit dieser Rolle sprechen</button></article>`).join("");
$("#pricingGrid").innerHTML = prices.map(p=>`<article class="pricing-card"><h3>${p[0]}</h3><div class="price">${p[1]}</div><p>${p[2]}</p><small>${p[3]}</small></article>`).join("");
document.addEventListener("click",e=>{
 const chat=e.target.closest("[data-chat]");
 if(chat){$("#contactForm").elements.service.value="";$("#contactForm").elements.message.value=`Ich möchte mit ${chat.dataset.chat} über mein Projekt sprechen.`;location.hash="kontakt";}
 const modalBtn=e.target.closest("[data-modal]");
 if(modalBtn) openLegal(modalBtn.dataset.modal);
});
function openLegal(type){
 const content={
 legal:["LEGAL","NEXORA DIGITAL arbeitet nach dem Grundsatz transparenter Kommunikation. Automatisierte Vorschläge ersetzen keine verbindliche Rechts- oder Steuerberatung."],
 privacy:["Datenschutz (DSGVO)","Personenbezogene Daten dürfen nur zweckgebunden, sicher und mit geeigneter Rechtsgrundlage verarbeitet werden. Diese Demo sendet keine Formulardaten an einen Server."],
 terms:["Nutzungsbedingungen (AGB)","Diese Demo-Oberfläche dient der Präsentation. Verbindliche Leistungs-, Zahlungs- und Vertragsbedingungen müssen vor dem Live-Betrieb rechtlich geprüft und veröffentlicht werden."],
 impressum:["Impressum","Angaben gemäß § 5 TMG<br><br>NEXORA Digital<br>Inhaber: Akhmed Ismail Saied<br>Ehndorfer Str. 130<br>24537 Neumünster, Deutschland<br><br>Web: www.nexoraonline.de<br>E-Mail: info@nexoraonline.de<br><br>Hauptsprache: Deutsch."]
 };
 $("#modalTitle").textContent=content[type][0];$("#modalBody").innerHTML=`<p>${content[type][1]}</p>`;$("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false");
}
$("#closeModal").onclick=()=>$("#modal").classList.remove("open");
$("#openVideo").onclick=()=>{$("#videoModal").classList.add("open");$("#videoModal").setAttribute("aria-hidden","false");};
$("#closeVideo").onclick=()=>{ $("#videoModal").classList.remove("open");$("#mainVideo").pause();};
document.querySelector(".menu-toggle").onclick=()=>{const n=document.querySelector(".nav");n.classList.toggle("open");document.querySelector(".menu-toggle").setAttribute("aria-expanded",n.classList.contains("open"));};
$("#contactForm").onsubmit=e=>{e.preventDefault();$("#formStatus").textContent="Danke! Deine Anfrage wurde lokal validiert. Für den echten Versand muss ein sicheres Backend angebunden werden.";};
$("#year").textContent=new Date().getFullYear();
