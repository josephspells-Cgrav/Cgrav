"use client";

import { motion } from "framer-motion";
import { CountUp, useReducedMotionSafe } from "@/components/motion";
import { FlagChip } from "@/components/ui";
import { GAP_WALL } from "@/lib/claims";

/* V3 — the gap stat wall. A scoreboard of the fundamentals most contractor sites
 * miss (§8-corrected: "60% no site" is gone → ~27%). The grid is a semantic <dl>
 * (the accessible/AI twin — no separate table needed). Blue = the number; the
 * fill bar + label + FlagChip + source per cell. */
export function GapStatWall({ heading }: { heading?: string }) {
  const reduce = useReducedMotionSafe();
  return (
    <figure className="my-10">
      {heading ? (
        <h3 className="mb-6 text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold tracking-[-0.01em] text-ink">{heading}</h3>
      ) : null}
      <dl className="grid grid-cols-1 gap-px bg-line-soft sm:grid-cols-2">
        {GAP_WALL.map((g) => {
          const decimals = Number.isInteger(g.pct) ? 0 : 1;
          return (
            <div key={g.label} className="flex flex-col-reverse bg-bg px-6 py-8">
              <dt className="mt-5">
                <p className="text-[14.5px] leading-snug text-muted">{g.label}</p>
                <div className="mt-3 flex items-center gap-3">
                  <FlagChip flag={g.flag} />
                  <span className="km-mono text-[11px] text-dim">{g.source}</span>
                </div>
              </dt>
              <dd>
                <span className="km-display km-tabular block text-[clamp(2.4rem,5vw,3.4rem)] font-extrabold leading-none text-blue">
                  <CountUp to={g.pct} decimals={decimals} suffix="%" />
                </span>
                {/* fill bar */}
                <div className="mt-3 h-1 w-full bg-surface-3">
                  <motion.div
                    className="h-full origin-left bg-blue"
                    style={{ width: `${g.pct}%` }}
                    initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </figure>
  );
}
