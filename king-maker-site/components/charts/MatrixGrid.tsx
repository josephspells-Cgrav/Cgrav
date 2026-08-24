import { DataFigure } from "./DataFigure";

/* V8 — the service × location matrix. One "Service Areas" page lists towns; a
 * matrix builds a real page for every service in every town. That product is
 * where the rankable surface explodes. Static, server-rendered. */
export function MatrixGrid({
  services = ["Replacement", "Repair", "Storm", "Inspection", "Gutters", "Commercial"],
  cities = 12,
}: {
  services?: string[];
  cities?: number;
}) {
  const total = services.length * cities;
  return (
    <DataFigure
      title={`${services.length} services × ${cities} cities = ${total} pages`}
      description="A flat 'service areas' list is one page. A matrix makes each service-in-each-town its own rankable page. The page count is an area, not a number."
      flag="MEASURED"
      source="Real-job → page (delete-the-city-name test)"
      table={
        <p className="text-[13px] text-dim">
          {services.length} services ({services.join(", ")}) across {cities} cities = {total} unique
          service-and-location pages.
        </p>
      }
    >
      <div className="px-2 py-4">
        <div className="space-y-1.5">
          {services.map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-right text-[12px] text-muted">{s}</span>
              <div className="grid flex-1 grid-cols-12 gap-1">
                {Array.from({ length: cities }, (_, i) => (
                  <div key={i} className="aspect-square border border-blue/45 bg-blue/[0.10]" aria-hidden />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-3 pr-1">
          <span className="text-[12.5px] text-dim">{services.length} services × {cities} cities =</span>
          <span className="km-display km-tabular text-[1.8rem] font-extrabold leading-none text-blue">{total}</span>
          <span className="text-[12.5px] text-muted">pages</span>
        </div>
      </div>
    </DataFigure>
  );
}
