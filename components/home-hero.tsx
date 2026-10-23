"use client";

import Image from "@/components/img";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Phone, ShieldCheck, Star } from "lucide-react";
import { BookingWidget } from "./booking";
import { Btn } from "./ui";
import { site } from "@/lib/content";
import { videos } from "@/lib/seo";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } });

// Full-bleed landing video (as on the original site). The poster renders first as the
// LCP image; the muted loop plays over it, and reduced-motion users keep the still.
export function HomeHero() {
  const still = useReducedMotion();
  const v = videos.home;
  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={v.thumbnail} alt="" fill priority sizes="100vw" className="object-cover" />
        {!still && <video src={v.file} poster={v.thumbnail} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-night/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="wrap grid min-h-[88svh] items-center gap-10 pb-44 pt-32 lg:grid-cols-[1fr_auto] lg:pb-48">
        <div className="max-w-2xl text-white">
          <motion.div className="flex flex-wrap items-center gap-2.5" {...up(0.1)}>
            <a href={site.maps} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold backdrop-blur-md ring-1 ring-white/25">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" /> 5.0 · 25 Google reviews
            </a>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold backdrop-blur-md ring-1 ring-white/25">
              <ShieldCheck className="h-4 w-4" /> Yellow Board · Since 2013
            </span>
          </motion.div>

          <h1 id="mini-bus-and-tempo-traveller-rental-in-bangalore" className="display mt-7 text-[clamp(2.8rem,1.5rem+5vw,6.2rem)] leading-[0.98] !text-white">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:0.2s]">Mini Bus &amp; Tempo</span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:0.32s]">Traveller Rental</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="serif block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] !text-[#bfe8d6] [animation-delay:0.44s]">in Bangalore</span>
            </span>
          </h1>

          <motion.p className="mt-6 max-w-xl text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-white/85" {...up(0.6)}>
            Shanvi Tours &amp; Travels — 12+1 to 49+1 seater Yellow-Board vehicles with verified drivers for corporate, wedding, school &amp; pilgrimage trips.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" {...up(0.75)}>
            <Btn href="#fleet" size="lg" cursor="Fleet">
              Find your ride
            </Btn>
            <a href={`tel:${site.phoneIntl}`} className="inline-flex h-14 items-center gap-2 rounded-full bg-white/10 px-7 text-[15px] font-extrabold text-white ring-1 ring-white/40 backdrop-blur-md transition hover:bg-white hover:text-ink">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </motion.div>

          <motion.dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6" {...up(0.9)}>
            {[
              ["12+", "years on the road"],
              ["10k+", "trips completed"],
              ["24/7", "live dispatch"],
            ].map(([a, b]) => (
              <div key={b}>
                <dt className="display text-3xl !text-white md:text-4xl">{a}</dt>
                <dd className="mt-1 text-xs font-semibold text-white/70">{b}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div className="hidden lg:block" {...up(1)}>
          <Link href="/21-seater-bus-rental-bangalore" className="group flex w-[300px] items-center gap-4 rounded-3xl p-3 pr-5 glass-strong shadow-[0_24px_60px_-24px_rgb(0_0_0/0.5)]">
            <Image src="/images/fleet/mini-bus-exterior.jpg" alt="Shanvi Tours & Travels 21+1 Seater Mercedes Mini Bus" width={160} height={160} className="h-20 w-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-forest">Most booked</p>
              <p className="font-extrabold text-ink">21+1 Mini Bus</p>
              <p className="text-xs text-muted">From ₹6,500 / day</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-forest transition-transform group-hover:rotate-45" />
          </Link>
        </motion.div>
      </div>

      <motion.div className="wrap relative z-10 -mt-32 pb-14" {...up(0.9)}>
        <BookingWidget />
      </motion.div>
    </section>
  );
}
