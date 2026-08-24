import { FlagChip } from "@/components/ui";
import type { Flag } from "@/lib/claims";

/* A flat table of price/spec ranges (the §9 buyer-content example). Not a hero
 * card — a scannable range table. NC-compliant copy supplied by the caller. */
export function PriceRangeCard({
  title,
  rows,
  note,
  flag = "ILLUSTRATIVE",
}: {
  title: string;
  rows: { label: string; range: string; detail?: string }[];
  note?: string;
  flag?: Flag;
}) {
  return (
    <div className="my-8 border border-line bg-surface-2">
      <div className="km-hairline" />
      <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
        <h3 className="text-[16px] font-bold text-ink">{title}</h3>
        <FlagChip flag={flag} />
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line-soft last:border-b-0">
              <td className="px-6 py-3.5 align-top">
                <span className="text-[14.5px] font-medium text-ink">{r.label}</span>
                {r.detail ? <span className="mt-0.5 block text-[12.5px] text-dim">{r.detail}</span> : null}
              </td>
              <td className="km-tabular px-6 py-3.5 text-right align-top text-[15px] font-semibold text-blue">{r.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className="px-6 py-3 text-[12px] leading-relaxed text-dim">{note}</p> : null}
    </div>
  );
}
