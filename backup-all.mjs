#!/usr/bin/env node
/**
 * Auto-backup for the Claude Gravity workspace.
 * - Refreshes the auto-memory snapshot into the vault.
 * - For each PRIVATE backup repo: commit if dirty, push if a remote is set.
 * - Skips the public Cgrav repo on purpose (curated by hand, never auto-dumped).
 * - Resilient: one repo failing never blocks the others or the session.
 * Wired as a Claude Code session hook; safe to run manually any time:
 *     node "C:/Users/josep/Claude Gravity/backup-all.mjs"
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/josep/Claude Gravity';
const MEMORY_SRC = 'C:/Users/josep/.claude/projects/C--Users-josep-Claude-Gravity/memory';
const SNAPSHOT = `${ROOT}/vault/_memory-snapshot`;

// PRIVATE repos only — the public Cgrav repo is deliberately excluded.
const REPOS = [
  `${ROOT}/vault`,
  `${ROOT}/king_maker_outbound`,
  `${ROOT}/kingmaker`,
  `${ROOT}/blackboard`,
];

const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
const log = [];
const sh = (cmd, cwd) => execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout: 60000 }).toString().trim();
// 2026-08-04 (memory audit): ATOMIC copy — plain copyFileSync left a null-byte wreck of
// useLeadSubmit.tsx in _client-sites-snapshot when a run died mid-copy. Temp + rename is
// atomic on the same volume; a killed run leaves a .tmp, never plausible-looking garbage.
const atomicCopy = (src, dst) => {
  const tmp = path.join(path.dirname(dst), `.${path.basename(dst)}.tmp`);
  fs.copyFileSync(src, tmp);
  fs.renameSync(tmp, dst);
};

// 1) Refresh the auto-memory snapshot (so a backup captures the latest memory).
try {
  if (fs.existsSync(MEMORY_SRC)) {
    fs.mkdirSync(SNAPSHOT, { recursive: true });
    for (const f of fs.readdirSync(MEMORY_SRC)) {
      if (f.endsWith('.md')) atomicCopy(path.join(MEMORY_SRC, f), path.join(SNAPSHOT, f));
    }
    log.push('memory snapshot refreshed');
  }
} catch (e) { log.push(`memory-snapshot ERROR: ${String(e.message || e).split('\n')[0]}`); }

// 1b) Snapshot the Claude config IP (skills + hooks + global CLAUDE.md) into the vault.
//     ~/.claude is NOT a git repo, so without this the skills/hooks are unprotected by any backup.
try {
  const CLAUDE_HOME = 'C:/Users/josep/.claude';
  const SKILLS_SNAP = `${ROOT}/vault/_skills-snapshot`;
  const KEEP = new Set(['.md','.mdx','.mjs','.js','.cjs','.ts','.tsx','.jsx','.py','.json','.txt','.css','.scss','.html','.svg','.yaml','.yml','.sh','.toml']);
  const SKIP_DIR = new Set(['node_modules','out','dist','coverage','test-results','playwright-report']);
  const copyTree = (src, dst) => {
    if (!fs.existsSync(src)) return;
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      if (e.name.startsWith('.') || SKIP_DIR.has(e.name)) continue;   // skip dotdirs (.next/.git/.vercel/.wo0*) + heavy/regenerable dirs
      const s = path.join(src, e.name), d = path.join(dst, e.name);
      if (e.isDirectory()) { copyTree(s, d); continue; }
      if (!KEEP.has(path.extname(e.name).toLowerCase())) continue;   // source/IP only — skip binary assets (mp3/png/webp)
      fs.mkdirSync(path.dirname(d), { recursive: true });
      atomicCopy(s, d);
    }
  };
  copyTree(`${CLAUDE_HOME}/skills`, `${SKILLS_SNAP}/skills`);
  copyTree(`${CLAUDE_HOME}/hooks`, `${SKILLS_SNAP}/hooks`);
  if (fs.existsSync(`${CLAUDE_HOME}/CLAUDE.md`)) {
    fs.mkdirSync(SKILLS_SNAP, { recursive: true });
    atomicCopy(`${CLAUDE_HOME}/CLAUDE.md`, `${SKILLS_SNAP}/CLAUDE.md`);
  }
  // also snapshot this backup tool itself — it lives untracked in the public repo's working tree.
  const TOOLING = `${SKILLS_SNAP}/_root-tooling`;
  for (const t of ['backup-all.mjs']) {
    if (fs.existsSync(`${ROOT}/${t}`)) { fs.mkdirSync(TOOLING, { recursive: true }); atomicCopy(`${ROOT}/${t}`, `${TOOLING}/${t}`); }
  }
  // the firm-site SOURCE (untracked; the live kingmakerseo.com business — otherwise the deploy is the only copy)
  copyTree(`${ROOT}/king-maker-site`, `${ROOT}/vault/_firm-site-snapshot`);
  // client deliverables (untracked in the PUBLIC cgrav repo; disk + live deploy are otherwise the only copies).
  // Snapshot into the PRIVATE vault so the client report never lands in the public repo.
  const CLIENT_SNAP = `${ROOT}/vault/_client-deliverables-snapshot`;
  copyTree(`${ROOT}/kingmaker-seo-audit`, `${CLIENT_SNAP}/kingmaker-seo-audit`);
  for (const f of ['ProShield-Roofing-Website-Report.md']) {
    if (fs.existsSync(`${ROOT}/${f}`)) { fs.mkdirSync(CLIENT_SNAP, { recursive: true }); atomicCopy(`${ROOT}/${f}`, `${CLIENT_SNAP}/${f}`); }
  }
  // CLIENT SITE SOURCE (the recovery gap WE20 flagged): mabrey-roofing (the first PAYING
  // client) + summit-oak-roofing (the blessed reference) are separate git repos with NO
  // REMOTE — a disk loss loses them entirely. copyTree grabs source only and, because it
  // skips node_modules (SKIP_DIR) + dotdirs (.git/.next/.vercel) + dot-prefixed files
  // (the stray .we20-*.png session captures), the snapshot is lean IP, not the 300M+ tree.
  // Rides the vault's proven push. NOTE: /public binary assets are NOT captured (source
  // ext-filter) — mabrey's images are Higgsfield-regenerable today; revisit when Sean's
  // REAL job photos land (§8 intake) — those become irreplaceable and must be added here.
  const SITES_SNAP = `${ROOT}/vault/_client-sites-snapshot`;
  for (const site of ['mabrey-roofing', 'summit-oak-roofing']) {
    if (fs.existsSync(`${ROOT}/${site}`)) copyTree(`${ROOT}/${site}`, `${SITES_SNAP}/${site}`);
  }
  log.push('skills+hooks+firm-site+client-deliverables+client-sites snapshot refreshed');
} catch (e) { log.push(`skills-snapshot ERROR: ${String(e.message || e).split('\n')[0]}`); }

// 2) Commit + push each private repo.
for (const repo of REPOS) {
  try {
    if (!fs.existsSync(`${repo}/.git`)) { log.push(`SKIP ${repo} (no .git)`); continue; }
    // clear a stale lock left by an interrupted prior run (>120s old) — the recurring push-blocker
    const lock = `${repo}/.git/index.lock`;
    if (fs.existsSync(lock) && (Date.now() - fs.statSync(lock).mtimeMs) > 120000) { fs.unlinkSync(lock); log.push(`cleared stale lock ${path.basename(repo)}`); }
    if (sh('git status --porcelain', repo)) {
      sh('git add -A', repo);
      sh(`git commit -q -m "auto-backup ${stamp}"`, repo);
      log.push(`committed ${path.basename(repo)}`);
    }
    let upstream = true;
    try { sh('git rev-parse --abbrev-ref --symbolic-full-name @{u}', repo); } catch { upstream = false; }
    if (upstream) { sh('git push -q', repo); log.push(`pushed ${path.basename(repo)}`); }
    else log.push(`no-remote ${path.basename(repo)} (create + push once, then auto)`);
  } catch (e) {
    log.push(`ERROR ${path.basename(repo)}: ${String(e.message || e).split('\n')[0]}`);
  }
}

try { fs.writeFileSync(`${ROOT}/.backup-log.txt`, `${stamp}\n${log.join('\n')}\n`); } catch {}
console.log(`[backup-all] ${stamp}\n  ${log.join('\n  ')}`);
