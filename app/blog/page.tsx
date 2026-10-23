import Image from "@/components/img";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Breadcrumbs } from "@/components/blocks";
import { CtaBanner } from "@/components/sections";
import { JsonLd } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { posts } from "@/lib/generated";
import { site } from "@/lib/content";
import { meta } from "@/lib/seo";

export const metadata = meta("blog", "/blog", "/images/fleet/mini-bus-exterior.jpg");

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <Breadcrumbs items={[{ name: "Travel Blog & Guides", path: "/blog" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
        eyebrow="Insights · Route guides · Tariffs"
        title="Shanvi Tours & Travels"
        accent="Blog & Guides"
        lede="Expert advice from Bangalore's commercial fleet operator since 2013. Learn how to pick the right vehicle, calculate transparent tariffs, and explore South India safely."
        image="/images/destinations/coorg-abbey-falls.jpg"
        imageAlt="Green coffee country in Coorg, a favourite outstation route from Bangalore"
      />

      <section className="py-24">
        <div className="wrap">
          <Reveal>
            <Link href={`/${featured.slug}`} className="group grid overflow-hidden rounded-[36px] card lg:grid-cols-[1.1fr_0.9fr]" data-cursor="Read">
              <div className="relative min-h-[320px] overflow-hidden">
                <Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" priority />
                <span className="absolute left-6 top-6 rounded-full bg-forest px-4 py-1.5 text-xs font-extrabold text-white">★ Featured guide</span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="flex flex-wrap gap-4 text-xs font-bold text-muted">
                  <span className="text-forest">{featured.category}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                </p>
                <h2 id={featured.slug} className="display mt-5 scroll-mt-28 text-[clamp(2rem,3.2vw,3.2rem)]">{featured.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-extrabold text-forest">
                  Read complete guide <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </span>
              </div>
            </Link>
          </Reveal>

          <h2 id="latest-travel-and-vehicle-guides" className="display mt-24 scroll-mt-28 text-[clamp(2.4rem,4vw,4rem)]">
            Latest travel &amp; <span className="serif text-forest">vehicle guides</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Tilt className="h-full rounded-[30px]">
                  <Link href={`/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[30px] card" data-cursor="Read">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-ink">{p.category}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex gap-4 text-xs font-bold text-subtle">
                        <span>{p.date}</span>
                        <span>{p.readTime}</span>
                      </p>
                      <h3 id={p.slug} className="mt-3 scroll-mt-28 text-lg font-extrabold leading-snug">{p.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-forest">
                        Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Shanvi Tours & Travels Blog",
          description: "Travel guides, vehicle comparison advice, and transparent tariff documentation for Bangalore commercial bus and tempo traveller rentals.",
          url: `${site.url}/blog`,
          publisher: { "@id": `${site.url}/#organization` },
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, description: p.excerpt, url: `${site.url}/${p.slug}`, image: site.url + p.image })),
        }}
      />
      <CtaBanner title="Need personalized guidance" accent="for your group?" text="Whether you are debating between a 12-seater and a 21-seater, or coordinating a 200+ guest wedding convoy, our founder Pradeep H.B. is available for direct dispatch consultation." primary={{ href: "/contact", label: "Request custom quote" }} />
    </>
  );
}
