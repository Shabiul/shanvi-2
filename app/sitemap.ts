import type { MetadataRoute } from "next";
import { galleryPhotos, site } from "@/lib/content";
import { posts } from "@/lib/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-16");
  const pages: [string, number, string[]?][] = [
    ["/", 1, ["/images/coach/coach-sunset-side.jpg"]],
    ["/21-seater-bus-rental-bangalore", 0.95, ["/images/fleet/mini-bus-exterior.jpg"]],
    ["/fleet", 0.9, ["/images/coach/coach-front-dusk.jpg"]],
    ["/services", 0.9, ["/images/coach/coach-sunset-front.jpg"]],
    ["/contact", 0.8],
    ["/about", 0.7],
    ["/gallery", 0.7, galleryPhotos.map((p) => p.src)],
    ["/blog", 0.7],
    ...posts.map((p) => [`/${p.slug}`, 0.6, [p.image]] as [string, number, string[]]),
  ];
  return pages.map(([path, priority, images]) => ({
    url: site.url + path,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
    ...(images ? { images: images.map((i) => site.url + encodeURI(i)) } : {}),
  }));
}
