# KING MAKER FIRM SITE — WORK ORDER 03

*The blue/white READABILITY redesign. Architect: WE14 · 2026-06-26 · Builder: **FRESH / COLD** (the prior builder hit max context). Continues `king-maker-site/`. Lineage: KM_SITE WO_01 → 02 → **03**.*

> **The pivot (Joseph, 2026-06-26):** the black-gold brand is OUT, and even the current light-cream-+-gold reads better but isn't the answer. Go **straight blue + white**, logo blue, and make the ENTIRE site **maximally readable** — this is a dense, text-heavy education/buyer's-guide platform for **50–60-year-old contractors who don't want to be on a computer**. Readability is the #1 objective, mobile most of all. *(Pre-market, latest direction wins — the prior "locked" gold brand is superseded, no relitigating.)*

---

## 0. WHAT THIS IS
A re-skin + readability overhaul of the existing firm site (`C:/Users/josep/Claude Gravity/king-maker-site/`, live `https://kingmaker-firm.vercel.app`). The IA, content, schema, and components built in WO_01/02 STAY — this WO changes the **palette (gold → blue), the type/readability system, the guide structure (simplify + question-frame), and runs ONE home-page card experiment.** It does NOT rebuild the site. Builder is FRESH (cold) — full reread + a live readability audit before editing.

## 1. THE PRINCIPLE / LENS — "MAXIMUM READABILITY"
The reader is a **50–60-year-old contractor**, not a designer — he's skimming dense material he'd rather not read, often **on a phone**. Every decision optimizes for: *can he read this comfortably, scan it fast, and get the point without effort?* Readability beats cleverness, beats density, beats "editorial." High contrast, generous size, short chunks, bullets, plain English, big tap targets. When in doubt: **bigger, simpler, more whitespace, fewer words.** Mobile is the primary test surface, not an afterthought.

## 2. THE PALETTE PIVOT — BLUE / WHITE (replace gold entirely)
Swap the `globals.css` `@theme` block from the gold-on-cream system to a clean, high-contrast **blue-on-white** system. Gold is GONE (no gold anywhere — not as fill, text, hairline, or glow). Keep square corners + the two-font system.

**Tokens (premium, accessible — all AA/AAA on white; tune the exact blue at the checkpoint):**
- `--bg #ffffff` (white canvas) · alternating sections may use `--bg-tint #f8fafc` (faint cool) — NOT warm cream.
- `--surface #ffffff` (cards) · `--surface-2 #f1f5f9` (raised panel) · `--surface-3 #e2e8f0`.
- `--line #e2e8f0` (slate-200 borders) · `--line-soft #eef2f6`.
- `--ink #0f172a` (slate-900 — body + headings, ~16:1, AAA = max readable) · `--muted #475569` (slate-600, ~7.5:1 AA) · `--dim #64748b` (slate-500, ~4.8:1 AA).
- **`--blue #1d4ed8`** (blue-700 — the BRAND/primary; heading accents, the logo, link text [~6.3:1]) · **`--blue-action #2563eb`** (blue-600 — CTA *fills*, white text on it) · **`--blue-deep #172554`** (blue-950 — dark nav/footer, deepest brand) · `--blue-tint #eff6ff` (blue-50 — faint highlight wash / the "you/winning" data fill) · `--blue-100 #dbeafe`.
- Error only: `--red #dc2626` (replaces terracotta). No other accent hues.

**Discipline:** blue = brand + action + the "you / organic / winning" data series. **Slate carries ALL text; white / faint-blue carries surfaces.** Blue is more liberally usable than gold was (blue-on-white is readable), but reserve the brightest **`--blue-action`** for CTAs + links so they pop. One restrained tint wash per section max — no gradient/glow soup.

**Logo:** re-color the KM crest to blue (`--blue` / `--blue-deep`). Generate `km-mark-blue.svg` (+ reversed white-on-blue for the dark nav/footer). Favicon + OG updated.

## 3. THE READABILITY SYSTEM (the heart of this WO)
Codify in `globals.css` + apply site-wide; **test every change on a 390px mobile viewport.**
- **Body up to 17px** (from 16), **line-height 1.7**. Mobile never below 16px. Generous paragraph spacing (18–22px).
- **Prose measure ~40rem (~62–68ch)** — comfortable, not wide.
- **Break the walls of text:** short paragraphs (2–3 sentences MAX), **bullets wherever a list is implied** (Joseph: "turn it into bullets"), a subhead every ~2–3 paragraphs, **answer-first** (each section opens with the one-sentence takeaway), `KeyTakeaway` callouts, comparison **tables** for any "X vs Y," generous whitespace between sections.
- **Plain English, the contractor's words.** Cut jargon ("topical authority," "the Verification Stack") → benefit language. Shorter sentences. Fewer words.
- **Headings readable, not oversized:** h1 `clamp(1.9rem,4vw,2.7rem)`, h2 `clamp(1.4rem,2.4vw,1.85rem)`, h3 ~1.2rem. Strong weight + blue accent, not giant.
- **MOBILE-FIRST (the priority):** on a phone the guides currently read as walls of text — fix that. Comfortable size + spacing, single readable column, no dense multi-col that collapses to a wall, the TOC as a collapsible "On this page" jump-list, big tap targets (≥44px), sticky simple header. A contractor must be able to read + scan any guide one-handed on a phone.

## 4. THE GUIDES RESTRUCTURE (simplify + question-frame — all 11 + the new one)
**(a) Reframe every guide title as the question a contractor actually asks** (keep the slug/redirect; change the displayed title + the H1). Proposed (tune copy in Roark-plain voice):
- `enterprise-website-anatomy` → **"What is an enterprise website — and why a 5-page site can't compete?"** (combines §2 + the brochure point; Joseph: don't over-focus the standalone five-pager).
- `how-google-picks-the-winner` (too vague) → **"Do I even need a website if I'm on Google?"** (the GBP-relevance question — how the website + Google Business Profile work together, why the site is what makes you rank/convert).
- `why-a-brochure-cant-win` → **"Why isn't my website getting me leads?"**
- `why-your-worse-competitor-ranks` → **"Why does my competitor's worse site outrank me?"**
- `the-gap-most-sites-have` → **"What's missing from most contractor websites?"**
- `organic-vs-paid` → **"Should I pay for ads or rank on Google?"**
- `your-site-is-an-asset` → **"Is my website an expense or an asset?"**
- `what-good-content-gives-buyers` → **"What should my website actually say?"**
- `winning-the-ai-answer` → **"How do I show up in ChatGPT and AI search?"**
- `the-honesty-layer` → **"How do I spot a bad website company?"**
- `your-site-is-an-asset`/trades index stays the per-trade proof.
**(b) Rewrite EVERY guide body for max readability** (§3): answer-first opener, short chunks, bullets, sub-heads, a comparison table or `KeyTakeaway` per section, plain English, mobile-tested. Same facts + the FlagChip honesty discipline — just readable. The current guides are accurate but dense; this is a readability rewrite, NOT a fact change (preserve the WO_02 honesty corrections + sources).
**(c) ADD the flagship pricing guide — see §6.**

## 5. THE HOME PAGE — readability + ONE agency-card EXPERIMENT
**Default: keep the home as-is structurally** (Joseph's "I'm digging the simplified cards") — just (a) re-skin to blue/white, (b) apply the readability system, (c) **scan every section for readability wins and apply them** (tighten copy, break walls, bigger type where dense). DO NOT clutter it, DO NOT over-redesign it.

**THE EXPERIMENT (one section only):** take the **system cards** — `components/home/TheOS.tsx` (the 3 pillars: Operating System / Verification Stack / Proof Layer) — and rebuild them **over-the-top, premium-AGENCY style**: bold, high-production, confident, but **maximally readable + contractor-first**. Translate the jargon to benefit language (e.g. "The Verification Stack" → "Tested on every page before it ships"), lead each card with a strong benefit headline + scannable bullets + a proof point, give them visual production (a blue icon/number anchor, generous padding, a subtle shadow/lift, a blue top-accent) — **agency energy, NOT cluttered.** This is a deliberate experiment so Joseph can SEE the over-the-top-agency direction on one section and decide to scale it up or back. Keep the rest of the home on the readability default. *(If Joseph meant the "Ten pages, or a system" `ProofSpine` section instead, it's a one-line target swap — TheOS is the primary target as the most card-like + "the system.")*

## 6. THE FLAGSHIP PRICING GUIDE — "How much should a contractor website cost?"
A new fundamental guide (`/guides/what-should-a-website-cost` or similar) that ARMS the buyer (consumer-advocate doctrine — arm them to investigate ANY provider, including us). The structure (ultrathink'd past "$297 done well vs done poorly"):
- **The price-tier reality** as agency-style **pricing-tier cards** (a SaaS-pricing-table treatment, blue/white): what each tier ACTUALLY gets you in the market vs what it SHOULD —
  - **~$97/mo "website"** = a 5-page template brochure. Looks okay, ranks nowhere.
  - **~$297/mo "SEO"** = what MOST agencies deliver (a brochure + a couple blog posts = "**$297 done poorly**") vs what $297/mo SHOULD buy you (**$297 done well** = dedicated **service pages + location pages + industry-specific pages** — real structure).
  - **Enterprise (what a ranking system is)** = the full 130+ page structure that actually ranks.
- **The "what your money should buy" checklist** per tier (so he learns to DEMAND structure, not just pay more).
- **The side-by-side of two $297/mo sites** (brochure vs system) — the killer frame: the SAME price buys a brochure at most shops vs a real structure. The lesson: *it's not about paying more, it's about what you demand for the money.*
- Honest rails: ranges not promises; "you can't get an enterprise system for $97/mo — here's what's realistic at each price." This guide doubles as the clearest expression of the agency-card direction (the pricing cards).

## 7. PRESERVE / DON'T-BREAK
🔒 The **IA + routes + content** (WO_02 — the /guides cluster, /playbook, /work, /system, /apply, /audit, /glossary, /firm; the 13-section topic map). 🔒 The **schema @graph + llms.txt + SSG** + **technical-SEO-as-proof** (the site still passes its own audit). 🔒 **AI-legibility = word-level heading reveals** (never per-letter; keep the heading-legibility spec green). 🔒 The **FlagChip honesty discipline + the WO_02 honesty corrections** (the corrected stats: ~27% no-site, the AEO reframe, etc. — readability rewrite must not reintroduce a debunked stat). 🔒 The **two-font system** (Archivo display + Plus Jakarta body) — keep, just re-skin color; the scoped mono stays for FlagChip/tokens. 🔒 The **security layer** (`app/api`, `lib/server`, `next.config`, `scripts/security-audit` — `cyber-security-specialist-1` owns it; don't clobber). 🔒 **The new palette must hit AA everywhere** (the whole point is readability — verify contrast).

## 8. BUILD PHASING (cold builder) + checkpoint
- **STEP 1 — absorb** (full reread: this WO + the WO_02 companions for context + the codebase) + **audit the live site for readability** (every page type, desktop + 390px mobile) — find the worst walls of text.
- **Phase A — foundation:** the blue/white palette in `globals.css` (replace gold) + the logo blue + the readability type system (17px/1.7, the scale, the mobile rules). Re-skin the shared shell (Header/Footer/Section/Button/cards).
- **Phase B — the design-direction CHECKPOINT (🛑 HARD STOP):** with the palette + readability foundation live + the **TheOS agency-card experiment** built + the **Home** re-skinned + **ONE guide** rewritten for readability (pick a dense one), **deploy + report for Joseph's eyeball.** He's choosing a new brand color + reacting to the agency-card experiment — do NOT roll the new look across all 30+ pages until he approves the direction.
- **Phase C — roll-out (after his go):** the readability rewrite across all 11 guides + the pricing guide (§6) + the playbook/trades/work/system/apply/etc., all mobile-tested.
- **Phase D — verify + deploy + report.**

## 9. VERIFICATION GATES (all green before "done")
`tsc` 0 · `next build` all SSG · Playwright desktop **+ mobile (390px)** axe **0 serious + contrast AA verified** (readability = the point) · heading-legibility spec green · **mobile readability pass** (every guide readable/scannable one-handed at 390px — vision pass) · the FlagChip/claims grep (no debugged stat reintroduced, no gold tokens left) · pixels vision pass (blue/white premium + readable, the agency-card experiment reads "agency not cluttered") · deployed-render + reachability 0 orphans.

## 10. OPEN FLAGS / DECISIONS (defaulted — Joseph vetoes at the checkpoint)
1. **The exact blue** — defaulted to a premium blue-700 brand / blue-600 action (§2). He sees it live at the checkpoint + tunes the shade.
2. **Agency-card experiment target = TheOS** (the system pillars). Veto → ProofSpine ("Ten pages, or a system") instead.
3. **Gold fully removed** (he said "straight up blue and white"). Veto → keep a gold trace.
4. **Guide titles** — proposed question-framings (§4a); he tunes copy at the checkpoint.
5. **Mono font** stays (scoped to FlagChip/tokens) — neutral on blue/white; veto if he wants it gone.

---
*— WE14, 2026-06-26. KM_SITE WO_03: blue/white, maximum readability, for the 50–60yo contractor on a phone. Re-skin + readability overhaul, NOT a rebuild. Fresh/cold builder. Phase A palette+readability → 🛑 Phase B checkpoint (palette + the TheOS agency-card experiment + Home + 1 guide → Joseph's eyeball) → Phase C roll-out (all guides readable + the pricing guide) → verify. PRESERVE the IA/schema/AI-legibility/honesty/security. Readability is the gate. Joseph's eyeball is the final word on the blue + the agency direction.*
