// @ts-nocheck
const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef } from "react";
import { useI18n } from "@/lib/i18n";

const PRINT_DEFAULTS = [
  {
    id: "print-1",
    defaultSrc: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/ce4e2e89e_generated_9eda999f.png",
    init: { x: 0, y: 0, rotate: -7, z: 4, w: 220 },
  },
  {
    id: "print-2",
    defaultSrc: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/3532fea97_generated_d23af8be.png",
    init: { x: 150, y: 30, rotate: 5, z: 3, w: 210 },
  },
  {
    id: "print-3",
    defaultSrc: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/6a32469c5_generated_17d74f79.png",
    init: { x: 60, y: 180, rotate: 9, z: 2, w: 215 },
  },
  {
    id: "print-4",
    defaultSrc: "https://media.db.com/images/public/6a6a340d0a45c76ed60f8a89/1f12eef1e_generated_e8460b27.png",
    init: { x: 230, y: 200, rotate: -4, z: 1, w: 225 },
  },
];

const STORAGE_KEY = "lily-jazz-gallery-uploads";

function DraggablePrint({ print, caption, topZ, bringFront, imageSrc, onImageUpload }) {
  const [pos, setPos] = useState({ x: print.init.x, y: print.init.y });
  const [z, setZ] = useState(print.init.z);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const onPointerDown = (e) => {
    // Only start dragging if not clicking on the image area
    if (e.target.closest(".polaroid-image-area")) return;
    
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    bringFront(print.id, (nz) => setZ(nz));
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        onImageUpload(print.id, base64);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
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
        <div
          className="polaroid-image-area relative w-full h-48 cursor-pointer overflow-hidden group"
          onClick={handleImageClick}
          style={{
            background: imageSrc ? "transparent" : "linear-gradient(135deg, rgba(217,166,0,0.06) 0%, rgba(184,134,11,0.04) 100%)",
          }}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-opacity-20"
              style={{
                background: "rgba(217,166,0,0.08)",
              }}
            >
              <svg
                className="w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-110"
                style={{ color: "rgba(184,134,11,0.5)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span
                className="text-xs font-heading transition-opacity duration-300 group-hover:opacity-75"
                style={{ color: "rgba(184,134,11,0.6)" }}
              >
                Click to add
              </span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload photo"
          />
        </div>

      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useI18n();
  const [topZ, setTopZ] = useState(4);
  const [uploadedImages, setUploadedImages] = useState(() => {
    // Load saved images from localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const bringFront = (_id, setLocalZ) => {
    const next = topZ + 1;
    setTopZ(next);
    setLocalZ(next);
  };

  const handleImageUpload = (printId, base64) => {
    setUploadedImages((prev) => {
      const updated = { ...prev, [printId]: base64 };
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
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
          {PRINT_DEFAULTS.map((p, i) => (
            <DraggablePrint
              key={p.id}
              print={p}
              caption={t.print_captions[i]}
              topZ={topZ}
              bringFront={bringFront}
              imageSrc={uploadedImages[p.id] || p.defaultSrc}
              onImageUpload={handleImageUpload}
            />
          ))}
        </div>
      </div>
    </section>
  );
}