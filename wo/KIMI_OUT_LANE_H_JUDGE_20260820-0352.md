• I have the three artifacts. Checking whether the guard script itself probes the `/quote` matcher exclusion before I write the audit.

• All evidence gathered. Here is the audit.

  ## VERDICT — SOUND TO MERGE: **yes**, with one verification hole to close first

  The diff itself is mechanically sound: `deriveLegacy301Source` correctly reduces all 7 current `LEGACY_301` entries to exactly the hand-mirrored set (verified entry-by-entry against `lib/legacy-url-rules.ts:43-55`), fails loud (null → exit 2) on every non-literal shape I could construct rather than mis-deriving, and the matcher token `quote(?:/|$)` traces clean through the negative lookahead — `/quote` and `/quote/*` still excluded, dotted paths still excluded via the independent `.*\\.` alternative, no alternation-order interaction. The one real problem is not in the shipped code but in the proof: **the guard's live probes cannot observe the `/quote` matcher exclusion at all**, so "probes pass" does not establish success criterion 3 ("cannot break the /quote fast path"). That is a one-line assertion fix, detailed in F1. Nothing found rises to HIGH or LAUNCH-KILLER.

  ## FINDINGS

  **F1 — MED — The gate never proves the `/quote` fast path; both probes are exclusion-blind.**
  Hole: the only two live probes touching `/quote` are `spam-410-guard.mjs:789` (`/quote` → assert 200) and `:790` (`/quote/` → assert *not* 404). But middleware passthrough is observationally identical to middleware absence for this route: `/quote` matches no SPAM_410 / LEGACY_301 / B-section rule and has no trailing slash, so a *broken* matcher (middleware running) also returns 200 via `NextResponse.next()`. Probe 789 passes either way. Probe 790 is the one signal that *could* distinguish — middleware running on `/quote/` produces a 308 (middleware step 6), middleware excluded produces 200 (with `skipTrailingSlashRedirect: true`, Next serves the slashed URL directly) — but the assertion `statusCode === 404 ? fail : true` **accepts both 200 and 308**. So if this lane's regex edit (or a future one) silently killed the exclusion, the gate stays green while the paid-traffic fast path is dead.
  Failure scenario: someone later refactors the matcher (say, rewraps the lookahead or reorders alternatives) and `quote(?:/|$)` stops matching; every paid click to `/quote` now pays the full middleware chain; the gate reports PASS; nobody notices because there is no user-visible error — only the latency the exclusion existed to remove.
  Minimal fix: change line 790's assertion to `r.statusCode === 200 ? true : \`got ${r.statusCode} (want 200 — matcher exclusion means middleware never runs, so no 308)\``. That turns the ambiguous row into the actual tripwire for criterion 3. (The header comment at line 40 lists `/quote/` among "RECORD-only, ambiguous by design" rows — that ambiguity was designed for the pre-`skipTrailingSlashRedirect` world; post-Lane-M, 200-vs-308 on `/quote/` is a crisp exclusion signal, not ambiguity.)

  **F2 — LOW — Set-based tripwire masks duplicate-entry drift.**
  Hole: `derivedSet`/`mirrorSet` (`spam-410-guard.mjs:469-472`) dedupe, so multiset differences pass: a duplicated `LEGACY_301` row (8 lib entries, 7 unique slugs, mirror updated to the same 7 uniques) passes content-equality, as does a duplicated mirror entry against a 7-entry lib.
  Failure scenario: a copy-paste duplicate row ships; guard green; harmless functionally (the negative control iterates a deduped `Set` anyway) but the "1:1" claim in the error text is then false.
  Minimal fix: also assert `derivedLegacy301Sources.length === LEGACY_301_SOURCES.length` alongside the set comparison.

  **F3 — LOW — The documented regex shape includes `/i`; the derivation never checks flags.**
  Hole: the shape contract quoted in the code and brief is `/^\/<literal-slug>\/?$/i`, but `deriveLegacy301Source` reads only `rx.source`, never `rx.flags`. A future entry authored without `/i` derives cleanly and passes the tripwire while silently becoming case-sensitive in middleware (`rx.test(normalized)` at `middleware.ts:140` honors the missing flag).
  Failure scenario: `/^\/New-Page\/?$/` (no `i`) ships; `/new-page` stops 301ing for uppercase arrivals; tripwire green; the negative control still passes because it tests the lowercase mirror string against SPAM_410, not the 301 behavior.
  Minimal fix: inside `deriveLegacy301Source`, `if (!rx.flags.includes("i")) return null;` — reuses the existing fail-loud path.

  **F4 — LOW — Sitemap-floor error message omits the remediation path.**
  Hole: the `<130` failure message (`:402-406`) says "refusing to run against a possibly hollowed registry" but never says what to do if the shrink is *deliberate* (a real prune of >38 pages, ~23% of 168, is a plausible future state — e.g. retiring a location set or the `/es` section).
  Failure scenario: a legitimate pruning diff lands; the gate hard-fails; the operator burns time deciding whether the floor or their diff is wrong, then either finds the constant by reading source or — worse — "fixes" it by padding the sitemap.
  Minimal fix: append one sentence: "If this reduction is deliberate, lower the floor constant in this same file as part of the pruning diff."

  **F5 — LOW — Stale WO_SPEED comment describes the superseded bare-`quote` token.**
  `middleware.ts:176-185` still documents the exclusion as bare `quote` ("`quote` added to the exclusion list … cannot shadow any other real route"). The rationale conclusions remain valid, but the comment now describes a token that no longer exists in the matcher two lines below it.
  Minimal fix: one-line comment touch-up naming `quote(?:/|$)` and the deliberate `/quote-*` narrowing. Cosmetic; no behavior stake.

  ## ANSWERS

  **1. Derivation function.**
  I traced all 7 current entries by hand: each source is `^\/<slug>\/?$`, the `slice(3)`/`slice(0,-4)` strips are exactly right (4 chars: `\`, `/`, `?`, `$`), the `\/`→`/` and `\-`→`-` unescapes are no-ops on today's slugs, and the metacharacter blacklist `[\\^$.*+?()[\]{}|]` plus the residual-backslash catch is **complete for JS regex source text** — those twelve characters plus backslash are the entire JS metachar set. Every adversarial shape I constructed fails loud (null → exit 2), never wrong-slug: character classes (`[a]` → `[`), quantifiers (`+`, `{2}`), groups (`(?:…)`, captures), alternation (`|`), anchors-in-middle (`$`), escapes (`\d`, `\x2f`, `\u0041`, `\%`), dot-escaped slugs (`v1\.0` → backslash), missing-`?` (`\/$` tail → endsWith fails), `new RegExp("…")`-built patterns with raw `/` (startsWith fails). Case flags: **not checked** — the only real gap, and it fails *open* (F3) rather than mis-deriving. No character class is wrongly passed. One direction note: a future mixed-case literal slug (e.g. `/^\/Roof-Repair\/?$/i`) would derive `/Roof-Repair` and *mismatch* the lowercase mirror — a false-fail, which is the safe direction for a tripwire. Verdict: cannot false-pass or false-fail on the current 7-entry list; all failure modes on plausible-future shapes are loud.

  **2. Matcher regex mechanics.**
  Traced against `/((?!api|…|quote(?:/|$)|.*\\.).*)`. Next compiles this documented negative-lookahead idiom as a custom regex (presence of `(` routes it off the plain path-to-regexp path), so the non-capturing group `(?:/|$)` is ordinary JS regex syntax at runtime — and any compile-level rejection would have failed the *build*, which the brief states passes. Lookahead mechanics, position = just after the leading `/`:
  - `/quote` — `quote` matches, `(?:/|$)` takes `$` (end of pathname; no `m` flag, so `$` is string-end even inside Next's anchored wrapper) → lookahead succeeds → negated → middleware skipped ✓
  - `/quote/`, `/quote/x` — `/` branch → excluded ✓
  - `/quote-foo` (future) — `quote` matches, `-` satisfies neither `/` nor `$` → that alternative fails; `.*\\.` fails (no dot) → lookahead fails → middleware **runs** — precisely the stated intent, and safe: the §Z flat-slug rule is root-single-segment-scoped and the guard's disk-enumerated negative control would catch any ≥4-hyphen `/quote-*` route at gate time ✓
  - `/quote.foo` — dot branch excludes it, same end state as before ✓
  - Alternation ordering: irrelevant to the boolean result — any alternative succeeding excludes; `.*\\.` after the quote token neither shadows nor is shadowed. Dotted-path and `api` exclusions are untouched.
  Behavior change vs. the old bare `quote`: only for hypothetical `/quote*` siblings (`/quotes`, `/quotations`), which no current route occupies — success criterion "no behavior change for any current route" holds. Pre-existing (not this diff): `/quote/` serves 200 without a canonicalizing 308 because the exclusion predates Lane-M's middleware-side slash handling — unchanged by this lane, noted only for the record. The un-provable-by-current-probes aspect of all this is F1.

  **3. Sitemap floor.**
  The floor fails *closed* and loud, which is the correct posture for a tripwire — I found no state where it produces silent damage, only two loud-block states:
  - **Deliberate mass prune** (>38 of 168 pages, ~23%) — plausible in a future consolidation; gate blocks until the constant moves in the same diff. Legitimate tripwire behavior; only the missing remediation sentence makes it costlier than it should be (F4).
  - **Future sitemap-index migration** — if growth ever shards `/sitemap.xml` into an index of child sitemaps, the `<loc>` entries become sitemap URLs, the page count craters, and the floor blocks. Arguably *desired*: every downstream control assumes `<loc>` = live pages, so an index format would otherwise vacuously green the gate. The floor is the first thing that would catch it.
  Staging/preview builds serve the same tree, so the count is identical there — not a real false-block state. The floor counts post-`normLoc` deduped paths, so it also backstops a `normLoc` regression that starts mass-dropping valid entries. Verdict: no illegitimate block found; keep 130.

  **4. THE ONE THING before merge.**
  Fix the `/quote/` probe assertion (`spam-410-guard.mjs:790`) to require exactly **200** (F1). Right now the gate is structurally incapable of detecting the one regression this lane's matcher edit could cause, because middleware-running and middleware-skipped are response-identical for `/quote` and both 200-and-308 pass for `/quote/`. With that one-line change, the probe suite actually proves success criterion 3 — 200 means the exclusion held, 308 means middleware ran and the fast path is dead — and the diff's remaining content (tripwire, floor) already proves criteria 1 and 2. Everything else found is LOW and can ride along or wait.

