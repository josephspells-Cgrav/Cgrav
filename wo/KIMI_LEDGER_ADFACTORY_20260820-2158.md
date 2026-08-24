# Disposition ledger — kimi baton on ad-factory skill (2026-08-20 ~9:58pm ET)

Audit: KIMI_OUT_ADFACTORY_20260820-2148.md · Verdict AMEND-NEEDED · 6 MAJOR + 8 MINOR · all dispositioned, none rejected. Installed post-amendment at ~/.claude/skills/ad-factory/SKILL.md (196 lines).

| # | Finding | Disposition |
|---|---|---|
| 1 MAJ | Stage-skip clause = universal escape hatch | **FIXED** — skippable stages ENUMERATED (harvest, tighten, music bed); BACKUP GATE, both QA passes, and all floors declared never-skippable under any grant incl. YOLO; skipping one = failed delivery. |
| 2 MAJ | Money-atom merge breaks the caption diff | **FIXED** — diff input named (the caption JSON/SRT fed to Remotion) and money-atom merges applied to BOTH sides before diffing. |
| 3 MAJ | "Blind" QA was self-audit | **FIXED** — Pass A requires a fresh subagent with zero build context; its saved raw output IS the receipt; no file = no pass. |
| 4 MAJ | Release floor had no substrate; NOT-RUNNABLE only in prose | **FIXED** — registry created at video-rig/clients/releases/<client>/ (one signed PDF per person); missing release → render lands in drafts/ with -NOTRUNNABLE-release-missing IN THE FILENAME. |
| 5 MAJ | Money floor leaked via config staleness | **FIXED** — per-JOB MONEY ECHO into chat before every final render + report recites rendered values; three-layer floor (config + echo + recital). |
| 6 MAJ | Missing failure modes (no-take, whisper collapse, QA loop, deep-filter crash) | **FIXED** — money beat w/o clean take = ad INCOMPLETE + reshoot list; whisper collapse path (denoise-first → manual align → UNTRANSCRIBABLE, never guess); QA bound = 2 consecutive fails → stop + report; deep-filter reinstall command inlined + undenoised-money-take = INCOMPLETE. |
| 7 MIN | PREFLIGHT incomplete, relative path | **FIXED** — ffmpeg/ffprobe/OUT_AUDIO/audio-assets added; absolute path; LosslessCut re-labeled manual utility (0a). |
| 8 MIN | Non-mechanical items in mechanical checks | **FIXED** — hook-in-2s moved to the blind pass's question; duration bound to config placement spec; loudness tolerance ±1 LUFS. |
| 9 MIN | "Re-listen" unverifiable | **FIXED** — mechanical proxy: re-transcribe ±1s around every auto-cut touching a money atom; full atom must survive. |
| 10 MIN | Mixed-client ingest + move hazard | **FIXED** — _quarantine/ + ask-once; COPY not move. |
| 11 MIN | CFR command had an elision | **FIXED** — full command inlined, audio args included. |
| 12 MIN | Undefined "tier" | **FIXED** — "main-session judgment; never delegated to a sub-agent". |
| 13 MIN | Proof chips = honest-claims leak | **FIXED** — proof claims live in client config with client as source; chip text not in config = build failure; QA Pass B checks chips == config. |
| 14 MIN | Report omitted rendered money values | **FIXED** — report recites money values + proof claims (floor 1 layer three). |

Chain: draft → kimi-baton → amend (14/14) → install → PREFLIGHT receipt (all tools green, ingest + clients + releases dirs created). Skill activates on next session start or /hooks refresh; content is on disk now.
