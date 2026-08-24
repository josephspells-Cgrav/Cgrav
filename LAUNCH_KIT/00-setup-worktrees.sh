#!/usr/bin/env bash
# Create 5 isolated git worktrees for the parallel Phase A–E builders.
# Run once, AFTER Phase 0 is merged to main. Idempotent-ish (skips existing).
set -uo pipefail

ROOT="C:/Users/josep/Claude Gravity/summit-oak-roofing"
cd "$ROOT" || { echo "❌ can't cd into $ROOT"; exit 1; }

echo "== Pre-flight =="
BR="$(git rev-parse --abbrev-ref HEAD)"
echo "  branch: $BR"
if [ "$BR" != "main" ]; then
  echo "❌ not on main (on '$BR'). Checkout main first."; exit 1
fi
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ working tree not clean — commit/stash before creating worktrees:"
  git status --short; exit 1
fi
if ! git log --oneline -20 | grep -qi "Phase 0"; then
  echo "⚠️  no 'Phase 0' commit found in recent history — is Phase 0 merged? (continuing)"
fi
echo "  ✅ on main, clean"
echo ""

# name  ->  branch
declare -A WT=(
  [../so-ws-a]="ws-a-services"
  [../so-ws-b]="ws-b-locations"
  [../so-ws-c]="ws-c-resources"
  [../so-ws-d]="ws-d-funnel"
  [../so-ws-e]="ws-e-trust"
)

echo "== Creating worktrees =="
for dir in "${!WT[@]}"; do
  branch="${WT[$dir]}"
  if [ -d "$dir" ]; then
    echo "  ⏭  $dir already exists — skipping"
    continue
  fi
  if git worktree add "$dir" -b "$branch" 2>/dev/null; then
    echo "  ✅ $dir  (branch $branch)"
  else
    # branch may already exist from a prior run — attach without -b
    git worktree add "$dir" "$branch" && echo "  ✅ $dir  (existing branch $branch)" \
      || echo "  ❌ failed: $dir"
  fi
done

echo ""
echo "== Worktrees =="
git worktree list
echo ""
echo "Next: open 5 ultracode sessions, paste LAUNCH_KIT/ws-*.md into each (stagger 30–60s)."
echo "Each builder runs 'npm install' in its worktree first (node_modules isn't carried)."
