# WO_KNIGHT_PHOTOS — harvest Knight Construction's FB photos (authorized)

> 2026-08-18 ~7:00pm ET, OS58. Owner gave Sean verbal permission to use his project photos
> on mabreyconstruction.com (partner relationship; written confirmation being collected
> separately — not this WO's problem). Builder: Opus sub-agent. Joseph's Chrome is OPEN and
> LOGGED IN with the target page already in a tab.

## §0 Mission
Every photo on https://www.facebook.com/KnightConstructionCo/photos — full resolution,
downloaded to disk with a manifest. No hand-screenshotting. DoD: a folder of original-res
image files + `manifest.csv`, with a reported tally that matches what the page actually
holds.

Output dir (create): `C:/Users/josep/Claude Gravity/mabrey-construction-assets/knight-photos/`
Manifest columns: `local_file, fb_photo_url, cdn_url, width, height, bytes, sha256, alt_text`

## §1 Two lanes — try fast lane first, fall back without sulking

### Lane A — gallery-dl (INSTALLED: v1.32.9)
```
gallery-dl --cookies-from-browser chrome "https://www.facebook.com/KnightConstructionCo/photos" -d "C:/Users/josep/Claude Gravity/mabrey-construction-assets/knight-photos"
```
- ⚠️ KNOWN GOTCHA: Chrome 127+ App-Bound Encryption often breaks `--cookies-from-browser
  chrome` on Windows ("failed to decrypt" / DPAPI errors). If that happens, do NOT chase
  cookie-export workarounds or ask the user to install extensions — go to Lane B, it needs
  no cookies at all.
- If it RUNS: verify a sample of downloads are real full-res JPEGs (magic bytes, dimensions
  ≥1000px typical), not thumbnails or HTML error bodies. gallery-dl writing 0-byte or
  tiny files = silently failed auth → Lane B.
- Also acceptable: gallery-dl with `-g` to just print URLs, then download via curl.

### Lane B — drive Joseph's real Chrome (the reliable lane)
Load the browser tools via ONE ToolSearch call:
`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__get_page_text`
1. `tabs_context_mcp` → find the tab already on facebook.com/KnightConstructionCo (it is
   open). Use THAT tab; do not open new windows.
2. Navigate to the /photos tab of the page if not already there. Facebook has two grids:
   "Photos of" (tagged) and "Uploads" — you want **Uploads** (the page's own albums too:
   check the Albums tab; project albums often hold the good full sets).
3. SCROLL-HARVEST: repeatedly scroll to bottom via javascript_tool; after each scroll,
   collect photo permalink hrefs (`/photo/?fbid=…` / `/photo.php` patterns) from anchors.
   Keep a Set. Stop when 3 consecutive scrolls add zero new links. Report the count.
4. FULL-RES EXTRACTION: for each photo permalink (visit in the same tab, or fetch the
   theater), pull the LARGEST image source — og:image meta or the largest `srcset`/
   `data-visualcompletion` img in the viewer. Grid thumbnails are cropped ~500px — never
   ship those. Viewer/theater serves ~1500-2048px.
5. DOWNLOAD IMMEDIATELY as you harvest — fbcdn URLs are SIGNED AND EXPIRE (minutes-hours).
   Never harvest-all-then-download-all. curl each to the output dir as you go; verify magic
   bytes (FFD8 jpeg / 8950 png) and size >30KB; a tiny or HTML body = expired/blocked URL →
   re-pull that photo's viewer and retry once.
6. Naming: `knight-###-<fbid>.jpg` in page order.

## §2 Conduct laws (Joseph's REAL logged-in account — non-negotiable)
- READ-ONLY: never like, comment, post, follow, or touch anything interactive beyond
  navigation and the photo viewer. Never navigate outside facebook.com.
- HUMAN PACING: 1-3s between viewer opens, small jitter. No parallel hammering — one tab,
  one request at a time. The account's safety outranks the task's speed.
- If Facebook shows a login wall, checkpoint, CAPTCHA, or "suspicious activity" interstitial:
  STOP the harvest immediately and report what you saw. NEVER enter credentials, never
  attempt to solve or bypass any challenge. Partial haul + honest report beats a locked
  account.
- Do not touch other tabs' content. Do not read anything outside the target page.

## §3 Verify + report
- Tally: photos found on page vs files on disk vs manifest rows — all three must match; any
  gap listed by fb_photo_url with the reason.
- Spot-open 5 random files (Read tool renders images) and confirm they are real project
  photos (buildings/construction), not profile pics/logos/thumbnails. Note obvious
  non-project content (memes, team portraits) in the manifest's alt_text column — do NOT
  filter them out, Joseph picks.
- Report: lane used, count, total MB, dimension range, anything skipped and why, the 5
  spot-check verdicts. Write the report to
  `C:/Users/josep/Claude Gravity/mabrey-construction-assets/knight-photos/HARVEST_REPORT.md`.

## §4 Never
No credentials, no CAPTCHA/bot-check interaction, no cookie-export browser extensions, no
posting/DMs, no deploys, no git, nothing outside the output dir + facebook.com.
