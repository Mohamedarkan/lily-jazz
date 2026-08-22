const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import letterImg from "@/images/letter.png";
import paperImg from "@/images/paper-lily.png";

// Stage machine: idle (paper open, form usable) -> writing (squiggles draw
// on send) -> folding (paper settles into the envelope) -> sent (success).
// "error" is not a distinct visual stage — it's idle plus a message, so the
// form never becomes unusable while showing a validation note.
const WRITE_STROKE_COUNT = 5;
const WRITE_STROKE_DURATION_MS = 700;
const WRITE_STROKE_STAGGER_MS = 260;
const FOLD_DELAY_MS = WRITE_STROKE_STAGGER_MS * (WRITE_STROKE_COUNT - 1) + WRITE_STROKE_DURATION_MS + 350;
const FOLD_DURATION_MS = 900;

// Cartoon "handwriting" strokes: wavy paths standing in for lines of text,
// never the user's real content (see design discussion — real text rendered
// in script type is illegible and risks looking like a transcription error,
// worst of all on an email address). Positioned to sit on the paper's
// pre-printed rule lines and stay clear of the botanical sprig bottom-right.
const STROKE_PATHS = [
  "M 40 20 Q 70 8, 100 20 T 160 20 T 210 18",
  "M 40 20 Q 65 30, 95 18 T 150 22 T 195 19 T 235 21",
  "M 40 20 Q 60 10, 90 22 T 140 17 T 180 22",
  "M 40 20 Q 75 28, 110 15 T 165 23 T 200 18 T 220 20",
  "M 40 20 Q 55 14, 85 24 T 130 16 T 160 21",
];

export default function Contact() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const statusId = useId();

  const [stage, setStage] = useState("idle"); // idle | writing | folding | sent
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldError, setFieldError] = useState(null); // 'name' | 'email' | 'message' | null
  const submittingRef = useRef(false); // belt-and-suspenders guard alongside stage checks

  const validate = () => {
    if (!form.name.trim()) return "name";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) return "email";
    if (!form.message.trim()) return "message";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submittingRef.current || stage !== "idle") return; // no duplicate submissions mid-animation

    const problem = validate();
    if (problem) {
      setFieldError(problem);
      return;
    }

    setFieldError(null);
    submittingRef.current = true;
    setStage("writing");

    const foldDelay = reduceMotion ? 0 : FOLD_DELAY_MS;
    window.setTimeout(() => {
      setStage("folding");
      const foldDuration = reduceMotion ? 0 : FOLD_DURATION_MS;
      window.setTimeout(() => {
        setStage("sent");
        submittingRef.current = false;
      }, foldDuration);
    }, foldDelay);
  };

  const resetForm = () => {
    setStage("idle");
    setForm({ name: "", email: "", message: "" });
    setFieldError(null);
  };

  const errorCopy =
    fieldError === "name"
      ? t.form_error_name
      : fieldError === "email"
      ? t.form_error_email
      : fieldError === "message"
      ? t.form_error_message
      : null;

  const isFormLocked = stage !== "idle"; // fields stay visible but inert once sending begins

  return (
    <section id="contact" className="relative scroll-mt-10 py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label-caps mb-4" style={{ color: "#B8860B" }}>
            {t.contact_kicker}
          </p>
          <h2 className="font-heading" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)" }}>
            {t.contact_title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Visual column: open paper by default, envelope receives it on send */}
          <div className="relative order-2 md:order-1 h-[420px] md:h-[500px]">
            <div className="watercolor-wash absolute inset-0 -m-8 rounded-full" />

            {/* Envelope: absent until the user sends — mounts only once
                folding begins, fades/scales in as the paper fades/shrinks
                out, so the two read as one thing morphing into the other. */}
            <AnimatePresence>
              {(stage === "folding" || stage === "sent") && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: [0.85, 1.04, 1] }}
                  transition={{ duration: reduceMotion ? 0 : FOLD_DURATION_MS / 1000, ease: "easeOut" }}
                >
                  <Image
                    src={letterImg}
                    alt="Vintage envelope with wax seal"
                    fittingType="fit"
                    className="w-full h-auto max-w-[20rem] object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Paper: the only thing visible on load. Animates away once the
                user sends, revealing the envelope underneath/in its place. */}
            <AnimatePresence>
              {stage !== "sent" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={
                    stage === "folding"
                      ? { x: "-140%", y: 0, opacity: 0 }
                      : { x: 0, y: 0, opacity: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : FOLD_DURATION_MS / 1000,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div className="relative w-full max-w-[100rem]">
                    <Image
                      src={paperImg}
                      alt="Open sheet of parchment paper"
                      fittingType="fit"
                      className="w-full h-auto object-contain"
                    />
                    {/* Cartoon squiggle strokes, absolutely positioned over the
                        paper's printed rule lines. viewBox is tuned to the
                        paper's visible content area, not the full padded PNG. */}
                    <svg
                      viewBox="0 0 300 220"
                      className="absolute pointer-events-none"
                      style={{ top: "14%", left: "12%", width: "76%", height: "58%" }}
                      aria-hidden="true"
                    >
                      {STROKE_PATHS.map((d, i) => (
                        <path
                          key={i}
                          d={d}
                          transform={`translate(0, ${i * 34})`}
                          fill="none"
                          stroke="#41260D"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className={`letter-stroke ${stage === "writing" || stage === "folding" || stage === "sent" ? "is-writing" : ""}`}
                          style={{
                            "--stroke-len": 260,
                            "--stroke-delay": `${(i * WRITE_STROKE_STAGGER_MS) / 1000}s`,
                            animationDuration: reduceMotion ? "0s" : `${WRITE_STROKE_DURATION_MS / 1000}s`,
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form column */}
          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait">
              {stage === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  className="text-center py-12"
                  role="status"
                >
                  <h3 className="font-heading italic text-3xl mb-3" style={{ color: "#B8860B" }}>
                    {t.thank_title}
                  </h3>
                  <p style={{ color: "#5a3d1e", lineHeight: 1.8 }}>{t.thank_msg}</p>
                  <button
                    onClick={resetForm}
                    className="fade-link mt-6 font-heading italic underline"
                    style={{ color: "#B8860B" }}
                  >
                    {t.write_another}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <label className="label-caps block mb-2" style={{ color: "#7a5a35" }}>
                      {t.form_name}
                    </label>
                    <Input
                      required
                      disabled={isFormLocked}
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (fieldError === "name") setFieldError(null);
                      }}
                      aria-invalid={fieldError === "name"}
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 disabled:opacity-60"
                      style={{ borderColor: "rgba(65,38,13,0.3)", color: "#41260D" }}
                    />
                  </div>
                  <div>
                    <label className="label-caps block mb-2" style={{ color: "#7a5a35" }}>
                      {t.form_email}
                    </label>
                    <Input
                      type="email"
                      required
                      disabled={isFormLocked}
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (fieldError === "email") setFieldError(null);
                      }}
                      aria-invalid={fieldError === "email"}
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 disabled:opacity-60"
                      style={{ borderColor: "rgba(65,38,13,0.3)", color: "#41260D" }}
                    />
                  </div>
                  <div>
                    <label className="label-caps block mb-2" style={{ color: "#7a5a35" }}>
                      {t.form_message}
                    </label>
                    <Textarea
                      required
                      rows={4}
                      disabled={isFormLocked}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        if (fieldError === "message") setFieldError(null);
                      }}
                      aria-invalid={fieldError === "message"}
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 resize-none disabled:opacity-60"
                      style={{ borderColor: "rgba(65,38,13,0.3)", color: "#41260D" }}
                    />
                  </div>

                  {/* Validation message: muted terracotta, never harsh red */}
                  <AnimatePresence>
                    {errorCopy && (
                      <motion.p
                        initial={{ opacity: 0, x: reduceMotion ? 0 : -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: "#B15E3E", fontSize: "0.88rem" }}
                        role="alert"
                      >
                        {errorCopy}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    disabled={isFormLocked}
                    className="lift-on-hover rounded-none px-8 disabled:opacity-60 disabled:pointer-events-none"
                    style={{ background: "transparent", color: "#41260D", border: "1px solid rgba(65,38,13,0.4)", fontWeight: 400 }}
                  >
                    <span className="label-caps">{t.form_submit}</span>
                  </Button>

                  {/* Live region for screen readers — mirrors visual stage without exposing decorative markup */}
                  <p id={statusId} className="sr-only" role="status" aria-live="polite">
                    {stage === "writing" ? t.form_status_writing : stage === "folding" ? t.form_status_sending : ""}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="staff-line my-8" />
            <div className="flex flex-col gap-1" style={{ color: "#5a3d1e", fontSize: "0.92rem" }}>
              <a href="mailto:caniro5459@lanvos.com" className="fade-link w-fit">
                {t.contact_email}
              </a>
              <span>{t.contact_phone}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
