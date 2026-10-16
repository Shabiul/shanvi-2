import type { Metadata } from "next";
import { pageMeta } from "./generated";

type Key = keyof typeof pageMeta;

/** Page metadata from the legacy SEO copy, with clean canonical URLs. */
export function meta(key: Key, path: string, image = "/images/coach/coach-sunset-side.jpg"): Metadata {
  const m = pageMeta[key];
  const title = m.title.includes("Shanvi Tours") ? m.title : `${m.title} | Shanvi Tours & Travels`;
  return {
    title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: path },
    openGraph: { title, description: m.description, url: path, images: [{ url: image }] },
    twitter: { title, description: m.description, images: [image] },
  };
}
