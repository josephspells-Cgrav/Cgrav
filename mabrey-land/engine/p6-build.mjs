// P6 — deterministic scoring + site dataset build (PLAN_FINAL weights, golden-tested).
import { readFileSync, writeFileSync } from "node:fs";

const TASK_OUT = "C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/fb6da21a-e439-4d96-9b37-69a2297b442f/tasks/ww8674zt9.output";
const JOURNAL = "C:/Users/josep/.claude/projects/C--Users-josep-Claude-Gravity/fb6da21a-e439-4d96-9b37-69a2297b442f/subagents/workflows/wf_fcb0efd5-27d/journal.jsonl";
const OUT_DIR = "C:/Users/josep/Claude Gravity/mabrey-land";

const wrapper = JSON.parse(readFileSync(TASK_OUT, "utf8"));
const R = typeof wrapper.result === "string" ? JSON.parse(wrapper.result) : wrapper.result;
console.log("result keys:", Object.keys(R));
console.log("lots:", R.lots.length, "counts:", JSON.stringify(R.counts));

// ---- county GIS map from the census agent in the journal ----
let countyGis = {};
for (const line of readFileSync(JOURNAL, "utf8").trim().split("\n")) {
  try {
    const j = JSON.parse(line);
    const s = typeof j.result === "string" ? j.result : JSON.stringify(j.result ?? "");
    if (s.includes("gisUrl")) {
      const m = s.match(/\{[\s\S]*\}/);
      const parsed = JSON.parse(typeof j.result === "string" ? m[0] : s);
      for (const c of parsed.counties || []) if (c.county && c.gisUrl) countyGis[c.county] = c.gisUrl;
    }
  } catch (e) { /* keep scanning */ }
}
console.log("countyGis entries:", Object.keys(countyGis).length);

// ---- deterministic buildScore (PLAN_FINAL weights, sum 100) ----
function scoreSewerWater(l) {
  const w = l.waterHint, s = l.sewerHint;
  if (w === "municipal" && s === "municipal") return 25;
  if (w === "municipal" || s === "municipal") return 18;
  if (s === "septic-installed") return 15;
  if (s === "septic-needed") return 10;
  return 8;
}
function scorePerc(l) {
  return l.percStatus === "approved" ? 15 : l.percStatus === "none-stated" ? 6 : l.percStatus === "expired" ? 3 : 5;
}
function scoreAccess(l) { const a = Number.isFinite(l._access) ? l._access : 2; return Math.max(0, Math.min(5, a)) * 3; }
function scorePrice(l, med) {
  if (l.price == null || !l.acres || !med) return 5;
  const r = (l.price / l.acres) / med;
  return r <= 0.6 ? 15 : r <= 0.85 ? 12 : r <= 1.15 ? 9 : r <= 1.5 ? 5 : 2;
}
function killFlags(l) {
  let n = 0;
  if (["A", "AE", "in-buffer"].includes(l.floodZone)) n++;
  if (l.puvFlag === "yes") n++;
  if (l.legalAccess === "easement") n++;
  if (l.legalAccess === "landlocked") n++;
  if (l.buyoutSuspect) n++;
  return Math.max(0, 15 - 5 * n);
}
function scoreDrive(l) {
  const d = l.driveMinToRaleigh;
  if (d == null) return 4;
  return d <= 30 ? 10 : d <= 45 ? 8 : d <= 60 ? 6 : d <= 75 ? 4 : 2;
}
function scoreBurden(l) { const b = Number.isFinite(l._burden) ? l._burden : 2; return Math.max(0, 5 - b); }
function buildScore(l, med) {
  return scoreSewerWater(l) + scorePerc(l) + scoreAccess(l) + scorePrice(l, med) + killFlags(l) + scoreDrive(l) + scoreBurden(l);
}

// ---- golden tests (to the point) ----
const gold = [
  { l: { waterHint: "municipal", sewerHint: "municipal", percStatus: "approved", _access: 5, price: 60000, acres: 2, floodZone: "none-found", puvFlag: "no", legalAccess: "deeded", driveMinToRaleigh: 25, _burden: 0 }, med: 50000, want: 25 + 15 + 15 + 15 + 15 + 10 + 5 }, // $30k/ac vs $50k med = 0.6 ratio -> the <=60% rung (15)
  { l: { waterHint: "well", sewerHint: "septic-needed", percStatus: "unknown", _access: 2, price: 200000, acres: 1, floodZone: "AE", puvFlag: "unknown", legalAccess: "easement", driveMinToRaleigh: 80, _burden: 3 }, med: 100000, want: 10 + 5 + 6 + 2 + 5 + 2 + 2 },
  { l: { waterHint: "unknown", sewerHint: "unknown", percStatus: "none-stated", _access: 3, price: null, acres: null, floodZone: "unknown", legalAccess: "unknown", driveMinToRaleigh: 45, _burden: 2 }, med: null, want: 8 + 6 + 9 + 5 + 15 + 8 + 3 },
];
for (const [i, g] of gold.entries()) {
  const got = buildScore(g.l, g.med);
  if (got !== g.want) { console.error(`GOLDEN FAIL #${i + 1}: got ${got} want ${g.want}`); process.exit(1); }
}
console.log("golden tests: 3/3 PASS");

// ---- county medians ($/acre) from verified-live lots ----
const live = R.lots.filter((l) => l.status === "verified-live" && l.price && l.acres);
const byCounty = {};
for (const l of live) (byCounty[l.county] ??= []).push(l.price / l.acres);
const medians = {};
let all = live.map((l) => l.price / l.acres).sort((a, b) => a - b);
const overallMed = all.length ? all[Math.floor(all.length / 2)] : null;
for (const [c, arr] of Object.entries(byCounty)) {
  arr.sort((a, b) => a - b);
  medians[c] = arr.length >= 3 ? arr[Math.floor(arr.length / 2)] : overallMed;
}
console.log("overall median $/ac:", Math.round(overallMed));

// ---- county normalization (verifiers wrote prose into some county fields) ----
const KNOWN = ["Wake","Johnston","Harnett","Franklin","Durham","Orange","Chatham","Granville","Nash","Wilson","Vance","Person","Warren","Lee","Moore","Wayne","Sampson","Cumberland","Hoke","Alamance","Caswell","Edgecombe","Pitt","Randolph","Halifax","Northampton","Greene","Lenoir","Duplin","Guilford"];
for (const l of R.lots) {
  let c = String(l.county || "").trim();
  const exact = KNOWN.find((k) => c === k || c === k + " County");
  if (exact) { l.county = exact; continue; }
  const hit = KNOWN.find((k) => c.startsWith(k));
  if (hit) {
    l.county = hit;
    if (l.status === "verified-live") l.status = "unverified"; // county doubt = not fully verified
    l.notes = ((l.notes || "") + " | county uncertain: " + c.slice(0, 90)).slice(0, 300);
  } else if (c.length > 20) {
    l.county = "Unconfirmed";
    if (l.status === "verified-live") l.status = "unverified";
    l.notes = ((l.notes || "") + " | county unconfirmed: " + c.slice(0, 90)).slice(0, 300);
  }
}

// ---- score + map to site schema ----
const ship = R.lots.filter((l) => l.status !== "killed");
const slugCount = {};
const siteLots = ship.map((l) => {
  const score = buildScore(l, medians[l.county] ?? overallMed);
  let slug = `${l.county}-${(l.area || "x").replace(/\W+/g, "")}-${l.price ?? "na"}`.toLowerCase();
  slugCount[slug] = (slugCount[slug] || 0) + 1;
  if (slugCount[slug] > 1) slug += `-${slugCount[slug]}`;
  const floodNote = l.floodZone === "A" || l.floodZone === "AE" ? `flood zone ${l.floodZone}` : l.floodZone === "in-buffer" ? "stream buffer" : "";
  return {
    id: slug, title: l.title || "Lot", price: l.price ?? null, acres: l.acres ?? null,
    pricePerAcre: l.price && l.acres ? Math.round(l.price / l.acres) : null,
    county: l.county, area: l.area || "", address: l.address || "",
    lat: l.lat ?? null, lng: l.lng ?? null, latlngApprox: !!l.latlngApprox,
    zoning: l.zoning && l.zoning !== "unknown" ? l.zoning : "",
    utilities: { water: l.waterHint || "unknown", sewer: l.sewerHint || "unknown" },
    roadFrontage: l.roadFrontage || "unknown", percStatus: l.percStatus || "unknown",
    floodNote, restrictions: (l.restrictions || "").slice(0, 120),
    parcelId: l.parcelId || "", mlsNumber: l.mlsNumber || "",
    source: l.source || "", url: l.url,
    driveMinToRaleigh: l.driveMinToRaleigh ?? null,
    verifiedAt: l.verifiedAt || R.method.date, status: l.status,
    buildScore: score, buildNotes: (l.notes || "").slice(0, 220),
  };
});

// ---- knowledge: mechanics -> counties -> offmarket -> county guides -> market read -> method ----
const knowledge = [];
const keyOrder = ["mechanics", "counties", "offmarket"];
for (const key of keyOrder) {
  const k = (R.knowledge || []).find((x) => x.key === key);
  for (const s of k?.sections || []) knowledge.push({ title: s.title, html: s.html });
}
const syn = R.synthesis || {};
if (syn.marketRead) knowledge.unshift({ title: "How tight is this market, really?", html: `<p>${syn.marketRead}</p>` });
for (const g of syn.countyGuides || []) knowledge.push({ title: `${g.county} County — what the money buys`, html: g.html });
if (Array.isArray(syn.gapsLedger) && syn.gapsLedger.length) {
  knowledge.push({ title: "What this list does NOT cover (honest gaps)", html: `<ul>${syn.gapsLedger.map((g) => `<li>${g}</li>`).join("")}</ul>` });
}

const out = {
  verifiedAt: R.method.date + " (evening)",
  methodNote: syn.methodNote || "",
  countyGis,
  lots: siteLots,
  knowledge,
};
writeFileSync(`${OUT_DIR}/site/lots.json`, JSON.stringify(out));
const kb = Math.round(JSON.stringify(out).length / 1024);
console.log(`site/lots.json written: ${siteLots.length} lots · ${knowledge.length} knowledge sections · ${kb}KB`);

// ---- receipts: archive + Sean's off-market doc ----
writeFileSync(`${OUT_DIR}/data-full-result.json`, JSON.stringify(R, null, 1));
const om = `# Off-market scouting notes — Sean\n\nGenerated 2026-08-05 by the land campaign.\n\n${(R.offmarketNotes || []).map((n, i) => `## Area note ${i + 1}\n${n}\n`).join("\n")}\n\n## Critic verdict\n${JSON.stringify(R.critic?.verdict || "")}\n`;
writeFileSync(`${OUT_DIR}/OFFMARKET-SCOUT.md`, om);

// ---- stats for the report ----
const counts = { "verified-live": 0, unverified: 0, "stale-risk": 0 };
for (const l of siteLots) counts[l.status] = (counts[l.status] || 0) + 1;
console.log("ship counts:", JSON.stringify(counts), "· killed (not shipped):", R.counts.killed);
const top = [...siteLots].filter((l) => l.status === "verified-live").sort((a, b) => b.buildScore - a.buildScore).slice(0, 8);
console.log("TOP verified by buildScore:");
for (const t of top) console.log(`  ${t.buildScore} | $${t.price?.toLocaleString()} | ${t.acres}ac | ${t.county}/${t.area} | ${t.driveMinToRaleigh}min`);
const byC = {};
for (const l of siteLots.filter((x) => x.status === "verified-live")) byC[l.county] = (byC[l.county] || 0) + 1;
console.log("verified by county:", JSON.stringify(byC));
