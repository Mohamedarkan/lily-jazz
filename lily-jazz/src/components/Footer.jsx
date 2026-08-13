// @ts-nocheck
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const nav = [
  { label: t.nav_home, id: "home" },
  { label: t.nav_menu, id: "menu" },
  { label: t.nav_story, id: "story" },
  { label: t.nav_gallery, id: "gallery" },
  { label: t.nav_location, id: "location" },
  { label: t.nav_contact, id: "contact" }];

  return (
    <footer className="relative pt-20 pb-12 px-6 overflow-hidden">
      

      

      <div className="max-w-3xl mx-auto text-center -mt-6">
        <p className="font-heading italic text-2xl mb-1" style={{ color: "#41260D" }}>
          LILY Coffee
        </p>
        <p className="label-caps mb-8" style={{ color: "#B8860B" }}>
          {t.footer_tagline}
        </p>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {nav.map((l) =>
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className="fade-link font-heading italic"
            style={{ color: "#5a3d1e", fontSize: "1.05rem" }}>
            
              {l.label}
            </button>
          )}
        </nav>

        <div className="staff-line w-48 mx-auto mb-6" />
        <p style={{ color: "#7a5a35", fontSize: "0.82rem" }}>
          © {new Date().getFullYear()} LILY Coffee · {t.copyright}
        </p>
      </div>
    </footer>);

}