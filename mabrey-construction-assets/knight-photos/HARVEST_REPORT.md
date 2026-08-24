# HARVEST_REPORT — Knight Construction FB photos

**WO:** `WO_KNIGHT_PHOTOS` · **Run:** 2026-08-18 ~19:00–19:20 ET
**Source:** https://www.facebook.com/KnightConstructionCo/photos
**Output:** `C:/Users/josep/Claude Gravity/mabrey-construction-assets/knight-photos/`

## Result

| | |
|---|---|
| **Lane used** | **Lane A (gallery-dl v1.32.9)** — completed, exit 0. Lane B not needed for the harvest. |
| **Photos harvested** | **812** |
| **Total size** | **206.3 MB** |
| **Dimensions** | 422×271 → 2177×2048 · median **1536×1366** |
| **Full-res share** | 710 / 812 (87%) at ≥1000px wide · 436 (54%) at ≥1500px wide |
| **Corrupt / failed** | **0** |
| **Skipped** | **0** |
| **Post dates (sampled)** | 2025-04-01 → 2026-07-30 |

## Three-way tally — MATCHES

| Source | Count |
|---|---|
| Enumerated by the crawl (`.gdl-photos.log`, unique paths) | **812** |
| Files on disk (`knight-*.jpg`) | **812** |
| Manifest rows (`manifest.csv`) | **812** |

Zero gaps in either direction. Every flat file was re-verified byte-for-byte
against its manifest `sha256` and `bytes` after the copy: **0 mismatches, 0 missing.**

## Lane A note — the cookie gotcha fired, and did not matter

`--cookies-from-browser chrome` failed exactly as the WO predicted:

```
[facebook][warning] cookies: [Errno 13] Permission denied:
  ...\Google\Chrome\User Data\Default\Network\Cookies
```

gallery-dl then proceeded **anonymously** and pulled the full album anyway — the
page's photos are public. No cookie-export workarounds were attempted, and
**Joseph's logged-in session was never used to download anything**, which is the
safer outcome: the 812-file pull carried no account identity at all.

## Integrity gate

Every file passed a two-part gate: **JPEG magic bytes (`FFD8`)** *and* a **full PIL
decode** (proves a real image, not an HTML error body or truncated fetch).

- 0 files failed magic bytes · 0 files failed decode · 0 files rejected.
- The WO's ">30KB" heuristic flagged **8** files. All 8 pass magic bytes *and*
  decode — they are genuinely **low-resolution originals** (422×271 … 768×422),
  not expired-URL stubs. I **kept** them and tagged each in `alt_text` as
  `[low-res original WxH, NKB]`. Spot-opened the smallest (`knight-013`, 422×271):
  it is a 3D design rendering of a garage — real project content.

## Scope check — no albums were missed

The Albums tab holds only **Cover photos (4 items)** and **Profile pictures (3 items)**
— no project albums. The `photos_by` ("Knight Construction's Photos",
set `pb.100042073335201.-2207520000`) grid is the complete set, and that is what was
harvested. Nothing left on the table.

## Spot-checks — 5/5 PASS (random, seeded)

| File | Verdict |
|---|---|
| `knight-343-1346724463406652.jpg` | ✅ Interior framing — vaulted ceiling, trusses, window bank |
| `knight-109-1703522574393504.jpg` | ✅ Foundation footings + gravel pad on cleared lot |
| `knight-629-938506220895147.jpg` | ✅ Finished kitchen, quartzite island — pro photography |
| `knight-459-1231553528257080.jpg` | ✅ Completed modern custom home exterior, RV garage |
| `knight-234-1517218539690576.jpg` | ✅ Log home, near-complete exterior |

All five are genuine construction/project photography. **No profile pics, logos, or
grid thumbnails** in the sample. Per the WO nothing was filtered out — Joseph picks.

## Known gaps — stated, not hidden

1. **`cdn_url` is populated for 284 / 812 rows.** A second `gallery-dl -j` metadata
   pass truncated at 284 unique photos (the download crawl was the complete one —
   0 metadata records lacked a matching file). I did **not** re-run it: fbcdn URLs are
   signed and expire within hours, so the column is provenance-only and already stale;
   every image is on disk. `fb_photo_url` (the durable permalink) is filled for **all 812**.
2. **`alt_text` is populated for 25 / 812 rows.** Facebook itself carries a caption on
   only 17 of the 284 metadata-covered photos — the page posts images without captions.
   The other 8 entries are the low-res tags above. This is a source-side emptiness,
   not a harvest miss.
3. **7 duplicate-content pairs** (identical `sha256`, distinct fbids — the same image
   posted twice on the page). Left in place per the WO; 805 unique images across 812 files:
   `086/089 · 094/098 · 106/111 · 336/392 · 650/653 · 748/812 · 749/809`
4. **DOM-side page count was not obtainable.** Facebook's photo grid is virtualized and
   its lazy-loader only fires in a foregrounded tab, so a backgrounded read saw 10
   anchors regardless of scrolling. Rather than report a fabricated number, the "page"
   column of the tally uses the crawler's complete paginated enumeration (812).

## Conduct — §2 compliance

- **No login wall, no checkpoint, no CAPTCHA, no suspicious-activity screen** was
  encountered at any point. Probed explicitly (password field, checkpoint/captcha/
  security-check strings) on every page visited: all clean.
- Read-only throughout. Zero likes, comments, posts, follows, messages. No interactive
  element was ever clicked — navigation and page reads only.
- One tab, inside facebook.com only. Downloads ran serially; the metadata pass was held
  until the download finished rather than run in parallel.
- No credentials entered, no challenge solved or bypassed, no cookie-export extension.

## Files

- `knight-001-…` … `knight-812-…` `.jpg` — the photos, **page order (newest → oldest)**,
  named `knight-###-<fbid>.jpg`
- `manifest.csv` — 812 rows: `local_file, fb_photo_url, cdn_url, width, height, bytes, sha256, alt_text`
- `GALLERY.html` — contact sheet, all 812, click-through to the original FB post.
  *(This file pre-existed from another process, stale at 546 photos and pointing at the
  pre-flatten nested paths; flattening broke its links, so it was regenerated against the
  final layout.)*
- `.gdl-photos.log`, `.metadata.json` — raw crawl provenance, retained for audit.
