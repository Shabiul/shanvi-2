"use client";

import Image from "@/components/img";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { destinations } from "@/lib/content";

function Card({ d, i }: { d: (typeof destinations)[number]; i: number }) {
  return (
    <Link
      href={`/contact?destination=${d.slug}`}
      data-cursor="Quote"
      className="group relative block h-[min(64vh,560px)] w-[min(78vw,400px)] shrink-0 overflow-hidden rounded-[30px] bg-sand"
      title={`Book Bangalore to ${d.name} bus rental (${d.km} km)`}
    >
      <Image src={d.img} alt={`${d.name}, ${d.state} — bus rental from Bangalore (${d.km} km)`} fill sizes="400px" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-ink">{d.state}</span>
      <span className="display absolute right-5 top-4 text-6xl text-white/20">{String(i + 1).padStart(2, "0")}</span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="display text-5xl text-white">{d.name}</h3>
            <p className="mt-2 flex items-center gap-3 text-sm font-bold text-white">
              {d.km} km <span className="inline-flex items-center gap-1 text-white/80"><Clock className="h-3.5 w-3.5" /> ~{d.hrs} hrs</span>
            </p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-forest group-hover:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{d.desc}</p>
      </div>
    </Link>
  );
}

/** Pinned section whose card track scrolls sideways as you scroll down (desktop); swipe rail on phones. */
export function DestinationsScroller({ heading }: { heading: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const ok = window.innerWidth >= 900 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned(ok);
      if (track.current) setDist(Math.max(track.current.scrollWidth - window.innerWidth + 80, 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={section} className="relative bg-sand" style={{ height: pinned ? `calc(100vh + ${dist}px)` : "auto" }}>
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="wrap mb-10 flex items-end justify-between gap-6">
          {heading}
          {pinned && (
            <div className="mb-3 hidden w-48 lg:block">
              <div className="h-1 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full bg-forest" style={{ width: bar }} />
              </div>
              <p className="mt-2 text-right text-xs font-bold text-subtle">Scroll to travel →</p>
            </div>
          )}
        </div>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={`flex gap-5 pl-[max(18px,calc((100vw-1360px)/2+48px))] pr-10 ${pinned ? "" : "no-scrollbar snap-x snap-mandatory overflow-x-auto [&>*]:snap-start"}`}
        >
          {destinations.map((d, i) => (
            <Card key={d.slug} d={d} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
