#!/usr/bin/env node
/**
 * secrets-bundle.mjs — the CREDENTIAL ARK.
 *
 * Collects every secret-bearing file on this machine into ONE encrypted blob
 * that is safe to commit to a private repo. Recovery on a bare machine is then:
 *     node secrets-bundle.mjs unlock          (one passphrase, no install)
 *
 * WHY: the 2026-08-28 census found 34 production values that existed in exactly
 * ONE place on earth — Vercel's write-only Secret store. A lost Vercel account
 * = re-issue at 8 providers with no inventory. This file makes that impossible
 * to repeat: nothing is a secret store of last resort except this bundle.
 *
 * Crypto: openssl aes-256-cbc + pbkdf2 @ 600k iterations. Zero install — openssl
 * and tar both ship with Git for Windows. age/gpg were deliberately NOT used:
 * a recovery tool you must install before you can recover is not a recovery tool.
 *
 * Passphrase: env CGRAV_SECRETS_PASS. Memorize it (6+ diceware words). It is
 * ALSO in the password manager and on the paper kit — three copies, because a
 * bundle you cannot open is a bundle you do not have.
 *
 *   node secrets-bundle.mjs lock      -> recovery/secrets.bundle.enc (+ MANIFEST)
 *   node secrets-bundle.mjs unlock    -> recovery/_unlocked/         (gitignored)
 *   node secrets-bundle.mjs manifest  -> key NAMES only, no values
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = 'C:/Users/josep/Claude Gravity';
const OUTDIR = ROOT + '/vault/_ark';   // PRIVATE repo — the public Cgrav repo must never hold this
fs.mkdirSync(OUTDIR, { recursive: true });
const BLOB = OUTDIR + '/secrets.bundle.enc';
const MANIF = OUTDIR + '/SECRETS_MANIFEST.md';
const ITER = '600000';

// Every secret store of last resort. An explicit list you can read beats a
// clever pattern — and secrets-census.mjs is what catches anything this misses.
const TARGETS = [
  'king-maker-codes.txt',
  'king_maker_outbound/config/.env',
  'mabrey-crm-app/.env',
  'mabrey-crm-app/.env.local',
  'mabrey-land/site/.env.local',
  'C:/Users/josep/.claude.json',
  'C:/Users/josep/.claude/settings.json',
];
// Client lanes scanned for .env* so a new client cannot silently escape the ark.
const SCAN_DIRS = ['groovy-lighting', 'mabrey-roofing', 'summit-oak-roofing', 'king-maker-site', 'mabrey-construction'];

const pass = process.env.CGRAV_SECRETS_PASS;
const mode = process.argv[2] || 'lock';

function collect() {
  const files = [];
  for (const t of TARGETS) {
    const p = /^[A-Za-z]:/.test(t) ? t : ROOT + '/' + t;
    if (fs.existsSync(p)) files.push(p);
  }
  for (const d of SCAN_DIRS) {
    const dir = ROOT + '/' + d;
    if (!fs.existsSync(dir)) continue;
    const walk = (base, depth) => {
      if (depth > 2) return;
      for (const e of fs.readdirSync(base, { withFileTypes: true })) {
        if (e.name === 'node_modules' || e.name === '.git' || e.name === '.next') continue;
        const p = path.join(base, e.name);
        if (e.isDirectory()) walk(p, depth + 1);
        // Normalise to forward slashes: path.join returns backslashes on Windows,
        // which makes the ROOT/HOME prefix-strips below silently miss.
        else if (/^\.env(\.|$)/.test(e.name) && !/\.example$/.test(e.name)) files.push(p.split(path.sep).join('/'));
      }
    };
    walk(dir, 0);
  }
  // 2026-08-31 (Phase 3): ~/.claude/scheduled-tasks — the definitions of 6 autonomous
  // agents. It is gitignored by ~/.claude's default-deny allowlist and was therefore
  // covered by NOTHING. It cannot simply be un-ignored either: probed 2026-08-31,
  // instantly-reply-poller/SKILL.md carries a LIVE Slack bot token and an Instantly
  // API key in plaintext, so tracking it would write credentials into git history.
  // Encrypted-only is the correct home. Scanned rather than listed so a 7th task
  // cannot silently escape — the same reasoning as SCAN_DIRS above.
  const TASKS = 'C:/Users/josep/.claude/scheduled-tasks';
  if (fs.existsSync(TASKS)) {
    const walkAll = (base, depth) => {
      if (depth > 2) return;
      for (const e of fs.readdirSync(base, { withFileTypes: true })) {
        const p = path.join(base, e.name);
        if (e.isDirectory()) walkAll(p, depth + 1);
        else files.push(p.split(path.sep).join('/'));
      }
    };
    walkAll(TASKS, 0);
  }
  return [...new Set(files)];
}

// Key NAMES only, never values. Committed in the clear ON PURPOSE: during a
// recovery you must be able to see WHAT you are missing before you can decrypt.
function writeManifest(files) {
  const out = [
    '# SECRETS MANIFEST — key names only, never values',
    '',
    'Generated ' + new Date().toISOString().slice(0, 19).replace('T', ' ') + ' by `recovery/secrets-bundle.mjs`.',
    'Values live in `secrets.bundle.enc` (same folder) — one passphrase opens it.',
    '',
  ];
  for (const f of files) {
    const rel = f.replace(ROOT + '/', '').replace('C:/Users/josep/', '~/');
    let keys = [];
    try {
      keys = [...fs.readFileSync(f, 'utf8').matchAll(/^([A-Za-z_][A-Za-z0-9_]*)\s*=/gm)].map(m => m[1]);
    } catch { /* binary or unreadable — name it anyway */ }
    out.push('## `' + rel + '`');
    out.push(keys.length ? keys.map(k => '- ' + k).join('\n') : '- _(freeform notes / JSON — not key=value)_');
    out.push('');
  }
  fs.writeFileSync(MANIF, out.join('\n'));
}

function requirePass() {
  if (!pass) {
    console.error('x CGRAV_SECRETS_PASS is not set.');
    console.error('  PowerShell:  $env:CGRAV_SECRETS_PASS = "<your six-word passphrase>"');
    process.exit(1);
  }
}

if (mode === 'manifest') {
  const files = collect();
  writeManifest(files);
  console.log('[manifest] ' + files.length + ' secret-bearing files -> ' + MANIF);
  process.exit(0);
}

if (mode === 'lock') {
  requirePass();
  const files = collect();
  if (!files.length) { console.error('x nothing collected — check TARGETS'); process.exit(1); }

  // Flatten into a staging dir so restore is a copy, not a puzzle.
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'cgrav-ark-'));
  const map = [];
  for (const f of files) {
    const rel = f.replace(ROOT + '/', '').replace('C:/Users/josep/', 'HOME/');
    // Strip drive colons: a ':' surviving into a filename makes Windows create an
    // NTFS ALTERNATE DATA STREAM, and the real file silently vanishes from the
    // archive. Caught 2026-08-28 by this script's own round-trip probe — a stray
    // 1-byte file named 'C' appeared where a client .env should have been.
    const flat = rel.replace(/[\\/]/g, '__').replace(/:/g, '');
    fs.copyFileSync(f, path.join(stage, flat));
    map.push(flat + '  <=  ' + rel);
  }
  fs.writeFileSync(path.join(stage, '_RESTORE_MAP.txt'),
    'Copy each file back to the path on the right.\n\n' + map.join('\n') + '\n');

  const tar = path.join(os.tmpdir(), path.basename(stage) + '.tar.gz');
  execFileSync('tar', ['--force-local', '-czf', tar, '-C', stage, '.'], { stdio: 'inherit' });
  execFileSync('openssl', ['enc', '-aes-256-cbc', '-pbkdf2', '-iter', ITER, '-salt',
    '-pass', 'env:CGRAV_SECRETS_PASS', '-in', tar, '-out', BLOB], { stdio: 'inherit' });
  fs.rmSync(tar, { force: true });
  fs.rmSync(stage, { recursive: true, force: true });
  writeManifest(files);

  // Prove it opens. An unverified bundle is a rumor — the exact failure the
  // 2026-08-06 audit named. Never report "locked" without a round-trip.
  const probe = path.join(os.tmpdir(), 'ark-probe-' + Date.now() + '.tar.gz');
  try {
    execFileSync('openssl', ['enc', '-d', '-aes-256-cbc', '-pbkdf2', '-iter', ITER,
      '-pass', 'env:CGRAV_SECRETS_PASS', '-in', BLOB, '-out', probe], { stdio: 'pipe' });
    const n = execFileSync('tar', ['--force-local', '-tzf', probe]).toString().trim().split('\n').length;
    fs.rmSync(probe, { force: true });
    console.log('[lock] OK ' + files.length + ' files -> ' + BLOB +
      ' (' + (fs.statSync(BLOB).size / 1024).toFixed(1) + ' KB)');
    console.log('[lock] OK round-trip verified: decrypts, ' + n + ' entries readable');
    console.log('[lock]    manifest -> ' + MANIF);
  } catch (e) {
    fs.rmSync(probe, { force: true });
    console.error('[lock] FAIL — bundle wrote but will not decrypt. Do not trust it. ' + e.message);
    process.exit(1);
  }
  process.exit(0);
}

if (mode === 'unlock') {
  requirePass();
  if (!fs.existsSync(BLOB)) { console.error('x no bundle at ' + BLOB); process.exit(1); }
  const out = OUTDIR + '/_unlocked';
  fs.mkdirSync(out, { recursive: true });
  const tmp = path.join(os.tmpdir(), 'ark-open-' + Date.now() + '.tar.gz');
  execFileSync('openssl', ['enc', '-d', '-aes-256-cbc', '-pbkdf2', '-iter', ITER,
    '-pass', 'env:CGRAV_SECRETS_PASS', '-in', BLOB, '-out', tmp], { stdio: 'inherit' });
  execFileSync('tar', ['--force-local', '-xzf', tmp, '-C', out], { stdio: 'inherit' });
  fs.rmSync(tmp, { force: true });
  console.log('[unlock] OK -> ' + out);
  console.log('[unlock]    read _RESTORE_MAP.txt for where each file goes.');
  process.exit(0);
}

console.error('unknown mode "' + mode + '" — use lock | unlock | manifest');
process.exit(1);
