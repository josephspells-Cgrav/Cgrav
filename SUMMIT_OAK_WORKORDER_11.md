# WORK ORDER 11 — Summit & Oak (on-page SEO → 9.5 · Experience-first E-E-A-T + schema precision)

**From:** WE11 (architect) · **To:** Builder (WARM / active V2 session) · **Date:** 2026-06-20
**Compounds on:** WO_01–10 — every lock carries (Fulcrum, Accent-Color Discipline, only-CTA-pair, NC compliance, rounded prices [WO_06/10], atomic header affordances [WO_10], NAP single-source, preserve conversion guts + the 34-page + `/resources` SEO spine).
**Site:** `summit-oak-roofing/` (Next.js SSG), live `kingmaker-summit-oak-roofing.vercel.app`. Standalone — outside the flagship verify-gate; verify via build + headless render + PIXELS + schema re-validate + Joseph's eyeball.

## 0. SOURCE OF THIS WO
A 4-agent SEO audit this session scored the site **8.5/10** (Technical 9.4 · Content/Local 9.0 — doorway risk **LOW** · CWV 9.0 · Structured-data 7.0). This WO closes the BUILD-SIDE gap toward 9.5. Out of scope: client-launch data swaps (need a real client) + the service×city matrix expansion — see §9.

## 1. THE PRINCIPLE (the lens — internalize before editing)
**Experience-first E-E-A-T + schema precision + zero fabricated data.** Google's **March 2026 core update amplified the first "E" — Experience — above all other signals**: first-hand, named-expert, verifiable content outranks impersonal comprehensiveness. So → a NAMED expert author with credentials, real first-hand proof, and identity data that is **REAL-OR-ABSENT, never fabricated placeholders** — plus precise, deduped, valid schema. This is the on-page 9.5 standard ([[reference_contractor_site_quality_bar]] + [[reference_seo_2026_rubric]]); it applies to **every future client site**, not just this one.

## 2. E-E-A-T NAMED AUTHOR — the #1 lift
Articles are bylined "By Summit & Oak Roofing" (Organization); `/about` is thin (729 wds, no human face).
- **Create a named founder / master-roofer persona** — single-sourced (e.g. `OWNER = { name, jobTitle, bio, credentials, photo }` in `lib/business.ts`). Plausible DEMO persona, **swappable per client** (Joseph can rename) — e.g. founder, "GAF Master Elite roofer · NC #74122 · 18 yrs in the Triangle." Not hardcoded per page.
- **Article schema `author` → `@type: Person`** (the owner) with `name`, `jobTitle`, `sameAs` (→ the About anchor), on all ~13 articles. Keep `publisher` = the Organization.
- **Visible byline block** near each article H1: "Written by [Name], [credential] · Updated [date] · [read-time]." Make the signal visible to users + Google, not just schema.
- **Thicken `/about`** 729 → ~1,200+ wds: founder story, the named owner (photo + bio), crew/tenure, the credentials block (GAF Master Elite / OC Preferred / CertainTeed / BBB A+ / NC #74122). This is where the author bio lives + where each article's author `sameAs` points.
- **First-hand proof:** the before/after gallery photos are real Experience proof — surface/caption them as actual job documentation where it strengthens E-E-A-T. Use what exists; don't fabricate awards or specific false claims beyond the existing credential set.

## 3. SCHEMA PRECISION (7.0 → ~8.5)
- **Dedupe FAQPage sprawl** — FAQPage is on 6 of 7 pages with repeated questions (cost Q **3×**, 4 others 2×). One canonical FAQ per topic; stop repeating the same Q across pages. (Keep FAQ CONTENT for users + AI Overviews — FAQ rich snippets are gov/health-only since 2023, so this is clean-signals, not snippets.)
- **Collapse double-rendered blocks** — every interior page emits TWO identical `BreadcrumbList` + `FAQPage` scripts (once in the page `@graph`, once standalone). Find the source + emit ONE each.
- **Logo** — Organization `logo` is `favicon.svg`; SVG is invalid for the logo rich-result. Use a raster PNG (square, ≥512px brand mark).
- **Article images** — both Articles set `image` to the generic `/og/og-default.jpg`. Google wants article-specific **≥1200px** images — give each article (or each cluster) a relevant one.
- **Service nodes** — add `offers`/`priceRange` (you already publish $10k–$25k) for richer Service eligibility.
- **Standardize** the two Articles' `publisher` + `mainEntityOfPage` to ONE shape.
- **Re-validate** in Google Rich Results (home, a service, a city, an article, roofing-cost) — zero errors; Person author present; `areaServed` = all 6 cities; no fabricated `sameAs`.

## 4. DATA INTEGRITY (build-fixable now)
- **Reconcile review counts** — `/reviews` shows 12 cards, JSON-LD marks up 6, `aggregateRating` claims 312. Make them consistent + single-sourced (one count source of truth; displayed / marked-up / aggregate must agree or be defensibly related). Keep `aggregateRating` (feeds AI Overviews) but know first-party review STARS won't render in SERP (Google ignores self-serving) — don't rely on them.
- **`sameAs` — real-or-omitted, NEVER fabricated.** Replace the bare placeholder roots (`google.com/maps`, `facebook.com`, `bbb.org`) with a clean per-client config: real profile URLs OR omit the field. Fabricated bare-root placeholders read as fake to entity systems (worse than absence). For the demo: omit, or use clearly-documented swap-at-launch placeholders.

## 5. QUICK WINS
- **Home meta description** 212 → ~150 chars (only over-length meta; truncates on SERP).
- **Per-template OG images** — ≥3 variants (service / location / article) vs the single `/og/og-default.jpg` (ties to §3 article images — page-relevant thumbnails).
- **Shorten the insurance-article title** (62 → ≤58 chars) so the brand suffix doesn't truncate.

## 6. CWV — VERIFY INP
- **Measure INP** (mobile) — the one CWV not yet measured (LCP/CLS are green). The multi-step estimate quiz + the financing calculator are the interaction-heavy spots; confirm **INP < 200ms**. Defer/debounce any heavy handler if it fails.
- (Optional minor: trim the home ~2.2MB image payload — lazy-load the below-fold before/after gallery, hero-poster jpg → webp/avif — for slow-mobile margin. Don't regress the visual.)

## 7. VERIFICATION GATES
- Build green (`npm run build`) · render every route family (200 + 0 console errors + correct content).
- **Schema re-validate** — JSON-LD parses on every page; Person author on all articles; NO double-rendered blocks; NO fabricated `sameAs`; Rich Results spot-check zero errors.
- **PIXELS** — capture the NEW surfaces (the `/about` expansion + the article byline blocks) desktop + mobile; confirm clean + on-brand + balanced (Fulcrum holds); no regression to the WO_10 header or the hero.
- axe 0-serious desktop+mobile · **INP measured (<200ms)** · mobile + reduced-motion · deployed-content check (live URL serves the new build — grep a marker).

## 8. PRESERVE (do NOT touch)
- ALL proven article + page COPY — this WO **ADDS** bylines/author/About content; it does NOT rewrite existing copy. Flag any copy change with before/after.
- The **unique per-city content** (the doorway-LOW win — do not templatize it).
- Conversion guts (forms, price $10k–$25k, $89/mo, sticky bar, trust) · the WO_10 header fix + atomic affordances · the WO_06/10 rounded prices · the 34-page + `/resources` spine + internal mesh · NC compliance · the calm mobile hero + desktop hero exemplar · the reserved-555 demo NAP (single-source).

## 9. OUT OF SCOPE — appendix (NOT this WO)
**Client-launch checklist (needs a real client — note, don't build):** real `sameAs` → actual GBP/FB/BBB URLs · real review text + reconciled real count · NAP matched char-for-char to the GBP · a Google Map embed on location/contact pages · the named author → the client's REAL owner.
**Strategic growth (separate WO if Joseph greenlights):** the service × city matrix — up to 48 `[service]×[city]` pages (the #1 on-page expansion lever) — only if each stays genuinely unique (don't recreate the doorway risk).

## 10. OPERATING
Fix to the STANDARD (Experience-first E-E-A-T + schema precision), extrapolate site-wide (byline on ALL articles; schema fix on ALL pages). Refinement, not teardown. Ultrathink each decision. The named persona is DEMO content (swappable). Deploy to `kingmaker-summit-oak-roofing.vercel.app`; report the author/About changes + the schema diff (before/after types) + the quick wins + the INP number + verification evidence.

---
*Source: WE11 4-agent SEO audit 2026-06-20 (8.5/10 → targeting 9.5). 2026 rubric banked to memory ([[reference_seo_2026_rubric]]). — WE11.*
