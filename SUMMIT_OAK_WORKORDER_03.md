# WORK ORDER 03 — Summit & Oak (conversion pass: complete the in-fold decide-inputs)

**From:** WE10 (architect) · **To:** Builder (WARM) · **Date:** 2026-06-17
**Compounds on:** WO_01 + WO_02. **This is a CONVERSION pass** (moves the raw-conversion number, 9.0 → ~9.5) — distinct from WO_02's balance/polish. **Run it together with WO_02** (the financing line touches hero balance, so do both in one pass and balance once).

> Closes the two conversion half-points from the live audit: price + financing never reach the
> hero fold, and mobile inner-page heroes are a CTA cluster instead of the embedded form.

## 1. PRINCIPLE (existing conversion doctrine, sharpened — ref vault `km-conversion-first-doctrine`)
**The hero is a transaction surface: all 5 decision inputs must be IN THE FOLD, on EVERY page and EVERY breakpoint** — (1) book/estimate action, (2) rating + review count, (3) **price signal**, (4) **financing signal**, (5) trust/proof. Current state has 1, 2, 5 (and urgency) but is **missing price + financing in the fold** — the #1 unspoken objection on a 5-figure purchase. This pass completes the set.

## 2. THE TWO LIFTS
- **A · Financing + price signal in EVERY hero fold** (home + inner pages, desktop AND mobile). Add a concise line near the form/CTA — e.g. "Financing from ~$99/mo · $0-down options" + a price anchor ("Most Triangle roofs run $9k–$26k" or a value reframe). Tuck it by the subhead/form so the form stays the right-side counterweight — **do not re-break the hero balance** (WO_02). **NC-COMPLIANT only:** real financing framing, no guaranteed approval, no fabricated APR, no unattributed stats.
- **B · Mobile inner-page form parity.** Inner-page (city / service / storm) MOBILE heroes currently show a CTA cluster, not the form. Replace it with the **embedded first-step estimate form** (the 4 intent chips + Continue — the SAME component already in the home mobile fold) so the micro-commitment starts in-fold on mobile too. Keep the sticky call bar.

## 3. VERIFICATION
- Per page + per breakpoint: confirm ALL 5 decide-inputs are in the fold (esp. the new price + financing) and the mobile inner heroes carry the form's first step.
- Re-run the WO_02 balance gates (both axes) — adding the financing line must NOT re-break hero balance or push the form below the fold.
- Build green · render every route (200 + 0 errors + correct content) · PIXELS · axe 0-serious desktop+mobile · mobile + reduced-motion · deployed-content check.

## 4. PRESERVE
Proven COPY (ADD the financing/price line — don't rewrite existing copy) · the hero form counterweights · balance both axes (WO_02) · conversion guts · the 34-page SEO spine. NC insurance/financing compliance is non-negotiable.

## 5. OPERATING RULES
Fix the hero ATOM so every page inherits. Extrapolate site-wide. Refinement, not teardown.
Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the live URL + a per-page/per-breakpoint in-fold decide-input check + verification evidence.

---
*— WE10, 2026-06-17. Conversion pass: financing + price into the fold on every hero + mobile inner-page form parity = the last half-point. Run with WO_02 so the hero is balanced once, after the additions.*
