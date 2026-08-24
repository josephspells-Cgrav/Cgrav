# WORK ORDER 10 — Summit & Oak (desktop header: stop the wrap · atomic affordances)

**From:** WE11 (architect) · **To:** Builder (WARM / active V2 session) · **Date:** 2026-06-20
**Compounds on:** WO_01–09 — every prior lock carries forward (Fulcrum Principle, Accent-Color Discipline, the only-CTA-pair, NC insurance compliance, rounded **headline** prices, NAP single-source, preserve conversion guts + the 34-page + `/resources` SEO spine + all schema).
**Site:** `C:/Users/josep/Claude Gravity/summit-oak-roofing/` (standalone Next.js, App Router/SSG), live `kingmaker-summit-oak-roofing.vercel.app`. **NOT** the flagship/template — outside the flagship verify-gate; verify via build + headless render + PIXELS + Joseph's eyeball.

## 0. SOURCE OF THIS WO
Joseph flagged the desktop header right cluster (annotated screenshot): the phone number wraps to two lines, and the `4.9 / 312` rating reads out of place. Architect pixel + DOM audit on the **LIVE** site confirms both AND finds the same root cause hitting the nav labels — so this is a header-wide fix, not a two-element patch.

## 1. THE PRINCIPLE (the lens — internalize before editing)
**Atomic header affordances — no wrap under width pressure.** The header's interactive/identity units — each nav label, the phone pill, the rating cluster — are ATOMIC: each renders on ONE line and never fragments, wraps, or detaches when the row gets tight. The header row must lay out clean at EVERY desktop width (≥ `lg`). This is the **Fulcrum Principle** applied to the header bar (a balanced, uncramped row) + **CTA clarity** (the phone reads as one tidy pill, not a broken block). Extends, does not replace, the WO_01/07 locks.

## 2. THE FIX — DESKTOP HEADER (`components/Header.tsx`)
**Root cause (verified on live, identical at 1280 / 1366 / 1440 / 1536 / 1680):** the header inner row is capped at `max-w-7xl` (1280px) and over-packed — logo + a 7-item nav with two-word labels + the rating cluster + the phone pill don't fit, so everything that can wrap, wraps:
- Phone pill `(919) 555-0185` → **2 lines** (pill height 67px at every width).
- Rating `★★★★★ 4.9 · 312` → the `· 312` drops below `4.9` (cluster height 39px).
- Nav labels **"Storm Damage"** + **"Service Areas"** → 2 lines each (height 61px).
- (The dash is a hyphen char `-` (code 45) that the display font renders long — NOT an en-dash. Leave the phone string EXACTLY as-is; it's the NAP single-source.)

**Fix to the standard (your implementation judgment — these are the levers):**
- **A · Give the row room.** Widen the **header** container beyond `max-w-7xl` (header ONLY — do NOT change the global `max-w-7xl` other sections rely on for their Fulcrum balance).
- **B · Make every affordance atomic.** `whitespace-nowrap` (or equivalent) on each nav label, the phone span, and the rating cluster so none can wrap: "Storm Damage", "Service Areas", "(919) 555-0185", and the whole `★★★★★ 4.9 · 312` stay on one line each.
- **C · Relieve crowding so nowrap doesn't overflow.** Tighten nav gaps/padding and/or the rating's reveal breakpoint as needed so the nowrap'd row fits cleanly — no horizontal overflow, no scrollbar — at every desktop width.
- **Target:** at 1280 / 1366 / 1440 / 1536 / 1680 → phone one line · rating one clean row (`★★★★★ 4.9 · 312`) · no nav label wrapped · no overflow. The right cluster reads as a tidy, balanced unit.

## 3. SECONDARY — QA polish nits (IN SCOPE — Joseph greenlit all 4)
From the WO_06–09 QA pass this session:
- **Mobile hero:** desaturate the top utility ribbon red ~15–20% (toward deep oxblood) so the sticky CTA is the only fully-saturated red (Accent-Color Discipline). Copy unchanged.
- **Mobile hero:** faint live-red tint on the disabled "Continue" button so the form's primary action reads active, not dead.
- **/review:** demote the competing "Call Now / Free Estimate" pills in the fold so "Leave a Google Review →" is the single dominant action.
- **Desktop hero H1:** "We" widow on line 2 ("in Raleigh? We / Respond 24/7.") — `text-wrap: balance` (or a tuned break) so subject/verb don't split. Copy unchanged.

## 3B. WO_06 — ROUND THE DETAILED COST FIGURES (Joseph ruled: round all)
Joseph's call: round the detailed `/roofing-cost` tables too — not just the already-clean `$10k–$25k` headline. Apply in the SOURCE so every page + JSON-LD updates together: `lib/costData.ts` + the mirrors in `lib/articles/cost.ts` + `lib/articles/decision.ts`.
- **Rule:** every $-thousands figure rounds to the nearest **$5,000**; keep each range coherent (low < high) and the material hierarchy ascending. **Per-sq-ft rates already end in 0/5** ($3.50, $4.50, $7.00, $11.00, $13.00 …) — leave them. `$89/mo` + `$0 down` untouched. Leave the specific stats (312 reviews, 18 yrs, 2,400+, 25-yr warranty) — prices only.
- **Reference — `COST_BY_MATERIAL` totals (apply everywhere they mirror, single-sourced):**
  - 3-Tab: $7,000–$11,000 → **$5,000–$10,000**
  - Architectural: $10,500–$16,500 → **$10,000–$15,000**
  - Designer / Premium: $16,000–$26,000 → **$15,000–$25,000**
  - Standing-Seam Metal: $24,000–$40,000 → **$25,000–$40,000**
  - Slate / Tile: $32,000–$45,000+ → **$30,000–$45,000+**
- **`COST_BY_SIZE`** is tight (5 rows over a narrow band) — round to nearest $5k with judgment; keep it ascending + clean even if adjacent rows share a boundary (fine for a by-size guide). Do NOT invert or collapse a range to a single number.
- **Verify:** a final source grep shows no price ends in a non-0/5 digit except per-sq-ft cents (.00/.50 → end in 0) and `$89/mo`. Figures identical across the cost page + both cost articles + any JSON-LD.

## 4. EXTRAPOLATE (fix the class, not just the header)
Audit every render of the phone number + the rating cluster site-wide (footer, sticky-mobile bar, CTA bands, contact, city pages). Each must be atomic — nowrap, no detached count. Fix any other instance that can wrap. (Mobile sticky + footer read clean in the audit — confirm they hold.)

## 5. VERIFICATION GATES
- Build green (`npm run build`) · render every route family (200 + 0 console errors + correct content).
- **PIXELS = the gate here.** Capture the desktop header at 1280 / 1366 / 1440 / 1536 / 1680 and confirm **visually** — NOT by DOM line-count (an `inline-flex` pill reports 1 client-rect even when its text wraps; measure pill HEIGHT or eyeball the capture). Confirm: phone one line · rating one row · no nav wrap · no overflow.
- axe 0-serious (desktop + mobile) — watch contrast if any color shifts (secondary nits).
- mobile + reduced-motion pass · **deployed-content check** (the LIVE URL serves your new build — grep a unique marker, don't trust 200).
- Fulcrum holds — header reads as a tidy balanced row; nothing else re-cramped.

## 6. PRESERVE (do NOT touch)
- The phone STRING/format `(919) 555-0185` + the rating values `4.9` / `312` — NAP + proof single-source (`lib/business.ts`). **Layout-only** fix.
- The global `max-w-7xl` other sections use (widen the HEADER only).
- All copy · conversion guts (forms, price `$10k–$25k`, `$89/mo`, sticky bar, trust) · the 34-page + `/resources` SEO spine + all schema (RoofingContractor/Review/Article/Breadcrumb/…) · NC compliance · the rounded **headline** prices · the desktop hero exemplar (only the optional "We" widow tweak) · the calm mobile hero (only the optional ribbon/Continue nits).
- The WO_06 detailed cost tables are **ROUNDED this pass (§3B)** — keep them single-sourced + coherent + ascending after rounding.

## 7. OPERATING
Fix to the STANDARD (atomic affordances + Fulcrum), not the literal two items — extrapolate site-wide. Refinement, not teardown. Ultrathink each decision. Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the header before/after at all 5 widths (PIXELS) + the extrapolation findings + verification evidence + confirm the deployed URL serves the new build.

---
*RESOLVED 2026-06-20: Joseph ruled ROUND ALL (see §3B) — overriding the keep-granular recommendation. His call; executed. — WE11.*
