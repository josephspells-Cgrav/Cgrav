# PHASE F.2 — DISCOVERABILITY: navigation + internal-link mesh

> Phase F shipped the integrated authority site (141 URLs, every gate green, deployed) — but
> its §F core-nav / internal-link-mesh deliverable was left INCOMPLETE: ~90 new pages are
> ORPHANED from the navigation. This WO wires them in. To the **WARM Phase-F builder** (you
> hold the codebase + BUILD-CONTRACT + the merge in context). Architect/reviewer = WE12.

## §1 THE LENS — "Built ≠ reachable. Every page ≤2 clicks from home, zero orphans."
A page that exists + renders + is in the sitemap but is NOT linked from the nav/hubs is an
ORPHAN — invisible to humans AND crawled-less / ranked-worse by Google (blueprint §5: "no page
>2 clicks from home"; internal links distribute authority). The authority build's value is the
DEPTH being reachable + interlinked, not just existing. This WO makes the built depth navigable.

## §2 THE GAP (WE12-confirmed diagnostic)
Header nav currently links ONLY the original set: `/about · /services · /storm-damage ·
/service-areas · /financing · /roofing-cost · /reviews · /contact`. **NONE** of these new
surfaces are in Header OR Footer (all confirmed absent):
`/materials` (+`[slug]`) · `/commercial-roofing` · `/resources/glossary` · `/blog` · `/projects` ·
`/es` · `/roof-cost-calculator` · `/financing/payment-calculator` · `/certifications` · `/warranty`.
Hubs don't link down either: `/resources`→glossary 0 / blog 0 · `/services`→materials 0 ·
home→materials/projects/blog 0. The combos (`/locations/[city]-nc/[sub]`) aren't surfaced on
their parent city pages. So the menus are byte-identical to the pre-build site.

## §3 EXECUTE — wire the discoverability layer (NO new pages; links + nav only)
1. **Header desktop nav** — surface every new section WITHOUT overstuffing the bar. ⚠️ WO_10
   atomic-header lesson: header items must stay ONE-LINE, never wrap/fragment — use DROPDOWNS,
   don't add 10 flat items.
   - Services dropdown: + Materials (hub + key materials) + Commercial Roofing.
   - New Resources dropdown: Guides (`/resources`) · Glossary · Blog · Cost Calculator.
   - Surface Projects (the job-pin gallery) as a discoverable entry point.
   - Add the EN/ES language switch as a header affordance (the entry INTO `/es` from the EN site).
   - Keep the primary **Free Estimate** CTA dominant — accent-discipline: nav links are NEUTRAL,
     loud red stays CTA-reserved (don't stack competing reds).
2. **Header mobile drawer** — the same surfaces, grouped, in the mobile menu (no overflow).
3. **Footer** — a complete surface map (columns): Services + Materials + Commercial · Locations
   (hub) · Resources (Guides/Glossary/Blog/Calculators) · Company (About/Projects/Certifications/
   Warranty/Reviews) · the `/es` link. The footer is the catch-all reachability net.
4. **Hub-down links** — `/resources` lists the glossary + blog clusters; `/services` links to
   `/materials` + `/commercial-roofing`; the HOME surfaces the new depth (a materials teaser, a
   projects/job-pin strip, a "from the blog" / resources row) — enough that every section is
   ≤2 clicks from home.
5. **Combos on city pages** — surface the service×city combos (`/locations/[city]-nc/[sub]`) on
   their parent city page (a "Roofing services in [City]" block) so they're reachable + meshed.
6. **Internal mesh** — leverage/complete `lib/related.ts` so money/service/article pages cross-link
   to the relevant new materials/glossary/combos. Descriptive anchor text (not "click here"); do
   NOT dump all SAPs in the footer (blueprint §5 spam signal — use the hub).
7. **/es sticky-bar localization** (vision-agent catch) — the shared sticky bar shows "Call Now /
   Free Estimate" in ENGLISH on `/es`; localize those labels on the `/es` route (a clean per-locale
   label swap, not a fork) so the bilingual surface is fully Spanish.

**EXTRAPOLATE:** §2 lists the KNOWN orphans, but the STANDARD is "every new route reachable ≤2
clicks + meshed." BFS the full `SITEMAP_ENTRIES` set from `/`; if ANY new surface is still
orphaned, wire it. Fix to the no-orphan standard, not just the enumerated list.

## §4 VERIFICATION GATES (all green before redeploy)
- `npx tsc --noEmit` · `npm run build` → 0 / 0.
- ⭐ **NEW orphan / reachability gate** — add a check (script or playwright) that BFS-crawls from
  `/` and asserts EVERY route in `SITEMAP_ENTRIES` is reachable within ≤2 link-hops; FAIL on any
  orphan. Wire it into the suite so this can't regress. (This is the gate the WE12 audit lacked.)
- `npx playwright test --project=desktop` + `--project=mobile` — axe 0 critical/serious · fork
  preserved · 0 console · + a nav-click test (Header / drawer / Footer links resolve 200).
- `npm run security-audit` 10/10 · `npm run doorway-check` PASS (unchanged — no new pages).
- The WO_10 header de-wrap HOLDS: nav one-line / atomic at 1280–1680 (measure by HEIGHT, never
  `getClientRects().length` — [[dom-linecount-misses-flex-wrap]]); mobile drawer no overflow.

## §5 DEPLOY + REPORT
- Redeploy main: `npm run build && npx --yes vercel@latest deploy --prod --yes`.
- Verify the DEPLOYED nav serves the new links (fetch the live Header/Footer HTML, grep each new
  route present) + click-through a couple live (a Resources→Glossary path, a home→Projects path).
- Report to `website-engineer` (WE12) on the blackboard: live URL, the reachability-gate result,
  the per-section nav coverage. WE12 re-audits (now WITH the orphan/≤2-click check) + Joseph eyeballs.

## §6 PRESERVE (do NOT touch — this is LINK + NAV wiring, not a redesign)
The 9.5/9.5 conversion guts (quiz / CTA / sticky mechanics) · the dual-intent fork · the WO_14
hero · every page's CONTENT + proven copy · the JSON-LD spine · the 14 cities + the doorway gate ·
security 10/10 · static generation. ADD nav + links; change NO page's content. The primary
Free-Estimate CTA stays dominant.

## §7 DESIGN SKILLS (the nav is rendered UI — INVOKE, don't name-drop)
Header/Footer edits are component design work. Invoke the design skills (impeccable, frontend-design)
for the dropdown/drawer UX so it matches the premium bar; apply [[accent-color-discipline]] + the
WO_10 atomic-header-affordances lesson. If the skills-gate fires on the `components/` edit, include
the `Skills loaded:` line.
