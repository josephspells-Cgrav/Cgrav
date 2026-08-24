# Why our cold emails land in Gmail spam — and the anti-spam copy ruleset
**Status: PROVISIONAL** (max tier, 8 rounds, stop=cap-fired; 678 sources; 4 verified / 5 flagged-uncertain / 1 killed of 10 load-bearing). 188 agents, ~7.35M tokens.

## Bottom line
The "**similar to messages that were identified as spam**" banner is a **CONTENT verdict, not an auth verdict.** Perfect SPF/DKIM/DMARC clears a *different* gate (the "can't be verified" banner). So flawless auth is irrelevant to this problem. Two content/behavior mechanisms stack:

1. **Near-duplicate fingerprinting** — Gmail computes a similarity hash over message *structure* (body structure, normalized text, element order) to cluster near-identical campaign mail across senders. Documented in Google-assigned patents (US10657182B2 / US11681757B2, **survived**) + Google research (RETSim, on a real 5,252-email/196-campaign Gmail dataset). **Merge tags do NOT break it** — the static scaffolding around {firstName}/{companyName} hashes the same.
2. **Genre spam-prior** — Gmail's filter is ML trained on user "report spam" actions (Google first-party, **survived**). The unsolicited SEO-audit / "here's what's wrong / costing you jobs / want a demo" archetype is one of the most-reported cold patterns. A brand-new clean domain **inherits the archetype's spam classification**, not its own reputation.

## Myth-bust (verified)
NOT a "remove spam-trigger-words" problem. Google's RETVec is explicitly resilient to word-level manipulation; no Google/MS doc confirms a standalone word-penalizing "template filter." Word swaps move placement **0–5 pts**; the real levers, by magnitude:
**warm infra (30–50 pts) > break the structural/template fingerprint (genuine per-recipient variation, section-level not word-level) > generate replies > word choice (~0).**

## Our Email 1 trips it on 4 independent counts
1. **Genre match** — audit findings + loss frame + demo CTA = the most-reported cold archetype.
2. **Structural fingerprint** — the **3-bullet findings list is the most fingerprint-distinctive element**; near-identical across thousands. (AISO: lead with ONE specific finding, not a teardown.)
3. **Assumptive loss framing** — "Google is penalizing you" + "costs you 1–2 jobs a week" = the overconfident/fear tone tied to higher report rates (Allegrow).
4. **Subject/intent mismatch** — a "findings" email that's really a pitch = a report trigger.

## The ruleset (ordered by leverage)
1. **Consent/relevance** — keep reported-spam <0.1%, never 0.3% (hard 5xx enforcement since Jun 2024). Tight targeting = risk control. *(verified, first-party)*
2. **Warm infra + slow ramp** — biggest single placement swing. *(verified guideline)*
3. **Break the fingerprint with REAL variation** — genuine per-recipient content > merge tags. Spin at clause/sentence level, never word level. Spintax does NOT lift replies (44M-email: 1.09% vs 1.28%) — it's a fingerprint tool, not a copy crutch.
4. **Engineer for replies** — reply rate is the strongest positive signal. Curious tone + ONE low-friction question (a meeting ask cuts success ~50%).
5. **Copy hygiene (lowest leverage)** — honest subject; drop urgency/loss frame; one specific finding > 3-bullet; 50–125 words; soft "want to see the rest?" CTA.
6. **Watch behavior** — OOO autoreplies come only from Primary; when they stop you're ~48–72h from tanking.

## Research's suggested rewrite (caveat below)
> Subject: [companyName] — quick question
> Hey [firstName], came across [companyName] while looking at roofing contractors in [city]. Quick question — are you actively trying to rank for storm-damage or location searches right now, or is the site more of a business card at this point?
> Reason I ask: most roofing sites around [city] are built the same way, and there's usually a clear gap between what Google's actually rewarding and what's live. I put together a demo that shows what that difference looks like — happy to send it over if it's useful.
> Joe

**Caveat (final judge):** the "quick question" subject is flagged by the internal King Maker playbook as a bait-and-switch pattern. Joseph's OLD winning campaign used the honest-specific "[companyName] — Service Areas" — prefer that.

## Killed / uncertain
- **KILLED (c24):** "this exact genre has a measured high match-rate in Gmail's corpus" — Gmail's corpus is private; unsupportable as a measured fact. Directional logic survives via mechanism sources.
- **Flagged-uncertain:** copy/tone magnitudes (c49/c57 practitioner, no underlying data), "fix = copy not rotation" (c40, reverses infra-first hierarchy for burned domains), Postmaster reputation dashboards retired Sep 30 2025 (c7, evidence supports survived).

## Open gaps
1. No hard benchmark for *how much* per-email variation defeats fingerprinting (word vs clause vs structural).
2. No concrete cold-start week-1–4 placement trajectory for new Google Workspace domains.

## The strategic punchline
Even a perfect rewrite, sent near-identically at volume, **re-fingerprints over time.** Durable fix = genuine per-recipient variation (rule 3) + consent/targeting (1) + warm infra (2). Copy is the smallest lever. **Our enrichment scan gives each lead REAL, specific site data — that's the genuine variation source that defeats fingerprinting.**
