<#
    bootstrap-new-machine.ps1 -- rebuild the whole operation on a bare Windows box.

    You do not need this file to start. It is inside the repos it clones, so the
    first two lines of the recovery card are enough to get here:

        winget install --id GitHub.cli -e --accept-source-agreements
        gh auth login                     # browser, or a PAT from the password manager
        git clone https://github.com/josephspells-Cgrav/cgrav-vault.git
        powershell -ExecutionPolicy Bypass -File cgrav-vault\_recovery\bootstrap-new-machine.ps1

    What it does, in order of how badly you need it:
      1. toolchain   (git, gh, node, pnpm, vscode, Claude Code)
      2. the brain   (vault -> memory + skills + hooks restored to ~/.claude)
      3. the code    (every private repo)
      4. the keys    (decrypt the ark -> every .env back in place)
      5. the report  (what is still missing and who has to fix it by hand)

    It is idempotent. Run it twice; nothing breaks.
#>

param(
  [string]$Root      = "$HOME\Claude Gravity",
  [string]$GhOwner   = 'josephspells-Cgrav',
  [switch]$SkipTools,
  [switch]$SkipSecrets
)

$ErrorActionPreference = 'Continue'
$todo = New-Object System.Collections.Generic.List[string]
function Step($n, $m) { Write-Host "`n=== $n. $m ===" -ForegroundColor Cyan }
function Ok($m)       { Write-Host "  ok   $m" -ForegroundColor Green }
function Warn($m)     { Write-Host "  !!   $m" -ForegroundColor Yellow; $todo.Add($m) }

# -- 1. TOOLCHAIN -----------------------------------------------------------
Step 1 'Toolchain'
if (-not $SkipTools) {
  $pkgs = @(
    @{ id = 'Git.Git';            cmd = 'git'  },
    @{ id = 'GitHub.cli';         cmd = 'gh'   },
    @{ id = 'OpenJS.NodeJS.LTS';  cmd = 'node' },
    @{ id = 'Microsoft.VisualStudioCode'; cmd = 'code' }
  )
  foreach ($p in $pkgs) {
    if (Get-Command $p.cmd -ErrorAction SilentlyContinue) { Ok "$($p.cmd) present" }
    else { winget install --id $p.id -e --accept-package-agreements --accept-source-agreements | Out-Null; Ok "installed $($p.id)" }
  }
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    npm i -g pnpm @anthropic-ai/claude-code 2>&1 | Out-Null
    Ok 'pnpm + Claude Code installed'
  }
} else { Ok 'skipped (-SkipTools)' }

# gh auth is the master switch: it restores git push credentials for every repo
# at once via the credential helper, so no PAT has to be managed by hand.
if (Get-Command gh -ErrorAction SilentlyContinue) {
  gh auth status 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { Warn 'gh is NOT authenticated -- run: gh auth login   (then re-run this script)'; }
  else { gh auth setup-git 2>&1 | Out-Null; Ok 'gh authenticated + wired as git credential helper' }
}

# -- 2. THE BRAIN -----------------------------------------------------------
# Restored FIRST and deliberately: the vault carries the memory, the skills, the
# hooks and the gates. A session that boots without them keeps running, dumber,
# and nothing tells you -- the quietest failure in the whole system.
Step 2 'The brain -- vault, memory, skills, hooks'
New-Item -ItemType Directory -Force -Path $Root | Out-Null
$vault = Join-Path $Root 'vault'
if (Test-Path (Join-Path $vault '.git')) { git -C $vault pull --ff-only 2>&1 | Out-Null; Ok 'vault updated' }
else { git clone "https://github.com/$GhOwner/cgrav-vault.git" $vault 2>&1 | Out-Null; Ok 'vault cloned' }

$claudeHome = Join-Path $HOME '.claude'
if (Test-Path (Join-Path $claudeHome '.git')) { git -C $claudeHome pull --ff-only 2>&1 | Out-Null; Ok '~/.claude updated from claude-operating-layer' }
else {
  git clone "https://github.com/$GhOwner/claude-operating-layer.git" $claudeHome 2>&1 | Out-Null
  if (Test-Path (Join-Path $claudeHome 'skills')) { Ok '~/.claude restored from claude-operating-layer' }
  else {
    # Fallback: the vault carries a source-only mirror of the same tree.
    $snap = Join-Path $vault '_skills-snapshot'
    if (Test-Path $snap) {
      Copy-Item (Join-Path $snap '*') $claudeHome -Recurse -Force
      Warn '~/.claude restored from the VAULT MIRROR, not the live repo -- binary assets and any file type outside the source allowlist are missing.'
    } else { Warn '~/.claude could NOT be restored -- skills, hooks and every verification gate are absent.' }
  }
}

$mem = Join-Path $HOME '.claude\projects\C--Users-josep-Claude-Gravity\memory'
$memSnap = Join-Path $vault '_memory-snapshot'
if (Test-Path $memSnap) {
  New-Item -ItemType Directory -Force -Path $mem | Out-Null
  Copy-Item (Join-Path $memSnap '*.md') $mem -Force
  Ok "auto-memory restored ($((Get-ChildItem $mem -Filter *.md).Count) files)"
} else { Warn 'no _memory-snapshot in the vault -- auto-memory starts empty' }

# -- 3. THE CODE ------------------------------------------------------------
Step 3 'The code -- every repo'
$repos = @(
  @{ repo = 'Cgrav';                  dir = '.'                    },
  @{ repo = 'claude-operating-layer'; dir = $null                  },  # handled above
  @{ repo = 'km-outbound';            dir = 'king_maker_outbound'  },
  @{ repo = 'km-traffic-deck';        dir = 'kingmaker'            },
  @{ repo = 'cgrav-blackboard';       dir = 'blackboard'           },
  @{ repo = 'mabrey-crm';             dir = 'mabrey-crm-app'       },
  @{ repo = 'mabrey-roofing';         dir = 'mabrey-roofing'       },
  @{ repo = 'mabrey-docs';            dir = 'mabrey-docs'          },
  @{ repo = 'mabrey-construction';    dir = 'mabrey-construction'  },
  @{ repo = 'summit-oak-roofing';     dir = 'summit-oak-roofing'   },
  @{ repo = 'kingmaker-site';         dir = 'king-maker-site'      },
  @{ repo = 'american-masterworks';   dir = 'american-masterworks' }
)
foreach ($r in $repos) {
  if (-not $r.dir) { continue }
  $target = if ($r.dir -eq '.') { $Root } else { Join-Path $Root $r.dir }
  if (Test-Path (Join-Path $target '.git')) { Ok "$($r.repo) already present" ; continue }
  if ($r.dir -eq '.') {
    # The workspace root is a repo that already has children -- clone bare-ish.
    git -C $Root init -q 2>&1 | Out-Null
    git -C $Root remote add origin "https://github.com/$GhOwner/Cgrav.git" 2>&1 | Out-Null
    git -C $Root fetch origin 2>&1 | Out-Null
    git -C $Root checkout -f master 2>&1 | Out-Null
    Ok 'workspace root repo restored'
  } else {
    git clone "https://github.com/$GhOwner/$($r.repo).git" $target 2>&1 | Out-Null
    if (Test-Path (Join-Path $target '.git')) { Ok "$($r.repo) cloned" } else { Warn "$($r.repo) FAILED to clone" }
  }
}

# -- 4. THE KEYS ------------------------------------------------------------
Step 4 'The keys -- decrypt the credential ark'
if ($SkipSecrets) { Ok 'skipped (-SkipSecrets)' }
elseif (-not $env:CGRAV_SECRETS_PASS) {
  Warn 'CGRAV_SECRETS_PASS not set -- no .env files restored. Set it and re-run:  $env:CGRAV_SECRETS_PASS = "<six-word passphrase>"'
} else {
  $bundle = Join-Path $vault '_ark\secrets.bundle.enc'
  if (-not (Test-Path $bundle)) { Warn "no ark at $bundle -- every credential must be re-issued at its provider" }
  else {
    node (Join-Path $Root 'recovery\secrets-bundle.mjs') unlock
    if ($LASTEXITCODE -eq 0) {
      # _RESTORE_MAP.txt names the destination for every file; copy them home.
      $unl = Join-Path $vault '_ark\_unlocked'
      foreach ($line in Get-Content (Join-Path $unl '_RESTORE_MAP.txt') | Where-Object { $_ -match '<=' }) {
        $parts = $line -split '\s+<=\s+'
        $dest  = if ($parts[1] -like 'HOME/*') { Join-Path $HOME ($parts[1] -replace '^HOME/','') } else { Join-Path $Root $parts[1] }
        New-Item -ItemType Directory -Force -Path (Split-Path $dest) | Out-Null
        Copy-Item (Join-Path $unl $parts[0]) $dest -Force
      }
      Ok 'every .env restored to its original path'
      Warn "DELETE the decrypted copy when done:  Remove-Item -Recurse -Force `"$unl`""
    } else { Warn 'ark would not decrypt -- wrong passphrase?' }
  }
}

# -- 5. WHAT IS STILL MISSING -----------------------------------------------
Step 5 'Census -- what a machine cannot restore for you'
if (Test-Path (Join-Path $Root 'recovery\recovery-census.mjs')) {
  node (Join-Path $Root 'recovery\recovery-census.mjs') --quick
}

Write-Host "`n$('='*72)" -ForegroundColor Cyan
Write-Host 'HANDS-ON REMAINDER -- no script can do these:' -ForegroundColor Cyan
Write-Host '  - Vercel:   npx vercel login    (then re-enter every Secret-type env var;'
Write-Host '              they are WRITE-ONLY and cannot be pulled back -- see the ark manifest)'
Write-Host '  - Claude:   claude   (browser login)'
Write-Host '  - MCP:      ~/.claude.json is restored by the ark; restart Claude Code to load it'
Write-Host '  - Providers: confirm Neon / Telnyx / VAPI / Meta / Slack sessions still valid'
if ($todo.Count) {
  Write-Host "`nWARNINGS RAISED ($($todo.Count)):" -ForegroundColor Yellow
  foreach ($t in $todo) { Write-Host "  - $t" -ForegroundColor Yellow }
}
Write-Host "$('='*72)`n" -ForegroundColor Cyan
