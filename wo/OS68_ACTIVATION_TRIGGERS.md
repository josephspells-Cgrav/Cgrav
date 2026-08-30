# OS68 ITEM 7 — ACTIVATION TRIGGERS FOR EVERY DORMANT EXPOSURE
### Census row **X2** (+ discoveries) · WO `WO_OS68_MABREY_MAXWO_20260830.md` §5 item 7
### Run 2026-08-30 by the Sonnet builder seat. **READ-ONLY — zero code edits.**
### Roofing @ `8116226` · Construction @ `38bf696` (see DEVIATION 1)

---

## WHY THIS FILE EXISTS

⚖️ **An omission whose trigger is not written down is not a decision — it is a thing the next
person will undo without knowing there was a reason.**

Every row below carries its REASONING, not just its rule, **because whoever re-opens it will
have the artifact and not the argument.** A row that said only "re-derive the city" would be
deleted by the first person who saw a working default sitting right there.

**Each row: what is dormant · the trigger that re-opens it · what must be RE-DERIVED at that
moment rather than inherited.**

---

## 🔴 A1 — THE `?? "the Triangle"` REGION FALLBACK ON THE CASE-STUDY PATH

**Repo:** mabrey-roofing · **Census row:** X2

### What is dormant
`CASE_STUDIES: CaseStudy[] = []` (`lib/trust.ts:171`). **Dormancy proven mechanically, not
assumed:** `CASE_STUDY_SLUGS` is empty -> `generateStaticParams` returns nothing -> zero
`/projects/*` routes are generated -> zero `/projects/` entries in the live sitemap.

### 🔴 CORRECTION TO THE CENSUS / WO ENUMERATION — right total, wrong members

The WO names *"4 sites across 2 files: `app/projects/[slug]/page.tsx:93`,
`components/trust/CaseStudyCard.tsx:40` and `:60` ×2."*

A direct enumeration of every identity fallback on this path returns **7 fallback expressions
across the same 2 files**, of which **4 are region fallbacks**:

| # | site | expression | surface it feeds | in the WO's list? |
|---|---|---|---|---|
| 1 | `app/projects/[slug]/page.tsx:35` | `city?.name ?? "Triangle"` | 🔴 **the page `<title>` inside `generateMetadata`** | ❌ **MISSED** |
| 2 | `app/projects/[slug]/page.tsx:93` | `city?.name ?? "the Triangle"` | `AnswerBlock` question (AI-extractable) | ✅ |
| 3 | `components/trust/CaseStudyCard.tsx:40` | `city?.name ?? "the Triangle"` | `<img alt>` text | ✅ |
| 4 | `components/trust/CaseStudyCard.tsx:60` | `city?.name ?? "the Triangle"` | card footer, visible text | ✅ |
| — | `components/trust/CaseStudyCard.tsx:60` | `city?.county ?? "NC"` | card footer county | counted by the WO as the 4th "Triangle" site — it is a **county** fallback, not a region one |
| — | `app/projects/[slug]/page.tsx:93` | `service?.name ?? "Roofing"` | AnswerBlock question | not a region claim |
| — | `components/trust/CaseStudyCard.tsx:47` | `service?.name ?? "Roofing"` | card eyebrow | not a region claim |

**The count 4 is right and the membership is wrong.** The WO double-counted line 60 and
**missed line 35 entirely** — and line 35 is the worst of the four, because it feeds the
`<title>`: the string Google prints in the SERP.

⚖️ *This is the shape the WO itself warns about: the grep gave a number, the number was
carried forward, and nobody re-derived the members. A count is not an inventory.*

### The trigger that re-opens it
**The first real `CASE_STUDIES` entry** — Sean's job photos landing via the §8 intake. That
single array push generates `/projects/<slug>` routes, mounts `CaseStudyCard`, and arms all
four fallbacks at once.

### 🔴 What must be RE-DERIVED at that moment, not inherited
**Whether the case study's city is actually in the Triangle.** Do not inherit "the Triangle"
as a safe default, because **six served cities are not in the Triangle**:

| slug | county | in `GEOGRAPHY.cities` (the 17 Triangle slugs)? |
|---|---|---|
| `burlington` | Alamance County | ❌ |
| `concord` | Cabarrus County | ❌ |
| `fayetteville` | Cumberland County | ❌ |
| `greensboro` | Guilford County | ❌ |
| `sanford` | Lee County | ❌ |
| `wilson` | Wilson County | ❌ |

Verified: `lib/cities.ts` carries **23** city slugs; `lib/site.config.ts` `GEOGRAPHY.cities`
carries **17**; 23 − 6 = 17, and the six above are exactly the difference.

**For those six cities the fallback is a FALSE REGION CLAIM** — it would place a Fayetteville
or Greensboro job "in the Triangle" in the page title, the alt text, and an AI-extractable
answer block.

**The correct action then is a real per-city value, not a better default.** ⚖️ *A generic
fallback is DEGRADED but honest; a specific fallback is a fabrication with a straight face.*
"the Triangle" is specific. Replacing it with a different specific region only moves which
cities it lies about.

**Also re-derive:** `city?.county ?? "NC"` on line 60. All 23 registry cities currently carry a
real `county`, so this fires only when `getCity(cs.citySlug)` returns `undefined` — i.e. a case
study written against a **city slug that is not in the registry**. That is a data-entry error
silently rendering as "NC", not a display fallback. **Treat a fired `?? "NC"` as a bug signal.**

---

## 🔴 A2 — THE SPANISH BEFORE/AFTER PLACE CLAIMS, ZIPPED BY INDEX

**Repo:** mabrey-roofing · **Discovered by item 5 — NOT on the census**

### What is dormant
`app/es/content.ts:425` `ES_BA_COPY` holds three specific job-location claims —
`"North Hills, Raleigh"`, `"Preston, Cary"`, `"Creekside, Garner"` — with matching Spanish alt
text. It renders nothing today because
`ES_BEFORE_AFTER = BEFORE_AFTER.map(...)` and `BEFORE_AFTER` is empty in production
(`REAL_BEFORE_AFTER = []`, and the `SAMPLE_BEFORE_AFTER` spread is stripped when
`NODE_ENV === "production"`).

### The trigger that re-opens it
**The first entry pushed into `REAL_BEFORE_AFTER`** (`lib/gallery.ts:44`).

### 🔴 What must be RE-DERIVED, not inherited
**The city and alt text of every Spanish before/after pair.** The copy is attached to photos
**positionally, by array index** — `BEFORE_AFTER.map((p, i) => ({ ...p, ...ES_BA_COPY[i] }))`.
The moment three real photos land, these three place claims bind to whichever photos happen to
occupy slots 0, 1 and 2. **There is no matching logic — only ordering.**

⚖️ **The frame law: the caption converts the photo into an evidentiary place claim.** A real
photo of a Durham roof captioned "North Hills, Raleigh" is a fabricated job record, and it is
one array push away.

**Already wrong today, before any activation:** entry 1's `city` is `"North Hills, Raleigh"`
while its `alt` reads *"una casa de North Hills en **Durham**, NC"*. North Hills is in Raleigh.
The two fields already disagree, so neither can be inherited as correct.

---

## 🔴 A3 — CONSTRUCTION'S TRUSTBAR WOULD RENDER "0 ★ Google Rated · 0 reviews"

**Repo:** mabrey-construction · **Discovered by item 5 — NOT on the census**

### What is dormant
`components/TrustBar.tsx:56` `LOCKUPS` interpolates
`` `${BUSINESS.rating} ★ Google Rated` `` and `` `${BUSINESS.reviewCount} reviews` `` **with no
empty-guard.** `BUSINESS.rating = 0` and `BUSINESS.reviewCount = 0`.

**It is dormant only because `TrustBar` has ZERO importers in the construction repo.**

### Why this is a trap and not just a bug
`lib/business.ts` states in its header: *"No GBP exists for this entity yet — rating/reviewCount
are 0 and **NOTHING renders them** until the profile is live."* That sentence is **true today
and false about the code** — it is true only because nothing mounts the component.

⚖️ **An honest-absence contract enforced by non-use is not enforced.** The next person to build
a construction page reaches for `TrustBar` — it exists, it is styled, its sibling repo uses it —
and ships "0 ★ Google Rated" onto a live client site, with the file comment still promising the
opposite.

### The trigger that re-opens it
**The first `import { TrustBar }` anywhere in `mabrey-construction/app/`.**

### What must be RE-DERIVED, not inherited
**Whether a Google rating exists at all for the construction entity** — not whether the number
is non-zero. Two distinct states share the value `0`: *no GBP profile exists* and *a profile
exists with no reviews yet*. The lockup must be **omitted entirely** in the first state, and the
guard must be written on GBP existence, never on `rating > 0`.
**Do not inherit roofing's `LOCKUPS`** — it is unguarded too, and safe only because 4.8 / 22 are
real numbers.

---

## A4 — CONSTRUCTION'S CASE-STUDY CARD CARRIES THE SAME TRIANGLE FALLBACK

**Repo:** mabrey-construction

### What is dormant
`components/trust/CaseStudyCard.tsx:40` and `:60` carry the identical
`city?.name ?? "the Triangle"` / `city?.county ?? "NC"` fallbacks. **Doubly dormant:**
`CASE_STUDIES = []` (`lib/trust.ts:167`) *and* `CaseStudyCard` has **zero importers**.

### The trigger
Either condition breaking: a real `CASE_STUDIES` entry, **or** any page importing the card.

### What must be RE-DERIVED
Everything in row A1, independently. ⚖️ **A control from repo A is not a control for repo B** —
this is the census's own instrument-failure #1, restated as a maintenance rule. Do not assume
roofing's city registry, its Triangle membership, or its eventual fix applies here;
construction's `lib/cities.ts` is a different file with a different set.

---

## 🔴 A5 — CONSTRUCTION'S MIDDLEWARE ARMS AT DNS CUTOVER, WITH TWO KNOWN DEFECTS

**Repo:** mabrey-construction · **Discovered by item 6 — NOT on the census**

### What is dormant
The entire middleware — 17 `LEGACY_301` rules and 10 `SPAM_410` patterns (including the 18
service×city doorway posts published 2025-04-03). Its own header: *"The domain currently serves
a WordPress site … **Inert on `*.vercel.app` — safe to ship now.**"*

### The trigger that re-opens it
**Pointing `mabreyconstruction.com` DNS at the Vercel deployment.** Every rule arms
simultaneously, on a domain with a live WordPress history.

### 🔴 What must be RE-DERIVED, not inherited — TWO defects that only matter once armed
1. **`skipTrailingSlashRedirect` is absent from `next.config.ts`.** Roofing sets it and records
   why as a paid lesson: Next's built-in normalizer runs *before* middleware, so a
   trailing-slash spam URL gets a **308 first and only 410s on the second response** — and the
   GSC removal tooling requires a **direct 410 on the first response**. Construction's 410
   patterns accept an optional trailing slash, so they *look* correct in source and are
   unreachable in the first response.
2. **Every 301 is built with `req.nextUrl.clone()` + `url.pathname = dest`** — the exact
   construction roofing proved broken by direct instrumentation: the clone's `.toString()`
   **silently re-appends the original request's trailing slash**, so `/custom-homes/` would 301
   to `/services/custom-homes/` and need a second hop. All 17 rules are affected.

**Re-derive, do not inherit, at cutover:** the actual first-response status code for each of the
18 doorway posts and each WP archive shape, **observed against a real server**, not read from
source. Every verdict in `OS68_ROUTING_SURFACE_MANIFEST.md` for this repo is **source-read
only — nothing was executed.**

⚖️ **Why the reasoning matters here:** both defects are invisible in review because the code
reads correctly and the tests would pass on `*.vercel.app`, where the middleware is inert. The
argument for fixing them exists only in roofing's comments, in another repository.

---

## A6 — THE SAMPLE-SEED GUARDS ON ROOFING (working as designed — recorded so nobody "cleans them up")

**Repo:** mabrey-roofing

### What is dormant
`lib/reviews.ts` `SAMPLE_REVIEWS` (3 entries) and `lib/gallery.ts` `SAMPLE_BEFORE_AFTER`
(3 pairs). Both are excluded from every production build by construction:
```js
...(process.env.NODE_ENV !== "production" ? SAMPLE_REVIEWS : [])
```
Every sample also renders its own tell — `date: "SAMPLE"` and `SAMPLE —` caption prefixes.

### Why it is in this file at all
**This is the correct pattern, and it is fragile to well-intentioned edits.** Anyone
consolidating "dead placeholder data" would delete the guard along with the seeds, or promote
the seeds into `REAL_REVIEWS` to "fix the empty widget."

### The trigger
Sean's §8 GBP intake landing. **Then:** put real texts in `REAL_REVIEWS` and **delete the
samples** — the file's own instruction.

### What must be RE-DERIVED, not inherited
**`RATING_DISTRIBUTION` (`lib/reviews.ts:69`) is empty and must be derived from the real review
set** — never seeded to match a headline rating. And the aggregate stays read from
`BUSINESS.rating` / `BUSINESS.reviewCount`; **never restate the numbers in a comment.** That
exact mistake is recorded in the file: a comment said 4.4 / 16 for days after the real figure
became 4.8 / 22.

---

## A7 — `STORM_MODE = false` (both repos)

**What is dormant:** `lib/site.config.ts` `STORM_MODE` — when true, the alert bar intensifies
and the home hero leads on the active-storm message.
**Trigger:** an active Triangle storm event; Joseph flips it.
**Re-derive, do not inherit:** that a storm is *currently* active. This is a manual flag with no
expiry and no data source behind it — ⚖️ **a manual flip that is never flipped back becomes a
standing false urgency claim.** Set a flip-back condition at the same moment it is turned on.

---

## A8 — THE ANALYTICS SLOTS ARE PARTLY ARMED (roofing) — verify before assuming "demo mode"

**What is dormant:** `lib/site.config.ts` `ANALYTICS` — `ga4Id: ""`, `gtmId: ""`,
`gscVerification: ""`. Empty string = nothing loads.
🔴 **`metaPixelId` is NOT empty — it is `"2941769702833486"`. The Meta pixel is LIVE.** Do not
read this block as uniformly dormant.
**Trigger:** dropping a real value into any empty slot.
**Re-derive, do not inherit:** `metaPixelId` is the **single source of truth for two consumers**
— it gates both the `<script>` in `components/Analytics.tsx` **and** the CSP widening in
`lib/security.ts`. The file's own warning: gating those on two different values drifts silently
in the worst direction — *pixel shipped, CSP not widened, every `fbq` call killed by our own
policy.* One value, both consumers. **Construction's `ANALYTICS` has three empty slots and no
pixel id — genuinely dormant.**

---

## A9 — `roofsInstalled: "500+"` (roofing) — carried as `BLOCKED-FACT`

**What is dormant:** nothing — **it renders.** It is listed here because its *justification* is
dormant. WO §1: *UNSOURCED, do not render newly, do not extend.*
**Trigger:** any surface that would newly render or extend it, or a request to raise the number.
**Re-derive, do not inherit:** the in-file comment self-declares the gap —
*"UNVERIFIED: could not tell … whether 'completed roofs' is a full-replacement-only count or
also includes repairs."* The per-city inputs are CRM-sourced (production jobs table, queried
2026-08-27, `wo/OS65_COUNT_BASIS.json`, confirmed present), but **the unit is undefined**, so
the aggregate is unfalsifiable as stated. Define the unit before the number moves.
🔴 **`yearsInBusiness` is CUT and must never be restored in any form** — a duration is a
since-YEAR claim wearing different clothes.

---

## A10 — THE EMPTY-BY-DESIGN ARRAYS (both repos) — the real-or-absent inventory

Every one is `[]` **by design**, carries a `scan-ok: empty-by-design` marker, and its consumers
are empty-guarded so the sections null-vanish.

| array | roofing | construction | trigger | re-derive, do not inherit |
|---|---|---|---|---|
| `CASE_STUDIES` | `lib/trust.ts:171` | `lib/trust.ts:167` | real completed jobs from Sean | city Triangle-membership (A1/A4); real subdivision, date, roof system, permit jurisdiction; **photos must be the job's real photos — never stock or AI framed as completed work** |
| `VIDEO_TESTIMONIALS` | `lib/trust.ts:196` | `lib/trust.ts:192` | real customer video | consent + that the speaker is a real customer |
| `GALLERY` | `lib/gallery.ts:61` | `lib/gallery.ts:39` | real project photos | per-photo city and service — the frame law applies to every caption |
| `REAL_REVIEWS` | `lib/reviews.ts:59` | `lib/reviews.ts:28` | §8 GBP intake | the distribution (A6); construction has **no GBP at all** |
| `REAL_BEFORE_AFTER` | `lib/gallery.ts:44` | `lib/gallery.ts:22` | real pairs | 🔴 the Spanish positional zip (A2) |
| `SERVICE_CITY_COMBOS` | *populated* | `lib/locations.ts:157` (empty) | the construction locations WO | **anti-doorway**: the marker says *"no location pages until the locations WO"*. Roofing gates indexability on `comboIndexable(c) = c.jobs.length >= 2` — **derive it the same way; never hand-flip a combo to indexable** |

---

## A11 — `/commercial-roofing` IS ARCHIVED IN-TREE (roofing)

**What is dormant:** the page renders at its URL but is `noindex: true`, **removed from the
sitemap and delinked from all nav** (Joseph, 2026-07-08 — commercial roofing dropped from the
live site). Source kept in-tree deliberately so it can be restored.
**Trigger:** re-linking it in nav, or re-adding it to `lib/sitemap-registry.ts`.
**Re-derive, do not inherit:** that Mabrey still wants commercial work, and that
`lib/commercial.ts`'s claims (`COMMERCIAL_STATS`, `COMMERCIAL_DEPTH`, system lifespans) are
current. ⚖️ **The `noindex` here is a business decision, not a technical one** — its three
markers (noindex, sitemap removal, nav delinking) must be lifted together or the page becomes
reachable-but-orphaned.

---

## SUMMARY — 11 rows

| row | repo | dormant thing | trigger | on the census? |
|---|---|---|---|---|
| A1 | roofing | `?? "the Triangle"` ×4 (**membership corrected**) | first `CASE_STUDIES` entry | ✅ X2 (with 2 errors) |
| A2 | roofing | Spanish before/after place claims, index-zipped | first `REAL_BEFORE_AFTER` entry | ❌ new |
| A3 | construction | `TrustBar` "0 ★ Google Rated" | first `TrustBar` import | ❌ new |
| A4 | construction | `CaseStudyCard` Triangle fallback | `CASE_STUDIES` entry **or** any import | ❌ new |
| A5 | construction | middleware: 2-hop 410s + slash-re-append 301s | **DNS cutover** | ❌ new |
| A6 | roofing | sample seeds + their production guard | §8 GBP intake | ❌ new |
| A7 | both | `STORM_MODE` | active storm | ❌ new |
| A8 | roofing | analytics slots — **pixel already live** | real IDs | ❌ new |
| A9 | roofing | `roofsInstalled: "500+"` unit undefined | any new render / raise | ✅ WO §1 |
| A10 | both | 6 empty-by-design arrays | real data arriving | partial |
| A11 | roofing | `/commercial-roofing` archived in-tree | re-link or re-add to sitemap | ❌ new |

**9 of 11 rows are new.** ⚖️ *The census asked what exists; this file asks what happens next,
and those are different questions with different blind spots.*
