# WO — LANE A5: EDITORIAL CONTEXTUAL LINKS (judgment-zero)

**Author:** OS62 (orchestrator). **Builder:** Kimi K3 at HIGH.
**Repo:** `C:\Users\josep\Claude Gravity\.wt-seo-a5` (worktree, branch `seo-a5-editorial`).
**Base:** `master @ 9d0174c`.

> ⛔ YOU ARE THE BUILDER. Do not deploy. Do not push. Do not merge. Do not touch
> `master`. Do not run `git stash` (it is repo-global on this machine and will
> eat another worktree's work). Commit to your branch only. The orchestrator
> re-runs every gate you claim.

---

## 0. THE PREMISE (already probed by the orchestrator — do not re-litigate)

PROBED 2026-08-23 by OS62 against the tree at 9d0174c:

- `grep -o "/resources/glossary/[a-z-]*" lib/articles/*.ts` → **0 matches.**
  Articles contain **zero** in-prose links into the glossary.
- `grep -o "/locations/[a-z-]*" lib/articles/glossary.ts` → **0 matches.**
  Glossary entries contain **zero** in-prose links into location hubs.
- The only existing linkage is the *related-terms module* (`lib/related.ts`,
  `glossaryRelatedTerms()`) — a card rail below the prose, not in-prose.
- 51 glossary terms (`lib/articles/glossary.ts`), ~90 article slugs across
  `lib/articles/*.ts`.

The lane is REAL. Build it.

## 1. THE PROBLEM

The glossary ranks (`what is sub fascia` #26, `fascia` #26/#50) and hoards its
equity: nothing in-prose points into it, and it points nowhere. Location hubs
get no editorial support. The internal-link mesh is a T5 board item; this WO
builds the first real strand of it.

## 2. ARCHITECTURE — DECIDED. Implement exactly this.

`body` fields are plain strings rendered by splitting on `\n\n`
(`app/resources/glossary/[term]/page.tsx:51` and the article render path).
There is no inline-link renderer in the repo. Build one.

### 2.1 The convention
Markdown-style inline links, **inside `body` strings ONLY**:

    [label](/path)

- Paths are always **site-relative and absolute-from-root** (`/resources/...`).
  Never external. Never protocol-relative. Never a bare `#anchor`.
- `label` may not contain `[`, `]`, `(`, or `)`.

### 2.2 ⛔ FIELDS THAT MUST STAY PLAIN TEXT — never add a link to these
`shortAnswer` · `answer` · `term` · `intro` · any field consumed by JSON-LD or
by `.seo-answer`. These feed schema and answer-extraction; markup in them
corrupts the extracted answer. **`body` is the only linkable field.**

### 2.3 The renderer
New file `lib/inline-links.tsx`:

```tsx
export function renderInline(text: string): React.ReactNode[]
```

- Splits on `/\[([^\[\]]+)\]\((\/[A-Za-z0-9\-\/]*)\)/g`.
- Emits plain strings for non-link runs and `next/link` `<Link>` for matches.
- Text containing no link syntax must round-trip **byte-identical** as a single
  string node. This is the regression floor — 51 glossary bodies and ~90 article
  bodies pass through this function whether or not they carry links.
- Unmatched/malformed bracket text is emitted as literal text, never dropped.
- No `dangerouslySetInnerHTML`. Ever.

Wire it into every paragraph mapper that renders a `body` (glossary `[term]`
page and the article render path). Find them with:
`grep -rn "body.split" app/ components/`

## 3. THE CONTENT POUR — the rules are hard limits

### 3.1 Direction 1 — article bodies → glossary terms
- Link a term **only where the article's prose already uses that term naturally.**
  Never insert a sentence to host a link. Never reword to create an anchor.
- **Max 3** glossary links per article body. Zero is a valid answer.
- **Never link the same target twice** in one body.
- **Never link inside the first sentence** of the first paragraph.
- Anchor text = the natural inline phrase (`flashing`, `roofing square`).
  Never "click here", never the bare slug, never a keyword-stuffed phrase.

### 3.2 Direction 2 — glossary bodies → location hubs and services
- A glossary body may link to a location hub **only when that body already makes
  a geographic statement.** No geographic sentence → no location link. Do not
  add one.
- **Max 1 location link per glossary body**, hard cap.
- Glossary bodies may additionally carry **max 1** `/services/*` link where the
  service is the natural remedy for the term.
- ⛔ **Do NOT link every term to `/locations/durham-nc`.** A uniform
  term→one-city link pattern across 51 entries is a doorway signal and will be
  rejected at gate. Vary by genuine relevance or omit.

### 3.3 Global
- **Existing pages only.** Creating a page, route, or slug is a FLOOR — stop and
  report instead.
- Every link target must resolve to a real route (§5.1 asserts this).
- Do not reorder, retitle, or reword prose beyond inserting the bracket syntax
  around words **already present**.

## 4. WHAT YOU MAY NOT TOUCH
`lib/business.ts` (the orchestrator owns it this run) · `lib/cities.ts` ·
`lib/doorway-gate.ts` · `middleware.ts` · `lib/sitemap-registry.ts` ·
`next.config.*` · anything under `app/api/` · any `.env*`.

## 5. GATES — run them, paste real output in your report

### 5.1 New mechanical gate (you write it): `scripts/inline-link-guard.mjs`
Must assert, and must be unable to pass vacuously:
1. Every `[label](/path)` target across `lib/articles/*.ts` resolves to a route
   that exists (derive the route set from the app router + `lib/sitemap-registry.ts`
   — do not hardcode a list; a hardcoded list beside a growing config ROTS).
2. No link syntax appears in `shortAnswer`, `answer`, or `term` — anywhere.
3. Per-body caps hold: ≤3 glossary links per article body, ≤1 location link and
   ≤1 service link per glossary body.
4. No duplicate target within a single body.
5. **Positive control**: the guard must FAIL on a deliberately broken fixture
   (a `[x](/no-such-route)` string). Prove it by running it against the fixture
   and pasting the failure, then removing the fixture. A guard never shown to
   fail is not a guard.
6. Report the counts it found (bodies touched, links added, by direction).

### 5.2 Existing gates
```
pnpm exec tsc --noEmit
pnpm build
node scripts/spam-410-guard.mjs
node scripts/doorway-check.mjs        # if present; report if absent
node scripts/inline-link-guard.mjs
```
All must pass. **Sitemap count must stay exactly 168** — this lane adds no pages.

## 6. YOUR REPORT — `wo/OUT_A5_EDITORIAL.md`
1. Files changed, with per-file link counts by direction.
2. Real pasted output of every gate in §5.
3. The positive-control failure output from §5.1.5, then the clean pass.
4. **Anything you did NOT do and why** — silent scope-shrink is a failure.
5. Any place the rules forced you to omit a link you thought was good. Say so;
   the orchestrator decides, not you.
6. Your commit SHA on `seo-a5-editorial`.

## 7. HONESTY FLOOR
Do not claim a gate passed that you did not run. Do not paste invented output.
If something is broken and you cannot fix it inside these rules, STOP and report
— a truthful blocked report is worth more than a green claim that a re-gate
falsifies. The orchestrator re-runs all of this.
