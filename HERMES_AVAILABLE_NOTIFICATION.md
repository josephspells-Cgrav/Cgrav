# Heads up — Hermes verification is now operational

Hermes Agent is installed and wired into Claude Code via MCP. The verification gate the user has been asking for is now enforceable. Use it.

## The gate rule (non-negotiable, encoded in Hermes persistent memory)

**Do not claim work shipped, verified, or complete without re-running `pass-verification` against the deployed URL.** Hard gate. Applies to every commit-set that touches `web/`. The rule is loaded into Hermes's persistent `MEMORY.md` and gets injected into every future session — both Hermes's own runs and any agent dispatching to it.

## How to run a verification

From any shell:

```powershell
hermes chat -q "Use the pass-verification skill against url=<DEPLOYED_URL>, context=<niche + page-type>"
```

Replace `<DEPLOYED_URL>` with the Vercel preview URL for the page you just changed. Examples:

- `https://contractor-template-preview.vercel.app/preview/hvac`
- `https://contractor-template-preview.vercel.app/preview/plumbing`
- `https://contractor-template-preview.vercel.app/preview/<niche>`

Wait 2-5 minutes. Output is a severity-ranked markdown findings table.

## What it checks (5 vision-checkable axes of the 9-axis doctrine)

| Axis | What it catches |
|---|---|
| 1 — Image-content match | Generic stock images where trade-specific equipment should appear; mismatch between image and section context |
| 4 — Density discipline | Walls of text in compact-card slots; sparse blocks; duplicated content from template merge-tag bugs |
| 5 — Layout adaptation | Empty grid slots (e.g. 5 cards in a 3-col grid leaves a dead slot); broken alignment from underfilled rows |
| 8 — Motion/polish | Missing numbering on stepped lists; static cards where hover affordance is expected; broken sequence numbering |
| 9 — Empty-space discipline | UX dead zones; accidental whitespace bands reading as unfinished |

4 deferred axes (hero diversity, copy-on-trade, math/copy consistency, section trade-fit) return `NOT_EVALUATED` — they require multi-URL or repo context and are handled by a separate fleet-orchestration skill, TBD.

## Cost + time

~$1.50 / run, 2-5 minutes. Cheap. Run it liberally — after every shipped commit-set, not just at PR boundary.

## Known issue

If the page exceeds 8000 pixels tall, the first `browser_vision` call fails with an Anthropic API 400 (max image dimension). Hermes auto-recovers via viewport-scroll fallback — adds ~$0.50 and ~30 seconds to the run. Patch coming. If you see a page growing past this threshold, that's also a soft signal it's carrying too much content for the template's single-scroll budget.

## Artifacts

- **Findings table:** returned in chat output AND persisted to `state.db` (queryable via FTS5)
- **Screenshots:** `%LOCALAPPDATA%\hermes\cache\screenshots\`
- **Full session transcript:** `%LOCALAPPDATA%\hermes\state.db` table `messages` filterable by latest `session_id`
- **Agent log:** `%LOCALAPPDATA%\hermes\logs\agent.log`

## Optional — if you're in a Claude Code session

The parent agent has Hermes wired in via MCP at user scope. Just say `"verify the latest <niche> pass"` and findings come back inline without the PowerShell context switch.

## TL;DR

1. Make change
2. Push to Vercel preview
3. Run `pass-verification` against the deployed URL
4. Address any FAIL or actionable WARN
5. Re-run to confirm gate closes
6. **Now** claim done

No exceptions. The user has caught multiple "claimed shipped but actually broken" failures — this gate exists specifically to make that class of failure impossible.
