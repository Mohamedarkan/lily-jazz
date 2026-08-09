const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";

export default function MenuSection() {
  const { t } = useI18n();
  return (
    <section id="menu" className="relative scroll-mt-10 py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color: "#B8860B" }}>
            {t.menu_kicker}
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>
            {t.menu_title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 md:order-1">
            <div className="watercolor-wash absolute inset-0 -m-8 rounded-full" />
            <Image
              src="https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/2e560984d_generated_e887cc40.png"
              alt=""
              fittingType="fit"
              className="relative w-full h-auto max-w-md mx-auto"
            />
          </div>

          <div className="order-1 md:order-2">
            <ul className="space-y-0">
              {t.menu.map((item, i) => (
                <li
                  key={item.name}
                  className="group lift-on-hover py-5"
                  style={{ borderTop: i === 0 ? "1px solid rgba(65,38,13,0.18)" : "none" }}
                >
                  <div className="staff-line mb-5" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="font-heading"
                      style={{ fontSize: "1.7rem", transition: "color 0.5s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#B8860B")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#41260D")}
                    >
                      {item.name}
                    </h3>
                    <span className="font-heading text-xl" style={{ color: "#B8860B" }}>
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-sm mt-1 italic" style={{ color: "#7a5a35", letterSpacing: "0.02em" }}>
                    {item.notes}
                  </p>
                  <span className="label-caps text-[0.62rem] mt-2 inline-block" style={{ color: "#8A8B5C" }}>
                    {item.roast}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}