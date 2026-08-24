• I'll read the four authorized files from the worktree in parallel.

• ## VERDICT

  **SOUND TO MERGE: YES** — with zero launch-killers and zero HIGH findings. I read all four authorized files line-by-line and statically verified every load-bearing claim rather than trusting the comments: the decision order in `middleware.ts` (normalize → root-query-410 → spam-410 → LEGACY_301 → B-section migrations → 308-last) is correct and self-consistent; both new §Z rules are provably root-single-segment-scoped and cannot touch any current route shape; every redirect target provably re-enters middleware and falls through (no loops); the single-string `new URL()` construction is genuinely off-origin-proof (analysis in Answer 3); and the guard is fail-closed on every path I could find — fetch errors exit 2, probe errors become FAILs, empty enumerations are hard-refused, and the guard imports the same rule module the middleware runs rather than a copy. The one thing that is NOT proven by anything in this artifact set is production-edge behavior: the guard is hardcoded to `localhost:3210`, and the rows where Vercel's platform routing could diverge from `next start` (multi-slash, `%2F`) are exactly the rows the WO marked RECORD-only. That is a post-deploy verification task, not a code defect — see Answer 5. Findings below are one MED (a real spam-catch hole in the fail-safe direction) and five LOWs, none of which block tonight's merge.

  ## FINDINGS

  **F1 · MED · `lib/legacy-url-rules.ts:168-171` (KEYWORD_FAMILY_RULE)**
  Hole: Rule 2's token classes are ASCII-only — `(?:[a-z0-9]+-)*(...)(?:-[a-z0-9]+)*` with an `i`-only flag — while Rule 1 was deliberately widened to `[\p{L}\p{N}]` + `iu` in Fix Round 2. The asymmetry means a ≤3-hyphen root slug that mixes a rule-2-only keyword with even one non-ASCII token evades *everything*: `/juega-poker-españa` fails Rule 2 (`ñ` ∉ `[a-z]`), fails Rule 1 (2 hyphens < 4), and `poker` is not in the OLD unanchored alternation (`casinos?|kazino|gambling|melbet|pinco|tragamonedas|vkladu|thunderstruck|aviator|bookmaker`), so it falls through to 404.
  Failure scenario: the next spam wave (or an existing long-tail GSC URL not in the 9 probed) uses a keyword like `poker`/`jackpot`/`ruleta`-adjacent text next to an accented or CJK token in a short slug → returns 404 instead of the direct first-response 410 this lane exists to deliver → slower de-index, and a green guard that never saw the shape.
  Minimal fix: widen both `[a-z0-9]` groups in `KEYWORD_FAMILY_RULE` to `[\p{L}\p{N}]` and add the `u` flag (keep the `i`). The root-single-segment anchor that makes `slots` safe is unchanged, and the guard's negative control re-validates mechanically. Not merge-blocking: no *known* spam form is affected (all 9 GSC slugs are ASCII and ≥4 hyphens, caught by Rule 1).

  **F2 · LOW · `scripts/spam-410-guard.mjs:405-410` (LEGACY_301 drift tripwire)**
  Hole: the tripwire compares `LEGACY_301.length !== LEGACY_301_SOURCES.length` — count only, never content. `LEGACY_301_SOURCES` is a hand-mirror with no structural link to the regex array.
  Failure scenario: a future lane *replaces* one LEGACY_301 entry with another (same count) without touching the guard → the F1 negative control keeps testing the retired source path and never tests the new one → if the new legacy source collides with a spam rule, prod 410s a real old page instead of 301ing it (equity loss on exactly the URLs A3 protects) while the gate stays green.
  Minimal fix: derive the sources mechanically from the patterns (strip `^\/`, `\/?$`, unescape) or assert set-equality of content, not just length.

  **F3 · LOW · `scripts/spam-410-guard.mjs:366-369` (no sitemap-count floor)**
  Hole: the guard refuses 0 `<loc>` entries and requires `/es`, but a sitemap that regresses from 137 to, say, 25 entries passes. Root-route coverage is backstopped by `REAL_ROOT_ROUTES >= 20`, but coverage of *namespaced* routes (`/locations/*-nc`, `/services/*`, `/materials/*` …) comes solely from the sitemap — both for Control 1 (negative) and Control 4 (live 308).
  Failure scenario: a future registry bug silently drops the `/locations/*` block from the sitemap in the same diff that a spam rule is edited → the guard runs its negative/308 controls against a hollowed corpus and certifies green over missing surface.
  Minimal fix: after the 0-entry check, assert `sitemapPaths.size >= 130` (or the known count minus tolerance). One line; do it in the next lane, not tonight.

  **F4 · LOW · `scripts/spam-410-guard.mjs:323-333` (`rawRequest` has no timeout)**
  Hole: `http.request` with no `setTimeout` and no `req.destroy` path. A hung connection hangs the guard forever.
  Failure scenario: a wedged local server turns the blocking gate into an infinite hang; CI/orchestrator kills it on an outer timeout, which reads as infra failure (or gets retried until it looks flaky) instead of a clean fail-closed exit 2.
  Minimal fix: `req.setTimeout(10_000, () => req.destroy(new Error("probe timeout")))` — the existing `error` handler already routes that into the right failure bucket.

  **F5 · LOW · `middleware.ts:186` (matcher `quote` is prefix-wide)**
  Hole: the negative lookahead `(?!...|quote|...)` excludes every path *beginning* with `quote` — `/quote-comparison`, `/quotesmith` — not just `/quote`. This predates the lane, but `skipTrailingSlashRedirect: true` quietly raised its blast radius: before, a skipped route still got the built-in slash normalizer; now a skipped route gets nothing.
  Failure scenario: a future root route named `/quote-*` ships → middleware never sees it → no trailing-slash 308 (duplicate-content 200s at both slash forms, on a route that — unlike noindexed `/quote` — would be indexed) and no spam/legacy checks, with no tripwire anywhere.
  Minimal fix: `quote(?:\/|$)` in the lookahead. Leave tonight's `/quote` exclusion semantics otherwise untouched.

  **F6 · LOW · `lib/legacy-url-rules.ts:138` (FLAT_SLUG_RULE omits `\p{M}`)**
  Hole: the character class is `[\p{L}\p{N}]` — no combining marks. A word-salad slug in NFD form, or carrying Arabic harakat / Hebrew niqqud, has a mark break a token and the rule fails. Double hyphens and non-ASCII hyphen lookalikes (U+2010/U+2011/U+2013) evade the same way (see Answer 2).
  Failure scenario: an NFD-encoded or diacritic-bearing ≥4-hyphen spam slug 404s instead of 410ing. Direction is fail-safe — no legitimate URL can 410 because of this; the cost is only slower de-index of an exotic spam variant, i.e. the pre-lane status quo.
  Minimal fix: if such slugs ever appear in GSC, widen to `[\p{L}\p{N}\p{M}]`. Otherwise a one-line comment acknowledging the gap suffices.

  ## ANSWERS

  **1. Legitimate URL shapes any rule could catch, now or plausibly later.**
  *Now:* none. I statically checked every SPAM_410 pattern against the enumerated current shapes (`/services/*`, `/locations/*-nc`, `/materials/*`, `/resources/*`, `/storm-damage/*`, `/blog/*`, `/brands/*`, `/projects/*`, one-word roots, ≤3-hyphen roots): Rules 1-2 are anchored `^\/…\/?$` root-single-segment, so no two-segment route can ever match; current root routes max out at 2 hyphens vs the ≥4 threshold; no current slug contains a whole-token KEYWORD_FAMILY word; the OLD unanchored keyword regex's words (`casinos?|kazino|gambling|melbet|pinco|tragamonedas|vkladu|thunderstruck|aviator|bookmaker`) appear in no roofing vocabulary; `/projects-2` is an exact-match alternation that cannot touch `/projects` or `/projects/*`. The guard's disk-enumerated negative control proves the same mechanically.
  *Plausibly later* (all currently documented in-file and tripwired by the guard, listed so the naming is on record):
  - `/blog/page/2` — the canonical blog-pagination shape, 410'd by the first pattern the day blog pagination ships. Guard goes red when it enters the sitemap, forcing a conscious revisit. This is the single most likely future false-positive.
  - `/blog/feed` (RSS for the new blog) or any future `*/feed` endpoint → the unanchored `/\/feed\/?$/i`.
  - `/tag/*`, `/author/*`, `/category/*` hubs if the blog adds taxonomies (plurals `/tags` etc. are safe — `(\/|$)` anchor).
  - Date-scheme blog URLs `/2026/05/my-post` → the `/^\/20\d\d/` rule (its `(\/.*)?` tail is what makes dated *children* collide, deliberately).
  - Any *any-depth* path containing the whole word `gambling`/`casino`/`aviator` — e.g. a future `/blog/is-cheap-roofing-worth-gambling` → OLD regex fires. Gated by the sitemap negative control, but this is the sharpest any-depth rule.
  - A root landing slug with ≥4 hyphens (e.g. `/roof-replacement-cost-guide-nc`) → Rule 1 (INVARIANT 1 + guard tripwire).
  - A root-level `[slug]` dynamic segment → every long post 410'd from birth (INVARIANT 2 + `findRootDynamicSegments()` hard-fail — good).
  - Inverse-direction hole, for completeness: a future root route starting with `quote` is never middleware-checked at all (F5), and a homepage campaign using numeric `?p=`/`?cat=`/`?m=` would 410 (implausible).

  **2. Unicode flat-slug rule mechanics.**
  - Astral plane: **sound**. The `u` flag makes `[\p{L}\p{N}]+` match whole code points; astral letters cannot be split into lone surrogates.
  - Mixed-script: **sound by construction** — the class is script-agnostic and the rule imposes no script-homogeneity requirement.
  - RTL: **sound** — regex operates on logical order; Arabic/Hebrew letters are `\p{L}`. The Persian exact-slug path is separately handled by `matchesSpam410`'s dual encoded/decoded test, which I verified covers both arrival forms.
  - Combining marks: **real gap** (F6) — `\p{M}` is absent, so NFD text or Arabic harakat break tokens. Note a small irony: middleware's `normalized.toLowerCase()` can itself *introduce* a combining mark (Turkish `İ` → `i` + U+0307), which would only ever weaken a spam match, never create a false 410 — the direction is always fail-safe.
  - Separator gaps: only U+002D counts as a hyphen. Unicode hyphens (U+2010/2011/2013), underscores, and empty tokens (`/a-b--d-e`) all evade Rule 1. None is a *known* spam form; all fail safe to 404.
  - "Fails the rule but should have matched": the NFD/diacritic case above, plus the Rule-2 ASCII asymmetry (F1). Nothing in the unicode mechanics can produce a false positive against a legitimate path — every identified defect reduces spam catch, none increases it.

  **3. Middleware branch trace (loop / 500 / off-origin).**
  All seven steps traced:
  - Step 2 (root query 410): terminates, no Location. Only fires on `normalized === "/"` + numeric value — `/` itself can never redirect (I7 holds; the `stripped === "" → "/"` collapse is correct, and even a raw `///` 308s once to `/` then serves 200).
  - Step 3 (spam): terminates. `matchesSpam410` guards `decodeURIComponent` throws — a malformed `%`-escape cannot 500 (verified at `legacy-url-rules.ts:79-85,216-222`).
  - Step 4 (LEGACY_301): every destination (`/services/*`, `/storm-damage`, `/service-areas`) matches no earlier rule and has no trailing slash → re-entry falls to `next()`. One hop, no loop. Query drop is deliberate and commented.
  - Step 5 (B-section): `/service-areas/[city]` → `/locations/[city]-nc`, which re-enters and is spared by the `endsWith("-nc")` guard → no loop. The `[^/]+` captures can't inject path structure; the `-nc` suffix template means a capture of `..`/`%2e%2e` can never form a bare dot-segment. Observed pre-existing (not this lane's) wart: `/service-areas/cary-nc` 301s to the 404 `/locations/cary-nc-nc` — a redirect-to-404, not a loop; WO_19 behavior preserved verbatim.
  - Step 6 (308): fires only when `rawPathname !== normalized`; the re-requested target is slashless so the condition goes false — no self-loop.
  - 500 surface: none found. No `fs`/env access, no throwing call reachable with untrusted input.
  - **Open-redirect fix — sound for both `//` and `\\`.** `new URL(req.nextUrl.origin + pathname + search)` parses as one absolute string, so the authority is fixed by the trusted origin prefix *before* `pathname` is examined: a leading `//evil.com` in pathname becomes literal path text (`https://ourhost//evil.com/x`), never a new authority — the protocol-relative trap existed only in the two-argument base+relative form, which is gone. Backslash is equally safe here: `\` is a special-scheme separator only in WHATWG *path* parsing after the host is already terminated, and `nextUrl.pathname` can never contain raw `?`, `#`, or CR/LF (they're delimiters or percent-encoded upstream), so nothing in `pathname` can reopen the authority or break header emission. The residual host-reflection-via-Host-header behavior is platform baseline (Vercel routes only configured domains to the function) and identical to the pre-change built-in 308s — not a regression. The guard's live probe is partially vacuous here (platform slash-collapse can mask the shape before middleware runs), which the file discloses honestly — the fix's soundness rests on the static argument above, which holds.

  **4. Guard — remaining vacuous-pass paths.**
  - Fetch/enumeration failures are all fail-closed: sitemap fetch error → exit 2; 0 `<loc>` → exit 2; `/es` missing → exit 2; `< 20` root routes → exit 2; root dynamic segment → exit 2; probe request errors → pushed into the failure arrays → exit 1. No failure is silently a pass.
  - Controls 1-2 intentionally import the same module middleware runs (anti-rot, correct call); the independent wiring check is Controls 3-5 over live HTTP. This is sound *provided* the `:3210` server was built from this tree — the guard itself admits (the F2 comment block, lines 371-385) that tree-binding is procedural and unenforceable from inside the script. That admission is honest; it is also the guard's single point of soft failure, and it's why Answer 5 matters. Failure direction is at least closed for the *new* rules: a stale master build lacks Rules 1-2, so the §Z positive controls would go red, not green.
  - The open-redirect assertion passes vacuously (`if (!r.headers.location) return true`) whenever platform collapse masks the `//` shape — disclosed in-comment, with the isolated proof claimed in the BUILD_REPORT, which is outside the four files I was permitted to read. Flagged, not counted as a defect.
  - RECORD-only rows (`/robots.txt/`, `/sitemap.xml/`, `%2F`, multi-slash) are WO-designated; note the multi-slash *spam* form is still safe in code because middleware strips all trailing slashes before the spam check — so RECORD-only there is genuinely cosmetic.
  - Residual gaps are F2 (count-only tripwire), F3 (no sitemap floor), F4 (no timeout). The guard cannot pass vacuously *today*; those three are about keeping that true after future edits.

  **5. THE ONE THING before this merges tonight.**
  Everything green so far — 106 probes, oracle matrix, dual-form 410s — ran against `next start` on `localhost:3210`, and the guard is *hardcoded* there (`BASE = http://localhost:${PORT}`, `rawRequest` fixes `hostname: "localhost"`; only `PORT` is overridable). Production is Vercel's edge with its own routing layer in front of middleware — and the two request shapes whose behavior depends on that layer (multi-slash collapse, `%2F` handling) are precisely the rows this lane left as RECORD-only because it could not pin them. GSC removal validation, however, will run against the *production* responses. So the one thing: **after the deploy and before submitting the GSC removal batch, re-run the core probes against the live domain** — a handful of dual-form spam URLs expecting direct 410 with no Location, a handful of slashed legitimate URLs expecting 308 to the slashless path, and one `//evil.example.com/x/` probe expecting an on-origin-or-absent Location. Three `curl -sS -D- -o /dev/null` invocations per class suffice; or parametrize `BASE`/hostname in the guard afterward (do not touch the five-file diff tonight to add it). The code is sound to merge; what is unproven is only that Vercel's front door behaves like the local one — and that is checkable in two minutes, after which the removals are safe to submit.

  ## MISSING-EVIDENCE

  - `scripts/doorway-check.mjs` (the fifth authorized file, change (c)) was excluded from the readable artifact set — its lib-derivation is unaudited here.
  - The out-of-guard open-redirect construction proof referenced as living in `BUILD_REPORT` §Deviations: not readable under the four-file constraint; my Answer 3 static argument stands in its place.
  - The 137-URL sitemap content and the `app/` route tree: not independently enumerated by me (guard-only). The `REAL_ROOT_ROUTES >= 20` floor and the guard's reported green runs are consistent with the claimed shapes, but I verified the *rules against the shapes named in the brief*, not against the raw disk.
  - `withBotId()` config-merge behavior: taken on faith that it preserves `skipTrailingSlashRedirect`. If it ever dropped the key, Control 3's slashed-spam 410 assertions would go red (built-in 308 would fire first) — so the guard does cover it, on the localhost build at least.

