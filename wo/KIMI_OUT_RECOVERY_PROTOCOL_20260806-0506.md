• I'll read the brief first.

• Read the brief. The artifact is embedded verbatim, constraints are clear: read-only, hostile review, markdown to stdout. Here is the audit.

  ---

  # ADVERSARIAL AUDIT — KING MAKER BACKUP & RECOVERY PROTOCOL

  ## VERDICT

  **No — the protocol does not meet its success criteria today, and it cannot even prove how badly it misses, because nothing in it has ever been executed.** What exists is an honest asset *inventory* wearing the costume of a recovery *protocol*: there is no procedure, no per-asset RPO/RTO table, no drill history, no runbooks. In the stated scenario (machine destroyed) the outcome is: code core survives (genuinely — push discipline is real), the database's "≤24h loss" claim is unbacked assertion (no snapshot schedule, PITR window unknown and possibly ~28× smaller than assumed, zero restores ever performed), the agent operating layer (`~/.claude`) is *permanently and totally unrecoverable* — it exists nowhere else in the universe — and the credential re-entry chain dead-ends in the fire variant at a 2FA phone with recovery codes whose location is unstated and which are likely on the disk that just died. The strongest section (§8, proven machinery) proves in-session continuity, which transfers almost nothing to machine loss. The 1-working-day bar is unmeasured, not met — and on the evidence, several asset classes fail it *silently*: the operator currently believes things (7-day PITR, "recoverable in the Vercel dashboard," a cron that "backs up" the vault) that are false.

  ---

  ## FINDINGS

  **F1 · LAUNCH-KILLER · Class 4 (agent operating layer)**
  Hole: `~/.claude` — 60+ skills, hooks, gate configs, global CLAUDE.md, the entire codified doctrine — is one-disk, unversioned, existing in exactly one place in the universe.
  Failure scenario: disk dies. The layer is not "degraded," it is *gone* — rebuild from memory is weeks and lossy. Worse than the loss is the aftermath: sessions keep starting and producing work, but the Stop-hook that blocks unverified claims, the gate configs, and the audit protocols are absent *silently* — the fleet runs dumber and the operator cannot tell from outputs. Success criterion "the agents' operating layer returns" is unmeetable on any timeline.
  Minimal fix: make `~/.claude` its own private GitHub repo, pushed nightly by cron and on-change. Before the first push, secret-sweep it: exclude `.credentials.json`, any `settings.json` env blocks, MCP configs with embedded keys, hook scripts containing tokens, and all session transcripts/history (PII). Add a grep-based pre-push secret scan (`sk-`, `xoxb-`, Telnyx/VAPI key shapes).

  **F2 · LAUNCH-KILLER · Class 3 (secrets) + Class 7 (access)**
  Hole: the re-entry chain is email → 2FA phone → recovery codes, and the recovery codes' location is unstated — if they exist, they most likely live on the machine that just burned. No password manager is mentioned anywhere in the operation. Separately, the protocol's claim that masked `[SENSITIVE]` Vercel values are "recoverable inside Vercel's dashboard" is **factually wrong**: Vercel sensitive env vars are write-only — the dashboard cannot reveal them either. For every sensitive var, the *only* recovery is re-issue at the provider.
  Failure scenario (fire variant): machine + phone gone → GitHub password lives in a dead browser profile → email reset needs phone 2FA → recovery codes were on the machine → dead-end. GitHub support 2FA recovery is days-to-weeks with no guarantee. The 1-day target is dead; some accounts may never come back. Even in the mild variant (phone survives), every `[SENSITIVE]` var triggers a per-provider re-issue hunt across 12 providers with no inventory — that alone blows one working day.
  Minimal fix: (a) generate and print recovery codes for GitHub, Vercel, and the email account; one paper copy offsite, one in a cloud password manager (Bitwarden free tier). (b) Add a second TOTP device or a cloud-synced authenticator. (c) Build the credential inventory (structure in Answer 3). Total cost: ~2 hours + $0–3/mo.

  **F3 · LAUNCH-KILLER · Class 2 (database)**
  Hole: no automated snapshot schedule — so steady-state RPO is *unbounded*, silently violating the 24h criterion every ordinary day (leads, SMS threads, call logs accumulate between "risky operations"). The PITR assumption is unverified with tier unknown — on Neon's free tier the history window is hours, not 7 days, making the stated assumption potentially ~28× optimistic. No restore of anything has ever been performed, so restorability itself is unknown: no loader script, no FK-ordering, no sequence-reset handling, no verification queries exist. Snapshots live in the monorepo, whose push cadence is undefined (F5) — their offsite-ness is luck.
  Failure scenario: a bad bulk op or app bug corrupts lead/message data; discovered 3 days later. Free-tier PITR window is long closed; newest manual snapshot is from whenever the last "risky op" happened; everything between is gone — and that data is the revenue asset a $100/day spend is buying. Alternatively the data survives but the first-ever restore is attempted under disaster pressure and fails on FK/sequence problems nobody tested.
  Minimal fix: nightly automated dump via GitHub Actions (connection string as an Actions secret — this also removes the machine from the backup path entirely) into a *separate* private repo; daily×7, weekly×4, monthly×3 retention; dump must include schema + sequences; weekly automated restore-to-Neon-branch with row-count diff. Record the actual Neon plan tier and retention window in the recovery doc today — that's a 10-minute check retiring a fantasy.

  **F4 · HIGH · Class 1 (contractor template)**
  Hole: "lives on a branch of a separate repo under OneDrive" — no GitHub remote is stated. Recovery depends on the OneDrive account, sync state, and a folder service that is not a git remote.
  Failure scenario: machine loss + any OneDrive account friction (or the sync simply having lagged) → template gone or stale, discovered only when a new client build needs it.
  Minimal fix: push the branch to a private GitHub remote. Ten minutes.

  **F5 · HIGH · Class 1 (monorepo)**
  Hole: "pushed at bank points; some subdirs untracked at any given moment" — the unprotected set is unnamed and the maximum gap between bank points is undefined. The data-loss window is unbounded by construction.
  Failure scenario: disk dies mid-session after a day of unbanked work across untracked subdirs — research campaign state, WOs, receipts. Nobody can even enumerate what was lost, because nobody knows what was untracked.
  Minimal fix: invert the policy — gitignore-by-default with an explicit allowlist, so untracked = deliberate; define bank points (mandatory at every session end and before every destructive op); add a git-status dirty-check to the existing Stop-hook machinery.

  **F6 · HIGH · Class 6 (VAPI live config)**
  Hole: tracked prompt file vs live assistant config *has already drifted*; nothing reconciles them.
  Failure scenario: any redeploy or restore applies the stale file — the voice agent calls real customers with wrong/outdated behavior, silently, on the client's dime. This is not a disaster-day risk; it is a *now* risk.
  Minimal fix: weekly automated pull of the live assistant config via VAPI API, diffed against the tracked file; alert on drift. Pick one direction as source of truth and enforce it.

  **F7 · MED · Class 5 (vault cron)**
  Hole: the auto-backup cron "commits periodically" — commits, not pushes. Unpushed commits die with the disk. No failure monitoring: a dead cron and a healthy one look identical from the inside.
  Failure scenario: operator believes vault backups are continuous; actual protection is the monorepo bank-point cadence (undefined, F5). Disk dies; the "backup" turns out to have been local git objects.
  Minimal fix: cron must push and log; add a weekly remote-vs-local HEAD check.

  **F8 · MED · Class 3 (secrets index)**
  Hole: `king-maker-codes.txt` is one-disk and *known* to lag reality — it is simultaneously the only local index and an unreliable one.
  Failure scenario: pre-disaster, a rotation follows the stale file and strands a working credential; post-disaster the file is gone anyway, so its entire function collapses to the 12-provider re-issue hunt of F2.
  Minimal fix: supersede it with the cloud credential inventory (Answer 3), then delete the file. A stale one-disk index is worse than none — it manufactures confidence.

  **F9 · MED · Class 2 (snapshot PII/placement)**
  Hole: JSON snapshots of 44 tables of a CRM texting real customers contain real PII and are committed into the working monorepo — contradicting the operation's own PII fencing (`leads/` is fenced) and guaranteeing repo bloat as tables grow.
  Failure scenario: repo gets shared, cloned carelessly, or a future tooling mistake exposes history; PII of real Raleigh homeowners sits in git. Separately, snapshot growth bloats every clone.
  Minimal fix: snapshots live in the separate backup repo (F3), gitignored in the monorepo.

  **F10 · MED · Class 1 (mabrey-docs)**
  Hole: 414MB "FIRST pushed TODAY" with no completeness verification stated. GitHub hard-blocks individual files >100MB — video ad plates can exceed that — so the push either used LFS or partially failed, and nobody has cloned it fresh to find out which.
  Failure scenario: two-weeks-one-disk anxiety resolved by a push that silently dropped the largest plates; discovered on restore day.
  Minimal fix: fresh clone on a second machine, file-count and byte-size diff against source. Folds into the drill (Answer 2).

  **F11 · MED · Class 3/7 (account correlation, single GitHub account)**
  Hole: all code sits under one personal GitHub account; whether Neon is provisioned through the Vercel integration is unstated — if it is, Vercel account loss cascades to the database.
  Failure scenario: GitHub account lockout/flag (automated abuse systems don't care that you're a paying small business) → all repos unreachable at once; OAuth-into-Vercel may degrade with it. If Neon rides the Vercel integration, the DB's control plane goes too.
  Minimal fix: script a mirror-push of all repos to a second remote (a free GitLab/second-account mirror); record the direct Neon login (not via Vercel) in the credential inventory.

  **F12 · MED · Class 6 (no runbooks)**
  Hole: zero export/rebuild runbooks for Meta, Telnyx, DNS, Slack, DocuSeal.
  Failure scenario: machine-loss day includes rebuilding dev capability under time pressure; every cloud-config question becomes archaeology through receipts. Meta rebuild "from receipts" also resets campaign learning — a real, recurring cost mislabeled as free.
  Minimal fix: one-page runbook per provider: what exists, where, export path, rebuild steps. Written once, updated on change.

  **F13 · MED · Class 7 (break-glass)**
  Hole: one human is the only approver and only credential-holder; no emergency-access mechanism exists.
  Failure scenario: incapacitation (outside the stated scenario, but the same single-point): the business halts permanently with paying spend live.
  Minimal fix: password-manager emergency-access feature (Bitwarden/Keeper both have it) or a sealed envelope with a trusted party. An hour, once.

  **F14 · LOW · Class 7 (workspace third copy)**
  Hole: OneDrive covers Documents but not `C:/Users/josep/Claude Gravity` — no secondary sync for the workspace. Acceptable given git discipline, but it is an *unstated* accepted risk.
  Minimal fix: state it as accepted in the doc, or add any secondary backup of the monorepo.

  **F15 · LOW · Class 8 (false-confidence transfer)**
  Hole: §8's proven machinery (journal resume, health-SHA readback, by-ID deletes) is real but covers in-session continuity only. Its track record actively manufactures confidence at the disaster layer, where nothing has been tested.
  Minimal fix: label it in the doc: "proven for session continuity; disaster recovery untested."

  ---

  ## ANSWERS

  **1. COVERAGE — per class, does the stated path restore within 1 day / ≤24h loss?**

  - **1 CODE — partial.** Core CRM + marketing site: ✅ (pushed per-commit, verified by health-SHA readback discipline). Template: ❌ (OneDrive-only, F4). Monorepo in-flight/untracked work: ❌ unbounded (F5). mabrey-docs: ⚠️ pushed-but-unverified (F10).
  - **2 DATABASE — ❌ silently fails the 24h bar.** No schedule, PITR unverified, zero restores (F3).
  - **3 SECRETS — ❌.** Non-sensitive Vercel vars: ✅. Every sensitive var: re-issue-only with no inventory; re-entry chain dead-ends in the fire variant (F2, F8).
  - **4 OPERATING LAYER — ❌ fails completely and permanently.** Not recoverable at all today (F1).
  - **5 AGENT MEMORY — ⚠️ as written, ❌.** Vault passes only via monorepo bank points; the cron meant to tighten the window is commit-only (F7). Handoff files: ✅ when banked.
  - **6 EXTERNAL CONFIG — survives (cloud) but fails the 1-day capability bar.** No runbooks (F12); VAPI drift is an active correctness bug (F6); Meta rebuild = hours + learning reset.
  - **7 HARDWARE/ACCESS — ❌ in the fire variant.** 2FA phone + unknown-location recovery codes = re-entry dead-end (F2). Never tested on a second machine.
  - **8 PROVEN MACHINERY — ✅ for what it covers; covers nothing here.**

  Classes that *silently* fail the bar today: 2, 3 (sensitive subset), 5 (between bank points), 7 (fire variant), and the unknown subset of 1. Class 4 fails loudly only because it was declared 20 minutes before the brief.

  **2. THE UNTESTED-RESTORE PROBLEM — rank + drills.**

  Ranking by risk-retired-per-hour:

  - **#1 — Full second-machine rebuild drill.** One exercise touches classes 1, 3, 4, 5, 7 simultaneously and *is* the success criterion measured directly. Nothing else comes close per hour.
  - **#2 — Neon restore drill.** The DB is the only asset that is both irreplaceable-in-principle (real customer history exists nowhere else) and never restored. Retires the PITR fantasy and the no-loader problem together.
  - Then: VAPI config pull/diff (cheap), mabrey-docs clone-verify (folds into #1).

  **Drill A — second-machine rebuild (timebox: 1 working day = the criterion itself).** Any spare or borrowed Windows machine, or a clean VM. From zero, using only what a stranger to the machine would have: install Git/Node/pnpm → authenticate GitHub (this *is* the 2FA test) → clone all repos including mabrey-docs and template → byte/file-count diff mabrey-docs → Vercel CLI login, link, `vercel env pull` → catalog every `[SENSITIVE]` mask and chase its provider re-issue path *now*, in the inventory → run the 3,016-test suite (proves dev capability) → deploy a preview, verify health-SHA. Rule: every time you reach for the old machine, that's a finding — log it, fix it by moving that thing off-disk. Pass/fail = the verbatim success criteria. If it takes longer than a day, the protocol fails by measurement instead of opinion. Quarterly.

  **Drill B — Neon restore (timebox: 2 hours).** Create a scratch Neon branch/project → write the loader for the latest JSON snapshot (FK ordering, sequence resets) → load → verify: per-table row counts vs a manifest, plus 10 spot-checked leads end-to-end via a preview deploy pointed at the restore → time it → the commands you actually ran become the restore runbook, verbatim. While in the Neon console: record plan tier + history-retention window in the recovery doc. If the tier's window is shorter than assumed, that line of the protocol gets corrected the same day.

  **3. SECRETS — the actual re-entry walk.**

  Machine gone, worst in-scenario case (fire took the phone too): GitHub password lives in the dead machine's browser profile, no password manager exists → reset via email → email 2FA is on the dead phone → email recovery codes… unstated, likely on the machine. **Dead-end #1.** If the phone survives: email reset works, GitHub recovered via TOTP. Vercel via GitHub OAuth inherits that. `vercel env pull` recovers non-sensitive vars; every `[SENSITIVE]` var is write-only even in the dashboard (the protocol's belief otherwise is a defect) → per-provider re-issue across Meta, Telnyx, VAPI, Slack ×2, DocuSeal, EagleView, Higgsfield, DataForSEO, Moonshot, Neon, GitHub — each gated on that provider's own login+2FA, none documented. **Dead-end #2:** any provider whose 2FA was phone-only with codes on the disk joins dead-end #1.

  Minimal consolidated inventory (structure, no values) — one table, cloud password-manager secure note + printed offsite copy:

  `provider · login email / account id · credential NAMES held (no values) · retrievable where (provider console / nowhere = re-issue only) · re-issue path (console URL + nav steps) · 2FA method + device · recovery-codes location · rotation blast radius (what breaks: e.g., rotating Telnyx key → update Vercel env → redeploy CRM) · last-verified date`

  That last column plus a reconcile-on-rotation rule is what keeps it from becoming `king-maker-codes.txt` v2.

  **4. DATABASE — what a live customer-texting CRM actually needs.**

  - **Cadence:** automated dump nightly, minimum (that's the stated 24h RPO — currently met by nobody). Add a pre-risky-op snapshot (keep the current habit — it's the one good part).
  - **Mechanism:** GitHub Actions cron, not a machine cron — the backup path must not depend on the machine whose loss is the scenario. Connection string as an Actions secret.
  - **Content:** schema DDL + per-table data + explicit sequence values (the classic silent restore bug).
  - **Retention:** daily ×7, weekly ×4, monthly ×3.
  - **Placement:** a *separate* private repo (or release assets/object storage) — not the working monorepo (PII fencing, bloat, and blast-radius separation: F9).
  - **PITR:** verify tier and window today, write it down, treat PITR as a same-day oops-net only, never as backup.
  - **Verification:** weekly automated restore-to-branch with row-count diff. A backup nobody restores is a rumor.

  **5. OPERATING LAYER — how bad, loud vs silent, minimal fix.**

  How bad: it is the worst single loss in the inventory — the only asset that is (a) one-disk, (b) unrecoverable from any other source, and (c) load-bearing for every future session's quality. The DB is in the cloud; code is pushed; secrets are re-issuable. `~/.claude` simply ceases.

  Breaks **loudly**: missing skills, missing global CLAUDE.md — sessions notice immediately. Breaks **silently** (the dangerous half): the Stop-hook that blocks unverified UI claims — gone, so unverified claims ship; session-start context injection — gone, so handoff continuity degrades subtly; gate configs — gone, so whatever they enforce stops being enforced while outputs still *look* like gated work. The fleet keeps running, dumber, and there is no signal.

  Minimal durable fix: private git repo for `~/.claude`, nightly push cron + push-on-change. **Before any push**, exclude and scan: `.credentials.json`, `settings.json` env blocks, MCP server configs with keys, hook scripts with embedded tokens, and all transcripts/projects/history (ephemeral + PII). Pre-push grep for key shapes (`sk-`, `xoxb-`, Telnyx/VAPI patterns). Then add "restore `~/.claude` from git" as a required step of Drill A.

  **6. SINGLE-POINTS-OF-HUMAN.**

  - **2FA phone — the one that kills the 1-day target dead.** Every re-entry flow passes through it; in the fire variant it dies with the machine and the chain ends (F2). Cheapest mitigation a one-person company will actually do: printed recovery codes offsite + in a cloud password manager, plus a second TOTP device or cloud-synced authenticator. ~1 hour, $0.
  - **GitHub account** (all code, possibly OAuth into Vercel): recovery codes + scripted mirror-push to a second remote. Protects against lockout/ban, not just loss.
  - **Vercel account** (deploys, env vars, possibly Neon linkage): document redeploy-from-git (projects are recreatable by reconnecting repos — the env vars are the real loss, covered by the Answer-3 inventory); record the direct Neon login.
  - **The human** (only approver): outside the machine-loss scenario but the same shape. Cheapest: password-manager emergency access or sealed envelope with a trusted party. One hour, once.

  **7. LIVE-CONFIG DRIFT — export vs receipts.**

  Warrants an export runbook / periodic pull:
  - **VAPI assistant config** — weekly API pull + diff against the tracked file. Customer-facing, proven drift, silent failure mode. Top of the list.
  - **Meta campaign/adset/ad structure** — monthly Marketing-API export. Receipts-rebuild costs hours *plus* a learning-phase reset on live $100/day spend.
  - **Telnyx number + messaging profile, DNS zone, DocuSeal templates** — one-page export once, updated on change. Tiny surface, trivial cost.

  Rebuild-from-receipts acceptable:
  - **Slack app manifests** (internal coordination, low cost to rebuild).
  - **Ad creatives** — the assets live in mabrey-docs (once F10 is resolved); skeletons rebuildable.
  - **Pixel code/ID** — in-repo; but note plainly: historical pixel/audience data is account-bound and unrebuildable on *account* loss. Accepted-risk line, in writing.

  **8. UNDERSPECIFICATION SWEEP — every place an executing session must guess (each a defect).**

  - "Bank points" — undefined event, no max-gap bound, no way to check compliance.
  - "Some subdirs untracked" — which ones; the unprotected set is unknowable.
  - "Assumed ~7 days PITR, tier unknown" — no check command, no recorded tier, no verification date.
  - "Snapshots stored in the monorepo" — no path, naming, rotation, retention; restore procedure absent entirely (no loader, FK order, sequence handling, verification queries).
  - "Known to LAG reality" — lag by how much, which entries stale, no reconcile rule or last-verified dates.
  - "Recoverable inside Vercel's dashboard" — false for sensitive vars; a session would burn disaster-day hours hunting for a button that doesn't exist.
  - "Cron commits periodically" — period, push-vs-commit, and failure monitoring all unstated.
  - "_memory-snapshot mirrored by a session-start hook" — max staleness between sessions unstated.
  - "No export/rebuild runbook exists" — and no owner, deadline, or acceptance criteria for creating them.
  - "Deploys via CLI only" — CLI auth dies with the machine; the re-login path (account, 2FA, team membership) is undocumented.
  - "FIRST pushed TODAY" (mabrey-docs) — no completeness-verification method (counts, sizes, LFS).
  - "≤24h of data loss" — no per-asset RPO table; undefined which assets the number binds.
  - No drill success definition, schedule, or pass/fail criteria.

  **9. THE ONE THING.**

  **Run Drill A this week: the full second-machine rebuild, scored against the verbatim success criteria.** Every other fix on this page is an inference; the drill converts the whole protocol from assertion to measurement in ≤1 day at $0. It empirically surfaces the credential dead-ends (F2), the `~/.claude` absence (F1), the mabrey-docs gap (F10), and the env-mask hunt — and its own log, written as executed, *becomes* the recovery runbook the operation doesn't have. If the "change" must be a persistent state change rather than a test, the runner-up is F1: `~/.claude` into git — it is the only asset that is today unrecoverable *in principle*.

  ---

  ## MISSING

  - The recovery runbook itself — there is no step-1…step-n disaster-day procedure; the "protocol" is an inventory.
  - Per-asset RPO/RTO table binding the "≤24h / 1 working day" numbers to specific assets.
  - Credential inventory (provider → credential name → retrievable-where → re-issue path → 2FA → codes location → rotation blast radius).
  - Recovery codes — existence and location unstated for every account.
  - Any password manager.
  - Second restore machine / any drill, ever / drill schedule.
  - Automated DB snapshot schedule; DB restore procedure (loader, FK order, sequences, verification); Neon tier + retention verification.
  - Any offsite copy of `~/.claude`.
  - Push (not commit) in the vault backup cron; failure monitoring/alerting for every backup cron.
  - Runbooks/exports for Meta, VAPI, Telnyx, DNS, Slack, DocuSeal.
  - Second git remote/mirror for all repos (single GitHub account = single point for all code).
  - Direct Neon login recorded (Vercel-integration linkage unstated).
  - mabrey-docs push completeness verification (fresh-clone diff; >100MB file handling).
  - PII handling policy for DB snapshots committed to git.
  - Definition and enforcement of "bank points"; allowlist-based untracked policy.
  - Break-glass / operator-incapacitation plan.
  - Written accepted-risk register (workspace not in OneDrive; pixel history account-bound; transcripts ephemeral).

  ---

  *Audit complete. Read-only honored — no files created, modified, or deleted; no network actions taken. The strongest part of this operation is its verification culture; the audit's core finding is that this culture has never once been aimed at the disaster layer it claims to cover.*

