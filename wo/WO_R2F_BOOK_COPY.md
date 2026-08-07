# WO-R2F — /book honest refusal copy (Sonnet-5, judgment-zero) — DIFFERENT REPO

Read `C:/Users/josep/Claude Gravity/wo/WO_R2_COMMON.md` for the general protocol, but note
**your repo is different**: `C:/Users/josep/Claude Gravity/mabrey-roofing` (the public site,
branch `master`). Your staging id: **R2F**.
Sandbox-copy that repo, `pnpm install` (or `npm` if that repo has a package-lock — check which
lockfile exists and use the matching tool), work + gate there, stage to
`.../scratchpad/R2F_STAGED_DELIVERABLE/` at exact repo-relative paths. Never commit, never deploy.

## THE MISSION — a live page is telling homeowners something false
Sean is unavailable **Aug 10-12** and those days are now correctly absent from the booking
grid. But if a homeowner has `/book` open from BEFORE the blackout was set and taps one of
those slots, the API refuses and the page says the slot **"just got taken."** Nobody took it.
That is a false statement to a customer on a live page.

The CRM side is already done (WO-B1): `POST /api/booking/public/book` now returns a
discriminator in its 409 body — `reason: "unavailable" | "taken"`. Read
`C:/Users/josep/Claude Gravity/mabrey-crm-app/src/app/api/booking/public/book/route.ts`
(read-only, do NOT edit that repo) to confirm the EXACT response shape before you branch on it.

## THE CHANGE — `components/booking/BookingFlow.tsx`
Its `book()` function (~lines 118-142) currently branches on `r.status` only. It must parse the
response body and branch on `reason`:
- `reason: "taken"` → keep TODAY'S COPY BYTE-FOR-BYTE (someone really did take it). Do not
  touch that string.
- `reason: "unavailable"` → new copy: **"We're not available that day anymore — please pick
  another time."**
- No `reason` / unparseable body / any other error → keep the existing fallback exactly as is.
In both refusal cases the existing behavior of re-fetching the grid and re-rendering must be
preserved — the customer needs to SEE the day disappear, not just read a message.

## HARD CONSTRAINTS
- **Do NOT invent additional copy.** Those are the only words that change. No new headings, no
  apology paragraph, no emoji.
- Change nothing about layout, spacing, motion, or component structure. This is a string +
  a branch, nothing else. (The site is under a density-era design doctrine; a visual change
  here is out of scope and would need Joseph's eyeball.)
- If the response shape does not actually carry `reason` when you read the route, STOP, report
  exactly what it returns, and make NO change — do not guess a field name.

## VERIFY
Run this repo's own gates (`pnpm build` / `npm run build`, plus its typecheck and test script
if present — check `package.json`). If the repo has a Playwright suite, run it.
Report the exact before/after of the changed lines in your build report.
