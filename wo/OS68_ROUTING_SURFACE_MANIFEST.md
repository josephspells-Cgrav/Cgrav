# OS68 ITEM 6 — ROUTING-SURFACE DISPOSITION
### Census rows **R2 + R8 (Amendment 1)** · WO `WO_OS68_MABREY_MAXWO_20260830.md` §5 item 6
### Run 2026-08-30 by the Sonnet builder seat. **READ-ONLY — zero code edits.**
### Roofing @ `8116226` · Construction @ `38bf696` (see DEVIATION 1)

---

## POPULATION — route-adjacent files ∪ config-declared routing

⚖️ **`page.tsx` is not the route surface; it is the part of it one command happened to name.**
And a route enumeration under `app/` cannot see routing declared in CONFIG — the config layer
decides what a crawler receives **before any `app/` file is consulted.**

| population | roofing | construction | total |
|---|---|---|---|
| route-adjacent files | **48** | **14** | 62 |
| *(what `page.tsx` alone would have returned)* | *40* | *11* | *51* |
| config-declared routing | **3** | **3** | 6 |
| **TOTAL ROWS** | **51** | **17** | **68** |

**Row count == enumeration count: 68 == 68. Zero rows read "unclear."**

**Enumeration command** (census R2/C2, reproduced from each repo root):
```
find app \( -name page.tsx -o -name layout.tsx -o -name og-image.tsx -o -name icon.tsx \
         -o -name loading.tsx -o -name error.tsx -o -name route.ts -o -name not-found.tsx \)
```
Result: roofing 48, construction 14 — **matches census R2 and C2 exactly.**
The roofing 8-file delta over `page.tsx` = 6 API routes + `layout.tsx` + `not-found.tsx`.
The construction 3-file delta = `app/api/lead/route.ts` + `layout.tsx` + `not-found.tsx`.

### EXCLUSION MANIFEST — this manifest's own risk acceptance

- **`app/sitemap.ts` and `app/robots.ts`** are NOT in the eight-filename pattern. They are
  route-*producing* but not route-adjacent by R2's definition. Read for this pass (they drive
  the registry reconciliation below) but **not given rows** — the boundary is R2's, and
  ⚖️ *discovery appends a row, it does not quietly widen an existing one.* **Flagged as a
  candidate census amendment R9.**
- **Vercel dashboard-level configuration** (project rootDirectory, domain aliases, redirects
  configured in the UI rather than `vercel.json`) — **structurally unreachable from this seat.**
  A redirect configured in the Vercel dashboard would be invisible to every probe here.
- **Runtime behaviour was not executed.** Every verdict below is read from source. No server
  was started, no URL was fetched, no live 301/410 was observed.
- `public/` binary content, `node_modules/`, `.next/` — never inspected.

---

## 🔴 THE CONFIG LAYER — 6 rows, read for correctness

| # | surface | what it does | publicly reachable | crawler-visible output | gated |
|---|---|---|---|---|---|
| R-49 | `mabrey-roofing/middleware.ts` | **The live SEO instrument.** 7-step chain: trailing-slash normalize -> WP root-permalink 410 -> spam 410 -> LEGACY_301 -> in-site legacy 301s -> www->apex 301 -> 308 slash-strip | YES — runs on every dotless non-`/api` path | **YES — emits 410 / 301 / 308 status codes and `x-robots-tag: noindex`** | matcher excludes `/api`, `_next/*`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `quote(?:/\|$)`, and any path containing a dot |
| R-50 | `mabrey-roofing/next.config.ts` | `skipTrailingSlashRedirect: true`; `headers()` applies `securityHeaders()` to `/(.*)`; AVIF/WebP; wrapped in `withBotId` (adds same-origin proxy rewrites) | n/a (build config) | **YES — CSP, HSTS, X-Frame-Options, Referrer-Policy, X-Content-Type-Options, Permissions-Policy on every route** | n/a |
| R-51 | `mabrey-roofing/vercel.json` | `framework: nextjs`, `installCommand: npm ci`, 2 immutable `Cache-Control` header rules for `/(gallery\|og\|cities)/*` and 4 named root assets | n/a (platform config) | headers only — no redirects, no rewrites | **no check/gate step declared** (confirms the WO's INVOKER RULE probe) |
| C-15 | `mabrey-construction/middleware.ts` | 17 LEGACY_301 rules + 10 SPAM_410 patterns (incl. the 18 service×city doorway posts) + WP root-permalink 410 | **Currently INERT** — see D1/D2 below | YES when live — 410 / 301 | matcher excludes `/api`, `_next/*`, `favicon.ico`, `robots.txt`, `sitemap.xml`, dotted paths. **No `quote` exclusion (no such route).** |
| C-16 | `mabrey-construction/next.config.ts` | `headers()` -> `securityHeaders()` on `/(.*)`; AVIF/WebP; `withBotId`. 🔴 **`skipTrailingSlashRedirect` is ABSENT** | n/a (build config) | YES — same security header set | n/a |
| C-17 | `mabrey-construction/vercel.json` | Byte-identical to roofing's: framework, `npm ci`, the same 2 cache-header rules | n/a | headers only | **no check/gate step declared** — this is census C3's dead-gate condition at the platform layer |

---

## 🔴 EVERY 301 / 410 RULE READ FOR CORRECTNESS — not merely listed

> **V requires this explicitly:** *a redirect pointing somewhere stale is invisible to every
> content check.*

### ROOFING — `LEGACY_301`, 7 rules · **ALL 7 DESTINATIONS RESOLVE** ✅

| rule | destination | resolves? | how verified |
|---|---|---|---|
| `^/roof-replacement/?$` | `/services/roof-replacement` | ✅ | `slug: "roof-replacement"` present in `lib/services.ts`; `app/services/[service]/page.tsx` enumerates `SERVICE_SLUGS` |
| `^/roof-repair/?$` | `/services/roof-repair` | ✅ | `slug: "roof-repair"` present in `lib/services.ts` |
| `^/roof-installation/?$` | `/services/roof-replacement` | ✅ | same target as rule 1 |
| `^/residential-roofing/?$` | `/services` | ✅ | `app/services/page.tsx` exists |
| `^/roofing-services/?$` | `/services` | ✅ | `app/services/page.tsx` exists |
| `^/storm-damage-restoration/?$` | `/storm-damage` | ✅ | `app/storm-damage/page.tsx` exists |
| `^/locations/?$` | `/service-areas` | ✅ | `app/service-areas/page.tsx` exists; anchored `$` cannot swallow `/locations/durham-nc` |

**Collision check:** every pattern is anchored `^...$` with an optional trailing slash, and none
matches a path in the 48-file route list. ✅

⚠️ **STALE COMMENT (documentation only, not behaviour):** the `^/locations/?$` rule's comment
says *"its **17** children (`/locations/[city]-nc`)"*. The registry now carries **23** city
slugs — verified: 23 slug values in `lib/cities.ts`, reconciling with census R6. The redirect
itself is correct; only the prose is stale.

### ROOFING — the 410 instrument · **ordering verified correct**

The chain enforces the two properties the comments claim, and the ordering is load-bearing:
1. **Normalize FIRST** (strip trailing slashes), then run every check against the normalized
   path — so a spam URL 410s on the **FIRST** response. This is why
   `skipTrailingSlashRedirect: true` exists in `next.config.ts`: Next's built-in normalizer
   would otherwise run BEFORE middleware and emit a 308 first. **GSC removal tooling requires
   a direct 410.** ✅ Config and middleware agree.
2. **410 BEFORE 301** — spam paths serve a direct 410 on **both** apex and www, so a 410 can
   never degrade into a redirect chain. ✅ Verified by position: `matchesSpam410` (step 3)
   precedes both the `LEGACY_301` loop (step 4) and the www catch-all (step 5b).
3. **Case-insensitivity by construction** — matched against `normalized.toLowerCase()`, so a
   future `SPAM_410` pattern that forgets its `/i` flag still matches. The original-case string
   is preserved for every redirect Location. ✅
4. **Open-redirect immunization** — both `redirectTo` and `redirectToApex` build a
   **one-argument absolute URL** (`origin + pathname + search`) rather than the two-argument
   `new URL(path, base)` form, so a `//evil.com/x` pathname cannot become a fresh authority. ✅
   Verified by reading; not executed.
5. **Combo shadowing fixed** — `COMBO_ALLOW` derives from `COMBO_PARAMS` (itself
   `SERVICE_CITY_COMBOS.map(...)`), **not** a second hardcoded list, so registered combos fall
   through to their own prerendered pages instead of 301ing to the city hub. ✅ Single source
   of truth.

### CONSTRUCTION — `LEGACY_301`, 17 rules · **ALL DESTINATIONS RESOLVE** ✅

All 10 `/services/*` targets verified present as `slug:` values in `lib/services.ts`
(`custom-homes`, `home-additions`, `adus`, `decks`, `outdoor-living`, `porches-sunrooms`,
`attic-conversions`, `finished-basements`, `knockdown-rebuilds`, `commercial`), and the 5
static targets all exist on disk (`/services`, `/process`, `/contact`, `/about`, `/`).

### 🔴 D1 — CONSTRUCTION'S 410s WILL BE TWO-HOP, NOT DIRECT

`mabrey-construction/next.config.ts` **does not set `skipTrailingSlashRedirect`.** Roofing does,
and its own comment records exactly why, as a paid lesson:

> *"Next's built-in trailing-slash normalizer runs BEFORE middleware, so a spam URL with a
> trailing slash got a 308 first and only 410'd on the SECOND response — the removal tooling
> requires a direct 410 on the FIRST response."*

Construction's `SPAM_410` patterns all accept an optional trailing slash (`\/?$`), so they are
*written* to match both forms — but with the built-in normalizer still enabled, a trailing-slash
request never reaches them on the first response. **The 18 service×city doorway posts and the
WP archive shapes would 308-then-410 at cutover.**

⚖️ **The shape:** the fix exists, is documented, and is one line — it was simply never ported to
the sister repo. *A lesson learned in repo A is not a property of repo B.* Same class as census
instrument-failure #1 (a control from repo A is not a control for repo B).

### 🔴 D2 — CONSTRUCTION'S 301s RE-APPEND THE ORIGINAL TRAILING SLASH

Construction's middleware builds every redirect as:
```js
const url = req.nextUrl.clone();
url.pathname = dest;
url.search = "";
return NextResponse.redirect(url, 301);
```
Roofing's middleware documents this exact construction as **broken, confirmed by direct
instrumentation**:

> *"`req.nextUrl.clone()` returns a NextURL whose `.pathname` setter updates the reported
> `.pathname` property, but its `.toString()` / `.href` (which `NextResponse.redirect()` uses to
> build the Location header) silently RE-APPENDS the ORIGINAL request's trailing slash
> regardless … Every 308 built this way pointed at the WRONG (still-slashed) destination."*

So `/custom-homes/` would 301 to `/services/custom-homes/` (slashed), which then needs a second
normalizing redirect — **a two-hop chain on all 17 legacy rules.** Roofing's fix (build a plain
`URL` from a string, never a NextURL clone) is not present here.

**Both D1 and D2 are DORMANT**, and that is the only reason they are not live defects today —
see the activation trigger in `OS68_ACTIVATION_TRIGGERS.md` row A5. Construction's middleware
header states: *"The domain currently serves a WordPress site … Inert on `*.vercel.app` — safe
to ship now."* **They arm at DNS cutover**, which is precisely the moment the 410s must be
correct.

---

## 🟢 DERIVED INDEXABILITY — the standing law holds

`app/locations/[city]/[sub]/page.tsx` sets `noindex: !comboIndexable(c)`, and
`lib/sitemap-registry.ts:87` filters the sitemap through **the same predicate**:
```js
export function comboIndexable(c: ServiceCityCombo): boolean { return c.jobs.length >= 2; }
```
**Indexability is DERIVED from data (job count), never manually flipped**, and page-level and
sitemap-level indexability cannot drift because they share one function. ✅

Every other `noindex` on the roofing repo is a static, deliberate funnel/utility exclusion —
`/book`, `/quote`, `/review`, `/commercial-roofing`, `/v/[slug]` — not a deferred go-live flip.

**Construction declares no `noindex` anywhere**; only `app/layout.tsx`'s
`robots: {index:true, follow:true}`.

---

## FULL ROUTE-ADJACENT MANIFEST — 62 rows

### MABREY-ROOFING — route-adjacent files: 48

| # | surface | what it does | publicly reachable | crawler-visible output | gated |
|---|---|---|---|---|---|
| 1 | `app/about/page.tsx` | Static page at `/about` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 2 | `app/api/booking/book/route.ts` | POST — creates a booking via `LEAD_WEBHOOK_URL` | YES (public POST) | NO — JSON only | env-gated; no BotID check found |
| 3 | `app/api/booking/grid/route.ts` | GET — booking calendar grid via `LEAD_WEBHOOK_URL` | YES (public GET) | NO — JSON only | env-gated |
| 4 | `app/api/booking/slots/route.ts` | GET — bookable slots via `LEAD_WEBHOOK_URL` | YES (public GET) | NO — JSON only | env-gated |
| 5 | `app/api/call-window/route.ts` | GET — call-window availability, proxies `LEAD_WEBHOOK_URL` | YES (public GET) | NO — JSON only | env-gated: absent `LEAD_WEBHOOK_URL` disables it |
| 6 | `app/api/funnel-events/route.ts` | POST — funnel telemetry sink | YES (public POST endpoint) | NO — JSON only | no BotID check found |
| 7 | `app/api/lead/route.ts` | POST — the LEAD money path; validates, forwards to CRM webhook + Meta CAPI | YES (public POST endpoint) | NO — JSON only, not crawled | 🔴 `checkBotId()` (BotID). Guarded by the TWO DEAD GATES of census R4 |
| 8 | `app/blog/[slug]/page.tsx` | Static page at `/blog/[slug]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 9 | `app/blog/page.tsx` | Static page at `/blog` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 10 | `app/book/page.tsx` | Booking takeover UI | YES | page renders but `noindex: true` | **noindex** — deliberate, funnel surface |
| 11 | `app/brands/[brand]/page.tsx` | Static page at `/brands/[brand]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 12 | `app/brands/page.tsx` | Static page at `/brands` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 13 | `app/certifications/page.tsx` | Static page at `/certifications` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 14 | `app/commercial-roofing/page.tsx` | Commercial roofing hub | YES by URL | renders but `noindex: true` | **noindex + removed from sitemap + delinked from all nav** — source kept in-tree deliberately |
| 15 | `app/contact/page.tsx` | Static page at `/contact` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 16 | `app/es/[slug]/page.tsx` | Static page at `/es/[slug]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 17 | `app/es/page.tsx` | Static page at `/es` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 18 | `app/faq/page.tsx` | Static page at `/faq` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 19 | `app/financing/page.tsx` | Static page at `/financing` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 20 | `app/financing/payment-calculator/page.tsx` | Static page at `/financing/payment-calculator` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 21 | `app/gallery/page.tsx` | Static page at `/gallery` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 22 | `app/layout.tsx` | Root layout — global `<head>`, `metadata`, `robots: {index:true, follow:true}`, security-header consumer | n/a (wraps every route) | YES — title/description/OG/robots on every page | no gate; the site-wide index directive lives here |
| 23 | `app/locations/[city]/[sub]/page.tsx` | Service x city combo pages | YES | conditional — `noindex: !comboIndexable(c)` | 🟢 **DERIVED indexability**: `comboIndexable(c) = c.jobs.length >= 2`. Sitemap filtered by the same predicate — no manual flip |
| 24 | `app/locations/[city]/page.tsx` | Static page at `/locations/[city]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 25 | `app/materials/[slug]/page.tsx` | Static page at `/materials/[slug]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 26 | `app/materials/page.tsx` | Static page at `/materials` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 27 | `app/not-found.tsx` | 404 handler for unmatched paths | YES (any unmatched path) | YES — 404 status + page body | none needed; status code is the signal |
| 28 | `app/page.tsx` | Static page at `/` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 29 | `app/privacy-policy/page.tsx` | Static page at `/privacy-policy` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 30 | `app/projects/[slug]/page.tsx` | Case-study detail pages | **NO — 0 routes today** | nothing (no params generated) | `generateStaticParams` from `CASE_STUDY_SLUGS`, and `CASE_STUDIES = []` -> zero routes. **DORMANT** — see ACTIVATION_TRIGGERS A1 |
| 31 | `app/projects/page.tsx` | Static page at `/projects` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 32 | `app/quote/page.tsx` | Quote funnel / scheduler takeover | YES | renders but `noindex: true` | **noindex** + EXCLUDED from middleware (`quote(?:/|$)` in the matcher) |
| 33 | `app/resources/[slug]/page.tsx` | Static page at `/resources/[slug]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 34 | `app/resources/glossary/[term]/page.tsx` | Static page at `/resources/glossary/[term]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 35 | `app/resources/glossary/page.tsx` | Static page at `/resources/glossary` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 36 | `app/resources/page.tsx` | Static page at `/resources` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 37 | `app/review/page.tsx` | Review-request landing | YES | renders but `robots: {index:false, follow:true}` | **noindex, follow** |
| 38 | `app/reviews/page.tsx` | Static page at `/reviews` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 39 | `app/roof-cost-calculator/page.tsx` | Static page at `/roof-cost-calculator` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 40 | `app/roofing-cost/page.tsx` | Static page at `/roofing-cost` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 41 | `app/service-areas/page.tsx` | Static page at `/service-areas` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 42 | `app/services/[service]/page.tsx` | Static page at `/services/[service]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 43 | `app/services/page.tsx` | Static page at `/services` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 44 | `app/storm-damage/[type]/page.tsx` | Static page at `/storm-damage/[type]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 45 | `app/storm-damage/page.tsx` | Static page at `/storm-damage` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 46 | `app/terms/page.tsx` | Static page at `/terms` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 47 | `app/v/[slug]/page.tsx` | Video landing pages | YES by URL | renders but `robots: {index:false, follow:false}` | **noindex, nofollow** on every slug incl. the not-found branch |
| 48 | `app/warranty/page.tsx` | Static page at `/warranty` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |

### MABREY-CONSTRUCTION — route-adjacent files: 14

| # | surface | what it does | publicly reachable | crawler-visible output | gated |
|---|---|---|---|---|---|
| 1 | `app/about/page.tsx` | Static page at `/about` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 2 | `app/api/lead/route.ts` | POST — the LEAD money path; validates, forwards to CRM webhook + Meta CAPI | YES (public POST endpoint) | NO — JSON only, not crawled | 🔴 `checkBotId()` (BotID). Guarded by the TWO DEAD GATES of census R4 |
| 3 | `app/contact/page.tsx` | Static page at `/contact` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 4 | `app/faq/page.tsx` | Static page at `/faq` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 5 | `app/financing/page.tsx` | Static page at `/financing` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 6 | `app/layout.tsx` | Root layout — global `<head>`, `metadata`, `robots: {index:true, follow:true}`, security-header consumer | n/a (wraps every route) | YES — title/description/OG/robots on every page | no gate; the site-wide index directive lives here |
| 7 | `app/not-found.tsx` | 404 handler for unmatched paths | YES (any unmatched path) | YES — 404 status + page body | none needed; status code is the signal |
| 8 | `app/page.tsx` | Static page at `/` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 9 | `app/privacy-policy/page.tsx` | Static page at `/privacy-policy` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 10 | `app/process/page.tsx` | Static page at `/process` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 11 | `app/services/[service]/page.tsx` | Static page at `/services/[service]` | YES — one route per generated param | YES — indexable HTML + metadata | `generateStaticParams` enumerates the set; indexable (in the sitemap registry) |
| 12 | `app/services/page.tsx` | Static page at `/services` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 13 | `app/terms/page.tsx` | Static page at `/terms` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |
| 14 | `app/why-us/page.tsx` | Static page at `/why-us` | YES | YES — indexable HTML + metadata | indexable (in the sitemap registry) |

---

## DISCOVERY QUEUE — found here, NOT on the census

| # | finding | proposed census row |
|---|---|---|
| 1 | `app/sitemap.ts` / `app/robots.ts` are route-*producing* and invisible to R2's eight-filename pattern — a fourth instance of the "instrument exports a claim wider than its universe" shape | **R9** |
| 2 | Construction lacks `skipTrailingSlashRedirect` (D1) — its 410s will be two-hop at cutover | **C5** |
| 3 | Construction's 301s use the `nextUrl.clone()` pattern roofing proved broken (D2) | **C6** |
| 4 | Roofing's `^/locations/?$` comment says "17 children"; the registry carries 23 | **R10** (doc-only) |
| 5 | Vercel dashboard-configured routing is unreachable from this seat and unaudited on both repos | **R11** |

**Zero of the above were fixed.** This is a disposition pass.
