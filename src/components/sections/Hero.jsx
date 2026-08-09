import React from "react";
import LilyBloom from "@/components/LilyBloom";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 scroll-mt-0"
    >
      <div className="text-center mb-2">
        <p className="label-caps" style={{ color: "#B8860B" }}>
          {t.tag_specialty}
        </p>
      </div>

      <LilyBloom />

      <div className="text-center mt-10 max-w-2xl">
        <h1
          className="font-heading leading-[0.95]"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 400 }}
        >
          {t.home_title_1}
          <br />
          <em style={{ color: "#B8860B", fontWeight: 700 }}>{t.home_title_2}</em>
        </h1>
        <div className="staff-line w-40 mx-auto my-7" />
        <p
          className="font-body"
          style={{ color: "#5a3d1e", lineHeight: 1.8, fontSize: "1.06rem", maxWidth: "34rem", margin: "0 auto" }}
        >
          {t.hero_sub}
        </p>
      </div>
    </section>
  );
}