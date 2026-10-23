import type { Metadata } from "next";
import { destinations, fleet, galleryPhotos, services, site } from "./content";
import { pageMeta, posts } from "./generated";

type Key = keyof typeof pageMeta;

/** Page metadata with clean canonical URLs. Titles in pageMeta are complete (≤60 chars, brand included). */
export function meta(key: Key, path: string, image = "/images/coach/coach-sunset-side.jpg"): Metadata {
  const { title, description, keywords } = pageMeta[key];
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images: [{ url: image }] },
    twitter: { title, description, images: [image] },
  };
}

/** Bump when page content changes; sitemaps report it as <lastmod>. */
export const LASTMOD = "2026-10-23";

/** Videos on the site: one source for VideoObject JSON-LD and sitemap-videos.xml (durations measured from the files). */
export const videos = {
  home: {
    page: "/",
    name: "Shanvi Tours & Travels — South India Tour & Luxury Bus Fleet",
    description: "Aerial footage of outstation tour destinations served by the Shanvi Tours & Travels mini bus and coach fleet from Bangalore.",
    thumbnail: "/images/destinations/tajmahal-poster.jpg",
    file: "/videos/scene-w2.mp4",
    seconds: 7,
  },
  contact: {
    page: "/contact",
    name: "Shanvi Tours & Travels — Gokarna Coast & South India Tour Destinations",
    description: "Coastal drone footage of Gokarna and South India holiday routes covered by Shanvi Tours & Travels bus rentals from Bangalore.",
    thumbnail: "/images/destinations/gokarna-kudle-beach.jpg",
    file: "/videos/scene-w1.mp4",
    seconds: 23,
  },
} as const;

export function videoSchema(v: (typeof videos)[keyof typeof videos]) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: site.url + v.thumbnail,
    uploadDate: "2026-10-01T08:00:00+05:30",
    duration: `PT${v.seconds}S`,
    contentUrl: site.url + v.file,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

type SitemapImage = { src: string; alt: string };
const album = (id: string) => fleet.find((v) => v.id === id)!.images.filter((p) => !p.shared);

/** Every indexable route, in priority order. Drives sitemap-pages.xml and sitemap-images.xml. */
export const sitemapPages: { path: string; priority: number; changefreq: "daily" | "weekly" | "monthly"; images: SitemapImage[] }[] = [
  { path: "/", priority: 1, changefreq: "weekly", images: [{ src: "/images/destinations/tajmahal-poster.jpg", alt: "Shanvi Tours & Travels South India tour video" }, ...album("21").slice(0, 2), album("12")[0], ...destinations.map((d) => ({ src: d.img, alt: `${d.attraction}, ${d.name} (${d.state}): bus and tempo traveller trips from Bangalore` }))] },
  { path: "/21-seater-bus-rental-bangalore", priority: 0.95, changefreq: "weekly", images: [...album("21"), ...destinations.filter((d) => ["coorg", "chikmagalur", "mysore"].includes(d.slug)).map((d) => ({ src: d.img, alt: `${d.attraction}, ${d.name}: 21 seater bus trip from Bangalore` }))] },
  { path: "/mini-bus-rental-bangalore", priority: 0.9, changefreq: "weekly", images: [...album("21"), ...album("25")] },
  { path: "/fleet", priority: 0.9, changefreq: "weekly", images: fleet.map((v) => v.images[0]) },
  { path: "/services", priority: 0.8, changefreq: "monthly", images: services.map((s) => ({ src: s.image, alt: `${s.title} — Shanvi Tours & Travels Bangalore` })) },
  { path: "/contact", priority: 0.8, changefreq: "monthly", images: [] },
  { path: "/gallery", priority: 0.7, changefreq: "weekly", images: galleryPhotos },
  { path: "/about", priority: 0.6, changefreq: "monthly", images: [] },
  { path: "/blog", priority: 0.6, changefreq: "weekly", images: [] },
  { path: "/privacy-policy", priority: 0.3, changefreq: "monthly", images: [] },
  { path: "/terms-and-conditions", priority: 0.3, changefreq: "monthly", images: [] },
  ...posts.map((p) => ({ path: `/${p.slug}`, priority: 0.7, changefreq: "monthly" as const, images: [{ src: p.image, alt: p.imageAlt }] })),
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p: string) => site.url + (p === "/" ? "/" : encodeURI(p));

export function xmlResponse(body: string) {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

export const sitemapXml = {
  index: () =>
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["pages", "images", "videos"]
      .map((n) => `  <sitemap><loc>${site.url}/sitemap-${n}.xml</loc><lastmod>${LASTMOD}</lastmod></sitemap>`)
      .join("\n")}\n</sitemapindex>`,
  pages: () =>
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages
      .map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`)
      .join("\n")}\n</urlset>`,
  images: () =>
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapPages
      .filter((p) => p.images.length)
      .map(
        (p) =>
          `  <url>\n    <loc>${abs(p.path)}</loc>\n${[...new Map(p.images.map((i) => [i.src, i])).values()]
            .map((i) => `    <image:image><image:loc>${abs(i.src)}</image:loc><image:title>${esc(i.alt)}</image:title></image:image>`)
            .join("\n")}\n  </url>`,
      )
      .join("\n")}\n</urlset>`,
  videos: () =>
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${Object.values(videos)
      .map(
        (v) =>
          `  <url>\n    <loc>${abs(v.page)}</loc>\n    <video:video>\n      <video:thumbnail_loc>${abs(v.thumbnail)}</video:thumbnail_loc>\n      <video:title>${esc(v.name)}</video:title>\n      <video:description>${esc(v.description)}</video:description>\n      <video:content_loc>${abs(v.file)}</video:content_loc>\n      <video:duration>${v.seconds}</video:duration>\n      <video:publication_date>2026-10-01T08:00:00+05:30</video:publication_date>\n      <video:family_friendly>yes</video:family_friendly>\n    </video:video>\n  </url>`,
      )
      .join("\n")}\n</urlset>`,
};
