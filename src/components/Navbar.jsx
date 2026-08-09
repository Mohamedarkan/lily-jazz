import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav_home, id: "home" },
    { label: t.nav_menu, id: "menu" },
    { label: t.nav_location, id: "location" },
    { label: t.nav_gallery, id: "gallery" }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,247,226,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(65,38,13,0.12)" : "1px solid transparent"
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 fade-link shrink-0"
          aria-label="LILY Coffee home"
        >
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
            <g fill="none" stroke="#41260D" strokeWidth="1.8" strokeLinecap="round">
              <path d="M20 36 C 20 28 20 26 20 18" />
              <path d="M20 18 C 10 14 8 8 14 4" />
              <path d="M20 18 C 30 14 32 8 26 4" />
              <path d="M20 18 C 12 18 6 20 4 26" />
              <path d="M20 18 C 28 18 34 20 36 26" />
            </g>
            <circle cx="20" cy="18" r="3" fill="#D9A600" stroke="#41260D" strokeWidth="1.2" />
          </svg>
          <span className="font-heading italic text-xl hidden xs:inline" style={{ color: "#41260D" }}>
            LILY
          </span>
        </button>

        <nav className="flex items-center gap-3 sm:gap-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="fade-link font-heading italic whitespace-nowrap"
              style={{ color: "#5a3d1e", fontSize: "0.9rem" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="fade-link lift-on-hover flex items-center gap-1.5 px-3 py-1.5 whitespace-nowrap"
            style={{
              background: "rgba(255, 247, 226, 0.9)",
              border: "1px solid rgba(65,38,13,0.25)",
              borderRadius: "999px",
              backdropFilter: "blur(4px)",
              color: "#41260D"
            }}
            aria-label="Toggle language"
          >
            <span className="font-heading italic" style={{ fontSize: "0.85rem" }}>
              {lang === "en" ? "العربية" : "English"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}