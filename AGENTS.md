# AGENTS.md — this workspace

Agent CLIs following the `AGENTS.md` convention load this file automatically when
started from inside this repository. Verified 2026-08-30: Kimi Code renders it
into the system prompt, discovered by walking up to the **git root** — so it
reaches any cwd inside this repo, but not nested repos, which find their own.

🔴 **This repository is PUBLIC.** Nothing identifying a client, a person, a
credential, a phone number, or a production configuration flag belongs in this
file. Keep it generic and keep it about the repo.

**The standing floors are NOT here.** Honesty floors, instrument discipline and
the reporting register live machine-globally at `~/.kimi-code/AGENTS.md`, because
a project file is invisible to any seat launched outside a git root — worktrees,
scratch directories, nested repos. Floors must not be cwd-dependent. Both files
load and merge; this one carries only what is specific to this repository.

**If you were launched with an agent profile** (`--agent <name>`), that profile is
your role and wins over this file on scope, posture, tooling and output. No
profile overrides a floor.

*History: this file was a boot brief for a Codex executor seat that no longer
exists — that CLI is not installed on this machine, and the stale persona was
being loaded into unrelated agents for roughly seven weeks. Replaced 2026-08-30.
Prior version preserved outside the tree.*

---

## Repository structure

- `roofing-site/` — Vite (vanilla HTML/CSS/JS) static site
- `vercel.json` at the repo root; Vercel watches the `master` branch

## Deployment

Pushing to `master` triggers a production deploy. Required `vercel.json` for this
layout:

```json
{
  "framework": null,
  "installCommand": "cd roofing-site && npm install",
  "buildCommand": "cd roofing-site && npm run build",
  "outputDirectory": "roofing-site/dist"
}
```

- `framework: null` prevents Vercel auto-detecting Next.js — there is none
- Commands must `cd roofing-site` first; `package.json` is not at the repo root
- `rootDirectory` is not a valid `vercel.json` property — set it in the dashboard

## Pushing from a sandboxed session

Some remote sessions are provisioned read-only for GitHub: `git push` returns
`403` from `session_ingress`, and MCP GitHub write tools return
`403 Resource not accessible by integration`. Ask the operator for a token, then
push directly to the tokenized remote URL. Afterwards run
`git fetch <remote> <branch>` — **a push to a tokenized URL does not update the
local tracking ref**, so "ahead by N" will lie until you fetch.

## Stack

Vite 8, vanilla, no framework. Build output `roofing-site/dist/`. No TypeScript,
no React.
