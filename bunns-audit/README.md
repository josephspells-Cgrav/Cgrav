# Bunn's Heating & Air — SEO Opportunity Audit Site

Static single-page audit report. No build step. One HTML file, inline CSS.

## Files

- `index.html` — the entire audit, self-contained.
- `vercel.json` — local-to-this-folder config; adds `noindex` headers so the audit isn't indexed by search engines if deployed publicly.

## How to view

- **Locally** — double-click `index.html` (already visible in the Launch preview panel right now).
- **Share as a file** — send the single HTML file, it opens in any browser with no dependencies.

## How to deploy to Vercel without touching the Peak Roofing project

The repo root `vercel.json` is wired to deploy `roofing-site/` to the existing Peak Roofing Vercel project. Do **not** modify it.

To deploy this audit as its own Vercel project:

1. In the Vercel dashboard → **Add New → Project**.
2. Import this same GitHub repo.
3. In project settings, set **Root Directory** to `bunns-audit`.
4. Framework preset: **Other** (or leave blank).
5. Build command: **leave empty**.
6. Output directory: **leave empty** (Vercel serves the root as static).

That gives the audit its own URL (e.g. `bunns-audit.vercel.app` or any custom domain) without affecting the Peak Roofing deploy.

## Sharing

The `noindex` header in `vercel.json` keeps the page out of Google. Once deployed, share the URL directly with the prospect. They can also screenshot or print-to-PDF — the layout is print-optimized (top bar and footer hidden, tables reflow).
