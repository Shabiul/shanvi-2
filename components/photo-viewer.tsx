"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { albumFor } from "@/lib/content";

type Album = NonNullable<ReturnType<typeof albumFor>>;

// next/image serves "/_next/image?url=%2Fimages%2F…"; recover the original path.
const srcOf = (img: HTMLImageElement) => {
  const u = new URL(img.currentSrc || img.src, location.href);
  return u.searchParams.get("url") ?? u.pathname;
};

// Finds the vehicle photo a click/hover lands on. Links and controls keep their
// own behaviour; text over a photo (captions, cards) is not a photo click.
// [data-album] marks an explicit, keyboard-reachable trigger (gallery tiles).
function hit(e: MouseEvent): Album | null {
  const t = e.target as HTMLElement;
  const trigger = t.closest<HTMLElement>("[data-album]");
  let img: HTMLImageElement | null | undefined = trigger?.querySelector("img");
  if (!trigger) {
    if (t.closest("a, button, input, select, textarea, label, summary, [role=button], [role=dialog]")) return null;
    if (t.tagName !== "IMG" && t.textContent?.trim()) return null;
    img = document.elementsFromPoint(e.clientX, e.clientY).find((el): el is HTMLImageElement => el.tagName === "IMG");
  }
  return img ? albumFor(srcOf(img)) : null;
}

export function PhotoViewer() {
  const [album, setAlbum] = useState<Album | null>(null);
  const [i, setI] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = album?.photos.length ?? 0;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  // Site-wide: every vehicle photo opens its own album.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = hit(e);
      if (!a) return;
      e.preventDefault();
      setAlbum(a);
      setI(a.index);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.dataset.album !== undefined || t.style.cursor || !hit(e)) return;
      t.style.cursor = "zoom-in";
      t.dataset.cursor ??= "View";
    };
    document.addEventListener("click", click);
    document.addEventListener("mouseover", over);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  useEffect(() => {
    if (!album) return;
    const back = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAlbum(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
      back?.focus();
    };
  }, [album, go]);

  const p = album?.photos[i];
  return (
    <AnimatePresence>
      {album && p && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-4 bg-paper/95 px-2 pb-6 pt-16 backdrop-blur-xl sm:p-6 sm:pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAlbum(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${album.title} photos`}
        >
          <p className="absolute left-4 top-5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-ink shadow-md sm:text-sm">
            {album.title} · {i + 1}/{n}
          </p>
          {p.credit && (
            <p className="absolute bottom-1 left-1/2 w-max max-w-[95vw] -translate-x-1/2 text-center text-[11px] text-muted">
              Representative photo · {p.credit}
            </p>
          )}
          <motion.div
            key={p.src}
            className="relative min-h-0 w-full max-w-6xl flex-1 touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            drag={n > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, d) => {
              if (d.offset.x < -70) go(1);
              else if (d.offset.x > 70) go(-1);
            }}
          >
            <Image src={p.src} alt={p.alt} fill sizes="100vw" className="pointer-events-none rounded-2xl object-contain" priority />
          </motion.div>
          {n > 1 && (
            <>
              <div className="flex max-w-full gap-2 overflow-x-auto px-2 pb-1" onClick={(e) => e.stopPropagation()}>
                {album.photos.map((t, k) => (
                  <button key={t.src} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} aria-current={k === i} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-24 ${k === i ? "border-forest" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <Image src={t.src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
              {[
                { d: -1, I: ChevronLeft, pos: "left-2 sm:left-4", label: "Previous photo" },
                { d: 1, I: ChevronRight, pos: "right-2 sm:right-4", label: "Next photo" },
              ].map(({ d, I, pos, label }) => (
                <button key={d} type="button" aria-label={label} onClick={(e) => { e.stopPropagation(); go(d); }} className={`absolute ${pos} top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-md sm:h-14 sm:w-14`}>
                  <I className="h-6 w-6" />
                </button>
              ))}
            </>
          )}
          <button ref={closeRef} type="button" aria-label="Close photos" className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
