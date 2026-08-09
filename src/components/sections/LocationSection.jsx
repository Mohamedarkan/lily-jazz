const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Image } from "@/components/ui/image";
import locationImg from "@/images/location.png";
import { useI18n } from "@/lib/i18n";

export default function LocationSection() {
  const { t } = useI18n();
  return (
    <section id="location" className="relative scroll-mt-10 py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color: "#B8860B" }}>
            {t.location_kicker}
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>
            {t.location_title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="relative h-[360px] md:h-[440px]">
            <div className="watercolor-wash absolute inset-0 -m-8 rounded-full" />
            <Image src={locationImg}

            alt="Singing map pin with lilies and music notes"
            fittingType="fit"
            className="absolute inset-0 m-auto w-full h-auto max-w-[22rem] object-contain" />
            
          </div>

          <div>
            <h3 className="font-heading text-3xl mb-3">{t.location_name}</h3>
            <p style={{ color: "#5a3d1e", lineHeight: 1.8, fontSize: "1.02rem" }} className="mb-8">
              {t.location_desc}
            </p>

            <div className="staff-line mb-6" />

            <div className="mb-6">
              <span className="label-caps block mb-1" style={{ color: "#B8860B" }}>
                {t.address_label}
              </span>
              <p style={{ color: "#41260D", lineHeight: 1.7 }}>
                {t.address_line1}
                <br />
                {t.address_line2}
              </p>
            </div>

            <div>
              <span className="label-caps block mb-3" style={{ color: "#B8860B" }}>
                {t.hours_label}
              </span>
              <ul className="space-y-1.5">
                {t.hours.map((h) =>
                <li
                  key={h.day}
                  className="flex justify-between max-w-xs"
                  style={{ color: "#5a3d1e", fontSize: "0.95rem" }}>
                  
                    <span>{h.day}</span>
                    <span className="font-body">{h.time}</span>
                  </li>
                )}
              </ul>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Garden+Lane+Old+Quarter"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-link inline-block mt-8 font-heading italic underline-offset-4"
              style={{ color: "#B8860B", fontSize: "1.1rem", textDecoration: "underline" }}>
              
              {t.open_maps}
            </a>
          </div>
        </div>
      </div>
    </section>);

}