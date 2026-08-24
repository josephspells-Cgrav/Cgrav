• Let me start by reading the WO file and full-hoods.json in full.

• Note discrepancies: WO §2 Tier-2 lists Fuquay-Varina: "Maggie Run · Lakestone Village" but full-hoods.json has only Lakestone Village (1). v2.B says full-hoods.json is THE complete adjudication source, superseding §2 top-lists for scrub decisions. Hmm — but §2 is the evidence pack for weave claims. The amendment says full-hoods.json supersedes the §2 top-lists for scrub decisions. For weaving, Maggie Run is in §2 pack but absent from full-hoods.json. v2.C: "A neighborhood absent from that file has ZERO book jobs for that city." So Maggie Run has 0 book jobs per the file? Conflict. The v2 amendments override. §2 says Maggie Run, full-hoods says only Lakestone Village. v2.B: "The full per-city hood lists live in wo/full-hoods.json in this worktree — THE complete adjudication source, superseding the §2 top-lists for scrub decisions." That's scoped to "scrub decisions." But v2.C says absent = ZERO book jobs. And v3 says array entries MUST be book-supported (present in full-hoods.json). For safety: Maggie Run should not be used as a work claim since absent from full-hoods.json (zero book jobs). Actually wait — "Fuquay-Varina (4)" total with only Lakestone Village (1) listed — the file may be incomplete? Zebulon (3) total, Rivercrest 2. Knightdale (4): Carrington Woods 2 + Timber Ridge 1 + Churchill 1 = 4 ✓. Holly Springs (4): 2+1=3... hmm, only 3. Wendell (5): 1+1=2. So full-hoods lists are "book-named neighborhoods" — geocoded/named ones, not exhaustive of total jobs. §2 lists Maggie Run for FV but full-hoods doesn't. Given "absent = ZERO book jobs", I must NOT use Maggie Run. Safer: Fuquay-Varina weave only Lakestone Village. Oracle requires ≥ min(2, full-list size) hoods present = min(2,1)=1 → Lakestone Village only. Good.

  Also Tier-2 batch-3: Wendell oracle min(2,2)=2 → Ridge Haven + Deerfield. Zebulon: exactly Rivercrest.

  Also note batch-1 report exists: wo/BUILD_REPORT_SEO_LANE_W.md — check it. Also look at batch 1 build reports and the existing lib/cities.ts entries for the 12 cities. lib/cities.ts is large; let me check its size and read relevant entries.

  Plan: read the report file, check git status, then read cities.ts entries for batch-2 cities. Let me set up a todo list too.

b87be3c seo-lane-w batch 1 fix: raleigh/durham directional corrections
6594fe0 seo-lane-w batch 1 fix: array work-claim rule (v3)
278bfdd seo-lane-w batch 1: durham + raleigh
f475d19 seo-lane-h FIX ROUND: /quote/ exact-200 gate, tripwire length+flag checks, floor msg appendix, matcher comment
5c15623 seo-lane-h: guard content-equality tripwire + sitemap floor + quote matcher tighten
?? wo/WO_SEO_LANE_W_CITY_SWEEP.md
?? wo/full-hoods.json
  1075 lib/cities.ts
   182 wo/BUILD_REPORT_SEO_LANE_W.md
  1257 total
• Now I need to read lib/cities.ts — the entries for the 12 target cities plus the frozen ones as reference (Cary's structure as mold). The file is 1075 lines. Let me read it in full — it's manageable (2 reads).

• The Read tool output is too large for a single call. I'll page through the file in smaller chunks with the Read tool directly on lib/cities.ts using line offsets. The file is 1075 lines. Let me read lines 52-500 and 500-1075 in separate calls, but each Read call is limited to 100KB or 1000 lines — but the previous read of 450 lines exceeded 50k chars and got truncated to a preview file. Actually the output exceeded 50000 characters so only preview shown. Let me read in ~200-line chunks. Or better: delegate? I need the exact content to edit. Since I'll be doing lots of edits, I should read the file carefully myself. Let me read in chunks of ~150 lines.

  Actually, a more efficient approach: read the specific entries. Let me first find line numbers of each city entry via Grep.

• Continue reading: lines 621-770 (rest of durham + chapel-hill + hillsborough), then 769-1075 (pittsboro, burlington, sanford, wilson). I need pittsboro and hillsborough for sure; burlington/sanford/wilson are frozen references (comment conventions). Let me read 621-850 and 850-1075.I have everything except: rest of raleigh entry (80-172), which I mostly saw; burlington/sanford/wilson (frozen, don't need in detail); and I need to see the apex full entry (352-393 seen), morrisville (395-421 seen), wake-forest (423-449 seen), knightdale (223-264 seen), garner (266-307 seen), clayton (309-350 seen), holly-springs (451-477 seen), wendell (479-505 seen), fuquay-varina (507-533 seen), zebulon (535-561 seen), pittsboro (769-814 seen), hillsborough (721-767 seen).

  Let me quickly view raleigh entry 80-172 to reference comment-block conventions (already saw the comment block at 58-78). I saw lines 80-81 only. I should read the raleigh entry fully for reference on how batch 1 did answer/intro/faqs/metaDescription/array. Let me read 80-173.Let me set up a todo list, then write the batch-2 edits. I have all content for the 6 batch-2 cities. Let me also check the FAQ-count oracle mechanics: FAQ count grew by exactly 1 — so Tier-1 cities currently have 3 FAQs (apex, garner, clayton have 3; morrisville 3; wake-forest 3; pittsboro 3). Good, add one count-FAQ each → 4.

  Now design batch-2 edits per city.

  **APEX (36)** — spine v2.F: heritage town (Salem Street descriptors stay) with a 36-deep book in the planned communities.
  Scrub analysis (pre-existing work-claims):
  - answer: "we account for any added review on Salem Street historic-district homes before we schedule" — service claim tied to Salem Street (0 book). Also "straightforward architectural tear-offs in the Villages of Apex and Scotts Mill" — work-claim phrasing ("tear-offs in X"). Villages of Apex: absent from full-hoods → 0 book. Scotts Mill: 1 book → supported. Salem Street: 0 → pre-adjudicated unsupported, convert to descriptor.
  - permitNote: "Homes in the Salem Street historic district can carry additional review, and we account for that before scheduling work." — regulatory texture about the district, not a work-claim per se ("we account for that" is service activity bound to Salem Street... it's a process claim, arguably district-review texture, not completed work in Salem Street). v2.C pre-adjudication: "Salem Street (apex)" UNSUPPORTED — convert to descriptor framing or delete the work-claim. The review claim is about the district existing, not completed work. I'd keep the district-review texture but avoid "we work on Salem Street homes regularly" type claims. The FAQ "Can you roof a historic home in downtown Apex?" answer: "We work on the older Salem Street historic-district homes regularly" — that's a work-claim → scrub.
  - neighborhoods array: ["Downtown Salem Street historic district", "Villages of Apex", "Haddon Hall", "Scotts Mill"]. v3: array entries must be book-supported. Salem Street 0, Villages of Apex 0, Haddon Hall 1 ✓, Scotts Mill 1 ✓. So array must be rebuilt from book hoods: Abbington (3), Sunset Hills (2), Hallmark West (1), The Park at West Lake (1), Sweetwater (1), Scotts Mill (1), Shepherd's Vineyard (1), Haddon Hall (1). Choose 4-6: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Sweetwater, Shepherd's Vineyard.
  - heroImage.alt: "Historic roofline restoration on a Salem Street home in downtown Apex, NC" — alt asserting completed work ("restoration on a Salem Street home") in 0-book hood → v2.D: de-attribute to "a <City>, NC home". E.g. "Historic roofline restoration on a home in downtown Apex, NC"? "downtown Apex" — is downtown a work claim? De-attribute to "an Apex, NC home". Keep "historic roofline" descriptor? "Historic roofline restoration on an Apex, NC home" — fine.
  - localConsiderations: "Salem Street historic-district homes can require extra review and a roofline-matching approach, not a stock tear-off." — descriptor of district requirements; not binding service activity ("we check"). Keep as descriptor? It says homes "can require extra review" — regulatory texture. Keep.
  - landmarks: "Historic Salem Street" — landmark, not a work claim. Keep.

  Count-FAQ (unique construction). Existing: Cary "How many Cary roofs has Mabrey Roofing completed?", Durham "How much roofing has Mabrey Roofing actually done in Durham?", Raleigh "What is Mabrey Roofing's track record in Raleigh?". New ones needed for Apex, Wake Forest, Pittsboro, Garner, Clayton, Morrisville — 6 distinct constructions, distinct from those 3.

  Ideas:
  - Apex: "Where has Mabrey Roofing worked in Apex?" — hmm that's a count-FAQ must carry count. "Which Apex neighborhoods show up most in Mabrey Roofing's book?" — distinct.
  - Wake Forest: "How many roofs has Mabrey Roofing done around Wake Forest?" — too close to Cary's "How many Cary roofs...". Try: "What does Mabrey Roofing's completed-work book look like in Wake Forest?"
  - Pittsboro: "Has Mabrey Roofing done much work in Pittsboro?" 
  - Garner: "How often does Mabrey Roofing work in Garner?" — hmm. "Where in Garner has Mabrey Roofing completed roofs?"
  - Clayton: "Does Mabrey Roofing have real completed work in Clayton?" 
  - Morrisville: "How deep is Mabrey Roofing's work history in Morrisville?"

  Check distinctness: 8 constructions:
  1. Cary: How many Cary roofs has Mabrey Roofing completed?
  2. Durham: How much roofing has Mabrey Roofing actually done in Durham?
  3. Raleigh: What is Mabrey Roofing's track record in Raleigh?
  4. Apex: Which Apex neighborhoods has Mabrey Roofing worked in most?
  5. Wake Forest: What does Mabrey Roofing's Wake Forest work history look like?
  6. Pittsboro: Has Mabrey Roofing completed roofs in Pittsboro?
  7. Garner: Where in Garner has Mabrey Roofing done roof work?
  8. Clayton: Is Mabrey Roofing active in Clayton?
  Hmm 8 is weak as a "count-FAQ" — must carry the count in answer. Question should be count-ish. "Is Mabrey Roofing active in Clayton, and how much?" Let me refine:
  - Clayton: "How established is Mabrey Roofing in Clayton?"
  - Morrisville: "How much experience does Mabrey Roofing have in Morrisville?" — close to Durham's "How much roofing...done in Durham?" Different construction though ("How much roofing has X done" vs "How much experience does X have"). Maybe Morrisville: "What's the count on Mabrey Roofing's completed Morrisville roofs?" Hmm informal. 

  Let me finalize:
  4. Apex: "Which Apex neighborhoods has Mabrey Roofing worked in the most?"
  5. Wake Forest: "What does Mabrey Roofing's completed work in Wake Forest look like?"
  6. Pittsboro: "Has Mabrey Roofing done real work in Pittsboro?"
  7. Garner: "Where around Garner has Mabrey Roofing completed roofs?"
  8. Clayton: "How well does Mabrey Roofing know Clayton?"
  Hmm Clayton's should evoke count. "How established is Mabrey Roofing in Clayton?" Good.

  Wait — oracle asserts "FAQ count grew by exactly 1" and count-FAQ carries the total presumably. Answer must contain "36 completed roofs" etc. Also oracle asserts the exact total string present on page (intro/answer) and metaDescription with count.

  **metaDescriptions** (≤155 chars, with count, town-wide phrasing):
  - Apex: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." — count chars: let me count later precisely in script.
  - Wake Forest: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic-core to new subdivisions. Free documented estimate."
  - Pittsboro: "Pittsboro, NC roofing: 13 completed roofs across Chatham County, including Fearrington Village. County permits handled. Free estimate."
  - Garner: "Garner, NC roofing: 11 completed roofs spread across town, no two alike. Algae and moisture specialists. Free documented estimate."
  - Clayton: "Clayton, NC roofing: 10 completed roofs in Johnston County, permitted right the first time. Free documented estimate." 
  - Morrisville: "Morrisville, NC roofing: 10 completed roofs across town, led by Kitts Creek and Breckenridge. Honest repair-or-replace answers. Free estimate."

  Careful: I7 says honest count binding, town-wide phrasing — never bind a city total to named neighborhoods. Hmm, Cary's own metaDescription does "73 completed roofs across town, from Amberly to Twin Lakes" — "across town, from X to Y". The lesson is never bind total ONLY to named neighborhoods (like "36 roofs in Abbington"). "across town, including/led by" is fine per Cary precedent.

  **Answers** (rewrite to carry total + hoods, preserve .seo-answer single paragraph):

  Apex answer rewrite: keep spine — permits through Town of Apex Building Inspections, Salem Street historic district review (descriptor), two roofing towns, book: 36 completed roofs led by Abbington etc.

  Draft: "Mabrey Roofing is a roofing company serving Apex, NC, with 36 completed roofs across town, concentrated in the planned communities — Abbington and Sunset Hills lead the book, with Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater behind them. Apex is two roofing towns in one: steep, complex 1800s rooflines around the Salem Street historic district where the profile has to match, and straightforward architectural tear-offs in the Peakway-ring subdivisions. We pull permits through Town of Apex Building Inspections and flag any added historic-district review before we schedule. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates."

  Wait — no per-hood counts (none printed). "36 completed roofs" fine. Em-dash: I5 says no em-dashes ADDED beyond existing house usage. The entry currently uses no em-dashes in apex... Chapel Hill has em-dashes. Pittsboro entry uses em-dashes already ("permit through Chatham County's permitting office — a different jurisdiction"). House usage varies. Safer to avoid adding em-dashes to entries that didn't have them. Apex entry: check for existing em-dashes — none visible. Use commas/colons instead.

  Apex intro rewrite: "Apex is two roofing towns in one..." keep spine, add count. Draft: "Apex is two roofing towns in one, and Mabrey Roofing's book proves we work both: 36 completed roofs across town, most of them in the planned communities that ring the historic core. Abbington and Sunset Hills lead that list, with Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater each on it too. The other Apex is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, where the profile has to match. A complex historic roofline and a straightforward architectural tear-off ask for different skills, and we bring the right one to each."

  Directional claims: "ring the historic core" / "Peakway ring" — existing copy says "ring of modern suburban neighborhoods inside the Apex Peakway", so "ring" is pre-existing. Fine.

  neighborhoods array: ["Abbington", "Sunset Hills", "Scotts Mill", "Haddon Hall", "Shepherd's Vineyard", "Sweetwater"] — 6 items, all book-supported.

  FAQ1 rewrite: "Can you roof a historic home in downtown Apex?" a: "Yes. The older homes around the Salem Street historic district can carry added review and ask for a roofline-matching approach rather than a stock tear-off, and we plan for that before we schedule the work." — removes "We work on ... regularly" work-claim.

  Hmm, but is that gutting? "Can you roof..." — answer "Yes" plus capability claim without claiming completed work there. OK.

  Count-FAQ Apex: q "Which Apex neighborhoods has Mabrey Roofing worked in the most?" a: "Abbington and Sunset Hills top our Apex book, with Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater also on it, part of 36 completed roofs across town."

  Also scrub: answer's old claim "straightforward architectural tear-offs in the Villages of Apex and Scotts Mill" → Villages of Apex 0-book; new answer drops Villages of Apex. housingStock: "the Peakway neighborhoods are predominantly straightforward..." — regional descriptor, fine. intro old: "a straightforward architectural tear-off in the Villages of Apex ask for different skills" → replaced.

  Scrub table rows for Apex: Salem Street (answer process-claim? + FAQ work-claim + alt + array), Villages of Apex (answer + intro + array), Scotts Mill (answer work-claim; book 1 → KEEP-supported, remains in copy), Haddon Hall (array; 1 → KEEP).

  Wait alt: "Historic roofline restoration on a Salem Street home in downtown Apex" → v2.D de-attribute: "Historic roofline replacement on an Apex, NC home"? Alt says "restoration" — keep close to original but de-attribute: "Historic roofline restoration on an Apex, NC home". Fine.

  **WAKE FOREST (24)** — spine: one anchor community (Heritage, 7 combined) carrying a 24-roof book. Note full-hoods: "Heritage North at Heritage Wake Forest" 6 + "Heritage Wake Forest" 1 = 7 combined. WO §2 says "Heritage (Heritage North / Heritage Wake Forest)" anchor at 7 combined. In copy, print "Heritage" (no per-hood counts).

  Scrub:
  - answer: "from pre-war homes in the Historic District near the old college to first-replacement architectural shingles in Heritage, Traditions, and Holding Village" — work-claims: old college (0, pre-adjudicated unsupported), North Main (0), Heritage (7 ✓), Traditions (absent from full-hoods → 0), Holding Village (absent → 0). So answer rebuild: keep Historic District as descriptor? "pre-war homes in the Historic District" — "we handle repair and replacement ... from X to Y" is a work-claim construction. v2.C: old college/North Main pre-adjudicated unsupported → convert to descriptor framing or delete work-claim. The Historic District itself: is "Wake Forest Historic District" in book? Not in full-hoods → 0. But it's a regulatory district; describing that we do preservation-review planning is a process claim. Safer: frame the old core as descriptor ("the Historic District asks for..."), and bind completed-work claims to Heritage, Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, Wakefield Estates.
  - "We work the older homes around the old college and along North Main regularly" (FAQ1) → work-claim, scrub.
  - neighborhoods array: ["Wake Forest Historic District", "North Main Street", "Heritage", "Traditions", "Holding Village", "Wakefield"] → v3: book-supported only. Book hoods: Heritage North at Heritage Wake Forest, Olde Mill Stream, St. Ives, Smith Creek, Dansforth, Austin Creek, Crenshaw Hall Plantation, Horse Creek, Prestwicke, Heritage Wake Forest, Wakefield Estates, Thornrose, Caddell Woods. Array 4-6: "Heritage" — how to render? The book names are "Heritage North at Heritage Wake Forest" and "Heritage Wake Forest". Printing "Heritage" as array entry — it's the community name; §2 pack lists "Heritage (Heritage North / Heritage Wake Forest)". I'd use "Heritage" as the array entry, justifiable as the book community. Batch 1 precedent: Raleigh array used "Hedingham" and "Hedingham Village" both book-listed. For Heritage, use "Heritage" (combining the two book entries). Array: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"] — 6, all book-supported.
  - alt: "Architectural shingle roof replacement on a Heritage neighborhood home in Wake Forest, NC" — Heritage is book-supported (7) → KEEP per v2.D.
  - localConsiderations: "Master-planned communities like Heritage and Traditions are hitting first-replacement age..." — descriptor of age, includes Traditions (0-book). It's a housing descriptor, not a work-claim ("are hitting first-replacement age" — no service activity bound). Tier-1 rule: existing aspirational work-claims get scrubbed; descriptors stay. "hitting first-replacement age" is a descriptor. Keep? It names Traditions which is 0-book but as housing descriptor only — v2.C allows conversion to descriptor framing. It already IS descriptor framing. Keep.
  - intro: "Mabrey Roofing roofs both worlds. A pre-war home under heavy oaks near the seminary and a builder-grade tear-off in Holding Village ask for different work" — "roofs both worlds" + "tear-off in Holding Village" = work-claim in 0-book Holding Village. Rewrite intro to carry count: "24 completed roofs" anchored by Heritage.

  Wake Forest intro draft: "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary, leaving a deep historic core ringed now by some of the fastest new growth in the Triangle. That newer half is where our book lives: 24 completed roofs across Wake Forest, anchored by Heritage and running through Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates. We still bring both skill sets, the careful profile match a pre-war home under heavy oaks asks for and the clean builder-grade tear-off, to whichever address calls."

  Hmm "anchored by Heritage" — no count bound to it. Good. Directional: none added.

  Answer draft: "Mabrey Roofing is a Wake Forest roofing contractor with 24 completed roofs across town, anchored by the Heritage communities and running through Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. The work splits by era: pre-war homes around the Historic District ask for profile-matching and preservation-review planning, while the master-planned streets carry first-replacement architectural shingles. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster."

  Count-FAQ Wake Forest: q "What does Mabrey Roofing's completed work in Wake Forest look like?" a: "The book shows 24 completed roofs across Wake Forest, anchored by Heritage, with Olde Mill Stream behind it and single projects in St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates." — "single projects" = per-hood count? "single projects in X" — Cary's shipped copy says "single projects in Lochmere and MacGregor Downs" — that's the precedent, acceptable (it conveys count=1 without digits... it IS a per-hood count in word form. But Cary shipped with it and I1 says "never per-neighborhood numbers" — Cary's was judged and shipped. v2.G banned pattern: "any digit adjacent to a hood name in a jobs construction" — digits banned; word "single projects" is Cary-sanctioned. I'll use sparingly.)

  Actually for Garner the WO explicitly says hoods are 1 job each, name at most 3, spread phrasing. For Wake Forest "single projects in..." is fine per Cary precedent.

  **PITTSBORO (13)** — spine: count + town's real axes (Chatham growth, Fearrington); quietest register. Fearrington Village (2) is the ONLY hood claim permitted. But wait: pittsboro's existing array has "Fearrington Village (nearby)" — and full-hoods shows Fearrington Village 2 for pittsboro. Other array entries: Chatham Park (absent → 0), Powell Place (0), Chatham Forest (0), "The Courthouse Circle historic core" (0). v3: array must be book-supported only → array would shrink to just ["Fearrington Village"]?? Arrays may shrink to 3-4 for Tier-2... for Tier-1 Pittsboro with only ONE book hood, the array can only have 1 entry?! v3 says "Array entries MUST be book-supported" and "an honest short array beats a padded one" (Tier-2 context). For Pittsboro, strict reading: array = ["Fearrington Village"]. Hmm, but v3 Tier-2 line says arrays may shrink to 3-4. For Pittsboro with a single book hood, a 1-item array is the only honest option. Clayton's array stays as-is per explicit carve-out; no carve-out for Pittsboro. So Pittsboro array = ["Fearrington Village"]. That's the honest reading. Also "Fearrington Village (nearby)" — the "(nearby)" qualifier: Fearrington is between Pittsboro and Chapel Hill; the book counts it under pittsboro. I'll use "Fearrington Village" plain.

  Hmm wait — but the FAQ "Do you serve Chatham Park and Fearrington Village?" — service-area question; serving ≠ completed work claim. "Do you serve X" answered "Yes, we serve..." is a capability claim, not a completed-work claim. The scrub targets completed/known-work claims. Keep FAQ2 mostly, maybe fine as is. It says "We serve Chatham Park's new neighborhoods, the established subdivisions like Powell Place and Chatham Forest, and the countryside around Pittsboro including the Fearrington Village area" — service claim, allowed (service area). The scrub is about claims of COMPLETED work. I'll keep.

  Intro: add count, Fearrington mention: Draft: "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Ours is a smaller book here and we say so plainly: 13 completed roofs across the Pittsboro area, including work at Fearrington Village, the established community between Pittsboro and Chapel Hill. Mabrey Roofing works all three Pittsboros, on the county's paperwork."

  Hmm "the established community between Pittsboro and Chapel Hill" — directional/geographic claim. Existing FAQ says "the Fearrington Village area between Pittsboro and Chapel Hill" — pre-existing, so safe to reuse that phrasing.

  Pittsboro entry uses em-dashes already (permitNote, housingStock). So em-dash use is house-consistent. I'll keep minimal anyway.

  Answer rewrite: carry 13 + Fearrington. Draft: "Mabrey Roofing and Construction serves Pittsboro, NC, and the surrounding Chatham County countryside, with 13 completed roofs across the area, including work at Fearrington Village. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, brand-new builder shingles in Chatham Park, and the older homes around the courthouse circle. Every inspection comes with photos you keep."

  Original answer claimed "from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place" — work-claim in Chatham Park (0) and Powell Place (0) and Chatham Forest (0, housingStock "established 2000s subdivisions like Chatham Forest"). Scrub: Chatham Park, Powell Place, Chatham Forest all 0-book → convert to descriptors (they can stay as housing/geography descriptors: "new construction filling in at Chatham Park" is arguably descriptor of the town's growth, not a work claim — the claim "serves... from X to Y" frames service area. Hmm. "Mabrey Roofing serves Pittsboro ... from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place" — service-area framing, not completed-work claim. But v2.C says Salem Street etc. get scrubbed; for Pittsboro the WO says "Fearrington is the ONLY hood claim permitted" — "hood claim". To be safe, in the answer's work-context I'll only bind Fearrington; Chatham Park stays as growth descriptor in intro/stormHook/housingStock (already there).

  Count-FAQ Pittsboro: q "Has Mabrey Roofing done real work in Pittsboro?" a: "Yes. The book counts 13 completed roofs across Pittsboro and the surrounding Chatham County countryside, including work at Fearrington Village, and the same crews handle everything from farmhouse metal to new Chatham Park construction." Hmm "handle ... new Chatham Park construction" capability claim fine.

  **GARNER (11)** — spread-not-depth: 5 hoods × 1 job, name at most 3, "from X to Y". 
  Scrub: Creekside (0, pre-adjudicated) appears in answer ("from Creekside and the White Oak corridor..."), intro ("north-facing slopes in Creekside and the White Oak corridor grow the dark algae"), array ("Creekside"), alt ("on a Creekside home near Lake Benson"). Work-claims: answer's "handling repairs... across town, from Creekside and the White Oak corridor to homes near Lake Benson and Lake Wheeler" — service-area claim tied to 0-book Creekside → scrub Creekside. Intro's "north-facing slopes in Creekside ... grow the dark algae streaks" — that's a descriptor of conditions, not completed work... but it asserts presence/work? "north-facing slopes in Creekside grow algae" is an environmental descriptor. v2.C: Creekside pre-adjudicated UNSUPPORTED → convert to descriptor framing or delete the work-claim. The intro mention is arguably already descriptor (algae grows there — environmental claim about the place). Hmm, risky: judge may see naming Creekside as implying work. Safest: remove Creekside from intro and answer, keep moisture thesis on lake corridors (Lake Benson/Lake Wheeler are landmarks/geography, in landmarks array). Array: Creekside (0), Cleveland Bluffs (0), "Lake Benson area" (0), "White Oak corridor" (0) → v3 array must be book-supported: book hoods Southills, Hunter's Mark, Hillington West, Heather Hills, Pleasant Woods. Name at most 3 in copy; array can hold... v2 pack says name at most 3 — that's about copy naming. Array: I'll use 4: ["Southills", "Hunter's Mark", "Heather Hills", "Pleasant Woods"]? "Name at most 3" — I'll keep copy to 3 names (Southills, Hunter's Mark, Heather Hills) and array also 3-4. To be safe, array = 4 book hoods? The "name at most 3" instruction likely governs the spread phrasing to avoid implying depth. Array under "Dispatched Across Garner" band is a work-claim surface; 4-5 entries of 1-job hoods is honest (they ARE the book). But §3.3 says array 4-6 items. I'll use 4: Southills, Hunter's Mark, Hillington West, Heather Hills... but copy naming at most 3. Hmm, oracle for Tier-1: ≥3 of its §2 hoods present on page. Array entries render, so 4 array entries = 4 hoods present. Copy names 3. Let me set array: ["Southills", "Hunter's Mark", "Heather Hills", "Pleasant Woods"] (4). Copy names: "from Southills to Hunter's Mark and Heather Hills".

  Alt: "Algae-resistant shingle replacement on a Creekside home near Lake Benson in Garner, NC" → Creekside 0 → de-attribute: "Algae-resistant shingle replacement on a Garner, NC home". Keep "near Lake Benson"? Lake Benson is geography/landmark; "a home near Lake Benson in Garner, NC" — still a work-claim in alt bound to a place... Lake Benson is a lake, not a hood; the alt asserts work on a home near the lake. v2.D targets "0-book hood". Lake Benson area is 0-book as array entry. Safest: "Algae-resistant shingle replacement on a Garner, NC home".

  Intro rewrite (spread-not-depth, working-town register): "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and shaded north slopes grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Mabrey Roofing treats Garner roofs for the conditions they actually live in, and our book here runs wide rather than deep: 11 completed roofs spread across town, from Southills to Hunter's Mark and Heather Hills, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing."

  Answer rewrite: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills to Hunter's Mark and Heather Hills — no single neighborhood dominates, because the work tracks the whole town. Garner's real roofing enemy is moisture..." wait no em-dash added? garner entry: check existing em-dashes — none visible in garner entry. Avoid em-dash. Draft: "...from Southills to Hunter's Mark and Heather Hills. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address."

  Count-FAQ Garner: q "Where around Garner has Mabrey Roofing completed roofs?" a: "The work is spread out rather than concentrated: 11 completed roofs across town, one each in places like Southills, Hunter's Mark, and Heather Hills." Hmm "one each" = per-hood count in word form. Cary precedent "single projects in". "one each in places like" is the same class. But Garner instruction: "never implying depth per hood" — "one each" implies exactly shallow. Fine, but maybe simpler: "11 completed roofs across Garner, spread from Southills to Hunter's Mark and Heather Hills rather than stacked in any one neighborhood." Good, avoids per-hood counts entirely.

  **CLAYTON (10)** — count-led but ZERO hood work-claims; existing descriptors stay descriptors; array stays AS-IS per v3 carve-out.
  Current work-claims: answer "From the newer builder-grade roofs filling Flowers Plantation, driven by the Novo Nordisk and Grifols biotech boom, to older homes near Riverwood, we know that..." — "we know that Clayton's open subdivisions" — knowledge claim. "From X to Y, we know..." borderline work-claim. Intro: "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood." — "works ... from Flowers Plantation to older Riverwood" is a work-claim naming 0-book hoods (clayton full-hoods is EMPTY — zero geocoded hoods). WO: "count-led but NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors." So "works ... from Flowers Plantation to older Riverwood" must be converted: Flowers Plantation/Riverwood stay as descriptors of housing/geography, not as places we worked. Rewrite: "Mabrey Roofing works Johnston County routinely" (county-level claim fine — the 10 roofs ARE in Clayton/Johnston). Then Flowers Plantation described as growth descriptor.

  FAQ: "My Flowers Plantation home is almost new..." — that's the customer asking about their home; answer doesn't claim work there. Fine. localConsiderations: "Flowers Plantation and the surrounding biotech growth mean mostly young, builder-grade roofs" — descriptor. Fine. alt: "Builder-grade roof repair on a Flowers Plantation home in Clayton, NC" — alt asserting completed work ("roof repair on a Flowers Plantation home") in 0-book hood → v2.D de-attribute: "Builder-grade roof repair on a Clayton, NC home". Array stays as-is (carve-out, flag in report).

  Intro rewrite: "Clayton is in Johnston County, and that one fact separates the roofers who actually work here from the ones who do not. A Clayton roof permits through the Town of Clayton and Johnston County, on different paperwork than the rest of the Triangle. Mabrey Roofing works this jurisdiction routinely, with 10 completed roofs in Clayton to show for it, and we pull the right permit the first time. The work is mostly the young stuff: the biotech boom around Flowers Plantation has filled the town with builder-grade roofs now entering the early part of their service life, where the honest answer is usually a targeted repair, not a replacement."

  Answer rewrite: "Mabrey Roofing is a roofing company serving Clayton, NC, with 10 completed roofs in town, handling repairs, replacements, and storm-damage assessments across Johnston County. Clayton is in Johnston County, not Wake, so a roof here permits through the Town of Clayton and Johnston County on different paperwork than the rest of the Triangle, and we pull the correct permit the first time. The housing skews young: the Novo Nordisk and Grifols biotech boom filled subdivisions like Flowers Plantation with builder-grade roofs that usually need a targeted repair, not a full replacement, and we say so."

  Count-FAQ Clayton: q "How established is Mabrey Roofing in Clayton?" a: "Established enough to know the jurisdiction cold: 10 completed roofs in Clayton, all permitted through the Town of Clayton and Johnston County rather than Wake County, which is the detail that trips up out-of-area roofers."

  **MORRISVILLE (10)** — trap. Scrub Carpenter Village (0-book in Morrisville; it's a Cary hood): appears in answer ("builder-grade roofs in Breckenridge, Carpenter Village, and Kitts Creek are now 20-plus years old"), intro ("across Breckenridge and Carpenter Village"), array, localConsiderations ("across Breckenridge and Carpenter Village are now 20-plus years old"), FAQ1 ("used across Breckenridge, Carpenter Village, and similar early-2000s subdivisions"). v2.E: rebuild those clauses on Kitts Creek (3) + Breckenridge (3); never substitute Carpenter Park; never cross-import Cary pack.

  Note: many of these are age descriptors ("builder-grade roofs in X are now 20-plus years old") rather than explicit completed-work claims. But v2.E says Morrisville's four existing "Carpenter Village" claims are unsupported: scrub per §C. Four claims: answer, intro, localConsiderations, FAQ1 (and array entry = 5?). "four existing claims" — probably answer, intro, localConsiderations, FAQ; plus array. I'll remove Carpenter Village everywhere: replace with Kitts Creek/Breckenridge per v2.E ("rebuild those clauses on Kitts Creek + Breckenridge").

  Array: ["Breckenridge", "Carpenter Village", "Kitts Creek", "Shiloh Grove", "Savannah", "McCrimmon at the Park"] → v3: book-supported only: Kitts Creek (3), Breckenridge (3), Carpenter Park (1), Village at Town Hall Commons (1), Downing Glen (1), Addison Park (1). WO §2: name 2-4: Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park. Array: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park"] (5). Note: Carpenter Park in the ARRAY is fine (book-supported, correct referent). v2.E says don't substitute Carpenter Park INTO THE OLD SENTENCES; array is rebuilt fresh.

  Also "Shiloh Grove", "Savannah", "McCrimmon at the Park" — 0-book → out of array.

  Intro rewrite: "Morrisville is the Triangle town where the first-replacement clock ran out first. While Raleigh's newer boomburbs are still on their original shingles, Morrisville filled up earlier, growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park. Our book here is compact but real: 10 completed roofs across town, led by Kitts Creek and Breckenridge, the two communities where our Morrisville work concentrates. Those builder-grade roofs went on in the late 1990s and early 2000s, which puts a huge share of them at 20-plus years old right now. That is end of life for a builder roof. Mabrey Roofing helps Morrisville owners read the wear honestly with a free documented inspection and a straight repair-or-replace answer."

  Careful: "10 completed roofs across town, led by Kitts Creek and Breckenridge" — town-wide phrasing with leaders, Cary-style ("73 completed roofs across town, led by Amberly and Twin Lakes"). Fine.

  Answer rewrite: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs across town, led by Kitts Creek and Breckenridge. Morrisville filled up early during the Research Triangle Park boom, so the builder-grade roofs in those early-2000s communities are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts."

  localConsiderations: "Many builder roofs across Kitts Creek and Breckenridge are now 20-plus years old and at end of life on a shared timeline." — descriptor, fine (rebuilt per v2.E).
  FAQ1: "The builder-grade shingles used across Kitts Creek, Breckenridge, and similar early-2000s subdivisions commonly reach end of life around 20 years..." 

  Count-FAQ Morrisville: q "How deep does Mabrey Roofing's work run in Morrisville?" a: "The book counts 10 completed roofs across town, and it concentrates where Morrisville's oldest builder roofs live: Kitts Creek and Breckenridge lead, with single projects in Carpenter Park, Downing Glen, and Addison Park behind them."

  Distinct from others. Good.

  Now — total counts of "completed roofs" phrasing: I need the exact total string per oracle: "36 completed roofs", "24 completed roofs", "13 completed roofs", "11 completed roofs", "10 completed roofs" (both Clayton and Morrisville use "10 completed roofs" — fine, different pages).

  Anti-template law: no clause of 8+ words shared between entries. I'm writing fresh sentences; watch for repeated stock phrases from my own drafts: "That is end of life for a builder roof" (Morrisville, pre-existing). "an honest read on what cleaning can save versus what needs replacing" is pre-existing Garner — keep once.

  Also each Tier-1 must include comment block above entry (Burlington convention): first-party book line + scrub annotation + A6 annotation line for retained texture.

  Doorway-check: pairwise <40% across all 20 cities — my rewrites keep most existing copy, so fine.

  Now Batch-3 Tier-2 design (do after batch 2 gates; but plan now):

  - KNIGHTDALE (4 total, never print): hoods Carrington Woods (2), Timber Ridge (1), Churchill (1). Weave into intro/housingStock as completed-work mentions: "including work in Carrington Woods, Timber Ridge, and Churchill" phrasing class. Scrub: Mingo Creek, Langston Ridge, Planters Walk stay as housing descriptors only (v2.C) — currently answer has "The builder-grade roofs across Mingo Creek, Langston Ridge, and Planters Walk are now hitting 12 to 20 years old" — descriptor, keep. intro: "the builder-grade roofs that went on all those Mingo Creek and Langston Ridge homes" — descriptor, keep. Array: ["Mingo Creek", "Old Town Knightdale", "Langston Ridge", "Amber Ridge", "Planters Walk"] → v3: book-supported only → ["Carrington Woods", "Timber Ridge", "Churchill"] (3-4 allowed). Alt: "First roof replacement on a Mingo Creek home in Knightdale, NC" — Mingo Creek 0-book → work-claim alt → de-attribute: "First roof replacement on a Knightdale, NC home". Hmm v2.D: "an alt asserting completed work in a 0-book hood gets de-attributed". "First roof replacement on a Mingo Creek home" asserts work → de-attribute to "a Knightdale, NC home".

  Wait — but for Tier-2, no total anywhere, no count-FAQ, FAQ count unchanged (3).

  Oracle Tier-2: ≥ min(2, full-list size) hoods present: Knightdale min(2,3)=2. Zebulon exactly Rivercrest (min(2,1)=1).

  - HOLLY SPRINGS (4): hoods Holly Glen East (2), Twin Lake Farm (1). Existing mentions: "Holly Glen" in answer and array — book has "Holly Glen East" not "Holly Glen". Array: ["12 Oaks", "Holly Glen", "Forest Springs", "Sunset Ridge", "Bass Lake", "Holly Pointe"] → all 0-book → shrink to book hoods: ["Holly Glen East", "Twin Lake Farm"]... 3-4 items allowed but only 2 book hoods → array of 2? "arrays may shrink to 3-4 items" — with only 2 book hoods, a 2-item array is the honest max. Hmm, v3 says array entries MUST be book-supported; may shrink to 3-4. Two is fewer than 3-4 but there's no alternative. Same for Wendell (2 hoods), Hillsborough (2), Fuquay-Varina (1!), Zebulon (1!). Fuquay-Varina array of ONE entry: "Lakestone Village". Zebulon: ["Rivercrest"]. Honest short arrays. OK.

  Also alt claims for Tier-2: holly-springs alt "on a 12 Oaks home" — 12 Oaks 0-book → de-attribute. wendell alt "on a Wendell Falls home" → Wendell Falls 0-book → de-attribute. fuquay alt "on a Bentwinds home" → 0 → de-attribute. zebulon alt "on a Pilot Ridge home surrounded by open farmland" → 0 → de-attribute ("surrounded by open farmland" is geographic descriptor, could keep: "on a Zebulon, NC home surrounded by open farmland").

  - HILLSBOROUGH (4): hoods Cornwallis Hills (2 — already in array ✓), Fairview (1). Weave: "completed work in Cornwallis Hills and Fairview". Existing array: Downtown Historic District, West Hillsborough, Waterstone, Churton Grove, Beckett's Ridge, Cornwallis Hills → only Cornwallis Hills book-supported → array: ["Cornwallis Hills", "Fairview"] (2). Alt: "Roof replacement on a historic home near downtown Churton Street in Hillsborough, NC" — historic home near Churton Street: is that a work-claim in a 0-book hood? "Downtown Historic District" 0-book. Alt asserts work on a home near downtown → v2.D de-attribute? Hmm. The scrub targets hood work-claims; "historic home near downtown Churton Street" implies a completed replacement there. Batch-1 precedent: Durham's alt kept "1920s craftsman bungalow in the Trinity Park neighborhood" because Trinity Park supported. For 0-book, Cary treatment = de-attribute to "a <City>, NC home". Hillsborough alt → "Roof replacement on a historic home in Hillsborough, NC". "historic home" descriptor retained.

  - WENDELL (5): hoods Ridge Haven (1), Deerfield (1). Existing: Wendell Falls, Ponder, Foxborough Crossing, Woods of Timberlake, Downtown historic, Lake Glad Road — all 0-book. Wendell Falls/Ponder work-claims: answer "We re-roof open Wendell Falls and Ponder lots" → scrub (convert to descriptor: "open lots in the new subdivisions"). intro "brand-new Wendell Falls and Ponder rooflines" descriptor-ish; "an architectural tear-off on a wide, exposed Wendell Falls plane" — work-claim → convert. FAQ2 "Why does my new Wendell Falls roof seem to catch more wind damage" — customer-question framing; answer "Wendell Falls lots are open with young trees" — descriptor. Keep. Array → ["Ridge Haven", "Deerfield"]. Weave into intro/housingStock: "with completed work in Ridge Haven and Deerfield".

  Hmm wait — Wendell Falls and Ponder: these are the big new communities; converting "we re-roof Wendell Falls lots" to descriptor is required since 0 book jobs. Answer rewrite: "We work the open new-subdivision lots on the east side, where wide planes catch straight-line wind head-on, and we carefully tear off early-1900s bungalows in the downtown historic district. Our completed work here includes Ridge Haven and Deerfield." Careful with "east side" directional — pre-existing copy says "eastern edge of Wake County" — fine, keep pre-existing directions only.

  - FUQUAY-VARINA (4): hoods per full-hoods: Lakestone Village (1) ONLY. §2 said "Maggie Run · Lakestone Village" but Maggie Run absent from full-hoods → ZERO book jobs → do not use. Note gap in report. Existing: South Lakes, Bentwinds work-claims (0-book): answer "first-generation architectural-shingle roofs across new Wake County subdivisions like South Lakes and Bentwinds" — descriptor framing ("roofs across subdivisions like X") — housing descriptor. But "we work both sides... and the first-generation architectural-shingle roofs across new subdivisions like South Lakes and Bentwinds" — it's describing the housing they service. Tier-2 rule: "existing aspirational-neighborhood work-claims get the same honesty scrub as Tier 1" — scrub work-claims, keep descriptors. "roofs across subdivisions like South Lakes" is borderline descriptor. The answer's framing "Mabrey Roofing repairs and replaces roofs in Fuquay-Varina, working both sides of this two-downtown town: older homes..., and the first-generation architectural-shingle roofs across new Wake County subdivisions like South Lakes and Bentwinds" — this claims active work in South Lakes/Bentwinds. Convert: keep as housing descriptor ("the new Wake County subdivisions carry first-generation architectural-shingle roofs") without binding our work to named 0-book hoods. Weave Lakestone Village as completed-work mention in housingStock (housingStock already says "subdivisions like South Lakes and Lakestone Village" — Lakestone is book-supported ✓; South Lakes as pure housing descriptor). Array → ["Lakestone Village"] only. Hmm — one-item array. OK per honest-short rule.

  - ZEBULON (3): Rivercrest (2). Existing hoods all 0-book: Pilot Ridge, Weavers Pond, Olde Place, Wakelon Heights, Little River, Whitley Manor. Work-claims: answer "We inspect, repair, and fully replace roofs on exposed homes from Pilot Ridge to Weavers Pond and Wakelon Heights" → scrub to descriptor + weave Rivercrest: "Our completed work here includes Rivercrest" or weave into housingStock. intro "from the older ranch... near downtown Arendell Avenue to the newer builds in Weavers Pond and Pilot Ridge" — "We know this town, from X to Y" — work-ish claim ("We know this town, from the older ranch homes ... to the newer builds in Weavers Pond and Pilot Ridge") — knowledge claim naming 0-book hoods → convert to pure descriptor ("the town runs from the older ranch homes... to the newer builds in..."). Array → ["Rivercrest"] only.

  For Tier-2 weave phrasing per §2: "including work in Carrington Woods, Timber Ridge, and Churchill" phrasing class.

  Tier-2 total-leak grep: city total in digit or word form within 6 words of roofs/jobs/projects/completed. My copy never prints totals for these cities. Also careful: existing pre-existing numbers (Knightdale 11,000→19,000, 12-to-20-year) — v2.A allows texture numbers. The grep is for the total near roof-words.

  Also v2.G Tier-1 per-hood counts grep on batch-2 pages: ensure no digit adjacent to hood names in jobs constructions. My copy: "single projects in Carpenter Park, Downing Glen, and Addison Park" — no digits. OK.

  Also watch: Wake Forest "Heritage, 7 combined" must NOT print 7. Pittsboro Fearrington 2 — no print. Good.

  Now, FAQ count oracle: Tier-1 FAQ grew by exactly 1 (3→4 for all six? Check: apex 3, garner 3, clayton 3, morrisville 3, wake-forest 3, pittsboro 3 — yes all 3). Tier-2 unchanged (3).

  metaDescription: apex/morrisville/wake-forest have existing metaDescription; garner/clayton/pittsboro — garner has none? Check: garner entry ends at heroImage, no metaDescription (falls back to templated). Clayton: no metaDescription. Pittsboro: has one. Oracle: "metaDescription rendered with count" — need to add metaDescription to garner and clayton.

  Let me now verify counts of characters for metaDescriptions ≤155 — I'll verify with a script later.

  Also heroImage src: UNTOUCHED — only alt edits where needed.

  One more check — the oracle for Tier-1 requires "≥3 of its §2 hoods present" on rendered page. For Clayton: §2 has no hoods; oracle presumably asserts count + FAQ for clayton; hood assertion likely N/A (0 hoods). I'll script per-city expectations sensibly: clayton hood assertion skip (or assert 0 of 0 — pass). Pittsboro: ≥3 hoods?? §2 Pittsboro: only Fearrington. ≥3 impossible — oracle as written says "≥3 of its §2 hoods present" — for Pittsboro its §2 hood list has 1. I'll interpret as ≥min(3, list size) and document. The instruction from orchestrator: "the §10 oracle for the six batch-2 pages" — §10 literal: Tier-1 page ≥3 of its §2 hoods. For Pittsboro with 1 hood in pack... use min. Document in report.

  Where does the count-FAQ answer get woven? Add as 4th FAQ.

  Now write the edits. Also comment blocks above each edited entry. Cities without existing comment blocks (apex, garner, clayton, morrisville, wake-forest, pittsboro) need blocks added. Batch-3 cities too.

  Anti-template check between my new metas: 
  - Apex: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." 
  - Raleigh's: "Raleigh, NC roofing: 118 completed roofs across the city, ITB bungalows..." — "roofing: N completed roofs across" is 5-6 words shared; the 8-word clause rule: "completed roofs across town" + surrounding — "NC roofing: 36 completed roofs across town" — the digits differ so clauses differ. OK.

  Also distinct from Cary meta: "Cary, NC: 73 completed roofs across town, from Amberly to Twin Lakes. HOA shingle matching, Town of Cary permits. Free estimate." — Apex's would be "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills." Clause "completed roofs across town, from" is 6 words. OK under 8. Vary anyway: Apex "...across town, led by Abbington and Sunset Hills" vs Cary "from Amberly to Twin Lakes". Fine.

  Let me now also decide Wake Forest metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic core to new subdivisions, permits handled. Free estimate." Count ≈ 141. Good.

  Pittsboro meta: "Pittsboro, NC roofing: 13 completed roofs across the Chatham County area, including Fearrington Village. County permits handled. Free estimate." ~140.

  Garner meta (new): "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Heather Hills. Algae-resistant systems, permits handled. Free estimate." ~140.

  Clayton meta (new): "Clayton, NC roofing: 10 completed roofs in Johnston County, permitted right the first time. Storm and repair specialists. Free estimate." ~133.

  Morrisville meta: "Morrisville, NC roofing: 10 completed roofs across town, led by Kitts Creek and Breckenridge. Honest repair-or-replace answers. Free estimate." ~133.

  Now the FAQ distinctness check (8):
  1. Cary: "How many Cary roofs has Mabrey Roofing completed?"
  2. Durham: "How much roofing has Mabrey Roofing actually done in Durham?"
  3. Raleigh: "What is Mabrey Roofing's track record in Raleigh?"
  4. Apex: "Which Apex neighborhoods has Mabrey Roofing worked in the most?"
  5. Wake Forest: "What does Mabrey Roofing's completed work in Wake Forest look like?"
  6. Pittsboro: "Has Mabrey Roofing done real work in Pittsboro?"
  7. Garner: "Where around Garner has Mabrey Roofing completed roofs?"
  8. Clayton: "How established is Mabrey Roofing in Clayton?"
  9. Morrisville: "How deep does Mabrey Roofing's work run in Morrisville?"

  Wait — that's 9 questions total (8 Tier-1 cities = cary, durham, raleigh + batch2 six... actually Tier-1 count-led cities: Durham, Raleigh, Apex, Wake Forest, Pittsboro, Garner, Clayton, Morrisville = 8 + Cary = 9). The orchestrator said "8 total including Cary/Durham/Raleigh" — hmm. 3 done + 6 batch-2 = 9. But the WO says "The 8 count-FAQ questions: 8 distinct constructions" — WO counted 8 Tier-1 cities (durham, raleigh, apex, wake forest, pittsboro, garner, clayton, morrisville) + cary = 9. The user's prompt says "all count-FAQ questions side by side (8 total including Cary/Durham/Raleigh...)". Hmm, 8 including those 3 means 5 new? But batch 2 has 6 Tier-1 cities. User prompt says batch 2 = six cities with "unique count-FAQ constructions". So total would be 9. The "8 total" is likely the orchestrator's miscount (WO §4 says 8 cities → 8 constructions "and none may clone Cary's"). I'll present 9 side by side and note the count. Not a blocker.

  Now write the batch-2 edits. Six Edit operations on lib/cities.ts — but consecutive edits to the same file: "DO NOT issue consecutive Edit calls on the same file" without re-reading... Actually rule: multiple Edit calls in one response may not target the same file. I must do them sequentially, re-reading if needed. Since my edits are far apart and I have fresh reads, I can do one Edit per response, or use Write to rewrite whole file (102KB — allowed? "complete replacement" — Write for full replacement is allowed but 102KB output is heavy; better do sequential Edits). I'll do edits one per turn; that's 6+ turns for batch 2. Alternatively, since edits are in distinct regions and I have exact current content, consecutive edits risk invalidation only if strings overlap — they don't. But the instruction is strict: don't issue consecutive Edit calls on same file without re-reading. I'll do them one at a time (safe), it's fine.

  Actually — I can parallelize differently: Edit calls to DIFFERENT files can be parallel, but same file must be serial. So batch 2 = 6 serial edits + comment blocks. Let me combine comment block + entry edits per city into a single Edit each (the comment block insertion + field changes are in one contiguous region per city — I can do one Edit per city covering from comment-block insertion point... the regions are large though; Edit old_string must match exactly. For entries like morrisville/wake-forest where multiple non-contiguous fields change, one Edit requires the whole entry as old_string — large but doable. Simpler: multiple small Edits per city, serialized. That's ~20 edits serial — a lot of turns but safe. 

  Alternative: rewrite the entire CITIES file via Write? 102KB write is large but one shot. Risky for frozen entries (must stay byte-identical — I'd reproduce them exactly; any slip breaks byte-identity, though I'd verify with git diff). The safer mechanical approach: serial Edits. Let me be efficient: for each city, do 1-3 Edits.

  Plan per city:

  APEX:
  1. Edit: insert comment block before `  {\n    slug: "apex",` and rewrite answer (contiguous: the answer field follows slug... answer comes after slug? apex entry: slug, answer, name... order: slug, answer? Looking at line 352-353: slug: "apex", answer: "...". Yes. So old_string from `  {\n    slug: "apex",\n    answer: "..."` → new with comment block + new answer. One edit.
  2. Edit: neighborhoods array line.
  3. Edit: intro.
  4. Edit: FAQ1 answer (the Salem Street work-claim) + add count-FAQ — FAQ1 and FAQs contiguous: replace the faqs array section... FAQ1's `a` change + appending new FAQ after FAQ3: one Edit covering the faqs block.
  5. Edit: heroImage alt.
  6. Edit: add metaDescription after heroImage (apex has none).

  That's ~6 edits for apex alone; ×6 cities ≈ 30 serial edits. Heavy but reliable. Alternatively use a Python/node script via Bash to do the transformations? Edits must be exact; a script with replacements could do all in one go — but writing 100KB of heredoc replacements is error-prone too. Hmm.

  Better: use Write to rewrite whole file? No — 102KB, too much output.

  Actually, I can do larger single Edits per city: replace the ENTIRE entry object (from `  {` to `  },`) with the new version in one Edit per city. The old_string is large (up to ~4KB) but I have exact content from Reads. Morrisville entry is one-liner-ish fields (long lines). Apex entry ~40 lines. One Edit per city = 6 edits total for batch 2, plus they must be serial (same file). Acceptable: 6 turns.

  But note: comment blocks — include in the same edit (insert before the `{`).

  Also I haven't read burlington/sanford/wilson (frozen — don't touch) and don't need to.

  Let me get exact text of entries I'll fully replace. I have: apex (352-393), morrisville (395-421), wake-forest (423-449), garner (266-307), clayton (309-350), pittsboro (769-814). All read above. Good.

  Let me draft each full replacement entry carefully.

  ---

  **GARNER replacement:**

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * GARNER — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 11
     *   completed Garner roofs, one each in Southills, Hunter's Mark,
     *   Hillington West, Heather Hills, and Pleasant Woods. Only the city-level
     *   total (11) is printed in copy; spread-not-depth phrasing per WO §2.
     * Pre-existing texture (permit authority, lake-fed humidity thesis, the
     *   2022-2024 permit-volume figure) predates this lane and is retained
     *   generalized-or-hedged per the A6/v2.A escape hatch; this lane
     *   introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Creekside (0 book
     *   jobs, orchestrator pre-adjudicated) removed as a work-claim from the
     *   answer and intro, dropped from the neighborhoods array, and the
     *   heroImage alt de-attributed to "a Garner, NC home" per v2.D; Cleveland
     *   Bluffs, Lake Benson area, and White Oak corridor (0 each) also out of
     *   the array, which AMENDMENT v3 (array is a work-claim surface) rebuilds
     *   from the book list alone.
     * ------------------------------------------------------------------------- */
  ```

  Entry:
  ```
    {
      slug: "garner",
      answer: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills to Hunter's Mark and Heather Hills rather than stacked in any one neighborhood. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address.",
      name: "Garner",
      county: "Wake County",
      permitAuthority: "Town of Garner Inspections",
      permitNote: (unchanged)
      neighborhoods: ["Southills", "Hunter's Mark", "Heather Hills", "Pleasant Woods"],
      landmarks: (unchanged)
      lead: "lifecycle",
      intro: "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and shaded north slopes grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Mabrey Roofing treats Garner roofs for the conditions they actually live in, and the book here runs wide rather than deep: 11 completed roofs spread across town, from Southills to Hunter's Mark and Heather Hills, each handled with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing.",
      stormHook: (unchanged)
      housingStock: (unchanged)
      localConsiderations: (unchanged)
      localProjects: [],
      localReviews: [],
      faqs: [ (3 unchanged) + { q: "Where around Garner has Mabrey Roofing completed roofs?", a: "All over, in single servings: the count stands at 11 completed roofs across Garner, spread from Southills to Hunter's Mark and Heather Hills rather than concentrated in any one subdivision." } ],
      heroImage: { src: "/cities/garner.jpg", alt: "Algae-resistant shingle replacement on a Garner, NC home" },
      metaDescription: "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Heather Hills. Algae-resistant systems, permits handled. Free estimate.",
    },
  ```

  Check anti-template: intro repeats answer clause "an honest read on what cleaning can save versus what needs replacing" — that's WITHIN the same entry (the rule is across entries). Original intro already shared that with answer? Original: answer had "an honest read on what cleaning can save versus what needs replacing" and intro had the same phrase. Pre-existing duplication within entry — keep.

  "from Southills to Hunter's Mark and Heather Hills" appears in answer, intro, FAQ, meta (partially). Within-entry repetition is normal (Cary does it).

  Count chars for meta: "Garner, NC roofing: 11 completed roofs spread across town, from Southills to Heather Hills. Algae-resistant systems, permits handled. Free estimate." — roughly 148. I'll script-check all metas.

  **CLAYTON replacement:**

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * CLAYTON — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 10
     *   completed Clayton roofs; ZERO geocoded book neighborhoods, so this
     *   entry is count-led with no new neighborhood work-claims (WO §2).
     * Pre-existing texture (Johnston County permitting thesis, the biotech
     *   growth figures, storm-corridor framing) predates this lane and is
     *   retained generalized-or-hedged per the A6/v2.A escape hatch; this lane
     *   introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json, Clayton list
     *   empty): the intro and answer no longer bind our completed work to
     *   Flowers Plantation or Riverwood (0 book jobs each); both stay as
     *   housing/growth descriptors only, and the heroImage alt is de-attributed
     *   to "a Clayton, NC home" per v2.D. AMENDMENT v3 carve-out: the
     *   neighborhoods array stays AS-IS (pre-existing, predates this lane) —
     *   flagged in the build report as a known limitation.
     * ------------------------------------------------------------------------- */
  ```

  Entry: answer (rewrite as drafted), intro (rewrite), FAQs + count-FAQ, alt, add metaDescription.

  **APEX**: as drafted.

  **MORRISVILLE**: full entry rewrite with comment block.

  **WAKE FOREST**: comment block + answer, array, intro, FAQ1 rewrite, +count-FAQ, meta update. Alt KEEP (Heritage supported). Also housingStock: "Master-planned communities like Heritage, Traditions, and Holding Village added thousands of homes" — descriptor, keep. FAQ1 rewrite: q "Can you roof a home in the Wake Forest Historic District?" a: "Yes. Homes in the Historic District and along North Main can carry added preservation review, and we plan a roofline-matching approach rather than a stock tear-off, accounting for the district review before we schedule so the home keeps its character and the permit clears without surprises." — removes "We work the older homes around the old college... regularly". Keeps North Main as district descriptor. Good.

  Wake Forest count-FAQ answer: "The book shows 24 completed roofs across Wake Forest, anchored by the Heritage communities, with Olde Mill Stream behind them and further work in St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates."

  Wait "further work in" fine. Note full-hoods has "Heritage North at Heritage Wake Forest" (6) and "Heritage Wake Forest" (1) — "the Heritage communities" covers both. Good.

  **PITTSBORO**: comment block, answer rewrite, intro rewrite, array → ["Fearrington Village"], +count-FAQ, meta update. What about FAQ2 "Do you serve Chatham Park and Fearrington Village?" — keep (service-area). alt: "Metal and shingle roofing on homes near the courthouse circle in Pittsboro, NC" — asserts work on homes near courthouse circle (0-book "The Courthouse Circle historic core"). Hmm. "Metal and shingle roofing on homes near the courthouse circle" — work-claim alt bound to a 0-book area. But is the courthouse circle a "neighborhood"? It's the town's historic core. v2.D: alt asserting completed work in a 0-book hood gets de-attributed. "on homes near the courthouse circle in Pittsboro" — the claim is about roofing homes in Pittsboro generally, located near the circle. Pittsboro has 13 book roofs, so work in Pittsboro IS supported; the hood specificity is the issue. Batch-1 analog: Raleigh alt "on a North Hills home" kept (North Hills supported, 1). For Pittsboro: "the courthouse circle" area isn't in the book; only Fearrington is. De-attribute to be safe: "Metal and shingle roofing on homes in Pittsboro, NC". Hmm, but is that over-scrubbing? The WO says "Fearrington is the ONLY hood claim permitted" — the alt's courthouse-circle binding is a hood-ish claim. De-attribute. Add scrub row.

  Now — Pittsboro intro em-dashes: entry already uses them (permitNote, housingStock). I5: no em-dashes ADDED beyond existing house usage. Existing usage includes em-dashes in this entry, so modest use is consistent. I'll still minimize.

  Draft Pittsboro intro: "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Our book here is smaller and we say so plainly: 13 completed roofs across the Pittsboro area, including work at Fearrington Village. Mabrey Roofing works all three Pittsboros, on the county's paperwork."

  Answer: "Mabrey Roofing and Construction serves Pittsboro, NC, and the surrounding Chatham County countryside, with 13 completed roofs across the area, including work at Fearrington Village between Pittsboro and Chapel Hill. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, brand-new builder shingles in Chatham Park, and the older homes around the courthouse circle. Every inspection comes with photos you keep."

  "between Pittsboro and Chapel Hill" — pre-existing phrase in FAQ2 ("the Fearrington Village area between Pittsboro and Chapel Hill"). Safe.

  Count-FAQ Pittsboro: q "Has Mabrey Roofing done real work in Pittsboro?" a: "Yes: 13 completed roofs across Pittsboro and the surrounding Chatham County countryside, including work at Fearrington Village, on everything from farmhouse metal to new builder shingles."

  Hmm "on everything from farmhouse metal to new builder shingles" — capability. Fine.

  **MORRISVILLE** full draft:

  ```
    /* -------------------------------------------------------------------------
     * MORRISVILLE — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 10
     *   completed Morrisville roofs, led by Kitts Creek (3) and Breckenridge
     *   (3), with Carpenter Park (1), Village at Town Hall Commons (1),
     *   Downing Glen (1), and Addison Park (1). Only the city-level total (10)
     *   is printed in copy.
     * Pre-existing texture (RTP-boom growth figures, the 20-plus-year
     *   builder-roof thesis, EnerGov portal detail, RDU flight-path note)
     *   predates this lane and is retained generalized-or-hedged per the
     *   A6/v2.A escape hatch; this lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C/v2.E (wo/full-hoods.json): "Carpenter
     *   Village" is a CARY book neighborhood with ZERO Morrisville book jobs;
     *   all four existing Morrisville claims (answer, intro,
     *   localConsiderations, FAQ) are rebuilt on Kitts Creek (3) and
     *   Breckenridge (3), the real Morrisville leaders, and Carpenter Park is
     *   NOT substituted into the old sentences per v2.E. Shiloh Grove,
     *   Savannah, and McCrimmon at the Park (0 each) leave the neighborhoods
     *   array, which AMENDMENT v3 (array is a work-claim surface) rebuilds
     *   from the Morrisville book list alone.
     * ------------------------------------------------------------------------- */
  ```

  Entry:
  - answer: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs across town, led by Kitts Creek and Breckenridge. Morrisville filled up early during the Research Triangle Park boom, so the builder-grade roofs in those early-2000s communities are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts."

  Wait — "those early-2000s communities" refers to Kitts Creek and Breckenridge. Breckenridge early-2000s is supported by existing housingStock ("Breckenridge... built out in the early 2000s"). OK.

  - neighborhoods: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park"]
  - intro: as drafted.
  - localConsiderations: first bullet → "Many builder roofs across Kitts Creek and Breckenridge are now 20-plus years old and at end of life on a shared timeline."
  - FAQ1 a: "Often, yes. The builder-grade shingles used across Kitts Creek, Breckenridge, and similar early-2000s subdivisions commonly reach end of life around 20 years, sooner on sun-baked south-facing slopes. A free documented inspection tells you honestly whether you need a full replacement or just a targeted repair to buy more time."
  - count-FAQ: q "How deep does Mabrey Roofing's work run in Morrisville?" a: "The book counts 10 completed roofs across town, concentrated where Morrisville's oldest builder roofs live: Kitts Creek and Breckenridge lead, with single projects in Carpenter Park, Downing Glen, and Addison Park behind them."
  - metaDescription: "Morrisville, NC roofing: 10 completed roofs across town, led by Kitts Creek and Breckenridge. Honest repair-or-replace answers. Free estimate."

  **APEX** full draft:

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * APEX — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 36
     *   completed Apex roofs, led by Abbington (3) and Sunset Hills (2), with
     *   Hallmark West, The Park at West Lake, Sweetwater, Scotts Mill,
     *   Shepherd's Vineyard, and Haddon Hall (1 each) among the named areas.
     *   Only the city-level total (36) is printed in copy.
     * Pre-existing texture (permit authority, Salem Street historic-district
     *   review, the 85,000 growth figure, income/premium-shingle note)
     *   predates this lane and is retained generalized-or-hedged per the
     *   A6/v2.A escape hatch; this lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Salem Street (0
     *   book jobs, orchestrator pre-adjudicated) loses its work-claims in the
     *   answer and FAQ and stays as historic-district descriptor only;
     *   Villages of Apex (0) out of the answer and array; Scotts Mill (1) and
     *   Haddon Hall (1) are book-supported and stay. heroImage alt
     *   de-attributed to "an Apex, NC home" per v2.D. AMENDMENT v3 (array is a
     *   work-claim surface): the neighborhoods array is rebuilt from the Apex
     *   book list alone.
     * ------------------------------------------------------------------------- */
  ```

  - answer: "Mabrey Roofing is a roofing company serving Apex, NC, with 36 completed roofs across town, most of them in the planned communities: Abbington and Sunset Hills lead the book, with Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater behind them. Apex is two roofing towns in one: steep, complex 1800s rooflines around the Salem Street historic district, where the profile has to match, and straightforward architectural tear-offs in the newer Peakway-ring neighborhoods. We pull permits through Town of Apex Building Inspections and flag any added historic-district review before we schedule. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates."

  - neighborhoods: ["Abbington", "Sunset Hills", "Scotts Mill", "Haddon Hall", "Shepherd's Vineyard", "Sweetwater"]
  - intro: "Apex is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway. Mabrey Roofing handles both, and the book leans suburban: 36 completed roofs across town, most of them in the planned communities, from Abbington and Sunset Hills to Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater. A complex historic roofline where the profile has to match and a straightforward architectural tear-off ask for different skills, and we bring the right one to each."

  - FAQ1 a: "Yes. Older homes in and around the Salem Street historic district can carry added review and ask for a roofline-matching approach rather than a stock tear-off. We match the existing profile and plan for any district review before we schedule the work."
  - count-FAQ: q "Which Apex neighborhoods has Mabrey Roofing worked in the most?" a: "Abbington and Sunset Hills top the list, with Scotts Mill, Haddon Hall, Shepherd's Vineyard, and Sweetwater behind them, part of 36 completed roofs across Apex."
  - alt: "Historic roofline restoration on an Apex, NC home" — hmm original: "Historic roofline restoration on a Salem Street home in downtown Apex, NC". De-attribute: "Historic roofline restoration on an Apex, NC home".
  - metaDescription (new): "Apex, NC roofing: 36 completed roofs across town, led by Abbington and Sunset Hills. Historic-district fluency, permits handled. Free estimate."

  **WAKE FOREST** draft:

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * WAKE FOREST — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 24
     *   completed Wake Forest roofs, anchored by the Heritage communities
     *   (Heritage North at Heritage Wake Forest 6, Heritage Wake Forest 1),
     *   with Olde Mill Stream (4) and St. Ives, Austin Creek, Crenshaw Hall
     *   Plantation, and Wakefield Estates (1 each) among the named areas.
     *   Only the city-level total (24) is printed in copy.
     * Pre-existing texture (the 1834-1956 college history, 301 S. Brooks
     *   Street permit detail, oak-and-maple canopy thesis, Historic District
     *   review) predates this lane and is retained generalized-or-hedged per
     *   the A6/v2.A escape hatch; this lane introduces no new external
     *   specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): the old college
     *   and North Main work-claims (0 book jobs, orchestrator pre-adjudicated)
     *   convert to historic-core descriptors; Traditions and Holding Village
     *   (0 each) leave the answer and array, remaining as housing-age
     *   descriptors only. Heritage (7 combined) is book-supported, so the
     *   heroImage alt stays per v2.D. AMENDMENT v3 (array is a work-claim
     *   surface): the neighborhoods array is rebuilt from the Wake Forest
     *   book list alone.
     * ------------------------------------------------------------------------- */
  ```

  - answer: as drafted above.
  - neighborhoods: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"]
  - intro: as drafted.
  - FAQ1 rewrite as drafted.
  - count-FAQ: q "What does Mabrey Roofing's completed work in Wake Forest look like?" a: "The book shows 24 completed roofs across Wake Forest, anchored by the Heritage communities, with Olde Mill Stream behind them and further work in St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates."
  - metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic core to new subdivisions, permits handled. Free estimate."
  - alt: unchanged.

  Also Wake Forest localConsiderations bullet 3: "Master-planned communities like Heritage and Traditions are hitting first-replacement age on builder-grade architectural shingles at the same time." — descriptor, keep.

  Double-check anti-template: "anchored by" used in wake forest answer/meta/intro/FAQ — within entry fine.

  Concern: Wake Forest intro says "That newer half is where our book lives: 24 completed roofs across Wake Forest, anchored by Heritage and running through Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates." Good.

  Now also verify each new sentence doesn't clone another city's (8+ words). "We pull the permit for your address and schedule the required inspection" — appears in Cary FAQ and garner answer variants... Garner answer: "We pull the permit through the Town of Garner Inspections department, coordinate with Wake County..." — distinct. OK.

  Doorway-check compares page content pairwise <40% — pages share chrome but content differs; batch 1 passed at 28.4%.

  One more thing — "answer" must keep .seo-answer single-paragraph shape: all answers are single strings. Good.

  Also should I worry that adding count to intro+answer+FAQ+meta duplicates the count string multiple times — fine, Cary/Durham/Raleigh do it.

  Now, the gates. Then oracle script: I'll write a node script (wo/ dir? scripts? — "NEVER edit anything outside lib/cities.ts + your report" — scripts must be temp files. Batch 1 presumably scripted the oracle; where did they put it? They likely used a temp script. I can put a throwaway script in wo/ then delete, or better use /tmp. Actually creating a new file in wo/ then deleting it leaves no diff. Or run node -e inline. I'll write a script to a temp path outside the repo? "never access files outside working directory" — I can create in wo/ and delete after (git diff --stat vs f475d19 must show ONLY lib/cities.ts + report; untracked wo/ files: WO + full-hoods.json already untracked; my temp script untracked then deleted). Actually report file itself will be in wo/. The scope assertion: `git diff --stat f475d19` shows tracked modifications only — lib/cities.ts (report is untracked). Fine; batch-1 report said "(+ this report, untracked wo/ WO inputs aside)".

  Oracle mechanics: FAQ count — count <details> or FAQ items on rendered page? How does the page render faqs? Let me check how batch 1 counted FAQs — probably counting q strings or a component. I'll check components/location for FAQ rendering quickly when writing the oracle. Simpler: count occurrences of question-mark-endings? Better: fetch page HTML and count the FAQ JSON-LD or the number of <h3> in faq section. Let me look at the location page component when I get there. Alternatively count distinct rendered faq question strings: I know each city's faq q's; assert each expected q present and count of a marker. I'll inspect the page HTML once server is up and pick a reliable marker.

  Gate chain: typecheck, build, kill :3221 by port, start server, prove build manifest, spam-410-guard, doorway-check, reachability-check.

  Kill by port on Git Bash Windows: `netstat -ano | grep :3221` find PID, `taskkill //PID <pid> //F`. Batch-1 did it (PID 9656 etc.).

  Start server: `npm run start -- -p 3221`? Check package.json scripts. Let me check package.json for start script and gate scripts.

  Let me now start executing. First todo list, then package.json check, then the six edits (serial).

    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "doorway-check": "node scripts/doorway-check.mjs",
    "reachability-check": "node scripts/reachability-check.mjs",
    "spam-410-guard": "node scripts/spam-410-guard.mjs"
• Now the batch-2 edits. I'll do them one city per Edit, serially (same file). Start with Garner (lines 265-307). I'll replace from the line before `  {` (insert comment block) through the closing `  },`.

  Let me construct the Garner edit. Old string: from `  {\n    slug: "garner",` through the end `  },\n  {\n    slug: "clayton",` — better to anchor just the garner object: old_string starts at `  {\n    slug: "garner",` and ends at `  },` before clayton. The `},` is ambiguous; include trailing context `  },\n  {\n    slug: "clayton",` to be unique. Actually I'm replacing garner fully and will then replace clayton fully — do Garner edit ending before `  {\n    slug: "clayton"`.

  Let me write the exact old_string from the read (lines 265-307). I must reproduce exactly, including line breaks. Garner entry uses multi-line format. Fields: slug, answer (line 267 long), name, county, permitAuthority, permitNote (multi-line), neighborhoods, landmarks, lead, intro (multi-line), stormHook (multi-line), housingStock (multi-line), localConsiderations, localProjects, localReviews, faqs (multi-line), heroImage.

  I'll write the full replacement. For unchanged fields, copy verbatim.

• Now Garner's faqs (add count-FAQ), heroImage alt, and add metaDescription. These are contiguous at the end of the entry:Now Clayton (full entry, one edit — it's contiguous lines 309-350, now shifted). Replace whole entry including adding comment block before it.

• Wait — Clayton answer: "The housing skews young: ... filled subdivisions like Flowers Plantation with builder-grade roofs, and most of these younger roofs need a targeted repair, not a full replacement, and we say so." — double "and" awkward. Also "we say so" appears twice. Let me fix the ending: "...with builder-grade roofs. Most of these younger roofs need a targeted repair, not a full replacement, and we say so." Fix via small edit.Now Apex — full entry replacement (lines 352-393 originally). Include comment block, answer, array, intro, FAQ1 rewrite, count-FAQ, alt, metaDescription.

• The apex entry may differ slightly from what I captured (I read it across two Read calls; maybe formatting differs). Let me re-read the apex entry region.

• Something unexpected: the Apex and Morrisville entries are ALREADY rewritten — count-led, scrubbed, with comment blocks, count-FAQs, metas. The file has 1168 lines now (was 1075). It appears a concurrent process (or another agent instance?) has already done Apex and Morrisville — and presumably Wake Forest and Pittsboro too. Wait — did I do this? No. My edits were only Garner and Clayton. The file grew from 1075 to 1168 lines. My garner/clayton edits added ~50 lines total. The Apex/Morrisville rewrites with comment blocks were NOT done by me.

  Possibility: another agent/builder is working in this same worktree concurrently. Or... the file was already in this state and my earlier reads were stale? No — my earlier reads at lines 352-421 clearly showed the OLD apex/morrisville content without comment blocks, and wc said 1075 lines. Now it's 1168 lines with new content. So a concurrent writer modified the file between my reads and now.

  Also check: is wake-forest rewritten too? And pittsboro? Let me check git diff status and look at the rest. Also verify my Garner/Clayton edits are still intact.

  This is a significant situation: possible concurrent builder. The WO says ONE builder (me). Let me assess the current state of the whole file before doing anything. Check git diff --stat, and view wake-forest and pittsboro entries.

  Also the Morrisville comment mentions "v2.E MORRISVILLE TRAP" handling exactly per spec — and FAQ "How much of Mabrey Roofing's work is in Morrisville?" — a distinct construction. This looks like competent WO-compliant work, not vandalism. Maybe the orchestrator launched a parallel builder? Or maybe this is a hook/test? Regardless, I should verify everything against the WO and not duplicate work. My role: ensure batch 2 is correct and complete, run gates, commit, report.

  Let me inspect: git status, the wake-forest entry, pittsboro entry, and re-verify garner/clayton.

 M lib/cities.ts
?? wo/WO_SEO_LANE_W_CITY_SWEEP.md
?? wo/full-hoods.json
b87be3c seo-lane-w batch 1 fix: raleigh/durham directional corrections
6594fe0 seo-lane-w batch 1 fix: array work-claim rule (v3)
278bfdd seo-lane-w batch 1: durham + raleigh
2026-08-20 12:20:57.598473500 -0400 lib/cities.ts
• Working tree only (no new commit). The file mtime is 12:20:57 -0400 = 16:20 UTC. Session start was 16:05 UTC. So the file was modified at 16:20 UTC — during my session, by a concurrent process. My edits: I made Garner edit, Clayton edit, Clayton fix — those were mine. The Apex/Morrisville rewrites... could they have been done by a concurrent agent? Or... did I misattribute? No, I only made 3 edits.

  Hmm, actually wait — is it possible the user (or orchestrator) has another builder running in this worktree simultaneously, both doing batch 2? That would be a collision. Let me check the whole current state: which entries are rewritten (wake-forest? pittsboro?). Let me look at wake-forest and pittsboro now.So current state: Wake Forest, Holly Springs, Wendell are still ORIGINAL (not yet rewritten). Apex and Morrisville got rewritten by someone else. Did my Garner/Clayton edits survive? The grep earlier showed apex at 417, morrisville 487, wake-forest 516. My garner/clayton edits should be earlier in file. Let me verify garner/clayton state and pittsboro.

  So a concurrent process is doing batch-2 entries: it did Apex + Morrisville (with comment blocks), maybe working its way through. Wait, actually — did it? Or did *I* get confused? No: my three edits were Garner (comment+answer+array+intro), Garner (faqs+alt+meta), Clayton (full entry), Clayton (fix). I never touched Apex/Morrisville.

  Hmm, but wait — is it possible that the "concurrent process" is actually... me in a parallel session? The user may have launched multiple builders by accident, or the orchestrator did. Either way, the right move: don't clobber. Check which of the 6 batch-2 entries remain un-edited: wake-forest (original), pittsboro (need to check), garner (mine), clayton (mine), apex (theirs), morrisville (theirs).

  Options: (a) adopt their Apex/Morrisville work if it's WO-compliant, and complete Wake Forest + Pittsboro myself; (b) overwrite theirs with mine. Overwriting risks losing judge-considered work and creating churn; also their work looks compliant at first glance. But I must VERIFY theirs against the WO since I'm responsible for the batch.

  Review of their Apex entry:
  - answer: "36 completed roofs across town, concentrated in the planned communities: Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, and The Park at West Lake." — 6 hoods named (WO: name 4-6 ✓). All book-supported ✓. Count town-wide ✓.
  - intro: "Apex wears its history on Salem Street, but our book here lives in the planned communities: 36 completed roofs across town, from Abbington and Sunset Hills to Scotts Mill, Haddon Hall, and Shepherd's Vineyard." — v2.F Apex spine: heritage town (Salem Street descriptors stay) with 36-deep book in planned communities ✓. Salem Street work-claims scrubbed: FAQ1 now "The older homes around the Salem Street historic district carry steep, complex rooflines..." — descriptor ✓. alt de-attributed to "an Apex, NC home" ✓. Array all book-supported ✓ (Abbington 3, Sunset Hills 2, Scotts Mill 1, Haddon Hall 1, Shepherd's Vineyard 1, The Park at West Lake 1). Count-FAQ: "How many Apex homes has Mabrey Roofing re-roofed?" — distinct construction ✓. metaDescription 36 with count ✓. No comment block above Apex?? Wait — looking at the read, line 415/416: `  },` then `  {` at 416 with slug apex at 417 — no comment block above Apex! The Morrisville block exists (464-485) but Apex has none. WO §3.5 requires source-comment block above each edited entry. That's a gap I'd need to add.

  Their Morrisville entry:
  - answer: "10 completed roofs in town, led by Kitts Creek and Breckenridge... builder-grade roofs in those communities are now 20-plus years old" ✓ v2.E rebuild on Kitts Creek/Breckenridge ✓, no Carpenter Village, no Carpenter Park substitution ✓.
  - array: Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park — all book-supported ✓.
  - intro: "10 completed roofs in a town this size, led by Kitts Creek and Breckenridge, where builder-grade roofs went on in the late 1990s and early 2000s and are now 20-plus years old" — hmm "in a town this size"... fine. Wait: "10 completed roofs in a town this size" — the "compact-town register" per v2.F ✓.
  - localConsiderations rebuilt on Kitts Creek/Breckenridge ✓.
  - FAQ1 rebuilt ✓.
  - count-FAQ: "How much of Mabrey Roofing's work is in Morrisville?" — distinct ✓.
  - metaDescription with count ✓ (10 completed roofs in town...). ≤155? "Morrisville, NC roofing: 10 completed roofs in town, led by Kitts Creek and Breckenridge. HOA help, permits handled. Free documented inspection." = let me count later.
  - alt: "on a Breckenridge home in Morrisville, NC" — Breckenridge book-supported (3) → KEEP ok ✓.
  - Comment block present ✓ (lines 464-485).

  But — who wrote this? The comment says "updated WO_SEO_LANE_W (2026-08-20), batch 2". It's on-spec work. Given the situation (concurrent editor), the pragmatic path: verify their work in the gates/oracle like everything else, add the missing Apex comment block, and finish Wake Forest + Pittsboro myself. But there's a collision risk: if the other process is still running, it might also rewrite Wake Forest/Pittsboro while I do, or overwrite my Garner/Clayton.

  Hmm wait. Actually, let me reconsider: could the Apex/Morrisville rewrites have been present BEFORE my first read? My first full read showed old Apex (Villages of Apex claims) at lines 352-393 and old Morrisville at 395-421, with file at 1075 lines. So no — they were written after. The mtime 12:20:57 -0400. Current time? Session started 16:05Z = 12:05 -0400. So ~15 min into the session. My reads happened in the first few minutes. So the other writer wrote after my reads but before... my Garner edit succeeded on old content; Clayton too. So the other writer was active around the same time and didn't touch Garner/Clayton.

  Risk assessment: if the concurrent builder continues, we may collide on Wake Forest/Pittsboro. I cannot AskUserQuestion (auto mode). Options: proceed fast and verify; or check for other running processes (can't easily identify another agent). 

  Practical approach: check file state again right before each edit; if the other agent completes wake-forest/pittsboro with compliant work, adopt+verify instead of duplicating. I'll write my Wake Forest edit now and if the file has changed, re-evaluate.

  Also, note: this could be the SAME user running two CLI sessions on the same worktree. I'll note it in the report. Proceed.

  Also check pittsboro current state.

266:   * GARNER — updated WO_SEO_LANE_W (2026-08-20), batch 2.
333:   * CLAYTON — updated WO_SEO_LANE_W (2026-08-20), batch 2.
398:   * APEX — updated WO_SEO_LANE_W (2026-08-20), batch 2.
465:   * MORRISVILLE — updated WO_SEO_LANE_W (2026-08-20), batch 2.
862:    slug: "pittsboro",
• Wait — there IS an APEX comment block at line 398. My earlier read started at line 416 (the `{`), so the block sits at 398-415. Good — Apex has a comment block. Let me read lines 395-417 to see it.

  So current batch-2 state: Garner ✓ (mine), Clayton ✓ (mine), Apex ✓ (concurrent), Morrisville ✓ (concurrent), Wake Forest ✗ original, Pittsboro — need to check (line 862, likely original). Let me read the Apex comment block and the Pittsboro entry.

• Good. So batch-2 remaining for me: Wake Forest and Pittsboro. The concurrent writer did Apex + Morrisville well. Note: Morrisville's answer says "with 10 completed roofs in town" and intro "10 completed roofs in a town this size" — count appears. Their Morrisville FAQ "How much of Mabrey Roofing's work is in Morrisville?" — distinct.

  Check their Morrisville comment says "Carpenter Park (1), Downing Glen (1), and Addison Park (1)" — omits Village at Town Hall Commons from comment but array doesn't include it either; fine (name 2-4, they named 5 in array — WO says name 2-4 in copy; array 4-6 ok).

  One concern in their Morrisville intro: "10 completed roofs in a town this size, led by Kitts Creek and Breckenridge, where builder-grade roofs went on in the late 1990s and early 2000s" — "where" binds the timing claim to the two hoods; Breckenridge early-2000s is supported by existing housingStock. Kitts Creek timing — Kitts Creek is a real Morrisville community built ~2000s. It's plausible and consistent with the town-wide thesis. Acceptable.

  Their Apex meta: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Sunset Hills. Historic-district fluency, permits handled. Free estimate." — hmm, "from Abbington to Sunset Hills" vs my planned "led by" — fine. Count chars: roughly 133. OK.

  Apex count-FAQ: "How many Apex homes has Mabrey Roofing re-roofed?" — distinct from Cary's "How many Cary roofs has Mabrey Roofing completed?" — starts the same "How many ... has Mabrey Roofing" — is that "cloning Cary's"? Construction: "How many [CITY] homes has Mabrey Roofing re-roofed?" vs "How many [CITY] roofs has Mabrey Roofing completed?" — very close skeleton. Hmm. The requirement: "unique count-FAQ constructions (distinct from each other AND from Cary's)". "How many Apex homes has Mabrey Roofing re-roofed?" vs Cary's "How many Cary roofs has Mabrey Roofing completed?" — differs only in homes/roofs and re-roofed/completed. That's arguably a clone. Risky for the anti-template law (8+ word clause: "has Mabrey Roofing" + "How many" — the clause "How many X ... has Mabrey Roofing ..." shares maybe 6 words). The judge might flag it. Since I'm responsible for the batch and will run distinctness proof in the report, I should change Apex's FAQ to a more distinct construction, e.g. "Which Apex neighborhoods has Mabrey Roofing worked in the most?" That's clearly distinct. I'll edit that FAQ q/a — but wait, the concurrent writer might still be active and could conflict. The change is small; do it.

  Actually, careful: is my judgment right that it's too close? "8 cities means 8 different constructions, and none may clone Cary's". "How many Apex homes has Mabrey Roofing re-roofed?" — subject/predicate structure identical to Cary's: "How many [City] [noun] has Mabrey Roofing [verb-past-participle]?" I'd call that a clone. Change it. Also Durham's "How much roofing has Mabrey Roofing actually done in Durham?" is a different construction (How much...). My planned Apex question "Which Apex neighborhoods has Mabrey Roofing worked in the most?" is distinct. Use that, with their answer style.

  Now Pittsboro: still original — I'll rewrite it. Wake Forest: original — I'll rewrite.

  Pittsboro plan (per earlier draft). Note existing entry uses em-dashes (permitNote, housingStock, FAQ, meta) — house usage includes them in this entry, so keeping existing ones is fine; I'll avoid adding new ones.

  Also the answer mentions "established 2000s subdivisions like Chatham Forest" — housing descriptor, and "new construction filling in at Chatham Park and Powell Place" — descriptor framing in a "serves ... from X to Y" service-area construction. WO: "Fearrington is the ONLY hood claim permitted" — hood claim = work claim. I'll keep Chatham Park/Powell Place/Chatham Forest as pure descriptors where pre-existing, and bind work only to Fearrington + count.

  But v3 array: only book-supported → ["Fearrington Village"]. Hmm, currently array has "Fearrington Village (nearby)" with the "(nearby)" qualifier. Book lists it as pittsboro hood (2 jobs). Keep entry name "Fearrington Village".

  Array shrink to 1 item — is that acceptable? v3: "arrays may shrink to 3-4 items — an honest short array beats a padded one" (Tier-2 context). For Pittsboro, honest = 1. Clayton has the explicit carve-out; Pittsboro doesn't, so the rule applies strictly. 1-item array it is. Flag in report.

  Count-FAQ Pittsboro: "Has Mabrey Roofing done real work in Pittsboro?" — distinct ✓.

  metaDescription: "Pittsboro, NC roofing: 13 completed roofs across the Chatham County area, including Fearrington Village. County permits handled. Free estimate." Count: let me count: "Pittsboro, NC roofing: 13 completed roofs across the Chatham County area, including Fearrington Village. County permits handled. Free estimate." ≈ 139 chars. ✓ I7 town-wide binding: "across the Chatham County area, including Fearrington Village" — town-wide ✓.

  Wake Forest plan (from my earlier draft). Existing entry uses no em-dashes I think — scan: none visible. Avoid adding.

  Answer (rewrite): "Mabrey Roofing is a Wake Forest roofing contractor with 24 completed roofs across town, anchored by the Heritage communities and running through Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. The work splits by era: pre-war homes around the Historic District ask for profile-matching and preservation-review planning, while the master-planned streets carry first-replacement architectural shingles. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster."

  Intro (rewrite): "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary. What remained is a deep historic core, the streets around the old college and the homes along North Main, ringed now by some of the fastest new growth in the Triangle. That newer half is where our book lives: 24 completed roofs across Wake Forest, anchored by Heritage and running through Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates. We still bring both skill sets, the careful profile match a pre-war home under heavy oaks asks for and the clean builder-grade tear-off, to whichever address calls."

  Hmm — "the streets around the old college and the homes along North Main" — descriptor of the historic core (geography), retained from original intro. That's descriptor, fine per v2.C (descriptors stay).

  FAQ1: q same; a: "Yes. Homes in the Historic District and along North Main can carry added preservation review, so we plan a roofline-matching approach rather than a stock tear-off and account for the district review before we schedule, so the home keeps its character and the permit clears without surprises."

  Count-FAQ: q "What does Mabrey Roofing's completed work in Wake Forest look like?" a: "The book shows 24 completed roofs across Wake Forest, anchored by the Heritage communities, with Olde Mill Stream behind them and further work in St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates."

  Array: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"].

  metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town, anchored by Heritage. Historic core to new subdivisions, permits handled. Free estimate."

  Now write Wake Forest edit. Given the concurrent writer, do it now. One Edit for whole wake-forest entry.

• Now Pittsboro. Full entry replacement.

• Now fix the Apex count-FAQ to a more distinct construction (the concurrent writer's "How many Apex homes has Mabrey Roofing re-roofed?" is too close to Cary's "How many Cary roofs has Mabrey Roofing completed?"). Re-read the Apex FAQ to edit precisely (I have it from the earlier read: lines 453-456).

• Now verify the frozen entries untouched and run typecheck. First quick sanity: git diff scope, metaDescription lengths, and check no per-hood digit counts in new copy. Let me run typecheck + a quick script for meta lengths and distinctness.

> mabrey-roofing@1.0.0 typecheck
> tsc --noEmit

151 Raleigh, NC roofing: 118 completed roofs across the city, IT
128 Cary, NC: 73 completed roofs across town, from Amberly to Tw
148 Garner, NC roofing: 11 completed roofs spread across town, f
136 Clayton, NC roofing: 10 completed roofs in Johnston County, 
140 Apex, NC roofing: 36 completed roofs across town, from Abbin
144 Morrisville, NC roofing: 10 completed roofs in town, led by 
145 Wake Forest, NC roofing: 24 completed roofs across town, anc
145 Holly Springs, NC roofing built for the Triangle's synchroni
146 Wendell, NC roofing contractor for the east Wake County edge
151 Roof repair and replacement in Fuquay-Varina, NC. Mabrey Roo
151 Zebulon, NC roofing contractor built for open-farmland wind.
155 Rolesville, NC roofing for young roofs. Mabrey Roofing docum
140 Durham, NC roofing from the hometown crew: 190 completed roo
154 Chapel Hill, NC roofing under the canopy. Historic-district 
158 Hillsborough, NC roofing for the historic downtown and the n
143 Pittsboro, NC roofing: 13 completed roofs across the Chatham
143 Burlington, NC roofing in Alamance County. 26 completed roof
140 Sanford, NC roofing in Lee County. Carolina Lakes to the 189
146 Wilson, NC roofing in Wilson County. Old Wilson Historic Dis
• Typecheck passes. Meta lengths: all ≤155 except Hillsborough 158 — but Hillsborough is pre-existing (batch 3 will touch it? Hillsborough is Tier-2 batch 3; I7 says metaDescriptions ≤155 — the existing 158-char one... I7 governs the lane's edits. For Tier-2 we don't add count to meta; do we need to fix the 158? I7 says metaDescriptions ≤155 — since we're editing the Hillsborough entry in batch 3, we should bring it ≤155. Trim it then.

  All six batch-2 metas have counts and are ≤155 ✓.

  Now build. Then server + gates. Build takes a while — run in background? Build ~1-3 min; run foreground with timeout 300.



ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

no listener on :3221
ZA9SQjwdyK27hiYi2aIy3
buildManifest 200 (BUILD_ID=ZA9SQjwdyK27hiYi2aIy3)
  RECORD  /online-casinos-curacao-2026// (multi-slash — record actual)  -> 308  Location: /online-casinos-curacao-2026/

  ORACLE MATRIX: all gated rows PASS

SPAM-410 GUARD: PASS
EXIT:0
  19%  gl:sub-fascia <> gl:storm-chaser
  19%  gl:sub-fascia <> gl:shingle-exposure
  19%  gl:ridge-cap-shingles <> gl:shingle-exposure
  19%  blog:why-we-always-do-a-full-tear-off <> blog:spotting-a-storm-chaser
  18%  blog:why-we-always-do-a-full-tear-off <> blog:roof-questions-homeowners-ask-most
  18%  blog:what-we-see-after-a-triangle-hailstorm <> blog:why-we-always-do-a-full-tear-off
  18%  blog:fall-roof-maintenance-checklist <> blog:why-we-always-do-a-full-tear-off
Max pairwise similarity: 27.7%  (city:knightdale <> city:holly-springs)
Similarity gate (< 40%): PASS
Delete-the-city-name (>= 4 local signals each): PASS

ANTI-DOORWAY GATE: PASS
EXIT:0
Targets (sitemap routes): 168  ·  reached <=2 hops: 168
(65 reachable in 1 hop — home/header/footer; rest via hub-down)

REACHABILITY GATE: PASS
EXIT:0
• All three gates PASS. Now the §10 oracle for the six batch-2 pages + cary-nc + burlington-nc controls + durham/raleigh regression. I need to know how FAQs render to count them. Let me write an oracle script. First check how FAQ renders — fetch one page and inspect.

  Oracle assertions per Tier-1 page:
  - 200
  - exact total string present ("36 completed roofs" etc.)
  - ≥3 §2 hoods present (Pittsboro: ≥1 Fearrington; Clayton: 0 hoods — N/A)
  - metaDescription rendered with count (check <meta name="description">)
  - FAQ count grew by exactly 1 (baseline 3 → 4; need rendered FAQ count)

  For controls: cary "73 completed roofs", burlington "26" phrasing. Durham "190 completed roofs", Raleigh "118 completed roofs".

  FAQ counting: check page HTML for FAQ markup. Let me peek at the location page component.

      1 faq"
      3 faq\"
      1 faqs\"
1

• FaqAccordion renders faqs; the stat "N most common questions" is rendered — a reliable FAQ count marker: `${faqs.length} most common questions`. Also FAQPage JSON-LD likely exists (faqNode). The page may have multiple FAQ sections? Location pages presumably one FaqSection from city.faqs. The marker "N most common questions" gives the count directly.

  Now write the oracle script. Batch-2 oracle:
  - Tier-1 pages: apex-nc, wake-forest-nc, pittsboro-nc, garner-nc, clayton-nc, morrisville-nc.
    - 200
    - exact total: apex "36 completed roofs", wake-forest "24 completed roofs", pittsboro "13 completed roofs", garner "11 completed roofs", clayton "10 completed roofs", morrisville "10 completed roofs"
    - hoods ≥3 (from §2 pack): apex [Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, Sweetwater, Hallmark West, The Park at West Lake]; wake-forest [Heritage, Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, Wakefield Estates]; pittsboro [Fearrington Village] (assert ≥1 = min(3,1)); garner [Southills, Hunter's Mark, Hillington West, Heather Hills, Pleasant Woods]; clayton [] — skip; morrisville [Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park].
    - metaDescription with count: check meta name="description" contains the total.
    - FAQ count == 4 (was 3 → +1).
  - controls: cary-nc "73 completed roofs", burlington-nc "26 completed roofs".
  - regression: durham-nc "190 completed roofs", raleigh-nc "118 completed roofs".
  - forbidden greps: Tier-1 per-hood digit counts adjacent to hood names; scrub checks: "Creekside" absent from garner-nc; "Carpenter Village" absent from morrisville-nc; "Salem Street" — should only appear as descriptor... Salem Street stays as descriptor (landmark + housingStock + localConsiderations) so it WILL appear — assert no "we work on the older Salem Street" claim. Instead assert old claim strings gone: "We work on the older Salem Street" 0 hits; "Villages of Apex" 0 hits on apex-nc; "from Creekside" 0 hits garner; "Carpenter Village" 0 hits morrisville; "Traditions" — wait, Traditions stays as housing descriptor in wake-forest housingStock/localConsiderations, so it appears — fine, assert array work-claim gone? Array check: "Traditions" present but as descriptor only; can't mechanically distinguish. Skip.

  Write oracle script to a temp file in wo/ then delete, or keep? Batch-1 report doesn't reference a kept script. I'll write to wo/.oracle-batch2.mjs, run, then delete at the end (or keep for batch 3 reuse — I'll reuse for batch 3 then delete).

  Note "the -nc scheme": /locations/<slug>-nc.

  FAQ count marker: "4 most common questions" in HTML.

  Let me write the script.

PASS  apex-nc: HTTP 200
PASS  apex-nc: exact total "36 completed roofs" present
PASS  apex-nc: hoods present 5/6 (need >=3) [Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard]
PASS  apex-nc: metaDescription has count + <=155 (140 chars)
PASS  apex-nc: FAQ count = 4 (grew by exactly 1)
PASS  wake-forest-nc: HTTP 200
PASS  wake-forest-nc: exact total "24 completed roofs" present
PASS  wake-forest-nc: hoods present 6/6 (need >=3) [Heritage, Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, Wakefield Estates]
PASS  wake-forest-nc: metaDescription has count + <=155 (145 chars)
PASS  wake-forest-nc: FAQ count = 4 (grew by exactly 1)
PASS  pittsboro-nc: HTTP 200
PASS  pittsboro-nc: exact total "13 completed roofs" present
PASS  pittsboro-nc: hoods present 1/1 (need >=1) [Fearrington Village]
PASS  pittsboro-nc: metaDescription has count + <=155 (143 chars)
PASS  pittsboro-nc: FAQ count = 4 (grew by exactly 1)
PASS  garner-nc: HTTP 200
PASS  garner-nc: exact total "11 completed roofs" present
PASS  garner-nc: hoods present 4/4 (need >=3) [Southills, Hunter's Mark, Heather Hills, Pleasant Woods]
PASS  garner-nc: metaDescription has count + <=155 (148 chars)
PASS  garner-nc: FAQ count = 4 (grew by exactly 1)
PASS  clayton-nc: HTTP 200
PASS  clayton-nc: exact total "10 completed roofs" present
PASS  clayton-nc: hoods present 0/0 (need >=0) []
PASS  clayton-nc: metaDescription has count + <=155 (136 chars)
PASS  clayton-nc: FAQ count = 4 (grew by exactly 1)
PASS  morrisville-nc: HTTP 200
PASS  morrisville-nc: exact total "10 completed roofs" present
PASS  morrisville-nc: hoods present 5/5 (need >=3) [Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park]
PASS  morrisville-nc: metaDescription has count + <=155 (144 chars)
PASS  morrisville-nc: FAQ count = 4 (grew by exactly 1)
PASS  cary-nc: HTTP 200
PASS  cary-nc (control/regression): "73 completed roofs" present
PASS  burlington-nc: HTTP 200
PASS  burlington-nc (control/regression): "26 completed roofs" present
PASS  durham-nc: HTTP 200
PASS  durham-nc (control/regression): "190 completed roofs" present
PASS  raleigh-nc: HTTP 200
PASS  raleigh-nc (control/regression): "118 completed roofs" present
PASS  apex-nc: no per-hood count for "Abbington"
PASS  apex-nc: no per-hood count for "Sunset Hills"
PASS  apex-nc: no per-hood count for "Scotts Mill"
PASS  apex-nc: no per-hood count for "Haddon Hall"
PASS  apex-nc: no per-hood count for "Shepherd's Vineyard"
PASS  apex-nc: no per-hood count for "Sweetwater"
PASS  wake-forest-nc: no per-hood count for "Heritage"
PASS  wake-forest-nc: no per-hood count for "Olde Mill Stream"
PASS  wake-forest-nc: no per-hood count for "St. Ives"
PASS  wake-forest-nc: no per-hood count for "Austin Creek"
PASS  wake-forest-nc: no per-hood count for "Crenshaw Hall Plantation"
PASS  wake-forest-nc: no per-hood count for "Wakefield Estates"
PASS  pittsboro-nc: no per-hood count for "Fearrington Village"
PASS  garner-nc: no per-hood count for "Southills"
PASS  garner-nc: no per-hood count for "Hunter's Mark"
PASS  garner-nc: no per-hood count for "Heather Hills"
PASS  garner-nc: no per-hood count for "Pleasant Woods"
PASS  garner-nc: no per-hood count for "Hillington West"
PASS  morrisville-nc: no per-hood count for "Kitts Creek"
PASS  morrisville-nc: no per-hood count for "Breckenridge"
PASS  morrisville-nc: no per-hood count for "Carpenter Park"
PASS  morrisville-nc: no per-hood count for "Downing Glen"
PASS  morrisville-nc: no per-hood count for "Addison Park"
PASS  garner-nc: scrubbed string absent: "Creekside"
PASS  morrisville-nc: scrubbed string absent: "Carpenter Village"
PASS  apex-nc: scrubbed string absent: "Villages of Apex"
PASS  apex-nc: scrubbed string absent: "We work on the older Salem Street"
PASS  wake-forest-nc: scrubbed string absent: "We work the older homes around the old college"

ORACLE: ALL PASS
• All 66 assertions pass. Wait — apex hoods: 5/6, Sweetwater missing? It says [Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard] — Sweetwater absent from rendered page. Their Apex copy mentions Sweetwater in answer? Their answer lists "Abbington, Sunset Hills, Scotts Mill, Haddon Hall, Shepherd's Vineyard, and The Park at West Lake" — no Sweetwater. Intro also doesn't. Fine — ≥3 met. (The Park at West Lake wasn't in my oracle hood list, whatever.)

  Hmm, wait: their answer names 6 hoods but not Sweetwater; their comment block mentions Sweetwater (1). Fine.

  Now v2.G scope assertions: git diff --stat vs f475d19 and frozen entries diff. Also forbidden greps done. Run scope checks.

 lib/cities.ts                 | 279 +++++++++++++++++++++++++++++++++++-------
 wo/BUILD_REPORT_SEO_LANE_W.md | 182 +++++++++++++++++++++++++++
 2 files changed, 417 insertions(+), 44 deletions(-)
---
---
cary CHANGED
chapel-hill CHANGED
burlington CHANGED
sanford CHANGED
wilson CHANGED
rolesville CHANGED
durham changed
raleigh changed
knightdale changed
holly-springs changed
wendell changed
fuquay-varina changed
zebulon changed
hillsborough changed
• Two issues with my check script:

  1. `git diff --stat f475d19` shows `wo/BUILD_REPORT_SEO_LANE_W.md` — wait, that file is tracked? It was committed in batch 1 (b87be3c). Yes, the report was committed in the batch-1 commit. So diff vs f475d19 includes the report — allowed ("+ your report file"). ✓. But it says 182 insertions for the report... that's the whole batch-1 report added since f475d19. ✓ expected.

  2. My `get()` extraction is buggy — `lastIndexOf('\n  {', i)` and end at '\n  },'. The entries differ in formatting; likely extraction mismatch (e.g., entries end with `\n  },` but some fields...). Everything showing CHANGED including frozen ones suggests extraction bug, not real changes. Let me write a more robust comparison: extract from `slug: "x"` to the next `slug:` or end marker, normalizing nothing. Actually simpler: use a real parser — the entries are between comment blocks. Better: compare with git diff word-level per region? Simplest robust approach: extract entry span via regex from `slug: "<s>"` backwards to the preceding `  {` and forwards to the matching `  },` — my backward search `lastIndexOf('\n  {', i)` should find the entry opening... unless comment blocks sit between (`\n  {` still precedes slug directly — yes, `  {` immediately precedes `slug:` line). Forward `indexOf('\n  },', i)` finds entry end. Hmm but for the first entry (raleigh), fine.

  Why would cary differ? Maybe because old file at f475d19 is before batch-1 commits too — batch 1 changed durham/raleigh only. Cary unchanged since f475d19. My extraction must be broken. `\n  },` — cary entry ends with:
  ```
      metaDescription: "...",
    },
  ```
  That matches. Backward: `lastIndexOf('\n  {', i)` — finds `\n  {` before slug. Should work...

  Wait, execSync('git show ...') on Windows with bash — fine. Hmm, maybe the issue: in `now`, entries that I edited (garner/clayton/apex/etc.) — cary shouldn't change. Let me debug by printing lengths/hashes.

  Actually, potential bug: template literals in node -e with double quotes and escaped \" — the indexOf strings with single backslash-n: I wrote '\n  },' inside a double-quoted shell string... In node -e "..." with bash double quotes, `\n` inside the JS single-quoted string... bash double quotes pass `\n` through as backslash-n, so JS sees '\n' escape = newline. OK.

  `src.lastIndexOf('\n  {', i)` — inside double-quoted bash string: fine.

  Hmm, let me just debug directly.

old len 3801 new len 3831
"{\n    slug: \"cary\",\n    titleKeyword: \"Roofer\",\n    answer:\n      \"Mabrey Roofin"
"{\r\n    slug: \"cary\",\r\n    titleKeyword: \"Roofer\",\r\n    answer:\r\n      \"Mabrey Ro"
"e color and material documentation your HOA asks for before we install.\",\n      "
" color and material documentation your HOA asks for before we install.\",\r\n      "
• CRITICAL FINDING: the working file now uses CRLF line endings, while the committed version uses LF. My Edit tool writes back CRLF only for pure-CRLF files... The file on disk is now CRLF throughout?! That means one of my edits (or the concurrent writer's) converted the file to CRLF. git diff --stat showed 279 changed lines for lib/cities.ts — not the whole file, so git is ignoring line endings? Actually git with autocrlf might normalize. The diff stat showing only 279 lines suggests git treats it fine (core.autocrlf=true would normalize CRLF→LF on commit). Wait, if the file on disk is CRLF and the repo is LF, and git shows only 279 lines changed, then git is normalizing (autocrlf). Hmm, or `git diff` was run with normalization.

  Actually wait — if the whole file were converted to CRLF and git did NOT normalize, every line would show changed (~1100+ lines). It shows 279. So git is normalizing line endings (autocrlf=true likely on this Windows setup). Then the frozen entries are byte-identical in git's normalized view. Good — but let me verify: compare after normalizing CRLF→LF.

  Also important: was the original working-tree file CRLF before my edits? Read tool showed LF... "For pure CRLF files, Read shows LF". So the file may have been pure CRLF all along, and Edit preserved CRLF. Batch-1 commits were made from this same worktree presumably with CRLF working file. So nothing wrong — the repo normalizes. Let me redo the comparison with normalization.

cary            IDENTICAL
chapel-hill     IDENTICAL
burlington      IDENTICAL
sanford         IDENTICAL
wilson          IDENTICAL
rolesville      IDENTICAL
durham          changed
raleigh         changed
knightdale      IDENTICAL
holly-springs   IDENTICAL
wendell         IDENTICAL
fuquay-varina   IDENTICAL
zebulon         IDENTICAL
hillsborough    IDENTICAL
---
 lib/cities.ts | 279 +++++++++++++++++++++++++++++++++++++++++++++++++---------
 1 file changed, 235 insertions(+), 44 deletions(-)
true
• With normalization: 6 frozen entries IDENTICAL ✓, durham/raleigh changed vs f475d19 because batch 1 happened after f475d19 — expected (they're committed in b87be3c). I should verify durham/raleigh are identical vs the batch-1 HEAD (b87be3c), not f475d19:durham IDENTICAL vs b87be3c
raleigh IDENTICAL vs b87be3c
---
 lib/cities.ts | 203 +++++++++++++++++++++++++++++++++++++++++++++++++---------
 1 file changed, 171 insertions(+), 32 deletions(-)
Scope clean: batch-2 working tree changes only lib/cities.ts (report is tracked, unmodified so far this batch — I'll append later). Frozen entries + batch-1 entries byte-identical.

  Wait — one nuance: `git diff --stat f475d19` earlier included the report file because batch-1 committed it. For the batch-2 scope assertion, the correct comparator is "git diff b87be3c" → only lib/cities.ts ✓.

  Also should double check the anti-template 8-word clause rule roughly — doorway-check passed at 27.7% which is the mechanical verifier. Good.

  Now commit batch 2. The user said: Commit as "seo-lane-w batch 2: apex + wake forest + pittsboro + garner + clayton + morrisville". The hard rules say never push; commit is explicitly instructed. The general system prompt says ask before git mutations — but the user explicitly instructed the commit with exact message. That IS the explicit ask. Proceed with commit.

  What to stage: lib/cities.ts only (report appended later? WO §11: "Commit per batch" — batch-1 commits included the report? Let me check what b87be3c/278bfdd contained. The report diff vs f475d19 shows report committed in batch 1. So report gets committed per batch. I'll append the batch-2 report section first, then commit both. That matches batch-1 behavior.

  Let me now write the batch-2 report section. Content needed:
  - gate exits
  - oracle table
  - scrub table per v2.C for every edited entry (6 entries)
  - count-FAQ questions side by side (all 9 — Cary/Durham/Raleigh + 6 new; note orchestrator said 8 but it's 9: 8 Tier-1 cities + Cary. I'll present 9 and note.)
  - forbidden-pattern grep outputs
  - git diff scope proof
  - source URLs added: none
  - Also note the concurrent-writer observation? Yes — transparency: Apex + Morrisville entries were written by a concurrent builder process in the same worktree; I verified them via gates/oracle and adjusted Apex's count-FAQ for distinctness. Hmm — actually, wait. Should I mention this? It's material: the orchestrator should know something else touched the worktree. But... let me reconsider: is it possible *I* hallucinated and actually the Apex/Morrisville rewrites came from... no. My Edit history is clear: 4 edits (garner×2, clayton×2). The Apex/Morrisville comment blocks reference the same WO and same conventions. Possibly the user pasted the WO into two sessions. I'll report it factually.

  Scrub tables per city (pre-existing neighborhood work-claims):

  APEX (concurrent writer's scrub, verified by me):
  - Salem Street (answer process-claim "account for any added review on Salem Street historic-district homes before we schedule" — hmm that stayed in permitNote; FAQ work-claim "We work on the older Salem Street historic-district homes regularly") — 0 → CONVERT-to-descriptor
  - Villages of Apex (answer + intro + array) — 0 → DELETE as work site
  - Scotts Mill (answer + array) — 1 → KEEP-supported
  - Haddon Hall (array) — 1 → KEEP
  - alt Salem Street — v2.D de-attributed
  - localConsiderations Salem Street bullet — descriptor, KEEP (regulatory texture)

  WAKE FOREST (mine):
  - old college / North Main (answer "pre-war homes in the Historic District near the old college", FAQ1 "We work the older homes around the old college and along North Main regularly", array "North Main Street", "Wake Forest Historic District") — 0 → CONVERT-to-descriptor
  - Heritage (answer, array, alt) — 7 combined → KEEP-supported
  - Traditions (answer, array, descriptors) — 0 → removed from answer/array; stays housing-age descriptor
  - Holding Village (answer "builder-grade tear-off in Holding Village", intro, array) — 0 → DELETE work-claim; stays descriptor in housingStock
  - Wakefield (array) — full-hoods has "Wakefield Estates" (1), not "Wakefield" → grounded to book-real Wakefield Estates

  PITTSBORO (mine):
  - Chatham Park (answer service framing, array) — 0 → descriptor only
  - Powell Place (answer, array, housingStock) — 0 → descriptor only
  - Chatham Forest (answer "established 2000s subdivisions like Chatham Forest", array) — 0 → descriptor only
  - Courthouse circle (array "The Courthouse Circle historic core", alt "homes near the courthouse circle") — 0 → alt de-attributed; array entry removed
  - Fearrington Village (array "(nearby)") — 2 → KEEP-supported

  GARNER (mine):
  - Creekside (answer, intro, array, alt) — 0 → DELETE/CONVERT (alt de-attributed; intro algae claim generalized to "shaded north slopes")
  - Cleveland Bluffs, Lake Benson area, White Oak corridor (array; White Oak corridor also in old answer/intro) — 0 → out of array; White Oak corridor removed from answer/intro
  - Book hoods added: Southills, Hunter's Mark, Heather Hills, Pleasant Woods (1 each)

  CLAYTON (mine):
  - Flowers Plantation (intro "works ... from the master-planned streets of Flowers Plantation", answer "From the newer builder-grade roofs filling Flowers Plantation ... we know", alt) — 0 → CONVERT to growth/housing descriptor; alt de-attributed
  - Riverwood (intro "to older Riverwood", answer "older homes near Riverwood") — 0 → work-claim dropped; Riverwood stays in landmarks (not a work claim) — hmm, landmarks: "Riverwood Golf Club" — landmark, fine.
  - neighborhoods array: stays AS-IS per v3 carve-out (Flowers Plantation, Riverwood, Glen Laurel) — flagged known limitation.
  - Glen Laurel — full-hoods: not in clayton (empty)... note: "Glen Laurel" IS in raleigh's list (1 job, Raleigh!) — interesting, but for Clayton the carve-out applies regardless.

  MORRISVILLE (concurrent writer's, verified):
  - Carpenter Village ×4 (answer, intro, localConsiderations, FAQ1, + array) — 0 (Cary hood) → rebuilt on Kitts Creek + Breckenridge per v2.E; no Carpenter Park substitution into old sentences
  - Shiloh Grove, Savannah, McCrimmon at the Park (array) — 0 → removed
  - Kitts Creek, Breckenridge — 3 each → KEEP-supported (array, rebuilt clauses)
  - alt Breckenridge — 3 → KEEP

  Count-FAQ side by side (9):
  1. Cary: "How many Cary roofs has Mabrey Roofing completed?"
  2. Durham: "How much roofing has Mabrey Roofing actually done in Durham?"
  3. Raleigh: "What is Mabrey Roofing's track record in Raleigh?"
  4. Apex: "Which Apex neighborhoods has Mabrey Roofing worked in the most?"
  5. Wake Forest: "What does Mabrey Roofing's completed work in Wake Forest look like?"
  6. Pittsboro: "Has Mabrey Roofing done real work in Pittsboro?"
  7. Garner: "Where around Garner has Mabrey Roofing completed roofs?"
  8. Clayton: "How established is Mabrey Roofing in Clayton?"
  9. Morrisville: "How much of Mabrey Roofing's work is in Morrisville?"

  Hmm — Garner's "Where around Garner has Mabrey Roofing completed roofs?" vs Apex's "Which Apex neighborhoods..." — distinct enough. Morrisville "How much of Mabrey Roofing's work is in Morrisville?" vs Durham "How much roofing has Mabrey Roofing actually done in Durham?" — both start "How much" but constructions differ. OK.

  Now append the report section, then commit lib/cities.ts + report.

  Report should also quote... §11 says "Durham + Raleigh intros quoted" — already in batch-1 section. Fine.

  Write the batch-2 report section now.

### STOP per v2.H

Fix round reported. Batch 2 (Apex, Wake Forest, Pittsboro, Garner, Clayton, Morrisville) NOT started — awaiting orchestrator go signal.
/usr/bin/bash: line 93: warning: here-document at line 1 delimited by end-of-file (wanted `EOF')
• The heredoc broke — probably because the content contains a line with `EOF`? No... The warning says EOF not found — likely the content included a line starting with something that terminated early, or quoting issue. Actually the issue: the heredoc content contains backticks and `$`? No — 'EOF' quoted prevents expansion. The problem might be the backtick-fenced code block containing "EOF"? No. Possibly the content contains a line that is exactly `EOF`? No.

  Wait — the warning means the heredoc never saw the terminator. Possibly an earlier line inside content had `EOF` with leading whitespace? No. Hmm — maybe the content's code fence line "  ```" is fine... The likely culprit: bash on Windows with very long heredoc and parentheses? No.

  Let me check what actually got appended.274 wo/BUILD_REPORT_SEO_LANE_W.md
| Pre-existing claim | Where it lived | Book count | Disposition |
|---|---|---|---|
| Carpenter Village | answer + intro + localConsiderations + FAQ#1 + array | 0 in Morrisville (it is a CARY book hood) | **DELETE** all four prose claims + array entry; clauses **rebuilt on Kitts Creek (3) + Breckenridge (3)** per v2.E; Carpenter Park NOT substituted into the old sentences; nothing cross-imported from the Cary pack |
| Shiloh Grove | array | 0 | **DELETE** from array |
| Savannah 
The heredoc got truncated mid-table — at "Savannah | array | 0 | **DELETE** from array |" then a stray line "| Savannah ". Something in the content terminated it — probably a line in my content that started with `EOF`? No. Wait — bash heredoc with `<< 'EOF'`: content lines are literal. Truncation happened around the Morrisville table. Suspicious content near there: "McCrimmon at the Park" — no. Hmm, the tail shows the last full line is the Shiloh Grove row then a partial "| Savannah ". So the write stopped mid-line — the tool call itself may have been truncated by output limits? The Bash command was huge (~10KB). Possibly the command string got cut.

  Better approach: revert the partial append (git checkout won't work — file is tracked; the report file is tracked and now modified; I appended partially). Since the batch-2 section was partially appended, easiest: restore the report to HEAD and use Write/Edit tools instead of heredoc.

  Plan: `git checkout -- wo/BUILD_REPORT_SEO_LANE_W.md`? That's a git mutation (checkout of a file — restores tracked file). It's destructive to my partial append only. Acceptable. Then use Edit to append (Edit with old_string = tail of file, new_string = tail + section) — but the section is large; Edit handles big strings fine.

  Actually simpler: read current file end, then use Write append mode in chunks. Write append mode: "append adds content at EOF". I'll do git checkout to restore, then append in 2-3 Write-append chunks.

182 wo/BUILD_REPORT_SEO_LANE_W.md
warning: in the working copy of 'wo/BUILD_REPORT_SEO_LANE_W.md', LF will be replaced by CRLF the next time Git touches it
[seo-w-city-sweep fdb3d1a] seo-lane-w batch 2: apex + wake forest + pittsboro + garner + clayton + morrisville
 2 files changed, 315 insertions(+), 32 deletions(-)
fdb3d1a seo-lane-w batch 2: apex + wake forest + pittsboro + garner + clayton + morrisville
b87be3c seo-lane-w batch 1 fix: raleigh/durham directional corrections
    seo-lane-w batch 2: apex + wake forest + pittsboro + garner + clayton + morrisville

 lib/cities.ts                 | 203 +++++++++++++++++++++++++++++++++++-------
 wo/BUILD_REPORT_SEO_LANE_W.md | 144 ++++++++++++++++++++++++++++++
 2 files changed, 315 insertions(+), 32 deletions(-)
• Batch 2 committed: fdb3d1a. Now batch 3: the six Tier-2 cities — knightdale, holly-springs, hillsborough, wendell, fuquay-varina, zebulon.

  Rules:
  - Evidence-WOVEN, never count-led. City total NOWHERE (digit or word).
  - No count-FAQ (FAQ count unchanged: each currently 3).
  - No per-hood counts.
  - Book hoods woven into intro/housingStock as completed-work mentions.
  - Arrays per v3: book-supported only, may shrink to 3-4 (or fewer if that's all the book has).
  - Knightdale's Mingo Creek/Langston Ridge/Planters Walk stay as housing descriptors only.
  - Existing aspirational work-claims get honesty scrub.
  - Comment block per entry.
  - metaDescription: Tier-2 — no total in intro/meta. Existing metas stay (no count added). Hillsborough's is 158 chars — I7 says ≤155; since I'm editing the entry, trim to ≤155.

  Per city:

  **KNIGHTDALE** (book: Carrington Woods 2, Timber Ridge 1, Churchill 1):
  - Weave: intro or housingStock — "completed work in Carrington Woods, Timber Ridge, and Churchill" phrasing class.
  - Array → ["Carrington Woods", "Timber Ridge", "Churchill"] (3 items, all book).
  - Alt: "First roof replacement on a Mingo Creek home in Knightdale, NC" → de-attribute: "First roof replacement on a Knightdale, NC home".
  - Mingo Creek/Langston Ridge/Planters Walk mentions stay as housing descriptors (they already are — "builder-grade roofs across Mingo Creek... hitting 12 to 20 years old" — descriptor ✓).
  - intro weave: add a sentence: "Our completed Knightdale work runs through Carrington Woods, Timber Ridge, and Churchill, the same builder-grade streets now hitting that window." Where? Intro end or housingStock. Careful about "no total" — fine.
  - No metaDescription exists for knightdale (no count needed). I7 honest binding N/A.

  Wait — check knightdale entry: no metaDescription field. Fine, Tier-2 doesn't require one.

  Comment block for knightdale.

  **HOLLY SPRINGS** (book: Holly Glen East 2, Twin Lake Farm 1):
  - Existing work-ish claims: answer "from 12 Oaks and Forest Springs to Holly Glen and the Bass Lake Park area" — service framing naming 0-book hoods (12 Oaks, Forest Springs, Holly Glen, Bass Lake) → convert. Note book has "Holly Glen East" not "Holly Glen" — 0-book as written.
  - stormHook: "Subdivisions like 12 Oaks and Forest Springs went up on cleared land" — housing descriptor ✓ keep.
  - array: ["12 Oaks", "Holly Glen", "Forest Springs", "Sunset Ridge", "Bass Lake", "Holly Pointe"] → book only: ["Holly Glen East", "Twin Lake Farm"] (2 items — honest short).
  - alt: "on a 12 Oaks home" → de-attribute to "a Holly Springs, NC home".
  - weave: intro or housingStock mention completed work in Holly Glen East and Twin Lake Farm. E.g., in intro: "...Mabrey Roofing helps these young-family homeowners get ahead of the wave..." add "with completed work in Holly Glen East and Twin Lake Farm" — per §2 phrasing class.
  - FAQ count stays 3.
  - metaDescription exists (145 chars, no count) — keep.

  **HILLSBOROUGH** (book: Cornwallis Hills 2, Fairview 1):
  - array: ["Downtown Historic District", "West Hillsborough", "Waterstone", "Churton Grove", "Beckett's Ridge", "Cornwallis Hills"] → book only: ["Cornwallis Hills", "Fairview"] (2).
  - Existing work-claims: answer "from the colonial-era homes of the downtown Historic District to the newer subdivisions at Waterstone, Churton Grove, and Beckett's Ridge" — "serves Hillsborough from X to Y" service framing naming 0-book hoods → convert to descriptor/housing framing. stormHook: "wide, open roof planes at Waterstone and Beckett's Ridge take Triangle straight-line gusts head-on" — environmental descriptor ✓ keep. housingStock: "the 2000s brought Waterstone, Churton Grove, Beckett's Ridge, and Cornwallis Hills" — housing descriptor ✓ keep (Cornwallis Hills book-supported anyway).
  - weave: add "including completed work in Cornwallis Hills and Fairview" to intro or housingStock.
  - alt: "Roof replacement on a historic home near downtown Churton Street in Hillsborough, NC" → "Roof replacement on a historic home in Hillsborough, NC".
  - metaDescription 158 → trim ≤155. Current: "Hillsborough, NC roofing for the historic downtown and the new subdivisions. District-aware work, metal fluency, Orange County permits handled. Free estimate." (158). Trim: "Hillsborough, NC roofing for the historic downtown and new subdivisions. District-aware work, metal fluency, Orange County permits. Free estimate." = count: let me estimate: ~146. Good.

  **WENDELL** (book: Ridge Haven 1, Deerfield 1):
  - Work-claims: answer "We re-roof open Wendell Falls and Ponder lots" → convert: "Open lots in the newer Wendell Falls and Ponder growth, where wide planes catch straight-line wind head-on" — descriptor. intro "an architectural tear-off on a wide, exposed Wendell Falls plane" → convert. intro "brand-new Wendell Falls and Ponder rooflines on open lots" descriptor ✓.
  - array → ["Ridge Haven", "Deerfield"] (2).
  - alt "on a Wendell Falls home" → "a Wendell, NC home".
  - weave: "with completed work in Ridge Haven and Deerfield" in intro or housingStock.
  - FAQ2 "Why does my new Wendell Falls roof..." — customer framing, answer is descriptor ✓ keep.
  - metaDescription exists (146, no count) ✓ keep.

  **FUQUAY-VARINA** (book: Lakestone Village 1 ONLY; Maggie Run absent → 0):
  - Gap to report: §2 lists Maggie Run but full-hoods.json (the complete adjudication source, v2.B) omits it → treated as 0 book jobs, not woven. Document.
  - Work-claims: answer "the first-generation architectural-shingle roofs across new Wake County subdivisions like South Lakes and Bentwinds" — service framing "working both sides ... and the roofs across ... South Lakes and Bentwinds" → convert to housing descriptor. housingStock: "subdivisions like South Lakes and Lakestone Village" descriptor ✓ (Lakestone supported; South Lakes descriptor). "Bentwinds, developed back in 1984, falls in between" — housing descriptor ✓ keep.
  - FAQ3: "Newer Fuquay-Varina subdivisions like South Lakes went up in a short window" — descriptor ✓ keep.
  - array: ["Bentwinds", "Ballentine Place", "South Lakes", "Southern Oaks", "Phillips Pointe", "Lakestone Village"] → book only: ["Lakestone Village"] (1).
  - alt "on a Bentwinds home" → "a Fuquay-Varina, NC home".
  - weave: add completed-work mention of Lakestone Village. housingStock already names Lakestone Village as descriptor; add explicit work mention: e.g. in intro add "and the book already includes completed work in Lakestone Village." Wait Tier-2 weave: "book hoods woven into intro/housingStock as completed-work mentions". E.g. housingStock: "...subdivisions like South Lakes and Lakestone Village, sitting on first-generation architectural shingles..." → could add "our completed work here includes Lakestone Village". 
  - metaDescription exists (151, no count) ✓ keep.

  **ZEBULON** (book: Rivercrest 2):
  - Work-claims: answer "We inspect, repair, and fully replace roofs on exposed homes from Pilot Ridge to Weavers Pond and Wakelon Heights" → convert. intro "We know this town, from the older ranch and minimal-traditional homes near downtown Arendell Avenue to the newer builds in Weavers Pond and Pilot Ridge" → convert ("the town runs from..."). housingStock "subdivisions like Weavers Pond and Pilot Ridge filled in" descriptor ✓ keep.
  - array → ["Rivercrest"] (1).
  - alt "on a Pilot Ridge home surrounded by open farmland" → "on a Zebulon, NC home surrounded by open farmland".
  - weave: "completed work in Rivercrest" in intro or housingStock. Oracle asserts exactly Rivercrest present.
  - metaDescription exists (151) ✓ keep.

  All six: add comment blocks; keep FAQ at 3; no count anywhere.

  Word-form totals to avoid: knightdale "four", holly springs "four", hillsborough "four", wendell "five", fuquay "four", zebulon "three" near roof words — I won't print totals at all.

  Careful with existing numbers near "roofs": Knightdale "11,000 people to nearly 19,000" fine. v2.G grep: city total digit/word within 6 words of roofs/jobs/projects/completed — I'll grep for the specific totals: knightdale 4/four, holly-springs 4/four, hillsborough 4/four, wendell 5/five, fuquay-varina 4/four, zebulon 3/three. Pre-existing text might contain e.g. "15 to 20 years" — not the total. Zebulon "3"? grep for \b3\b near roof-words... "115 mph" fine. I'll run the grep pattern on rendered HTML: (\b4\b|four) within 6 words of (roofs|jobs|projects|completed) etc.

  Now write the six edits. Serial, same file. Let me do them one per Edit, each covering comment block + full entry. I need current exact text. I have knightdale (223-264 orig — but file changed; content same though), holly-springs, wendell, fuquay-varina, zebulon, hillsborough from earlier reads. The concurrent writer might strike again — verify before each edit via grep for comment markers.

  Check current state for any batch-3 comment blocks first.

59:   * RALEIGH — updated WO_SEO_LANE_W (2026-08-20), batch 1.
266:   * GARNER — updated WO_SEO_LANE_W (2026-08-20), batch 2.
333:   * CLAYTON — updated WO_SEO_LANE_W (2026-08-20), batch 2.
398:   * APEX — updated WO_SEO_LANE_W (2026-08-20), batch 2.
465:   * MORRISVILLE — updated WO_SEO_LANE_W (2026-08-20), batch 2.
516:   * WAKE FOREST — updated WO_SEO_LANE_W (2026-08-20), batch 2.
709:   * DURHAM — updated WO_SEO_LANE_W (2026-08-20), batch 1.
887:   * PITTSBORO — updated WO_SEO_LANE_W (2026-08-20), batch 2.
80:    slug: "raleigh",
173:    slug: "cary",
223:    slug: "knightdale",
285:    slug: "garner",
350:    slug: "clayton",
417:    slug: "apex",
487:    slug: "morrisville",
540:    slug: "wake-forest",
569:    slug: "holly-springs",
597:    slug: "wendell",
625:    slug: "fuquay-varina",
653:    slug: "zebulon",
681:    slug: "rolesville",
734:    slug: "durham",
786:    slug: "chapel-hill",
839:    slug: "hillsborough",
908:    slug: "pittsboro",
985:    slug: "burlington",
1066:    slug: "sanford",
1134:    slug: "wilson",
• Good — batch-2 blocks in place, Tier-2 entries untouched. Now batch 3 edits, serial. Knightdale first (lines 222-264 area).

  Knightdale entry current (from earlier read, lines 222-264 originally — content unchanged). I'll do the full-entry replacement.

  Knightdale new intro: keep the lifecycle spine, add weave. Draft:
  intro: "Knightdale is the Triangle's first-replacement town. It grew from roughly 11,000 people to nearly 19,000 in a single decade, and the builder-grade roofs that went on all those Mingo Creek and Langston Ridge homes are now hitting 12 to 20 years old. That is the window where a builder roof starts to fail. Mabrey Roofing helps first-time roof buyers in Knightdale understand what they are actually looking at before they spend, with a free documented inspection and an honest repair-or-replace answer. Our completed work here runs through Carrington Woods, Timber Ridge, and Churchill, the same kind of builder-grade streets now reaching that window."

  Hmm — the last sentence says the book hoods are "the same kind of builder-grade streets" — descriptor about the hoods' housing. Is that verifiable? Carrington Woods/Timber Ridge/Churchill are Knightdale subdivisions; characterizing them as builder-grade streets follows the town-wide thesis. It's a mild characterization; acceptable as it's the town's documented stock. Alternatively simpler: "The book already shows completed work in Carrington Woods, Timber Ridge, and Churchill." Cleaner. Use that.

  Array: ["Carrington Woods", "Timber Ridge", "Churchill"].

  Alt: "First roof replacement on a Knightdale, NC home".

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * KNIGHTDALE — updated WO_SEO_LANE_W (2026-08-20), batch 3 (Tier-2:
     * evidence-woven, never count-led — the city total appears nowhere).
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): book
     *   neighborhoods Carrington Woods (2), Timber Ridge (1), Churchill (1).
     *   Woven as completed-work mentions only; no totals, no per-hood counts.
     * Pre-existing texture (the 11,000→19,000 growth figures, the 12-to-20-
     *   year builder-roof thesis, permit authority) predates this lane and is
     *   retained generalized-or-hedged per the A6/v2.A escape hatch; this lane
     *   introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Mingo Creek,
     *   Langston Ridge, and Planters Walk (0 book jobs, orchestrator
     *   pre-adjudicated) stay as HOUSING DESCRIPTORS only; the heroImage alt
     *   is de-attributed to "a Knightdale, NC home" per v2.D. AMENDMENT v3
     *   (array is a work-claim surface): the neighborhoods array shrinks to
     *   the three book-supported communities.
     * ------------------------------------------------------------------------- */
  ```

  FAQ stays 3. metaDescription: knightdale has none — fine.

  Then Holly Springs, Hillsborough, Wendell, Fuquay-Varina, Zebulon.

  Holly Springs weave: intro — after "...before water finds the deck." Add: "The book already shows completed work in Holly Glen East and Twin Lake Farm." Hmm, also answer mentions "from 12 Oaks and Forest Springs to Holly Glen and the Bass Lake Park area" — convert: "Mabrey Roofing is a Holly Springs roofing contractor that repairs and replaces asphalt shingle roofs across Wake County, with completed work in Holly Glen East and Twin Lake Farm." Then continue. Let me redraft answer: "Mabrey Roofing is a Holly Springs roofing contractor that repairs and replaces asphalt shingle roofs across Wake County, including completed work in Holly Glen East and Twin Lake Farm. Because most Holly Springs homes went up in one building boom, whole streets reach roof-replacement age together, and summer hail and straight-line wind hit the wide, thinly shaded roof planes in newer subdivisions first. We start with a free documented inspection and a plain repair-or-replace answer, pull the permit through the Town of Holly Springs, and schedule the required inspection so your roof is on record."

  Array: ["Holly Glen East", "Twin Lake Farm"].
  Alt: "Architectural shingle roof replacement on a Holly Springs, NC home".

  Hillsborough weave: housingStock add at end: "Our completed Hillsborough work includes Cornwallis Hills and Fairview." Or in intro. Intro ends "Mabrey Roofing works both ends of that spread." → append "The book already shows completed work in Cornwallis Hills and Fairview." Use housingStock instead? Either. I'll put in housingStock after the 2000s sentence: housingStock ends "...reaching the 15-to-20-year window on the same timeline, street by street." Add: "Our completed work in town includes Cornwallis Hills and Fairview."

  Answer: "from the colonial-era homes of the downtown Historic District to the newer subdivisions at Waterstone, Churton Grove, and Beckett's Ridge" — service framing "serves Hillsborough, NC, from X to Y" — the named 0-book hoods as service range. Convert: "from the colonial-era homes of the downtown Historic District to the newer 2000s subdivisions at the town's edge". Hmm "town's edge" directional — Waterstone/Churton Grove placement unknown; "at the town's edge" is mild and consistent with housingStock "Around the edges, the 2000s brought..." — pre-existing copy says "Around the edges". Safe.

  metaDescription trim to ≤155: "Hillsborough, NC roofing for the historic downtown and new subdivisions. District-aware work, metal fluency, Orange County permits. Free estimate." — count chars: I'll verify by script.

  Array: ["Cornwallis Hills", "Fairview"].
  Alt: "Roof replacement on a historic home in Hillsborough, NC".

  Wendell weave: intro — after "...a documented inspection to each one." Add: "The book already shows completed work in Ridge Haven and Deerfield." Answer: "We re-roof open Wendell Falls and Ponder lots, where wide planes catch straight-line wind head-on" → "The newer Wendell Falls and Ponder lots sit open, where wide planes catch straight-line wind head-on" — descriptor. And intro "an architectural tear-off on a wide, exposed Wendell Falls plane are not the same job" → "a wide, exposed roof plane on the newer side of town are not the same job"? Hmm keep Wendell Falls as descriptor: "A repair on a 1920s home off Wendell Boulevard and an architectural tear-off on one of the wide, exposed new-subdivision planes are not the same job". 

  Array: ["Ridge Haven", "Deerfield"].
  Alt: "Architectural shingle roof replacement on a Wendell, NC home".

  Wait — "A repair on a 1920s home off Wendell Boulevard" — implies we've done repairs on specific downtown homes? It's hypothetical framing ("A repair ... and a tear-off ... are not the same job") — generic capability framing, acceptable (it's about job types, not completed work claims). Keep with Wendell Boulevard (a real street, in landmarks as "Downtown Wendell Boulevard Historic District").

  Fuquay-Varina weave: housingStock — change "Most homes here are recent construction in subdivisions like South Lakes and Lakestone Village, sitting on first-generation architectural shingles..." keep, and add "The book already shows completed work in Lakestone Village." Answer: convert "working both sides of this two-downtown town: older, often multi-layered homes near the Fuquay Springs and Varina historic districts, and the first-generation architectural-shingle roofs across new Wake County subdivisions like South Lakes and Bentwinds" → "working both sides of this two-downtown town: older, often multi-layered homes near the Fuquay Springs and Varina historic districts, and the first-generation architectural-shingle roofs across the newer Wake County subdivisions". 

  Array: ["Lakestone Village"].
  Alt: "Architectural shingle roof replacement on a Fuquay-Varina, NC home".

  Zebulon weave: intro — "We know this town, from the older ranch and minimal-traditional homes near downtown Arendell Avenue to the newer builds in Weavers Pond and Pilot Ridge." → "The town runs from the older ranch and minimal-traditional homes near downtown Arendell Avenue to the newer builds in subdivisions like Weavers Pond and Pilot Ridge, and the book already shows completed work in Rivercrest." Answer: "We inspect, repair, and fully replace roofs on exposed homes from Pilot Ridge to Weavers Pond and Wakelon Heights." → "We inspect, repair, and fully replace roofs on exposed homes across town, with completed work in Rivercrest."

  Array: ["Rivercrest"].
  Alt: "Architectural shingle roof replacement on a Zebulon, NC home surrounded by open farmland".

  Hmm wait — Zebulon oracle: "asserts exactly Rivercrest" — meaning Rivercrest must be present (the only hood asserted). Fine.

  Oracle for Tier-2: ≥ min(2, full-list size) hoods present: knightdale 2 of [Carrington Woods, Timber Ridge, Churchill]; holly-springs 2 of [Holly Glen East, Twin Lake Farm]; hillsborough 2 of [Cornwallis Hills, Fairview]; wendell 2 of [Ridge Haven, Deerfield]; fuquay-varina 1 (Lakestone Village); zebulon exactly Rivercrest.

  Also Tier-2: FAQ count unchanged (3), NO total string. What would a "total-count string" be? There's no count anywhere, so assert absence of e.g. "4 completed", "four roofs", etc.

  Now write the six edits serially. Knightdale first.

• Knightdale done. Now Holly Springs (still original per earlier read at 543-570, now shifted). Full-entry edit for holly-springs: comment block + answer + array + alt. The answer/neighborhoods/alt are non-contiguous — do one edit for comment+answer, one for array, one for alt. Actually comment block + answer are contiguous (`{\n slug... answer`). Then neighborhoods separate, alt separate. 3 edits.

• Wendell next. Changes: comment block, answer (convert Wendell Falls/Ponder re-roof claim), intro (convert tear-off claim + add weave), array, alt. Comment+answer contiguous; array+landmarks... array then intro non-contiguous with answer? Order: slug, answer, name, county, permitAuthority, permitNote, neighborhoods, landmarks, lead, intro... So edit 1: comment+answer. Edit 2: neighborhoods. Edit 3: intro. Edit 4: alt.

• Continue: Fuquay-Varina next.

• Fuquay-Varina housingStock already weaves Lakestone Village ("subdivisions like South Lakes and Lakestone Village") — and the answer now carries the completed-work mention. Good. Oracle needs ≥1 (Lakestone Village) ✓.

  Now Zebulon.

• Now Hillsborough: comment block + answer conversion + weave + array + alt + metaDescription trim. Order in entry: slug, answer, name, county, permitAuthority, permitNote, neighborhoods (multi-line), landmarks, lead, intro, stormHook, housingStock, localConsiderations, localProjects, localReviews, faqs, heroImage, metaDescription.

  Edits: (1) comment+answer, (2) neighborhoods array, (3) housingStock weave, (4) alt + metaDescription (contiguous).

• Wait — Hillsborough's intro ends "Ten minutes out, Waterstone and Churton Grove carry the opposite problem..." — that's a descriptor of housing ("carry the opposite problem: whole streets of 2000s builder shingles") — descriptor, keep. stormHook "wide, open roof planes at Waterstone and Beckett's Ridge take Triangle straight-line gusts head-on" — environmental descriptor, keep.

  Now housingStock weave + alt/meta edit. housingStock ends "...reaching the 15-to-20-year window on the same timeline, street by street." The answer already carries "Our completed work here includes Cornwallis Hills and Fairview." — weave requirement is intro/housingStock. Oracle just checks hood presence on page. But the Tier-2 rule says "book hoods woven into intro/housingStock as completed-work mentions" — answer weave technically satisfies presence, but to be faithful, add to housingStock too? Minimal changes... The rule explicitly says intro/housingStock. I'll add the mention to housingStock instead and keep the answer mention? Both is fine (Cary repeats hoods across fields). Actually simplest: keep the answer mention AND add to housingStock end: "Our completed work in town includes Cornwallis Hills and Fairview." Hmm, that duplicates the answer sentence nearly. Vary: housingStock: "...street by street. Cornwallis Hills and Fairview are already in our completed-work book." 

  Alt + meta: alt → "Roof replacement on a historic home in Hillsborough, NC"; meta 158 → trim. New meta: "Hillsborough, NC roofing for the historic downtown and new subdivisions. District-aware work, metal fluency, Orange County permits. Free estimate." Let me count: I'll verify by script after. Roughly 146.All six Tier-2 entries edited. Hillsborough weave: answer + housingStock carry Cornwallis Hills + Fairview; oracle min(2,2)=2 ✓.

  Check Hillsborough intro — "Ten minutes out, Waterstone and Churton Grove carry the opposite problem" — "Ten minutes out" is a directional/distance claim; pre-existing, keep.

  Also check: did I leave any work-claim in wendell FAQ2? "Why does my new Wendell Falls roof seem to catch more wind damage than older homes?" — customer question; answer describes exposure; fine.

  Knightdale: check the localConsiderations "Builder-grade roofs across Mingo Creek and Langston Ridge are aging on a similar 12-to-20-year timeline." — descriptor ✓.

  Now: verify no concurrent-writer interference, typecheck, then check for total-leaks. Word-form totals to grep in the six Tier-2 pages: "four", "five", "three", and digits 4, 5, 3 near roofs/jobs/projects/completed. Note Zebulon total 3; knightdale/hollysprings/hillsborough/fuquay 4; wendell 5.

  Careful about pre-existing text: Wendell stormHook "Triangle storms regularly push 55 to 75 mph" — no. Zebulon "dozens of severe weather warnings" — no. Hillsborough FAQ "about 15 years old". Knightdale "12 to 20 years". Holly Springs "15 to 20 years". Any standalone "4"/"four"? Probably not.

  Rebuild + rerun gates + oracle. Update the oracle script for batch 3: Tier-2 assertions (hoods ≥min(2,n), NO total, FAQ count 3), plus batch-2 regression (all 6 Tier-1 strings), controls, batch-1 regression. Also Tier-2 total-leak grep.

> tsc --noEmit

●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand

• Build passed. Now restart the server on the fresh build: kill :3221 by port, restart, prove new BUILD_ID.SUCCESS: The process with PID 22364 has been terminated.
K8cG4SBHlpY-AJBB3oYHx
The old server task (bash-0x5mknbe) shows as failed — that's expected: I killed it by port (taskkill PID 22364) to restart on the new build. The new server is bash-9yogweu0 (pid 12656). Verify the new server responds with the new BUILD_ID.

buildManifest 200 (BUILD_ID=K8cG4SBHlpY-AJBB3oYHx)

SPAM-410 GUARD: PASS
EXIT:0
Max pairwise similarity: 27.9%  (city:knightdale <> city:holly-springs)
Similarity gate (< 40%): PASS
Delete-the-city-name (>= 4 local signals each): PASS

ANTI-DOORWAY GATE: PASS
EXIT:0
(65 reachable in 1 hop — home/header/footer; rest via hub-down)

REACHABILITY GATE: PASS
EXIT:0
• All gates pass. Now the batch-3 oracle. Update wo/.oracle-w.mjs for batch 3: Tier-2 pages + all regression. Write a new script (overwrite the temp one).

PASS  knightdale-nc: HTTP 200
PASS  knightdale-nc: hoods present 3/3 (need >=2) [Carrington Woods, Timber Ridge, Churchill]
PASS  knightdale-nc: NO digit-form total near roofs/jobs/projects/completed (4)
PASS  knightdale-nc: NO word-form total near roofs/jobs/projects/completed (four)
PASS  knightdale-nc: FAQ count unchanged (3)
PASS  holly-springs-nc: HTTP 200
PASS  holly-springs-nc: hoods present 2/2 (need >=2) [Holly Glen East, Twin Lake Farm]
PASS  holly-springs-nc: NO digit-form total near roofs/jobs/projects/completed (4)
PASS  holly-springs-nc: NO word-form total near roofs/jobs/projects/completed (four)
PASS  holly-springs-nc: FAQ count unchanged (3)
PASS  hillsborough-nc: HTTP 200
PASS  hillsborough-nc: hoods present 2/2 (need >=2) [Cornwallis Hills, Fairview]
PASS  hillsborough-nc: NO digit-form total near roofs/jobs/projects/completed (4)
PASS  hillsborough-nc: NO word-form total near roofs/jobs/projects/completed (four)
PASS  hillsborough-nc: FAQ count unchanged (3)
PASS  wendell-nc: HTTP 200
PASS  wendell-nc: hoods present 2/2 (need >=2) [Ridge Haven, Deerfield]
FAIL  wendell-nc: NO digit-form total near roofs/jobs/projects/completed (5)
PASS  wendell-nc: NO word-form total near roofs/jobs/projects/completed (five)
PASS  wendell-nc: FAQ count unchanged (3)
PASS  fuquay-varina-nc: HTTP 200
PASS  fuquay-varina-nc: hoods present 1/1 (need >=1) [Lakestone Village]
PASS  fuquay-varina-nc: NO digit-form total near roofs/jobs/projects/completed (4)
PASS  fuquay-varina-nc: NO word-form total near roofs/jobs/projects/completed (four)
PASS  fuquay-varina-nc: FAQ count unchanged (3)
PASS  zebulon-nc: HTTP 200
PASS  zebulon-nc: hoods present 1/1 (need >=1) [Rivercrest]
PASS  zebulon-nc: NO digit-form total near roofs/jobs/projects/completed (3)
PASS  zebulon-nc: NO word-form total near roofs/jobs/projects/completed (three)
PASS  zebulon-nc: FAQ count unchanged (3)
PASS  cary-nc (control/regression): "73 completed roofs" present + 200
PASS  burlington-nc (control/regression): "26 completed roofs" present + 200
PASS  durham-nc (control/regression): "190 completed roofs" present + 200
PASS  raleigh-nc (control/regression): "118 completed roofs" present + 200
PASS  apex-nc (control/regression): "36 completed roofs" present + 200
PASS  wake-forest-nc (control/regression): "24 completed roofs" present + 200
PASS  pittsboro-nc (control/regression): "13 completed roofs" present + 200
PASS  garner-nc (control/regression): "11 completed roofs" present + 200
PASS  clayton-nc (control/regression): "10 completed roofs" present + 200
PASS  morrisville-nc (control/regression): "10 completed roofs" present + 200
PASS  knightdale-nc: scrubbed 0-book array string absent: "Amber Ridge"
PASS  knightdale-nc: scrubbed 0-book array string absent: "Old Town Knightdale"
PASS  holly-springs-nc: scrubbed 0-book array string absent: "Holly Pointe"
PASS  holly-springs-nc: scrubbed 0-book array string absent: "Sunset Ridge"
PASS  wendell-nc: scrubbed 0-book array string absent: "Foxborough Crossing"
PASS  wendell-nc: scrubbed 0-book array string absent: "Woods of Timberlake"
PASS  fuquay-varina-nc: scrubbed 0-book array string absent: "Ballentine Place"
PASS  fuquay-varina-nc: scrubbed 0-book array string absent: "Phillips Pointe"
PASS  fuquay-varina-nc: scrubbed 0-book array string absent: "Maggie Run"
PASS  zebulon-nc: scrubbed 0-book array string absent: "Wakelon Heights"
PASS  zebulon-nc: scrubbed 0-book array string absent: "Whitley Manor"
PASS  knightdale-nc: descriptor retained: "Mingo Creek"
PASS  knightdale-nc: descriptor retained: "Langston Ridge"
PASS  knightdale-nc: descriptor retained: "Planters Walk"
PASS  holly-springs-nc: descriptor retained: "12 Oaks"
PASS  wendell-nc: descriptor retained: "Wendell Falls"
PASS  fuquay-varina-nc: descriptor retained: "South Lakes"
PASS  zebulon-nc: descriptor retained: "Weavers Pond"
PASS  hillsborough-nc: descriptor retained: "Waterstone"

ORACLE: 1 FAILURES
• One FAIL: wendell-nc digit "5" within 6 words of roofs/jobs/projects/completed. This is almost certainly pre-existing texture — Wendell's stormHook: "Triangle storms regularly push 55 to 75 mph" — "55" contains word boundary? `\b5\b` — in "55" there's no \b5\b match since it's two digits. But "75"? no. What contains a standalone 5 near roof words? Let me find the actual match. Could be "5" in some React payload or "115 mph design gust" near "roof"... "Every roof is scoped to a 115 mph design gust" — \b5\b? "115" — no boundary before 5. Hmm. Could be in the answer: "...two very different kinds of homes. The newer Wendell Falls..." no digits. Let me grep the HTML for the match context.

no match?
• My shell-escaping in that debug command is mangled. Write a small debug script file instead.

"cking-[0.14em] text-mist\">housing stock</span></span></div><div class=\"font-display text-ink text-xl font-semibold mb-1.5\">The Roofs of Wendell</div><span aria-hidden=\"true\" class=\"block origi"
• The match is a false positive from CSS classes: "tracking-[0.14em] text-mist">housing stock ... "The Roofs of Wendell"" — the `\b5\b`... wait, where's the 5? "mb-1.5" — \b5\b matches the "5" in "mb-1.5"! Then within 6 "words" (class tokens like "block", "origi...") comes... hmm actually the match shows the 5 in "mb-1.5" and then... "The Roofs of Wendell" — wait the regex matched `5` in `1.5` followed within 6 words by "Roofs". This is HTML class noise, not prose. Batch 1's report noted the same issue ("React flight payload markers").

  Fix the oracle: strip tags before the total-leak grep — extract text content (remove <...> tags and flight payload). Better: strip all HTML tags, then grep. Also class attributes removed with tags. Flight payload contains escaped strings though (self.__next_f.push with the text content duplicated). The text in flight payload is real prose, fine.

  Update the near() check to operate on tag-stripped text.FAIL  wendell-nc: NO digit-form total near roofs/jobs/projects/completed (5)
ORACLE: 1 FAILURES
exit propagated above
" Know\",\"title\":\"Roofing Wendell, Specifically.\",\"underline\":true,\"fade\":true}],[\"$\",\"$L40\",null,{\"className\":\"mt-12 grid sm:grid-cols-2 gap-5\",\"children\":[[\"$\",\"$L41\",\"The Roofs of Wendell\",{\"className\":\"group relative flex flex-col roun"
The remaining false positive comes from the React flight payload: `\"gap-5\",\"children\":...` — the "5" in `gap-5`, followed within 6 tokens by "Roofs" (in "The Roofs of Wendell"). Still markup noise, now inside the serialized flight data.

  Better approach: strip the flight payload entirely (`self.__next_f.push(...)` script contents) OR just check the visible text more carefully. Simplest robust fix: remove <script>...</script> blocks from the HTML before testing, and strip tags. The visible HTML body then contains only rendered prose + attributes... tags stripped. Class attributes are inside tags → removed. Flight payload is inside <script> → removed.

  Let me update near() to also remove script blocks.

59
ORACLE: ALL PASS
• 59 PASS, 0 FAIL. Now v2.G scope assertions for batch 3 (diff vs b87be3c = batches 2+3; per-batch: batch-3 delta = diff vs fdb3d1a → only lib/cities.ts; frozen entries vs f475d19; durham/raleigh/batch-2 entries vs fdb3d1a identical).

 lib/cities.ts | 167 ++++++++++++++++++++++++++++++++++++++++++++++++----------
 1 file changed, 140 insertions(+), 27 deletions(-)
---
cary           IDENTICAL vs f475d19
chapel-hill    IDENTICAL vs f475d19
burlington     IDENTICAL vs f475d19
sanford        IDENTICAL vs f475d19
wilson         IDENTICAL vs f475d19
rolesville     IDENTICAL vs f475d19
durham         IDENTICAL vs fdb3d1a
raleigh        IDENTICAL vs fdb3d1a
apex           IDENTICAL vs fdb3d1a
wake-forest    IDENTICAL vs fdb3d1a
pittsboro      IDENTICAL vs fdb3d1a
garner         IDENTICAL vs fdb3d1a
clayton        IDENTICAL vs fdb3d1a
morrisville    IDENTICAL vs fdb3d1a
• Scope clean. Now append the batch-3 report section, then commit. Report content:

  - Gate exits: typecheck PASS, build PASS, kill by port (PID 22364 killed), fresh server, BUILD_ID K8cG4SBHlpY-AJBB3oYHx 200, spam-410 PASS, doorway PASS (27.9% knightdale<>holly-springs), reachability PASS 168/168.
  - Oracle table: Tier-2 pages with hoods, no-total, FAQ unchanged 3; regression rows.
  - Scrub tables for the 6 Tier-2 entries.
  - Forbidden greps: Tier-2 total leak (digit+word, visible-text only — note methodology refinement re: class-token false positives) 0 hits; per-hood counts 0.
  - Git scope proof.
  - Source URLs: none.
  - Gap: Maggie Run (WO §2 pack lists it for Fuquay-Varina; absent from full-hoods.json → treated as 0 per v2.B/v2.C and not claimed). Pittsboro-style short arrays documented. Hillsborough metaDescription trimmed 158→146 for I7.

  Scrub tables per city:

  KNIGHTDALE:
  - Mingo Creek (answer, intro, localConsiderations descriptors; array; alt) — 0 → descriptors KEEP in prose; array entry removed; alt de-attributed
  - Langston Ridge (answer/intro/localConsiderations descriptors; array) — 0 → same
  - Planters Walk (answer descriptor; array) — 0 → same
  - Old Town Knightdale (array) — 0 → DELETE from array
  - Amber Ridge (array) — 0 → DELETE
  - Carrington Woods/Timber Ridge/Churchill (new weave) — 2/1/1 → ADD-supported

  HOLLY SPRINGS:
  - 12 Oaks (answer service framing; stormHook descriptor; array; alt) — 0 → service framing removed; descriptor kept in stormHook; array removed; alt de-attributed
  - Holly Glen (answer; array) — 0 as written ("Holly Glen East" = 2) → grounded to Holly Glen East
  - Forest Springs (answer; stormHook descriptor; array) — 0 → descriptor kept, work framing removed
  - Sunset Ridge, Bass Lake, Holly Pointe (array; Bass Lake also "Bass Lake Park area" answer mention + landmarks) — 0 → array removed; answer mention removed; landmarks untouched
  - Twin Lake Farm (new) — 1 → ADD-supported

  HILLSBOROUGH:
  - Waterstone (answer service framing; intro/stormHook/housingStock descriptors; FAQ; array) — 0 → service framing converted; descriptors kept; array removed
  - Churton Grove (answer; intro/housingStock descriptors; array) — 0 → same
  - Beckett's Ridge (answer; stormHook/housingStock descriptors; array) — 0 → same
  - Downtown Historic District, West Hillsborough (array; prose descriptors) — 0 → array removed; prose descriptors kept
  - Cornwallis Hills (housingStock descriptor; array) — 2 → KEEP-supported + woven as completed work
  - Fairview (new) — 1 → ADD-supported
  - alt de-attributed (Churton Street binding removed); metaDescription trimmed 158→≤155 (I7)

  WENDELL:
  - Wendell Falls (answer "We re-roof open Wendell Falls... lots"; intro tear-off claim; stormHook/housingStock/localConsiderations/FAQ descriptors; array; alt) — 0 → work-claims converted to descriptors; array removed; alt de-attributed
  - Ponder (same set) — 0 → same
  - Foxborough Crossing, Woods of Timberlake, Lake Glad Road area, Downtown Wendell Historic District (array) — 0 → array removed
  - Ridge Haven, Deerfield (new weave) — 1 each → ADD-supported

  FUQUAY-VARINA:
  - South Lakes (answer service framing; housingStock/FAQ descriptors; array) — 0 → framing converted; descriptors kept; array removed
  - Bentwinds (answer; housingStock descriptor; array; alt) — 0 → converted; alt de-attributed
  - Ballentine Place, Southern Oaks, Phillips Pointe (array) — 0 → removed
  - Lakestone Village (housingStock descriptor; array) — 1 → KEEP-supported + woven
  - Maggie Run — WO §2 pack name but ABSENT from full-hoods.json → 0 per v2.B; NOT claimed (gap documented)

  ZEBULON:
  - Pilot Ridge (answer work-claim; intro knowledge claim; housingStock descriptor; array; alt) — 0 → converted; alt de-attributed
  - Weavers Pond (answer; intro; housingStock; array) — 0 → converted; descriptor kept
  - Wakelon Heights (answer; array) — 0 → removed
  - Olde Place, Little River, Whitley Manor (array) — 0 → removed
  - Rivercrest (new weave) — 2 → ADD-supported

  Append report via Write append (in 2 chunks), then commit.

• Now clean up the temp scripts (wo/.oracle-w.mjs, wo/.debug-5.mjs — untracked; delete them so they don't pollute), commit batch 3, kill the server, done.

  Wait — delete the oracle scripts? The batch-1 report mentioned a scripted oracle but didn't commit a script. Keep repo clean: delete both temp files.

  Commit: git add lib/cities.ts wo/BUILD_REPORT_SEO_LANE_W.md; commit "seo-lane-w batch 3: six tier-2 cities".warning: in the working copy of 'wo/BUILD_REPORT_SEO_LANE_W.md', LF will be replaced by CRLF the next time Git touches it
[seo-w-city-sweep 38d31a1] seo-lane-w batch 3: six tier-2 cities
 2 files changed, 274 insertions(+), 27 deletions(-)
38d31a1 seo-lane-w batch 3: six tier-2 cities
fdb3d1a seo-lane-w batch 2: apex + wake forest + pittsboro + garner + clayton + morrisville
b87be3c seo-lane-w batch 1 fix: raleigh/durham directional corrections
6594fe0 seo-lane-w batch 1 fix: array work-claim rule (v3)
?? wo/WO_SEO_LANE_W_CITY_SWEEP.md
?? wo/full-hoods.json
Committed 38d31a1. Untracked: only the two WO input files (orchestrator-supplied, left untracked like batch 1 did). Now kill the :3221 server by port and stop the background task.

SUCCESS: The process with PID 21852 has been terminated.
:3221 clear
• That's just the server I killed by port — expected. Final summary time. Mark todo done.

To resume this session: kimi -r session_8c65928f-cfa4-411a-88b7-da8e155d379d
