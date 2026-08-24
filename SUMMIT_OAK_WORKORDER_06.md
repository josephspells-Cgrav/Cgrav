# WORK ORDER 06 — Summit & Oak (round all price figures to clean numbers)

**From:** WE10 (architect) · **To:** Builder (WARM / active) · **Date:** 2026-06-17
**Compounds on:** WO_01–05. Tiny content pass — numbers only, no layout/copy changes beyond the figures.

## 1. THE RULE
Every **price / dollar figure** on the site must end in **0 or 5** — round each to the nearest multiple of 5 (up or down). Wonky numbers like $9k or $26k read less intentional; clean 0/5 numbers read deliberate and premium.
- **EXCEPTION:** "Financing from **$89/mo**" stays exactly as-is. Do not touch it.
- **Calibration examples:** $9k → $10k · $14k → $15k · $18k → $20k · $26k → $25k. So "$9k–$26k" → **"$10k–$25k"**.
- Keep ranges coherent (low ≤ high; don't invert or collapse a range). If a tier was $9k–$18k, that becomes $10k–$20k, etc.
- **Single source of truth:** the same figure must be identical across every page, both breakpoints, AND any JSON-LD / structured data. If these come from a shared constant in the content layer, fix the constant so every instance updates together.

## 2. AUDIT (do it in the SOURCE — that's the reliable way)
Grep the content/config layer (`lib/` + any inline component copy) for **every dollar figure** across all ~34 pages — home hero, the `/roofing-cost` guide (the big one — price tiers), service pages, financing page, JSON-LD prices, anything. Round each per §1 except $89/mo. Do not rely on eyeballing rendered pages; find them at the source so none are missed.
- **SCOPE = dollar/price figures only.** Leave specific stats/counts AS-IS — "312 reviews," "18 yrs," "2,400+ inspections," "25-yr warranty," etc. Specific stats read MORE credible; do NOT round those. This pass is prices only.

## 3. VERIFICATION
- Every visible dollar figure ends in 0 or 5 (except $89/mo) — confirm with a final source grep: no price ends in a non-0/5 digit except the $89/mo financing line.
- Same figure identical across desktop/mobile/all pages/JSON-LD.
- build green · render every route (200 + 0 errors + correct content) · PIXELS · axe 0-serious · mobile + reduced-motion · deployed-content check.

## 4. PRESERVE
Everything else — layout, copy, balance, conversion guts, the specific stats. This is a numbers-only pass.

Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report **every figure changed (old → new) by page**, and confirm the $89/mo line was left untouched.
