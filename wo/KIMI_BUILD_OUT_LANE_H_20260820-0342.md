• I'll start by reading the work order in full.

• Now let me look at the two files I'm authorized to touch.

• Let me check the LEGACY_301 regex shapes in lib/legacy-url-rules.ts (read-only).

• Context is clear. Now I'll make the three changes, starting with the guard's tripwire.

• Now the sitemap-count floor (change 2):

• All three changes are in. Now the gates — branch check, typecheck, then build.

• Typecheck passed, but let me capture the exit code properly (the pipe masked it), then run the build.

• While the build runs, I'll check for any existing listener on port 3218.

• No existing listener on :3218. The build is running in the background; I'll continue once it completes.

• Build passed (exit 0). Now starting the server on :3218 and proving freshness via the BUILD_ID manifest.

• Server freshness proven (BUILD_ID manifest 200). Now the three gate scripts:

• The derivation drops the leading slash that the mirror keeps — I'll normalize derived slugs with a leading `/` so the set comparison is apples-to-apples.

• Guard passes with the tripwire line visible. Now the other two gates:

• All gates green. Now the §7 oracle probes, redirect-disabled (raw first response):

• All oracle probes match. Now the I2 mutation test — run a mutated COPY of the guard (never the shipped file), expecting exit 2.

• Both mutation variants fail with exit 2 as required, and scratch copies are removed. Now writing the report.

• Report written. Committing the three files on the branch:

• SEO Lane H complete. Compact summary:

  **Changes (only the authorized files)**
  - `scripts/spam-410-guard.mjs` — count-only tripwire replaced with mechanical content-equality derivation from `LEGACY_301` (both-directions set equality, exit 2 + both sets printed on mismatch, exit 2 naming any underivable regex); sitemap-count floor added (`< 130` → exit 2; live count 168).
  - `middleware.ts:186` — matcher only: `quote` → `quote(?:/|$)`.
  - `wo/BUILD_REPORT_SEO_LANE_H.md` — full report per §8.

  **Freshness proof**: no prior :3218 listener; `BUILD_ID=OdoP3lLHJQFUJyqKyatyI`, `/_next/static/<BUILD_ID>/_buildManifest.js` → 200.

  **Gate exit codes**
  | gate | exit |
  |---|---|
  | `npm run typecheck` | 0 |
  | `npm run build` | 0 |
  | `PORT=3218 npm run spam-410-guard` | 0 (tripwire line visible; 183/183 negative control clean; 27 PASS rows) |
  | `PORT=3218 npm run doorway-check` | 0 |
  | `PORT=3218 npm run reachability-check` | 0 (168/168) |

  **Oracle (redirect-disabled, raw first response)** — all PASS:
  - `/quote` → 200 · `/quote/` → 200 (recorded) · `/quote-test-path/` → **308 → /quote-test-path** (proves middleware now sees quote-*; bare form 404s as a normal route miss) · `/online-casinos-curacao-2026/` → 410 · `/locations/cary-nc/` → 308 → /locations/cary-nc · `/` → 200

  **I2 mutation proof** (scratch copies of the guard, deleted after): add-fake-entry → exit 2; same-count replacement (`/locations` → `/locations-renamed-wrong`, the exact silent-drift case the old check missed) → exit 2. Unmutated tree passes.

  **Commit**: `5c15623633e2ba393400af3cbe2e89538c4426da` on `seo-h-hardening` — `seo-lane-h: guard content-equality tripwire + sitemap floor + quote matcher tighten`. Not pushed; server on :3218 stopped.

  **One flagged gap**: the comment block at `middleware.ts:175-185` still describes the old blanket `quote` exclusion — left untouched per the WO's single-matcher-line restriction; noted in the report instead of improvising.

