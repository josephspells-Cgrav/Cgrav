• Reading the four artifacts now.

• ## VERDICT

  **Sound to merge: yes — with three guard additions that should land in this lane, not after it.** The runtime side is clean: I attacked every `SPAM_410` pattern against the current route set and plausible future roofing-site routes and found no live or likely-future URL that 410s today; the middleware cannot 500 on hostile input (every decode is guarded, no pattern has catastrophic-backtracking shape); the guard cannot pass vacuously in the strict sense (positive control + zero-`<loc>` hard-fail + HTTP-failure exit 2). The holes are all in *what the guard proves*, not in *what the middleware does* — and two of them sit on exactly the mechanisms the WO itself flagged as load-bearing: the Persian dual-form slug (WO §5.1's ⚠️) is absent from the positive control, and the guard's sitemap fetch is never bound to this lane's build, leaving T3 (`/es` in sitemap) with zero mechanical enforcement. None of that blocks the deploy; all of it is five lines to fix while the lane is still open. No launch-killers found.

  ## FINDINGS

  **F1 — MED · `scripts/spam-410-guard.mjs` (MUST_410) · the Persian slug is untested.**
  Hole: `MUST_410` covers 10 URLs but omits the percent-encoded Persian slug in *both* its forms — the one URL whose matching depends on the most machinery in the lane (guarded decode at module load, dual-form test in `matchesSpam410`), and the one the WO explicitly warned about.
  Failure scenario: `PERSIAN_LEGACY_SLUG_ENCODED` gets mangled in a later edit (or the `slugs.push(PERSIAN_LEGACY_SLUG_DECODED)` line is refactored away) → decode returns null/garbage → the pattern silently loses that slug → spam URL drops back to 404, de-indexing stalls, guard stays green. The exact failure the positive control exists to catch, on the exact URL that needs it most.
  Minimal fix: add both `/%D8%AF%DB%8C%D9%88%D8%A7%D9%86%DA%AF%DB%8C-%D9%85%DB%8C%D9%88%D9%87%D9%87%D8%A7%DB%8C-%D9%85%D8%AF-%D8%B1%D9%88%D8%B2` and its decoded form to `MUST_410`.

  **F2 — MED · `scripts/spam-410-guard.mjs` (negative control) · the fetched sitemap is never bound to the expected build; T3 is unenforced.**
  Hole: the guard fetches `/sitemap.xml` from *whatever is listening on :3210* and asserts only "≥1 parseable `<loc>`". It never asserts the sitemap contains any expected path — including `/es`, the one sitemap change this lane exists to make.
  Failure scenario (wrong-tree): a stale `next start` from the main checkout (master, pre-lane) is running on 3210. Its sitemap has no collisions with the new patterns → negative control passes; positive control doesn't touch the server → **PASS against the wrong build**. Same hole, other face: if the `/es` registry edit was never made, the guard still passes — T3 rests entirely on the build report's say-so.
  Minimal fix: one line — `if (!sitemapPaths.has("/es")) { ...exit 2 }`. Kills the wrong-tree pass *and* mechanically enforces T3.

  **F3 — MED · `scripts/spam-410-guard.mjs` (MUST_410) · I3's claimed enforcement is false for the four `/wp-*` patterns.**
  Hole: WO I3 states the positive control covers "all pre-existing patterns." It doesn't — `/wp-admin`, `/wp-json`, `/wp-content`, `/wp-includes` (410ing in production since 2026-07-09) have no `MUST_410` row.
  Failure scenario: a future edit typos or drops a `wp-*` line (plausible during exactly this kind of registry refactoring) → production loses 410 on live probe traffic → guard passes, nobody notices until crawl stats move.
  Minimal fix: add one URL per `wp-*` pattern (e.g. `/wp-admin/`, `/wp-json/wp/v2/posts`, `/wp-content/uploads/x`, `/wp-includes/js/x`) to `MUST_410`. That makes I3 literally true.

  **F4 — MED-LOW · `lib/legacy-url-rules.ts` (SPAM_410 #1, #2–4, #9) · future-collision landmines whose only net is the guard.**
  Hole: `/^\/blog\/page\/\d+\/?$/i` will 410 blog pagination the day the blog adds `/blog/page/2` (the single most plausible future blog feature); `/^\/(tag|author|category)(\/|$)/i` will 410 root-level taxonomy/author pages if the blog ever grows E-E-A-T furniture at the root; `/\/feed\/?$/i` will 410 a future `/blog/feed` RSS endpoint. All three are dormant today.
  Failure scenario: a future lane ships `/blog/page/[n]`, the route isn't in `sitemap-registry.ts` yet (or that lane's guard run is skipped), and pagination 410s in production between deploy and registry update.
  Minimal fix: no pattern change — the guard is the correct mitigation, but only while (a) it stays a blocking gate in every lane that adds routes, and (b) new routes land in the sitemap registry in the same diff. Add one line to the module header stating that rule. Accept and move on.

  **F5 — LOW · `lib/legacy-url-rules.ts:121` · word-bounded gambling alternation has an evasion class.**
  Hole: `\b` is ASCII-based, so keywords glued to digits, letters, or `_` evade: `/casino2026/`, `/aviatorx/`, `/online_casino/` all fail to match. (Hyphen-bounded spam — the entire known inventory — is caught.)
  Failure scenario: some slice of the ~37k indexed spam URLs has digit-adjacent keywords → those URLs keep 404ing. Unknowable from here; the known-10 are all hyphen-bounded and pass.
  Minimal fix: none. Loosening the boundary re-opens the FIX_ROUND_1 collision hole (`slot`, `betting`). The removal of those two keywords is correct and well-documented — do not relitigate.

  **F6 — LOW · `middleware.ts:114` (matcher) · any dotted path bypasses middleware entirely.**
  Hole: the `.*\.` lookahead exclusion means spam URLs containing a dot anywhere — `/index.php?p=123`, `/feed.rss`, `/*.php`, `/*.html` — never reach the 410 logic and 404 instead. The de-indexing speedup has a hard ceiling for the dotted subset of the spam inventory. Comments disclose this; I5/§4 correctly freeze the matcher in this lane.
  Failure scenario: a meaningful share of the ~37k hacked-WP URLs end in `.php`/`.html` → they de-index at 404 speed while the WO narrative says "de-index fast."
  Minimal fix: future lane — narrow the exclusion from "any dot" to known asset extensions. Out of scope here; flagged so the expectation is honest.

  **F7 — LOW · `scripts/spam-410-guard.mjs` vs WO §5.3.1 · unauthorized-but-defensible deviation.**
  Hole: the WO ordered "import the paths from `lib/sitemap-registry.ts`"; the guard instead fetches the rendered `/sitemap.xml` over HTTP. This is a real deviation from the letter of the contract, with real upside (tests the composed output, catches registry→sitemap wiring breaks) and real cost (new gate precondition — a prod build on :3210; enables F2).
  Failure scenario: a CI/orchestrator gate run without a server on 3210 → exit 2 → merge blocked by a precondition, not a failure. Loud, not silent — the safe direction — but operationally surprising on first hit.
  Minimal fix: F2's sentinel line restores the binding the registry-import would have provided. Keep the HTTP fetch; it's the stronger design.

  **F8 — LOW · `scripts/spam-410-guard.mjs:26` · `.mjs` importing `.ts` rides on Node type-stripping.**
  Hole: `import ... from "../lib/legacy-url-rules.ts"` requires Node ≥22.6-ish type-stripping (default-on in 23.6+/24). The TS is erasable-only (checked: no enums, namespaces, or parameter properties), so it works on the fleet's Node 24.
  Failure scenario: anyone runs the gate on an older Node → hard module-load crash. Fails loud, exit non-zero — safe direction, zero vacuous-pass risk.
  Minimal fix: none required. One line in the header ("requires Node ≥ 22.6 for type-stripping") ends future confusion.

  **F9 — LOW (nit) · WO §1 vs artifact · stale "6" in the contract.**
  WO says `LEGACY_301` "maps 6 real old pages"; the module exports 7 entries. The seventh (`/locations` → `/service-areas`, SEO WO 2026-07-26) predates this lane and is documented in-line. Not a defect — a stale contract sentence. No action.

  ## ANSWERS

  **1. Pattern collision sweep.**
  - Date pattern `/^\/(19|20)\d{2}\/(0[1-9]|1[0-2])(\/\d{1,2})?\/?$/`: safe. No real or plausible route is bare `/YYYY/MM[/DD]` (blog is `/blog/[slug]`, locations are `/locations/[city]-nc`). Month-`00` correctly refused; day range loose (`0`–`99`) but harmless since nothing real lives under that shape. Non-padded months (`/2025/5/`) miss → 404, acceptable, WP's canonical form is padded.
  - Gambling alternation: word boundaries verified against the whole known inventory — all spam keywords are hyphen-bounded and match. No collision with any current route, any of the 17 `/locations/[city]-nc` names, or realistic roofing vocabulary (`casinos?`, `kazino`, `melbet`, `pinco`, `tragamonedas`, `vkladu`, `thunderstruck`, `aviator`, `bookmaker` have no roofing/NC-geography homographs). The `slot`/`betting` exclusions are correct. Evasion class exists (F5) but doesn't touch the fixed indexed inventory.
  - Explicit-slug builder: `escapeRegExp` correct; hyphen needs no escape outside a character class; `/` needs no escape in a `RegExp` constructor string; `^(?:...)​\/?$` anchoring makes alternation order irrelevant and prefix-swallowing impossible; the `i` flag is safe (Persian has no case; real routes are lowercase by convention). Decoded-Persian branch is correct — but see F1. `/interior-exterior-painting` is exact-match only, so the burn radius if the business ever adds painting services is exactly one slug — acceptable. `/projects-2` cannot swallow a future `/projects` portfolio page.
  - Landmines: F4 (`/blog/page/\d+`, root `/tag` `/author` `/category`, `/feed$`). No *current* collision exists anywhere in the registry.

  **2. Encoding/hostile input.** `matchesSpam410` cannot throw: both decodes (module-load and runtime) go through `safeDecodeURIComponent`; regex tests don't throw on strings; no pattern has nested quantifiers, so overlong paths cost linear time, not exponential. NUL bytes (`%00`) decode cleanly and match nothing. Encoded-slash evasion (`/tag%2Fspinsweet`) is *caught* by the decoded branch — good. Two residual bypasses, both LOW: double-encoded arrivals (`%25D8%25AF…` decodes once to the still-encoded form, which matches nothing) and Unicode-normalization variants of the Persian slug. Both affect only de-indexing speed of one spam URL, never correctness of a real page. The guard is airtight against what matters: I4 holds.

  **3. Middleware order + matcher.** Order is safe: no `LEGACY_301` source matches any `SPAM_410` pattern (checked all seven), and no spam URL matches `LEGACY_301` or the B-section migration regexes ahead of A2 — A2 runs first regardless. The B section is preserved verbatim. Two matcher facts that matter: (a) a dot anywhere in the path bypasses middleware entirely — dotted spam keeps 404ing (F6), and the exclusions are prefix-based, so `/quotes` and `/apiary`-shaped future routes would silently skip middleware too; (b) case — the matcher is case-sensitive but all spam patterns carry `i`, so `/WP-ADMIN/…` still 410s. No real page is caught by a 410 ahead of its redirect, and no spam URL reaches a redirect before the 410 check.

  **4. The guard.** It cannot pass vacuously in the narrow sense: positive control is wired (verified all 10 `MUST_410` entries against the actual `SPAM_410` array — all match), zero-`<loc>` hard-fails exit 2, unreachable server hard-fails exit 2, TS-import failure is loud. But it can still pass while lying twice: against the **wrong tree** (stale server on :3210 — F2), and **incomplete** (Persian slug and all four `wp-*` patterns unproven — F1, F3). `normLoc`, the host-set, and the `<loc>` parsing are sound; a foreign-origin sitemap collapses to zero entries and trips the loud exit-2 rather than passing. Fix is three cheap additions: `/es` sentinel, Persian (both forms), four `wp-*` rows.

  **5. WO compliance.** Inside the contract on everything visible: the four files are all within §4's ONLY-these-files; §6 (`/commercial-roofing`) is untouched — its presence in `LIVE_ROUTES` is a test assertion, not an edit, and is consistent with the page being live-but-noindex. I1 holds for every route I can see; I2 holds (with the F1/F3 gaps in coverage, not in mechanism); I3's middleware side is honored (order, B-section, matcher, and the pre-existing pattern set all preserved verbatim — but its *enforcement claim* is overstated, F3); I4 holds; I5 holds — matcher untouched, `quote` exclusion and its comment intact; I6 holds. Two deviations from the letter of the WO, both documented in-line: the guard fetches the sitemap over HTTP instead of importing `SITEMAP_ENTRIES` (§5.3.1 — F7), and the gambling pattern is word-bounded with `slot`/`betting` dropped rather than the WO's anchored full list (§5.1 — traceable to FIX_ROUND_1_SEO_LANE1.md, correct call). Not verifiable from these four artifacts: the `/es` edit to `lib/sitemap-registry.ts` itself, the `package.json` script line, the build report, and the §8 gate outputs — the orchestrator's verification pass must confirm those.

  **6. The one thing.** Add the `/es` sentinel to the guard: `if (!sitemapPaths.has("/es")) exit 2`. One line, and it closes the two largest holes at once — the guard can no longer pass against a stale/wrong build (F2), and the lane's only sitemap deliverable (T3) goes from "asserted in a report" to "mechanically enforced every run" — which was the entire stated purpose of this lane. If a second change were allowed: F1's two Persian rows, because the lane's most fragile matching machinery is the part the guard doesn't watch.

