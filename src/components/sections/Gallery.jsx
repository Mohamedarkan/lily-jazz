const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef } from "react";
import { Image } from "@/components/ui/image";
import { useI18n } from "@/lib/i18n";

const PRINTS = [
  {
    src: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/ce4e2e89e_generated_9eda999f.png",
    init: { x: 0, y: 0, rotate: -7, z: 4, w: 220 },
  },
  {
    src: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/3532fea97_generated_d23af8be.png",
    init: { x: 150, y: 30, rotate: 5, z: 3, w: 210 },
  },
  {
    src: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/6a32469c5_generated_17d74f79.png",
    init: { x: 60, y: 180, rotate: 9, z: 2, w: 215 },
  },
  {
    src: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/1f12eef1e_generated_e8460b27.png",
    init: { x: 230, y: 200, rotate: -4, z: 1, w: 225 },
  },
];

function DraggablePrint({ print, caption, topZ, bringFront }) {
  const [pos, setPos] = useState({ x: print.init.x, y: print.init.y });
  const [z, setZ] = useState(print.init.z);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    bringFront(print.src, (nz) => setZ(nz));
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const parent = e.currentTarget.parentElement.getBoundingClientRect();
    setPos({
      x: e.clientX - parent.left - offset.current.x,
      y: e.clientY - parent.top - offset.current.y,
    });
  };

  const onPointerUp = (e) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute cursor-grab active:cursor-grabbing touch-none"
      style={{
        left: pos.x,
        top: pos.y,
        width: print.init.w,
        transform: `rotate(${print.init.rotate}deg)`,
        zIndex: z,
        transition: "box-shadow 0.4s ease",
        boxShadow:
          z === topZ
            ? "0 18px 40px -12px rgba(42,24,8,0.45)"
            : "0 8px 20px -10px rgba(42,24,8,0.3)",
      }}
    >
      <div className="p-2.5 pb-8" style={{ background: "#FFFDF4", border: "1px solid rgba(65,38,13,0.12)" }}>
        <Image src={print.src} alt="" fittingType="fill" className="w-full h-48 object-cover" />
        <p className="font-heading italic text-center mt-2" style={{ fontSize: "0.95rem", color: "#5a3d1e" }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useI18n();
  const [topZ, setTopZ] = useState(4);

  const bringFront = (_src, setLocalZ) => {
    const next = topZ + 1;
    setTopZ(next);
    setLocalZ(next);
  };

  return (
    <section id="gallery" className="relative scroll-mt-10 py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color: "#B8860B" }}>
            {t.gallery_kicker}
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>
            {t.gallery_title}
          </h2>
          <p className="mt-4 italic" style={{ color: "#7a5a35", fontSize: "0.98rem" }}>
            {t.gallery_hint}
          </p>
        </div>

        <div className="relative mx-auto ink-texture" style={{ height: "460px", maxWidth: "560px", touchAction: "none" }}>
          {PRINTS.map((p, i) => (
            <DraggablePrint
              key={p.src}
              print={p}
              caption={t.print_captions[i]}
              topZ={topZ}
              bringFront={bringFront}
            />
          ))}
        </div>
      </div>
    </section>
  );
}