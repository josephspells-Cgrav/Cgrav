# KING MAKER FIRM SITE — WORK ORDER 09

*Build the **complete buyer's guide** — author all content into the locked 11-category / 31-sub-section
structure. **"Phase E — the buyer's guide."** Architect: WE16 · 2026-06-27 · Builder: **WARM** (the
builder that made `BUYERS_GUIDE_PLAN.md` + shipped WO_08 — you hold the codebase + manifest + WO_08 in
context; reread ONLY this WO). Source spec: `BUYERS_GUIDE_PLAN.md` (the locked structure) + Joseph's
per-category content direction (2026-06-27, captured in §2). Continues `king-maker-site/`.*

> 🛑🛑 **DO NOT SHIP / DEPLOY.** Joseph's explicit instruction: build all the content + get it onto the
> buyer's guide, verify LOCALLY, then STOP and report. **No `vercel deploy`.** He reviews + does an
> `edit-mode` pass first, then deploy happens later. A prod deploy this run = a gate violation.

> ⚠️ **REWRITE TO THE STRUCTURE — do NOT reuse the old guides as-is.** Joseph (2026-06-27) overrode the
> plan §4 "reuse, don't regenerate" line: the 11/31 structure is the authority, content is **written to
> each sub-section's title** (the title is the writing brief). The old guide identities ("the gap most
> sites have," "content that converts," "your site is an asset," "how Google picks") are GONE as
> categories. Existing content + `lib/claims.ts` are **SOURCE MATERIAL for the facts** — rewrite the
> prose; reuse the verified numbers + their honesty flags. New writing, same proven facts.

---

## 0. ⭐⭐ THE LENS + ANTI-DRIFT MANDATE
- **Write-to-the-structure.** Every sub-section is authored to answer EXACTLY its title, in order.
  The builder follows the 11/31 **exactly** — no improvising the taxonomy, no padding (Cat 2 stays 2).
- **Voice:** education-first · **contractor-layman** (a 50-60yo contractor on a phone) · honesty-railed ·
  plain English. Explain like you're talking to a smart contractor who isn't a computer person.
- **Rewrite prose / reuse facts.** Pull every number from `lib/claims.ts` (or the existing content) with
  its MEASURED/MODELED/ILLUSTRATIVE flag intact. Do NOT invent stats; do NOT lift old prose wholesale.
- **WO_08 readable-first standard:** heading-level motion only (the `GuideSectionHeader` Reveal +
  DrawLine already built), no walls of text, 2-3 sentence paragraphs + bullets, blue/white/square.
- 🔴 **Continuous skill invocation** (§9 map) — re-invoke before each group; the skills-gate is live on
  every `components/` edit. `verify-before-claim` before any done-claim.
- 🛑 **NO DEPLOY** (see header). Verify locally, report, stop.

## 1. THE PRINCIPLE
**"The category names ARE the spec."** The buyer's guide walks a contractor: *what you're buying →
what it costs → how it ranks (pack, cities, AI, links) → how it converts → how it makes money → go
check your own site.* Each of the 31 sub-sections is a page authored to its title at the WO_08
readable-first standard, honesty-railed, drawing facts from `claims.ts`. This compounds WO_08 (the
home is the template; the GuideArticle + motion + resource/chart blocks are the infra).

## 2. ⭐ THE 11 CATEGORIES / 31 SUB-SECTIONS — with Joseph's per-category content direction
*(Joseph's 2026-06-27 direction is captured verbatim-in-substance under each. "Builder writes from
knowledge" = he confirmed we know the material; still honesty-rail + flag every stat.)*

**Cat 1 · Website types** — each sub = a clear **pros & cons** treatment (this is the ladder the whole guide hangs on):
- **The Brochure** — pros & cons (~5-10 pages; ranks for name + home city only).
- **The Standard** — pros & cons; **10-20 pages** (dedicated location + service pages + scheduling + basic SEO).
- **The Enterprise** — pros & cons; **50+ pages**; the main *con* is plainly **it costs more** — the pros (widest query surface, deepest topical authority, wins the considered search) outweigh it.

**Cat 2 · Pricing — a deep dive** *(2 subs ONLY — do not pad to 3):*
- **What should the website cost** — the 3-tier ladder tied to Cat 1 (present as **guidance / market-reference ranges**, flag ILLUSTRATIVE — not measured):
  - Brochure: **~$97/mo OR $300-500 one-time** + what it should come with (the basics).
  - Standard: **$297/mo OR $1,000-2,000 one-time** (the 10-20 page site).
  - Enterprise: **50+ pages at ~$75/page** (so ~$3,750+).
  - *(This rewrites/expands the WO_08 pricing guide `what-should-a-contractor-website-cost.ts` from a single $297/mo frame into the full 3-tier ladder.)*
- **Why do some companies charge $2,000/month (SEO retainers)** — what a ~$2,000/mo SEO retainer actually buys, when it's worth it vs not, honest framing.

**Cat 3 · The Map Pack:**
- **How Google ranks your GBP** — builder writes from knowledge (relevance · proximity · prominence in plain terms).
- **Your website + GBP** — the **TIEBREAKER** section. Doctrine (locked, `feedback_site_wins_pack`): when GBP + reviews are equal, **the deeper website WINS the pack** — it's the tiebreaker. Do NOT undersell the site or pivot to "off-page."
- **The limitations of the map pack** — it's **proximity-capped** (~**5-10 miles** of where you can realistically rank #1) AND the **search volume in that radius is limited** — be honest about how few jobs/month it actually yields (`feedback_organic_over_mappack` — the pack is a near-default byproduct, NOT the engine).

**Cat 4 · Ranking for multiple cities — a deep dive** *(builder writes from knowledge):*
- **Location pages (a deep dive)** — one real page per city you actually serve; carry the **anti-doorway** rail (real job → real page; the "delete-the-city-name" test).
- **Google relevance** — why a dedicated, relevant page beats a generic one for the considered search.
- **Topical authority** — depth across the topic = the site Google trusts for the considered query.

**Cat 5 · Turning visitors into leads** *(the conversion category)* — frame the 3 as **conversion TOOLS on the contractor's own site** that turn their visitors into leads:
- **Instant estimate tool** *(renamed from "Pricing estimates" to avoid colliding with Cat 2 — see §6.2)* — an on-site quote/estimate tool.
- **Cost guide** — on-site price-range content that pre-qualifies + builds trust.
- **Online booking / scheduling.**
- ➕ Include a stat: *"tools like these increase your visitor-to-lead conversion by ~X%."* **Use a reasonable, clearly-flagged figure** (e.g., ~10-40% lift, varies by trade — flag **ILLUSTRATIVE**, never MEASURED). Don't fabricate a precise hard number.

**Cat 6 · Ranking for AI (AEO)** *(builder writes from knowledge):*
- **AI Overviews & the zero-click shift.**
- **Making the site machine-readable** (schema + llms.txt).
- **Answer-first content.**

**Cat 7 · What are backlinks** — **layman, referral-framed** (Joseph: "it's like getting referrals from other contractors / respected names"). Plan §3 analogy: *a backlink = a respected name vouching for you, except Google is listening.* Three types, strongest first:
- **Manufacturer / brand certifications** (GAF, James Hardie, Owens Corning list you as certified — the big trusted name vouches by name on their turf).
- **Local authority links** (Chamber, local paper, sponsored team, BBB — the "town governor referral," the *near-me* signal).
- **Trade & supplier links** (state association, industry bodies, supply houses — a referral from inside the industry).
- 🔴 **No PBNs / no link-buying** — these three white-hat types only.

**Cat 8 · Organic vs. paid** *(builder writes from knowledge):*
- **Owned & compounding vs. rented & interruptive.**
- **Where ads still win** (the emergency, day-one speed).
- **The appreciating asset** — show what **ongoing SEO really does over year 1 → year 2 → year 3** (the compounding curve over time). Park **Cost per lead** here: **PPC ~$228 vs LSA ~$162 vs mature organic ~$30** (`claims.ts` CHANNEL_CPL, flags intact).

**Cat 9 · Why bad sites still rank** *(builder writes from knowledge; will echo Cat 8's asset framing — Joseph: "that's fine"):*
- **Grandfathering** — old ≠ better; it's **accumulated ranking signals over time**, not domain age.
- **Site equity & compounding** (echoes the appreciating asset — differentiate the angle: here it's *why an old weak site holds position*). Page-age data: **72.9% of top-10 results are 3yr+** (`claims.ts` PAGE_AGE).
- **How you overtake a static lead** — a compounding site passes a frozen one.

**Cat 10 · How to audit your site** — ⭐ **the AI-verification section. INSTRUCTIONAL + a hardened copy-paste prompt** (see §3 — this is the centerpiece net-new piece):
- **AI verification** — the hardened, copy-paste prompt (§3): paste it into ChatGPT/Claude/Gemini with your site link → it tells you your site type, what's broken, a 1-10 score, and good/broken checklists.
- **What to look for based on page count** (5-page brochure vs 10-20 system vs 50+ enterprise — ties to Cat 1).
- **What a bad audit looks like** (the red flags / failure signs).

**Cat 11 · Revenue generation — a deep dive** *(the closer / payoff):*
- **From traffic to revenue** — the funnel math (searches → leads → booked jobs → $).
- **The compounding revenue curve** — organic compounds, so revenue compounds.
- **Scaling to $5M+** — owning your region's organic demand breaks the $1-2M ceiling.

## 3. ⭐ THE HARDENED AUDIT PROMPT (Cat 10 centerpiece — Kingmaker standard, copy-paste)
Author a clean, hardened, **copy-paste** prompt the contractor drops into ChatGPT/Claude/Gemini with
their URL. It must: classify the site type (Brochure/Standard/Enterprise), find what's broken in that
category, rate it 1-10, and list good + broken as bullet checklists. Render it in a copy-friendly block
(use `.km-code` housing or a copy button) + a one-line "paste this, add your link" instruction. Draft
to refine (harden the wording, lock the output format):

```
You are a senior technical-SEO auditor for home-service contractor websites. Audit the site at:
[PASTE YOUR WEBSITE URL HERE]

Browse the site before answering. Assess ONLY what you can verify by visiting it; if you cannot
access a page, say so rather than guessing. Be strict and specific — no generic praise.

Do all four steps:
1. CLASSIFY the site as one of: BROCHURE (≈5-10 pages, no dedicated per-city or per-service pages,
   mostly a digital business card) · STANDARD (≈10-20 pages, dedicated service pages + dedicated
   location/city pages + online scheduling + basic on-page & technical SEO) · ENTERPRISE (50+ pages,
   deep service×city coverage, schema, fast, answer-first content). State which, and why.
2. CHECK what's broken or missing for that tier: dedicated location pages, dedicated service pages,
   title tags / headings, meta, internal links, schema markup, page speed, mobile usability,
   answer-first content, online booking. Flag anything broken or absent.
3. SCORE the site 1-10 (1 = bare brochure, 10 = complete enterprise system). Give the number + one
   sentence of justification.
4. LIST two bullet checklists: ✅ Everything done well · ❌ Everything broken or missing. Be concrete
   (name the page/element). End with the single highest-impact fix.
```
*(Optionally provide a second shorter variant. Keep it honest — no "guaranteed #1"; the audit reflects
the site, not a promise.)*

## 4. NUMBERS + HONESTY FLAGS (use these exact values; flag every one)
| Stat | Value | Flag | Source |
|---|---|---|---|
| Pricing — brochure | ~$97/mo or $300-500 one-time | **ILLUSTRATIVE** (guidance) | Joseph |
| Pricing — standard | $297/mo or $1,000-2,000 one-time | **ILLUSTRATIVE** (guidance) | Joseph |
| Pricing — enterprise | 50+ pages @ ~$75/page | **ILLUSTRATIVE** (guidance) | Joseph |
| SEO retainer reference | ~$2,000/mo | ILLUSTRATIVE | Joseph/plan |
| Conversion-tool lift | ~X% (reasonable, e.g. 10-40%) | **ILLUSTRATIVE** | builder picks, flag it |
| Cost per lead | PPC ~$228 · LSA ~$162 · organic ~$30 | per `claims.ts` flag | claims.ts CHANNEL_CPL |
| Map-pack proximity | ~5-10 mi | as framed | doctrine |
| Page age (top-10 ≥3yr) | 72.9% | per `claims.ts` flag | claims.ts PAGE_AGE |
| Page counts | brochure ~5-10 · standard 10-20 · enterprise 50+ · reference 147 vs 10 | per `claims.ts` | claims.ts TRADE_PAGES |
🔴 The 3 pricing tiers + the conversion lift are **guidance/illustrative**, NOT measured market data — never flag them MEASURED.

## 5. REUSE MAP (facts + existing content = SOURCE; rewrite the prose to the structure)
Per `BUYERS_GUIDE_PLAN.md` §4 — but **rewrite to each sub-section's title**, don't lift old prose:
Cat1→`enterprise-website-anatomy`,`why-a-brochure-cant-win` · Cat2→the WO_08 pricing guide (expand to 3 tiers) · Cat3→`playbook/organic-vs-the-map-pack` · Cat4→`how-google-picks-the-winner`,`enterprise-website-anatomy` · Cat5→`what-good-content-gives-buyers`,home `BookAppointment`,`/audit` SelfAudit · Cat6→`winning-the-ai-answer` · Cat7→`playbook/prominence-off-page` · Cat8→`organic-vs-paid`,`playbook/organic-vs-ads` · Cat9→`why-your-worse-competitor-ranks`,`your-site-is-an-asset` · Cat10→`/audit` SelfAudit + TRUST_MOVE · Cat11→`playbook/the-1m-to-10m-roadmap`,`where-high-ticket-jobs-come-from`,`the-asset-your-website`,`satellite-expansion`.

## 6. DECISIONS APPLIED (Joseph didn't override → these defaults stand; flag for his eyeball)
1. **Reading order = Joseph's order: categories 1→11, ending on Revenue (11).** He walked the list in order and ended on Revenue; my "Audit-last" lean was not taken → Revenue stays last, Audit is Cat 10. *(He can still flip at review.)*
2. **Cat 5 "Pricing estimates" → renamed "Instant estimate tool"** to kill the collision with Cat 2 "Pricing." *(He didn't explicitly confirm — applied my lean; flag.)*
3. **Page vs anchor = each of the 31 sub-sections is its own `/guides/[slug]` page; category = collapsible nav dropdown.** New slugs matching the sub-section titles; **301 the old slugs → new** to preserve equity + no-orphan. *(Applied my lean; flag.)*
4. **Cat 2 = 2 sub-sections by design — do NOT pad to 3.**
5. **Nav restructure:** the `/guides` left-rail "Fundamentals" flat list → **11 grouped collapsible category dropdowns** (`GuideLayout.tsx` / `GUIDE_TREE`).

## 7. 🔒 HARD LOCKS + PRESERVE-LIST + ⭐ CARRY-FORWARD LEDGER (WO_08 + plan §6 — 0 silent drops)
- ✅ **Readable-first / overstimulation threshold · heading-level motion only** (reuse the `GuideSectionHeader` Reveal+DrawLine) — CARRIED.
- ✅ **Blue/white · square · two-font · one-shot+reduced-motion · accent discipline (red=damage)** — CARRIED.
- ✅ **Industry-neutral** in neutral sections; trade examples only as illustration — CARRIED.
- ✅ **Anti-doorway** rail wherever location/service pages are claimed (Cat 4) — CARRIED.
- ✅ **Site-wins-the-pack** doctrine (Cat 3 tiebreaker); never "only 19%"/off-page pivot — CARRIED.
- ✅ **Organic-first** thesis throughout — CARRIED.
- ✅ **Honesty flags** (MEASURED/MODELED/ILLUSTRATIVE) on every stat; never "guaranteed #1"; **no PBNs** (Cat 7) — CARRIED.
- ✅ **Reuse motion primitives — don't rebuild;** compose in the article renderer (don't alter `motion.tsx` → home untouched) — CARRIED.
- ✅ **Footer no-orphan** static links to every guide (incl. the new pages; mind the `GUIDES.slice` cap) — CARRIED.
- ✅ **SEO + security spine** (JsonLd/schema, canonicals, generateStaticParams, sitemap, speakable, `cyber-security-specialist-1` files) — PRESERVE.
- ✅ **The HOME (6 maximalist sections) — DO NOT TOUCH.**
- 🔴 **AI-legibility = NOT a firm-site gate** (struck WE15) — don't re-introduce it; `aria-label` on headings is free, keep it.
- ✅ **Preserve every existing claim/number/flag/link** when drawing from existing content (rewrite prose, keep facts).

## 8. 🚫 OUT OF SCOPE / NO-DEPLOY
- 🛑 **DO NOT DEPLOY to prod.** Build + verify locally only. Joseph reviews + `edit-mode`, then deploy later.
- **Do NOT wire `/api/lead`** (still a `{ok:true}` no-op; separate task).
- **Do NOT touch the home** or the marketing pages built in WO_08 (except Footer nav to add the new pages).
- No new images unless a section truly needs one (prefer the existing chart/figure vocabulary).

## 9. ⭐ PER-EDIT SKILL-INVOCATION MAP (invoke BEFORE each group)
| Group | Invoke (Skill tool) BEFORE |
|---|---|
| Nav restructure (GuideLayout dropdowns) + GuideSectionHeader reuse | `framer-motion` + `design-motion-principles` + `impeccable` + `frontend-design` |
| Content authoring (all 31 sub-sections, data files) | `impeccable` + `frontend-design` (readability/hierarchy) |
| The hardened audit prompt UI (Cat 10) | `frontend-design` + `impeccable` |
| Any new card/section components | `impeccable` + `design-taste-frontend` + `ui-ux-pro-max` + `gpt-taste` |
| Before any "done/built" claim | `verify-before-claim` |

## 10. VERIFICATION GATES (LOCAL only — NO prod deploy)
- `tsc` 0 · `next build` — all routes SSG incl. the new sub-section pages; build returns clean.
- **Readability gate:** every sub-section page — no walls (2-3 sentence paras + bullets), 17px/1.7, scannable.
- **Motion:** hero `TypeIn` + section H2 reveals/underlines fire on the new pages; **reduced-motion → final state**.
- **No-orphan:** every new page ≤2 clicks from home (nav dropdown + Footer static links); 301s for renamed slugs resolve.
- **Honesty:** every stat carries its flag; 3 pricing tiers + conversion lift = ILLUSTRATIVE (not MEASURED); no PBNs; no "guaranteed #1"; anti-doorway present in Cat 4.
- **Industry-neutral** grep on neutral sections · **structure check:** exactly 11 categories / 31 sub-sections, Cat 2 = 2 subs.
- **Local live check:** run the dev server, spot-check a page from each category renders + the audit prompt copies. **Then STOP — do not deploy.**

## 11. 🛑 CADENCE (WARM builder — build all content, verify LOCAL, report, NO deploy)
1. Skills (§9, continuously). 2. Reread THIS WO in an ultrathink loop (min 3, the §1/§2 structure is the lens) — you already hold the codebase/manifest/WO_08. 3. Restructure the nav → 11 dropdowns. 4. Author all 31 sub-sections to their titles (rewrite prose, reuse facts/flags) + the Cat 10 hardened prompt. 5. Wire slugs + 301s + Footer no-orphan. 6. Run §10 gates LOCALLY. 7. **🛑 STOP — DO NOT DEPLOY.** Report for Joseph: the structure built, per-category readability evidence, the audit prompt, the decisions-applied (§6) for his confirm, and anything you'd flag. He reviews + edit-modes, then deploy is a later call.

---
*— WE16, 2026-06-27. WO_09 / Phase E: the complete buyer's guide — 11 categories / 31 sub-sections,
authored to the structure (the category names ARE the spec), education-first/contractor-layman,
readable-first (WO_08 standard), facts-from-claims.ts with flags intact. Centerpiece: the Cat 10
hardened copy-paste audit prompt. Pricing = the 3-tier ladder ($97 / $297 / $75-page, ILLUSTRATIVE).
WARM builder (the one that made the plan). 🛑 BUILD + VERIFY LOCAL ONLY — DO NOT DEPLOY; Joseph reviews
+ edit-modes first. Carries every WO_08 + plan §6 lock forward.*
