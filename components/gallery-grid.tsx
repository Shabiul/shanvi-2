"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Photo = { src: string; alt: string; label: string };

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [open, go]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[24px] bg-sand text-left"
            data-cursor="View"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div layoutId={`photo-${p.src}`}>
              <Image src={p.src} alt={p.alt} width={900} height={i % 3 === 1 ? 1200 : 700} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-ink">{p.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[95] flex items-center justify-center bg-paper/95 px-2 py-16 backdrop-blur-xl sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={photos[open].alt}>
            <motion.div
              layoutId={`photo-${photos[open].src}`}
              className="relative h-[72vh] w-full max-w-6xl touch-pan-y sm:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, i) => {
                if (i.offset.x < -70) go(1);
                else if (i.offset.x > 70) go(-1);
              }}
            >
              <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="pointer-events-none rounded-2xl object-contain" priority />
            </motion.div>
            <p className="absolute bottom-5 left-1/2 w-max max-w-[90vw] -translate-x-1/2 rounded-full px-4 py-2 text-center text-xs font-bold text-ink bg-white/90 sm:text-sm">
              {photos[open].label} · {open + 1}/{photos.length}
            </p>
            {[
              { d: -1, I: ChevronLeft, pos: "left-2 sm:left-4", label: "Previous photo" },
              { d: 1, I: ChevronRight, pos: "right-2 sm:right-4", label: "Next photo" },
            ].map(({ d, I, pos, label }) => (
              <button key={d} type="button" aria-label={label} onClick={(e) => { e.stopPropagation(); go(d); }} className={`absolute ${pos} top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-md sm:h-14 sm:w-14`}>
                <I className="h-6 w-6" />
              </button>
            ))}
            <button type="button" aria-label="Close" className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
