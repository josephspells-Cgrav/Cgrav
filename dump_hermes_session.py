import sqlite3
import json
import io

db_path = r"C:\Users\josep\AppData\Local\hermes\state.db"

# Get latest 5 sessions
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("SELECT id, started_at, ended_at, message_count, tool_call_count, input_tokens, output_tokens, estimated_cost_usd, end_reason FROM sessions ORDER BY started_at DESC LIMIT 5")
for s in cur.fetchall():
    print(f"{s['id']}  msgs={s['message_count']} tools={s['tool_call_count']} in={s['input_tokens']} out={s['output_tokens']} cost=${s['estimated_cost_usd'] or 0:.4f} end={s['end_reason']}")
print()

session_id = "20260525_213940_486c5f"
print(f"Reading session: {session_id}")
print("=" * 80)

cur.execute(
    "SELECT id, role, content, tool_name, tool_calls, finish_reason "
    "FROM messages WHERE session_id = ? ORDER BY id ASC",
    (session_id,),
)
rows = list(cur.fetchall())
print(f"Total messages: {len(rows)}\n")

out_path = r"C:\Users\josep\Claude Gravity\hermes_session_hvac_run2.md"
buf = io.StringIO()
buf.write(f"# Hermes session {session_id}\n\n{len(rows)} messages.\n\n")

for r in rows:
    role = r["role"]
    tool_name = r["tool_name"] or ""
    content = r["content"] or ""
    tool_calls = r["tool_calls"] or ""
    buf.write(f"\n---\n\n## [{r['id']}] role={role} tool={tool_name} finish={r['finish_reason']}\n\n")
    if tool_calls:
        try:
            tc = json.loads(tool_calls)
            for call in tc:
                fn = call.get("function", {})
                name = fn.get("name", "?")
                args = fn.get("arguments", "")
                if isinstance(args, str):
                    try:
                        args = json.loads(args)
                    except Exception:
                        pass
                args_s = json.dumps(args, default=str)[:800]
                buf.write(f"**TOOL_CALL:** `{name}({args_s})`\n\n")
        except Exception:
            buf.write(f"TOOL_CALLS (raw): {tool_calls[:500]}\n\n")
    if content:
        if len(content) > 10000:
            buf.write(f"**CONTENT** ({len(content)} chars, truncated to 8000):\n\n```\n{content[:8000]}\n```\n\n...[{len(content)-8000} more chars]\n")
        else:
            buf.write(f"**CONTENT:**\n\n```\n{content}\n```\n")

with open(out_path, "w", encoding="utf-8") as f:
    f.write(buf.getvalue())
print(f"Wrote {len(buf.getvalue())} chars to {out_path}")

# Also extract final assistant message
final_assistant = [r for r in rows if r["role"] == "assistant" and r["content"]]
if final_assistant:
    last = final_assistant[-1]
    final_path = r"C:\Users\josep\Claude Gravity\hermes_final_response_hvac_run2.md"
    with open(final_path, "w", encoding="utf-8") as f:
        f.write(last["content"])
    print(f"Wrote final assistant ({len(last['content'])} chars) to {final_path}")
