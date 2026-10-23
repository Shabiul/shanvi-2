"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Phone, ShieldCheck, Star } from "lucide-react";
import { BookingWidget } from "./booking";
import { Btn } from "./ui";
import { site } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // pointer parallax for the floating cards
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const near = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 22) };
  const far = { x: useTransform(sx, (v) => v * -14), y: useTransform(sy, (v) => v * -14) };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-paper pb-14 pt-28 md:pt-32"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* soft contour rings */}
      <svg aria-hidden className="pointer-events-none absolute -right-24 top-6 h-[680px] w-[680px] text-forest/[0.07]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="100" cy="100" r={18 + i * 10} />
        ))}
      </svg>

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <motion.div className="flex flex-wrap items-center gap-2.5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}>
            <a href={site.maps} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-xs font-bold text-ink shadow-sm">
              <span className="flex -space-x-2">
                {["GG", "RG", "PK"].map((i, n) => (
                  <span key={i} className={`grid h-7 w-7 place-items-center rounded-full border-2 border-white text-[9px] font-black text-white ${["bg-forest", "bg-[#3b7a8c]", "bg-[#a4683a]"][n]}`}>
                    {i}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" /> 5.0
              </span>
              <span className="text-muted">· 25 Google reviews</span>
            </a>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-2 text-xs font-bold text-forest">
              <ShieldCheck className="h-4 w-4" /> Yellow Board · Since 2013
            </span>
          </motion.div>

          <h1 className="display mt-7 text-[clamp(2.9rem,1.6rem+5vw,6.4rem)] leading-[0.98] text-ink">
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: "0.25s" }}>
                Mini Bus &amp; Tempo
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: "0.37s" }}>
                Traveller Rental
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="serif block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: "0.49s" }}>
                in Bangalore
              </span>
            </span>
          </h1>

          <motion.p className="mt-6 max-w-xl text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-muted" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }}>
            Shanvi Tours &amp; Travels — 12+1 to 49+1 seater Yellow-Board vehicles with verified drivers for corporate, wedding, school &amp; pilgrimage trips.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85, ease: EASE }}>
            <Btn href="#fleet" size="lg" cursor="Fleet">
              Find your ride
            </Btn>
            <Btn href={`tel:${site.phoneIntl}`} variant="ghost" size="lg" external>
              <Phone className="h-4 w-4" /> Call {site.phone}
            </Btn>
          </motion.div>

          <motion.dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.8 }}>
            {[
              ["12+", "years on the road"],
              ["10k+", "trips completed"],
              ["24/7", "live dispatch"],
            ].map(([a, b]) => (
              <div key={b}>
                <dt className="display text-3xl text-ink md:text-4xl">{a}</dt>
                <dd className="mt-1 text-xs font-semibold text-muted">{b}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-sand sm:aspect-square lg:aspect-[4/5]"
            initial={{ clipPath: "inset(10% 10% 10% 10% round 48px)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 36px)", opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
          >
            <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
              <Image
                src="/images/coach/coach-sunset-side.jpg"
                alt="Shanvi Tours & Travels 33+1 touring coach ready for departure at sunset in Bangalore"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="animate-[kenburns_2.6s_cubic-bezier(0.16,1,0.3,1)_both] object-cover object-[60%_55%]"
              />
            </motion.div>
          </motion.div>

          <motion.div className="absolute -left-3 bottom-8 sm:-left-8" style={near} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}>
            <div className="flex animate-float items-center gap-3 rounded-2xl p-2.5 pr-5 glass-strong shadow-[0_20px_50px_-20px_rgb(20_33_28/0.35)]">
              <Image src="/images/fleet/mini-bus-exterior.jpg" alt="" width={64} height={64} className="h-12 w-12 rounded-xl object-cover sm:h-14 sm:w-14" />
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-forest">Most booked</p>
                <p className="text-sm font-extrabold text-ink">21+1 Mini Bus</p>
                <p className="text-xs text-muted">From ₹6,500 / day</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute -right-2 top-6 sm:-right-6" style={far} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9, ease: EASE }}>
            <div className="flex animate-float items-center gap-3 rounded-2xl px-4 py-3 glass-strong shadow-[0_20px_50px_-20px_rgb(20_33_28/0.35)] [animation-delay:-3s]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink">Dispatch online</p>
                <p className="text-xs text-muted">AIS-140 GPS on every vehicle</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div className="wrap relative z-10 mt-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1, ease: EASE }}>
        <BookingWidget />
      </motion.div>
    </section>
  );
}
