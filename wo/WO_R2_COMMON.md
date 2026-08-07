# ROUND-2 COMMON RULES (every R2 builder reads this FIRST)

**Repo:** `C:/Users/josep/Claude Gravity/mabrey-crm-app`, branch `showroom-integration`
(HEAD is post-integration: A1-A5 + B1 all merged and DEPLOYED as prod 0.1.0+0afac1e).

**BUILD PROTOCOL:** copy the repo (minus node_modules/.next/.git) to your own sandbox,
`pnpm install` (**pnpm, NEVER npm install**), do ALL work + ALL gates in the sandbox, stage
every created/modified file at exact repo-relative paths into
`C:/Users/josep/AppData/Local/Temp/claude/C--Users-josep-Claude-Gravity/9abb4478-bd56-45f8-a92a-6440c2f775a0/scratchpad/<YOUR_ID>_STAGED_DELIVERABLE/`.
Never commit. Never deploy. Never run DDL against a database. Never touch .env files.

## 🔴 THE REGISTRATION RULE (new this round — it cost hours last round)
**DO NOT EDIT `src/lib/assistant.ts`.** Seven builders edited it in parallel last round and
every one of them staged a full-file snapshot that would have silently reverted the others.
Instead: export your tool(s) from your OWN file, and in your build report write a
`## REGISTRATION` section naming exactly (a) the import line(s) needed, (b) which allTools()
branch each tool belongs in (readOnly / writes-live / both), and (c) whether it is read-only.
The orchestrator wires it. Same rule for `src/lib/assistant.test.ts` and
`src/lib/assistant-flag.test.ts` — report the names you add; don't edit those two files.

## Other standing rules
- `package.json`: you MAY add your test files to the `test` hand-list (the orchestrator
  unions them). Do not reorder or remove anything.
- Any NEW test that uses the PGlite harness MUST delete `touchAttempts` BEFORE `outbox` in
  teardown — `touch_attempts.outbox_id` is an FK and delete-from-outbox throws otherwise
  (this cascaded into 41 failures last round).
- The touch ledger's real status enum is `attempted | delivered | failed | skipped | blocked`.
  There is no "sent"/"pending"/"cancelled". `recordTouchAttempt`/`settleTouchAttempt` never throw.
- The calling window is **8am-8pm ET** (`isWithinCallingWindow`, a dated Joseph lock). Any doc
  or copy saying 9pm is stale — do not propagate it.
- Two-phase confirm on every customer-reaching write; STOP is unclimbable; a pause is
  DISCLOSED and LIFTED on an explicit operator instruction, never silently obeyed.
- Side-effect disclosure lives IN the preview string the tool returns (code), never only in
  the description — it must survive a model swap.
- Money stays structurally out of Alex (field-level floor, `assertDeclarable`).
- Gates before finishing: `npx tsc --noEmit` · `npm test` · `npm run build`. All three.
- Where this WO or yours is SILENT: STOP that item, record it in the build report, and
  continue everything else. Never invent customer-facing copy.

## Build report
`C:/Users/josep/Claude Gravity/wo/BUILD_REPORT_<YOUR_ID>.md` — gate tails verbatim, files
touched, STOP questions, the `## REGISTRATION` section, and any house idiom you copied
(name the source file).
