• Let me start by reading the WO file and the full-hoods.json, and check the current git state.

?? wo/WO_SEO_LANE_W_CITY_SWEEP.md
?? wo/full-hoods.json
b87be3c seo-lane-w batch 1 fix: raleigh/durham directional corrections
6594fe0 seo-lane-w batch 1 fix: array work-claim rule (v3)
278bfdd seo-lane-w batch 1: durham + raleigh
f475d19 seo-lane-h FIX ROUND: /quote/ exact-200 gate, tripwire length+flag checks, floor msg appendix, matcher comment
5c15623 seo-lane-h: guard content-equality tripwire + sitemap floor + quote matcher tighten
seo-w-city-sweep
• Interesting — git status shows lib/cities.ts is NOT modified. The user said "the edits are UNCOMMITTED in lib/cities.ts right now" but git status shows only untracked wo files. Let me check if lib/cities.ts differs from HEAD. Wait — git status --short shows nothing modified. So the batch-2 edits... maybe they were committed? Let me check git log more and diff. Actually the last commit is "seo-lane-w batch 1 fix". Hmm, maybe the prior run died before even editing? Or edits exist but git doesn't show? Let me check diff and read the report.

 lib/cities.ts                 |  76 +++++++++++++++---
 wo/BUILD_REPORT_SEO_LANE_W.md | 182 ++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 246 insertions(+), 12 deletions(-)
---
352:    slug: "apex",
390:      src: "/cities/apex.jpg",
1060:  apex: { lat: 35.7327, lng: -78.8503 },
• Interesting — `git diff f475d19 --stat` shows lib/cities.ts modified (76 lines changed) plus the report. But `git status --short` showed only untracked wo files. Wait — the first Bash call: `git status --short && git log --oneline -5`. Output showed `?? wo/WO_SEO_LANE_W_CITY_SWEEP.md` and `?? wo/full-hoods.json` — no modified lib/cities.ts. But the second call `git diff --stat HEAD -- lib/cities.ts` shows changes vs HEAD... and diff vs f475d19 shows lib/cities.ts + report. Hmm wait — HEAD is b87be3c which is batch-1 fix. The diff vs HEAD shows 76 lines changed in lib/cities.ts? But git status showed no modifications!

  Wait, actually the first output — maybe status output got merged. Let me re-check: `?? wo/WO_SEO_LANE_W_CITY_SWEEP.md` `?? wo/full-hoods.json` then log lines. No ` M lib/cities.ts`. But git diff --stat HEAD -- lib/cities.ts printed nothing actually? Look at output:

  ```
   lib/cities.ts                 |  76 +++++++++++++++---
   wo/BUILD_REPORT_SEO_LANE_W.md | 182 ++++++++++++++++++++++++++++++++++++++++++
   2 files changed, 246 insertions(+), 12 deletions(-)
  ```

  Hmm, that could be the output of `git diff f475d19 --stat` (the second command). The first command `git diff --stat HEAD -- lib/cities.ts` printed nothing (empty). So... wait but if diff vs HEAD is empty, diff vs f475d19 would just be the batch-1 commits. But then where are the uncommitted batch-2 edits?

  Hmm, but wait — the wo/ report file is tracked? It shows in diff vs f475d19 but not in git status, meaning it was committed in batch-1 commits. And diff vs f475d19 shows lib/cities.ts changed by batch-1 commits (durham + raleigh = 76 lines).

  But hold on — diff vs f475d19 should include batch 1 changes across 3 commits. 76 insertions-ish for two cities' weave + report 182 lines. Plausible.

  So the puzzle: user says batch-2 edits are uncommitted in lib/cities.ts, but git status is clean. Maybe the prior run actually committed? git log shows top is batch-1 fix. No batch-2 commit. So either the edits were lost, or... maybe the worktree state differs. Let me check if apex entry has batch-2 content (count "36 completed roofs"). Let me grep.===
15
No stash, and no batch-2 count strings ("36 completed roofs" etc.) in lib/cities.ts. So the batch-2 edits are NOT present — the prior run's edits were lost (or never saved). The brief's premise is wrong. Per HARD RULES: "STOP-and-report on forced guesses" — but this isn't a forced guess; it's a factual finding: batch-2 edits don't exist. Rather than stopping entirely, the reasonable course: report the discrepancy and proceed to do batch 2 myself (the user clearly wants batches 2 and 3 completed). The instruction says "(2) REVIEW the uncommitted batch-2 edits ... fix any gap you find" — since there are no edits, I must author batch 2 from scratch following the WO, then gates, commit, then batch 3.

  Auto mode: don't ask user, make reasonable decision and continue. The user's ultimate goal is clearly: batches 2+3 done, gated, committed, reported. I'll do that and note the discrepancy prominently.

  This is a large task. Plan:
  1. Read lib/cities.ts in full (at least the 6 batch-2 entries + 6 batch-3 entries + reference entries cary/durham/raleigh for patterns). It's a big file — 1060+ lines. Let me read it.
  2. Read existing BUILD_REPORT_SEO_LANE_W.md (committed).
  3. Look at batch-1 commits for pattern (durham/raleigh entries as molded).
  4. Check batch-1 follow-up: v3 says chapel-hill array flagged.
  5. Do batch-2 edits for apex, morrisville, wake-forest, garner, clayton, pittsboro.
  6. Run gates: typecheck, build, server on :3221, spam-410-guard, doorway-check, reachability-check, oracle.
  7. Commit batch 2.
  8. Batch 3 for the six Tier-2 cities.
  9. Gates + oracle again, commit batch 3.
  10. Extend report.

  Let me read the cities file and report. lib/cities.ts is ~1060 lines. Let me read it fully — 1000-line cap, read in two parts. Also read the report.Now I need to read lib/cities.ts fully. The read output was saved to a file; I can page through it. The file is 1075 lines. Let me read it in chunks from the output_path or directly from lib/cities.ts with offsets.

  This is a big task. Strategy: read lib/cities.ts in 2 chunks (lines 1-540, 540-1075). Actually I already have lines 1-859 in the output file. Let me read the remaining lines 860-1075, and also read the batch-2 city entries carefully. Let me read the full file via Read with offsets on lib/cities.ts directly.The Read tool truncates previews at 50K chars. I need to page through the full output file. Let me read the output_path files with offsets, or better read lib/cities.ts in smaller chunks (e.g. 200 lines each). Cities to examine: batch-2 (apex, morrisville, wake-forest, garner, clayton, pittsboro) and batch-3 (knightdale, holly springs, hillsborough, wendell, fuquay-varina, zebulon), plus reference patterns (cary done entry, durham/raleigh batch-1 entries).

  Let me find line numbers of each slug first.80:    slug: "raleigh",
173:    slug: "cary",
223:    slug: "knightdale",
266:    slug: "garner",
309:    slug: "clayton",
352:    slug: "apex",
395:    slug: "morrisville",
423:    slug: "wake-forest",
451:    slug: "holly-springs",
479:    slug: "wendell",
507:    slug: "fuquay-varina",
535:    slug: "zebulon",
563:    slug: "rolesville",
616:    slug: "durham",
668:    slug: "chapel-hill",
721:    slug: "hillsborough",
769:    slug: "pittsboro",
846:    slug: "burlington",
927:    slug: "sanford",
995:    slug: "wilson",
I now have most entries. I still need lines 223-265 (knightdale — already have from earlier read: lines 222-264), 265-350 (garner, clayton — have), 451-561 (holly-springs, wendell, fuquay-varina, zebulon — have), 721-768 (hillsborough — have), 769-814 (pittsboro — have). 

  Wait — interesting: some entries look already quite elaborated (hillsborough has an em-dash "—" in intro line 739; pittsboro has em-dashes too). Hmm, those may be from prior lanes. Note I5 says no em-dashes ADDED beyond existing house usage — pittsboro/hillsborough already have them, but I shouldn't add new ones.

  Also note pittsboro already mentions "Chatham Park", "Powell Place", "Chatham Forest", "Fearrington Village (nearby)" — and full-hoods says pittsboro book = only Fearrington Village (2). Per v3, array entries must be book-supported — but wait, pittsboro is Tier-1 in batch 2. Its array has Chatham Park, Powell Place, Chatham Forest, Courthouse Circle, Fearrington Village. Only Fearrington Village is in the book. Per v3 array rule, array entries MUST be book-supported. Hmm — but that means the pittsboro array would shrink to just ["Fearrington Village"]? v3 says "Tier-2 cities: array = their book hoods... arrays may shrink to 3-4 items". For Tier-1 pittsboro with only 1 geocoded hood... WO §2 says "Only Fearrington Village is geocoded — Fearrington is the ONLY hood claim permitted". So the array must become book-supported only. But an array of 1? That seems odd but honest. Hmm — v3 says arrays may shrink to 3-4; an honest short array beats a padded one. For Pittsboro only 1 hood exists. What did batch 1 do? Durham array: 6 book-supported entries. Raleigh: 6 book-supported.

  Wait, but was the v3 rule applied to batch-1 only? "Array entries MUST be book-supported (present in full-hoods.json for that city)." That's general. So for batch 2: every array entry must be in full-hoods.json for that city.

  Apex book hoods: Abbington (3), Sunset Hills (2), Hallmark West (1), The Park at West Lake (1), Sweetwater (1), Pearson Farms (1), Cameron Park (1), Ellington Place (1), Scotts Mill (1), Brittany Trace (1), Merion (1), Shepherd's Vineyard (1), Waterford Green (1), Deerfield Park (1), Haddon Hall (1). Current array: ["Downtown Salem Street historic district", "Villages of Apex", "Haddon Hall", "Scotts Mill"]. Haddon Hall (1) and Scotts Mill (1) are book-supported. Salem Street (0, pre-adjudicated UNSUPPORTED — convert to descriptor or delete) and Villages of Apex (0) must be removed from array. New array e.g.: ["Abbington", "Sunset Hills", "Haddon Hall", "Scotts Mill", "Shepherd's Vineyard", "The Park at West Lake"] (4-6 items per §3.3... wait §3.3 says array stays 4-6 items, but v3 overrides for Tier-2 to allow 3-4. For Tier-1 keep 4-6).

  Also v2.C pre-adjudicated: Salem Street (apex) UNSUPPORTED as work-claim. Existing apex claims: answer says "account for any added review on Salem Street historic-district homes before we schedule" — that's a service claim bound to Salem Street... it's about permitting review, not "we completed work there". Hmm, v3 says localConsiderations claims that bind a 0-book hood to service activity ("every estimate", "we check", "our crews") get the same scrub. The FAQ "We work on the older Salem Street historic-district homes regularly" — that's a work-claim on a 0-book hood → scrub per v2.C (convert to descriptor or delete). heroImage.alt "Historic roofline restoration on a Salem Street home in downtown Apex, NC" — alt asserts completed work in 0-book hood → de-attribute to "a Apex, NC home" per v2.D.

  Wait, but v2.F for Apex says: "heritage town (Salem Street descriptors stay) with a 36-deep book in the planned communities." So Salem Street descriptors stay in prose (as descriptors of the town), but work-claims like "we work on ... regularly" must go, and the alt de-attributed.

  This is getting big. Also note: the user's brief says the prior builder already edited all 6 batch-2 cities and edits are uncommitted — but they're not there. Since the work must be done regardless, I'll author batch 2 myself.

  Wait — should I double check whether there's maybe another worktree or the edits are in a different branch? git branch shows seo-w-city-sweep. git status clean. Let me also check for any backup files like lib/cities.ts.bak. Quick check.

  Also, should I stop and report? The HARD RULE says "STOP-and-report on forced guesses". The missing edits aren't a forced guess — the WO fully specifies what to do. The pragmatic path: note the discrepancy in the report and build batch 2 from scratch. Given auto mode says continue without asking, and the user's final goal is explicit (batches 2+3 done, gated, committed, reported), I'll proceed.

  Let me read the remaining parts of the file I haven't seen: lines 855-1075 (burlington rest, sanford, wilson, CITY_COORDS) — frozen, but I need to know them for not touching. Also lines 1-52 I've seen partially (types). I have enough.

  Also, note this file seems to be a different/newer version than what batch-1 report describes (report says durham at lines 563-636 — matches current). Good.

  Now, door-check: there's a scripts/doorway-check.mjs that computes pairwise similarity <40%. Fine.

  Let me now check the count of cities: 20 slugs listed. Good.

  Now I need to check what the gates are: package.json scripts. Let me look at scripts: spam-410-guard.mjs, doorway-check.mjs, reachability-check.mjs exist. Check package.json.

  Plan of work:

  BATCH 2 — six Tier-1 cities:

  1. **APEX (36)**: 
     - Scrub: Salem Street work-claims → descriptors. Current work-claims: answer "account for any added review on Salem Street historic-district homes before we schedule" (service activity bound to Salem St — hmm, this is a permitting-planning claim, arguably not a completed-work claim. v2.C lists "Salem Street (apex)" as UNSUPPORTED (0 book jobs — convert to descriptor framing or delete the work-claim). The FAQ "We work on the older Salem Street historic-district homes regularly" is definitely a work-claim → delete/convert. The answer's permitting sentence — "homes in the Salem Street historic district can carry additional review" is a descriptor of process; keep as descriptor framing (generic). The alt "Historic roofline restoration on a Salem Street home" asserts completed work → de-attribute to "a Apex, NC home"? v2.D: de-attribute to "a <City>, NC home". Alt becomes e.g. "Historic roofline restoration on an Apex, NC home". Hmm but "restoration" still asserts completed work — "on an Apex, NC home" is fine since book has 36 Apex roofs. Actually simpler: "Steep historic roofline on a home in downtown Apex, NC"? The instruction: de-attribute the 0-book hood → "a <City>, NC home". I'll write "Historic roofline work on an Apex, NC home".
     - Array: must be book-supported only. New: ["Abbington", "Sunset Hills", "Scotts Mill", "Haddon Hall", "Shepherd's Vineyard", "The Park at West Lake"]. That's 6, all book-supported.
     - Evidence weave: intro + answer count-led with 36; name 4-6 hoods: Abbington, Sunset Hills, Hallmark West, The Park at West Lake, Sweetwater, Scotts Mill, Shepherd's Vineyard, Haddon Hall → choose 4-6. Spine v2.F: heritage town (Salem Street descriptors stay) with a 36-deep book in planned communities.
     - Count-FAQ: unique question, distinct from cary/durham/raleigh. E.g. "Where has Mabrey Roofing worked in Apex?" Hmm — count-FAQ should carry the count. E.g. "How many roofs has Mabrey Roofing completed in Apex?" — too close to Cary's "How many Cary roofs has Mabrey Roofing completed?" Anti-template: no 8+ word clause shared. "How many roofs has Mabrey Roofing completed in Apex" vs Cary's "How many Cary roofs has Mabrey Roofing completed" — shares "roofs has Mabrey Roofing completed" (5 words) — ok under 8. But distinctness requirement: 8 distinct constructions. Let me vary:
       - Apex: "What does Mabrey Roofing's Apex track record look like?" — hmm raleigh used "track record". Use: "How many Apex homes has Mabrey Roofing re-roofed?" 
       - Wake Forest: "How established is Mabrey Roofing in Wake Forest?"
       - Pittsboro: "Has Mabrey Roofing done much work in Pittsboro?"
       - Garner: "How many Garner roofs are in Mabrey Roofing's book?"
       - Clayton: "Does Mabrey Roofing have real experience in Clayton?"
       - Morrisville: "How much of Mabrey Roofing's work is in Morrisville?"
     - metaDescription with count ≤155.

  2. **WAKE FOREST (24)**:
     - Scrub: "the old college / North Main" pre-adjudicated UNSUPPORTED as work-claims. Current: answer "from pre-war homes in the Historic District near the old college" (descriptor of homes — is it a work-claim? "handling repair and full replacement across town, from pre-war homes in the Historic District near the old college to first-replacement architectural shingles in Heritage, Traditions, and Holding Village" — that IS a work-claim bound to those places. Heritage is book-supported (7 combined). Traditions, Holding Village, Wakefield — 0 book jobs (not in full-hoods wake forest list). FAQ1: "We work the older homes around the old college and along North Main regularly" → work-claim on 0-book → scrub. Array: ["Wake Forest Historic District", "North Main Street", "Heritage", "Traditions", "Holding Village", "Wakefield"] — only Heritage book-supported. v3: array must be book-supported. New array from book: Heritage North at Heritage Wake Forest (6), Olde Mill Stream (4), St. Ives (1), Austin Creek (1), Crenshaw Hall Plantation (1), Wakefield Estates (1), Heritage Wake Forest (1)... Array entries 4-6: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"]. Heritage is the anchor. Note the book has "Heritage North at Heritage Wake Forest" and "Heritage Wake Forest" — naming the array entry "Heritage" covers both (§2 says Heritage (Heritage North / Heritage Wake Forest) anchor at 7 combined).
     - Spine: one anchor community (Heritage) carrying a 24-roof book.
     - Existing intro mentions "the streets around the old college and the homes along North Main" as descriptors — may stay as descriptors per v2.C ("the old college / North Main (wake forest)" listed as UNSUPPORTED work-claims — convert to descriptor framing). Intro's "Mabrey Roofing roofs both worlds. A pre-war home under heavy oaks near the seminary and a builder-grade tear-off in Holding Village ask for different work" — "we roof both worlds" + Holding Village (0-book) work-claim → Holding Village must go as work-claim. Rewrite intro: count-led, Heritage anchor.

  3. **PITTSBORO (13)**: only Fearrington Village hood claim permitted. 
     - Current array: Chatham Park, Powell Place, Chatham Forest, Courthouse Circle, Fearrington Village (nearby). Only Fearrington Village book-supported. v3 array rule → array must shrink to book hoods only. That's 1 item. Hmm. v3: "arrays may shrink to 3-4 items — an honest short array beats a padded one." A 1-item array? The band "Dispatched Across {city}" with count stat of 1... Awkward but honest. Alternatively keep array with just Fearrington Village. Hmm, what does CityBoards render — let me check components/location/CityBoards.tsx to see how it handles a 1-item array. Also §2: "Fearrington is the ONLY hood claim permitted; the rest of the copy works the count + the town's real axes." So work-claims on Chatham Park/Powell Place/Chatham Forest must be scrubbed. Current answer: "from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place" — work-claims on 0-book hoods → convert to descriptors. FAQ "Do you serve Chatham Park and Fearrington Village?" "Yes. We serve Chatham Park's new neighborhoods, the established subdivisions like Powell Place and Chatham Forest..." → service claims on 0-book hoods → scrub. Fearrington stays (book 2 jobs). Note FAQ answer says "Fearrington Village area between Pittsboro and Chapel Hill" — fine as descriptor.
     - Spine: count + town's real axes (Chatham growth, Fearrington), quietest register. Count-FAQ needed (Tier-1). Intro count-led with 13.
     - Array: I'll need to decide. Given v3, array = ["Fearrington Village"]. Let me check CityBoards rendering first.

  4. **GARNER (11)**: hoods 1 each: Southills, Hunter's Mark, Hillington West, Heather Hills, Pleasant Woods — name at most 3, "from X to Y" spread phrasing.
     - Scrub: Creekside (garner) pre-adjudicated UNSUPPORTED. Current: answer "from Creekside and the White Oak corridor to homes near Lake Benson and Lake Wheeler" — work-claim-ish. intro "north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks" — descriptor? It describes conditions in Creekside, arguably a descriptor not a completed-work claim. But the answer's "handling repairs, full replacements... from Creekside..." is a work-claim → scrub. alt "Algae-resistant shingle replacement on a Creekside home near Lake Benson" → completed-work alt on 0-book hood → de-attribute to "a Garner, NC home".
     - Array: ["Creekside", "Cleveland Bluffs", "Lake Benson area", "White Oak corridor"] — none book-supported. New array from book: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"] (5 items, all book).
     - Spine: spread-not-depth, "from X to Y", working-town register. Count 11 in intro+answer+FAQ+meta.

  5. **CLAYTON (10)**: ZERO geocoded hoods — count-led but NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors. v3: array stays AS-IS (["Flowers Plantation", "Riverwood", "Glen Laurel"]) — flagged in report as known limitation.
     - But work-claims on Flowers Plantation? Current answer: "From the newer builder-grade roofs filling Flowers Plantation... to older homes near Riverwood, we know that Clayton's open subdivisions..." — "we know" claims. Existing claims are descriptor-ish ("From X to Y" framing of the town's housing). Hmm — v2.F: "lean on the existing Johnston-County first-replacement thesis". The scrub: pre-existing claims of completed work... "we work this jurisdiction routinely" fine. Flowers Plantation claims are housing-stock descriptors mostly. FAQ "My Flowers Plantation home is almost new..." — customer-voice question, fine. I'd convert explicit "we work from X to Y" completed-work framings carefully. Actually the current answer says "We work this jurisdiction routinely and pull the correct permit the first time." That's jurisdiction-level, fine. I'll keep descriptors, add count: "10 completed roofs". New count-FAQ. metaDescription added (clayton currently has none? Let me check — clayton entry has no metaDescription visible... entry ends at heroImage without metaDescription. Right, lines 346-349 show heroImage then closing — no metaDescription. Tier-1 requires metaDescription with count.)
     - Note §2 Clayton: "count-led but NO new neighborhood work-claims". So intro: "10 completed roofs across Clayton..." without naming hoods as work sites. Flowers Plantation/Riverwood stay as descriptors.

  6. **MORRISVILLE (10)**: Carpenter Village trap. Four existing "Carpenter Village" claims unsupported → scrub per v2.E: do NOT substitute Carpenter Park into old sentences; rebuild those clauses on Kitts Creek (3) + Breckenridge (3). Wait — Breckenridge is book-supported (3). Kitts Creek (3). Array: ["Breckenridge", "Carpenter Village", "Kitts Creek", "Shiloh Grove", "Savannah", "McCrimmon at the Park"] — book: Kitts Creek 3, Breckenridge 3, Carpenter Park 1, Village at Town Hall Commons 1, Downing Glen 1, Addison Park 1. New array: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park"] — 5 items all book-supported. (Carpenter Village, Shiloh Grove, Savannah, McCrimmon at the Park all 0-book → out of array.)
     - Rebuild clauses mentioning Carpenter Village: answer line 396, intro line 404, localConsiderations line 408, FAQ1 line 415. Replace with Kitts Creek/Breckenridge.
     - Count 10 weave: intro + answer + count-FAQ + meta. Current metaDescription exists without count → update with count ≤155.
     - Spine: compact-town register, two leaders carry the evidence, transit-corridor thesis stays.

  BATCH 3 — Tier-2 (knightdale, holly-springs, hillsborough, wendell, fuquay-varina, zebulon): NO totals anywhere (digit or word), weave book hoods into intro/housingStock as completed-work mentions, no count-FAQ, arrays = book hoods (+ existing only if book-supported).

  - **Knightdale**: book: Carrington Woods (2), Timber Ridge (1), Churchill (1). Pre-adjudicated: Mingo Creek + Langston Ridge + Planters Walk as WORK claims unsupported — may stay as housing descriptors. Current knightdale: answer "...builder-grade roofs across Mingo Creek, Langston Ridge, and Planters Walk are now hitting 12 to 20 years old" — that's a housing descriptor (roofs aging), not "we completed work there". intro: "the builder-grade roofs that went on all those Mingo Creek and Langston Ridge homes" — descriptor. localConsiderations similar. alt: "First roof replacement on a Mingo Creek home" — asserts completed work → de-attribute to "a Knightdale, NC home". Array: ["Mingo Creek", "Old Town Knightdale", "Langston Ridge", "Amber Ridge", "Planters Walk"] → v3: book hoods only: ["Carrington Woods", "Timber Ridge", "Churchill"]. Weave "including work in Carrington Woods, Timber Ridge, and Churchill" into intro/housingStock. Pre-existing texture numbers (11,000→19,000) stay per v2.A.
  - **Holly Springs**: book: Holly Glen East (2), Twin Lake Farm (1). Current array: ["12 Oaks", "Holly Glen", "Forest Springs", "Sunset Ridge", "Bass Lake", "Holly Pointe"] → book only: ["Holly Glen East", "Twin Lake Farm"] (2 items). Hmm array shrinks to 2. v3 says arrays may shrink to 3-4, honest short beats padded — 2 is shortest possible here. "Holly Glen" vs "Holly Glen East" — different? Book says Holly Glen East. Existing "Holly Glen" is not the same name; treat as unsupported. Weave Holly Glen East + Twin Lake Farm into intro. Existing work-claims: answer "from 12 Oaks and Forest Springs to Holly Glen and the Bass Lake Park area" — service-claim on 0-book hoods → scrub to book hoods. stormHook mentions 12 Oaks/Forest Springs as descriptors (roofs exposure) — descriptor, may stay. alt "on a 12 Oaks home" → de-attribute.
  - **Hillsborough**: book: Cornwallis Hills (2), Fairview (1). Current array includes Cornwallis Hills (book-supported!) plus Downtown Historic District, West Hillsborough, Waterstone, Churton Grove, Beckett's Ridge → keep Cornwallis Hills, add Fairview, drop others → ["Cornwallis Hills", "Fairview"]. Hmm 2 items. Intro currently has work-claim flavor "Mabrey Roofing works both ends of that spread" (generic both-ends, fine). housingStock names Waterstone, Churton Grove, Beckett's Ridge, Cornwallis Hills as descriptors — fine. Weave "completed work in Cornwallis Hills and Fairview". Existing em-dashes in hillsborough intro — pre-existing, leave (don't add new).
  - **Wendell**: book: Ridge Haven (1), Deerfield (1). Array: Wendell Falls, Ponder, Foxborough Crossing, Woods of Timberlake, Downtown..., Lake Glad Road → book only: ["Ridge Haven", "Deerfield"]. Weave. alt "on a Wendell Falls home" → asserts work in 0-book hood → de-attribute. Answer/intro mention Wendell Falls/Ponder as work contexts ("We re-roof open Wendell Falls and Ponder lots" — explicit work-claim on 0-book hood → convert to descriptor or rebind to Ridge Haven/Deerfield).
  - **Fuquay-Varina**: book: Lakestone Village (1). Wait full-hoods says fuquay-varina: [["Lakestone Village",1]] — only 1. But WO §2 says "FUQUAY-VARINA (4): Maggie Run · Lakestone Village". full-hoods.json supersedes §2 for scrub decisions (v2.B: "THE complete adjudication source, superseding the §2 top-lists"). So Maggie Run is NOT in full-hoods → 0 book jobs → cannot be a work-claim. Hmm, but §2 evidence pack lists Maggie Run. v2.B says full-hoods.json supersedes §2 top-lists for scrub decisions. For weaving, the §2 pack is "the ONLY counts you may print"... The oracle per v2.B: ">= min(2, count of hoods in that city's FULL list) hoods present" → fuquay-varina full list has 1 hood → assert Lakestone Village present. Maggie Run absent from full-hoods → treat as unsupported → don't weave as work-claim. Safer: weave only Lakestone Village. Array: current ["Bentwinds", "Ballentine Place", "South Lakes", "Southern Oaks", "Phillips Pointe", "Lakestone Village"] → book only: ["Lakestone Village"] (1 item). alt "on a Bentwinds home" → de-attribute. housingStock names South Lakes/Lakestone Village/Bentwinds — Bentwinds descriptor OK ("developed back in 1984" descriptor); answer "across new Wake County subdivisions like South Lakes and Bentwinds" — service work-claim binding → rebind to Lakestone Village or generalize.
  - **Zebulon**: book: Rivercrest (2). Oracle asserts exactly Rivercrest (v2.B). Array: Pilot Ridge, Weavers Pond, Olde Place, Wakelon Heights, Little River, Whitley Manor → ["Rivercrest"]. alt "on a Pilot Ridge home" → de-attribute. Answer "from Pilot Ridge to Weavers Pond and Wakelon Heights" — work-claim binding → rebind/generalize. Weave Rivercrest as completed-work mention.

  Question: does a 1-2 item array break CityBoards.tsx rendering? Check the component.

  Also check what Tier-2 intro/housingStock weaves should look like and whether metaDescription updates are needed for Tier-2 (no — Tier-2: no total in intro/meta, no count-FAQ; metaDescription may stay as-is unless it contains work-claims on scrubbed hoods. Check each: knightdale has no metaDescription (line 260-263: heroImage then close — right, no meta). holly-springs meta fine. wendell meta fine. fuquay meta fine. zebulon meta fine. hillsborough meta fine.

  Also heroImage.src frozen; alt in scrub scope.

  Also the oracle for Tier-2: FAQ count unchanged, ≥min(2, hoods) present, no total-count string.

  Big concern: doorway-check pairwise <40% — my rewrites must stay distinct.

  Now, the answer field: WO I4 — .seo-answer single-paragraph shape. Fine.

  Let me now check CityBoards.tsx array rendering and package.json scripts, plus how FAQ count is rendered (for oracle), and check the route scheme /locations/<slug>-nc.

  Also check report's statement about how oracle was scripted in batch 1 — maybe there's an oracle script file left? It said "Script it" — batch-1 report doesn't mention a script file committed. I may need to write a scratch oracle script and delete it after (HARD RULE: delete scratch files).

  Let me check package.json and CityBoards.

8:    "build": "next build",
9:    "start": "next start",
11:    "typecheck": "tsc --noEmit",
14:    "doorway-check": "node scripts/doorway-check.mjs",
15:    "reachability-check": "node scripts/reachability-check.mjs",
16:    "spam-410-guard": "node scripts/spam-410-guard.mjs"
• Let me set up a todo list and continue. Key finding to note: batch-2 edits are absent — I'll author them fresh.

  Let me plan the work:

  Todos:
  1. Author batch-2 edits in lib/cities.ts (6 Tier-1 cities)
  2. Run gates + oracle batch 2
  3. Commit batch 2
  4. Author batch-3 edits (6 Tier-2 cities)
  5. Run gates + oracle batch 3
  6. Commit batch 3
  7. Extend report

  One thing to check: CityBoards renders fine with 1-2 item arrays presumably (gaplessSpan(i, len)) — likely fine. Not a blocker.

  Now let me write the batch-2 edits. I'll be careful with anti-template law (no 8+ word clause shared across any of the 20 entries) and doorway-check <40% pairwise. Since doorway-check will mechanically verify, I'll run it.

  Let me draft each entry edit carefully.

  ### APEX (36) — spine: heritage town, Salem Street descriptors stay, 36-deep book in planned communities.

  Current problems:
  - answer: "account for any added review on Salem Street historic-district homes before we schedule" — service-claim on Salem Street (0-book). v2.C says Salem Street unsupported — convert to descriptor or delete work-claim. Hmm, but v2.F says "Salem Street descriptors stay". The phrase "historic-district homes can carry additional review" is a descriptor of process; "we account for that before scheduling" is generic service language. I think binding "we schedule work on Salem Street homes" is the issue. I'll rewrite answer to be count-led and keep Salem Street as district descriptor.
  - FAQ1 "We work on the older Salem Street historic-district homes regularly" → work-claim → rewrite.
  - alt "Historic roofline restoration on a Salem Street home in downtown Apex" → de-attribute to "an Apex, NC home".
  - array: replace with book hoods.
  - intro: add count-lead. Current intro is generic "Mabrey Roofing handles both."
  - Add count-FAQ + metaDescription.

  Draft Apex intro (heritage spine, count-led, own skeleton):
  "Apex wears its history on Salem Street, but Mabrey Roofing's book here lives in the planned communities: 36 completed roofs across town, from Abbington and Sunset Hills to Scotts Mill, Haddon Hall, and Shepherd's Vineyard. The town itself is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway. A complex historic roofline where the profile has to match and a straightforward architectural tear-off in a Peakway-era subdivision ask for different skills, and we bring the right one to each."

  Wait — "Villages of Apex" was in old intro as a work site ("architectural tear-off in the Villages of Apex"). Villages of Apex: 0 book. Convert to generic "Peakway-era subdivision". Keep Salem Street descriptors.

  Draft Apex answer (single paragraph, count-led):
  "Mabrey Roofing is a roofing company serving Apex, NC, with 36 completed roofs across town, concentrated in the planned communities: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, and The Park at West Lake. We handle roof replacement, repair, and storm-damage inspections, pulling permits through Town of Apex Building Inspections, and homes in the Salem Street historic district can carry added review, which we plan for before scheduling. Apex is two roofing towns in one: steep, complex 1800s rooflines downtown where the profile has to match, and straightforward architectural tear-offs in the newer subdivisions. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates."

  Check I7 metaDescription ≤155 with count, town-wide binding:
  "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." — count it: that's ~130. Good. Wait "honest count binding (town-wide phrasing — never bind a city total to named neighborhoods)" — "36 completed roofs across town, from Abbington to Sunset Hills" — the "from X to Y" after "across town"... Cary's shipped meta does exactly "73 completed roofs across town, from Amberly to Twin Lakes." So that pattern is accepted. OK.

  Count-FAQ Apex: "How many Apex homes has Mabrey Roofing re-roofed?" — answer: "The book shows 36 completed roofs in Apex, with Abbington and Sunset Hills at the front of the list and work spread across Scotts Mill, Haddon Hall, Shepherd's Vineyard, Hallmark West, The Park at West Lake, and Sweetwater." Hmm name 4-6 hoods in copy — WO §2 apex: "(Name 4-6.)" That applies to copy overall presumably. I'll keep total distinct hood mentions reasonable: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, The Park at West Lake (array carries these too). Hallmark West and Sweetwater can appear in FAQ. Hmm "name 4-6 in copy" — I'll interpret loosely; array names 6. Fine.

  localConsiderations: line 369 "Salem Street historic-district homes can require extra review and a roofline-matching approach, not a stock tear-off." — descriptor of requirement, not "we work there". Keep? v3: localConsiderations claims binding 0-book hood to service activity get scrubbed. This one doesn't bind service activity ("can require"). It's a descriptor. Keep.

  FAQ1 rewrite: q: "Can you roof a historic home in downtown Apex?" a: "Yes. The older homes around the Salem Street historic district carry steep, complex rooflines, and we match the existing profile and account for any added district review before scheduling the work." — Hmm "we match the existing profile... before scheduling" — that's a capability statement, not a completed-work claim. Fine per Chapel Hill convention ("we prepare that paperwork").

  ### MORRISVILLE (10) — v2.E trap.

  Scrub targets: answer ("builder-grade roofs in Breckenridge, Carpenter Village, and Kitts Creek" — descriptor of housing age, not work-claim, but v2.E says the four existing "Carpenter Village" claims are unsupported: scrub; rebuild on Kitts Creek + Breckenridge). The four: answer, intro, localConsiderations[0], FAQ1. Rebuild each clause on Kitts Creek/Breckenridge. Also array: Carpenter Village, Shiloh Grove, Savannah, McCrimmon at the Park → out; array = ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park"].

  Do NOT substitute Carpenter Park into the old sentences — rebuild on Kitts Creek + Breckenridge. Carpenter Park may appear in the array (book-supported, 1).

  Count: 10. Spine: compact-town register, two leaders carry evidence; transit-corridor thesis stays.

  New intro: "Morrisville is the Triangle town where the first-replacement clock ran out first. While Raleigh's newer boomburbs are still on their original shingles, Morrisville filled up early, growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park. Our book here is compact but real: 10 completed roofs in a town this size, led by Kitts Creek and Breckenridge, where builder-grade roofs went on in the late 1990s and early 2000s and are now at 20-plus years old. That is end of life for a builder roof. Mabrey Roofing helps Morrisville owners read the wear honestly with a free documented inspection and a straight repair-or-replace answer."

  Answer: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs in town, led by Kitts Creek and Breckenridge. Morrisville filled up early during the Research Triangle Park boom, so builder-grade roofs in those communities are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts."

  localConsiderations[0]: "Many builder roofs across Kitts Creek and Breckenridge are now 20-plus years old and at end of life on a shared timeline." (rebuild; note similar phrasing exists elsewhere — check anti-template. Original was "Many builder roofs across Breckenridge and Carpenter Village are now 20-plus years old and at end of life on a shared timeline." Changing to Kitts Creek keeps most of the clause — it's the same entry, fine.)

  FAQ1 a: "...used across Kitts Creek, Breckenridge, and similar early-2000s subdivisions commonly reach end of life around 20 years..."

  Count-FAQ Morrisville: q: "How much of Mabrey Roofing's work is in Morrisville?" a: "Our book counts 10 completed roofs in Morrisville, with Kitts Creek and Breckenridge leading the way, plus work in Carpenter Park, Downing Glen, and Addison Park."

  metaDescription: "Morrisville, NC roofing: 10 completed roofs in town, led by Kitts Creek and Breckenridge. End-of-life builder roofs, HOA help. Free inspection." — count chars: roughly 137. Good.

  ### WAKE FOREST (24) — spine: one anchor community (Heritage, 7 combined) carrying a 24-roof book.

  Scrub: old college/North Main work-claims; Traditions, Holding Village, Wakefield (0-book) work-claims. 

  Current intro work-claims: "Mabrey Roofing roofs both worlds. A pre-war home under heavy oaks near the seminary and a builder-grade tear-off in Holding Village ask for different work, and we bring the right approach to each address." → Holding Village work-claim → rebind to Heritage (book). 
  Answer: "from pre-war homes in the Historic District near the old college to first-replacement architectural shingles in Heritage, Traditions, and Holding Village" → scrub Traditions/Holding Village; "near the old college" work-claim → the Historic District descriptor can stay as geography, but bound to "handling repair and full replacement across town" = work-claim on 0-book hood. Rewrite: "from Heritage, where our book is deepest, to Olde Mill Stream, St. Ives, and Austin Creek".
  FAQ1: "We work the older homes around the old college and along North Main regularly" → scrub; rewrite as capability: "Yes. The older homes around the Historic District call for a roofline-matching approach..."
  Array → ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"] (6, all book).
  localConsiderations[2]: "Master-planned communities like Heritage and Traditions are hitting first-replacement age..." → Heritage book-supported; Traditions 0-book → replace Traditions with Olde Mill Stream? That's housing-age descriptor; but v3 says localConsiderations claims binding 0-book hood to service activity get scrubbed. This one isn't service activity ("are hitting first-replacement age" = descriptor). Still, Traditions is 0-book; as descriptor it's borderline. §1: generalize or cut unverified claims. Housing-age claim about Traditions is pre-existing texture; but safer to swap to "Heritage and Olde Mill Stream" — both book-supported and plausibly 2000s-era. Hmm, is saying Olde Mill Stream is hitting first-replacement age a new factual claim? It's a master-planned Wake Forest community; the original author's claim class. Rather than risk a forced guess, generalize: "Master-planned communities like Heritage are hitting first-replacement age on builder-grade architectural shingles." Keep it simple.
  alt: "Architectural shingle roof replacement on a Heritage neighborhood home in Wake Forest, NC" — Heritage IS book-supported (7 combined) → keep per v2.D.
  housingStock: "Master-planned communities like Heritage, Traditions, and Holding Village added thousands of homes..." — descriptor of town growth; Traditions/Holding Village as housing descriptors. Per v2.C pre-adjudication only "the old college / North Main" flagged for wake forest. Traditions etc. weren't pre-adjudicated as work-claims... but v3 array rule removes them from array. As prose descriptors of housing stock (not work-claims), they may stay per Chapel Hill convention. Hmm — but are they "claims of COMPLETED WORK"? "Master-planned communities like Heritage, Traditions, and Holding Village added thousands of homes as the town swelled past 50,000" — no work claim. Keep.
  But the intro/answer explicitly bind them to OUR work ("we bring the right approach", "we handle ... in Heritage, Traditions, and Holding Village") → those are work-claims → scrub.

  New intro (Heritage anchor spine): "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary. What remained is a deep historic core, the streets around the old college and the homes along North Main, ringed now by some of the fastest new growth in the Triangle. That newer ring is where our book lives: 24 completed roofs across town, anchored by Heritage, where we have worked again and again, with more in Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. A pre-war home under heavy oaks near the seminary and a first-replacement tear-off in Heritage ask for different work, and we bring the right approach to each address."

  Answer: "Mabrey Roofing is a Wake Forest roofing contractor with 24 completed roofs across town, anchored by Heritage and reaching Olde Mill Stream, St. Ives, Austin Creek, and Wakefield Estates. We handle repair and full replacement, from older homes in the Historic District to first-replacement architectural shingles in the newer communities. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District preservation review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster."

  Count-FAQ Wake Forest: q: "How established is Mabrey Roofing in Wake Forest?" a: "The book shows 24 completed roofs in town, and Heritage is the anchor — more of our Wake Forest work has happened there than anywhere else, with Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates also on the list."

  metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic-district review handled. Free documented estimate." (~125 chars) Good.

  ### PITTSBORO (13) — quietest register; Fearrington only hood.

  Scrub: work-claims on Chatham Park, Powell Place, Chatham Forest (all 0-book). Current answer: "from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place" — bound to "serves Pittsboro... from... to..." = service work-claim → convert to descriptor framing. FAQ2 "Do you serve Chatham Park and Fearrington Village?" "Yes. We serve Chatham Park's new neighborhoods, the established subdivisions like Powell Place and Chatham Forest, and the countryside..." → service claims → scrub. Rewrite FAQ to lean on Fearrington (book) + general service-area statement. Array → ["Fearrington Village"] only book-supported. 1-item array. §2 says name only Fearrington. The array renders "1 neighborhoods / 1 areas" under "Dispatched Across Pittsboro" — honest. Hmm, v3 says arrays may shrink to 3-4 — but pittsboro book has exactly 1. "an honest short array beats a padded one" — 1 it is.

  Wait — should Chatham Park stay since it's a huge development? 0 book jobs → v3: array entries MUST be book-supported. Remove.

  Intro (count + real axes, quiet register): "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Our book here is smaller and quieter: 13 completed roofs across the Pittsboro area, including work at Fearrington Village. We work all three Pittsboros, on the county's paperwork."

  Hmm "We work all three Pittsboros" — "Mabrey Roofing works all three Pittsboros, on the county's paperwork." Keep second sentence mostly, adjust.

  Answer: "Mabrey Roofing and Construction serves Pittsboro, NC, with 13 completed roofs across the area, including work at Fearrington Village, and the surrounding Chatham County countryside. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, brand-new builder shingles in Chatham Park that deserve a documented eye before their warranties age out, and the older homes around the courthouse circle. Every inspection comes with photos you keep."

  Careful: "established 2000s subdivisions like Chatham Forest" — Chatham Forest 0-book; as housing descriptor it's OK (it exists as a place). Keep as descriptor without "we worked there". The original phrasing "from the older homes around the courthouse circle to the new construction filling in at Chatham Park" was bound to "serves Pittsboro from X to Y" — service claim. I'll generalize: "...serves Pittsboro, NC, and the surrounding Chatham County countryside — 13 completed roofs in the area so far, including work at Fearrington Village."

  Count-FAQ Pittsboro: q: "Has Mabrey Roofing done much work in Pittsboro?" a: "Our Pittsboro book is smaller than our Wake County book but real: 13 completed roofs in the area, including work at Fearrington Village, plus the older homes around the courthouse circle and the countryside beyond." Hmm — "plus the older homes around the courthouse circle" would be a work-claim on a 0-book place. Cut that: a: "Our Pittsboro book is smaller than our Wake County book, and we say so plainly: 13 completed roofs in the area, including work at Fearrington Village. The rest of what we do here runs on the town's real axes — courthouse-circle homes, farm metal, and the new roofs going up as Chatham County grows." Hmm that last part implies work... "runs on the town's real axes" is forward-looking capability. It's fine — v2.F says "the count + the town's real axes". But avoid em-dash addition? "no em-dashes ADDED beyond the file's existing house usage" — pittsboro entry already uses em-dashes (permitNote line 775 has "—"). House usage exists. Still, I'll minimize.

  metaDescription: "Pittsboro, NC roofing in Chatham County: 13 completed roofs in the area, courthouse homes to farm metal. County permits handled. Free estimate." — count ~137. Good. Must keep "Chatham County" jurisdiction texture.

  FAQ2 rewrite: q: "Do you serve Chatham Park and Fearrington Village?" a: "Yes. Fearrington Village is already in our book, and we serve the whole Pittsboro area: the courthouse-circle streets, the established subdivisions, new construction at Chatham Park, and the countryside in between." — Hmm "we serve X" — service-area claim. Is that a "claim of COMPLETED WORK"? §1: "any existing claim of COMPLETED WORK in a place the book doesn't support gets the Cary treatment". Service-area statements ("we serve") are capability, not completed-work. The A6 convention kept service-area phrasing? In Raleigh scrub, "Brier Creek ... service-area phrasing dropped in the answer rewrite" — they dropped service-area phrasing for Brier Creek. Hmm, that suggests service-area phrasing for 0-book hoods was also removed there. But FAQ "Do you serve Chatham Park and Fearrington Village?" — the question itself names Chatham Park (user-voice). The answer must answer yes/no. Saying "Yes, we serve the whole Pittsboro area including Chatham Park" is a statement of willingness, not completed work. I'll keep it generic: "Yes. We serve the entire Pittsboro area, from the courthouse circle out to Chatham Park and the countryside toward Fearrington Village, where our book already includes completed work." That grounds the completed-work claim on Fearrington (book) and keeps the rest as service-area/capability. 

  Hmm wait, oracle for Tier-1 pittsboro asserts ≥3 of its §2 hoods present — §2 pittsboro lists only Fearrington Village. "≥3 of its §2 hoods" — with only 1 hood, min logic? v2.B Tier-2 rule uses min(2, count). For Tier-1 oracle §10 says "≥3 of its §2 hoods present" — for pittsboro only 1 exists, so assert 1/1. Garner has 5 hoods, name at most 3 in copy... oracle "≥3 of its §2 hoods present" — §2 garner lists 5 hoods; copy names 3 (spread phrasing). Array will carry all 5 though! Array names render on page, so all 5 will be present. Good — oracle ≥3 satisfied via array. Same for others: apex array 6 hoods (all in §2's 8 listed), wake-forest array 6, morrisville array 5.

  Wait for apex: §2 lists Abbington, Sunset Hills, Hallmark West, The Park at West Lake, Sweetwater, Scotts Mill, Shepherd's Vineyard, Haddon Hall (8). My array: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, The Park at West Lake — 6 of the 8. ≥3 ✓.

  Wake forest §2: Heritage, Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, Wakefield Estates (6). Array matches all 6 ✓.

  Morrisville §2: Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park (5). Array: all 5 ✓.

  Clayton: no hoods; oracle asserts count string + FAQ+1 + meta. 

  ### GARNER (11) — spread-not-depth.

  Scrub: Creekside (pre-adjudicated 0). Current work-claims: answer "handling repairs, full replacements, and storm and algae assessments across town, from Creekside and the White Oak corridor to homes near Lake Benson and Lake Wheeler" → scrub Creekside work-claim. intro "north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks" — condition descriptor, not completed-work claim. Hmm. "in Creekside" — it asserts conditions of a place; that's a descriptor. Keep? v2.C says Creekside (garner) UNSUPPORTED — "convert to descriptor framing or delete the work-claim". The intro mention is already descriptor framing. But is it a work-claim implicitly? "north-facing slopes in Creekside ... grow the dark algae streaks and moss that homeowners elsewhere see far less of" — no Mabrey work claim. Keep as descriptor. Actually to be safe and consistent with the "fresh skeptic" mandate, the answer's "from Creekside ... to ..." is bound to "handling repairs, full replacements" — that IS a work-claim → delete Creekside there. alt: "Algae-resistant shingle replacement on a Creekside home near Lake Benson in Garner, NC" → completed-work alt → de-attribute to "a Garner, NC home": "Algae-resistant shingle replacement on a Garner, NC home near Lake Benson". Hmm "near Lake Benson" — fine, landmark geography.

  Array → book 5: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"].

  Intro (spread phrasing, working-town register): "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and shaded north slopes grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Our Garner book runs wide rather than deep: 11 completed roofs spread across town, from Southills to Heather Hills, with no single neighborhood dominating the list. Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing."

  Answer: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills and Hunter's Mark to Pleasant Woods. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address."

  Name at most 3 hoods in copy ("name at most 3, phrased as spread"): intro names Southills + Heather Hills (2), answer names Southills, Hunter's Mark, Pleasant Woods (3). Hmm "name at most 3" — total across copy? To be safe, cap named hoods in prose at 3 total: Southills, Heather Hills, Pleasant Woods. Array carries all 5 (array is fine). Let me align: intro "from Southills to Pleasant Woods" (2), answer same two or add Heather Hills. Keep answer: "from Southills to Pleasant Woods" too. And FAQ answer could name the third. OK: FAQ answer names Heather Hills as third.

  Count-FAQ Garner: q: "How many Garner roofs are in Mabrey Roofing's book?" a: "Eleven and counting — spread out rather than concentrated, from Southills to Pleasant Woods by way of Heather Hills. No single Garner neighborhood dominates our list, which is exactly what a working town this spread out looks like in a roofers' book." Hmm — no em-dash addition concern; garner entry has none currently? Check: garner entry lines 265-307 — no em-dashes I think. Avoid em-dash. Rewrite: "Eleven so far, and spread out rather than concentrated, from Southills to Pleasant Woods by way of Heather Hills. No single Garner neighborhood dominates our list, which is what a working town this size looks like in a roofer's book."

  Wait — I1: "Every printed number is a §2 city total, verbatim" — "Eleven" word-form of the total: allowed? §2 header: "city-level totals ONLY in copy, never per-neighborhood numbers, never years, never dollars". Tier-1 prints the total; the oracle checks exact string "11 completed roofs". Word form "Eleven" is the same total — but to be safe and consistent, use digit: "11 so far, and they are spread out rather than concentrated..." Hmm v2.G forbids Tier-2 totals in digit OR word form — implying Tier-1 may print the total; digit form is the pack verbatim. Use digits everywhere for Tier-1. Also the metaDescription needs the count for Tier-1 (I7: metaDescription updated with the count).

  metaDescription Garner: "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Pleasant Woods. Algae-resistant systems, permits handled. Free estimate." (~140) Good.

  ### CLAYTON (10) — count-only, no new hood work-claims, array AS-IS.

  Array stays: ["Flowers Plantation", "Riverwood", "Glen Laurel"] — flagged as known limitation (pre-dates lane). 

  Scrub: existing neighborhood descriptors stay as descriptors. Are there completed-work claims? answer: "We work this jurisdiction routinely and pull the correct permit the first time. From the newer builder-grade roofs filling Flowers Plantation, driven by the Novo Nordisk and Grifols biotech boom, to older homes near Riverwood, we know that Clayton's open subdivisions..." — "we know that Clayton's open subdivisions sit in the storm corridor" — "we know" + descriptor. Not a completed-work claim on a hood. FAQ2 is customer-voice about Flowers Plantation; answer is generic about builder roofs. intro: "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood." — "works ... from X to Y" is a work-claim bound to Flowers Plantation/Riverwood. Hmm. "NO new neighborhood work-claims" — existing ones? §1: "any existing claim of COMPLETED WORK in a place the book doesn't support gets the Cary treatment — deleted or re-grounded." "Mabrey Roofing works Johnston County routinely" is jurisdiction-level (fine, book has 10 Clayton jobs). "from the master-planned streets of Flowers Plantation to older Riverwood" is a from-to descriptor of where in town — attached to "works Johnston County routinely" — it's arguably a service-claim on 0-book hoods. Clayton book = 0 geocoded hoods, so no hood may carry a work-claim. I'll re-ground: "Mabrey Roofing works Johnston County routinely — 10 completed roofs in Clayton alone — and we pull the right permit the first time." Avoid em-dash; clayton entry has none. Rewrite intro:

  "Clayton is in Johnston County, and that one fact separates the roofers who actually work here from the ones who do not. A Clayton roof permits through the Town of Clayton and Johnston County, on different paperwork than the rest of the Triangle. Mabrey Roofing works this jurisdiction routinely, with 10 completed roofs in Clayton and counting, from the newer master-planned streets to the older parts of town. We know the jurisdiction, we know the young builder roofs going up out here, and we pull the right permit the first time."

  Hmm "from the newer master-planned streets to the older parts of town" — generic, no hood names. Good. Keep "Flowers Plantation" as descriptor elsewhere (housingStock mentions it as descriptor — fine, "NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors").

  Answer rewrite: "Mabrey Roofing is a roofing company serving Clayton, NC, with 10 completed roofs in town and a simple jurisdictional advantage: Clayton is in Johnston County, not Wake, so a roof here permits through the Town of Clayton and Johnston County on different paperwork than the rest of the Triangle, and we work this jurisdiction routinely and pull the correct permit the first time. Clayton's younger roofs, many built during the biotech boom, mostly need a targeted repair rather than a full replacement, and we say so. Free documented inspection, honest answer."

  Count-FAQ Clayton: q: "Does Mabrey Roofing have real experience in Clayton?" a: "Yes. Our book shows 10 completed roofs in Clayton, and we work Johnston County routinely. The permit paperwork here is different from Wake County's, and we handle it as part of every job."

  metaDescription Clayton (new): "Clayton, NC roofing: 10 completed roofs in town. Johnston County permits handled right the first time. Free documented inspection and estimate." (~130)

  Check ≤155: yes.

  Distinctness check of count-FAQ questions (all 8):
  1. Cary: "How many Cary roofs has Mabrey Roofing completed?"
  2. Durham: "How much roofing has Mabrey Roofing actually done in Durham?"
  3. Raleigh: "What is Mabrey Roofing's track record in Raleigh?"
  4. Apex: "How many Apex homes has Mabrey Roofing re-roofed?"
  5. Wake Forest: "How established is Mabrey Roofing in Wake Forest?"
  6. Pittsboro: "Has Mabrey Roofing done much work in Pittsboro?"
  7. Garner: "How many Garner roofs are in Mabrey Roofing's book?"
  8. Clayton: "Does Mabrey Roofing have real experience in Clayton?"
  9. Morrisville: "How much of Mabrey Roofing's work is in Morrisville?"

  Wait — that's 8 Tier-1 cities total: durham, raleigh, apex, wake-forest, pittsboro, garner, clayton, morrisville. Plus Cary's pre-existing = 9 questions. WO says "The 8 count-FAQ questions: 8 distinct constructions (and distinct from Cary's)". Good, 8 new.

  Distinctness: Apex "How many Apex homes has..." vs Garner "How many Garner roofs are in..." — different constructions. Apex vs Cary: "How many X ... has Mabrey Roofing completed" — apex uses "re-roofed", cary "completed". OK.

  Anti-template: check no 8-word clause duplicated. I'll rely on doorway-check + do a manual scan.

  Em-dash check: none of my new copy uses em-dashes. Exclamation marks: none.

  Also need source-comment blocks above each edited entry (Burlington convention): first-party book line + annotation for retained texture + scrub notes.

  Meta descriptions — check current which entries have metaDescription: morrisville (yes), wake-forest (yes), holly-springs (yes), wendell (yes), fuquay (yes), zebulon (yes), hillsborough (yes), pittsboro (yes), apex (NO — line 389-392 heroImage then close at 393 — no metaDescription!), garner (no meta — line 303-306 heroImage, close 307 — none), clayton (none), knightdale (none). Tier-1 requires metaDescription with count → add to apex, garner, clayton; update morrisville, wake-forest, pittsboro with counts.

  Also `answer` field — the .seo-answer single-paragraph (I4). All good.

  Now Tier-2 (batch 3) designs:

  **KNIGHTDALE**: book Carrington Woods (2), Timber Ridge (1), Churchill (1). Weave into intro: e.g. after first-replacement thesis: "Our work here has started the same way, with completed projects in Carrington Woods, Timber Ridge, and Churchill." No totals. Array → ["Carrington Woods", "Timber Ridge", "Churchill"]. Scrub: alt "First roof replacement on a Mingo Creek home in Knightdale, NC" → "First roof replacement on a Knightdale, NC home". Mingo Creek/Langston Ridge/Planters Walk stay as housing descriptors (pre-adjudicated). Answer: "...builder-grade roofs across Mingo Creek, Langston Ridge, and Planters Walk are now hitting 12 to 20 years old" — descriptor, keep. Add book weave to answer too? Tier-2: "intro/housingStock weave only". So weave in intro + housingStock. housingStock: "...across whole subdivisions." add "We have already completed roofs in Carrington Woods, Timber Ridge, and Churchill, each one the same first-replacement story." Hmm "each one the same story" fine.

  Watch v2.G forbidden: "completed roofs" within 6 words of a number — no numbers near. Also avoid the digit 4 anywhere near roofs. Knightdale texture has "11,000", "19,000", "12 to 20 years" — pre-existing, governed by v2.A, fine. But my new sentences must not put any total. "completed projects in Carrington Woods, Timber Ridge, and Churchill" — the list of 3 hoods... "3" not printed. Good. Careful with "dozens", "a few" — fine.

  **HOLLY SPRINGS**: book Holly Glen East (2), Twin Lake Farm (1). Weave intro: "...synchronized aging wave... Mabrey Roofing helps..." add "Our own book here already runs through Holly Glen East and Twin Lake Farm." Array → ["Holly Glen East", "Twin Lake Farm"]. Scrub: answer "from 12 Oaks and Forest Springs to Holly Glen and the Bass Lake Park area" — bound to "repairs and replaces asphalt shingle roofs across Wake County, from X to Y" → work-claim on 0-book hoods → rewrite: "...across Wake County, with completed work in Holly Glen East and Twin Lake Farm." Wait Tier-2 weave allowed in intro/housingStock "only"? §2 Tier-2 rule: "the book hoods may be woven into intro/housingStock as completed-work mentions". And §3.2: "Tier 2 → intro/housingStock weave only, per the Tier-2 rule." So answer should NOT carry completed-work claims for these hoods? But answer currently carries work-claims on 0-book hoods which must be scrubbed regardless → generalize the answer without hood work-claims: "Mabrey Roofing is a Holly Springs roofing contractor that repairs and replaces asphalt shingle roofs across Wake County. Because most Holly Springs homes went up in one building boom, ..." Drop the from-to. alt "on a 12 Oaks home" → "on a Holly Springs, NC home". stormHook "Subdivisions like 12 Oaks and Forest Springs went up on cleared land" — descriptor, keep. localConsiderations fine. FAQ1 "My whole street..." fine.

  Hmm wait — but oracle asserts ≥min(2, full list)=2 hoods present on page. Array has both + intro weave. Good.

  **HILLSBOROUGH**: book Cornwallis Hills (2), Fairview (1). Array currently includes Cornwallis Hills (keep), others (Downtown Historic District, West Hillsborough, Waterstone, Churton Grove, Beckett's Ridge) → remove; add Fairview → ["Cornwallis Hills", "Fairview"]. 2-item array. Weave intro: after "Mabrey Roofing works both ends of that spread." add "Our book here already includes completed work in Cornwallis Hills and Fairview." Hmm intro has em-dash (pre-existing). Fine. Scrub: any work-claims on 0-book hoods? answer: "from the colonial-era homes of the downtown Historic District to the newer subdivisions at Waterstone, Churton Grove, and Beckett's Ridge" — "serves Hillsborough, NC, from X to Y" → service work-claim on 0-book hoods → rewrite to remove from-to binding: "serves Hillsborough, NC, from the colonial-era homes of the downtown Historic District to the newer subdivisions around the town's edge." Keep Waterstone etc. as housing descriptors in housingStock (they're descriptors there: "the 2000s brought Waterstone, Churton Grove, Beckett's Ridge, and Cornwallis Hills, where original builder-grade shingles are reaching..." — descriptor of housing age, OK to keep per §1 pre-existing texture). FAQ3 "My Waterstone home..." customer-voice, keep. alt "Roof replacement on a historic home near downtown Churton Street in Hillsborough, NC" — Churton Street is the historic street; claim of work on "a historic home near downtown Churton Street" — downtown Historic District 0-book → per v2.D, de-attribute? The alt asserts completed work ("Roof replacement on...") in the historic district (0-book). De-attribute to "a Hillsborough, NC home": "Roof replacement on a historic Hillsborough, NC home". Hmm — but Tier-2 has 4 jobs in Hillsborough, so "historic home" claim... the book doesn't say which homes. De-attribute per v2.D.

  **WENDELL**: book Ridge Haven (1), Deerfield (1). Array → ["Ridge Haven", "Deerfield"]. Scrub: answer "We re-roof open Wendell Falls and Ponder lots" → explicit work-claim on 0-book → rewrite: "We re-roof the open, wind-exposed lots on the town's newer edge, where wide planes catch straight-line wind head-on, and we carefully tear off early-1900s bungalows in the downtown historic district." Hmm "we carefully tear off ... downtown historic district" also a work-claim on 0-book place. Generalize: "and we handle careful tear-offs on early-1900s bungalows." Better: answer: "Mabrey Roofing is a roofing contractor serving Wendell, on the eastern edge of Wake County, handling storm and wind repair, full replacement, and documented inspections for two very different kinds of homes: wide, open newer planes that catch straight-line wind head-on, and early-1900s bungalows near the downtown historic district. Every roof is scoped to a 115 mph design gust..." Intro: "A repair on a 1920s home off Wendell Boulevard and an architectural tear-off on a wide, exposed Wendell Falls plane are not the same job" — "A repair on X and a tear-off on Y are not the same job, and we do not pretend they are" — hypothetical framing ("A repair ... is not the same job"), borderline. It doesn't claim completed work; it's capability. Keep? It binds Wendell Falls to a tear-off capability, not completed work. v2.C scrub is about completed-work claims. I'll soften anyway when weaving: intro weave add "and our book here already includes completed roofs in Ridge Haven and Deerfield." Keep rest. alt "on a Wendell Falls home in Wendell, NC" → "on a Wendell, NC home". housingStock mentions Wendell Falls/Ponder as descriptors — keep. localConsiderations mention Wendell Falls descriptors — keep.

  **FUQUAY-VARINA**: book Lakestone Village (1) ONLY per full-hoods.json (supersedes §2's Maggie Run). Array → ["Lakestone Village"]. Weave intro: "...are different jobs, and we bring the right one to each. Our book here already includes completed work in Lakestone Village." Scrub answer: "across new Wake County subdivisions like South Lakes and Bentwinds" — bound to "working both sides" claim → generalize: "and the first-generation architectural-shingle roofs across the town's newer Wake County subdivisions." alt "on a Bentwinds home" → "on a Fuquay-Varina, NC home". housingStock names South Lakes, Lakestone Village, Bentwinds as descriptors — keep (and Lakestone is book-real). FAQ3 names South Lakes customer-voice — keep. Maggie Run: mention in report as gap/note (WO §2 listed it but full-hoods.json — the superseding adjudication source — does not; excluded). Not a forced guess: v2.B explicitly says full-hoods.json supersedes §2 top-lists for scrub decisions. For weave decisions? "for scrub decisions" — weaving Maggie Run as a work-claim would contradict the adjudication file that says absent = zero book jobs. v2.C: "A neighborhood absent from that file has ZERO book jobs for that city." So Maggie Run = 0 book jobs → cannot be a work-claim. Clear.

  **ZEBULON**: book Rivercrest (2). Array → ["Rivercrest"]. Weave intro: "We know this town, from the older ranch and minimal-traditional homes near downtown Arendell Avenue to the newer builds out toward Rivercrest, where our book already includes completed work." Hmm "the newer builds in Weavers Pond and Pilot Ridge" — current intro says "from the older ranch... near downtown Arendell Avenue to the newer builds in Weavers Pond and Pilot Ridge. We bring the right crew..." — "We know this town, from X to Y" + work framing → 0-book hoods → rewrite. Scrub answer: "from Pilot Ridge to Weavers Pond and Wakelon Heights" → generalize. alt "on a Pilot Ridge home" → "on a Zebulon, NC home". housingStock names Weavers Pond/Pilot Ridge as descriptors — keep. landmarks stay (not work-claims). 

  metaDescriptions Tier-2: keep as-is (no totals; check none contain scrubbed-hood work-claims: holly-springs meta fine, wendell fine, fuquay fine, zebulon fine, hillsborough "Meadowmont to Northside"? no that's chapel-hill. hillsborough meta: "for the historic downtown and the new subdivisions. District-aware work, metal fluency..." fine. knightdale none.

  Wait — knightdale has no metaDescription; falls back to templated. Fine, Tier-2 no meta change needed.

  Now also count-FAQ for Tier-1: FAQ count grows by exactly 1 — I append the new FAQ at the end of faqs array.

  FAQ ordering: cary/durham/raleigh appended count-FAQ last. I'll append last for consistency.

  Now — source comment blocks above each of the 12 edited entries. Format per Burlington/Durham convention.

  Also need to keep `.seo-answer` single paragraph — answers are single strings, fine.

  Meta description char counts — verify ≤155 when writing. Let me count roughly:

  Apex: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." = let me count: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." ≈ 138. OK.

  Wake Forest: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic-district review handled. Free documented estimate." ≈ 134. OK.

  Pittsboro: "Pittsboro, NC roofing in Chatham County: 13 completed roofs in the area, courthouse homes to farm metal. County permits handled. Free estimate." ≈ 139. OK. Hmm — "13 completed roofs in the area" — I7 wants town-wide binding, "in the area" fine.

  Garner: "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Pleasant Woods. Algae-resistant systems, permits handled. Free estimate." ≈ 142. OK.

  Clayton: "Clayton, NC roofing: 10 completed roofs in town. Johnston County permits handled right the first time. Free documented inspection." ≈ 127. OK.

  Morrisville: "Morrisville, NC roofing: 10 completed roofs in town, led by Kitts Creek and Breckenridge. HOA help, permits handled. Free documented inspection." ≈ 138. OK.

  Now "36 completed roofs" — the oracle asserts exact total string e.g. "190 completed roofs". For apex the string "36 completed roofs" appears in answer/intro/meta. Good.

  Oracle for Tier-1: exact total string present — "36 completed roofs", "24 completed roofs", "13 completed roofs", "11 completed roofs", "10 completed roofs" (clayton AND morrisville both 10 — different pages, fine).

  Doorway-check: pairwise <40% across all 20 — clayton/morrisville both having "10 completed roofs" won't matter much.

  Now think about what the prior report said: batch 1 committed. I also need the oracle scripted — write a scratch script (delete after). The batch-1 report says oracle scripted; the script isn't in the repo (git status clean). So it was scratch and deleted. I'll write `wo/.oracle-lane-w.mjs`? HARD RULE says delete scratch files after. I'll put it in the worktree root as `.oracle-w.mjs` and delete after each use (or keep until end then delete).

  Also gates need server on :3221 with BUILD_ID manifest proof. Steps:
  1. npm run typecheck
  2. npm run build
  3. kill anything on :3221; BUILD_ID=$(cat .next/BUILD_ID); (npm run start -- -p 3221 &) ; curl localhost:3221/_next/static/$BUILD_ID/_buildManifest.js → 200
  4. PORT=3221 npm run spam-410-guard etc.
  5. oracle script against :3221 for the 6 batch-2 pages + cary/burlington controls.

  Then commit batch 2 (lib/cities.ts + report? "Commit per batch" — commit message 'seo-lane-w batch 2: ...'. The report: "Extend wo/BUILD_REPORT_SEO_LANE_W.md per batch" — commit report with each batch presumably. Batch-1 report was committed (it shows in git diff vs f475d19). Include report in batch commits. Also wo/WO file + full-hoods.json are untracked — should they be committed? They're inputs; batch-1 didn't commit them (still untracked). Leave untracked.

  Wait — user instruction says commit 'seo-lane-w batch 2: apex wake-forest pittsboro garner clayton morrisville'. Include lib/cities.ts + wo/BUILD_REPORT_SEO_LANE_W.md. 

  Also frozen-entry check: git diff on the 6 frozen entries must be empty — I'll do field-level JSON compare like batch 1 (script) + grep diff for slugs.

  Now, before editing, verify current file has no comment blocks above the 12 target entries — correct, they have plain entries.

  One more check: the WO says batch 2 includes count-FAQs etc. Also v2.H says STOP after batch 1 and await go signal — the user's resume instruction IS the go signal (orchestrator instructing batch 2+3 execution). Good.

  Also check `git diff` scope — the WO file and full-hoods.json untracked; fine.

  Let me also double check doorway-check covers all 20 cities ("all 20 cities now natively covered by the derived gate").

  Now start editing. I'll do batch 2 first: 6 comment blocks + entry edits. Let me write the edits via Edit tool, one entry at a time.

  For each entry I need to add comment block above `{` after the previous entry's `},`. Entries: knightdale(223), garner(266), clayton(309), apex(352), morrisville(395), wake-forest(423) — batch 2 = apex, morrisville, wake-forest, garner, clayton, pittsboro(769).

  Let me draft the comment blocks (concise, Burlington convention):

  APEX:
  ```
    /* -------------------------------------------------------------------------
     * APEX — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 36
     *   completed Apex roofs; book leaders Abbington (3), Sunset Hills (2),
     *   Hallmark West (1), The Park at West Lake (1), Sweetwater (1), Scotts
     *   Mill (1), Shepherd's Vineyard (1), Haddon Hall (1). Only the city-level
     *   total (36) is printed in copy; no per-neighborhood counts.
     * Pre-existing regulatory/demographic texture (permit authority, Salem
     *   Street historic-district review, growth figures) predates this lane and
     *   is retained generalized-or-hedged per the A6/v2.A escape hatch; this
     *   lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Salem Street (0
     *   book jobs, orchestrator pre-adjudicated) converted from work-claim to
     *   historic-district descriptor (FAQ answer rebuilt, heroImage.alt
     *   de-attributed per v2.D); Villages of Apex (0) dropped as a work site.
     *   AMENDMENT v3 (array is a work-claim surface): neighborhoods array
     *   rebuilt on book-supported communities only.
     * ------------------------------------------------------------------------- */
  ```

  Similar for others. Now the edits. Let me carefully write each new entry text.

  Also careful: I5 — no "!" and no added em-dashes. Check my drafts — none contain "—" or "!". Wait "N.C. State Building Code" fine.

  Also apostrophes: existing file uses straight apostrophes ('). Keep straight quotes.

  Now write edits. Entry by entry.

  --- APEX ---

  answer (new):
  "Mabrey Roofing is a roofing company serving Apex, NC, with 36 completed roofs across town, concentrated in the planned communities: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, and The Park at West Lake. We handle roof replacement, repair, and storm-damage inspections across Wake County, pulling permits through Town of Apex Building Inspections, and homes in the Salem Street historic district can carry added review, which we plan for before scheduling. Apex is two roofing towns in one: steep, complex 1800s rooflines downtown where the profile has to match, and straightforward architectural tear-offs in the newer subdivisions. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates."

  Hmm — doorway similarity with old apex answer is fine (same page). Pairwise is across cities.

  neighborhoods: ["Abbington", "Sunset Hills", "Scotts Mill", "Haddon Hall", "Shepherd's Vineyard", "The Park at West Lake"]

  intro (new):
  "Apex wears its history on Salem Street, but our book here lives in the planned communities: 36 completed roofs across town, from Abbington and Sunset Hills to Scotts Mill, Haddon Hall, and Shepherd's Vineyard. The town itself is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway. A complex historic roofline where the profile has to match and a straightforward architectural tear-off in one of the newer subdivisions ask for different skills, and we bring the right one to each."

  landmarks: keep ["Historic Salem Street", "Apex Peakway", "Pleasant Park"] — landmarks aren't work-claims. Keep.

  localConsiderations keep. FAQ1 answer rewrite:
  q same: "Can you roof a historic home in downtown Apex?"
  a: "Yes. The older homes around the Salem Street historic district carry steep, complex rooflines, and the district can add its own review. We match the existing profile and plan for that review before the work is scheduled."

  New FAQ4 (count):
  q: "How many Apex homes has Mabrey Roofing re-roofed?"
  a: "The book counts 36 completed roofs in Apex, led by Abbington and Sunset Hills, with more in Scotts Mill, Haddon Hall, Shepherd's Vineyard, and The Park at West Lake."

  Wait — §2 apex "Name 4-6". Across copy I name: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, The Park at West Lake = 6. Good (Hallmark West, Sweetwater left out).

  heroImage.alt: "Historic roofline work on an Apex, NC home" — hmm original: "Historic roofline restoration on a Salem Street home in downtown Apex, NC". v2.D de-attribute to "a <City>, NC home". New: "Historic roofline restoration on an Apex, NC home".

  metaDescription (add): "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate."

  --- MORRISVILLE ---

  answer (new): as drafted above.
  neighborhoods: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park"]
  intro (new): as drafted. Check for duplicate 8-word clauses with other entries: "growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park" — that's from the OLD morrisville intro (retained). Fine — same entry.

  Wait, original intro: "Morrisville filled up earlier, growing from a rural crossroads of under 1,500 people in 1990..." I changed to "filled up early". Keep original wording mostly and insert count sentence. New intro:

  "Morrisville is the Triangle town where the first-replacement clock ran out first. While Raleigh's newer boomburbs are still on their original shingles, Morrisville filled up earlier, growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park. Our book here is compact but real: 10 completed roofs in a town this size, led by Kitts Creek and Breckenridge, where builder-grade roofs went on in the late 1990s and early 2000s and are now 20-plus years old. That is end of life for a builder roof. Mabrey Roofing helps Morrisville owners read the wear honestly with a free documented inspection and a straight repair-or-replace answer."

  Hmm "10 completed roofs in a town this size" — ok, compact-town register per v2.F.

  Original intro said "Those builder-grade roofs across Breckenridge and Carpenter Village went on in the late 1990s and early 2000s, which puts a huge share of them at 20-plus years old right now." — rebuilt on Kitts Creek/Breckenridge per v2.E. ✓.

  localConsiderations[0]: "Many builder roofs across Kitts Creek and Breckenridge are now 20-plus years old and at end of life on a shared timeline." ✓ (rebuild, no Carpenter Park substitution).

  FAQ1 a: "Often, yes. The builder-grade shingles used across Kitts Creek, Breckenridge, and similar early-2000s subdivisions commonly reach end of life around 20 years, sooner on sun-baked south-facing slopes. A free documented inspection tells you honestly whether you need a full replacement or just a targeted repair to buy more time." ✓

  New FAQ4: q: "How much of Mabrey Roofing's work is in Morrisville?" a: "The book counts 10 completed roofs in Morrisville, led by Kitts Creek and Breckenridge, with more in Carpenter Park, Downing Glen, and Addison Park."

  Hmm — v2.E: "Do NOT substitute Carpenter Park into the old sentences" — but naming Carpenter Park in the NEW count-FAQ answer as part of the book list is fine (it's book-supported, 1 job). OK.

  housingStock mentions Breckenridge only (descriptor, book-supported anyway). stormHook fine. alt: "Architectural shingle roof replacement on a Breckenridge home in Morrisville, NC" — Breckenridge book-supported (3) → KEEP per v2.D. ✓

  metaDescription update: "Morrisville, NC roofing: 10 completed roofs in town, led by Kitts Creek and Breckenridge. HOA help, permits handled. Free documented inspection."

  answer: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs in town, led by Kitts Creek and Breckenridge. Morrisville filled up early during the Research Triangle Park boom, so builder-grade roofs in those communities are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts."

  --- WAKE FOREST ---

  answer: "Mabrey Roofing is a Wake Forest roofing contractor with 24 completed roofs across town, anchored by Heritage and reaching Olde Mill Stream, St. Ives, Austin Creek, and Wakefield Estates. We handle repair and full replacement, from the older homes of the Historic District to first-replacement architectural shingles in the newer communities. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District preservation review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster."

  neighborhoods: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"]

  intro: "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary. What remained is a deep historic core, the streets around the old college and the homes along North Main, ringed now by some of the fastest new growth in the Triangle. That newer ring is where our book lives: 24 completed roofs across town, anchored by Heritage, the community we return to more than any other here, with more in Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. A pre-war home under heavy oaks near the seminary and a first-replacement tear-off in Heritage ask for different work, and we bring the right approach to each address."

  Wait "the community we return to more than any other here" — Heritage 7 combined is the leader, book-supported claim, no per-hood count printed. OK. Hmm, "more than any other here" is a comparative claim grounded in book. Fine.

  localConsiderations[2]: "Master-planned communities like Heritage are hitting first-replacement age on builder-grade architectural shingles at the same time." Hmm original: "Master-planned communities like Heritage and Traditions are hitting first-replacement age on builder-grade architectural shingles at the same time." Replace Traditions → drop: "like Heritage". 

  Hmm, actually is dropping Traditions necessary? As housing descriptor (age claim) it's not a work-claim. But "Heritage and Traditions are hitting first-replacement age" — descriptor. v2.C pre-adjudication flagged only old college/North Main for wake forest. Traditions could stay as descriptor. But it IS an unverified factual claim about Traditions' age... pre-existing texture, may stay per §1. Keep minimal change: leave Traditions. Hmm — but FAQ? FAQ1 rewrite:

  q same: "Can you roof a home in the Wake Forest Historic District?"
  a (new): "Yes. The older homes around the district call for a roofline-matching approach rather than a stock tear-off. We match the existing profile and account for any added preservation review the district requires before we schedule, so the home keeps its character and the permit clears without surprises."

  housingStock: "Master-planned communities like Heritage, Traditions, and Holding Village added thousands of homes as the town swelled past 50,000" — descriptors, keep.

  alt keep (Heritage book-supported). ✓

  New FAQ4: q: "How established is Mabrey Roofing in Wake Forest?" a: "The book counts 24 completed roofs in town, and Heritage is the anchor, with more of our Wake Forest work there than anywhere else. Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates round out the list."

  metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic-district review handled. Free documented estimate."

  --- GARNER ---

  answer: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills to Pleasant Woods. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address."

  neighborhoods: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"]

  intro: "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and shaded north slopes in the Creekside and White Oak corridor areas grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Our Garner book runs wide rather than deep: 11 completed roofs scattered across town, from Southills to Heather Hills, with no single neighborhood dominating the list. Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing."

  Hmm wait — intro names Southills + Heather Hills; answer names Southills + Pleasant Woods. That's 3 total hoods in prose: Southills, Heather Hills, Pleasant Woods. "name at most 3" ✓. "from X to Y" phrasing ✓.

  Hmm — anti-template: "Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing" — appears in BOTH intro and answer of garner (same page, fine — it was already duplicated in original? Original answer and intro both had "an honest read on what cleaning can save versus what needs replacing". Yes original had it in both. Keep.)

  alt: "Algae-resistant shingle replacement on a Garner, NC home near Lake Benson" ✓ de-attributed.

  localConsiderations: keep (no hood service-claims). "Lake-influenced humidity makes algae..." fine.

  New FAQ4: q: "How many Garner roofs are in Mabrey Roofing's book?" a: "11 so far, and they are spread out rather than concentrated, from Southills to Pleasant Woods by way of Heather Hills. No single Garner neighborhood dominates the list, which is what a working town this size looks like in a roofer's book."

  Hmm "11 so far" — digit total ✓ (Tier-1 allowed). 

  metaDescription (add): "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Pleasant Woods. Algae-resistant systems, permits handled. Free estimate."

  Wait — I7: count binding town-wide. "11 completed roofs spread across town, from Southills to Pleasant Woods" — same pattern as Cary's shipped meta. OK.

  --- CLAYTON ---

  Array stays AS-IS: ["Flowers Plantation", "Riverwood", "Glen Laurel"] (v3 carve-out, flag in report).

  answer (new): "Mabrey Roofing is a roofing company serving Clayton, NC, with 10 completed roofs in town, handling repairs, replacements, and storm-damage assessments across Johnston County. Clayton is in Johnston County, not Wake, so a roof here permits through the Town of Clayton and Johnston County on different paperwork than the rest of the Triangle. We work this jurisdiction routinely and pull the correct permit the first time. Clayton's younger roofs, many built during the biotech boom around Flowers Plantation, mostly need a targeted repair rather than a full replacement, and we say so."

  Hmm — original answer: "From the newer builder-grade roofs filling Flowers Plantation, driven by the Novo Nordisk and Grifols biotech boom, to older homes near Riverwood, we know that Clayton's open subdivisions and wide roof planes sit in the central North Carolina storm corridor." — "we know" + descriptors. My rewrite keeps Flowers Plantation as descriptor ("built during the biotech boom around Flowers Plantation" — housing descriptor, allowed: "existing neighborhood descriptors stay as descriptors"). Keep storm-corridor texture in stormHook (already there).

  intro (new): "Clayton is in Johnston County, and that one fact separates the roofers who actually work here from the ones who do not. A Clayton roof permits through the Town of Clayton and Johnston County, on different paperwork than the rest of the Triangle. Mabrey Roofing works this jurisdiction routinely, with 10 completed roofs in Clayton so far, from the newer master-planned streets to the older parts of town. We know the jurisdiction, we know the young builder roofs going up out here, and we pull the right permit the first time."

  Hmm — original intro: "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood. We know the jurisdiction, we know the new builder roofs going up out here, and we pull the right permit the first time." — the from-to work-claim on Flowers Plantation/Riverwood → my version generalizes ("from the newer master-planned streets to the older parts of town"). ✓ per §2 clayton: "count-led but NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors". Is "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood" an existing work-claim? "works ... from X to Y" = service-claim on named hoods → re-ground (Cary treatment: deleted or re-grounded). I generalized. Good. housingStock still has "many in Flowers Plantation" as descriptor — keep.

  New FAQ4: q: "Does Mabrey Roofing have real experience in Clayton?" a: "Yes. The book shows 10 completed roofs in Clayton, and we work Johnston County routinely. The permit paperwork here is different from Wake County's, and we handle it as part of every job."

  metaDescription (add): "Clayton, NC roofing: 10 completed roofs in town. Johnston County permits handled right the first time. Free documented inspection."

  alt: "Builder-grade roof repair on a Flowers Plantation home in Clayton, NC" — hmm. v2.D: alt asserting completed work in a 0-book hood → de-attribute. "Builder-grade roof repair on a Flowers Plantation home" asserts a repair done on a Flowers Plantation home → 0-book → de-attribute to "a Clayton, NC home": "Builder-grade roof repair on a Clayton, NC home". v2.D applies lane-wide ("heroImage.alt is IN scrub scope for claims"). Do it.

  --- PITTSBORO ---

  neighborhoods: ["Fearrington Village"] — 1-item array. Hmm wait, current array has "Fearrington Village (nearby)" with parenthetical. Book name: "Fearrington Village". Use "Fearrington Village".

  Hmm, actually — is shrinking pittsboro array to 1 right? v3: "Array entries MUST be book-supported." Clayton carve-out only applies to Clayton. So yes, pittsboro → ["Fearrington Village"]. Report it.

  answer (new): "Mabrey Roofing and Construction serves Pittsboro, NC, and the surrounding Chatham County countryside, with 13 completed roofs in the area so far, including work at Fearrington Village. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, brand-new builder shingles in Chatham Park that deserve a documented eye before their warranties age out, and older homes around the courthouse circle. Every inspection comes with photos you keep."

  intro (new): "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Our book here is smaller and quieter, and we say so plainly: 13 completed roofs in the area, including work at Fearrington Village. We work all three Pittsboros, on the county's paperwork."

  FAQ2 rewrite: q same "Do you serve Chatham Park and Fearrington Village?" a: "Yes. Our book already includes completed work at Fearrington Village, and we serve the whole Pittsboro area, from the courthouse-circle streets and established subdivisions to the new construction at Chatham Park and the countryside in between."

  Hmm — "we serve ... established subdivisions" — capability, fine.

  metaDescription update: "Pittsboro, NC roofing in Chatham County: 13 completed roofs in the area, courthouse homes to farm metal. County permits handled. Free estimate."

  alt: "Metal and shingle roofing on homes near the courthouse circle in Pittsboro, NC" — asserts work ("roofing on homes near the courthouse circle")... courthouse circle = 0-book. De-attribute: "Metal and shingle roofing on Pittsboro, NC homes". Per v2.D.

  housingStock: names Powell Place and Chatham Forest as descriptors ("Powell Place and Chatham Forest brought conventional 2000s subdivisions") — descriptors, keep.

  localConsiderations: "Chatham County is its own permitting jurisdiction... we run it routinely" — jurisdiction-level, fine. Others fine.

  Now comment blocks for each. And remember NO em-dashes added — my comment blocks use "—" after city name? The existing convention: "RALEIGH — updated WO_SEO_LANE_W". That's a comment, not rendered copy; I5 governs copy presumably ("no em-dashes ADDED beyond the file's existing house usage" — the file's house usage includes comments with —). Fine.

  Now execute the edits. I need to be careful with Edit old_string uniqueness. Let me do them one per message chunk, but multiple Edit calls in one response allowed if different files — same file must be sequential? "Multiple Edit calls may run in one response only when they do not target the same file." So edits to lib/cities.ts must be one Edit per response, re-reading isn't needed if old_strings don't overlap. Actually rule: "DO NOT issue consecutive Edit calls on the same file" without re-reading? "A previous Edit can invalidate a later Edit's old_string" — my edits target disjoint regions; the write lock serializes them. The guidance says don't issue consecutive edits on same file in one response. Safer: one Edit call per response. That's 6 entries × maybe 1 big edit each (replacing whole entry block including adding comment). Each entry replacement is large but I have exact current text.

  Actually I can replace each entire entry in a single Edit (from `  {\n    slug: "apex",` through the closing `  },` before the next `{`). The old_string would be ~40 lines. That's fine.

  Hmm, but "Do not issue consecutive Edit calls on the same file" — I'll do them sequentially across responses. 6 edits for batch 2. That's OK.

  Actually wait — could I delegate this to a subagent? The task is heavy but I've already done all the analysis. Doing it myself keeps fidelity. The edits are long but manageable.

  Let me set up todos and start. Also I should decide: given the missing batch-2 edits, I proceed to author them. Also should I double-check git worktree for stray scratch from prior run? Nothing in git status. OK.

  One more thing to verify: how `answer` is rendered as .seo-answer and metaDescription rendering — for oracle. Fine.

  Also check that FAQ "count grew by exactly 1" — the oracle needs FAQ count on page; I'll count rendered FAQ questions via the page HTML or via the data. The batch-1 oracle asserted 3→4. I'll do the same by counting <details> or faq items in HTML. Let me check how FAQs render — grep for faq in components/location. Later.

  Start editing. Entry 1: apex (lines 351-393). Old string: from `  {\n    slug: "apex",` to the `  },\n  {\n    slug: "morrisville",` boundary. I'll include up to `  },` before morrisville.

  Let me write the full new apex block.Edit 1: Apex entry.

