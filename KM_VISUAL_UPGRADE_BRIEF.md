# VISUAL UPGRADE — work order for website-engineer (2026-06-27)
## Install the visual libs NOW + lift both live sites into "shock and awe"

**From:** vault-agent · Based on live visual audits (real captures + DOM probes). Full audit: vault note `km-visual-audit-2026-06-27`. Screenshots: session scratchpad `so-audit/` + `firm-audit/`.

**Scope:** apply to BOTH live sites — Summit & Oak (`summit-oak-roofing/`, kingmaker-summit-oak-roofing.vercel.app) AND the KM firm site (`king-maker-site/`, kingmakerseo.com). Joseph greenlit polishing the sales-facing sites now (sales-asset, not a new build).

## 🆕 EXECUTION DISCIPLINE (Joseph, 2026-06-29) — read first
- **FIRM SITE FIRST** (`king-maker-site/`). Summit & Oak is a separate second pass — do not start it until the firm-site polish is approved.
- ⛔ **LOCALHOST FIRST — NO PROD DEPLOY, NO re-alias, until Joseph eyeballs and approves the LOCAL build.** Install + integrate, run on `npm run dev`, capture the key sections, then hand Joseph the **localhost URL** for the eyeball gate. The deploy + `kingmakerseo.com` re-alias steps below fire ONLY after he says go.
- **Installs happen HERE, in the site:** the libs (lenis, gsap/@gsap/react, react-bits, magicui, tweakcn) are `npm install`'d / scaffolded INTO `king-maker-site/` as step 1 — nothing is pre-installed globally. (Joseph's GSAP Claude-skills are already loaded.)
- **On startup:** `ultrathink` + **INVOKE the design skills via the Skill tool** (impeccable · frontend-design · design-motion-principles · the gsap-* skills) — real invocation, not name-drop; the skills-gate requires it on `components/` edits. Read `king-maker-site/KING_MAKER_TEMPLATE_MANIFEST.md` + the `feedback_overstimulation_threshold` memory before touching anything.

### Ground truth (from DOM probe — the WHY)
- **Summit & Oak:** NO Lenis, NO GSAP, **only 12 shadowed elements site-wide** → flat cards everywhere = the #1 "template" tell. Score 6.5/10.
- **Firm site:** scroll-reveal already present but **binary depth** + white-on-white dead zones + typewriter on every H2. Score 7.0/10.

## THE TRIO (do on BOTH, in this order — highest premium-per-hour)
1. **Lenis** — buttery momentum smooth-scroll. `prefers-reduced-motion` guarded. Quick-win, biggest instant "this cost money" cue. **Do first.**
2. **Depth/elevation token system** — use **tweakcn** to generate a coherent shadow/radii/surface scale; apply layered (ambient + key) shadow + ~6% top inset-highlight + subtle hover-lift to ALL cards. Kills the flat-card tell.
3. **GSAP ScrollTrigger** (register once) — the choreographed "shock" moments (per-site below). Guard reduced-motion.
- **react-bits / magicui** — animated hero text + stat count-ups (pull components in via their MCPs).

## SUMMIT & OAK — specifics
- **Hero:** parallax the bg photo + re-grade (richer gradient + vignette + warm rim so the roofline punches); headline animates word-by-word; stats count up.
- **Cards:** elevation tokens + hover-lift on services / why-us / resources / FAQ. Spread the PROVEN pricing-bento pattern (asymmetric, varied spans, red financing accent) to the services + why-us grids so they stop reading as 6 identical rectangles.
- **Page bg:** replace the flat charcoal slab with faint ambient depth (radial/mesh glow behind hero + pricing, gentle tonal steps, hairline dividers) — SPARINGLY.
- **Density:** cut the cavernous bottom padding on why-us / final-CTA / FAQ; balance ragged card heights.
- **Icons:** vary the service-tile glyphs (same house icon in every tile reads generated).
- **DO NOT BREAK:** Newsreader + Jakarta type system · the pricing bento · the Google-reviews white card · the before/after drag sliders · the hero estimate form · the 6-col footer · red-accent discipline.

## FIRM SITE — specifics (readability-first; 50-60yo mobile audience)
- **Kill the dead zones:** alternate white ↔ light-blue section backgrounds + soft edge-shadows/dividers; tighten the worst white-on-white gaps ~25-30%. Optional 3-5% blueprint texture (on-brand).
- **Make the Bob's dashboard the centerpiece:** on scroll, draw the rank line #42→#4, count up the KPIs, stagger the leads rows; frame it in browser/app chrome; give it a TALLER, legible full-bleed treatment on mobile (it's the best proof asset + weakest where most of the audience sees it).
- **Stat row (87/70/56/71%):** count-up on scroll + thin bar/ring + elevation; let the number do the work, keep red scarce.
- **Break the `/guides` wall:** inject pull-quotes / takeaway callout cards / colored section-number chips every 2-3 sections + a sticky reading-progress bar. KEEP the big readable body type.
- **Restrain the motion:** dial the per-character typewriter back to 1-2 hero headings (not every H2); standardize section reveals to ONE gentle fade+rise. Reduced-motion-safe with readable fallback text.
- **DO NOT BREAK / DON'T OVERDO:** the dashboard (enhance, never simplify) · mobile `/guides` typography (the gold standard) · navy footer + "ONE KING PER CITY" close · scarce-accent discipline. **No dark/maximalist overlay** (readability mandate stands).

## GATES (before "done" — all must pass)
- `tsc --noEmit` + `build` green · Playwright + **axe 0 critical/serious** · **reduced-motion pass** (all motion suppresses) · **mobile legibility** (esp. the dashboard) · **CWV not regressed** (motion must NOT tank LCP/CLS — the speed moat; amplify magnitudes that READ, per the "imperceptible ≠ absent" lesson — don't add motion that costs perf for no visible gain).
- Deploy — **ONLY AFTER Joseph approves the localhost build:** byte-check the CANONICAL host after deploy; **re-alias `kingmakerseo.com` + www (+ kingmaker-firm)** after the firm-site redeploy (the alias doesn't auto-update). Fix `SITE_URL`/canonicals → kingmakerseo.com while you're in there.
- Report fix-format (hyperlink + Was/Fix), per-site.

## PRINCIPLE
Amplify what READS premium; restraint over spectacle. The firm site especially must pay every motion/depth choice back in clarity or proof, not flash. Refs: `km-tools-github-shortlist` (install priority) · `km-content-voice-register` · `km-imperceptible-not-absent`.
