# AGENT-WEBSITE-ENGINEER-20 — THE MABREY BUILD (first paying client)
### Authored by vault-agent (OS16), 2026-07-07 · Joseph's directive: WE20 runs this project from here
### Predecessor lane: WE17→WE19 ran Summit & Oak (WO_24-26). THIS brief is a NEW project. S&O work is DONE — do not touch it.

> **ON ARRIVAL:** (1) Reread this file in an ultrathink loop until a pass adds nothing new (min 3 passes — name what each pass added). (2) Fire `kmwe` (the preflight — gates, doctrine, playbook). (3) Check the blackboard mailbox (`node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer`). (4) Then EXECUTE §11 — the first moves are already decided; do not re-ask what to build. Present the first exemplar for Joseph's eyeball when it's on localhost.

---

## §0 · THE ONE-PARAGRAPH MISSION

Mabrey Roofing & Construction (Durham NC) is King Maker SEO's **first signed, paying client** — $497/mo CMO retainer (Joseph = CMO of the company; paid, live) + rev-share handshake. The deliverable you own: rebuild **mabreyroofing.com** as the enterprise organic engine on the S&O-derived template clone at `C:/Users/josep/Claude Gravity/mabrey-roofing/`. This is also **THE case-study asset** (the $1.8M→$10M documented growth story that sets Joseph's future pricing) — so honest counts, real data, and instrumented receipts are part of the product, not garnish. Sean Mabrey is an S-tier closer; **calls are the deliverable**; the site's job is to generate them.

## §1 · THE CLIENT (verified facts — build on these, never on the template's demo data)

- **Business:** Mabrey Roofing and Construction · **519 Valleymede Dr, Durham, NC 27713** · (919) 795-6983 · mabreyroofing.com · place_id `ChIJzbbagsPprIkRUsu85siHETo` · GBP pin (35.882, -78.932) — south Durham near RTP/Southpoint (the Raleigh-facing edge; Cary/Morrisville/Apex are in genuine pack reach).
- **ONE office. NO Raleigh location.** ⚠️ This corrects the master plan's assumption. Never imply a Raleigh office anywhere — copy, schema, footer, anywhere. A Raleigh L2 office is a FUTURE roadmap item that happens only if Sean physically opens one.
- **GBP:** primary category "Roofing contractor" (clean) · **4.4★ / 16 reviews** (13×5star) — real numbers, used honestly in schema; the review-velocity SOP grows them. Known GBP issues (week-1 cleanup on Joseph's Manager access, NOT yours to edit): two phone numbers in circulation ((919) 795-6983 primary · (919) 823-6080 legacy — site uses 795-6983 ONLY), 61 auto-populated services entries incl. non-roofing (flooring/painting/"Replacement Replacement").
- **Owner:** Sean Mabrey. Real backstory (E-E-A-T gold, confirmed): U.S. Navy veteran (supported Marine Corps EOD), former cardio-thoracic ICU nurse (Duke + UNC), built a thirty-officer mortgage firm, then roofing/construction. **Veteran-owned = real + load-bearing.**
- **Revenue reality: ~$1.8M/yr (~15-19 jobs/mo)** — Joseph's field correction, supersedes every $5-7M figure. The believability gate runs on this.
- **He is ALSO a licensed general contractor** (additions, outdoor structures — not interior remodels). Strategy for that is LOCKED in §4.3.
- **Market:** ~10,000/mo money-term roofing searches (Durham+Triangle, from the audit). Fragmented pack: leader Chapel Hill Roofing Solutions holds top-3 at just 11/49 with 58 reviews. Mabrey baseline: SoLV 6.1%, top-3 at 3/49 (Local Falcon report_key `93f559a5eabc46c` — "roof replacement", 7×7 @ 7mi, the recurring case-study grid).

## §2 · THE REPO — state + contamination map

`C:/Users/josep/Claude Gravity/mabrey-roofing/` — Next.js App Router, full clone of Summit & Oak (source repo: `summit-oak-roofing/` @ `so-visual-pass`, local-only, your visual reference for how blessed sections render). ~36 routes ALL exist already (home, about, services/[service], storm-damage/[type], locations/[city](/[sub]), materials, brands, commercial-roofing, financing(+payment-calculator), resources(+glossary), blog, projects, gallery, reviews, review, faq, warranty, certifications, contact, roof-cost-calculator, roofing-cost, service-areas, privacy/terms, es/ Spanish). Content lives in `lib/` (the template law: **content in lib/, NEVER edit components/ to rebrand**).

**Already Mabrey'd (done, verify don't redo):** `lib/business.ts` (NAP, OWNER block), `lib/site.config.ts` (SITE_URL, GEOGRAPHY block — needs the §4.2 17-town update), `lib/schema.ts` (RoofingContractor subtype; location nodes use areaServed + parentOrganization + the one real office — the verified-safe pattern; leave the architecture alone).

**S&O CONTAMINATION (grep counts, kill-list — mechanical name-swaps):** cities.ts 57 · trust.ts 35 · services.ts 32 · es/content.ts 20 · materials.ts 12 · articles/local.ts 12 · articles/blog-posts.ts 11 · commercial.ts 10 · brands.ts 9 · about/page.tsx 9 · storm.ts 8 · articles/decision.ts 8 · articles/replacement.ts 7 · snippet-tables.ts 6 · warranty/page.tsx 6 · reviews/page.tsx 6 · articles/materials.ts 5 · projects/page.tsx 5 · articles/storm.ts 4 · terms, review, privacy-policy, gallery, contact, certifications pages ~4 each · **app/locations/[city]/page.tsx:21 hardcodes "Summit & Oak Roofing" in the metadata title** (the worst leak — cross-client footprint signal). Swap patterns: "Summit & Oak Roofing"/"Summit &amp; Oak"/"Summit & Oak" → Mabrey equivalents; then grep-verify zero matches for `summit|oak` (watch false positives: "oak tree" in housing-stock copy is legitimate — read matches, don't blind-sed).

## §3 · TRUTH-CRITICAL SURGERY (NOT name-swappable — the honest-counts floor)

These files carry content that is FABRICATED or S&O-TRUE-ONLY. On the first client's site, under Joseph's CMO name, nothing fabricated ships. The template is empty-guarded everywhere (`.length > 0` — verified), so **emptying an array is always safe and renders clean.**

1. **`lib/reviews.ts`** — explicitly "fabricated-but-realistic DEMO" reviews (already Mabrey-named, which makes them MORE dangerous — they read real). **Empty the REVIEWS array.** The real aggregate (4.4/16) lives in BUSINESS for schema. Real GBP review texts are a pending intake item (§8) — they get added when Joseph pulls them.
2. **`lib/trust.ts`** — S&O's team (Travis, Renee — real S&O people, wrong company), fake hyper-detailed case studies, S&O credential set. **Surgery:** owner block → Sean (from `business.ts` OWNER); cut the team members (pending intake); empty the case-studies array (they're the "real job → page" primitive — they fill from Sean's paper file); credentials → only verified facts (veteran-owned ✅, licensed NC GC ✅, 15+ years [confirm §8]).
3. **`lib/cities.ts` per-city `localProjects` + `localReviews`** — fabricated per-town jobs/reviews. **Empty both arrays in every city entry.** The REST of each entry (permitAuthority, permitNote, stormHook, housingStock, neighborhoods, localConsiderations, faqs) is real local-substance content that survives with the name swap — that's the unique-per-town content doing its job. KEEP it.
4. **`lib/brands.ts` + all "GAF Master Elite" claims** — ⚠️ **UNVERIFIED for Mabrey.** `business.ts` carries "GAF Master Elite" in description/credential/stats — the file header admits it's demo framing. **Strip every cert claim to REAL-OR-ABSENT** until Sean confirms his actual manufacturer standing (§8). Brand/material PAGES can stay as informational content ("systems we install" framing) without certification claims.
5. **`lib/business.ts` details to fix:** `googleReviewUrl` has `PLACE_ID_PLACEHOLDER` → real place_id `ChIJzbbagsPprIkRUsu85siHETo` · `geo` (35.9051,-78.9578) → GBP pin (35.882,-78.932) · `legalName` "…Services, LLC" = unconfirmed (§8) · `stats` block = confirm each (§8). Street shows "519 Valley Mede Dr" vs GBP "519 Valleymede Dr" — match the GBP spelling exactly (NAP consistency).
6. **`app/es/` Spanish pages** — same fabrication rules apply in Spanish. Same surgery.

## §4 · LOCKED STRATEGY (decided with Joseph — EXECUTE, never relitigate, never re-explain)

⚠️ **Joseph's hard rule (2026-07-07, twice-flagged):** settled doctrine — duplicate content, doorway, dilution, real-vs-fabricated, the picks below — is the FLOOR you build on. Do NOT re-surface it, caveat it, or teach it back to him. If a verification confirms known doctrine, say "confirmed" and move on. He picks; you build. Raise something ONLY if it's genuinely new information or a true conflict with a lock.

1. **~95% pure roofing site.** The audit's Finding D (identity dilution across trades) is the disease being cured — the site reads, completely and unambiguously, "roofer."
2. **17 location pages, ALL built now** (he genuinely serves them all; all go on the GBP service area): **Durham (office anchor) · Chapel Hill · Cary · Morrisville · Apex · Hillsborough · Raleigh · Wake Forest · Holly Springs · Fuquay-Varina · Pittsboro · Garner · Knightdale · Zebulon · Clayton · Wendell · Rolesville.** `lib/cities.ts` has 14 — **you write chapel-hill, hillsborough, pittsboro** to the exact existing entry schema, same depth (real permit authority, real storm/housing context, neighborhoods, FAQs; empty localProjects/localReviews like the rest). Update `site.config.ts` GEOGRAPHY.cities to the 17 slugs. Duplicate the STRUCTURE, write unique CONTENT per town — that's the whole game on these.
3. **General-contractor work = one small contained "Other Services" section.** 1-3 pages max, NOT interlinked into the roofing silo beyond nav, NOT chasing GC keywords — pure cross-sell awareness ("we also build additions & outdoor structures"). A dedicated GC site is PARKED as Phase 2 (Sean's call, later). Do not build custom-home/GC content beyond this section.
4. **Location pages ship WITHOUT proof modules** (empty-guarded) — real jobs/reviews are an UPGRADE Joseph adds as he digitizes Sean's paper customer file (500-1000 records; even 2-3 jobs per town lights the modules up). **NEVER fabricate a job, review, testimonial, or cert — FTC floor + the client's actual name.** Obviously-fake `SAMPLE — do not ship` dummies are fine on localhost only.
5. **One office = Durham pack + organic everywhere else.** The far towns are won on organic location pages; that's the plan working as designed, not a gap to fix.
6. **Client-facing numbers = MODEL.md** (`~/.claude/skills/km-engine/MODEL.md` — the law): conversion 5-7% (10% = stretch only) · single metric floor 0.75% / headline "1-2%" / upper ~2% · money-term denominators only · week-1 = "foundation, zero leads" honesty · 3/6/12-mo ramp framing. The live audit page (kingmaker-seo-audit.vercel.app/mabrey-roofing) is the client-facing source of truth. Master plan (`king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md`) is v1.2-reconciled but **§8's chains still run pre-correction math — never quote §8 to anyone.**
7. **AI-GEO layer:** per `king_maker_outbound/W-AI_GEO_PLAYBOOK.md` — SSR non-negotiable (the template already is), `.seo-answer` extraction blocks, Bing bootstrap at launch, NO llms.txt, schema = insurance never a promised lever.
8. **Off-page** (Joseph's lane, but your pages are its targets): GBP → reviews → citations-hygiene sequencing; review flow per `king_maker_outbound/MABREY_REVIEW_SOP.md` (ask-everyone/gate-no-one — governs any review widget/flow you build).

## §5 · THE BUILD SEQUENCE (Joseph's stated plan — follow this shape)

**Phase A — the ONE-PAGERS (now):** stand up every singular page to blessed quality, one at a time, Joseph eyeballing each on localhost: Home · About (Sean's real story — the veteran-owned through-line) · ONE exemplar service page (pick roof-replacement — the money page) · storm-damage hub · service-areas hub · services hub · financing (+payment-calculator) · FAQ · contact · warranty · certifications (real-or-absent!) · commercial-roofing · gallery (pending real photos — honest placeholder state) · reviews (real aggregate, empty cards pending texts) · roof-cost-calculator + roofing-cost · Other Services (the contained GC section — likely a new simple route or repurposed page) · privacy/terms (name-swap grade) · es/ pages.
**Phase B — extend the families:** once an exemplar is blessed, roll its structure across the rest (all services/[service], all storm-damage/[type] incl. insurance-claims content, locations/[city] × 17, materials, resources articles one-by-one).
**The forge loop governs:** exemplar → Joseph's eyeball → capture the pattern → judgment-zero rollout. First location exemplar target: **Cary** (already agreed).

## §6 · OPERATING DISCIPLINE (how to work — this is the part handoffs lose)

- **Density Era doctrine (`KINGMAKER_DESIGN_DOCTRINE.md`, kmwe auto-loads):** §6 is YOUR operating contract whatever model you run — maximal-draft, 90-110% over-poured, empty space is a bug, first workable option on edits (30-60s), NO option surveys, batch-verify every 3-5 edits, show heavy — **only Joseph trims.** Proposing the minimal "safe" version first = you already failed. Transplant blessed sections via `vault/component-library/PLAYBOOK.md` (zero-search: grepping the repo for a section = you skipped the playbook); the S&O live site + `vault/component-library/INDEX.md` are the saturation reference.
- **Floors that never move:** a11y (axe 0 serious under reduced-motion — it races framer-motion reveals otherwise) · honest counts · real-or-absent trust signals · NC insurance-copy compliance (no "$0 deductible", no public-adjuster framing) · `.seo-answer`/heading extraction · money-copy readability.
- **Joseph calibration:** caveman TLDR bullets · moderate emoji (✅/❌/👍/⚠️/🔴), NO exclamation points · "ultrathink" is his depth keyword · directional-intensity instructions ("300% denser", "half the motion") are his ideal input — honor the % exactly · deploy ONLY on his explicit GO (localhost → eyeball → ship) · fix-format = hyperlink + Was/Fix every time · never re-explain settled doctrine (§4 preamble) · he model-switches constantly — never inflate the model you run on.
- **Verification:** `pnpm exec tsc --noEmit` + `pnpm build` after each batch; Playwright/preview DOM probes for visual checks (no inline screenshots into chat — capture to disk; Joseph eyeballs localhost himself). ⚠️ The verify-gate Stop hook auto-discovers `worktrees/*/web` — `mabrey-roofing/` is likely NOT guarded; the gates are discipline here, not hooks. Run them anyway.
- **Blackboard:** you are `website-engineer`. Check mail on arrival + after each work unit; `ack` what you handle; NEVER touch `human`. vault-agent (OS16) is fleet coordination — route cross-lane questions there.
- **Mode D:** durable decisions/learnings → vault (`vault/inbox/` or wiki) before session end.

## §7 · TOOLING + DEPLOY

- Dev: `npm run dev` (check package.json scripts; template convention is Next dev on :3000 — run ONE server, background, `WATCHPACK_POLLING=true` on Windows).
- Deploy: Vercel CLI pre-authed (account josephspells-2634) — `npx vercel@latest deploy --prod --yes` from the repo root. **⚠️ mabreyroofing.com DNS currently points at Sean's OLD WordPress site. Do NOT touch the domain — build phase deploys to the *.vercel.app URL only; DNS cutover is a Joseph+Sean GO decision at launch.** CLI v54 prints a JSON-fragment tail that looks broken — it isn't; verify by curl on CONTENT markers (the PROD-STALE trap).
- Playwright is in the template (`tests/`); extend per new sections. DataForSEO/Local Falcon MCPs exist for data pulls (scans cost credits — Joseph authorizes).
- The es/ locale, sitemap-registry, doorway-gate.ts, security.ts (CSP), lead API (`/api/lead` posts same-origin; CRM webhook stays server-side) are template systems that WORK — understand before touching, don't rebuild.

## §8 · PENDING INTAKE (Joseph is getting these from Sean — build empty-guarded, never blocked, never fabricated)

1. Real completed-jobs list per town (from the 500-1000-customer paper file; 2-3 per town lights up location proof modules; name mismatches get edited to REAL names — first name + last initial only).
2. Real GBP review texts (the 16) for the reviews widget/cards.
3. Cert/manufacturer standing (GAF anything? Owens Corning? — until confirmed, real-or-absent).
4. legalName exact wording · years in business · team member names/roles · license number.
5. Real photos: jobs, crew, office, Sean (gallery + per-town heroes; Higgsfield generation is a fallback for non-proof imagery only — never for "our work" claims).
6. Sean's answers on the "replace my other services" list (Joseph mapping absorb-vs-leave — informs Other Services + integrations).

## §9 · DO-NOT LIST (each one is a landmine that's already been stepped on once)

- Do NOT fabricate reviews/jobs/certs/team members (FTC + first-client trust — the demo data in the clone is exactly this; §3 kills it).
- Do NOT imply a Raleigh office or fake ANY location presence.
- Do NOT touch mabreyroofing.com DNS.
- Do NOT ship S&O identity anywhere (metadata titles included).
- Do NOT quote master-plan §8 numbers to anyone.
- Do NOT build GC/custom-home content beyond the contained Other Services section.
- Do NOT edit components/ to rebrand (content → lib/).
- Do NOT re-explain settled doctrine to Joseph or caveat decided strategy.
- Do NOT deploy without his GO; do NOT claim done without the gates run.

## §10 · FILE MAP (read-order for orientation)

| What | Where |
|---|---|
| THIS brief | `C:/Users/josep/Claude Gravity/AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` |
| The repo you own | `mabrey-roofing/` (cgrav root) |
| Design law + playbook | `KINGMAKER_DESIGN_DOCTRINE.md` · `vault/component-library/PLAYBOOK.md` + `INDEX.md` |
| Client-facing numbers law | `~/.claude/skills/km-engine/MODEL.md` |
| Master plan (v1.2 banner governs) | `king_maker_outbound/MABREY_ROOFING_MASTER_PLAN.md` |
| Live audit (client sees this) | kingmaker-seo-audit.vercel.app/mabrey-roofing · repo `kingmaker-seo-audit/mabrey-roofing/` |
| Review SOP (governs review UX) | `king_maker_outbound/MABREY_REVIEW_SOP.md` |
| AI-GEO build layer | `king_maker_outbound/W-AI_GEO_PLAYBOOK.md` |
| Visual reference (the source site) | `summit-oak-roofing/` @ so-visual-pass (local-only) + summit-oak prod URL |
| Fleet bus | `blackboard/bb.mjs`, handle `website-engineer` |

## §11 · FIRST MOVES (decided — execute on arrival, then present for eyeball)

1. `kmwe` preflight → scorecard.
2. **The S&O kill-pass:** name-swaps across the §2 list (read matches — no blind sed) + fix `app/locations/[city]/page.tsx:21` metadata. Grep-verify zero `summit` remains (except legitimate "oak tree" prose — read those).
3. **The §3 truth surgery:** empty fabricated arrays, strip unverified certs, fix business.ts details (place_id, geo, street spelling).
4. **cities.ts:** write chapel-hill + hillsborough + pittsboro entries (full depth, unique local substance) + align GEOGRAPHY.cities to the 17.
5. `tsc --noEmit` + `pnpm build` green.
6. **Forge exemplar #1: the Home page content pass** (Mabrey-true, density-first), then **roof-replacement service page**, then **Cary location page** — one at a time onto localhost for Joseph's eyeball. STOP after each for his trim pass. That cadence IS the project from here.

*Welcome to the first client, WE20. The machine is verified, the strategy is locked, the client is paying. Build heavy, show Joseph, ship on GO.* 🔨
