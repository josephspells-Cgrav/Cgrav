• I'll start by reading the work order and adjudication source in full.

• Now let me look at `lib/cities.ts` — its structure, the Cary mold, and the current Durham/Raleigh entries.

• I have everything I need. Let me verify a few shared-phrase risks before editing.

• Now the Durham entry. Re-reading at its shifted location:

• Build clean. Now kill any prior :3221 listener and start a fresh server.

• FAQs render via `FaqSection`. Now I'll script the §10 oracle against the four pages:

• All 14 oracle assertions PASS (the exit-127 is a known Node 24 Windows libuv teardown assertion after the run completed — output printed fully). Now the v2.G forbidden-pattern greps on rendered HTML and verbatim intro capture:

• All rendered-page assertions clean. Writing the batch-1 report now:

• Now cleanup, commit (authorized by the WO), and stop:

• Batch 1 complete. Stopped per v2.H — batch 2 not started.

  **Commit:** `278bfdd` — `seo-lane-w batch 1: durham + raleigh` (2 files: `lib/cities.ts` + `wo/BUILD_REPORT_SEO_LANE_W.md`)

  **Gate exits (server fresh on :3221, BUILD_ID `yuxA6tgtMOdxne1pQ0-p6` proven 200, no prior listener):**
  - typecheck: PASS · build: PASS
  - spam-410-guard: PASS · doorway-check: PASS (max pairwise 28.4% < 40%, delete-the-city-name PASS) · reachability: PASS (168/168)

  **Oracle (§10, 14/14 PASS):**
  - durham-nc: 200, "190 completed roofs" present, 10/10 hoods, meta w/ count (140 chars), FAQ 3→4
  - raleigh-nc: 200, "118 completed roofs" present, 11/11 hoods, meta w/ count (151 chars), FAQ 3→4
  - cary-nc control: "73 completed roofs" intact · burlington-nc control: "26 completed roofs" intact
  - (Oracle script exited 127 on teardown — a Node 24/Windows libuv assertion after all rows printed PASS; documented in the report.)

  **Scrub table: 14 rows** (8 Durham + 6 Raleigh), each with full-hoods.json count. Key dispositions: Hayes Barton (0) DELETED from Raleigh intro/array; Watts-Hillandale, Forest Hills, Erwin Mills (0 each) CONVERTED to descriptors in Durham; Trinity Park (3) and North Hills (1) KEPT as supported work-claims incl. heroImage.alt per v2.D.

  **v2.G assertions:** per-hood-count grep on rendered HTML: 0 hits; only sanctioned city totals near "roofs"; word-form totals 0 hits. `git diff --stat f475d19` = exactly `lib/cities.ts`; all 6 frozen entries verified field-identical against `f475d19`.

  **Gaps:** none — no forced guesses. Server on :3221 stopped after the gates. Awaiting the orchestrator's go signal for batch 2.

