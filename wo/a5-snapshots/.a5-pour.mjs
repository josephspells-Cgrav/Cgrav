/* Scratch pour script for WO_SEO_A5 — inserts [anchor](/path) inline-link
 * syntax around words ALREADY PRESENT in body strings. Two-phase: computes all
 * edits in memory with hard assertions, writes files only if every entry
 * verifies. DELETE AFTER USE. */
import fs from "node:fs";
import { GLOSSARY_TERMS } from "./lib/articles/glossary.ts";
import { REPLACEMENT_ARTICLES } from "./lib/articles/replacement.ts";
import { MATERIALS_ARTICLES } from "./lib/articles/materials.ts";
import { COST_ARTICLES } from "./lib/articles/cost.ts";
import { DECISION_ARTICLES } from "./lib/articles/decision.ts";
import { STORM_ARTICLES } from "./lib/articles/storm.ts";
import { STORM_INSURANCE_PLUS_ARTICLES } from "./lib/articles/storm-insurance-plus.ts";
import { INSURANCE_ARTICLES } from "./lib/articles/insurance.ts";
import { LOCAL_ARTICLES } from "./lib/articles/local.ts";
import { BLOG_POSTS } from "./lib/articles/blog-posts.ts";

const G = (s) => `/resources/glossary/${s}`;
const MODULES = {
  "lib/articles/replacement.ts": REPLACEMENT_ARTICLES,
  "lib/articles/materials.ts": MATERIALS_ARTICLES,
  "lib/articles/cost.ts": COST_ARTICLES,
  "lib/articles/decision.ts": DECISION_ARTICLES,
  "lib/articles/storm.ts": STORM_ARTICLES,
  "lib/articles/storm-insurance-plus.ts": STORM_INSURANCE_PLUS_ARTICLES,
  "lib/articles/insurance.ts": INSURANCE_ARTICLES,
  "lib/articles/local.ts": LOCAL_ARTICLES,
  "lib/articles/blog-posts.ts": BLOG_POSTS,
};

// Direction 1 — article/blog body → glossary. anchor = exact words already in
// the paragraph; hint = longer containing string when the anchor is not unique
// in the paragraph.
const ARTICLE_LINKS = [
  // replacement.ts
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-guide", si: 0, pi: 1, anchor: "granules", hint: "the protective granules have washed away", target: G("granules") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-guide", si: 2, pi: 1, anchor: "valleys", hint: "complex shape with lots of valleys and dormers", target: G("roof-valley") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-guide", si: 7, pi: 1, anchor: "deck", hint: "the deck gets inspected and any bad wood replaced", target: G("roof-decking") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-timeline", si: 3, pi: 1, anchor: "underlayment", hint: "the dry-in goes on: underlayment across the whole roof", target: G("underlayment") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-timeline", si: 3, pi: 2, anchor: "flashing", hint: "flashing is fitted and sealed around chimneys", target: G("flashing") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-timeline", si: 3, pi: 2, anchor: "ridge vent", hint: "the ridge vent caps the peak", target: G("ridge-vent") },
  { file: "lib/articles/replacement.ts", slug: "tear-off-vs-roof-over", si: 0, pi: 0, anchor: "wood deck", hint: "all the way down to the wood deck", target: G("roof-decking") },
  { file: "lib/articles/replacement.ts", slug: "tear-off-vs-roof-over", si: 2, pi: 1, anchor: "flashing", hint: "slow leaks around flashing or in valleys", target: G("flashing") },
  { file: "lib/articles/replacement.ts", slug: "tear-off-vs-roof-over", si: 3, pi: 1, anchor: "warranty", hint: "reduce or void their warranty", target: G("roof-warranty") },
  { file: "lib/articles/replacement.ts", slug: "roof-replacement-permits-nc", si: 0, pi: 1, anchor: "tear-off", hint: "the kind of full tear-off and rebuild", target: G("tear-off") },
  { file: "lib/articles/replacement.ts", slug: "how-to-choose-a-roofing-contractor", si: 4, pi: 1, anchor: "warranty", hint: "ties directly to the warranty", target: G("roof-warranty") },
  // materials.ts
  { file: "lib/articles/materials.ts", slug: "roofing-materials-guide", si: 1, pi: 1, anchor: "3-tab", hint: "3-tab is the thin, flat, budget shingle", target: G("three-tab-shingles") },
  { file: "lib/articles/materials.ts", slug: "roofing-materials-guide", si: 5, pi: 1, anchor: "algae-resistant shingles", hint: "algae-resistant shingles are worth choosing", target: G("algae-resistant-shingles") },
  { file: "lib/articles/materials.ts", slug: "roofing-materials-guide", si: 5, pi: 2, anchor: "flashing", hint: "quality flashing matter as much", target: G("flashing") },
  { file: "lib/articles/materials.ts", slug: "asphalt-shingle-types", si: 0, pi: 1, anchor: "3-tab", hint: "3-tab is the original budget shingle", target: G("three-tab-shingles") },
  { file: "lib/articles/materials.ts", slug: "asphalt-shingle-types", si: 2, pi: 0, anchor: "Architectural shingles", hint: "Architectural shingles, also called dimensional", target: G("architectural-shingles") },
  { file: "lib/articles/materials.ts", slug: "asphalt-shingle-types", si: 5, pi: 1, anchor: "algae-resistant", hint: "choose an algae-resistant version", target: G("algae-resistant-shingles") },
  { file: "lib/articles/materials.ts", slug: "standing-seam-vs-metal-shingles", si: 1, pi: 0, anchor: "eave", hint: "from the ridge down to the eave", target: G("eave") },
  { file: "lib/articles/materials.ts", slug: "standing-seam-vs-metal-shingles", si: 4, pi: 1, anchor: "underlayment", hint: "a layer of underlayment", target: G("underlayment") },
  { file: "lib/articles/materials.ts", slug: "impact-resistant-shingles", si: 0, pi: 0, anchor: "Class 4", hint: "The marker to look for is a Class 4 rating", target: G("class-4-shingles") },
  { file: "lib/articles/materials.ts", slug: "impact-resistant-shingles", si: 0, pi: 1, anchor: "architectural shingles", hint: "ordinary architectural shingles from the street", target: G("architectural-shingles") },
  { file: "lib/articles/materials.ts", slug: "gaf-vs-owens-corning-vs-certainteed", si: 0, pi: 0, anchor: "architectural shingles", hint: "their flagship architectural shingles", target: G("architectural-shingles") },
  { file: "lib/articles/materials.ts", slug: "gaf-vs-owens-corning-vs-certainteed", si: 2, pi: 0, anchor: "warranty", hint: "diverge for a homeowner is the warranty,", target: G("roof-warranty") },
  { file: "lib/articles/materials.ts", slug: "gaf-vs-owens-corning-vs-certainteed", si: 1, pi: 1, anchor: "algae-resistant", hint: "each offers an algae-resistant version", target: G("algae-resistant-shingles") },
  { file: "lib/articles/materials.ts", slug: "best-shingle-color-nc", si: 0, pi: 1, anchor: "eaves", hint: "good intake at the eaves", target: G("eave") },
  // cost.ts
  { file: "lib/articles/cost.ts", slug: "metal-roof-vs-shingles-cost-nc", si: 0, pi: 1, anchor: "Architectural shingles", hint: "Architectural shingles are the value sweet spot", target: G("architectural-shingles") },
  { file: "lib/articles/cost.ts", slug: "metal-roof-vs-shingles-cost-nc", si: 4, pi: 1, anchor: "underlayment", hint: "solid decking and underlayment", target: G("underlayment") },
  { file: "lib/articles/cost.ts", slug: "metal-roof-vs-shingles-cost-nc", si: 5, pi: 1, anchor: "warranty", hint: "The long warranty and decades", target: G("roof-warranty") },
  { file: "lib/articles/cost.ts", slug: "what-drives-roof-replacement-cost", si: 1, pi: 1, anchor: "Pitch", hint: "Pitch, meaning how steep the roof is", target: G("roof-pitch") },
  { file: "lib/articles/cost.ts", slug: "what-drives-roof-replacement-cost", si: 3, pi: 1, anchor: "decking", hint: "The decking, also called sheathing", target: G("roof-decking") },
  { file: "lib/articles/cost.ts", slug: "what-drives-roof-replacement-cost", si: 4, pi: 1, anchor: "valley", hint: "Every valley, hip, dormer", target: G("roof-valley") },
  { file: "lib/articles/cost.ts", slug: "how-to-pay-for-a-new-roof", si: 3, pi: 1, anchor: "deductible", hint: "the covered repair minus your deductible,", target: G("roof-deductible") },
  { file: "lib/articles/cost.ts", slug: "how-to-pay-for-a-new-roof", si: 6, pi: 1, anchor: "decking", hint: "per-sheet price for any decking repair", target: G("roof-decking") },
  // decision.ts
  { file: "lib/articles/decision.ts", slug: "how-long-does-a-roof-last-in-nc", si: 3, pi: 1, anchor: "eaves", hint: "pulls cool air in at the eaves", target: G("eave") },
  { file: "lib/articles/decision.ts", slug: "how-long-does-a-roof-last-in-nc", si: 3, pi: 2, anchor: "flashing", hint: "a tiny flashing gap", target: G("flashing") },
  { file: "lib/articles/decision.ts", slug: "signs-you-need-a-new-roof", si: 3, pi: 1, anchor: "Curling", hint: "Curling shingles plus granule loss", target: G("shingle-curling") },
  { file: "lib/articles/decision.ts", slug: "signs-you-need-a-new-roof", si: 3, pi: 2, anchor: "sagging", hint: "A sagging roofline is the exception", target: G("roof-sagging") },
  { file: "lib/articles/decision.ts", slug: "signs-you-need-a-new-roof", si: 4, pi: 0, anchor: "underlayment", hint: "what the underlayment, flashing, and decking are doing", target: G("underlayment") },
  { file: "lib/articles/decision.ts", slug: "is-it-worth-repairing-or-replacing-your-roof", si: 6, pi: 0, anchor: "flashing", hint: "the decking, flashing, and underlayment", target: G("flashing") },
  { file: "lib/articles/decision.ts", slug: "best-roofing-material-for-nc-heat-and-storms", si: 1, pi: 1, anchor: "architectural shingles", hint: "Modern architectural shingles carry strong wind ratings", target: G("architectural-shingles") },
  { file: "lib/articles/decision.ts", slug: "best-roofing-material-for-nc-heat-and-storms", si: 1, pi: 1, anchor: "algae-resistant", hint: "offer algae-resistant lines built specifically", target: G("algae-resistant-shingles") },
  { file: "lib/articles/decision.ts", slug: "best-roofing-material-for-nc-heat-and-storms", si: 4, pi: 0, anchor: "Three-tab", hint: "Three-tab asphalt shingles are the old budget", target: G("three-tab-shingles") },
  // storm.ts
  { file: "lib/articles/storm.ts", slug: "how-to-spot-hail-damage-on-your-roof", si: 0, pi: 0, anchor: "bruises", hint: "Instead it bruises and chips the shingle", target: G("hail-bruising") },
  { file: "lib/articles/storm.ts", slug: "how-to-spot-hail-damage-on-your-roof", si: 0, pi: 1, anchor: "granules", hint: "coated in tiny granules", target: G("granules") },
  { file: "lib/articles/storm.ts", slug: "wind-damage-roof-signs", si: 2, pi: 1, anchor: "underlayment", hint: "exposed underlayment", target: G("underlayment") },
  { file: "lib/articles/storm.ts", slug: "wind-damage-roof-signs", si: 4, pi: 1, anchor: "flashing", hint: "check any flashing or trim", target: G("flashing") },
  { file: "lib/articles/storm.ts", slug: "what-to-do-after-a-storm-damages-your-roof", si: 1, pi: 2, anchor: "sagging", hint: "such as a sagging ceiling", target: G("roof-sagging") },
  // storm-insurance-plus.ts
  { file: "lib/articles/storm-insurance-plus.ts", slug: "storm-damage-insurance-guide", si: 4, pi: 0, anchor: "actual cash value", hint: "ACV stands for actual cash value,", target: G("actual-cash-value") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "storm-damage-insurance-guide", si: 4, pi: 0, anchor: "replacement cost value", hint: "RCV stands for replacement cost value,", target: G("replacement-cost-value") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "storm-damage-insurance-guide", si: 4, pi: 1, anchor: "recoverable depreciation", hint: "called recoverable depreciation,", target: G("recoverable-depreciation") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "how-to-file-a-roof-insurance-claim", si: 3, pi: 0, anchor: "hail bruises", hint: "point out hail bruises", target: G("hail-bruising") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "how-to-file-a-roof-insurance-claim", si: 4, pi: 1, anchor: "deductible", hint: "waive or pay your deductible", target: G("roof-deductible") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "what-to-document-roof-claim", si: 2, pi: 0, anchor: "granules", hint: "grind off more granules", target: G("granules") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "what-to-document-roof-claim", si: 2, pi: 1, anchor: "eave", hint: "a ladder kept at the eave", target: G("eave") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "hail-size-roof-damage", si: 2, pi: 0, anchor: "granules", hint: "knocks loose the protective granules", target: G("granules") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "roof-insurance-supplement", si: 1, pi: 1, anchor: "tear-off", hint: "could see until tear-off revealed it", target: G("tear-off") },
  { file: "lib/articles/storm-insurance-plus.ts", slug: "roof-insurance-supplement", si: 1, pi: 1, anchor: "decking", hint: "Hidden decking damage", target: G("roof-decking") },
  // insurance.ts
  { file: "lib/articles/insurance.ts", slug: "does-homeowners-insurance-cover-roof-replacement", si: 3, pi: 1, anchor: "actual cash value", hint: "pays actual cash value or", target: G("actual-cash-value") },
  { file: "lib/articles/insurance.ts", slug: "does-homeowners-insurance-cover-roof-replacement", si: 3, pi: 1, anchor: "replacement cost value", hint: "or replacement cost value.", target: G("replacement-cost-value") },
  { file: "lib/articles/insurance.ts", slug: "does-homeowners-insurance-cover-roof-replacement", si: 2, pi: 0, anchor: "curling", hint: "brittle and curling", target: G("shingle-curling") },
  { file: "lib/articles/insurance.ts", slug: "acv-vs-rcv-roof-insurance-claims", si: 0, pi: 1, anchor: "actual cash value", hint: "ACV stands for actual cash value.", target: G("actual-cash-value") },
  { file: "lib/articles/insurance.ts", slug: "acv-vs-rcv-roof-insurance-claims", si: 0, pi: 1, anchor: "replacement cost value", hint: "RCV stands for replacement cost value.", target: G("replacement-cost-value") },
  { file: "lib/articles/insurance.ts", slug: "acv-vs-rcv-roof-insurance-claims", si: 3, pi: 1, anchor: "recoverable depreciation", hint: "is called recoverable depreciation.", target: G("recoverable-depreciation") },
  // local.ts
  { file: "lib/articles/local.ts", slug: "triangle-roofing-guide", si: 1, pi: 0, anchor: "granules", hint: "the protective granules let go", target: G("granules") },
  { file: "lib/articles/local.ts", slug: "triangle-roofing-guide", si: 2, pi: 2, anchor: "Algae-resistant", hint: "Algae-resistant shingles, metal strips", target: G("algae-resistant-shingles") },
  { file: "lib/articles/local.ts", slug: "triangle-roofing-guide", si: 6, pi: 1, anchor: "drip edge", hint: "underlayment and drip edge are installed", target: G("drip-edge") },
  { file: "lib/articles/local.ts", slug: "how-triangle-weather-affects-your-roof", si: 1, pi: 1, anchor: "ridge ventilation", hint: "proper intake and ridge ventilation", target: G("ridge-vent") },
  { file: "lib/articles/local.ts", slug: "how-triangle-weather-affects-your-roof", si: 2, pi: 1, anchor: "algae-resistant shingles", hint: "algae-resistant shingles keep the streaks", target: G("algae-resistant-shingles") },
  { file: "lib/articles/local.ts", slug: "how-triangle-weather-affects-your-roof", si: 5, pi: 0, anchor: "flashing", hint: "a tired flashing joint", target: G("flashing") },
  { file: "lib/articles/local.ts", slug: "algae-and-moss-on-nc-roofs", si: 4, pi: 0, anchor: "Algae-resistant shingles", hint: "Algae-resistant shingles, often labeled AR", target: G("algae-resistant-shingles") },
  { file: "lib/articles/local.ts", slug: "algae-and-moss-on-nc-roofs", si: 3, pi: 1, anchor: "granules", hint: "The protective granules on a shingle", target: G("granules") },
  { file: "lib/articles/local.ts", slug: "algae-and-moss-on-nc-roofs", si: 1, pi: 1, anchor: "valley", hint: "moss mat in a shady valley", target: G("roof-valley") },
  { file: "lib/articles/local.ts", slug: "best-time-to-replace-a-roof-in-nc", si: 3, pi: 1, anchor: "deck", hint: "rot in the deck", target: G("roof-decking") },
  { file: "lib/articles/local.ts", slug: "pine-pollen-and-your-roof", si: 4, pi: 0, anchor: "fascia", hint: "soaks the fascia and soffit", target: G("fascia") },
  { file: "lib/articles/local.ts", slug: "pine-pollen-and-your-roof", si: 4, pi: 0, anchor: "soffit", hint: "and soffit, and can rot the wood", target: G("soffit") },
  { file: "lib/articles/local.ts", slug: "pine-pollen-and-your-roof", si: 0, pi: 1, anchor: "valleys", hint: "into the valleys, the roof-to-wall corners", target: G("roof-valley") },
  // blog-posts.ts
  { file: "lib/articles/blog-posts.ts", slug: "fall-roof-maintenance-checklist", si: 1, pi: 0, anchor: "fascia", hint: "overflows behind the fascia", target: G("fascia") },
  { file: "lib/articles/blog-posts.ts", slug: "fall-roof-maintenance-checklist", si: 1, pi: 2, anchor: "roof valleys", hint: "glance at the roof valleys", target: G("roof-valley") },
  { file: "lib/articles/blog-posts.ts", slug: "what-we-see-after-a-triangle-hailstorm", si: 0, pi: 3, anchor: "bruises", hint: "It bruises the shingle", target: G("hail-bruising") },
  { file: "lib/articles/blog-posts.ts", slug: "what-we-see-after-a-triangle-hailstorm", si: 1, pi: 1, anchor: "granules", hint: "coated in fine granules", target: G("granules") },
  { file: "lib/articles/blog-posts.ts", slug: "why-we-always-do-a-full-tear-off", si: 2, pi: 0, anchor: "Underlayment", hint: "Underlayment is the protective sheet", target: G("underlayment") },
  { file: "lib/articles/blog-posts.ts", slug: "why-we-always-do-a-full-tear-off", si: 1, pi: 0, anchor: "deck", hint: "The deck, also called the sheathing", target: G("roof-decking") },
  { file: "lib/articles/blog-posts.ts", slug: "why-we-always-do-a-full-tear-off", si: 1, pi: 3, anchor: "tear-off", hint: "A tear-off is the only way", target: G("tear-off") },
  { file: "lib/articles/blog-posts.ts", slug: "spotting-a-storm-chaser", si: 0, pi: 1, anchor: "storm chasers", hint: "a name for them: storm chasers", target: G("storm-chaser") },
];

// Direction 2 — glossary body → location hub (max 1) and/or /services/* (max 1).
const GLOSSARY_LINKS = [
  { slug: "roof-deductible", anchor: "North Carolina", hint: "In North Carolina it is against the law", target: "/service-areas", kind: "location" },
  { slug: "flashing", anchor: "repair", hint: "A good repair finds and reseals the failed flashing", target: "/services/roof-repair" },
  { slug: "underlayment", anchor: "replacement", hint: "A quality replacement uses a proper synthetic", target: "/services/roof-replacement" },
  { slug: "drip-edge", anchor: "gutter", hint: "drips cleanly off and into the gutter", target: "/services/gutters" },
  { slug: "ridge-vent", anchor: "ridge ventilation", hint: "ridge ventilation is one of the cheapest ways", target: "/services/roof-ventilation" },
  { slug: "soffit", anchor: "attic ventilation", hint: "attic ventilation stalls no matter how good", target: "/services/roof-ventilation" },
  { slug: "fascia", anchor: "gutters", hint: "properly rehanging the gutters breaks that cycle", target: "/services/gutters" },
  { slug: "roof-valley", anchor: "repairs", hint: "Many repairs that get blamed on the shingles", target: "/services/roof-repair" },
  { slug: "roof-decking", anchor: "decking replacement", hint: "per-sheet price for decking replacement", target: "/services/roof-replacement" },
  { slug: "ice-and-water-shield", anchor: "replacement", hint: "A quality replacement specifies where it goes", target: "/services/roof-replacement" },
  { slug: "granules", anchor: "documented inspection", hint: "worth a documented inspection to learn", target: "/services/roof-inspection" },
  { slug: "class-4-shingles", anchor: "storm repairs", hint: "That can mean fewer storm repairs", target: "/services/roof-repair" },
  { slug: "tear-off", anchor: "replacement", hint: "why a thorough replacement costs more", target: "/services/roof-replacement" },
  { slug: "roof-overlay", anchor: "replacement", hint: "when the next replacement requires tearing off", target: "/services/roof-replacement" },
  { slug: "pipe-boot", anchor: "repair", hint: "cheapest and quickest to repair", target: "/services/roof-repair" },
  { slug: "sub-fascia", anchor: "fascia or gutter repair", hint: "during a fascia or gutter repair", target: "/services/roof-repair" },
  { slug: "three-tab-shingles", anchor: "repair", hint: "If a repair is meant to match an existing three-tab roof", target: "/services/roof-repair" },
  { slug: "ridge-cap-shingles", anchor: "repair", hint: "often a straightforward repair rather than a sign", target: "/services/roof-repair" },
  { slug: "hip-roof", anchor: "inspection", hint: "after a wind-mitigation inspection", target: "/services/roof-inspection" },
  { slug: "gable-roof", anchor: "attic ventilation", hint: "carries a gable vent for attic ventilation", target: "/services/roof-ventilation" },
  { slug: "dormer", anchor: "flashing repair", hint: "A targeted flashing repair is usually all", target: "/services/roof-repair" },
  { slug: "eave", anchor: "gutters", hint: "why gutters are hung at the eave", target: "/services/gutters" },
  { slug: "rake-edge", anchor: "inspection", hint: "a punch-list item at any inspection", target: "/services/roof-inspection" },
  { slug: "step-flashing", anchor: "repair", hint: "a targeted, well-understood repair", target: "/services/roof-repair" },
  { slug: "counter-flashing", anchor: "repair", hint: "A repair that only reseals one half", target: "/services/roof-repair" },
  { slug: "chimney-cricket", anchor: "inspection", hint: "belongs on the inspection list", target: "/services/roof-inspection" },
  { slug: "gutter-apron", anchor: "gutters", hint: "assuming the gutters themselves are at fault", target: "/services/gutters" },
  { slug: "soffit-vent", anchor: "Attic ventilation", hint: "Attic ventilation works as a two-part system", target: "/services/roof-ventilation" },
  { slug: "gable-vent", anchor: "ridge and soffit system", hint: "upgraded to a full ridge and soffit system", target: "/services/roof-ventilation" },
  { slug: "turbine-vent", anchor: "ventilation", hint: "when an attic needs ventilation most", target: "/services/roof-ventilation" },
  { slug: "attic-baffles", anchor: "ventilation system", hint: "the whole ventilation system stalls", target: "/services/roof-ventilation" },
  { slug: "shingle-blistering", anchor: "ventilation problem", hint: "point to a ventilation problem baking", target: "/services/roof-ventilation" },
  { slug: "shingle-curling", anchor: "replaced", hint: "watched, repaired, or replaced", target: "/services/roof-replacement" },
  { slug: "nail-pops", anchor: "quick, low-cost fix", hint: "usually a quick, low-cost fix", target: "/services/roof-repair" },
  { slug: "hail-bruising", anchor: "documented inspection", hint: "A documented inspection is the starting point", target: "/services/roof-inspection" },
  { slug: "wind-uplift", anchor: "documented inspection", hint: "warrants a documented inspection focused", target: "/services/roof-inspection" },
  { slug: "recoverable-depreciation", anchor: "repair", hint: "delaying the repair can put that second check", target: "/services/roof-repair" },
  { slug: "algae-resistant-shingles", anchor: "new roof", hint: "choosing shingles for a new roof", target: "/services/roof-replacement" },
  { slug: "re-decking", anchor: "roof replacement", hint: "one specific point in a roof replacement", target: "/services/roof-replacement" },
];

const fails = [];
const count = (hay, needle) => hay.split(needle).length - 1;
const firstSentenceEnd = (p) => {
  const m = p.match(/[.!?](\s|$)/);
  return m ? m.index + m[0].length : p.length;
};

// Per-article/per-glossary caps.
const byArticle = {};
for (const l of ARTICLE_LINKS) (byArticle[l.slug] ??= []).push(l);
for (const [slug, ls] of Object.entries(byArticle)) {
  if (ls.length > 3) fails.push(`article ${slug}: ${ls.length} glossary links (>3)`);
  if (new Set(ls.map((l) => l.target)).size !== ls.length) fails.push(`article ${slug}: duplicate target`);
}
const byGlossary = {};
for (const l of GLOSSARY_LINKS) (byGlossary[l.slug] ??= []).push(l);
for (const [slug, ls] of Object.entries(byGlossary)) {
  if (ls.filter((l) => l.target.startsWith("/services/")).length > 1) fails.push(`glossary ${slug}: >1 service link`);
  if (ls.filter((l) => l.kind === "location").length > 1) fails.push(`glossary ${slug}: >1 location link`);
  if (new Set(ls.map((l) => l.target)).size !== ls.length) fails.push(`glossary ${slug}: duplicate target`);
}

// Compute edits in memory.
const fileEdits = new Map(); // file -> [{oldStr,newStr,desc}]
function addEdit(file, oldStr, newStr, desc) {
  if (!fileEdits.has(file)) fileEdits.set(file, { text: fs.readFileSync(file, "utf8"), edits: [] });
  fileEdits.get(file).edits.push({ oldStr, newStr, desc });
}

// Group by paragraph so multiple links in one paragraph compose into one edit.
const paraGroups = new Map();
for (const l of ARTICLE_LINKS) {
  const key = `${l.file}|${l.slug}|${l.si}|${l.pi}`;
  if (!paraGroups.has(key)) paraGroups.set(key, []);
  paraGroups.get(key).push(l);
}
for (const [key, ls] of paraGroups) {
  const l0 = ls[0];
  const art = MODULES[l0.file].find((a) => a.slug === l0.slug);
  if (!art) { fails.push(`${l0.slug}: article not found in ${l0.file}`); continue; }
  const para = art.sections?.[l0.si]?.body?.[l0.pi];
  if (typeof para !== "string") { fails.push(`${key}: paragraph missing`); continue; }
  if (para.includes("[")) { fails.push(`${key}: already contains link syntax`); continue; }
  let newPara = para;
  for (const l of ls) {
    if (count(l.hint, l.anchor) !== 1) { fails.push(`${key}: anchor "${l.anchor}" not unique inside hint`); continue; }
    if (count(newPara, l.hint) !== 1) { fails.push(`${key}: hint "${l.hint}" occurs ${count(newPara, l.hint)}x in paragraph`); continue; }
    if (l.si === 0 && l.pi === 0 && newPara.indexOf(l.hint) < firstSentenceEnd(newPara)) {
      fails.push(`${l.slug} s0p0: link inside first sentence`); continue;
    }
    newPara = newPara.replace(l.hint, l.hint.replace(l.anchor, `[${l.anchor}](${l.target})`));
  }
  if (newPara !== para) addEdit(l0.file, para, newPara, `${l0.slug} s${l0.si}p${l0.pi} (${ls.length} link(s))`);
}

for (const l of GLOSSARY_LINKS) {
  const t = GLOSSARY_TERMS.find((x) => x.slug === l.slug);
  if (!t) { fails.push(`glossary ${l.slug}: term not found`); continue; }
  if (t.body.includes("[")) { fails.push(`glossary ${l.slug}: body already contains link syntax`); continue; }
  if (count(l.hint, l.anchor) !== 1) { fails.push(`glossary ${l.slug}: anchor not unique inside hint`); continue; }
  if (count(t.body, l.hint) !== 1) { fails.push(`glossary ${l.slug}: hint "${l.hint}" occurs ${count(t.body, l.hint)}x in body`); continue; }
  const newBody = t.body.replace(l.hint, l.hint.replace(l.anchor, `[${l.anchor}](${l.target})`));
  // Source form: the body literal uses \n\n escapes.
  if (/["\\]/.test(t.body)) { fails.push(`glossary ${l.slug}: body contains quote/backslash, handle manually`); continue; }
  addEdit("lib/articles/glossary.ts", t.body.replace(/\n/g, "\\n"), newBody.replace(/\n/g, "\\n"), `glossary ${l.slug} [${l.anchor}]->${l.target}`);
}

if (fails.length) {
  console.log("POUR ABORTED — nothing written. Failures:");
  fails.forEach((f) => console.log("  " + f));
  process.exit(1);
}

// Apply: each edit's oldStr must occur exactly once in the (progressively edited) file text.
let applied = 0;
for (const [file, rec] of fileEdits) {
  let text = rec.text;
  for (const e of rec.edits) {
    if (count(text, e.oldStr) !== 1) {
      console.log(`POUR ABORTED at ${file}: oldStr not unique for ${e.desc} (count=${count(text, e.oldStr)}). No files written.`);
      process.exit(1);
    }
    text = text.replace(e.oldStr, e.newStr);
    applied++;
    console.log(`  ${file}: ${e.desc}`);
  }
  fs.writeFileSync(file, text);
}
console.log(`\nPOUR OK: ${applied} links inserted (${ARTICLE_LINKS.length} article->glossary, ${GLOSSARY_LINKS.length} glossary->location/service).`);
