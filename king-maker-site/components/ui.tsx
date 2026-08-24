import Link from "next/link";
import type { ReactNode } from "react";
import { FLAG_LABEL, type Flag } from "@/lib/claims";

/* ---------------------------------------------------------------------------
 * The King Maker UI kit. Square corners (institutional), disciplined blue,
 * generous negative space. Server components where possible (motion lives in
 * components/motion.tsx as the only "use client" leaves).
 * ------------------------------------------------------------------------- */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-8 ${className}`}>{children}</div>;
}

/** A section with generous vertical rhythm. `tone` sets the surface. On the
 * white canvas, "tint" is the faint cool alternating band (slate-50) that gives
 * the page rhythm now that bg + surface are both white. */
export function Section({
  children,
  id,
  className = "",
  tone = "bg",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "bg" | "surface" | "tint";
}) {
  // "surface" historically meant "the alternating band" — on white it maps to
  // the faint tint so existing callers keep their rhythm with no churn.
  const bg = tone === "bg" ? "bg-bg" : "bg-bg-tint";
  return (
    <section id={id} className={`relative ${bg} py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

/** Primary = blue-action fill / white text (AA). Secondary = ghost with a blue
 * hairline. Square corners, GPU-safe hover (transform/opacity only), press feedback. */
export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  arrow?: boolean;
}) {
  const base =
    "group inline-flex items-center gap-3 px-7 py-3.5 text-[15px] font-semibold tracking-tight transition-transform duration-200 ease-out active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-action text-white hover:bg-blue"
      : "border border-blue/45 text-ink hover:border-blue hover:bg-blue-action/[0.06]";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden
          className="transition-transform duration-200 ease-out group-hover:translate-x-1"
        >
          &#8594;
        </span>
      ) : null}
    </Link>
  );
}

/** The honesty flag chip — renders MEASURED / MODELED / ILLUSTRATIVE inline so
 * every projected number wears its evidence basis (the honesty rails, visible).
 * MEASURED = blue dot (hard data); MODELED/ILLUSTRATIVE = dim dot (projection). */
export function FlagChip({ flag, className = "" }: { flag: Flag; className?: string }) {
  const measured = flag === "MEASURED";
  return (
    <span
      className={`km-mono inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
        measured ? "text-blue" : "text-dim"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 ${measured ? "bg-blue-action" : "bg-dim"}`}
        style={{ borderRadius: 0 }}
      />
      {FLAG_LABEL[flag]}
    </span>
  );
}

/** A thin blue editorial rule. */
export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`km-hairline ${className}`} aria-hidden />;
}

/** Small-caps muted label (the firm's labeling voice). */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-[11px] font-semibold uppercase tracking-[0.28em] text-dim ${className}`}>
      {children}
    </span>
  );
}
