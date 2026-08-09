const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import letterImg from "@/images/letter.png";

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
          <div className="relative order-2 md:order-1 h-[360px] md:h-[440px]">
            <div className="watercolor-wash absolute inset-0 -m-8 rounded-full" />
            <Image
              src={letterImg}
              alt="Vintage letter with wax seal"
              fittingType="fit"
              className="absolute inset-0 m-auto w-full h-auto max-w-[22rem] object-contain"
            />
          </div>

          <div className="order-1 md:order-2">
            {sent ? (
              <div className="text-center py-12">
                <h3 className="font-heading italic text-3xl mb-3" style={{ color: "#B8860B" }}>
                  {t.thank_title}
                </h3>
                <p style={{ color: "#5a3d1e", lineHeight: 1.8 }}>{t.thank_msg}</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="fade-link mt-6 font-heading italic underline"
                  style={{ color: "#B8860B" }}
                >
                  {t.write_another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label-caps block mb-2" style={{ color: "#7a5a35" }}>
                    {t.form_name}
                  </label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0"
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0"
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
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 resize-none"
                    style={{ borderColor: "rgba(65,38,13,0.3)", color: "#41260D" }}
                  />
                </div>
                <Button
                  type="submit"
                  className="lift-on-hover rounded-none px-8"
                  style={{ background: "transparent", color: "#41260D", border: "1px solid rgba(65,38,13,0.4)", fontWeight: 400 }}
                >
                  <span className="label-caps">{t.form_submit}</span>
                </Button>
              </form>
            )}

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