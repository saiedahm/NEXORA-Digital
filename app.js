
const team = [
["Dr. Mark Weber", "Geschäftsführender CEO", "Strategie, Führung und Vision"],
["Sarah Wagner", "Operations & Executive Assistant", "Abläufe, Koordination und Support"],
["Lena Schmidt", "Management & Kundenempfang", "Erstkontakt, Organisation und Kommunikation"],
["Thomas Hoffmann", "CFO", "Finanzen, Kalkulation und Controlling"],
["RA Matthias Klein", "Legal & GDPR", "Recht, Datenschutz und Compliance"],
["Alexander Kirsch", "UI/UX Design Engineer", "Designsysteme, UX und Prototyping"],
["Yasemin Yilmaz", "KI-Marketing & Advertising", "Kampagnen, Content und Performance"],
["David Miller", "AI Systems Engineer", "Software, Integrationen und KI-Workflows"],
["Michael Schulz", "Infrastructure & Cybersecurity", "Infrastruktur, Sicherheit und Betrieb"]
];

const prices = [
["Website neu", "€499", "Konzeption und neues Website-Design", "ca. 5 Minuten Erstaufnahme"],
["Website + AI Close", "€649", "Website mit Conversion-orientiertem AI-Konzept", ""],
["Website-Update", "€299", "Modernisierung eines bestehenden Auftritts", "ca. 10 Minuten Erstaufnahme"],
["AI-Integration", "€699", "Einbindung intelligenter Workflows", "ca. 15 Minuten Erstaufnahme"],
["Global Multilingual", "€799", "Mehrsprachige Plattform-Konzeption", ""],
["KI-Werbung", "€349 / Monat", "Intelligente Marketing- und Werbeplanung", ""],
["Wartung", "€99 / Monat", "Pflege, Monitoring und Updates", ""],
["VIP Smart Empire", "€1.499", "Oder €199 / Monat", "Individuelles Premium-Konzept"]
];

const $ = (selector) => document.querySelector(selector);

/* =========================================================
AI TEAM
========================================================= */

const teamGrid = $("#teamGrid");

if (teamGrid) {
teamGrid.innerHTML = team.map((member, index) => ` <article class="team-card">

```
  <div class="eyebrow">
    AI ROLE ${String(index + 1).padStart(2, "0")}
  </div>

  <h3>${member[0]}</h3>

  <p>
    <b>${member[1]}</b><br>
    ${member[2]}
  </p>

  <button
    type="button"
    data-chat="${member[0]}"
    data-role="${member[1]}"
    data-description="${member[2]}">
    ↗ Mit dieser Rolle sprechen
  </button>

</article>
```

`).join("");
}

/* =========================================================
PRICING
========================================================= */

const pricingGrid = $("#pricingGrid");

if (pricingGrid) {
pricingGrid.innerHTML = prices.map(price => ` <article class="pricing-card">

```
  <h3>${price[0]}</h3>

  <div class="price">
    ${price[1]}
  </div>

  <p>
    ${price[2]}
  </p>

  <small>
    ${price[3]}
  </small>

</article>
```

`).join("");
}

/* =========================================================
AI CHAT STATE
========================================================= */

let activeAI = null;

function openAIChat(name, role, description) {

const modal = $("#aiChatModal");
const title = $("#aiChatTitle");
const roleElement = $("#aiChatRole");
const messages = $("#aiChatMessages");
const input = $("#aiChatInput");
const avatar = $("#aiAvatar");

if (!modal || !title || !roleElement || !messages) {
console.error("NEXORA AI Chat: Chat-Elemente fehlen.");
return;
}

activeAI = {
name,
role,
description
};

title.textContent = name;
roleElement.textContent = role;

avatar.textContent
