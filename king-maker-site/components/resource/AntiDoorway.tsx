/* The anti-doorway rail (§11): real-job → page + the delete-the-city-name test.
 * Surfaced as a named, honest explainer, never a caption. */
export function AntiDoorway() {
  return (
    <aside className="my-8 border-t border-blue/50 bg-surface px-6 py-6">
      <p className="km-mono mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">Not doorway pages</p>
      <div className="km-prose text-[15px]">
        <p>
          Depth only counts if every page is real. Each location and project page is built from a{" "}
          <strong>real job in that town</strong>, with its own photos, scope, and detail. The test
          is simple: <strong>delete the city name and the page should fall apart.</strong> If you
          could swap one town for another with find-and-replace, it is a doorway, and Google treats
          a doorway-padded site the same as a thin one.
        </p>
      </div>
    </aside>
  );
}
