#!/usr/bin/env node
/**
 * recovery-census.mjs — THE AUDITOR. Answers one question, mechanically:
 *
 *     "If this machine died right now, what would be gone forever?"
 *
 * It never asserts the backups are fine. It enumerates every asset and PROVES
 * each one has a second home, or names it as a total-loss item. Exit 1 on any
 * finding so it can gate a hook, a cron, or a session.
 *
 * Design law it enforces (this workspace's own receipt, 2026-07-16): a HARDCODED
 * LIST BESIDE A GROWING SET ROTS BY DEFAULT. The old backup-all.mjs knew about
 * exactly 4 repos while the disk grew to dozens — so this discovers instead.
 *
 *     node recovery/recovery-census.mjs            # full census
 *     node recovery/recovery-census.mjs --quick    # skip network (vercel/gh)
 */
import { execSync, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/josep/Claude Gravity';
const QUICK = process.argv.includes('--quick');
const findings = [];
const clean = [];
const F = (msg) => findings.push(msg);
const OK = (msg) => clean.push(msg);

const sh = (cmd, cwd) => {
  // 2026-08-31: was timeout 30000. `npx --yes vercel@latest` re-resolves the package
  // on a cold cache and blows past 30s, so the census intermittently reported
  // "could not read Vercel env (auth?)" when auth was fine — measured 9s warm,
  // far longer cold. A timeout that produces a WRONG DIAGNOSIS is worse than a
  // slow check: it sent the reader to fix authentication that was never broken.
  try { return execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'ignore'], timeout: 180000 }).toString().trim(); }
  catch { return null; }
};
const ageDays = (p) => fs.existsSync(p) ? (Date.now() - fs.statSync(p).mtimeMs) / 864e5 : Infinity;

console.log('RECOVERY CENSUS — ' + new Date().toISOString().slice(0, 19).replace('T', ' '));
console.log('='.repeat(72));

// ── 1. EVERY git repo on disk: does it have a second home? ──────────────────
// Discovery, not a list. A repo with no remote is one disk-failure from gone.
console.log('\n[1] REPOS — every working tree, discovered');
const skip = new Set(['node_modules', '.git', 'vault']);   // vault checked separately
const repos = [];
for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!e.isDirectory() || skip.has(e.name)) continue;
  if (e.name.startsWith('.wt-') || e.name.startsWith('.kimi')) continue;  // ephemeral worktrees
  if (fs.existsSync(path.join(ROOT, e.name, '.git'))) repos.push(path.join(ROOT, e.name));
}
repos.unshift(ROOT, ROOT + '/vault');

for (const repo of repos) {
  const name = repo === ROOT ? '(workspace root)' : path.basename(repo);
  const remote = sh('git remote get-url origin', repo);
  if (!remote) {
    const sz = sh('git count-objects -vH', repo) || '';
    F('REPO WITH NO REMOTE: ' + name + ' — one disk failure from total loss. ' +
      (sz.match(/size-pack: (.+)/)?.[1] || ''));
    continue;
  }
  const st = sh('git status -sb', repo) || '';
  const dirty = (sh('git status --porcelain', repo) || '').split('\n').filter(Boolean).length;
  const ahead = st.match(/ahead (\d+)/)?.[1];
  if (ahead) F('UNPUSHED: ' + name + ' is ' + ahead + ' commit(s) ahead of origin');
  else if (dirty > 20) F('UNCOMMITTED: ' + name + ' has ' + dirty + ' dirty files, never committed');
  else OK(name + ' -> ' + remote.replace('https://github.com/', ''));
}

// ── 2. THE OPERATING LAYER — ~/.claude, the one asset with no other source ──
console.log('\n[2] OPERATING LAYER — ~/.claude (skills, hooks, gates, CLAUDE.md)');
const CL = 'C:/Users/josep/.claude';
if (!fs.existsSync(CL + '/.git')) {
  F('~/.claude IS NOT A GIT REPO — 60+ skills and every gate are one-disk.');
} else {
  const last = sh('git log -1 --format=%ct', CL);
  const days = last ? (Date.now() / 1000 - Number(last)) / 86400 : Infinity;
  const dirty = (sh('git status --porcelain', CL) || '').split('\n').filter(Boolean).length;
  if (days > 7) F('~/.claude last committed ' + days.toFixed(0) + ' days ago (' + dirty +
    ' files uncommitted). Skills/hooks drift here silently — a missing gate fails QUIET.');
  else OK('~/.claude committed ' + days.toFixed(1) + 'd ago');
}

// ── 3. THE ARK — is the secrets bundle newer than the secrets? ──────────────
console.log('\n[3] CREDENTIAL ARK — recovery/secrets.bundle.enc');
const BLOB = ROOT + '/vault/_ark/secrets.bundle.enc';
if (!fs.existsSync(BLOB)) {
  F('NO SECRETS BUNDLE. Every .env on this disk is its own last copy. ' +
    'Run: node recovery/secrets-bundle.mjs lock');
} else {
  const blobAge = ageDays(BLOB);
  let newest = 0, newestName = '';
  for (const p of [ROOT + '/king-maker-codes.txt', ROOT + '/mabrey-crm-app/.env.local',
                   ROOT + '/king_maker_outbound/config/.env', CL + '/settings.json']) {
    if (fs.existsSync(p) && fs.statSync(p).mtimeMs > newest) { newest = fs.statSync(p).mtimeMs; newestName = path.basename(p); }
  }
  if (newest > fs.statSync(BLOB).mtimeMs)
    F('ARK IS STALE — ' + newestName + ' changed after the last lock. Re-run: node recovery/secrets-bundle.mjs lock');
  else OK('ark sealed ' + blobAge.toFixed(1) + 'd ago, newer than every tracked secret file');
}

// ── 4. THE WRITE-ONLY STORES — Vercel Secrets that exist nowhere else ───────
// Category 6 (audit the auditor): the ark can only hold what it knows about.
// Vercel Secret-type vars CANNOT be pulled back. Any name not in the manifest
// is a value that dies with the account.
if (!QUICK) {
  console.log('\n[4] WRITE-ONLY STORES — Vercel Secrets vs the manifest');
  const MANIF = ROOT + '/vault/_ark/SECRETS_MANIFEST.md';
  const known = fs.existsSync(MANIF)
    ? new Set([...fs.readFileSync(MANIF, 'utf8').matchAll(/^- ([A-Z_][A-Z0-9_]*)$/gm)].map(m => m[1]))
    : new Set();
  for (const proj of ['mabrey-crm-app', 'mabrey-land/site', 'king-maker-site']) {
    const dir = ROOT + '/' + proj;
    if (!fs.existsSync(dir + '/.vercel')) continue;
    const out = sh('npx --yes vercel@latest env ls production', dir);
    if (!out) { F('could not read Vercel env for ' + proj + ' (auth? run: npx vercel login)'); continue; }
    const secretNames = [...out.matchAll(/^\s+([A-Z_][A-Z0-9_]*)\s+.*?\bSecret\b/gm)].map(m => m[1]);
    const orphans = secretNames.filter(n => !known.has(n));
    if (orphans.length)
      F('TOTAL-LOSS SET (' + proj + '): ' + orphans.length + ' Vercel Secrets exist ONLY in Vercel ' +
        'and cannot be pulled back -> ' + orphans.join(' '));
    else OK(proj + ': all ' + secretNames.length + ' Vercel Secrets are mirrored in the ark');
  }
}

// ── 5. THE HEARTBEAT — is the backup automation itself alive? ───────────────
// A watchdog that never posts is indistinguishable from a healthy system.
console.log('\n[5] HEARTBEAT — did the backup actually run?');
const hb = ageDays(ROOT + '/.backup-log.txt');
if (hb > 2) F('BACKUP HEARTBEAT COLD — .backup-log.txt is ' + hb.toFixed(1) +
  ' days old. The automation is dead and nothing told you.');
else OK('backup ran ' + (hb * 24).toFixed(1) + 'h ago');

// ── 6. THE COLD COPY — bulk that git will never hold ───────────────────────
console.log('\n[6] COLD COPY — bulk assets (transcripts, media, footage)');
const COLD = ROOT + '/recovery/.cold-copy-receipt.txt';
const cold = ageDays(COLD);
if (cold > 100) F('COLD COPY OVERDUE — last offline/offsite copy ' +
  (cold === Infinity ? 'NEVER RECORDED' : cold.toFixed(0) + ' days ago') +
  '. Raw transcripts (~2.9GB) and client media live on one disk + one cloud.');
else OK('cold copy taken ' + cold.toFixed(0) + 'd ago');

// ── VERDICT ────────────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(72));
console.log('CLEAN (' + clean.length + '):');
for (const c of clean) console.log('  ok  ' + c);
console.log('\nFINDINGS (' + findings.length + '):');
if (!findings.length) console.log('  ALL CLEAR — every asset has a proven second home.');
for (const f of findings) console.log('  !!  ' + f);
console.log('='.repeat(72));
process.exit(findings.length ? 1 : 0);
