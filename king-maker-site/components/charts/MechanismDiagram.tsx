import { DataFigure } from "./DataFigure";

/* Conceptual diagrams (no fabricated metrics — the structure is the message).
 * variant "tie" = the site wins the tiebreaker (V12). variant "ledger" =
 * rented-vs-owned (A15). Static, server-rendered, inherently AI-legible. */

export function MechanismDiagram({ variant }: { variant: "tie" | "ledger" }) {
  if (variant === "tie") {
    const rows = [
      { signal: "Google Business Profile", you: "Equal", them: "Equal", win: false },
      { signal: "Reviews & velocity", you: "Equal", them: "Equal", win: false },
      { signal: "Website depth & relevance", you: "Deeper", them: "Thin", win: true },
    ];
    return (
      <DataFigure
        title="When everything else is equal, the site is the tiebreaker"
        description="Match the profile and the reviews, and the only thing left for Google to decide on is the site. The deeper, more relevant one wins."
        flag="MODELED"
        source="King Maker doctrine: the site wins the considered search"
        table={<p className="text-[13px] text-dim">With GBP and reviews equal, website depth is the deciding factor; the deeper site wins.</p>}
      >
        <div className="px-2 py-4">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border border-line">
            <div className="border-b border-line bg-surface-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-dim km-mono">Signal</div>
            <div className="border-b border-l border-line bg-surface-2 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-blue km-mono">You</div>
            <div className="border-b border-l border-line bg-surface-2 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-dim km-mono">Competitor</div>
            {rows.map((r) => (
              <div key={r.signal} className="contents">
                <div className="border-b border-line-soft px-4 py-3 text-[14px] text-ink">{r.signal}</div>
                <div className={`border-b border-l border-line-soft px-4 py-3 text-center text-[14px] ${r.win ? "font-bold text-blue" : "text-dim"}`}>{r.you}</div>
                <div className="border-b border-l border-line-soft px-4 py-3 text-center text-[14px] text-dim">{r.them}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="text-[12.5px] text-dim">Tiebreaker:</span>
            <span className="km-mono bg-blue-action px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-white">You win</span>
          </div>
        </div>
      </DataFigure>
    );
  }

  // ledger
  const rows = [
    { q: "Cost over time", rented: "Recurring, forever", owned: "Front-loaded, then falls" },
    { q: "When you stop", rented: "Traffic drops to zero", owned: "The asset keeps ranking" },
    { q: "Value over time", rented: "Flat, no residual", owned: "Appreciates, compounds" },
    { q: "Who owns it", rented: "The ad platform", owned: "You" },
  ];
  return (
    <DataFigure
      title="Paid is rent. Organic is equity."
      description="Ads are a liability you re-pay every month for the same flow. An owned, ranking site is an appreciating asset on your balance sheet."
      flag="MODELED"
      source="Channel economics (directional)"
      table={<p className="text-[13px] text-dim">Paid = recurring cost, zero residual, platform-owned. Organic = front-loaded cost, appreciating, owned.</p>}
    >
      <div className="grid grid-cols-1 gap-px bg-line-soft px-2 py-2 sm:grid-cols-[1.1fr_1fr_1fr]">
        <div className="hidden sm:block" />
        <div className="bg-bg px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-dim km-mono">Rented (ads)</div>
        <div className="bg-bg px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-blue km-mono">Owned (organic)</div>
        {rows.map((r) => (
          <div key={r.q} className="contents">
            <div className="bg-bg px-4 py-3 text-[13.5px] font-medium text-ink">{r.q}</div>
            <div className="bg-bg px-4 py-3 text-center text-[13.5px] text-dim">{r.rented}</div>
            <div className="bg-bg px-4 py-3 text-center text-[13.5px] font-medium text-blue">{r.owned}</div>
          </div>
        ))}
      </div>
    </DataFigure>
  );
}
