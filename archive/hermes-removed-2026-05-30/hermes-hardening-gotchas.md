# Hermes — battle-tested hardening gotchas

Install/operate gotchas banked by the Hermes Specialist agent (2026-05-29). Operational siblings to [[hermes-gateway-operations]].

- **`browser_vision` crashes on >5MB / >8000px screenshots** → needs **Pillow** (now installed) for auto-shrink; tall pages should use DOM probes instead.
- **Notepad mangles `SKILL.md`** (escapes markdown, converts UTF-8→CP1252 em-dashes, breaks `---` frontmatter). Write skills from a real editor — this is the same `â€"` corruption class as the vault's G1 gotcha.
- **`hermes config set` on nested keys** (`skills.external_dirs`, `toolsets`) saves a literal STRING, not a YAML list — edit `config.yaml` directly for nested values.
- **`hermes skills list`** (not `inspect`) to see local skills.
- **Gateway verbs are positional** — `hermes gateway stop`, not `--stop` (full set in [[hermes-gateway-operations]]).
- **MCP add needs `--scope user`** or the tools only load in one project.

---
Filed under [[hub-ai-tooling]]. Parent: [[hermes-specialist-arc-2026-05-29]] · Wiring: [[hermes-architecture-locks]] · Traps: [[hermes-production-traps]]
Back to [[index]]
