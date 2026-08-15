# OUT_VIRAL — viral roofing ads/reels research sweep (2026-08-15)

**Role:** researcher output for the video-rig. Maps what wins in roofing/adjacent-
retail video to OUR locked beat structure (B&B / Hook&Ladder / Myth Flip / Clock),
per [[km-video-scripts-2026-08-13]] and [[km-ref-schoolofmentors-teardown-2026-08-15]].

**Method note (honest, per WO fallback clause):** `analyze_ad_video` failed all
4 attempts — server-side `GEMINI_API_KEY` missing on the fb_ad_library MCP
(persistent infra issue, not a per-call fluke; retrying won't fix it). No
shot-by-shot video analysis in this file. `get_meta_platform_id` + `get_meta_ads`
both worked fully — the PAID corpus is built from real, current Meta Ad Library
body copy + media-type + start-date metadata (77 ads, 8 platform IDs), enough
for offer/CTA/proof-device extraction without frame-level analysis. 4 of 8 IDs
(Baker Roofing, West Shore Home Raleigh-Durham, LeafFilter, Power Home
Remodeling) returned **zero active US ads** — dark right now or an ID mismatch;
paid depth rests on **Erie Home, Muth & Company Roofing, West Shore Home
(national), Renuity**.

## HOOK TAXONOMY (class → 2+ examples → transferable?)

1. **INSIDER/CURIOSITY** ("what they don't want you to know") — Erie Home paid
   video: *"Roofers Don't Want You to Know About These New Metal Shingle Roofs
   (Here's Why!)"* · generic hook-formula research names this a top-3 2026 class
   ("Contrarian Claim/Mistake Warning/List Tease" bucket). ✅ **Already built** —
   this IS Hook & Ladder beat 2 ("what SOME contractors don't want you to know").
2. **PRICE-SURPRISE / MYTH-FLIP** ("cheaper than you think") — Erie Home paid,
   TWO separate ads: *"The ACTUAL cost of a new metal roof may be more affordable
   than you think"* + *"Who knew you could save **this** much on a new roof?"*
   ✅ **Already built** — near-verbatim structural cousin of our locked Myth Flip
   beat 1. This is the strongest single validation in the whole sweep: a national
   heavy spender is running our exact hook shape, right now, in our exact vertical.
3. **SYMPTOM-QUESTION** ("is your roof doing X?") — Muth & Company paid video
   (98-day + 142-day runners): *"Leaky roof got you down?"* · hookagency's
   roofing research names direct-to-camera symptom framing as a repeat opener.
   ✅ **Already built** — this is B&B's qualifier beat, diagnostic form.
4. **MISTAKE-WARNING / COMMAND-FIRST** ("don't do X") — generic hook-formula
   research (top-3 class) · our own Clock hook ("don't wait for a tiny leak…").
   ✅ **Already built**, Clock beat 1.
5. **LIST-TEASE / X-Y-Z EXPOSÉ** ("3 things your roofer won't tell you") —
   generic hook-formula research (top-3 class) · structurally = our own
   Hook & Ladder beat 3 stack. ✅ **Already built.**
6. **RESCUE-JOB** ("we were called in to fix this") — named as one of the
   strongest trust hooks in trades content · "what I found" reveal (close-up
   of the worst thing on a job, text overlay, zero intro) is the same family.
   🔨 **Unbuilt** — fits the T1 education vein as a single-beat video, not
   one of the 4 locked scripts.
7. **SWEEPSTAKES/GIVEAWAY** ("WIN a free roof") — West Shore Home, recurring
   across 4+ refreshed creative IDs since mid-July (~1 month sustained, both
   IMAGE and VIDEO variants). ⚠️ **Conditional** — mechanic works but is a
   different regulatory class (contest/sweepstakes rules, odds disclosure);
   see DO-NOT-COPY. Not in our 4 scripts; bank as a priced-not-decided idea.
8. **OBSOLESCENCE/CONTRARIAN** ("X is a thing of the past") — Renuity paid:
   *"Tiled and 1-piece showers are a thing of the past"* · also the generic
   Contrarian-Claim class. ⚠️ **Partial fit** — usable ONLY with the "SOME
   contractors" hedge Joseph already locked in Hook & Ladder; a bare
   obsolescence claim about competitor methods risks the blanket-accusation
   problem his workshop specifically caught and fixed.
9. **STORM/HAIL-DAMAGE** ("storm damage? insurance claim?") — Muth & Company
   paid copy ("storm damage, leaks or wear," "assistance with insurance
   claims") · Profit Roofing Systems case study (hail-damage Savannah funnel,
   40% close). ⛔ **LOCKED OUT** — retail/financing frame only, no storm-
   chasing, no insurance-claim frames (WO + campaign lock).
10. **SKIT/COMEDY MISHAP** ("roofers went to the wrong house") — a real, active
    organic cluster (multiple named TikToks: wrong-house GPS mishap, "Mr.
    George he no good," joegotti96). 🟡 **Low fit, not a hard no** — relatable
    and shareable, but tonally works against the Roark-voice expert-frame lock;
    flagged, not recommended to build this cycle.

## FORMAT PATTERNS (what repeats, and why)

- **Before/After walkthrough** — the single most-cited high-engagement format
  across independent sources (WebFX analysis cited by two separate marketing
  write-ups: "before/after posts and video walkthroughs = highest engagement
  across FB/IG"). Why: proof with zero explanation needed, reads instantly muted.
- **Timelapse/transformation (satisfying install)** — named TikTok examples
  (@thatrooferchick, @top.notch.roofer ASMR). Why: a full day compressed into a
  loop is inherently a string of pattern-interrupts (the cut IS the hook).
- **Direct-to-camera FAQ/education** — hookagency's roofing research names this
  a repeat winner ("reads as advice, not a pitch"). Matches our own T1/T2/T3
  education vein already banked — same instinct, independently confirmed.
- **Day-in-the-life / crew authenticity** — "dust, sweat, a tear-off finishing
  at sunset" cited twice as a conversion-driving authenticity signal; Brandon
  Schlichter's H.C. Anderson Roofing channel (5M+ followers, videos individually
  cited at ~1M page views) is this format run at creator scale. Best fit: a
  future organic/non-paid channel, not the 4 locked 60-75s conversion scripts.
- **Talking-head + type-spectacle hook** — our own reference teardown (adjacent
  vertical, paid VSL). Cross-vertical proof that the muted-scroll battle is won
  with typography, not the face alone. Already our #1 transfer-map priority.
- **Sweepstakes/contest video** — West Shore Home, sustained ~1 month across
  refreshed creative. Novelty + near-zero-friction entry.
- **"Versus"/education (layover vs. tear-off, felt vs. synthetic)** — matches
  Mabrey's own planned T1 vein exactly. Honest evidence gap: strong SEO/
  informational-article presence for this topic, but **no single named viral
  social example surfaced** — this is a logical bet backed by adjacent signals
  (list-tease + insider hooks both score well), not a proven-viral format yet.
- **Skit/comedy** — real cluster, low transferability (tone), noted above.
- **Drone reveal** — searched specifically; evidence is thin/anecdotal (drone
  shots exist as an *establishing angle inside* before/after content, not as
  its own standalone viral class with named examples). Don't treat as a
  separate format — fold it into before/after as a shot type, not a steal.

## RETENTION DEVICES (mid-video, specific)

1. **Muted-viewing caption law** — independently confirmed twice: our own
   teardown's typography pass AND hookagency's roofing-specific research
   ("most people scroll on mute"). Tightens our existing "captions ship
   composited, never platform-generated" rule from good-practice to
   measured-necessity for this exact audience.
2. **Pattern interrupt every 10-15s** — generic short-form retention research:
   a meaningful chunk of viewers scroll off a static shot past ~12-15s; a jump
   cut, cutaway, on-screen graphic, or angle change resets the clock. Gives a
   **hard number** to our existing "cut rate tracks emotional temperature" law.
3. **Mid-video open-loop / retention bridge** — cross-validated by TWO
   independent sources: our own teardown's mid-ad CTA line ("apply below…
   but first, let me show you why this works," ~t=100s) AND generic
   short-form research's identical mechanic ("I'll show you the result that
   surprised me most, but first…"). Two unrelated sources naming the same
   device is a strong signal it's real, not a one-off.
4. **Hook-and-ladder re-hook cadence** (new hook every 5-6s through the first
   30s) — this is already OUR OWN locked device (Hook & Ladder v3/v4). The
   generic research on "small open loops every 10-15s" independently validates
   the mechanic's soundness — confidence marker, not a new steal.
5. **Bad-news-first exposé ordering** (X-instead-of-Y, sin before resolution)
   — already locked in Hook & Ladder beat 3; matches conventional exposé
   framing research. Confidence marker, not new.

## CONVERSION MECHANICS (paid corpus — offer shapes, CTA verbs, proof devices)

**Offer shapes seen repeatedly:**
- $0 down / pay nothing for 90 days / no payments for 12-18 months — running on
  **3 separate brands** (Erie Home, Renuity, West Shore Home) right now. Direct
  structural match to Mabrey's $98/mo zero-down — strong validation, no new idea.
- Percentage-off-labor ("70% OFF LABOR" — Renuity) — see DO-NOT-COPY #2.
- Sweepstakes/giveaway as lead magnet (West Shore Home) — see DO-NOT-COPY #6.
- Free inspection/estimate/quote — near-universal across all 4 brands (matches
  our own "free quote" lock already).
- **Self-serve estimate tool, THEN book a human** (West Shore Home: "get your
  instant price estimate online today, then book a free in-home consultation")
  — a funnel-shape pattern, not a video beat; see Steal #4.

**CTA verbs used:** Get in touch · Schedule now · Click below · Check your ZIP
· Start here · Tap below · Book your free consultation. Overwhelmingly soft/
low-friction, never hard-sell verbs. "Check your ZIP" functions as a curiosity/
personalization micro-commitment, distinct from a bare "click here."

**Proof devices used:**
- Named-reviewer testimonial with ONE granular technical detail embedded in ad
  body copy (Renuity: "removed a cast-iron tub… did it in six hours… very well
  pleased" — signed "F. Porrettot") — stronger than a bare star rating because
  it's specific. See Steal #5.
- Review-count-as-headline-stat ("Over 50,000 five star reviews" — West Shore
  Home). See DO-NOT-COPY #3.
- Years-in-business + ownership type (Muth & Co: "30+/33 years") — already our
  own B&B/Hook&Ladder proof beat shape; confirms it, no change needed.
- Hard-spec checklist with checkmarks (Erie Home: ✅ Resists warping/lifting/
  curling ✅ Tough against 120 MPH winds and 2" hail ✅ 50-year Transferable
  Warranty) — Erie's single most-repeated image format across dozens of
  creative refreshes. See Steal #8.
- Named numbered process step ("25-point inspection" — Erie Home) — same
  species as our own "quote in writing": a specific number reads as rigor.

## TOP 10 STEALS (numbered, mapped, buildable)

1. **Myth-Flip hook is proof-validated, not just our idea.** Erie Home is
   running the identical structural hook ("cost may be more affordable than
   you think") at national scale right now → Myth Flip beat 1. No copy change;
   pair it with an on-screen money-number type-card the instant the $ lands
   (our own teardown's "money numbers as graphics" law), same as their $400K.
2. **Insider-hook is proof-validated with a production detail to steal.** Erie
   Home's video puts the "don't want you to know" line as ON-SCREEN TEXT over
   b-roll before voice even starts → apply that text-first beat to Hook &
   Ladder's cold open (beats 1-2) for the muted-scroll win in second 0-1.
3. **Add a pattern-interrupt cutaway on each X-Y-Z line.** Hook & Ladder beat 3
   (the three-item stack) runs right at the 10-15s scroll-cliff window per the
   generic retention research → cut to a close physical prop (old flashing,
   felt roll) on each of the three lines, not just at the end of the stack.
4. **West Shore Home's self-serve-estimate-first funnel = a visual cue, not a
   funnel change.** Their "instant price estimate online, then book" pattern
   validates showing the satellite-image tool ON SCREEN during HOW IT WORKS
   (B&B beat 6 / Hook & Ladder beat 7) — already flagged as a cheap win in the
   locked scripts note; independent confirmation to prioritize it.
5. **Renuity's named+specific testimonial shape, for a FUTURE real-testimonial
   beat.** One concrete technical detail beats a generic "great job" — script
   a real filmed/quoted customer around ONE specific fact (what was replaced,
   how fast). Not a change to current locked VO — a note for the next build.
6. **Muth & Co's 142-day ad is the paid corpus's version of the Control Law.**
   Plainest script in the sweep (symptom question + years-in-business +
   free-estimate CTA, zero gimmick) is also the LONGEST-RUNNING single
   creative found → confirms B&B as-is is the right shape for the durable
   workhorse. No script change; a longevity-proof confidence marker.
7. **Tighten the caption law from good-practice to measured-necessity.**
   Independently confirmed twice (teardown + hookagency) → composited captions
   on every beat of all 4 scripts is now a load-bearing floor, not a nicety.
8. **Build a checkmark spec-card graphic for Hook & Ladder's "we do the job
   right" beat 4** — Erie Home's ✅-bullet spec card is their single most-
   repeated image unit. Use OUR 2A highlighter accent (not Erie's palette),
   list Mabrey's real substantiated specs (full tear-off, synthetic
   underlayment, new flashing) — gated on Sean's confirmation per the existing
   🔴 GATE BEFORE SHOOTING note in the locked scripts file.
9. **Adopt the 12-15s static-shot ceiling as an explicit edit-review check.**
   Numeric backstop for the pacing law — if any shot in an assembled cut
   holds static past ~12-15s, cut it. No beat currently violates this (beats
   already run 5-10s per the beat law) — a verification rule, not a rewrite.
10. **Bank "Win a Free Roof" giveaway as a priced-not-built future ad**, off
    West Shore Home's month-long sustained sweepstakes run. NOT for this build
    cycle — needs sweepstakes-law/odds-disclosure review first (see DO-NOT-COPY
    #6). Format-as-variable law: price it, don't decide it now.

## CLAIMS-FLOOR FILTER — DO NOT COPY

1. **Storm/hail-damage + insurance-claim assistance framing** (Muth & Co's
   "storm damage" copy, Profit Roofing's hail-damage funnel) — campaign is
   locked retail/financing only. Reason: dual-intent lock, not this campaign.
2. **Bare percentage-off-labor claims** ("70% OFF LABOR," "save 50% on
   installation") — needs a substantiated "regular price" anchor to discount
   from. Mabrey's real pricing is a financing structure ($98/mo), not a
   discount-off-list one; importing the % risks a claim untrue of a quote.
3. **"Over 50,000 five-star reviews" / "thousands of 5-star reviews"** — the
   SHAPE (review-count-as-headline) is fine to copy; the NUMBER is not.
   Reason: Mabrey's real review count is nowhere near that scale — only ever
   state the real, current count.
4. **Fabricated or composited named-customer testimonials** — Renuity's device
   (real name + real technical detail) is only copyable with an ACTUAL real
   Mabrey customer's actual words. This is exactly what the anti-ad doctrine's
   barbell already locks out on the fake-human-testimony side — it's the
   device most tempting to fake, worth reiterating here.
5. **"50-year Transferable Warranty" as a bare imported number** — warranty
   terms are manufacturer/tier-specific; the T2 education vein already flags
   "what a lifetime warranty actually requires" as Sean-verify territory. Only
   ship Mabrey's actual terms, never Erie's number.
6. **Sweepstakes/giveaway mechanics** ("WIN a free roof") — reason: contest law
   is a different regulatory class (odds disclosure, no-purchase-necessary
   language, state-specific rules) from a financing offer. Not a copy-paste;
   needs legal review before it's a real option (see Steal #10).
7. **"$1.2M roof rebuild" / large-project scale-flex numbers** (Schlichter's
   H.C. Anderson school-roof projects) — not flagged as DO-NOT-COPY since
   Mabrey's own $50M-of-roofs figure is already Joseph's substantiated claim;
   noted only so it isn't mistaken for a new number to import.

## SATURATION

Hit after ~13 WebSearch queries + 4 WebFetch pulls across the organic corpus,
plus the full 77-ad paid pull across 8 platform IDs. The last four organic
searches (comedy/skit format, jobnimbus TikTok-ideas redirect, Schlichter view-
count specifics, pattern-interrupt timing) each returned confirmations of
pattern classes already surfaced rather than new classes — that's the stop
signal per the WO's rule. Two honest gaps carried forward rather than papered
over: (a) no shot-level video analysis exists (Gemini key missing on the MCP
server — this is an infra fix for whoever owns that server, not a research
gap this file can close), and (b) the "versus/education" format has strong
adjacent-signal support (list-tease + insider hooks both score well) but no
single named-viral social example — treat as a logical bet, not proof.

Related: [[km-video-scripts-2026-08-13]] · [[km-ref-schoolofmentors-teardown-2026-08-15]]
· [[km-anti-ad-doctrine]] · [[km-video-rig-2026-08-14]]
