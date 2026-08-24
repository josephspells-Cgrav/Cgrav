import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Shared motion DNA for the V2 site. Carries the brand easing
 * [0.16, 1, 0.3, 1] ("settled, not snapped") across every reveal. All
 * primitives are reduced-motion-safe and keep text visible (no flash of
 * invisible text). Anti-stiff: tween + the exponential ease on reveals,
 * spring only on interactive press.
 */

export const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

/** Fade-up reveal as the element scrolls in. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: ENTER_EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Character-staggered "typed-in" heading. Each char lifts + unblurs into
 * place — the cinematic register. Text stays visible (opacity 1) so it is
 * always legible. Reduced-motion renders the heading instantly.
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
  const reduce = useReducedMotion();
  const Tag = as;
  if (reduce) return <Tag className={className}>{text}</Tag>;

  const stagger = cinematic ? 0.02 : 0.014;
  const dur = cinematic ? 0.6 : 0.5;
  const yOff = cinematic ? "0.5em" : "0.35em";
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, wi) => {
          const prior = words.slice(0, wi).reduce((s, w) => s + w.length, 0);
          return (
            <span key={wi} className="inline-flex whitespace-pre">
              {Array.from(word).map((ch, ci) => (
                <motion.span
                  key={`${wi}-${ci}`}
                  className="inline-block"
                  initial={{ opacity: 1, y: yOff, filter: "blur(4px)" }}
                  whileInView={{ y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.01 }}
                  transition={{
                    duration: dur,
                    delay: delay + (prior + ci) * stagger,
                    ease: ENTER_EASE,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
              {wi < words.length - 1 && <span>&nbsp;</span>}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

/** Left-to-right drawn accent line (scaleX 0 -> 1). The emphasis stroke. */
export function DrawLine({
  className,
  width = "100%",
  height = 3,
  delay = 0.15,
  duration = 0.7,
  color = "var(--color-red)",
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
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block origin-left rounded-full ${className ?? ""}`}
      style={{
        width,
        height,
        backgroundColor: color,
        boxShadow: glow ? "0 0 2px rgba(216, 38, 44, 0.55)" : undefined,
      }}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration, delay, ease: ENTER_EASE }}
    />
  );
}

/** Eyebrow: a drawn red hairline + uppercase label. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <DrawLine width="2.25rem" height={1} delay={0.05} duration={0.6} />
      <span className="text-[12px] tracking-[0.24em] uppercase font-semibold text-redink">
        {children}
      </span>
    </div>
  );
}

/** Staggered container + item for card grids. */
const parentVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ENTER_EASE } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={reduce ? undefined : parentVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </motion.div>
  );
}
