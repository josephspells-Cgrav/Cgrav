import { DataFigure } from "./DataFigure";
import { TRADE_PAGES, TRADE_PAGES_FLAG, REFERENCE_BUILD } from "@/lib/claims";

/* V14 — the premium trade page-count comparison table. Server-rendered, zero JS,
 * the single best AI-legible artifact on the page (it is literally a table). Blue
 * on the authority + multiple columns; right-aligned tabular numerals. */
export function TradeTable() {
  return (
    <DataFigure
      title="Brochure vs. authority, every trade"
      description="The page count is not padding. Each page is a real service, location, project, or buyer question, a door Google and the AI engines can rank."
      flag={TRADE_PAGES_FLAG}
      source={`Reference build: ${REFERENCE_BUILD.name}, ${REFERENCE_BUILD.url.replace("https://", "")}`}
      table={
        <p className="text-[13px] text-dim">The figure above is itself the table.</p>
      }
      defaultOpen={false}
    >
      <div className="overflow-x-auto px-3 pb-3 sm:px-5" tabIndex={0} role="region" aria-label="Trade page-count table">

        <table className="w-full border-collapse text-[15px]">
          <caption className="sr-only">Brochure vs authority page counts and the multiple, per trade.</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="km-mono py-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-dim">Trade</th>
              <th scope="col" className="km-mono py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-dim">Brochure</th>
              <th scope="col" className="km-mono py-3 pr-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-dim">Authority</th>
              <th scope="col" className="km-mono py-3 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">Multiple</th>
            </tr>
          </thead>
          <tbody>
            {TRADE_PAGES.map((t) => (
              <tr key={t.slug} className="border-b border-line-soft last:border-b-0">
                <td className="py-3.5 pr-4 text-left font-medium text-ink">{t.trade}</td>
                <td className="km-tabular py-3.5 pr-4 text-right text-dim">{t.brochure}</td>
                <td className="km-tabular py-3.5 pr-4 text-right font-bold text-blue">
                  {t.authority}
                  {t.plus ? "+" : ""}
                </td>
                <td className="py-3.5 text-right">
                  <span className="km-mono km-tabular text-[13px] font-bold text-blue">
                    {Math.round(t.authority / t.brochure)}×{t.plus ? "+" : ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataFigure>
  );
}
