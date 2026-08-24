# KING MAKER FIRM SITE — WORK ORDER 01

*The King Maker v2 firm-site rebuild to the LOCKED brand. Architect: WE14 · 2026-06-24 · Builder: ULTRACODE (cold/new). Project: the King Maker B2B firm marketing site (sells to contractors) — a NEW lineage, NOT a Summit & Oak work order.*

> **This is a FIRST BUILD** (from-scratch rebuild to a new brand). No live-audit-at-zoom refinement step — we build new and PRESERVE the old. Corpus starts here; WO_02+ will compound on it.

---

## 0. WHAT THIS IS · BUILDER MODE · THE NON-NEGOTIABLES

- **Deliverable:** the King Maker **firm marketing site** — the premium B2B site that sells done-for-you authority sites + SEO to contractors. Rebuilt to the locked brand (`KM_BRAND_KIT.md`) and the **matured GTM doctrine** (organic-over-mappack · content-first/practitioner-authority · the GHL ranking-system-vs-brochure proof · relevancy · verify-it-yourself · consumer-advocate).
- **It is NOT:** a Summit & Oak clone (that's the homeowner-facing *product demo* — different ICP, keep funnels separate). NOT a headless/repeatable client run (this is a bespoke, taste-heavy flagship — the OS dogfood targets a later repeatable CLIENT clone, per locked decision). NOT a re-skin of old v2's pitch.
- **Stack:** **Next.js 16 SSG** (same enterprise foundation as Summit & Oak — because the firm site must itself be enterprise-grade/crawlable/AI-legible/fast: that IS the proof). Tailwind 4 · GSAP ScrollTrigger + Framer Motion for the premium motion craft.
- **Deploy target:** a **NEW** Vercel project + a NEW codebase dir (default `C:/Users/josep/Claude Gravity/king-maker-site/`). **The old `kingmaker-v2.vercel.app` deployment stays UNTOUCHED — it is the founder's "first website" in the story.** Phase 0 decides reuse-the-bones (fork old v2 source) vs from-scratch, but the OUTPUT brand + doctrine is locked regardless.

---

## 1. THE PRINCIPLE (the lens — internalize before building)

### ⭐ "THE SITE IS THE PROOF." (own-the-standard · own-the-color)

King Maker sells *"we build enterprise-grade sites that rank."* Therefore the firm's **own** site must be the single most technically immaculate, AI-legible, schema-complete, fast, premium-brand site in the category — it **passes its own audit**, it ranks, it converts, and every claim on it is independently verifiable. The site is **Exhibit A**. A web/SEO firm with a thin or sloppy site is a self-refuting pitch; a firm whose own site survives "audit it yourself, ask any AI" is un-debunkable.

Three faces of the one principle:
- **Own the color** (brand) — bold amber-gold on black, premium-firm craft, generous negative space, so the market learns to recognize King Maker and competitors end up imitating *us*.
- **Own the standard** (content/proof) — publish the checklist (the buyer's guide / the 33-pt rubric), then visibly pass it; make competitors fail a checklist *we* wrote.
- **The site is the proof** (technical) — the firm site is a live demonstration of the exact excellence it sells.

Everything in this WO serves that lens. When a decision is ambiguous, pick the option that makes the site *more* of a verifiable proof.

---

## 2. POSITIONING & BRAND — LOCKED (from `KM_BRAND_KIT.md`)

- **Essence:** "The firm that owns gold." **Descriptor:** "The authority in contractor growth & visibility." **Frame:** "We engineer digital supremacy for contractors. King Maker is not a service; it is an ascension." The contractor is the king — we make them. *Ascension by design.*
- **Primary line:** **"WE MAKE KINGS."** Authority lines: *"Precision engineered. Unapologetically premium. The firm that owns gold."* · *"Ascension by design."*
- **Voice = Howard Roark** (`feedback_copy_voice_howard_roark`): declarative, cause→effect chains, reframe-the-norm-as-mediocrity, zero hedge, binary cadence. No hype, no "I think/honestly."
- **Palette (exact):** `--bg #0a0a0a` · **`--gold #ffb900` (SIGNATURE)** · `--gold-bright #ffd24a` · `--gold-deep #856709` · `--white #ffffff` · secondary `--terracotta #c25a3a` (rare) · neutrals `#1f1b12` / `#2d2516` · glow `#ffb9002e`. **Discipline:** bold gold + generous black negative space = premium. AVOID neon-glow-everywhere, gradient mush, gold-on-gold soup (the guru failure mode). The gold is loud; the layout is disciplined.
- **Type — "King Maker Grotesque":** bold/black grotesque headlines (white or black, tight tracking) · semibold gold subheads · regular white body · medium muted small-caps labels/eyebrows. Headline candidates **Space Grotesk / Archivo** (free); clean grotesque body. (Builder picks + tokenizes at build.)
- **Logo — the KM Crest (DONE, vector, Joseph-confirmed "perfect"):** `king_maker_brand/logo/km-mark-gold.svg` (+ `-reversed` for gold bg, `-mono-white`). Angular KM monogram forming upward crown-like peaks. Lockups: crest + "KING MAKER" wordmark (primary); mark-only for favicon/seal. Define clear-space + min sizes. **The seal:** gold wax-style seal for authority moments.
- **The Dashboard = PROOF (a brand asset, must appear):** Total Leads · Revenue Generation · Ranking Performance with **THE WIN LINE in gold** · SEO Performance bars. Data-viz rule: the win line pops in bright gold `#ffd24a`/`#ffb900` against muted dark-gold/gray baselines, AA contrast — the proof reads at a glance.
- **Mood:** cinematic dark architecture + gold light/embossing; thin gold rules; small-caps labels; the gold seal.

---

## 3. THE PROOF SPINE — what the site must DEMONSTRATE (from `KM_GHL_VS_ENTERPRISE_CLAIM_CARD.md`)

Pull every number from the claim card **with its MEASURED vs MODELED flag intact.** Honesty rails are load-bearing (FTC-exposed) and are the *weapon*, not a constraint.

- **The one-line:** "GoHighLevel sells a **$297/mo brochure.** We build a **ranking system.** I scrubbed **143** of their roofing sites to prove it."
- **The measured gaps (lead with these — un-debunkable):** 100% no hreflang · 89% no brand pages · 76% no cost content · 73% no calculator · 73% no `llms.txt` (AI-invisible) · 53% no location pages · 52% no LocalBusiness schema. Median 45 URLs vs our 141. **The structural killer: GHL is client-side-rendered = AI-invisible by platform** (unfixable without leaving GHL).
- **The relevancy frame (Joseph's best lay translation — use "more relevant to the searcher," NOT "topical authority"):** ~130 pages vs ~10 = ~13× the content surface = eligible on ~13× the query space; the *researcher* (3 quotes in hand) is the high-value buyer and your site answers their question → you win them.
- **The side-by-side demo:** Pages 10 vs 130 (MEASURED) · Visitors 10 vs 50 (ILLUSTRATIVE — label it) · Jobs 2 vs 10 (ILLUSTRATIVE — label it). "Here are the articles for why — verify it yourself."
- **The trust move (the masterstroke):** "Don't take my word. Take any article, plug it into ChatGPT / Gemini / Claude, ask it to audit my audit — then audit its audit's audit. I'll wait." Works *only* because the claims are defensible.
- **The live reference build = Summit & Oak** (`kingmaker-summit-oak-roofing.vercel.app`) — "see our work, click every page, then come back." (Old v2 already does this showcase move — keep + elevate it.)
- 🔒 **HONESTY RAILS (apply to every claim):** LEAD with measured organic/technical/AI gaps; **CONCEDE the conversion basics** (GHL bakes in forms/reviews — those "missing" numbers are inflated by the JS lens, directional only). Flag the multiple MODELED. **Never "doorway mills"** (~2%). Never claim a brochure gets zero traffic. **Promise the floor, project the ceiling.** Never SOC2/bank-level security claims — position on actions (OWASP-hardened). NC-insurance-compliant where relevant.

---

## 4. SITE ARCHITECTURE (pages / sections)

**Carry forward the proven structures from old v2** (preserve-proven-copy: keep Joseph's proven lines + sections, evolve framing to the matured doctrine; flag any rewrite of a proven line with before/after). Old v2's working assets to keep+elevate: the **live-work showcase** ("sites we've built, click every page"), the **dashboard/ROI proof**, **"one king per city, per vertical,"** the **selective Application flow**, the **cost-of-waiting** beat, the **tech-stack/OS** credibility ticker.

**Primary pages (firm site):**
1. **Home** — the flagship. Hero ("WE MAKE KINGS" / the descriptor / the dual CTA) → the proof spine (the GHL ranking-system-vs-brochure side-by-side + the dashboard + the measured gaps) → the relevancy argument → the live-work showcase (Summit & Oak + the demos) → the OS/how-we-build credibility → "one king per city/vertical" → the verify-it-yourself trust move → cost-of-waiting → Apply CTA.
2. **The Work / Proof** — the live reference build (Summit & Oak) + demos; "click every page." The side-by-side vs a GHL brochure.
3. **How It Works / The System** — the matured doctrine (organic regional dominance = the engine; the foundation→prominence→dominance→expansion arc), not just "Engine+Gas+Keys location pitch." The OS as the moat.
4. **The Authority Hub (buyer's guide)** — the cornerstone content hub + link-in-bio destination (see §10 fork 2 for scope-now vs shell-now). Pillar page + per-chapter architecture per `KM_CONTRACTOR_BUYERS_GUIDE_SKELETON.md` (educate broad, funnel narrow; ungated web version + optional gated download).
5. **Apply / Contact** — the selective application (one client per city/vertical), tiered CTAs: see the live build · get a teardown/audit of your current site · the exclusive-territory conversation.
6. **Brand-required system pages:** 404, sitemap, `llms.txt`, robots, OG/social.

---

## 5. ULTRACODE PHASE STRUCTURE (exploit the parallelism — Workflow orchestration)

**Phase 0 — RESEARCH SWARM + ASSET INVENTORY (parallel agents → synthesis → build spec).** Do NOT skip; do NOT re-research what's locked.
- **Inventory FIRST (already locked — read, don't re-derive):** `KM_BRAND_KIT.md` · `KM_GHL_VS_ENTERPRISE_CLAIM_CARD.md` · `KM_CONTRACTOR_BUYERS_GUIDE_SKELETON.md` · `KM_ORGANIC_DOMINANCE_PLAYBOOK.md` · `king_maker_outbound/.ghl-audit/REPORT.md` · the memory `feedback_*`/`project_*` (organic-over-mappack, content-first-gtm, site-wins-pack, ai-legibility-qa, copy-voice-howard-roark, km-brand-reposition) · **the old v2 codebase** (locate + audit bones-to-keep vs redo).
- **Research the GAP (parallel — these are NOT in our corpus):** (a) elite web/SEO **agency + B2B firm-site** best practices — positioning, proof/case-study structure, conversion patterns, how the best present pricing + the offer + selectivity; (b) premium **brand-site design** patterns at this tier (dark luxury/editorial-tech, gold-on-black exemplars, grotesque type systems, motion craft); (c) **technical-SEO-as-proof / own-the-standard** — what a *marketing-firm* site itself must have to rank + read AI-legibly (B2B/agency schema, llms.txt, entity, CWV); (d) **topical authority for the contractor-buyer** (contractor-scaling query clusters for the hub).
- **Synthesize → a short build spec** (design direction + IA + copy outline in Roark voice) before writing components. Red-team the proof claims against the honesty rails.

**Phase 1 — FOUNDATION + DESIGN DIRECTION.** Scaffold Next.js 16 SSG; tokenize the locked palette (CSS vars, already match v2) + the grotesque type system; wire the crest logo + favicon/seal; build the core design system (the dashboard-as-proof component, the win-line data-viz, buttons/cards/eyebrows). Render the **Home hero + 2–3 signature sections** to a preview URL. → **See §10 fork 3 (checkpoint here vs run through).**

**Phase 2 — BUILD OUT** all pages/sections per §4, fix-to-standard, ultrathink each design decision, premium motion (AI-legible — §6).

**Phase 3 — TECHNICAL-SEO-AS-PROOF + AI-LEGIBILITY** (§6 checklist) — schema, llms.txt, OG, sitemap, CWV, the word-level heading standard.

**Phase 4 — VERIFY + DEPLOY (preview) + REPORT** (§7). Deploy to the NEW Vercel project; report the live preview URL + per-page audit + gate evidence for Joseph's eyeball.

---

## 6. TECHNICAL-SEO-AS-PROOF — the own-the-standard checklist the site MUST pass

The firm site must pass the same bar Summit & Oak hit (it's the proof):
- **SSG / server-rendered HTML** — fully crawlable, NOT client-side-rendered (the opposite of GHL's killer flaw). Content in the static HTML.
- ⭐ **AI-LEGIBILITY (`feedback_ai_legibility_qa`) — HARD GATE.** **Word-level / `inline`-span heading reveals, NEVER per-letter `inline-block`.** Old v2 violates this (`W e b s i t e s…`) — do NOT carry that pattern. Verify rendered `innerText` reads the clean phrase across static + rendered + box-tokenizer extraction (port Summit & Oak's `tests/heading-legibility.spec.ts`). N/N clean.
- **Schema:** ProfessionalService / Organization + the right firm/agency types · sameAs · breadcrumb · FAQ/Speakable on answer blocks · the buyer's-guide pillar as an Article/HowTo cluster.
- **`llms.txt`** present (we ding GHL for missing it — we must have it). robots + XML sitemap.
- **CWV/speed:** fast LCP, no CLS (aspect-reserved media), lazy where right. Premium motion that doesn't tank performance.
- **Metadata:** unique titles/descriptions, OG/Twitter, canonical.
- **a11y:** axe 0 serious/critical; reduced-motion fallback on all motion.

---

## 7. VERIFICATION GATES (all must pass before "done")

1. **Code:** `tsc --noEmit` 0 errors · `next build` all routes compile.
2. **Local render (Playwright):** capture Home + each page type, desktop + mobile; **axe 0 serious/critical**; **reduced-motion** pass.
3. **AI-legibility gate:** the ported heading-legibility spec — clean phrase across static/rendered/box-tokenizer, every h1/h2/h3, N/N.
4. **PIXELS:** vision pass on the captured PNGs (to disk — NO inline screenshots) — brand fidelity (gold/black discipline, the crest, grotesque, the dashboard win-line), composition (the Fulcrum Principle — no tipping/dead-space/orphan grids), fold quality desktop + mobile.
5. **Deployed render (not DOM/200):** fetch the live preview HTML, grep a unique marker (content is in the static HTML), render for pixels. **Navigability:** every page ≤2 clicks, 0 orphans.
6. **Claims audit:** every stat on the site traces to the claim card with its MEASURED/MODELED flag; honesty rails held (no doorway-mills, conversion conceded, no SOC2/illegal-security language, NC-compliant).

---

## 8. PRESERVE-LIST (the builder must NOT touch / must NOT violate)

- 🔒 **The old `kingmaker-v2.vercel.app` deployment** — untouched, stays live as the founder's "first website."
- 🔒 **The locked brand spec** (`KM_BRAND_KIT.md`) — palette, the crest SVGs, "WE MAKE KINGS," own-the-color, the dashboard-as-proof. Don't soften the gold to antique; don't invent a new palette.
- 🔒 **The honesty rails** (§3) — modeled-vs-measured flags, concede conversion, no "doorway mills," promise-floor/project-ceiling, no false security/compliance claims.
- 🔒 **The matured doctrine** — organic regional dominance is the engine + headline; the map pack is a proximity-capped byproduct (do NOT re-center the old "every-city location engine / pack" pitch as the thesis). Never frame the site as "only 19%"; never pivot a site-question to off-page.
- 🔒 **Joseph's proven copy** — preserve his proven lines/sections; flag any rewrite with before/after. Don't silently replace with your own version.
- 🔒 **The CSS/security layer** if any is reused — don't clobber (cyber-security-specialist-1 owns security layers on KM properties).

---

## 9. OPERATING RULES

- **Fix to the STANDARD, extrapolate site-wide** — a fix on one page propagates to every page/template.
- **Refinement, not teardown** where reusing old-v2 bones; from-scratch where the audit says the bones don't serve the brand.
- **Ultrathink each design decision.** Premium-firm craft, not template defaults. Anti-AI-slop: the 10-second rattle (no generic hero, no stock-gradient mush, no centered-everything).
- **Caveman reporting** (simple plain bullets) · **fix-format** (hyperlink + Was/Fix) on the report · moderate emoji, no exclamation points, ✅/❌ status.
- **The user's eyeball is the final gate** — a vision SHIP does not override Joseph.

---

## 10. RESOLVED DECISIONS (locked at the architect checkpoint — Joseph, 2026-06-24)

1. **Positioning = institutional firm, the AI OS as the MOAT.** Present King Maker as a firm (institutional authority, premium craft). The proprietary Kingmaker Agentic OS + the dashboard/OS stack are the EDGE / how-we-build (proof), NOT the headline identity. Do NOT foreground "solo operator"; do NOT lead with the AI-built story — it's the moat underneath the firm, surfaced as credibility, not the lead.
2. **Buyer's guide = hub shell + pillar page in THIS WO.** Build the authority-hub architecture + the pillar page (link-in-bio ready). Full per-chapter content is a fast-follow **WO_02** — do NOT write all chapters in this run.
3. **Build cadence = design-direction checkpoint mid-build (HARD STOP).** After Phase 0 + Phase 1 (Home + the design system rendered to a preview URL), **STOP and report for Joseph's eyeball BEFORE Phase 2 build-out.** Resume only on his go. This OVERRIDES "fully autonomous / no mid-run questions" — the checkpoint is mandatory (it's a taste-heavy brand flagship and Joseph iterates hard on identity).

---

## 11. ASSET / FILE MAP (for Phase 0 inventory — read these)

- **Brand:** `king_maker_brand/KM_BRAND_KIT.md` (authoritative) · `KM_BRAND_BOARD_LOCKED.png` · `logo/km-mark-{gold,reversed,mono-white}.svg` + `km-mark-source.png`.
- **Proof/GTM:** `KM_GHL_VS_ENTERPRISE_CLAIM_CARD.md` · `king_maker_outbound/.ghl-audit/REPORT.md` · `KM_CONTRACTOR_BUYERS_GUIDE_SKELETON.md` · `KM_ORGANIC_DOMINANCE_PLAYBOOK.md`.
- **The proof site (reference + the heading-legibility spec to port):** `summit-oak-roofing/` (`tests/heading-legibility.spec.ts`, the schema/llms patterns, `components/TypeIn` word-level reveal).
- **Old v2 (locate + audit bones-to-keep; PRESERVE the deployment):** `kingmaker-v2.vercel.app` — find the source dir on disk.
- **Memory (auto-loads):** `feedback_organic_over_mappack` · `project_content_first_gtm` · `feedback_site_wins_pack` · `feedback_ai_legibility_qa` · `feedback_copy_voice_howard_roark` · `project_km_brand_reposition`.

---
*— WE14, 2026-06-24. WO_01 of the King Maker firm-site lineage. The lens: THE SITE IS THE PROOF (own the color · own the standard · the site is Exhibit A). Builder = ultracode, cold. Resolve §10 at the checkpoint, then the builder prompt fires.*
