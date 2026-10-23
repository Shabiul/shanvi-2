"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CalendarDays, MapPin, Minus, Navigation, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { vehicleFor, waLink } from "@/lib/content";

const tabs = ["Outstation", "Local", "Airport", "Wedding"] as const;

export function BookingWidget({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Outstation");
  const [pax, setPax] = useState(18);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [sent, setSent] = useState(false);
  const v = vehicleFor(pax);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "New enquiry from shanvitoursandtravels.com",
      "",
      `Trip: ${tab}`,
      `Travellers: ${pax} (suggested: ${v.seats} ${v.name})`,
      from && `Pickup: ${from}`,
      to && tab !== "Local" && `Destination: ${to}`,
      date && `Date: ${date}`,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
    setTimeout(() => setSent(false), 2600);
  };

  const field = "flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 transition-colors focus-within:bg-sand hover:bg-paper";
  const label = "block text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted";
  const input = "w-full min-w-0 bg-transparent text-[15px] font-bold text-ink placeholder:text-subtle/70 focus:outline-none";

  return (
    <form onSubmit={submit} className={`relative rounded-[28px] p-2.5 border border-line bg-white shadow-[0_30px_80px_-40px_rgb(20_33_28/0.35)] ${className}`} aria-label="Quick fare enquiry">
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-2 pt-1">
        <div role="tablist" aria-label="Trip type" className="flex rounded-full bg-sand p-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative min-h-10 rounded-full px-3.5 py-2 text-xs font-extrabold transition-colors sm:px-4 ${tab === t ? "text-white" : "text-muted hover:text-ink"}`}
            >
              {tab === t && <motion.span layoutId="booking-tab" className="absolute inset-0 rounded-full bg-forest" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={v.id}
            className="hidden items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-extrabold text-forest sm:inline-flex"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Best fit: {v.seats} {v.name}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto]">
        <label className={field}>
          <MapPin className="h-5 w-5 shrink-0 text-forest" />
          <span className="min-w-0 flex-1">
            <span className={label}>Pickup</span>
            <input className={input} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Whitefield, Bangalore" autoComplete="address-level2" />
          </span>
        </label>
        <label className={field}>
          <Navigation className="h-5 w-5 shrink-0 text-forest" />
          <span className="min-w-0 flex-1">
            <span className={label}>{tab === "Local" ? "Hours needed" : tab === "Airport" ? "Terminal / drop" : "Destination"}</span>
            <input className={input} value={to} onChange={(e) => setTo(e.target.value)} placeholder={tab === "Local" ? "8 hr / 80 km" : tab === "Airport" ? "Kempegowda (BLR)" : tab === "Wedding" ? "Palace Grounds" : "Coorg, Ooty, Tirupati…"} />
          </span>
        </label>
        <label className={field}>
          <CalendarDays className="h-5 w-5 shrink-0 text-forest" />
          <span className="min-w-0 flex-1">
            <span className={label}>Date</span>
            <input type="date" className={input} value={date} onChange={(e) => setDate(e.target.value)} />
          </span>
        </label>
        <div className={field}>
          <span className="min-w-0 flex-1">
            <span className={label}>Travellers</span>
            <span className="mt-0.5 flex items-center gap-3">
              <button type="button" aria-label="Fewer travellers" onClick={() => setPax((p) => Math.max(1, p - 1))} className="grid h-10 w-10 place-items-center rounded-full bg-sand hover:bg-mint">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <output aria-live="polite" className="w-8 text-center text-lg font-extrabold tabular-nums">{pax}</output>
              <button type="button" aria-label="More travellers" onClick={() => setPax((p) => Math.min(200, p + 1))} className="grid h-10 w-10 place-items-center rounded-full bg-sand hover:bg-mint">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </span>
          </span>
        </div>
        <button type="submit" className="group relative m-1 flex h-[60px] items-center justify-center gap-2 overflow-hidden rounded-[20px] bg-forest px-7 transition-colors hover:bg-forest-2 font-extrabold text-white sm:col-span-2 lg:col-span-1" data-cursor="Go">
          <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Get fare on WhatsApp</span>
        </button>
      </div>
      <p className="px-3 pb-1 pt-2 text-[11px] text-muted">
        Sends your trip details to us on WhatsApp. See our{" "}
        <Link href="/privacy-policy" className="inline-block py-1.5 font-bold text-forest underline decoration-forest/30 underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>

      <AnimatePresence>
        {sent && (
          <motion.div
            role="status"
            className="absolute -top-14 left-1/2 rounded-full bg-forest px-5 py-2.5 text-sm font-extrabold text-white shadow-xl"
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
          >
            ✓ Opening WhatsApp with your trip details
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
