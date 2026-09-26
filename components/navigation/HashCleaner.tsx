"use client";

import { useEffect } from "react";

export function HashCleaner() {
  useEffect(() => {
    const cleanHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);

      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(
            window.history.state,
            "",
            `${window.location.pathname}${window.location.search}`,
          );
        });
      }
    };

    cleanHash();
    window.addEventListener("hashchange", cleanHash);

    return () => window.removeEventListener("hashchange", cleanHash);
  }, []);

  return null;
}
