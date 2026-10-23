"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Photo = { src: string; alt: string; label: string };

// Tiles are [data-album] triggers: PhotoViewer opens the tapped vehicle's album only.
export function GalleryGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {photos.map((p, i) => (
        <motion.button
          key={p.src}
          type="button"
          data-album
          aria-label={`View ${p.label} photos`}
          className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[24px] bg-sand text-left"
          data-cursor="View"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={p.src} alt={p.alt} width={900} height={i % 3 === 1 ? 1200 : 700} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-105" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-ink">{p.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
