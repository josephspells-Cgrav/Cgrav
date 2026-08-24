# FIX ROUND 1 — WO_SEO_LANE1 (orchestrator findings, 2026-08-19 ~7:30pm ET)

Your build is good work and two of your flags were correct — including the one that
falsified my WO. Both are accepted, see §3. Two defects need fixing before this can merge.

## ⚖️ STANDING — SETTLED, DO NOT RE-LITIGATE
- The extraction of patterns into `lib/legacy-url-rules.ts` (shared source of truth) — CORRECT, keep.
- `matchesSpam410()` testing both raw and decoded pathname, decode guarded in try/catch — CORRECT, keep.
- The date-archive pattern, the explicit LEGACY_SLUGS list, and the Persian-slug decode-once
  approach — CORRECT, keep.
- Not touching `lib/sitemap-registry.ts` — CORRECT (see §3.1). Do not add anything to it.
- `/commercial-roofing` remains out of scope entirely (WO §6). Unchanged.
- The six NEVERs and every WO §7 invariant still bind.

## 🔴 FIX-1 (HIGH) — the gambling keyword alternation is UNANCHORED and collides with real
## roofing vocabulary on FUTURE routes

`lib/legacy-url-rules.ts` — this pattern:
```
/(casino|kazino|gambling|slot|melbet|pinco|tragamonedas|vkladu|thunderstruck|aviator|betting|bookmaker)/i
```
matches ANYWHERE in the path, unanchored, with no word boundaries. Orchestrator probe
(node, against that exact regex):

```
🔴 WOULD 410  /resources/glossary/slotted-drip-edge
🔴 WOULD 410  /services/slot-vent-install
🔴 WOULD 410  /resources/slotted-soffit-vents
🔴 WOULD 410  /blog/betting-on-a-new-roof
   ok         /materials/slate-roofing
   ok         /resources/glossary/roof-slope
```

**Failure scenario:** slotted soffit/drip-edge vents are REAL roofing products and the
glossary is on the roadmap to grow by ~30 terms. A writer adds
`/resources/glossary/slotted-soffit-vent`; it silently returns 410 Gone with
`x-robots-tag: noindex`; nobody notices until the page never indexes. Your guard cannot
catch this — it tests only routes that exist TODAY, and this is a temporal collision.

**Minimal fix:**
1. **DELETE `slot`** from the alternation. It is redundant: the only spam URL needing it
   (`/greatest-thunderstruck-slots-position-sites/`) is already caught by `thunderstruck`.
2. **DELETE `betting`.** No known spam URL requires it, and it collides with ordinary
   English a roofing blog would plausibly use.
3. **Add word boundaries** to every remaining keyword (`\b(...)\b`) so no remaining term
   can match as a substring of a longer word — ⚠️ WITH plural handling where the real spam
   URLs need it: `\bcasino\b` would MISS `/online-casinos-curacao-2026/` (orchestrator
   re-audit catch — "casinos" has no boundary after "casino"). Use `casinos?` in the
   alternation. Check every other keyword against the positive-control list the same way
   before settling the regex (e.g. `tragamonedas` is already plural in the URL; `melbet`
   is hyphen-bounded and fine).
4. Re-verify with the six candidate paths above — the four 🔴 rows must all become `ok`,
   and every one of the WO §5.3 positive-control URLs must still match.
5. Add a one-line comment above the pattern recording WHY `slot`/`betting` were excluded,
   so a future maintainer does not "helpfully" re-add them.

## 🔴 FIX-2 (MED) — the guard tests a RUNNING SERVER over HTTP instead of the built tree

`scripts/spam-410-guard.mjs` fetches `/sitemap.xml` from `http://localhost:3210`. That makes
the guard: (a) unable to run without someone first starting a server, (b) a test of whatever
that server happens to be serving rather than of the code in the commit, and (c) dependent on
a port. WO §5.3 specified importing the paths from `lib/sitemap-registry.ts` for exactly this
reason — a guard must certify the tree it ships with.

**Failure scenario:** the guard is run in CI or by the next orchestrator with no server up; it
either errors (and gets skipped as "environment noise") or, worse, someone points it at the
deployed site and it certifies PRODUCTION's sitemap while the commit under test contains a
new colliding route. The guard then passes for a build it never examined.

**Minimal fix:** read the sitemap paths from the repo, not the network. Look at how
`scripts/doorway-check.mjs` and `scripts/reachability-check.mjs` obtain their route data and
use the SAME mechanism (whatever loader they use for TS — do not introduce a dependency or a
new toolchain). If those scripts genuinely also require a running server, say so explicitly in
your report with the file:line evidence and keep the HTTP approach — but then add a hard
failure (non-zero exit, loud message) when the server is unreachable, so the guard can never
silently no-op.

Keep both controls exactly as they are: the negative control (no live path may match) and the
positive control (all 10 known-spam URLs must match). The positive control is what stops this
guard from passing vacuously — do not weaken it.

## 3. YOUR FLAGS — orchestrator disposition
1. **`/es` already in the sitemap — ACCEPTED, you were right and my WO was wrong.** I verified
   independently: `curl https://mabreyroofing.com/sitemap.xml` contains
   `<loc>https://mabreyroofing.com/es</loc>`. My orphan diff grepped for literal
   `path: "..."` strings in the registry and therefore could not see entries generated by
   `ES_PAGES.map()`. Good catch, correctly evidenced by building unedited master rather than
   arguing from the source. WO §5.2 / T3 is withdrawn as already-satisfied.
2. **308 trailing-slash hop before the 410 — ACCEPTED as-is.** Matches the pre-existing
   patterns' behavior and Google follows it. No change.
3. **`next lint` pre-existing broken — ACCEPTED.** Unrelated to your diff, correctly left alone.

## 4. GATES — re-run ALL after the fixes, paste verbatim tails + exit codes
```
npm run typecheck
npm run spam-410-guard
npm run doorway-check
npm run reachability-check
npm run build
```

## 5. DELIVERABLE
Commit on the same branch `seo-lane1-410-sitemap`, message prefix `seo-lane1:`. Do NOT push.
Append a `## FIX ROUND 1` section to `wo/BUILD_REPORT_SEO_LANE1.md` covering: the exact
final regex, the six-candidate re-verification output, what the guard now reads and the
file:line evidence for why, and re-run gate tails. Then reply with a 5-line TLDR.
