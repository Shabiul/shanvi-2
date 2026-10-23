import type { ReactNode } from "react";
import { BadgeCheck, Sparkles } from "lucide-react";
import { Btn, JsonLd, SectionHeading, slug } from "./ui";
import { Faq } from "./sections";
import { Reveal, VelocityMarquee } from "./motion";
import { areas, credentials, fleet, site } from "@/lib/content";

/** AEO "quick answer" block — plain, crawlable copy in a designed card. */
export function AnswerBox({ title, children, chips }: { title: string; children: ReactNode; chips?: string[] }) {
  return (
    <Reveal className="grid gap-6 rounded-[32px] bg-white p-7 text-ink shadow-[0_30px_80px_-40px_rgb(20_33_28/0.35)] md:grid-cols-[260px_1fr] md:gap-10 md:p-10">
      <div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest text-white">
          <Sparkles className="h-6 w-6" />
        </span>
        <h2 id={slug(title)} className="mt-5 scroll-mt-28 text-lg font-extrabold leading-snug">{title}</h2>
      </div>
      <div>
        <div className="space-y-3 text-[15.5px] leading-relaxed text-body [&_strong]:text-ink">{children}</div>
        {chips && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-xs font-bold text-forest">
                <BadgeCheck className="h-3.5 w-3.5 text-[#0f7a3c]" /> {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export function CredentialsBand() {
  return (
    <div className="border-y border-line bg-white py-6">
      <VelocityMarquee baseVelocity={-1.2}>
        {credentials.map((c) => (
          <span key={c} className="display mx-6 flex items-center gap-6 text-3xl text-muted md:text-4xl">
            {c} <span className="text-forest">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export function AreasCloud() {
  return (
    <div className="grid gap-3">
      {[0, 1].map((row) => (
        <VelocityMarquee key={row} baseVelocity={row ? 0.9 : -0.9}>
          {areas.slice(row * 14, row * 14 + 14).map((a) => (
            <span key={a} className="mx-1.5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-bold text-ink">
              <span className="h-2 w-2 rounded-full bg-forest" /> {a}
            </span>
          ))}
        </VelocityMarquee>
      ))}
    </div>
  );
}

export function TariffTable() {
  const inr = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);
  return (
    <div className="overflow-x-auto rounded-[28px] border border-line bg-white shadow-[0_18px_40px_-28px_rgb(20_33_28/0.25)]">
      <table className="w-full min-w-[760px] text-left text-sm">
        <caption className="sr-only">Bangalore bus and tempo traveller rental tariff card</caption>
        <thead>
          <tr className="bg-sand text-[11px] uppercase tracking-[0.16em] text-muted">
            {["Vehicle Class", "Seating", "Local City Package (8 Hr / 80 Km)", "Extra Km / Hr", "Outstation Rate / Km", "Driver Daily Bata", ""].map((h, i) => (
              <th key={i} className="px-5 py-4 font-extrabold">
                {h || <span className="sr-only">Action</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fleet.map((v) => (
            <tr key={v.id} className={`border-t border-line transition-colors hover:bg-paper ${v.id === "21" ? "bg-mint/60" : ""}`}>
              <th scope="row" className="px-5 py-5 font-extrabold">
                {v.name}
                {v.tag && <span className="ml-2 rounded-full bg-mint px-2 py-0.5 text-[10px] font-extrabold text-forest">{v.tag}</span>}
              </th>
              <td className="px-5 py-5">{v.seats}</td>
              <td className="display px-5 py-5 text-2xl text-forest">{inr(v.local)}</td>
              <td className="px-5 py-5 text-muted">
                ₹{v.extraKm}/km | ₹{v.extraHr}/hr
              </td>
              <td className="px-5 py-5 font-extrabold">
                ₹{v.rateMin} – ₹{v.rateMax} / km
              </td>
              <td className="px-5 py-5">₹{v.bata} / day</td>
              <td className="px-5 py-5">
                <Btn href={`/contact?vehicle=${v.id}-seater`} size="sm" variant={v.id === "21" ? "primary" : "ghost"} magnetic={false}>
                  Book now
                </Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqSection({ items, title = "Frequently asked", accent = "questions", lede, schema = true, light = true }: { items: readonly { q: string; a: string }[]; title?: string; accent?: string; lede?: string; schema?: boolean; light?: boolean }) {
  return (
    <section className={light ? "alt py-28" : "bg-paper py-28"} id="faq">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow="Common questions" title={title} accent={accent} lede={lede} light={light} className="!mb-8" />
          <div className="flex flex-wrap gap-3">
            <Btn href={`https://wa.me/${site.whatsapp}`} external variant="dark" size="md">
              Ask on WhatsApp
            </Btn>
            <Btn href={`tel:${site.phoneIntl}`} external variant="primary" size="md">
              Call {site.phone}
            </Btn>
          </div>
        </div>
        <Faq items={items} light={light} />
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site.url + it.path })),
      }}
    />
  );
}
