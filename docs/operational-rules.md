# Operational Rules

## Must

1. Inspect before editing.
2. Treat the active document and rendered DOM as the source of truth.
3. Compare all launch shortcuts before changing one.
4. Use the smallest responsible repair layer.
5. Keep a timestamped backup before changing a shortcut, launcher, dictionary, or sidecar.
6. Version every injected localization behavior change.
7. Re-read the affected page after a write.
8. Record the exact acceptance evidence and remaining limits.

## Never without explicit authorization

- Change proxy nodes or proxy mode.
- Change Windows system proxy settings.
- Add or remove proxy launch flags.
- Change inherited proxy environment variables.
- Delete projects, conversations, caches, credentials, or account data.
- Rewrite or patch the packaged application when an external layer is sufficient.
- Translate user-authored project names, conversation titles, conversation bodies, or model output.
- Claim model generation success from a 400/401 transport probe.
- Claim UI success from process existence, a local HTTP 200, or a stale screenshot.

## Escalation boundaries

- If the page is healthy, do not restart it just to test recovery.
- If a write may have partially applied, re-read before retrying.
- If an update replaces the entry point, restore the launcher routing and re-run page verification.
- If the page remains blank after the launcher path is confirmed, inspect the DevTools target and local service separately.
- If the user requests a proxy change, record the scope because every application sharing the proxy may be affected.
