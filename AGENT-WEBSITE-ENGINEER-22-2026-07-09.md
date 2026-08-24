# HANDOFF — King Maker website lane → **Website Engineer 22 (WE22)**

**From:** WE21 · **To:** WE22 · **Date:** 2026-07-09 (~11:45 PM ET) · **Lineage:** WE4→…→WE18→WE19→WE20→**WE21**→you
**Blackboard handle:** `website-engineer` · **You own:** the **Mabrey Roofing site** (`mabrey-roofing/` — King Maker's FIRST PAYING CLIENT, **now LIVE in production on mabreyroofing.com**) + the **KM firm site** (`king-maker-site/` → kingmakerseo.com) + **Summit & Oak** (`summit-oak-roofing/`, the blessed density-era reference) + the **component library** (`vault/component-library/`) + the **launch-builder / WO workflow** + the **skill/gate spine** + the **design doctrine + PLAYBOOK** + the **audit-page engine** + GTM/pricing + coordination with vault-agent / n8n / meta-ads / cos.

> ⭐ **YOUR BASE CORPUS — these stand VERBATIM; THIS file is the DELTA on top. Read in order:**
> 1. **`AGENT-WEBSITE-ENGINEER-21-2026-07-07.md`** (WE20→WE21 — the full §4/§5/§8 design-forge corpus + client facts; **still on disk, not overwritten**). Its §2/§7 "mabreyroofing.com = OLD WordPress / never deployed / DO NOT TOUCH DNS" is now **SUPERSEDED — see §4 STRIKES below.**
> 2. `AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` (vault-agent OS16 — **AUTHORITATIVE on Mabrey client facts / strategy** on any conflict).
> 3. The WE17/WE18/WE19 chain (`-17`, `-17-SYNC`, `-18`, `-20-07-06`) — the older §4/§5/§8 corpus.
> ⭐⭐ **DESIGN LAW:** `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md`. **NUMBERS/CLIENT-FACING:** `~/.claude/skills/km-engine/MODEL.md`.
> **Compound, don't re-derive.** §4/§5/§8 below carry the corpus forward + add this arc; strikes are dated, never silent.

---

## 0. ⭐ ON ARRIVAL — ORIENT, THEN ASK (never auto-start)

1. **READ loop:** reread THIS file in an ultrathink loop until a pass yields no new info (min 3). Name what each pass ADDED.
2. **Preflight:** fire `/kmwe` (gates + doctrine + PLAYBOOK). *(Note: `mabrey-roofing/` is NOT a verify-gate-guarded worktree — gates here are discipline, run them anyway.)*
3. **RE-VERIFY these volatile claims (dated 2026-07-09 ~23:45) by RUNNING the commands — a handoff fact is a LEAD, not a truth:**
   ```bash
   git -C "C:/Users/josep/Claude Gravity/mabrey-roofing" log --oneline -3   # expect tip e6ede29; remote EMPTY; status CLEAN
   # 🔴 DO NOT trust a raw curl of mabreyroofing.com FROM THIS MACHINE — its resolver FLAPS old/new (see §5 NEW-1).
   #    Verify via Google's resolver (what Google's crawler uses) + forced-to-Vercel:
   curl -s "https://dns.google/resolve?name=mabreyroofing.com&type=A" | grep -oE '"data":"[0-9.]+"'   # expect 76.76.21.21
   curl -s --resolve mabreyroofing.com:443:76.76.21.21 -o /dev/null -w '%{http_code}' https://mabreyroofing.com/            # 200 (new site)
   curl -s --resolve mabreyroofing.com:443:76.76.21.21 -o /dev/null -w '%{http_code}' https://mabreyroofing.com/web-casino/  # 404 (spam gone)
   curl -s "https://dns.google/resolve?name=mabreyroofing.com&type=MX" | grep -oi google   # email safe
   node "C:/Users/josep/Claude Gravity/blackboard/bb.mjs" read --agent website-engineer   # was EMPTY at handoff
   ```
4. **Mailbox:** empty at handoff (`website-engineer: no unhandled mail`). Ack ONLY what you newly handle. **Never touch `human`'s mailbox.**
5. **STOP — do NOT auto-start.** Check in with Joseph: one line "where we left off" + a TLDR of §3 candidate tasks, ask which.

---

## 1. What this is

King Maker sells done-for-you authority contractor sites + organic SEO. **Mabrey Roofing (Durham NC; Sean Mabrey, veteran-owned) is the FIRST PAYING client** — $497/mo CMO retainer (Joseph = CMO) + rev-share; also THE case-study asset, so honest counts + real data + receipts are part of the product.

**WE21's arc (this session) = two halves.** (A) A long live design/content forge with Joseph (rapid/edit/standby mode): the invisible-text sweep, red-treatment approval, extensive content passes (blessed cards, bullets, gapless grids site-wide, honesty/empty-guard fixes, storm-template transplant, commercial-roofing archive), S&O section transplants onto home, blessed home FAQ, keyword-calibrated retitles, quiz-into-hero site-wide, contact-form-into-hero — all committed + deployed. (B) **The big one: discovered Sean's OLD site was catastrophically HACKED, ran full forensics, then EXECUTED the DNS cutover** — reclaimed the domain, replaced the hacked WordPress with the clean rebuild **LIVE on mabreyroofing.com**, preserved email, and started the Google cleanup. **The site is now in production on the real domain.**

---

## 2. ⭐⭐ CURRENT STATE (volatile — captured by RUNNING commands, 2026-07-09 ~23:45)

### A. 🎉 THE DOMAIN IS LIVE — the cutover happened this session
- **`mabreyroofing.com` now serves the NEW site** (Vercel, project `mabrey-roofing`), NOT the old hacked WordPress. This **inverts** WE20's locks (see §4 STRIKES).
- **DNS is now Sean's, at GoDaddy** (nameservers `ns41/ns42.domaincontrol.com`), moved off the vendor's `nwpro3.fcomet.com`. Records: **A `@` → `76.76.21.21`** (Vercel) · **CNAME `www` → `cname.vercel-dns.com`** · **MX → `smtp.google.com`** (Google Workspace — PRESERVED, email safe) · **TXT SPF `v=spf1 include:_spf.google.com ~all`** (added) · **TXT `_dmarc` `v=DMARC1; p=none;`** (softened from GoDaddy's auto p=quarantine).
- **In-session live verification (when the local resolver was on the new IP):** homepage 200 (new site markers "EstimateQuiz/Get Your Free Estimate/Roofing Built"), `/?p=1`→410, `/web-casino/`→404, real pages 200, `www`→200, MX→Google. **Confirmed correct.**
- **Domain attached to the Vercel project** (apex primary; www redirects to apex). Canonical = apex `https://mabreyroofing.com` (SITE_URL in `lib/site.config.ts`).

### B. Repo / working-tree three-way
| | State |
|---|---|
| **`mabrey-roofing/`** | branch `master` · tip **`e6ede29`** · working tree **CLEAN (0 uncommitted)** · **NO GIT REMOTE** 🔴 (recovery exposure persists — `backup-all.mjs` now snapshots it per `_client-sites-snapshot`, but no git remote) |
| **DEPLOYED** | **PRODUCTION on `mabreyroofing.com`** via Vercel project `mabrey-roofing` (account `josephspells-2634`). Alias also `mabrey-roofing.vercel.app`. |
| `summit-oak-roofing/` | untouched this arc; no remote |

**Recent commits (all local-only):** `e6ede29` post-cutover legacy-URL middleware · `03dffb2` quiz-into-hero default aside · `bb82ec5` keyword retitles · `2dc9ce5` blessed home FAQ · `23d468a` S&O cost-bento/before-after/reviews transplant · `ab70ea4` contact form into hero. (Earlier in the session, before `ab70ea4`: the invisible-text sweep, red-treatment, and content passes — all committed; `git log` has the full record.)

### C. Google cleanup state (in progress)
- **GSC domain property VERIFIED** under Joseph's Google account. **Manual Actions = "No issues detected" · Security Issues = "No issues detected"** → **CONFIRMED no penalty** (caught pre-hammer).
- **Sitemap submitted:** `https://mabreyroofing.com/sitemap.xml` (134 clean URLs, 0 spam). *(Two old dead WP sitemaps still listed as "Couldn't fetch" — harmless, can be removed.)*
- **10 top pages Request-Indexed** (piloted Joseph's browser via `claude-in-chrome`): `/`, `/services`, `/services/roof-replacement`, `/services/roof-repair`, `/services/metal-roofing`, `/storm-damage`, `/roofing-cost`, `/contact`, `/locations/durham-nc`, `/locations/raleigh-nc`. (Daily cap ~10 hit.)
- **Nightly reminder scheduled:** task `mabrey-indexing-reminder` (cron `0 23 * * *`, ~11 PM ET) fires the next ~10-URL batch list through ~July 13. 🔴 **CANCEL it after July 13 or when all valuable pages are requested** (`list_scheduled_tasks` → the reminder's SKILL.md self-documents the stop condition).

### D. Gate status
`tsc` clean · `build` **141/141** · axe/gap/doorway/reachability were green earlier this session (rendered surfaces unchanged by the middleware commit; `.axe-multi.cjs` + `.we21-gapaudit.cjs` were run). Middleware verified: all 134 sitemap URLs still 200; spam shapes 410/404.

---

## 3. ⭐ OPEN LOOPS (by type — each with a Definition of Done)

### 🔴 1. AWAITING USER + OTHER-AGENT — the lead pipeline (leads currently EVAPORATE)
`LEAD_WEBHOOK_URL` is **UNSET on Vercel** → the contact form + quiz validate, bot-check, return success, and **forward NOTHING.** A ranked site with dead forms is a $0 site. **Joseph is wiring lead-routing (Slack/Telegram, "another agent") separately** — COORDINATE, don't duplicate. **DoD:** `LEAD_WEBHOOK_URL` + `LEAD_WEBHOOK_SECRET` set in Vercel → e2e test submission arrives at the destination. (Meta CAPI server-side is already built + env-gated; browser Meta Pixel is a small build pending the Pixel ID.)

### 🟡 2. IN-FLIGHT — nightly Google-indexing batches (~3 more nights)
The reminder fires ~11 PM ET; each night push the next ~10 URLs (next batch: `/locations/cary-nc`, `chapel-hill-nc`, `wake-forest-nc`, `apex-nc`, `holly-springs-nc` + `/services/gutters`, `emergency-roof-repair`, `roof-inspection` + `/gallery`, `/financing`). Joseph does them or asks you to pilot his browser (see §6 GSC-piloting playbook). **DoD:** all commercially-valuable pages requested; then **cancel the `mabrey-indexing-reminder` task.** (The sitemap auto-indexes the long tail regardless.)

### 🟡 3. APPROVED-BUT-NOT-DONE — disavow upload (defensive)
`king_maker_outbound/mabrey-disavow-2026-07-09.txt` (52 toxic casino/PBN/steroid-spam domains) is ready to upload at GSC → Disavow tool. **Not urgent** (no manual action; links point at 410'd pages). **DoD:** uploaded, or explicitly deferred.

### 🟡 4. AWAITING USER — the security incident report (if Joseph emails the vendor)
`king_maker_outbound/mabrey-security-incident-report-2026-07-09.md` is **SEND-READY** (vendor-facing, factual, no internal negligence-rating). Blockers before send: **fill "Prepared by: ___"** + note that **post-cutover the live-domain evidence no longer reproduces** (evidence persists on Monahan's fcomet server + Google's index; the report's `curl` evidence-log commands now hit the new site). Joseph already texted Monahan about the breach. **DoD:** Joseph's call whether/when to send.

### 🟡 5. AWAITING USER (Sean, via Joseph) — the real content intake (carried from WE20 §8)
Still pending: real completed-jobs per town · the **16 real GBP review texts** (→ `REAL_REVIEWS` in `lib/reviews.ts`) · cert/manufacturer standing (the **homepage logo marquee** is still deployed AS-IS pending this — BBB/Angi/GAF/NAHB/NRCA/James Hardie, an unverified-affiliation claim in image form; **swap to real-or-absent when Sean confirms**) · legalName/license#/years · real photos · tracking IDs (**GA4** → `ANALYTICS.ga4Id`; **Meta Pixel** from Mabrey's Business Manager).

### 🟡 6. Carried code/quality debt (from WE21 §3, still open unless noted)
- Hero subhead `line-clamp-3` still truncates mid-sentence on long-intro pages — no verdict.
- `BUSINESS.stats` — check `roofsInstalled` / `yearsInBusiness` against Sean's real numbers (some were softened to "500+"/"15+" this arc).
- `PageHero.tsx` dead-file cleanup; original material pages' Raleigh→Durham `h1` residue (mostly cleaned this arc — re-verify).
- Perf: home page weight ~34MB, hero is a 2.3MB PNG (LCP element on ~36 routes) → **WebP/AVIF pass is the biggest launch-quality lever**; `/favicon.ico` 404 (svg exists).

### 🟢 7. Housekeeping
- Vault inbox has pending files (this handoff adds one) → "ingest inbox".
- cg-main current-state STALE (70+ new sessions).

---

## 4. Locked decisions — CARRIED + STRIKES + NEW

### 🔴 STRIKES this arc (superseded — recorded, not silently rewritten)
- ~~"mabreyroofing.com → Sean's OLD WordPress (200). DO NOT TOUCH DNS."~~ (WE20 §2/§7/§9) → **SUPERSEDED 2026-07-09:** the DNS cutover was executed on Joseph's explicit GO. The domain is Sean's (GoDaddy), now points at Vercel, and serves the NEW site. **The new rule: DNS is a live production lever you now own — but NEVER touch the MX records (Google Workspace email) when changing DNS, and re-verify via DoH/forced-resolve, not a raw curl from this machine.**
- ~~"MABREY HAS NEVER BEEN DEPLOYED / build-phase deploys go to *.vercel.app ONLY."~~ (WE20 §7) → **SUPERSEDED 2026-07-09:** deployed to PRODUCTION on the real domain. Deploy via `npx vercel@latest deploy --prod --yes` still ships to prod (now the real domain via the attached custom domain).
- WE21 §3 open loops **RESOLVED this arc:** the invisible-text sweep (done), the red-treatment verdict (**Joseph APPROVED** the red treatment), most Phase-A content passes (done).

### 🆕 NEW LOCKS (WE21 arc)
1. ⭐⭐ **THE SITE IS LIVE IN PRODUCTION.** Every edit now hits the real client domain the moment you `deploy --prod`. Treat prod deploys with full-precision care; **still only on Joseph's explicit GO.**
2. ⭐ **Sean CONTROLS the domain** (GoDaddy account "SM"). The vendor (Raleigh SEO Company / **Brendan Monahan**) never owned the registration — only ran the DNS (fcomet NS) + the hacked hosting. **No hostage situation.** If domain questions arise, Sean's GoDaddy is the control point.
3. ⭐ **The hack was ISOLATED, not portfolio-wide.** Portfolio scan: 231 candidates → 31 confirmed RSC clients, **only mabrey hacked** (3 deeply-vulnerable: mabrey + theflatroofspecialists.com + a-1servicegroup.com). **Never frame it to anyone as "the vendor got everyone hacked" — false + collapses under scrutiny.** The true, defensible line: "Sean's site specifically was popped and sat unnoticed for 15 weeks by the company paid to watch it." Negligence ≈ **8.5/10** (breach ~5, the 15-week detection failure ~9).
4. ⭐ **No Google penalty (GSC-confirmed).** Caught pre-hammer. The domain's real asset = the **GBP** (portable — reviews/rankings survive a domain change) + brand match; **domain "age" is NOT a ranking factor** (debunked). This low domain-value = leverage, not weakness.
5. ⭐ **The legacy-URL middleware is load-bearing** (`middleware.ts`, `e6ede29`): 410 for WP spam shapes (`/?p=<id>`, `/tag`, `/author`, `/category`, `/blog/page/N`, `/wp-*`, `/feed`) + 301 for real old flat pages (`/roof-replacement/`→`/services/roof-replacement`, `/storm-damage-restoration/`→`/storm-damage`, etc.). The matcher is broad (excludes `/api`, `_next`, dotted files, `/sitemap.xml`, `/robots.txt`). **Every pattern was checked against the route list — none collide with a real page (all 134 sitemap URLs verified 200).** Don't break this; it's what de-indexes the 37k spam.
6. ⭐ **Request-Indexing is a ONE-TIME accelerant** (~10/day cap; re-requesting an indexed page does nothing). **The sitemap is the permanent auto-indexer.** A forever daily-schedule is pointless for a static site — the nightly reminder is a finite ~3-night push, then cancel it.

### Carried forward (still LIVE — full verbatim text in WE21's file §4; the load-bearing ones):
- ⭐⭐ **Two registers never crossed:** S&O = red-glow-on-charcoal; Mabrey = blue-brand-on-white, scarce red, **glow DEAD for this light register** (WE20). **FIRM SITE (kingmakerseo.com) is EXEMPT** — blue/white readable-first.
- ⭐ **ONE UNIVERSAL HERO** — `components/Hero.tsx`, fixed-height (`h-[86vh] min-h-[640px]`) so the photo crop is byte-identical across pages; `aside` prop DEFAULTS to `<EstimateQuiz/>` (WE21: quiz-into-hero site-wide); contact overrides with `<ContactForm/>`; `/es` passes `aside={null}`. Never make it `min-h`.
- ⭐ **OPUS/FABLE SCOPES · lower-tier EXECUTES · top-tier GATES.** Judgment/taste stays top-tier; mechanical breadth delegates. **A swarm is WRONG for a uniform transform over shared components** (collisions + judgment drift) — one deterministic executor, fan out only verification.
- ⭐ **`.so-card` is the card signature · card-title underline (`height=2`) = BLUE · section-H2 underline (no height) = RED · hardcoded counts BANNED (derive from arrays) · materials catalog deliberately complete.** (WE20 §4 — all stand.)
- ⭐ **Governing-brief LOCKS (WE20 §4, verbatim-authoritative):** ~95% pure roofing · 17 location pages built · GC work = one contained "Other Services" section · location pages ship WITHOUT proof modules · one Durham office (never imply Raleigh office) · client numbers = `MODEL.md` (never master-plan §8) · AI-GEO per playbook (SSR + `.seo-answer` + no llms.txt) · **NEVER fabricate reviews/jobs/certs (FTC + client's real name).**
- ⭐ **DO-NOT list (WE20 §9, minus the struck DNS item):** no fabricated trust signals · no implied Raleigh office · no S&O identity in metadata · never quote master-plan §8 numbers · no GC content beyond Other-Services · **don't edit `components/` to REBRAND** (content→`lib/`; structural/design work on shells is fine) · don't re-explain settled doctrine to Joseph · **no deploy without GO, no "done" without gates run.**

---

## 5. Failures & dead-ends — CARRIED (WE21 §5 verbatim on disk) + NEW THIS ARC

### 🆕 NEW THIS ARC (WE21) — the lessons that did not exist at the last handoff
1. 🔴 **THIS MACHINE'S DNS RESOLVER FLAPS old/new post-cutover.** Hours after the cutover, a raw `curl https://mabreyroofing.com/` from this box still intermittently hits the OLD fcomet server (casino 200), while Google's resolver + Cloudflare consistently return `76.76.21.21` (Vercel). **A raw local curl is NOT ground truth.** Verify via `dns.google/resolve` A-record (what Google's crawler sees) and `curl --resolve mabreyroofing.com:443:76.76.21.21`. Global propagation was confirmed complete; the flap is a local-cache artifact.
2. 🔴 **I CLAIMED RSC's OWN SITE WAS "CO-COMPROMISED," THEN RETRACTED IT.** The first pass logged a `200` on `raleighseocompany.org/web-casino` without inspecting the body — it was a redirect-to-homepage, not a casino page. Re-verification (5 independent ways: 21 WP posts, zero casino in Google index, redirect-to-home, spam-score 2, clean crawl) proved it CLEAN. **Lesson: inspect the response BODY, not the status code, before asserting a hack. Joseph pushed "double-check again" twice — re-verify, don't defend; the correction was the win.**
3. 🔴 **DNS cutover mechanics (the email trap).** Switching nameservers = a **blank DNS zone at the new NS** → **you MUST re-create the MX or email dies.** GoDaddy auto-injects a *stricter* DMARC (`p=quarantine`, its own `rua`) → soften to `p=none` to match what worked. GoDaddy `"genericErrorMessage"` on a nameserver change = transient/UI-glitch or a lock/DNSSEC (DNSSEC was OFF here) → retry in incognito / turn off the domain lock. Order: switch NS → add MX FIRST → then SPF/DMARC/A/CNAME.
4. 🔴 **GSC browser-automation gotchas (piloting via `claude-in-chrome`).** (a) URL-inspection **deep links 404** — use the dashboard "Inspect any URL" bar. (b) **Screenshots time out** (GSC's renderer freezes during an inspection fetch) → drive by `read_page filter:interactive` + **element refs**, not coordinates/screenshots. (c) **Dismiss-dialog + type-URL in the SAME batch swallows the URL** (dialog close-animation eats the click) → dismiss, `wait 3s`, THEN type. (d) The inspect bar: `left_click [720,31]` → `triple_click [720,31]` → `type URL` → `Return` (NOT `ctrl+a` — it selects the whole page). (e) Request-Indexing runs a ~40-60s live test, then an "Indexing requested" dialog. (f) Hard **~10/day quota** per property.
5. ⭐ **GSC sitemap trap during propagation.** The OLD WP `sitemap.xml` (23 `wp-sitemap-posts-*` entries → the 37k spam) vs the NEW clean 134-URL one. Confirm the domain serves the **clean** sitemap **via Google's resolver** (`curl --resolve ...:76.76.21.21`) before trusting a submission — a raw local fetch may return the old spam sitemap while the resolver's flapped.
6. ⭐ **A scheduled cloud/headless agent CANNOT pilot the local browser** (needs the live logged-in session). For any browser-dependent recurring task, a **reminder** is the most you can automate; the human (or an interactive pilot) does the click-work.

### Carried from WE20/WE19 (§5, verbatim on disk in WE21's file — the load-bearing ones):
- ⭐⭐ **soul_2 GARBLES fake text/logos into images ~20-100%** → use `nano_banana_pro` for hero/text-adjacent gens; **vision-QA every gen.**
- ⭐ **A HAND-ENUMERATED FILE LIST is how you miss files** → sweep by PATTERN, grep-verify 0 residual. **`axe: 0 violations` ≠ no invisible text** (white-on-white = `incomplete`, not a violation) and **≠ CSS loaded** (unstyled pages pass axe).
- ⭐ **The `scripts/` contamination class** on a clone (S&O constants in gate scripts → vacuous "0-target" passes) — grep `scripts/` too; a 0-target gate pass IS a failure.
- ⭐ **A backgrounded `next start` inside one Bash call is torn down when it returns** → `nohup … &` or separate `run_in_background`, and assert a styled render before trusting a capture. **Empty-guard divide-by-zero** when you empty a consumed array (`REVIEWS[i % REVIEWS.length]`). **The claim must match the tool calls** (WE20 claimed 3 vision agents, dispatched 1).
- ⭐ **Tailwind opacity modifiers compile to `oklab()` not `rgb()`** — verification regexes must account for it.

---

## 6. Tooling gotchas (delta on base §6 — those stand)

- **⭐ GSC-piloting playbook (`claude-in-chrome`)** — the working loop for the nightly indexing batches:
  1. `list_connected_browsers` (extension must be connected) → `tabs_context_mcp {createIfEmpty:true}` for your own tab.
  2. Navigate to `https://search.google.com/search-console?resource_id=sc-domain%3Amabreyroofing.com`.
  3. Per URL: `left_click [720,31]` (inspect bar) → `triple_click [720,31]` → `type <full url>` → `key Return` → `wait 10` → `read_page filter:interactive` (get the request-indexing button ref) → `left_click <ref>` → `wait ~50s` (5×10) → `read_page` (confirm "Indexing requested" dialog) → dismiss its button ref → `wait 3` → next URL. **Use read_page + refs, NOT screenshots (they hang).**
- **Deploy:** `npx vercel@latest deploy --prod --yes` (account `josephspells-2634`, project `mabrey-roofing`) → now ships to **mabreyroofing.com**. CLI v54 prints a JSON-fragment tail that looks broken — verify by curl on content markers.
- **Build vs dev:** `build` fights dev over `.next`; kill `:3200` first. **Dev-cache corruption:** `next build` then `next dev` on the same `.next` breaks the dynamic-route manifest (statics 200, `[param]` routes 404) → `rm -rf .next` between a build and a dev restart. *(This was the "404 on every page but home" red herring — a dev-cache artifact, prod always fine.)*
- **Backups:** `node backup-all.mjs` now includes `_client-sites-snapshot` for mabrey-roofing + summit-oak (added this arc) — but still **no git remote** on either.
- Reusable probe scripts (repo root, gitignored `.*.cjs`): the WE20 sweep scripts + WE21 added `.we21-gapaudit.cjs`, `.axe-multi.cjs` (reduced-motion axe), `.we21-live-shot.cjs`, and DNS/HTTP probes were run inline via Bash+DoH.

---

## 7. Deploy + verify (fenced)

```bash
# THE SITE IS LIVE ON mabreyroofing.com. Deploys hit production. Only on Joseph's GO.
# Gate stack (run from mabrey-roofing/, dev killed first):
npm run typecheck
npm run build                                   # expect 141/141
nohup npx next start -p 3210 >/dev/null 2>&1 &   # prod server for the gates
npm run doorway-check                            # <40% pairwise — BLOCKING
npm run reachability-check                       # no-orphan BFS
node .axe-multi.cjs                              # a11y (reduced-motion; reports violations — check incomplete too)
node .we21-gapaudit.cjs                          # gapless-grid audit
# then: kill :3210, restart dev :3200 if Joseph wants the canvas
npx vercel@latest deploy --prod --yes            # ships to mabreyroofing.com — ONLY on GO
# Post-deploy verify (NOT via raw local curl — resolver flaps):
curl -s --resolve mabreyroofing.com:443:76.76.21.21 -o /dev/null -w '%{http_code}' https://mabreyroofing.com/   # 200
```

---

## 8. ⭐ Taste & calibration ledger — CARRIED (WE21 §8 verbatim on disk) + NEW

### 🆕 NEW THIS ARC (WE21)
- ⭐⭐ **On a FACTUAL claim, he pushes "double-check again" — and he's usually right to.** The RSC-hack correction came from him insisting on re-verification twice. **Re-verify, don't defend; own the correction cleanly; separate PROVEN from INFERRED explicitly.** He rewards the rigor, not the confidence.
- ⭐⭐ **Client-comms framing must be HONEST + defensible, never oversold.** For the Sean update he floated "minor speed bump" — I pushed back: don't undersell (it shortchanges KM's value) AND don't overclaim ("vendor got everyone hacked" is false). The bar: **serious problem → caught in time → minimal damage → fixed**, every clause backed by evidence. He wants the KM-value framing that survives scrutiny.
- ⭐ **He wants the strategic sequencing thought through** (e.g., don't confront the vendor before securing the domain — even though he'd already texted). Give the sequencing logic, then adapt to what already happened.
- ⭐ **"never use a Sonnet 5 agent for this work" (taste/judgment).** This arc he ran mostly Fable 5 + Opus and was explicit: judgment/taste = top tier, mechanical only = lower. Honors WE20's split; **do not down-regulate judgment work.**
- ⭐ **He values you PILOTING his browser** (`claude-in-chrome`) for tedious click-work (the 10 GSC requests). Offer it for browser-bound grind; drive by refs, adapt when the tool fights you, report honestly what actually happened.
- ⭐ **Late-night worker (1-3 AM); casual warm register ("my nigga", "dog") when things land.** Match the energy on the wins; stay precise on the work.
- ⭐ **"continuous standby / rapid / edit mode" batches** — he drops multiple edits, wants first-workable + fast + batch-verify every 3-5. (Reinforces WE20.)

### Carried forward (WE21 §8 — full verbatim on disk; the load-bearing ones):
- ⭐⭐ **Density-Era doctrine is the operating contract WHATEVER model runs:** maximal-draft 90-110% over-poured, empty space is a bug, first-workable on edits (30-60s), NO option surveys, batch-verify every 3-5, **show heavy — only Joseph trims.**
- ⭐⭐ **He reverses treatments freely + iterates on localhost as a live canvas** → show it maximally, revert instantly, never sunk-cost a treatment. Directional-% instructions ("300% denser", "half the motion") are literal — honor the exact factor.
- ⭐ **Calibration:** caveman TLDR bullets · moderate emoji (✅/❌/👍/⚠️/🔴), **NO exclamation points** · "ultrathink" = his depth keyword · deploy ONLY on explicit GO · **fix-format = hyperlink + Was/Fix every time** · never re-explain settled doctrine · he model-switches constantly — **never inflate the model you run on** · "deploy an agent" often = **dispatch a sub-agent**, confirm before any prod deploy · he pastes a screenshot + "this section" and expects you to grep the component from the visible copy · when he asks "what page?" name the shared component + every surface (blast radius).
- ⭐ **Floors that never move:** a11y (axe 0 serious, reduced-motion) · honest counts · real-or-absent trust signals (FTC) · NC insurance-copy compliance · `.seo-answer`/heading extraction · money-copy readability.

---

## 9. Coordination

| Agent | Contract |
|---|---|
| `human` (Joseph) | Router · deploy gate · **final eyeball** · offer numbers · outreach · **now: wiring lead-routing (Slack/Telegram) with a separate agent** — coordinate on `LEAD_WEBHOOK_URL`, don't duplicate. **Never touch his mailbox.** |
| `vault-agent` (OS16) | Authored the governing Mabrey brief; owns vault + fleet. Route cross-lane questions here. |
| `n8n-claude-architect-1` | The lead-webhook receiver likely lands here (or Slack/Telegram bridge). Coordinate on the destination. |
| `cyber-security-specialist-1` | Security layers (had 1 unread on the board — not yours). |

**Mailbox at handoff: EMPTY for `website-engineer`.** Other agents have unread mail — **not yours; leave it.**

---

## 10. Knowledge artifacts & file map (READ-ORDER · authority · staleness)

**Read FIRST:** this file → `AGENT-WEBSITE-ENGINEER-21-2026-07-07.md` (full §4/§5/§8 base corpus) → `AGENT-WEBSITE-ENGINEER-20-2026-07-07.md` (**AUTHORITATIVE on client facts**) → `KINGMAKER_DESIGN_DOCTRINE.md` + `vault/component-library/PLAYBOOK.md` → `~/.claude/skills/km-engine/MODEL.md` (**AUTHORITATIVE on any client number**).

**This arc's deliverables (`king_maker_outbound/`, all dated 2026-07-09):**
| File | What | Note |
|---|---|---|
| `mabrey-security-incident-report-2026-07-09.md` | **SEND-READY** vendor-facing hack report | fill "Prepared by"; post-cutover evidence no longer reproduces live |
| `mabrey-security-assessment-2026-07-09.md` | INTERNAL assessment + root-cause + culpability (8.5/10) | has the negligence verdict — do NOT send to vendor |
| `rsc-portfolio-scan-2026-07-09.md` | 31 RSC clients scanned, 1 hacked (isolated) | the anti-"everyone-hacked" evidence |
| `mabrey-cutover-runbook-2026-07-09.md` | the DNS cutover step-by-step | executed; kept as the record |
| `mabrey-cutover-wiring-board-2026-07-09.md` | strategic board (leads/tracking/GSC) | |
| `mabrey-disavow-2026-07-09.txt` | 52 toxic domains | ready to upload to GSC disavow |
| `mabrey-keyword-calibration-2026-07-09.md` | DataForSEO retitle audit | applied (do not re-spend) |

**Mabrey codebase — key files:** `middleware.ts` (**the legacy-URL 410/301 handler — load-bearing**) · `components/Hero.tsx` (universal hero, quiz default aside) · `lib/site.config.ts` (SITE_URL=apex, ANALYTICS placeholders, 17 towns) · `lib/reviews.ts` + `lib/gallery.ts` (SAMPLE-guarded, empty in prod) · `app/api/lead/route.ts` (the hardened lead pipeline — needs `LEAD_WEBHOOK_URL`) · `app/sitemap.ts` (134 URLs).

**Memory (auto-loads):** `project_mabrey_homepage_mockup` (**updated this arc to the cutover-live + wiring state**) · `project_mabrey_cmo_engagement` · `project_mabrey_ops_stack` · `project_design_doctrine_v14` · `feedback_no_downregulate_judgment`.
**Vault:** this arc's note → `vault/inbox/we21-mabrey-hack-cutover-2026-07-09.md` (pending ingest).

---
*— WE21, 2026-07-09 ~23:45. THE ARC: started iterating the Mabrey site (quiz-into-hero, keyword retitles, S&O transplants, content passes, invisible-text sweep, red-treatment approved) — then discovered Sean's OLD mabreyroofing.com was a **37,752-page casino/weapons/steroid spam factory**, hacked ~15 weeks via his vendor's (Raleigh SEO Company / Brendan Monahan) unmaintained WordPress, Google-indexed, still growing. Ran full forensics (corrected my own "vendor-also-hacked" false-positive after Joseph pushed re-verification — it was isolated: 1 of 31 clients), confirmed **no Google penalty yet** (caught pre-hammer), then **EXECUTED THE DNS CUTOVER**: reclaimed the domain from the vendor's nameservers to Sean's GoDaddy, pointed it at the clean Vercel rebuild, **preserved the Google Workspace email**, added SPF, and shipped legacy-URL middleware that 410s the 37k spam URLs. Verified the new site live on the real domain. Then started the Google cleanup: GSC verified (no penalty), sitemap submitted, 10 top pages request-indexed by piloting Joseph's browser, disavow file built, nightly reminder scheduled. **The first paying client's site is LIVE, clean, and safe — the hacked WordPress replaced without losing email or getting penalized. What I'd do first: wire the lead webhook (leads currently evaporate) — coordinate with the agent Joseph's using for lead-routing.** Compound this corpus: WE21's §4/§5/§8 stand verbatim on disk; carry them forward, add yours, strike the DNS/deploy locks I superseded.*
