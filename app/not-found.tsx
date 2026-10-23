import Link from "next/link";
import { ArrowUpRight, Bus, ClipboardList, Newspaper, Phone } from "lucide-react";
import { Btn } from "@/components/ui";
import { site, waLink } from "@/lib/content";

export const metadata = { title: "404 - Page Not Found | Shanvi Tours & Travels Bangalore", robots: { index: false } };

const tiles = [
  { href: "/21-seater-bus-rental-bangalore", I: Bus, t: "21 Seater Mini Bus", d: "From ₹6,500/day • 2x2 AC Pushback" },
  { href: "/fleet", I: ClipboardList, t: "Fleet & Tariffs", d: "12, 21, 33 & 49 Seater Coaches" },
  { href: "/blog", I: Newspaper, t: "Travel Guides & Blog", d: "Outstation itineraries & tips" },
  { href: "/contact", I: Phone, t: "24/7 Dispatch Desk", d: "Instant quotes & vehicle booking" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-36">
      <div className="wrap relative max-w-5xl">
        <p className="display text-[clamp(8rem,22vw,18rem)] leading-[0.8] text-forest">404</p>
        <h1 className="display mt-6 text-[clamp(2.4rem,5vw,4.6rem)]">
          Looking for a route <span className="serif text-forest">we don&apos;t cover?</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">The page or file you are trying to reach has moved or does not exist. But don&apos;t worry — Shanvi Tours &amp; Travels has verified commercial vehicles ready for your Bangalore journey.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {tiles.map(({ href, I, t, d }) => (
            <Link key={href} href={href} className="group flex items-center gap-4 rounded-[24px] p-5 card transition-colors hover:border-forest/40">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white">
                <I className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block font-extrabold">{t}</span>
                <span className="text-sm text-muted">{d}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-forest transition-transform group-hover:rotate-45" />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="/">Back to home</Btn>
          <Btn href={waLink("Hi Shanvi Tours, need a vehicle quote")} external variant="wa">
            WhatsApp dispatch ({site.phone})
          </Btn>
        </div>
      </div>
    </section>
  );
}
