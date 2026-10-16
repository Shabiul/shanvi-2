"use client";

import Lenis from "lenis";
import {
  animate,
  motion,
  MotionConfig,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type HTMLMotionProps,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Providers: Lenis smooth scroll + reduced-motion aware MotionConfig ---------- */
export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -90 }, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ---------- Reveal: fade + rise when scrolled into view ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" } & HTMLMotionProps<"div">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ---------- SplitText: words rise out of a mask, staggered ---------- */
export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: { text: string; className?: string; wordClassName?: (word: string, i: number) => string | undefined; delay?: number; stagger?: number; immediate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = immediate || inView;
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName?.(w, i) ?? ""}`}
            initial={{ y: "110%", rotate: 4 }}
            animate={show ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ---------- Magnetic: element drifts toward the pointer ---------- */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Counter: counts up once visible ---------- */
export function Counter({ to, decimals = 0, suffix = "", prefix = "", className }: { to: number; decimals?: number; suffix?: string; prefix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: EASE, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);
  const fmt = new Intl.NumberFormat("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt.format(inView ? val : to)}
      {suffix}
    </span>
  );
}

/* ---------- AnimatedNumber: tweens between values (fare calculator) ---------- */
export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const [shown, setShown] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, { duration: 0.6, ease: EASE, onUpdate: (v) => setShown(Math.round(v)) });
    prev.current = value;
    return () => c.stop();
  }, [value]);
  return <span className={className}>{new Intl.NumberFormat("en-IN").format(shown)}</span>;
}

/* ---------- VelocityMarquee: infinite band that speeds up and skews with scroll ---------- */
export function VelocityMarquee({ children, baseVelocity = -2, className }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="flex w-max" style={{ x, skewX: reduce ? 0 : skew }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Tilt: 3D card tilt following the pointer ---------- */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useTransform([gx, gy], ([a, b]) => `radial-gradient(500px circle at ${a}% ${b}%, rgb(255 255 255 / 0.14), transparent 45%)`);
  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

/* ---------- Parallax: translate child on scroll ---------- */
export function Parallax({ children, offset = 80, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------- ScrollProgress: thin gradient bar at the top ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-forest" style={{ scaleX }} />;
}

/* ---------- Cursor: dot + ring; grows and labels on [data-cursor] ---------- */
const fineQuery = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(fineQuery);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(fineQuery).matches,
    () => false,
  );
}

export function Cursor() {
  const enabled = useFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, select, textarea, summary, label");
      setHover(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest" style={{ x, y }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-forest/60 text-[11px] font-extrabold uppercase tracking-widest text-white mix-blend-normal"
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 92 : hover ? 54 : 34, height: label ? 92 : hover ? 54 : 34, backgroundColor: label ? "rgb(15 91 70)" : "rgb(15 91 70 / 0)" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label}
      </motion.div>
    </>
  );
}
