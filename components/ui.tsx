import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic, Reveal, SplitText } from "./motion";

/** URL-fragment id from heading text, so every section heading is a linkable anchor. */
export const slug = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ").toLowerCase().replace(/&/g, " and ").replace(/\+/g, " plus ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark" | "wa";
  size?: "md" | "lg" | "sm";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  cursor?: string;
};

const variants = {
  primary: "bg-forest text-white shadow-[0_10px_30px_-12px_rgb(15_91_70/0.6)] hover:bg-forest-2",
  ghost: "border border-ink/15 bg-white text-ink hover:border-ink/40",
  light: "bg-white text-ink hover:bg-sand",
  dark: "bg-ink text-white hover:bg-forest-2",
  wa: "bg-wa text-night hover:brightness-105",
};
const sizes = { sm: "h-10 px-4 text-[13px]", md: "h-12 px-6 text-sm", lg: "h-14 px-7 text-[15px]" };

export function Btn({ href, children, variant = "primary", size = "md", external, magnetic = true, className = "", cursor }: BtnProps) {
  const cls = `group relative inline-flex whitespace-nowrap items-center justify-center gap-2 overflow-hidden rounded-full font-extrabold tracking-tight transition-all duration-300 ease-out ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {variant === "primary" && <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />}
    </>
  );
  const el = external ? (
    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className={cls} data-cursor={cursor}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} data-cursor={cursor}>
      {inner}
    </Link>
  );
  return magnetic ? <Magnetic strength={0.25}>{el}</Magnetic> : el;
}

export function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-forest group-hover:text-white ${className}`}>
      <ArrowUpRight className="h-5 w-5" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  align = "left",
  className = "",
  as = "h2",
  id,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  lede?: ReactNode;
  align?: "left" | "center" | "split";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  const H = as;
  const heading = (
    <div>
      {eyebrow && (
        <Reveal y={12}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <H id={id ?? slug(title, accent)} className="display mt-4 scroll-mt-28 text-[clamp(2.6rem,1.6rem+4.2vw,5.6rem)]">
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} className="serif text-forest pr-2" delay={0.15} />
          </>
        )}
      </H>
    </div>
  );
  const ledeEl = lede ? (
    <Reveal delay={0.2}>
      <p className={`max-w-xl text-[1.05rem] leading-relaxed text-muted ${align === "center" ? "mx-auto" : ""}`}>{lede}</p>
    </Reveal>
  ) : null;
  if (align === "split")
    return (
      <div className={`mb-12 grid items-end gap-6 md:mb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 ${className}`}>
        {heading}
        {ledeEl}
      </div>
    );
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"} ${className}`}>
      {heading}
      {ledeEl && <div className="mt-6">{ledeEl}</div>}
    </div>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-2 rounded-full border border-line bg-sand px-3.5 py-1.5 text-xs font-bold text-ink backdrop-blur-md ${className}`}>{children}</span>;
}
