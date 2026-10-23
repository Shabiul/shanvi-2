import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs } from "@/components/blocks";
import { GalleryGrid } from "@/components/gallery-grid";
import { CtaBanner } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { fleet, galleryPhotos, site } from "@/lib/content";
import { meta } from "@/lib/seo";

export const metadata = meta("gallery", "/gallery", "/images/coach/coach-interior-aisle.jpg");

// One section per vehicle with its own photos (the 45+1 shares the 49+1 album, so it is not repeated).
const groups = fleet.map((v) => ({ v, photos: galleryPhotos.filter((p) => p.anchor === `${v.anchor}-photos`) })).filter((g) => g.photos.length);

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Gallery", path: "/gallery" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Gallery" }]}
        eyebrow="Real vehicle photography"
        title="Mini bus & bus rental fleet"
        accent="— Bangalore"
        lede="Real commercial vehicles, real seating capacity — from 12+1 seater Tempo Travellers to 49+1 seater Luxury Coaches"
        image="/images/coach/coach-interior-aisle.jpg"
        imageAlt="Interior of the Shanvi Tours & Travels luxury coach with red carpet aisle"
        position="center 55%"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/fleet">View fleet specs</Btn>
          <Btn href="/contact" variant="ghost">
            Check availability
          </Btn>
        </div>
      </PageHero>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Real Fleet Verification: 100% Authentic Vehicle Photography">
            <p>Unlike aggregator portals that display generic brochure stock images, every photograph in this gallery depicts our actual Bangalore commercial fleet — registered with Karnataka Yellow Board plates (KA 51 series). You can examine the exact seating layout, pushback seat pitch, dual-zone AC vents, and deep underfloor luggage compartments before making your booking.</p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Tap any photo to enlarge" title="Mini bus & commercial" accent="bus rental vehicles" align="split" lede="Every photo below represents an actual vehicle in our Bangalore fleet — no stock photography." />
          <nav aria-label="Jump to a vehicle" className="mb-14 flex flex-wrap gap-2">
            {groups.map(({ v, photos }) => (
              <a key={v.id} href={`#${v.anchor}-photos`} className="rounded-full border border-line bg-white px-4 py-3 text-xs font-extrabold text-ink transition hover:border-forest hover:text-forest">
                {v.seats.replace(" Seater", "")} {v.name} · {photos.length}
              </a>
            ))}
          </nav>
          <div className="grid gap-20">
            {groups.map(({ v, photos }) => (
              <div key={v.id}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                  <h2 id={`${v.anchor}-photos`} className="display scroll-mt-28 text-[clamp(2rem,1.5rem+2vw,3.2rem)]">
                    {v.seats} <span className="serif">{v.name}</span> photos
                  </h2>
                  <Link href={v.page ?? `/fleet#${v.anchor}`} className="inline-flex items-center gap-1 py-2 text-sm font-extrabold text-forest hover:underline">
                    {v.seats} prices &amp; specs <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <GalleryGrid photos={photos} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Trust & transparency" title="How to verify authentic fleet photos" accent="vs. aggregator stock images" className="!mb-8" />
            <Reveal>
              <p className="text-[15.5px] leading-relaxed text-muted">Many online travel portals display stock studio photos or borrow pictures from unrelated bus operators. When booking with Shanvi Tours &amp; Travels, you receive the exact vehicle shown:</p>
              <ul className="mt-6 grid gap-4 text-[15px]">
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" /><span><strong>Karnataka Yellow Board Registration:</strong> <span className="text-muted">Every vehicle carries legitimate commercial registration plates (e.g. Mini Bus KA 51 AB 8485, Tempo Traveller KA 51 AM 0045).</span></span></li>
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" /><span><strong>Physical Depot Inspection:</strong> <span className="text-muted">Customers planning wedding convoys or corporate contracts are welcome to visit our garage at SMV Layout, Nagadevanahalli to inspect seating upholstery and AC performance in person.</span></span></li>
                <li className="flex gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-forest" /><span><strong>Pre-Trip Video Confirmation:</strong> <span className="text-muted">On request via WhatsApp (+91-9611120023), our dispatch team will send live walkaround video clips of your assigned coach before you pay your advance.</span></span></li>
              </ul>
            </Reveal>
          </div>
          <Reveal className="rounded-[32px] p-7 card">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-forest">Active Fleet Registration Index</h3>
            <ul className="mt-5">
              {fleet.filter((v) => v.plate).map((v) => (
                <li key={v.id} className="flex items-center justify-between gap-3 border-b border-line py-4 last:border-0">
                  <span className="font-bold">{v.seats.replace(" Seater", "")} {v.name}</span>
                  <span className="text-sm font-bold text-muted">{v.plate}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Shanvi Tours & Travels Real Commercial Bus Fleet Gallery",
          description: "Photographs of authentic commercial buses and Tempo Travellers in Bangalore: 12+1, 21+1, 25+1, 33+1, and 49+1 seater vehicles.",
          url: `${site.url}/gallery`,
          hasPart: galleryPhotos.map((p) => ({ "@type": "ImageObject", name: p.label, caption: p.alt, contentUrl: site.url + p.src, thumbnailUrl: site.url + p.src, url: `${site.url}/gallery#${p.anchor}` })),
        }}
      />
      <CtaBanner title="Like what" accent="you see?" text="Check seating capacity, luggage limits, and transparent rates on our fleet page." primary={{ href: "/fleet", label: "See fleet specs" }} image="/images/coach/coach-interior-seats.jpg" />
    </>
  );
}
