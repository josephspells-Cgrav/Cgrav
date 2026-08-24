import { FlagChip } from "@/components/ui";
import type { Flag } from "@/lib/claims";

/* Generalized brochure-vs-authority comparison (from the home SIDE_BY_SIDE).
 * Left-aligned labels, the winning column in blue, per-row FlagChip. Any "X vs Y"
 * scans faster as a table than prose. Breaks full-bleed from the prose measure. */
export function ComparisonTable({
  rows,
  leftLabel = "10-page brochure",
  rightLabel = "Authority system",
  caption,
}: {
  rows: { label: string; brochure: string; system: string; flag: Flag }[];
  leftLabel?: string;
  rightLabel?: string;
  caption?: string;
}) {
  return (
    <div className="my-9 border border-line bg-bg">
      <table className="w-full border-collapse">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-line bg-surface-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <th scope="col" className="km-mono px-5 py-3.5 text-left text-dim">What it covers</th>
            <th scope="col" className="km-mono px-5 py-3.5 text-right text-dim">{leftLabel}</th>
            <th scope="col" className="km-mono px-5 py-3.5 text-right text-blue">{rightLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line-soft last:border-b-0">
              <td className="px-5 py-4 align-top">
                <span className="text-[14.5px] font-medium text-ink">{r.label}</span>
                <span className="mt-1.5 block">
                  <FlagChip flag={r.flag} />
                </span>
              </td>
              <td className="km-tabular px-5 py-4 text-right align-top text-[15px] text-dim">{r.brochure}</td>
              <td className="km-tabular px-5 py-4 text-right align-top text-[15px] font-semibold text-blue">{r.system}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
