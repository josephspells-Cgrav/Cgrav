# WO_PORTFOLIO_SCRUB — Knight photo set → the Mabrey portfolio (deep scrub + redeploy)

> 2026-08-18 ~8:15pm ET, OS58, from Joseph's spoken spec. Coordinator: Sonnet sub-agent,
> spawning parallel Sonnet vision children. The picker experiment is superseded: this set now
> ships as a PUBLIC portfolio Sean can hand to anyone — the bar is **"no question"**: nothing
> in any surviving photo may raise the question "whose work/brand/family is this?"

## §0 Mission
Input: 812 photos at
`C:/Users/josep/Claude Gravity/mabrey-construction-assets/knight-photos/knight-*.jpg`
(+ `manifest.csv` with width/height/bytes/sha256 per file — trust it, don't recompute).
Output: a scrubbed keep-set deployed as a clean, zero-interaction portfolio at
**https://mabrey-portfolio.vercel.app** + a full kill ledger. DoD: every surviving photo is
publishable as Sean's portfolio without explanation; the page loads fast, scrolls big, zooms
on tap, and contains not one button, toggle, filter, counter, or token.

## §1 THE CLASSIFICATION RUBRIC (verbatim — every photo gets exactly one verdict)

**KILL if ANY of these is true:**
- **K-PEOPLE** — any visible human: face, body, limbs, silhouette, someone in a mirror or
  window reflection, a person far in the background. Partial counts. Zero tolerance.
  (Family photos obviously included.)
- **K-BLUEPRINT** — plan sheets, floor plans, elevations, titled drawing pages, any 2D
  architectural drawing photographed or scanned (the "Burlington, NC / Spring Hope, NC /
  Mebane, NC" style sheets).
- **K-RENDER** — 3D renders / CGI generations (telltales: rendered skies and lighting, CGI
  grass/trees/textures, the sunset-render look, watermarkless too-perfect exteriors).
- **K-BRAND-YOUBUILD** — the words "You Build" / "YouBuild" anywhere: signage, watermarks,
  shirts, plans title blocks, yard signs.
- **K-WATERMARK** — any overlay tag/stamp/logo baked into the image (bottom-right "TM LS"
  style marks, photographer logos, any corner mark). Look at all four corners of every photo.
- **K-COMPANY-ID** — another company's identity visible: branded trucks/trailers (e.g. a
  "Barcenas & Sons" truck), yard signs, branded apparel, office/showroom shots with logos.
- **K-JUNK** — memes, screenshots, greeting-card graphics, logos-as-images, anything that is
  not a photograph of construction work.
- **K-DUP** — the second copy of a byte-identical pair (7 known pairs; dedupe by the
  manifest's sha256 — keep the first occurrence in page order, kill the rest).

**KEEP otherwise.** Explicitly KEEP despite visible branding: construction MATERIAL branding —
housewrap print (Carter, Tyvek, ZIP), lumber stamps, shingle wrappers, appliance boxes. That
is supplier branding present on every jobsite on earth; it identifies no contractor.

**Tie-break law: when unsure, KILL.** The bar is "no question," and the set is large enough
to afford every borderline loss. A KILL costs nothing; a bad KEEP costs the portfolio its
credibility.

## §2 The pipeline (coordinator's script)

1. **FAN-OUT VISION SWEEP.** Split the 812 files into ~7 contiguous batches (~116 each).
   Spawn ONE Sonnet child agent per batch, ALL IN PARALLEL, each with: the §1 rubric verbatim,
   its file list, and orders to Read every image (multiple per message is fine), judge it, and
   WRITE verdicts incrementally to its own JSONL at
   `C:/Users/josep/Claude Gravity/mabrey-construction-assets/scrub/batch-<n>.jsonl` —
   one line per photo: `{"file":"knight-###-<fbid>.jpg","verdict":"KEEP"|"KILL","reasons":["K-..."],"note":"<≤10 words when killed>"}`.
   A child that cannot decide writes KILL with reason "K-UNSURE". Every child ends by
   reporting its own count line (N judged = N lines written); the coordinator verifies each
   JSONL line-count equals the batch size — a missing line = re-judge that file, never assume.
2. **MERGE.** Coordinator merges the JSONLs into `scrub/verdicts.jsonl`, asserts exactly 812
   lines, applies K-DUP via the manifest's sha256 column, and writes the kill ledger
   `scrub/KILL_LEDGER.md` (counts per reason + full file list per reason).
3. **BUILD THE KEEP-SET.** Copy keepers to `C:/Users/josep/Claude Gravity/mabrey-portfolio/p/`
   (flat, same filenames). Nothing is deleted from the source folder — the scrub SELECTS, the
   original 812 stay untouched on disk.
4. **THE PORTFOLIO PAGE** — `C:/Users/josep/Claude Gravity/mabrey-portfolio/index.html`,
   generated from the keep-set + manifest dimensions. Base it on the layout already proven at
   knight-picker (justified flex grid: per-item `--ar` + numeric flex-grow, `--rowh` 430px
   desktop / 300px / 240px breakpoints, dark theme) but STRIPPED to a pure viewer:
   - Header: `Mabrey Construction` + a thin sub-line `Portfolio`. Nothing else. No notes,
     no instructions, no counts.
   - Grid: photos only. NO check circles, NO expand buttons, NO meta chips, NO filters,
     NO save bar, NO toasts, NO identity chip, NO token param, NO fetch calls, NO /api.
   - Tap/click a photo → full-screen lightbox (same pattern: scrim, contain-fit image,
     ‹ › arrows + swipe, ✕ and tap-outside to close, Escape/arrow keys on desktop). That is
     the ONLY interaction on the page.
   - `<meta name="robots" content="noindex,nofollow">` for now (it's a hand-out link, not an
     SEO surface). Lazy-loading + content-visibility as in the picker.
5. **DEPLOY** — from `C:/Users/josep/Claude Gravity/mabrey-portfolio/`:
   `npx vercel@latest deploy --prod --yes` (personal scope — NO --scope flag). The folder
   name makes the project `mabrey-portfolio` → https://mabrey-portfolio.vercel.app. Verify
   the alias with `npx vercel@latest ls --prod` + curl the URL for 200. If the .vercel.app
   name is somehow taken, report the actual URL — do not improvise domains.
6. **🔴 THE BLIND VERIFY PASS (the law: a confirmation question cannot find an identity
   failure).** Spawn a FRESH Sonnet child that never saw the sweep: it Reads ONLY the
   keep-set (`mabrey-portfolio/p/`), hunting §1 violations, and writes
   `scrub/blind-pass-1.jsonl` listing any file it would kill + why. Coordinator removes those
   from `p/`, updates the ledger, regenerates the page, redeploys, and repeats with a new
   fresh child until a pass returns ZERO kills (expect 1-2 rounds; hard cap 4 — if round 4
   still finds kills, stop and report honestly instead of looping).
7. **RECEIPTS.** Screenshot the deployed page (Playwright lives in
   `C:/Users/josep/Claude Gravity/mabrey-roofing/node_modules` — run
   `npx playwright screenshot --viewport-size "1720,1000" --wait-for-timeout 6000 <url> <out.png>`
   from that repo) — top of grid + one deep-scroll shot (`--wait-for-timeout` after a JS
   scroll is fine; two screenshots minimum). Read both screenshots and confirm: no people, no
   blueprints, no renders visible; grid + lightbox chrome correct.
8. **REPORT** — `scrub/SCRUB_REPORT.md`: input count · kills per reason with counts · keep
   count · blind-pass rounds and what each caught · deploy URL · screenshot paths · the
   honest leftovers list (anything K-UNSURE'd that a human might disagree with).

## §3 Laws
- READ-ONLY on the source set — never delete/modify `knight-photos/` originals or its
  manifest. The scrub output lives in `scrub/` + `mabrey-portfolio/`.
- No DB, no git, no touching `knight-picker/` (the old deployment stays up untouched), no
  touching any `.wt-*` worktree or `mabrey-crm-app`.
- Deploy ONLY the new `mabrey-portfolio` project. Never redeploy `knight-picker`.
- Children judge from the RUBRIC ONLY — no taste calls beyond it. K-UNSURE exists so a child
  never has to guess.
- Vision children must actually Read every image — a verdict without a Read is fabrication.
  (Coordinator: spot-audit 3 random verdicts per batch by Reading those images yourself and
  comparing.)
- Token discipline: children keep notes ≤10 words; coordinator never Reads the full set
  itself (spot-audits + screenshot verification only).

## §4 Report back (the coordinator's final message)
Keep count / kill count by reason / blind rounds / the live URL / screenshot verdict /
anything BLOCKED or UNSURE. Short — the ledger holds the detail.
