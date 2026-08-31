#!/usr/bin/env node
/**
 * mempalace-snapshot.mjs — consistent snapshot of ~/.mempalace, with a proof.
 *
 * WHY THIS IS NOT "git init && push" (the plan of record said it was):
 *   · chroma.sqlite3 is ~269 MB. GitHub hard-rejects blobs over 100 MB, so that
 *     plan does not even ship — and the natural "fix" is to gitignore the database,
 *     producing a backup that excludes the store.
 *   · logstream.sqlite3's main file is ONE PAGE (4,096 B). Essentially the whole
 *     database, schema included, lives in the un-checkpointed -wal. Copy without
 *     the -wal/-shm pair and you restore an empty husk that opens cleanly.
 *   · The HNSW vector index and the sqlite metadata are written at different times.
 *     Probed 2026-08-30: index held 37,973 vectors, metadata head was 38,297, and
 *     the 324-row gap existed only in embeddings_queue with automatically_purge on.
 *     A copy that straddles a flush loses those rows unrecoverably.
 *   · git commit exits 0 through all of it. The tear is invisible until restore.
 *
 * THE TRICK IS STEP 4. Everything else is commentary: hash the live store, copy it,
 * then hash the live store AGAIN. If anything moved, the copy straddled a write —
 * discard and retry. That converts "probably quiet" into a receipt. You do NOT need
 * to stop the MCP servers; you need to PROVE no write happened during the window.
 * Never kill a mempalace process to quiesce — that manufactures the crash case.
 *
 * Usage:  node recovery/mempalace-snapshot.mjs [--out <dir>] [--keep N]
 * Exit:   0 = a validated generation exists · 1 = no generation was produced.
 */
import { existsSync, mkdirSync, readdirSync, statSync, createReadStream, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const SRC = 'C:/Users/josep/.mempalace';
const argv = process.argv.slice(2);
const OUT = (argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : 'C:/Users/josep/.mempalace-backups');
const KEEP = Number(argv.includes('--keep') ? argv[argv.indexOf('--keep') + 1] : 5);
const MAX_TRIES = 4;

const log = [];
const say = (s) => { console.log(s); log.push(s); };
const die = (s) => { say(`FAIL  ${s}`); writeSummary(false); process.exit(1); };

const walk = (dir, acc = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else acc.push(p);
  }
  return acc;
};
const sha = (p) => new Promise((res, rej) => {
  const h = createHash('sha256');
  createReadStream(p).on('error', rej).on('data', (d) => h.update(d)).on('end', () => res(h.digest('hex')));
});
const manifest = async () => {
  const out = {};
  for (const p of walk(SRC).sort()) {
    const st = statSync(p);
    out[relative(SRC, p).replace(/\\/g, '/')] = { size: st.size, mtimeMs: st.mtimeMs, sha256: await sha(p) };
  }
  return out;
};
const same = (a, b) => {
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => b[k] && a[k].sha256 === b[k].sha256 && a[k].size === b[k].size);
};

let summaryPath = null;
function writeSummary(ok) {
  if (summaryPath) { try { writeFileSync(summaryPath, log.join('\n') + `\n\nRESULT: ${ok ? 'VALIDATED' : 'FAILED'}\n`); } catch {} }
}

if (!existsSync(SRC)) die(`source missing: ${SRC}`);
mkdirSync(OUT, { recursive: true });

// ---- STEP 1: abort-gate. A rollback journal means a write transaction is in flight.
const JOURNAL = join(SRC, 'palace', 'chroma.sqlite3-journal');
if (existsSync(JOURNAL)) die('chroma.sqlite3-journal present — a write transaction is in flight. Re-run in a minute.');
say('ok    step 1  abort-gate: no rollback journal');

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const gen = join(OUT, stamp);
summaryPath = join(OUT, `${stamp}.RECEIPT.txt`);

// ---- STEPS 2-5: the proof-loop.
let pre = null, ok = false;
for (let attempt = 1; attempt <= MAX_TRIES && !ok; attempt++) {
  if (existsSync(gen)) rmSync(gen, { recursive: true, force: true });
  pre = await manifest();
  say(`      step 2  pre-manifest: ${Object.keys(pre).length} files (attempt ${attempt}/${MAX_TRIES})`);

  // robocopy exits 0-7 for success; >=8 is a real error.
  try {
    execFileSync('robocopy', [SRC.replace(/\//g, '\\'), gen.replace(/\//g, '\\'), '/E', '/COPY:DAT', '/DCOPY:DAT', '/R:2', '/W:5', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'], { stdio: 'ignore' });
  } catch (e) {
    if ((e.status ?? 16) >= 8) die(`robocopy failed hard, status ${e.status}`);
  }
  say('      step 3  copied');

  const post = await manifest();
  if (!same(pre, post)) { say(`      step 4  LIVE STORE MOVED during the copy — discarding, retrying`); continue; }
  say('ok    step 4  proof-loop: live store byte-identical before and after — the window was quiet');

  // step 5: the staged copy must match what we hashed.
  let bad = 0;
  for (const [rel, meta] of Object.entries(pre)) {
    const p = join(gen, rel);
    if (!existsSync(p)) { say(`      step 5  MISSING in copy: ${rel}`); bad++; continue; }
    if (await sha(p) !== meta.sha256) { say(`      step 5  HASH MISMATCH: ${rel}`); bad++; }
  }
  if (bad) { say(`      step 5  ${bad} file(s) bad — discarding, retrying`); continue; }
  say(`ok    step 5  staged copy verified against the manifest (${Object.keys(pre).length}/${Object.keys(pre).length})`);
  ok = true;
}
if (!ok) die(`could not obtain a quiet window in ${MAX_TRIES} attempts — close Claude sessions (the MCP servers exit with them) and re-run`);

// ---- STEP 6: consistency validation ON THE STAGED COPY, so a torn snapshot is
// discarded at creation time instead of discovered during a real recovery.
let sqliteOk = true, notes = [];
// Validate a THROWAWAY COPY, never the generation itself. A read-only SQLite open on
// a WAL database rewrites the -shm sidecar, so validating in place mutates the very
// artifact whose hashes were just recorded, and the restore test then fails a
// perfectly good snapshot on its own manifest. Found 2026-08-30 after fixing the
// identical bug in mempalace-restore-test.mjs and leaving this twin one file away.
const { mkdtempSync, cpSync } = await import('node:fs');
const { tmpdir } = await import('node:os');
const VSCRATCH = mkdtempSync(join(tmpdir(), 'mp-validate-'));
cpSync(gen, VSCRATCH, { recursive: true });
try {
  const { DatabaseSync } = await import('node:sqlite');
  const openRO = (p) => new DatabaseSync(p, { readOnly: true });

  for (const db of ['chroma.sqlite3', 'logstream.sqlite3']) {
    const p = join(VSCRATCH, 'palace', db);
    if (!existsSync(p)) { notes.push(`${db} absent`); sqliteOk = false; continue; }
    const d = openRO(p);
    const r = d.prepare('PRAGMA integrity_check').get();
    const v = Object.values(r)[0];
    if (String(v) !== 'ok') { notes.push(`${db} integrity_check = ${v}`); sqliteOk = false; }
    d.close();
  }

  // The cross-store predicate. This is what catches the purged-gap tear.
  const d = openRO(join(VSCRATCH, 'palace', 'chroma.sqlite3'));
  // Schema, probed 2026-08-30 (do not guess it — the first version of this query did):
  //   max_seq_id(segment_id, seq_id) · segments(id, type, scope, collection)
  // The VECTOR segment's seq_id is how far the HNSW index has been flushed; the
  // metadata head is MAX(seq_id) in embeddings. The difference lives in
  // embeddings_queue, which purges automatically — which is the whole hazard.
  const m = d.prepare('SELECT MAX(seq_id) AS m FROM embeddings').get().m;
  const seg = d.prepare("SELECT x.seq_id AS v FROM max_seq_id x JOIN segments s ON s.id = x.segment_id WHERE s.scope = 'VECTOR'").get();
  const q = d.prepare('SELECT MIN(seq_id) AS lo, MAX(seq_id) AS hi, COUNT(*) AS n FROM embeddings_queue').get();
  d.close();
  const v = seg && seg.v != null ? Number(seg.v) : null;
  notes.push(`metadata head m=${m} · index max_seq_id v=${v} · queue n=${q.n} [${q.lo}..${q.hi}]`);
  if (v == null) notes.push('max_seq_id unreadable — predicate SKIPPED');
  else if (q.n === 0 && v !== Number(m)) { notes.push(`TORN: queue empty but v(${v}) != m(${m})`); sqliteOk = false; }
  else if (q.n > 0 && !(Number(q.lo) <= v + 1 && Number(q.hi) === Number(m))) { notes.push(`TORN: queue [${q.lo}..${q.hi}] does not bridge v=${v} to m=${m}`); sqliteOk = false; }
  else notes.push('predicate PASSES — index and metadata are reconcilable');
} catch (e) {
  notes.push(`sqlite validation unavailable: ${String(e.message || e).slice(0, 120)}`);
  sqliteOk = false;
}
try { rmSync(VSCRATCH, { recursive: true, force: true }); } catch {}
for (const n of notes) say(`      step 6  ${n}`);
say(`${sqliteOk ? 'ok   ' : 'FAIL '} step 6  consistency validation`);

// hallways.json must parse
try {
  const h = JSON.parse(readFileSync(join(gen, 'hallways.json'), 'utf8'));
  say(`ok    step 6b hallways.json parses · schema_version=${h.schema_version}`);
} catch (e) { say(`FAIL  step 6b hallways.json: ${String(e).slice(0, 80)}`); sqliteOk = false; }

// ---- STEP 7: manifest + restore instructions travel WITH the generation.
writeFileSync(join(gen, 'MANIFEST.json'), JSON.stringify({
  created: new Date().toISOString(), source: SRC, files: Object.keys(pre).length,
  runtime: 'the store is only readable through mempalace + chromadb + the uv-managed python; record versions before restoring',
  validation: notes, manifest: pre,
}, null, 2));
writeFileSync(join(gen, 'RESTORE.md'), `# Restoring this mempalace generation

1. Do NOT open this directory directly — opening a palace WRITES to it (migrations,
   queue replay, possible flush). Copy it first and test the copy.
2. Restore the whole tree verbatim, including \`logstream.sqlite3-wal\` and \`-shm\`
   (a mismatched sidecar set is rejected), the zero-byte migration markers, and
   \`replica.json\` (deleting it forks replica identity).
3. The lock file is harmless — kernel byte-locks release on process death.
4. Runtime is part of the backup: \`uv tool install mempalace\`, matching chromadb.
5. Verify with: \`node recovery/mempalace-restore-test.mjs <copy-of-this-dir>\`.
   The decisive check is retrieving the NEWEST drawer — old items pass on any
   snapshot, torn or not.

Validation recorded at creation:
${notes.map((n) => `  - ${n}`).join('\n')}
`);
say('ok    step 7  MANIFEST.json + RESTORE.md written into the generation');

// ---- retention
const gens = readdirSync(OUT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
for (const old of gens.slice(0, Math.max(0, gens.length - KEEP))) {
  rmSync(join(OUT, old), { recursive: true, force: true });
  say(`      retention: pruned ${old}`);
}

say('');
say(`GENERATION: ${gen}`);
say(sqliteOk
  ? 'RESULT: VALIDATED — but a generation with no RESTORE receipt is still not a backup. Run the restore test, and get this off this disk.'
  : 'RESULT: SNAPSHOT TAKEN BUT VALIDATION FAILED — do not trust it.');
writeSummary(sqliteOk);
process.exit(sqliteOk ? 0 : 1);
