import React from "react";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 lift-on-hover normal-case text-left rounded mx-64"
      style={{
        background: "rgba(255, 247, 226, 0.9)",
        border: "1px solid rgba(65,38,13,0.25)",
        borderRadius: "999px",
        backdropFilter: "blur(4px)"
      }}
      aria-label="Toggle language">
      
      <span
        className="font-heading italic"
        style={{ color: "#41260D", fontSize: "0.95rem" }}>
        
        {lang === "en" ? "العربية" : "English"}
      </span>
      <span style={{ color: "#B8860B", fontSize: "0.7rem" }}>⌃⌃</span>
    </button>);

}