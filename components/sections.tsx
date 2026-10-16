"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Briefcase, GraduationCap, Heart, Landmark, Play, Plus, Route, Star, Users, X } from "lucide-react";
import { services, stats, process, waLink, site } from "@/lib/content";
import { reviews } from "@/lib/generated";
import { Counter, Reveal, VelocityMarquee } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const icons = { users: Users, briefcase: Briefcase, heart: Heart, graduation: GraduationCap, road: Route, temple: Landmark } as const;

/* ---------- Expanding service panels ---------- */
export function ServicePanels() {
  const [open, setOpen] = useState(2);
  return (
    <>
      <div className="hidden h-[620px] gap-3 lg:flex">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          const on = open === i;
          return (
            <motion.div
              key={s.id}
              className="relative overflow-hidden rounded-[30px] bg-sand"
              animate={{ flexGrow: on ? 5 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ flexBasis: 0 }}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
            >
              <Link href={`/services#${s.id}`} className="group absolute inset-0 block" data-cursor="Explore">
                <Image src={s.image} alt={`${s.title} — Shanvi Tours & Travels Bangalore`} fill sizes="(max-width: 1400px) 60vw, 800px" className={`object-cover transition-transform duration-[1.4s] ${on ? "scale-100" : "scale-125"}`} />
                <div aria-hidden className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-gradient-to-t from-night/90 via-night/40 to-transparent" : "bg-night/55"}`} />
                <span className={`absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full transition-colors ${on ? "bg-forest text-white" : "glass-dark"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                {"tag" in s && s.tag && on && <span className="absolute right-6 top-7 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ink">{s.tag}</span>}
                <span className={`display absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap text-3xl text-white [writing-mode:vertical-rl] transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100 delay-300"}`}>
                  {s.title}
                </span>
                <AnimatePresence>
                  {on && (
                    <motion.div className="absolute inset-x-0 bottom-0 p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.6, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                      <span className="display text-6xl text-white/40">0{i + 1}</span>
                      <h3 className="display mt-1 text-5xl text-white">{s.title}</h3>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">{s.short}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white underline decoration-white/40 underline-offset-4">
                        Explore service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <Reveal key={s.id} delay={i * 0.05}>
              <Link href={`/services#${s.id}`} className="group relative block h-80 overflow-hidden rounded-[26px]">
                <Image src={s.image} alt={`${s.title} — Shanvi Tours & Travels Bangalore`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-forest text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="display text-3xl text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/85">{s.short}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

/* ---------- Stats band with counters ---------- */
export function StatsBand() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[30px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="bg-white p-8 md:p-10">
          <p className="display text-[clamp(3.4rem,5vw,5rem)] text-forest">
            <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
          </p>
          <p className="mt-3 text-lg font-extrabold text-ink">{s.label}</p>
          <p className="text-sm text-muted">{s.sub}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Stacking cards (sticky, scale back as the next arrives) ---------- */
export function StackCards({ items }: { items: { title: string; text: string; image: string; alt: string; kicker: string }[] }) {
  return (
    <div className="relative">
      {items.map((it, i) => (
        <StackCard key={it.title} it={it} i={i} total={items.length} />
      ))}
    </div>
  );
}
function StackCard({ it, i, total }: { it: { title: string; text: string; image: string; alt: string; kicker: string }; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  return (
    <div ref={ref} className="mb-5 md:sticky md:mb-0 md:h-[78vh] md:min-h-[520px] md:[top:var(--stack-top)]" style={{ "--stack-top": `calc(110px + ${i * 26}px)` } as React.CSSProperties}>
      <motion.div style={{ scale }} className="relative grid origin-top overflow-hidden rounded-[34px] border border-line bg-white max-md:![transform:none] md:h-[calc(100%-40px)] md:grid-cols-2">
        <div className="relative order-2 min-h-[220px] md:order-1">
          <Image src={it.image} alt={it.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="order-1 flex flex-col justify-center p-8 md:order-2 md:p-14">
          <span className="display text-7xl text-forest/20">0{i + 1}</span>
          <p className="eyebrow mt-2">{it.kicker}</p>
          <h3 className="display mt-4 text-[clamp(2rem,3.4vw,3.4rem)]">{it.title}</h3>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{it.text}</p>
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-paper max-md:hidden" style={{ opacity: dim }} />
      </motion.div>
    </div>
  );
}

/* ---------- Process timeline: line draws as you scroll ---------- */
export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      <div aria-hidden className="absolute bottom-0 left-[27px] top-0 w-px bg-ink/15 md:left-1/2" />
      <motion.div aria-hidden className="absolute left-[27px] top-0 w-[3px] -translate-x-px rounded-full bg-forest md:left-1/2" style={{ height: h }} />
      <ol className="grid gap-14">
        {process.map((p, i) => (
          <li key={p.title} className={`relative grid items-center gap-6 pl-20 md:grid-cols-2 md:pl-0 ${i % 2 ? "md:[&>div]:col-start-2" : ""}`}>
            <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full bg-forest font-extrabold text-white md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              0{i + 1}
            </span>
            <Reveal className={`rounded-[26px] bg-white p-7 shadow-[0_20px_60px_-30px_rgb(20_33_28/0.4)] ${i % 2 ? "md:ml-12" : "md:mr-12"}`} y={40}>
              <h3 className="display text-3xl text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Reviews: twin marquee rows ---------- */
function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <a href={site.maps} target="_blank" rel="noopener" className="mx-2.5 block w-[340px] shrink-0 rounded-[26px] p-6 card transition-colors hover:border-forest/40" aria-label={`Read ${r.name}'s review on Google`}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full text-sm font-black text-white" style={{ backgroundColor: r.color }}>
          {r.initials}
        </span>
        <div>
          <p className="font-extrabold text-ink">{r.name}</p>
          <p className="text-xs text-subtle">{r.date} · Google</p>
        </div>
        <span className="ml-auto flex text-gold" aria-label={`${r.rating} out of 5 stars`}>
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
        </span>
      </div>
      <p className="mt-4 whitespace-normal text-[15px] leading-relaxed text-body">&ldquo;{r.text}&rdquo;</p>
    </a>
  );
}
export function ReviewsMarquee() {
  const half = Math.ceil(reviews.length / 2);
  return (
    <div className="grid gap-5">
      <VelocityMarquee baseVelocity={-1.4}>
        {reviews.slice(0, half).map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </VelocityMarquee>
      <VelocityMarquee baseVelocity={1.4}>
        {reviews.slice(half).map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </VelocityMarquee>
    </div>
  );
}

/* ---------- Video showcase with modal ---------- */
export function VideoShowcase({ src, poster, title, text }: { src: string; poster: string; title: string; text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(6% 3% 6% 3% round 32px)", "inset(0% 0% 0% 0% round 30px)"]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);
  return (
    <>
      <motion.div ref={ref} style={{ clipPath: clip }} className="relative aspect-video overflow-hidden bg-sand">
        <video src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label={title} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
        <button type="button" onClick={() => setOpen(true)} className="group absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 backdrop-blur-xl" data-cursor="Play" aria-label={`Play video: ${title}`}>
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
          <span className="grid h-20 w-20 place-items-center rounded-full bg-forest text-white transition-transform group-hover:scale-110">
            <Play className="ml-1 h-8 w-8 fill-white" />
          </span>
        </button>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <h3 className="display text-[clamp(1.8rem,3vw,3rem)] text-white">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">{text}</p>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-paper/90 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={title}>
            <motion.video src={src} poster={poster} controls autoPlay playsInline className="max-h-[85vh] w-full max-w-6xl rounded-3xl bg-sand shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} />
            <button type="button" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-ink text-white" aria-label="Close video">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- FAQ accordion ---------- */
export function Faq({ items }: { items: readonly { q: string; a: string }[]; light?: boolean }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-[22px] border transition-colors ${on ? "border-forest/30 bg-white shadow-[0_18px_40px_-28px_rgb(20_33_28/0.35)]" : "border-line bg-white/70 hover:bg-white"}`}>
            <h3>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className={`flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.02rem] font-extrabold text-ink`}>
                {f.q}
                <motion.span animate={{ rotate: on ? 45 : 0 }} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${on ? "bg-forest text-white" : "bg-mint text-forest"}`}>
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                  <p className={`px-6 pb-6 pr-16 text-[15px] leading-relaxed text-muted`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Big CTA banner with clip-path image reveal ---------- */
export function CtaBanner({ title, accent, text, image = "/images/coach/coach-sunset-front.jpg", primary = { href: "/contact", label: "Request instant quote" } }: { title: string; accent: string; text: string; image?: string; primary?: { href: string; label: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(8% 4% 8% 4% round 40px)", "inset(0% 0% 0% 0% round 36px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  return (
    <section className="px-3 py-24 md:px-5">
      <motion.div ref={ref} style={{ clipPath: clip }} className="relative mx-auto max-w-[1500px] overflow-hidden bg-sand">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(251_250_247/0.97)_0%,rgb(251_250_247/0.88)_45%,rgb(251_250_247/0.35)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(251_250_247/0.97)_0%,rgb(251_250_247/0.9)_60%,rgb(251_250_247/0.6)_100%)]" />
        <div className="wrap relative grid gap-10 py-24 md:py-32 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <p className="eyebrow">24/7 dispatch desk</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,1.6rem+4.6vw,6.4rem)] text-ink">
              {title} <span className="serif text-forest">{accent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">{text}</p>
          </div>
          <div className="grid gap-3 rounded-[28px] p-6 glass-strong shadow-[0_24px_60px_-30px_rgb(20_33_28/0.4)]">
            <a href={`tel:${site.phoneIntl}`} className="display text-4xl text-ink hover:text-forest">
              <span className="mb-1 block font-sans text-[10px] font-extrabold tracking-[0.24em] text-forest">Call or WhatsApp</span>
              {site.phoneDisplay}
            </a>
            <Link href={primary.href} className="flex h-14 items-center justify-center gap-2 rounded-full bg-forest font-extrabold text-white transition-colors hover:bg-forest-2">
              {primary.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a href={waLink()} target="_blank" rel="noopener" className="flex h-14 items-center justify-center rounded-full bg-wa font-extrabold text-night">
              WhatsApp booking
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Statement: words light up as you scroll through ---------- */
function Word({ children, range, progress }: { children: string; range: [number, number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
export function ScrollRevealText({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="display text-[clamp(2.4rem,1.4rem+4.4vw,6rem)] leading-[0.98]" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className={highlight.includes(w.replace(/[^\w]/g, "")) ? "serif text-forest" : ""}>
          <Word range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress}>
            {w}
          </Word>
        </span>
      ))}
    </p>
  );
}

/* ---------- Image that reveals with a clip-path wipe ---------- */
export function RevealImage({ src, alt, className = "", sizes = "50vw", priority = false }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  // The trigger lives on the un-clipped outer box: an element clipped to zero area never intersects the viewport.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <div ref={ref} className={`bg-sand ${className.includes("absolute") ? "" : "relative"} ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
        animate={{ clipPath: seen ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="absolute inset-0" initial={false} animate={{ scale: seen ? 1 : 1.25 }} transition={{ duration: 1.4, ease: EASE }}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}
