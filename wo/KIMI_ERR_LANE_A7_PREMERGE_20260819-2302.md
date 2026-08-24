• Let me read the brief file first.

• The brief asks me to audit the LAST 31 entries of the GLOSSARY_TERMS array in `C:/Users/josep/Claude Gravity/.wt-seo-a7/lib/articles/glossary.ts`, with the first 20 as register context. Read-only, markdown analysis only.

  Let me read the file. It may be large — I'll read it in chunks. Let me first check its size.

467 C:/Users/josep/Claude Gravity/.wt-seo-a7/lib/articles/glossary.ts
105499 C:/Users/josep/Claude Gravity/.wt-seo-a7/lib/articles/glossary.ts
• 467 lines, 105KB. Read shows up to 1000 lines or 100KB per call — 105KB is slightly over 100KB so I may need two reads. Lines longer than 2000 chars get truncated mid-line — glossary entries could have very long lines. Let me check line lengths first.203 1759
446 1703
437 1694
464 1683
212 1663
Max line length is 1759 chars, under the 2000 truncation limit. Good. Total 105KB is slightly over the 100KB Read cap, so I'll read in two calls: lines 1–240 and 241–467.

• The Read output is being truncated to 50000 chars per call with the full output saved to a file. I need the complete content. The output_path files contain the full read results. Let me read those output files, or better, read the glossary.ts file in smaller chunks to avoid truncation.

  The file is 467 lines, 105KB. Let me read in chunks of about 80 lines each (~18KB) to stay under the 50KB preview limit. Actually, the issue is the tool output limit of 50000 chars — but the full output is saved to output_path. I could read the output_path files... but those are just captures of the Read output (with line numbers). Simpler: read glossary.ts in 4 chunks of ~120 lines.

  Actually wait — the truncation is on tool output exceeding 50000 chars. Chunk 1 (lines 1-240) was 51565 chars. So ~120-line chunks should be fine. Let me do chunks: 1-120, 121-240, 241-360, 361-467. That's 4 reads. Let me first find where the roof-deductible entry is, since the 31 entries under audit follow it.

• The structure: 51 entries total. First 20 = lines 9–188 (roofing-square through roof-deductible, entries 1–20). The 31 under audit = lines 189–467 (sub-fascia through shingle-exposure).

  Each entry is ~9 lines. I need to read:
  - Lines 189–467 (the 31 entries under audit) — full content required.
  - Lines 1–188 (the first 20) — for register comparison.

  Read output limit is 50000 chars per call. Lines 1–240 was 51565 chars, so roughly 215 chars/line average. Let me chunk:
  - 189–300 (~112 lines, ~24KB)
  - 301–410
  - 411–467
  - 1–188 for context (two chunks: 1–110, 111–188)

  Let me do the audit entries first (3 reads), then context (2 reads). I can issue them in parallel — all independent.I've now read all 31 entries under audit (lines 189–467). Wait — I need to double check. The 31 entries are:
  1. sub-fascia (189)
  2. architectural-shingles (198)
  3. three-tab-shingles (207)
  4. ridge-cap-shingles (216)
  5. hip-roof (225)
  6. gable-roof (234)
  7. dormer (243)
  8. eave (252)
  9. rake-edge (261)
  10. step-flashing (270)
  11. counter-flashing (279)
  12. kick-out-flashing (288)
  13. chimney-cricket (297)
  14. gutter-apron (306)
  15. soffit-vent (315)
  16. gable-vent (324)
  17. turbine-vent (333)
  18. attic-baffles (342)
  19. shingle-blistering (351)
  20. shingle-curling (360)
  21. nail-pops (369)
  22. roof-sagging (378)
  23. hail-bruising (387)
  24. wind-uplift (396)
  25. storm-chaser (405)
  26. recoverable-depreciation (414)
  27. xactimate (423)
  28. roof-warranty (432)
  29. algae-resistant-shingles (441)
  30. re-decking (450)
  31. shingle-exposure (459)

  That's 31. Good.

  Now I need the first 20 entries for register comparison. I have lines 1–240 partially — the first Read preview gave me lines 1–15ish fully (roofing-square complete), and dormer at 243+. I need to read lines 1–188 fully for the first 20 entries. Let me read those in two chunks.

• Now I have the full file. Let me do the audit carefully.

  **The 31 entries under audit (lines 189–467):**

  1. sub-fascia
  2. architectural-shingles
  3. three-tab-shingles
  4. ridge-cap-shingles
  5. hip-roof
  6. gable-roof
  7. dormer
  8. eave
  9. rake-edge
  10. step-flashing
  11. counter-flashing
  12. kick-out-flashing
  13. chimney-cricket
  14. gutter-apron
  15. soffit-vent
  16. gable-vent
  17. turbine-vent
  18. attic-baffles
  19. shingle-blistering
  20. shingle-curling
  21. nail-pops
  22. roof-sagging
  23. hail-bruising
  24. wind-uplift
  25. storm-chaser
  26. recoverable-depreciation
  27. xactimate
  28. roof-warranty
  29. algae-resistant-shingles
  30. re-decking
  31. shingle-exposure

  **The six insurance-adjacent entries per the brief:** recoverable-depreciation, xactimate, roof-warranty, hail-bruising, wind-uplift, storm-chaser. All present.

  Now let me audit target by target.

  ---

  ### Target 1: Technical accuracy sweep

  Go entry by entry as a hostile reviewer with working-roofer knowledge.

  **sub-fascia:** "structural framing board, usually a piece of dimensional lumber, that runs behind the visible fascia trim and caps the ends of the rafters or trusses. It is the load-bearing piece; the fascia board homeowners see is a decorative and functional cover nailed over it."

  Hmm. Reality: In many residential builds, the "sub-fascia" is a 2x (2x4/2x6) nailer attached to rafter tails, and the finish fascia (1x or aluminum/PVC wrap) goes over it. But in plenty of construction the fascia board itself IS the structural board (a 1x6/2x6 nailed to rafter tails that gutters hang from), with no separate "sub-fascia" at all — sub-fascia as a separate member exists in some construction (especially when the finish fascia is thin aluminum/vinyl wrap, or on rake edges with 2x sub-fascia). The entry's claim that sub-fascia "caps the ends of the rafters" and is "the load-bearing piece" is a defensible description for construction that has it. Is it wrong a roofer would object? The description is one valid framing. "Load-bearing" is a bit strong — sub-fascia isn't carrying roof load; it carries the fascia/gutters and ties rafter tails. The entry says "gives the fascia and gutters something solid to attach to" — fine. "A soft or crumbling sub-fascia often means the rafter tails themselves are compromised" — hmm, "often" is aggressive; rot in sub-fascia does not imply rafter tails are compromised, though they can be. Actually rot at the roof edge frequently extends into rafter tails (that's why roofers sister them). "Often" is hedged. I'd call this borderline — not a clear error.

  Wait, also: "it is not something a roofer checks on a routine visual look from the yard" — fine.

  **architectural-shingles:** "built with two or more layers laminated together" — correct. "heavier and more wind- and impact-resistant than a flat, single-layer shingle" — generally true (heavier laminated shingles carry higher wind ratings typically 110-130 mph vs 60-70 for 3-tab; impact resistance isn't inherent to lamination but thicker mat helps). "manufacturer warranties that commonly run 25 to 50 years" — hmm. Architectural shingles typically carry "limited lifetime" warranties (which are not literally lifetime; ~ "lifetime" defined as long as original owner owns home). 25-50 years: older architecture products were 30/40/50 year; current market is mostly "limited lifetime." Saying "commonly run 25 to 50 years" — acceptable hedged range? A roofer might note most are marketed as "lifetime" now. Not an error per se — warranties ARE commonly in that band historically; GAF Timberline HDZ is "Lifetime" / 30 yr in some contexts. This is survivable. "Class 4 impact resistance and algae-resistant granules, since manufacturers build those features into their architectural lines first" — accurate.

  **three-tab-shingles:** "cut with two slots so each strip appears to be three separate rectangular tabs" — correct. "shorter warranty, often in the 20 to 25 year range" — correct (20-25 yr typical for 3-tab). "single asphalt layer flexes and wears faster" — fine. Accurate.

  **ridge-cap-shingles:** "cut and bent along a factory-scored line so each cap folds cleanly over that peak" — ridge cap shingles are typically pre-formed/pre-bent or scored; accurate enough. "installed one at a time along the ridge, starting from the end away from the prevailing wind and working toward it, so each cap's exposed lap edge faces away from the wind. Gusts press the laps down instead of prying them up."

  Wait — is this right? Standard practice: install ridge caps starting from the end OPPOSITE the prevailing wind direction so that laps face AWAY from prevailing wind. If prevailing wind comes from the west, you start at the east end and work west? Let me think. Shingle laps should face away from prevailing wind — the exposed edge of each lap should point away from where wind comes from, so wind blows over the lap, not under it. If prevailing wind is from the west, wind travels west→east. Laps should face east (away from the west wind)? Hmm no.

  Ridge cap installation: you want the overlapping direction such that the open side of each cap (the edge that's on top, exposed) faces away from prevailing wind. If prevailing wind blows from south to north, wind hitting the ridge... Standard guidance (e.g., GAF, shingle manufacturer instructions): "Install ridge caps starting at the end of the ridge opposite the prevailing wind direction." So if prevailing wind comes FROM the west, you start at the EAST end and work toward the west. Each new cap overlaps the previous one, with the exposed lap edge facing west (toward the prevailing wind)?? Wait no.

  Let me think concretely. Working from east to west: each successive cap is placed west of the previous, overlapping it. The overlap: the new cap's east edge laps over the previous cap's west edge. So the exposed top lap edges face west. Wind from the west hits the exposed lap edges — wind gets UNDER the laps? Hmm, that seems wrong.

  Actually, manufacturer instructions say the opposite consideration: "begin at the end of the ridge opposite the direction of prevailing winds" — e.g., IKO: "Start at the end of the ridge farthest from the direction of the prevailing wind." The intent: laps should be oriented so wind blows over the top of each lap rather than into the open edge. If you start at the end opposite the prevailing wind and work toward the wind source... hmm wait, if prevailing wind comes from the south, "the end opposite the prevailing wind" = north end. Start at north end, work south (toward the wind source). Each new cap south of the last, lapping over it, exposed edge facing south = toward prevailing wind. That would face laps INTO the wind?

  Hmm, that can't be right. Let me recall actual instructions. GAF Timberline ridge cap instructions: "Apply ridge cap shingles beginning at the end of the ridge OPPOSITE the prevailing wind direction." And the reason given in training materials: so the wind blows over the lapped edges rather than under them.

  Let's model: ridge runs east-west. Prevailing wind from the south... wait, prevailing wind direction for ridge caps is about wind blowing ALONG the ridge, i.e., from one end. If prevailing wind blows from the west end of the ridge toward the east end, you start at the EAST end (opposite the wind's origin... no wait, "opposite the prevailing wind direction" — wind direction is named for where it comes FROM. A "westerly" wind comes from the west. Opposite = east end. Start at east end, work westward (toward where wind comes from). Each new cap to the west laps OVER the previous (eastern) cap. The exposed top edge of each new cap faces... the new cap covers the previous cap's western portion; the visible step/lap edge is on the west side of each cap, facing west — INTO the wind??

  Hmm, that gives laps facing the wind. That contradicts. Let me re-model. Cap shingles are ~12" wide with ~5" exposure. When you place the next cap, you lap it over the previous one, leaving 5" of the previous exposed. If working east→west: previous cap at position x, next cap at x+5" (westward), covering x+5..x+17. Previous cap spans x..x+12, its exposed part is x..x+5 (east side exposed). The lap line (edge of the new cap on top) is at x+5, and the new cap's bottom edge... the new cap's east edge is at x+5 sitting ON TOP of the old cap. So the exposed upper edge (the edge you could catch with a fingernail) faces east. Wind from the west blows over the new cap and onto... hmm.

  OK simpler: think of roof shingles. Courses go up-slope; each higher course laps over the lower; exposed edges face downslope — water flowing downslope runs over the laps. Wind-driven rain running downslope never gets under. For ridge caps along a horizontal ridge, "water flow" equivalent is wind direction along the ridge. To have wind blow OVER laps (over the top edges), the top edges must face DOWNWIND. If wind comes from west (blows eastward), top edges must face east. So the LAST-installed caps are at the... if top edges face east, each new cap is placed EAST of the previous. So you start at the WEST end and work eastward. West end = the end the wind comes from = "the end of the ridge in the direction of the prevailing wind" (wind FROM west).

  So "start at the end opposite the prevailing wind direction" would be wrong by this model; you'd start at the end TOWARD the prevailing wind (the upwind end).

  Hmm, but manufacturer instructions really do say "opposite the prevailing wind." Let me reconsider. Maybe the concern isn't along-ridge wind but ACROSS-ridge wind: wind crossing the ridge lifts the lee-side flap. When wind crosses over the ridge, it lifts the downwind side of each cap. The cap's downwind side is the side facing away from wind origin... For cross-ridge wind from the south, the south edge of each cap is anchored, north edge lifts. Lap orientation along the ridge doesn't change that. Hmm.

  Actually, let me look at this from what real instructions say. CertainTeed: "Begin application at the end of the ridge opposite the direction of the prevailing wind." GAF similar. The mechanism they intend: with wind blowing along the ridge line (the strongest uplift scenario for caps?), laps should face away from the wind so wind presses them down.

  If wind blows from west to east ALONG the ridge: caps with exposed top edges facing EAST (downwind) → wind slides over each cap like water over shingles, pressing down. Exposed edges facing east means each subsequent cap is to the EAST of the previous → start at WEST end. West end = where the wind comes from = "the end from which the prevailing wind blows" = the end FACING the prevailing wind... "opposite the direction of the prevailing wind" — direction of the wind = eastward (where it's going) or west (where it's from)? Ambiguous. "Prevailing wind direction" in common parlance = where the wind comes FROM (a "west wind"). Opposite of that = east. So instruction "start at the end opposite the prevailing wind [direction]" = start at east end, work west. Then each new cap is west of the previous, exposed edge faces WEST = facing into the arriving wind. Wind from the west would catch the exposed edges and lift them. That contradicts the stated purpose!

  Unless the intended reading: wind direction = the direction the wind blows TOWARD. Then opposite = west end = start upwind, laps face downwind, wind presses laps down. That's consistent with the mechanism. So the manufacturer phrase is just ambiguous, and the intended physics is: laps face AWAY from where the wind comes from (downwind), start at the UPWIND end.

  Now what does the entry say? "starting from the end away from the prevailing wind and working toward it, so each cap's exposed lap edge faces away from the wind. Gusts press the laps down instead of prying them up."

  "Starting from the end away from the prevailing wind and working toward it" — start at the end AWAY from the wind (downwind end), work TOWARD the wind (upwind). Each new cap is upwind of the previous → exposed lap edge faces UPWIND = toward the wind. But the entry then says "so each cap's exposed lap edge faces away from the wind." Contradiction! If you start away from the wind and work toward it, laps face INTO the wind, not away.

  Hold on, let me re-model carefully. Ridge along x-axis. Wind comes from x=0 side (west), blows toward +x (east).

  Option A: start at west end (upwind), work east (downwind). Cap 1 at [0,12]. Cap 2 at [5,17] (5" exposure), laps over cap 1's east portion [5,12]. Exposed part of cap 1: [0,5]. The exposed edge — the top edge of cap 2 sitting on cap 1 — is at x=5, and it faces west (you can hook a fingernail under it from the west side... no wait). Cap 2 sits ON TOP covering [5,17]. Its west edge is at x=5. From the west, you see cap 1's exposed [0,5] strip, then cap 2's surface starting at x=5 rising up one thickness. The "step" you encounter moving eastward at x=5 is a step UP. Moving westward from east, at x=17 you step down from cap 2's edge? Hmm, cap 2's exposed surface is [5,17]?? No — cap 2 will be covered by cap 3 over [10,17]. Ugh.

  Let me simplify: each cap's exposed strip is the last 5" on its downwind... For caps installed moving eastward, each cap covers the previous cap's eastern part. So each cap's exposed strip is its WESTERN 5"? No wait. Cap 2 at [5,17] covers cap 1's [5,12]. Cap 1's exposed strip = [0,5] = its western 5". Cap 3 at [10,22] covers cap 2's [10,17]. Cap 2's exposed = [5,10] = western 5". So exposed strips are the western (upwind) portion of each cap, and the lap line (where the next cap starts covering) is on the east side of each exposed strip. Wind from the west blows along: hits cap 1's exposed strip [0,5], then at x=5 hits the step up onto cap 2 — the step faces west, INTO the wind. Wind can get under cap 2's west edge and lift it. BAD.

  Option B: start at east end (downwind), work west (upwind). Cap 1 at [0? no—east end]. Say ridge is [0,100], wind from west (x=0). Start at x=88 (cap 1 = [88,100]). Work westward: cap 2 = [76,88]? With 5" exposure, cap 2 = [83,95] covering cap 1's [88,95]. Cap 1 exposed = [95,100] (eastern 5"). The lap line at x=95 where cap 2's east edge sits on cap 1. Wind from west travels along cap 2's exposed strip [83,88]... wait cap 2's exposed = [83,88] after cap 3 covers [88? no. Cap 3 = [78,90] covering cap 2's [83,90]?? I'm messing up the offsets. Let's set exposure 5: each new cap placed 5" west of the previous. Cap 1 [88,100], cap 2 [83,95] covering cap 1's [88,95], cap 3 [78,90] covering cap 2's [83,90]. Cap 1 exposed [95,100], cap 2 exposed [88,93]?? No — cap 2 spans [83,95], cap 3 covers [83,90], so cap 2 exposed = [90,95]. Fine. Each cap's exposed strip is its EASTERN 5". Wind from the west: flows over cap 3 [78,90] surface... at x=90 there's a step DOWN onto cap 2's exposed [90,95]? No wait — cap 3 sits ON TOP of cap 2 over [83,90]. At x=90 (cap 3's east edge), moving east you step DOWN from cap 3's surface onto cap 2's exposed strip. Wind blowing eastward rides over cap 3, then steps down onto cap 2's exposed strip, then steps down onto cap 1's exposed strip. Like water flowing down shingles. The down-facing steps can't be hooked by wind. Wind presses the caps DOWN. GOOD.

  So physically correct: start at the DOWNWIND end, work toward the UPWIND end — i.e., start at the end AWAY from where the wind comes from... no wait. Wind comes FROM the west. Downwind end = east end. Start at east end = the end the wind is blowing TOWARD = "the end away from the prevailing wind['s source]". The entry says "starting from the end away from the prevailing wind and working toward it" — "away from the prevailing wind" = away from the wind's source = east end (if wind from west). "Working toward it" = toward the wind's source = westward. That is Option B — CORRECT. And then "each cap's exposed lap edge faces away from the wind" — exposed edges are the eastern edges (downwind), facing away from the wind source. CORRECT and consistent!

  OK so the entry is right: start downwind, work upwind, exposed edges face downwind, wind presses them down. Good — matches manufacturer instructions ("begin at the end of the ridge opposite the direction from which the prevailing wind blows"? whatever — the entry's physics is self-consistent and correct). Phew. Actually wait, double-check against manufacturer instruction once more: GAF TimberTex instructions: "Start at the end of the ridge opposite the direction of the prevailing wind." If "direction of prevailing wind" = where wind comes from (west), opposite = east = start east, work west = Option B. ✓. Entry consistent with GAF. 

  Hmm, but hold on — some instructions say start at the end FROM WHICH the prevailing wind blows... There are actually conflicting instructions across manufacturers. The entry's stated mechanism (laps face away from wind, wind presses them down) is the standard rationale and self-consistent. Fine. Not a finding.

  **hip-roof:** "all sides slope downward to the walls, with no vertical gable ends... four, or more on complex shapes, sloped planes that meet at hips and a ridge." Correct. "generally more wind-resistant than gable roofs" — correct (aerodynamic, no flat gable wall to catch wind; also self-bracing geometry). "some coastal-state insurance programs offer a wind-mitigation credit for hip roofs after a wind-mitigation inspection, though the credit and its terms vary by insurer and state" — TRUE (e.g., Florida wind mitigation discounts give hip-roof credit). City-agnostic ✓ (says "some coastal-state" — not NC claim). Is this "insurance-adjacent" content in a non-designated entry? It's factual, hedged, no outcome promise ("vary by insurer and state"). OK.

  "a hip roof typically has more total roof surface than a gable roof over the same footprint" — TRUE. "costs more to shingle" — true.

  **gable-roof:** "two sloped sides meeting at a central ridge and a flat, vertical triangular wall, the gable, at each end" ✓. "gable ends... more vulnerable to wind if not properly braced and vented" — hmm, "vented"? Wind vulnerability of gable ends is about bracing (gable end wall bracing, outlookers/ladder framing), not venting. Venting doesn't affect wind resistance. The entry says "properly braced and vented" — the vented bit is odd but the body later says "confirming that the gable ends are properly vented and braced is the one detail that affects both comfort and storm resilience" — venting affects comfort (attic ventilation), bracing affects storm resilience. It's a little conflation but the body splits it: vented→comfort, braced→storm. In the shortAnswer: "which can be more vulnerable to wind if not properly braced and vented" — venting doesn't affect wind vulnerability. Minor technical sloppiness. A pedantic roofer could flag "vented" as irrelevant to wind. MED/LOW? I'd call it LOW — it doesn't misinform a homeowner into harm; at worst it's a mild conflation. Actually let me re-read: "The tradeoff sits at the gable ends themselves, which can be more vulnerable to wind if not properly braced and vented, particularly in exposed locations." Strictly: an unvented gable end is not more wind-vulnerable. A veteran roofer would go "venting's got nothing to do with wind." It's a real-but-survivable inaccuracy → MED by the anchors? "MED = real but survivable". Yes, I'd log it as MED... or LOW ("polish")? The brief's success criterion: "no factual error a roofer or adjuster would catch." This is something a roofer WOULD catch, but it's not harmful misinformation — it's a conflation. I'd rate MED leaning LOW. Let me log it as a finding, MED.

  Hmm, wait. Let me reconsider. In the body: "A well-built gable roof handles hard storms fine when the framing and flashing at the gable end are done right." — fine. And "confirming that the gable ends are properly vented and braced is the one detail that affects both comfort and storm resilience" — this one is fair because it's "both comfort and storm resilience" (vented→comfort). But shortAnswer ties vented to wind vulnerability specifically. Yes, finding. MED (real, survivable, minimal fix: drop "and vented" from shortAnswer or rephrase).

  **dormer:** "projects out from a sloped roof, with its own roof and usually a window" ✓. "step flashing along the dormer's side walls and valley or cricket flashing where the dormer's small roof ties into the main slope" — hmm. Where a dormer roof ties into the main slope: if the dormer's ridge runs into the main slope (shed/gable dormer with ridge perpendicular to main ridge), the junction is a valley — valley flashing. Cricket flashing? A cricket is behind chimneys/wide penetrations on the uphill side. A dormer's uphill side... a shed dormer's top junction with the main roof can collect water behind it like a chimney; some dormers do get crickets, but "cricket flashing" for a dormer is unusual phrasing. Valley flashing where dormer roof meets main slope = standard. "Valley or cricket flashing" — not wrong (a dormer can have a small cricket on its uphill side, and the valleys where dormer cheeks meet... ). Meh, acceptable. Actually the dormer cheek (side wall) meets the main slope forming a channel — that's step flashing + sometimes a valley-like channel. The dormer's own roof valleys into the main roof — valley flashing. Fine, hedged with "most often."

  "A targeted flashing repair is usually all a dormer leak needs. The dormer itself rarely has to come off." — fine, hedged.

  **eave:** "the lower edge of a roof that overhangs the exterior wall, running along the horizontal side of the house rather than the sloped gable ends" ✓. "Codes in colder regions require an ice barrier there against ice dams" — TRUE (IRC R905.1.2 ice barrier required where average January temp ≤25°F or history of ice dams). "in warmer climates quality installations add ice and water shield at the eave by choice" — hmm. Do quality warm-climate installs add I&W at eaves "by choice"? Many do at valleys/penetrations; at eaves in warm climates it's less universal but not rare (some do it as upgrade; some manufacturers require it for certain warranties in wind-driven rain regions). The phrase "quality installations add ice and water shield at the eave by choice" is a soft claim — could be seen as overclaim about what quality installs "always" include (target 4). It says "quality installations add... by choice" — implies if your roofer doesn't add it, it's not quality. A bit of a value judgment but defensible as industry best practice (many premium specs include eave I&W even in the South; GAF/OC specs include leak barriers at eaves in certain zones). Hmm — the first-20 ice-and-water-shield entry says: "Even in a warm climate where actual ice dams are rare, the membrane earns its place by sealing the valleys, eaves, and penetrations" — consistent with that. So it's in-house doctrine, hedged ("quality installations add... by choice"). Not a factual error. Note as register/positioning, not a finding. OK.

  **rake-edge:** "sloped edge of a roof that runs along a gable end, from the eave up to the ridge" ✓. "wind hits the rake edge at an angle... can get up underneath a loose shingle edge" ✓ plausible. "A rake edge finished without a trim board or with a warped one also tends to telegraph a wavy shingle line down the whole slope" — plausible. "drip edge... giving the shingle courses a straight, supported line to overhang" ✓. Technical: fine.

  Hmm wait — "Because wind hits the rake edge at an angle, shingles and drip edge there are especially important for keeping the roof's perimeter sealed against wind-driven rain." Fine.

  **step-flashing:** "small, L-shaped metal pieces installed one at a time, woven in with each course of shingles, where a roof slope meets a vertical wall. Each piece overlaps the one below it and is tucked partly under the siding above" — standard ✓. "each one set at the top of a single shingle course and tucked behind the wall covering above it" ✓. "tucked partly under the siding" — in brick walls it's behind counter-flashing, but entry says "wall covering" and focuses on sided walls; entry does say "such as against a dormer, a chimney side" — chimney side with step flashing + counter flashing ✓ (that's what counter-flashing entry covers). Fine.

  **counter-flashing:** "installed above step flashing or base flashing, typically embedded into a masonry joint... laps down over the top edge of the flashing beneath it" ✓. "set into a cut groove in the mortar joint" = reglet ✓. "on its own it has an exposed top edge where it tucks behind the wall covering" ✓. Mechanism description: "Even if water gets behind the counter-flashing at the masonry joint, it runs down the face of the counter-flashing and onto the step flashing rather than straight into the wall" — hmm. If water gets behind counter-flashing at the reglet, it runs down BEHIND the counter-flashing face... Actually counter-flashing laps over step flashing's top edge; water behind the counter-flashing would run down its back face and land on the step flashing's vertical leg (which is behind... ). The step flashing's upstand leg is tight against the wall behind the counter-flashing. Water behind counter-flashing runs down the wall → hits the step flashing upstand (which extends up behind the counter flashing? typically step flashing upstand goes up the wall a few inches, and counter flashing overlaps it by ~2-3"). Water getting behind counter-flashing at the joint would run down between wall and counter-flashing, then encounter the top edge of the step flashing upstand — which is BEHIND the counter-flashing — so water could get behind the step flashing too. Honestly, the entry's claim "it runs down the face of the counter-flashing and onto the step flashing rather than straight into the wall" is the standard simplified explanation of the two-layer defense; not something a roofer would call wrong. Skip.

  "A common shortcut is smearing roofing cement over a gap instead of properly cutting the flashing into the joint, which fails much sooner." ✓ true (face-mounted/caulked vs reglet-cut).

  **kick-out-flashing:** ✓ accurate and well-documented (missing kickout → wall rot; "different trades" gap is real). "bent outward at an angle, physically diverting the water stream away from the wall and out into the open, usually straight into the gutter below" ✓.

  **chimney-cricket:** "small peaked structure built into the roof on the high, or uphill, side of a chimney" ✓. "typically required by code on wider chimneys" — IRC R903.2.2? Actually it's IBC/IRC: "A cricket or saddle shall be installed on the ridge side of any chimney or penetration more than 30 inches wide" (IRC R1003.20? it's in the chimney section). "Most codes and manufacturer guidelines require a cricket once a chimney reaches a certain width" ✓ hedged, doesn't cite 30" — safe. "feeding water around the chimney and back into the main roof slope" ✓. "Each side of the cricket functions like a miniature roof valley" ✓. Fine.

  **gutter-apron:** "a style of drip edge shaped specifically for the eave, with a longer, more sharply bent lower flange designed to extend past the fascia and reach down into the back of the gutter trough" — gutter apron = type of drip edge with extended lower leg that goes into the gutter ✓. "installed at the eave only, not along the rake" ✓. Accurate.

  Hmm — "Unlike standard drip edge, which simply directs water off the roof edge, a gutter apron aims that water directly into the gutter" ✓. Fine.

  **soffit-vent:** "intake vent built into the underside of the roof overhang" ✓. Two forms ✓. "either style is only useful if the airflow above it is not blocked" ✓.

  **gable-vent:** "an older style of passive exhaust ventilation" ✓. "When a roof is later fitted with a full ridge and soffit vent system, gable vents are sometimes sealed off so the two exhaust paths do not work against each other" — this is a real industry debate. The short-circuit claim: "a ridge vent's draw can actually pull air in through a gable vent instead of up from the soffit, short-circuiting the intake-to-ridge airflow" — this is the standard argument for closing gable vents; some building-science folks (e.g., some studies) dispute the magnitude, but it's mainstream roofing doctrine. Hedged ("can actually pull", "sometimes sealed off", "will often recommend"). Fine. "it can work well on its own or alongside other vents depending on the attic's layout" — covers the other side. OK.

  **turbine-vent:** "wind-driven attic exhaust vent with fins that spin... using that spin to pull hot air up and out of the attic faster than a passive vent alone" ✓. "On a still, hot day... the turbine barely spins and performs closer to a plain static vent" ✓ true. "bearing... can seize up over years" ✓. Accurate.

  Note: do turbines actually "pull air faster than a passive vent"? There's building-science skepticism (turbines' exhaust capacity vs box vents of same throat is debated; the spinning is mostly from the air escaping, not driving it). But mainstream claim is that wind action enhances extraction — widely stated by manufacturers and roofers. A hostile reviewer could note the physics debate, but at "working-roofer level" this is the standard account. Not a finding worth lodging — hedged ("genuinely moves more air than a passive vent of the same size" — hmm, "genuinely" is an assertive word on a debated point. LOW at most. I'll fold into notes maybe. Actually the brief says invented findings are a defect. This is defensible mainstream doctrine; skip.)

  **attic-baffles:** ✓ accurate. "usually foam or cardboard" ✓ (also plastic; "usually foam or cardboard" fine). "Baffles are genuinely rarely visible without actually looking inside the attic itself first." — awkward sentence ("genuinely rarely visible... actually looking inside the attic itself first") — wordy/awkward. Register issue, minor. Note as LOW polish maybe. Hmm, "Ask about them any time attic insulation work is done. Baffles are genuinely rarely visible without actually looking inside the attic itself first." — the second sentence is clunky but not wrong. Could flag as LOW register.

  **shingle-blistering:** "small, raised bubbles... usually caused by trapped moisture or gas expanding under the shingle's surface in the heat" ✓ (industry: moisture in the mat volatilizes, or poor ventilation). "When a blister eventually pops or wears through, it takes the protective granules with it and exposes bare asphalt" ✓. "Blistering is more a sign of manufacturing or ventilation issues than storm damage, and it tends to show up scattered across a roof rather than in one impact zone" ✓ — this is actually the important adjuster-level distinction, correct.

  **shingle-curling:** "cupping, where the edges turn upward into a concave, bowl-like shape, or clawing, where the center rises while the edges curl downward or stay flat" — the brief says earlier judges found "reversed cupping/clawing definitions — fixed". Let me verify the current definitions are right. Industry standard (e.g., roofing manuals, insurance/HAAG references):
  - Cupping: the EDGES of the shingle turn upward, forming a concave shape (like a cup). ✓ entry: "cupping, where the edges turn upward into a concave, bowl-like shape" ✓ correct.
  - Clawing: the edges stay flat/down and the CENTER rises/bulges upward (like a claw). ✓ entry: "clawing, where the center rises while the edges curl downward or stay flat" ✓ correct.

  Good, the fix is in place.

  "usually as the shingle ages and its asphalt dries out and loses flexibility" ✓. "a strong sign a roof is nearing the end of its service life" ✓.

  **nail-pops:** ✓ accurate. "improper nailing, wood shrinkage, or the deck flexing with temperature changes" ✓. "resetting or replacing the popped nail and resealing the shingle above it" ✓.

  **roof-sagging:** ✓ accurate, hedged.

  **hail-bruising (insurance-adjacent #1):** "impact damage hail leaves... crack or displace the mat underneath without necessarily punching all the way through" ✓ (industry: fracture of the fiberglass mat, granule displacement). "dark, soft, slightly indented spot where granules have been knocked loose" ✓. "how it is handled depends on the specific inspection findings and your insurance policy" ✓ neutral. "A documented inspection is the starting point for understanding what is actually there and what it means for your specific policy and roof." ✓ no outcome promise, no dispute advice, no deductible mention. Compliance: clean.

  Check for claim-outcome promises: "Bruising is treated differently from ordinary wear because it is sudden, storm-caused damage rather than gradual aging" — factual about the distinction adjusters draw. OK. No deductible mention. Clean.

  **wind-uplift (insurance-adjacent #2):** physics ✓: "lower air pressure above the surface than below it, effectively pulling shingles... upward" ✓ Bernoulli explanation, standard. "concentrates hardest at roof edges, corners, and ridges" ✓ (per ASCE 7 zone pressures — corners/edges highest). "damage often shows as shingles that are lifted, creased, or missing along an edge" ✓. No insurance advice at all in the body — purely technical. "warrants a documented inspection focused specifically on the roof's edges and ridge" ✓ neutral. Clean.

  Hmm wait: "Wind does more to a roof than push against it from the side. As air moves across a sloped surface, it creates a pocket of lower pressure just above the roof compared to the space below the shingles, and that pressure difference physically pulls upward" ✓ fine.

  **storm-chaser (insurance-adjacent #3):** describes the pattern, gives indicators (out-of-state plates, no local address/license, high-pressure same-day contracts, large up-front payment demands) ✓ factual, no advice on claims. "Not every unfamiliar crew canvassing after a storm fits the pattern" ✓ balanced. "A local address, a valid state license, and a documented track record... are the basic checks to run before signing anything" — consumer-protection advice, not insurance advice. No deductible mention. No outcome promises. Clean. Hmm — "unusually large up-front payment demands" — fine.

  One check: "no verifiable local address or license" — NC requires GC license for jobs ≥$30k (was $40k? NC GC licensing threshold: $30,000 historically, raised to $40,000 in 2023? Actually NC raised it to $40,000 effective... I recall NC Session Law raising the GC threshold from $30k to $40k effective Oct 2023? Hmm — no, I believe it went $30k→$40k? Let me not assert; the entry doesn't give a number. "state license number" as a check — city-agnostic phrasing ("a valid state license"). Fine, no claim about NC specifics.

  **recoverable-depreciation (insurance-adjacent #4):** "portion of an insurance payout that is held back on a Replacement Cost Value policy until the roof work is actually completed and documented" ✓. "initial check for the depreciated, Actual Cash Value amount first, then releases the remaining recoverable depreciation once the homeowner submits a final invoice and proof the work was finished" ✓ standard. "Most policies attach a window, often measured in months, within which the work has to be completed" ✓ hedged, true (typically 180 days to 2 years, often 6-12 months; "often measured in months" safe). "Collecting it generally requires completing the repair or replacement and providing that documentation within whatever timeframe the policy specifies." ✓. No outcome promises ("typically", "generally", "most commonly"). No dispute advice. No deductible. Clean.

  Hmm — one nuance: "That held-back amount is not lost. It is recoverable, meaning it becomes payable once the homeowner meets the conditions" — "not lost" + "becomes payable once conditions met" — this is definitional, not a promise (conditions must be met). OK.

  **xactimate (insurance-adjacent #5):** "Xactimate, Verisk's estimating platform" ✓ (Xactware → Verisk; Xactimate is a Verisk product ✓). "widely used across the insurance and construction industries" ✓. "standardized regional pricing data" ✓. "it does not decide whether damage is covered, and the accuracy of the estimate still depends entirely on the accuracy of the measurements and scope fed into it" ✓ excellent neutral framing. "requesting a copy of the Xactimate estimate behind a claim, whether from the adjuster or a contractor, turns a single number into a document. Reading it line by line and discussing it with either party beats accepting or disputing a single number on faith alone." — is this "dispute advice"? It says discussing beats "accepting or disputing... on faith alone" — it explicitly declines to steer toward disputing; it's pro-transparency, neutral. Under a strict reading, "requesting a copy of the estimate" is not dispute advice; it's generic consumer empowerment. I'd call it clean, maybe note as watched-language but compliant.

  Hmm, "Many roofing contractors also use Xactimate, or a comparable estimating tool, so their own estimate can be compared line by line against the adjuster's version" ✓ factual.

  **roof-warranty (insurance-adjacent #6 — wait, is roof-warranty insurance-adjacent? The brief lists it among the six):** "a manufacturer's or contractor's written promise" ✓. "materials warranty... commonly runs 25 to 50 years but usually covers only defective product" ✓ hedged. "coverage often narrows over time and may only pay a prorated amount after the first several years" ✓ true (proration after non-prorated period). "workmanship warranty from the installing contractor... often much shorter" ✓. "Some manufacturers offer an enhanced warranty that extends coverage when the roof is installed by a certified contractor" ✓ true (GAF Golden Pledge, OC Preferred, etc.), hedged ("requirements... are specific and have to be met exactly"). No promises about THIS company's warranty — it's generic. Manufacturer-disputable? "commonly runs 25 to 50 years" — manufacturers might quibble since current flagship products are marketed "Lifetime," but the range covers reality (many products 25-30 yr; premium lifetime warranties prorate to effectively decades). The first-20 architectural entry also says "25 to 50 years." Consistent internal doctrine. Not a dispute a manufacturer could win — "commonly" + range. Clean-ish. One could argue "25 to 50 years" undersells lifetime warranties, but that's not a compliance hole.

  **algae-resistant-shingles:** "copper or other metal-infused granules that discourage the growth of algae" ✓ (copper-containing granules, e.g., 3M copper granules; algae = Gloeocapsa magma — entry doesn't name it, fine). "The metal granules release trace amounts of a compound that is inhospitable to algae as rain washes across the shingle" ✓ (copper ions). "slowing new growth without eliminating existing stains" ✓ accurate. "most major manufacturers back the algae-resistant coating with its own limited warranty" — hmm: manufacturers offer algae-resistance warranties (e.g., StainGuard 10-25 yr, Scotia?? GAF StainGuard Plus 25-year ltd warranty against blue-green algae discoloration). "its own limited warranty" ✓ true, hedged "most major." OK. "dark streaks... are usually a form of algae" ✓.

  Wait — "Because the resistant compound wears down gradually with each rainfall over the years, most manufacturers back algae resistance with its own separate, typically shorter, limited warranty" — "typically shorter" than the shingle warranty ✓ true (10-25 yr vs lifetime). OK.

  **re-decking:** ✓ accurate. "priced per sheet after the old roof is off, not as a fixed number in the original estimate" ✓ consistent with roof-decking entry in the first 20 ✓. "matched to the thickness of the surrounding deck" ✓. "Well-run crews photograph each replaced section" ✓.

  **shingle-exposure:** "typically around 5 to 5 5/8 inches on a standard architectural shingle" ✓ (GAF Timberline exposure 5 5/8"; many laminates 5 5/8"; some 5"). ✓. "so the roof ends up with a consistent number of layers, usually two full layers of material, protecting every square inch" — architectural shingles: standard 5-5/8" exposure on a ~12" tall shingle (metric shingles ~13 1/4"?) gives roughly double coverage + headlap. Laminated shingles are themselves two-layer; with exposure ~half the shingle height you get double coverage of the (doubled) shingle = effectively ~4 plies at any point? Hmm. "usually two full layers of material" — for a standard 3-tab (12" tall, 5" exposure) you have headlap 2" + ... at any point on the roof you're covered by 2 shingles (the one whose exposure zone it is + the one below whose top... no.

  Let me think: shingle height H, exposure E. Each point on the deck is covered by ceil(H/E) shingles... roughly H/E layers. For H=12", E=5": 12/5 = 2.4 → most points covered by 2 layers, some by 3 (in the headlap zone). "usually two full layers" ✓ close enough for homeowner register. For architectural H≈13.25", E=5.625 → 2.35 layers. Fine.

  "Installing at a wider exposure than specified means each course covers less of the one below it, thinning out the protective layering... A tighter than specified exposure wastes material without adding real protection." ✓. "A wider exposure is sometimes used, deliberately or by a rushed crew, to stretch a bundle of shingles across more roof area" ✓ true and a real scam. "correct shingle exposure is not something you can easily verify from the ground once a roof is finished" — hmm, actually you CAN check exposure from the ground with binoculars/measuring visible course heights, or from a ladder. "not something you can easily verify from the ground" — hedged with "easily," fine.

  "That makes it a detail best left to a contractor with a documented, careful process, not the lowest bid that quietly skips the manufacturer's spec." — fine.

  Now other checks:

  **City-agnostic check across 31:** search for "Durham", "NC", "North Carolina", "Triangle", "Carolina" in lines 189-467. From my read: I don't recall seeing any local claims. Let me verify with grep to be sure. Also check the first 20 for comparison (roof-deductible mentions North Carolina — but that's in the first 20, existing corpus, and it's about NC law — interesting: the "city-agnostic definitions (no local claims)" law vs roof-deductible's "In North Carolina it is against the law..." — that's in the EXISTING 20, not my audit scope. The 31 must not have local claims. Let me grep.

  Also "no exclamation points" — grep for "!". And em-dashes — brief says corpus is em-dash-free now (0). Verify no "—" in the 31. Let me run these greps.

  Also numbers: "no invented statistics (numbers as hedged ranges only)". Check numeric claims in the 31:
  - architectural: "25 to 50 years" — range ✓
  - three-tab: "20 to 25 year range" ✓
  - shingle-exposure: "5 to 5 5/8 inches" ✓ (spec, not statistic)
  - Any others? ridge-cap: none. cricket: "a certain width" (hedged, no number) ✓. turbine: none. recoverable-depreciation: "often measured in months" ✓ hedged. hail: none. OK.

  **Register check (target 3):** Compare 31 vs 20.

  First-20 skeleton patterns:
  - shortAnswer: "X is the/a ..." definitional, 2-4 sentences.
  - body: multi-paragraph, "\n\n" separated, usually 5-7 paragraphs. Ends often with "For a homeowner..." paragraph then a closer. Examples: roofing-square ends "A trustworthy estimate is transparent about how many squares your roof is and what each one costs to cover." flashing ends "A good repair finds and reseals the failed flashing rather than just patching the shingles around it." underlayment: "A quality replacement uses a proper synthetic underlayment across the whole roof because it is part of what makes the new roof last its full life." drip-edge: "If an estimate does not mention edge metal, it is fair to ask whether drip edge is included."

  31 patterns: bodies also 5-7 paragraphs. Many include "For a homeowner, ..." paragraph. Closers: sub-fascia: "so ask any contractor who finds it to document the damage with photos before the repair covers it back up." architectural: "the added years of service it buys are the real return on that difference." three-tab: "confirming the manufacturer and profile keeps the patched section blending in with the rest of the slope." ridge-cap: "The ridge line is also one of the few roof details visible from the ground with a careful look, since it usually sits unobstructed against the sky." gable: "A gable end with a working vent and solid bracing costs little extra to build right the first time, and a great deal more to fix after a storm finds the weak spot." dormer: "A targeted flashing repair is usually all a dormer leak needs. The dormer itself rarely has to come off."

  The brief says a previous judge found "template-closer tell across 31/31 — fixed." So closers were diversified. Let me scan for surviving mechanical tells:

  Repeated skeletons in the 31:
  - "For a homeowner," appears in: eave, rake-edge? (no—rake uses "A straight, tight rake edge..."), step-flashing, counter-flashing, kick-out? ("Anywhere a roof edge dead-ends into a wall, check specifically..."), chimney? (no), gutter-apron ("For a homeowner, a gutter apron is one of those small upgrades..."), soffit-vent ("For a homeowner, checking that soffit vents..."), gable-vent ("For a homeowner, having both types..."), attic-baffles ("For a homeowner, missing or crushed..."), shingle-curling ("For a homeowner, curling shingles..."), roof-sagging ("For a homeowner, a sagging roofline..."), hail-bruising ("For a homeowner, hail bruising deserves..."), wind-uplift ("For a homeowner, wind-uplift damage..."), recoverable-depreciation ("For a homeowner, understanding..."), xactimate ("For a homeowner, requesting..."), algae ("For a homeowner choosing shingles..."), shingle-exposure ("For a homeowner, correct shingle exposure...").

  But "For a homeowner" also appears in the first 20 (roofing-square? no. flashing ✓ "For a homeowner, the practical takeaway...", underlayment ✓, drip-edge ✓, ridge-vent ✓, soffit ✓, fascia ✓, roof-valley ✓, roof-decking ✓, ice-and-water ✓, granules ✓, class-4 ✓, tear-off ✓, roof-overlay ✓, roof-pitch ✓, starter-strip ✓, pipe-boot ✓). So "For a homeowner" is corpus-wide house style — present in ~16/20 of the first 20. NOT a tell that splits the 31 from the 20. Good.

  Vocabulary absent from the first 20? Check distinctive words in the 31 not in the 20: "telegraph" (rake-edge), "dead-ends" (kick-out), "short-circuiting" (gable-vent), "legible" (xactimate — "makes a claim estimate legible"), "punch-list" (rake-edge), "reglet"? (not used — entry says "cut groove"). "spongy" (hail). "inhospitable" (algae). "off-gas" (blistering). "sway" (sagging). These are topic-driven (new topics need new words). A register TELL would be a stylistic word repeated across many of the 31 but absent from the 20. Let me look for that.

  Candidates: "documented" — appears in the 31 a lot: sub-fascia ("document the damage with photos"), blistering ("needs a documented look"), sagging ("a documented structural look"), hail ("documented storm inspection", "A documented inspection is the starting point"), wind ("a documented documented inspection"? no — "warrants a documented inspection"), recoverable ("documented"? body says "completing and documenting the work", "completed and documented" in shortAnswer), xactimate ("turns a single number into a document"), re-decking ("photograph each replaced section as a record"). In the first 20: granules ends "Either pattern is worth a documented inspection to learn how much life the roof has left." class-4? no. So "documented" appears once in first 20 (granules), and heavily across the storm/insurance entries in the 31. Is that a tell? It's clustered in the inspection-linked entries (hail, wind, sagging, blistering all link /services/roof-inspection). Frequency: "documented" in 31: sub-fascia(1), blistering(1), sagging(1), hail(2), wind(1), xactimate(0? "document"), recoverable(2)... ~8-9 uses across 31 entries vs 1 in 20. Hmm. It's thematic (inspection documentation), defensible, but a hostile reviewer might note "documented inspection" as a phrase repeated across hail/wind/sagging/granules. First-20 granules also ends with "worth a documented inspection." So it's an existing corpus phrase. Clustered repetition (4 entries with "documented inspection/look") is a mild tell but echoes the existing corpus. LOW.

  Other repeated phrases in 31: "A documented..." / "from the ground" — first 20 uses "from the ground" repeatedly too (underlayment "you would never see it from the ground", granules "check from the ground", pipe-boot? no, soffit? no, starter "It does not show from the ground"). 31: dormer? no; ridge-cap "visible from the ground"; hail "invisible from the ground"/"looks fine from the driveway"; blistering "easy to overlook from the ground"; curling "signs to look for from the ground"; shingle-exposure "verify from the ground"; sagging "seen from the street or the driveway"; rake-edge "from the street". Both corpora use ground-visibility framing heavily. Consistent, not a split tell.

  "quality installations" (target 4): eave says "in warmer climates quality installations add ice and water shield at the eave by choice." First-20 underlayment: "A quality replacement uses a proper synthetic underlayment across the whole roof"; ice-and-water: "A quality replacement specifies where it goes"; starter-strip: "A quality installation uses real starter strip at every edge". So "quality installation/replacement" rhetoric exists in the first 20 too. Target 4 asks: overclaims about what "quality installations" always include — eave entry: "quality installations add ice and water shield at the eave by choice" — this prescriptive framing exists in corpus already ("A quality installation uses real starter strip at every edge"). Consistent with house voice. Could a competitor quote it back? "Quality installations add ice and water shield at the eave" — if the client ever skips eave I&W on a job, homeowner quotes it back. But that's a sales-consistency risk, not an audit hole; and it's hedged less than others ("by choice" softens). I'd note it under target 4 as a watch item, LOW.

  Structural monotony check: Do the 31 follow a rigid skeleton the 20 don't? Compare: first-20 bodies are ~5-6 paragraphs, often: definition→mechanism→why it matters→homeowner takeaway→closer. The 31: same shape but often 6-7 paragraphs. Count paragraphs: sub-fascia 6, architectural 7, three-tab 7, ridge-cap 7, hip 6, gable 7, dormer 7, eave 7, rake 6, step 7, counter 7, kick-out 6, cricket 6, gutter-apron 7, soffit 7, gable-vent 7, turbine 6, baffles 7, blistering 6, curling 7, nail-pops 6, sagging 7, hail 7, wind 7, storm-chaser 6, recoverable 7, xactimate 7, warranty 6, algae 7, re-decking 6, exposure 7. First 20: roofing-square 6, flashing 6, underlayment 6, drip-edge 6, ridge-vent 6, soffit 6, fascia 6, valley 6, decking 6, i&w 7, granules 7, class-4 6, tear-off 6, overlay 6, acv 6, rcv 6, pitch 6, starter 6, pipe-boot 6, deductible 6.

  Hmm! First 20: mostly 6 paragraphs (18/20 = 6; i&w and granules = 7). The 31: 7-paragraph bodies in 21/31, 6 in 10/31. The 31 run slightly longer (7 vs 6 paragraphs). Is that a register tell? Subtle structural shift: the 31 average ~6.7 paragraphs vs 6.1 for the 20. Also last-paragraph split: in the 31, the "For a homeowner" paragraph is often followed by a separate one-line closer (making 7); in the 20, the homeowner paragraph often IS the closer or there's one combined. E.g., 20: drip-edge: "For a homeowner, drip edge is one of those quiet details... \n\n If an estimate does not mention edge metal, it is fair to ask whether drip edge is included." — that's homeowner para + closer = also 2 paras. Hmm, so the 20 also do homeowner-para + closer. Then why 6 vs 7? The 31 have one extra mechanism paragraph. It's a modest drift, visible on close inspection but not a "mechanical tell" like identical sentence skeletons. I'd rate it LOW/observational. Worth noting in answers but not a blocking finding.

  Sentence-skeleton check in the 31: look for repeated opening moves. "A X is..." — standard for glossary, both corpora. Check shortAnswer openings: 20: "A roofing square is...", "Flashing is...", "Underlayment is...", "Drip edge is...", "A ridge vent is...", "The soffit is...", "The fascia is...", "A roof valley is...". 31: "Sub-fascia is...", "Architectural shingles are...", "Three-tab shingles are...", "Ridge cap shingles are...", "A hip roof is...", "A gable roof is...", "A dormer is...", "The eave is...", "The rake edge is...", "Step flashing is...", "Counter-flashing is...", "Kick-out flashing is...", "A chimney cricket...", "A gutter apron is...", "A soffit vent is...", "A gable vent is...", "A turbine vent is...", "Attic baffles are...", "Shingle blistering is...", "Shingle curling is...", "A nail pop is...", "Roof sagging is...", "Hail bruising is...", "Wind uplift is...", "A storm chaser is...", "Recoverable depreciation is...", "Xactimate is...", "A roof warranty is...", "Algae-resistant shingles are...", "Re-decking is...", "Shingle exposure is...". Same definitional openers as the 20 — consistent, expected for a glossary. Not a tell.

  Another candidate tell: em-dash — brief says 0 now. Verify. Also check "!" count. Also semicolon usage? First-20 underlayment shortAnswer uses "; " ? "It acts as a second line of defense..." no semicolons there. Sub-fascia shortAnswer: "It is the load-bearing piece; the fascia board homeowners see is a decorative and functional cover nailed over it." — semicolon. First 20: roof-deductible? Let me check for ";" occurrences. roof-valley? no. Hmm, semicolons: underlayment body? "It is the backup that quietly protects..." no. Let me grep semicolons across the file to compare density. Minor.

  Also "no exclamation points" — grep.

  **Compliance sweep (target 2)** of the six:
  - recoverable-depreciation: factual process description, hedged, no outcome promise, no dispute advice, no deductible mention. One strict-reading flag: "That held-back amount is not lost. It is recoverable, meaning it becomes payable once the homeowner meets the conditions the policy sets" — conditions-qualified, fine. "That first check is not the final word on the claim: it is the first of two payments, and the second is contingent on completing and documenting the work." — contingent ✓. Clean.
  - xactimate: "requesting a copy of the Xactimate estimate behind a claim... Reading it line by line and discussing it with either party beats accepting or disputing a single number on faith alone." — neutral, empowers reading not disputing. Clean under strict reading? A hostile strict reader could say "discussing it with either party beats accepting" nudges toward challenging the insurer. But it equally disfavors disputing on faith. It's balanced. Clean.
  - roof-warranty: generic warranty education. No promises about the client company's own warranty. Clean. "The honest first question with any roof problem is which warranty, if either, actually applies." Fine.
  - hail-bruising: "how it is handled depends on the specific inspection findings and your insurance policy" ✓. "deserves an assessment after any significant hail event" — mild steering to inspection (the client's service) but not claim advice. Clean.
  - wind-uplift: no insurance content beyond "warrants a documented inspection." Clean.
  - storm-chaser: consumer-protection, no claim advice. Clean.

  Zero deductible-practice mentions across the six — verified by reading; let me grep "deductible" in the 31 to be sure (should only appear... nowhere in 189-467; roof-deductible is line 180-187, first-20).

  **Target 4 — quoted-back harm:**
  - eave: "quality installations add ice and water shield at the eave by choice" — see above. LOW watch.
  - architectural: "manufacturer warranties that commonly run 25 to 50 years" — could a manufacturer dispute? Warranties are "limited lifetime" for many architectural lines; 25-50 covers 3-tab-era... actually for architectural: GAF/OC/CertainTeed architectural = "Lifetime limited warranty" standard now. "Commonly run 25 to 50 years" — understates current marketing but matches older/traditional products. A manufacturer wouldn't dispute (it's not disparaging); a homeowner could ask "my bid says lifetime, your site says 25-50" — minor friction, not harm. roof-warranty repeats "25 to 50 years". Consistent. Not a hole. Actually hmm — is "25 to 50 years" defensible? Many architectural shingle warranties: "Limited Lifetime" with 10-15 yr non-prorated SureStart, then prorated. Marketing says lifetime; effective coverage decades. "Commonly run 25 to 50 years" is within the honest band. Fine.
  - roof-warranty: "enhanced warranty that extends coverage when the roof is installed by a certified contractor, effectively combining materials and workmanship protection under one longer term" ✓ accurate (GAF Golden Pledge covers workmanship 25-30 yr via manufacturer). Hedged. Fine.
  - hail-bruising: "A bruised spot has lost some of its protective granule coverage and its structural integrity, so it tends to fail sooner" — industry-standard position ✓.
  - storm-chaser: "unusually large up-front payment demands" as indicator — fine, "unusually" hedged (large down payments alone aren't proof).
  - Any absolute claims? Search "always"/"never" in the 31: ridge-cap? no. Let me grep. "never" appears? I don't recall in the 31. First 20 has "Coverage is never guaranteed" etc. Let me grep to be thorough.

  Also check: "most leaks are flashing leaks" type claims — that's first-20. In 31: "It is a targeted, well-understood repair once correctly diagnosed, and rarely requires touching the rest of the roof." (step-flashing) — fine.

  **Missing-X?** Check the WO context: 31 entries "roofing terms, homeowner-first encyclopedia register". Six insurance-adjacent named — all present ✓. relatedMoneySlug on every entry? From reads: yes, each has one. Slugs unique ✓. Wait — check shingle-exposure has relatedMoneySlug "/services/roof-replacement" ✓ (line 465). And last entry closes array properly ✓.

  Also should I verify the file has no other issues like duplicate slugs with first 20? The 31 slugs are distinct from the 20 ✓ (no overlap seen).

  Let me also check "ice and water shield at the eave" — the eave entry says "Codes in colder regions require an ice barrier there against ice dams" ✓ technically right (IRC requires where Jan avg ≤ 25°F... "in colder regions" hedged, no city claim ✓).

  Now, one more technical nitpick — **ridge-cap-shingles**: "Ridge cap shingles are cut and bent along a factory-scored line so each cap folds cleanly over that peak instead of lying flat like a field shingle." Hmm — many ridge caps are pre-bent/preformed; some are cut from 3-tab. "cut and bent along a factory-scored line" — describes products like GAF TimberTex/Seal-A-Ridge which are perforated/pre-scored cap shingles ✓ accurate for dedicated cap products. Fine.

  "They are installed one at a time along the ridge" ✓.

  **hip-roof insurance line**: "some coastal-state insurance programs offer a wind-mitigation credit for hip roofs after a wind-mitigation inspection" — TRUE (Florida's wind mitigation form gives hip-roof credit; other coastal states have similar). City-agnostic ✓ (doesn't say NC). But wait — house law says insurance-adjacent TERMS stay neutral; hip-roof isn't one of the six, but this line is insurance-adjacent content. It's factual + hedged ("some... vary by insurer and state"). Not an outcome promise. Fine. But flag in answers: an insurance-flavored claim inside a non-designated entry — survives strict reading due to hedging. Mention briefly.

  **sub-fascia "load-bearing"**: "It is the load-bearing piece" — hmm, what load? The sub-fascia carries the gutter/fascia loads and ties rafter tails; calling it "load-bearing" without qualification is slightly loose but the entry clarifies "gives the fascia and gutters something solid to attach to" and "it carries real structural load, rot there is more serious than a cosmetic fascia problem." A pedant could argue the rafters carry the load; sub-fascia is a nailer. But sub-fascia DOES carry gutter loads (a gutter full of water is heavy — hangs from fascia/sub-fascia). "A soft or crumbling sub-fascia often means the rafter tails themselves are compromised" — rot wicks from sub-fascia into rafter tails; "often" is strongish but roofers do sister rafter tails when replacing rotted sub-fascia frequently. I'll not lodge this as a finding; maybe mention in answers as defensible.

  Hmm, wait. Actually, let me reconsider one thing in **sub-fascia**: "it is not something a roofer checks on a routine visual look from the yard" — fine. "Replacing it means rebuilding part of the roof's edge structure rather than just swapping trim" ✓.

  **gable-roof** again — is there anything else? "a flat vertical wall that often carries a gable vent for attic ventilation" ✓. "Because that wall stands straight up rather than sloping away, it presents a flatter target to wind coming from the side" ✓ (gable end walls fail in hurricanes — documented). "extra fastening at the roof-to-wall connection" ✓.

  **Now the em-dash/exclamation/city greps.** Also grep for "!" and "—" and "Durham|NC|North Carolina|Triangle|Carolina|Raleigh" in the whole file, and check where matches are (should be only in first 20 for NC; nothing for Durham). Also grep "deductible" in lines 189+.

  Also double-check numbers for invented statistics: grep for digits in lines 189-467 and evaluate each.

  Let me also verify paragraph counts claim quickly via grep for "\n\n" count per entry? That's more work; my manual counts are decent. I'll soften the claim to "the 31 average one paragraph longer."

  Actually, let me verify my 6-vs-7 paragraph observation with a quick command: count occurrences of "\\n\\n" per body. I can do with awk/perl on the file. The body strings are single lines; count literal \n\n sequences per body line. Let me do that.

  Also grep "For a homeowner" counts in first 20 vs 31 for the register answer. Let me run these.

  Then compose the audit.

  Findings so far:
  - F1 (MED): gable-roof shortAnswer ties wind vulnerability to "braced and vented" — venting has no bearing on wind resistance; a roofer would flag it. Minimal fix: drop "and vented" in the shortAnswer (body already splits comfort vs resilience correctly).
  - F2 (LOW): register drift — the 31 average ~7 body paragraphs vs ~6 for the 20; 21/31 use the "homeowner-paragraph + one-line closer" two-beat ending. Subtle; polish.
  - F3 (LOW): eave's "quality installations add ice and water shield at the eave by choice" — prescriptive "quality installations" claim that could be quoted back if the client doesn't spec eave membrane on every job. Consistent with existing corpus rhetoric (starter-strip "A quality installation uses real starter strip at every edge"), so LOW.
  - Maybe F4 (LOW): "documented inspection/look" phrase cluster across hail/wind/sagging/blistering (+granules in the 20) — mild phrase repetition, echoes existing corpus, polish.

  Check "attic-baffles" closer: "Baffles are genuinely rarely visible without actually looking inside the attic itself first." — clunky ("genuinely rarely... actually... itself first"). LOW polish. Could fold into F2 as example of a sentence that survived oddly. It's grammatical but awkward. I'll fold it as an example.

  Anything HIGH or LAUNCH-KILLER? I don't see one. The six insurance entries are clean. Cupping/clawing verified correct. No em-dashes (verify). No local claims (verify). No exclamation points (verify).

  Let me run the verification greps now:
  1. em-dash "—" and "–" in file.
  2. "!" in file.
  3. city terms: Durham|Raleigh|Cary|Chapel Hill|Triangle|North Carolina|\bNC\b|Carolina
  4. "deductible" occurrences with line numbers.
  5. digits in lines 189-467.
  6. "For a homeowner" count.
  7. "\n\n" counts per body (paragraph counts).
  8. "always|never" in 31 range.
  9. semicolon count per section maybe — skip, minor.

  Also grep "quality installation" occurrences.

• Good:
  - Zero em-dashes/en-dashes/exclamation points in the whole file ✓ (confirms the "0 em-dashes" fix).
  - "deductible"/"North Carolina" only appear in the first-20 entries (lines 140, 149, 180-185 — actual-cash-value, replacement-cost-value, roof-deductible). Zero deductible mentions in the 31 ✓.

  Now: digits in lines 189–467, "For a homeowner" counts, paragraph counts per entry, always/never in the 31.== digit-bearing lines in 189-467 ==
      3 50 years
      3 25 to
      2 5 to
      2 5 5/8 inches
      1 4 impact
      1 25 year
      1 20 to
== For a homeowner count 1-188 vs 189-467 ==
16
20
== always/never in 189-467 ==
      3 always
      2 never
== documented count 1-188 vs 189-467 ==
6
17
Interesting:
  - Numbers in the 31: "25 to 50 years" (x3: architectural shortAnswer, roof-warranty shortAnswer + body), "5 to 5 5/8 inches" (x2, shingle-exposure), "20 to 25 year" (three-tab), "4 impact" (Class 4 reference in architectural — "upgrades like Class 4 impact resistance" ✓ referencing established term). All hedged ranges or product specs ✓.
  - "For a homeowner": 16 in first-20, 20 in the 31 → rate: 16/20 entries vs 20/31 entries — proportional, not a tell ✓.
  - always/never in 31: 3 always, 2 never — let me check contexts. I recall: sub-fascia? no... Let me grep the actual lines to make sure they're not absolute claims that could bite.
  - "document*" stem: 6 in first 20, 17 in the 31 — 2.8x density per entry (0.3/entry vs 0.55/entry). Confirms the "documented" clustering observation. Mild.

  Let me check the always/never contexts and paragraph counts.== always/never contexts (31 range) ==
\n\nBeing lighter and simpler to manufacture, three-tab shingles have always sat at the lower end of the price range, which made them the standard
 lands on a flashing piece and is directed onto the shingle below it, never finding a straight path behind the siding or under the roof.\n\nStep 
e soffit vent from the inside just as effectively as if the vent were never cut.\n\nThat is a quiet failure, because the soffit vents still look 
slope or a general sway across a broader section.\n\nThe cause almost always sits in the structure underneath the shingles rather than in the shin

== paragraph counts per entry (via \n\n count per body) ==
"roofing-square", 1
"flashing", 1
"underlayment", 1
"drip-edge", 1
"ridge-vent", 1
"soffit", 1
"fascia", 1
"roof-valley", 1
"roof-decking", 1
"ice-and-water-shield", 1
"granules", 1
"class-4-shingles", 1
"tear-off", 1
"roof-overlay", 1
"actual-cash-value", 1
"replacement-cost-value", 1
"roof-pitch", 1
"starter-strip", 1
"pipe-boot", 1
"roof-deductible", 1
"sub-fascia", 1
"architectural-shingles", 1
"three-tab-shingles", 1
"ridge-cap-shingles", 1
"hip-roof", 1
"gable-roof", 1
"dormer", 1
"eave", 1
"rake-edge", 1
"step-flashing", 1
"counter-flashing", 1
"kick-out-flashing", 1
"chimney-cricket", 1
"gutter-apron", 1
"soffit-vent", 1
"gable-vent", 1
"turbine-vent", 1
"attic-baffles", 1
"shingle-blistering", 1
"shingle-curling", 1
"nail-pops", 1
"roof-sagging", 1
"hail-bruising", 1
"wind-uplift", 1
"storm-chaser", 1
"recoverable-depreciation", 1
"xactimate", 1
"roof-warranty", 1
"algae-resistant-shingles", 1
"re-decking", 1
"shingle-exposure", 1
The awk paragraph-count approach failed because the body text is on the same line as `body:` key... no wait, the body value is on the NEXT line (the line after `body:`), which is what getline grabs. But gsub returned... it printed n+1 = 1 for all, meaning the \\n\\n pattern didn't match. The file contains literal backslash-n sequences (\n as two chars in the TS string). In awk regex, /\\n\\n/ should match literal "\n\n". Hmm, maybe the issue: in the shell, single-quoted awk program — /\\n\\n/ in awk matches backslash followed by 'n'? In awk, "\\n" in a regex literal is an escaped backslash + n = matches literal \n (2 chars). That should work. But gsub(/\\n\\n/,"X") returns number of substitutions... it printed 1 for all = 0 matches → 0+1=1. So the pattern didn't match. Maybe because the getline line is the long body line — should contain many \n\n. Hmm, why no match? Possibly awk on Windows Git Bash (gawk) treats it differently. Let me just count with grep -o per line instead, or use a simpler approach: for each body line, count occurrences of the literal two-char sequence backslash-n backslash-n using grep -o and wc -l.

  Actually simpler: use perl or python? Use grep: for lines matching body content (the long lines), echo each and pipe to grep -o '\\n\\n' | wc -l. Let me do it with a bash loop over line numbers.

  Alternatively count total \n\n occurrences in 1-188 vs 189-467 and divide by number of entries: first-20 has 20 bodies, 31 range has 31 bodies.

  Total paragraph count first20 = (count of \n\n in 1-188) + 20. For 31 = count in 189-467 + 31.

  The always/never contexts are all benign:
  - "have always sat at the lower end of the price range" — historical claim about 3-tab, fine.
  - "never finding a straight path behind the siding" — mechanism description, fine.
  - "as if the vent were never cut" — fine.
  - "almost always sits in the structure" — hedged with "almost," fine.

  No absolute-claim problems.

  Let me get the \n\n counts.first20 nn count:
11
new31 nn count:
25
per-entry body paragraph distribution (31 range):
     44 1
     12 2
      5 3
      1 4
per-entry body paragraph distribution (first 20):
     31 1
      7 2
      2 3
Hmm, that doesn't look right. Total \n\n in first 20 = 11? The roofing-square body alone has 5 \n\n sequences (6 paragraphs). Let me recount: roofing-square body: "When you get a roof estimate...\n\nThat number drives...\n\nIt helps to know...\n\nThe steeper...\n\nUnderstanding squares...\n\nA trustworthy estimate..." — that's 5 \n\n = 6 paragraphs. So total of 11 across 20 entries can't be right... unless grep -o '\\n\\n' isn't matching overlapping or... wait 11 for first 188 lines but roofing-square alone has 5. flashing body has 5. underlayment 5. So it should be ~100. The grep pattern must be off: '\\n\\n' in grep (basic regex) — backslash-n in grep BRE: \n is just 'n'? In GNU grep BRE, '\n' matches... actually in GNU grep, "\n" in the pattern matches a literal 'n'?? No — grep patterns can't match newlines normally; \n in the pattern string... In GNU grep, a backslash followed by n in the pattern matches a literal lowercase n? Let me think: grep 'a\nb' — GNU grep interprets \n as newline in the pattern? Actually GNU grep does support \n in patterns as newline since some version? Hmm, but the text contains literal backslash + n (2 chars), not a newline. I need to match the literal two characters '\' 'n'. In BRE, to match a literal backslash you use '\\'. So pattern '\\n' in shell single quotes becomes \n in grep = ... ambiguous. My earlier grep -o '\\n\\n' | wc -l gave 11/25 — small numbers, suggesting it matched something else (maybe literal "nn"? if \n→n, then \\n\\n → \n\n → nn... wait shell single quotes pass \\n\\n verbatim to grep; grep BRE sees \\ = literal backslash, n = n, \\ = backslash, n = n → matches "\n\n" literal. That should be right and give ~100+.

  But the counts were 11 and 25. Hmm, and the per-entry loop: 44 lines with 1 paragraph?? There are only 51 entries. The regex '^      ".*",$' matched all string lines (shortAnswer AND body AND term?) — 6-space indented quoted lines include shortAnswer values and body values (both are 6-space indented). shortAnswer has no \n\n. So ~51 shortAnswer lines + 51 body lines = 102 lines; distribution counted both. That's why "1" dominates. My per-entry loop was polluted by shortAnswer lines.

  And total counts 11/25 are wrong too... unless grep -o '\\n\\n' only counted... hmm wait, maybe it matched correctly? Let me sanity check: roofing-square body line — does it contain literal \n\n? Yes (shown in Read as \n\n). grep -c would count lines, -o counts occurrences per line separately (multiple matches on one line each print). So it should print 5 for that line. Unless... GNU grep in BRE: '\\n' → the pattern is backslash-backslash-n → matches literal "\n"? Hmm wait, shell single-quoted '\\n\\n' passes 6 chars: \ \ n \ \ n to grep. BRE: \\ = literal \, then n = literal n, \\ = literal \, n = literal n → matches "\n\n" literal. That's what I want. So why 11?

  Oh wait — maybe the earlier command DID work: first20=11?? No. roofing-square line 14 contains 5. Let me just directly test. Actually — maybe grep -o with '\\n\\n' matched "n\n" hmm no.

  Let me just test directly with a known line and also fix per-entry counting by only taking body lines (the line after "body:"). Simpler: use awk to grab lines following /body:/ and count matches of literal \n\n using index() loop or gsub. Earlier awk attempt failed — gsub(/\\n\\n/,"X") returned 0. In gawk, /\\n\\n/ regex literal: \\ → escaped backslash (matches \), n → n. Should match. Unless... mawk? Git Bash awk might be gawk. Hmm, but it printed 1 for all, i.e., 0 matches. Odd.

  Wait — maybe the getline grabbed the wrong line. Pattern /body:/ matches the line `    body:` — getline reads NEXT line (the long string). That line contains \n\n... unless on disk the string is actually broken? No, Read showed single long lines with \n\n literals.

  Hmm, possibly awk's /body:/ also matched within... no.

  Let me test with python instead — cleaner. Or node. Actually simplest robust: python one-liner reading the file, regex split into entries, count \n\n per body field.

  Actually, do I even need precise paragraph counts? My manual counts from reading were: first 20 mostly 6 paragraphs; 31 mostly 7. The failed grep gave first20=11?? That contradicts manual counts badly (roofing-square alone = 5). Something's off with the tool chain; let me verify with python to get ground truth. If manual counts hold (6 vs 7), the register-drift observation stands; let me confirm precisely.

entries: 51
first20 paragraph dist: {6: 14, 7: 6}
new31   paragraph dist: {6: 11, 7: 20}
first20 avg paragraphs: 6.3
new31   avg paragraphs: 6.645161290322581
first20 avg body chars: 1248
new31   avg body chars: 1538
first20 avg shortAnswer chars: 431
new31   avg shortAnswer chars: 505
• Now I have real numbers:
  - Paragraphs: first20 = 6.3 avg (14×6, 6×7); new31 = 6.65 avg (11×6, 20×7). Mild shift toward 7.
  - Body length: 1248 vs 1538 chars (+23%).
  - shortAnswer: 431 vs 505 chars (+17%).

  So the 31 run measurably longer than the 20 — a structural drift, not an identical-skeleton tell. Both use 6–7 paragraphs, so the shapes overlap; the 31 skew longer/fuller. Is this a "register tell separating the 31 from the 20"? It's quantitative drift, visible if you read several entries back to back: new entries feel a touch more exhaustive. Severity LOW.

  Let me also double-check a few remaining verification items:
  1. Cupping/clawing — verified correct in shingle-curling ✓.
  2. Any duplicated sentence skeletons repeated verbatim-ish across the 31? Let me do a quick check for repeated 6-gram overlap between entries. Maybe quick python for top repeated phrases (5-8 words) appearing in ≥3 entries within the 31, and compare against first-20 presence. That would catch a surviving mechanical tell rigorously.

  Let me run that.3 entries (first20:3 new31:0) :: to point out what was found
3 entries (first20:3 new31:0) :: the homeowner files and owns the
3 entries (first20:3 new31:0) :: site to point out what was
3 entries (first20:3 new31:0) :: point out what was found but
3 entries (first20:3 new31:0) :: photos and a written report and
3 entries (first20:3 new31:0) :: on site to point out what
3 entries (first20:3 new31:0) :: homeowner files and owns the claim
3 entries (first20:3 new31:0) :: and is not a public adjuster
3 entries (first20:3 new31:0) :: adjuster on site to point out
Excellent — the n-gram sweep shows:
  - The only 6-grams repeated across ≥3 entries are the insurance-disclaimer boilerplate in the FIRST 20 (ACV/RCV/deductible entries: "the homeowner files and owns the claim", "photos and a written report", "not a public adjuster", etc.).
  - NO 6-gram repeats across ≥3 of the new 31. So the "template-closer tell" fix held — no surviving repeated sentence skeletons in the 31 at the 6-word level.

  Let me also run a 5-gram and 4-gram check to see if anything meaningful repeats at a slightly lower threshold within the 31 specifically, and check vocabulary tell: words used frequently in the 31 but absent from the 20.== 5-grams in >=3 of the 31 ==
3 :: the rest of the roof
3 :: it is one of the
3 :: is one of the more

== content words frequent in 31 but absent from 20 ==
13 typically
12 side
7 framing
7 looks
7 separate
7 reroof
7 missing
6 shape
6 style
6 some
6 anywhere
Findings from the register analysis:

  1. 5-grams in ≥3 of the 31: only three, all benign collocations ("the rest of the roof", "it is one of the", "is one of the more"). "It is one of the more..." — hmm, that IS a mild rhetorical move. Let me check where "one of the more" appears in the 31 vs 20. "one of the more common places" (dormer), "one of the more leak-prone features" (dormer — twice in dormer?), "one of the more skill-dependent parts" (cricket), "one of the more expensive oversights" (kick-out), "one of the more forgiving problems" (nail-pops), "one of the more expensive"... Let me count "one of the more" in 31 vs 20. If it's like 5+ times in the 31 and rare in the 20, that's a small rhetorical tic. Let me check.

  2. "typically" — 13 of the 31 entries use "typically", ZERO of the first 20 use it! That is a genuine register tell: a hedge-word appearing in 42% of the new entries and completely absent from the existing corpus. That's exactly the kind of vocabulary tell the brief asks about ("vocabulary absent from the first 20"). Severity: MED? It's a real, machine-detectable tell (stylometric analysis would flag "typically" instantly). It doesn't harm the homeowner; it's a register-consistency issue. The success criterion: "no register tell separating the 31 from the 20." A word used 13/31 vs 0/20 is a statistically loud tell. I'd rate this MED (real but survivable; minimal fix = swap roughly half the instances for corpus-consistent hedges like "usually", "often", "generally" — which the first 20 DO use).

  Let me verify "typically" count in first 20 = 0, and count "usually/often/generally" both ranges for the contrast. Also check "one of the more" occurrences.

  3. "reroof" (7), "framing" (7), "side" (12), "shape" (6), "style" (6) — these are topic-driven (the 31 cover structure/flashing/geometry topics the 20 don't: sub-fascia, hip/gable, dormer, step/counter/kick-out flashing, cricket...). "reroof" is a roofer-register word absent from the first 20 — the first 20 use "replacement/replace". Hmm, "reroof" appears 7 times across the 31 and 0 in the 20 — that's also a vocabulary tell, though it's more defensible (industry term). Let me check counts precisely. Both "typically" and "reroof" absent-from-20 words used repeatedly across the 31. "typically" is the louder tell because it's a style marker, not a topic word.

  Let me count: typically, usually, often, generally, one of the more, reroof, in both ranges.

'typically': first20 0 entries/0 total | new31 13 entries/15 total
'usually': first20 8 entries/11 total | new31 17 entries/25 total
'often': first20 9 entries/13 total | new31 17 entries/30 total
'generally': first20 1 entries/1 total | new31 6 entries/10 total
'commonly': first20 1 entries/1 total | new31 5 entries/7 total
'reroof': first20 0 entries/0 total | new31 7 entries/9 total
're-roof': first20 1 entries/1 total | new31 0 entries/0 total
'one of the more': first20 0 entries/0 total | new31 4 entries/5 total
'one of the most': first20 3 entries/4 total | new31 3 entries/3 total

typically in: ['three-tab-shingles', 'hip-roof', 'dormer', 'counter-flashing', 'chimney-cricket', 'nail-pops', 'hail-bruising', 'wind-uplift', 'recoverable-depreciation', 'roof-warranty', 'algae-resistant-shingles', 're-decking', 'shingle-exposure']
reroof in: ['hip-roof', 'gable-roof', 'dormer', 'step-flashing', 'chimney-cricket', 'gutter-apron', 'roof-sagging']
• Now I have hard numbers for the register tells:

  1. **"typically"**: 0/20 first entries → 13/31 new entries (15 total uses). Loud tell. MED.
  2. **"reroof"**: 0/20 (first 20 use "re-roof" once — roof-overlay entry: "sometimes called a re-roof") → 7/31 entries, 9 uses. The 31 use the closed form "reroof"; the 20 use "re-roof"/"replacement". A spelling/register tell. LOW-MED. Fold with typically as one finding? They're both "vocabulary absent from the first 20" tells. I'd make "typically" its own MED finding and "reroof vs re-roof" a LOW (also a consistency-of-spelling issue).
  3. **"one of the more"**: 0/20 → 4/31 entries, 5 uses. Mild rhetorical tic. LOW. Fold into register finding as secondary evidence.

  Hedge words "usually/often" are common in both — good, that's the shared register.

  So the register findings: 
  - F-a (MED): "typically" 0→13 entries. Fix: replace most instances with "usually"/"often" (corpus-consistent) or delete; keep a couple.
  - F-b (LOW): "reroof" (closed) 0→9 uses vs corpus's "re-roof"; plus "one of the more" tic ×5. Fix: standardize to "re-roof"/"replace" phrasing, vary the "one of the more" construction.

  And earlier:
  - F (MED): gable-roof shortAnswer "braced and vented" — venting irrelevant to wind resistance. Verify the exact text again: "The tradeoff sits at the gable ends themselves, which can be more vulnerable to wind if not properly braced and vented, particularly in exposed locations." Yes. A veteran roofer would catch it. Minimal fix: "...if not properly braced, particularly in exposed locations" (drop "and vented"), since the body already covers venting under comfort.

  - F (LOW): eave "quality installations add ice and water shield at the eave by choice" — quote-back risk; also slightly at odds with... wait, is it at odds with the first-20 ice-and-water-shield entry? That one says "Even in a warm climate where actual ice dams are rare, the membrane earns its place by sealing the valleys, eaves, and penetrations" — consistent house position. So not inconsistent. The risk is only quote-back if the company doesn't always spec it. But the first-20 corpus already commits to this position, so it's not a NEW exposure introduced by the 31. The eave entry's phrasing "quality installations add... by choice" is prescriptive about third-party installs. It's consistent with corpus doctrine. I'll demote this to a note in the answers rather than a finding. Actually target 4 explicitly asks about "overclaims about what 'quality installations' always include" — the eave line is the closest thing in the 31. But since the 20 already establish this exact position (starter strip, underlayment, I&W "quality installation/replacement" claims), the marginal exposure is nil and fixing it would create inconsistency with the 20. Mention in answer 4 as "watched, not a finding."

  - Paragraph-length drift: 6.3→6.65 avg paragraphs, body 1248→1538 chars (+23%), shortAnswer 431→505 (+17%). Quantitative drift. LOW (polish). Worth one finding? The brief's register target asks about "structural monotony" — actually the 31 are slightly LESS monotonous in paragraph count distribution? No — 20/31 have 7 paragraphs vs 14/20 having 6. The 31 skew to 7. It's drift, not monotony. LOW finding or fold into register answer. I'll fold it into the register finding as evidence/secondary.

  Now the technical sweep — anything else I should double-check before writing? Let me re-scan the entries for roofer-catchable errors:

  1. sub-fascia: "caps the ends of the rafters" — hmm, actually the FASCIA caps the rafter ends; sub-fascia (when present) is the rough board the finish fascia attaches to. The entry says sub-fascia "runs behind the visible fascia trim and caps the ends of the rafters or trusses." Both descriptions overlap; in 2x sub-fascia + wrap construction the sub-fascia is indeed attached to the rafter ends. OK.

  Wait, one more: "A soft or crumbling sub-fascia often means the rafter tails themselves are compromised." Hmm, is "often" defensible? When a roofer replaces rotted sub-fascia, the rafter tails are usually sound; rot is often confined to the sub-fascia/fascia. Claiming rafter tails are "often" compromised could overstate. But rot does wick into rafter tails in prolonged cases. Hmm. This is a judgment call — a roofer might say "sometimes," not "often." Is it a finding? It could nudge a homeowner toward expecting bigger repairs... but it also sets up "document with photos." Borderline. I rated earlier as not-a-finding; keep it as a mention in answer 1 as "watched phrasing, defensible." Hmm — actually the brief says every finding needs concrete hole → failure scenario → minimal fix; and invented findings are a defect. The rafter-tails "often" is defensible enough (prolonged edge rot commonly does reach tails — roofers sister tails on such jobs routinely). Not a finding.

  2. architectural: "two or more layers laminated" ✓. "standard choice on most new roofs today" ✓. "warranties commonly run 25 to 50 years" — hmm, current flagship architectural shingles are marketed "Lifetime limited warranty." Is "25 to 50 years" wrong? Products like GAF Timberline HDZ: "Lifetime" (with defined meaning). CertainTeed Landmark: "Lifetime." OC Duration: "Limited Lifetime." But plenty of architectural products carry 30-yr etc. And "lifetime" warranties legally resolve to prorated decades. "Commonly run 25 to 50 years" — a manufacturer rep could quibble ("ours is Lifetime!") but it's not a factual error that harms; and the same range appears in roof-warranty entry and is hedged with "commonly." Keep as note under answer 4 (manufacturer-disputable? no — it doesn't disparage; it's a range). Not a finding.

  3. ridge-cap: install direction verified correct ✓. "take the most direct sun exposure and the highest wind loads of any shingle on the house" — plausible, standard roofer claim ✓.

  4. hip-roof: insurance line is hedged ✓. "more total roof surface than a gable roof over the same footprint" ✓ true.

  5. gable-roof: the "vented" issue (finding). Also: "a flat, vertical triangular wall, the gable, at each end" ✓.

  6. dormer: "most often in an upstairs bedroom or attic conversion" ✓. "valley or cricket flashing where the dormer's small roof ties into the main slope" — fine hedged.

  7. eave: "Because rain concentrates and drains off at the eave, it is one of the roof's highest-wear areas" — hmm, "highest-wear"? Valleys wear faster (concentrated flow mid-slope). The eave gets gutter/drip-edge issues and ice dams. Calling the eave "one of the roof's highest-wear areas" — defensible (edge exposure, wind, water exit). "One of" hedged. Fine.

  8. step-flashing: ✓. One check: "each one set at the top of a single shingle course and tucked behind the wall covering above it. As the next course of shingles goes on, it covers the bottom of that flashing piece" — hmm. Actual mechanics: step flashing piece sits with horizontal leg ON TOP of the shingle below (on the deck, over the top of the shingle course just laid), vertical leg up the wall; the NEXT course covers the horizontal leg. Entry: "each one set at the top of a single shingle course" ✓ (sits on top of the course), "the next course of shingles... covers the bottom of that flashing piece" ✓ (covers the horizontal/bottom leg). Correct.

  Also: "Each piece overlaps the one below it and is tucked partly under the siding above" — "tucked partly under the siding" — the vertical leg goes behind the siding/housewrap ✓ standard.

  9. counter-flashing: ✓ verified.

  10. kick-out: ✓.

  11. cricket: ✓. "Debris that would otherwise collect against the chimney's back wall gets carried down the same channels" ✓.

  12. gutter-apron: ✓. "some crews substitute a slightly oversized standard drip edge instead, which narrows the gap but does not fully close it" — plausible ✓.

  13. soffit-vent: ✓.

  14. gable-vent: short-circuit claim is mainstream doctrine ✓ hedged with "can".

  15. turbine-vent: "that spinning motion pulls attic air up and out through the vent faster than a stationary opening would on its own. On a breezy day, that mechanical assist genuinely moves more air than a passive vent of the same size" — building-science folks debate whether turbines outperform box vents of equivalent NFA; manufacturers claim wind-assisted extraction. "Genuinely" is an assertion on a debated point, but it's the standard industry account, and a roofer wouldn't call it "wrong" — it's what the industry says. Not a finding.

  16. attic-baffles: ✓. The awkward closer sentence — fold into register finding as example? "Baffles are genuinely rarely visible without actually looking inside the attic itself first." — grammatically clumsy ("genuinely rarely... actually... itself first"). Also semantically odd after "Ask about them any time attic insulation work is done." It's a LOW polish item. I'll include it in the register findings as a third sub-point.

  17. blistering: ✓ — adjuster-grade distinction correct.

  18. curling: ✓ cupping/clawing verified correct.

  19. nail-pops: ✓.

  20. sagging: ✓.

  21. hail-bruising: ✓ technical (mat fracture without penetration, soft/spongy, granule displacement) — matches HAAG-style descriptions. Compliance clean.

  22. wind-uplift: ✓ physics right, zones right.

  23. storm-chaser: ✓. One strict-read: "a request for a large payment before any real work has been scheduled are patterns that show up disproportionately among traveling crews" — fine. "unusually large up-front payment demands" in shortAnswer ✓.

  24. recoverable-depreciation: ✓. "The insurer typically issues an initial check for the depreciated, Actual Cash Value amount first" ✓. One nuance: some insurers withhold recoverable depreciation but the first check = ACV minus deductible — the entry doesn't mention deductible subtraction (which is fine — "zero deductible-practice mentions" law). It says "initial check for the depreciated, Actual Cash Value amount" — technically ACV minus deductible, but omission ≠ error, and the house law requires staying away from deductible mechanics in these entries. Fine.

  25. xactimate: ✓ Verisk ✓.

  26. roof-warranty: ✓. "materials warranty... commonly runs 25 to 50 years but usually covers only defective product" ✓. "workmanship... often much shorter... exist entirely at the discretion of the installing contractor" ✓.

  27. algae: ✓.

  28. re-decking: ✓ consistent with roof-decking entry (per-sheet pricing doctrine matches).

  29. shingle-exposure: ✓ "5 to 5 5/8 inches" ✓. "usually two full layers of material" ✓ close enough. One check: "It is calculated against the shingle's up-slope height, the dimension running from the bottom edge to the top edge of each shingle, not its length along the course" ✓ correct and a nice clarification.

  30. hip-roof "four, or more on complex shapes, sloped planes" ✓.

  Anything about ridge-cap "starting from the end away from the prevailing wind and working toward it" — I verified the physics is self-consistent (laps face away from wind source). But hold on — is it consistent with manufacturer instructions? CertainTeed says: "beginning at the end of the ridge opposite the direction of the prevailing winds" — wait, hmm. If prevailing wind comes FROM the west, "the direction of the prevailing winds" — direction of wind could mean where it heads (east). "Opposite the direction" = west end. Start west, work east. Then laps face east (downwind)... which is what the entry gets with "start away from the prevailing wind [source?]..." Ugh, the manufacturer phrasing itself is famously ambiguous/confusing, and different guides interpret differently. The entry's internal physics ("exposed lap edge faces away from the wind, gusts press the laps down") is the commonly taught rationale and self-consistent: start at the lee end, work toward the weather side — hmm wait no.

  Hold on, let me redo this once more very carefully, because this is exactly the kind of thing a veteran roofer would catch if backwards.

  Standard teaching (e.g., roofing textbooks): "Start at the end of the ridge opposite the prevailing wind and work toward the prevailing wind, so the laps face away from the wind." Wait, that's contradictory as I analyzed. Let me look at actual IKO instruction: "Apply ridge cap shingles... beginning at the end of the ridge opposite to the prevailing wind direction." Hmm, GAF: "Start at either end... In areas of high wind, start at the end opposite the prevailing wind direction." 

  Physical intent: wind should blow OVER the laps, not INTO them. Laps = the exposed end edge of each cap shingle (the edge you see stepping along the ridge). When you install moving in some direction, each new cap covers part of the previous; the visible step edge of the NEW cap is on the side you came FROM... 

  Ugh, let me do it with shingles on a slope as the reference: courses installed bottom-up. Each upper course laps over the lower course. The exposed lap edges face DOWN-slope (the bottom edge of each shingle is visible; tops are covered). Water flows down over the steps. So: installation direction = up-slope; visible edges face down-slope = OPPOSITE to installation direction... no: the visible bottom edge of each shingle faces down-slope; you install moving up-slope; visible edges point back toward where you started (down). So visible lap edges face TOWARD the start point, i.e., opposite the direction of installation travel.

  For wind to blow over laps like water: wind travel direction should match water flow = from covered side toward exposed edges = same direction as... water flows in the direction the visible edges point. So visible edges should point in the direction the wind BLOWS TOWARD (downwind). Visible edges point toward the START of installation. So start at the DOWNWIND end, install toward the UPWIND end (working into the wind).

  Entry says: "starting from the end away from the prevailing wind and working toward it" — "the end away from the prevailing wind": if "prevailing wind" is labeled by source (west wind), the end away from it = east end = downwind end ✓ start there; "working toward it" = toward the wind source = upwind ✓. Then visible lap edges face back toward the start = downwind = "away from the wind [source]" ✓ "each cap's exposed lap edge faces away from the wind. Gusts press the laps down instead of prying them up" ✓ — consistent: wind travels downwind, flows over the steps, presses down. CORRECT.

  And manufacturer "start at the end opposite the prevailing wind direction": if "wind direction" = where wind comes from (meteorological convention), opposite = downwind end ✓ same as entry. Consistent with GAF/CertainTeed under the standard convention. 

  So ridge-cap entry is correct. Good — no finding.

  Now, let me also double check "storm-chaser" for the claim "unusually large up-front payment demands" — in NC, is there any law about deposits? NC has no specific residential roofing deposit cap (some states do, e.g., California 10%/$1000). Entry is city-agnostic ✓.

  One more compliance angle for the six: does anything function as "insurance advice"? 
  - recoverable-depreciation: "understanding recoverable depreciation helps explain why an initial insurance check often looks smaller" — explanatory, not advisory ✓. "so delaying the repair can put that second check at risk" — hmm! "delaying the repair can put that second check at risk" — is that advice? It's a factual statement about policy time windows ("Most policies attach a window..."). Under strict reading it nudges prompt repair (which happens to benefit the roofer). But it's true and framed as policy mechanics. I'd flag it as watched-language in answer 2, not a finding. Actually... it's factual: if you delay past the window, you forfeit recoverable depreciation. That's standard policy mechanics education. Clean.
  - xactimate: "requesting a copy... whether from the adjuster or a contractor" ✓ neutral.
  - roof-warranty: no insurance ✓.
  - hail/wind: point to "documented inspection" — the client sells inspections; that's marketing-adjacent but not insurance advice ✓.
  - storm-chaser: ✓.

  No outcome promises anywhere: grep "guarantee" in 31? I don't recall any. The first-20 use "never guaranteed." Quick check not needed — I read everything; no guarantees promised in the 31.

  Now severity assignment per anchors:
  - LAUNCH-KILLER: none.
  - HIGH: none (no likely-rework-level defect).
  - MED: 
    - F1: gable-roof "braced and vented" — roofer-catchable technical conflation. Success criterion #1 says "no factual error a roofer or adjuster would catch" — this is one a roofer would catch, albeit benign. MED.
    - F2: "typically" 0/20 → 13/31 — a measurable register tell directly against success criterion #3 ("no register tell separating the 31 from the 20"). MED.
  - LOW:
    - F3: "reroof" (9 uses, closed spelling) vs corpus "re-roof"; plus "one of the more" ×5; plus length drift (+23% body, +17% shortAnswer, paragraph skew 6→7); plus the awkward attic-baffles closer sentence. Bundle as polish? Hmm, the brief wants each finding concrete with minimal fix. I'll make F3 = "reroof" spelling/register (LOW), F4 = length/structure drift + "one of the more" tic (LOW). And maybe F5 = attic-baffles clunky closer (LOW). Don't over-inflate: the brief says invented findings are a defect. These are real but minor. I'll present F1, F2 as MED; F3 (reroof/one-of-the-more/length drift bundled as "secondary register drift" — actually no, keep findings crisp: F3 = reroof spelling tell; F4 = structural length drift; and mention baffles sentence inside F4 as an example of surviving roughness? The baffles closer is a distinct sentence-level flaw. Eh — I'll bundle "one of the more" + baffles sentence + length drift as F4 "minor polish items" — no, the format wants concrete. Let me structure:

  F1 (MED) gable-roof shortAnswer technical conflation.
  F2 (MED) "typically" register tell.
  F3 (LOW) "reroof" closed spelling 9× vs corpus "re-roof"; "one of the more" ×5 rhetorical tic.
  F4 (LOW) structural drift: bodies ~23% longer, shortAnswers ~17% longer, paragraph mode 6→7; e.g., attic-baffles closer is the clunkiest surviving sentence.

  Verdict: SOUND TO MERGE — yes, contingent on... hmm. "SOUND TO MERGE yes/no". With 2 MED findings? The anchors: MED = real but survivable. Neither MED causes material harm or certain rework. The gable "vented" line is a 4-word fix. The "typically" tell is a find-replace-level fix. Are they launch-killers against stated success criteria? Criterion: "no factual error a roofer or adjuster would catch" — the gable line is arguably such an error (a roofer would go "venting doesn't brace a gable"). Strictly, that means criteria aren't 100% met. But is it worth blocking a merge tonight? It's a one-line edit. I'd say: SOUND TO MERGE = yes, after two minimal pre-merge edits (F1, F2), or merge-and-patch — but since they ask "before this merges tonight," the honest answer: yes, sound to merge once F1/F2 are patched (each <5 minutes); neither is a launch-killer. Hmm — verdict must be one paragraph, yes/no. I'll say YES conditioned on the two MED micro-fixes; if the team treats the success criteria literally, F1 must be fixed pre-merge (it's the kind of thing an adjuster-roofer audience notices) and F2 is the exact tell class the re-judge was run to catch. That's the candid read.

  Actually, let me reconsider F2's severity. The chain fixed "template-closer tell across 31/31" and "19 em-dashes" — i.e., the judges DO treat register tells as merge-blocking majors. A 0→13 hedge-word split is precisely a "register tell separating the 31 from the 20" — the stated success criterion #3. By the chain's own standards, that's a major. But severity anchors here: HIGH = likely rework. F2 likely triggers rework if a re-judge runs. Hmm. I'd keep F2 MED-with-explanation: by the audit chain's own precedent (em-dash fix), vocabulary tells were treated as majors; mechanically it's a survivable tell for readers but a loud one for any re-judge/stylometry. I'll call it MED leaning HIGH? No — be decisive: the reader-facing impact is nil (typically is a normal word), but against the literal success criterion ("no register tell separating the 31 from the 20") it fails. The criterion is the contract. I'll rate it MED and say in the verdict: merge should wait for the two micro-fixes — verdict "yes, after F1+F2 patches" = effectively "SOUND TO MERGE: yes, conditional." The format wants yes/no. I'll answer "Yes — conditional on two sub-five-minute fixes (F1, F2); no launch-killer or HIGH found." That's honest.

  Hmm, wait. Let me reconsider whether F1 is really an error. "The tradeoff sits at the gable ends themselves, which can be more vulnerable to wind if not properly braced and vented, particularly in exposed locations." 

  Could "vented" be defended? Gable vents and wind: in hurricanes, gable vents can admit wind-driven rain and increase internal pressure... actually there IS a real argument: unvented or poorly vented gable ends — no. Wind vulnerability of gable ends is structural (bracing of the gable wall, connections). Venting relates to moisture/heat. A veteran roofer reading "more vulnerable to wind if not properly braced and vented" would say bracing yes, venting no. However — counterpoint: some building-science discussions note attic pressurization through gable vents in high wind (FL Building Code actually restricted gable-end vents in some HVHZ discussions? Not exactly). There is a marginal argument that vent openings affect wind pressure. But as written, "braced and vented" as the two conditions for wind vulnerability conflates systems; the body itself separates them (vented→comfort, braced→storm). The cleanest read: shortAnswer has a conflation the body doesn't. A roofer could catch it; failure scenario: adjuster/roofer audience loses trust, or a competitor screenshots it. Minimal fix: delete "and vented". Keep MED.

  Also — double-check the "hip roofs are generally more wind-resistant" claim once more. Yes: hip roofs perform better in hurricanes (documented in post-hurricane damage assessments; wind mitigation credits exist). ✓.

  And "gable roofs... fewer seams and hips... less total roof surface than a hip roof over the same size home" ✓.

  One more possible technical check — turbine vent: "using that spin to pull hot air up and out of the attic faster than a passive vent alone" — fine as industry account.

  And soffit-vent "letting outside air flow up into the attic. Paired with an exhaust vent higher on the roof, such as a ridge vent, soffit vents are the intake half of a balanced attic ventilation system" ✓.

  Kick-out: "A missing kick-out flashing is a well-documented cause of hidden wall rot" ✓ (well documented — building science literature, home-inspection literature).

  Gutter apron: "Unlike standard drip edge, which simply directs water off the roof edge, a gutter apron aims that water directly into the gutter" ✓. "It is installed at the eave only, not along the rake" ✓.

  Counter-flashing: "typically embedded into a masonry joint on a chimney or wall" ✓.

  OK. Also target 4: "warranty statements a manufacturer could dispute" — roof-warranty entry: "materials warranty... commonly runs 25 to 50 years" and "may only pay a prorated amount after the first several years" — manufacturers describe non-prorated periods as 10-15 yrs on premium lines; "the first several years" is a bit short ("several" ≈ 3-7). Hmm: GAF SureStart = 10 yrs (HDZ lifetime). "After the first several years" undersells a bit. Would a manufacturer dispute? It's generic ("often narrows over time and MAY only pay a prorated amount after the first several years") — "may" hedged. Could a homeowner with a 10-yr SureStart read "several years" as 3-5 and feel misled? Marginal. It's hedged; "several" is vague enough. Not a finding; mention in answer 4 as watched. Hmm — actually, "coverage often narrows over time and may only pay a prorated amount after the first several years" — for many products proration kicks in after 10 years (or 15-50 on premium). "The first several years" most naturally reads ~3-7 years, which UNDERSTATES the non-prorated window for flagship products. A manufacturer could quibble this undersells their warranty. But direction of error favors caution, not overclaim — it doesn't overpromise. Target 4 is about overclaims. An underclaim doesn't hurt the business when quoted back (if anything it sets low expectations). Note in answers. Not a finding.

  Also algae: "most major manufacturers back the algae-resistant coating with its own limited warranty" ✓ true (GAF StainGuard, OC StreakGuard, CertainTeed StreakFighter). Fine.

  Architectural "25 to 50 years" vs "Lifetime" marketing — underclaim direction again; safe when quoted back. Fine.

  Recoverable-depreciation: "often measured in months" ✓ (typ. 6-24 months; 180 days minimum common; "months" correct).

  Xactimate "Verisk's estimating platform" ✓.

  Now Answer 5 — THE ONE THING before merge: the gable-roof "and vented" deletion? Or the "typically" sweep? Which is THE one? Success criteria rank factual error first. But the chain's history shows register tells get caught and bounced. The gable fix is one word-ish; the typically fix is ~15 instances across 13 entries, swap ~10 of them to "usually/often" — a 15-minute mechanical pass. If only ONE thing: fix the two MEDs together — but the question demands one. I'd say: the gable "braced and vented" conflation is the one thing, because criterion #1 (no error a roofer would catch) is the launch criterion that external audiences enforce; the "typically" tell only matters to an internal re-judge. Hmm — but honestly the "typically" 0→13 is the finding most likely to cause this lane to fail its OWN gate (a re-judge will flag it statistically). The brief says "THE ONE THING before this merges tonight" — practical answer: run the two micro-fixes together; if forced to pick one, F1 gable (the only remaining statement a trade audience would call wrong). I'll frame: F1 first, F2 immediately after; both fit in one commit.

  Missing-X section: optional. Things I checked that are absent/clean: no city claims, no em-dashes, no exclamation points, no deductible mentions in the 31, all 6 insurance-adjacent entries present, cupping/clawing correct, numbers all hedged ranges or product specs. I could note "MISSING-nothing material" or skip. Maybe a short MISSING-CONTEXT note: I could not verify relatedMoneySlug targets exist (out of scope — only glossary.ts was readable). That's an honest disclosure: the slugs (/services/roof-inspection etc.) were not verified against the site tree since brief restricts reading to this one file. That's a legitimate MISSING-X entry: MISSING-LINK-VERIFICATION. Also could not check GlossaryTerm type/JSON-LD rendering. Keep it one line.

  Also note: first-20 roof-deductible/ACV/RCV contain NC law references and deductible language — that's EXISTING corpus (outside audit scope), mentioned only to note the 31 correctly stay clear of it. Actually wait — house law says "city-agnostic definitions (no local claims)" — roof-deductible says "In North Carolina it is against the law..." That's in the first 20, presumably previously gated and accepted (the WO externally audited). Not my scope; the brief says first 20 are context only. I'll not lodge it. Could add one line in observations: the 20 themselves contain NC references, so "no local claims" evidently applies to the 31; the 31 comply.

  Let me also verify no other numbers I missed in the 31: digit grep found only 25/50, 20/25, 5/5-5/8, Class 4. ✓ All hedged or spec.

  Word-count honesty: my avg body chars 1248 vs 1538. Let me also give median? Not needed.

  One more: "one of the more" — which entries? dormer (×2: "one of the more common places", "one of the more leak-prone features"), cricket ("one of the more skill-dependent parts"), kick-out ("one of the more expensive oversights"), nail-pops ("one of the more forgiving problems"). 5 uses/4 entries vs 0 in first 20. Dormer uses it twice — that's within-entry repetition worth naming.

  Also check dormer: "one of the more common places an older or poorly flashed roof develops a leak" + "one of the more leak-prone features on an older roof" — yes two in one entry. Also note dormer's shortAnswer says "one of the more common places" and body repeats "one of the more leak-prone features" — redundant pair within a single entry. Good concrete detail for F3.

  Now — format: "## VERDICT (SOUND TO MERGE yes/no, one paragraph) · ## FINDINGS (F1..Fn) · ## ANSWERS (numbered) · optional ## MISSING-<X>". Style: hostile reviewer, not polite, caveman-bullets are the house style for reports... the AGENTS.md style guide says caveman bullets, ✅/❌/⚠️, no exclamation points. This is an audit deliverable; keep it tight markdown, findings with hole→failure→fix.

  Also the brief says "Do not be polite" and "Zero findings is a valid... outcome; invented findings are a defect." I have 4 findings, 2 MED 2 LOW. Defensible.

  Length: keep it disciplined. Write the audit as the reply (stdout markdown, per brief — "Output format (markdown, stdout)"), not a file. The user said "produce the written audit it specifies. Analysis only." and brief says READ-ONLY, stdout. So the audit IS my reply. No file writes. Good.

  Verdict paragraph: SOUND TO MERGE: yes, conditional. Hmm — the format: "VERDICT (SOUND TO MERGE yes/no, one paragraph)". I'll say "yes, after two micro-fixes (F1, F2)" — that's a yes-with-conditions, stated plainly.

  Actually, should the conditional make it a "no"? The chain treats register tells as majors requiring fix-before-merge. F1 is a roofer-catchable conflation violating criterion 1. F2 violates criterion 3 literally. If I say "yes" flatly I'd be ignoring my own MEDs against the stated success criteria. The honest verdict: **No — not as it stands at 92088a6; sound to merge after F1 and F2 land (both minimal, mechanical, sub-30-minute fixes). Nothing HIGH or LAUNCH-KILLER; the six insurance-adjacent entries are clean.** That is the candid hostile-reviewer answer. A conditional yes is still a "not yet." Given the brief's own success criteria ("no factual error a roofer would catch; no register tell"), and two live violations, verdict = NO (fix-forward, low-cost). Hmm, but is F1 really a "factual error"? "more vulnerable to wind if not properly braced and vented" — it's a conflation; strictly the statement as written claims venting affects wind vulnerability = wrong mechanism. A roofer WOULD catch it. Criterion 1 failed, technically. And F2 fails criterion 3 literally. So verdict NO with immediate-cheap-path-to-yes is the defensible call. If I'm too lenient I fail the brief; if too harsh I invent. NO, fix two things, then merge — that's precise.

  Hmm, one more re-examination of F2 severity and whether it's really a "tell": "typically" — is it absent from the first 20 truly? Verified 0/20 entries, 0 total uses. 13/31, 15 uses. Also "typically" appears in... let me name some: three-tab ("typically carry shorter manufacturer warranties"), hip-roof ("typically has more total roof surface"), dormer ("typically a window"), counter-flashing ("typically embedded"), cricket ("typically required by code"), nail-pops ("typically an easy, inexpensive repair"), hail ("typically shows up"), wind (none? list said wind-uplift yes: "typically appear"), recoverable ("typically issues an initial check", "typically... "?), warranty ("typically much shorter"), algae (none? list includes algae-resistant-shingles: "typically shorter, limited warranty"), re-decking ("typically priced per sheet"), shingle-exposure ("typically around 5 to 5 5/8 inches"). It's pervasive. A stylometric diff flags it instantly. Real tell. MED stands.

  And F1 failure scenario: quoted back by a competitor/adjuster? "your glossary says gable ends resist wind if 'vented' — venting doesn't brace a wall" — credibility ding on a site whose whole pitch is technical authority. Minimal fix: strike "and vented" (venting already covered in body under comfort). 

  F3: "reroof" closed-form 9×/7 entries vs corpus "re-roof"/"replacement" — fix: standardize to "re-roof" or rephrase. Plus "one of the more" 5× (dormer twice) vs 0× — vary. LOW.

  F4: length drift: bodies +23% (1248→1538 chars), shortAnswers +17% (431→505), paragraph mode shifts 6→7 (20/31 at 7 vs 14/20 at 6). Not monotony — inflation. Fix: trim ~5-8 of the longest bodies by one paragraph. LOW. Include attic-baffles closer as example of surviving roughness? The baffles closer: "Baffles are genuinely rarely visible without actually looking inside the attic itself first." — awkward double hedge (genuinely/actually), "itself first" dangling. Put it as LOW sub-item in F4? Or its own F5 LOW polish. I'll fold into F4 as a named example — no, cleaner: F4 = structural length drift; mention baffles sentence in Answer 3 as example. Hmm, the brief wants findings concrete. Folding a discrete sentence flaw into a statistical finding muddies both. Decide: F4 covers length/structure drift only; baffles sentence gets named inside Answer 3 text as a surviving rough sentence worth one edit while touching the file. Acceptable.

  Wait — actually, is the baffles sentence even wrong? "Ask about them any time attic insulation work is done. Baffles are genuinely rarely visible without actually looking inside the attic itself first." Meaning: you can't see them without going into the attic. It's clumsy but parseable. "genuinely rarely" + "actually" + "itself first" — three intensifier-ish crutches in one sentence. It's polish. Fine as an answer-mention.

  Let me also double-check the hip-roof insurance sentence for target 2/4 once more: "That same aerodynamic profile is also why some coastal-state insurance programs offer a wind-mitigation credit for hip roofs after a wind-mitigation inspection, though the credit and its terms vary by insurer and state." — True (e.g., FL OIR-B1-1802 form hip-roof credit), hedged, no NC claim, no outcome promise ("some... vary"). Clean. But it IS an insurance-flavored sentence in a non-designated entry — under strict reading of house law, the six named terms carry the insurance constraints; hip-roof mentioning insurance credits is factual and neutral. Note in Answer 2 as checked-and-clean.

  Answer 1: technical sweep — everything else verified: cupping/clawing correct (edges-up concave = cupping; center-up edges-down/flat = clawing), ridge-cap install direction + rationale correct, step-flashing weave mechanics correct, cricket code threshold hedged correctly, exposure numbers correct (5–5⅝"), uplift physics + edge/corner concentration correct, blister-vs-bruise distinction correct. Only catch: gable "braced and vented" (F1). Watched-but-defensible: sub-fascia "often means rafter tails compromised," turbine "genuinely moves more air."

  Answer 2: six entries — clean; enumerate the hedges; note hip-roof's insurance-credit sentence also survives strict reading; note recoverable-depreciation's "delaying the repair can put that second check at risk" is policy mechanics, not pressure; xactimate's "discussing... beats accepting or disputing on faith" is symmetric, not dispute-steering. Zero deductible mentions (grep-verified: deductible appears only in first-20 entries).

  Answer 3: register — F2/F3/F4; positive: "For a homeowner" cadence matches (16/20 vs 20/31), 6-gram overlap clean (the only repeated boilerplate is the first-20 insurance disclaimer), shared vocabulary usually/often aligned; tells: typically 0→15, reroof 0→9, one-of-the-more 0→5, length +23%.

  Answer 4: quote-back — watched: eave "quality installations add ice and water shield at the eave by choice" (consistent with existing corpus claims re starter/underlayment, so no NEW exposure); algae "most major manufacturers back... its own limited warranty" (true); architectural/roof-warranty "25 to 50 years" (underclaims current "Lifetime" marketing — safe direction); roof-warranty "prorated after the first several years" (vague but hedged with "may"; also an underclaim — safe direction). No absolute "always includes" claims found in the 31; the "always/never" grep hits are all benign.

  Answer 5: THE ONE THING — fix F1 (gable "and vented") in the same commit as the F2 "typically" sweep; if only one: F1, because it's the sole remaining statement a roofer/adjuster would call wrong, and this site sells technical authority.

  MISSING-X: MISSING-LINK-VERIFICATION — brief restricted reads to glossary.ts; the 31 relatedMoneySlug targets (/services/roof-repair, /services/roof-replacement, /services/gutters, /services/roof-inspection, /roofing-cost) were not verified to exist as routes. Also rendering/JSON-LD path not inspected.

  Also MISSING-BUILD-VERIFICATION? The brief said 3 commits, gates green — I take that as given; I didn't run anything (read-only). One line.

  Now write the final audit. Keep it tight, hostile-reviewer tone, markdown, no files created. Include evidence numbers verbatim. Caveman-ish bullets fine per house style; no exclamation points (house law anyway).

To resume this session: kimi -r session_c8235b03-8089-48b6-b479-5604e817aa5c
