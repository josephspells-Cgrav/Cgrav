"use client";

import { motion, useReducedMotion, useInView, useScroll, useTransform, animate, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { bindLastTwoWords } from "@/lib/text";

/**
 * Mount-guarded reduced-motion. Returns `false` on the server AND the first
 * client render (so SSR and hydration markup match, killing the React #418
 * hydration mismatch), then the real preference after mount. Reduced-motion is
 * still honored (the global CSS reduced-motion rule covers the first frame).
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}

export const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

/** Count-up on scroll-in, reduced-motion-safe. Supports decimals + suffix +
 * an optional start `delay` (so a number can LAND with a sequenced reveal,
 * e.g. the dashboard rank counting as the win-line finishes drawing). */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  delay = 0,
  duration = 1.1,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // amount 0.35 (was 0.6) + a small bottom margin so the count FIRES reliably as
  // the number scrolls in. Taller cards (the +2-bullet gap cards) never need 60%
  // of a big element on-screen at once, which could leave it stuck at 0 (WO_07).
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotionSafe();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: ENTER_EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce, delay, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Fade-up reveal as the element scrolls in, the Jakub recipe (opacity +
 * translate-up + a soft blur that settles). One-shot, reduced-motion-safe. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  amount = 0.2,
  blur = 8,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  blur?: number;
}) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: ENTER_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Gentle scroll parallax (WO_05). A wrapper that drifts a DECORATIVE element a
 * few pixels as it crosses the viewport, depth without distraction. The drift is
 * hard-capped (`distance` default 24, ceiling per WO_05 §2B) and tied to the
 * scroll position, so it only moves when the page moves (never auto-plays /
 * loops / wiggles while someone reads). Reduced-motion gives a STATIC element at
 * its natural position (no transform). Use ONLY on the hero + 1-2 background
 * accents, NEVER on the chart or near the form. */
export function Parallax({
  children,
  className,
  style,
  distance = 24,
  ariaHidden = false,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  distance?: number;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // mid-cross (element centered) = 0 offset, so the resting/visible position is
  // natural; it drifts +/- distance toward the scroll extremes.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, -distance]);
  if (reduce) {
    return (
      <div ref={ref} className={className} style={style} aria-hidden={ariaHidden || undefined}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }} aria-hidden={ariaHidden || undefined}>
      {children}
    </motion.div>
  );
}

/**
 * TYPEWRITER heading (WO_07 + addendum). LITERAL per-character typing: the heading
 * types in one char at a time with a blinking caret that tracks the cursor — the
 * authentic effect. AI-legibility was dropped for the firm site (addendum), so no
 * clip/mask gymnastics: the heading is a real semantic h1/h2 carrying the full
 * phrase as its accessible name (aria-label). An invisible sizing layer reserves
 * the final box so the page NEVER reflows as it types (no content jump). One-shot
 * on scroll-in. Reduced-motion shows the full heading instantly, no caret.
 */
export function TypeIn({
  text,
  as = "h2",
  className,
  delay = 0,
  cinematic = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  cinematic?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  const Tag = as;
  const display = bindLastTwoWords(text);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(display.length);
      return;
    }
    if (!inView) return;
    const perChar = cinematic ? 80 : 52; // ms per character (slowed ~33% — WO_07 refine)
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= display.length && interval) clearInterval(interval);
      }, perChar);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce, display, cinematic, delay]);

  const done = count >= display.length;

  // Reduced-motion: full heading + a static blue underline (final state).
  if (reduce) {
    return (
      <Tag className={className}>
        <span className="relative inline-block">
          {display}
          <span aria-hidden className="absolute left-0 -bottom-1.5 h-[3px] w-full bg-blue" />
        </span>
      </Tag>
    );
  }

  // SINGLE text layer: the typed chars, the caret, then the still-untyped tail
  // rendered INVISIBLE (opacity 0) so it reserves the final box (no reflow) WITHOUT
  // a second painted copy. The earlier absolute-overlay-over-sizing-layer approach
  // painted the text twice and produced a chromatic ghosting strike on the letters.
  // The inner inline-block sizes to the text so the underline matches the typed width.
  return (
    <Tag className={className} aria-label={text}>
      <span ref={ref} className="relative inline-block">
        <span aria-hidden>{display.slice(0, count)}</span>
        <span aria-hidden className={`km-caret${cinematic ? " km-caret-lg" : ""}`} />
        <span aria-hidden style={{ opacity: 0 }}>{display.slice(count)}</span>
        {/* the blue underline draws L->R across the typed width, AFTER typing (slow) */}
        <motion.span
          aria-hidden
          className="absolute left-0 -bottom-1.5 h-[3px] w-full origin-left bg-blue"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done ? 1 : 0 }}
          transition={{ duration: 1.6, ease: ENTER_EASE }}
        />
      </span>
    </Tag>
  );
}

/** Left-to-right drawn accent line (scaleX 0 -> 1). The emphasis stroke; `color`
 * picks the variant (blue brand default, or red for the gap-card damage labels). */
export function DrawLine({
  className,
  width = "100%",
  height = 2,
  delay = 0.15,
  duration = 1.5,
  color = "var(--color-blue)",
  glow = false,
}: {
  className?: string;
  width?: string | number;
  height?: number;
  delay?: number;
  duration?: number;
  color?: string;
  glow?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <motion.span
      aria-hidden
      className={`block origin-left ${className ?? ""}`}
      style={{
        width,
        height,
        backgroundColor: color,
        boxShadow: glow ? "0 0 6px rgba(37, 99, 235, 0.40)" : undefined,
      }}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration, delay, ease: ENTER_EASE }}
    />
  );
}

/** Eyebrow: a drawn blue hairline + uppercase small-caps label (the firm voice).
 * WO_07 P2: scaled up (~1.4x, subordinate to the H2) + a fade-in on scroll-in. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const cls = `inline-flex items-center gap-3 ${className ?? ""}`;
  const content = (
    <>
      <DrawLine width="2.75rem" height={2} delay={0.05} duration={0.6} />
      <span className="text-[15px] sm:text-[17px] tracking-[0.2em] uppercase font-bold text-blue">
        {children}
      </span>
    </>
  );
  if (reduce) return <div className={cls}>{content}</div>;
  return (
    <motion.div
      className={cls}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: ENTER_EASE }}
    >
      {content}
    </motion.div>
  );
}

/** Staggered container + item for card grids. */
const parentVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: ENTER_EASE } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={parentVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
