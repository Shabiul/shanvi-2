"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";
import { fleet, waLink } from "@/lib/content";
import { AnimatedNumber } from "./motion";

type Mode = "outstation" | "local";

function Slider({ label, value, min, max, step = 1, unit, onChange }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (n: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-bold text-muted">
        {label}
        <span className="text-xl font-extrabold text-ink tabular-nums">
          {new Intl.NumberFormat("en-IN").format(value)} <span className="text-xs text-muted">{unit}</span>
        </span>
      </span>
      <span className="relative mt-3 block h-2 rounded-full bg-ink/10">
        <span className="absolute inset-y-0 left-0 rounded-full bg-forest" style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute -top-4 left-0 h-10 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-forest [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-forest [&::-webkit-slider-thumb]:shadow-md"
        />
      </span>
    </label>
  );
}

export function FareCalculator() {
  const [vid, setVid] = useState<string>("21");
  const [mode, setMode] = useState<Mode>("outstation");
  const [km, setKm] = useState(600);
  const [days, setDays] = useState(2);
  const [xkm, setXkm] = useState(0);
  const [xhr, setXhr] = useState(0);
  const v = fleet.find((f) => f.id === vid)!;

  const chargeKm = Math.max(km, 300 * days);
  const bata = v.bata * days;
  const low = mode === "outstation" ? chargeKm * v.rateMin + bata : v.local + xkm * v.extraKm + xhr * v.extraHr;
  const high = mode === "outstation" ? chargeKm * v.rateMax + bata : low;

  const rows =
    mode === "outstation"
      ? [
          [`Chargeable distance${chargeKm > km ? " (300 km/day minimum)" : ""}`, `${new Intl.NumberFormat("en-IN").format(chargeKm)} km`],
          ["Rate", `₹${v.rateMin}–${v.rateMax} / km`],
          [`Driver bata × ${days} day${days > 1 ? "s" : ""}`, `₹${new Intl.NumberFormat("en-IN").format(bata)}`],
        ]
      : [
          [`Local package (${v.localLabel})`, `₹${new Intl.NumberFormat("en-IN").format(v.local)}`],
          [`Extra ${xkm} km × ₹${v.extraKm}`, `₹${new Intl.NumberFormat("en-IN").format(xkm * v.extraKm)}`],
          [`Extra ${xhr} hr × ₹${v.extraHr}`, `₹${new Intl.NumberFormat("en-IN").format(xhr * v.extraHr)}`],
        ];

  const msg = [
    "Hi Shanvi Tours, I used the fare estimator:",
    `Vehicle: ${v.seats} ${v.name}`,
    mode === "outstation" ? `Outstation: ${km} km over ${days} day(s)` : `Local: ${v.localLabel} + ${xkm} km + ${xhr} hr`,
    `Estimate: ₹${new Intl.NumberFormat("en-IN").format(low)}${high !== low ? `–₹${new Intl.NumberFormat("en-IN").format(high)}` : ""}`,
    "Please confirm availability and the final quote.",
  ].join("\n");

  return (
    <div className="grid overflow-hidden rounded-[34px] border border-line bg-white shadow-[0_30px_80px_-40px_rgb(20_33_28/0.3)] lg:grid-cols-[1.15fr_0.85fr]">
      <div className="p-7 md:p-10">
        <div className="flex flex-wrap gap-2">
          {fleet.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setVid(f.id)}
              className={`relative rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors ${vid === f.id ? "text-white" : "text-muted hover:text-ink"}`}
            >
              {vid === f.id && <motion.span layoutId="calc-veh" className="absolute inset-0 rounded-full bg-forest" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{f.seats.replace(" Seater", "")} · {f.name.split(" ").slice(-1)[0]}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 inline-flex rounded-full bg-sand p-1">
          {(["outstation", "local"] as Mode[]).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} className={`relative min-h-10 rounded-full px-5 py-2 text-sm font-extrabold capitalize ${mode === m ? "text-ink" : "text-muted"}`}>
              {mode === m && <motion.span layoutId="calc-mode" className="absolute inset-0 rounded-full bg-white shadow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{m === "local" ? "Local city" : "Outstation"}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-8">
          {mode === "outstation" ? (
            <>
              <Slider label="Total trip distance (round trip)" value={km} min={100} max={3000} step={10} unit="km" onChange={setKm} />
              <Slider label="Number of days" value={days} min={1} max={10} unit={days > 1 ? "days" : "day"} onChange={setDays} />
            </>
          ) : (
            <>
              <Slider label="Extra kilometres beyond 80 km" value={xkm} min={0} max={200} step={5} unit="km" onChange={setXkm} />
              <Slider label="Extra hours beyond 8 hours" value={xhr} min={0} max={8} unit="hr" onChange={setXhr} />
            </>
          )}
        </div>
      </div>

      <div className="relative flex flex-col bg-mint p-7 text-ink md:p-10">
        <p className="relative inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-forest">
          <Calculator className="h-4 w-4" /> Estimated fare
        </p>
        <p className="display relative mt-4 text-[clamp(2.8rem,5vw,4.4rem)] leading-none text-ink" aria-live="polite">
          ₹<AnimatedNumber value={low} />
          {high !== low && (
            <span className="block text-[0.5em] text-muted">
              to ₹<AnimatedNumber value={high} />
            </span>
          )}
        </p>
        <dl className="relative mt-8 grid gap-3 text-sm">
          {rows.map(([k, val]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-forest/15 pb-3">
              <dt className="text-muted">{k}</dt>
              <dd className="font-extrabold text-ink">{val}</dd>
            </div>
          ))}
        </dl>
        <p className="relative mt-4 text-xs leading-relaxed text-subtle">Indicative estimate. Tolls, interstate permits and parking are billed at actuals with a GST invoice. Outstation billing has a 300 km/day minimum.</p>
        <a href={waLink(msg)} target="_blank" rel="noopener" className="relative mt-auto flex h-14 items-center justify-center gap-2 rounded-full bg-forest pt-px font-extrabold text-white transition-colors hover:bg-forest-2" style={{ marginTop: "2rem" }}>
          <MessageCircle className="h-5 w-5" /> Lock this fare on WhatsApp
        </a>
      </div>
    </div>
  );
}
