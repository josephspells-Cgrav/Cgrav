# WORK ORDER 02 — Summit & Oak (balance pass 2: vertical equilibrium + orphans)

**From:** WE10 (architect) · **To:** Builder (WARM — same builder that ran WO_01) · **Date:** 2026-06-17
**Compounds on:** `SUMMIT_OAK_WORKORDER_01.md` (its §1 Fulcrum Principle + preserve-list still govern). This order EXTENDS the principle with two sub-rules and fixes the residuals WO_01 didn't fully resolve.

> Read WO_01 §1 first — the Fulcrum Principle is still the lens. WO_02 adds the VERTICAL axis + a
> no-orphan-headlines rule, and targets templated ATOMS so every instance inherits the fix.

## 1. PRINCIPLE EXTENSION (add to the Fulcrum Principle)
- **1a · Vertical equilibrium — balance is BOTH axes.** A section can be L↔R balanced and still fail
  vertically. Full-width bands must center their content **vertically** (no top-clustering with a dead
  band of space below). Multi-column sections must **balance column heights** — no column bottoming out
  far above the other with dead space beneath it.
- **1b · No orphan / widow headlines.** Every heading's last line carries **≥2 words**. Use
  `text-wrap: balance` (and/or a non-breaking space binding the last two words). Apply to ALL headings
  site-wide.

## 2. VERIFIED FIXED by WO_01 — PRESERVE, do not regress
- ✅ Every page hero now carries a right-side estimate-form counterweight (tip-left heroes resolved).
- ✅ Footer + card grids balanced. Keep all of this.

## 3. RESIDUALS TO FIX (Joseph's edits + WE10 live audit) — fix the ATOM, all instances inherit
- **CTA-BAND ATOM — top-clustered on EVERY page** ("Get Your Free Documented Roof Inspection",
  "Get the Damage Documented Today", "Ready for Roof Replacement in the Triangle?"). → vertically
  center the content in the band (both axes). + fix its heading orphans per §1b. **HIGHEST PRIORITY**
  (recurs on every page; flagged 3× by Joseph across 50/25/80% zoom).
- **FAQ ATOM — columns height-uneven on EVERY page** (one column short → dead space; the short side
  varies by page). → balance the two columns' heights (vertically center the short column, or fill it
  with trust/contact content). Fix the atom.
- **FOOTER middle (home)** — the 24/7 CTA card is too heavy / out of place vs the light text columns
  flanking it. → swap for a lighter element matching the footer's rhythm (non-CTA fine: hours, quick
  info/social, a license/trust mini-block, or a link column).
- **MID-PAGE TEXT STACKS still tip-left** (hail + service detail — left-aligned heading+body with empty
  right half; audit every page). → 2-col split or a right-side counterweight (WO_01 Fulcrum rule, still
  residual on these section stacks).
- **HOME cost + reviews bands read thin / top-clustered** → tighten vertical rhythm or add a counterweight.
- **ORPHAN SWEEP** — audit EVERY heading site-wide for a single stranded word on the last line; fix per
  §1b. (Known: "Today." on Hail, "the Triangle?" on Service — assume more exist.)

## 4. VERIFICATION (balance gate — now BOTH axes)
- Per page, zoom-out (full-page) + 100% fold: confirm no section tips L↔R **AND** no band is
  top-clustered / FAQ columns even / bands centered vertically. + ORPHAN CHECK: no heading with a
  stranded last word. + build green, render every route (200 + 0 console errors + correct content),
  PIXELS, axe 0-serious desktop+mobile, mobile + reduced-motion. Confirm the deployed URL serves your
  new build.

## 5. PRESERVE-LIST (do not touch / regress)
The hero forms + counterweights (WO_01's win) · conversion guts · the full 34-page SEO spine · proven
COPY (fix layout/wrap only — never rewrite the words) · exemplars (home hero, storm "Before & After"
3-grid, service "Related Services" row).

## 6. OPERATING RULES
Fix to the STANDARD, not the literal annotation. Fix the templated ATOM so every page inherits.
Extrapolate site-wide. Refinement, not teardown. Deploy to `kingmaker-summit-oak-roofing.vercel.app`;
report the live URL + your per-page balance audit (both axes) + verification evidence.

---
*— WE10, 2026-06-17. WO_02 extends the Fulcrum Principle to the vertical axis + bans orphan headlines. The CTA-band and FAQ atoms are the high-leverage fixes — they recur on every page, so fix the atom once.*
