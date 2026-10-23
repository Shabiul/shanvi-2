import { Check } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { FleetExplorer } from "@/components/fleet-explorer";
import { RouteMap } from "@/components/route-map";
import { DestinationsScroller } from "@/components/destinations-scroller";
import { FareCalculator } from "@/components/fare-calculator";
import { CtaBanner, ProcessTimeline, ReviewsMarquee, RevealImage, ScrollRevealText, ServicePanels, StackCards, StatsBand, VideoShowcase } from "@/components/sections";
import { AnswerBox, AreasCloud, CredentialsBand, FaqSection } from "@/components/blocks";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { faqs } from "@/lib/generated";
import { meta, videoSchema, videos } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata = meta("home", "/");

const wedding = [
  {
    kicker: "Flagship coach",
    title: "49+1 Luxury Coach with Red Carpet Aisle & Plush Pushback Upholstery",
    text: "Flagship Volvo/Scania/BharatBenz-class air-conditioned coaches outfitted with an elegant red carpet aisle, plush ergonomic pushback seating, ambient cabin lighting, and massive luggage holds for traditional attire and bridal luggage.",
    image: "/images/coach/coach-interior-aisle.jpg",
    alt: "Interior of 49+1 Luxury Coach with red carpet aisle and plush pushback upholstery for weddings in Bangalore",
  },
  {
    kicker: "200+ guests",
    title: "Multi-Vehicle Coordinated Convoys for Weddings with 200+ Guests",
    text: "Synchronized fleet movements pairing 49+1 coaches, 21+1 mini buses, and 12+1 Tempo Travellers for mega wedding parties. Dedicated on-ground transport coordinators manage simultaneous arrivals at muhurtham timings.",
    image: "/images/coach/coach-sunset-front.jpg",
    alt: "Multi-vehicle coordinated convoys of 49+1 coaches for weddings with 200+ guests in Bangalore",
  },
  {
    kicker: "Hotel ↔ venue loops",
    title: "Continuous Shuttle Loops Between Guest Hotels & Reception Venues",
    text: "Round-the-clock scheduled round-trip loops connecting Kempegowda International Airport (BLR), railway terminals, partnered 5-star hotels, and convention halls so out-of-town guests travel effortlessly without waiting.",
    image: "/images/coach/coach-front-dusk.jpg",
    alt: "Shanvi Tours & Travels coach at dusk running wedding guest shuttle loops in Bangalore",
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <CredentialsBand />

      {/* Statement */}
      <section className="py-28 md:py-40">
        <div className="wrap">
          <p className="eyebrow mb-8">Since 2013 · Nagadevanahalli, Bangalore</p>
          <ScrollRevealText text="We don't just rent buses. We move your people — on time, in comfort, with verified drivers and a dispatch desk that never sleeps." highlight={["people", "comfort", "sleeps"]} />
        </div>
      </section>

      {/* Fleet explorer */}
      <section id="fleet" className="relative scroll-mt-24 overflow-hidden pb-28">
        <div className="wrap relative">
          <SectionHeading
            eyebrow="Seating capacity & vehicle guide"
            title="Find your"
            accent="perfect ride"
            align="split"
            lede="Slide to your group size — we match the exact vehicle and show you the seats. We never put 14 people in a 50-seater or squeeze 25 into a van."
          />
          <FleetExplorer />
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <StatsBand />
        </div>
      </section>

      {/* Quick answer + who we are */}
      <section className="alt py-28">
        <div className="wrap">
          <AnswerBox
            title="Quick Answer: Bangalore Mini Bus & Bus Rental Services"
            chips={["12+ Years Operating History", "10,000+ Completed Trips", "100% Yellow Board Fleet", "GST Invoice Compliant", "24/7 Dispatch Support", "5.0 Rating (25 Verified Google Reviews)"]}
          >
            <p>
              <strong>Shanvi Tours &amp; Travels</strong> (established in 2013) is a licensed commercial passenger transport company located in Nagadevanahalli, Bangalore, offering <strong>12+1 Seater Tempo Travellers, 21+1 Seater Mercedes Mini Buses, 33+1 Seater Touring Buses, and 49+1 Seater Luxury Coaches</strong> with professional, background-verified drivers. Every vehicle in our fleet is commercial Yellow-Board registered under the <strong>Karnataka Motor Vehicles Rules &amp; Motor Vehicles Act, 1988</strong>, fitted with <strong>AIS-140 standard GPS tracking</strong>, dual-zone AC, and pushback seats. We provide 24/7 service with <strong>All India Tourist Permits (AITP)</strong> for local corporate shuttles, weddings, airport pickups, and inter-state outstation tours across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana.
            </p>
          </AnswerBox>

          <div className="mt-24 grid items-center gap-14 lg:grid-cols-2">
            <div className="relative">
              <RevealImage src="/images/tempo/tempo-interior-lights.jpg" alt="Shanvi Tours & Travels Tempo Traveller interior with ambient lights" className="aspect-[4/5] w-[78%] rounded-[34px]" sizes="40vw" />
              <div className="absolute -bottom-10 right-0 w-[46%]">
                <RevealImage src="/images/coach/coach-front-dusk.jpg" alt="Shanvi Tours & Travels luxury coach at dusk" className="aspect-square rounded-[28px] border-8 border-sand" sizes="25vw" />
              </div>
              <div className="absolute left-[62%] top-10 grid h-32 w-32 animate-[spin_18s_linear_infinite] place-items-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
                  <defs>
                    <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                  </defs>
                  <text fontSize="10.5" fontWeight="800" letterSpacing="3" fill="#06080f">
                    <textPath href="#circ">SINCE 2013 • BANGALORE • 24/7 •</textPath>
                  </text>
                </svg>
                <span className="display text-3xl text-ink">12+</span>
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Who we are" title="Built around your group," accent="not a fixed package" light className="!mb-8" />
              <Reveal>
                <div className="space-y-4 text-[15.5px] leading-relaxed text-body">
                  <p>Since 2013, Shanvi Tours &amp; Travels has managed passenger transport across Bangalore and South India. We operate 6 standardized vehicle classes — from our agile 12+1 Tempo Traveller for family getaways to our 49+1 Luxury Bus for large weddings and corporate conferences.</p>
                  <p>Every booking includes an experienced, background-verified chauffeur with at least 5 years of commercial highway experience, transparent upfront pricing, zero hidden charges at drop-off, and dedicated GST billing for institutional clients.</p>
                  <p>Whether you require a recurring 5 AM employee shuttle in Electronic City, an airport transfer to Kempegowda International Airport (BLR), or a multi-day temple circuit across Karnataka, Tamil Nadu, and Kerala, our dispatch desk is available 24/7.</p>
                </div>
              </Reveal>
              <div className="mt-8">
                <Btn href="/about" variant="dark">
                  Discover our story
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="What we offer" title="Bus rental" accent="by occasion" align="split" lede="Six standardized seating capacities deployed for corporate, personal, and institutional journeys." />
          <ServicePanels />
        </div>
      </section>

      <DestinationsScroller heading={<SectionHeading eyebrow="Where we go" title="Our frequent" accent="outstation destinations" className="!mb-0" />} />

      {/* Route map */}
      <section className="relative overflow-hidden py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Route network" title="Every road" accent="from Bangalore" align="split" lede="Regular interstate highway routes across Karnataka, Kerala, Tamil Nadu, Telangana, and Andhra Pradesh — under All India Tourist Permits." />
          <RouteMap />
        </div>
      </section>

      {/* Fare calculator */}
      <section className="alt py-28" id="fare-estimator">
        <div className="wrap">
          <SectionHeading eyebrow="Transparent pricing" title="Estimate your fare" accent="in seconds" align="split" light lede="Published tariffs, no surge, no hidden charges. Move the sliders and send the estimate straight to our dispatch desk." />
          <FareCalculator />
        </div>
      </section>

      {/* 21 seater spotlight */}
      <section className="relative overflow-hidden py-28">
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Featured · 14 to 21 passengers" title="21 Seater Mini Bus Rental in Bangalore —" accent="the executive sweet spot" className="!mb-8" />
            <Reveal>
              <p className="text-[15.5px] leading-relaxed text-muted">
                When your team or extended family outgrows a 12-seater Tempo Traveller, our <strong className="text-ink">21+1 Seater Mercedes-Chassis Mini Coach</strong> provides the ideal upgrade without the bulk or high cost of a 33 or 49-seater bus. Engineered by <em>Singh Motor Coach Builders</em>, it delivers supreme comfort for Bangalore corporate team outings, wedding guest shuttles, and weekend road trips to Coorg, Ooty, and Chikmagalur.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["₹6,500 / day", "Local 8hr / 80km package (₹26/extra km, ₹350/extra hr)"],
                ["₹32 – ₹36 / km", "Outstation interstate rate + ₹600/day driver bata"],
              ].map(([a, b], i) => (
                <Reveal key={a} delay={i * 0.1} className="rounded-3xl p-6 card">
                  <p className="display text-4xl text-forest">{a}</p>
                  <p className="mt-2 text-sm text-muted">{b}</p>
                </Reveal>
              ))}
            </div>
            <ul className="mt-8 grid gap-2 text-sm font-bold sm:grid-cols-2">
              {["2x2 pushback recliners", "Clears all 36 Ooty hairpins", "18–20 suitcase boot", "LED TV + PA mic"].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-forest" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href="/21-seater-bus-rental-bangalore">21 seater bus rental prices</Btn>
              <Btn href="/mini-bus-rental-bangalore" variant="ghost">All mini bus sizes</Btn>
              <Btn href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Shanvi Tours, need quote for 21 Seater Mini Bus")}`} external variant="ghost">
                WhatsApp dispatch
              </Btn>
            </div>
          </div>
          <div className="relative">
            <RevealImage src="/images/fleet/mini-bus-exterior.jpg" alt="Shanvi Tours & Travels 21 Seater Mini Bus Bangalore Exterior KA 51 AB 8485" className="aspect-[4/5] rounded-[36px]" sizes="(max-width:1024px) 100vw, 50vw" />
            <span className="absolute bottom-6 left-6 rounded-md border-2 border-ink bg-[#ffd84d] px-3 py-1 font-mono text-sm font-bold text-ink">KA 51 AB 8485</span>
          </div>
        </div>
      </section>

      {/* Wedding stack */}
      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Peak November – February wedding season" title="Wedding transport logistics" accent="in Bangalore" align="split" lede="Flawless, royal transit across Palace Grounds, Kanakapura Road resort corridors, Yelahanka banquet lawns, and outstation destinations." />
          <StackCards items={wedding} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href="/contact?service=wedding">Reserve wedding fleet</Btn>
            <Btn href="/fleet#49-luxury-bus" variant="ghost">
              49+1 coach specs
            </Btn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="alt py-28">
        <div className="wrap">
          <SectionHeading eyebrow="How booking works" title="Four steps." accent="Zero hassle." align="center" light />
          <ProcessTimeline />
        </div>
      </section>

      {/* Reviews */}
      <section className="overflow-hidden py-28">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Verified Google reviews" title="What our travellers" accent="say on Google" className="!mb-0" />
            <Reveal className="flex items-center gap-6 rounded-[28px] p-6 card">
              <p className="display text-7xl text-forest">5.0</p>
              <div>
                <p className="text-lg tracking-widest text-forest">★★★★★</p>
                <p className="text-sm text-muted">Based on 25 verified Google reviews</p>
                <a href={site.maps} target="_blank" rel="noopener" className="mt-2 inline-block py-2.5 text-sm font-extrabold text-forest hover:underline">
                  View on Google Maps →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        <ReviewsMarquee />
      </section>

      {/* Video */}
      <section id="video-showcase" className="pb-28">
        <div className="wrap">
          <VideoShowcase
            src="/videos/scene-w2.mp4"
            poster="/images/destinations/tajmahal-poster.jpg"
            title="South India Tour & Luxury Bus Fleet"
            text="Watch our fleet on outstation tour routes across South India, operating with All India Tourist Permits across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana."
          />
        </div>
      </section>
      <JsonLd data={videoSchema(videos.home)} />

      {/* Areas */}
      <section className="alt overflow-hidden pt-28">
        <div className="wrap">
          <SectionHeading eyebrow="Where we pick up" title="Areas we serve" accent="across Bangalore" align="center" light lede="Tempo Traveller, Mini Bus & Luxury Bus pickup and drop across all residential and tech corridors — 24/7 across the entire BBMP and BMRDA territory." />
        </div>
        <AreasCloud />
      </section>

      <FaqSection items={faqs.home} lede="Everything you need to know about booking mini buses and coaches in Bangalore." />

      <CtaBanner title="Ready to book your bus" accent="in Bangalore?" text="Call or WhatsApp our 24/7 team now for transparent pricing and vehicle availability." />
    </>
  );
}
