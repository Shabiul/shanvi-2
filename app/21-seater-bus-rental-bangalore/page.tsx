import Image from "@/components/img";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BatteryCharging, Clock, IdCard, Luggage, Satellite, Snowflake, Tv } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs, FaqSection } from "@/components/blocks";
import { SeatMap } from "@/components/fleet-explorer";
import { CtaBanner, RevealImage } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { areas, fleet, site, waLink } from "@/lib/content";
import { faqs } from "@/lib/generated";
import { meta } from "@/lib/seo";

export const metadata = meta("seater21", "/21-seater-bus-rental-bangalore", "/images/fleet/mini-bus-exterior.jpg");

const v21 = fleet.find((f) => f.id === "21")!;

const specs = [
  { I: Snowflake, t: "Dual Climate Control", d: "Twin roof-mounted high-cooling AC blowers ensure uniform cooling throughout the cabin, even during hot South Indian summers." },
  { I: BatteryCharging, t: "USB Mobile Chargers", d: "Dedicated USB charging sockets and individual reading lights installed beside each passenger seat row for road productivity." },
  { I: Tv, t: "LED TV & Sound System", d: "Wide HD display screen paired with high-clarity surround speakers, Bluetooth audio streaming, and a tour guide mic." },
  { I: Luggage, t: "18–20 Bag Cargo Bay", d: "Deep underbody luggage hold and spacious interior overhead hat racks keep aisles clean and luggage safe from rain." },
  { I: Satellite, t: "AIS-140 GPS & SOS", d: "Government-certified live vehicle tracking, electronic speed governor set at 80 km/h, and emergency panic buttons." },
  { I: IdCard, t: "Verified Chauffeur", d: "Police background-verified, commercially badged driver with 10+ years interstate highway and ghat road experience." },
];

const compare = [
  ["Optimal Passenger Headcount", "8 to 12 passengers", "14 to 21 passengers", "22 to 33 passengers"],
  ["Seating Configuration", "1x2 or 2x1 Narrow Aisle", "2x2 Wide Central Walkway", "2x2 Coach Pushback"],
  ["Local City Package (8h/80km)", "₹4,500", "₹6,500 (approx ₹310/person)", "₹9,000"],
  ["Outstation Rate per Km", "₹24 – ₹26 / km", "₹32 – ₹36 / km", "₹42 – ₹46 / km"],
  ["Ghat Road / Hill Station Agility", "Excellent", "Excellent (Narrow wheelbase clears all 36 Ooty hairpins)", "Moderate (Some hill restrictions)"],
  ["Luggage Boot Capacity", "8 – 10 small bags", "18 – 20 medium suitcases + overhead racks", "30+ suitcases"],
];

const routes = [
  { slug: "coorg", tag: "Weekend Hill Escape", name: "Bangalore to Coorg (270 km)", time: "~5.5 Hours", img: "/images/destinations/coorg-abbey-falls.jpg", text: "Travel via Bangalore-Mysore Expressway and Kushalnagar. Perfect 3-day corporate offsite or family tour exploring Abbey Falls, Raja's Seat, and coffee plantations. Easy parking at homestays." },
  { slug: "chikmagalur", tag: "Trek & Nature Retreat", name: "Bangalore to Chikmagalur (245 km)", time: "~4.5 Hours", img: "/images/destinations/chikmagalur.jpg", text: "Via Hassan highway (NH 75). Excellent road conditions. Our mini bus easily handles Western Ghats ascents up to Mullayanagiri base, Baba Budangiri, and Hebbe Falls." },
  { slug: "mysore", tag: "Heritage & Palaces", name: "Bangalore to Mysore (150 km)", time: "~2.5 Hours", img: "/images/destinations/mysore.jpg", text: "Cruises in just 2.5 hours via the 10-lane Bangalore-Mysore Expressway. Ideal for one-day corporate picnics and family visits to Mysore Palace, Chamundi Hills, and Brindavan Gardens." },
];

const tables = [
  {
    tag: "Local Bangalore City",
    title: "Intra-City & Airport Packages",
    rows: [["8 Hours / 80 Km Package", "₹6,500"], ["12 Hours / 120 Km Package", "₹9,000"], ["Extra Kilometer Rate", "₹26 / km"], ["Extra Hour Rate", "₹350 / hr"], ["Bangalore Airport (BLR) Pickup / Drop", "From ₹4,200 (flat)"], ["Driver Night Surcharge (10 PM – 6 AM)", "₹400"]],
    note: "*Toll charges, airport parking slips, and parking fees at monuments/malls are payable at actuals.",
    cta: ["/contact?vehicle=21-seater&trip=local", "Reserve for a local trip"],
  },
  {
    tag: "Outstation Interstate",
    title: "South India Outstation Highway Rates",
    rows: [["Per Kilometer Tariff (AC Mini Bus)", "₹32 – ₹36 / km"], ["Minimum Daily Billing Distance", "300 km / calendar day"], ["Driver Daily Bata (Allowance)", "₹600 / day"], ["Interstate Border Permit (Kerala / TN / AP)", "At actual RTO rates"], ["Toll Plaza & Expressway FASTag", "Recharged at actuals"], ["Driver Night Halt Allowance (if after 11 PM)", "₹300 / night"]],
    note: "*Kilometers are calculated garage-to-garage from our Nagadevanahalli hub. Full GST commercial bill provided.",
    cta: ["/contact?vehicle=21-seater&trip=outstation", "Calculate outstation route tariff"],
  },
];

export default function Seater21Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "21 Seater Bus Rental", path: "/21-seater-bus-rental-bangalore" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { href: "/fleet", label: "Fleet" }, { label: "21 Seater Bus Rental" }]}
        eyebrow="Mercedes mini bus · the tempo traveller alternative"
        title="21 Seater Bus Rental"
        accent="in Bangalore"
        lede="Rent our 21+1 seater Mercedes-chassis mini bus, built by Singh Motor Coach Builders, from ₹6,500 a day. Plush 2x2 pushback reclining seats, dual AC, AIS-140 GPS, and a verified driver for city events, airport runs and interstate holidays."
        image="/images/tempo/tempo-interior-ceiling.jpg"
        imageAlt="Ambient-lit coach interior, Shanvi Tours & Travels Bangalore"
        aside={
          <div className="rounded-[30px] p-3 glass-strong">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[22px]">
              <Image src="/images/fleet/mini-bus-exterior.jpg" alt="Shanvi Tours & Travels 21 Seater Mercedes Mini Bus Bangalore Exterior" fill sizes="420px" className="object-cover" priority />
              <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-ink">Actual vehicle photo</span>
            </div>
            <dl className="px-3 py-4 text-sm">
              {[
                ["Bangalore City Tariff", "₹6,500", "8h / 80km"],
                ["Outstation Tariff", "₹32 – ₹36", "/ km"],
                ["Driver Day Allowance", "₹600", "/ day"],
              ].map(([k, a, b]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-line py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="display text-2xl">
                    {a} <span className="font-sans text-xs font-bold text-muted">{b}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/contact?vehicle=21-seater" className="flex h-13 items-center justify-center gap-2 rounded-full bg-forest py-4 font-extrabold text-white">
              Check availability for your dates <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/contact?vehicle=21-seater">Book 21-seater now</Btn>
          <Btn href={waLink("Hi Shanvi Tours, need tariff and availability for 21 Seater Mini Bus in Bangalore")} external variant="wa">
            WhatsApp dispatch
          </Btn>
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-muted">
          {["KA 51 AB 8485 (Yellow Board)", "All India Tourist Permit (AITP)", "GST Invoices Provided", "Zero Hidden Charges"].map((x) => (
            <li key={x} className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-forest" /> {x}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Quick Answer: 21 Seater Bus Rental Price in Bangalore" chips={["Standard 2x2 Center-Aisle Configuration", "Fits 14 to 21 Passengers Comfortably", "Hill-Station Approved (Ooty, Coorg, Chikmagalur)", "Commercial Yellow Board Compliant"]}>
            <p>
              Renting a <strong>21 seater mini bus in Bangalore</strong> with Shanvi Tours &amp; Travels costs <strong>₹6,500 for a local 8-hour / 80-kilometer city package</strong> (additional distance at ₹26/km and extra hours at ₹350/hr). For outstation journeys across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana, the tariff is <strong>₹32 to ₹36 per kilometer</strong> with a standard minimum billing of 300 km/day and a driver bata of <strong>₹600/day</strong>.
            </p>
            <p>
              Our 21+1 vehicle (Registration <strong>KA 51 AB 8485</strong>) is an executive coach on a Mercedes-Benz chassis fabricated by <strong>Singh Motor Coach Builders</strong>. It is equipped with <strong>2x2 luxury pushback reclining seats</strong>, dual heavy-duty air conditioning, mobile phone charging points at every row, an LED TV infotainment system, a microphone for tour commentary, and a dedicated boot space accommodating 18 to 20 medium suitcases. The vehicle operates with a valid <strong>All India Tourist Permit (AITP)</strong> and <strong>AIS-140 GPS telemetry</strong>, making it the highest-rated transport solution in Bangalore for groups of 14 to 21 passengers.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="pt-28">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">21 seater tempo traveller vs mini bus</p>
            <h2 id="21-seater-tempo-traveller" className="display mt-4 scroll-mt-28 text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] leading-[1.05]">
              Looking for a <span className="serif">21 seater tempo traveller?</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-muted">
              <p>
                Most tempo travellers stop at 17 to 20 seats and use a narrow 1x2 aisle, so a full group of 21 is a tight squeeze with little room for bags. Our <strong className="text-ink">21+1 seater mini bus</strong> is the vehicle most people searching for a 21 seater tempo traveller actually need: every passenger gets a 2x2 pushback seat beside a wide centre aisle, and the boot takes 18 to 20 medium suitcases.
              </p>
              <p>
                It costs <strong className="text-ink">₹6,500 for 8 hours / 80 km</strong> in Bangalore, the same day package you would book for a large tempo traveller. For 12 or fewer people, our 12+1 tempo traveller is ₹4,500; for 22 to 25, see our{" "}
                <Link href="/mini-bus-rental-bangalore" className="font-bold text-forest underline decoration-forest/30 underline-offset-4">mini bus rental options</Link>, including the 25+1 mini coach at ₹7,500. Still deciding? Read our{" "}
                <Link href="/blog-tempo-traveller-vs-21-seater-bus" className="font-bold text-forest underline decoration-forest/30 underline-offset-4">tempo traveller vs 21 seater mini bus guide</Link>.
              </p>
            </div>
          </div>
          <div data-vehicle="21" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {v21.images.filter((p) => !p.shared).map((p, i, all) => (
              <div key={p.src} className={`relative overflow-hidden rounded-2xl bg-sand ${i === 0 ? "col-span-2 aspect-[16/10] sm:row-span-2 sm:aspect-auto" : i === all.length - 1 && all.length % 2 ? "aspect-square sm:col-span-2 sm:aspect-auto" : "aspect-square"}`}>
                <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(max-width:640px) 100vw, 400px" : "(max-width:640px) 50vw, 200px"} className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Vehicle engineering" title="21+1 Seater Mini Bus" accent="technical specifications" align="split" lede="Every amenity designed for group comfort, safety compliance, and smooth highway endurance." />
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="flex flex-col items-center justify-center rounded-[32px] p-8 card">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-forest">2x2 ergonomic pushback seating layout</p>
              <SeatMap v={v21} filled={21} />
              <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted">Unlike high-density commuter vans with cramped bench seats, our 21+1 mini coach features contoured high-back captain seats arranged in a 2x2 format with a wide central walkway. Every passenger enjoys individual seat reclination, headrest support, retractable seatbelts, magazine pouches, and wide armrests.</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {specs.map(({ I, t, d }, i) => (
                <Reveal key={t} delay={(i % 2) * 0.08}>
                  <Tilt className="h-full rounded-[26px] p-6 card">
                    <I className="h-7 w-7 text-forest" />
                    <h3 className="mt-4 font-extrabold">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="alt py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Zero hidden surprises" title="Bangalore" accent="rental tariff card" align="split" light lede="Clear, upfront pricing with published overtime and outstation kilometer slabs." />
          <div className="grid gap-5 lg:grid-cols-2">
            {tables.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1} className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-40px_rgb(20_33_28/0.4)]">
                <div className="border-b border-line bg-mint p-7 text-ink">
                  <span className="rounded-full bg-forest px-3 py-1 text-xs font-extrabold text-white">{t.tag}</span>
                  <h3 className="display mt-4 text-3xl">{t.title}</h3>
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {t.rows.map(([k, val], j) => (
                      <tr key={k} className="border-b border-ink/10">
                        <td className={`px-7 py-4 ${j < 2 ? "font-extrabold text-ink" : "text-muted"}`}>{k}</td>
                        <td className={`px-7 py-4 text-right ${j < 2 ? "display text-xl text-forest" : "font-bold text-ink"}`}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-7">
                  <p className="text-xs text-subtle">{t.note}</p>
                  <Btn href={t.cta[0]} variant={i ? "dark" : "primary"} className="mt-5 w-full" magnetic={false}>
                    {t.cta[1]}
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Smart vehicle selection" title="Why choose this size" accent="over other options?" align="split" lede="Compare passenger capacity, comfort, luggage volume, and per-head economy." />
          <Reveal className="overflow-x-auto rounded-[28px] border border-line bg-sand">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.16em]">
                  <th className="px-6 py-5 font-extrabold text-muted">Feature &amp; Metric</th>
                  <th className="px-6 py-5 font-extrabold text-muted">12+1 Tempo Traveller</th>
                  <th className="bg-forest px-6 py-5 font-extrabold text-white">21+1 Mercedes Mini Bus (Featured)</th>
                  <th className="px-6 py-5 font-extrabold text-muted">33+1 Touring Bus</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([k, a, b, c]) => (
                  <tr key={k} className="border-t border-line">
                    <th scope="row" className="px-6 py-5 font-extrabold">{k}</th>
                    <td className="px-6 py-5 text-muted">{a}</td>
                    <td className="bg-mint/60 px-6 py-5 font-extrabold text-forest">{b}</td>
                    <td className="px-6 py-5 text-muted">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Popular itineraries" title="Top outstation routes" accent="in a 21-seater" align="split" lede="Tested highway itineraries for corporate groups, college batches, and family reunions." />
          <div className="grid gap-5 md:grid-cols-3">
            {routes.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link href={`/contact?destination=${r.slug}&vehicle=21-seater`} className="group block overflow-hidden rounded-[30px] card" data-cursor="Quote">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <RevealImage src={r.img} alt={`${r.name} 21 Seater Mini Bus Rental`} className="absolute inset-0" sizes="33vw" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-ink">{r.tag}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="display text-2xl">{r.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4 text-sm font-bold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-forest" /> Driving time: {r.time}
                      </span>
                      <span className="flex items-center gap-1 text-forest">
                        Get quote <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Pickup anywhere in Bangalore" title="21 seater rental" accent="near you" align="split" lede="Doorstep pickup and drop for the mini bus across every Bangalore locality, tech park and the airport. Outstation kilometres run garage-to-garage from our Nagadevanahalli base on Mysore Road." />
          <ul className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={faqs.seater21} title="21 seater bus rental" accent="questions" lede="Prices, seating, tempo traveller alternatives and booking: what people ask before booking." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${site.url}/21-seater-bus-rental-bangalore#service`,
          name: "21 Seater Bus Rental in Bangalore",
          alternateName: ["21 Seater Mini Bus Rental", "21 Seater Tempo Traveller Rental", "21 Seater Minibus Hire", "21+1 Seater Bus on Rent"],
          serviceType: "Mini bus rental with driver",
          description: "Chauffeur-driven 21+1 seater Mercedes-chassis mini bus rental in Bangalore: ₹6,500 for 8 hours / 80 km, ₹32–36 per km outstation, 2x2 pushback seats, AC, AIS-140 GPS.",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: [{ "@type": "City", name: "Bangalore" }, ...["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Telangana"].map((name) => ({ "@type": "State", name }))],
          image: `${site.url}/images/fleet/mini-bus-exterior.jpg`,
          url: `${site.url}/21-seater-bus-rental-bangalore`,
          offers: [
            { "@type": "Offer", name: "8 hours / 80 km Bangalore package", price: "6500", priceCurrency: "INR", availability: "https://schema.org/InStock" },
            { "@type": "Offer", name: "12 hours / 120 km Bangalore package", price: "9000", priceCurrency: "INR", availability: "https://schema.org/InStock" },
            { "@type": "Offer", name: "Bangalore airport (BLR) transfer", price: "4200", priceCurrency: "INR", availability: "https://schema.org/InStock" },
          ],
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["Vehicle", "Product"],
          name: "Shanvi Tours & Travels 21+1 Seater Mercedes Mini Bus Bangalore",
          image: `${site.url}/images/fleet/mini-bus-exterior.jpg`,
          description: "Executive 21+1 Seater Mercedes-Chassis Mini Coach with 2x2 luxury pushback reclining seats, dual air conditioning, AIS-140 GPS telemetry, and professional driver in Bangalore.",
          vehicleConfiguration: "21+1 Seater (2x2 Pushback Layout)",
          vehicleSeatingCapacity: 22,
          fuelType: "Diesel",
          brand: { "@type": "Brand", name: "Singh Motor Coach / Mercedes-Benz Chassis" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: "6500",
            highPrice: "9000",
            offerCount: "2",
            offers: [
              { "@type": "Offer", name: "Local Bangalore 8-Hour / 80-Km Package", price: "6500", priceCurrency: "INR", availability: "https://schema.org/InStock" },
              { "@type": "Offer", name: "Outstation per Kilometer Rate", price: "32", priceCurrency: "INR", priceSpecification: { "@type": "UnitPriceSpecification", price: "32", priceCurrency: "INR", unitCode: "KMT" }, availability: "https://schema.org/InStock" },
            ],
          },
          provider: { "@id": `${site.url}/#organization` },
        }}
      />
      <CtaBanner title="Ready to reserve the" accent="Mercedes mini coach?" text="Peak weekends and wedding dates book out fast. Speak directly with our dispatch manager Pradeep H.B. to lock in your dates with zero surge pricing." primary={{ href: "/contact?vehicle=21-seater", label: "Request instant quotation" }} image="/images/fleet/mini-bus-exterior.jpg" />
    </>
  );
}
