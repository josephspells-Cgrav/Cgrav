import sqlite3

db = r"C:\Users\josep\AppData\Local\hermes\state.db"
conn = sqlite3.connect(db)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Columns present?
cur.execute("PRAGMA table_info(sessions)")
cols = [r["name"] for r in cur.fetchall()]
has = lambda c: c in cols

sel = ["started_at", "model", "input_tokens", "output_tokens"]
for c in ("cache_read_tokens", "cache_write_tokens", "estimated_cost_usd", "actual_cost_usd", "cost_status"):
    if has(c):
        sel.append(c)

cur.execute(f"SELECT {', '.join(sel)} FROM sessions ORDER BY started_at DESC")
rows = [dict(r) for r in cur.fetchall()]

tot_est = tot_act = 0.0
tot_in = tot_out = tot_cr = tot_cw = 0
print(f"{'started':<22}{'model':<20}{'in':>10}{'out':>9}{'cacheR':>11}{'cacheW':>10}{'est$':>9}{'act$':>9}")
print("-" * 100)
for r in rows:
    est = r.get("estimated_cost_usd") or 0
    act = r.get("actual_cost_usd") or 0
    cin = r.get("input_tokens") or 0
    cout = r.get("output_tokens") or 0
    cr = r.get("cache_read_tokens") or 0
    cw = r.get("cache_write_tokens") or 0
    tot_est += est; tot_act += act
    tot_in += cin; tot_out += cout; tot_cr += cr; tot_cw += cw
    st = str(r.get("started_at"))[:19]
    print(f"{st:<22}{str(r.get('model'))[:19]:<20}{cin:>10,}{cout:>9,}{cr:>11,}{cw:>10,}{est:>9.2f}{act:>9.2f}")

print("-" * 100)
print(f"{'TOTALS':<42}{tot_in:>10,}{tot_out:>9,}{tot_cr:>11,}{tot_cw:>10,}{tot_est:>9.2f}{tot_act:>9.2f}")
print()
print(f"Sessions: {len(rows)}")
print(f"TOTAL estimated cost: ${tot_est:,.2f}")
print(f"TOTAL actual cost:    ${tot_act:,.2f}")
print(f"Real input (fresh):   {tot_in:,}")
print(f"Cache reads:          {tot_cr:,}")
print(f"Cache writes:         {tot_cw:,}")
print(f"Output:               {tot_out:,}")
