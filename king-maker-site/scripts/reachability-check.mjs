/* No-orphan BFS self-test (WO_02 §13). The site must pass the same ≤2-click
 * reachability check it teaches ("built ≠ reachable"). BFS from "/" following
 * internal <a href> links to depth 2; every route in the sitemap must be in the
 * reachable set. Run against a live server: node scripts/reachability-check.mjs
 * [baseURL]. Exits non-zero if any sitemap route is an orphan. */

const BASE = process.argv[2] || process.env.PW_BASE_URL || "http://localhost:3310";
const MAX_DEPTH = 2;

const norm = (p) => {
  try {
    const u = new URL(p, BASE);
    if (u.origin !== new URL(BASE).origin) return null; // external
    let path = u.pathname.replace(/\/+$/, "");
    return path === "" ? "/" : path;
  } catch {
    return null;
  }
};

async function linksOf(path) {
  const res = await fetch(BASE + path, { headers: { "user-agent": "km-reachability" } });
  if (!res.ok) return [];
  const html = await res.text();
  const out = new Set();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const n = norm(m[1]);
    if (n && !n.startsWith("/_next") && !n.includes(".")) out.add(n);
  }
  return [...out];
}

// Sitemap <loc>s use the production canonical origin; compare by PATH only.
const pathOf = (u) => {
  try {
    let p = new URL(u).pathname.replace(/\/+$/, "");
    return p === "" ? "/" : p;
  } catch {
    return null;
  }
};

async function sitemapRoutes() {
  const res = await fetch(BASE + "/sitemap.xml");
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => pathOf(m[1])).filter(Boolean);
}

(async () => {
  const targets = await sitemapRoutes();
  const reachable = new Set(["/"]);
  let frontier = ["/"];
  for (let d = 0; d < MAX_DEPTH; d++) {
    const next = [];
    for (const p of frontier) {
      for (const l of await linksOf(p)) {
        if (!reachable.has(l)) {
          reachable.add(l);
          next.push(l);
        }
      }
    }
    frontier = next;
  }
  const orphans = targets.filter((t) => !reachable.has(t));
  console.log(`reachability: ${targets.length} sitemap routes · ${reachable.size} reachable ≤${MAX_DEPTH} clicks`);
  if (orphans.length) {
    console.error("ORPHANS (not reachable ≤2 clicks from home):");
    for (const o of orphans) console.error("  " + o);
    process.exit(1);
  }
  console.log("PASS — no orphans. Every sitemap route is reachable within 2 clicks.");
})();
