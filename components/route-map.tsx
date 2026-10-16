"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { bangalore, destinations } from "@/lib/content";

const W = 600;
const H = 720;
const P = (lat: number, lng: number) => ({ x: ((lng - 72.6) / 12) * W, y: ((18.6 - lat) / 10.8) * H });

// Simplified South-Indian peninsula coastline (lat, lng)
const coast: [number, number][] = [
  [18.6, 72.85], [17.0, 73.25], [15.5, 73.75], [14.55, 74.3], [13.3, 74.7], [12.85, 74.85], [11.25, 75.75], [10.0, 76.2], [8.9, 76.55], [8.08, 77.55],
  [8.75, 78.15], [9.3, 79.15], [10.3, 79.85], [11.9, 79.85], [13.1, 80.3], [14.5, 80.15], [15.75, 80.9], [16.35, 81.7], [17.1, 82.3], [17.7, 83.3], [18.6, 84.4],
];
const coastPath = "M" + coast.map(([la, ln]) => { const p = P(la, ln); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" L") + " Z";
const B = P(bangalore.lat, bangalore.lng);

// Label placement per stop [dx, dy, anchor]: the dense cluster west/south of
// Bangalore reads left of its pin so names never stack on each other or the hub.
const LABEL: Record<string, [number, number, "start" | "end"]> = {
  gokarna: [-10, 4, "end"],
  chikmagalur: [-10, 4, "end"],
  coorg: [-10, 5, "end"],
  wayanad: [-10, 5, "end"],
  alleppey: [-10, 5, "end"],
  mysore: [9, 16, "start"],
  ooty: [10, 6, "start"],
  yercaud: [10, 5, "start"],
};

const arc = (lat: number, lng: number) => {
  const t = P(lat, lng);
  const mx = (B.x + t.x) / 2;
  const my = (B.y + t.y) / 2;
  const dx = t.x - B.x;
  const dy = t.y - B.y;
  const k = 0.28;
  return `M${B.x.toFixed(1)},${B.y.toFixed(1)} Q${(mx - dy * k).toFixed(1)},${(my + dx * k).toFixed(1)} ${t.x.toFixed(1)},${t.y.toFixed(1)}`;
};

export function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [sel, setSel] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setSel((s) => (s + 1) % destinations.length), 2600);
    return () => clearInterval(t);
  }, [auto, inView]);

  const d = destinations[sel];
  const pick = (i: number) => {
    setAuto(false);
    setSel(i);
  };

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-2">
          {destinations.map((x, i) => (
            <li key={x.slug}>
              <button
                type="button"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                className={`relative flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left transition-colors ${i === sel ? "text-white" : "text-muted hover:bg-white hover:text-ink"}`}
              >
                {i === sel && <motion.span layoutId="route-sel" className="absolute inset-0 rounded-2xl bg-forest" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className="relative font-extrabold">{x.name}</span>
                <span className={`relative text-xs font-bold ${i === sel ? "text-white/80" : "text-subtle"}`}>{x.km} km</span>
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="wait">
          <motion.div key={d.slug} className="mt-6 rounded-3xl p-6 card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-forest">{d.state}</p>
            <h3 className="display mt-2 text-4xl text-ink">Bangalore → {d.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{d.desc}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-bold text-ink">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-forest" /> {d.km} km</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-forest" /> ~{d.hrs} hrs drive</span>
              <Link href={`/contact?destination=${d.slug}`} className="ml-auto inline-flex items-center gap-1.5 text-forest hover:underline">
                Quote this route <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="relative w-full" role="img" aria-label={`Route map: Bangalore to ${d.name}, ${d.km} km`}>
          <defs>
            <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="rgb(15 91 70 / 0.18)" />
            </pattern>
            <linearGradient id="arcGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#0f5b46" />
              <stop offset="100%" stopColor="#2f8f6e" />
            </linearGradient>
            <clipPath id="coastClip">
              <path d={coastPath} />
            </clipPath>
          </defs>
          <path d={coastPath} fill="#ffffff" stroke="rgb(20 33 28 / 0.16)" strokeWidth="1.2" strokeLinejoin="round" />
          <rect width={W} height={H} fill="url(#dots)" clipPath="url(#coastClip)" />

          {destinations.map((x, i) => (
            <motion.path
              key={x.slug}
              d={arc(x.lat, x.lng)}
              fill="none"
              stroke={i === sel ? "url(#arcGrad)" : "rgb(20 33 28 / 0.14)"}
              strokeWidth={i === sel ? 2.6 : 1}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {inView && (
            <circle r="5" fill="#0f5b46" stroke="#fff" strokeWidth="2" key={d.slug}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path={arc(d.lat, d.lng)} />
            </circle>
          )}

          {destinations.map((x, i) => {
            const p = P(x.lat, x.lng);
            const on = i === sel;
            return (
              <g key={x.slug} className="cursor-pointer" onMouseEnter={() => pick(i)} onClick={() => pick(i)}>
                {on && (
                  <circle cx={p.x} cy={p.y} r="16" fill="none" stroke="#0f5b46" strokeWidth="1.5">
                    <animate attributeName="r" values="6;20" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={p.x} cy={p.y} r={on ? 6 : 4} fill={on ? "#0f5b46" : "#ffffff"} stroke={on ? "#ffffff" : "rgb(20 33 28 / 0.45)"} strokeWidth={on ? 2 : 1.2} />
                <text
                  x={p.x + (LABEL[x.slug]?.[0] ?? 10)}
                  y={p.y + (LABEL[x.slug]?.[1] ?? 4)}
                  textAnchor={LABEL[x.slug]?.[2] ?? "start"}
                  fill={on ? "#0f5b46" : "rgb(20 33 28 / 0.68)"}
                  fontSize={on ? 15 : 12.5}
                  fontWeight={800}
                  fontFamily="var(--font-manrope)"
                  stroke="#fbfaf7"
                  strokeWidth={4}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                >
                  {x.name}
                </text>
              </g>
            );
          })}

          <circle cx={B.x} cy={B.y} r="10" fill="#14211c" />
          <circle cx={B.x} cy={B.y} r="22" fill="none" stroke="#14211c" strokeOpacity="0.35">
            <animate attributeName="r" values="10;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={B.x + 18} y={B.y + 30} fill="#14211c" fontSize="13.5" fontWeight={900} letterSpacing="1.5" fontFamily="var(--font-manrope)" stroke="#fbfaf7" strokeWidth={5} strokeLinejoin="round" paintOrder="stroke">
            BANGALORE
          </text>
        </svg>
      </div>
    </div>
  );
}
