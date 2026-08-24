• I'll read all six files in full, starting with the current versions.

• Now the three baselines for diffing intent.

• All six files read in full. Here is the audit.

  ---

  ## FINDINGS

  ### MAJOR

  **1. The no-book fallback contradicts the roster law it sits next to.**
  SKILL.md pull #9: *"No book access → location pages default to Tier-2 register and the deliverable says so."* But doctrine §17 defines Tier 2 as *"evidence-woven… real neighborhoods are woven into prose as completed-work mentions"* — with no book there are no real neighborhoods and no completed-work mentions to weave. And §17's roster law says *"a town gets a page because the book (or genuine service capacity) supports one"* — no book means no town is supported, so the §17-correct fallback is county hubs only, not a Tier-2 roster. As written, the fallback instructs a session to build exactly the unsupported, evidence-free location pages §17 exists to kill, and each such page would also violate §18 (verify-or-cut) and §8 (*"If you can't write something real for a town, it's a county-hub mention, not a page"*). It also conflates two different failure modes — "client has history but won't/grant no access" vs "client has zero job history" — under one rule.

  **2. "(or genuine service capacity)" is an undefined escape hatch that guts "the book decides the roster."**
  §17: *"a town gets a page because the book (or genuine service capacity) supports one — not because it sits inside the radius."* Nothing defines "genuine service capacity," who attests it, or what evidence it requires. A future session can declare capacity for any radius town and bypass the book law entirely. Fold-or-keep ownership is defined only for the 1-job edge case (*"a fold-or-keep decision for the operator"*); who decides for 2–9-job towns, and whether expansion towns (zero jobs, high search volume, client WANTS to enter) qualify under "capacity," is unstated. This is the single most exploitable sentence in the addendum.

  **3. The new laws bind architecture only, but in `all` mode the audit is built FIRST and stays radius-driven.**
  The audit/plan location math is untouched: Inputs still collects *"anchor city + radius (default 30mi)"*, Stage-1 #5 triangulates *"for the radius"*, #7 maps incumbents *"per hub city"*. Pull #9 is tagged *"(architecture mode…)"* — so the book is never wired into the audit or plan artifacts. Concretely: the audit (the close asset, built first in the default `all` mode) can sell a 30-mile roster and a corridor pack story that the architecture — built minutes later in the same run, from the same Stage 1 — then folds, excludes, or reclassifies under §17/§20. §20 (*"Location pages for towns beyond the pack radius are ORGANIC plays… Never promise pack presence in secondary towns"*) is client-facing promise calibration, and it collides head-on with Stage-1 #5's adjacent-market upside thesis (*"the corridor carried the whole pitch"*) — the audit's fast-lever pack story for corridor towns is exactly what §20 forbids promising. The skill's premise is *"all internally consistent because every number comes from one model card and one data layer"*; that premise now breaks on the location axis.

  **4. The output template contradicts §17 inside the same edited file.**
  The Location Pages section was updated to the tiered roster, but the surviving header block still reads: *"A dedicated page on every axis — one per service, system, <type>, and city"* and *"complete coverage of every service, system, <building type / project type>, and buyer question."* "One per city" / "complete coverage" is the maximalist sweep §17 explicitly evidence-gates (*"'do them all' means 'all the book supports'"*). The addendum's supremacy clause lives in doctrine.md; a session assembling the deliverable from the template sees both instructions with no tiebreaker.

  **5. BUILD GATES numbers are stated as false precision, and two are unmeasurable as written.**
  Contrast: Stage 0 flags its own thresholds — *"(Density thresholds are calibrate-don't-worship.)"* — but §19, the template's Build gates block, and the SKILL.md lock all state *"Pairwise similarity <40%"*, *"≥4 real local signals"*, *"≤2 hops"* flatly, with no calibration caveat and no measurement definition. "Pairwise similarity" names no metric (shingle? tf-idf cosine? embedding distance?) — a build can pass or fail this gate by choosing the metric, which makes the gate unverifiable rather than mechanical, the opposite of §19's intent (*"enforced by verifiers the build must run, not by intent"*). And *"no clause of 8+ words repeated across pages"* has no boilerplate exclusion: nav, footer, CTA blocks, sticky click-to-call, and FAQ schema repeat 8+ word clauses on every page of every real build. As written the gate fails every honest build or gets silently scoped down at build time — the quiet-rot outcome §19's own parenthetical warns about for hardcoded lists.

  **6. Architecture mode run standalone can't fill its own template.**
  The output template requires a *"Leads Projection… Addressable commercial <trade> searches — <market>: ~X/mo"* and honesty rails require every number to trace to a measured pull. But the only Stage-1 pull tagged for architecture mode is #9; pulls 2–5 (keyword universe, volumes, dedup, geo triangulation) are untagged-but-marketed, #6/#8 are audit-tagged. A standalone `architecture` run therefore either (a) re-pulls the market data — violating *"Stage 1 — THE DATA LAYER (pull ONCE; every artifact reads it)"* if a prior run exists, (b) ships the projection unmeasured — violating MODEL.md-is-law, or (c) omits the section — which the template doesn't sanction. The mode table says `architecture` reads doctrine + taxonomies + template; nothing says which Stage-1 pulls it owns.

  **7. Pull #9 gates the spam-legacy audit on the wrong condition.**
  SKILL.md: *"**Job-book evidence pull** (architecture mode, when the client has any job history)… For an existing domain, also pull the spam-legacy picture."* §22: *"An architecture for an EXISTING domain starts with a spam-legacy audit."* A client with an existing hacked-era domain and no job history fails the "any job history" condition, so pull #9 never runs and §22's mandated FIRST step silently never happens — precisely the case §22 says *"buries the new build under the old domain's quality drag."* Two independent concerns (book evidence → roster; spam legacy → existing domain) are bundled under one conditional that only fits the first.

  ### MINOR

  **8. "roughly ≥10 jobs" has no unit.** Per-town or per-book? Tier 1 *"leads the page"* with *"the real completed-job total"* — if the ≥10 is per-book, a 200-job book across 19 towns licenses count-led pages headlining 2-job town totals, which is exactly the *"weak total as a headline"* §17 bans. Relatedly, the *"never per-neighborhood counts, years, or dollars"* restriction is written only inside the Tier-1 bullet; whether Tier-2 pages may print per-neighborhood counts is unstated.

  **9. §16 survives with radius-implying language.** *"Only the location-page count is capped by the market's town count"* predates the book-decides law and invites a roster = towns-in-market reading. The addendum preamble (*"where they conflict with older text, they win"*) resolves it legally, but §16 carries no pointer to §17 — the supremacy clause only works if the reader notices the conflict.

  **10. §16's page-count sanity conflicts numerically with §21's proof point.** §16: *"typically ~100–160 pages."* §21: the glossary *"grew the Mabrey sitemap 137→168"* — 168 exceeds the surviving 160 ceiling. A gatekeeper can cite either number against the other.

  **11. Total Scope omits the glossary.** *"~A company · B service · C system · D industry · E brand · F location · G resource · ~H project = ~TOTAL pages"* — the new Glossary axis (~30–50 terms) has no letter, so TOTAL undercounts by 30–50, and the new sitemap-floor gate (*"Sitemap count floor: <TOTAL> routes, a drop fails the build"*) bakes the undercount into a mechanical gate: a correct build fails it, or the gap gets silently absorbed.

  **12. Book-contradicts-claimed-service-area is unaddressed.** If the book shows jobs in 3 towns but the client claims (and Inputs collects) a 30mi radius, nothing says which wins the roster, how to surface the discrepancy to the operator, or whether the radius-wide *"~X/mo"* market sizing in the template's Leads Projection must be reconciled to the book-gated subset of towns the architecture will actually build.

  **13. §18's verify-or-cut is scoped to *"a money page"* of the build.** Audit pages print factual specifics about towns, competitors, and markets to the client; the only audit-side verification is *"content-verify by curl"* (a deploy check, not fact-checking). The *"independent web-verifying judge"* law does not reach the one artifact the prospect actually reads.

  **14. Scrub-table ownership is undefined.** §17: *"a scrub table the reviewer can audit against the book"* — "the reviewer" is never identified (operator? the §18 independent judge?). A gate whose auditor is unnamed is a gate that can be waived.

  ---

  ## VERDICT: **AMEND-NEEDED**

  The addendum's laws are individually sound and the aggregateRating removal was executed cleanly (§9/§10/§14 + template + locks all consistent, supersession noted in place). But the integration has seven load-bearing defects: the no-book fallback inverts the roster law (1), "genuine service capacity" is an open bypass (2), the laws stop at architecture while the audit sells first (3), the template's own header contradicts its new Location section (4), the BUILD GATES block exports the precision-as-law style the file elsewhere explicitly disclaims (5), standalone architecture mode can't satisfy its own template (6), and §22's first step is gated on an unrelated condition (7). Smallest sufficient fixes: rewrite the pull-#9 fallback as "no book → county hubs only, roster revisited when evidence exists"; define or delete "(or genuine service capacity)"; extend §17/§20/§22 obligations to the audit and plan modes (and wire pull #9 into `all`-mode Stage 1 unconditionally for existing-domain clients); strike "one per…city" from the template principles; add a calibrate-don't-worship rider plus a named metric and a boilerplate exclusion to the gates; and split the spam-legacy pull out of the job-history conditional.

