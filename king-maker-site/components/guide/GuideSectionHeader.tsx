"use client";

import type { ReactNode } from "react";
import { Reveal, DrawLine } from "@/components/motion";

/* Inner-article section header (WO_08 — the readable-first propagation edit).
 * The HOME lights every section H2 with Eyebrow + a per-character TypeIn — right
 * for six big bands, too busy for a long article with a dozen H2s (the §1
 * overstimulation ceiling). Here the heading simply fades + rises in (Reveal,
 * dialed gentler than the home: shorter travel, lighter blur) with a short blue
 * rule drawing beneath it. Heading-level liveliness, calm enough to read past a
 * dozen times in one scroll.
 *
 * Composed from the shipped primitives — never edits motion.tsx (that would alter
 * the HOME). One-shot, reduced-motion-safe: Reveal renders a static block and
 * DrawLine renders fully drawn under `prefers-reduced-motion`. The heading text
 * is always present in the DOM (Reveal only animates opacity/transform/filter),
 * so the SEO + AI-legibility of every section header is untouched. */
export function GuideSectionHeader({ children, index }: { children: ReactNode; index?: number }) {
  return (
    <Reveal y={16} blur={6} className="mb-5">
      {typeof index === "number" ? (
        <span className="km-mono mb-3 inline-flex items-center bg-blue-tint px-2.5 py-1 text-[12px] font-bold tracking-[0.18em] text-blue ring-1 ring-blue/15">
          {String(index).padStart(2, "0")}
        </span>
      ) : null}
      <h2 className="km-h2 text-ink">{children}</h2>
      <DrawLine className="mt-3.5" width="2.75rem" height={2} delay={0.18} duration={0.9} />
    </Reveal>
  );
}
