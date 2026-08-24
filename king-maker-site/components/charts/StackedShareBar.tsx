import { DataFigure, DataTable } from "./DataFigure";
import { PAGE_AGE } from "@/lib/claims";

/* V6 — page-age dominance. A 100% stacked bar: 3+ years owns ~3/4 of page one.
 * Blue = the durable 3+ yr zone (the prize). Static, server-rendered. */
export function StackedShareBar() {
  const segs = [
    { label: "Under 1 yr", pct: PAGE_AGE.underOneYr, fill: "#cbd5e1" }, // slate-300 (lightest)
    { label: "1–3 yr", pct: PAGE_AGE.oneToThree, fill: "#94a3b8" }, // slate-400 (mid baseline)
    { label: "3+ yr", pct: PAGE_AGE.over3yr, fill: "var(--color-blue)" }, // the durable prize
  ];
  return (
    <DataFigure
      title="Three-quarters of page one is 3+ years old"
      description="Authority is accumulated time. You don't buy past the durable zone, you build past it."
      flag={PAGE_AGE.flag}
      source={PAGE_AGE.source}
      table={
        <DataTable
          columns={[
            { key: "label", label: "Page age" },
            { key: "pct", label: "Share of top-10", numeric: true },
          ]}
          rows={segs.map((s) => ({ label: s.label, pct: `${s.pct}%` }))}
          caption="Share of top-10 results by page age."
        />
      }
    >
      <div className="flex flex-col gap-6 px-2 py-4 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex-1">
          <div className="flex h-10 w-full overflow-hidden border border-line">
            {segs.map((s) => (
              <div key={s.label} style={{ width: `${s.pct}%`, backgroundColor: s.fill }} className="h-full" aria-hidden />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[12.5px]">
            {segs.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-2 text-muted">
                <span className="h-2.5 w-2.5" style={{ backgroundColor: s.fill }} aria-hidden />
                {s.label} <span className="km-tabular text-dim">{s.pct}%</span>
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 border-l border-line-soft pl-6 sm:w-40">
          <span className="km-display km-tabular block text-[3rem] font-black leading-none text-blue">{PAGE_AGE.avgNo1Years}</span>
          <p className="mt-1 text-[12.5px] leading-snug text-muted">years: the average age of a #1-ranking page</p>
        </div>
      </div>
    </DataFigure>
  );
}
