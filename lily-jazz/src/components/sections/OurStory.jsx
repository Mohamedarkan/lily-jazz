const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";
import journalImg from "@/images/journal.png";

export default function OurStory() {
  const { t } = useI18n();
  return (
    <section id="story" className="relative scroll-mt-10 py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color: "#B8860B" }}>
            {t.story_kicker}
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>
            {t.story_title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <div className="relative">
            <div className="watercolor-wash absolute inset-0 -m-10 rounded-full" />
            <Image
              src={journalImg}
              alt="Open book with coffee, saxophone, and lily illustration"
              fittingType="fit"
              className="relative w-full h-auto max-w-md mx-auto object-contain drop-shadow-sm"
            />
            
            
          </div>

          <div>
            <p
              className="font-heading italic mb-10"
              style={{ fontSize: "1.8rem", lineHeight: 1.5, color: "#3a2410" }}>
              
              {t.story_quote}
            </p>

            <div className="staff-line mb-8" />

            <div
              className="whitespace-pre-line"
              style={{ color: "#5a3d1e", lineHeight: 2, fontSize: "1.02rem" }}>
              
              {t.story_text}
            </div>
          </div>
        </div>
      </div>
    </section>);

}