# WORK ORDER 12 — Summit & Oak (dual-intent storm/emergency fork)

**From:** WE11 (architect) · **To:** Builder (WARM / active V2 session) · **Date:** 2026-06-20
**Compounds on:** WO_01–11 (+2 schema fixes) — all locks carry (Fulcrum, **Accent-Color Discipline [WO_07]**, only-CTA-pair, **NC compliance [WO_05]**, rounded prices [WO_06/10], atomic header affordances [WO_10], Experience-first E-E-A-T + schema precision [WO_11], NAP single-source, the 48-URL SEO spine + all schema).
**Site:** `summit-oak-roofing/` (Next.js SSG), live `kingmaker-summit-oak-roofing.vercel.app`. Standalone — verify via build + headless render + PIXELS + Joseph's eyeball.

## 0. SOURCE OF THIS WO
A CRO audit this session (DOM probe + vision pass) found: ALL heroes — home, `/storm-damage`, `/storm-damage/hail-damage`, `/storm-damage/wind-damage`, `/services/emergency-roof-repair` — render the **identical** "60-Second Estimate / Step 1 of 3" quiz card as the primary fold action. The site is elite for the RETAIL re-roof shopper but **funnels the urgent storm caller** (active leak — the highest-intent, highest-margin organic traffic) into a multi-step quiz instead of a call. Even the page titled "24/7 Emergency Roof Repair" leads with the quiz. The sticky bar's "Call Now" is a quiet ghost while "Free Estimate" is the loud red — so even the persistent bar trains taps toward the quiz. Conversion ≈ 9.5 for the shopper, ~6.5 for the urgent caller; this WO closes that gap.

## 1. THE PRINCIPLE (the lens — NEW, durable)
**Dual-Intent Forking.** The hero's PRIMARY action must match the page's dominant search intent. **Urgent/emergency-intent surfaces lead with the CALL** (a one-tap lifeline — a panicked leak victim wants a human, not a questionnaire). **Retail/research-intent surfaces keep the estimate quiz** (the shopper wants control + a number without a salesperson). Never force one mechanism on both personas. On the storm pages the call CTA becomes the FOCAL red — consistent with Accent-Color Discipline (red = the action; here the action is the call) — so do NOT stack a second competing loud red; one focal point per Fulcrum. Reusable standard for EVERY contractor site (home-services universally split emergency vs planned).

## 2. THE FORK — call-first on the URGENT surfaces
Apply to: **`/storm-damage`** (hub), **`/storm-damage/hail-damage`**, **`/storm-damage/wind-damage`**, **`/storm-damage/insurance-claims`**, **`/services/emergency-roof-repair`**.
- **A · Call-first fold.** Lead the hero with a prominent, large, tappable emergency-call CTA — e.g. "Call Now — We Answer 24/7" (the phone as the #1 action) + a one-line urgency cue ("Active leak? Tap to call — we respond 24/7"). DEMOTE the estimate quiz to a clearly secondary affordance: "Not an emergency? Get a 60-second estimate ↓". The quiz STAYS on the page (not every storm visitor is mid-emergency) — it just isn't the loud primary. The CALL is the focal point.
- **B · Flip the sticky-bar emphasis** on these pages: "Call Now" = solid bright-red filled; "Free Estimate" = ghost/outlined (reverse of the retail default). `StickyMobile` should take a per-intent variant (a prop, or a route check like the WO_10 `/review` hide).
- **C · Surface the insurance reassurance HIGHER.** The compliant WO_05 summary ("We Document. You File. The Roof Gets Restored." · "commonly covered" · "you file" · "you stay in control" · "we are not a public adjuster") sits ~69% down the home page. On these urgent pages, bring a compact version UP near the fold — the anxious caller's #1 fear is the bill; calm it early. Reuse the existing compliant copy; write NO new claims.

## 3. HOME — add a co-equal call path (do NOT demote the quiz)
Home H1 is storm-led ("Storm Damage in Raleigh? We Respond 24/7.") but home is the mixed-intent general entry. Add a GENUINE prominent call affordance in/near the hero so a storm caller landing on home isn't funneled into the quiz — e.g. an "Active leak right now? Tap to call 24/7 →" strip or a co-equal call button beside the form — WITHOUT demoting the quiz below the researcher's needs (the researcher is the majority of home traffic). Builder judgment on the treatment (co-equal split vs a thin emergency strip above the form), guided by WO_07 calm + red-discipline: ONE added call affordance, not a pile — don't re-clutter the hero WO_07 just calmed.

## 4. SECONDARY (optional — low priority)
Trust/cert position: the GAF / Owens Corning / CertainTeed marquee (WO_01) appears to render BELOW the hero fold. If it's effectively buried, surface a compact cert lockup nearer the hero on the cold-traffic landing pages (borrowed authority for zero-brand-loyalty visitors). Verify position first; only act if buried; don't over-build.

## 5. ⚠️ NC COMPLIANCE — HARD GUARD
Emergency + insurance copy stays on the SAFE list. **BANNED** (an external audit suggested exactly this — do NOT adopt): "$0 out of pocket", "we pay/cover/waive your deductible", "we handle/deal with your insurance (claim) end-to-end", "public adjuster" (except the existing "we are NOT a public adjuster" negation), any carrier/coverage GUARANTEE. Reuse the proven compliant framing only. Emergency-call copy ("we answer 24/7", "emergency leak/tarp response", "24/7 storm response") is fine. A repo banned-phrase grep must return zero NEW violations.

## 6. VERIFICATION GATES
- Build green · render every route family (200 + 0 console errors + correct content).
- **The fork's own gate (PIXELS + DOM):** on the 5 urgent surfaces — the CALL is the prominent PRIMARY fold element (a call CTA in the first viewport, large + red), the quiz is visibly SECONDARY, and the sticky bar reads Call=solid-red / Estimate=ghost. On the RETAIL surfaces — home quiz still primary + the new co-equal call present; services-detail (non-emergency)/cost/financing/areas/brands/resources UNCHANGED quiz-first. Capture both at mobile + confirm via a vision pass (urgent surfaces read "call-first lifeline"; retail unchanged + NOT re-cluttered).
- NC compliance grep (0 new banned phrases) · axe 0-serious desktop+mobile · mobile + reduced-motion · Fulcrum (one focal point per hero; no competing loud reds) · deployed-content check (live serves the new build).

## 7. PRESERVE (do NOT touch)
- Home + retail/research pages stay QUIZ-FIRST: all `/services/*` detail EXCEPT `emergency-roof-repair`, `/roofing-cost`, `/financing`, `/service-areas/*`, `/brands/*`, `/resources/*`; the home quiz stays primary (home only GAINS a call affordance).
- The quiz (EstimateQuiz) stays ON the storm pages as the demoted secondary — do NOT delete a conversion element (WO_07 lesson: re-prioritize, don't remove).
- WO_07 accent-discipline + Fulcrum · WO_10 header + atomic affordances · WO_05 compliant insurance copy · WO_06/10 rounded prices · the 48-URL SEO spine + all schema (WO_08–11) · NC compliance · NAP single-source · proven copy (the emergency-call CTA is ADDITIVE; flag any existing-copy change with before/after).

## 8. OPERATING
Fix to the STANDARD (Dual-Intent Forking), extrapolate across ALL urgent surfaces (the whole storm cluster + emergency page, not just one). Refinement, not teardown — re-prioritize the hero, don't rebuild it. Ultrathink each decision. Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the per-surface before/after (call-first urgent pages + unchanged retail pages, PIXELS) + the sticky-bar flip + the insurance-surfacing + the compliance grep + verification evidence.

---
*Source: WE11 CRO audit 2026-06-20 (dual-intent gap, verified DOM + vision). New principle "Dual-Intent Forking" banked to memory. Adjudicated against an external audit whose core insight was right (the fork) but whose insurance copy was NC-illegal (rejected — see §5). — WE11.*
