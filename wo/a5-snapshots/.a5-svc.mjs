/* Scratch scanner: glossary bodies containing service-remedy phrases. DELETE AFTER USE. */
import { GLOSSARY_TERMS } from "./lib/articles/glossary.ts";

const SERVICES = [
  ["/services/roof-replacement", ["replacement", "replace", "replaced", "replacing", "new roof"]],
  ["/services/roof-repair", ["repair", "repairs", "repaired", "fix", "leak"]],
  ["/services/roof-inspection", ["inspection", "inspect", "inspector"]],
  ["/services/gutters", ["gutter", "gutters"]],
  ["/services/roof-maintenance", ["maintenance", "maintain"]],
  ["/services/roof-ventilation", ["ventilation", "ventilate", "ventilated"]],
  ["/services/emergency-roof-repair", ["emergency", "tarp"]],
  ["/services/metal-roofing", ["metal roof", "metal roofing"]],
  ["/storm-damage", ["storm damage", "storm-damage"]],
  ["/storm-damage/insurance-claims", ["insurance claim", "claim"]],
];

for (const t of GLOSSARY_TERMS) {
  const paras = t.body.split(/\n\n+/);
  const found = [];
  paras.forEach((p, i) => {
    for (const [path, phrases] of SERVICES) {
      for (const ph of phrases) {
        const re = new RegExp("\\b" + ph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        const m = p.match(re);
        if (m) {
          found.push({ i, path, hit: m[0], ctx: p.slice(Math.max(0, m.index - 50), m.index + 60) });
          break;
        }
      }
    }
  });
  if (found.length) {
    console.log(`\n### ${t.slug}  (money: ${t.relatedMoneySlug ?? "-"})`);
    for (const f of found.slice(0, 6)) console.log(`  p${f.i} ${f.path} "${f.hit}"  …${f.ctx}…`);
  }
}
