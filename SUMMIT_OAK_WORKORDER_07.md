# WORK ORDER 07 — Summit & Oak (mobile hero: red-discipline + focal hierarchy + CTA dedup)

**From:** WE10 (architect) · **To:** Builder (WARM / active) · **Date:** 2026-06-17
**Compounds on:** WO_01–06. Source: a prospect said the **mobile hero** "feels a little busy" (only that section, only mobile). Root cause (WE10 pixel diagnosis): **red overuse + two competing focal points + CTA duplication** — NOT too much content. The fix removes ZERO conversion elements.

## 1. PRINCIPLE EXTENSION (new, durable — add to the doctrine)
**Accent-Color Discipline.** The accent (contractor red `#D8262C`) is the **ACTION signal** — it means "act here." Keep LOUD/saturated red **scarce** and reserved for CTAs (primary buttons + one phone affordance). Don't stack multiple loud red anchors in one view (red ribbons, red label chips, red underlines, repeated red phone numbers) — that dilutes every CTA and reads as noise. **Calibration (do NOT over-correct):** subtle brand accents are fine to keep — the thin red eyebrow hairline is part of the identity; this is about killing *competing loud* reds, not erasing every red pixel. Pairs with the only-CTA-pair lock + the Fulcrum Principle (one focal point).

## 2. THE FIX — MOBILE HERO (3 moves, leverage order)
- **A · Red = one meaning.** Reserve saturated red for the CTAs (Continue + sticky "Free Estimate" + a restrained phone accent, e.g. the phone icon). De-emphasize the LOUD decorative reds: the red ribbon bar (make it a quiet/muted strip, not a red bar), the "⚡ INSTANT ESTIMATE" red label, the H1 red underline. Keep the brand-red logo tile + the subtle eyebrow hairline (identity). Highest leverage — concentrating red makes the actual CTA pop *harder*.
- **B · One focal point = the form.** Tighten the H1→form gap so the headline hands off to the form instead of competing; the form card stays dominant, the H1 recedes to supporting weight. The eye should land on the form.
- **C · Dedup + collapse.** Phone 4× → 1× (the sticky "Call Now" persists — drop the standalone phone line under the ribbon + the "Prefer to talk? Call" line). Collapse the 4-row utility header into one quiet strip: drop the eyebrow ("Raleigh" is already in the H1); don't triplicate "24/7" (it's in the H1 — thin/fold the ribbon). Keep ONE speed cue on the card ("Step 1 of 3"); drop the duplicate "in 60 Seconds" / "INSTANT ESTIMATE" loudness (keep one).
- **Target:** ~13 stacked bands → ~8 · red attention-anchors 7+ → 2–3 · one clear focal point. **Preserve every conversion element** — form, price ($10k–$25k), financing ($89/mo), trust, sticky bar, the storm/24-7 urgency (it stays in the H1).

## 3. SITE-WIDE RED AUDIT (extrapolate — fix the class)
Audit every page for **competing loud reds** (red ribbons/bars, red label chips, red underlines, repeated red phone numbers, red section accents) vs red used as a CTA. Reduce loud decorative red to the muted/white/charcoal palette so red reads as "act." Keep subtle identity accents (the eyebrow hairline). The mobile hero is the worst case; the pattern likely recurs — fix it everywhere, with judgment, without erasing the brand.

## 4. VERIFICATION
- Mobile hero reads **calm** with the form as the obvious focal point (vision check) · red attention-anchors ≤ ~3 per viewport · all conversion elements still present · no copy rewritten (de-red / dedup / condense only).
- ⚠️ **Contrast watch:** when de-redding text, the new color must still pass axe AA on its background (don't trade red-on-dark for a low-contrast gray).
- Balance gate (Fulcrum, both axes) · build green · render every route (200 + 0 errors + correct content) · PIXELS · axe 0-serious desktop+mobile · mobile + reduced-motion · deployed-content check.

## 5. PRESERVE
ALL conversion elements (form, price, financing, trust, sticky bar) · proven COPY (this is styling/dedup, not a copy rewrite — keep the words; 24/7 urgency stays in the H1) · the brand identity (logo tile, subtle eyebrow hairline) · the desktop hero (the balanced exemplar — apply red-discipline but don't restructure it; it wasn't flagged busy) · the SEO spine.

## 6. OPERATING RULES
Fix to the STANDARD (Accent-Color Discipline + Fulcrum), not the literal annotation; extrapolate site-wide; refinement, not teardown. Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the mobile-hero before/after + the site-wide red-audit changes + verification.

---
*— WE10, 2026-06-17. The mobile hero isn't overloaded with content — it's overloaded with RED and competing focal points. Concentrate red on the CTA, make the form the focal point, dedup the repeats. Calmer AND higher-converting, nothing removed.*
