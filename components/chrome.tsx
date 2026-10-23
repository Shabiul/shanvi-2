"use client";

import Image from "@/components/img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { nav, site, waLink, services } from "@/lib/content";
import { Magnetic } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex h-[68px] max-w-[1400px] items-center gap-4 rounded-full pl-3 pr-2 transition-all duration-500 ${scrolled || pathname === "/" ? "glass-strong shadow-[0_16px_40px_-24px_rgb(20_33_28/0.35)]" : "bg-transparent"}`}
        >
          <Link href="/" className="flex items-center rounded-full bg-white px-3.5 py-1.5 shadow-[0_1px_2px_rgb(20_33_28/0.08)] ring-1 ring-line" aria-label="Shanvi Tours & Travels home">
            <Image src="/images/logo.png" alt="Shanvi Tours & Travels Logo" width={1231} height={541} priority className="h-9 w-auto" />
          </Link>
          <ul className="mx-auto hidden items-center gap-1 xl:flex">
            {nav.map((n) => (
              <li key={n.href} className="relative">
                <Link href={n.href} className={`relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-bold transition-colors ${isActive(n.href) ? "text-forest" : "text-muted hover:text-ink"}`}>
                  {n.label}
                  {n.hot && <span className="rounded-full bg-forest px-1.5 py-px text-[9px] font-black uppercase tracking-wider text-white">Hot</span>}
                </Link>
                {isActive(n.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-mint" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              </li>
            ))}
          </ul>
          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <a href={`tel:${site.phoneIntl}`} className="hidden items-center gap-2 rounded-full px-3 text-sm font-extrabold text-ink 2xl:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sand">
                <Phone className="h-4 w-4 text-forest" />
              </span>
              96111 20023
            </a>
            <Magnetic strength={0.2}>
              <Link href="/contact" className="hidden h-12 items-center gap-2 rounded-full bg-forest px-5 text-sm font-extrabold text-white transition-colors hover:bg-forest-2 sm:inline-flex">
                Get a quote <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-6 pb-10 pt-28"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 46px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 46px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 46px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="relative">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden border-b border-line">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.7, ease: EASE }}>
                    <Link href={n.href} onClick={() => setOpen(false)} className={`display flex items-center justify-between py-3 text-[clamp(2.2rem,9vw,3.4rem)] ${isActive(n.href) ? "text-forest" : "text-ink"}`}>
                      {n.label}
                      <ArrowUpRight className="h-7 w-7 text-forest" />
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div className="relative mt-auto grid gap-3 pt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <a href={`tel:${site.phoneIntl}`} className="flex h-14 items-center justify-center gap-2 rounded-full bg-forest font-extrabold text-white">
                <Phone className="h-5 w-5" /> Call {site.phoneDisplay}
              </a>
              <a href={waLink()} target="_blank" rel="noopener" className="flex h-14 items-center justify-center gap-2 rounded-full bg-wa font-extrabold text-night">
                <MessageCircle className="h-5 w-5" /> WhatsApp booking
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IstClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-bold text-muted">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
      </span>
      Dispatch desk open now{time ? ` · ${time} in Bangalore` : ""}
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-sand pt-24">
      <div className="wrap relative">
        <div className="flex flex-col gap-10 border-b border-line pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <IstClock />
            <h2 className="display mt-6 text-[clamp(2.8rem,7vw,6.5rem)]">
              Where to <span className="serif text-forest">next?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href={`tel:${site.phoneIntl}`} className="inline-flex h-14 items-center gap-2 rounded-full bg-forest px-7 font-extrabold text-white">
                <Phone className="h-5 w-5" /> {site.phoneDisplay}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={waLink()} target="_blank" rel="noopener" className="inline-flex h-14 items-center gap-2 rounded-full border border-line px-7 font-extrabold text-ink hover:bg-sand">
                <MessageCircle className="h-5 w-5 text-wa" /> WhatsApp
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <span className="inline-flex rounded-2xl bg-white px-4 py-2.5 ring-1 ring-line">
              <Image src="/images/logo.png" alt="Shanvi Tours & Travels Logo" width={1231} height={541} className="h-11 w-auto" />
            </span>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Bangalore-based commercial passenger fleet operator founded in 2013 by Pradeep H.B. — 12+1 Tempo Traveller, 21+1 Mini Bus, 33+1 Bus, and 49+1 Luxury Bus with verified drivers. 100% Yellow-Board registered under Karnataka Motor Vehicles Rules.
            </p>
            <a href={site.maps} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 text-sm font-bold hover:border-forest">
              <span className="text-gold">★★★★★</span> 5.0 · 25 Google reviews
            </a>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-forest">Explore</h3>
            <ul className="mt-5 grid gap-2.5 text-sm font-semibold">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-muted transition hover:text-forest">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-forest">Bus rental services</h3>
            <ul className="mt-5 grid gap-2.5 text-sm font-semibold">
              <li>
                <Link href="/21-seater-bus-rental-bangalore" className="text-muted hover:text-forest">21 Seater Bus Rental</Link>
              </li>
              <li>
                <Link href="/mini-bus-rental-bangalore" className="text-muted hover:text-forest">Mini Bus Rental Bangalore</Link>
              </li>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-muted hover:text-forest">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-forest">Contact</h3>
            <ul className="mt-5 grid gap-4 text-sm">
              <li className="flex gap-3 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                <address className="not-italic">{site.address}</address>
              </li>
              <li>
                <a href={`tel:${site.phone}`} className="flex gap-3 font-bold hover:text-forest">
                  <Phone className="h-4 w-4 text-forest" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone2}`} className="flex gap-3 font-bold hover:text-forest">
                  <Phone className="h-4 w-4 text-forest" /> {site.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 font-bold hover:text-forest">
                  <Mail className="h-4 w-4 text-forest" /> {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden className="relative select-none overflow-hidden">
        <motion.div
          className="display whitespace-nowrap text-center text-[25vw] leading-[0.78] text-transparent [-webkit-text-stroke:1px_rgb(15_91_70/0.18)]"
          initial={{ y: "30%", opacity: 0 }}
          whileInView={{ y: "8%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          Shanvi
        </motion.div>
      </div>

      <div className="wrap relative flex flex-col gap-3 border-t border-line pb-28 pt-6 text-xs text-subtle md:flex-row md:flex-wrap md:items-center md:justify-between md:pb-6">
        <p suppressHydrationWarning>© {year} Shanvi Tours &amp; Travels Bangalore (Registered Commercial Passenger Transport, Karnataka). All Rights Reserved.</p>
        <p>
          Independent operator · Not affiliated with namesake agencies in other states ·{" "}
          <Link href="/photo-credits" className="inline-block py-2 underline decoration-ink/20 underline-offset-4 hover:text-forest">
            Photo credits
          </Link>
        </p>
        <p className="text-sm text-muted md:basis-full md:pt-2 md:text-center">
          Designed and Developed with <span aria-label="love" className="text-forest">♥</span> by{" "}
          <a href="https://naazailabs.com" target="_blank" rel="noopener" className="font-extrabold text-ink underline decoration-forest/40 underline-offset-4 transition hover:text-forest">
            Naaz AI Labs
          </a>
        </p>
      </div>
    </footer>
  );
}

export function Fabs() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 900));
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden flex-col items-end gap-3 md:flex">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative grid h-14 w-14 place-items-center rounded-full glass-strong text-ink shadow-md"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
                <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#0f5b46" strokeWidth="2" style={{ pathLength: progress }} />
              </svg>
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <a href={`tel:${site.phoneIntl}`} aria-label={`Call ${site.phone}`} className="group relative grid h-14 w-14 place-items-center rounded-full bg-forest text-white shadow-[0_10px_30px_-8px_rgb(15_91_70/0.6)] transition hover:bg-forest-2">
          <Phone className="h-6 w-6" />
          <span className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink opacity-0 shadow-lg transition group-hover:opacity-100">Call {site.phone}</span>
        </a>
        <a href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="group relative grid h-16 w-16 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)]">
          <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-wa" />
          <svg viewBox="0 0 24 24" className="relative h-8 w-8" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36A9.4 9.4 0 0 1 2.6 12.06C2.6 6.86 6.85 2.62 12.06 2.62c2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.71-1.5a11.3 11.3 0 0 0 5.43 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03" />
          </svg>
          <span className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink opacity-0 shadow-lg transition group-hover:opacity-100">Chat with dispatch</span>
        </a>
      </div>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_1fr_1.25fr] gap-1.5 rounded-full p-1.5 glass-strong shadow-[0_12px_40px_-12px_rgb(20_33_28/0.35)] md:hidden">
        <a href={`tel:${site.phoneIntl}`} className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-extrabold text-ink">
          <Phone className="h-4 w-4 text-forest" /> Call
        </a>
        <a href={waLink()} target="_blank" rel="noopener" className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-extrabold text-ink">
          <MessageCircle className="h-4 w-4 text-wa" /> WhatsApp
        </a>
        <Link href="/contact" className="flex h-12 items-center justify-center rounded-full bg-forest text-sm font-extrabold text-white">
          Get quote
        </Link>
      </div>
    </>
  );
}
