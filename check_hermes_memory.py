import sqlite3
import json
import os

db_path = r"C:\Users\josep\AppData\Local\hermes\state.db"
conn = sqlite3.connect(db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Find latest session
cur.execute("SELECT id, started_at, message_count FROM sessions ORDER BY started_at DESC LIMIT 3")
sessions = [dict(r) for r in cur.fetchall()]
print("LATEST SESSIONS:")
for s in sessions:
    print(f"  {s['id']}  msgs={s['message_count']}")
print()

# Latest session = the one we just ran
latest = sessions[0]["id"]
print(f"Reading latest session: {latest}")
print("=" * 80)

cur.execute(
    "SELECT id, role, content, tool_name, tool_calls "
    "FROM messages WHERE session_id = ? ORDER BY id ASC",
    (latest,),
)
rows = list(cur.fetchall())

for r in rows:
    role = r["role"]
    tool_name = r["tool_name"] or ""
    content = (r["content"] or "")[:1500]
    tool_calls = r["tool_calls"] or ""
    print(f"\n[{r['id']}] role={role} tool={tool_name}")
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
                print(f"  TOOL: {name}({args_s})")
        except Exception:
            print(f"  TOOL_CALLS (raw): {tool_calls[:400]}")
    if content:
        print(f"  CONTENT: {content}")

# Also check what's in memory-related files
print("\n" + "=" * 80)
print("MEMORY FILES ON DISK:")
hermes_dir = os.path.expandvars(r"%LOCALAPPDATA%\hermes")
for root, dirs, files in os.walk(hermes_dir):
    for f in files:
        if "memor" in f.lower() or f.endswith(".memory") or f == "memory.md":
            full = os.path.join(root, f)
            try:
                sz = os.path.getsize(full)
                print(f"  {full}  ({sz} bytes)")
            except Exception:
                pass

# Look at any file that might hold persistent memory
candidates = [
    r"%LOCALAPPDATA%\hermes\memory.md",
    r"%LOCALAPPDATA%\hermes\user_memory.md",
    r"%LOCALAPPDATA%\hermes\persona\memory.md",
    r"%USERPROFILE%\.hermes\memory.md",
]
print("\nCANDIDATE MEMORY FILE CHECK:")
for c in candidates:
    p = os.path.expandvars(c)
    if os.path.exists(p):
        sz = os.path.getsize(p)
        print(f"  EXISTS: {p}  ({sz} bytes)")
        with open(p, "r", encoding="utf-8", errors="replace") as f:
            print(f"  CONTENT:\n---\n{f.read()[:2000]}\n---")
    else:
        print(f"  not found: {p}")
