import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnswerBox, Breadcrumbs, FaqSection } from "@/components/blocks";
import { ContactForm } from "@/components/contact-form";
import { Btn, JsonLd, SectionHeading } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { site, waLink } from "@/lib/content";
import { faqs } from "@/lib/generated";
import { meta, videoSchema, videos } from "@/lib/seo";

export const metadata = meta("contact", "/contact", "/images/destinations/gokarna-kudle-beach.jpg");

const lines = [
  { I: MapPin, h: "Our Bangalore Address", body: <>#2472/1, 3rd Block, SMV Layout,<br />Doddabasthihalli, Near Vijaya Hospital,<br />Nagadevanahalli, Bangalore - 560056, Karnataka, India</> },
  { I: Phone, h: "Direct Phone Lines", body: <><a href="tel:9611120023" className="font-extrabold text-forest">+91 9611120023</a> (Primary)<br /><a href="tel:8050507333" className="font-extrabold text-forest">+91 8050507333</a> (Reservations)</>, small: "Available 24 hours daily for urgent departures and schedule revisions" },
  { I: Mail, h: "Official Email", body: <a href={`mailto:${site.email}`} className="font-extrabold text-forest">{site.email}</a>, small: "Corporate RFP proposals and billing enquiries handled within 12 hours" },
  { I: MessageCircle, h: "WhatsApp Chat", body: <a href={waLink()} target="_blank" rel="noopener" className="font-extrabold text-forest">Chat with our fleet desk on WhatsApp</a>, small: "Instant replies with vehicle photos, seating layouts, and rates" },
  { I: Clock, h: "Operating Hours", body: <>Monday – Sunday: Open 24/7<br />Always ready for planned tours and emergency bookings</> },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="Open 24/7 · 365 days"
        title="Contact Shanvi"
        accent="Tours & Travels"
        lede="24/7 Reservations, Transparent Quotes & Dispatch Support in Bangalore"
        image="/images/destinations/gokarna-kudle-beach.jpg"
        imageAlt="Cinematic FPV drone footage over a tropical beach cove and South India travel route"
        video="/videos/scene-w1.mp4"
      >
        <div className="flex flex-wrap gap-3">
          <Btn href={`tel:${site.phoneIntl}`} external>
            <Phone className="h-4 w-4" /> Call {site.phone}
          </Btn>
          <Btn href={waLink()} external variant="wa">
            WhatsApp booking
          </Btn>
        </div>
      </PageHero>
      <JsonLd data={videoSchema(videos.contact)} />

      <section className="alt py-24">
        <div className="wrap">
          <AnswerBox title="Direct Booking & 24/7 Dispatch Desk" chips={["Operating Hours: 24/7 (Mon - Sun)", "Primary: +91 9611120023", "Secondary: +91 8050507333", site.email]}>
            <p>
              To book a <strong>12+1 Tempo Traveller, 21+1 Mini Bus, 33+1 Touring Bus, or 49+1 Luxury Bus</strong> in Bangalore, contact Shanvi Tours &amp; Travels directly. We provide immediate vehicle availability checks and fixed quotes. Our administrative dispatch office is located at <strong>#2472/1, 3rd Block, SMV Layout, Doddabasthihalli, Near Vijaya Hospital, Nagadevanahalli, Bangalore - 560056</strong> (accessible via Mysore Road, Kengeri, and Nagadevanahalli Main Road). Phone support is live 24/7/365 at <strong>+91 9611120023</strong> and <strong>+91 8050507333</strong>.
            </p>
          </AnswerBox>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Get in touch" title="Reach out for inquiries" accent="& reservations" lede="Speak directly with our Bangalore dispatch team for competitive, transparent quotes." className="!mb-10" />
            <ul className="grid gap-2">
              {lines.map(({ I, h, body, small }, i) => (
                <Reveal as="li" key={h} delay={i * 0.06} className="flex gap-5 rounded-[24px] p-5 transition-colors hover:bg-white/[0.04]">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest text-white">
                    <I className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted">{h}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{body}</p>
                    {small && <p className="mt-1 text-sm text-subtle">{small}</p>}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Suspense fallback={<div className="h-[640px] rounded-[32px] card" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Location map" title="Find our office" accent="in Bangalore" align="split" lede="Visit our facility in Nagadevanahalli, SMV Layout to inspect vehicles or discuss corporate contracts." />
          <Reveal className="overflow-hidden rounded-[32px] border border-line">
            <iframe
              src="https://www.google.com/maps?q=Shanvi+Tours+%26+Travels%2C+SMV+Layout%2C+Nagadevanahalli%2C+Bangalore+560056&output=embed"
              className="h-[460px] w-full grayscale-[60%] invert-[92%] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shanvi Tours and Travels Office Location Bangalore"
              allowFullScreen
            />
          </Reveal>
          <div className="mt-6 text-center">
            <Btn href={site.maps} external variant="ghost">
              Open in Google Maps (Google Business Profile)
            </Btn>
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          <SectionHeading eyebrow="Immediate action" title="Quick contact" accent="options" align="center" lede="Choose the fastest channel to reserve your vehicle." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { I: Phone, t: "Call Us Directly", d: "Immediate vehicle confirmation with our senior dispatch coordinator.", href: `tel:${site.phoneIntl}`, l: `Call ${site.phone}`, v: "primary" as const },
              { I: MessageCircle, t: "WhatsApp Booking", d: "Get vehicle exterior and interior photos, rate cards, and location pins instantly.", href: waLink(), l: "Start WhatsApp chat", v: "wa" as const },
              { I: Mail, t: "Corporate Email", d: "Submit formal RFPs, vendor onboarding packages, and monthly shuttle requirements.", href: `mailto:${site.email}`, l: "Send email", v: "light" as const },
              { I: Star, t: "Google Reviews", d: "Rated 5.0 / 5.0 Stars across 25 verified travelers on Google Maps.", href: site.maps, l: "View all 25 reviews", v: "ghost" as const },
            ].map(({ I, t, d, href, l, v }, i) => (
              <Reveal key={t} delay={i * 0.07}>
                <Tilt className="flex h-full flex-col rounded-[28px] p-7 card">
                  <I className="h-8 w-8 text-forest" />
                  <h3 className="mt-5 text-lg font-extrabold">{t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d}</p>
                  <div className="mt-6">
                    <Btn href={href} external variant={v} size="sm" magnetic={false}>
                      {l}
                    </Btn>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs.contact} lede="Everything you need to know about booking, payments, and fleet amenities." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Shanvi Tours & Travels",
          description: "24/7 contact phone numbers, office location map, WhatsApp chat, and booking request form for bus hire in Bangalore.",
          url: `${site.url}/contact`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
