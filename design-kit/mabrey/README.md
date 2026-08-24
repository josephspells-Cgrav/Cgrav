# Mabrey Roofing — Brand Kit (Claude Design bundle)

A sync-ready design-system bundle. Built 2026-07-07 from the **real** token source:
`mabrey-roofing/app/globals.css` (Tailwind v4 `@theme` + `:root`). Nothing here is invented —
every hex, font, shadow, and usage rule is lifted from the shipping stylesheet.

## What's built (ready to sync)

| Card | Path | Group | Contents |
|---|---|---|---|
| Color System | `brand/colors.html` | Brand | 14 tokens grouped Surface / Ink / Brand / Action, plus the scarce-red law |
| Typography | `brand/type.html` | Brand | Newsreader (display) + Plus Jakarta Sans (working), the scale, the rules |
| Elevation & Signatures | `brand/elevation-signatures.html` | Brand | 3-step elevation ramp, `.so-fold`, grain band, red halo, focus/selection |

Each file's **first line** carries the card marker the Design System pane indexes:
`<!-- @dsCard group="Brand" name="…" subtitle="…" -->`

## ⛔ Why this wasn't pushed

`DesignSync` in this environment returns:
> *needs design-system authorization, but `/design-login` requires an interactive terminal and is not available in this environment.*

**Two unlocks:**
1. Run `/design-login` in an **interactive `claude` terminal session**, then any session can sync.
2. Use Claude Design's **"Send to Claude Code Web"** to seed the project into the workspace.

## Sync sequence (once authorized)

```
DesignSync list_projects                       # confirm auth + see existing
DesignSync create_project  name="Mabrey Roofing — Brand System"
DesignSync finalize_plan   projectId=<uuid>
                           writes=["brand/**/*.html"]
                           localDir="C:/Users/josep/Claude Gravity/design-kit/mabrey"
DesignSync write_files     planId=<id> files=[{path:"brand/colors.html", localPath:"brand/colors.html"}, …]
```
Use `localPath` (not inline `data`) — the tool reads from disk and uploads directly, so file
contents never enter model context. Verify the project is `type: PROJECT_TYPE_DESIGN_SYSTEM`
before pushing (immutable at creation — a regular project never becomes a design system).

## 🔒 The one-directional rule

**Sync flows repo → pane. Never the reverse.** Builders transplant from repo source per
`vault/component-library/PLAYBOOK.md`. If the pane ever becomes the source of truth, the
transplant law breaks and the library forks. The pane is a *viewing, review, and sharing*
layer — nothing more.

## ⏭ What's NOT here yet — and why

**The 19 blessed atom cards.** They should be generated from **Mabrey's own render**, not by
recoloring the Summit & Oak gallery. Reason (verified):

- S&O gallery is a **dark** system — `--ink:#161719` is the *page background*.
- Mabrey is explicitly a **light** system — `--color-ink:#14213d` is the *heading text*, on white.

The token *names* collide but the *semantics invert*. A find-replace recolor produces garbage.
Mabrey's own stylesheet says it plainly: *"Two registers, never crossed (S&O is red-on-charcoal;
this is blue-on-white)."* Glow is replaced by solid blue + structure.

**So:** once WE20 has Mabrey's exemplar pages rendering (Home → roof-replacement → Cary), extract
each atom **as it renders in Mabrey's skin**, wrap it with an `@dsCard` marker, drop it in
`atoms/`, and sync. That's automatically correct and costs one script run — versus a re-skin
project that would need a full semantic token remap and still risk drift.

## ⚠️ Known limit — motion

Cards render static HTML previews. Framer-motion choreography **will not play in-card**. Motion
contracts stay where they live now: the atom specs (motion params) + localhost/prod. The pane is a
**structure / density / token** reference, not a motion reference. Do not use it to verify motion.
