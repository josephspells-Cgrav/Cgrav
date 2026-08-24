# Hermes Specialist arc — v0.14.0 operational (2026-05-29)

Status capture from the dedicated **Hermes Specialist** agent (the user's "Hermes Specialist #1"). Mode-A ingested from inbox 2026-05-29. Raw: `raw_sources/hermes-specialist-capture-2026-05-29.md`.

## Status change — Hermes is LIVE
- **Hermes Agent v0.14.0 INSTALLED + OPERATIONAL** on the Windows box. No longer evaluating — it's running.
- Built from a **17-agent research workflow** against version-matched on-disk docs + live config + session hardening.

## The 4 reference docs (Claude Gravity root)
- `HERMES_SPECIALIST_GUIDE.md` — **master ref, 1,500 lines**: front-matter + Part I capability reference + Part II 8-vertical playbook + Part III critic.
- `HERMES_INSTALL_GUIDE.md` · `HERMES_INTERFACE_GUIDE.md` · `HERMES_AVAILABLE_NOTIFICATION.md`.

## What Hermes IS (the role lock)
Hermes = **orchestration + verification + dispatch layer, NOT a smarter brain.** Same Claude underneath; it does NOT raise the model-quality ceiling. The value is dispatch, server-side runs, audit trail, scheduled/async messaging — not intelligence. (This is why the global CLAUDE.md deprioritizes Hermes for routine verification — the $0 browser harness does the same job cheaper.)

## Verification gap CLOSED
The `pass-verification` skill (browser + vision + DOM probes, severity-ranked 9-axis table) was validated on real HVAC/preview pages — **4/5 findings independently confirmed** against raw screenshots. Caught a duplicated-city-list content bug, an empty grid slot, broken step numbering. The Hermes-side counterpart to [[verify-before-claim-rule]].

## Children (granular)
- [[hermes-architecture-locks]] — exact install paths, model, gateway, MCP bridge, skills
- [[hermes-production-traps]] — the 9 production-killers (read before exposing Hermes as a service)
- [[hermes-hardening-gotchas]] — battle-tested install/operate gotchas

## 8 future verticals scoped (Part II of the guide)
lead-vendor + appts · Vapi outbound voice · AI receptionist · cold email (Clay + Instantly) · stock/crypto · **n8n layer** (now live — [[km-funnel-automation-build-2026-05-29]]) · SEO contracts · contractor funnel.

## Next (not yet done)
Wire failover + credential pool · async-webhook shared primitive · harden API server · profiles-as-tenancy · `hermes update` (33 commits behind) · fleet skill for the 4 deferred doctrine axes.

---
Filed under [[hub-ai-tooling]]. Siblings: [[hermes-mcp-routing]] · [[hermes-home-windows-env-var]] · [[hermes-gateway-operations]] · roster: [[multi-instance-orchestration-notes]]
Back to [[index]]
