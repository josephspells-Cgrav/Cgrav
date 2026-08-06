# DISPOSITION LEDGER — recovery-protocol audit (15 findings, dispositioned 2026-08-06 05:27)

OUT gate: ## VERDICT ✅ · ## FINDINGS ✅ · count: 15 (F1-F15) + MISSING list (17 items, each mirrors an F or lands in the punch list below).
Verdict as found: **NO — inventory wearing the costume of a protocol.** Accepted as written.

| F | Sev (as found) | Disposition | Reason / action |
|---|---|---|---|
| F1 ~/.claude one-disk, unrecoverable in principle | LAUNCH-KILLER | ACCEPT — **DONE 05:25** | Private repo `claude-operating-layer` @ b8cca33, verified pushed + private. Default-deny allowlist (skills/hooks/CLAUDE.md/gates). settings.json EXCLUDED: pre-push sweep found a LIVE Slack bot token at line 127 — the exact file F1 predicted. Ships later as a redacted template. taste-skill = gitlink (has its own origin). Nightly push cron = queued. |
| F2 credential re-entry dead-ends (2FA phone, no recovery codes, no password manager) | LAUNCH-KILLER | ACCEPT — JOSEPH'S HANDS | Recovery codes (GitHub/Vercel/email), cloud password manager, second TOTP device — credentials are operator-only by house law; agents must not touch them. Top of the human punch list (~2h, ~$0). Kimi's factual correction absorbed: Vercel [SENSITIVE] vars are WRITE-ONLY — dashboard cannot reveal them; re-issue is the only path. |
| F3 DB: unbounded steady-state RPO, PITR unverified, zero restores | LAUNCH-KILLER | ACCEPT — QUEUED BUILD (mine, today) | GitHub Actions nightly dump → separate private repo (machine out of the backup path), 7/4/3 retention, schema+sequences, weekly restore-to-branch verify. Neon tier check = 10-min Joseph console look, today. |
| F4 template OneDrive-only | HIGH | ACCEPT — quick win queued | Push `contractor-template` branch to a GitHub remote (probe remote, push; minutes). |
| F5 monorepo untracked-set unbounded | HIGH | ACCEPT-MODIFIED | Full gitignore-inversion is a refactor (the repo deliberately hosts working dirs); MODIFICATION: bank points DEFINED (mandatory at session end + before any destructive op — matches km-handoff/km-ingest practice) + a dirty-check habit; inversion queued behind Drill A learnings. |
| F6 VAPI live-config drift | HIGH | ACCEPT — QUEUED BUILD (mine) | Weekly API pull + diff vs tracked v3.7 file; alert on drift. Direction of truth: the tracked file. |
| F7 vault cron commit-not-push | MED | ACCEPT-MODIFIED | Probed: vault local == origin NOW (pushing happens). But the cron itself wasn't located in hooks/ — mechanism unverified. MODIFICATION: tripwire named (weekly remote-vs-local HEAD check) instead of asserting the cron's behavior either way. |
| F8 codes.txt stale one-disk index | MED | ACCEPT — Joseph-gated | Superseded by the credential inventory once the password manager exists (F2). Interim: location-pointer discipline applied tonight (Slack token entry). |
| F9 PII snapshots in monorepo | MED | ACCEPT | Snapshots move to the F3 backup repo; monorepo gitignores km-recovery going forward. Folded into F3 build. |
| F10 mabrey-docs push unverified | MED | ACCEPT | Fresh-clone + count/size diff folded into Drill A. (No >100MB files existed at push — probed pre-push tonight — so LFS silent-drop risk is low; still verify by clone.) |
| F11 single GitHub account / Neon-Vercel linkage | MED | ACCEPT | Mirror-push script queued; "record direct Neon login" → Joseph's console check with F3's tier look. |
| F12 no provider runbooks | MED | ACCEPT | One-pagers queued, VAPI first (F6 build produces it), Meta export monthly next. |
| F13 no break-glass | MED | ACCEPT — Joseph-gated | Password-manager emergency access or sealed envelope. His call, one hour, once. |
| F14 workspace not in OneDrive (unstated risk) | LOW | ACCEPT | Goes in the accepted-risk register, which gets created as part of the Drill-A runbook doc. |
| F15 §8 confidence transfer | LOW | ACCEPT | Label applied in the vault capture: "proven for session continuity; disaster layer untested until Drill A." |

**THE ONE THING (Drill A — full second-machine rebuild, scored against the verbatim
success criteria): ACCEPT — JOSEPH SCHEDULES.** Needs a spare machine/VM + his 2FA hands.
Quarterly thereafter. Its log becomes the recovery runbook the operation doesn't have.

No rejections. Two launch-killers closed or hand-off'd tonight; one (F3) is today's build queue.
