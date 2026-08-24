# WORK ORDER — PERSISTENT HERO-VIDEO LAYER + TRUST BAR EVERYWHERE (ultracode feature build)

> A real architecture change on the integrated authority site (Summit & Oak, `main @ a55f173`, LIVE).
> Turn the per-page hero video into ONE persistent ambient layer that plays continuously across
> client-side navigation (never resets), add the auto-scrolling trust bar to every page, and apply a
> per-page hero-TIER map. Run as an **ultracode** session. Architect/reviewer = WE12. Touches
> `components/` + `layout` → the design-skill gate applies. Higgsfield + ffmpeg available for asset
> work — **REUSE-FIRST: the WO_14 hero video is Joseph-approved; do NOT regenerate the creative.**

## §1 THE LENS — "One living, continuous hero. Cinematic where you sell, quiet where you read."
The whole site should feel like one cohesive, living experience: the hero footage plays ONE continuous
boomerang loop that **never resets** as the visitor clicks around — same element, same frame, no
restart. But it's TIERED: cinematic on conversion pages, a quiet poster/band on trust/tool pages, out
of the way on read-heavy content. Premium, not noisy. Legibility + performance + the 9.5/9.5 conversion
machine are NON-NEGOTIABLE. This is additive polish, **not a teardown**.

## §2 THE ARCHITECTURE
1. **Persistent video layer.** Move the hero `<video>` from the per-page Hero into ONE persistent layer
   in the shared layout (`app/layout.tsx`), behind content. In Next.js App Router the layout does NOT
   unmount on client-side (Link) navigation → the SAME video element stays alive + keeps playing the
   continuous boomerang loop across every page, no reset. Reuse `/hero.mp4` (WO_14 boomerang orbit —
   already a seamless loop, ideal) + `/hero-poster.jpg`.
2. **Per-page hero TIER** — each page declares a tier (a simple prop/config so it's trivial to flip
   later); the tier controls how much of the persistent video it reveals at the top:
   - **FULL** — tall cinematic reveal (the current home-hero treatment): video shows + the left-scrim +
     text-shadow legibility + the page's hero content (headline + EstimateQuiz / CallFirstAside per the
     dual-intent fork).
   - **LIGHTER** — a compact hero: a short quiet band OR the static POSTER frame (not the full moving
     reveal); the page's content/tool dominates. Brand continuity, no competition.
   - **PURE CONTENT** — NO video reveal: a clean text header; the persistent layer just isn't revealed
     at the top (it keeps playing underneath/off-screen — still persistent — just not shown here).
3. **THE TIER MAP** (assign every route — WE12 design pass):
   - **FULL:** `/` · `/services` + `/services/[service]` · `/storm-damage` + `/storm-damage/[type]` ·
     `/locations/[city]` + `/locations/[city]/[sub]` + `/service-areas` · `/commercial-roofing` ·
     `/brands` + `/brands/[brand]` · `/materials` (hub) · `/roofing-cost` · `/es` (landing).
   - **LIGHTER:** `/resources` · `/blog` · `/projects` · `/gallery` · `/about` · `/reviews` ·
     `/certifications` · `/warranty` · `/materials/[slug]` · `/roof-cost-calculator` · `/financing` +
     `/financing/payment-calculator` · `/contact` · `/faq`.
   - **PURE CONTENT:** `/resources/[slug]` · `/resources/glossary` + `/resources/glossary/[term]` ·
     `/blog/[slug]` · `/projects/[slug]` (use the real job's OWN photos as its header, NOT the brand
     video) · `/privacy-policy` · `/terms` · `/review` · `/es/[slug]`.
4. **Trust bar everywhere.** The existing auto-scrolling cert marquee (`TrustBar`) on EVERY page (all
   three tiers) — one consistent placement (e.g. directly under the hero/header band).

## §3 LEGIBILITY · MOTION · PERFORMANCE (what makes it premium, not broken)
- **Legibility:** extend the home-hero scrim (left-weighted gradient) + text-shadow to every FULL +
  LIGHTER hero so copy holds AA over the (sometimes bright) footage. Vision-verify per tier.
- **Reduced-motion:** `prefers-reduced-motion` → static poster everywhere, no autoplay (the existing
  home-hero pattern — extend it to the persistent layer).
- **Mobile:** PRESERVE the existing engagement-gated mobile behavior — the poster is the LCP and the
  clip does NOT auto-pull on cellular. The persistent layer must NOT force a 3.25MB autoplay on mobile;
  poster-first on mobile, reveal on desktop/engagement per the current Hero logic.
- **Performance is a WIN — keep it:** the video loads ONCE and persists (vs re-fetch per page). Do NOT
  regress CWV — LCP under the build's target (poster-LCP on mobile), CLS 0, INP < 100ms. ffmpeg
  re-encode / poster-extraction is fine; a lighter mobile encode is fine.
- **Assets (reuse-first):** reuse the approved WO_14 `hero.mp4` — do NOT regenerate the creative.
  ffmpeg/Higgsfield only for per-tier poster frames or a re-optimized encode if the design needs it
  (optimization/extraction, not a creative redo). Vision-QA any new asset.

## §4 VERIFICATION GATES (all green before deploy)
- `tsc` + `build` (0/0) · `npm run security-audit` 10/10 · `npm run doorway-check` PASS ·
  `npm run reachability-check` 0 orphans (do NOT break the F.2 nav).
- ⭐ **NEW persistence test** (the core of this WO): a Playwright test that does a client-side nav
  between 2+ FULL pages and asserts the hero `<video>` is the **same DOM node** + its `currentTime`
  keeps **advancing** (never resets to 0) across navigation. This proves the continuous-loop behavior.
- Playwright desktop + mobile: axe 0 critical/serious · dual-intent fork preserved on FULL pages · the
  trust bar present on EVERY page · reduced-motion poster fallback · the WO_10 header de-wrap holds.
- CWV spot-check (LCP/INP/CLS) on a FULL page + a PURE-CONTENT page (mobile poster-LCP intact).
- **VISION pass on all 3 tiers** (full/lighter/pure) — premium + legible, footage never fights content.

## §5 PRESERVE (do NOT regress)
The 9.5/9.5 conversion machine · the dual-intent fork (FULL hero pages keep call-first/quiz-first) ·
EstimateQuiz / sticky bars · the WO_14 hero video + poster (the approved creative) · the JSON-LD spine ·
the 141-URL nav + reachability (F.2) · the 14 cities + doorway gate · proven copy · security 10/10 ·
static generation. Additive polish, not a redesign.

## §6 DEPLOY + REPORT
Work on a feature branch off main (**rollback point: `main @ a55f173`**). Verify the §4 gates → merge to
main → deploy (`npm run build && npx --yes vercel@latest deploy --prod --yes`). Verify the DEPLOYED
site: click between pages LIVE + confirm the hero keeps playing continuously (no reset), the trust bar
is everywhere, the tiers render right. Report to `website-engineer` (WE12) with the live URL + the
persistence-test result + per-tier vision notes. WE12 QAs live (pixels + the persistence behavior);
Joseph's eyeball is the final gate.

## §7 DESIGN SKILLS (rendered UI + motion — INVOKE, don't name-drop)
Invoke `impeccable` + `frontend-design` + `design-motion-principles` (and `framer-motion` for the
reveal/persistence motion). Apply the Fulcrum balance + accent-discipline + the WO_10 atomic-header
lesson. Include the `Skills loaded:` line on the `components/` edits (skills-gate).
