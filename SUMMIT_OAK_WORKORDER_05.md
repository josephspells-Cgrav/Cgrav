# WORK ORDER 05 — Summit & Oak (promote the insurance lane)

**From:** WE10 (architect) · **To:** Builder (WARM / active) · **Date:** 2026-06-17
**Compounds on:** WO_01–04. Additive change — a high-value lane gets the prominence it earns. The insurance page already exists + is compliant (`/storm-damage/insurance-claims`); this WO is about **promoting** it, not rebuilding it.

## 1. THE TWO CHANGES
- **A · Insurance → top-level nav button.** Pull "Insurance" out of the Storm Damage dropdown and make it a primary nav item, routing to `/storm-damage/insurance-claims`. **Keep a cross-link** to the insurance page inside the storm-damage cluster too (top-nav for prominence + cluster link for SEO internal-linking — it lives in both). Builder's judgment on nav layout/density (desktop + mobile menu).
- **B · Dedicated insurance SECTION on the homepage** with its own CTA button → `/storm-damage/insurance-claims`. Place it where it flows (near the storm / cost sections). High-value section — it earns its place, but keep "full, not overstuffed."

## 2. CONSTRAINTS (non-negotiable)
- **COMPLIANCE (NC lock):** the homepage section copy must match the insurance page's SAFE framing — "we document everything your insurer needs · meet your adjuster on-site · you file the claim." **NEVER** "handle your claim," "maximize/guarantee payout or coverage," "public adjuster," or "waive your deductible." This is the highest-risk copy on the site.
- **BALANCE (Fulcrum Principle, WO_01/02):** the new section must be asymmetrically balanced (no tip, no dead right-space, vertically centered, no orphan headlines — both axes). CTA = the locked pair only (filled red + arrow / outlined call pill; no 3rd style).
- **PRESERVE:** the hero + conversion guts + in-fold decide-inputs + the 34-page spine + the compliant insurance page itself (link to it, don't rewrite it) + all proven copy.

## 3. VERIFICATION
- Nav shows **Insurance** as a top-level item (desktop + mobile) routing to the page; the storm-cluster cross-link still present.
- Homepage has the insurance section with a working CTA → the page.
- New section passes the **balance gate** (both axes, no orphan) + a **compliance scan** (none of the banned phrases).
- build green · render every route (200 + 0 errors + correct content) · PIXELS · axe 0-serious desktop+mobile · mobile + reduced-motion · deployed-content check.

Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the live URL + confirmation of both changes + verification.
