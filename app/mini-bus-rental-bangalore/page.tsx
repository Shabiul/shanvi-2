import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs, FaqSection } from "@/components/blocks";
import { SeatMap } from "@/components/fleet-explorer";
import { CtaBanner } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { areas, fleet, site, waLink } from "@/lib/content";
import { faqs } from "@/lib/generated";
import { meta } from "@/lib/seo";

export const metadata = meta("miniBus", "/mini-bus-rental-bangalore", "/images/fleet/mini-bus-exterior.jpg");

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const miniBuses = fleet.filter((v) => v.id === "21" || v.id === "25");

const sizes = [
  ["1 – 12 passengers", "12+1 Tempo Traveller", "₹4,500", "/fleet#12-tempo-traveller"],
  ["13 – 21 passengers", "21+1 Mercedes Mini Bus", "₹6,500", "/21-seater-bus-rental-bangalore"],
  ["22 – 25 passengers", "25+1 Mini Coach", "₹7,500", "/fleet#25-mini-coach"],
  ["26 – 33 passengers", "33+1 Touring Coach", "₹9,000", "/fleet#33-tourist-bus"],
];

export default function MiniBusPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Mini Bus Rental", path: "/mini-bus-rental-bangalore" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/fleet", label: "Fleet" }, { label: "Mini Bus Rental" }]}
        eyebrow="Two sizes, always with a driver"
        title="Mini Bus Rental"
        accent="in Bangalore"
        lede="Two sizes for groups of 13 to 25: our 21+1 Mercedes-chassis model from ₹6,500 and our 25+1 mini coach from ₹7,500 for 8 hours / 80 km, each with pushback seats, AC and a police-verified driver."
        image="/images/fleet/mini-bus-exterior.jpg"
        imageAlt="Shanvi Tours & Travels 21+1 seater Mercedes mini bus for rent in Bangalore"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/contact?vehicle=21-seater">Get a quote</Btn>
          <Btn href={waLink("Hi Shanvi Tours, need a mini bus quote in Bangalore")} external variant="wa">
            WhatsApp dispatch
          </Btn>
        </div>
      </PageHero>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Quick Answer: Mini Bus Rental Price in Bangalore" chips={["21+1 and 25+1 seat sizes", "8 hr / 80 km local packages", "Outstation from ₹32 per km", "Yellow Board, AIS-140 GPS"]}>
            <p>
              <strong>Mini bus rental in Bangalore</strong> with Shanvi Tours &amp; Travels costs <strong>₹6,500 for the 21+1 seater</strong> and <strong>₹7,500 for the 25+1 seater</strong> for a local 8-hour / 80-kilometre package. Extra distance is ₹26 per km (21+1) or ₹30 per km (25+1). Outstation trips cost ₹32 to ₹36 per km for the 21+1 and ₹36 to ₹40 per km for the 25+1, billed for a minimum of 300 km a day plus a driver bata of ₹600 to ₹650 a day.
            </p>
            <p>
              Both vehicles run on commercial <strong>Yellow Board</strong> registration under the Karnataka Motor Vehicles Rules with an <strong>All India Tourist Permit</strong>, <strong>AIS-140 GPS</strong> tracking and an 80 km/h speed governor, and both are small enough for ghat roads to Ooty, Coorg and Chikmagalur. Tolls, parking and interstate permits are charged at actuals with GST invoices.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="The vehicles" title="21 seater and 25 seater" accent="mini buses" align="split" lede="Real photos of the vehicles you will travel in, with seat layouts and published tariffs." />
          <div className="grid gap-6 lg:grid-cols-2">
            {miniBuses.map((v, i) => {
              const photos = v.images.filter((p) => !p.shared);
              return (
                <Reveal key={v.id} delay={i * 0.1} className="flex flex-col overflow-hidden rounded-[32px] card">
                  <div data-vehicle={v.id} className="grid grid-cols-3 gap-1.5 p-1.5">
                    {photos.slice(0, 4).map((p, j) => (
                      <div key={p.src} className={`relative overflow-hidden rounded-2xl bg-sand ${j === 0 ? "col-span-3 aspect-[16/10]" : "aspect-square"}`}>
                        <Image src={p.src} alt={p.alt} fill sizes={j === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 33vw, 17vw"} className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-forest">{v.chassis}</p>
                    <h3 className="display mt-2 text-4xl">
                      {v.seats} <span className="serif">{v.name}</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{v.desc}</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_150px]">
                      <dl className="text-sm">
                        {[
                          ["8 hr / 80 km", inr(v.local)],
                          ["Extra km / hr", `₹${v.extraKm} · ₹${v.extraHr}`],
                          ["Outstation", `₹${v.rateMin}–${v.rateMax}/km`],
                          ["Driver bata", `₹${v.bata}/day`],
                          ["Best for", `${v.minPax}–${v.maxPax} people`],
                        ].map(([k, val]) => (
                          <div key={k} className="flex justify-between gap-3 border-b border-line py-2.5">
                            <dt className="text-muted">{k}</dt>
                            <dd className="font-extrabold text-ink">{val}</dd>
                          </div>
                        ))}
                      </dl>
                      <SeatMap v={v} filled={v.capacity} compact />
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {v.perks.map((p) => (
                        <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-forest">
                          <Check className="h-3.5 w-3.5" /> {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-3 pt-7">
                      <Btn href={`/contact?vehicle=${v.id}-seater`} magnetic={false}>
                        Book the {v.seats.replace(" Seater", "")}
                      </Btn>
                      <Btn href={v.page ?? `/fleet#${v.anchor}`} variant="ghost" magnetic={false}>
                        {v.page ? "21 seater details" : "Full specs"}
                      </Btn>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="alt py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Pick the right size" title="Which size" accent="for your group?" align="split" lede="Book the smallest vehicle that seats everyone: it keeps the per-head cost lowest. Prices are for 8 hours / 80 km in Bangalore." />
          <div className="overflow-hidden rounded-[28px] border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-sand text-[11px] uppercase tracking-[0.16em] text-muted">
                  <th className="px-5 py-4 font-extrabold">Group size</th>
                  <th className="px-5 py-4 font-extrabold">Vehicle</th>
                  <th className="px-5 py-4 text-right font-extrabold">From</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map(([g, name, price, href]) => (
                  <tr key={g} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 font-extrabold">{g}</th>
                    <td className="px-5 py-4">
                      <Link href={href} className="inline-flex items-center gap-1 py-1 font-bold text-forest hover:underline">
                        {name} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-right font-extrabold">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm text-muted">
            Choosing between a mini bus and a tempo traveller? Our{" "}
            <Link href="/blog-tempo-traveller-vs-21-seater-bus" className="font-bold text-forest underline decoration-forest/30 underline-offset-4">tempo traveller vs 21 seater mini bus guide</Link> compares cost per head, luggage and hill-road handling.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Pickup anywhere in Bangalore" title="Doorstep pickup" accent="across the city" align="split" lede="Doorstep pickup for corporate outings, weddings, college trips and airport runs in every locality and tech park." />
          <ul className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={faqs.miniBus} title="Mini bus rental" accent="questions" lede="Prices, sizes and booking, answered." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${site.url}/mini-bus-rental-bangalore#service`,
          name: "Mini Bus Rental in Bangalore",
          alternateName: ["Mini Bus Hire Bangalore", "Minibus on Rent Bangalore", "21 Seater and 25 Seater Mini Bus Rental"],
          serviceType: "Mini bus rental with driver",
          description: "Chauffeur-driven mini bus rental in Bangalore: 21+1 seater from ₹6,500 and 25+1 seater from ₹7,500 for 8 hours / 80 km, outstation from ₹32 per km.",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "City", name: "Bangalore" },
          url: `${site.url}/mini-bus-rental-bangalore`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Mini bus rental packages",
            itemListElement: miniBuses.map((v) => ({
              "@type": "Offer",
              name: `${v.seats} ${v.name}, 8 hours / 80 km`,
              price: String(v.local),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              itemOffered: { "@type": "Product", name: `${v.seats} ${v.name}`, image: site.url + v.images[0].src },
            })),
          },
        }}
      />
      <CtaBanner title="Book your" accent="mini bus in Bangalore" text="Tell us your group size, dates and route; our 24/7 dispatch desk confirms the right vehicle with a fixed quote." primary={{ href: "/contact?vehicle=21-seater", label: "Request a quote" }} image="/images/seater21/side.jpg" />
    </>
  );
}
