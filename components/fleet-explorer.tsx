"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Users } from "lucide-react";
import { fleet, vehicleFor, type Vehicle } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const inr = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);

export function SeatMap({ v, filled, compact = false }: { v: Vehicle; filled: number; compact?: boolean }) {
  let seat = 0;
  const cols = Math.max(...v.layout.map((r) => r.length));
  return (
    <div className={`relative mx-auto w-full rounded-[38px] border-2 border-line bg-paper p-4 pt-14 ${compact ? "max-w-[170px] sm:max-w-[230px]" : "max-w-[220px] sm:max-w-[280px]"}`} role="img" aria-label={`${v.seats} seat layout: ${Math.min(filled, v.capacity)} of ${v.capacity} seats filled`}>
      {/* windshield + driver */}
      <div aria-hidden className="absolute inset-x-6 top-3 h-2.5 rounded-full bg-gradient-to-r from-forest/15 via-forest/30 to-forest/15" />
      <div aria-hidden className="absolute right-6 top-7 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-muted">
        Driver <span className="h-5 w-5 rounded-md bg-ink/15" />
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {v.layout.flatMap((row, ri) =>
          row.split("").map((c, ci) => {
            if (c === "_") return <span key={`${ri}-${ci}`} aria-hidden />;
            const idx = seat++;
            const on = idx < filled;
            return (
              <motion.span
                key={`${v.id}-${ri}-${ci}`}
                aria-hidden
                className="relative aspect-[1/1.05] rounded-t-[9px] rounded-b-[5px] border"
                initial={false}
                animate={{
                  backgroundColor: on ? "rgb(15 91 70)" : "rgb(255 255 255)",
                  borderColor: on ? "rgb(10 70 54)" : "rgb(20 33 28 / 0.18)",
                  scale: on ? [0.6, 1.12, 1] : 1,
                }}
                transition={{ duration: 0.45, delay: on ? Math.min(idx, 50) * 0.018 : 0, ease: EASE }}
              />
            );
          }),
        )}
      </div>
      <div aria-hidden className="mt-3 h-1.5 rounded-full bg-sand" />
    </div>
  );
}

export function FleetExplorer() {
  const [pax, setPax] = useState(18);
  const active = vehicleFor(pax);
  const [photo, setPhoto] = useState({ id: active.id, i: 0 });
  const img = photo.id === active.id ? photo.i : 0;
  const setImg = (i: number) => setPhoto({ id: active.id, i });

  useEffect(() => {
    const t = setInterval(() => setPhoto((p) => ({ id: active.id, i: ((p.id === active.id ? p.i : 0) + 1) % active.images.length })), 4200);
    return () => clearInterval(t);
  }, [active]);

  const over = pax > active.capacity + 1;
  const pct = ((pax - 1) / 49) * 100;
  const slug = `${active.id}-seater`;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.25fr_0.8fr] lg:gap-5">
      {/* Controls */}
      <div className="flex flex-col rounded-[30px] p-7 card">
        <p className="text-sm font-bold text-muted">How many people are travelling?</p>
        <div className="mt-2 flex items-end gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.output
              key={pax}
              className="display text-[7rem] leading-[0.8] text-forest tabular-nums"
              initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {pax}
            </motion.output>
          </AnimatePresence>
          <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-muted">
            <Users className="h-4 w-4" /> travellers
          </span>
        </div>
        <div className="relative mt-8">
          <div className="h-2 rounded-full bg-sand">
            <div className="h-2 rounded-full bg-forest" style={{ width: `${pct}%` }} />
          </div>
          <input
            type="range"
            min={1}
            max={50}
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            aria-label="Number of travellers"
            className="absolute inset-0 -top-4 h-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-forest [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-forest [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgb(15_91_70/0.18)]"
          />
          <div className="mt-3 flex justify-between text-[11px] font-bold text-subtle">
            <span>1</span>
            <span>12</span>
            <span>21</span>
            <span>33</span>
            <span>50</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2">
          {fleet.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setPax(Math.min(Math.max(pax, v.minPax), v.maxPax))}
              className={`relative rounded-2xl border px-4 py-3 text-left transition-colors ${active.id === v.id ? "border-forest/60 text-ink" : "border-line text-muted hover:border-ink/30 hover:text-ink"}`}
            >
              {active.id === v.id && <motion.span layoutId="fleet-tab" className="absolute inset-0 rounded-2xl bg-mint" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="display relative block text-3xl">{v.seats.replace(" Seater", "")}</span>
              <span className="relative text-xs font-bold">{v.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-subtle">Every class: dual AC, AIS-140 GPS &amp; speed governor, pushback seats, verified driver.</p>
      </div>

      {/* Stage */}
      <div data-vehicle={active.id} className="relative flex flex-col overflow-hidden rounded-[30px] border border-line bg-white shadow-[0_18px_40px_-28px_rgb(20_33_28/0.25)]">
        <div className="relative h-64 shrink-0 bg-sand sm:h-80 lg:h-[330px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id + img}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Image src={active.images[img].src} alt={active.images[img].alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night/30 to-transparent" />
        </div>
        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
          {active.tag ? <span className="rounded-full bg-forest px-3.5 py-1.5 text-xs font-extrabold text-white">{active.tag}</span> : <span />}
          {active.plate && <span className="rounded-md border-2 border-ink bg-[#ffd84d] px-2.5 py-1 font-mono text-xs font-bold text-ink">{active.plate}</span>}
        </div>
        <div className="relative flex flex-1 flex-col p-6 md:p-7">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-forest">{active.chassis}</p>
              <h3 className="display mt-2 text-[clamp(2rem,3.2vw,3rem)] text-ink">
                {active.seats} <span className="serif text-forest">{active.name}</span>
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-forest">
                    <Check className="h-3.5 w-3.5 text-forest" /> {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-auto flex gap-1.5 pt-3">
            {active.images.map((_, i) => (
              <button key={i} type="button" onClick={() => setImg(i)} aria-label={`Show photo ${i + 1}`} className="flex h-8 flex-1 items-center">
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-sand">
                  {i === img && <motion.span key={active.id + img} className="block h-full bg-forest" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4.2, ease: "linear" }} />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seat map + price */}
      <div className="flex flex-col rounded-[30px] p-6 card">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-muted">Live seat map</p>
        <div className="mt-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45, ease: EASE }}>
              <SeatMap v={active} filled={pax} compact />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className={`mt-4 text-center text-sm font-bold ${over ? "text-forest" : "text-muted"}`} aria-live="polite">
          {over ? `${pax} travellers — pair vehicles for a convoy` : `${Math.min(pax, active.capacity)} of ${active.capacity} seats · ${Math.max(active.capacity - pax, 0)} spare`}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl bg-sand p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-widest text-subtle">Local {active.localLabel}</dt>
            <dd className="mt-1 text-lg font-extrabold text-ink">{inr(active.local)}</dd>
          </div>
          <div className="rounded-2xl bg-sand p-3">
            <dt className="text-[10px] font-extrabold uppercase tracking-widest text-subtle">Outstation</dt>
            <dd className="mt-1 text-lg font-extrabold text-ink">
              ₹{active.rateMin}–{active.rateMax}
              <span className="text-xs text-muted">/km</span>
            </dd>
          </div>
        </dl>
        <div className="mt-4 grid gap-2">
          <Link href={`/contact?vehicle=${slug}&pax=${pax}`} className="flex h-12 items-center justify-center gap-2 rounded-full bg-forest text-sm font-extrabold text-white transition-colors hover:bg-forest-2">
            Book the {active.seats.replace(" Seater", "")} <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href={active.page ?? `/fleet#${active.anchor}`} className="flex h-12 items-center justify-center rounded-full border border-line text-sm font-extrabold text-ink hover:bg-sand">
            Full specs &amp; photos
          </Link>
        </div>
      </div>
    </div>
  );
}
