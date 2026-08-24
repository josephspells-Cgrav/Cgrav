import type { ReactNode } from "react";
import { FlagChip } from "@/components/ui";
import type { Flag } from "@/lib/claims";

/* ---------------------------------------------------------------------------
 * <DataFigure> — the shell EVERY chart/diagram is wrapped in (M8).
 * Structure: <figure> → takeaway <h3> (the conclusion, ABOVE the visual, never
 * baked into the SVG) → the visual (children, the chart paints its own aria) →
 * a FlagChip + source <figcaption> → a <details> "See the data" carrying the
 * AI-legible <table>/<dl>/<ol> twin. The twin is the AI-legibility law for
 * charts: a box-tokenizing extractor reads the table, not the SVG path.
 * Data modules break full-bleed (wide), prose stays narrow.
 * ------------------------------------------------------------------------- */
export function DataFigure({
  title,
  description,
  flag,
  source,
  table,
  children,
  className = "",
  defaultOpen = false,
}: {
  title: string;
  description?: string;
  flag: Flag;
  source?: string;
  table: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  return (
    <figure className={`my-10 border border-line bg-surface-2 ${className}`}>
      <div className="km-hairline" />
      <div className="px-6 pt-7 sm:px-8">
        {/* The takeaway title states the conclusion (never "Figure 3"). */}
        <h3 className="text-[clamp(1.15rem,1.8vw,1.5rem)] font-bold leading-snug tracking-[-0.01em] text-ink">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>

      {/* The visual. The chart carries its own aria-label / role. */}
      <div className="px-3 pb-2 pt-5 sm:px-6">{children}</div>

      {/* Evidence row + source. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
        <FlagChip flag={flag} />
        {source ? <span className="km-mono text-[11px] text-dim">{source}</span> : null}
      </div>

      {/* The AI-legible / screen-reader twin. */}
      <details className="group border-t border-line" open={defaultOpen}>
        <summary className="cursor-pointer list-none px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-dim transition-colors hover:text-ink sm:px-8">
          <span className="km-mono">See the data</span>
        </summary>
        <figcaption className="overflow-x-auto px-6 pb-7 sm:px-8" tabIndex={0} role="region" aria-label="Underlying data">
          {table}
        </figcaption>
      </details>
    </figure>
  );
}

/* A shared, AI-legible table primitive for the twins (and standalone tables). */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: { key: string; label: string; numeric?: boolean }[];
  rows: Record<string, string | number>[];
  caption?: string;
}) {
  return (
    <table className="w-full border-collapse text-[14px]">
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <thead>
        <tr className="border-b border-line">
          {columns.map((c) => (
            <th
              key={c.key}
              scope="col"
              className={`py-2.5 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-dim ${
                c.numeric ? "text-right" : "text-left"
              }`}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-line-soft last:border-b-0">
            {columns.map((c) => (
              <td
                key={c.key}
                className={`py-2.5 pr-4 ${c.numeric ? "km-tabular text-right text-ink" : "text-left text-muted"}`}
              >
                {r[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
