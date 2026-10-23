import Link from "next/link";
import { BadgeCheck, Check, FileText, UserCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs, FaqSection } from "@/components/blocks";
import { CtaBanner, RevealImage } from "@/components/sections";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { faqs } from "@/lib/generated";
import { meta } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata = meta("services", "/services", "/images/coach/coach-sunset-front.jpg");

const rows = [
  {
    id: "employee-transport",
    label: "Employee transport",
    title: "Mini Bus Rental for Employee Transport",
    lead: "Dedicated daily staff shuttle services for IT companies, manufacturing plants, hospitals, and tech parks across Bangalore. Deployed on our 12+1 Seater Tempo Travellers or 21+1 Seater Mercedes Mini Buses depending on shift density and headcount.",
    body: "We establish optimized, geofenced commuter routes across Electronic City, Whitefield, Outer Ring Road, Marathahalli, Manyata Tech Park, and Koramangala. Every bus is monitored via AIS-140 certified GPS with panic buttons, ensuring passenger safety and strict on-time arrival.",
    listTitle: "Corporate Transport Features",
    list: ["Custom route planning and geofenced pickup stops across Greater Bangalore", "100% background-verified commercial drivers with police clearance", "Live AIS-140 GPS tracking integration for transport desk managers", "Flexible 24/7 scheduling supporting rotational shifts (Day, Evening, Night)", "Dual-zone AC climate control and hygienic sanitization protocols", "Monthly or annual SLA contracts with corporate invoicing and GST ITC eligibility", "Standby backup vehicles deployed in case of traffic contingencies"],
    cta: "Enquire for employee transport",
    images: [["/images/services/employee-transport.jpg", "Corporate Employee Transport Services Bangalore - Daily Staff Shuttles in 12+1 & 21+1 Seater AC Buses"], ["/images/tempo/tempo-interior-lights.jpg", "12+1 seater Tempo Traveller interior for employee transport Bangalore"]],
  },
  {
    id: "corporate",
    label: "Corporate",
    title: "Corporate Bus Rental Bangalore",
    lead: "Executive transportation for annual offsites, client delegations, leadership summits, and multi-city corporate retreats. Booked in exact seating capacities (21+1, 33+1, or 49+1) with uniformed, English- and Hindi-speaking chauffeurs.",
    body: "We coordinate point-to-point transfers from Kempegowda International Airport (BLR), five-star business hotels, and convention centers directly to offsite resorts in Coorg, Kabini, Chikmagalur, and Mysore with full luggage assistance.",
    listTitle: "Executive Services Include",
    list: ["Executive 21+1 Mini Bus, 33+1 Bus, or 49+1 Luxury Coach sized to your headcount", "Dedicated airport pickup greeters and hotel transfer coordinators", "Onboard mobile charging stations and Bluetooth presentation audio", "Multi-day interstate coordination for offsites in Goa, Wayanad, and Ooty", "Standard corporate GST tax invoices with trip telemetry logs", "Dedicated single point of contact (SPOC) for transport management"],
    cta: "Request corporate quote",
    images: [["/images/services/corporate.jpg", "Corporate Bus Rental Bangalore - Executive Luxury Coach Hire for Conferences and Offsites"], ["/images/fleet/mini-bus-exterior.jpg", "21+1 seater Mini Bus for corporate bus rental Bangalore"]],
  },
  {
    id: "wedding",
    label: "Wedding · Peak season Nov–Feb",
    title: "Wedding Transport Logistics & Bus Rental Bangalore",
    lead: "Comprehensive, stress-free wedding guest transportation between marriage halls, kalyana mantapas, five-star banquet hotels, and reception venues. During the peak November to February wedding season, we ensure your wedding party arrives together in synchronized, air-conditioned comfort.",
    body: "From baraat processions and BLR airport reception transfers to multi-stop guest pickups across Bangalore (Palace Grounds, Whitefield, Kanakapura Road, Nelamangala resorts, Yelahanka), our dedicated wedding convoy managers keep every schedule running like clockwork.",
    listTitle: "Wedding Transport Logistics",
    list: ["49+1 Luxury Coach with red carpet aisle and plush pushback upholstery", "Multi-vehicle coordinated convoys for weddings with 200+ guests", "Continuous shuttle loops between guest hotels and reception venues", "Flexible timing adapting to muhurtham ceremonies, sangeet, and reception extensions", "Generous underfloor luggage bays for heavy bridal trunks and gift packaging", "Uniformed, courteous chauffeurs and dedicated lead convoy coordinator", "Vehicle floral decoration coordination available upon request"],
    cta: "Plan wedding transport",
    images: [["/images/coach/coach-interior-aisle.jpg", "49+1 seater Luxury Bus interior for wedding guest transport Bangalore"], ["/images/fleet/bus-city-street.jpg", "Wedding Bus Rental Bangalore - Guest Transport on City Streets"]],
  },
  {
    id: "school-college",
    label: "School & college",
    title: "School & College Trip Bus Rental",
    lead: "Educational excursions, university industrial visits, sports tournaments, and college graduation tours across South India. Built around student safety and institutional compliance.",
    body: "Every vehicle complies strictly with school bus safety norms under Central Motor Vehicles Rules (CMVR): certified emergency exits, first-aid equipment, fire extinguishers, speed governors capped at 80 km/h, and experienced senior drivers.",
    listTitle: "Safety & Institutional Features",
    list: ["33+1 Touring Bus or 49+1 Luxury Coach accommodating entire academic sections", "Mandatory speed governor compliance (maximum 80 km/h)", "First-aid kits, window emergency hammers, and operational fire extinguishers", "Experienced drivers accustomed to student group trips and faculty briefings", "Single-day educational visits (Science City, Bannerghatta) or multi-day tours (Hampi, Ooty)", "Institutional billing with transparent fixed per-day packages"],
    cta: "Get school trip quote",
    images: [["/images/fleet/bus-exterior.jpg", "School and College Excursion Bus Hire Bangalore - Safe RTO-Compliant Buses"], ["/images/fleet/bus-interior.jpg", "33+1 seater Bus interior for school and college trips Bangalore"]],
  },
  {
    id: "outstation",
    label: "Outstation",
    title: "Outstation Bus Rental from Bangalore",
    lead: "Inter-state highway passenger transport across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana. One-way drops or multi-day round-trip vacation packages.",
    body: "Backed by All India Tourist Permits (AITP) for seamless border transit without border checkpost delays. Our chauffeurs possess intimate knowledge of ghat roads, hairpin bends, highway rest stops, and scenic detour routes.",
    listTitle: "Outstation Journey Features",
    list: ["All 6 vehicle classes available: 12+1, 21+1, 25+1, 33+1, 45+1, and 49+1 seater", "All India Tourist Permit (AITP) interstate coverage", "Transparent per-km or all-inclusive day package billing", "Driver accommodation and day/night bata factored transparently", "Top destinations: Mysore, Coorg, Wayanad, Munnar, Ooty, Gokarna, Tirupati, Hyderabad", "Full mechanical pre-trip inspection before every highway departure"],
    cta: "Plan outstation trip",
    images: [["/images/coach/coach-sunset-front.jpg", "Outstation Bus Rental from Bangalore Across Karnataka Kerala and Tamil Nadu"], ["/images/fleet/luxury-bus-temple-1.jpg", "Luxury Bus on Inter-State Outstation Route from Bangalore"]],
  },
  {
    id: "package-tours",
    label: "Pilgrimage & packages",
    title: "Pilgrimage & Package Tour Bus Rental",
    lead: "Sacred temple circuits and customized South Indian heritage tours organized around senior citizen comfort, temple opening timings, and custom prayer schedules.",
    body: "Regular circuits include Tirupati Balaji (Tirumala), Dharmasthala, Kukke Subramanya, Sringeri, Horanadu, Murudeshwar, Madurai, and Rameshwaram. We size the coach to your family or group headcount.",
    listTitle: "Pilgrimage Comfort Features",
    list: ["Elderly-friendly easy-entry steps and ergonomic reclining seats", "Itineraries coordinated around darshan timings and temple rituals", "Custom multi-day circuits combining coastal, heritage, and temple shrines", "Spacious luggage compartments accommodating prasadam and luggage", "Drivers familiar with temple entry passes, parking zones, and accommodation hubs"],
    cta: "Book pilgrimage tour",
    images: [["/images/fleet/luxury-bus-temple-2.jpg", "Pilgrimage and Package Tour Bus Rental Bangalore - Tirupati Dharmasthala Packages"], ["/images/services/package-tours.jpg", "Touring coach for temple pilgrimage tours from Bangalore"]],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Our Services", path: "/services" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Our Services" }]}
        eyebrow="12+1 to 49+1 seaters · with driver"
        title="Bus rental services"
        accent="in Bangalore"
        lede="12+1 to 49+1 seater vehicles, with driver, for every corporate, personal, and institutional occasion"
        image="/images/coach/coach-sunset-front.jpg"
        imageAlt="Mini bus and bus rental fleet, Shanvi Tours & Travels Bangalore"
        position="center 62%"
      >
        <div className="flex flex-wrap gap-2">
          {rows.map((r) => (
            <Link key={r.id} href={`#${r.id}`} className="rounded-full px-4 py-3 text-xs font-extrabold border border-line bg-white text-ink transition hover:border-forest hover:text-forest">
              {r.label.split(" · ")[0]}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Authoritative Service Overview: Commercial Bus Hire Bangalore" chips={["GST Input Credit Invoicing", "AIS-140 GPS Route Tracking", "Comprehensive Passenger Insurance", "All India Tourist Permit (AITP)", "5.0 Rating (25 Verified Google Reviews)"]}>
            <p>
              Shanvi Tours &amp; Travels offers comprehensive passenger mobility solutions across Greater Bangalore and South India. Operating under strict compliance with the <strong>Motor Vehicles Act, 1988</strong> and <strong>Karnataka Motor Vehicles Rules</strong>, all bookings feature commercial Yellow-Board vehicles fitted with <strong>AIS-140 GPS telemetry</strong>, speed governors calibrated to 80 km/h, and verified commercial chauffeurs. Our services include monthly <strong>corporate employee shuttles</strong>, <strong>executive conference transport</strong>, <strong>marriage guest convoys</strong>, <strong>school excursion coaches</strong>, and <strong>All India Tourist Permit (AITP) outstation tours</strong> across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, and Telangana.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Tailored solutions" title="Commercial bus rental" accent="by occasion" lede="Our six standardized vehicle classes — 12+1 Tempo Traveller, 21+1 Mini Bus, 25+1 Mini Coach, 33+1 Bus, 45+1 Premium Coach, and 49+1 Luxury Bus — deployed for your exact logistical requirement." />
          {rows.map((r, i) => (
            <article key={r.id} id={r.id} className="grid scroll-mt-28 gap-12 border-t border-line py-20 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="display text-6xl leading-none text-forest/20 sm:text-8xl">0{i + 1}</p>
                <p className="eyebrow mt-2">{r.label}</p>
                <h2 className="display mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">{r.title}</h2>
                <Reveal>
                  <p className="mt-6 text-[16px] leading-relaxed text-ink">{r.lead}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{r.body}</p>
                </Reveal>
                <h3 className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-forest">{r.listTitle}</h3>
                <ul className="mt-5 grid gap-3">
                  {r.list.map((l, j) => (
                    <Reveal as="li" key={l} delay={j * 0.04} y={14} className="flex gap-3 text-[15px]">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className={j < 3 && r.id === "wedding" ? "font-bold text-ink" : "text-muted"}>{l}</span>
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Btn href={r.id === "wedding" ? "/contact?service=wedding" : "/contact"}>{r.cta}</Btn>
                  <Btn href={`https://wa.me/${site.whatsapp}`} external variant="ghost">
                    WhatsApp
                  </Btn>
                </div>
              </div>
              <div className={`grid content-start gap-4 lg:sticky lg:top-28 ${i % 2 ? "lg:order-1" : ""}`}>
                <RevealImage src={r.images[0][0]} alt={r.images[0][1]} className="aspect-[16/11] rounded-[32px]" sizes="(max-width:1024px) 100vw, 50vw" />
                <RevealImage src={r.images[1][0]} alt={r.images[1][1]} className="aspect-[16/8] rounded-[32px]" sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Trust & authority" title="Why book with" accent="Shanvi Tours & Travels?" align="split" lede="The Shanvi Tours & Travels commercial advantage built over 12+ years." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { I: BadgeCheck, t: "Licensed & AITP Permitted", d: "100% commercial Yellow Board vehicles with All India Tourist Permits and passenger insurance." },
              { I: Wrench, t: "Well Maintained & Sanitized", d: "Rigorous pre-trip preventative maintenance and cabin sanitization before every dispatch." },
              { I: UserCheck, t: "Verified Highway Chauffeurs", d: "Background-checked drivers with 5+ years of highway experience across South Indian corridors." },
              { I: FileText, t: "Transparent GST Billing", d: "Clear, fixed pricing with zero hidden surcharges and full corporate GST Input Tax Credit." },
            ].map(({ I, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Tilt className="h-full rounded-[28px] p-7 card">
                  <I className="h-8 w-8 text-forest" />
                  <h3 className="mt-6 text-lg font-extrabold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs.services} title="Service" accent="questions" lede="Clear answers regarding contracts, billing, and booking policies." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: rows.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: r.title, description: r.lead, provider: { "@id": `${site.url}/#organization` }, areaServed: i > 3 ? "India" : "Bangalore", url: `${site.url}/services#${r.id}` },
          })),
        }}
      />
      <CtaBanner title="Ready to book a bus" accent="for your next trip?" text="Tell us your group size and dates — our 24/7 team will recommend the ideal coach with a fixed quote." primary={{ href: "/contact", label: "Request custom quote" }} image="/images/coach/coach-sunset-side.jpg" />
    </>
  );
}
