# FLEET_AUDIT_20260818 — King Maker git/GitHub fleet audit

Run by AUDIT-F (read-only). No writes performed except this file. No deletes, pushes, branch changes, history rewrites, commits, or `gh` mutations were made.

Scope: 12 local repos found under `C:/Users/josep/Claude Gravity` (root + children) and `C:/Users/josep/OneDrive/Documents/Claude/Projects` (children), cross-checked against 17 GitHub repos under `josephspells-Cgrav`. `gh` auth confirmed working (`josephspells-Cgrav`, scopes `delete_repo, gist, read:org, repo`).

---

## EXEC SUMMARY — top 10 findings, ranked

1. 🔴 **CREDENTIAL EXPOSURE, still live in history** — `mabrey-crm-app`. A real Neon Postgres connection string (`postgresql://alex_reader:ax_rj1KZ...@ep-royal-paper-...neon.tech/neondb`) was committed in `.readerurl.tmp` (commit `0afac1e`, 2026-08-07) and only `git rm --cached`'d same-day (`4f0b95d`) — the credential is **still fully retrievable** via `git show 0afac1e:.readerurl.tmp` right now. Rotate the `alex_reader` role password in Neon, then purge the blob from history (BFG/filter-repo). This is very likely the incident class the audit brief referenced.
2. 🔴 **The documented "template" worktree is a dead stub** — `American Master Works Redaux`. Global CLAUDE.md names `.claude/worktrees/cranky-colden-ebfbb4/web/TEMPLATE.md` as the authoritative source for every future client build. On disk that directory exists but is empty (no `TEMPLATE.md`, empty `web/`), and its git worktree registration is broken (`gitdir` file missing — `git worktree prune -n` would remove all 3 registered worktree stubs in this repo). The real `contractor-template` branch is healthy in the ref database but isn't checked out anywhere, and carries 1 unpushed local commit.
3. 🟠 **Repo bloat: `king_maker_outbound` — 1.5GB `.git`.** Driven by dozens of 30–44MB PNG ad-plate images (`.mabrey-ad-plates-2026-07-17/`, `km-ugc-ads/round3-neon/`) committed directly at HEAD. Candidate for LFS or external asset storage.
4. 🟠 **Repo bloat + gitignore gap: `mabrey-docs` — 327MB `.git`.** All top-10 tracked blobs exceed 10MB (a 12.4MB PDF, a 10.7MB MP4, eight 10.2–10.8MB JPGs). Its `.gitignore` has zero `.env` coverage (only `.vercel/` and `*.log`).
5. 🟠 **Stale mainline checkout: `mabrey-crm-app`.** The checked-out `takeoff-stack` branch in the primary worktree is **6 commits behind** `origin/takeoff-stack`, missing the `checkin-campaign` → `takeoff-stack` merge of `review-campaign` at `0023e90` (2026-08-17) that the audit brief names as current mainline. Working directory does not reflect the real head of work.
6. 🟡 **Uncommitted live-code edits at risk** — `mabrey-crm-app` has 5 modified files (`ads/page.tsx`, `funnel-dropoff.tsx`, `funnel-analytics.ts` + 2 test files) sitting uncommitted in the primary worktree.
7. 🟡 **Worktree sprawl** — `mabrey-crm-app` has **~40 registered git worktrees** spread across three locations (`Claude Gravity/` root, `C:/Users/josep/os32-wt/*`, `C:/Users/josep/os33-wt/*`). All but `wo/os32-w5-reads-a` and `wo/city-proof` (in `mabrey-roofing`) sit on branches already fully merged — safe cleanup candidates.
8. 🟡 **Phantom gitlink deletions** — `Claude Gravity` (Cgrav root) tracks two mode-160000 gitlink entries, `.claude/worktrees/gifted-cartwright` and `.claude/worktrees/vibrant-robinson` (added by commit `340ec97`, 2026-04-12), pointing at a commit whose directories no longer exist on disk. They show permanently as `D` (deleted, unstaged) in `git status`. Cosmetic but should be `git rm --cached`.
9. 🟡 **Recurring `.gitignore` gap, template-class** — `mabrey-construction` and `summit-oak-roofing` (same contractor-site template lineage) both ignore only `.env*.local`, not bare `.env`/`.env.production`. `mabrey-docs` and `vault` have **no** `.env` pattern in `.gitignore` at all. No `.env` file is currently tracked anywhere in the fleet, but the guard rail is thin in 4 of 12 repos.
10. 🟢 **8 unmerged branches aged >7 days** across 3 repos (table below) — most notably the one branch the brief asked to check by name, `wo/os32-w5-reads-a` in `mabrey-crm-app` (25 days old, unmerged into `origin/takeoff-stack`), plus two intentionally-frozen "capture" branches in `mabrey-roofing` (`codex/mabrey-homepage-premium-concept`, `forge/blueprint-motion-we23`) that read as reference artifacts, not abandoned work.

Also informational: **5 GitHub repos have no local clone anywhere found** — `claude-operating-layer`, `kingmaker-v2`, `kingmaker-site`, `eufy-sales-deck-site`, `baker-roofing`.

---

## 🔴 CREDENTIALS

### Working-tree hits (tracked files at current HEAD)

| Repo | Location | Kind | Value (≤12 chars) | Verdict |
|---|---|---|---|---|
| `vault` | `raw_sources/SESSION-HANDOFF-OS20-2026-07-13.md:93` | VAPI API bearer token, embedded in a `curl` example | `d4494ddf-f2d…` | **REAL, live-looking.** VAPI assistant bearer token pasted into a handoff doc. Repo is private but this is still an exposed credential in a doc that gets copied/quoted. **Recommend: rotate the VAPI key in the Vapi dashboard, scrub the line from the file (history still holds it too — see below), and never paste raw tokens into handoff `.md` files going forward.** |
| `king_maker_outbound` | `.ads-gallery-2026-07-17/ads-gallery-inline.html`, `.mabrey-ad-plates-2026-07-17/plates-gallery.html` | matched `KEY[A-Za-z0-9_]{30,}` | n/a | **False positive.** Both files are self-contained HTML galleries with inline base64 image data; "KEY" is a coincidental substring inside continuous base64. No action needed. |
| `king_maker_outbound` | `.ghl-audit/html_cache/altecconstruction.com.html` | matched `KEY…`, `AKIA…`, and `data-api-key="…"` | n/a | **False positive — not ours.** This is a *cached copy of a competitor/prospect's own website* (an audit-tool scrape). The "keys" are those third-party sites' own public client-side widget keys (a JWT for a "demand-iq-journey" widget, a WP lazy-load plugin token) and base64 artifacts. Not a King Maker credential. |
| `mabrey-crm-app` | `src/lib/guards.test.ts` (lines 58–82) | matched `postgres(ql)?://…` | `postgres://u…` | **False positive — test fixture.** Literal `postgres://u:p@…` placeholder strings used to unit-test `isKnownNonProdHost()`. Not a real credential. |
| `vault` | `component-library/gallery.html`, `raw_sources/recovered-sessions/OS41-17609642-2026-08-03.jsonl` | matched `KEY[A-Za-z0-9_]{30,}` | n/a | **False positive.** Same base64-inline pattern as above — an HTML gallery and a recovered raw session transcript (base64 blob pasted into a tool result). No AKIA or api_key hits in vault. |

All other repos (Cgrav root, `blackboard`, `kingmaker`, `kingmaker-v3`, `mabrey-construction`, `mabrey-docs`, `mabrey-roofing`, `summit-oak-roofing`, `American Master Works Redaux`) returned **zero** matches across all 8 working-tree patterns.

### History hits (`git log --all -p -G…`, capped at 500 most-recent commits only for `vault`, which has 999 total; all others scanned in full)

| Repo | Commit | Date | File | Kind | Value (≤12 chars) | Still at HEAD? | Verdict |
|---|---|---|---|---|---|---|---|
| `mabrey-crm-app` | `0afac1e` | 2026-08-07 | `.readerurl.tmp` | live `postgresql://` connection string | `postgresql:/…` | **No** (removed in `4f0b95d` same day) | 🔴 **Real, and still recoverable.** `git rm --cached` does not purge history — `git show 0afac1e:.readerurl.tmp` returns the full credential today. **Recommend: rotate the Neon `alex_reader` password now, then purge the blob from history with BFG or `git filter-repo`.** `.gitignore` now covers `*.readerurl*` going forward (good), but the exposure predates that. |
| `mabrey-crm-app` | `fcf8e9f` | 2026-07-24 | `src/lib/guards.test.ts` | matched `postgres://` | n/a | Yes (same false-positive test fixture as above) | False positive |
| `king_maker_outbound` | `68490bb`, `dd0643f` | 2026-07-17, 2026-06-26 | same 3 HTML files as working-tree | matched `KEY…` | n/a | Yes | False positive (introduction commits for the base64/third-party-cache files already covered above) |
| `vault` | `16a3547` | 2026-08-03 | `raw_sources/recovered-sessions/OS41-17609642-2026-08-03.jsonl` | matched `KEY…` | n/a | Yes | False positive (introduction commit for the base64 blob already covered above) |

No `postgres://…` or `KEY…` history hits in Cgrav root, `blackboard`, `kingmaker`, `kingmaker-v3`, `mabrey-construction`, `mabrey-docs`, `mabrey-roofing`, `summit-oak-roofing`, or `American Master Works Redaux`.

**Net: one real, actionable credential exposure in the fleet** (`mabrey-crm-app` / Neon `alex_reader`), plus one real working-tree secret paste (`vault` / VAPI bearer token). Everything else that matched the regex library was either a test fixture, base64 image data, or a third party's own cached page.

---

## PER-REPO SECTIONS

### 1. `Claude Gravity` (Cgrav root / cgrav monorepo)
- **Identity**: `C:/Users/josep/Claude Gravity` → `github.com/josephspells-Cgrav/Cgrav.git`, default `master`, HEAD `4e2eb20` (2026-08-18), in sync with origin, 78 total commits.
- **B — branch archaeology**: ~50 local/remote branches, almost entirely `claude/*` session branches and `worktree-agent-*` branches, most already ancestors of `master` (git confirms only 2 are genuinely unmerged):
  - `worktree-agent-adca366a54c06965d` @ `867adb6` (2026-08-07, "WO-T1 takeoff schema + assembly library + apply path — build report + staged deliverable") — **11 days old, unmerged.**
  - `remotes/origin/claude/roofing-contractor-research-fMLkv` @ `fc39d7f` (2026-04-18, "Expand Charlotte roofing campaign to 20 prospects with published emails") — **~4 months old, unmerged, remote-only.**
- **C — dirty state**: `M .claude/launch.json`, `M .claude/settings.local.json`, plus the 2 gitlink phantom-deletes (see below). **Hundreds of untracked files** — mostly `.png` audit screenshots, `.cjs`/`.mjs`/`.py` capture/audit scripts, and a large body of valuable `.md` work-order/handoff docs (`AGENT-WEBSITE-ENGINEER-*.md`, `SUMMIT_OAK_WORKORDER_*.md`, `KM_SITE_WORKORDER_*.md`, `HANDOFF_*.md`, etc.) that have never been committed. Also several nested untracked directories that are worktrees of *other* repos (`.wt-checkin/`, `.wt-merge/`, `.wt-review/` → `mabrey-crm-app`; `mabrey-fix-wt-*`, `mabrey-meta-wt-*` → `mabrey-crm-app`; `so-ws-*` → `summit-oak-roofing`) — expected/benign, git treats nested `.git` dirs as opaque. **`video-rig/` untracked-file question from the brief: only 4 loose files remain untracked** (`composite_proof.py`, `flicker_check.py`, `matte_test.py`, `public/broll-v2/`) — the bulk of video-rig (including `MoGraph01.tsx`-class work) is now committed (confirmed by the current HEAD commit itself: "video-rig: commit the motion-graphics + self-audit-pipeline lane (was one-disk)"). **So the previously-known video-rig-untracked issue is now mostly resolved**, with a small residual.
- **D — credentials**: clean (see CREDENTIALS section).
- **E — hygiene**: `.gitignore` covers `.env`/`.env.local`/`.env.*.local` — good. No tracked `.env*` files. No blob at HEAD exceeds 10MB (largest are `video-rig/wo/hook-frames/*.png` at ~3–4MB each). **`.git` is 2.3GB** — the largest in the fleet — which does not match modest HEAD blob sizes; likely explained by large binaries (video-rig frame captures, screenshots) accumulated across the ~50 branches over time (inference, not confirmed by a dedicated history-object audit).
- **F — worktrees**: 12 registered under `.claude/worktrees/agent-*` and named-agent dirs, dated April–August 2026, several `(detached HEAD)`. Two additional gitlink artifacts (`gifted-cartwright`, `vibrant-robinson`) are **not** live worktrees — they're leftover mode-160000 index entries from commit `340ec97` (2026-04-12, "initial commit — King Maker demo") pointing at commit `06dcd28`; the actual worktree directories are long gone, so they show as permanent `D` (deleted) noise in `git status`. Recommend `git rm --cached` on both paths (not performed).

### 2. `blackboard`
- **Identity**: `github.com/josephspells-Cgrav/cgrav-blackboard.git`, default `master` (GH-confirmed; local `origin/HEAD` symref not set), HEAD `5269145` (2026-08-04), in sync with origin, 46 commits.
- **B**: single branch (`master`/`origin/master`), no archaeology needed.
- **C**: `M .seen.json`, `M log.ndjson` + ~30 untracked `agents/*/…json` and `processed/*.json` files — these read as runtime queue/state artifacts (a message-processing "blackboard" system), not source, so low concern.
- **D**: clean.
- **E**: `.gitignore` covers `**/.env`, `.env`, `*.env` — good. No tracked `.env*`. No blob >10MB (largest 70KB `log.ndjson`).
- **F**: 1 worktree (main only).

### 3. `kingmaker` (local dir name) → GitHub `km-traffic-deck`
- **Identity**: `github.com/josephspells-Cgrav/km-traffic-deck.git`, default `master`, HEAD `a1156b9` (2026-06-16, "Backup: kingmaker"), in sync with origin, **1 total commit** — a single squashed backup snapshot, not real dev history.
- **B**: n/a (1 commit, 1 branch).
- **C**: clean.
- **D**: clean.
- **E**: `.gitignore` covers env patterns. Largest tracked blob: 6.5MB gazetteer text file (`data/gaz/2023_Gaz_place_national.txt`) — under the 10MB flag.
- **F**: 1 worktree.

### 4. `kingmaker-v3`
- **Identity**: `github.com/josephspells-Cgrav/kingmaker-v3.git`, default `main`, HEAD `c5a708d` (2026-06-06), in sync with origin, 9 commits.
- **B**: n/a (single branch).
- **C**: 4 modified files uncommitted: `app/layout.tsx`, `app/page.tsx`, `app/terms/page.tsx`, `app/ui/Footer.tsx`.
- **D**: clean.
- **E**: `.gitignore` covers `.env*`. No tracked `.env*`, no blob >10MB (largest is 58KB `package-lock.json`).
- **F**: 1 worktree.

### 5. `king_maker_outbound` → GitHub `km-outbound`
- **Identity**: `github.com/josephspells-Cgrav/km-outbound.git`, default `master`, HEAD `5cd0111` (2026-08-04), in sync with origin, 127 commits.
- **B**: single branch, no archaeology needed.
- **C**: clean working tree.
- **D**: see CREDENTIALS — all false positives (base64 galleries + third-party cached pages).
- **E**: `.gitignore` covers `.env`/`*.env`/`config/.env` — good, no tracked `.env*`. **All top-10 tracked blobs are 30–44MB PNGs** (`.mabrey-ad-plates-2026-07-17/*.png`, `km-ugc-ads/round3-neon/*.png`) — the single largest hygiene violation by margin in the fleet. **`.git` = 1.5GB.**
- **F**: 1 worktree.

### 6. `mabrey-construction`
- **Identity**: `github.com/josephspells-Cgrav/mabrey-construction.git`, default `master`, HEAD `80d01ce` (2026-07-12), in sync with origin, 15 commits.
- **B**: single branch, no archaeology needed.
- **C**: clean working tree.
- **D**: clean.
- **E**: `.env.example` tracked (fine). `.gitignore` covers **only `.env*.local`** — a plain `.env` or `.env.production` would **not** be caught. No blob >10MB (largest 519KB webp).
- **F**: 1 worktree.

### 7. `mabrey-crm-app` → GitHub `mabrey-crm`
- **Identity**: `github.com/josephspells-Cgrav/mabrey-crm.git`, default `origin/main` (locally recorded), **currently checked out on `takeoff-stack`**, HEAD `bb1c190` (2026-08-14). **`## takeoff-stack...origin/takeoff-stack [behind 6]`** — the checkout is stale. 459 total commits — the most active repo in the fleet.
- **B — branch archaeology** (per the brief's specific ask: reference branch is `takeoff-stack`, current mainline, recently merged from `review-campaign` at `0023e90`):
  - Confirmed: `checkin-campaign`, `takeoff-stack-merge`, `origin/takeoff-stack`, `origin/takeoff-stack-merge` all sit at `0023e90` (2026-08-17 20:37, "Merge review-campaign into takeoff-stack: one deployable branch") — matches the brief exactly.
  - `review-campaign` / `origin/review-campaign` @ `729d15a` (2026-08-17 17:10) — the just-merged source branch, correctly absorbed.
  - **Only one other branch carries unmerged commits relative to `origin/takeoff-stack`: `wo/os32-w5-reads-a`** @ `04e0552` (2026-07-24, "OS32 W5 follow-up: fix reads-scope-pages-a.test.ts JSX runtime + walk depth") — **25 days old, unmerged.** Every other `wo/os32-*`, `wo/meta-*`, `wo/fix*`, `wo/showroom-*` branch (dozens) is already fully merged into `origin/takeoff-stack`.
- **C — dirty state**: 5 modified files uncommitted — `src/app/(app)/ads/page.tsx`, `src/components/ads/funnel-dropoff.tsx`, `src/lib/funnel-analytics-fetch.test.ts`, `src/lib/funnel-analytics.test.ts`, `src/lib/funnel-analytics.ts`.
- **D**: see CREDENTIALS — **the one real fleet-wide credential exposure** (`.readerurl.tmp`, Neon `alex_reader`). Also a false-positive test fixture in `guards.test.ts`.
- **E**: `.env.example` tracked (fine, explicitly kept via gitignore negation). `.gitignore` covers `.env*` broadly with `!.env.example`, plus `.envprod.tmp`, `.env.sim` — the **best** `.env` coverage in the fleet. No blob >10MB (largest 874KB fixture JSON). `.git` = 29MB, reasonable for the commit volume.
- **F — worktrees**: **~40 registered**, across three filesystem locations:
  - Under `Claude Gravity/`: main + `.wt-checkin` (`checkin-campaign`) + `.wt-merge` (`takeoff-stack-merge`) + `.wt-review` (`review-campaign`) + `.claude/worktrees/agent-a2da62f7bf18e9910` + `agent-a6e00fd6654f7ba68` + `unruffled-lovelace-f2a2b4` + 6× `mabrey-fix-wt-fix1..6` + 5× `mabrey-meta-wt-m1..5`.
  - Under `C:/Users/josep/os32-wt/`: 13 worktrees (`audit-ro`, `sr-a-contract`, `sr-b-overlay`, `sr-c-choreo`, `w1-delete` … `w13-seams`).
  - Under `C:/Users/josep/os33-wt/`: 5 worktrees (`ro-booking`, `ro-intake`, `wo-a-stages`, `wo-b-scroll`, `wo-c-customers`).
  - All of these except `wo/os32-w5-reads-a`'s worktree sit on branches already confirmed merged into `origin/takeoff-stack` — **safe cleanup candidates** (not acted on).

### 8. `mabrey-docs`
- **Identity**: `github.com/josephspells-Cgrav/mabrey-docs.git`, default `master`, HEAD `627c8e3` (2026-08-14), in sync with origin, 3 commits (shallow/append-only doc repo).
- **B**: single branch, no archaeology needed.
- **C**: untracked `ads/.index-slate.html`, `ads/build-reels.mjs`, `ads/build-slate.mjs`, `ads/out-reels/`, `ads/out-slate/`, `ads/previews/`, `ads/sbs-quo-est.cjs`, `ads/side-by-side-v2.cjs`, and a whole untracked `wo/` directory.
- **D**: clean.
- **E**: `.gitignore` exists but covers only `.vercel/` and `*.log` — **zero `.env` coverage.** No tracked `.env*` currently, but no guard rail either. **All top-10 tracked blobs exceed 10MB**: 12.4MB PDF (`plans/SS Lake - Final MAASS BARNDO…pdf`), 10.7MB MP4 (`sean-video/sean-jobsite-2026-07-31.mp4`), and 8 JPGs in `ads/plates/` at 10.2–10.8MB each. **`.git` = 327MB.**
- **F**: 1 worktree.

### 9. `mabrey-roofing`
- **Identity**: `github.com/josephspells-Cgrav/mabrey-roofing.git`, default `master`, HEAD `75be427` (2026-08-12), in sync with origin, 107 commits. This is the live client site.
- **B — branch archaeology**, unmerged relative to `master`:
  - `codex/mabrey-homepage-premium-concept` (local + remote) @ `d955a72` (2026-07-11, "GPT 5.6 Mabrey: blueprint-editorial homepage concept (**frozen as-running for capture**, 2026-07-11)") — 38 days old. Commit message itself signals this is an intentional reference capture, not abandoned work.
  - `forge/blueprint-motion-we23` (local + remote) @ `ba8f88e` (2026-07-11, "Forge r2 (WE23): roof-replacement exemplar — the blueprint register transplanted…zero-drift") — 38 days old. Reads as a forge/transplant-source branch (per the component-library "transplant law"), likely intentionally kept unmerged as a pattern source.
  - `wo/city-proof` (local only) @ `6d7b66a` (2026-07-26, "Simplify CityProofBand: fold dollar total into flowing prose") — 23 days old, no remote counterpart. Looks like genuine unlanded work.
  - 5× `origin/dependabot/npm_and_yarn/*` branches (tailwindcss, next, vercel/functions, playwright, framer-motion) — routine automated dependency-bump PRs, ~39 days old.
- **C**: 1 modified file (`lib/business.ts`) + 1 untracked script (`.night-copy-verify.mjs`).
- **D**: clean.
- **E**: `.env.example` tracked (fine). `.gitignore` covers `.env*.local` **and** `.env*` (broad, good). Largest tracked blob: **17.4MB `public/video/sean-intro-temp.mp4`** — over the 10MB flag; looks like an intentional site asset (served from `public/`) rather than an accident, but still permanently bloats the repo. `.git` = 105MB.
- **F — worktrees**: 4 — main, `mabrey-blueprint-forge` (→ `forge/blueprint-motion-we23`), `C:/Users/josep/Codex Worktrees/mabrey-homepage-premium` (→ `codex/mabrey-homepage-premium-concept`), `C:/Users/josep/os33-wt/city-proof` (→ `wo/city-proof`).

### 10. `summit-oak-roofing`
- **Identity**: `github.com/josephspells-Cgrav/summit-oak-roofing.git`, default **`so-visual-pass`** (GitHub's actual default branch — not `main`), currently checked out on `so-visual-pass`, HEAD `3f427a1` (2026-07-05), in sync with origin, 53 commits.
- **B**: `main` and a long clean progression of feature branches (`phase-0-foundation` → `ws-a-services`…`ws-e-trust` → `feat/wo17-onpage-final`…`feat/persistent-hero-trustbar` → `wo20-aesthetic-pass` → `wo21-content-depth` → `wo22-remove-combos` → `so-visual-pass`) exist, but **`git branch --no-merged so-visual-pass` returns empty — everything is fully merged.** No unmerged-work flags for this repo.
- **C**: 2 untracked files (`.triage-report.json`, `.wo23-verify/`) — ephemeral audit artifacts, low concern.
- **D**: clean.
- **E**: `.env.example` tracked. `.gitignore` covers **only `.env*.local`** — same gap class as `mabrey-construction` (recurring, template-wide). No blob >10MB (largest 2.5MB `public/hero.mp4`). **`.git` = 772MB** despite modest HEAD blob sizes — almost certainly historical (now-superseded) large assets baked into the object history across the WS-*/WO-* branch progression; not confirmed by a dedicated history-object audit (out of scope for this pass).
- **F — worktrees**: 6 — main + `so-ws-a`…`so-ws-e` (all on branches confirmed fully merged — **safe cleanup candidates**).

### 11. `vault` → GitHub `cgrav-vault`
- **Identity**: `github.com/josephspells-Cgrav/cgrav-vault.git`, default `main`, HEAD `0e45ca5` (2026-08-18), in sync with origin, **998–999 total commits** (largest history in the fleet; credential history scan capped to the most recent 500 commits per the brief's guidance).
- **B**: `git branch --no-merged main` returns empty — no unmerged branches. Two `worktree-agent-*` branches from 2026-07-15 exist but are already merged.
- **C**: clean working tree.
- **D**: see CREDENTIALS — the real VAPI bearer-token exposure, plus one base64 false positive.
- **E**: `.gitignore` is thorough for Obsidian/OS cruft (`.obsidian/workspace*.json`, `.trash/`, `.DS_Store`, etc.) but has **no `.env` pattern at all**. No tracked `.env*` currently. Two blobs exceed 10MB: `raw_sources/recovered-sessions/OS41-17609642-2026-08-03.jsonl` (13.0MB) and `component-library/_shots/_wo26-review/cary-full.png` (10.3MB). `.git` = 305MB.
- **F — worktrees**: 3 registered — main plus two under `.claude/worktrees/`, **both already flagged `prunable` by git itself** (`agent-a2db76386d8c14b06`, `agent-a715258be95ed5abd`, both 2026-07-15 auto-backups).

### 12. `American Master Works Redaux` (OneDrive path) → GitHub `american-masterworks`
- **Identity**: `github.com/josephspells-Cgrav/american-masterworks.git`, default `origin/main`. **Currently checked out on `claude/cranky-colden-ebfbb4`**, HEAD `1a64047` (2026-05-17), **`[behind origin/main by 2]`**. 277 total commits.
- **B — branch archaeology**:
  - `contractor-template` (local) is **1 commit ahead, 0 behind** `origin/contractor-template` — 1 unpushed local commit (`4317182`, "WE10: lift roofing HomeHero, fix CTA clipping at laptop fold", 2026-06-16).
  - The checked-out branch `claude/cranky-colden-ebfbb4` is **185 commits behind `contractor-template`** — i.e., nothing checked out anywhere in this repo reflects the current state of the template branch.
  - `contractor-template` is (correctly, by design — it's the flagship fork) **not merged into `main`**, and `main` carries its own commits `contractor-template` lacks (e.g. "Contact page: fix 3rd phone-tree overpromise…", 2026-05-19). This divergence looks intentional per the global CLAUDE.md doctrine, not abandoned work.
- **C**: `M .claude/launch.json` + 15 untracked files, mostly duplicate-looking `AGENT-WEBSITE-ENGINEER-*.md` handoff docs (same naming pattern as the ones untracked in Cgrav root) plus untracked `handoff/` and `kingmaker/` directories.
- **D**: clean.
- **E**: `.gitignore` covers `.env`/`.env.local`. No tracked `.env*`. No blob >10MB (largest 3.15MB `web/public/hero.mp4`). `.git` = 390MB — again not obviously explained by HEAD content; likely historical, not investigated further.
- **F — worktrees / 🔴 template integrity**: `git worktree list` shows **only the main checkout** — none of the 3 worktree metadata folders under `.git/worktrees/` (`cranky-colden-ebfbb4`, `-we10-hero-deploy`, `dispatch-1-price-range-nowrap`) are live. Each is missing its `gitdir` file; `git worktree prune -n` confirms all 3 would be removed. On disk, `.claude/worktrees/cranky-colden-ebfbb4/` exists but contains only an empty `web/` folder — **no `TEMPLATE.md`**, and running git commands "inside" it actually just falls through to the parent repo's own `.git` (same branch, same everything) because there's no worktree link — this can silently mislead anyone who `cd`s in there expecting isolated template state. **This is the repo the whole client-site pipeline depends on per global CLAUDE.md — re-materializing it (`git worktree add .claude/worktrees/cranky-colden-ebfbb4 contractor-template` after a `git worktree prune`) was not performed (out of scope, read-only).**

---

## UNMERGED-WORK TABLE (branches carrying unmerged commits >7 days old)

| Branch | Repo | Age (as of 2026-08-18) | Guessed content (from commit messages) | Recommend |
|---|---|---|---|---|
| `worktree-agent-adca366a54c06965d` | Cgrav root | 11 days (2026-08-07) | WO-T1 takeoff schema + assembly library + apply path, staged deliverable | review → merge or archive |
| `origin/claude/roofing-contractor-research-fMLkv` | Cgrav root | ~4 months (2026-04-18) | Charlotte roofing campaign prospect research, 20 prospects w/ published emails | archive |
| `wo/os32-w5-reads-a` | mabrey-crm-app | 25 days (2026-07-24) | OS32 W5 follow-up — fix `reads-scope-pages-a.test.ts` JSX runtime + walk depth | merge (small, targeted fix) — **this is the specific branch the audit brief asked to flag** |
| `codex/mabrey-homepage-premium-concept` | mabrey-roofing | 38 days (2026-07-11) | GPT 5.6 Mabrey blueprint-editorial homepage concept, explicitly "frozen as-running for capture" | archive (intentional reference capture, not meant to merge) |
| `forge/blueprint-motion-we23` | mabrey-roofing | 38 days (2026-07-11) | WE23 roof-replacement blueprint-register exemplar, "zero-drift" transplant source | archive (intentional forge/reference source) |
| `wo/city-proof` | mabrey-roofing | 23 days (2026-07-26) | CityProofBand copy simplification (fold dollar total into flowing prose) | merge or explicitly drop |
| `origin/dependabot/npm_and_yarn/*` (×5) | mabrey-roofing | ~39 days (2026-07-10) | routine automated dependency bumps (tailwindcss, next, vercel/functions, playwright, framer-motion) | merge if still current, else close |
| `contractor-template` | American Master Works Redaux | actively diverged from `main` by design; 1 unpushed local commit | THE flagship template branch (per global CLAUDE.md) | not a merge candidate — push the 1 local-only commit; re-materialize its worktree |

(`summit-oak-roofing` and `vault` returned zero unmerged branches — everything there is already integrated.)

---

## GITHUB REPOS WITH NO LOCAL CLONE FOUND

| Repo | Visibility | Default branch | Last updated |
|---|---|---|---|
| `claude-operating-layer` | PRIVATE | master | 2026-08-06 |
| `kingmaker-v2` | PRIVATE | master | 2026-05-10 |
| `kingmaker-site` | PRIVATE | main | 2026-04-30 |
| `eufy-sales-deck-site` | PUBLIC | main | 2026-05-11 |
| `baker-roofing` | PUBLIC | main | 2026-04-26 |

All 12 local repos were matched 1:1 to a GitHub remote (name mismatches noted: local `kingmaker` ↔ GH `km-traffic-deck`; local `mabrey-crm-app` ↔ GH `mabrey-crm`).

---

## SAFE IMMEDIATE ACTIONS — NOT TAKEN (recommendations only)

1. Rotate the Neon `alex_reader` Postgres password (mabrey-crm-app) and purge `.readerurl.tmp` from git history with BFG or `git filter-repo`.
2. Rotate the VAPI bearer token pasted in `vault/raw_sources/SESSION-HANDOFF-OS20-2026-07-13.md:93`; scrub the line (it's in history too, same-file since original commit — not separately traced here).
3. `git rm --cached .claude/worktrees/gifted-cartwright .claude/worktrees/vibrant-robinson` in Cgrav root to clear the two phantom gitlink deletions.
4. In American Master Works Redaux: `git worktree prune`, then `git worktree add .claude/worktrees/cranky-colden-ebfbb4 contractor-template` to re-materialize the documented template location; `git push origin contractor-template` to land the 1 local-only commit.
5. In mabrey-crm-app: fast-forward/pull the main `takeoff-stack` worktree to `origin/takeoff-stack` (currently 6 commits behind); commit or stash the 5 modified funnel-analytics files first.
6. Merge or explicitly close `wo/os32-w5-reads-a` in mabrey-crm-app.
7. `git worktree remove` the ~40 already-merged worktrees in mabrey-crm-app (`mabrey-fix-wt-*`, `mabrey-meta-wt-*`, `os32-wt/*` except `w5-reads-a` if kept open, `os33-wt/*` except `city-proof`), plus `so-ws-a`…`so-ws-e` in summit-oak-roofing, plus the 2 `prunable` worktrees in vault.
8. Add `.env`/`.env.production` coverage (not just `.env*.local`) to `mabrey-construction`'s and `summit-oak-roofing`'s `.gitignore`; add any `.env` pattern at all to `mabrey-docs`'s and `vault`'s `.gitignore`.
9. Move `king_maker_outbound`'s 30–44MB PNG ad plates and `mabrey-docs`'s PDF/MP4/JPG assets (all >10MB) out of git into blob/object storage, or adopt Git LFS, to shrink `.git` from 1.5GB and 327MB respectively.
10. Commit or discard the small uncommitted diffs currently at risk: `kingmaker-v3` (4 files), `mabrey-roofing` (`lib/business.ts`), `mabrey-crm-app` (5 funnel-analytics files), Cgrav root (`.claude/launch.json`, `.claude/settings.local.json`).
11. Decide the fate of the large body of untracked-but-valuable `.md`/`.cjs`/`.mjs` work-order and audit scripts sitting at the Cgrav root and in `mabrey-docs/ads/` — either commit them or relocate to an explicitly-gitignored scratch path.
12. Merge or close the 5 routine `dependabot/*` branches on `mabrey-roofing`.
13. Decide merge-or-archive for the 2 unmerged Cgrav-root branches and the 2 "frozen capture" branches in `mabrey-roofing` (recommend archive-with-tag rather than delete, since they read as intentional reference captures).
