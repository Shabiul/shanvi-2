import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, ChevronRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/blocks";
import { CtaBanner } from "@/components/sections";
import { JsonLd } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { posts } from "@/lib/generated";

// Blog articles keep their legacy root-level URLs (/blog-21-seater-...).
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ post: p.slug }));
}

const find = (slug: string) => posts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const p = find((await params).post);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { type: "article", title: p.metaTitle, description: p.description, url: `/${p.slug}`, images: [{ url: p.image }] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ post: string }> }) {
  const p = find((await params).post);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== p.slug);
  return (
    <>
      <Breadcrumbs items={[{ name: "Travel Blog", path: "/blog" }, { name: p.title, path: `/${p.slug}` }]} />
      {p.schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      <header className="relative overflow-hidden bg-paper pb-16 pt-32 md:pt-40">
        <div className="wrap relative max-w-5xl">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-muted">
            <li><Link href="/" className="-my-3 inline-block py-3 hover:text-forest">Home</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3" /><Link href="/blog" className="-my-3 inline-block py-3 hover:text-forest">Blog</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3" /><span className="text-ink">{p.category}</span></li>
          </ol>
          <p className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-muted">
            <span className="rounded-full bg-forest px-3 py-1 text-white">{p.category}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {p.updated}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.readTime}</span>
          </p>
          <h1 className="display mt-6 text-[clamp(2.6rem,1.6rem+4vw,5.6rem)] leading-[0.92]">
            <span className="block animate-[page-in_1s_cubic-bezier(0.16,1,0.3,1)_both]">{p.h1}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{p.lede}</p>
          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <span className="display grid h-14 w-14 place-items-center rounded-full bg-forest text-xl text-white">PH</span>
            <div>
              <p className="font-extrabold">{p.byline}</p>
              <p className="text-sm text-muted">{p.bylineSub}</p>
            </div>
          </div>
        </div>
        <div className="wrap relative mt-14 max-w-6xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[32px]">
            <Image src={p.image} alt={p.imageAlt} fill priority sizes="(max-width:1280px) 100vw, 1200px" className="animate-[kenburns_2.4s_cubic-bezier(0.16,1,0.3,1)_both] object-cover" />
          </div>
        </div>
      </header>

      <article className="alt py-20">
        <div className="wrap max-w-[820px]">
          <div className="prose-shanvi" dangerouslySetInnerHTML={{ __html: p.body }} />
        </div>
      </article>

      <section className="py-24">
        <div className="wrap">
          <h2 className="display text-[clamp(2.2rem,3.6vw,3.6rem)]">
            Keep <span className="serif text-forest">reading</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <Link href={`/${o.slug}`} className="group block overflow-hidden rounded-[28px] card" data-cursor="Read">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={o.image} alt={o.imageAlt} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-forest">{o.category}</p>
                    <h3 className="mt-2 font-extrabold leading-snug">{o.title}</h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-forest">
                      Read <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner title="Need a quote for" accent="your travel dates?" text="Get an instant all-inclusive quotation from Shanvi Tours & Travels with zero booking fees and direct driver assignment." />
    </>
  );
}
