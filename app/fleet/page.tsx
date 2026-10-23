import Image from "@/components/img";
import { BatteryCharging, Gauge, MapPinned, Music, Snowflake, Sofa, Stethoscope, Briefcase } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs, FaqSection, TariffTable } from "@/components/blocks";
import { FleetExplorer, SeatMap } from "@/components/fleet-explorer";
import { CtaBanner } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { amenities, fleet, site } from "@/lib/content";
import { faqs } from "@/lib/generated";
import { meta } from "@/lib/seo";

export const metadata = meta("fleet", "/fleet", "/images/coach/coach-front-dusk.jpg");

const amenityIcons = { snow: Snowflake, gps: MapPinned, seat: Sofa, gauge: Gauge, bag: Briefcase, plug: BatteryCharging, music: Music, aid: Stethoscope } as const;
const inr = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);

export default function FleetPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Our Fleet & Tariffs", path: "/fleet" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Fleet & Tariffs" }]}
        eyebrow="Real fleet specifications"
        title="Our commercial fleet"
        accent="at a glance"
        lede="Six standardized passenger classes, each backed by real vehicle photography, exact seating capacity, and All India Tourist Permits"
        image="/images/coach/coach-front-dusk.jpg"
        imageAlt="Shanvi Tours & Travels luxury coach front view at dusk, Bangalore fleet"
        position="center 40%"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="#tariffs">See tariff card</Btn>
          <Btn href="/contact" variant="ghost">
            Check availability
          </Btn>
        </div>
      </PageHero>

      <section className="py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Pick by headcount" title="Find your" accent="perfect ride" align="split" lede="Slide to your group size to see the right vehicle, its seat map and its published tariff." />
          <FleetExplorer />
        </div>
      </section>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Quick Guide: Which Vehicle Size is Right for Your Group?" chips={["100% Real Fleet Photos (No Stock Images)", "AIS-140 GPS Telemetry & Speed Governors", "Pushback Reclining Seats in Every Coach", "5.0 Rating (25 Verified Google Reviews)"]}>
            <p>
              Shanvi Tours &amp; Travels operates six distinct passenger seating capacities in Bangalore to prevent overbooking or paying for empty seats: <strong>1) 12+1 Seater Tempo Traveller</strong> (ideal for 8–12 passengers; families, airport pickups, small corporate teams); <strong>2) 21+1 Seater Mercedes-Chassis Mini Bus</strong> (ideal for 13–21 passengers; college departments, office outings); <strong>3) 25+1 Seater Mini Coach</strong> (ideal for 22–25 passengers; office outings, extended families); <strong>4) 33+1 Seater Touring Coach</strong> (ideal for 26–33 passengers; pilgrimage tours, school trips, inter-state holidays); <strong>5) 45+1 Seater Premium Coach</strong> (ideal for 34–45 passengers; corporate events, wedding guests); <strong>6) 49+1 Seater Luxury Bus</strong> (ideal for 46–50 passengers; wedding guest convoys, corporate conferences, student batches). All vehicles feature high-capacity dual AC, AIS-140 GPS tracking, pushback seats, and yellow-board commercial registration.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap">
          {fleet.map((v, i) => (
            <article key={v.id} id={v.anchor} data-vehicle={v.id} className="grid scroll-mt-28 gap-10 border-b border-line py-20 first:pt-0 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              <div className={`grid gap-4 ${i % 2 ? "lg:order-2" : ""}`}>
                <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[32px]">
                  <Image src={v.images[0].src} alt={v.images[0].alt} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                  {v.plate && <span className="absolute bottom-5 left-5 rounded-md border-2 border-ink bg-[#ffd84d] px-3 py-1 font-mono text-sm font-bold text-ink">{v.plate}</span>}                  {v.tag && <span className="absolute right-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-xs font-extrabold text-white">{v.tag}</span>}
                </Reveal>
                <div className={`grid grid-cols-1 gap-4 ${v.images[1] ? "sm:grid-cols-[1fr_230px]" : ""}`}>
                  {v.images[1] && (
                    <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[28px] sm:aspect-auto" delay={0.1}>
                      <Image src={v.images[1].src} alt={v.images[1].alt} fill sizes="(max-width:1024px) 60vw, 30vw" className="object-cover" />
                    </Reveal>
                  )}
                  <Reveal className="rounded-[28px] p-5 card" delay={0.15}>
                    <p className="mb-3 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted">Seat layout</p>
                    <SeatMap v={v} filled={v.capacity} compact />
                  </Reveal>
                </div>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <p className="display text-[clamp(4.5rem,8vw,7.5rem)] leading-none text-forest">{v.seats.replace(" Seater", "")}</p>
                <h2 className="display mt-3 text-[clamp(2rem,3vw,3rem)]">
                  {v.name} — <span className="serif">{v.seats}</span>
                </h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-muted">{v.desc}</p>
                <dl className="mt-7 overflow-hidden rounded-[22px] border border-line">
                  {[
                    ["City (8hr / 80km)", `From ${inr(v.local)}`],
                    ["Extra km / hr", `₹${v.extraKm}/km · ₹${v.extraHr}/hr`],
                    ["Outstation", `₹${v.rateMin}–${v.rateMax}/km + bata ₹${v.bata}/day`],
                    ["Plate", v.plate || "Assigned at booking"],
                    ["Permit", "All India Tourist Permit (AITP)"],
                  ].map(([k, val], j) => (
                    <div key={k} className={`flex justify-between gap-4 px-5 py-3.5 text-sm ${j % 2 ? "" : "bg-white/[0.03]"}`}>
                      <dt className="text-muted">{k}</dt>
                      <dd className="text-right font-extrabold">{val}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm font-bold text-forest">Best for: {v.ideal}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn href={`/contact?vehicle=${v.id}-seater`}>Book this vehicle</Btn>
                  {v.page ? (
                    <Btn href={v.page} variant="ghost">
                      View 21-seater details
                    </Btn>
                  ) : (
                    <Btn href="/gallery" variant="ghost">
                      All photos
                    </Btn>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tariffs" className="scroll-mt-24 pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Transparent pricing" title="Bangalore bus & tempo traveller" accent="rental tariff card" align="split" lede="Clear, all-inclusive base pricing with zero hidden surcharges for local and outstation travel." />
          <Reveal>
            <TariffTable />
          </Reveal>
          <p className="mt-4 text-sm text-subtle">* Rates include commercial Yellow Board vehicle, high-capacity dual AC, AIS-140 GPS telematics, and licensed verified chauffeur. Toll charges, state passenger entry taxes, and parking fees are charged at actuals with GST input credit invoices. Minimum outstation calendar day billing is 300 km.</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Safety & comfort" title="Standard fleet features" accent="& safety equipment" align="split" lede="Every commercial vehicle in our fleet is maintained to institutional passenger safety standards." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a, i) => {
              const I = amenityIcons[a.icon as keyof typeof amenityIcons];
              return (
                <Reveal key={a.title} delay={(i % 4) * 0.06}>
                  <Tilt className="group h-full rounded-[26px] p-7 card transition-colors hover:border-forest/30">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand text-forest transition-colors group-hover:bg-gradient-to-br group-hover:from-saffron group-hover:to-amber group-hover:text-ink">
                      <I className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-extrabold">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection items={faqs.fleet} title="Fleet questions," accent="answered" lede="Common questions about choosing between vehicle sizes, amenities, and inspections." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Shanvi Tours & Travels Commercial Vehicle Fleet Bangalore",
          itemListElement: fleet.map((v, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": ["Vehicle", "Product"],
              name: `Shanvi Tours & Travels ${v.name} ${v.seats}`,
              vehicleSeatingCapacity: v.capacity + 1,
              image: site.url + v.images[0].src,
              description: v.desc,
              vehicleConfiguration: v.seats,
              fuelType: "Diesel",
              offers: { "@type": "Offer", priceCurrency: "INR", price: String(v.local), availability: "https://schema.org/InStock", url: `${site.url}/fleet#${v.anchor}` },
              provider: { "@id": `${site.url}/#organization` },
            },
          })),
        }}
      />
      <CtaBanner title="Ready to reserve" accent="a vehicle?" text="Choose your preferred vehicle size and speak with our 24/7 fleet manager." primary={{ href: "/contact", label: "Book your vehicle" }} />
    </>
  );
}
