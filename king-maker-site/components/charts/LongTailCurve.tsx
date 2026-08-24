import { DataFigure, DataTable } from "./DataFigure";
import { LONGTAIL } from "@/lib/claims";

/* V10 — the long-tail demand curve. A power-law: a short tall head, a long flat
 * tail that is enormous in aggregate. Brochure captures only the head; an
 * authority site reaches down the tail (blue). Static, server-rendered. */
const VW = 680;
const VH = 280;
const PAD = { l: 24, r: 24, t: 20, b: 40 };
const IW = VW - PAD.l - PAD.r;
const IH = VH - PAD.t - PAD.b;
const N = 48;

function curveY(t: number) {
  // decaying power-law, normalized 1 → ~0.04
  return 1 / (1 + 9 * t);
}

export function LongTailCurve() {
  const pts = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    const x = PAD.l + t * IW;
    const y = PAD.t + (1 - curveY(t)) * IH;
    return { x, y, t };
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const baseY = PAD.t + IH;
  const areaUpto = (tMax: number) => {
    const seg = pts.filter((p) => p.t <= tMax);
    const last = seg[seg.length - 1];
    return `${seg.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")} L ${last.x.toFixed(1)} ${baseY} L ${PAD.l} ${baseY} Z`;
  };

  return (
    <DataFigure
      title="95% of searches are the long tail"
      description="A brochure ranks for a few high-volume head terms. The aggregate demand lives down the tail, where only a deep site has a page to be found."
      flag={LONGTAIL.flag}
      source={LONGTAIL.source}
      table={
        <DataTable
          columns={[
            { key: "metric", label: "Metric" },
            { key: "value", label: "Value", numeric: true },
          ]}
          rows={[
            { metric: "Queries with ≤10 monthly searches", value: `${LONGTAIL.longTailPct}%` },
            { metric: "Web pages that get zero Google traffic", value: `${LONGTAIL.zeroTrafficPct}%` },
          ]}
          caption="Long-tail share and zero-traffic pages."
        />
      }
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full flex-1" role="img" aria-label="A long-tail demand curve: a short tall head and a long flat tail. An authority site captures the tail; a brochure captures only the head.">
          {/* authority capture (wide, blue) */}
          <path d={areaUpto(0.82)} fill="var(--color-blue)" opacity={0.22} />
          {/* brochure capture (head only, muted) */}
          <path d={areaUpto(0.12)} fill="#cbd5e1" opacity={0.7} />
          {/* the curve */}
          <path d={line} fill="none" stroke="var(--color-blue)" strokeWidth="2.5" strokeLinecap="round" />
          {/* labels */}
          <text x={PAD.l + IW * 0.05} y={PAD.t + IH + 24} fill="#64748b" fontSize="11">head</text>
          <text x={PAD.l + IW * 0.62} y={PAD.t + IH + 24} fill="var(--color-blue)" fontSize="11" fontWeight="700">the long tail (authority territory)</text>
          <text x={PAD.l} y={PAD.t - 6} fill="#64748b" fontSize="9.5" className="km-mono" style={{ letterSpacing: "0.12em" }}>SEARCH VOLUME</text>
        </svg>
        <div className="shrink-0 border-t border-line-soft pt-5 sm:w-44 sm:border-l sm:border-t-0 sm:pt-0 sm:pl-6">
          <span className="km-display km-tabular block text-[2.6rem] font-black leading-none text-blue">{LONGTAIL.zeroTrafficPct}%</span>
          <p className="mt-1.5 text-[12.5px] leading-snug text-muted">of all web pages get zero Google traffic, usually for lack of a page to be found.</p>
        </div>
      </div>
    </DataFigure>
  );
}
