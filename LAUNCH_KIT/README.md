# LAUNCH KIT — King Maker Authority Build, Phase A–E (parallel)

Operator guide for running the 5 parallel builders. Phase 0 is merged to `main`
and audited green (WE12). This fans out A–E, then Phase F merges + deploys.

## What's in here
- `00-setup-worktrees.sh` — creates 5 isolated git worktrees off `main` (run once).
- `ws-a-services.md` … `ws-e-trust.md` — the 5 boot prompts (one per builder, paste-ready).

## Run order

### 1. Create the worktrees (once)
```bash
bash "C:/Users/josep/Claude Gravity/LAUNCH_KIT/00-setup-worktrees.sh"
```
This makes 5 sibling folders next to `summit-oak-roofing/`:
`so-ws-a` (ws-a-services) · `so-ws-b` (ws-b-locations) · `so-ws-c` (ws-c-resources) ·
`so-ws-d` (ws-d-funnel) · `so-ws-e` (ws-e-trust). Each is a full, isolated copy on
its own branch — a builder can't touch `main` or another WS.

### 2. Open 5 builder sessions (ultracode: Opus, max effort)
Paste one boot prompt per session. **Stagger ~30–60s between launches** so you can
confirm each booted into the *right* worktree + read its scope before the next.
Each builder runs `npm install` in its worktree first (worktrees don't carry
`node_modules` — one-time, ~1–2 min each).

> First time? You can start with **A + C + E** (cleanest isolation, zero cross-deps),
> watch one report-back cycle, then add B + D.

### 3. Monitor
```bash
node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" tail
```
Each builder pings `--to human` when its gates are green.

## The 2 cross-dependencies (everything else is fully parallel)
- **WS-D ↔ CSS agent (BLOCKING):** WS-D's new lead-form fields must be merged into
  the CSS-owned `lib/leadSchema.ts` **before** WS-D POSTs them, or strict-Zod 400s
  and drops the lead. WS-D coordinates with `cyber-security-specialist-1` first.
- **WS-B ↔ WS-E (seam):** WS-E owns the `CaseStudy`/job-pin entity; WS-B adds the
  single `CityPage.tsx` render slot that emits it. They sync at that one boundary.

## The rules (enforced in every prompt)
- Each builder touches **only its §2 files**; shared files (`sitemap-registry.ts`,
  `types/index.ts`, `related.ts`) are **append-only** to its own section.
- Build the **launch-wave subset + the system + exemplars**, NOT the 130–215 ceiling.
- **No builder deploys.** Commit to your branch. Phase F deploys once, after QA.
- Gates green before reporting: `tsc` · `build` · `playwright desktop+mobile` ·
  `doorway-check` (location/programmatic pages) · `security-audit` (WS-D, stays 10/10).

## After A–E report
WE12 (`website-engineer`) QAs each WS live (pixels + deployed content). Then **Phase F**:
merge the 5 branches → wire global schema `@graph` + link-mesh + sitemap index →
full-site verify → deploy.

## Teardown (after Phase F merges)
```bash
cd "C:/Users/josep/Claude Gravity/summit-oak-roofing"
git worktree remove ../so-ws-a && git worktree remove ../so-ws-b && \
git worktree remove ../so-ws-c && git worktree remove ../so-ws-d && \
git worktree remove ../so-ws-e
```
