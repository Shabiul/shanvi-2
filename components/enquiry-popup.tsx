"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import Image from "@/components/img";
import { vehicleFor, waLink } from "@/lib/content";

const KEY = "shanvi-enquiry-done";
const SKIP = ["/contact", "/photo-credits"];
const trips = ["Local (8 hr / 80 km)", "Outstation", "Airport transfer", "Wedding", "Corporate / employee", "School / college trip"];

// Enquiry popup shown shortly after landing, once per visit. It only records "done" when the
// visitor sends or closes it, so a remount (e.g. React Strict Mode) can never leave it stuck open.
export function EnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", pax: "", date: "", trip: trips[0], route: "", website: "" });
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (SKIP.includes(pathname)) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const back = document.activeElement as HTMLElement | null;
    const focus = setTimeout(() => first.current?.focus({ preventScroll: true }), 350);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(focus);
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
      back?.focus({ preventScroll: true });
    };
  }, [open]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const pax = Number(f.pax) || 0;
  const suggestion = pax > 0 ? vehicleFor(pax) : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (f.website) return; // honeypot
    const text = [
      "New enquiry from shanvitoursandtravels.com",
      "",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.pax && `Travellers: ${f.pax}${suggestion ? ` (suggested: ${suggestion.seats} ${suggestion.name})` : ""}`,
      f.date && `Travel date: ${f.date}`,
      `Trip: ${f.trip}`,
      f.route && `Pickup / destination: ${f.route}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener");
    setSent(true);
    setTimeout(close, 1800);
  };

  const input = "w-full rounded-xl border border-line bg-paper px-3.5 pb-2.5 pt-6 text-[15px] font-semibold text-ink outline-none transition focus:border-forest focus:bg-white focus:ring-4 focus:ring-forest/10";
  const label = "pointer-events-none absolute left-3.5 top-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted";

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[97] flex items-end justify-center bg-night/45 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            data-lenis-prevent
            className="relative grid max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px] md:grid-cols-[0.8fr_1fr]"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative hidden md:block">
              <Image src="/images/fleet/mini-bus-exterior.jpg" alt="Shanvi Tours & Travels 21+1 Seater Mercedes Mini Bus" fill sizes="320px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80">12+1 to 49+1 seaters</p>
                <p className="display mt-2 text-3xl leading-tight">From ₹4,500 a day</p>
                <p className="mt-2 text-xs text-white/80">Verified drivers · AIS-140 GPS · GST invoices</p>
              </div>
            </div>

            <form onSubmit={submit} className="p-6 sm:p-8" aria-label="Quick trip enquiry">
              <button type="button" onClick={close} aria-label="Close enquiry form" className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-sand text-ink transition hover:bg-mint">
                <X className="h-5 w-5" />
              </button>
              <p className="eyebrow">Free quote in minutes</p>
              <h2 id="enquiry-title" className="display mt-3 pr-10 text-[2rem] leading-tight">
                Plan your <span className="serif">group trip</span>
              </h2>
              <p className="mt-2 text-sm text-muted">Tell us the basics — our 24/7 dispatch desk replies on WhatsApp with a fixed quote.</p>

              <div className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden>
                <label htmlFor="enquiry-website">Website</label>
                <input id="enquiry-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <label className="relative col-span-2 sm:col-span-1">
                  <span className={label}>Name *</span>
                  <input ref={first} required className={input} value={f.name} onChange={set("name")} autoComplete="name" />
                </label>
                <label className="relative col-span-2 sm:col-span-1">
                  <span className={label}>Phone *</span>
                  <input required type="tel" inputMode="tel" className={input} value={f.phone} onChange={set("phone")} autoComplete="tel" />
                </label>
                <label className="relative">
                  <span className={label}>Travellers</span>
                  <input type="number" min={1} max={200} inputMode="numeric" className={input} value={f.pax} onChange={set("pax")} />
                </label>
                <label className="relative">
                  <span className={label}>Travel date</span>
                  <input type="date" className={input} value={f.date} onChange={set("date")} />
                </label>
                <label className="relative col-span-2">
                  <span className={label}>Trip type</span>
                  <select className={input} value={f.trip} onChange={set("trip")}>
                    {trips.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="relative col-span-2">
                  <span className={label}>Pickup &amp; destination</span>
                  <input className={input} value={f.route} onChange={set("route")} placeholder="e.g. Whitefield to Coorg" />
                </label>
              </div>

              {suggestion && (
                <p className="mt-3 rounded-xl bg-mint px-3.5 py-2.5 text-xs font-bold text-forest">
                  For {pax} traveller{pax > 1 ? "s" : ""}: {suggestion.seats} {suggestion.name}, from ₹{suggestion.local.toLocaleString("en-IN")} / day
                </p>
              )}

              <button type="submit" className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest py-4 font-extrabold text-white transition hover:bg-forest-2">
                {sent ? "Opening WhatsApp…" : "Get my quote on WhatsApp"} <Send className="h-4 w-4" />
              </button>
              <button type="button" onClick={close} className="mt-2 w-full py-3 text-sm font-bold text-muted hover:text-ink">
                No thanks, I&apos;ll browse first
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
