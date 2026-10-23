import type { Metadata } from "next";
import Image from "@/components/img";
import { destinations } from "@/lib/content";

// Attribution required by the Creative Commons licences of the destination photos.
// A legal notice, not a search landing page: kept out of the index and the sitemaps.
export const metadata: Metadata = {
  title: "Photo Credits | Shanvi Tours & Travels",
  description: "Attribution for Creative Commons licensed destination photographs used on the Shanvi Tours & Travels website.",
  alternates: { canonical: "/photo-credits" },
  robots: { index: false, follow: true },
};

const credited = destinations.flatMap((d) => ("credit" in d && d.credit ? [{ ...d, credit: d.credit }] : []));

export default function PhotoCreditsPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="wrap max-w-4xl">
        <p className="eyebrow">Attribution</p>
        <h1 id="photo-credits" className="display mt-4 text-[clamp(2.4rem,1.6rem+3vw,4rem)]">Photo credits</h1>
        <p className="mt-5 max-w-2xl text-muted">
          All vehicle photographs on this site are of our own fleet. The destination photographs below are used under Creative Commons licences, resized for the web; each is credited to its photographer.
        </p>
        <ul className="mt-12 grid gap-4">
          {credited.map((d) => (
            <li key={d.slug} className="grid grid-cols-[96px_1fr] items-center gap-5 rounded-2xl border border-line bg-white p-3 sm:grid-cols-[140px_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                <Image src={d.img} alt={`${d.attraction}, ${d.name}`} fill sizes="140px" className="object-cover" />
              </div>
              <div className="text-sm leading-relaxed">
                <p className="font-extrabold text-ink">
                  {d.attraction}, {d.name}
                </p>
                <p className="text-muted">
                  Photo by {d.credit.author} ·{" "}
                  <a href={d.credit.licenseUrl} target="_blank" rel="noopener license" className="font-bold text-forest underline decoration-forest/30 underline-offset-4">
                    {d.credit.license}
                  </a>{" "}
                  ·{" "}
                  <a href={d.credit.source} target="_blank" rel="noopener" className="font-bold text-forest underline decoration-forest/30 underline-offset-4">
                    source
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
