$ErrorActionPreference = 'Stop'

$tracked = @(git ls-files)
if (-not $tracked.Count) {
  Write-Error 'No tracked files found. Run this check after git add.'
}

$patterns = [ordered]@{
  'GitHub token' = 'gho_[A-Za-z0-9_]+'
  'OpenAI-style token' = 'sk-[A-Za-z0-9]+'
  'Google API key' = 'AIza[0-9A-Za-z_-]{20,}'
  'Bearer token' = 'Bearer\s+[A-Za-z0-9._-]{16,}'
  'Windows user path' = '[A-Za-z]:\\Users\\[A-Za-z0-9._-]+'
  'Email address' = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
  'Credentialed URL' = 'https?://[^/\s:@]+:[^@\s]+@'
}

$violations = @()
foreach ($file in $tracked) {
  if ($file -eq 'scripts/check-repo-safety.ps1') { continue }
  $content = Get-Content -Raw -LiteralPath $file
  foreach ($entry in $patterns.GetEnumerator()) {
    if ($content -match $entry.Value) {
      $violations += [pscustomobject]@{ file = $file; category = $entry.Key }
    }
  }
}

if ($violations.Count) {
  $violations | ConvertTo-Json -Compress
  exit 1
}

Write-Output '{"ok":true,"violations":[]}'
