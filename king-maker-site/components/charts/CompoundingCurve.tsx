"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion";
import { DataFigure, DataTable } from "./DataFigure";
import { scaleLinear, toPath, toArea, fmtCompact } from "@/lib/chart";
import { COMPOUNDING } from "@/lib/claims";

/* V1 — THE SIGNATURE: compounding organic vs flat paid. Paid is rent (flat),
 * organic is equity (compounds past the crossover ~mo 12). Blue = organic (the
 * one takeaway); muted = paid. ILLUSTRATIVE (shape is the claim, not the units). */

const VW = 720;
const VH = 360;
const PAD = { l: 46, r: 74, t: 22, b: 40 };
const IW = VW - PAD.l - PAD.r;
const IH = VH - PAD.t - PAD.b;

export function CompoundingCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();

  const { organic, paid, crossoverMonth, flag, caption } = COMPOUNDING;
  const n = organic.length;
  const max = Math.max(...organic);
  const sx = (i: number) => PAD.l + (i / (n - 1)) * IW;
  const sy = scaleLinear([0, max], [PAD.t + IH, PAD.t]);
  const yOf = (v: number) => sy(v);

  const organicPath = toPath(organic, sx, yOf);
  const paidPath = toPath(paid, sx, yOf);
  const organicArea = toArea(organic.slice(crossoverMonth - 1), (i) => sx(i + crossoverMonth - 1), yOf, PAD.t + IH);
  const cx = sx(crossoverMonth - 1);
  const cy = yOf(organic[crossoverMonth - 1]);

  const rows = organic.map((o, i) => ({ month: `Mo ${i + 1}`, organic: o.toLocaleString(), paid: paid[i].toLocaleString() }));

  return (
    <div ref={ref}>
      <DataFigure
        title="Paid traffic is rent. Organic is equity."
        description="Constant ad spend buys a flat, rented stream. Organic compounds, overtakes paid around month 12, and keeps climbing after the spend flattens."
        flag={flag}
        source="Illustrative shape, not a forecast"
        table={
          <DataTable
            columns={[
              { key: "month", label: "Month" },
              { key: "organic", label: "Organic sessions", numeric: true },
              { key: "paid", label: "Paid sessions", numeric: true },
            ]}
            rows={rows}
            caption="Monthly organic vs paid sessions over 24 months."
          />
        }
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full"
          role="img"
          aria-label={`Organic traffic compounding from ${organic[0]} to about ${max.toLocaleString()} monthly sessions over 24 months while paid stays flat near ${paid[0]}; organic overtakes paid around month ${crossoverMonth}.`}
        >
          {/* gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1={PAD.l} x2={VW - PAD.r} y1={PAD.t + g * IH} y2={PAD.t + g * IH} stroke="#e2e8f0" strokeWidth="1" />
          ))}
          {/* equity area after crossover */}
          <motion.path
            d={organicArea}
            fill="var(--color-blue)"
            opacity={0.08}
            initial={reduce ? { opacity: 0.08 } : { opacity: 0 }}
            animate={inView || reduce ? { opacity: 0.08 } : {}}
            transition={{ duration: 0.6, delay: reduce ? 0 : 1.4 }}
          />
          {/* paid — flat, fast, muted */}
          <motion.path
            d={paidPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={inView || reduce ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* organic — slow then accelerating */}
          <motion.path
            d={organicPath}
            fill="none"
            stroke="var(--color-blue)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={inView || reduce ? { pathLength: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.5, 0, 0.7, 1] }}
          />
          {/* crossover */}
          <line x1={cx} x2={cx} y1={PAD.t} y2={PAD.t + IH} stroke="#64748b" strokeWidth="1" strokeDasharray="2 3" opacity={0.5} />
          <motion.circle
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-blue)"
            stroke="var(--color-blue)"
            strokeWidth="1.5"
            initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={inView || reduce ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: reduce ? 0 : 1.6 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {/* direct series labels (no legend) */}
          <text x={sx(n - 1) + 6} y={yOf(organic[n - 1]) + 4} fill="var(--color-blue)" fontSize="13" fontWeight="700">
            Organic
          </text>
          <text x={sx(n - 1) + 6} y={yOf(paid[n - 1]) + 4} fill="#64748b" fontSize="12">
            Paid
          </text>
          <text x={cx} y={PAD.t - 6} fill="var(--color-blue-action)" fontSize="11" textAnchor="middle">
            ~Mo {crossoverMonth}
          </text>
          {/* axes */}
          <text x={PAD.l} y={VH - 12} fill="#64748b" fontSize="11" textAnchor="start">Mo 1</text>
          <text x={PAD.l + IW / 2} y={VH - 12} fill="#64748b" fontSize="11" textAnchor="middle">Mo 12</text>
          <text x={PAD.l + IW} y={VH - 12} fill="#64748b" fontSize="11" textAnchor="end">Mo 24</text>
          <text x={PAD.l - 8} y={PAD.t + 4} fill="#64748b" fontSize="11" textAnchor="end" className="km-tabular">{fmtCompact(max)}</text>
          <text x={PAD.l - 8} y={PAD.t + IH} fill="#64748b" fontSize="11" textAnchor="end">0</text>
        </svg>
      </DataFigure>
    </div>
  );
}
