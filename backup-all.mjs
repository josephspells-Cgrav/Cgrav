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
// 2026-08-28 (recovery v2): ~/.claude added. It was pushed by hand and had gone
// 22 DAYS / 15 files stale — the one asset with no other source on earth, and
// the one whose loss fails SILENTLY (a missing gate does not error, the fleet
// just runs dumber). Its repo is default-deny allowlisted and settings.json is
// excluded, so auto-pushing it cannot leak the token class the 08-06 sweep found.
const REPOS = [
  `${ROOT}/vault`,
  `${ROOT}/king_maker_outbound`,
  `${ROOT}/kingmaker`,
  `${ROOT}/blackboard`,
  'C:/Users/josep/.claude',
];

const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
const log = [];
// 2026-08-30: timeout is now a parameter. It was hardcoded to 60s, which is right for
// git but killed the mempalace snapshot mid-copy and left a PARTIAL generation on disk
// that looks exactly like a real one. Found by testing the branch rather than the
// happy path — the skip path passed cleanly and told us nothing.
const sh = (cmd, cwd, timeout = 60000) => execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout }).toString().trim();
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
  // 2026-08-30 (Phase 3, OS71): wo/ TEXT snapshot. wo/ is 812 files / 1.8GB living
  // untracked in the PUBLIC Cgrav repo with ZERO backup coverage — grep this file before
  // 08-30 and "wo" appears nowhere. It holds DEFECT_ESCAPE_LEDGER.md (95 rows of
  // paid-for defect history, no other copy on earth), every work order, brief and
  // evidence pack, and wo/roundtable/.
  // Only the TEXT rides: the KEEP ext-filter above already excludes the 1,697MB of
  // groovy-brand media by construction. That media is NOT covered here and is not
  // meant to be — it belongs to the groovy-lighting media gap already logged above,
  // and bundling it would turn a 42MB problem into a 1.8GB one.
  // NOTE: some files here contain customer-identifying detail. They ride into the
  // PRIVATE vault only. This is the reason wo/ must never be tracked in this repo.
  copyTree(`${ROOT}/wo`, `${ROOT}/vault/_wo-snapshot`);

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
  // 2026-08-29 (Groovy Agent 2): groovy-lighting ADDED. It had ZERO backup coverage of
  // any kind — no git remote, gitignored by the parent repo, absent from REPOS, and absent
  // from this list — so the deployed site, 11 theme boards, 143 gallery images, the blessed
  // hero video work and a 51-file build all lived on ONE disk. Same private-vault route
  // mabrey-roofing and summit-oak-roofing already ride; not a new destination.
  // KNOWN RESIDUAL, stated not hidden: the ext-filter above captures SOURCE only, so
  // groovy-lighting's /public media (143 AI-generated gallery stills + the hero videos) is
  // still NOT covered. Those cost Higgsfield credits and the blessed hero is not trivially
  // regenerable. Same shape as the mabrey note above about Sean's real job photos.
  for (const site of ['mabrey-roofing', 'summit-oak-roofing', 'groovy-lighting']) {
    if (fs.existsSync(`${ROOT}/${site}`)) copyTree(`${ROOT}/${site}`, `${SITES_SNAP}/${site}`);
  }
  log.push('skills+hooks+firm-site+client-deliverables+client-sites snapshot refreshed');
} catch (e) { log.push(`skills-snapshot ERROR: ${String(e.message || e).split('\n')[0]}`); }

// 1c) Re-seal the CREDENTIAL ARK (2026-08-28, recovery v2) — must run BEFORE the
//     vault commit below so the fresh blob rides the vault's proven push.
//     Only fires when CGRAV_SECRETS_PASS is set. That env var adds NO marginal
//     exposure: an attacker with disk access already has every plaintext .env it
//     encrypts. If it is absent the ark simply goes stale, and recovery-census.mjs
//     reports that staleness as a finding — fail loud, never fail silent.
try {
  if (process.env.CGRAV_SECRETS_PASS) {
    sh(`node "${ROOT}/recovery/secrets-bundle.mjs" lock`, ROOT);
    log.push('credential ark re-sealed');
  } else {
    log.push('ark SKIPPED (CGRAV_SECRETS_PASS unset) — census will flag it stale');
  }
} catch (e) { log.push(`ark ERROR: ${String(e.message || e).split('\n')[0]}`); }

// 1c-bis) RUN the recovery census (Phase 3, 2026-08-30). The comment above claimed
//     "recovery-census.mjs reports that staleness as a finding — fail loud, never
//     fail silent." It does report it, correctly, exiting 1 and naming the exact
//     remediation command. This file just never CALLED it — 0 invocations, probed.
//     Its only real invoker was bootstrap-new-machine.ps1, which runs during a
//     REBUILD: the instrument that tells you your backups are broken fired only
//     after the disaster it exists to prevent.
//     ⚖️ A comment asserting that another instrument covers this is not coverage —
//     it is worse than silence, because naming the safety net is what convinces
//     every subsequent reader that one exists.
//     Age-gated to 24h: the census walks every repo and queries Vercel, so it is
//     far too slow to run on every SessionEnd.
try {
  const CENSUS_STAMP = `${ROOT}/.recovery-census-last.txt`;
  const DAY = 24 * 60 * 60 * 1000;
  const last = fs.existsSync(CENSUS_STAMP) ? fs.statSync(CENSUS_STAMP).mtimeMs : 0;
  if (Date.now() - last > DAY) {
    let out = '';
    try {
      out = sh(`node "${ROOT}/recovery/recovery-census.mjs"`, ROOT, 10 * 60 * 1000);
    } catch (e) {
      // exit 1 IS the census finding things — capture stdout, do not treat as a crash
      out = String((e.stdout && e.stdout.toString()) || e.message || '');
    }
    fs.writeFileSync(CENSUS_STAMP, out);
    const findings = (out.match(/^\s*!!/gm) || []).length;
    log.push(findings
      ? `🔴 RECOVERY CENSUS: ${findings} finding(s) — see .recovery-census-last.txt`
      : 'recovery census: clean');
    for (const line of (out.match(/^\s*!!.*$/gm) || []).slice(0, 6)) log.push(`   ${line.trim()}`);
  } else {
    log.push('recovery census fresh (<24h) — skipped');
  }
} catch (e) { log.push(`recovery census ERROR: ${String(e.message || e).split('\n')[0]}`); }

// 1d) mempalace snapshot (Phase 3, 2026-08-30). 380MB, 38,297 records, no git, no
//     remote, and absent from this file until tonight — the largest memory store on
//     the machine and the last one with no copy of any kind. It is a LIVE SQLite +
//     HNSW vector store, so "git init and push" is wrong for it twice over:
//     chroma.sqlite3 is ~269MB (past GitHub's blob ceiling, so the plan does not even
//     ship), and a naive copy tears the vector index away from the metadata it
//     indexes — a tear that is invisible until someone actually needs the restore.
//     mempalace-snapshot.mjs proves a quiet window instead of assuming one: it hashes
//     the live store, copies, then re-hashes and discards the copy if anything moved.
//     AGE-GATED to 12h — this file runs on SessionEnd from several places, and a
//     400MB copy on every one of them would be its own denial of service.
try {
  const MP_OUT = 'C:/Users/josep/.mempalace-backups';
  const TWELVE_H = 12 * 60 * 60 * 1000;
  let newest = 0;
  if (fs.existsSync(MP_OUT)) {
    for (const e of fs.readdirSync(MP_OUT, { withFileTypes: true })) {
      if (e.isDirectory()) newest = Math.max(newest, fs.statSync(path.join(MP_OUT, e.name)).mtimeMs);
    }
  }
  if (Date.now() - newest > TWELVE_H) {
    // 15 min: hashing 380MB twice plus the copy runs well past the 60s default.
    sh(`node "${ROOT}/recovery/mempalace-snapshot.mjs"`, ROOT, 15 * 60 * 1000);
    log.push('mempalace snapshot taken + validated');
  } else {
    log.push('mempalace snapshot fresh (<12h) — skipped');
  }
} catch (e) {
  const first = String(e.message || e).split('\n')[0];
  log.push(`mempalace snapshot FAILED: ${first}`);
}

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
