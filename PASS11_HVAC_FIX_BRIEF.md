# Pass 11 / HVAC preset — fix brief

## Goal
Address 4 verification findings on the HVAC home page from the latest autonomous browser audit. Severity: 1 FAIL (persistent across 2 verification runs — builder hasn't closed it), 3 WARN. One of the WARNs (overloaded hero) is a content-density issue; the others are component/layout/UX issues.

## Context the receiving agent needs

- **Project:** contractor-template — American Masterworks (AM) flagship windows-and-doors site plus 9 per-vertical preset re-skins (Roofing, HVAC, Plumbing, Electrician, Painter, Kitchen Remodel, General Contractor, Landscaping, Hardscape).
- **Worktree:** `C:\Users\josep\OneDrive\Documents\Claude\Projects\American Master Works Redaux\.claude\worktrees\cranky-colden-ebfbb4\web\`
- **Verified URL:** `https://contractor-template-preview.vercel.app/preview/hvac` — Holcomb Heating & Air, HVAC preset re-skin of the flagship template.
- **Pass:** 11.x — most recent shipped builder commit before this brief was written.
- **Verifier:** Hermes Agent (claude-opus-4-7 + `browser_navigate` + `browser_vision` + `browser_console`). Session ID: `20260525_213940_486c5f`. Full transcript at `C:\Users\josep\Claude Gravity\hermes_session_hvac_run2.md`. Final response at `hermes_final_response_hvac_run2.md`.
- **Page growth signal:** the HVAC page is now tall enough that full-page screenshots exceed Anthropic's 8000px vision limit. Hermes recovered via viewport-only captures. This is itself a soft signal that the page may carry too much content for a single scroll surface — see Finding WARN-2 (hero overload) for one likely contributor.

## Important framing — read before touching code

This is the **HVAC preset** of the contractor template — not a one-off rebrand of the flagship. Per the global Claude instructions, content edits to re-skin per-vertical belong in `lib/` (specifically `lib/data.ts`, `lib/content-*.ts`, `lib/site.config.ts`). Component edits in `components/` are permitted **only if the fix is structural** (layout, redundant CTA, etc.) — never for re-skinning content. Motion code in `components/` is off-limits regardless.

The skills-gate hook (`~/.claude/hooks/skills-gate.mjs`) requires `Skills loaded: ...` line on `components/` edits. Honor it.

## Findings (severity-ranked)

### HIGH-1 (FAIL · PERSISTENT) · Duplicated city list in hero subcopy — template merge-tag bug

**Symptom:** Hero subcopy reads literally:
> "Serving **Castalia, Spring Hope, Bunn, Louisburg, Nashville, and Franklinton** with NATE-certified installs and 24/7 emergency dispatch. **Castalia, Spring Hope, Bunn, Louisburg, Nashville, and Franklinton** Manual J load calcs on every quote, written labor warranty on every install, and a real tech on the dispatch line — not voicemail."

The city array is rendered **twice** with no connector verb between the two instances. Reads as a clear template/merge-tag bug — likely a copy template that has two `{cities.join(", ")}` insertions where only one was intended, or the cities array got concatenated to itself somewhere upstream.

**Persistence flag:** This was flagged by an earlier Hermes verification run (~40 minutes prior) and remains. Likely root cause hasn't been touched.

**Where to look:** Hero subcopy for the HVAC preset. Grep for `Castalia` or `Spring Hope` in the HVAC content config files. Likely candidates:
- `lib/content-home-hvac.ts` (or equivalent per-niche content file)
- `lib/data.ts` if cities are shared
- `lib/site.config.ts` GEOGRAPHY block
- The hero subcopy template string in the component that consumes the cities array — look for a string with TWO `${cities.join(...)}` or similar template-literal interpolations.

**Fix:** Resolve to a single city-list insertion in the hero subcopy. Decide which sentence carries the cities and which carries the credentials.

**Acceptance:** Re-run pass-verification (gate below) and confirm Axis 4 Density does not flag the duplicated city list.

---

### MEDIUM-2 (WARN) · Hero subcopy overloaded — too many promises in one paragraph

**Symptom:** The hero subcopy (after the duplicate is removed) still crams: service-area list + NATE certification + 24/7 emergency dispatch + Manual J load calcs + written labor warranty + "real tech on dispatch line, not voicemail" differentiator — six distinct promises in one paragraph. A hero subcopy should carry **one** clear promise; subordinate trust signals belong in a stat band, sub-hero strip, or "why us" section below the fold.

**Where to look:** Same hero subcopy file as Finding HIGH-1.

**Fix:** Pick the single strongest promise for the hero (likely the dispatch differentiator — "real tech on the line, not voicemail" is the sharpest line). Move NATE / Manual J / warranty into a stat-band component below the hero, or into a trust-strip directly under the hero CTAs.

**Decision required from user before executing.** Two valid routes:
- **(a)** Hero = one promise. Move all trust signals to a stat band / trust strip below.
- **(b)** Keep all trust signals in hero, but split into bulleted micro-list (chip + 3-4 line stack) instead of prose.

**Recommendation if user defers:** (a). Cleaner hero, better hierarchy, fixes the density-discipline axis cleanly.

---

### MEDIUM-3 (WARN) · Emergency band dead zones

**Symptom:** The teal "emergency dispatch" band has visible empty space in the upper-left of the section (left of the orange dispatch card). Separately, the right ~60% of the hero area next to the two top CTA buttons reads as unused dark space (the hero image carries it, but there's no content layer in that region).

**Where to look:**
- Emergency band component — grep for "emergency dispatch" or "TAP TO CALL"
- Hero CTA layout — likely in the hero component or the page-level layout for `/preview/hvac`

**Fix:** Either (a) shift the emergency dispatch card to fill the band's width or use a 2-col split (left: messaging, right: dispatch card), or (b) add a content layer to the dead zone — short reassurance copy, certifications row, or a service-area mini-map.

**Acceptance:** Re-run pass-verification; Axis 5 Layout should not flag dead zones in emergency band.

---

### LOW-4 (WARN) · Redundant "TAP TO CALL" pill inside emergency dispatch card

**Symptom:** The emergency dispatch card contains a large phone-number CTA, AND directly below it an orange "TAP TO CALL" pill that performs the same action. Visually static, no distinct hover affordance, reads as duplicate CTA. Either consolidate into one, or differentiate clearly (one for call, one for SMS/chat).

**Where to look:** Same component as Finding MEDIUM-3 (emergency dispatch card).

**Fix:** Remove the TAP TO CALL pill OR repurpose it (e.g., make it a text-message CTA with distinct icon + behavior). If keeping both for redundancy on mobile, add hover/active states so the pill reads as interactive.

**Decision required.** Three routes:
- **(a)** Remove the pill — phone-number CTA alone is sufficient.
- **(b)** Repurpose pill as SMS/text CTA with distinct icon (clearer differentiation).
- **(c)** Keep both, add hover/active affordance + tighten visual hierarchy so pill reads as secondary action.

**Recommendation if user defers:** (a). One CTA per intent. Less visual noise.

---

## Decision points (block on user input)

1. **Finding MEDIUM-2 (hero overload):** Strip to one promise (route a) or keep all signals as a chip-stack (route b)?
2. **Finding LOW-4 (TAP TO CALL pill):** Remove (a), repurpose as SMS (b), or keep with differentiated affordance (c)?

If user says "your call":
- MEDIUM-2 → route (a)
- LOW-4 → route (a)

## Findings NOT in this brief but worth checking

The earlier HVAC verification run (~40 min prior, session `20260525_205653_ae4248`) flagged five additional issues:
- Heat Pump + Central AC card images near-identical condenser photos
- "Systems We Install" rendering 5 cards in 3-col grid with empty bottom-right slot
- "From Diagnostic to Cold Air" step labels starting at "02" instead of "01"
- System cards lacking hover affordance + numbering despite stepped section above using numbered chips
- Hero subcopy duplicates town list (same as HIGH-1 in this brief)

The current run did not surface 1-4 of those. **Two possible explanations:**
- **(a)** The builder fixed them in the most recent commit (good — please confirm by checking the diff).
- **(b)** They are below the fold and the current run's screenshot didn't capture them (page is too tall for full-page vision now).

**Action:** Before declaring this brief complete, scroll the deployed URL manually and confirm whether issues (1) Heat Pump/AC photo duplication, (2) empty 3rd grid slot in "Systems We Install", (3) STEP labels starting at 02, (4) system card numbering/hover — are present. If still present, treat them as additional findings under this brief at HIGH or MEDIUM severity.

## Constraints (do not violate)

- **No motion code edits.** If a fix would require touching animation timing, easing, or scroll-trigger behavior, stop and escalate.
- **Content-bug fixes (the duplicated city list, hero overload) belong in `lib/`.** Don't fix them by editing `components/`.
- **Structural fixes (dead zones, redundant CTA component, layout) may touch `components/`** — honor the skills-gate hook (`Skills loaded: ...` line on the edit).
- **No new dependencies.**

## Verification gate (must all pass before declaring done)

Run from `web/`:

```powershell
pnpm -C web exec tsc --noEmit
pnpm -C web build
pnpm exec playwright test --project=desktop
```

Then re-dispatch autonomous verification:

```powershell
hermes chat -q "Use the pass-verification skill against url=https://contractor-template-preview.vercel.app/preview/hvac, context=HVAC home page"
```

**Pass criterion:**
- Finding HIGH-1 (duplicated city list) — must not recur.
- Findings MEDIUM-2, MEDIUM-3 — must not recur.
- Finding LOW-4 — does not recur, OR documented as intentional in a code comment.
- The page should ideally fit under 8000px tall so full-page vision works in one pass. If it doesn't, that's a soft signal that this preset is carrying more content than the template was designed for — flag back to the user for scope discussion.

Output of the verification re-run will land in `state.db` table `messages` filterable by latest `session_id`. Screenshots in `%LOCALAPPDATA%\hermes\cache\screenshots\`.

## Artifacts to read first

- This brief: `C:\Users\josep\Claude Gravity\PASS11_HVAC_FIX_BRIEF.md`
- Full session transcript (current run): `C:\Users\josep\Claude Gravity\hermes_session_hvac_run2.md`
- Final findings response (current run): `C:\Users\josep\Claude Gravity\hermes_final_response_hvac_run2.md`
- Verified screenshot: `C:\Users\josep\AppData\Local\hermes\cache\screenshots\browser_screenshot_e5470c7273df4e3fb6744b633ce1307f.png`
- Prior `/preview` hub fix brief (different page, may already be in flight): `C:\Users\josep\Claude Gravity\PASS11_FIX_BRIEF.md`

## Output expected

- One PR or one merged-commit-series, engineer's call based on review scope.
- Commit messages: imperative, scope-prefixed if conventional (`fix(content/hvac): remove duplicated city list in hero subcopy`, `fix(components/hero): split overloaded subcopy into trust-strip`, etc.).
- PR description references this brief and lists which findings were closed vs deferred-with-rationale.
- **Do not claim shipped/verified/complete until the verification gate above passes.** User has a strong preference for hard verification over self-report; this preference is now encoded in Hermes's persistent memory as a GATE RULE.
