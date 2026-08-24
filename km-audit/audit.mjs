// KM Audit — caveman v0. URL in -> branded 16:9 dashboard (km-audit/index.html), built to screenshot in ONE shot.
// Run: node audit.mjs https://someroofer.com   (optional: PAGESPEED_KEY env for reliable speed scores)
import fs from 'node:fs';
import path from 'node:path';

const url = process.argv[2];
if (!url) { console.error('usage: node audit.mjs <url>'); process.exit(1); }
const target = url.startsWith('http') ? url : `https://${url}`;
const origin = new URL(target).origin;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

const HEADERS = { 'user-agent': UA, 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'accept-language': 'en-US,en;q=0.9' };
const visibleLen = (t) => (t || '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length;
const get = async (u, tries = 3) => {
  let last = { ok: false, status: 0, text: '', finalUrl: u };
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(u, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(20000) });
      const text = await r.text();
      last = { ok: r.ok, status: r.status, text, finalUrl: r.url };
      // retry on a 200 that came back suspiciously empty (WAF challenge / unrendered shell) — only for HTML pages
      if (r.ok && /\.(xml)(\?|$)/i.test(u) === false && visibleLen(text) < 200 && i < tries - 1) { await new Promise(s => setTimeout(s, 600)); continue; }
      return last;
    } catch (e) { last = { ok: false, status: 0, text: '', finalUrl: u, err: String(e.message || e) }; }
  }
  return last;
};

const home = await get(target);
const html = home.text || '';
const rb = await get(`${origin}/robots.txt`);
// Robust sitemap discovery: robots.txt "Sitemap:" directive -> common paths -> follow ALL child sitemaps.
// (Most roofers run WordPress, which serves /sitemap_index.xml — checking only /sitemap.xml gives false "no pages".)
const parseLocs = (t) => [...t.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1].trim());
const smCandidates = [...(rb.text || '').matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1].trim());
smCandidates.push(`${origin}/sitemap_index.xml`, `${origin}/sitemap.xml`, `${origin}/wp-sitemap.xml`, `${origin}/sitemap-index.xml`);
let sm = { ok: false, text: '' };
let locs = [];
for (const cand of smCandidates) {
  const r = await get(cand);
  if (!r.ok || !/<loc>/i.test(r.text)) continue;
  sm = r;
  const raw = parseLocs(r.text);
  const children = raw.filter(l => /\.xml(\?|$)/i.test(l));
  if (children.length >= Math.max(1, raw.length * 0.6)) {       // it's a sitemap index -> fetch the children
    for (const c of children.slice(0, 15)) {
      const cr = await get(c);
      if (cr.ok) locs.push(...parseLocs(cr.text).filter(l => !/\.xml(\?|$)/i.test(l)));
    }
  } else {
    locs = raw;
  }
  break;
}

// --- PageSpeed Insights (mobile): real Lighthouse perf + Core Web Vitals field data ---
let perf = null, lcpMs = null, cwvCat = null, psiOk = false;
try {
  const key = process.env.PAGESPEED_KEY || process.env.PSI_KEY || '';
  const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=mobile&category=performance${key ? `&key=${key}` : ''}`;
  const pr = await fetch(psiUrl, { signal: AbortSignal.timeout(40000) });
  if (pr.ok) {
    const j = await pr.json();
    const lh = j.lighthouseResult;
    if (lh?.categories?.performance?.score != null) { perf = Math.round(lh.categories.performance.score * 100); psiOk = true; }
    lcpMs = lh?.audits?.['largest-contentful-paint']?.numericValue ?? null;
    cwvCat = j.loadingExperience?.overall_category ?? null;   // FAST/AVERAGE/SLOW — real field data only
  }
} catch {}

// --- JSON-LD ---
const ldText = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).join(' ');
const ldTypes = [...ldText.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
const hasType = (t) => ldTypes.some(x => x.toLowerCase().includes(t.toLowerCase()));

// --- page detection (sitemap-based) ---
const pathHasLocation = (u) => /\/(locations?|service-areas?|areas?-we-serve|cities|locations-served)\/[^\/?#]+/i.test(u);
const SERVICE_RE = /(roof-?repair|roof-?replace|roof-?install|re-?roof|roof-?inspection|roof-?maintenance|storm-?damage|hail|wind-?damage|gutter|siding|metal-?roof|flat-?roof|tile-?roof|slate-?roof|commercial-?roof|shingle|skylight|ventilation|chimney|emergency-?roof)/i;
const lastSeg = (u) => { try { return new URL(u).pathname.replace(/\/+$/, '').split('/').pop() || ''; } catch { return ''; } };
const locationPages = locs.filter(pathHasLocation);
const servicePages = locs.filter(u => /\/services?\//i.test(u) || (SERVICE_RE.test(lastSeg(u)) && !pathHasLocation(u)));
const hasContact = locs.some(u => /\/contact/i.test(u)) || /<form[\s>]/i.test(html) || /href=["'][^"']*contact/i.test(html);

// --- name + location ---
let name = (ldText.match(/"name"\s*:\s*"([^"]+)"/) || [])[1] || (html.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || 'This Roofing Company';
name = name.replace(/\s*[|\-–—].*$/, '').trim().slice(0, 40);
let city = (ldText.match(/"addressLocality"\s*:\s*"([^"]+)"/) || [])[1];
let region = (ldText.match(/"addressRegion"\s*:\s*"([^"]+)"/) || [])[1];
if (!city) { const m = html.replace(/<[^>]+>/g, ' ').match(/\b([A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+)?),\s*([A-Z]{2})\b/); if (m) { city = m[1]; region = m[2]; } }
const place = [city, region].filter(Boolean).join(', ') || 'Your Area';

// --- render mode ---
const bodyWords = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
const isCSR = /id=["'](root|__next|app)["']/i.test(html) && bodyWords < 250;

// --- the checks: genuine basics only. We HAMMER 3 page types (services/locations/contact); we do NOT ding for blogs/depth. ---
const allChecks = [
  { l:'Secure (HTTPS)', ok:/^https:/i.test(home.finalUrl), why:'Buyers + Google distrust an unsecured site.' },
  { l:'Crawlable HTML (not JS-only)', ok:!isCSR, why:'JS-only = near-invisible to AI search, slow to index.' },
  { l:'Mobile Page Speed', ok:perf != null && perf >= 50, why:`Speed ${perf ?? '?'}/100 — slow pages bleed rankings + leads.`, psi:true },
  { l:'Core Web Vitals', ok:cwvCat === 'FAST', why:`Google UX signal${lcpMs != null ? ` · LCP ${(lcpMs / 1000).toFixed(1)}s` : ''}${cwvCat && cwvCat !== 'FAST' ? ` (${cwvCat.toLowerCase()})` : ''}.`, psi:true, cwv:true },
  { l:'Page Title', ok:!!(html.match(/<title[^>]*>([^<]{5,})<\/title>/i)), why:'The #1 on-page signal Google shows in results.' },
  { l:'Meta Description', ok:/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}/i.test(html), why:'Drives the click from the search result.' },
  { l:'Canonical Tag', ok:/<link[^>]+rel=["']canonical["']/i.test(html), why:'Stops duplicate-URL confusion that splits ranking.' },
  { l:'Social / Open Graph', ok:/<meta[^>]+property=["']og:(title|image)["']/i.test(html), why:'How your link looks when shared or texted.' },
  { l:'H1 Heading', ok:/<h1[\s>]/i.test(html), why:'Tells Google the page topic in one line.', jsFragile:true },
  { l:'Mobile-Ready (viewport)', ok:/<meta[^>]+name=["']viewport["']/i.test(html), why:'Most roofing searches are on a phone.' },
  { l:'Schema Markup', ok:ldTypes.length > 0, why:'Hands Google the facts (2–4x rich-result + AI).' },
  { l:'Image Alt Text', ok:/<img[^>]+alt=["'][^"']+["']/i.test(html), why:'Image SEO + accessibility basics.', jsFragile:true },
  { l:'Service Pages', ok:servicePages.length > 0, why:'One page per service = one clean Google match.' },
  { l:'Location Pages', ok:locationPages.length > 0, why:'No city pages = invisible past your ~5-mile pocket.' },
  { l:'Contact Form', ok:hasContact, why:'No clear way to turn a visitor into a lead.' },
  { l:'Click-to-Call', ok:/href=["']tel:/i.test(html), why:'One-tap calling — most roofing leads phone in.', jsFragile:true },
  { l:'robots.txt', ok:rb.ok && rb.text.trim().length > 0 && !/^\s*disallow:\s*\/\s*$/im.test(rb.text), why:'Guides crawlers — missing one is an amateur tell.' },
  { l:'XML Sitemap', ok:sm.ok && /<loc>/i.test(sm.text), why:'The map of every page you have for Google.' },
  { l:'Reviews / Proof', ok:hasType('AggregateRating') || hasType('Review') || /\b(reviews?|testimonials?|\d(\.\d)?\s*stars?)\b/i.test(html), why:'Social proof is the #1 conversion lever.', jsFragile:true },
];
const hidden = allChecks.filter(c => (c.jsFragile && isCSR) || (c.psi && !psiOk) || (c.cwv && cwvCat == null));
const checks = allChecks.filter(c => !hidden.includes(c));
const pass = checks.filter(c => c.ok);
const fail = checks.filter(c => !c.ok);
const score = pass.length, total = checks.length;

// --- estimated opportunity (Tier 1 scales with CONFIRMED gaps; clean site -> ~0) ---
const ticket = 12000;
const moK = (jobs) => Math.round(jobs * ticket / 12 / 1000);
const GAP_WEIGHT = { 'Crawlable HTML (not JS-only)':2, 'Mobile Page Speed':2, 'Core Web Vitals':1, 'Location Pages':3, 'Service Pages':1.5, 'Contact Form':1, 'Reviews / Proof':1, 'H1 Heading':0.5, 'Schema Markup':0.5 };
const fixJobs = fail.reduce((s, c) => s + (GAP_WEIGHT[c.l] || 0.3), 0);
const t1lo = Math.round(fixJobs * 0.8), t1hi = Math.round(fixJobs * 1.4);
const t2 = [60, 96]; // OPTIMISTIC, Raleigh-tier medium-density metro, at maturity (~5–8 jobs/mo)
const tier1 = t1hi <= 0
  ? `<div class="tval">✓ Dialed in</div><div class="tnote">Basics already in place — opportunity is depth + off-page, not fixes.</div>`
  : `<div class="tval">~$${moK(t1lo)}k–$${moK(t1hi)}k<span>/mo</span></div><div class="tnote">Fix the ${fail.length} confirmed gaps on the current site ≈ ${t1lo}–${t1hi} jobs/yr × ~$12k.</div>`;

const row = (c) => `<div class="row ${c.ok ? 'ok' : 'no'}"><div class="ic">${c.ok ? '✓' : '✗'}</div><div class="tx"><div class="lbl">${c.l}</div><div class="why">${c.why}</div></div></div>`;

const out = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Website Audit</title>
<style>
:root{--blue:#15346b;--ink:#0d1b34;--ok:#16a34a;--no:#dc2626;--paper:#f4f7fc;--gold:#ffd23f}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Arial,sans-serif;background:#0a1428;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{width:1600px;height:900px;display:flex;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.6)}
/* LEFT SIDEBAR — brand, score, opportunity */
.side{width:540px;background:linear-gradient(165deg,#1a3f7e,#0c2350 70%);color:#fff;padding:34px 36px;display:flex;flex-direction:column}
.brand{font-weight:900;font-size:22px;letter-spacing:.3px}.brand span{color:var(--gold)}
.co{font-size:38px;font-weight:900;letter-spacing:-.8px;line-height:1.02;margin-top:26px}
.loc{font-size:20px;font-weight:600;opacity:.82;margin-top:6px}
.url{font-size:13px;opacity:.55;margin-top:8px;font-family:ui-monospace,monospace;word-break:break-all}
.scorewrap{display:flex;align-items:baseline;gap:14px;margin:22px 0 6px}
.scorewrap .n{font-size:88px;font-weight:900;line-height:.85;color:var(--gold)}
.scorewrap .d{font-size:34px;font-weight:800;opacity:.6}
.scorewrap .l{font-size:13px;font-weight:800;letter-spacing:2px;opacity:.8}
.opp{margin-top:26px;display:flex;flex-direction:column;gap:12px}
.tier{background:rgba(255,255,255,.07);border-radius:12px;padding:15px 17px}
.tier.up{background:rgba(255,210,63,.12);border:1px solid rgba(255,210,63,.4)}
.tlabel{font-size:12px;font-weight:800;letter-spacing:1px;opacity:.78}
.tval{font-size:30px;font-weight:900;color:var(--gold);line-height:1.05;margin:3px 0}
.tval span{font-size:14px;font-weight:700;color:#fff;opacity:.7}
.tnote{font-size:12px;opacity:.78;line-height:1.36}
.ill{font-size:10.5px;opacity:.5;margin-top:4px;line-height:1.3}
/* RIGHT MAIN — checklist */
.main{flex:1;background:var(--paper);padding:26px 32px;display:flex;flex-direction:column}
.mhead{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px}
.mhead h1{font-size:21px;font-weight:900;color:var(--ink);letter-spacing:-.3px}
.mhead .legend{font-size:13px;font-weight:700}
.mhead .legend b{color:var(--ok)}.mhead .legend i{color:var(--no);font-style:normal}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:0 28px;flex:1;align-content:start}
.ch{font-size:13.5px;font-weight:900;letter-spacing:.6px;text-transform:uppercase;margin-bottom:6px;padding-bottom:6px;border-bottom:2px solid currentColor}
.col.bad .ch{color:var(--no)}.col.good .ch{color:var(--ok)}
.empty{font-size:12.5px;color:#8a96a8;padding:10px 0}
.row{display:flex;gap:11px;align-items:flex-start;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.ic{flex:0 0 24px;height:24px;border-radius:50%;color:#fff;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.row.ok .ic{background:var(--ok)}.row.no .ic{background:var(--no)}
.lbl{font-size:16.5px;font-weight:800;color:var(--ink);line-height:1.1}
.why{font-size:11.5px;color:#67738a;margin-top:1px;line-height:1.25}
.mnote{margin-top:10px;font-size:11.5px;color:#9a7b1f;background:#fff7e6;border:1px solid #f0e2c0;border-radius:8px;padding:7px 12px}
.foot{margin-top:10px;display:flex;justify-content:space-between;font-size:11px;color:#9aa6b8}
</style></head><body>
<div class="card">
  <aside class="side">
    <div class="brand">👑 King Maker <span>SEO</span></div>
    <div class="co">${name}</div>
    <div class="loc">${place} · Roofing</div>
    <div class="url">${home.finalUrl}</div>
    <div class="scorewrap"><div class="n">${score}</div><div class="d">/${total}</div><div class="l">SEO<br>SCORE</div></div>
    <div class="opp">
      <div class="tier"><div class="tlabel">① FIX WHAT YOU HAVE</div>${tier1}</div>
      <div class="tier up"><div class="tlabel">② ENTERPRISE SITE + OFF-PAGE</div><div class="tval">~$${moK(t2[0])}k–$${moK(t2[1])}k<span>/mo at maturity</span></div><div class="tnote">New enterprise site + $1,000/mo off-page. Optimistic — full metro dominance ≈ ${Math.round(t2[0] / 12)}–${Math.round(t2[1] / 12)} jobs/mo, vs $1k/mo in.</div></div>
      <div class="ill">Illustrative models, not a guarantee · ramps 6–12 mo · ~$12k avg ticket · Tier ② = optimistic at maturity</div>
    </div>
  </aside>
  <main class="main">
    <div class="mhead"><h1>Website Audit</h1><div class="legend">scores <b>${score}/${total}</b> on the basics</div></div>
    <div class="cols">
      <div class="col good"><div class="ch">✓ Working (${pass.length})</div>${pass.map(row).join('') || '<div class="empty">Nothing yet.</div>'}</div>
      <div class="col bad"><div class="ch">✗ Costing You Jobs (${fail.length})</div>${fail.map(row).join('') || '<div class="empty">Clean — rare for a contractor site.</div>'}</div>
    </div>
    ${hidden.length ? `<div class="mnote">⚠ ${hidden.length} not measured${isCSR ? ' (JS-only site)' : ''}${!psiOk ? ' (speed test unavailable)' : ''}: ${hidden.map(c => c.l).join(' · ')}</div>` : ''}
    <div class="foot"><div>Audit · ${new Date().toISOString().slice(0, 10)}</div><div>Mobile speed via Google PageSpeed</div></div>
  </main>
</div></body></html>`;

fs.mkdirSync(path.resolve('km-audit'), { recursive: true });
fs.writeFileSync(path.resolve('km-audit/index.html'), out);
console.log(`[audit] ${name} (${place}) — ${score}/${total} · pass ${pass.length}/fail ${fail.length} · pages ${locs.length} · loc ${locationPages.length} · svc ${servicePages.length}${isCSR ? ' · CSR' : ''} · ${psiOk ? `mobile-perf ${perf}` : 'PSI-fail'} · tier1 $${moK(t1lo)}-${moK(t1hi)}k`);
