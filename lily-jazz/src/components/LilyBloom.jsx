// @ts-nocheck
import React, { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

const PETAL_ORDER = [
  { key: "menu", target: "menu", angle: 36 },
  { key: "gallery", target: "gallery", angle: 108 },
  { key: "location", target: "location", angle: 180 },
  { key: "contact", target: "contact", angle: 252 },
  { key: "story", target: "story", angle: 324 },
];

const PETAL_PATH =
  "M0,0 C -15,-26 -24,-60 -20,-102 C -17,-128 -9,-146 -3,-152 C -1,-154 1,-154 3,-152 C 9,-146 17,-128 20,-102 C 24,-60 15,-26 0,0 Z";

const LABEL_R = 124;

export default function LilyBloom() {
  const { t, lang } = useI18n();
  const [bloomed, setBloomed] = useState(false);
  const [mobileBloomed, setMobileBloomed] = useState(false);

  const isOpen = bloomed || mobileBloomed;

  const goTo = useCallback((target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePetalClick = (e, target) => {
    e.stopPropagation();
    if (!isOpen) {
      setMobileBloomed(true);
      return;
    }
    goTo(target);
  };

  const handlePetalKey = (e, target) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(target);
    }
  };

  const fontStack = lang === "ar" ? '"Amiri", serif' : '"Aref Ruqaa", serif';

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="-180 -185 360 470"
        className="w-[min(78vw,420px)] h-auto select-none"
        role="navigation"
        aria-label={t.hover_hint}
        onMouseEnter={() => setBloomed(true)}
        onMouseLeave={() => setBloomed(false)}
        onClick={() => {
          if (!isOpen) setMobileBloomed(true);
          else setMobileBloomed(false);
        }}
      >
        <defs>
          <radialGradient id="petalGrad" cx="50%" cy="90%" r="75%">
            <stop offset="0%" stopColor="#FFF7E2" stopOpacity="0.96" />
            <stop offset="65%" stopColor="#F6E6A8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D9A600" stopOpacity="0.7" />
          </radialGradient>
          <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#603913" />
            <stop offset="100%" stopColor="#2A1808" />
          </linearGradient>
        </defs>

        <path
          d="M0,-4 C 3,60 -4,120 2,180 C 5,220 -2,250 0,278"
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M0,70 C 30,55 70,60 96,40 C 64,78 30,82 0,82 Z"
          fill="#8A8B5C"
          fillOpacity="0.32"
          stroke="#603913"
          strokeWidth="1.1"
        />
        <path
          d="M0,120 C -32,108 -68,114 -92,96 C -60,128 -30,132 0,130 Z"
          fill="#8A8B5C"
          fillOpacity="0.3"
          stroke="#603913"
          strokeWidth="1.1"
        />

        <g
          style={{ opacity: isOpen ? 0 : 1, transition: "opacity 1.4s ease, transform 1.6s ease", transform: isOpen ? "scale(0.6)" : "scale(1)" }}
        >
          <path
            d="M0,-6 C -13,-26 -19,-72 -9,-118 C -5,-132 -2,-138 0,-140 C 2,-138 5,-132 9,-118 C 19,-72 13,-26 0,-6 Z"
            fill="url(#petalGrad)"
            stroke="#2A1808"
            strokeWidth="1.3"
          />
          <path
            d="M0,-8 C -3,-46 -4,-86 -1,-126"
            fill="none"
            stroke="#603913"
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />
          <path
            d="M0,-40 C -5,-58 -9,-78 -7,-104 M0,-40 C 5,-58 9,-78 7,-104"
            fill="none"
            stroke="#603913"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </g>

        <g className={isOpen ? "petal-group bloomed" : "petal-group"}>
          {PETAL_ORDER.map((p, i) => {
            const a = (p.angle * Math.PI) / 180;
            const lx = LABEL_R * Math.sin(a);
            const ly = -LABEL_R * Math.cos(a);
            const label = t["nav_" + p.key];
            return (
              <g key={p.target}>
                <g
                  className="petal"
                  tabIndex={0}
                  role="link"
                  aria-label={label}
                  onClick={(e) => handlePetalClick(e, p.target)}
                  onKeyDown={(e) => handlePetalKey(e, p.target)}
                  onFocus={() => setBloomed(true)}
                  onBlur={() => setBloomed(false)}
                  style={{
                    transform: `rotate(${isOpen ? p.angle : 0}deg) scale(${isOpen ? 1 : 0.72})`,
                    transitionDelay: `${i * 0.12}s`,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <path
                    d={PETAL_PATH}
                    fill="url(#petalGrad)"
                    stroke="#2A1808"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M0,-8 C -4,-52 -6,-100 -1,-142"
                    fill="none"
                    stroke="#603913"
                    strokeWidth="0.6"
                    strokeOpacity="0.35"
                  />
                  <path
                    d="M0,-46 C -6,-66 -11,-88 -9,-118 M0,-46 C 6,-66 11,-88 9,-118"
                    fill="none"
                    stroke="#603913"
                    strokeWidth="0.45"
                    strokeOpacity="0.26"
                  />
                </g>

                <g className="petal-label" style={{ transitionDelay: `${0.5 + i * 0.12}s` }}>
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    direction={lang === "ar" ? "rtl" : "ltr"}
                    style={{
                      direction: lang === "ar" ? "rtl" : "ltr",
                      unicodeBidi: "bidi-override",
                      fontFamily: fontStack,
                      fontSize: lang === "ar" ? "20px" : "19px",
                      fontStyle: lang === "ar" ? "normal" : "italic",
                      fill: "#41260D",
                      letterSpacing: lang === "ar" ? "0px" : "0.02em",
                    }}
                  >
                    {label}
                  </text>
                </g>
              </g>
            );
          })}

          <g style={{ opacity: isOpen ? 1 : 0, transition: "opacity 1s ease 1s" }}>
            {[
              { d: 4, len: 30, bend: 6 },
              { d: 62, len: 34, bend: -7 },
              { d: 122, len: 28, bend: 8 },
              { d: 181, len: 33, bend: -5 },
              { d: 240, len: 31, bend: 7 },
              { d: 301, len: 27, bend: -8 }
            ].map((s, i) => {
              const r = (s.d * Math.PI) / 180;
              const dirX = Math.sin(r);
              const dirY = -Math.cos(r);
              const perpX = Math.cos(r);
              const perpY = Math.sin(r);
              const ex = s.len * dirX;
              const ey = s.len * dirY;
              const c1x = s.len * 0.45 * dirX + perpX * s.bend;
              const c1y = s.len * 0.45 * dirY + perpY * s.bend;
              const tipX = ex + dirX * 3;
              const tipY = ey + dirY * 3;
              return (
                <g key={i}>
                  <path
                    d={`M0,-2 C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${ex.toFixed(2)},${ey.toFixed(2)} ${tipX.toFixed(2)},${tipY.toFixed(2)}`}
                    fill="none"
                    stroke="#603913"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <ellipse
                    cx={tipX}
                    cy={tipY}
                    rx="2.4"
                    ry="4.2"
                    fill="#D9A600"
                    stroke="#603913"
                    strokeWidth="0.6"
                    opacity="0.9"
                    transform={`rotate(${s.d} ${tipX.toFixed(2)} ${tipY.toFixed(2)})`}
                  />
                </g>
              );
            })}
            <path
              d="M0,-2 C 1.5,-16 2.5,-26 1,-36 C 0.5,-40 -0.5,-40 -1,-36 C -2.5,-26 -1.5,-16 0,-2 Z"
              fill="#F6E6A8"
              stroke="#603913"
              strokeWidth="0.7"
            />
            <ellipse cx="0" cy="-38" rx="3" ry="4.6" fill="#D9A600" stroke="#603913" strokeWidth="0.7" opacity="0.92" />
          </g>
        </g>
      </svg>

      <p
        className="label-caps mt-6 text-center"
        style={{ color: "#8A6B3C", opacity: isOpen ? 0 : 1, transition: "opacity 0.8s ease" }}
      >
        {isOpen ? "" : t.hover_hint}
      </p>
    </div>
  );
}