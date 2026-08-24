"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion";
import { DataFigure, DataTable } from "./DataFigure";
import { TRADE_PAGES, TRADE_PAGES_FLAG, BROCHURE_PAGES } from "@/lib/claims";

/* V2 — per-trade page-count bars. A brochure ships ~10 pages; an authority site
 * ships 144-300+. The blue authority bar visually swallows the muted brochure
 * stub. Optionally highlight ONE trade (its bar brightens, the rest dim). */

const VW = 720;
const ROW = 30;
const GAP = 16;
const PAD = { l: 132, r: 64, t: 8, b: 28 };
const MAXV = 200; // typical authority-build depth headroom

export function BarCompare({ highlight }: { highlight?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotionSafe();

  const innerW = VW - PAD.l - PAD.r;
  const VH = PAD.t + TRADE_PAGES.length * (ROW + GAP) + PAD.b;
  const wOf = (v: number) => (Math.min(v, MAXV) / MAXV) * innerW;

  const rows = TRADE_PAGES.map((t) => ({
    trade: t.trade,
    brochure: String(t.brochure),
    authority: `${t.authority}${t.plus ? "+" : ""}`,
    multiplier: `${Math.round(t.authority / t.brochure)}×${t.plus ? "+" : ""}`,
  }));

  return (
    <div ref={ref}>
      <DataFigure
        title="Ten pages versus a system"
        description="A brochure ships about ten pages. An authority build ships 144 to 300+, every one a door Google can rank. These are real shipped builds."
        flag={TRADE_PAGES_FLAG}
        source="Shipped King Maker builds"
        table={
          <DataTable
            columns={[
              { key: "trade", label: "Trade" },
              { key: "brochure", label: "Brochure", numeric: true },
              { key: "authority", label: "Authority", numeric: true },
              { key: "multiplier", label: "Multiple", numeric: true },
            ]}
            rows={rows}
            caption="Brochure vs authority page counts per trade."
          />
        }
      >
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Per-trade page counts: brochure about 10 versus authority 144 to 300 plus.">
          {TRADE_PAGES.map((t, i) => {
            const y = PAD.t + i * (ROW + GAP);
            const dim = highlight && highlight !== t.slug;
            const authW = wOf(t.authority);
            return (
              <g key={t.slug} opacity={dim ? 0.4 : 1}>
                <text x={PAD.l - 12} y={y + ROW / 2 + 4} fill="#475569" fontSize="13" textAnchor="end">
                  {t.trade}
                </text>
                {/* brochure stub */}
                <rect x={PAD.l} y={y} width={wOf(BROCHURE_PAGES)} height={ROW} fill="#cbd5e1" />
                {/* authority bar */}
                <motion.rect
                  x={PAD.l}
                  y={y}
                  height={ROW}
                  fill={dim ? "#94a3b8" : "var(--color-blue)"}
                  initial={reduce ? { width: authW } : { width: 0 }}
                  animate={inView || reduce ? { width: authW } : {}}
                  transition={{ duration: 0.9, delay: reduce ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
                <text x={PAD.l + authW + 8} y={y + ROW / 2 + 4} fill={dim ? "#64748b" : "var(--color-blue)"} fontSize="13" fontWeight="700" className="km-tabular">
                  {t.authority}
                  {t.plus ? "+" : ""}
                </text>
              </g>
            );
          })}
          {/* x ticks */}
          {[0, 50, 100, 150, 200].map((tk) => (
            <text key={tk} x={PAD.l + wOf(tk)} y={VH - 8} fill="#64748b" fontSize="11" textAnchor="middle" className="km-tabular">
              {tk}
            </text>
          ))}
        </svg>
      </DataFigure>
    </div>
  );
}
