import json
import re

OUT = r"C:\Users\josep\AppData\Local\Temp\claude\C--Users-josep-Claude-Gravity\4cae8e8e-e7b3-4e1c-ba0d-e77b77a155a8\tasks\w84ok0zql.output"
GUIDE = r"C:\Users\josep\Claude Gravity\CLAUDE_N8N_FUNNEL_SPECIALIST_GUIDE.md"
PROMPTS = r"C:\Users\josep\Claude Gravity\FUNNEL_HANDOFF_PROMPTS.md"

raw = open(OUT, encoding="utf-8", errors="replace").read()
data = None
try:
    data = json.loads(raw)
except Exception:
    s = raw.find("{"); e = raw.rfind("}")
    data = json.loads(raw[s:e + 1])

result = data.get("result", data)
briefs = result.get("briefs", [])
deliverables = result.get("deliverables", [])
critique = result.get("critique", {})

print("PARSED OK")
print("briefs:", len(briefs), "| deliverables:", len(deliverables),
      "| gaps:", len(critique.get("gaps", [])), "corrections:", len(critique.get("corrections", [])),
      "risks:", len(critique.get("risks", [])), "next_steps:", len(critique.get("next_steps", [])))
for b in briefs:
    print("  brief:", b.get("area", "?")[:60], "| md:", len(b.get("detailed_markdown", "")))
for d in deliverables:
    print("  deliverable:", d.get("title", "?")[:60], "| md:", len(d.get("content_markdown", "")))


def demote(md):
    if not md:
        return ""
    out = []
    for line in md.splitlines():
        m = re.match(r"^(#{1,6})(\s)", line)
        if m:
            new = "#" * min(len(m.group(1)) + 3, 6)
            line = new + line[len(m.group(1)):]
        out.append(line)
    return "\n".join(out)


def esc(s):
    return (s or "").replace("|", "\\|").replace("\n", " ").strip()


# ---------- PROMPTS FILE (the money: the two one-block handoff prompts) ----------
pp = ["# Funnel Handoff Prompts — ready to paste\n",
      "\nThe two one-block handoff prompts produced by the n8n-funnel research, plus the end-to-end funnel design they implement. Hand the relevant block to the executor agent.\n"]
for d in deliverables:
    pp.append("\n\n---\n")
    pp.append("\n## " + d.get("title", "Deliverable") + "\n")
    if d.get("purpose"):
        pp.append("\n> " + esc(d.get("purpose")) + "\n")
    pp.append("\n" + (d.get("content_markdown", "")) + "\n")
open(PROMPTS, "w", encoding="utf-8").write("".join(pp))
print("\nWROTE prompts:", PROMPTS)


# ---------- GUIDE FILE ----------
parts = []
parts.append("<!-- BASE DRAFT from n8n-funnel-specialist-research workflow (11 agents, grounded in live n8n MCP). Specialist framing added separately. -->\n")

parts.append("\n# Part I — n8n + Funnel Capability Reference\n")
parts.append("\nThe n8n surface for the King Maker rebrand funnel, dissected from the live n8n MCP (real node versions + params) + web. Seven areas.\n")
for b in briefs:
    parts.append("\n---\n")
    parts.append("\n## " + b.get("area", "Area") + "\n")
    parts.append("\n> " + esc(b.get("one_line", "")) + "\n")
    kf = b.get("key_facts", [])
    if kf:
        parts.append("\n**Key facts**\n")
        for f in kf:
            parts.append("\n- **" + esc(f.get("fact")) + "** — " + esc(f.get("detail")))
        parts.append("\n")
    nd = b.get("node_or_api_details", [])
    if nd:
        parts.append("\n**Real nodes / APIs / SDK**\n\n```\n" + "\n".join(nd) + "\n```\n")
    g = b.get("gotchas", [])
    if g:
        parts.append("\n**Gotchas**\n")
        for x in g:
            parts.append("\n- " + x)
        parts.append("\n")
    if b.get("business_application"):
        parts.append("\n**Funnel application:** " + esc(b.get("business_application")) + "\n")
    parts.append("\n**Reference**\n\n" + demote(b.get("detailed_markdown", "")) + "\n")

parts.append("\n\n---\n\n# Part II — The Deliverables\n")
parts.append("\nThe end-to-end funnel design + the two one-block handoff prompts. (Also extracted standalone to `FUNNEL_HANDOFF_PROMPTS.md`.)\n")
for d in deliverables:
    parts.append("\n---\n")
    parts.append("\n## " + d.get("title", "Deliverable") + "\n")
    if d.get("purpose"):
        parts.append("\n> " + esc(d.get("purpose")) + "\n")
    parts.append("\n" + demote(d.get("content_markdown", "")) + "\n")

parts.append("\n\n---\n\n# Part III — Critic: Gaps, Corrections, Risks, Next Steps\n")
gaps = critique.get("gaps", [])
if gaps:
    parts.append("\n## Gaps\n\n| Area | Missing | Why it matters |\n|---|---|---|")
    for g in gaps:
        parts.append("\n| " + esc(g.get("area")) + " | " + esc(g.get("missing")) + " | " + esc(g.get("why")) + " |")
    parts.append("\n")
if critique.get("corrections"):
    parts.append("\n## Corrections\n")
    for c in critique["corrections"]:
        parts.append("\n- " + c)
    parts.append("\n")
if critique.get("risks"):
    parts.append("\n## Risks\n")
    for r in critique["risks"]:
        parts.append("\n- " + r)
    parts.append("\n")
if critique.get("next_steps"):
    parts.append("\n## Next steps\n")
    for n in critique["next_steps"]:
        parts.append("\n- " + n)
    parts.append("\n")

body = "".join(parts)
open(GUIDE, "w", encoding="utf-8").write(body)
print("WROTE guide:", GUIDE, "| chars:", len(body))
