const fs = require('fs');
const ROOT = 'C:/Users/josep/Claude Gravity/';
const d = JSON.parse(fs.readFileSync(ROOT + 'ultra-research/km-organic-result-final.json', 'utf8'));
const DATE = '2026-06-24';

const cell = s => (s == null ? '' : String(s)).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
const vtag = v => ({ survived: 'survived', corrected: 'CORRECTED', flagged: 'flagged', killed: 'KILLED' }[v] || v);
const byId = id => d.pillars.find(p => p.id === id) || { section: '', whatNotToOversell: [] };
const pillarBlock = id => {
  const p = byId(id);
  const guards = (p.whatNotToOversell || []).map(x => '- ' + x).join('\n');
  return (p.section || '') + (guards ? '\n\n**Pillar guardrails — what NOT to oversell:**\n' + guards + '\n' : '');
};

// ---- thesis verdict ----
const t = d.thesis || {};
const thesisBlock = `## B.0 VERDICT: **${t.verdict || '—'}**

**Confidence:** ${t.confidence || ''}

**Bottom line:** ${t.bottomLine || ''}

**The honest infiltration shape (floor/ceiling — MODELED, claim the shape never a count):** ${t.floorCeiling || ''}

**The two execution conditions:**
${(t.conditions || []).map(c => '- ' + c).join('\n')}

**Honesty corrections a skeptic forces (load-bearing):**
${(t.honestyCorrections || []).map(c => '- ' + c).join('\n')}`;

// ---- ranked levers ----
const L = d.levers || {};
const leverRows = (L.levers || []).map(x => `| ${x.rank} | ${cell(x.name)} | ${cell(x.oneTimeOrOngoing)} | ${cell(x.impact).slice(0, 220)} | ${cell(x.effort)} | ${cell(x.dofollowEquity).slice(0, 140)} | ${cell(x.weShipOrClientOperates).slice(0, 140)} | ${cell(x.confidence)} |`).join('\n');
const leversTable = `| # | Lever | One-time? | Impact | Effort | Link equity | We ship / client | Conf |\n|---|---|---|---|---|---|---|---|\n${leverRows}`;
const topThree = (L.topThree || []).map((x, i) => `${i + 1}. ${x}`).join('\n');
const excluded = (L.excluded || []).map(x => '- ' + x).join('\n');

// ---- claim library (75 verdicts; corrected text wins) ----
const verdicts = (d.verdicts || []).slice().sort((a, b) => (a.claimId || '').localeCompare(b.claimId || '', undefined, { numeric: true }));
const clRows = verdicts.map((v, i) => {
  const claimText = (v.verdict === 'corrected' && v.correctedText) ? v.correctedText : v.claim;
  return `| ${i + 1} | ${v.pillarId} | ${cell(claimText).slice(0, 300)} | ${cell(v.source_type)} | ${vtag(v.verdict)} | ${cell(v.finalConfidence)} | ${cell(v.measured_or_modeled)} | [src](${cell(v.source_url)}) |`;
}).join('\n');
const claimLib = `| # | Pillar | Claim (corrected text where verification corrected it) | Source type | Verdict | Conf | M/M | Source |\n|---|---|---|---|---|---|---|---|\n${clRows}`;

// ---- verification corrections (non-survived) ----
const nonSurv = verdicts.filter(v => v.verdict !== 'survived');
const corrNotes = nonSurv.map(v => {
  const corr = (v.verdict === 'corrected' && v.correctedText) ? `\n  - **Corrected to:** ${cell(v.correctedText).slice(0, 360)}` : '';
  return `- **[${vtag(v.verdict)}] ${v.claimId} (${v.pillarId})** — *original:* ${cell(v.claim).slice(0, 170)}\n  - **Signal:** ${cell(v.externalSignal).slice(0, 300)}${corr}\n  - Final confidence: ${cell(v.finalConfidence)}`;
}).join('\n');

// ---- guardrails ----
const g = d.guardrails || {};
const never = (g.neverClaim || []).map(x => '- ' + x).join('\n');
const say = (g.sayInstead || []).map(x => `| ${cell(x.ofClaiming)} | ${cell(x.instead)} |`).join('\n');
const guardBlock = `**Never claim**\n\n${never}\n\n**Say instead**\n\n| Instead of claiming... | Say... |\n|---|---|\n${say}\n\n**FTC / defensibility posture**\n\n${g.ftcPosture || ''}`;

// ---- Leg C — productization spec (codebase-derived; verified-lever-aligned) ----
const legC = `Summit & Oak already ships ~90% of the buildable layer; productization = config-driving the existing components + adding the operational SOPs. **The top-3 verified levers all map to this spec.**

## C.1 — The single business-data config (one source of truth)
\`lib/business.ts\` is **already** canonical: \`BUSINESS\` (NAP, geo, license, rating, hours, \`sameAs[]\`, \`googleReviewUrl\`) + \`OWNER\` (named author / E-E-A-T). It already feeds \`organizationNode()\`, the footer, CTAs. Productization = make the off-page outputs flow from it.

**Buildable as code (config-driven):**
1. **Schema \`sameAs\` entity-lock + geo/spatialCoverage layer** (verified lever #3 — +46% impressions / +42% clicks, measured, Schema App vendor study; schema = *eligibility/AI-citation surface, NOT a direct rank boost* — Mueller). \`organizationNode()\` *already* conditionally emits \`sameAs\` (\`...(BUSINESS.sameAs.length ? {sameAs} : {})\`). **Action:** at launch populate \`BUSINESS.sameAs[]\` with the client's real GBP + verified manufacturer/citation URLs → the entity auto-locks. (The Summit & Oak audit's \`sameAs\`-empty launch-seam.) **Effort: S.**
2. **On-site internal-link / nearby-location silo mesh** (verified lever #1 — the ONLY measured-causal organic-uplift lever KM fully controls: +5–25% organic, +7% on nearby-location links across ~8,000 pages). Largely shipped (CrossLinks / related.ts / footer surface-map / city silos). **Action:** confirm the nearby-city cross-link mesh is dense across the location/service silo; make it config-driven. **Effort: M.**
3. **The review-acquisition machine** (verified lever feeds Condition 1) — \`/review\` (noindex funnel), \`ReviewButton\` (one-tap → \`BUSINESS.googleReviewUrl\`), \`GoogleReviewsWidget\`, \`aggregateRating\` — **already built.** **Action:** swap the \`googleReviewUrl\` PLACE_ID at launch + a build step rendering a **QR PNG → \`/review\`** for trucks/invoices/door-hangers. **Effort: S–M.**
4. **GBP-config + citation-kit generators** — \`scripts/citation-kit.mjs\` reads \`business.ts\` → emits the per-client GBP primary-category recommendation (lever #4), the GBP landing-URL (lever #5 = homepage for single-location), and the owned-citation submission checklist (lever #6 — the DoFollow subset: GBP/Apple/Bing/HomeAdvisor/Nextdoor; **NOT Yext**). **Effort: S.**

**Operational (checklists / SOPs):** the citation/aggregator submissions (lever #6); the manufacturer/credential profile claims (lever #2 — **GAF + Owens Corning only**, the measured-dofollow pair; CertainTeed unconfirmed); the review-mandate SOP (below).

## C.2 — The review-mandate SOP (a first-class deliverable, the pack-deficit healer of B.0 pillar 5)
**FTC-compliant by design — single-path + unscreened (no satisfaction pre-screen; gating violates Google's Maps UGC policy + the FTC rule).**
- **Universal ask** every completed job; one template, one link (\`/review\` → one-tap Google).
- **Cadence:** (1) crew hands a **QR door-hanger** at completion; (2) **post-job SMS/email within 24h**; (3) **QR on invoices + truck magnets**; (4) monthly owner check on **velocity** — sustain a floor (e.g. 4–8/mo) past the "Magic 10" and avoid the ~18-day dormancy "cliff" (pillar 5 / T9).
- **KM ships:** \`/review\` + \`ReviewButton\` + the QR kit + \`aggregateRating\`. **The client runs the cadence** (ongoing review velocity is out of one-time scope — KM ships the machine, not the labor).

## C.3 — Recommended FIRST build WO
1. **\`sameAs\` entity-lock + config-driven schema/geo layer + the QR-asset generator + a nearby-location mesh density pass** (verified levers #1/#2/#3 + the audit's \`sameAs\` launch-seam) — highest leverage, smallest surface, all config-driven off \`business.ts\`. **← the recommended first build WO.**
2. **Extend the doorway gate to compare combos vs \`/services\` parents** (the audit's one real gap) — small hardening bundle.
3. *(Later)* the GBP/citation-kit generators + the manufacturer-credential SOP (GAF/OC).`;

// ---- assemble ----
const doc = `# King Maker — Organic-Dominance Playbook (WO_16, Legs B + C)
### The sourced organic-over-pack thesis + the ranked one-time off-page plan + the productization spec

**Date:** ${DATE} · **For:** Summit & Oak + every future King Maker client · **Author:** website-engineer (WARM off KM_VALUEPROP) · reconciled to the **updated WO_16**.
**The spine:** For high-ticket roofing, **ORGANIC regional dominance is the engine AND the offer headline; the map pack is a proximity-capped (~5–7 mi), DOUBLY-GATED (proximity + review-count), near-default BYPRODUCT — not the product.** Judge every lever by *"does it maximize organic regional dominance?"* We deliver the pack; we never center it.

> ✅ **VERIFICATION STATUS — FULLY VERIFIED.** Ran via the \`ultra-research\` harness (the WO-required path): **9 thesis pillars + 6 lever pillars, 75 load-bearing claims adversarially red/blue-verified → 59 survived · 11 corrected · 5 flagged · 0 killed.** Completed across 3 auto-resumes through a sustained Anthropic-wide 529 overload (123 agents / ~7.9M tokens on the final pass; the engine's harness-native resume returned every cached node free and re-ran only the failed ones until clean). All **reel/pitch-bound modeled figures are flagged claim-library** below (the ~1–2 jobs/mo infiltration shape, ~10/mo 2-yr ceiling, 70%-pre-sold, 60–70%-click-skip, the 32/15/8-vs-7/33/24 split). The corrections the adversarial pass forced are carried into the claim library + the Verification-Corrections section. **NO PBN; ranges not point-promises; the credibility is the product.**

---

# Part B.0 — THE ORGANIC-DOMINANCE THESIS (the offer's foundation)

${thesisBlock}

---

## The 9 thesis pillars (cited)

### Pillar 1 — Proximity ceiling of the map pack
${pillarBlock('T1')}

---

### Pillar 2 — Prominence dilates the pack radius (organic feeds the map)
${pillarBlock('T2')}

---

### Pillar 3 — Link-absorption capacity (deep site vs thin site)
${pillarBlock('T3')}

---

### Pillar 4 — Map-vs-organic ranking-factor weighting
${pillarBlock('T4')}

---

### Pillar 5 — Map-pack EARLY-STAGE reality: the honest infiltration math
${pillarBlock('T5')}

---

### Pillar 6 — The sequencing: organic carries the pipeline (months ~1–18)
${pillarBlock('T6')}

---

### Pillar 7 — The organic lead-QUALITY differential (scoped to high-ticket)
${pillarBlock('T7')}

---

### Pillar 8 — Zero-pack long-tail volume (organic-only territory)
${pillarBlock('T8')}

---

### Pillar 9 — The two execution conditions
${pillarBlock('T9')}

---

# Part B.1 — THE ONE-TIME OFF-PAGE DELIVERABLES (ranked, verified, NO PBN)

## Ranked by impact-vs-effort

${leversTable}

### Top-3 levers (day-one priority)
${topThree}

### Explicitly EXCLUDED (the rails)
${excluded}

---

## The lever detail (cited)

### Lever pillar L1 — Core data-aggregator push
${pillarBlock('L1')}

---

### Lever pillar L2 — Tier-1 manual citations
${pillarBlock('L2')}

---

### Lever pillar L3 — Manufacturer / credential backlinks
${pillarBlock('L3')}

---

### Lever pillar L4 — On-site local-proof layer (schema/entity)
${pillarBlock('L4')}

---

### Lever pillar L5 — The review-acquisition machine
${pillarBlock('L5')}

---

### Lever pillar L6 — Other one-time levers (GBP + digital-PR)
${pillarBlock('L6')}

---

# Part C — PRODUCTIZATION SPEC (the repeatable one-click launch deliverable)

${legC}

---

# Part D — Claim Library (the bulletproofing layer)

Every load-bearing claim → source → adversarial verdict → confidence. **Corrected text shown where verification corrected it.** Use only what is here; modeled figures are flagged — clear claim-library rigor before any reel/pitch.

${claimLib}

## Verification corrections — the ${nonSurv.length} claims that did not survive clean

${corrNotes}

---

# Part E — Honesty & defensibility guardrails (pre-publish checklist)

${guardBlock}

---

# Method note

- **Harness:** \`ultra-research\` (WO-required) as an ultracode Workflow — 15 pillars (9 thesis + 6 levers), 2 gather rounds (firecrawl/WebSearch), per-pillar cited synthesis nominating load-bearing claims, claim-level red/blue adversarial verification (URL-health → 3-stance self-consistency → snippet-faithfulness → counter-source), then thesis-verdict + ranked-levers + guardrail synthesis from the verified corpus.
- **Counts:** 75 load-bearing claims → **59 survived · 11 corrected · 5 flagged · 0 killed.** Final pass: 123 agents · ~7.9M subagent tokens. Completed across 3 harness-native resumes through a sustained Anthropic-wide 529 overload (cached nodes returned free each resume).
- **WARM base:** extended the red/blue-verified KM_VALUEPROP corpus (shared anchors — Whitespark weights, proximity, off-page, review velocity — survived adversarial verification there too).
- **Known limits (surfaced):** the channel-weight splits (32/15/8 vs 7/33/24) are a Whitespark **expert survey (modeled)**, not Google-published; several SERP-feature datasets are UK-market (directional for US); the jobs/month curves are MODELED projections; AI Overviews are eroding the informational long-tail lane (pillar 8). All flagged inline.

---

*Prepared by website-engineer (WO_16, Legs B+C, reconciled to the updated WO + fully verified). B.0 leads with the sourced thesis per the WO. Modeled figures flagged claim-library throughout. Joseph's eyeball is the final gate.*
`;

fs.writeFileSync(ROOT + 'KM_ORGANIC_DOMINANCE_PLAYBOOK.md', doc);
fs.writeFileSync(ROOT + 'vault/inbox/km-organic-dominance-playbook-2026-06-24.md', doc);

// also write the vault wiki summary if thesis present
console.log('WROTE KM_ORGANIC_DOMINANCE_PLAYBOOK.md (' + Math.round(doc.length / 1024) + ' KB) + vault/inbox copy');
console.log('pillars:', d.pillars.length, '| verdicts:', verdicts.length, '| corrected/flagged:', nonSurv.length, '| levers:', (L.levers || []).length);
// quick honesty scan: no "jobs/week", no bare "55%" as fact, no "SOC 2"
['jobs per week', 'jobs/week', 'a couple jobs a week'].forEach(s => { if (doc.toLowerCase().includes(s.toLowerCase()) && !doc.toLowerCase().includes('not ' + s.toLowerCase()) && !doc.toLowerCase().includes('never ' + s.toLowerCase())) console.log('WARN possible leak:', s); });
console.log('doc mentions "jobs/MONTH":', /jobs\s*\/?\s*month|jobs per month|\/mo\b|\/month/i.test(doc));
console.log('doc mentions "Christmas tree":', /christmas tree/i.test(doc), '| "1-2 jobs":', /1[-–]2 jobs/i.test(doc));
