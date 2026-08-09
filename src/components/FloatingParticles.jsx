// @ts-nocheck
import React, { useEffect, useRef } from "react";

/**
 * Canvas-based floating atmosphere: coffee beans, lily petals, leaves,
 * musical notes, tiny saxophones — drifting like leaves in warm air.
 * Subtle parallax away from the cursor. Respects prefers-reduced-motion.
 */
export default function FloatingParticles() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const palette = ["#603913", "#D9A600", "#8A8B5C", "#2A1808"];

    const types = ["bean", "petal", "leaf", "note", "sax"];
    const weights = [0.34, 0.24, 0.2, 0.16, 0.06];

    function pickType() {
      const r = Math.random();
      let acc = 0;
      for (let i = 0; i < types.length; i++) {
        acc += weights[i];
        if (r <= acc) return types[i];
      }
      return types[0];
    }

    const COUNT = reduce ? 8 : Math.min(26, Math.floor((w * h) / 90000));
    const particles = Array.from({ length: COUNT }).map(() => {
      const t = pickType();
      return {
        type: t,
        x: Math.random() * w,
        y: Math.random() * h,
        size: 7 + Math.random() * 14,
        speed: 0.08 + Math.random() * 0.22,
        drift: (Math.random() - 0.5) * 0.18,
        swayAmp: 6 + Math.random() * 14,
        swaySpeed: 0.0004 + Math.random() * 0.0008,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0009,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.18 + Math.random() * 0.28,
      };
    });

    let t0 = performance.now();

    function drawParticle(p, time) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = 1.1;
      const s = p.size;

      if (p.type === "bean") {
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.6, s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.5, 0, 0, s);
        ctx.stroke();
      } else if (p.type === "petal") {
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.2, -s * 0.5, -s, 0, -s);
        ctx.bezierCurveTo(s * 0.5, -s, s * 0.7, s * 0.2, 0, s);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.fill();
        ctx.globalAlpha = p.alpha;
        ctx.stroke();
      } else if (p.type === "leaf") {
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.8, 0, 0, s);
        ctx.quadraticCurveTo(-s * 0.8, 0, 0, -s);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.45;
        ctx.fill();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.stroke();
      } else if (p.type === "note") {
        // eighth note
        ctx.beginPath();
        ctx.ellipse(-s * 0.3, s * 0.5, s * 0.4, s * 0.3, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(s * 0.05, s * 0.45);
        ctx.lineTo(s * 0.05, -s);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.05, -s);
        ctx.quadraticCurveTo(s * 0.8, -s * 0.6, s * 0.6, 0);
        ctx.stroke();
      } else if (p.type === "sax") {
        // tiny saxophone bell
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s * 0.3);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(0, s * 0.6, s * 0.55, s * 0.4, 0, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.fill();
        ctx.globalAlpha = p.alpha;
        ctx.stroke();
      }
      ctx.restore();
    }

    function frame(now) {
      const dt = now - t0;
      t0 = now;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // gentle vertical rise + sway
        p.y -= p.speed * (dt / 16);
        p.x += p.drift * (dt / 16) + Math.sin(now * p.swaySpeed + p.phase) * 0.25;
        p.rot += p.rotSpeed * dt;

        // parallax away from cursor
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 160 * 160) {
          const f = (1 - Math.sqrt(dist2) / 160) * 0.8;
          p.x += (dx / Math.sqrt(dist2 || 1)) * f;
          p.y += (dy / Math.sqrt(dist2 || 1)) * f;
        }

        // wrap
        if (p.y < -40) {
          p.y = h + 40;
          p.x = Math.random() * w;
        }
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;

        drawParticle(p, now);
      }
      rafRef.current = requestAnimationFrame(frame);
    }

    if (reduce) {
      // render a single static frame
      particles.forEach((p) => drawParticle(p, 0));
    } else {
      rafRef.current = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}