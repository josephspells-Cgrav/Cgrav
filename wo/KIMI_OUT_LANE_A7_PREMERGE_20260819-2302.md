• I'll read the brief file first.

• Now let me read the artifact under audit.

• Longest line is 1759 chars (under truncation). Reading the full file in two calls.

• The output was truncated per call. Let me locate the `roof-deductible` boundary entry first, then read in smaller chunks.

• All 31 entries read. Now I need the first 20 (lines 1–188) for register comparison.

• All 51 entries read. Now running mechanical verification greps (em-dashes, exclamation points, city references, deductible mentions, numerals, phrase frequencies).

• The shell regex counting misbehaved. Let me get exact paragraph counts with Python instead.

• Two vocabulary tells surfaced ("typically", "reroof" — absent from the 20). Quantifying them and the hedge-word distribution.

• All verification passes complete. I have everything needed — writing the audit.

  ## VERDICT

  **SOUND TO MERGE: no — not at 92088a6 as it stands, but the gap is two sub-30-minute mechanical fixes, nothing structural.** No LAUNCH-KILLER, no HIGH. The six insurance-adjacent entries are clean under a strict reading, the cupping/clawing and ridge-cap-direction fixes from the prior round are verifiably correct, and there are zero em-dashes, zero exclamation points, zero city references, and zero deductible mentions in the 31 (grep-verified). Two MED findings remain, and each violates one of the three stated success criteria literally: F1 is a mechanism conflation a working roofer would catch (criterion 1), F2 is a statistically loud vocabulary tell splitting the 31 from the 20 (criterion 3). Both are find-and-replace-class repairs. Land those two and this merges tonight; everything else is polish.

  ## FINDINGS

  ### F1 — MED — `gable-roof` shortAnswer ties wind vulnerability to venting (lines 236–237)

  - **Concrete hole:** "The tradeoff sits at the gable ends themselves, which can be more vulnerable to wind if not properly **braced and vented**, particularly in exposed locations." Venting does not brace a wall. Gable-end wind failure is a structural problem (wall bracing, roof-to-wall connection, outlooker/ladder framing); a gable vent is an airflow device. The entry's own body knows this — it correctly splits the two: "properly vented and braced is the one detail that affects **both comfort and storm resilience**" (vented→comfort, braced→storm). The shortAnswer collapsed that distinction.
  - **Failure scenario:** The site's entire pitch is working-roofer technical authority. A roofer, adjuster, or competitor reading the one entry a homeowner is most likely to land on sees the author conflate ventilation with wind bracing — a credibility ding on the highest-traffic shape term, and exactly the "factual error a roofer would catch" the success criteria forbid.
  - **Minimal fix:** Delete "and vented" from the shortAnswer ("...more vulnerable to wind if not properly braced, particularly in exposed locations"). The body already carries venting correctly; no other edit needed.

  ### F2 — MED — "typically" is absent from the 20 and saturates the 31 (0/20 entries, 0 uses → 13/31 entries, 15 uses)

  - **Concrete hole:** "typically" never appears in the existing corpus — not once — but appears 15 times across 13 of the 31 new entries: `three-tab-shingles`, `hip-roof`, `dormer`, `counter-flashing`, `chimney-cricket`, `nail-pops`, `hail-bruising`, `wind-uplift`, `recoverable-depreciation`, `roof-warranty`, `algae-resistant-shingles`, `re-decking`, `shingle-exposure`. The established hedge vocabulary is "usually" (8/20 entries) and "often" (9/20); the 31 use those too (17 and 17 entries) but stacked "typically" on top as a third hedge the 20 don't have. This is precisely the "vocabulary absent from the first 20" tell the brief asks about, and it's the loudest stylometric signal in the file — a naive diff flags it in one pass.
  - **Failure scenario:** This lane already got bounced once for a template-closer tell across 31/31 and once for 19 em-dashes; the chain's own precedent treats register tells as merge-blocking majors. Any re-judge — human or stylometric — comparing the 31 against the 20 catches the 0→15 hedge-word split and the lane re-enters the fix loop on merge night. Reader-facing harm is nil; process-facing rework is near-certain.
  - **Minimal fix:** Keep 3–4 instances for variety; convert the other ~11 to "usually" or "often" (both already corpus-native), choosing per sentence. Mechanical pass, no rewrites.

  ### F3 — LOW — "reroof" closed-form spelling and the "one of the more" construction are 31-only tics

  - **Concrete hole:** "reroof" (closed) appears 9 times across 7 of the 31 (`hip-roof`, `gable-roof`, `dormer`, `step-flashing`, `chimney-cricket`, `gutter-apron`, `roof-sagging`); the first 20 use the hyphenated "re-roof" (once, `roof-overlay`) or just "replacement." Separately, "one of the more..." appears 5 times in the 31 — twice inside `dormer` alone ("one of the more common places..." shortAnswer, "one of the more leak-prone features..." body) plus `chimney-cricket`, `kick-out-flashing`, `nail-pops` — and zero times in the 20. A doubled construction within a single entry is the most visible instance.
  - **Failure scenario:** Individually invisible to a homeowner; cumulatively they mark the 31 as written in a different sitting by a different hand — the exact "register tell separating the 31 from the 20" criterion 3 exists to catch.
  - **Minimal fix:** Standardize to "re-roof" (or rephrase to "replace/replacement") across the 31; rewrite one of the two `dormer` instances and one of `cricket`/`kick-out`; the rest can stay.

  ### F4 — LOW — the 31 run measurably longer than the 20 (structural drift, not monotony)

  - **Concrete hole:** Body length averages 1,538 chars in the 31 vs 1,248 in the 20 (+23%); shortAnswer averages 505 vs 431 chars (+17%); paragraph mode shifts from 6 (14/20 entries) to 7 (20/31 entries). The shapes still overlap (both corpora use 6–7 paragraphs), so this is inflation, not a skeleton clone — but a reader paging through the glossary feels the newer entries run fuller. Clunkiest surviving sentence, for one-edit-while-you're-in-there cleanup: `attic-baffles` closer, "Baffles are genuinely rarely visible without actually looking inside the attic itself first." — three hedge-crutches ("genuinely" / "actually" / "itself first") in one line.
  - **Failure scenario:** None acute; a meticulous repeat reader or a re-judge with a length histogram notices the drift.
  - **Minimal fix:** Optional. If touched, cut one paragraph from 4–6 of the longest bodies (`architectural-shingles`, `gable-roof`, `dormer`, `algae-resistant-shingles`) and rewrite the baffles closer ("You cannot see them without going into the attic, which is why they get skipped."). Safe to defer post-merge.

  ## ANSWERS

  **1. Technical accuracy sweep.** One catch, lodged as F1. Everything else I checked against working-roofer/adjuster knowledge holds: cupping (edges up, concave) vs clawing (center up, edges down or flat) is now correct in `shingle-curling` — the prior reversal is fixed. Ridge-cap install direction in `ridge-cap-shingles` is internally consistent and physically right (start at the lee end, work weatherward, exposed laps face away from the wind source so gusts press them down — matches the manufacturer-instruction rationale). Step-flashing weave mechanics (piece per course, next course covers the horizontal leg, vertical leg behind wall covering) are correct. Cricket code trigger correctly hedged as "a certain width" rather than a citable number. `shingle-exposure` numbers (5 to 5 5/8 in) and the up-slope-height clarification are right. Wind-uplift physics (pressure differential, concentration at edges/corners/ridges) is right. Blister-vs-bruise distinction (scattered/thermal vs impact-zone) is the adjuster-grade distinction, correctly drawn. Watched but defensible, not findings: `sub-fascia` "often means the rafter tails themselves are compromised" (strong but real on prolonged edge rot); `turbine-vent` "genuinely moves more air" (mainstream industry account of a debated point); `architectural-shingles`/`roof-warranty` "25 to 50 years" (understates current "Lifetime" marketing — an underclaim, safe direction).

  **2. Compliance sweep of the six.** Clean. `recoverable-depreciation` — pure process mechanics, every claim condition-qualified ("typically," "generally," "most commonly," "whatever timeframe the policy specifies"); "delaying the repair can put that second check at risk" is policy-window mechanics, not pressure. `xactimate` — correctly attributed to Verisk; "it does not decide whether damage is covered" is the right neutral frame; "discussing it... beats accepting **or** disputing a single number on faith" is symmetric — it declines to steer toward disputes. `roof-warranty` — generic two-warranty education, enhanced-warranty requirements hedged ("specific and have to be met exactly"), nothing about the client's own warranty. `hail-bruising` / `wind-uplift` — outcome routing explicitly deferred to "the specific inspection findings and your insurance policy"; the only CTA is a documented inspection. `storm-chaser` — pattern description with balanced framing ("Not every unfamiliar crew... fits the pattern"), consumer-verification advice only, no claim advice. Grep-verified: "deductible" appears only in the first-20 entries (`actual-cash-value`, `replacement-cost-value`, `roof-deductible`); zero occurrences in the 31 — the NC deductible-waiving silence holds. Also checked: the insurance-flavored sentence hiding in a non-designated entry, `hip-roof`'s wind-mitigation-credit line — survives strict reading ("some coastal-state... vary by insurer and state," no NC claim, no outcome promise).

  **3. Register.** The big tells are dead; small ones survive. Confirmed clean: no repeated sentence skeletons — the only 6-grams appearing in ≥3 entries are the first-20 insurance-disclaimer boilerplate ("the homeowner files and owns the claim," "not a public adjuster," "photos and a written report"); nothing repeats at that level inside the 31. "For a homeowner" cadence matches the corpus (16/20 vs 20/31 entries). Definitional openers ("X is / X are") match the 20's pattern and are genre-correct. Surviving tells, all lodged above: "typically" 0→15 (F2), "reroof" vs corpus "re-roof" plus "one of the more" ×5 with a doubled instance inside `dormer` (F3), and +23% body-length drift with the paragraph mode shifting 6→7 (F4).

  **4. Quote-back exposure.** No overclaim about what "quality installations" always include. The `eave` line — "in warmer climates quality installations add ice and water shield at the eave by choice" — is the closest thing, but the existing 20 already carry identical prescriptive framing ("A quality installation uses real starter strip at every edge," "A quality replacement uses a proper synthetic underlayment"), so it adds no new exposure and editing it would split house doctrine. Every numeric claim in the 31 is a hedged range or a product spec (25–50 yr, 20–25 yr, 5 to 5 5/8 in, Class 4) — nothing a manufacturer can dispute as disparagement; the warranty numbers err toward underclaiming, which is the safe direction when quoted back. All five "always/never" hits in the 31 are benign mechanics, not promises. No absolute performance claims found.

  **5. THE ONE THING before merge.** Fix F1 — strike "and vented" from the `gable-roof` shortAnswer. It is the only remaining statement in 51 entries that a roofer or adjuster would flatly call wrong, it sits on one of the highest-traffic shape terms, and the whole glossary's commercial value is technical credibility. Do the F2 "typically" sweep in the same commit — it is the finding most likely to bounce this lane at its own re-gate — but if only one edit ships tonight, it is F1.

  ## MISSING-LINK-VERIFICATION

  The brief restricted reads to `glossary.ts`, so the 31 `relatedMoneySlug` targets (`/services/roof-repair`, `/services/roof-replacement`, `/services/gutters`, `/services/roof-inspection`, `/roofing-cost`) were not verified against the route tree, and the `GlossaryTerm` type/JSON-LD rendering path was not inspected. If any of those five routes doesn't exist in the final tree, every affected entry links dead — worth one `grep` against the app router before deploy, outside my read scope here. Build/gate status ("3 commits, all gates green") was taken as given; I ran nothing, per the read-only constraint.

