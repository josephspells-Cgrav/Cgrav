You are the BUILDER for Lane A5-EDITORIAL, **BATCH 1 OF 3**, on the Mabrey Roofing site.

Working directory: C:\Users\josep\Claude Gravity\.wt-seo-a5
Git worktree, branch `seo-a5-editorial`, based on `9d0174c`. `node_modules` is
already installed. Use `pnpm` (or ./node_modules/.bin/<tool> if pnpm complains
about a deps-status check).

The full work order is at wo/WO_SEO_A5_EDITORIAL_LINKS.md — READ IT. But
**BATCH 1 IS MECHANICAL ONLY.** Do NOT add a single editorial link in this
batch. Content comes in batches 2 and 3, after I gate this one.

## BATCH 1 SCOPE — exactly three things

**1. `lib/inline-links.tsx`** — implement `renderInline(text: string): React.ReactNode[]`
exactly as specified in WO §2.3:
   - split on `/\[([^\[\]]+)\]\((\/[A-Za-z0-9\-\/]*)\)/g`
   - plain strings for non-link runs, `next/link` `<Link>` for matches
   - text with NO link syntax must round-trip byte-identical as a single string
     node (this is the regression floor — 141 bodies pass through it unchanged)
   - malformed/unmatched brackets emit as literal text, never dropped
   - NO `dangerouslySetInnerHTML`

**2. Wire it** into every paragraph mapper that renders a `body` field. Find them:
   `grep -rn "body.split" app/ components/`
   Known: `app/resources/glossary/[term]/page.tsx:51`. Find the article path too.
   After wiring, rendered output must be IDENTICAL to today, because no body
   contains link syntax yet. That is the point: prove the seam is inert first.

**3. `scripts/inline-link-guard.mjs`** — WO §5.1, all six requirements,
   including the positive control (§5.1.5): it must FAIL on a deliberately
   broken fixture, and you must paste that failure output, then remove the
   fixture and paste the clean pass. Derive the valid route set from the app
   router + lib/sitemap-registry.ts. DO NOT hardcode a route list — a hardcoded
   list beside a growing config rots, and that exact bug has already bitten this
   repo once (doorway-check.mjs).

## GATES — run and paste real output
```
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/next build
node scripts/inline-link-guard.mjs
```
Sitemap must stay 168.

## HARD RULES
- Do NOT deploy, push, merge, or touch `master`. Do NOT run `git stash`.
- Commit to `seo-a5-editorial` only, message prefix `seo-a5 batch 1:`.
- Do NOT edit lib/business.ts, lib/cities.ts, lib/doorway-gate.ts, middleware.ts,
  lib/sitemap-registry.ts, next.config.*, app/api/**, .env*.
- Adding any link to any body in this batch is OUT OF SCOPE. Zero content edits.

## REPORT → wo/OUT_A5_BATCH1.md
Files changed · real pasted gate output · the positive-control failure then the
clean pass · anything you did not do and why · your commit SHA.
Do not claim a gate you did not run. The orchestrator re-runs all of it.
