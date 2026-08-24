# Pass 11 fix brief — `/preview` page verification findings

## Goal
Address 5 verification findings from an autonomous browser audit of the Pass 11 deploy. Three are real product issues (1 accessibility, 1 visual quality, 1 IA), two are cosmetic/decision-dependent. Verify before claiming done.

## Context the receiving agent needs

- **Project:** contractor-template — American Masterworks (AM) flagship windows-and-doors site plus 9 per-vertical preset re-skins (Roofing, HVAC, Plumbing, Electrician, Painter, Kitchen Remodel, General Contractor, Landscaping, Hardscape).
- **Worktree:** `C:\Users\josep\OneDrive\Documents\Claude\Projects\American Master Works Redaux\.claude\worktrees\cranky-colden-ebfbb4\web\` (per global Claude instructions).
- **Verified URL:** `https://contractor-template-preview.vercel.app/preview` — the internal preset-index page (lists all 9 vertical presets + the AM baseline). Uses AM's site chrome (top nav, footer).
- **Commit verified:** Pass 11, current `main` HEAD (most recent shipped pass).
- **Audit run by:** Hermes Agent (claude-opus-4-7) using `browser_navigate` + `browser_vision` + `browser_console` (DOM-verified, not pure-vision).

## Important framing — read before touching code

This is **the AM flagship itself**, not a vertical rebrand. The repo rule "never edit `components/` to rebrand — content belongs in `lib/`" applies when re-skinning for a new contractor vertical. It **does not apply here** because we are fixing the flagship's own visual/IA defects, not re-skinning. Component edits in `components/` are permitted for these findings.

**Still off-limits:** any motion/animation code inside `components/`. Motion is baked into the template at 100% fidelity and must not be regenerated or hand-edited.

The skills-gate hook (`~/.claude/hooks/skills-gate.mjs`) requires `Skills loaded: ...` line on `components/` edits. Honor it.

## Findings (severity-ranked)

### HIGH-1 · Footer link contrast — likely WCAG AA fail

**Symptom:** The three footer columns (`EXPLORE`, `WHERE WE WORK`, `BRANDS WE INSTALL`) render their link items at white @ 0.85 opacity on a dark navy ground. Visually faint enough that the verifier's first-pass vision read mistook the columns for empty. DOM inspection confirmed the links are present and rendered — the issue is contrast, not missing content.

**Where to look:** Footer component (grep for `EXPLORE`, `WHERE WE WORK`, or `BRANDS WE INSTALL` heading strings). The opacity is likely a Tailwind class like `text-white/85` or `opacity-85` on the link or list-item.

**Fix:** Lift link opacity to `1.0` OR change the base color to a slightly brighter off-white that retains hierarchy against headings. Verify the result clears WCAG AA contrast (4.5:1 for body text) against the footer's exact navy.

**Acceptance:** Re-run the verification (see Verification Gate below) and confirm the contrast finding does not recur. Optionally cross-check with an axe-core run (`pnpm exec playwright test --project=desktop` already includes axe).

---

### HIGH-2 · Social "icons" are text-only — likely missing icon component

**Symptom:** Footer's social row renders `Facebook`, `Instagram`, `X`, `Yelp` as plain text links with hover underline, no SVG/glyph. Single-letter "X" is especially ambiguous as a text link.

**Where to look:** Same footer component as Finding 1. Grep for `Facebook` or `Instagram`. Check git log for whether an icon component was ever wired in and removed (`git log -p --follow <footer-file>` for "icon").

**Fix:** Determine intent first:
- **If intentional typographic style:** leave as-is, mark finding closed with rationale.
- **If accidental (missing import / icon library not wired):** add brand glyphs. Use whatever icon library is already a dependency (`lucide-react`, `react-icons`, etc. — check `package.json`). Don't add a new icon library.

**Acceptance:** Either documented as intentional in a code comment, OR icons render and `<a>` `aria-label` is preserved for accessibility.

---

### MEDIUM-3 · IA mismatch between primary nav and footer EXPLORE

**Symptom:** Primary top nav lists `Windows`, `Doors`, `Gallery`, `Contact`. Footer `EXPLORE` column adds `Home` and `Service Area` that aren't in the top nav. Not a functional bug, but creates IA inconsistency.

**Decision required from user before executing.** Two valid resolutions:
- **(a)** Add `Home` and `Service Area` to primary top nav (likely makes sense — both are real top-level pages).
- **(b)** Trim `Home` and `Service Area` from the footer `EXPLORE` column.

**Recommendation if user defers:** (a) — primary nav as the canonical IA, footer mirrors it. Most users expect this.

**Where to look:** Top nav component (grep for `Windows` and `Doors` nav links). Footer EXPLORE list (same area as Findings 1-2).

**Acceptance:** Primary nav and footer EXPLORE expose identical top-level routes (or the user explicitly approves divergence with rationale comment).

---

### LOW-4 · Extra whitespace above H1 on `/preview`

**Symptom:** The H1 "Vertical Preset Previews" sits slightly high in its whitespace band. Top padding feels heavier than the bottom padding of the intro block. Cosmetic.

**Where to look:** `app/preview/page.tsx` or the section component it renders. Check top padding on the hero/intro wrapper.

**Fix:** Reduce top padding to visually balance with the bottom of the intro block. Tune by eye, not by spec.

**Acceptance:** Visual re-check on next verification run; finding does not recur as a comment.

---

### LOW-5 · Tag pill color differentiation is subtle

**Symptom:** Each preset card carries 7 page-type tag pills (HOME, SERVICE HUB, SERVICE DETAIL, BRAND PAGE, GALLERY, CONTACT, SERVICE AREA, LOCATION). All render in near-monochrome — at a glance they look like the same color.

**Decision required, but the engineer can infer intent from existing code:**
- **If the tag-pill component currently switches color by page-type prop:** the differentiation IS meant to be visible; the existing palette is too tight. Widen hue separation.
- **If all pills use the same color class regardless of type:** unified styling is intentional; mark closed.

**Where to look:** The preset card component (grep `HOME` `SERVICE HUB` literal strings, or trace from `/preview` page). Check if there's a `getPillColor(type)` or switch statement.

**Acceptance:** Either widened palette (each page type visually distinguishable at card-thumbnail scale) OR documented intentional unification.

---

## Decision points (block on user input)

The user must answer these **before** the engineer executes:

1. **Finding HIGH-2 (social icons):** Intentional text-style, or wire up glyphs?
2. **Finding MEDIUM-3 (IA mismatch):** Add to top nav, or trim from footer?
3. **Finding LOW-5 (tag pills):** Differentiate by type, or keep unified?

If the user says "your call," default to:
- HIGH-2 → wire up glyphs from existing icon library
- MEDIUM-3 → add `Home` and `Service Area` to top nav
- LOW-5 → check existing component code; if switch already exists, widen palette; else leave

## Constraints (do not violate)

- **No motion code edits.** If a fix would require touching animation timing, easing, or scroll-trigger behavior, stop and escalate.
- **No content layer changes for these fixes.** Don't edit `lib/data.ts`, `lib/content-*.ts`, `lib/site.config.ts`, or `/public/` — these findings are all in `components/` and `app/`.
- **No new dependencies** unless the icon work (Finding 2) requires it and no existing icon library is present.
- **Honor the skills-gate hook** on `components/` edits — include the `Skills loaded: ...` line.

## Verification gate (must all pass before declaring done)

Run from `web/`:

```powershell
pnpm -C web exec tsc --noEmit
pnpm -C web build
pnpm exec playwright test --project=desktop
```

Then re-dispatch the autonomous verification:

```powershell
hermes chat -q "Navigate to https://contractor-template-preview.vercel.app/preview, take a full-page screenshot, then assess: hero section quality, navigation visibility, broken or missing images, layout overflow or breakage, font rendering, section spacing, and any console errors. Be specific."
```

**Pass criterion:** Findings HIGH-1, HIGH-2, MEDIUM-3 do not recur. LOW-3 and LOW-5 either don't recur or have documented rationale.

(Hermes session output for the verification run lands in the SQLite DB at `C:\Users\josep\AppData\Local\hermes\state.db`, table `messages`, filterable by latest `session_id`. Screenshots in `%LOCALAPPDATA%\hermes\cache\screenshots\`.)

## Artifacts the engineer should read first

- Full original findings: `C:\Users\josep\Claude Gravity\hermes_final_response.md`
- Full session transcript: `C:\Users\josep\Claude Gravity\hermes_session_pass11.md`
- Top-of-page screenshot: `C:\Users\josep\AppData\Local\hermes\cache\screenshots\browser_screenshot_ab449810d012491fa93b2b456d72cab6.png`
- Footer screenshot: `C:\Users\josep\AppData\Local\hermes\cache\screenshots\browser_screenshot_d1e5de7cf0ea49bf938562a14c2de592.png`

## Output expected from the engineer

- One PR or one merged-commit-series, engineer's choice based on review scope.
- Commit messages: imperative tense, scope-prefixed if conventional (`fix(footer): raise link opacity for AA`, `feat(footer): wire brand glyphs for social row`, etc.).
- PR description references this brief and lists which findings were closed vs deferred-with-rationale.
- **Do not claim shipped/verified/complete until the verification gate above passes.** The user has a strong preference for hard verification over self-report.
