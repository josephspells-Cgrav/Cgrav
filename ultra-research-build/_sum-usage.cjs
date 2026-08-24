const fs = require('fs'), path = require('path');
const root = 'C:/Users/josep/.claude/projects/C--Users-josep-Claude-Gravity';
function findDir(base, name) {
  for (const e of fs.readdirSync(base, { withFileTypes: true })) {
    const p = path.join(base, e.name);
    if (e.isDirectory()) { if (e.name === name) return p; const r = findDir(p, name); if (r) return r; }
  }
  return null;
}
const dir = findDir(root, 'wf_ca20ccb1-7b5');
if (!dir) { console.log('dir not found'); process.exit(0); }
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.jsonl')) files.push(p); } })(dir);
let inp = 0, out = 0, cw = 0, cr = 0, msgs = 0;
for (const f of files) {
  for (const ln of fs.readFileSync(f, 'utf8').split('\n')) {
    if (!ln.trim()) continue;
    let o; try { o = JSON.parse(ln); } catch (e) { continue; }
    const u = o.usage || (o.message && o.message.usage);
    if (u) { msgs++; inp += u.input_tokens || 0; out += u.output_tokens || 0; cw += u.cache_creation_input_tokens || 0; cr += u.cache_read_input_tokens || 0; }
  }
}
const M = 1e6, f3 = (n) => (n / M).toFixed(3) + 'M';
console.log('transcript files:', files.length, '| usage events:', msgs);
console.log('fresh input :', f3(inp));
console.log('output      :', f3(out));
console.log('cache write :', f3(cw));
console.log('cache read  :', f3(cr));
console.log('RAW TOTAL   :', f3(inp + out + cw + cr));
console.log('real-work   :', f3(inp + out + cw), '(fresh in + out + cache write)');
