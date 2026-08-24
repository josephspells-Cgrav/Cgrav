# Mabrey Brand Tokens — extracted for the portfolio surface

Extracted 2026-08-18 by the brand agent. Every value below is traceable to a file
in one of the two source repos (read-only):

- `C:/Users/josep/Claude Gravity/mabrey-construction` (the Construction site — WINS where the brands differ; the portfolio serves the construction arm)
- `C:/Users/josep/Claude Gravity/mabrey-roofing` (the live Roofing site — fills in where construction has no opinion)

The two repos share an IDENTICAL identity-token block (construction is a fork of the
roofing template): `mabrey-construction/app/globals.css:11-32` == `mabrey-roofing/app/globals.css:11-32`.
Both sites are LIGHT — white page ground, royal-blue brand, charcoal ink. Per the brand
law, the portfolio therefore goes LIGHT (white ground), not dark. The photo lightbox may
stay dark (photographic overlay, standard on light sites too).

## Palette (hex + role on the source sites)

| Token (source name) | Hex | Role on the Mabrey sites | Citation |
|---|---|---|---|
| `--color-page` | `#ffffff` | Page background (the ground) | mabrey-construction/app/globals.css:12 |
| `--color-ink` | `#14213d` | Darkest heading ink (near-navy) | globals.css:13 |
| `--color-body` | `#33415c` | Body text (charcoal-slate) | globals.css:14 |
| `--color-navy` | `#0e2140` | Deep-navy rhythm band (white text over it; the AlertBar strip) | globals.css:15 |
| `--color-surface` | `#f4f6fb` | Light tint panel / card / hover | globals.css:16 |
| `--color-tint` | `#eef2fb` | Alt-section wash | globals.css:17 |
| `--color-line` | `#e2e8f0` | Light borders | globals.css:18 |
| `--color-brand` | `#1a489a` | **Mabrey royal blue** — headings, dots, underlines, icons, the "M" tile | globals.css:19 |
| `--color-brandhi` | `#14356f` | Brand hover | globals.css:20 |
| `--color-brandsoft` | `#eaf0fb` | Blue tint (chips, soft fills) | globals.css:21 |
| `--color-red` | `#c02026` | SCARCE ACTION — primary CTA fill + storm/damage ONLY (do not spend it on chrome) | globals.css:22 |
| `--color-redhi` | `#a11a20` | Action hover | globals.css:23 |
| `--color-mist` | `#51607a` | Muted slate text on light (AA on white + tint) | globals.css:25 |

Elevation (light-theme card shadows): `--elev-1/2/3` + `--inset-hi` at globals.css:73-78.
Selection: `rgba(26,72,154,.16)` on `--color-ink` (globals.css:50-53). Focus ring: 2px solid brand (globals.css:54-58).

### Mapping onto the portfolio generator's `:root` vars
The scrub generator's skeleton (`scratchpad/mkpicker.cjs:40`) uses
`--bg / --card / --ink / --mut / --line / --blue`. apply-brand.cjs maps by NAME:

| Generator var | Old (generic dark) | New (Mabrey) | Source token |
|---|---|---|---|
| `--bg` | `#0f1215` | `#ffffff` | `--color-page` |
| `--card` | `#171b1f` | `#f4f6fb` | `--color-surface` |
| `--ink` | `#eef1f4` | `#14213d` | `--color-ink` |
| `--mut` | `#939ca5` | `#51607a` | `--color-mist` |
| `--line` | `#242b31` | `#e2e8f0` | `--color-line` |
| `--blue` | `#0a84ff` | `#1a489a` | `--color-brand` |

Unknown vars in the scrub's `:root` pass through untouched. Mabrey-only extras
(`--mab-navy`, `--mab-body`, `--mab-tint`, `--mab-brandhi`, `--mab-brandsoft`, `--mab-red`)
are appended for the injected header CSS.

## Typography

Both fonts load from **Google Fonts** on the source sites — via `next/font/google`
(self-hosted at build by Next): `mabrey-construction/app/layout.tsx:2` —
`import { Newsreader, Plus_Jakarta_Sans } from "next/font/google"`. That is the license
for the portfolio's `fonts.googleapis.com` stylesheet link (the static-page equivalent
of the same load).

| Role | Family | Weights (layout.tsx:16-29) | Source-site token |
|---|---|---|---|
| Display / headings / wordmark | **Newsreader** (variable serif, optical sizing) | 400, 500, 600, latin, `display:swap` | `--font-display` (globals.css:27) |
| Body / UI | **Plus Jakarta Sans** | 400, 500, 600, 700, 800, latin, `display:swap` | `--font-sans` (globals.css:28) |

Fallback stacks (globals.css:27-28):
- display: `Georgia, ui-serif, serif`
- sans: `system-ui, -apple-system, sans-serif`

Static link used by apply-brand.cjs:
`https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400..600&family=Plus+Jakarta+Sans:wght@400..800&display=swap`

## Logo / favicon assets

**The construction site renders NO image logo** — its header is a TYPE lockup
(`mabrey-construction/components/Header.tsx:33-41`): a 36px rounded royal-blue tile with a
white serif "M" + "Mabrey Construction" in Newsreader semibold 17px + a 10px
letter-spaced uppercase sub-line. The genuine Mabrey image mark lives in the ROOFING
repo (construction's `public/logo.png` and `public/favicon.svg` are un-rebranded
template leftovers — see Rejected below).

Copied into `brand/assets/` (all from `mabrey-roofing/public/`):

| File | What it is |
|---|---|
| `favicon.svg` (743 B) | THE Mabrey mark — 48×48 rounded square `#1a489a`, white roof-gable stroke, white serif "M". Newest brand asset (2026-07-30). |
| `mabrey-mark.svg` | Same file, second copy — used as the header logo `<img>`. |
| `logo.png` (17.7 KB) | 512px blue rounded tile + white serif "M". |
| `favicon.ico` (2.6 KB) | ICO fallback. |
| `apple-icon.png` (4.8 KB) | 180px apple-touch icon of the same mark (visually verified). |

**Rejected (NOT brand — do not use):**
- `mabrey-construction/public/logo.png` — RED tile with white serif "S" (Summit & Oak template leftover).
- `mabrey-construction/public/favicon.svg` — purple/violet abstract mark (`#863bff`/`#7e14ff`) — stock template asset.

## Header composition (source conventions)

From `mabrey-construction/components/Header.tsx:29-41,79-88` and `components/AlertBar.tsx:15-31`:

- **Top strip (AlertBar):** full-width `--color-navy` band, inner `max-w-7xl` (1280px)
  `px-5 sm:px-8 py-2`, centered 13px white semibold text with a small red dot;
  copy: "Custom Homes, Additions & Outdoor Living — Durham & the Triangle" + "Call (984) 464-4188". Scrolls away.
- **Header bar:** `sticky top-0`, `backdrop-blur` over `rgba(255,255,255,.9)`,
  `border-bottom: 1px solid --color-line`, inner `max-w-7xl px-5 sm:px-8`, **68px tall**,
  flex space-between.
- **Lockup:** 36×36 rounded-md brand-blue "M" tile (here: `mabrey-mark.svg`), gap 10px,
  then Newsreader semibold 17px tracking-tight `--color-ink` name, with a
  10px `letter-spacing:0.2em` UPPERCASE `--color-mist` Jakarta semibold sub-line
  (site: "Custom Homes · Durham NC"; portfolio: "Project Portfolio").
- **Right side:** `★★★★★` in brand blue + "Veteran-Owned" ink semibold 13px
  (Header.tsx:81-84), then the phone CTA — `bg-brand` rounded-md `px-4 py-2.5`
  15px semibold white, hover `--color-brandhi` (Header.tsx:85-88; phone icon 16px).
- **Phone:** `(984) 464-4188` / `tel:+19844644188` — `mabrey-construction/lib/business.ts:17-18`.
- **Site URL:** `https://mabreyconstruction.com` — `lib/site.config.ts:7`.
