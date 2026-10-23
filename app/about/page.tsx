import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, BadgeCheck, Clock, IndianRupee, ShieldCheck, Target, UserCheck, Bus, Eye } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs } from "@/components/blocks";
import { CtaBanner, ReviewsMarquee, RevealImage, StatsBand } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { team, site } from "@/lib/content";
import { meta } from "@/lib/seo";

export const metadata = meta("about", "/about", "/images/tempo/tempo-front-quarter.jpg");

const why = [
  { icon: Award, href: "/services#outstation", img: "/images/destinations/mysore.jpg", alt: "Mysore Palace illuminated at night Karnataka", title: "12+ Years Operating Experience", text: "Established in 2013, our decade-long operational tenure guarantees deep familiarity with local routes and interstate highways." },
  { icon: ShieldCheck, href: "/services#corporate", img: "/images/destinations/coorg.jpg", alt: "Peaceful green countryside in Coorg Karnataka", title: "Passenger Safety & Insurance", text: "100% commercial Yellow Board registration, AIS-140 GPS telematics, speed governors, and comprehensive passenger insurance coverage." },
  { icon: Clock, href: "/contact", img: "/images/destinations/chikmagalur.jpg", alt: "Misty hills of Chikmagalur Western Ghats", title: "24/7 Live Dispatch Support", text: "Round-the-clock reservation desk and live operational support for flight delays, schedule revisions, and emergency travel needs." },
  { icon: UserCheck, href: "/fleet", img: "/images/destinations/wayanad.jpg", alt: "Forested hills of Wayanad Kerala", title: "Verified Highway Chauffeurs", text: "Police background-verified drivers with commercial passenger badges and at least 5 years experience on South Indian routes." },
  { icon: IndianRupee, href: "/services#corporate", img: "/images/destinations/munnar.jpg", alt: "Rolling tea estates in Munnar Kerala", title: "Transparent GST Pricing", text: "Clear upfront quotes with itemized toll, state tax, and driver allowance estimates. Full B2B corporate GST credit compliance." },
  { icon: Bus, href: "/fleet", img: "/images/destinations/gokarna.jpg", alt: "Om Beach in Gokarna Karnataka", title: "Diverse Fleet Inventory", text: "Six distinct seating sizes (12+1, 21+1, 25+1, 33+1, 45+1, 49+1) matching any headcount without overcharging or vehicle overcrowding." },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "About Us" }]}
        eyebrow="Since 2013 · Nagadevanahalli, Bangalore"
        title="About Shanvi"
        accent="Tours & Travels"
        lede="Bangalore's Trusted Commercial Passenger Transport Partner Since 2013"
        image="/images/tempo/tempo-front-quarter.jpg"
        imageAlt="About Shanvi Tours & Travels Bangalore Commercial Passenger Transport"
        position="center 60%"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href="/contact">Contact our team</Btn>
          <Btn href="/fleet" variant="ghost">
            View our fleet
          </Btn>
        </div>
      </PageHero>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Corporate Profile & Regulatory Credentials" chips={["Established: 2013 (12+ Years Active)", "Founder: Pradeep H.B.", "Headquarters: Nagadevanahalli, Bangalore", "Regulatory: Yellow Board & AITP Compliant", "5.0 Rating (25 Verified Google Reviews)"]}>
            <p>
              Founded in 2013 by <strong>Pradeep H.B.</strong>, <strong>Shanvi Tours &amp; Travels</strong> is a registered commercial passenger transport company headquartered at SMV Layout, Nagadevanahalli, Bangalore (PIN 560056). For over <strong>12 years</strong>, the company has operated an owned fleet of <strong>12+1, 21+1, 33+1, and 49+1 seater AC vehicles</strong> under the <strong>Motor Vehicles Act, 1988</strong> and <strong>Karnataka Motor Vehicles Rules, 1989</strong>. With more than <strong>10,000 completed group journeys</strong> and <strong>1,200,000+ passenger-kilometers navigated safely</strong>, we maintain a 100% Yellow-Board commercial registration with <strong>All India Tourist Permits (AITP)</strong> across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap grid items-start gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Our journey" title="From a single route" accent="to a South India fleet" className="!mb-10" />
            <RevealImage src="/images/coach/coach-interior-seats.jpg" alt="Shanvi Tours & Travels fleet vehicle interior" className="aspect-[4/3] rounded-[32px]" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <Reveal className="space-y-5 text-[16px] leading-relaxed text-muted lg:pt-24">
            <p>Shanvi Tours &amp; Travels began operations in 2013 with a straightforward commitment: deliver reliable, safe, and transparent passenger transport without the middleman margins or unreliable cancellations typical of aggregator platforms.</p>
            <p>Pradeep H. B. established the business to provide hands-on, accountable management. Whether coordinating early morning 5:00 AM employee pickups for Bangalore IT corridors, arranging multi-bus wedding convoys, or leading 10-day pilgrimage circuits through the temple towns of South India, every tour is planned with exact vehicle allocation and verified drivers.</p>
            <p>
              During the peak November to February wedding season, Shanvi Tours is Bangalore&apos;s trusted operator for <strong className="text-ink">Wedding Transport Logistics</strong> — orchestrating <strong className="text-ink">multi-vehicle coordinated convoys for weddings with 200+ guests</strong>, deploying flagship <strong className="text-ink">49+1 Luxury Coaches with red carpet aisle and plush pushback upholstery</strong>, and running <strong className="text-ink">continuous shuttle loops between guest hotels and reception venues</strong> across Palace Grounds, Kanakapura Road, and Yelahanka.
            </p>
            <p>Today, our fleet encompasses six distinct vehicle capacities: 12+1 Seater Tempo Travellers, 21+1 Seater Mercedes Mini Buses, 25+1 Seater Mini Coaches, 33+1 Seater Touring Buses, 45+1 Seater Premium Coaches, and 49+1 Seater Luxury Highway Coaches. Our drivers are trained in highway safety, defensive driving on ghat sections, and courteous passenger service.</p>
          </Reveal>
        </div>
        <div className="wrap mt-24">
          <StatsBand />
        </div>
      </section>

      <section className="py-10">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Operational Mission", lead: "To provide right-sized, safe, and transparent passenger transport for every group. We reject the common industry practice of overbooking smaller groups into cramped vans or forcing small teams into oversized, expensive buses.", text: "We maintain strict vehicle maintenance schedules, perform rigorous pre-departure mechanical inspections, enforce CMVR-mandated speed governance, and offer clear, upfront fixed quotes with zero hidden drop-off charges." },
            { icon: Eye, title: "Our Quality Vision", lead: "To be South India's premier independent commercial bus fleet operator by preserving personal accountability while scaling our transport network.", text: "Our leadership remains directly accessible for client consultations. Repeat clients enjoy dedicated driver assignments and custom itinerary support, ensuring our operations stay grounded in reliability, driver dignity, and passenger safety." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <Tilt className="h-full rounded-[32px] p-9 card">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-white">
                  <c.icon className="h-6 w-6" />
                </span>
                <h2 className="display mt-6 text-4xl">{c.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-ink">{c.lead}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.text}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Our standards" title="Why choose" accent="Shanvi Tours & Travels?" align="split" lede="Verifiable credentials and operational excellence distinguishing our commercial service." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <Link href={w.href} className="group relative block h-[420px] overflow-hidden rounded-[30px]" data-cursor="Explore">
                  <Image src={w.img} alt={w.alt} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/10 transition-colors duration-500 group-hover:via-night/75" />
                  <span className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-sand backdrop-blur-md transition-colors group-hover:bg-forest group-hover:text-white group-hover:text-white">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <h3 className="display text-3xl">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{w.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Leadership & operational team" title="The people behind" accent="Shanvi Tours & Travels" align="split" light lede="Hands-on management, police-verified drivers, and safety coordinators ensuring zero-compromise travel in Bangalore." />
          <div className="grid gap-5 md:grid-cols-3">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <Tilt className="h-full rounded-[30px] bg-white p-8 shadow-[0_30px_70px_-40px_rgb(20_33_28/0.4)]">
                  <span className="display grid h-20 w-20 place-items-center rounded-full bg-mint text-3xl text-forest">{t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>
                  <h3 className="display mt-6 text-3xl text-ink">{t.name}</h3>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-forest">{t.role}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{t.text}</p>
                  <p className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-sm font-bold text-ink">
                    <BadgeCheck className="h-4 w-4 text-[#0f7a3c]" /> {t.foot}
                  </p>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 rounded-[30px] border border-line bg-white p-8 text-ink">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-forest">Mandatory Commercial Driver Vetting Protocols (100% Fleet Compliant)</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["Police Background Verification", "5+ Years Highway Experience", "Zero Substance Tolerance Policy", "Uniformed & Bilingual Chauffeurs"].map((x) => (
                <li key={x} className="flex items-center gap-2 font-bold">
                  <BadgeCheck className="h-5 w-5 text-forest" /> {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Verified Google reviews" title="Client testimonials" accent="& Google ratings" align="split" lede={<>Read 100% genuine reviews from travelers who experienced our passenger bus service in Bangalore. <a href={site.maps} target="_blank" rel="noopener" className="font-bold text-forest">View on Google Maps <ArrowUpRight className="inline h-4 w-4" /></a></>} />
        </div>
        <ReviewsMarquee />
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Shanvi Tours & Travels",
          description: "Company history, executive leadership, safety credentials, wedding transport logistics, and fleet overview of Shanvi Tours & Travels Bangalore.",
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
      <CtaBanner title="Partner with Bangalore's" accent="reliable fleet operator" text="Contact Pradeep H.B. and the Shanvi Tours team for bookings, corporate accounts, and wedding transport logistics." primary={{ href: "/contact", label: "Contact us today" }} />
    </>
  );
}
