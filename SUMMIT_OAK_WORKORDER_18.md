# WORK ORDER 18 — Summit & Oak (AI-LEGIBILITY HARDEN PASS — bulletproof the moat)

**From:** WE13 (architect) · **To:** Builder (**WARM** — the same agent that did the WO_16 audit + WO_17; you hold the codebase + audit + playbook — minimal reread) · **Date:** 2026-06-24
**Compounds on:** WO_01–17 (incl. WO_17, just shipped, **147 URLs @ `main 2289310`**) — ALL locks carry. **This is the moat-bulletproofing pass** — it closes the *only* on-site nit two independent AI audits (ChatGPT 5.5 cross-model + the cos-10 GHL audit) could find. Harden, do NOT redesign.
**Site:** `summit-oak-roofing/` (Next.js 16 SSG, **standalone** — its own gate suite; NOT the flagship verify-gate). Live `kingmaker-summit-oak-roofing.vercel.app`.

## §1 THE PRINCIPLE (the lens) — **BULLETPROOF THE MOAT: read clean to EVERY extractor, not just Google.**
The entire moat is *"an AI-readable local SEO machine."* So every heading + page must read clean to **every** crawler/extractor — Google, AI crawlers, SEO tools, and lightweight/AI text extractors — not just to a `textContent` parser. The one place we're not bulletproof: the animated headings fragment under *rendering-based* extraction. Fix it **without losing the motion or the 9.5/9.5.** Harden + preserve, never teardown.

## §2 BUILD-1 — HEADING TEXT-FRAGMENTATION FIX *(the core)*
**The verified problem (I pulled the live DOM):** the H1/H2 are built from **per-letter `<span class="inline-block">`** for the blur-reveal animation. On `/storm-damage` the H1 is **52 letter-spans**. The DOM `textContent` concatenates CLEAN (`"Storm Damage Roof Repair in Raleigh & the Triangle"`) and there's a clean `aria-label` — **but a rendering-based extractor (ChatGPT) reads it as `"S t o r m  D a m a g e …"`** because each letter is its own inline-block box. Since the moat is machine-legibility, this is a must-fix even though Google likely reads `textContent` cleanly (probable, not documented — don't rely on it; aria-label is a11y, **not** a ranking signal).

**The fix (pick the option that best preserves the signature blur-reveal — design/motion call):**
- **Word-level spans** (animate per *word*, not per letter) — words render with real spaces so the rendered text reads clean; a per-word blur-stagger is the closest motion match.
- **CSS mask / clip-path / gradient-sweep reveal** on the whole clean heading string — keeps the DOM text as one clean string + a smooth reveal.
- **Pseudo-element / overlay reveal** over clean text.
Constraints: **PRESERVE the blur-reveal motion** (the template's value is the motion) + the clean DOM text + the aria-label. Do NOT rely on aria-label as the SEO fallback. **Extrapolate to ALL H1/H2 site-wide** (the shared animated-heading atom → every page type) — it's one component fix, applied everywhere.

**Reproduce → fix → verify:** first confirm the current *rendered* extraction reads `"S t o r m …"` (so you know the target), then fix, then confirm it reads clean (the §5 gate).

## §3 BUILD-2 — SPEAKABLE: reconcile + ship
**Discrepancy:** cos's live scan reports `SpeakableSpecification` **missing**; the WO_16 audit claimed it **present**. Verify on the live/deployed pages. If it's not actually rendering, **ship it** on the answer-first blocks (`AnswerBlock` / the FAQ + answer regions) — the AEO/voice layer is part of the moat. Honest: Speakable is an AI/voice-answer eligibility signal, not a Google rank boost.

## §4 BUILD-3 — IMAGERY HARDEN *(location + cost pages)*
**Gap (cos):** location + cost pages run **light (1 image each)** — thin for money-adjacent pages.
- **Cheap high-value win:** make **alt text + filenames reinforce city + service** on the images these pages already use (e.g. `roof-replacement-raleigh-nc.jpg`, alt `"Roof replacement in Raleigh, NC"`). Near-free SEO + image-search + a11y signal.
- Add **1–2 contextual images** per location + cost page to reduce the thin-feel — reuse/repurpose existing optimized roofing imagery; **lazy-loaded + optimized so CWV does NOT regress.** Do NOT spin up a bespoke per-town photo-generation batch here (that's a separate deferred batch — keep slop-prone image-gen off this WO's critical path).

## §5 MULTI-EXTRACTOR VERIFICATION GATE *(the new gate — the headings aren't fixed until they read clean everywhere)*
Verify the headings on the key page types across MULTIPLE extraction methods — not just our own parser:
1. **Static-HTML `textContent`** (already clean — confirm it stays clean).
2. **Rendered `innerText`** — a Playwright `page.innerText('h1')` assertion: it must read the clean phrase (`"Storm Damage Roof Repair in Raleigh & the Triangle"`), NOT spaced letters. **This is the concrete pass/fail.** Add it to `tests/` as a spec.
3. **An AI/browser text extraction** (a rendered-then-extracted pass) — reads clean.
4. **Google Rich Results / schema** — still valid.
Report the result as **N/N extractors clean** per heading.

## §6 PRESERVE (do NOT touch / regress)
The **9.5/9.5 machine** · the **MOTION FIDELITY** (keep the blur-reveal visual — only change *how* the text is fragmented, not the look) · the **WO_12 dual-intent fork** · the **JSON-LD spine + `@graph`** · the **147-URL nav + 0-orphan reachability** · the **14 cities + the doorway gate** · the **persistent hero + WO_14 creative** · **proven copy** (the heading *text* does not change — only the animation mechanism) · **static generation** · **NC compliance** · **NO PBN** · **security 10/10 + the CSS-owned layers** (`app/api/lead`, `lib/leadSchema.ts`, `lib/server/*`, `next.config.ts`, `instrumentation-client.ts`, `scripts/security-audit.mjs`) · the **demo's intentionally-EMPTY `sameAs`** · the **`aria-label`s** (a11y) · **the WO_17 work** (nearby-city mesh, spatialCoverage/audience, the QR generator, `/projects` depth, the extended doorway gate).

## §7 VERIFICATION GATES (all green before deploy — from `summit-oak-roofing/`, server on `:3210`, free the port first)
- `npm run typecheck` + `npm run build` (0/0) · `npm run security-audit` → **10/10** (`git checkout -- security-receipt.json` after) · `npm run doorway-check` PASS · `npm run reachability-check` → **0 orphans** · `npx playwright test --project=desktop --project=mobile` (axe **0 critical/serious**).
- **The §5 multi-extractor heading gate** (the new `innerText` spec passes on every page type).
- **Motion-preserved visual QA** — a render/vision pass confirms the blur-reveal animation still looks right (desktop + mobile + reduced-motion fallback intact).
- **Speakable** present + valid on live pages · **imagery** CWV-clean + alt/filenames correct + axe 0/0.
- **Verify the DEPLOYED render** (not DOM/200): fetch live HTML + run the rendered `innerText` check against the deployed site; 0 console errors.

## §8 OUTPUT + REPORT
Deploy to `kingmaker-summit-oak-roofing.vercel.app`. **Report to `website-engineer` on the blackboard** with: the heading fix approach chosen (motion preserved how) + the **multi-extractor evidence (N/N clean per heading)** + the Speakable reconciliation (was it missing? shipped?) + the imagery/alt changes + the gate results + the live URL. Fix-reporting format (hyperlink + Was/Fix).

## §9 SKILLS (the heading edit is a `components/` motion change — INVOKE, don't name-drop)
`impeccable` + `frontend-design` + `design-motion-principles` (+ `framer-motion` or `gsap-*` for the reveal refactor) — preserve the motion while fixing the text fragmentation. Include the `Skills loaded:` line on the `components/` edits (skills-gate). `verify-before-claim` before any "done."

## §10 OPERATING
**Bulletproof the moat** — read clean to EVERY extractor; the heading fix isn't done until the §5 gate is N/N clean. **Harden + preserve the motion + the 9.5/9.5 — never teardown.** The heading TEXT does not change (only the animation mechanism). Honest (Speakable = eligibility not ranking; don't overclaim). Fully autonomous — best judgment, no mid-run questions. **Joseph's eyeball is the final gate.** After this, Summit & Oak survives a multi-crawler/multi-AI audit clean — the moat is bulletproof.

---
*Source: WE13 ultrathink synthesis via launch-builder, 2026-06-24. WARM builder. The moat-bulletproofing pass: closes the only on-site nit found across a ChatGPT-5.5 cross-model audit + the cos-10 GHL competitive audit (live-DOM-verified: per-letter heading spans). Compounds on WO_01–17. — WE13.*
