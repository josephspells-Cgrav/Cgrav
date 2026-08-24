• I'll start by reading the relevant sections of both files.

• Now let me see the oracle matrix section and the `assertRow`/`recordRow` helpers.

• Now I have everything. Applying the five fixes.

• Now fix 5, the stale WO_SPEED comment in `middleware.ts`:

• All five fixes are in. Now the gates — first check scripts, node version, and the WO §7 oracle probes.

• While the build runs, I'll draft the FIX ROUND section for the build report.

• Build passed (exit 0). Starting the server on 3218 and proving the fresh BUILD_ID.

• Server freshness proven (`BUILD_ID Mz8EJC8ZR3Iki6OqMSQhM` → 200). Running the three gates:

• Guard passes with the new exact-200 `/quote/` row. Running the other two gates plus the WO §7 oracle probes:

• Now stop the server, verify the diff scope, and commit.

• Diff is exactly the three allowed files. Committing on `seo-h-hardening`:

• FIX ROUND complete. All 5 findings implemented:

  1. **MED** — `/quote/` oracle row now asserts **exactly 200** with the semantics in the failure message (200 = matcher exclusion held/middleware never ran; 308 = middleware ran, paid-traffic fast path dead); header comment updated — `/quote/` removed from the RECORD-only/ambiguous list, now a crisp gated exclusion signal.
  2. **LOW** — `derivedLegacy301Sources.length === LEGACY_301_SOURCES.length` asserted alongside the set comparison (duplicate-entry drift, exit 2).
  3. **LOW** — `deriveLegacy301Source` returns `null` (→ exit 2 via existing cannot-derive path) when `rx.flags` lacks `i`.
  4. **LOW** — sitemap-floor error now ends with "If this reduction is deliberate, lower the floor constant in this same file as part of the pruning diff."
  5. **LOW** — WO_SPEED comment above the matcher rewritten to name `quote(?:/|$)` and the deliberate `/quote-*` narrowing (matcher line itself untouched).

  **Gates** (fresh build, server on :3218 — no prior listeners; `BUILD_ID Mz8EJC8ZR3Iki6OqMSQhM` proven via `/_next/static/<id>/_buildManifest.js` → 200):

  | gate | exit |
  |---|---|
  | `npm run typecheck` | **0** |
  | `npm run build` | **0** |
  | `PORT=3218 spam-410-guard` | **0** (`/quote/ (exactly 200 — matcher exclusion held, I5) PASS`, tripwire line visible, 168 sitemap URLs) |
  | `PORT=3218 doorway-check` | **0** |
  | `PORT=3218 reachability-check` | **0** (168/168 ≤2 hops) |

  WO §7 oracle (redirect-disabled): `/quote` 200 · `/quote/` 200 · `/quote-test-path/` 308→`/quote-test-path` · `/online-casinos-curacao-2026/` 410 direct · `/locations/cary-nc/` 308→`/locations/cary-nc` · `/` 200 — all match.

  Report updated (`wo/BUILD_REPORT_SEO_LANE_H.md` §8 FIX ROUND). Server stopped. No push, no deploy, no env files.

  **Commit:** `f475d19` on `seo-h-hardening` — 3 files changed (spam-410-guard.mjs, middleware.ts comment-only, report), +85/−7.

