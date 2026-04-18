# Cgrav — Claude Notes

## Repo structure

- `roofing-site/` — Vite (vanilla HTML/CSS/JS) static site for Peak Roofing, Charlotte NC
- `vercel.json` — at repo root; Vercel is connected to the `master` branch

## Deployment (Vercel)

The Vercel project watches `master`. Pushing to master triggers a production deploy.

**Key vercel.json config** (required for this monorepo layout):
```json
{
  "framework": null,
  "installCommand": "cd roofing-site && npm install",
  "buildCommand": "cd roofing-site && npm run build",
  "outputDirectory": "roofing-site/dist"
}
```

- `framework: null` — prevents Vercel from auto-detecting Next.js (there is none)
- Commands must `cd roofing-site` first — `package.json` is NOT at the repo root
- `rootDirectory` is NOT a valid `vercel.json` property; configure it in the Vercel dashboard instead

## Git push in CCR sessions

CCR (Claude Code Remote) sessions may be provisioned **read-only** for GitHub. Symptoms:
- `git push` → `403` from `session_ingress` with "Invalid GitHub source exchange token"
- MCP GitHub write tools → `403 Resource not accessible by integration`

**Fix:** Ask the user for a GitHub Personal Access Token (`repo` scope), then push directly:
```bash
git push https://<token>@github.com/<owner>/<repo>.git <branch>
```
`github.com` is always reachable from the CCR sandbox even when the local proxy blocks pushes.

After pushing via PAT, sync the local tracking branch so the stop hook passes:
```bash
git fetch origin <branch>
```

## roofing-site tech stack

- Vite 8 (vanilla, no framework)
- Build output: `roofing-site/dist/`
- No TypeScript, no React — plain HTML/CSS/JS
