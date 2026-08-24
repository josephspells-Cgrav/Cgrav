• Let me start by reading the work order and understanding the current state.

278bfdd seo-lane-w batch 1: durham + raleigh
f475d19 seo-lane-h FIX ROUND: /quote/ exact-200 gate, tripwire length+flag checks, floor msg appendix, matcher comment
5c15623 seo-lane-h: guard content-equality tripwire + sitemap floor + quote matcher tighten
04d5b7d seo-lane-a6 FINAL micro round: drop self-contradicting Glen Lennox claim, annotate source-comment scope, vary duplicated debris clause
53d0c67 seo-lane-a6 FIX ROUND 2 (micro): drop unsourced superlative, fix majority-claim compression on Cary
?? scratch_durham.txt
?? scratch_raleigh.txt
?? wo/WO_SEO_LANE_W_CITY_SWEEP.md
?? wo/full-hoods.json
• Let me read the current state of lib/cities.ts for Durham and Raleigh, plus full-hoods.json for relevant cities, and the existing build report.{
 "durham": [
  [
   "Southampton",
   21
  ],
  [
   "Parkwood",
   16
  ],
  [
   "Five Oaks",
   11
  ],
  [
   "Bethesda",
   6
  ],
  [
   "Homeplace IV",
   5
  ],
  [
   "Brightleaf at the Park",
   4
  ],
  [
   "American Village",
   4
  ],
  [
   "Penrith",
   4
  ],
  [
   "Marydell",
   4
  ],
  [
   "Hickory Oaks",
   3
  ],
  [
   "Trinity Park",
   3
  ],
  [
   "Omah Street",
   3
  ],
  [
   "Woodlake",
   3
  ],
  [
   "Few",
   3
  ],
  [
   "Fairfield",
   3
  ],
  [
   "Copper Creek",
   3
  ],
  [
   "Oakhurst",
   2
  ],
  [
   "Colonial Village",
   2
  ],
  [
   "Hope Valley West",
   2
  ],
  [
   "Woodcrest",
   2
  ],
  [
   "The Hills at Southpoint",
   2
  ],
  [
   "New Hope Valley",
   2
  ],
  [
   "Woodcroft",
   2
  ],
  [
   "Auburn Hills",
   2
  ],
  [
   "Grove Park - Bellemeade",
   2
  ],
  [
   "Homeplace III",
   2
  ],
  [
   "Cole Mill Road",
   2
  ],
  [
   "Scarsdale Village",
   1
  ],
  [
   "Walltown",
   1
  ],
  [
   "Huntington Ridge",
   1
  ],
  [
   "Old Farm",
   1
  ],
  [
   "Weaver",
   1
  ],
  [
   "Croasdaile",
   1
  ],
  [
   "River Forest",
   1
  ],
  [
   "Lakehurst",
   1
  ],
  [
   "Pine Valley",
   1
  ],
  [
   "Keene",
   1
  ],
  [
   "Heather Glen",
   1
  ],
  [
   "Chelsea Meadows",
   1
  ],
  [
   "Stephen's Woods",
   1
  ],
  [
   "Morehead Hill",
   1
  ],
  [
   "Old North Durham",
   1
  ],
  [
   "Croasdaile Farm",
   1
  ],
  [
   "Greymoss",
   1
  ],
  [
   "Oak Grove",
   1
  ],
  [
   "Triangle Development",
   1
  ],
  [
   "Northgate Park",
   1
  ],
  [
   "Lynn Crossroads",
   1
  ],
  [
   "West End",
   1
  ],
  [
   "Newhall Village",
   1
  ],
  [
   "Arrowhead",
   1
  ],
  [
   "Burch Avenue",
   1
  ],
  [
   "Trotter Ridge",
   1
  ],
  [
   "Stadium Heights",
   1
  ],
  [
   "River's Edge",
   1
  ],
  [
   "Treyburn",
   1
  ]
 ],
 "raleigh": [
  [
   "Madison Park",
   14
  ],
  [
   "Laneridge",
   8
  ],
  [
   "Brighton",
   5
  ],
  [
   "Durant Trails",
durham : Southampton (21), Parkwood (16), Five Oaks (11), Bethesda (6), Homeplace IV (5), Brightleaf at the Park (4), American Village (4), Penrith (4), Marydell (4), Hickory Oaks (3), Trinity Park (3), Omah Street (3), Woodlake (3), Few (3), Fairfield (3), Copper Creek (3), Oakhurst (2), Colonial Village (2), Hope Valley West (2), Woodcrest (2), The Hills at Southpoint (2), New Hope Valley (2), Woodcroft (2), Auburn Hills (2), Grove Park - Bellemeade (2), Homeplace III (2), Cole Mill Road (2), Scarsdale Village (1), Walltown (1), Huntington Ridge (1), Old Farm (1), Weaver (1), Croasdaile (1), River Forest (1), Lakehurst (1), Pine Valley (1), Keene (1), Heather Glen (1), Chelsea Meadows (1), Stephen's Woods (1), Morehead Hill (1), Old North Durham (1), Croasdaile Farm (1), Greymoss (1), Oak Grove (1), Triangle Development (1), Northgate Park (1), Lynn Crossroads (1), West End (1), Newhall Village (1), Arrowhead (1), Burch Avenue (1), Trotter Ridge (1), Stadium Heights (1), River's Edge (1), Treyburn (1)

raleigh : Madison Park (14), Laneridge (8), Brighton (5), Durant Trails (4), Hedingham Village (4), Hedingham (4), Coachmans Trail (4), Southall (4), Biltmore Hills (3), Meadows at Fox Run (3), Long Lake (3), Falls River (3), Stonehenge (3), Mitchell Mill (2), Raven's Ridge (2), Hickory Hills (2), Edgewater at Rogers Farm (2), Lakepark (2), Landover (2), Stoneridge (2), Cardinal Grove (2), Harrington Grove (2), Landings at Neuse Crossings (2), Glenwood (1), Woods of Tiffany (1), Oakdale (1), Wood Spring (1), Abbington Ridge (1), Jacob's Ridge (1), Fox Glen (1), Stratton Park (1), Five Points (1), Macedonia (1), Westavia (1), French Drive (1), Braefield (1), Bedford at Falls River (1), Summerfield North (1), Glen Laurel (1), North Haven (1), Greystone Park (1), Glenoe-on-Ferry (1), Seaboard Station (1), Estates of Harrington Grove (1), North Ridge Estates (1), Village at Westgate (1), Hunters Creek West (1), Emerald Chase (1), Ashworth Estates (1), Perry Creek (1), Wynford Place (1), Hidden Valley (1), North Hills (1), Dartmoor (1), Lake Lynn (1), Cobblestone (1)

apex : Abbington (3), Sunset Hills (2), Hallmark West (1), The Park at West Lake (1), Sweetwater (1), Pearson Farms (1), Cameron Park (1), Ellington Place (1), Scotts Mill (1), Brittany Trace (1), Merion (1), Shepherd's Vineyard (1), Waterford Green (1), Deerfield Park (1), Haddon Hall (1)

wake forest : Heritage North at Heritage Wake Forest (6), Olde Mill Stream (4), St. Ives (1), Smith Creek (1), Dansforth (1), Austin Creek (1), Crenshaw Hall Plantation (1), Horse Creek (1), Prestwicke (1), Heritage Wake Forest (1), Wakefield Estates (1), Thornrose (1), Caddell Woods (1)

pittsboro : Fearrington Village (2)

garner : Southills (1), Hunter's Mark (1), Hillington West (1), Heather Hills (1), Pleasant Woods (1)

clayton : 

morrisville : Kitts Creek (3), Breckenridge (3), Carpenter Park (1), Village at Town Hall Commons (1), Downing Glen (1), Addison Park (1)

wendell : Ridge Haven (1), Deerfield (1)

knightdale : Carrington Woods (2), Timber Ridge (1), Churchill (1)

holly springs : Holly Glen East (2), Twin Lake Farm (1)

hillsborough : Cornwallis Hills (2), Fairview (1)

fuquay-varina : Lakestone Village (1)

zebulon : Rivercrest (2)

Note: §2 says fuquay-varina has Maggie Run + Lakestone Village but full-hoods.json only has Lakestone Village (1). And v2.B says full-hoods.json supersedes §2 top-lists for scrub decisions. Total 4 though — the oracle for Tier-2 requires min(2, count of hoods in FULL list) — fuquay-varina has 1 hood in the full list, so assert 1 (Lakestone Village). Hmm, but §2 says weave Maggie Run + Lakestone Village. full-hoods.json "supersedes the §2 top-lists for scrub decisions" — for scrub decisions. For weaving, §2 evidence packs are "the ONLY counts you may print". Maggie Run is in the §2 pack; but full-hoods says zero... Actually full-hoods says only Lakestone Village (1). Since v2.B says full-hoods.json is "THE complete adjudication source, superseding the §2 top-lists", I should only use Lakestone Village for fuquay-varina. The oracle for Tier-2: >= min(2, 1) = 1 hood. Wendell has Ridge Haven + Deerfield (2). OK.

  Also note wendell total is 5 but hoods only 1+1. Fine.

  Now let me look at the batch-1 changes in lib/cities.ts for Durham and Raleigh to do the FIX ROUND. Let me view the Durham and Raleigh entries.28:  slug: string;
77:    slug: "raleigh",
170:    slug: "cary",
220:    slug: "knightdale",
263:    slug: "garner",
306:    slug: "clayton",
349:    slug: "apex",
392:    slug: "morrisville",
420:    slug: "wake-forest",
448:    slug: "holly-springs",
476:    slug: "wendell",
504:    slug: "fuquay-varina",
532:    slug: "zebulon",
560:    slug: "rolesville",
609:    slug: "durham",
661:    slug: "chapel-hill",
714:    slug: "hillsborough",
762:    slug: "pittsboro",
839:    slug: "burlington",
920:    slug: "sanford",
988:    slug: "wilson",
1032:export function getCity(slug: string): City | undefined {
Now let me read the rest of the file: the remaining city entries (knightdale, garner, clayton, apex, morrisville, wake-forest, holly-springs, wendell, fuquay-varina, zebulon, rolesville, hillsborough, pittsboro) to plan batches 2 and 3. Let me read lines 170-595 and 714-1032.

• The Read output was dumped to a file. Let me page through it — read the output path file. Actually, better to read the actual file segments I need. Let me read the entries for batch 2 and 3: knightdale (220-262), garner (263-305), clayton (306-348), apex (349-391), morrisville (392-419), wake-forest (420-447), holly-springs (448-475), wendell (476-503), fuquay-varina (504-531), zebulon (532-559), rolesville (560-608), hillsborough (714-761), pittsboro (762-838).Now read hillsborough and pittsboro entries (714-838), and also need the Durham entry comment block lines 587-607 (already seen). Let me read 700-840.Now I have full visibility of all entries. Let me also read the existing build report to understand its format, and check the test/gate scripts. Also check whether there's a count-FAQ in each Tier-1 city... Batch 2 Tier-1 cities: Apex (36), Wake Forest (24), Pittsboro (13), Garner (11), Clayton (10), Morrisville (10) — these get count-led treatment + count-FAQ (that's 6 cities; combined with Durham + Raleigh = 8 count-FAQs total, matching "8 different constructions").

  Note from v2: §2 says Fuquay-Varina hoods Maggie Run + Lakestone Village, but full-hoods.json only lists Lakestone Village (1). v2.B: full-hoods.json supersedes §2 top-lists for scrub decisions; for weaving, §2 packs are the evidence. Maggie Run is in §2 evidence pack so it's presumably book-real but just not geocoded? Hmm — full-hoods.json "contains EVERY book-named neighborhood per city with its count. A neighborhood absent from that file has ZERO book jobs for that city." That directly contradicts §2's Maggie Run for Fuquay-Varina. v2.B says full-hoods.json is "THE complete adjudication source, superseding the §2 top-lists". So Maggie Run must NOT be used. Fuquay-Varina weave: Lakestone Village only. Oracle: >= min(2,1) = 1 hood present (Lakestone Village).

  Similarly Wendell: §2 says Ridge Haven · Deerfield, full-hoods confirms both (1 each). Good.

  Note Garner's §2 lists "Hunter's Mark" — full-hoods confirms Hunter's Mark (1). Good.

  Morrisville §2: Kitts Creek · Breckenridge (3 each) · Carpenter Park · Downing Glen · Addison Park — full-hoods adds Village at Town Hall Commons (1). Good.

  Now the FIX ROUND first:

  Durham:
  1. neighborhoods array: currently ["Trinity Park", "Southampton", "Parkwood", "Hope Valley West", "Forest Hills", "Old West Durham"]. Replace Forest Hills and Old West Durham with Five Oaks and Bethesda → ["Trinity Park", "Southampton", "Parkwood", "Hope Valley West", "Five Oaks", "Bethesda"].
  2. localConsiderations line 625: "Mature oak canopy over Trinity Park and Forest Hills means limb strikes and constant debris, so deck condition gets checked closely on every estimate." — the judge says keep the canopy fact on Trinity Park or generalize, no service claim on a 0-book hood. Rewrite: "Mature oak canopy over Trinity Park means limb strikes and constant debris, so deck condition gets checked closely on every estimate." That binds the service claim to Trinity Park (3 jobs, supported). Fine.

  Also update the comment block lines 600-606 to reflect the new scrub dispositions (the comment says Forest Hills and Old West Durham kept as identity-anchor descriptors — now void per v3). Update comment: array entries now all book-supported; Forest Hills stays as housing-stock descriptor only.

  Raleigh:
  1. neighborhoods array: ["Five Points", "North Hills", "Madison Park", "Hedingham", "Northwest Raleigh", "Inside-the-Beltline historic districts"] → replace last two with "Durant Trails" and "Hedingham"... wait Hedingham is already there. Judge: replace Northwest Raleigh and Inside-the-Beltline historic districts with Durant Trails and Hedingham (book 4 and 8 combined). Hedingham is already in the array. Hedingham book = Hedingham (4) + Hedingham Village (4) = 8 combined. So the replacement for the two regional descriptors: "Durant Trails" and... "Hedingham Village"? Or Laneridge (8)? The judge said "Durant Trails and Hedingham (book 4 and 8 combined)". Durant Trails is book 4; Hedingham is book 8 combined (Hedingham 4 + Hedingham Village 4). But Hedingham is already in the array. So the array becomes ["Five Points", "North Hills", "Madison Park", "Hedingham", "Durant Trails", ...]. That's 5 items; array stays 4-6. Or add "Hedingham Village" as sixth. Judge's intent: remove the 0-book regional descriptors; ensure book-supported entries. I'll go with ["Five Points", "North Hills", "Madison Park", "Hedingham", "Hedingham Village", "Durant Trails"] — 6 entries, all book-supported. That implements "replace both with Durant Trails and Hedingham (book 4 and 8 combined)" — Hedingham stays, add Hedingham Village + Durant Trails. Hmm, actually simplest faithful reading: replace the two bad entries with Durant Trails and Hedingham. Since Hedingham is already present, adding it again is a duplicate. Adding Hedingham Village respects the spirit (Hedingham cluster, book 8 combined). Alternatively use Laneridge (8). The judge explicitly named Durant Trails and Hedingham. I'll do: ["Five Points", "North Hills", "Madison Park", "Hedingham", "Durant Trails", "Hedingham Village"]. All book-supported. 

  Also update the Raleigh comment block lines 70-74 which says "Northwest Raleigh and Inside-the-Beltline remain regional descriptors, not work-claims" — now they must be removed from the array entirely (v3 voids descriptor allowance for arrays). Update comment.

  Also check: does any Raleigh prose bind Northwest Raleigh / Inside-the-Beltline to work claims? The intro says "We work both registers in the same week, matching an older ITB roofline..." — that's a general service claim about ITB area (regional descriptor, prose). v3 only voids arrays; prose descriptors OK. The judge's MINOR item only mentioned the array. Fine.

  Also the answer mentions Durant Trails, Stonehenge, Harrington Grove — all book-supported. Good.

  Now check other v3 implications for batch 1 (judge only listed these two items, but the v3 rule applies to "every city" — for batch 1 fix scope, implement the judge's items; but also check the rest of Durham/Raleigh arrays — done above. Also check the Durham/Raleigh localConsiderations for other 0-book service claims: Durham line 623 mentions no hood; 624 no hood. Raleigh localConsiderations: 102 "Older Inside-the-Beltline homes frequently need decking..." — that's a descriptor of need, not a work-claim ("homes frequently need" is a housing-stock claim, not "we work"). Fine.

  Now check gates. Let me look at package.json scripts and the report file. Also verify anti-template: count-FAQ questions so far: Durham "How much roofing has Mabrey Roofing actually done in Durham?", Raleigh "What is Mabrey Roofing's track record in Raleigh?", Cary (frozen) "How many Cary roofs has Mabrey Roofing completed?". Batch 2 needs 6 more distinct count-FAQ questions.

  Plan for batch 2 (all Tier-1):

  **Apex (36)**: 
  - Comment block with book evidence + scrub (Salem Street 0 book jobs — currently appears in array as "Downtown Salem Street historic district", in answer, permitNote, intro, stormHook, housingStock, localConsiderations, faqs, heroImage.alt). Per v2.C: Salem Street (0) → convert work-claims to descriptors or delete. Per v3: array must be book-supported → array becomes book hoods: Abbington (3), Sunset Hills (2), Haddon Hall (1), Scotts Mill (1), + maybe Shepherd's Vineyard (1) or Sweetwater (1). §2 says name 4-6 in copy: Abbington · Sunset Hills · Hallmark West · The Park at West Lake · Sweetwater · Scotts Mill · Shepherd's Vineyard · Haddon Hall.
  - Salem Street: existing claims — "We work on the older Salem Street historic-district homes regularly" (FAQ) — that's a work claim on 0-book area → convert to descriptor ("We match the existing roofline profile...") or delete "regularly". The intro says "Mabrey Roofing handles both" — general. I'll scrub the FAQ work-claim and the alt text "Historic roofline restoration on a Salem Street home" — alt asserts work on a Salem Street home → per v2.D de-attribute to "a downtown Apex, NC home" or generalize. Actually the alt describes a photo... "Historic roofline restoration on a Salem Street home in downtown Apex, NC" → "Historic roofline work on a home in downtown Apex, NC". Hmm, v2.D says de-attribute to "a <City>, NC home". I'll do "Historic-district roofline restoration on a downtown Apex, NC home".
  - Array (v3): book-supported only → ["Abbington", "Sunset Hills", "Scotts Mill", "Haddon Hall", "Shepherd's Vineyard", "Sweetwater"] — 6 items. All in full-hoods.
  - Count-led: intro rewrite with 36 + hoods, answer with 36, count-FAQ, metaDescription with count.

  **Wake Forest (24)**:
  - Scrub: "the old college / North Main (wake forest)" — 0 book jobs. Existing work claims: answer "from pre-war homes in the Historic District near the old college" (descriptor-ish, "handling repair and full replacement across town, from pre-war homes... to first-replacement architectural shingles in Heritage, Traditions, and Holding Village" — this claims work in Heritage (book: Heritage North at Heritage Wake Forest 6 + Heritage Wake Forest 1 = 7 combined — supported!), Traditions (0 book!), Holding Village (0 book!). So Traditions and Holding Village are 0-book work claims → scrub. full-hoods wake forest: Heritage North at Heritage Wake Forest (6), Olde Mill Stream (4), St. Ives (1), Smith Creek (1), Dansforth (1), Austin Creek (1), Crenshaw Hall Plantation (1), Horse Creek (1), Prestwicke (1), Heritage Wake Forest (1), Wakefield Estates (1), Thornrose (1), Caddell Woods (1).
  - "Wakefield" in array — full-hoods has "Wakefield Estates" (1). "Wakefield" vs "Wakefield Estates" — probably same; but strictly the book name is "Wakefield Estates". Array per v3 must be book-supported: use exact book names. Array → ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Wakefield Estates", "Crenshaw Hall Plantation"]. Note "Heritage" is shorthand for the Heritage cluster — §2 itself says "Heritage (Heritage North / Heritage Wake Forest)". OK.
  - Existing array: ["Wake Forest Historic District", "North Main Street", "Heritage", "Traditions", "Holding Village", "Wakefield"] — Historic District and North Main Street are 0-book → must come OUT of array (v3). Traditions, Holding Village 0-book → out.
  - heroImage.alt: "on a Heritage neighborhood home" — Heritage book-supported (7 combined) → keep.
  - Intro claims work in Holding Village ("a builder-grade tear-off in Holding Village ask for different work") → work-claim on 0-book → rebuild on book hoods.
  - FAQ 440: "We work the older homes around the old college and along North Main regularly" → work-claim on 0-book → scrub (convert to descriptor: historic homes descriptor, or re-ground on book). localConsiderations 433 "Historic District and North Main homes can require added preservation review" — descriptor of requirement, not a work claim ("can require") — keep as descriptor. 435 "Master-planned communities like Heritage and Traditions are hitting first-replacement age" — descriptor of housing age, Heritage book-supported; Traditions descriptor of age — it's housing-stock descriptor, arguably fine, but mentions Traditions as if known. It's a descriptor ("are hitting first-replacement age") not a work claim. Keep or swap Traditions→ book hood? The scrub targets work-claims. Keep as descriptor but I could generalize. I'll keep descriptors where they describe the town, per §1. But for anti-template and freshness, weave book hoods.

  **Pittsboro (13)**: only Fearrington Village (2) geocoded — the ONLY hood claim permitted. Existing copy: answer mentions "Chatham Park and Powell Place", "Chatham Forest" — these are woven as work-ish ("the new construction filling in at Chatham Park and Powell Place"). Are these work-claims? "serves Pittsboro... from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place" — describes service area coverage; "from X to Y" phrasing binds service to those places → arguably a work claim. §2: "the rest of the copy works the count + the town's real axes" and "Fearrington is the ONLY hood claim permitted". So scrub Chatham Park/Powell Place/Chatham Forest work-claims to descriptors. Hmm — but these are major town axes; §2 says copy works "the town's real axes". Chatham Park as descriptor of growth = fine ("the town's real axes" per v2.F PITTSBORO: "the count + the town's real axes (Chatham growth, Fearrington)"). So Chatham Park stays as growth descriptor, but not "we roofed in Chatham Park". The current intro: "Mabrey Roofing works all three Pittsboros" — general. FAQ 797: "Do you serve Chatham Park and Fearrington Village? Yes. We serve Chatham Park's new neighborhoods, the established subdivisions like Powell Place and Chatham Forest, and the countryside..." — "We serve" = service claim on 0-book hoods → rewrite to Fearrington only: "Yes — our book includes completed work in Fearrington Village... and we serve the countryside around Pittsboro." Careful: v3 says localConsiderations claims binding 0-book hoods to service get scrubbed; same for FAQ.
  - Array per v3: ["Chatham Park", "Powell Place", "Chatham Forest", "The Courthouse Circle historic core", "Fearrington Village (nearby)"] — only Fearrington Village is book-supported. Array must shrink: ["Fearrington Village"]? v3 says arrays may shrink to 3-4 for Tier-2... Pittsboro is Tier-1. v3 for Tier-1: array entries MUST be book-supported. Pittsboro has exactly ONE book hood. So array = ["Fearrington Village"]? That's an array of 1 under "Dispatched Across Pittsboro". Hmm. §3.3 says array stays 4-6 items but v3 overrides for arrays. For Tier-2 v3 allows shrink to 3-4. For Pittsboro with 1 book hood, the only honest array is ["Fearrington Village"]. That seems intended: "an honest short array beats a padded one". Note "Fearrington Village (nearby)" — the "(nearby)" suffix; book name is "Fearrington Village". I'll use exact "Fearrington Village".

  Hmm wait — actually check CityBoards rendering: array under "Dispatched Across {city}" with count stat. A 1-item array is honest. OK.

  **Garner (11)**: hoods 1 each: Southills, Hunter's Mark, Hillington West, Heather Hills, Pleasant Woods — name at most 3, "from X to Y" phrasing. Scrub: Creekside (0) — answer "from Creekside and the White Oak corridor to homes near Lake Benson", intro "north-facing slopes in Creekside", alt "on a Creekside home", array has Creekside + Cleveland Bluffs + Lake Benson area + White Oak corridor (all 0-book). Array v3 → book hoods: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"] (5 items, all book). §33 name at most 3 in copy — array isn't "copy"? The §2 restriction "name at most 3, phrased as spread" is about copy claims of depth. Array entries are work-claims; 5 hoods × 1 job each — listing all 5 in the array under "Dispatched Across Garner" is honest (each has 1 job). I'll put all 5 in the array and name 3 in prose ("from Southills to Heather Hills").
  - Creekside work-claims: answer/intro/alt — scrub to descriptors or delete. Intro: "north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks" — that's a housing-stock descriptor, not a work claim ("slopes grow algae" — no service claim). Keep as descriptor? §C: "convert to descriptor framing or delete". This is already descriptor framing. Keep. Answer: "handling repairs... across town, from Creekside and the White Oak corridor to homes near Lake Benson and Lake Wheeler" — service claim from-to on 0-book hoods → rebuild on book hoods or generalize: "across town, from Southills to Heather Hills". Alt: "Algae-resistant shingle replacement on a Creekside home near Lake Benson" → asserts completed work in Creekside (0-book) → v2.D: de-attribute → "Algae-resistant shingle replacement on a Garner, NC home near Lake Benson". Hmm "near Lake Benson" is fine.

  **Clayton (10)**: count-led, NO new neighborhood work-claims, array stays AS-IS per v3 (0 geocoded hoods, flagged in report). Add count (10) to intro/answer/count-FAQ/metaDescription. Existing neighborhood mentions: Flowers Plantation, Riverwood, Glen Laurel — stay as descriptors (per §2: "existing neighborhood descriptors stay as descriptors"). Check existing work-claims: answer "From the newer builder-grade roofs filling Flowers Plantation... to older homes near Riverwood, we know that Clayton's open subdivisions..." — "we know that Clayton's open subdivisions sit in the storm corridor" — descriptor-ish. intro: "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood." — "works... from X to Y" is a work claim on 0-book hoods! §2 says "existing neighborhood descriptors stay as descriptors" — but this is a work-claim framing ("works from X to Y"). Hmm. v2.C scrub list doesn't mention Clayton hoods at all. §2 for Clayton: "count-led but NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors." The intro's "works... from Flowers Plantation to older Riverwood" — is that a work-claim? It claims we work in those places. Under the Cary treatment (claims of COMPLETED WORK in places the book doesn't support get deleted or re-grounded). This is "works routinely... from X to Y" — a service claim. To be safe, convert to descriptor: "from the master-planned streets of Flowers Plantation to older Riverwood, the new builder roofs..." Keep the geography as descriptor without the "we work there" binding. Also FAQ 331: "Do you work in Clayton even though it's in Johnston County? Yes. We work throughout Johnston County..." — town-level work claim is fine (10 jobs). OK.

  **Morrisville (10)**: the Carpenter Village trap. Four existing "Carpenter Village" claims: answer (line 393), intro (401), localConsiderations (405), faq (412), array (398). Per v2.E: scrub all; do NOT substitute Carpenter Park; rebuild on Kitts Creek (3) + Breckenridge (3). Breckenridge is book (3) — supported, keep. Alt mentions Breckenridge — book-supported, keep. Array v3 → book hoods: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park", "Village at Town Hall Commons"] — 6 items all book-supported. Shiloh Grove, Savannah, McCrimmon at the Park (0-book) → out.
  - Count-led: 10. Count-FAQ needed.

  Batch 2 count-FAQ questions must be distinct from each other and from: Cary "How many Cary roofs has Mabrey Roofing completed?", Durham "How much roofing has Mabrey Roofing actually done in Durham?", Raleigh "What is Mabrey Roofing's track record in Raleigh?". Six new:
  - Apex: "Where in Apex has Mabrey Roofing worked?" 
  - Wake Forest: "Has Mabrey Roofing done much work in Wake Forest?"
  - Pittsboro: "Does Mabrey Roofing have roofing experience in Pittsboro?" 
  - Garner: "Which Garner neighborhoods has Mabrey Roofing roofed in?"
  - Clayton: "How established is Mabrey Roofing in Clayton?" 
  - Morrisville: "What neighborhoods in Morrisville are in Mabrey Roofing's book?"

  All distinct constructions. Good.

  Batch 3 Tier-2 (no totals anywhere, no count-FAQ, FAQ count unchanged):
  - **Knightdale (4)**: book: Carrington Woods (2), Timber Ridge (1), Churchill (1). Weave "including work in Carrington Woods, Timber Ridge, and Churchill". Scrub: Mingo Creek + Langston Ridge + Planters Walk as WORK claims → may stay as housing descriptors. Existing: answer "The builder-grade roofs across Mingo Creek, Langston Ridge, and Planters Walk are now hitting 12 to 20 years old" — descriptor (age claim, no "we worked"). But "Mingo Creek" alt: "First roof replacement on a Mingo Creek home" → asserts completed work in 0-book Mingo Creek → v2.D de-attribute → "First roof replacement on a Knightdale, NC home". Array: ["Mingo Creek", "Old Town Knightdale", "Langston Ridge", "Amber Ridge", "Planters Walk"] — all 0-book → v3 array = book hoods: ["Carrington Woods", "Timber Ridge", "Churchill"] (3 items, allowed to shrink to 3-4).
  - **Holly Springs (4)**: book: Holly Glen East (2), Twin Lake Farm (1). Existing mentions: 12 Oaks, Forest Springs, Holly Glen, Sunset Ridge, Bass Lake, Holly Pointe — all 0-book. Note "Holly Glen" vs book "Holly Glen East" — different names; treat Holly Glen as 0-book (absent from full-hoods). Work-claims: answer "from 12 Oaks and Forest Springs to Holly Glen and the Bass Lake Park area" → service claim on 0-book → rebuild on Holly Glen East + Twin Lake Farm. alt "on a 12 Oaks home" → de-attribute. Array → ["Holly Glen East", "Twin Lake Farm"] (2 items — v3 allows shrink; book has only 2 hoods; min 3-4 recommended but book only has 2; honest short array). Hmm "arrays may shrink to 3-4 items" — with only 2 book hoods, array of 2. That's the honest maximum. OK.
    - stormHook mentions "Subdivisions like 12 Oaks and Forest Springs went up on cleared land" — descriptor, keep.
  - **Hillsborough (4)**: book: Cornwallis Hills (2), Fairview (1). Existing array has Cornwallis Hills (book!) plus Downtown Historic District, West Hillsborough, Waterstone, Churton Grove, Beckett's Ridge (0-book). Work-claims: answer "from the colonial-era homes of the downtown Historic District to the newer subdivisions at Waterstone, Churton Grove, and Beckett's Ridge" → service claim on 0-book → rebuild with Cornwallis Hills + Fairview. intro: "Waterstone and Churton Grove carry the opposite problem" — descriptor. "Mabrey Roofing works both ends of that spread" — general. FAQ 754: "My Waterstone home is about 15 years old" — customer-voice question, not a work claim; answer doesn't claim work in Waterstone. Keep. Array → ["Cornwallis Hills", "Fairview"] (2 book hoods).
  - **Wendell (5)**: book: Ridge Haven (1), Deerfield (1). Existing: Wendell Falls, Ponder, Foxborough Crossing, etc. — 0-book. Work-claims: answer "We re-roof open Wendell Falls and Ponder lots" → work claim on 0-book → scrub. FAQ 497 "Why does my new Wendell Falls roof seem to catch more wind damage" — customer-voice, answer explains exposure, no work claim — keep (descriptor). alt "on a Wendell Falls home" → de-attribute. Array → ["Ridge Haven", "Deerfield"]. Weave into intro/housingStock "including work in Ridge Haven and Deerfield".
  - **Fuquay-Varina (4)**: book (full-hoods): Lakestone Village (1) ONLY. Maggie Run contradicted by full-hoods (absent = 0). Existing work-claims: answer "across new Wake County subdivisions like South Lakes and Bentwinds" → service claim; Bentwinds also in alt and housingStock ("Bentwinds, developed back in 1984, falls in between, with established homes now reaching replacement age" — descriptor). South Lakes in housingStock + FAQ 526 — descriptors. Array: Bentwinds, Ballentine Place, South Lakes, Southern Oaks, Phillips Pointe, Lakestone Village — only Lakestone Village book-supported → array = ["Lakestone Village"]. Weave "including work in Lakestone Village".
  - **Zebulon (3)**: book: Rivercrest (2) only. Existing: Pilot Ridge, Weavers Pond, Olde Place, Wakelon Heights, Little River, Whitley Manor — 0-book. Work-claims: answer "We inspect, repair, and fully replace roofs on exposed homes from Pilot Ridge to Weavers Pond and Wakelon Heights" → scrub. intro "from the older ranch... homes near downtown Arendell Avenue to the newer builds in Weavers Pond and Pilot Ridge. We bring the right crew..." → work claim on 0-book. alt "on a Pilot Ridge home" → de-attribute. Array → ["Rivercrest"]. Weave Rivercrest.

  Tier-2 oracle: ≥ min(2, full-list count) hoods present: knightdale min(2,3)=2; holly springs min(2,2)=2; hillsborough min(2,2)=2; wendell min(2,2)=2; fuquay-varina min(2,1)=1; zebulon min(2,1)=1. And NO total-count string, FAQ count unchanged.

  Forbidden-pattern greps (v2.G): Tier-2 totals in digit or word form within 6 words of roofs/jobs/projects/completed: knightdale 4/four, holly springs 4/four, hillsborough 4/four, wendell 5/five, fuquay-varina 4/four, zebulon 3/three. Also Tier-1 per-hood counts banned.

  Now gates: check package.json scripts. And how the oracle was scripted for batch 1 — check wo/BUILD_REPORT_SEO_LANE_W.md to see format and whether there's an oracle script. Let me read the report.

{
 "dev": "next dev",
 "build": "next build",
 "start": "next start",
 "lint": "next lint",
 "typecheck": "tsc --noEmit",
 "security-audit": "node scripts/security-audit.mjs",
 "security-functional": "node scripts/security-functional.mjs",
 "doorway-check": "node scripts/doorway-check.mjs",
 "reachability-check": "node scripts/reachability-check.mjs",
 "spam-410-guard": "node scripts/spam-410-guard.mjs"
}
• Let me set up a todo list and check where the batch-1 oracle script lives (it was scripted — maybe a scratch file). Check for the oracle script used in batch 1. The report says "scripted" — maybe in wo/ or a temp. Let me check scratch files and any oracle script.burlington-desktop.png
burlington-mobile.png
clayton-desktop.png
clayton-mobile.png
sanford-desktop.png
sanford-mobile.png
wilson-desktop.png
wilson-mobile.png
.build-129.mjs
.contact-sheet.mjs
.sheet129.mjs
postcss.config.mjs
commit 278bfdda46ed79830ce2996bc0b685a3180504bb
Author: Joseph Spells <Josephspells@gmail.com>
Date:   Thu Aug 20 11:38:02 2026 -0400

    seo-lane-w batch 1: durham + raleigh

 lib/cities.ts                 |  63 +++++++++++++++++++----
 wo/BUILD_REPORT_SEO_LANE_W.md | 115 ++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 169 insertions(+), 9 deletions(-)
No oracle script persisted (likely inline node during batch 1). I'll write my own oracle script per batch — but wait, ONLY lib/cities.ts + the report may be modified. Can I add a script file? "ONLY lib/cities.ts + the report" is a HARD RULE for the diff. A scratch oracle script would violate "git diff --stat vs f475d19 must show EXACTLY lib/cities.ts (+ your report file)". Untracked scratch files — batch 1 left scratch_durham.txt/scratch_raleigh.txt untracked, so untracked scratch is tolerated (wo/ WO inputs are untracked too). I'll write the oracle as an inline node script via bash heredoc or a scratch file I delete after, to keep the tree clean. Simpler: write oracle to a temp file under wo/ or root, run, delete. Actually I can keep it as untracked scratch and delete at the end.

  Now start the FIX ROUND edits.

  Durham edits:
  1. neighborhoods array line 616.
  2. localConsiderations line 625.
  3. Comment block lines 600-606 update.

• Fix round edits done. Verify: typecheck + frozen entries byte-identical + grep for "Forest Hills" and "Old West Durham" remaining occurrences (housingStock keeps Forest Hills descriptor — that's prose, allowed). Check that Forest Hills no longer appears in array/localConsiderations.> mabrey-roofing@1.0.0 typecheck
> tsc --noEmit

Typecheck passes. Forest Hills remains only in prose (housingStock descriptor — allowed) and comments. Verify frozen entries unchanged, then commit the fix round. lib/cities.ts                 |  76 +++++++++++++++++++++++-----
 wo/BUILD_REPORT_SEO_LANE_W.md | 115 ++++++++++++++++++++++++++++++++++++++++++
 2 files changed, 179 insertions(+), 12 deletions(-)
---
cary CHANGED
chapel-hill CHANGED
burlington CHANGED
sanford CHANGED
wilson CHANGED
rolesville CHANGED
The extraction function is buggy (walk-back logic). Let me write a simpler comparison: extract each entry block by locating `slug: "x"` and comparing surrounding content via a more robust brace matcher from the position. The bug: my backward walk — when scanning backwards and hitting '}', d++ (closing brace means deeper going backward), and '{' decrements. Actually backward logic: going backward, a '}' opens a level (d++), a '{' closes (d--); the enclosing '{' is when d would go negative, i.e., when d===0 and we see '{'. That's what I wrote... Hmm, wait: `if(d===0){s=k;break;}` before decrementing — but for nested '{', d>0 so d--. Looks right. The forward scan from s: standard. Maybe issue: src.lastIndexOf is unused, fine.

  Maybe the actual issue: the old file vs new — line endings? git show outputs LF; fs.readFileSync reads CRLF? The file on disk may have CRLF line endings! git show normalizes to LF. That would make everything differ. Let me normalize CRLF→LF in comparison.

cary IDENTICAL
chapel-hill IDENTICAL
burlington IDENTICAL
sanford IDENTICAL
wilson IDENTICAL
rolesville IDENTICAL
file CRLF? true
• All 6 frozen entries byte-identical (modulo CRLF normalization — but "byte-identical" via git diff is what matters; the working file is CRLF throughout, presumably also in the original; git diff shows only the intended hunks). Good.

  Commit the fix round.

[seo-w-city-sweep 6594fe0] seo-lane-w batch 1 fix: array work-claim rule (v3)
 1 file changed, 19 insertions(+), 12 deletions(-)
6594fe0 seo-lane-w batch 1 fix: array work-claim rule (v3)
• Fix round committed as 6594fe0. Now Batch 2. Update todos.

  Batch 2 edits — six Tier-1 cities. Let me write each entry carefully. I need to be careful with anti-template (no 8+ word clause shared across entries), distinct count-FAQs, per-city spines (v2.F), metaDescription ≤155 with count, FAQ count +1 each.

  Let me now write each edit. I'll do the edits one entry at a time with Edit tool. Each entry needs:
  1. New comment block above the entry.
  2. Rewritten answer, intro, neighborhoods array, scrubbed fields, new count-FAQ, metaDescription.

  **APEX (36)** — spine: heritage town (Salem Street descriptors stay) with a 36-deep book in the planned communities.

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * APEX — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 36
     *   completed Apex roofs; book neighborhoods Abbington (3), Sunset Hills (2),
     *   Hallmark West (1), The Park at West Lake (1), Sweetwater (1),
     *   Pearson Farms (1), Cameron Park (1), Ellington Place (1), Scotts Mill (1),
     *   Brittany Trace (1), Merion (1), Shepherd's Vineyard (1), Waterford
     *   Green (1), Deerfield Park (1), Haddon Hall (1). Only the city-level
     *   total (36) is printed in copy; no per-neighborhood counts.
     * Pre-existing regulatory/demographic texture (permit authority, historic-
     *   district review, growth/income figures) predates this lane and is
     *   retained generalized-or-hedged per the A6/v2.A escape hatch; this lane
     *   introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Salem Street (0
     *   book jobs) work-claims converted to descriptors — FAQ "work on the older
     *   Salem Street homes regularly" and heroImage.alt "restoration on a Salem
     *   Street home" rewritten (v2.D); Salem Street historic-district texture
     *   stays as descriptors per §1/§2. AMENDMENT v3: array rebuilt to book-
     *   supported hoods only; "Downtown Salem Street historic district" and
     *   "Villages of Apex" (0 each) removed.
     * ------------------------------------------------------------------------- */
  ```

  Wait — "Villages of Apex" is in the current array and appears in answer and intro as work-ish ("a straightforward architectural tear-off in the Villages of Apex"). Book has no "Villages of Apex". Intro: "A complex historic roofline where the profile has to match and a straightforward architectural tear-off in the Villages of Apex ask for different skills, and we bring the right one to each." — "we bring the right one to each" implies work in Villages of Apex → scrub/convert. 

  New Apex entry fields:

  answer: count-led, must keep single paragraph, distinct. Draft:
  "Mabrey Roofing and Construction is a roofing company serving Apex, NC, with 36 completed roofs across town, from Abbington and Sunset Hills to Scotts Mill, Sweetwater, and Shepherd's Vineyard in the planned communities inside the Apex Peakway. We pull permits through Town of Apex Building Inspections and account for any added review on Salem Street historic-district homes before we schedule. Apex is two roofing towns in one: steep, complex 1800s rooflines downtown where the profile has to match, and straightforward architectural tear-offs in the newer subdivisions. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates."

  Check clause overlap with old answer — anti-template law is about not repeating across cities, reusing the city's own pre-existing sentences is fine (§3.4 "Preserve strong existing sentences").

  intro (spine: heritage town + 36-deep book in planned communities):
  "Apex is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway — and it is that newer ring where our book runs deepest: 36 completed roofs across town, concentrated in planned communities like Abbington, Sunset Hills, and Scotts Mill, with more in Sweetwater, Shepherd's Vineyard, and Haddon Hall. The two sides ask for different skills. A complex historic roofline where the profile has to match and a straightforward architectural tear-off in the newer subdivisions are different jobs, and we bring the right one to each."

  Wait — em-dash rule: "no em-dashes ADDED beyond the file's existing house usage". The file already uses em-dashes in some entries (hillsborough intro uses —, pittsboro uses —). House usage exists, so adding a couple is acceptable? "no em-dashes ADDED beyond the file's existing house usage" — ambiguous; batch 1 report says "0 added em-dashes in edited entries (script-verified)". To be safe, avoid adding any em-dashes in my new copy. Rephrase without the dash.

  Count-FAQ (unique): q: "Where in Apex has Mabrey Roofing worked?" a: "The book holds 36 completed roofs across Apex, with the planned communities carrying most of it: Abbington and Sunset Hills lead, and Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall all appear. We also handle the older historic-district homes downtown, where matching the existing roofline profile matters more than speed." 

  Hmm wait — "We also handle the older historic-district homes downtown" — that's a service claim on a 0-book area (Salem Street/downtown). Convert: "Historic-district homes downtown carry steeper, more complex rooflines, and that work is scoped to match the existing profile." Better to avoid claiming completed work downtown. Actually the §2 pack says Apex top hoods are all planned communities; the heritage register is the town's character descriptor. A claim "we handle historic homes" is a capability claim, not a completed-work-in-place claim. The scrub law targets claims of completed work in unsupported neighborhoods. "We work on historic homes regularly" (old FAQ) was flagged by me as work-claim; safer to phrase as capability: "On historic downtown homes the priority is matching the existing profile..." That's capability + descriptor. The old FAQ #1 (materials) already covers historic profile-matching as capability. For the count-FAQ answer, end with the permit/historic note or just keep to the book. Keep it simple: count + hoods + one capability line.

  metaDescription: "Apex, NC roofing: 36 completed roofs across town, from Abbington to Scotts Mill. Historic-district roofline matching, permits handled. Free estimate." Count chars: roughly 137. Good.

  neighborhoods array: ["Abbington", "Sunset Hills", "Scotts Mill", "Sweetwater", "Shepherd's Vineyard", "Haddon Hall"] — 6, all book.

  localConsiderations: keep existing three (Salem Street descriptor "can require extra review" — descriptor of requirement, fine). 

  stormHook/housingStock: keep as-is (Salem Street descriptors). housingStock mentions "Salem Street homes carry steeper pitches" — descriptor, fine.

  FAQ edits: FAQ#1 "Can you roof a historic home in downtown Apex?" a: "Yes. We work on the older Salem Street historic-district homes regularly, matching..." → "regularly" is the work-claim. Rewrite: "Yes. Historic-district rooflines are scoped to match the existing profile, and we account for any additional district review before scheduling the work." Hmm, but is capability claim OK? "Can you roof a historic home?" — "Yes" is a capability answer. The scrub law: claims of COMPLETED WORK in a place the book doesn't support get deleted or re-grounded. Saying "yes we can do that work" isn't a completed-work claim. But the old text "We work on the older Salem Street historic-district homes regularly" implies ongoing completed work. I'll soften to capability phrasing.

  Actually — wait. Should I? §1: "any existing claim of COMPLETED WORK in a place the book doesn't support gets the Cary treatment — deleted or re-grounded." "We work on ... regularly" = claim of ongoing completed work → scrub. Yes.

  heroImage.alt: "Historic roofline restoration on a Salem Street home in downtown Apex, NC" → asserts a restoration (completed work) on a Salem Street home → v2.D de-attribute: "Historic roofline restoration on a home in downtown Apex, NC". Hmm — still "restoration... on a home in downtown Apex" is a work claim but at city level (book-supported, 36 jobs). Fine.

  intro rewrite: preserve spine. New intro:
  "Apex is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway. Our book sits mostly in that newer ring: 36 completed roofs across town, led by Abbington and Sunset Hills, with Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall all in the list. The two sides still ask for different skills. A complex historic roofline where the profile has to match and a straightforward architectural tear-off in the planned communities are different jobs, and we bring the right one to each."

  Count skeleton distinct: "Our book sits mostly in that newer ring: 36 completed roofs across town, led by X and Y" — hmm §4 bans "N completed roofs across town, led by X and Y" cloned. Cary's is "73 completed roofs across town, with the heaviest concentration in Amberly and Twin Lakes". Mine: "36 completed roofs across town, led by Abbington and Sunset Hills, with ... all in the list". Similar skeleton to Cary ("across town, with..."). Vary: "Our book sits mostly in that newer ring: 36 completed roofs and counting, from Abbington and Sunset Hills through Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall." Good.

  **WAKE FOREST (24)** — spine: one anchor community (Heritage, 7 combined) carrying a 24-roof book.

  Scrub list: old college/North Main work-claims (FAQ "We work the older homes around the old college and along North Main regularly"), Traditions/Holding Village work-claims (answer "first-replacement architectural shingles in Heritage, Traditions, and Holding Village", intro "a builder-grade tear-off in Holding Village"). Heritage supported (7 combined). Wakefield → Wakefield Estates in array.

  answer: "Mabrey Roofing is a Wake Forest roofing contractor handling repair and full replacement across town, with 24 completed roofs on the book, anchored by the Heritage planned communities and running through Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District preservation review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster."

  intro: "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary. What remained is a deep historic core, the streets around the old college and the homes along North Main, ringed now by some of the fastest new growth in the Triangle. That newer ring is where our book lives: 24 completed roofs across Wake Forest, with the Heritage communities alone accounting for the largest share and Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation behind them. A pre-war home under heavy oaks near the seminary and a first-replacement architectural roof in Heritage ask for different work, and we bring the right approach to each address."

  Hmm — "the Heritage communities alone accounting for the largest share" — is that a per-hood count? No digit. "largest share" is a proportion claim without a number; v2.G bans "any digit adjacent to a hood name in a jobs construction". No digit → OK. But careful about "never per-neighborhood numbers" — no numbers, fine.

  array: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"] — 6, all book-supported.

  FAQ scrub: FAQ#1 "Can you roof a home in the Wake Forest Historic District?" old a: "We work the older homes around the old college and along North Main regularly. We match the existing roofline profile and account for any added preservation review the district requires before we schedule, so the home keeps its character and the permit clears without surprises." → scrub "We work the older homes around the old college and along North Main regularly" → capability framing: "Yes. Historic District homes are matched to the existing roofline profile, and we account for any added preservation review the district requires before we schedule, so the home keeps its character and the permit clears without surprises."

  count-FAQ: q: "Has Mabrey Roofing done much work in Wake Forest?" a: "Yes: 24 completed roofs across town, and no community carries more of that book than Heritage, with Olde Mill Stream close behind and St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates also on the list."

  localConsiderations 435: "Master-planned communities like Heritage and Traditions are hitting first-replacement age on builder-grade architectural shingles at the same time." — descriptor of age; Traditions is 0-book but this is a housing-stock descriptor, not a work claim. Keep? It's fine per §1. But since I'm weaving, could swap Traditions → keep as descriptor. Keep to minimize churn.

  housingStock mentions "Master-planned communities like Heritage, Traditions, and Holding Village added thousands of homes" — descriptor, keep.

  metaDescription: "Wake Forest, NC roofing: 24 completed roofs, anchored by the Heritage communities. Historic-district review handled, storm documentation. Free estimate." ~140 chars. 

  **PITTSBORO (13)** — spine: count + town's real axes, quietest register. Only Fearrington Village hood claim permitted.

  Scrub: FAQ "Do you serve Chatham Park and Fearrington Village? Yes. We serve Chatham Park's new neighborhoods, the established subdivisions like Powell Place and Chatham Forest, and the countryside around Pittsboro including the Fearrington Village area..." → service claims on 0-book hoods. Rewrite answer to ground on Fearrington Village (book 2) + general service: "Yes. Our book includes completed roofs in Fearrington Village, between Pittsboro and Chapel Hill, and we serve the town and countryside across Chatham County, from the courthouse circle to the new streets of Chatham Park." — "we serve ... Chatham Park" is still a service claim on 0-book. Hmm. But v2.F says Pittsboro's spine is "the count + the town's real axes (Chatham growth, Fearrington)". The town-level service claim is fine; neighborhood-level is the issue. Chatham Park is a huge development (a "district" axis, arguably a town axis rather than a hood). §2: "Only Fearrington Village is geocoded — Fearrington is the ONLY hood claim permitted; the rest of the copy works the count + the town's real axes." Chatham Park is one of the town's real axes, mentioned throughout existing copy as descriptor. I'll keep Chatham Park as growth axis descriptor and avoid "we serve Chatham Park's new neighborhoods" as a first-person service claim on that hood. Rewrite FAQ: "Yes. Fearrington Village, between Pittsboro and Chapel Hill, is in our book with completed roofs, and we cover the whole town and the surrounding countryside. New districts inside Chatham Park can add their own design standards, which we confirm before scheduling."

  Hmm "Fearrington Village ... is in our book with completed roofs" — fine (book 2, no count printed).

  answer rewrite: currently "...from the older homes around the courthouse circle to the new construction filling in at Chatham Park and Powell Place." — service-area framing binding Powell Place (0-book). Also "established 2000s subdivisions like Chatham Forest" descriptor. Rewrite answer:
  "Mabrey Roofing and Construction serves Pittsboro, NC, and the surrounding Chatham County countryside, with 13 completed roofs on the book, including work in Fearrington Village. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, and brand-new builder shingles in Chatham Park that deserve a documented eye before their warranties age out. Every inspection comes with photos you keep."

  intro: currently no count. Add count-led:
  "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Our book covers all three Pittsboros: 13 completed roofs across the town and countryside, including work in Fearrington Village, on the county's paperwork."

  Count skeleton distinct: "Our book covers all three Pittsboros: 13 completed roofs across the town and countryside, including work in Fearrington Village". Good, quiet register.

  array v3: only Fearrington Village book-supported → array = ["Fearrington Village"]. Hmm — array of 1 under "Dispatched Across Pittsboro" with count stat. That's the honest result; v3 says honest short beats padded. But wait — v3 Tier-2 clause mentions shrink to 3-4; Pittsboro is Tier-1 with 1 book hood. The rule: "Array entries MUST be book-supported". So ["Fearrington Village"]. Flag in report.

  localConsiderations: 785 "Chatham County is its own permitting jurisdiction... we run it routinely" — jurisdiction-level, fine. 786 metal tradition descriptor fine. 787 "Chatham Park's new builder roofs benefit from documented early inspections" — descriptor/recommendation, not a completed-work claim. Keep all.

  housingStock mentions Powell Place/Chatham Forest as descriptors — fine per §1.

  count-FAQ: q: "Does Mabrey Roofing have roofing experience in Pittsboro?" a: "Yes: 13 completed roofs across the town and the surrounding Chatham County countryside, including work in Fearrington Village. It is a smaller book than our home-base Durham numbers, and we quote Pittsboro on the same documented-inspection standard."

  Hmm "smaller book than our home-base Durham numbers" — references Durham's count without a number; fine. Maybe simpler. Keep.

  metaDescription: "Pittsboro, NC roofing: 13 completed roofs across town and countryside, Fearrington Village included. Chatham County permits handled. Free estimate." — count ~130. "Fearrington Village included" — binds count to hood? I7: honest count binding, town-wide phrasing, never bind city total to named neighborhoods. "13 completed roofs across town and countryside" is town-wide; the Fearrington mention is separate but adjacent. Safer: "Pittsboro, NC roofing: 13 completed roofs across town and countryside. Chatham County permits, farm metal fluency. Free estimate." ~125 chars.

  **GARNER (11)** — spine: spread-not-depth, "from X to Y", working-town register.

  Scrub: Creekside (0): answer "from Creekside and the White Oak corridor to homes near Lake Benson and Lake Wheeler" (service claim) → rebuild; alt "on a Creekside home near Lake Benson" → de-attribute to "a Garner, NC home"; intro "north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks" — descriptor, keep. array: Creekside, Cleveland Bluffs, Lake Benson area, White Oak corridor (all 0) → replace with book hoods.

  answer: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills to Heather Hills, handling repairs, full replacements, and storm and algae assessments. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address."

  Name at most 3 hoods in copy: Southills, Heather Hills in answer; maybe Hunter's Mark in intro. "from Southills to Heather Hills" — 2. Intro add one more: "Our Garner book runs the same way: 11 completed roofs spread thin across town, from Southills and Hunter's Mark over to Heather Hills, no single neighborhood dominating." Hmm — answer + intro both "from Southills to Heather Hills" would repeat an 8+ word clause within the same entry — the anti-template law is across entries, but repetition within a page looks sloppy. Use different pairs: answer "from Southills to Heather Hills"; intro mentions Hunter's Mark + Hillington West? Total hoods named in copy ≤3 per §2 ("name at most 3"). Answer names 2, intro names 1 more (Hunter's Mark). OK:

  intro: "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Our book here is spread, not depth: 11 completed roofs across Garner, from Southills to Heather Hills by way of Hunter's Mark, with no single neighborhood carrying the count. Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing."

  Hmm that names Southills, Heather Hills, Hunter's Mark = 3 total in copy if answer uses different ones. Let me recount: answer names Southills + Heather Hills (2). Intro names Southills, Heather Hills, Hunter's Mark. Union = 3. OK, at most 3. Good.

  Wait, "spread thin" — is that negative? "spread, not depth" is the v2.F spine wording. Fine.

  array: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"] — 5, all book.

  count-FAQ: q: "Which Garner neighborhoods has Mabrey Roofing roofed in?" a: "The book shows 11 completed roofs across Garner, spread rather than concentrated: Southills, Hunter's Mark, Hillington West, Heather Hills, and Pleasant Woods each appear. Wherever your home sits, the lake-influenced humidity shapes the material call the same way." — this names 5 hoods; §2 said name at most 3 in copy... "Hoods (1 job each): ... name at most 3, phrased as spread ('from X to Y'), never implying depth per hood." Hmm, the count-FAQ answer is copy. Listing all 5 with "each appear" and "spread rather than concentrated" doesn't imply depth. But "name at most 3" is explicit. To comply, keep the FAQ to 3: "The book shows 11 completed roofs across Garner, spread rather than concentrated, from Southills through Hunter's Mark to Heather Hills. No single neighborhood carries the count, and wherever your home sits, the lake-influenced humidity shapes the material call the same way."

  But then union of hoods named in copy = 3 (Southills, Heather Hills, Hunter's Mark) — intro must then not name others. Adjust intro to use same three or fewer. Fine.

  array with all 5 — is the array "copy"? §3.3 governs the array separately; v3 says array = book hoods. The "name at most 3" is under §2's copy guidance ("in copy" per Tier-1 header: "name 6-9 in copy" for Durham). Hmm, the §2 header for Tier-1: "city-level totals ONLY in copy, never per-neighborhood numbers". The "(Name 4-6.)" notes are about copy naming. The array is a separate surface governed by §3.3 + v3. Array = all 5 book hoods is defensible and honest (each has 1 job, listed under "Dispatched Across"). But could a judge say listing 5 implies more than "at most 3"? The v3 rule explicitly wants array entries book-supported; with exactly 5 book hoods, listing all 5 is the honest full set. I'll list all 5 and note it in the report.

  Hmm, actually, let me reconsider: "name at most 3, phrased as spread" — rationale is never implying depth per hood. In the array under "Dispatched Across Garner", 5 entries with a "5 neighborhoods" stat — that's a work-claim of dispatch to 5 places, each true (1 job each). Honest. Keep 5.

  alt: "Algae-resistant shingle replacement on a Creekside home near Lake Benson in Garner, NC" → "Algae-resistant shingle replacement on a Garner, NC home near Lake Benson".

  **CLAYTON (10)** — count-only, array AS-IS (v3 explicit), no new hood work-claims. Scrub intro work-claim "Mabrey Roofing works Johnston County routinely, from the master-planned streets of Flowers Plantation to older Riverwood." → convert to descriptor. §2: "existing neighborhood descriptors stay as descriptors."

  answer: add count. Current answer mentions Flowers Plantation + Riverwood in "From the newer builder-grade roofs filling Flowers Plantation... to older homes near Riverwood, we know that Clayton's open subdivisions..." — "we know that X sit in the storm corridor" — is that a work claim? It's a knowledge/descriptor claim, borderline. Since Clayton instruction is "NO new neighborhood work-claims; existing neighborhood descriptors stay as descriptors", and this pre-existing sentence is more descriptor than work-claim, I can leave it mostly, adding the count. Minimal edit: "Mabrey Roofing is a roofing company serving Clayton, NC, with 10 completed roofs across Johnston County, handling repairs, replacements, and storm-damage assessments. Clayton is in Johnston County, not Wake, so a roof here permits through the Town of Clayton and Johnston County on different paperwork than the rest of the Triangle..."

  Hmm "10 completed roofs across Johnston County" — the book total is Clayton (10), town-level. Say "10 completed roofs in and around Clayton" or "across town". Use "10 completed roofs across town".

  Wait — but is the count "Clayton: 10 completed roofs" — yes §2. Town-wide phrasing: "across town". Good.

  intro: add count: "Clayton is in Johnston County, and that one fact separates the roofers who actually work here from the ones who do not. A Clayton roof permits through the Town of Clayton and Johnston County, on different paperwork than the rest of the Triangle. Mabrey Roofing works Johnston County routinely, with 10 completed roofs across town and the county paperwork down cold, from the master-planned streets of Flowers Plantation to older Riverwood. We know the jurisdiction, we know the new builder roofs going up out here, and we pull the right permit the first time."

  Hmm — "with 10 completed roofs across town ... from the master-planned streets of Flowers Plantation to older Riverwood" — that binds the count to hoods ("from X to Y" right after the count) — I7: never bind a city total to named neighborhoods. Restructure: keep count clause separate. "Mabrey Roofing works Johnston County routinely, and the book holds 10 completed roofs across town. We know the jurisdiction, we know the new builder roofs going up out here from Flowers Plantation to older Riverwood, and we pull the right permit the first time." — "we know the roofs from X to Y" descriptor-ish. Good enough; Flowers/Riverwood stay as descriptors.

  count-FAQ: q: "How established is Mabrey Roofing in Clayton?" a: "The book holds 10 completed roofs in Clayton, and we work Johnston County routinely enough that the Town of Clayton permitting process is familiar ground. The county line is no obstacle for us."

  Hmm FAQ#1 already says "The county line is no obstacle for us." — don't repeat within entry. Reword: "a: 'Ten completed roofs in town, and counting. We work throughout Johnston County, so Clayton's permitting paperwork and inspection rhythm are routine for our crews, not a learning curve.'"

  Count in word form "Ten" — for Tier-1 that's fine (Tier-1 totals may print; v2.G word-form ban is Tier-2 only). But maybe keep digit for consistency: "The book holds 10 completed roofs in Clayton...". Use digit.

  metaDescription: "Clayton, NC roofing: 10 completed roofs across town. Johnston County permits done right the first time. Free documented estimate." ~120 chars.

  **MORRISVILLE (10)** — Carpenter Village trap. Scrub 4 Carpenter Village claims (answer, intro, localConsiderations, FAQ#1) + array. Rebuild on Kitts Creek (3) + Breckenridge (3). Array: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park", "Village at Town Hall Commons"] — 6 book-supported.

  answer rewrite: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs in this compact tech-corridor town, led by Kitts Creek and Breckenridge, handling roof replacement, repair, and free documented inspections across Wake County. Morrisville filled up early during the Research Triangle Park boom, so builder-grade roofs here are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts."

  intro rewrite: "Morrisville is the Triangle town where the first-replacement clock ran out first. While Raleigh's newer boomburbs are still on their original shingles, Morrisville filled up earlier, growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park. The roofs that went on in that build-out are now coming due, and our book shows it: 10 completed roofs in town, with Kitts Creek and Breckenridge carrying the largest share, plus work in Carpenter Park, Downing Glen, and Addison Park. Those builder-grade roofs are 20-plus years old right now. That is end of life for a builder roof. Mabrey Roofing helps Morrisville owners read the wear honestly with a free documented inspection and a straight repair-or-replace answer."

  v2.E: "rebuild those clauses on Kitts Creek (3) + Breckenridge (3), the real Morrisville leaders" — and I may name Carpenter Park/Downing Glen/Addison Park (§2 says name 2-4). I named 5 in intro — "Name 2-4" → trim: Kitts Creek, Breckenridge + Carpenter Park, Downing Glen? That's 4. Drop Addison Park from prose (array still carries it). 

  localConsiderations line 405: "Many builder roofs across Breckenridge and Carpenter Village are now 20-plus years old and at end of life on a shared timeline." → "Many builder roofs across Breckenridge and Kitts Creek are now 20-plus years old and at end of life on a shared timeline." Wait — v2.E: rebuild on Kitts Creek + Breckenridge. This is a descriptor (age claim) + it's fine to name book hoods. Good.

  FAQ#1 (412): "The builder-grade shingles used across Breckenridge, Carpenter Village, and similar early-2000s subdivisions commonly reach end of life around 20 years..." → "...used across Breckenridge, Kitts Creek, and similar early-2000s subdivisions commonly reach end of life around 20 years..."

  housingStock: "Big master-planned communities like Breckenridge, with more than 1,000 homes, were built out in the early 2000s" — Breckenridge book-supported (3), descriptor. Keep.

  count-FAQ: q: "What neighborhoods in Morrisville are in Mabrey Roofing's book?" a: "Ten completed roofs in a town this compact add up fast. Kitts Creek and Breckenridge lead the list, with Carpenter Park, Downing Glen, and Addison Park also on it." — "Ten" word form + digit? Mixed. For Tier-1, totals may print. But consistency: use "10 completed roofs in a town this compact cover a lot of ground. Kitts Creek and Breckenridge lead the list, with Carpenter Park, Downing Glen, and Addison Park also in the book."

  metaDescription: "Morrisville, NC roofing: 10 completed roofs, led by Kitts Creek and Breckenridge. Early-2000s builder roofs hitting end of life. Free inspection." — count ~135. I7: never bind total to named hoods — "10 completed roofs, led by Kitts Creek and Breckenridge" — hmm, "led by" binds the count composition to hoods. Is that "binding the city total to named neighborhoods"? The A6 lesson: never bind a city total to named neighborhoods — meaning don't say "73 completed roofs in Amberly and Twin Lakes" (implies the total is in those hoods). "led by" phrasing was used in Raleigh FAQ answer ("led by Madison Park, with Laneridge...") — batch 1 shipped that and passed. So "led by" is acceptable. Keep but tighten.

  Also Morrisville intro claim "growing from a rural crossroads of under 1,500 people in 1990" — pre-existing texture, keep (v2.A).

  Now anti-template: check for 8+ word clauses duplicated across entries. Risks: phrases like "We give you an honest repair-or-replace answer" (Morrisville answer) vs Garner "an honest read on what cleaning can save" — different. Knightdale has "honest repair-or-replace answers" (frozen? no, knightdale is batch 3 — currently "free documented roof inspections, honest repair-or-replace answers"). Morrisville answer: "We give you an honest repair-or-replace answer" vs knightdale "honest repair-or-replace answers" — that's 4 words shared; under 8. Holly Springs has "a straight repair-or-replace answer" and Morrisville intro "a straight repair-or-replace answer" — 6 words ("a straight repair-or-replace answer") — under 8. OK but watch "free documented inspection and a straight repair-or-replace answer" — Morrisville intro: "with a free documented inspection and a straight repair-or-replace answer" (10 words); Holly Springs intro: "with a free documented inspection and a straight repair-or-replace answer before water finds the deck" — identical 10-word clause! That violates the anti-template law ("No clause of 8+ words may appear in more than one of the 20 city entries"). The existing Morrisville intro already ends with "a free documented inspection and a straight repair-or-replace answer." — same as Holly Springs. Pre-existing duplication... the law says diff against all 20. Since I'm rewriting Morrisville's intro anyway, vary it: "with a free documented inspection and an honest read on repair versus replace." Hmm Garner uses "an honest read on what cleaning can save versus what needs replacing". Vary: "Mabrey Roofing helps Morrisville owners read the wear honestly, with a free documented inspection and a plain repair-versus-replace verdict." Good.

  Doorway-check will verify pairwise <40% anyway.

  Now let me also double check the anti-template across my new intros:
  - Apex: "Our book sits mostly in that newer ring: 36 completed roofs and counting, from Abbington and Sunset Hills through Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall."
  - Wake Forest: "That newer ring is where our book lives: 24 completed roofs across Wake Forest, with the Heritage communities alone accounting for the largest share..."
  - Pittsboro: "Our book covers all three Pittsboros: 13 completed roofs across the town and countryside, including work in Fearrington Village, on the county's paperwork."
  - Garner: "Our book here is spread, not depth: 11 completed roofs across Garner, from Southills to Heather Hills by way of Hunter's Mark..."
  - Clayton: "the book holds 10 completed roofs across town."
  - Morrisville: "our book shows it: 10 completed roofs in town, with Kitts Creek and Breckenridge carrying the largest share..."

  Apex and Wake Forest both use "newer ring" + "Our book" — "That newer ring is where our book lives" vs "Our book sits mostly in that newer ring" — similar but no identical 8-word clause. OK. Wake Forest and Morrisville both use "the largest share" (4 words) — fine.

  Hmm, "10 completed roofs" appears in both Clayton and Morrisville — same total. Fine, different surrounding clauses. But doorway-check compares whole pages; Clayton and Morrisville were already similar? We'll see.

  Also metaDescription count: Morrisville "10 completed roofs, led by Kitts Creek and Breckenridge" — binds count to hoods with "led by"; acceptable per Raleigh precedent. Actually let me reconsider I7 "honest count binding (town-wide phrasing — the A6 lesson: never bind a city total to named neighborhoods)". The A6 lesson was about metaDescription binding: Cary's meta presumably says "73 completed roofs across town". Raleigh meta: "118 completed roofs across the city, ITB bungalows to outer-Wake subdivisions" — town-wide. To be safe, keep metas town-wide: Morrisville meta: "Morrisville, NC roofing: 10 completed roofs across town. Early-2000s RTP-corridor builder roofs are hitting end of life. Free documented inspection." — count ~135. Good, town-wide.

  Count FAQ answers may name hoods (that's copy, allowed: Durham FAQ names hoods).

  Now Pittsboro array = ["Fearrington Village"] only. Also Pittsboro comment block.

  Also: count-FAQ insertion — FAQ count grows by exactly 1 per Tier-1 page. Append at end of faqs array.

  For batch 2 comment blocks, follow the batch-1 convention.

  Now write the edits. Entry order in file: raleigh(77), cary, knightdale(220), garner(263), clayton(306), apex(349), morrisville(392), wake-forest(420)...

  Let me do Apex first (line 348 boundary). I need exact old_string from the read. Apex entry lines 348-390: starts `  {` at 348. I'll insert comment block before `  {\n    slug: "apex",`.

  Edit 1: insert comment block:
  old: `  {
      slug: "apex",`
  new: comment block + `  {\n    slug: "apex",`

  Then edit answer, array, intro, faq1, alt, metaDescription for apex.

  Careful: many edits to the same file — must not do consecutive Edits with stale context; I'll do them one response at a time? The rule: "DO NOT issue consecutive Edit calls on the same file" in one response. I'll sequence: one Edit per response for same file, or batch edits across different responses. That's a lot of round trips (~30 edits). Alternative: rewrite the whole file with Write? Risky. Better: do one Edit call per response... that's slow but safe. Actually the rule says multiple Edit calls in one response only when they don't target the same file. So per response: 1 edit to lib/cities.ts. ~30 responses. Heavy but fine.

  Alternative: use a coder subagent to apply batch-2 edits with precise instructions. The edits are highly content-specific; I'd have to write all the copy anyway in the prompt. I'll just do it myself, one edit per turn. Actually, I can make each Edit's old_string big enough to cover multiple fields at once (e.g., replace the entire answer+name+...+neighborhoods block in one edit). That reduces edit count: per city, maybe 3-4 edits: (1) comment block + answer, (2) array + intro, (3) faq/alt/meta. Fields are contiguous in some cases: answer, name, county, permitAuthority, permitNote, neighborhoods, landmarks, lead, intro, stormHook, housingStock, localConsiderations, localProjects, localReviews, faqs, heroImage, metaDescription. I can replace the whole entry object in one Edit per city (big old_string from `{` to `},`). That's 6 edits for batch 2 + 6 for batch 3. Big but manageable, and old_string is exactly what I read. Risk: I read these lines earlier; they haven't changed (only raleigh/durham edited, which shifts line numbers but not content). Content-based matching is safe.

  Whole-entry replacement per city it is. Let me draft each batch-2 entry fully.

  Note: file is CRLF. Edit tool handles pure CRLF (Read shows LF, Edit writes CRLF back). The file is pure CRLF presumably ("file CRLF? true"). OK — use LF in old/new strings.

  Now draft full entries.

  --- APEX full new entry (with comment block) ---

  Comment block as drafted. Entry:

  ```ts
    {
      slug: "apex",
      titleKeyword: ... — wait, does apex have titleKeyword? Original entry (line 349-390) has no titleKeyword. Keep as-is (UNTOUCHED per §3.6).
      answer: "Mabrey Roofing is a roofing company serving Apex, NC, with 36 completed roofs across town, from Abbington and Sunset Hills through Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall in the planned communities inside the Apex Peakway. We pull permits through Town of Apex Building Inspections and account for any added review on Salem Street historic-district homes before we schedule. Apex is two roofing towns in one: steep, complex 1800s rooflines downtown where the profile has to match, and straightforward architectural tear-offs in the newer subdivisions. After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one. Free, no-pressure estimates.",
  ```

  Wait — anti-template: "After Triangle straight-line wind or hail, we provide a documented inspection so a small problem does not become a structural one" — preserved from original, fine (same entry). But check overlap with other entries: apex stormHook has "keeps a small problem from becoming a structural one" — same entry, fine.

      name: "Apex", county, permitAuthority, permitNote unchanged.
      neighborhoods: ["Abbington", "Sunset Hills", "Scotts Mill", "Sweetwater", "Shepherd's Vineyard", "Haddon Hall"],
      landmarks unchanged.
      lead: "heritage",
      intro: "Apex is two roofing towns in one. There is the 1800s Salem Street historic district, with its steep Victorian rooflines and older structures, and there is the ring of modern suburban neighborhoods inside the Apex Peakway. Our book sits mostly in that newer ring: 36 completed roofs and counting, from Abbington and Sunset Hills through Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall. The two sides still ask for different skills. A complex historic roofline where the profile has to match and a straightforward architectural tear-off in the planned communities are different jobs, and we bring the right one to each.",
      
  Hmm — answer and intro both carry "from Abbington and Sunset Hills through Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall" — identical long clause within the same page. Vary intro: "Our book sits mostly in that newer ring: 36 completed roofs and counting, with Abbington and Sunset Hills out front and the rest spread through the Peakway's planned communities." That names 2 in intro + 6 in answer. §2 says name 4-6 for Apex. Union = 6. Good.

      stormHook: unchanged.
      housingStock: unchanged.
      localConsiderations: unchanged (3 lines).
      faqs: keep 3, scrub FAQ#1 answer, add count-FAQ #4:
        FAQ1 new a: "Yes. Historic-district homes are scoped to match the existing roofline profile, and we account for any additional district review before the work is scheduled, so the character of the street is preserved."
        FAQ4: q: "Where in Apex has Mabrey Roofing worked?" a: "The book holds 36 completed roofs across Apex, with the planned communities carrying most of it: Abbington and Sunset Hills lead, and Scotts Mill, Sweetwater, Shepherd's Vineyard, and Haddon Hall all appear. Historic-district homes downtown are a different kind of job, scoped for profile matching and any added district review."
      heroImage: { src: "/cities/apex.jpg", alt: "Historic roofline restoration on a home in downtown Apex, NC" },
      metaDescription: "Apex, NC roofing: 36 completed roofs across town. Historic-district roofline matching, Peakway subdivisions, permits handled. Free estimate.",

  Count meta chars: "Apex, NC roofing: 36 completed roofs across town. Historic-district roofline matching, Peakway subdivisions, permits handled. Free estimate." = let me count: roughly 138. OK ≤155.

  Wait — original apex had no metaDescription? Line 386-389: heroImage then `},` — no metaDescription. §3.2 says metaDescription updated with the count. Adding it is required for Tier-1. OK add.

  --- WAKE FOREST full entry ---

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * WAKE FOREST — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 24
     *   completed Wake Forest roofs; book neighborhoods Heritage North at
     *   Heritage Wake Forest (6) + Heritage Wake Forest (1) — the Heritage
     *   cluster, 7 combined — Olde Mill Stream (4), St. Ives (1), Smith
     *   Creek (1), Dansforth (1), Austin Creek (1), Crenshaw Hall
     *   Plantation (1), Horse Creek (1), Prestwicke (1), Wakefield Estates (1),
     *   Thornrose (1), Caddell Woods (1). Only the city-level total (24) is
     *   printed in copy; no per-neighborhood counts.
     * Pre-existing regulatory/demographic texture (permit authority and Town
     *   Hall address, college/seminary history, Historic District review,
     *   population figures) predates this lane and is retained generalized-or-
     *   hedged per the A6/v2.A escape hatch; this lane introduces no new
     *   external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): the old college /
     *   North Main (0 book jobs — orchestrator pre-adjudicated) FAQ work-claim
     *   ("We work the older homes … regularly") converted to capability framing;
     *   Traditions and Holding Village (0 each) removed as work-claims from the
     *   answer and intro (housing-age descriptors elsewhere retained per §1).
     *   AMENDMENT v3: array rebuilt to book-supported hoods only — Wake Forest
     *   Historic District, North Main Street, Traditions, Holding Village (0
     *   each) removed; "Wakefield" grounded to book-real Wakefield Estates (1).
     * ------------------------------------------------------------------------- */
  ```

  Entry:
      answer: "Mabrey Roofing is a Wake Forest roofing contractor handling repair and full replacement across town, with 24 completed roofs on the book, anchored by the Heritage communities and running through Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation. We pull permits through the Town of Wake Forest Inspections Department at 301 S. Brooks Street and plan for any added Historic District preservation review up front. After storms, the heavy oak and maple canopy over the older core is the real threat, dropping limbs onto valleys and chimney flashing, so we document every inspection clearly. We are not a public adjuster.",
      neighborhoods: ["Heritage", "Olde Mill Stream", "St. Ives", "Austin Creek", "Crenshaw Hall Plantation", "Wakefield Estates"],
      intro: "Wake Forest is a college town that outgrew its campus. Wake Forest College was born here in 1834 and stayed until 1956, when it left for Winston-Salem and handed the grounds to Southeastern Baptist Theological Seminary. What remained is a deep historic core, the streets around the old college and the homes along North Main, ringed now by some of the fastest new growth in the Triangle. That newer ring is where our book lives: 24 completed roofs across Wake Forest, the Heritage communities carrying the largest share, with Olde Mill Stream, St. Ives, Austin Creek, and Crenshaw Hall Plantation behind them. A pre-war home under heavy oaks near the seminary and a first-replacement architectural roof in that newer ring ask for different work, and we bring the right approach to each address.",
      stormHook unchanged.
      housingStock unchanged (Heritage/Traditions/Holding Village as descriptors of the town's growth — "added thousands of homes" descriptor. Keep.)
      localConsiderations unchanged.
      faqs: FAQ1 scrub:
        q same. a: "Yes. Historic District homes are matched to the existing roofline profile, and we account for any added preservation review the district requires before we schedule, so the home keeps its character and the permit clears without surprises."
      FAQ2, FAQ3 unchanged.
      FAQ4 new: q: "Has Mabrey Roofing done much work in Wake Forest?" a: "Yes: 24 completed roofs across town, and no community carries more of that book than Heritage. Olde Mill Stream is close behind, with St. Ives, Austin Creek, Crenshaw Hall Plantation, and Wakefield Estates also on the list."
      heroImage unchanged (alt mentions Heritage — book-supported).
      metaDescription: "Wake Forest, NC roofing: 24 completed roofs across town. Historic-district review handled, storm and tree-limb documentation. Free estimate.",
  chars ~130.

  Check "largest share" used in both Wake Forest intro and Morrisville intro ("carrying the largest share") — Morrisville: "with Kitts Creek and Breckenridge carrying the largest share". Wake Forest: "the Heritage communities carrying the largest share". Shared clause "carrying the largest share" = 4 words. OK.

  --- PITTSBORO full entry ---

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * PITTSBORO — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 13
     *   completed Pittsboro roofs; Fearrington Village (2) is the ONLY geocoded
     *   book neighborhood and the only hood-level work-claim permitted (§2).
     *   Only the city-level total (13) is printed in copy.
     * Pre-existing regulatory/demographic texture (Chatham County permitting,
     *   Chatham Park growth axis, courthouse-circle and farmhouse-metal housing
     *   descriptions) predates this lane and is retained generalized-or-hedged
     *   per the A6/v2.A escape hatch; this lane introduces no new external
     *   specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): FAQ service claims
     *   on Chatham Park / Powell Place / Chatham Forest (0 book jobs each)
     *   re-grounded on book-real Fearrington Village; those names stay as
     *   growth/housing descriptors per §1. AMENDMENT v3: array reduced to the
     *   single book-supported hood — Chatham Park, Powell Place, Chatham Forest,
     *   The Courthouse Circle historic core (0 each) removed. An honest short
     *   array beats a padded one.
     * ------------------------------------------------------------------------- */
  ```

  Entry:
      answer: "Mabrey Roofing and Construction serves Pittsboro, NC, and the surrounding Chatham County countryside, with 13 completed roofs on the book, including work in Fearrington Village. Pittsboro sits in Chatham County, so roof permits run through Chatham County's permitting office on different paperwork than Wake or Durham, and we handle that jurisdiction routinely. The housing runs the full spread: farmhouse metal roofs on rural acreage, established 2000s subdivisions, and brand-new builder shingles in Chatham Park that deserve a documented eye before their warranties age out. Every inspection comes with photos you keep.",
      neighborhoods: ["Fearrington Village"],
      intro: "Pittsboro is the Chatham County seat, and for a roofer that county line is the first fact that matters: permits here run through Chatham County, not the Wake or Durham offices most Triangle crews default to. The second fact is growth. Chatham Park is one of the largest master-planned developments in the state, and it is filling the town's edge with brand-new builder roofs while the courthouse circle keeps its century-old homes and the countryside keeps its farmhouse metal. Our book covers all three Pittsboros: 13 completed roofs across the town and countryside, including work in Fearrington Village, on the county's paperwork.",
      stormHook, housingStock, localConsiderations unchanged.
      faqs: FAQ1 unchanged (permitting, town-level). FAQ2 scrub:
        q: "Do you serve Chatham Park and Fearrington Village?" — question is customer-voice; keep q? The q itself names Chatham Park — fine. a: "Yes. Fearrington Village, between Pittsboro and Chapel Hill, is in our book with completed roofs, and our coverage runs across the whole town and the surrounding countryside. New districts inside Chatham Park can add their own design standards on top of the county permit, which we confirm before scheduling."
      FAQ3 unchanged.
      FAQ4 new: q: "Does Mabrey Roofing have roofing experience in Pittsboro?" a: "Yes: 13 completed roofs across the town and the surrounding Chatham County countryside, including work in Fearrington Village. It is a quieter book than our Durham home base, and every Pittsboro job gets the same documented inspection and county-correct permit."
      heroImage, metaDescription: meta: "Pittsboro, NC roofing: 13 completed roofs across town and countryside. Chatham County permits, farm metal fluency. Free estimate." ~123 chars.

  --- GARNER ---

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * GARNER — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 11
     *   completed Garner roofs; book neighborhoods Southills (1), Hunter's
     *   Mark (1), Hillington West (1), Heather Hills (1), Pleasant Woods (1) —
     *   spread, not depth: one job each. Only the city-level total (11) is
     *   printed in copy; no per-neighborhood counts.
     * Pre-existing regulatory/demographic texture (permit authority, lake-fed
     *   humidity/algae descriptions, townhome permit-volume figures) predates
     *   this lane and is retained generalized-or-hedged per the A6/v2.A escape
     *   hatch; this lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C (wo/full-hoods.json): Creekside (0 book
     *   jobs — orchestrator pre-adjudicated) service-claim phrasing removed from
     *   the answer and heroImage.alt de-attributed per v2.D; the Creekside and
     *   White Oak corridor algae descriptors stay as housing-stock descriptors
     *   per §1. AMENDMENT v3: array rebuilt to the five book-supported hoods —
     *   Creekside, Cleveland Bluffs, Lake Benson area, White Oak corridor (0
     *   each) removed.
     * ------------------------------------------------------------------------- */
  ```

  Entry:
      answer: "Mabrey Roofing and Construction is a roofing contractor serving Garner, NC, with 11 completed roofs spread across town, from Southills to Heather Hills, handling repairs, full replacements, and storm and algae assessments. Garner's real roofing enemy is moisture: lake-fed humidity and shaded north slopes feed the dark algae streaks and moss that lift granules and shorten a roof's life. We treat roofs for those conditions with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing. We pull the permit through the Town of Garner Inspections department, coordinate with Wake County on nearby unincorporated parcels, and schedule the inspection for your address.",
      neighborhoods: ["Southills", "Hunter's Mark", "Hillington West", "Heather Hills", "Pleasant Woods"],
      intro: "Garner sits where semi-rural Wake County turns suburban, and its roofs tell that story. Near Lake Benson and Lake Wheeler the air stays damp, and north-facing slopes in Creekside and the White Oak corridor grow the dark algae streaks and moss that homeowners elsewhere in the Triangle see far less of. Our book here is spread, not depth: 11 completed roofs across Garner, from Southills by way of Hunter's Mark over to Heather Hills, with no single neighborhood carrying the count. Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials and an honest read on what cleaning can save versus what needs replacing.",
      
  Hmm — intro and answer share "with an honest read on what cleaning can save versus what needs replacing" (13 words) — same page, duplicated within the entry. It was in the original answer only. Duplicating it into the intro is sloppy; vary intro ending: "Mabrey Roofing treats Garner roofs for the conditions they actually live in, with algae-resistant materials matched to the microclimate." Good.

      stormHook unchanged, housingStock unchanged, localConsiderations unchanged.
      faqs: 3 unchanged + FAQ4: q: "Which Garner neighborhoods has Mabrey Roofing roofed in?" a: "The book shows 11 completed roofs across Garner, spread rather than concentrated, from Southills through Hunter's Mark to Heather Hills. No single neighborhood carries the count, and wherever your home sits, the lake-influenced humidity shapes the material call the same way."
      
  Check: "from Southills through Hunter's Mark to Heather Hills" (FAQ) vs intro "from Southills by way of Hunter's Mark over to Heather Hills" vs answer "from Southills to Heather Hills" — same page, similar but distinct wordings. OK.

      heroImage: { src: "/cities/garner.jpg", alt: "Algae-resistant shingle replacement on a Garner, NC home near Lake Benson" },
      metaDescription: "Garner, NC roofing: 11 completed roofs across town. Algae-resistant replacements for the lake-country humidity. Free honest estimate.",
  chars ~130.

  --- CLAYTON ---

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * CLAYTON — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 10
     *   completed Clayton roofs; ZERO geocoded book neighborhoods, so no new
     *   neighborhood work-claims were added (§2) — existing neighborhood
     *   mentions stay as descriptors only. Only the city-level total (10) is
     *   printed in copy.
     * Pre-existing regulatory/demographic texture (Johnston County permitting,
     *   biotech-growth and population figures, storm-corridor framing) predates
     *   this lane and is retained generalized-or-hedged per the A6/v2.A escape
     *   hatch; this lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C: the intro's "works … from Flowers
     *   Plantation to older Riverwood" framing reworded so Flowers Plantation
     *   and Riverwood (0 book jobs each) read as descriptors, not work-claims.
     *   AMENDMENT v3 known limitation: the neighborhoods array (Flowers
     *   Plantation, Riverwood, Glen Laurel) predates this lane and stays AS-IS
     *   per v3's explicit Clayton carve-out (0 geocoded hoods).
     * ------------------------------------------------------------------------- */
  ```

  Entry:
      answer: "Mabrey Roofing is a roofing company serving Clayton, NC, with 10 completed roofs across town, handling repairs, replacements, and storm-damage assessments across Johnston County. Clayton is in Johnston County, not Wake, so a roof here permits through the Town of Clayton and Johnston County on different paperwork than the rest of the Triangle. We work this jurisdiction routinely and pull the correct permit the first time. From the newer builder-grade roofs filling Flowers Plantation, driven by the Novo Nordisk and Grifols biotech boom, to older homes near Riverwood, we know that Clayton's open subdivisions and wide roof planes sit in the central North Carolina storm corridor. Most of these younger roofs need a targeted repair, not a full replacement, and we say so.",
      neighborhoods: ["Flowers Plantation", "Riverwood", "Glen Laurel"], (unchanged)
      intro: "Clayton is in Johnston County, and that one fact separates the roofers who actually work here from the ones who do not. A Clayton roof permits through the Town of Clayton and Johnston County, on different paperwork than the rest of the Triangle. Mabrey Roofing works Johnston County routinely, and the book holds 10 completed roofs across town. We know the jurisdiction, we know the new builder roofs going up from the master-planned streets of Flowers Plantation to older Riverwood, and we pull the right permit the first time.",
      rest unchanged; FAQ4 new: q: "How established is Mabrey Roofing in Clayton?" a: "The book holds 10 completed roofs in Clayton, all permitted through the Town of Clayton and Johnston County. We work this side of the county line routinely, so the different paperwork and inspection rhythm are familiar ground for our crews.",
      metaDescription: "Clayton, NC roofing: 10 completed roofs across town. Johnston County permits done right the first time. Free documented estimate.",
  chars ~122.

  Wait FAQ a: "all permitted through the Town of Clayton and Johnston County" — claiming all 10 were permitted? That's a process claim about past jobs... plausible but unverifiable. Reword: "The book holds 10 completed roofs in Clayton, and we work this side of the county line routinely, so the Town of Clayton and Johnston County paperwork and inspection rhythm are familiar ground for our crews, not a learning curve."

  --- MORRISVILLE ---

  Comment block:
  ```
    /* -------------------------------------------------------------------------
     * MORRISVILLE — updated WO_SEO_LANE_W (2026-08-20), batch 2.
     * First-party evidence (orchestrator-derived CRM book, 2026-08-20): 10
     *   completed Morrisville roofs; book neighborhoods Kitts Creek (3),
     *   Breckenridge (3), Carpenter Park (1), Village at Town Hall Commons (1),
     *   Downing Glen (1), Addison Park (1). Only the city-level total (10) is
     *   printed in copy; no per-neighborhood counts.
     * Pre-existing regulatory/demographic texture (permit authority and EnerGov
     *   portal, 1990 population figure, Breckenridge size, RDU flight-path
     *   framing) predates this lane and is retained generalized-or-hedged per
     *   the A6/v2.A escape hatch; this lane introduces no new external specifics.
     * Honesty scrub per AMENDMENTS v2.C + v2.E (the Carpenter Village trap):
     *   "Carpenter Village" is a CARY book neighborhood with ZERO Morrisville
     *   book jobs; all four Morrisville claims of it (answer, intro,
     *   localConsiderations, FAQ#1) scrubbed and rebuilt on the real book
     *   leaders Kitts Creek (3) and Breckenridge (3) — Carpenter Park (1) NOT
     *   substituted into the old sentences per v2.E. AMENDMENT v3: array rebuilt
     *   to book-supported hoods only — Carpenter Village, Shiloh Grove,
     *   Savannah, McCrimmon at the Park (0 Morrisville jobs each) removed.
     * ------------------------------------------------------------------------- */
  ```

  Entry:
      answer: "Mabrey Roofing is a roofing contractor serving Morrisville, NC, with 10 completed roofs in this compact tech-corridor town, handling roof replacement, repair, and free documented inspections across Wake County. Morrisville filled up early during the Research Triangle Park boom, so builder-grade roofs in Kitts Creek and Breckenridge are now 20-plus years old and reaching end of life on a shared timeline, worn faster by long, hot, humid summers. We give you an honest repair-or-replace answer, help you choose an HOA-compliant shingle, and pull the permit through the Town of Morrisville Inspections Department under the N.C. State Building Code before any work starts.",
      neighborhoods: ["Kitts Creek", "Breckenridge", "Carpenter Park", "Downing Glen", "Addison Park", "Village at Town Hall Commons"],
      intro: "Morrisville is the Triangle town where the first-replacement clock ran out first. While Raleigh's newer boomburbs are still on their original shingles, Morrisville filled up earlier, growing from a rural crossroads of under 1,500 people in 1990 into a dense tech-corridor town as workers poured into nearby Research Triangle Park. The roofs that went on in that build-out are now coming due, and our book shows it: 10 completed roofs in town, with Kitts Creek and Breckenridge out front and Carpenter Park and Downing Glen behind them. Those builder roofs are 20-plus years old right now, which is end of life for a builder shingle. Mabrey Roofing helps Morrisville owners read the wear honestly, with a free documented inspection and a plain repair-versus-replace verdict.",
      stormHook unchanged.
      housingStock unchanged.
      localConsiderations: [
        "Many builder roofs across Breckenridge and Kitts Creek are now 20-plus years old and at end of life on a shared timeline.",
        (other two unchanged)
      ],
      
  Hmm — localConsideration line vs intro "Those builder roofs are 20-plus years old right now" — overlap "20-plus years old and at end of life on a shared timeline" also appears in answer ("20-plus years old and reaching end of life on a shared timeline"). Answer and localConsideration share "end of life on a shared timeline" (6 words) — was in the original too (answer + localConsiderations both had it). Same-entry repetition pre-existing. Keep minimal churn. Actually answer says "reaching end of life on a shared timeline", LC says "at end of life on a shared timeline" — 6 words shared. Pre-existing pattern; fine.

      faqs: FAQ1: q same; a: "Often, yes. The builder-grade shingles used across Breckenridge, Kitts Creek, and similar early-2000s subdivisions commonly reach end of life around 20 years, sooner on sun-baked south-facing slopes. A free documented inspection tells you honestly whether you need a full replacement or just a targeted repair to buy more time."
      FAQ2, FAQ3 unchanged.
      FAQ4: q: "What neighborhoods in Morrisville are in Mabrey Roofing's book?" a: "10 completed roofs in a town this compact cover a lot of ground. Kitts Creek and Breckenridge lead the list, with Carpenter Park, Downing Glen, and Addison Park also in the book."
      heroImage unchanged (alt: Breckenridge — book-supported).
      metaDescription: "Morrisville, NC roofing: 10 completed roofs across town. Early-2000s RTP-corridor builder roofs are hitting end of life. Free documented inspection.",
  chars: count: "Morrisville, NC roofing: 10 completed roofs across town. Early-2000s RTP-corridor builder roofs are hitting end of life. Free documented inspection." ≈ 148. OK.

  Anti-template check across new copy for 8+ word duplicates:
  - "reaching end of life on a shared timeline" (Morrisville answer) — knightdale/holly-springs? holly-springs LC: "reach end of life on the same 15-to-20-year timeline" — different. knightdale LC: "aging on a similar 12-to-20-year timeline". OK.
  - "A free documented inspection tells you honestly whether you need a full replacement" (Morrisville FAQ1) vs knightdale FAQ1: "A free documented inspection tells you whether you need a full replacement or a targeted repair." — shared clause: "A free documented inspection tells you" (7 words) then "honestly whether you need a full replacement" — Morrisville has "tells you honestly whether" — breaks the run. Shared run = "A free documented inspection tells you" = 7 words < 8. Phew. Pre-existing anyway (Morrisville FAQ1 a was pre-existing except the hood swap).

  Also verify no "!" and no added em-dashes: my new copy has none. Pittsboro comment has "—" in comment (comments fine; I5 governs rendered copy? "no em-dashes ADDED beyond the file's existing house usage" — comments already use them, e.g. existing comment blocks use "—". Fine.)

  One more check — Wake Forest intro: "That newer ring is where our book lives" + later "a first-replacement architectural roof in that newer ring" — repeats "newer ring" within paragraph; slightly clunky. Change later to "in the newer subdivisions"? But Apex answer uses "in the newer subdivisions" (different entry, 5 words, fine). Use "and a first-replacement architectural roof out in Heritage ask for different work" — Heritage again (named twice in intro). Hmm: intro names Heritage twice ("the Heritage communities carrying the largest share" + "roof out in Heritage"). Acceptable but let me phrase: "A pre-war home under heavy oaks near the seminary and a first-replacement architectural roof in one of the Heritage villages ask for different work, and we bring the right approach to each address." Good.

  Also need to double-check Garner "from Southills by way of Hunter's Mark over to Heather Hills" — awkward. Simplify: "from Southills and Hunter's Mark over to Heather Hills". 

  Also oracle requires ≥3 §2 hoods present per Tier-1 page. §2 hoods for each:
  - Apex §2: Abbington, Sunset Hills, Hallmark West, The Park at West Lake, Sweetwater, Scotts Mill, Shepherd's Vineyard, Haddon Hall — my copy has Abbington, Sunset Hills, Scotts Mill, Sweetwater, Shepherd's Vineyard, Haddon Hall (array) → ≥3. ✓
  - Wake Forest §2: Heritage, Olde Mill Stream, St. Ives, Austin Creek, Crenshaw Hall Plantation, Wakefield Estates — all present. ✓
  - Pittsboro: Fearrington Village present. ✓ (≥3 of its §2 hoods — §2 lists only Fearrington; oracle asserts the §2 hoods; fine.)
  - Garner §2: Southills, Hunter's Mark, Hillington West, Heather Hills, Pleasant Woods — array has all 5. ✓
  - Clayton: no hoods required. ✓
  - Morrisville §2: Kitts Creek, Breckenridge, Carpenter Park, Downing Glen, Addison Park — present. ✓

  FAQ count grows by exactly 1 per Tier-1: apex 3→4, wake-forest 3→4, pittsboro 3→4, garner 3→4, clayton 3→4, morrisville 3→4. ✓

  metaDescription with count for all 6. ✓

  Now, order in the file: I'll do whole-entry Edits. old_string = entire entry from `  {` through `  },` — but entries start with identical `  {` lines; I need unique anchors. Including the slug line makes it unique. I'll start old_string at `  {\n    slug: "apex",` and end at the entry's closing. For comment-block insertion, prepend to new_string.

  Let me now write the 6 edits, one per response... Actually the rule says multiple Edit calls in one response only when they do not target the same file. All 6 target lib/cities.ts → must be separate responses. 6 responses for batch 2, 6 for batch 3. OK.

  Let me update todos and start.Batch 2: Apex edit first — full entry replacement including comment block.

• Apex done. Next: Morrisville entry (full replacement with comment block).

• Morrisville done. Next: Wake Forest full entry replacement.

• Wake Forest done. Next: Garner full entry replacement.Garner done. Next: Clayton.

• Clayton done. Next: Pittsboro.Pittsboro done. Note I kept "Fearrington Village (nearby)" → changed to "Fearrington Village" exact book name. Good.

  Now the last batch-2 city... wait, I did apex, morrisville, wake-forest, garner, clayton, pittsboro — that's all 6. 

  Now typecheck + build + gates. First typecheck, then build, then start server on 3221, run the three gates, then oracle script.> tsc --noEmit

