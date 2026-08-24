/* myth → reality → why-it-persists. The §13 credibility-moat primitive: the
 * things KM refuses to sell. Structured, scannable, source-able. */
export function DebunkBlock({
  myth,
  reality,
  why,
  source,
}: {
  myth: string;
  reality: string;
  why: string;
  source?: string;
}) {
  return (
    <div className="border-t border-line py-7">
      <p className="text-[17px] font-semibold text-ink">
        <span className="km-mono mr-2 text-red">Myth</span>
        {myth}
      </p>
      <div className="km-prose mt-3">
        <p>
          <strong>Reality.</strong> {reality}
        </p>
        <p className="text-[14.5px] text-dim">
          <span className="km-mono text-[11px] uppercase tracking-[0.14em] text-dim">Why it persists &middot; </span>
          {why}
        </p>
      </div>
      {source ? <p className="km-mono mt-2 text-[11px] text-dim">{source}</p> : null}
    </div>
  );
}
