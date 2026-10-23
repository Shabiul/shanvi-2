"use client";

import Image from "@/components/img";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { slug } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  title,
  accent,
  lede,
  eyebrow,
  image,
  imageAlt,
  crumbs,
  children,
  aside,
  video,
  position = "center",
}: {
  title: string;
  accent?: string;
  lede?: string;
  eyebrow?: string;
  image: string;
  imageAlt: string;
  crumbs: { href?: string; label: string }[];
  children?: ReactNode;
  aside?: ReactNode;
  video?: string;
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const media = aside ?? (
    <motion.div
      className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-sand lg:aspect-[4/5]"
      initial={{ clipPath: "inset(10% 10% 10% 10% round 44px)", opacity: 0 }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline className="h-full w-full object-cover" aria-label={imageAlt} />
        ) : (
          <Image src={image} alt={imageAlt} fill priority sizes="(max-width:1024px) 100vw, 42vw" className="object-cover" style={{ objectPosition: position }} />
        )}
      </motion.div>
    </motion.div>
  );
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pb-16 pt-28 md:pb-24 md:pt-36">
      <svg aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] text-forest/[0.06]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx="100" cy="100" r={20 + i * 10} />
        ))}
      </svg>
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {c.href ? (
                  <Link href={c.href} className="-my-3 inline-block py-3 hover:text-forest">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </motion.ol>
          {eyebrow && (
            <motion.p className="eyebrow mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              {eyebrow}
            </motion.p>
          )}
          <h1 id={slug(title, accent)} className="display mt-5 max-w-[18ch] text-[clamp(2.7rem,1.6rem+4.2vw,5.8rem)] leading-[1]">
            <span className="block overflow-hidden pb-[0.05em]">
              <span className="block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:0.25s]">{title}</span>
            </span>
            {accent && (
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="serif text-forest block animate-[line-up_1.1s_cubic-bezier(0.16,1,0.3,1)_both] [animation-delay:0.4s]">{accent}</span>
              </span>
            )}
          </h1>
          {lede && (
            <motion.p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease: EASE }}>
              {lede}
            </motion.p>
          )}
          {children && (
            <motion.div className="mt-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease: EASE }}>
              {children}
            </motion.div>
          )}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: EASE }}>
          {media}
        </motion.div>
      </div>
    </section>
  );
}
