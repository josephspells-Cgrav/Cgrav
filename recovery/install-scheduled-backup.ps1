<#
    install-scheduled-backup.ps1 -- make the backup independent of Claude sessions.

    WHY a scheduled task and not the SessionEnd hook: the hook is killed ~1.5s
    after firing. The fast local `git commit` lands, the slow network `git push`
    dies mid-flight, and nothing reports it -- root-caused 2026-06-20, still the
    reason local commits pile up while GitHub falls behind. A hook is a
    best-effort net. This is the guarantee.

    Creates ONE daily user-level task at 09:00 (and on logon, if a run was
    missed) that runs backup-all.mjs -> re-seals the credential ark -> runs the
    recovery census. Idempotent: re-running replaces the task.

    Run once, elevated not required:
        powershell -ExecutionPolicy Bypass -File recovery\install-scheduled-backup.ps1

    Remove it with:
        Unregister-ScheduledTask -TaskName 'Cgrav Daily Backup' -Confirm:$false
#>

param(
  [string]$Root = 'C:\Users\josep\Claude Gravity',
  [string]$At   = '09:00'
)

$ErrorActionPreference = 'Stop'
$taskName = 'Cgrav Daily Backup'

$node = (Get-Command node -ErrorAction SilentlyContinue).Source
if (-not $node) { throw 'node not found on PATH' }

# One command line, three stages. `;` not `&&` -- the census is diagnostic and
# must run even when the backup reported a problem, because a failed backup is
# exactly when you most need to know what is now unprotected.
$inner = "& '$node' '$Root\backup-all.mjs'; & '$node' '$Root\recovery\recovery-census.mjs' --quick *> '$Root\.recovery-census.txt'"
$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
  -Argument "-NoProfile -NonInteractive -ExecutionPolicy Bypass -Command `"$inner`"" `
  -WorkingDirectory $Root

$triggers = @(
  (New-ScheduledTaskTrigger -Daily -At $At),
  (New-ScheduledTaskTrigger -AtLogOn)
)

# StartWhenAvailable is the whole point on a laptop: a machine asleep at 09:00
# runs the task when it wakes instead of silently skipping the day.
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
  -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 30) `
  -MultipleInstances IgnoreNew

if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
  Write-Host "  replaced existing task" -ForegroundColor Yellow
}

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $triggers `
  -Settings $settings -Description 'Push every private repo, re-seal the credential ark, run the recovery census.' | Out-Null

Write-Host "  ok   '$taskName' installed -- daily $At + at logon" -ForegroundColor Green
Write-Host ""
Write-Host "  Set the ark passphrase once so the task can re-seal it:" -ForegroundColor Cyan
Write-Host "    [Environment]::SetEnvironmentVariable('CGRAV_SECRETS_PASS','<six-word passphrase>','User')"
Write-Host ""
Write-Host "  Test it right now:" -ForegroundColor Cyan
Write-Host "    Start-ScheduledTask -TaskName '$taskName'"
Write-Host "    Get-Content '$Root\.recovery-census.txt' -Tail 20"
