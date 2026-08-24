import json
import re
import os

OUT = r"C:\Users\josep\AppData\Local\Temp\claude\C--Users-josep-Claude-Gravity\3d62ab1d-db03-4b66-bd97-dc285fe0e860\tasks\wkkxfcte7.output"
GUIDE = r"C:\Users\josep\Claude Gravity\HERMES_SPECIALIST_GUIDE.md"

raw = open(OUT, encoding="utf-8", errors="replace").read()

# Parse JSON defensively
data = None
try:
    data = json.loads(raw)
except Exception:
    s = raw.find("{")
    e = raw.rfind("}")
    if s != -1 and e != -1:
        try:
            data = json.loads(raw[s:e + 1])
        except Exception as ex:
            print("JSON parse failed:", ex)

if data is None:
    print("COULD NOT PARSE. First 500 chars:")
    print(raw[:500])
    raise SystemExit(1)

result = data.get("result", data)
briefs = result.get("briefs", [])
plans = result.get("plans", [])
critique = result.get("critique", {})

print("PARSED OK")
print("briefs:", len(briefs))
print("plans:", len(plans))
print("critique gaps:", len(critique.get("gaps", [])), "corrections:", len(critique.get("corrections", [])), "next_steps:", len(critique.get("highest_value_next_steps", [])))
print()
print("BRIEF AREAS:")
for b in briefs:
    print("  -", b.get("area", "?"), "| caps:", len(b.get("key_capabilities", [])), "| md chars:", len(b.get("detailed_markdown", "")))
print("PLAN VERTICALS:")
for p in plans:
    print("  -", p.get("vertical", "?"), "| md chars:", len(p.get("detailed_markdown", "")))


def demote(md):
    # demote markdown headers by 2 levels so they nest under guide sections
    if not md:
        return ""
    out_lines = []
    for line in md.splitlines():
        m = re.match(r"^(#{1,6})(\s)", line)
        if m:
            hashes = m.group(1)
            new = "#" * min(len(hashes) + 3, 6)
            line = new + line[len(hashes):]
        out_lines.append(line)
    return "\n".join(out_lines)


def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()


parts = []
parts.append("<!-- BASE DRAFT assembled from hermes-mastery-research workflow (17 agents). Specialist intro + session-hardening + current-stack added separately. -->\n")

# ============ PART I — CAPABILITY REFERENCE ============
parts.append("\n# Part I — Hermes Capability Reference\n")
parts.append("\nThe complete capability surface of Hermes Agent v0.14.0, dissected from the on-disk version-matched docs. Eight capability areas.\n")

for b in briefs:
    parts.append("\n---\n")
    parts.append("\n## " + b.get("area", "Area") + "\n")
    parts.append("\n> " + esc(b.get("one_line", "")) + "\n")

    caps = b.get("key_capabilities", [])
    if caps:
        parts.append("\n**Capabilities**\n")
        parts.append("\n| Capability | What it does | How invoked | Gotcha |")
        parts.append("\n|---|---|---|---|")
        for c in caps:
            parts.append("\n| " + esc(c.get("name")) + " | " + esc(c.get("what")) + " | `" + esc(c.get("how_invoked")) + "` | " + esc(c.get("gotcha")) + " |")
        parts.append("\n")

    cmds = b.get("commands", [])
    if cmds:
        parts.append("\n**Commands**\n\n```bash\n" + "\n".join(cmds) + "\n```\n")

    cfg = b.get("config_keys", [])
    if cfg:
        parts.append("\n**Config keys:** " + ", ".join("`" + c + "`" for c in cfg) + "\n")

    vh = b.get("vertical_hooks", [])
    if vh:
        parts.append("\n**Business hooks:**\n")
        for h in vh:
            parts.append("\n- " + h)
        parts.append("\n")

    parts.append("\n**Reference**\n\n")
    parts.append(demote(b.get("detailed_markdown", "")))
    parts.append("\n")

# ============ PART II — VERTICAL PLAYBOOK ============
parts.append("\n\n---\n\n# Part II — Business Vertical Playbook\n")
parts.append("\nEight concrete architectures mapping Hermes to a revenue line. Each is buildable from the steps given.\n")

for p in plans:
    parts.append("\n---\n")
    parts.append("\n## " + p.get("vertical", "Vertical") + "\n")
    parts.append("\n> " + esc(p.get("one_line_architecture", "")) + "\n")

    hc = p.get("hermes_components", [])
    if hc:
        parts.append("\n**Hermes components:** " + ", ".join("`" + c + "`" for c in hc) + "\n")

    ei = p.get("external_integrations", [])
    if ei:
        parts.append("\n**External integrations**\n")
        parts.append("\n| Tool | Role |")
        parts.append("\n|---|---|")
        for i in ei:
            parts.append("\n| " + esc(i.get("tool")) + " | " + esc(i.get("role")) + " |")
        parts.append("\n")

    df = p.get("data_flow", "")
    if df:
        parts.append("\n**Data flow:** " + esc(df) + "\n")

    bs = p.get("build_sequence", [])
    if bs:
        parts.append("\n**Build sequence**\n")
        for idx, step in enumerate(bs, 1):
            parts.append("\n" + str(idx) + ". " + step.strip())
        parts.append("\n")

    rk = p.get("risks", [])
    if rk:
        parts.append("\n**Risks / gates**\n")
        for r in rk:
            parts.append("\n- " + r)
        parts.append("\n")

    parts.append("\n**Architecture**\n\n")
    parts.append(demote(p.get("detailed_markdown", "")))
    parts.append("\n")

# ============ PART III — CRITIC ============
parts.append("\n\n---\n\n# Part III — Completeness Critic: Gaps, Corrections, Next Steps\n")

gaps = critique.get("gaps", [])
if gaps:
    parts.append("\n## Capability gaps the research missed\n")
    parts.append("\n| Area | What's missing | Why it matters |")
    parts.append("\n|---|---|---|")
    for g in gaps:
        parts.append("\n| " + esc(g.get("area")) + " | " + esc(g.get("what_is_missing")) + " | " + esc(g.get("why_it_matters")) + " |")
    parts.append("\n")

corr = critique.get("corrections", [])
if corr:
    parts.append("\n## Corrections (factual / risk)\n")
    for c in corr:
        parts.append("\n- " + c)
    parts.append("\n")

nx = critique.get("highest_value_next_steps", [])
if nx:
    parts.append("\n## Highest-value next steps\n")
    for n in nx:
        parts.append("\n- " + n)
    parts.append("\n")

body = "".join(parts)
open(GUIDE, "w", encoding="utf-8").write(body)
print()
print("WROTE base draft:", GUIDE)
print("total chars:", len(body))
