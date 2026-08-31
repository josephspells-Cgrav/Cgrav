#!/usr/bin/env node
/**
 * mempalace-restore-test.mjs — verify a mempalace generation can actually be restored.
 *
 * A backup nobody has restored is not a backup: recovery is serial and scores by the
 * weakest link. These checks are built so that a TORN snapshot fails them — a test
 * that passes because the files exist is worthless.
 *
 *   T1  physical    — integrity_check on both databases.
 *   T2  cross-store — the index/metadata/queue predicate. Catches the purged-gap tear,
 *                     which is the failure mode with no repair path.
 *   T3  sidecars    — logstream's -wal/-shm must both be present. Its main file is ONE
 *                     PAGE; essentially the whole database lives in the WAL, so a
 *                     snapshot missing it restores an empty husk that opens cleanly.
 *   T4  hallways    — parses, schema_version present, non-empty.
 *   T5  newest-row  — THE DISCRIMINATOR. Read the highest-seq_id embedding and require
 *                     its metadata row to exist. That row was in the volatile tail at
 *                     snapshot time; OLD items pass on any snapshot, torn or not.
 *   T6  manifest    — every file re-hashes to what was recorded at creation.
 *
 * NOT covered, stated rather than hidden: the chromadb round-trip (load the HNSW index,
 * query it, confirm top-1 is the item you asked for) needs the uv-managed python and is
 * the only thing that proves the VECTOR half is loadable. T1-T6 prove the metadata half
 * and the file set. Run the python arm before trusting this store for retrieval.
 *
 * Usage: node recovery/mempalace-restore-test.mjs <generation-dir>
 * Exit:  0 = restorable · 1 = do not trust this generation.
 */
import { existsSync, readFileSync, createReadStream, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';

const GEN = (process.argv[2] || '').replace(/\\/g, '/').replace(/\/$/, '');
if (!GEN || !existsSync(GEN)) { console.error('usage: node recovery/mempalace-restore-test.mjs <generation-dir>'); process.exit(1); }

let fail = 0;
const t = (name, fn) => {
  let r;
  try { r = fn(); } catch (e) { r = String(e.message || e).slice(0, 110); }
  if (r === true) console.log(`  PASS  ${name}`);
  else { console.log(`  FAIL  ${name}  -> ${r}`); fail++; }
};
const sha = (p) => new Promise((res, rej) => {
  const h = createHash('sha256');
  createReadStream(p).on('error', rej).on('data', (d) => h.update(d)).on('end', () => res(h.digest('hex')));
});

// A read-only SQLite open on a WAL database REWRITES the -shm sidecar. Probed
// 2026-08-30: an earlier version of this script tested the generation in place and
// changed logstream.sqlite3-shm (same size, different bytes), failing its own
// manifest check on a snapshot that was perfectly good. RESTORE.md — written an hour
// earlier — says "opening a palace WRITES to it; copy it first and test the copy",
// and this script violated that instruction in the next file.
// So: every sqlite open runs against a throwaway copy; only read-only hashing and
// file-existence checks touch the real generation.
const { mkdtempSync, cpSync, rmSync } = await import('node:fs');
const { tmpdir } = await import('node:os');
const SCRATCH = mkdtempSync(join(tmpdir(), 'mp-restore-'));
cpSync(GEN, SCRATCH, { recursive: true });
process.on('exit', () => { try { rmSync(SCRATCH, { recursive: true, force: true }); } catch {} });

const { DatabaseSync } = await import('node:sqlite');
const openRO = (p) => new DatabaseSync(p, { readOnly: true });
// sqlite work -> the scratch copy. Existence/size checks -> the real artifact.
const CH = join(SCRATCH, 'palace', 'chroma.sqlite3');
const LS_REAL = join(GEN, 'palace', 'logstream.sqlite3');
const LS = join(SCRATCH, 'palace', 'logstream.sqlite3');

console.log(`mempalace restore test — ${GEN}\n` + '-'.repeat(66));

t('T1a chroma.sqlite3 integrity_check', () => {
  if (!existsSync(CH)) return 'absent';
  const d = openRO(CH); const v = Object.values(d.prepare('PRAGMA integrity_check').get())[0]; d.close();
  return String(v) === 'ok' || `integrity_check = ${v}`;
});
t('T1b logstream.sqlite3 integrity_check', () => {
  if (!existsSync(LS)) return 'absent';
  const d = openRO(LS); const v = Object.values(d.prepare('PRAGMA integrity_check').get())[0]; d.close();
  return String(v) === 'ok' || `integrity_check = ${v}`;
});

t('T2  cross-store predicate (index vs metadata vs queue)', () => {
  const d = openRO(CH);
  const m = Number(d.prepare('SELECT MAX(seq_id) AS m FROM embeddings').get().m);
  const seg = d.prepare("SELECT x.seq_id AS v FROM max_seq_id x JOIN segments s ON s.id = x.segment_id WHERE s.scope = 'VECTOR'").get();
  const q = d.prepare('SELECT MIN(seq_id) AS lo, MAX(seq_id) AS hi, COUNT(*) AS n FROM embeddings_queue').get();
  d.close();
  if (!seg || seg.v == null) return 'VECTOR segment has no max_seq_id row';
  const v = Number(seg.v), n = Number(q.n);
  if (n === 0) return v === m || `queue empty but v(${v}) != m(${m}) — TORN`;
  if (!(Number(q.lo) <= v + 1)) return `purged gap: queue starts ${q.lo} but index only reached ${v} — rows ${v + 1}..${Number(q.lo) - 1} are UNRECOVERABLE`;
  if (Number(q.hi) !== m) return `queue head ${q.hi} != metadata head ${m} — TORN`;
  return true;
});

t('T3  logstream WAL sidecars present (its main file is one page)', () => {
  // the REAL artifact, not the scratch copy — this test is about what is on disk
  const wal = existsSync(LS_REAL + '-wal'), shm = existsSync(LS_REAL + '-shm');
  if (!wal) return 'logstream.sqlite3-wal MISSING — restores an empty husk that opens cleanly';
  const pages = statSync(LS_REAL).size;
  if (pages <= 8192 && statSync(LS_REAL + '-wal').size === 0) return 'main file is one page AND the -wal is empty — the database is gone';
  return wal && shm ? true : 'logstream.sqlite3-shm missing';
});

t('T4  hallways.json parses and is non-empty', () => {
  const h = JSON.parse(readFileSync(join(GEN, 'hallways.json'), 'utf8'));
  if (h.schema_version == null) return 'no schema_version';
  const n = Array.isArray(h.hallways) ? h.hallways.length : Object.keys(h).length;
  return n > 0 || 'empty';
});

t('T5  NEWEST row survives (old rows pass on any snapshot — this one does not)', () => {
  const d = openRO(CH);
  const row = d.prepare('SELECT id, seq_id, embedding_id FROM embeddings ORDER BY seq_id DESC LIMIT 1').get();
  if (!row) { d.close(); return 'no embeddings at all'; }
  const meta = d.prepare('SELECT COUNT(*) AS n FROM embedding_metadata WHERE id = ?').get(row.id);
  d.close();
  return Number(meta.n) > 0 || `newest embedding seq_id=${row.seq_id} has NO metadata row — the volatile tail was lost`;
});

const manPath = join(GEN, 'MANIFEST.json');
if (!existsSync(manPath)) { console.log('  FAIL  T6  MANIFEST.json absent — generation cannot be verified'); fail++; }
else {
  const man = JSON.parse(readFileSync(manPath, 'utf8')).manifest || {};
  let bad = 0, n = 0;
  for (const [rel, meta] of Object.entries(man)) {
    const p = join(GEN, rel); n++;
    if (!existsSync(p)) { bad++; continue; }
    if (await sha(p) !== meta.sha256) bad++;
  }
  if (bad) { console.log(`  FAIL  T6  ${bad}/${n} files do not match the creation manifest`); fail++; }
  else console.log(`  PASS  T6  all ${n} files re-hash to the creation manifest`);
}

console.log('-'.repeat(66));
console.log(fail === 0
  ? 'RESTORE TEST PASSED — metadata half and file set verified. The chromadb/HNSW round-trip is NOT covered here; run the python arm before trusting retrieval.'
  : `RESTORE TEST FAILED (${fail}) — do not trust this generation.`);
process.exit(fail === 0 ? 0 : 1);
