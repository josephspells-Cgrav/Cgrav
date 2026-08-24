# KING MAKER FIRM SITE — WORK ORDER 04

*Home-page redesign — **"Phase B.2"** (the 5 Joseph fold-ins). Architect: WE14 · 2026-06-26 · Builder: fresh-or-continuing (reads the WO + the codebase). Lineage: WO_03 Phase A+B (done, at checkpoint) → **04 / Phase B.2** → THEN Phase C. Continues `king-maker-site/`.*

> **Do ALL of this before Phase C** (Joseph's call). WO_03 shipped the blue/white palette + readability foundation + the agency-card experiment + Home + 1 guide, and stopped at the Phase-B checkpoint. THIS WO refines the HOME page (5 fold-ins) → another checkpoint for Joseph's eyeball → then Phase C (the full guide-readability roll-out + pricing guide) runs.
> **Detailed verbatim spec for each fold-in:** `KM_SITE_WO03_PHASE_C_FOLDINS.md` (WE14 captured Joseph's intent + built inline mockups he approved). This WO is the authoritative synthesis; the fold-ins file is the detail.

---

## 1. CROSS-CUTTING PRINCIPLES (apply to all 5 + site-wide)
- ⭐ **INDUSTRY-NEUTRAL, SITE-WIDE.** The audience = EVERY contractor type (roofer · HVAC · plumber · kitchen/bath remodeler · painter · GC). NO roofing-specific terms in the neutral sections (Asphalt/Metal/Tile, GAF/Owens Corning/CertainTeed, Hail/Wind/Storm). Abstract to neutral page categories every contractor sees their own site in. Roofers stay ONLY as the clearly-framed proof *sample* (the audit). **Extrapolate: scan every section + guide and neutralize roofing language.**
- 🎨 **RED / WHITE / BLUE.** Add **red** as the "negative / damage" signal (the bad stats read RED, not blue — blue alone doesn't say "bad"). Blue stays the brand/action; red = the gap/damage; white/slate the base. Keep it disciplined (red only on the negatives).
- 📖 **MAX READABILITY + AGENCY.** Hyper-polished agency style, but text broken up, scannable, underlines on key points, mobile-tested. Premium, not cluttered.
- 🔌 **WIRE THE LEAD SINK.** `/api/lead` is still a `{ok:true}` no-op — wire it to a real destination (n8n webhook — coordinate w/ `n8n-claude-architect-1`; Resend-email fallback) so the new booking form + soft-captures actually capture. UI can land first; wire before it's link-in-bio live.

## 2. THE 5 FOLD-INS (the home redesign)

**F1 — "The fundamentals most contractor sites are missing" → its OWN full hyper-agency SECTION.**
Promote the 4-cell gap grid to a dedicated section. Hyper-polished agency, super readable (broken-up text, underlines). **Bad numbers in RED.** Data = the **1,017-roofer-site** BROKEN_ROOFER_WEBSITE_REPORT tier list (MEASURED) — replaces the old WCAG/CWV/no-website stats. **FINDABILITY only, as a tier list:** (1) **No location pages ~57%** (fold the 2% doorway-mills in) → "can't rank past their Google Business Profile radius"; (2) **Can't get found** — no geo titles **70%** · no schema **56%**; (3) **AI-invisible** — no llms.txt **71%**. Frame the findings as universal "contractor sites" (roofers = the sample). Keep MEASURED flags + the "absence, not fakes" line.

**F2 — Combine "We build a ranking system" + "Ten pages, or a system" → ONE industry-neutral section.**
The two are redundant → merge. **Drop the per-trade page-count cards.** Make "We build a ranking system" an **agency-style checklist of every PAGE CATEGORY we build** (dense, multi-card), grounded in the real Summit & Oak architecture but **trade-agnostic.** The 11 neutral categories: dedicated service pages · location pages (the lever) · service-by-city pages · product & brand pages · specialty & emergency pages · cost & pricing pages · instant estimate tool · financing · resources cluster (guides·glossary·blog) · project gallery · trust pages. Each = icon + category + 1-line neutral example. Keep the **15×** relevancy anchor. *(WE14 mockup = the approved direction.)*

**F3 — CUT two sections.** (a) The **scrolling trust bar** (AI-tool marquee — Higgsfield/Codex/Obsidian-RAG/etc.): dead, jargon for contractors, redundant with the OS message. (b) The **4-stat MEASURED ProofBar** (147 · 96.6% · 72.9% · 143): the 143 is STALE (1,017 now) + redundant with F1/F2 + the reference-build line. **KEEP** the "LIVE REFERENCE BUILD — Summit & Oak, 147 pages, click every one + audit it with any AI" line (relocate cleanly) + the FlagChip honesty on remaining stats.

**F4 — "Built by a system, not a guy in a page builder" → THE RAW TECHNICALS section** (on-page + technical SEO). Keep the agency 3-card numbered format (01/02/03 + eyebrow + checklist + PROOF) **with FLAIR** (mono technical voice, a small code/schema/llms.txt teaser per card, icons). Industry-neutral. **01 · On-page SEO** ("what Google reads") — keyword+city titles/meta, one H1, answer-first, internal links/no-orphans, alt text · **02 · Technical foundation** ("the plumbing") — complete schema, server-rendered HTML, sitemap/canonicals/robots/clean-URLs, fast CWV+mobile+HTTPS · **03 · AI & machine-readability** ("the new front door") — llms.txt, AI-readable content, answer-format+entity schema, live ranking instrumentation. The AI-OS "built by a system" message STEPS BACK here (it's the quiet moat — can live lighter on /system or /firm). *(WE14 mockup = the direction.)*

**F5 — CUT the "audit with AI" section + REPLACE the selectivity close with a BOOK-AN-APPOINTMENT form.** Cut TrustMove ("plug any number into ChatGPT/Gemini/Claude…") — Joseph delivers that in his videos, not on-site. Replace "One King Per City" → a **super-agency book-an-appointment contact form** (the home's primary conversion / link-in-bio CTA). Two-column agency layout (left = value/what-you-get; right = form card). Fields (NEUTRAL): Name · Company · **Trade (dropdown)** · Email · Phone · (optional) market · (optional) message → **"Book my appointment"** CTA. Keep "one contractor per market" as a light scarcity line (optional). Doesn't need to function yet, but wire the lead sink (§1) before live. *(WE14 mockup = the direction.)*

## 3. THE NEW HOME FLOW (resulting section order)
**Hero** → **F1 gap section** (what's broken, red) → **F2 "We build a ranking system"** (the page system, the 15×) → **Dashboard** (keep — the win-line proof chart) → **F4 raw technicals** (the on-page/technical depth) → **F5 book-an-appointment** (the CTA). Relocate the **reference-build line** cleanly (e.g. under F1 or F2). Cut: ProofBar, trust-bar marquee, TrustMove, Selectivity.

## 4. PRESERVE / DON'T-BREAK
🔒 The blue/white palette + readability foundation (WO_03) — just ADD red as the negative signal. 🔒 The IA/routes/content (WO_02 — guides cluster, playbook, work, system, apply, audit, glossary, firm). 🔒 Schema @graph + llms.txt + SSG + **technical-SEO-as-proof** (the raw-technicals section must be TRUE — the site still passes its own audit). 🔒 **AI-legibility = word-level headings** (heading-legibility spec green). 🔒 FlagChip MEASURED/MODELED honesty (don't reintroduce a debunked stat; the 1,017 numbers are static-HTML-MEASURED, conversion DIRECTIONAL). 🔒 The two-font system + the security layer (don't clobber `cyber-security-specialist-1`'s files).

## 5. CADENCE
Do all 5 fold-ins + the cross-cutting (neutral pass, red palette, lead-sink wire) on the HOME → **🛑 PHASE B.2 CHECKPOINT: deploy + report for Joseph's eyeball** (the new home, mobile-tested). Do NOT start Phase C until he approves. Then Phase C (the full guide-readability roll-out + the pricing guide + playbook/trades/work/system) runs as WO_03 §C.

## 6. VERIFICATION GATES (before "done")
`tsc` 0 · `next build` all SSG · Playwright desktop **+ mobile (390px)** axe **0 serious + contrast AA** (red-on-white + blue-on-white both verified) · heading-legibility green · **mobile readability pass** (the new home reads clean one-handed) · grep gates (no roofing-specific terms left in the neutral sections · no stale "143" · the cut sections gone) · the raw-technicals claims are TRUE (schema/llms.txt/SSR actually present) · `/api/lead` hits a real sink (or explicitly UI-only + flagged) · pixels vision pass (agency + readable; red reads as "bad") · deployed-render + 0 orphans.

---
*— WE14, 2026-06-26. WO_04 / Phase B.2: the 5 home fold-ins (gap section red/white/blue · the page-category checklist · cut trust-bar+ProofBar · raw technicals · book-an-appointment) + industry-neutral site-wide + wire the lead sink. Detail in `KM_SITE_WO03_PHASE_C_FOLDINS.md`. Fresh-or-continuing builder. Do all 5 → 🛑 Joseph checkpoint → THEN Phase C. PRESERVE the blue/white + readability + IA + schema + AI-legibility + honesty + security. Joseph's eyeball is the final gate.*
