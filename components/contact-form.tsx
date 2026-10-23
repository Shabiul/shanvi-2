"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/content";

const services = [
  ["12+1 Tempo Traveller", "12+1 Seater Tempo Traveller"],
  ["21+1 Mini Bus", "21+1 Seater Mini Bus"],
  ["25+1 Mini Coach", "25+1 Seater Mini Coach"],
  ["33+1 Touring Bus", "33+1 Seater Touring Bus"],
  ["45+1 Premium Coach", "45+1 Seater Premium Coach"],
  ["49+1 Luxury Bus", "49+1 Seater Luxury Bus"],
  ["Employee Transport", "Corporate Employee Transport"],
  ["Wedding Bus Rental", "Wedding Guest Transport"],
  ["School/College Trip", "School / College Excursion"],
  ["Outstation Tour", "Outstation Vacation Tour"],
  ["Pilgrimage Tour", "Pilgrimage & Temple Circuit"],
  ["Other", "Other Requirement"],
] as const;
const vehicleMap: Record<string, string> = { "12-seater": "12+1 Tempo Traveller", "21-seater": "21+1 Mini Bus", "25-seater": "25+1 Mini Coach", "33-seater": "33+1 Touring Bus", "45-seater": "45+1 Premium Coach", "49-seater": "49+1 Luxury Bus" };

export function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(() => {
    const v = params.get("vehicle");
    const dest = params.get("destination");
    const service = (v && vehicleMap[v]) || (params.get("service") === "wedding" ? "Wedding Bus Rental" : dest ? "Outstation Tour" : "");
    const bits = [dest && `Trip to ${dest.replace(/-/g, " ")}`, params.get("trip") && `${params.get("trip")} package`, params.get("pax") && `${params.get("pax")} passengers`].filter(Boolean);
    return { name: "", phone: "", email: "", service, message: bits.length ? bits.join(", ") + ". " : "", website: "" };
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    const text = ["New enquiry from shanvitoursandtravels.com", "", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email && `Email: ${form.email}`, form.service && `Service: ${form.service}`, `Message: ${form.message}`].filter(Boolean).join("\n");
    window.open(waLink(text), "_blank", "noopener");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const input = "peer w-full rounded-2xl border border-line bg-paper px-4 pb-3 pt-6 text-[15px] font-semibold text-ink outline-none transition placeholder:text-subtle/70 focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10";
  const label = "pointer-events-none absolute left-4 top-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted";

  return (
    <form onSubmit={submit} className="relative rounded-[32px] p-7 card md:p-9" aria-label="Trip enquiry">
      <h2 className="display text-4xl">Send us an <span className="serif text-forest">inquiry</span></h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">Fill out your trip details below. Clicking send immediately formats your requirement into a pre-filled WhatsApp message sent straight to our booking manager.</p>
      <div className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <label className="relative">
          <span className={label}>Full name *</span>
          <input required className={input} value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="relative">
          <span className={label}>Phone *</span>
          <input required type="tel" inputMode="tel" className={input} value={form.phone} onChange={set("phone")} autoComplete="tel" />
        </label>
        <label className="relative sm:col-span-2">
          <span className={label}>Email *</span>
          <input required type="email" className={input} value={form.email} onChange={set("email")} autoComplete="email" />
        </label>
        <label className="relative sm:col-span-2">
          <span className={label}>Service interested in</span>
          <select className={`${input} appearance-none`} value={form.service} onChange={set("service")}>
            <option value="">Select a service category</option>
            {services.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="relative sm:col-span-2">
          <span className={label}>Your requirements *</span>
          <textarea required rows={5} className={`${input} resize-y`} value={form.message} onChange={set("message")} placeholder="Dates, passenger count, pickup locality and destination…" />
        </label>
      </div>
      <button type="submit" className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-wa font-extrabold text-night transition hover:brightness-110" data-cursor="Send">
        <MessageCircle className="h-5 w-5" /> Send via WhatsApp (instant reply)
      </button>
      <AnimatePresence>
        {sent && (
          <motion.p role="status" className="mt-4 rounded-2xl bg-mint px-4 py-3 text-center text-sm font-bold text-forest" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            ✓ WhatsApp opened with your trip details — hit send and we&apos;ll reply fast.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
