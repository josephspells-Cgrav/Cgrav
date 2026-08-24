# PHASE F.3 — NAV POLISH (2 small items from the F.2 audit)

> Tiny follow-up to F.2's discoverability nav. **WARM builder** (you wired the nav in F.2 — context
> alive; don't re-read the codebase from scratch). Two surgical items: a duplicate-label
> disambiguation (vision-QA flag) + one hub-mesh link. Architect/reviewer = WE12. This is
> **labels + one link only** — preserve everything else.

## §1 ITEM 1 (primary) — disambiguate the duplicate "Metal Roofing" nav label
The Services menu shows TWO rows with the IDENTICAL label **"Metal Roofing"** pointing to DIFFERENT
pages — a user can't tell them apart:
- `/services/metal-roofing`  → the **install service** page
- `/materials/metal-roofing` → the **material / spec** page

Disambiguate the LABELS (keep both links + both pages). Suggested:
- `/services/metal-roofing`  → "Metal Roof Installation" (or "Metal Roofing Install")
- `/materials/metal-roofing` → "Metal Roofing Materials" (or "Metal Roofing Guide")

Use your judgment on exact wording — match the site's voice, keep it scannable. **EXTRAPOLATE:**
fix it EVERYWHERE the duplicate appears — the desktop Header dropdown (`components/Header.tsx`
~23-26), the **mobile drawer**, AND the **Footer** (Materials & Brands vs Services columns). Same
disambiguation across all surfaces; leave no instance ambiguous. (Likely the same shared nav-source
labels — find the source, not just the one flagged line.)

## §2 ITEM 2 (secondary — while you're in the nav-mesh) — /services hub → materials link
The `/services` hub page has NO in-body link to `/materials`. Materials IS reachable via the header,
so this is **NOT** a reachability fix — it's topical-mesh polish (blueprint §5 internal linking).
Add a tasteful "Explore roofing materials →" link/card on `app/services/page.tsx` → `/materials`,
so the services hub meshes down to the materials silo. Match the page's existing card/link atoms;
do NOT invent a new component.

## §3 GATES (scaled — this is labels + one link)
- `npx tsc --noEmit` · `npm run build` → 0 / 0.
- `npm run reachability-check` (still 0 orphans) · `npx playwright test --project=desktop` +
  `--project=mobile` (`nav.spec` + axe green; the relabeled links still resolve 200).
- Confirm **no duplicate label remains** in the nav (the two Metal Roofing rows now read distinctly).

## §4 DEPLOY + REPORT
- Redeploy main: `npm run build && npx --yes vercel@latest deploy --prod --yes`.
- Verify LIVE: the two Metal Roofing nav entries read distinctly + both 200; `/services` shows the
  materials link.
- Report to `website-engineer` (WE12) on the blackboard.

## §5 PRESERVE
Everything else — the nav structure/dropdowns, all other labels + links, the conversion guts, the
content + proven copy, security 10/10, static generation. A 2-item label/link polish, not a nav
redesign. Invoke a design skill if the skills-gate fires on the `components/` edit.
