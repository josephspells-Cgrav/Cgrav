# BUILD REPORT — WO-T3 (Estimating UI extraction affordances)

**Builder:** Sonnet-5 (judgment-zero) · **Repo:** `mabrey-crm-app` (branch `showroom-integration`,
built off post-T1 HEAD `f84547f`) · **Sandbox:** built and gated entirely in a scratch copy;
source repo never mutated. Deliverable staged at
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/T3_STAGED_DELIVERABLE/`
(9 files, exact repo-relative paths).

## 0. Gates — final status

| Gate | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | ✅ PASS — zero errors |
| Tests | `npm test` | ✅ PASS — 3319/3319 (69 new: 26 + 18 + 25, see §3) |
| Build | `npm run build` | ✅ PASS — all routes compile, `/estimating/[id]` included |

Verbatim tails below (§6).

## 1. Files touched (9)

**New:**
- `src/lib/takeoff-client.ts` — pure client-side logic (request/response shaping,
  classifiers, formatters, types). Zero React import, zero DB import — mirrors
  `estimating-tabs.ts`/`estimating.ts`'s "pure module" convention.
- `src/components/estimating/takeoff-line-meta.tsx` — `FlagChip`, `ConfidenceDot`,
  `SourceCite`, `HandEditHint` (WO §2 row affordances).
- `src/components/estimating/extraction-runs-panel.tsx` — `ExtractionRunsPanel`,
  `TakeoffRunReportView`, `RunStatusPill`, `HandEditedDialogBody` (WO §3).
- `src/lib/takeoff-client.test.ts` — 26 tests.
- `src/lib/takeoff-line-meta.test.tsx` — 18 tests.
- `src/lib/extraction-runs-panel.test.tsx` — 25 tests.

**Modified:**
- `src/components/estimating/estimating-workspace.tsx` — §1 client PUT compliance
  (meta + baseUpdatedAt, 409-stale handling), §2 row affordances wired into the
  takeoff table, §3 panel mounted.
- `src/app/(app)/estimating/[id]/page.tsx` — threads `project.updatedAt` and each
  line's `meta` into `EstimatingWorkspace`'s props (2 small additions; nothing else
  changed).
- `package.json` — registered the 3 new test files by full path in the `"test"`
  hand-list (appended after `takeoff-apply.test.ts`).

**Never touched (per rules of engagement):** `src/lib/takeoff-assemblies.ts`,
`src/lib/takeoff-apply.ts`, `src/app/api/estimate-projects/[id]/line-items/route.ts`,
`src/app/api/estimate-projects/[id]/takeoff-runs/route.ts`,
`src/app/api/estimate-projects/[id]/takeoff-runs/[runId]/apply/route.ts` — all
read-only, verified against for the ACTUAL wire contract (see §4).

## 2. What was built, mapped to the WO

**§1 Client PUT compliance** — `buildLineItemsPutBody()` (takeoff-client.ts) assembles
`{line_items: [...meta unchanged...], baseUpdatedAt}`; `classifyLineItemsPutResponse()`
turns `(status, body)` into `"ok" | "stale" | "error"`. The autosave `useEffect` in
`estimating-workspace.tsx` now sends both, and on `"stale"` sets the shared save-label
to the exact text `Takeoff changed elsewhere — reloading` and calls
`refetchProjectAndLines()` (GET the same unmodified `/api/estimate-projects/[id]` the
page loaded from, replace `lines` + the token wholesale, no merge). A
`skipNextAutosave` ref stops that server-sourced `setLines` from immediately
re-triggering its own autosave PUT (would otherwise be a harmless but confusing
"reloading" → "Saving…" flash and a redundant round-trip).

**§2 Row affordances** — `FlagChip`/`ConfidenceDot`/`SourceCite`/`HandEditHint` each
take `meta: StoredLineMeta | null` and self-guard (render `null`) when not
applicable. Wired into the takeoff table via a new `TakeoffLabelCell` helper
(mirrors the file's existing `NumCell`/`Row` extracted-component pattern) designed so
a hand line's `<input>` renders as a **direct, unwrapped child** of the same `<td>` —
byte-identical to the pre-WO-T3 markup — rather than a conditionally-empty wrapper,
closing any doubt on "rows without meta render exactly as today."

**§3 Extraction runs panel** — `ExtractionRunsPanel` fetches
`GET .../takeoff-runs` on mount, renders newest-first rows (`sourceFilename · model ·
createdAt (fmtET) · RunStatusPill · appliedAt`), expands `complete` runs into
`TakeoffRunReportView` (the A2 report: 15-group table with flagShare% and 100%-tint,
crossChecks ✓/✗, flags, cost/tokens footer). Apply/Re-apply POSTs
`buildApplyRequestBody(getBaseUpdatedAt(), force)`; `classifyApplyResponse()` maps the
REAL route contract (`error: "stale"|"hand_edited"|"conflict"`, `ok:true` on success)
to an outcome the panel acts on: applied → local summary (+ the V3.1 duplication
tripwire list when hand lines exist) + tells the parent to refetch; stale/conflict →
tells the parent to reload (same path as §1); handEdited → opens a confirm dialog
(`Keep my edits` / `Re-apply anyway` → retries with `force:true`), lines rendered
`label — qty <quantity> (was <appliedQty>)`.

## 3. Tests (69 new, all registered by full path)

- `src/lib/takeoff-client.test.ts` (26) — PUT body includes `meta`+`baseUpdatedAt`
  unchanged; 409-stale classification; apply request/response classification against
  the real wire shapes (`stale`/`conflict`/`hand_edited`/`applied`); formatting
  helpers (`formatSourceCite`, `formatHandEditedLine`, `formatAppliedSummary`);
  `quantityChangedFromApplied` (numeric compare, never `extractedQty`, garbage-input
  fallback); `mapApiLineItems` (camelCase GET rows → InitLine, meta passthrough).
- `src/lib/takeoff-line-meta.test.tsx` (18) — flag chip presence/tooltip/fallback,
  confidence dot color classes for high/med/low, source cite with/without tile,
  hand-edit "was N" presence/absence (incl. the waste-line-untouched non-flag case),
  the unpriced-zero-renders-em-dash pin, and the meta-null "every affordance is a
  true no-op" sweep.
- `src/lib/extraction-runs-panel.test.tsx` (25) — status pill per state, the A2
  report rendered from a minimal 2-group/1-crossCheck/1-flag fixture (schema-exact,
  values arbitrary per the WO), the handEdited dialog's content, and source-text
  pins for the interactive wiring (apply POST token, dialog open/close, force-retry,
  duplication-tripwire gating) — technique (c) from `crm-ux-v3-estimating.test.ts`'s
  own header, used because this repo has no jsdom/testing-library and
  `@base-ui/react/dialog`'s Popup renders through a Portal that SSR never executes.

All three follow the house `tsx --test` + `node:assert/strict` + (where JSX is
involved) `react-dom/server`'s `renderToStaticMarkup` + the `globalThis.React`
binding idiom, copied verbatim from `src/lib/queue-card-locked-wording.test.tsx` and
`src/lib/crm-ux-v3-estimating.test.ts`.

## 4. Where the WO's prose and T1's ACTUAL merged code disagreed — built against the code

The WO §3 describes the apply flow's 409 shapes descriptively ("409 `{status:
"conflict"}`", "409 handEdited", dialog lines as "qty `<current>` (extracted
`<extractedQty>`)"). Reading the ACTUAL merged route
(`src/app/api/estimate-projects/[id]/takeoff-runs/[runId]/apply/route.ts`) and
`src/lib/takeoff-apply.ts` directly, the real wire contract is:

- Discriminator is `error: "stale" | "hand_edited" | "conflict"` (snake_case
  `hand_edited`), not `status`.
- `HandEditedLine = {lineKey, label, appliedQty, quantity}` — no `extractedQty` on
  this response at all. "current" in the WO's prose = `quantity`; "extracted" =
  `appliedQty` (the gross qty the apply wrote, per contract A3/V3.1 — never
  `extractedQty`, which is net-of-waste and differs by design on waste lines).

This matches the orchestrator's own clarification verbatim, which I independently
re-verified against T1's source before writing `classifyApplyResponse()`/
`formatHandEditedLine()`. Built against the code, not the gloss.

## 5. Design notes (not STOPs — the WO specified the WHAT; these are HOW calls I made)

1. **baseUpdatedAt refresh after a successful save.** T1's line-items PUT bumps
   `estimate_projects.updated_at` via drizzle's `.$onUpdate()` on every write but its
   response never returns the new value, and that route file is off-limits to modify.
   Left unaddressed, the SECOND autosave in a session would always 409 "stale"
   against the client's own first save. Fixed with a light follow-up
   `GET /api/estimate-projects/[id]` after every successful PUT
   (`refreshBaseUpdatedAt()`) and by capturing the fresh `project.updatedAt` that the
   PATCH route (finish-tier changes, blueprint uploads) already returns in its
   response body — both routes are unmodified reads. Documented at length in the
   component (search `$onUpdate`).
2. **New-file naming vs. the "never modify `src/lib/takeoff-*`" rule.** My new
   `src/lib/takeoff-client.ts` (and its test file) match that glob textually. Read
   the rule as protecting T1's two SHIPPED files
   (`takeoff-assemblies.ts`/`takeoff-apply.ts`) from edits — not reserving the whole
   `takeoff-*` prefix from any future file — since (a) "modify" implies editing
   existing content, this is a new file with new content; (b) T1 itself registered
   `takeoff-assemblies.test.ts`/`takeoff-apply.test.ts` under the same prefix; (c)
   the WO's own §4 asks me to add takeoff-related tests, which this repo's own
   naming convention (test named after what it covers) would naturally prefix the
   same way. Flagging explicitly in case this reading is wrong — a rename is a
   trivial mechanical follow-up, not a redesign, if so.
3. **Panel placement** — below the Takeoff editor card (not above), left column.
   Not pinned by the WO.
4. **Apply/Re-apply button** lives on the row itself (visible collapsed), not gated
   behind expanding the report first — a primary action shouldn't require an extra
   click to discover. Not pinned by the WO.
5. **Hand-edit hint comparison basis** — `quantityChangedFromApplied()` compares
   NUMERICALLY (`parseFloat`), not as raw strings, so a cosmetically different but
   numerically identical qty-box value (e.g. a user types "147.0" over a
   server-written "147") never false-flags a hand edit that didn't happen. Falls
   back to a string compare only if either side fails to parse.
6. **Unpriced rendering (WO §2 "when meta.unpriced and both cents are 0 → renders
   —")** required ZERO new code: `fmtMoneyCents()` (`src/lib/format.ts`, pre-existing,
   untouched) already renders `—` for any zero value unconditionally, which is
   exactly the described behavior. Verified by reading the source and pinned with an
   explicit test rather than silently assumed. The "waste hint" bullet was the same
   story — the label already carries `(incl N% waste)` from T1's engine; nothing to
   add.

**STOP count: 0** — nothing in the WO was left unbuilt. The six items above are
judgment calls on implementation mechanics, recorded per the "typist for a locked
design" discipline, not gaps.

## 6. Idiom sources (named, per file, for every pattern copied)

- Chip/pill styling (`border-<c> bg-<c>-soft text-<c>`, `rounded-full`,
  `text-[11px] font-semibold`): `src/components/badges.tsx`'s `Chip`, plus inline
  reuses in `src/components/estimating/estimate-preview.tsx`,
  `src/components/materials/materials-view.tsx`,
  `src/components/showroom/registry-editor.tsx`'s `SourceChip`.
- Status dot + pulsing-while-in-progress: `src/components/softphone/softphone-dock.tsx`
  (connecting/dialing/ringing/active states).
- Confirm dialog shape (Dialog/DialogContent/DialogHeader/DialogTitle, Cancel +
  primary Button footer): `src/components/board/win-confirm-dialog.tsx`.
- Delete/impact-style dialog conventions (Button variant/size, submitting-label
  pattern): `src/components/ui/delete-confirm-dialog.tsx`.
- Card shell / header bar / table headers / empty-state copy:
  `src/components/estimating/estimates-ledger.tsx`.
- "No toast lib in this repo" + the ONE existing `{error:"stale"}` 409 precedent:
  `src/app/api/registry/route.ts` header comment,
  `src/components/showroom/registry-editor.tsx` header comment.
- Pure-logic-extracted-for-testability seam (a `.ts` lib exports types/fns, a
  `.tsx` component consumes them, both get their own test):
  `src/lib/estimating-tabs.ts` / `src/components/estimating/estimating-tab-strip.tsx`.
- Test techniques (a) pure fn, (b) `renderToStaticMarkup` render-level, (c)
  source-text pin: named and demonstrated in
  `src/lib/crm-ux-v3-estimating.test.ts`'s own header;
  `globalThis.React` binding + HTML-entity-aware regex matching:
  `src/lib/queue-card-locked-wording.test.tsx`.
- `estimate_projects.updated_at`'s `.$onUpdate()` auto-touch behavior (governs the
  design note in §5.1): `src/lib/db/schema.ts`'s `updatedAt()` column helper.
- Existing takeoff-table extracted-component pattern (`NumCell`, `Row`) mirrored for
  the new `TakeoffLabelCell`: `src/components/estimating/estimating-workspace.tsx`
  itself.

## 7. Gate output — verbatim tails

### `npx tsc --noEmit`
```
(zero output — clean, exit 0)
```

### `npm test` (final run, reflects every edit incl. the skipNextAutosave guard)
```
  ✔ resolves the towns the book actually holds (0.9323ms)
  ✔ accepts ZIP+4 and stray whitespace, because real data carries both (0.1647ms)
  ✔ returns null rather than guessing (0.2252ms)
  ✔ omits 27611 on purpose — the book's single row for it is a typo (0.223ms)
  ✔ holds no blank or whitespace-only town (0.5741ms)
✔ townForZip (3.2707ms)
▶ formatAddressLine
  ✔ renders street, town, ZIP (0.2495ms)
  ✔ UNKNOWN ZIP falls back to the exact line it rendered before (0.1374ms)
  ✔ degrades through every partial shape (0.1859ms)
  ✔ trims, so a stray space cannot produce a dangling comma (0.218ms)
✔ formatAddressLine (1.1449ms)
▶ the Slack alert renders the resolved town
  ✔ puts the town in the house line (1.0632ms)
  ✔ an unknown ZIP still renders the address, minus the town (0.5239ms)
✔ the Slack alert renders the resolved town (1.9621ms)
ℹ tests 3319
ℹ suites 906
ℹ pass 3319
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 227677.4319
EXIT=0
```
3250 pre-T3 (T1's own count, its commit message) + 69 new (26 + 18 + 25, §3) = 3319.
Isolated per-file runs of the 3 new files also captured clean (26/26, 18/18, 25/25)
during development — included here for the record since they surfaced 3 real bugs
before the final run (see §8).

### `npm run build`
```

> mabrey-crm@0.1.0 build
> next build

   ▲ Next.js 15.5.20
   - Environments: .env.local, .env

   Creating an optimized production build ...
 ✓ Compiled successfully in 38.8s
   Skipping linting
   Checking validity of types ...
   Collecting page data ...
   Generating static pages (0/9) ...
   Generating static pages (2/9)
   Generating static pages (4/9)
   Generating static pages (6/9)
 ✓ Generating static pages (9/9)
   Finalizing page optimization ...
   Collecting build traces ...
...
├ ƒ /api/estimate-projects/[id]/line-items                    423 B         103 kB
├ ƒ /api/estimate-projects/[id]/takeoff-runs                  423 B         103 kB
├ ƒ /api/estimate-projects/[id]/takeoff-runs/[runId]/apply    423 B         103 kB
...
├ ƒ /estimating/[id]                                        7.95 kB         162 kB
...
+ First Load JS shared by all                                103 kB
ƒ Middleware                                                 132 kB
EXIT=0
```
The one compile warning present in every run (`@auth/core`'s `jose` dep using
`CompressionStream`/`DecompressionStream`, unsupported in Edge Runtime) is
pre-existing `node_modules` noise, unrelated to and unaffected by this WO —
reproduces identically on a clean checkout with zero T3 changes.

## 8. Development-time bugs the isolated per-file test runs caught (fixed before the
final run above; noted since they're the actual value of running gates incrementally)

1. Two source-text-pin regexes used HTML-shape assumptions (`>Keep my edits<`)
   against raw JSX SOURCE TEXT (multi-line, indented) instead of rendered HTML —
   fixed to plain substring matches.
2. `ExtractionRunsPanel` (uses `useState`/`useEffect`) was called as a bare function
   in one smoke test instead of through `React.createElement` — hooks require
   React's real dispatcher; bare calls throw "Cannot read properties of null
   (reading 'useState')". Fixed; the other, hook-free presentational exports
   (`RunStatusPill`, `TakeoffRunReportView`, `HandEditedDialogBody`, and everything
   in `takeoff-line-meta.tsx`) are correctly callable directly (same style as
   `crm-ux-v3-estimating.test.ts`'s `EstimatingTabStrip({...})` call) and did not
   need this.
3. Two regex literals used the `s` (dotAll) flag, which `tsc` rejects under this
   project's `ES2017` target (needs ES2018+) — rewrote with `[\s\S]` instead.
