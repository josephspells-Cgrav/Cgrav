# Hermes — the 9 production traps (read before exposing)

Production-killers banked by the Hermes Specialist agent (2026-05-29), from the guide's "Read first." These bite when Hermes goes from local tool → exposed service.

1. **NO failover wired** (`fallback_providers: []`) — "survives a 429" is FALSE today. Wire failover + a credential pool.
2. **Webhook callers time out** (Vapi ~7.5s budget) — need an **async ack** pattern, not synchronous processing.
3. **API server exposes the full toolset incl. `terminal`** = RCE surface — restrict the toolset + use a docker backend **before** exposing the API server.
4. **Verify the provider's OWN webhook signature** header + an idempotency key (don't trust unsigned callbacks).
5. **`execute_code` / `computer_use` unavailable on Windows** — render artifacts via terminal/docker Python instead.
6. **Deliverable mode is automatic** (write an absolute path + mention it), not a flag; `.py` files are excluded.
7. **`hermes profile export/import` is the multi-tenant clone primitive** — one profile per client.
8. **`hermes insights` for billing rollups** — don't hand-roll SQL against `state.db`.
9. **Honcho (unset) for per-caller memory** — a single `USER.md` can't hold N callers.

---
Filed under [[hub-ai-tooling]]. Parent: [[hermes-specialist-arc-2026-05-29]] · Wiring: [[hermes-architecture-locks]] · Gotchas: [[hermes-hardening-gotchas]]
Back to [[index]]
