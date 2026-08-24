/* ---------------------------------------------------------------------------
 * THE DATA LAYER — every taught number, with its evidence flag INTACT.
 * WO_02 reframe (M1): the enemy is the generic 10-page BROCHURE site, NOT
 * GoHighLevel. The 1,017-site scan stays as KM's strongest MEASURED SAMPLE of
 * the brochure problem (reframed, not "the villain"). Page-count is locked to
 * ONE constant = 147 (M5). §8 honesty corrections are load-bearing (FTC-exposed)
 * and are the WEAPON: lead with measured gaps; promise the floor, project the
 * ceiling; never "nobody clicks ads"; ranges not hype. Every component that
 * renders a number pulls it from HERE with its `flag`.
 * ------------------------------------------------------------------------- */

export type Flag = "MEASURED" | "MODELED" | "ILLUSTRATIVE";

export const FLAG_LABEL: Record<Flag, string> = {
  MEASURED: "Measured",
  MODELED: "Modeled",
  ILLUSTRATIVE: "Illustrative",
};

/* ── THE REFRAME (M1) ─────────────────────────────────────────────────────── */
export const ONE_LINE =
  "A brochure describes your business. An authority site is a ranking system. We scanned 1,017 contractor sites to measure the gap.";

/** The brochure's structural ceiling — the core education point (de-GHL). */
export const STRUCTURAL_KILLER =
  "A brochure can rank for your name and the block your office sits on. It has no page for the hundreds of other things a buyer searches, so it loses every one of them to whoever built the page.";

/** The measured sample — the 1,017-site scan (WO_04, BROKEN_ROOFER report). One
 * trade scanned end to end; the missing page-types are structural, so the same
 * gaps show up in every trade. */
export const SITES_SCRUBBED = 1017;
export const SAMPLE_NOTE =
  "We scanned 1,017 live contractor sites in a single trade, end to end. The missing pieces are structural, not cosmetic, so the same gaps show up in every trade.";

/* ── PAGE-COUNT: ONE NUMBER, FROM ONE CONSTANT (M5) ───────────────────────── */
export const BROCHURE_PAGES = 10;
export const ENTERPRISE_PAGES = 147; // the shipped roofing reference build (Summit & Oak)
export const RELEVANCY_MULTIPLE = 15; // ~147/10, stated conservatively + flagged
export const RELEVANCY = {
  brochurePages: BROCHURE_PAGES,
  enterprisePages: ENTERPRISE_PAGES,
  multiple: RELEVANCY_MULTIPLE,
};
export const DEPTH = { medianBrochurePages: BROCHURE_PAGES, enterpriseUrls: ENTERPRISE_PAGES };

/* ── THE BROAD GAP WALL (§8 CORRECTED — V3) ───────────────────────────────── */
/* The fundamentals most CONTRACTOR sites miss. The stale "60% no site" is GONE
 * (→ ~27%). These are the broad-web measured figures; the 1,017-site sample
 * (MEASURED_GAPS below) is KM's proprietary panel. */
export const GAP_WALL: { pct: number; label: string; flag: Flag; source: string }[] = [
  { pct: 94.8, label: "of homepages fail WCAG accessibility", flag: "MEASURED", source: "WebAIM Million 2025" },
  { pct: 52, label: "of pages fail Core Web Vitals", flag: "MEASURED", source: "CrUX-based audits" },
  { pct: 27, label: "of small businesses have no dedicated website", flag: "MEASURED", source: "Clutch 2025" },
  { pct: 96, label: "of sites ship no LocalBusiness schema", flag: "MODELED", source: "web-crawl estimate" },
];

/* KM's proprietary 1,017-site sample — % MISSING each lever (the strongest panel).
 * Framed in-component as "contractor sites we scanned," not one vendor. */
export const MEASURED_GAPS: { pct: number; label: string }[] = [
  { pct: 100, label: "no hreflang" },
  { pct: 89, label: "no brand pages" },
  { pct: 76, label: "no cost content" },
  { pct: 73, label: "no pricing calculator" },
  { pct: 73, label: "no llms.txt (AI-invisible)" },
  { pct: 62, label: "no keyword + geo titles" },
  { pct: 53, label: "no location pages" },
  { pct: 52, label: "no LocalBusiness schema" },
];

/* ── THE FINDABILITY GAP — the 1,017-site scan, as 4 two-part cards (WO_04 F1).
 * FINDABILITY ONLY (not conversion): can Google + AI even find them? The bad
 * numbers render RED (the damage signal). MEASURED = static-HTML-verified (the
 * presence/absence of a page or tag is a fact, not a projection). Roofers were
 * the scanned sample; the missing page-types are universal to every trade.
 * Each card: a big red %, the label, then "what it costs them" (3 bullets). */
export const FINDABILITY_FLAG: Flag = "MEASURED";
export const FINDABILITY_GAPS: { pct: number; label: string; why: string; icon: "pin" | "title" | "code" | "doc"; cost: string[] }[] = [
  {
    pct: 57,
    icon: "pin",
    label: "no real location pages",
    why: "Why Google can't see you",
    cost: [
      "Only ranks inside the ~10-mile Google Business Profile radius",
      "No page to rank for '[service] in [nearby town]'",
      "Competitors with town pages quietly take that work",
      "A buyer one town over never sees them",
      "Every town with no page = leads handed to a competitor",
    ],
  },
  {
    pct: 70,
    icon: "title",
    label: "no keyword + city titles",
    why: "Why Google doesn't know what you do",
    cost: [
      "The title never names the service or the city",
      "Loses the exact search a ready buyer types",
      "Generic 'Home' titles match nothing specific",
      "Google can't tell what they do, or where",
      "The easiest fix in SEO — and most skip it",
    ],
  },
  {
    pct: 56,
    icon: "code",
    label: "no business schema",
    why: "Why Google doesn't know your services",
    cost: [
      "No machine-readable markup in the code",
      "No stars, hours, or service area in the result",
      "AI assistants skip a business they can't parse",
      "Google + AI can't confirm who or where they are",
      "Locked out of rich results and AI answers",
    ],
  },
  {
    pct: 71,
    icon: "doc",
    label: "no llms.txt file",
    why: "Why AI won't cite you",
    cost: [
      "No file telling AI engines what they are",
      "No say in how AI describes the business",
      "Competitors with a file get cited first",
      "Content often trapped in JavaScript AI can't read",
      "Ask ChatGPT \"best contractor near me\" — absent",
    ],
  },
];

/* ── THE SIDE-BY-SIDE (§8: lead with MEASURED structural contrast, drop the
 * unsourced jobs/visitors) ────────────────────────────────────────────────── */
export const SIDE_BY_SIDE: { label: string; brochure: string; system: string; flag: Flag }[] = [
  { label: "Pages Google can rank", brochure: String(BROCHURE_PAGES), system: String(ENTERPRISE_PAGES), flag: "MEASURED" },
  { label: "LocalBusiness schema", brochure: "No", system: "Yes", flag: "MEASURED" },
  { label: "Query surface", brochure: "Narrow", system: "Wide", flag: "MEASURED" },
  { label: "AI-answer legibility", brochure: "No", system: "Yes", flag: "MEASURED" },
];

/* ── V2 / V14: per-trade page counts. Roofing 147 = the MEASURED live reference
 * build (Summit & Oak); the others are TYPICAL authority-build depths (MODELED,
 * placeholder values that vary by scope) — scattered, not a clean ramp. ───── */
export const TRADE_PAGES_FLAG: Flag = "MODELED";
export const TRADE_PAGES: { trade: string; slug: string; brochure: number; authority: number; plus?: boolean }[] = [
  { trade: "Roofing", slug: "roofing", brochure: 10, authority: 147 },
  { trade: "Painting", slug: "painting", brochure: 10, authority: 118 },
  { trade: "HVAC", slug: "hvac", brochure: 10, authority: 176 },
  { trade: "Kitchen & Bath", slug: "kitchen-bath", brochure: 10, authority: 159 },
  { trade: "Outdoor Living", slug: "outdoor-living", brochure: 10, authority: 105 },
  { trade: "Plumbing", slug: "plumbing", brochure: 10, authority: 188 },
];

/* The page TYPES an authority build ships per trade — the dropdown content.
 * STANDARD comes on every build (skip the obvious; these are the depth levers).
 * INDUSTRY is trade-specific (highlighted blue on the home strip). */
export const STANDARD_PAGE_TYPES = [
  "Dedicated location pages",
  "Dedicated service pages",
  "Brand & manufacturer pages",
  "Pricing pages",
  "Estimate & quote pages",
];
export const TRADE_PAGE_TYPES: Record<string, string[]> = {
  roofing: [
    "Roof cost calculator",
    "How much does a roof cost",
    "Shingle vs. metal comparison",
    "Storm & insurance-claim guide",
    "Roofing materials glossary",
  ],
  painting: [
    "Paint cost calculator",
    "How much to paint a house",
    "Interior vs. exterior guides",
    "Finish & sheen glossary",
    "Color consultation page",
  ],
  hvac: [
    "AC & furnace sizing tool",
    "How much does a new AC cost",
    "Repair vs. replace guide",
    "SEER rating glossary",
    "Maintenance plan page",
  ],
  "kitchen-bath": [
    "Remodel cost estimator",
    "How much does a remodel cost",
    "Countertop & cabinet comparison",
    "Design-style gallery",
    "What-to-expect timeline",
  ],
  "outdoor-living": [
    "Deck & patio cost calculator",
    "How much does a deck cost",
    "Composite vs. wood comparison",
    "Design & layout gallery",
    "Permit & process guide",
  ],
  plumbing: [
    "Water-heater cost calculator",
    "How much does a repipe cost",
    "Tankless vs. tank comparison",
    "Emergency & burst-pipe guide",
    "Fixtures glossary",
  ],
};

/* ── Organic capture math (Dashboard) — anchored on a worked example: ~2,000
 * monthly searches for a service-in-city money term, our system capturing ~5×
 * the organic traffic of an average site. ILLUSTRATIVE (the 5× is the modeled
 * multiple). Neutral, trade-agnostic (WO_04). */
export const CAPTURE_MATH = {
  flag: "ILLUSTRATIVE" as Flag,
  term: "your service in your city",
  searches: 2000,
  avgCapturePct: 6,
  ourMultiple: 5,
  ourCapturePct: 30,
  avgVisits: 120,
  ourVisits: 600,
  convPct: 5,
  avgLeads: 6,
  ourLeads: 30,
};

/* ── V1: the signature compounding curve (ILLUSTRATIVE — the SHAPE is the claim,
 * not the units; paid is flat rent, organic compounds; crossover ~mo 12) ───── */
export const COMPOUNDING = {
  flag: "ILLUSTRATIVE" as Flag,
  months: 24,
  crossoverMonth: 12,
  organic: [8, 14, 22, 35, 55, 90, 140, 210, 300, 410, 540, 690, 860, 1040, 1230, 1430, 1640, 1860, 2090, 2330, 2580, 2840, 3110, 3390],
  paid: [590, 610, 630, 615, 625, 640, 600, 635, 620, 610, 630, 615, 625, 640, 600, 635, 620, 610, 630, 615, 625, 640, 600, 635],
  caption:
    "Paid traffic is rent: it stops the day you stop paying. Organic is equity: it compounds and keeps climbing after the spend flattens. Illustrative shape, not a forecast.",
};

/* ── §8 HONESTY LEDGER (centralized now; Phase-2 charts pull from here) ────── */
export const PAGE_AGE = { flag: "MEASURED" as Flag, over3yr: 72.9, oneToThree: 13.4, underOneYr: 13.7, avgNo1Years: 5, source: "Ahrefs page-age study" };
export const LONGTAIL = { flag: "MEASURED" as Flag, longTailPct: 95, zeroTrafficPct: 96.55, source: "Ahrefs (14B pages)" };
export const AEO = {
  flag: "MEASURED" as Flag,
  ctrDropApr: 34.5,
  ctrDropDec: 58,
  zeroClick: 60,
  citedClickLift: 35,
  citedNotTop10: 88, // 88% of AI-cited URLs do NOT rank top-10 — AI is its OWN surface (NOT "99.5% from top-10")
  source: "Ahrefs AI Overviews study",
};
export const JOURNEY = {
  shortlist3: 78, // 78% shortlist <=3 vendors (MEASURED, Wynter)
  dayOneShortlist: 95, // 95% pick a Day-One shortlist name (MEASURED)
  b2bDays: 272, // defensible MEASURED B2B journey (Dreamdata)
  researchWindowDays: 94, // ILLUSTRATIVE — no clean contractor source
  researchFlag: "ILLUSTRATIVE" as Flag,
  measuredFlag: "MEASURED" as Flag,
};
/* V4 — cost per lead. Snapshot (MEASURED ranges) + the amortized crossover
 * (ILLUSTRATIVE: organic effective CPL falls below paid ~month 5-6). */
export const CHANNEL_CPL = {
  flag: "MEASURED" as Flag,
  rows: [
    { channel: "Google / PPC", cpl: 228, range: "$100–500" },
    { channel: "Local Services Ads", cpl: 162, range: "$75–150+" },
    { channel: "Organic (mature)", cpl: 30, range: "$10–50", ours: true },
  ],
};
export const CPL_CURVE = {
  flag: "ILLUSTRATIVE" as Flag,
  crossoverMonth: 6,
  organic: [300, 210, 150, 110, 85, 68, 55, 46, 40, 36, 33, 31, 29, 27, 26, 25, 24, 23],
  paid: 190,
};

export const CONVERSION = {
  flag: "MEASURED" as Flag,
  bothChannelsClicks: 50, // +50% total clicks when in both organic + paid
  bothChannelsConversions: 27, // +27% conversions running both
  note: "Organic wins on cost, durable volume, and trust, not a higher click-conversion rate. Both channels together lift total clicks and conversions.",
};
/** GHL-rubric capacity scores — demoted from Home; kept for /work + honesty layer. */
export const RANKING_CAPACITY = { enterprise: 9, typicalSample: 3 };

/* ── THE REFERENCE BUILD + THE TRUST MOVE + THE WIN-LINE ──────────────────── */
export const REFERENCE_BUILD = {
  name: "Summit & Oak",
  pages: ENTERPRISE_PAGES,
  url: "https://kingmaker-summit-oak-roofing.vercel.app",
  blurb: `A live, enterprise-grade build. ${ENTERPRISE_PAGES} pages. Click every one, then audit it with any AI.`,
};

export const TRUST_MOVE =
  "Don't take my word. Take any number on this page, plug it into ChatGPT, Gemini, or Claude, and ask it to audit my audit. Then audit its audit's audit. I'll wait.";

/** "Bob's Roofing" — the labeled CRM/analytics DEMO for the home dashboard (WO_07
 * Edit 8). MODELED: a named SAMPLE of what a client's own dashboard would show,
 * never presented as real client data (the FTC honesty rail). One-shot motion only. */
export const CRM_DEMO = {
  flag: "MODELED" as Flag,
  company: "Bob's Roofing",
  kpis: { leads: 47, converted: 18, appointments: 12, visits: 600, rank: 4, multiple: 5 },
  leads: [
    { name: "Marcus Ellery", job: "Full roof replacement", value: "$14,200", status: "Converted" as const },
    { name: "Priya Nair", job: "Storm-damage inspection", value: "$8,650", status: "Appointment set" as const },
    { name: "Dale Whitfield", job: "Gutters + fascia repair", value: "$3,400", status: "Converted" as const },
    { name: "Sofia Restrepo", job: "Cost estimate request", value: "Pending", status: "New lead" as const },
    { name: "Trevor Banks", job: "Metal roof quote", value: "$21,900", status: "Appointment set" as const },
  ],
};

/** The win-line dashboard (kept) — ILLUSTRATIVE organic-position climb. */
export const DASHBOARD = {
  winLine: [42, 38, 31, 27, 22, 18, 14, 11, 9, 7, 5, 4],
  baseline: [44, 43, 44, 42, 43, 41, 42, 41, 42, 40, 41, 40],
  flag: "ILLUSTRATIVE" as Flag,
  caption:
    "Organic position for a money term over 12 months — the compounding climb of a ranking system vs. a thin site that never moves.",
};
