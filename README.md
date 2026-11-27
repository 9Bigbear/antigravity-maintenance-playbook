# Antigravity Maintenance Playbook

This project packages the reusable lessons from repairing a recurring blank-window failure and completing an external Simplified Chinese localization for Antigravity on Windows.

It is written for maintenance work that must preserve projects, conversations, account state, and an existing proxy configuration. The project contains an Agent Skill, operating rules, an acceptance checklist, a generic CDP verification script, and a repository safety scanner.

## What this covers

- Distinguishing a blank Electron page from a dead local application service.
- Finding launch shortcuts that bypass a recovery-aware launcher.
- Keeping localization outside `app.asar` so official updates are easier to recover from.
- Using a loopback-only CDP sidecar without DLL injection, API hooking, or system-wide interception.
- Handling route changes, slow settings pages, mixed-language cache state, and repeated DOM rescans.
- Protecting proxy routes, user content, project names, session titles, account identifiers, and model product names.
- Proving the rendered page is healthy instead of treating process existence or HTTP 200 as success.

## Quick start

Run the page verifier from a machine with Antigravity open:

```powershell
node scripts/verify-cdp-page.cjs
```

Optional environment variables:

```powershell
$env:ANTIGRAVITY_CN_EXPECTED_VERSION = '14'
$env:ANTIGRAVITY_CN_MIN_DICTIONARY = '1000'
$env:ANTIGRAVITY_EXPECTED_TEXTS = '工作区,设置,视图'
node scripts/verify-cdp-page.cjs
```

Before publishing or pushing changes, run the repository safety check:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-repo-safety.ps1
```

## Core rule

Evidence comes before mutation. Read the process tree, launcher, DevTools targets, local service state, and recent logs. Change the smallest responsible layer. Re-read the rendered page after every write.

## Contents

- `skills/antigravity-repair-localization/SKILL.md`: reusable agent workflow.
- `docs/lessons-learned.md`: reasoning and durable lessons from the successful repair.
- `docs/mining-notes.md`: sanitized evidence and candidate-skill selection.
- `docs/operational-rules.md`: rules that prevent proxy, privacy, and verification mistakes.
- `docs/acceptance-checklist.md`: compact before-and-after checklist.
- `docs/failure-modes.md`: common symptoms, evidence, and bounded responses.
- `scripts/verify-cdp-page.cjs`: generic rendered-page verification.
- `scripts/check-repo-safety.ps1`: checks tracked files for common secret and local-data leaks.

This repository intentionally excludes raw transcripts, local logs, account data, proxy node names, tokens, and machine-specific paths.
