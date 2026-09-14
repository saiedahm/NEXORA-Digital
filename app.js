
 /* =========================================================
   NEXORA DIGITAL
   Main Application JavaScript
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     YEAR
     ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Menü schließen"
          : "Menü öffnen"
      );

    });

    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.setAttribute(
          "aria-label",
          "Menü öffnen"
        );

      });

    });

  }


  /* =======================================================
     AI TEAM
     ======================================================= */

  const teamGrid = document.getElementById("teamGrid");

  const teamMembers = [
    {
      icon: "◈",
      name: "General Manager",
      description:
        "Koordiniert digitale Projekte, Prioritäten, Prozesse und die strategische Ausrichtung."
    },
    {
      icon: "✦",
      name: "Design Agent",
      description:
        "Entwickelt moderne UX/UI-Systeme, visuelle Konzepte und hochwertige digitale Erlebnisse."
    },
    {
      icon: "⌘",
      name: "Development Agent",
      description:
        "Strukturiert und entwickelt performante Websites, Schnittstellen und digitale Systeme."
    },
    {
      icon: "◎",
      name: "Advertising Agent",
      description:
        "Unterstützt bei KI-Werbung, Kampagnenplanung, Content und digitaler Sichtbarkeit."
    },
    {
      icon: "✓",
      name: "QA Agent",
      description:
        "Prüft Funktionen, responsive Verhalten, Benutzererlebnis und technische Qualität."
    },
    {
      icon: "⌁",
      name: "Website Audit Agent",
      description:
        "Analysiert Websites hinsichtlich Performance, Struktur, UX, SEO und Optimierungspotenzial."
    },
    {
      icon: "⚙",
      name: "Automation Agent",
      description:
        "Entwickelt intelligente Workflows zur Reduzierung manueller und wiederkehrender Aufgaben."
    },
    {
      icon: "⌬",
      name: "AI Integration Agent",
      description:
        "Plant und integriert KI-Funktionen in bestehende digitale Prozesse und Plattformen."
    },
    {
      icon: "∞",
      name: "Digital Intelligence Agent",
      description:
        "Verbindet Daten, Automatisierung und intelligente Systeme zu einer skalierbaren digitalen Struktur."
    }
  ];

  if (teamGrid) {

    teamGrid.innerHTML = teamMembers
      .map((member) => `
        <article class="team-card">

          <div class="team-icon" aria-hidden="true">
            ${member.icon}
          </div>

          <h3>${member.name}</h3>

          <p>
            ${member.description}
          </p>

        </article>
      `)
      .join("");

  }


  /* =======================================================
     PRICING
     ======================================================= */

  const pricingGrid =
    document.getElementById("pricingGrid");

  const pricingPlans = [
    {
      name: "START",
      price: "ab 990 €",
      description:
        "Für einen professionellen digitalen Neustart.",
      featured: false,
      badge: "",
      features: [
        "Modernes Website-Konzept",
        "Responsive Design",
        "Basis UX/UI",
        "Kontaktformular",
        "SEO-Grundstruktur",
        "DSGVO-orientierte Struktur"
      ]
    },
    {
      name: "PRO",
      price: "ab 2.490 €",
      description:
        "Für Unternehmen mit höheren digitalen Anforderungen.",
      featured: true,
      badge: "EMPFOHLEN",
      features: [
        "Individuelles Premium Design",
        "Erweiterte UX/UI",
        "AI-Integration",
        "Automatisierte Workflows",
        "Performance-Optimierung",
        "Technisches SEO",
        "Launch-Unterstützung"
      ]
    },
    {
      name: "INTELLIGENCE",
      price: "individuell",
      description:
        "Für komplexe digitale Systeme und KI-Projekte.",
      featured: false,
      badge: "",
      features: [
        "AI-Systemarchitektur",
        "Individuelle Automatisierung",
        "KI-Werbung",
        "API-Integrationen",
        "Digitale Workflows",
        "Monitoring & Optimierung",
        "Individuelle Projektplanung"
      ]
    }
  ];

  if (pricingGrid) {

    pricingGrid.innerHTML = pricingPlans
      .map((plan) => `
        <article class="price-card ${plan.featured ? "featured" : ""}">

          ${
            plan.badge
              ? `<span class="price-badge">${plan.badge}</span>`
              : ""
          }

          <h3>${plan.name}</h3>

          <div class="price">
            ${plan.price}
          </div>

          <p>
            ${plan.description}
          </p>

          <ul class="price-list">
            ${plan.features
              .map(
                (feature) =>
                  `<li>${feature}</li>`
              )
              .join("")}
          </ul>

          <a
            class="btn ${
              plan.featured
                ? "primary"
                : "ghost"
            }"
            href="#kontakt"
          >
            Projekt anfragen
          </a>

        </article>
      `)
      .join("");

  }


  /* =======================================================
     MAIN VIDEO MODAL
     ======================================================= */

  const videoModal =
    document.getElementById("videoModal");

  const openVideo =
    document.getElementById("openVideo");

  const closeVideo =
    document.getElementById("closeVideo");

  const mainVideo =
    document.getElementById("mainVideo");


  function openVideoModal() {

    if (!videoModal) return;

    videoModal.classList.add("active");

    videoModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }


  function closeVideoModal() {

    if (!videoModal) return;

    videoModal.classList.remove("active");

    videoModal.setAttribute(
      "aria-hidden",
      "true"
    );

    if (mainVideo) {
      mainVideo.pause();
    }

    document.body.style.overflow = "";

  }


  if (openVideo) {

    openVideo.addEventListener(
      "click",
      openVideoModal
    );

  }


  if (closeVideo) {

    closeVideo.addEventListener(
      "click",
      closeVideoModal
    );

  }


  if (videoModal) {

    videoModal.addEventListener(
      "click",
      (event) => {

        if (
          event.target === videoModal
        ) {
          closeVideoModal();
        }

      }
    );

  }


  /* =======================================================
     LEGAL MODALS
     ======================================================= */

  const modal =
    document.getElementById("modal");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalBody =
    document.getElementById("modalBody");

  const closeModal =
    document.getElementById("closeModal");


  const legalContent = {

    legal: {
      title: "LEGAL",
      body: `
        <p>
          NEXORA DIGITAL bietet digitale Dienstleistungen
          in den Bereichen Webdesign, KI, Automatisierung
          und digitale Transformation an.
        </p>

        <p>
          Für rechtliche Informationen gelten die auf
          dieser Website veröffentlichten Hinweise,
          Datenschutzinformationen und AGB.
        </p>
      `
    },

    privacy: {
      title: "Datenschutz (DSGVO)",
      body: `
        <p>
          Der Schutz personenbezogener Daten ist uns wichtig.
          Personenbezogene Daten werden nur verarbeitet,
          soweit dies für die Bereitstellung unserer
          Dienstleistungen und die Bearbeitung von Anfragen
          erforderlich ist.
        </p>

        <p>
          Kontaktanfragen werden ausschließlich zur
          Bearbeitung des jeweiligen Projekts verwendet.
        </p>

        <p>
          Eine Weitergabe erfolgt nur, wenn dies gesetzlich
          erforderlich oder für die Durchführung einer
          ausdrücklich angeforderten Dienstleistung notwendig
          ist.
        </p>

        <p>
          Weitere Informationen können in einer vollständigen
          Datenschutzerklärung ergänzt werden.
        </p>
      `
    },

    terms: {
      title: "AGB",
      body: `
        <p>
          Leistungen und Projekte werden individuell zwischen
          NEXORA DIGITAL und dem jeweiligen Auftraggeber
          vereinbart.
        </p>

        <p>
          Umfang, Preise, Fristen und technische Anforderungen
          werden vor Beginn eines Projekts festgelegt.
        </p>

        <p>
          Individuelle Vereinbarungen haben Vorrang vor
          allgemeinen Leistungsbeschreibungen.
        </p>
      `
    },

    impressum: {
      title: "Impressum",
      body: `
        <h3>NEXORA Digital</h3>

        <p>
          Akhmed Ismail Saied
        </p>

        <p>
          Ehndorfer Str. 130<br>
          24537 Neumünster<br>
          Deutschland
        </p>

        <p>
          E-Mail:<br>
          info@nexoraonline.de
        </p>

        <p>
          Website:<br>
          www.nexoraonline.de
        </p>
      `
    }

  };


  function openLegalModal(type) {

    if (
      !modal ||
      !modalTitle ||
      !modalBody ||
      !legalContent[type]
    ) {
      return;
    }

    modalTitle.textContent =
      legalContent[type].title;

    modalBody.innerHTML =
      legalContent[type].body;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeLegalModal() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  document
    .querySelectorAll("[data-modal]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          openLegalModal(
            button.dataset.modal
          );

        }
      );

    });


  if (closeModal) {

    closeModal.addEventListener(
      "click",
      closeLegalModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      (event) => {

        if (
          event.target === modal
        ) {
          closeLegalModal();
        }

      }
    );

  }


  /* =======================================================
     ESC KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      closeVideoModal();
      closeLegalModal();

    }
  );


  /* =======================================================
     CONTACT FORM
     ======================================================= */

  const contactForm =
    document.getElementById("contactForm");

  const formStatus =
    document.getElementById("formStatus");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        if (
          !contactForm.checkValidity()
        ) {

          contactForm.reportValidity();

          return;

        }

        const formData =
          new FormData(contactForm);

        const name =
          String(
            formData.get("name") || ""
          ).trim();

        const email =
          String(
            formData.get("email") || ""
          ).trim();

        const service =
          String(
            formData.get("service") || ""
          ).trim();

        const message =
          String(
            formData.get("message") || ""
          ).trim();

        if (!name || !email || !service || !message) {

          if (formStatus) {

            formStatus.textContent =
              "Bitte fülle alle Pflichtfelder aus.";

            formStatus.style.color =
              "var(--danger)";

          }

          return;

        }


        if (formStatus) {

          formStatus.textContent =
            "Anfrage wurde vorbereitet. Vielen Dank!";

          formStatus.style.color =
            "var(--success)";

        }


        /*
         * E-Mail-Client vorbereiten.
         * Dadurch funktioniert das Formular auch ohne
         * zusätzliches Backend.
         */

        const subject =
          encodeURIComponent(
            `NEXORA Projektanfrage – ${service}`
          );

        const body =
          encodeURIComponent(
`Neue Projektanfrage

Name:
${name}

E-Mail:
${email}

Service:
${service}

Nachricht:
${message}
`
          );

        const mailto =
          `mailto:info@nexoraonline.de?subject=${subject}&body=${body}`;


        /*
         * Kleine Verzögerung, damit der Benutzer
         * die Erfolgsmeldung sehen kann.
         */

        setTimeout(() => {

          window.location.href =
            mailto;

        }, 500);

      }
    );

  }


  /* =======================================================
     LANGUAGE
     ======================================================= */

  const language =
    document.getElementById("language");

  if (language) {

    language.addEventListener(
      "change",
      () => {

        const selected =
          language.value;

        /*
         * Die aktuelle Website ist primär Deutsch.
         * English kann später über ein vollständiges
         * Übersetzungssystem angebunden werden.
         */

        if (selected === "en") {

          alert(
            "The English version is currently being prepared."
          );

          language.value = "de";

        }

      }
    );

  }


  /* =======================================================
     IMAGE FALLBACK
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.style.opacity = "0.35";

          image.style.filter =
            "grayscale(1)";

        }
      );

    });


  /* =======================================================
     SMOOTH ANCHOR SUPPORT
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     READY
     ======================================================= */

  document.documentElement.dataset.nexoraReady =
    "true";

  console.log(
    "NEXORA DIGITAL — Application initialized successfully."
  );

});
