"""Hermes cost re-audit — Opus 4.7 + cache + reasoning tokens."""
import sqlite3
import sys
from datetime import datetime, timezone

# Force UTF-8 stdout on Windows
sys.stdout.reconfigure(encoding='utf-8')

DB = r"C:\Users\josep\AppData\Local\hermes\state.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

YESTERDAY_START = datetime(2026, 5, 25, 0, 0, tzinfo=timezone.utc).timestamp()

# ─── Full picture: last 48h, all token types ─────────────────────────
print("=" * 100)
print("HERMES COST AUDIT — Opus 4.7 token breakdown")
print("=" * 100)
cur.execute(
    """SELECT id, model, started_at, message_count, tool_call_count, api_call_count,
              input_tokens, output_tokens, cache_read_tokens, cache_write_tokens,
              reasoning_tokens, estimated_cost_usd, actual_cost_usd
       FROM sessions
       WHERE started_at >= ?
       ORDER BY estimated_cost_usd DESC NULLS LAST""",
    (YESTERDAY_START,))
rows = [dict(r) for r in cur.fetchall()]

# Header
print(f"{'session':<30} {'model':<18} {'cost':>7} {'api':>4} {'in':>5} {'out':>7} {'cache_r':>8} {'cache_w':>7} {'reason':>7}")
print("-" * 100)
for r in rows[:12]:
    print(f"{r['id'][:28]:<30} {(r['model'] or '?')[:16]:<18} ${(r['estimated_cost_usd'] or 0):>6.2f} {(r['api_call_count'] or 0):>4} {(r['input_tokens'] or 0):>5,} {(r['output_tokens'] or 0):>7,} {(r['cache_read_tokens'] or 0):>8,} {(r['cache_write_tokens'] or 0):>7,} {(r['reasoning_tokens'] or 0):>7,}")

# ─── Recompute cost from token breakdown ──────────────────────────────
print()
print("=" * 100)
print("COST RECONSTRUCTION — top 2 sessions, Opus 4.7 pricing")
print("=" * 100)
# Opus 4.7 pricing per million tokens
PRICING = {
    'input':       15.00,  # $15/M
    'output':      75.00,  # $75/M
    'cache_read':   1.50,  # $1.50/M (10% of input)
    'cache_write': 18.75,  # $18.75/M (5m TTL writes; 1h is 25%)
    'reasoning':   75.00,  # output-priced
}
for r in rows[:5]:
    cost_in    = (r['input_tokens'] or 0) * PRICING['input'] / 1_000_000
    cost_out   = (r['output_tokens'] or 0) * PRICING['output'] / 1_000_000
    cost_cache_r = (r['cache_read_tokens'] or 0) * PRICING['cache_read'] / 1_000_000
    cost_cache_w = (r['cache_write_tokens'] or 0) * PRICING['cache_write'] / 1_000_000
    cost_reason  = (r['reasoning_tokens'] or 0) * PRICING['reasoning'] / 1_000_000
    cost_model   = cost_in + cost_out + cost_cache_r + cost_cache_w + cost_reason
    cost_reported = r['estimated_cost_usd'] or 0
    delta = cost_reported - cost_model

    print(f"\n[{r['id']}]")
    print(f"  reported cost:   ${cost_reported:.3f}")
    print(f"  reconstructed:   ${cost_model:.3f}")
    print(f"     input:        ${cost_in:.4f}    ({(r['input_tokens'] or 0):,} tok)")
    print(f"     output:       ${cost_out:.4f}    ({(r['output_tokens'] or 0):,} tok)")
    print(f"     cache_read:   ${cost_cache_r:.4f}    ({(r['cache_read_tokens'] or 0):,} tok)")
    print(f"     cache_write:  ${cost_cache_w:.4f}    ({(r['cache_write_tokens'] or 0):,} tok)")
    print(f"     reasoning:    ${cost_reason:.4f}    ({(r['reasoning_tokens'] or 0):,} tok)")
    print(f"  delta:           ${delta:.3f}   (positive = Browserbase/infra, negative = pricing mismatch)")

# ─── Aggregate breakdown ─────────────────────────────────────────────
print()
print("=" * 100)
print("48H AGGREGATE — where the dollars went")
print("=" * 100)
total = {
    'cost': sum((r['estimated_cost_usd'] or 0) for r in rows),
    'in': sum((r['input_tokens'] or 0) for r in rows),
    'out': sum((r['output_tokens'] or 0) for r in rows),
    'cache_r': sum((r['cache_read_tokens'] or 0) for r in rows),
    'cache_w': sum((r['cache_write_tokens'] or 0) for r in rows),
    'reason': sum((r['reasoning_tokens'] or 0) for r in rows),
    'api': sum((r['api_call_count'] or 0) for r in rows),
    'msgs': sum((r['message_count'] or 0) for r in rows),
    'tools': sum((r['tool_call_count'] or 0) for r in rows),
}
recon = (total['in']*PRICING['input'] + total['out']*PRICING['output'] +
         total['cache_r']*PRICING['cache_read'] + total['cache_w']*PRICING['cache_write'] +
         total['reason']*PRICING['reasoning']) / 1_000_000
print(f"  Total reported cost:    ${total['cost']:.2f}")
print(f"  Reconstructed model:    ${recon:.2f}")
print(f"  Delta (infra/browser):  ${total['cost'] - recon:.2f}")
print()
print(f"  Total input tokens:        {total['in']:,}")
print(f"  Total output tokens:       {total['out']:,}")
print(f"  Total cache_read tokens:   {total['cache_r']:,}")
print(f"  Total cache_write tokens:  {total['cache_w']:,}")
print(f"  Total reasoning tokens:    {total['reason']:,}")
print(f"  Total API calls:           {total['api']:,}")
print(f"  Total messages:            {total['msgs']:,}")
print(f"  Total tool calls:          {total['tools']:,}")
print()
print(f"  Avg input per API call:    {total['in']/max(total['api'],1):,.0f}")
print(f"  Avg output per API call:   {total['out']/max(total['api'],1):,.0f}")
print(f"  Avg cache_read per call:   {total['cache_r']/max(total['api'],1):,.0f}")

conn.close()
