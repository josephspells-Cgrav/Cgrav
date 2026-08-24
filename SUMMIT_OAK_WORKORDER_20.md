# SUMMIT & OAK — WORK ORDER 20

*Aesthetic / balance pass — raise the long-tail BODIES to the premium bar. Architect: WE14 · 2026-06-25 · Builder: **NEW / COLD, design-skill-led** (a fresh agent, NOT the WO_19 warm session). Lineage: WO_16 → 17 → 18 → 19 → **20**. Source = the WE14 aesthetic audit (3 strict vision passes over 18 template types, live).*

> **Sequence AFTER WO_19 merges + deploys.** WO_20 starts from the post-WO_19 `main` and inherits WO_19's image discipline (lazy + compressed + aspect-reserved + immutable cache) — every figure this WO adds must follow it so the aesthetic pass does NOT undo the LCP win. Do not run concurrently with WO_19 (same codebase → collision).

---

## 0. WHAT THIS IS

A **visual refinement** of the page-TYPE templates — NOT a redesign, NOT new pages, NOT a content rewrite. The audit's verdict: **the bones are premium and every fold holds the bar** (shared hero, palette, type, accent discipline all consistent and strong); the slip is isolated to the **long-tail BODIES below the fold** — the pages built fast for SEO depth (resource articles, guides, blog, material/brand details, `/es`) lost the home's "text + visual anchor" pairing and decayed into balanced-but-empty text columns. **Fix the templates, not the 150 pages** — one template fix propagates to every page of that type.

## 1. THE PRINCIPLE / LENS — "EVERY BAND EARNS ITS COUNTERWEIGHT"

This is the **Fulcrum / Balance Principle** (`feedback_balance_fulcrum_principle`; WO_01/02 applied it to the core) — now extended to the long-tail bodies at the SECTION level. The standard:

> **No body section may be heading-left + prose + a dead right rail.** Every band pairs its text with a visual counterweight — an image, a comparison table, a spec figure, a stat group, a pull-quote, or a sticky rail. The home never asks the eye to read more than ~2 paragraphs without a visual anchor; every template must hold that bar.

The **donor patterns already in the codebase** (the proof it's achievable — port these, don't invent):
- **Project case-study** (`/projects/*`) — the photo gallery + the asymmetric body-left / "Project Details" spec-card-right band. The donor for detail/combo bodies.
- **Glossary hub** (`/resources/glossary`) — the fully-populated even grid. The donor for index/hub grids.
- **The home's anchored bands** (before/after slider, stat row, map graphic, process strip) — the donor for `/es`.

Internalize this before editing. When a section is ambiguous, ask: *what is the counterweight here?* If the answer is "nothing," that's the bug.

## 2. THE TEMPLATE FIXES (ranked by leverage — defect · fix · donor · acceptance)

### ⭐ FIX 1 — The shared PROSE template (resource article + guide + blog) — HIGHEST LEVERAGE (~40 pages)
**Defect (live, NEEDS-WORK):** [`/resources/roof-replacement-guide`](https://kingmaker-summit-oak-roofing.vercel.app/resources/roof-replacement-guide) (8,400px tall), the resource articles (34 of them), and [`/blog/*`](https://kingmaker-summit-oak-roofing.vercel.app/blog/what-we-see-after-a-triangle-hailstorm) all render a single ~760px text column on charcoal running the FULL page, a **dead right rail the entire length**, **zero figures**, and H2-only flat hierarchy. At 25% zoom each reads as one undifferentiated grey ribbon.
**Fix:**
- Add a **persistent sticky right rail** to the shared article/guide/blog template: a table-of-contents (anchors to the H2s) + a compact "Get a Free Inspection" CTA card (reuse existing CTA copy — do NOT rewrite) + one trust stat. This alone kills the dead-rail void AND restores asymmetric balance.
- **Mandate an in-body figure cadence** — at least one anchor (photo / labeled diagram / pull-quote block) every ~2 sections. Lead the blog posts with a real photo per major section (the hailstorm post needs damage photos — the clearest imagery miss).
- For very long guides, additionally chunk the body into occasional alternating image-left/text-right **section bands** so it inherits the home's cadence instead of one continuous column.
**Acceptance:** no prose page has a dead right rail; a figure appears at least every ~2 sections; the sticky TOC works; 25%-zoom read shows rhythm, not a grey ribbon.

### FIX 2 — The "right-side anchor" rule for detail/catalog bodies (material · brand · about · combo)
**Defect (live):** [`/materials/metal-roofing`](https://kingmaker-summit-oak-roofing.vercel.app/materials/metal-roofing) runs 4–5 consecutive prose blocks ("Strengths & Trade-Offs," "Standing Seam vs Exposed-Fastener," "Is Metal Worth the Cost") with no anchor — each a heading-left + prose + dead right rail (tip-on-a-pole). [`/about`](https://kingmaker-summit-oak-roofing.vercel.app/about) narrative bands lack figures (the trust page carries the LEAST imagery). The combo page's "Recent Job" floats as text with no project photo.
**Fix:** make the detail/about section template **require a paired object** opposite the text — convert "X vs Y" / "Strengths & Trade-Offs" prose into a **2-column comparison table** or an image-paired band; give About a human/crew/founder figure or credential graphic per narrative band; give the combo "Recent Job" slot a required project photo (donor = the project case-study band). **Structural rule: no detail-body section without a right-side anchor.**
**Acceptance:** every detail/about/combo body band has a counterweight; no tip-on-a-pole; the material "vs" sections are data objects, not prose.

### FIX 3 — `/es` to parity (the biggest single-page drop)
**Defect (live, NEEDS-WORK):** [`/es`](https://kingmaker-summit-oak-roofing.vercel.app/es) collapses below the shared hero to bare left-aligned headings + short paragraphs on flat charcoal — three stacked text blocks each tipping hard-left with a huge empty right rail. The English home's anchors (before/after, stat row, map graphic, library band) **never carried over**. A Spanish buyer sees a visibly downgraded site.
**Fix:** **port the English home's anchored bands to the `/es` template** — the same image/data objects (stat row, before/after, map graphic) beside the Spanish text. The localized home must MIRROR the English home's section anchors, not degrade to prose. (Reuse the existing home components; swap copy only — preserve the existing ES translations.)
**Acceptance:** `/es` reads as the same premium site as the English home; no stacked dead-rail text bands.

### FIX 4 — Brand "Shingles We Install" lopsided void (worst single section in the audit)
**Defect (live):** on [`/brands/gaf`](https://kingmaker-summit-oak-roofing.vercel.app/brands/gaf), "Shingles We Install" = a 3-row product list LEFT and ONE small "Your Coverage" card floating in a huge empty charcoal void RIGHT — tips hard right into dead space. Plus "What GAF Means" = 3 identical bordered cards (identical-card-grid).
**Fix:** rebalance so the product list + the coverage content carry **equal mass** (product cards as a proper filled grid + coverage as a second equal column or a full-width strip beneath) — kill the right void. Break the 3-identical-card grid (vary weight / add a real anchor). Same fix template-wide for any "list + single card" layout.
**Acceptance:** no empty right void; balanced section; the 3-up isn't identical-card slop.

### FIX 5 — The MINOR pass (one anchor / one uniformity-break each)
- [`/service-areas`](https://kingmaker-summit-oak-roofing.vercel.app/service-areas): the ~14 identical city cards — **verify the bottom row isn't orphaned** (3-wide grid, uneven count → 1–2 lonely cells), break the uniformity (feature the primary metro / add a map / vary card weight), and fix the closing **centered-everything** CTA band (it abandons the house asymmetry).
- [`/locations/raleigh-nc`](https://kingmaker-summit-oak-roofing.vercel.app/locations/raleigh-nc) (core body): 4+ consecutive heading-left/paragraph-right bands create void under each short heading — insert a visual anchor (figure / stat band / photo) between them; close the dead space under the short left-column headings.
- Glossary-term (`/resources/glossary/[term]`): drop the border on the definition card (de-box → text breathes on the canvas) + add one optional labeled term-photo/diagram slot.
- **Accent nit (core):** the solid bright-red CTA bar under the FAQ on the service-detail + storm pages stacks a third competing loud-red on one scroll → demote to a **ghost/outline** CTA (keep solid red for the hero + final CTA only). (`feedback_accent_color_discipline`.)

## 3. IMAGERY SOURCING (how the fixes get their anchors — floor first, no slop)
Priority order so the pass ships without a slop spiral or a CWV regression:
1. **Structural/data anchors FIRST** (zero new images, zero slop): comparison tables, spec figures, stat groups, pull-quote blocks, the sticky TOC rail, labeled diagrams. These fix most "dead rail" sections with built elements.
2. **Reuse EXISTING photographic assets** (the home before/after gallery, the project galleries, the process imagery, the location job-photos) where a photo is the right anchor.
3. **Generate NEW imagery (Higgsfield soul_2) ONLY where genuinely needed** (e.g. blog damage photos, a glossary term diagram) — a **tagged, optional sub-task**, always **vision-QA'd** (soul_2 bakes garbled text ~20% — `reference_contractor_demo_media`), NOT blocking the structural fixes. Every new image follows the WO_19 image discipline (lazy below-fold, compressed <150KB, aspect-reserved/CLS-safe, immutable cache).

## 4. BUILDER METHOD (design-skill-led)
**Lead with the design skills** — invoke `impeccable` + `frontend-design` + `high-end-visual-design` (+ `design-taste-frontend`) via the Skill tool (not name-drop) for the actual taste guidance: the slop-signature ban list, the premium-section patterns, the balance laws. Reference `STRUCTURE_DOCTRINE.html` + `REFERENCE_LIBRARY.html` (cg-main root) for atom structure + recipes on demand. Model every new section on the **donor patterns** (§1) + the project/glossary-hub templates — do NOT inline-compose a flat editorial card. *(SO is standalone — outside the flagship skills-gate/verify-gate hooks; the §6 gates are the verification.)*

## 5. PRESERVE-LIST (do NOT touch / must NOT regress)
- 🔒 **The bones** — the shared hero/fold (premium, holds the bar everywhere), the palette (charcoal `#161719` + contractor red `#d8262c`), Newsreader/Plus Jakarta type, the V2 motion DNA.
- 🔒 **Accent discipline** — red stays CTA-only (the audit confirmed it's CLEAN site-wide). Do NOT add new reds; the only red change is DEMOTING the FAQ-adjacent bar (Fix 5).
- 🔒 **The 9.5/9.5** conversion + on-page SEO; the dual-intent fork; the persistent hero + trust bar; the @graph/schema; **word-level headings + the heading-legibility gate (18/18)**; Speakable; the WO_17 geo-mesh; the CSS/security layer (don't clobber); **all 147 URLs at 200 / 0 orphans / ≤2 clicks**.
- 🔒 **Joseph's proven copy** — this is a LAYOUT pass; reuse existing copy/CTA text. Flag any copy change with before/after. Preserve the existing ES translations.
- 🔒 **WO_19's wins** — don't undo the LCP fix; new figures follow its image discipline.
- 🔒 **The donor templates** (project case-study, glossary hub) — they SHIP as-is; use them as donors, don't "improve" them into something else.

## 6. VERIFICATION GATES (all green before "done")
Run from `summit-oak-roofing/` (server `:3210`):
1. `tsc --noEmit` 0 · `next build` all routes SSG.
2. **Re-run the WE14 aesthetic capture** (`node .aesthetic-audit.cjs` from the repo → `.aesthetic-audit/`) and re-audit the same templates at zoom → acceptance: **no dead-right-rail prose pages · every body band has a counterweight · `/es` at parity · no orphan grids · accent discipline intact.** (Vision verdict to disk — NO inline screenshots.)
3. Playwright `--project=desktop --project=mobile` — **axe 0 serious/critical** (the new rail/figures/tables must be a11y-clean) · the `heading-legibility` spec **18/18** · dual-intent fork + persistent hero preserved.
4. **CWV** — figures lazy + aspect-reserved → CLS stays <0.1, LCP not regressed (re-check vs the WO_19 baseline). `doorway-check` PASS · `reachability-check` **147/147, 0 orphans** · `security-audit` 10/10 (revert the receipt).
5. **Deployed-render** (not DOM/200): fetch live, confirm the new layouts serve; pixels vision pass on the fixed templates (brand + balance-at-zoom).

## 7. CADENCE + DEPLOY
**Mid-build checkpoint (recommended — taste-heavy):** do **Fix 1 (prose template) + Fix 3 (`/es`)** FIRST as the direction sample, deploy to preview/prod, and **report for Joseph's eyeball before the rest** — they're the highest-leverage and they prove the "anchor rule" interpretation is right before it propagates to every template. Then complete Fix 2/4/5 on his go.
```bash
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"   # starts from post-WO_19 main
npm run build && npx --yes vercel@latest deploy --prod --yes
git checkout -- security-receipt.json
# THEN verify the deployed render + re-run the aesthetic capture + the gate stack.
```

## 8. CARRIED LOCKED DECISIONS (compounding WO_16–19 — do not relitigate)
SO = standalone Next.js 16 SSG, `main` = source of truth + live = deployed state · 9.5/9.5 quality bar · NEVER PBN · the Fulcrum/Balance Principle + Accent-Color Discipline · word-level headings (AI-legibility) · dual-intent forking · NC insurance compliance · the site WINS the map pack when all else is equal (never "only 19%", never pivot to off-page). Verify PIXELS + deployed CONTENT + NAVIGABILITY, not DOM/200. Joseph's eyeball is the final gate (it overrides a vision-agent SHIP).

---
*— WE14, 2026-06-25. WO_20: every band earns its counterweight. The bones are premium; raise the long-tail bodies to the bar via ~4 template fixes (prose-rail + figure cadence · the anchor rule · `/es` parity · the brand void) + the donor patterns. Fresh design-skill-led builder, AFTER WO_19. PRESERVE §5, run §6 gates, checkpoint after Fix 1+3, deploy, report in fix-format. Content expansion = WO_21.*
