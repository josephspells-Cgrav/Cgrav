I now have the existing chapter titles, the route shape (flat `/playbook`, no chapter subroutes yet), and the research backbone. I have everything needed to design the IA.

---

# KING MAKER FIRM SITE — INFORMATION ARCHITECTURE FOR THE EDUCATION-FIRST BUYER'S-GUIDE PLATFORM

Builder-actionable IA mapping the locked 13-section topic map + the existing build into a concrete, education-first resource site. The premise that runs through everything: **"THIS is why you need an enterprise-grade website to hit your growth goals."** Educate broad, funnel narrow. Brochure-teardown, NOT GHL-teardown. Practical/utilitarian, not editorial.

The current build already has TWO competing chapter systems — the live `/playbook` ships a **business-growth** 10-chapter shell ("The $1–2M Ceiling," "Organic vs. the Map Pack"…) while the brief's **13-section topic map** is website/SEO-mechanics-focused. These are different axes and BOTH must live on the site. The IA below resolves this: the **Playbook** stays the business-growth narrative (how to scale $1M→$10M); the new **Guides hub** is the website-mechanics buyer's guide (the 13-section topic map). They cross-link. This is the single most important structural decision in this document.

---

## A. RESEARCH-BACKED DESIGN PRINCIPLES (the rules every page obeys)

Drawn from NN/G, the 2026 pillar-cluster consensus, and 2025-26 demand-gen data — filtered through the "practical not editorial" constraint:

1. **Pillar ≥ 3,000 words, clusters in-depth, links flow pillar→cluster→pillar.** Thin pillars (<2,000w) undermine the whole cluster's authority signal. Each hub is a real document, not a link menu. (This is also PROOF — the site practices what it teaches.)
2. **Clean subfolders, breadcrumbs everywhere, zero query-string for core content.** `/guides/`, `/guides/enterprise-website-anatomy/`, `/playbook/the-1m-ceiling/`. Mirrors the IA KM sells.
3. **Sticky left-rail TOC with scrollspy** on every long page; on mobile it collapses to a sticky "On this page" header / accordion. Highlight the active section. Label it "On This Page" — never vague. Back-to-top at section ends.
4. **Scannable long-form:** answer-first blocks (the question as an H2, the answer in the first sentence — this is also AEO/Speakable bait), no skipped headings, bullets over prose walls, a visual/chart roughly every 2 scroll-heights. Dense-but-organized.
5. **NEVER hard-gate the value.** Every guide reads in full, free, no email wall — TOFU education needs maximal reach and ungated case studies get downloaded 62% more. Capture happens via *soft* mechanisms (newsletter, "email me the PDF of this guide," the interactive audit) and the apply funnel. Inline delivery beats download links (79% vs 62% consumption). The single-field soft gate recovers ~29% of would-be abandoners — so capture is one field, never a 7-field wall mid-read.
6. **Internal links: descriptive anchors, in-body, <100/page, every chapter ≤2 clicks from home (no orphans).** This is a load-bearing KM doctrine ("built ≠ reachable") — the site must itself pass the no-orphan BFS it teaches.
7. **TOC/anchor consistency site-wide** so contractors learn the pattern once and reuse it as a reference.

---

## B. THE SITEMAP / PAGE LIST (KEEP · RESHAPE · ADD)

Route family legend: existing = in build today; ADD = new route. Every page registers in `lib/sitemap-registry.ts` + gets a `webPageNode`/`articleNode` in the @graph.

### TIER 0 — Top-level (header nav)

| Route | Status | Role |
|---|---|---|
| `/` Home | **RESHAPE** | Education-first landing: the brochure-vs-authority spine, the "why you need an enterprise site" premise. De-GHL. |
| `/guides` | **ADD** (the keystone) | **The buyer's-guide PILLAR HUB.** The 13-section topic map lives here as a cluster. This is the "resource they actually USE." |
| `/playbook` | **KEEP + build out** | The business-growth narrative (scale $1M→$10M, 10 chapters). Already shipped as shell — fill chapters. |
| `/work` | **RESHAPE** | Proof: the reference build (Summit & Oak) + the per-trade page-count breakdown + brochure-vs-authority anatomy teardown. |
| `/system` | **KEEP + extend** | The KM OS / process (Foundation→Prominence→Dominance→Expansion). Add anti-doorway explainer. |
| `/apply` | **KEEP + wire** | The qualify funnel. Wire the dead `/api/lead` sink. |

### TIER 1 — The Guides cluster (the 13-section topic map) — ALL **ADD**

The 13 topic-map sections compress into **9 guide pages** (some merge naturally) under `/guides/[slug]`, plus the per-trade family. Each is a real cluster page (1,500–3,000w), `articleNode` schema, word-level headings, Speakable, FlagChip on every stat.

| Route `/guides/...` | Topic-map § | Working title |
|---|---|---|
| `enterprise-website-anatomy` | §2 | What an enterprise-grade website actually IS |
| `why-a-brochure-cant-win` | §1+§3 | Why a 10-page brochure can't win (query-surface math) |
| `why-your-worse-competitor-ranks` | §4 | Why your worse-site competitor still outranks you (grandfathering) |
| `how-google-picks-the-winner` | §5 | How Google actually picks the winner (relevance, topical authority, E-E-A-T) |
| `the-gap-most-sites-have` | §6 | The fundamentals most contractor sites are missing (the GAP STAT WALL) |
| `organic-vs-paid` | §7 | Organic vs. paid — rented leads vs. owned demand |
| `your-site-is-an-asset` | §8 | Site equity & compounding — the appreciating asset |
| `what-good-content-gives-buyers` | §9 | What good content does for the buyer (price ranges, comparisons, what-to-expect) |
| `winning-the-ai-answer` | §10 | Winning the AI answer (AEO, honestly) |

### TIER 1 — Per-trade breakdown (§12) — **ADD** `/guides/trades/[trade]` (the page-list-as-proof)

| Route | Page count (proof) |
|---|---|
| `/guides/trades/roofing` | 147 (shipped) |
| `/guides/trades/kitchen-bath` | ~166 |
| `/guides/trades/hvac` | ~165 |
| `/guides/trades/outdoor-living` | ~296 |
| `/guides/trades/plumbing` | ~300+ |
| `/guides/trades/painting` | ~144 |

A `/guides/trades` index page leads this family (the bar chart of all 6 trades = the headline visual).

### TIER 1 — Playbook chapters (§ business-growth) — **ADD** `/playbook/[chapter]`

The 10 chapter slugs already named in `app/playbook/page.tsx` (01 The $1–2M Ceiling … 10 The Foundation Decision). Build each as `/playbook/the-1m-ceiling/` etc. with `articleNode`.

### TIER 2 — Supporting — **ADD**

| Route | Role | Topic-map § |
|---|---|---|
| `/guides/the-honesty-layer` | What KM WON'T claim — the debunk/credibility moat | §13 |
| `/audit` (or `/audit-your-site`) | **The interactive "audit your own site" tool** — the verify-it-yourself moment | §11 |
| `/glossary` | Definitions/index (LocalBusiness schema, CWV, INP, topical authority, grandfathering…) — reference utility + entity/sameAs SEO | supports §2,§5 |
| `/firm` | KEEP — positioning/standard | — |
| `/privacy` `/terms` `/not-found` | KEEP | — |

**Page count delta:** existing 8 routes → ~36 routes (8 kept/reshaped + 9 guides + 6 trades + 1 trades-index + 10 playbook chapters + honesty + audit + glossary). The site's own depth becomes Exhibit A for the §12 "authority sites have 150–300 pages" claim.

---

## C. NAVIGATION

### Header (extend `components/Header.tsx`, keep the shell)

Current: Work / System / Playbook / **Apply**. New:

```
[KM crest]  Guides ▾   Playbook ▾   The Work   The System   The Firm        [Audit Your Site] (ghost)  [Apply] (gold)
```

- **Guides ▾** — the only new dropdown. Two columns: *Fundamentals* (the 9 §-guides) + *By Trade* (the 6 trades). Footer of the dropdown: "Start here → The complete buyer's guide" (links `/guides` pillar). This dropdown alone keeps all 15 cluster pages ≤2 clicks from home → satisfies no-orphan.
- **Playbook ▾** — the 10 growth chapters (or a single link to the pillar that lists them; dropdown only if it doesn't crowd the bar).
- **Two CTAs:** `Audit Your Site` (ghost/secondary — the soft, low-commitment entry that feeds capture) + `Apply` (gold, primary). Per dual-intent doctrine: the low-intent researcher gets the audit; the ready buyer gets apply.
- Mobile: hamburger → accordion sections (Guides / Playbook / pages), both CTAs pinned at the bottom of the sheet.

### Footer (extend `components/Footer.tsx` to 4 columns)

```
THE GUIDES            BY TRADE          THE FIRM           ENGAGE
Anatomy of a site     Roofing           The Work           Audit your site
Why brochures lose    Kitchen & Bath    The System         Apply
How Google picks      HVAC              The Firm           Email
Organic vs paid       Outdoor Living    The Honesty Layer  Newsletter (1-field)
Site as an asset      Plumbing          Glossary
The AI answer         Painting          Privacy / Terms
[+ See all guides →]
```

Footer is the no-orphan backstop: every guide + every trade is linked here too, so nothing depends solely on a JS dropdown for crawlability.

### In-page (every long guide/chapter/trade page)

- **Sticky left-rail TOC + scrollspy** (desktop) / sticky "On This Page" accordion (mobile). New component `components/guide/StickyTOC.tsx`.
- **Breadcrumb** under the page hero: `Guides › Fundamentals › Enterprise Website Anatomy`. (`breadcrumbNode` already in schema lib.)
- **Prev / Next** chapter pager at page foot (sequential reading path through the cluster).
- **"Related guides"** block (3 cards) before the CTA — the internal mesh, descriptive anchors.

### How a contractor moves through it (the funnel-narrow path)

```
Home (broad: "your brochure is why you're stuck")
  → Guides pillar (picks their pain: "why does my worse competitor rank?")
    → reads the §4 cluster guide (ungated, full value)
      → mid-guide soft capture: "Email me this guide as a PDF" (1 field)
      → end-of-guide related links → §6 gap stat wall → "audit your own site"
        → /audit (interactive: enter your URL, see your gaps) ← the verify-it-yourself moment
          → result CTA: "This is what we fix → Apply"
            → /apply (qualify funnel) → /api/lead → CRM
```

Broad education at the top, one mechanism narrowing at each step, the apply funnel only at the bottom. The audit tool is the conversion hinge between "learner" and "lead."

---

## D. PER-PAGE SECTION OUTLINES (load-bearing pages)

### D1. HOME `/` — education-first, brochure-teardown (RESHAPE)

The reframe: GHL goes from *villain* to *one example of a brochure platform*. The enemy is the generic 5–10 page brochure site, whoever built it.

1. **Hero** (KEEP shell) — headline shifts from "WE MAKE KINGS / not a $297 brochure" toward the premise: **"Your website is the reason you're stuck at $1M"** / subhead: "A brochure describes your business. An authority site *is* a ranking and citation system. Here's the difference — audit it yourself." Dual CTA: `Read the Guides` (primary education entry) + `Audit Your Site`. Keep the crest + word-level TypeIn.
2. **The spine** (RESHAPE `ProblemReframe`) — **"A brochure DESCRIBES a business. An authority site IS a system."** (§1). The single clearest sentence on the site. Two stacked labels (Brochure / Authority) with the core contrast.
3. **The gap stat wall** (RESHAPE `MEASURED_GAPS` grid) — "The fundamentals most contractor sites are missing" (§6): ~96% no LocalBusiness schema, ~52% fail CWV, ~96% fail WCAG, 60% of SMBs no dedicated site. Relabel from "143 GHL sites" → "contractor sites." FlagChip on each.
4. **Query-surface math** (RESHAPE `ProofSpine` table) — "10-page brochure vs. authority system" (de-GHL the column header). 3-row side-by-side + the 13× relevancy stat. → links `/guides/why-a-brochure-cant-win`.
5. **The win-line** (KEEP `Dashboard`) — the #42→#4 organic climb chart. Caption ties to §8 compounding. ILLUSTRATIVE flag stays.
6. **The page-list-as-proof** (ADD, small) — the 6-trade page-count bar (roofing 147 … plumbing 300+). "This is what an authority build looks like." → `/guides/trades`.
7. **The OS moat** (KEEP `TheOS`) — 3 pillars + stack marquee.
8. **Verify with any AI** (KEEP `TrustMove`) — "audit my audit with any AI" → now also routes to `/audit`.
9. **One king per city** (KEEP `Selectivity`) — selectivity close + Apply.

Net: home leads with EDUCATION and the brochure-teardown; GHL is demoted to a footnote example; every section deep-links into the Guides cluster.

### D2. GUIDES PILLAR HUB `/guides` (ADD — the keystone)

A real 3,000-word+ pillar that is *itself* the proof of pillar-cluster done right. Practical resource-center layout, NOT editorial.

- **Page hero** — "The Contractor's Enterprise-Website Buyer's Guide. Everything that decides whether your site ranks — explained, with the gaps measured. Free, ungated, audit it yourself." Eyebrow: "A KING MAKER RESOURCE."
- **Sticky left-rail TOC** (scrollspy) listing all 13 topic-map anchors.
- **Section 0 — The premise** (200w) — why an enterprise site is the lever for $1M→$10M. Sets the frame.
- **Sections 1–13** — each topic-map section gets a ~150–250w *summary block* on the pillar (answer-first H2 + key stat + one visual) that **links down** to the full cluster guide. The pillar covers the whole topic at altitude; the cluster pages go deep. (This is the canonical pillar-cluster pattern.)
- **The gap stat wall** rendered in full here (§6) as the centerpiece visual.
- **"By trade" strip** — the 6 trade cards (§12).
- **The honesty layer teaser** (§13) → `/guides/the-honesty-layer`.
- **Interactive moment** — embedded "Audit your own site" mini-CTA → `/audit`.
- **Soft capture** — "Want this as a PDF? One field." (no wall).
- **End CTA** — `Apply` + `Audit your site`.

### D3. SAMPLE CHAPTER / GUIDE PAGE `/guides/why-your-worse-competitor-ranks` (§4) (ADD)

Template every cluster guide inherits:

1. **Breadcrumb** + **PageHero** (title + answer-first one-liner + FlagChip on the headline claim).
2. **Sticky TOC** (left rail / mobile accordion).
3. **Answer-first H2** — *"Why does a worse website outrank mine?"* → first sentence answers it (Speakable target): "Grandfathering — accumulated ranking signals over time, not domain age."
4. **The de-hype** — what grandfathering actually is vs. the myth (§13 honesty rail woven in: it is NOT "domain age").
5. **A visual** — the **compounding/momentum curve** (authority accrues vs. a static lead). Chart-library atom.
6. **"What this means for you"** — the practical takeaway block.
7. **Honesty callout** — what we WON'T claim here (FlagChip-styled aside).
8. **Related guides** (3 cards) + **Prev/Next** pager.
9. **Soft capture + end CTA** (`Audit your site` → `Apply`).

### D4. SAMPLE PER-TRADE PAGE `/guides/trades/roofing` (§12) (ADD)

1. Breadcrumb + hero: "What an authority roofing site looks like — 147 pages vs. a 10-page brochure."
2. **The page-count bar** (this trade highlighted within all 6).
3. **The multiplier explainer** — service × location matrix + portfolio depth = the page count. Visual: a small matrix grid.
4. **Anatomy list** — the page-types a roofing authority site ships (service pages, city pages, project pages, cost guides, material comparisons).
5. **The reference build** — Summit & Oak (the live 147-page roofer) → `/work`, "audit it yourself."
6. **Anti-doorway note** (§11) — these are real-job→page, not spun city pages (delete-the-city-name test).
7. Related trades + CTA.

### D5. SYSTEM `/system` (KEEP + extend)

- KEEP hero + thesis + 4-step `ARC` (Foundation / Prominence / Dominance / Expansion).
- **ADD: the anti-doorway explainer** (§11) — real-job→page, the delete-the-city-name test, "built ≠ reachable," verify-it-yourself. The process made legible.
- **ADD: "the site is the proof"** — this very site passes its own no-orphan/CWV/schema gates; here's how to check.
- Replace `ComingOnline` shell with the real process detail. End CTA `Apply`.

### D6. APPLY / QUALIFY FUNNEL `/apply` (KEEP UI + wire backend)

- KEEP `PageHero` + 3 qualifiers + `ApplyForm` (7 fields is fine HERE — this is BOFU, the user has self-selected; the no-wall rule applies to the *guides*, not the apply page).
- **Reframe the 3 qualifiers** toward education-first selectivity: "one king per city," revenue floor, readiness.
- **WIRE `/api/lead`** — the `TODO(phase-2)` CRM/n8n sink. Leads currently drop. Add the sink before launch (n8n MCP is available).
- Add a **light path** above the form: "Not ready to apply? Audit your site first →" `/audit` — so the funnel doesn't dead-end the not-yet-ready.

---

## E. LEAD FLOW (ungated value → soft capture → apply)

Three capture tiers, escalating commitment, value NEVER gated:

| Tier | Mechanism | Placement | Commitment |
|---|---|---|---|
| 0 — read | Full guide, free, no wall | every guide/chapter/trade | none |
| 1 — soft | "Email me this guide (PDF)" — **1 field**, inline-delivered | mid + end of each guide | 1 field |
| 1 — soft | Newsletter ("the buyer's-guide drip") — 1 field | footer + pillar | 1 field |
| 2 — interactive | **Audit your site** — enter URL → see your own gaps → email the report | `/audit`, header CTA, pillar, end-of-guide | URL + email |
| 3 — apply | Qualify funnel | `/apply`, every page's end-CTA | full form (BOFU) |

- **CTA-per-page rule:** every guide ends with `Audit your site` (tier 2) **then** `Apply` (tier 3) — low-commitment first. Home + pillar lead with `Read the guides` / `Audit`. Apply page leads with the form.
- **The verify-it-yourself moment = `/audit`.** This is the conversion hinge and the embodiment of "the site is the proof / audit it yourself." It can start as a guided self-audit checklist (no backend) and graduate to a real URL-scanner (Lighthouse/schema probe) — the interactive design moment the brief calls for. It's also the most natural tier-2 capture.
- Per the data: single-field soft gate recovers ~29% of abandoners and ungated content gets 62% more downloads — so the only "form" a researcher hits before BOFU is one field.

---

## F. INTERNAL-LINKING MESH + NO-ORPHAN

- **Pillar↔cluster:** `/guides` links down to all 13 sections + 6 trades; every cluster page links **back up** to `/guides` (breadcrumb + "part of the buyer's guide") and **sideways** to 3 related guides. Descriptive anchors, in-body, <100/page.
- **Home → cluster:** each home section deep-links its matching guide (spine→§3, gap wall→§6, query math→§3, win-line→§8, trades strip→§12). Home is a hub into the cluster, not a dead end.
- **Cross-axis link:** Playbook chapter 05 ("The Asset: Your Website") ↔ the entire `/guides` cluster. Playbook ch.03 ("Organic vs Map Pack") ↔ `/guides/organic-vs-paid`. The two chapter systems reinforce each other instead of competing.
- **No-orphan guarantee (≤2 clicks from home), three redundant paths:** (1) header Guides/Playbook dropdowns, (2) 4-column footer lists every guide + trade, (3) pillar + related-guides mesh. No page depends on a single JS-only path — footer links are static HTML for crawlers.
- **Self-test the doctrine:** run the same no-orphan BFS the site teaches (CLAUDE.md "built ≠ reachable") as a build gate. The site must pass its own audit — that's the proof.

---

## G. NEW COMPONENTS THE BUILDER MUST ADD (beyond the chassis, which is kept)

- `components/guide/StickyTOC.tsx` (scrollspy + mobile accordion), `GuideHero`, `RelatedGuides`, `ChapterPager`, `AnswerBlock` (answer-first H2 + Speakable wrapper), `SoftCapture` (1-field), `Breadcrumbs`.
- **`components/charts/`** chart library (generalize `Dashboard`'s SVG): `BarCompare` (query-surface, CPL-by-trade §7, the 6-trade page-count §12), `CompoundingCurve` (§8 organic-vs-flat-paid), `GapStatWall` (§6), `CWVGauge`, `RangeTable`/`MaterialCompare` (§9), `MatrixGrid` (service×location). Every chart carries a `FlagChip`.
- `components/audit/` — the interactive self-audit (checklist v1 → URL-scanner v2).
- **Content layer:** `lib/guides.ts` (slug → title/§/blurb/related), extend `lib/claims.ts` with every new taught stat + flag, extend `lib/sitemap-registry.ts`, add `articleNode` per guide to the @graph.

---

## H. WHAT TO REUSE VERBATIM (no redesign)

Design system (`globals.css` tokens, Archivo/Jakarta, gold-scarce, square corners, `.km-*`), motion (`motion.tsx`, word-level `TypeIn` = AI-legibility law), schema spine (`lib/schema.ts`), `FlagChip`+`lib/claims.ts` honesty pattern (the differentiator — every taught stat wears MEASURED/MODELED/ILLUSTRATIVE), Header/Footer/PageHero/Section/Button/Container shells, `ApplyForm` UI. **Build the library inside the existing look — do not restyle.** The constraint "practical not editorial" is already satisfied by the current premium-utilitarian system.

---

### Key honesty rails baked into the IA (load-bearing)

Lead with measured gaps; the gap stat wall is the home centerpiece. Frame stays "authority organic wins the considered research, the map pack catches proximity, ads catch emergency" — the `organic-vs-paid` guide concedes paid's role for emergency intent and **never** says "nobody clicks ads." Ranges not hype. The `/guides/the-honesty-layer` page (§13) actively debunks domain-age / DA-score / topical-authority-score / guaranteed-#1 — the credibility moat, and the reason a skeptical contractor trusts the rest.

---

**TL;DR for the builder:** Keep the chassis. Add `/guides` as the pillar-cluster keystone (9 fundamental guides + 6 trade pages, the 13-section topic map). Fill the existing `/playbook` 10 chapters (the parallel growth-narrative axis — cross-link, don't merge). Reshape Home + ProblemReframe + ProofBar + /work from GHL-teardown → brochure-teardown + education. Add the `/audit` interactive verify-it-yourself tool as the conversion hinge, the chart-library atoms, the sticky-TOC guide template, and the §13 honesty page. Wire `/api/lead`. Enforce the no-orphan ≤2-click rule via header dropdowns + 4-column footer + pillar mesh — and self-test it as a build gate, because the site passing its own audit IS the proof.

Sources:
- [NN/G — Table of Contents: The Ultimate Design Guide](https://www.nngroup.com/articles/table-of-contents/)
- [Search Engine Land — The complete guide to topic clusters and pillar pages](https://searchengineland.com/guide/topic-clusters)
- [niumatrix — How to Build Pillar Content (2026 Edition)](https://niumatrix.com/pillar-cluster-content-guide/)
- [Conductor — Topic Cluster and Pillar Page SEO/AEO Guide](https://www.conductor.com/academy/topic-clusters/)
- [Webstacks — Resource Page Design for B2B SaaS](https://www.webstacks.com/blog/resource-page)
- [Parallel — B2B UX Design: The Definitive Guide (2026)](https://www.parallelhq.com/blog/b2b-ux-design)
- [HubSpot — Gated vs. ungated content](https://blog.hubspot.com/marketing/ungated-content-free)
- [ProductLed — When you should ungate content](https://productled.com/blog/when-you-should-ungate-content)