---
name: antigravity-repair-localization
description: Diagnose recurring Antigravity blank startup and maintain an external Chinese localization on Windows while preserving proxy configuration, projects, conversations, account state, and rendered-page evidence.
---

# Antigravity Repair and Localization

Use this skill when the user reports Antigravity is blank, says it is blank again, asks to continue Chinese localization, asks for a durable external translation layer, or corrects the agent not to touch the proxy.

## Operating boundary

Preserve the existing proxy route, mode, system proxy, environment variables, and launch flags unless the user explicitly authorizes a proxy change. Preserve projects, conversations, account state, and user-authored text. Prefer a reversible external sidecar over packaged-app patching.

## Workflow

1. Inspect the installed version, process tree, visible shortcuts, launcher, DevTools port, target list, local service state, and recent maintenance logs.
2. Classify the failure from the actual page: healthy UI, onboarding, empty root, or `chrome-error:`.
3. Compare user-facing entry points. If one bypasses a known-good launcher, repair only that entry and keep the original backup.
4. Reopen through the repaired launcher and verify the rendered page: complete document, populated root, no error protocol, visible UI text, and responsive window.
5. Load translation externally through loopback-only CDP. Do not modify `app.asar`, use DLL injection, or intercept unrelated application APIs.
6. Keep a versioned marker and dictionary count. Disconnect an older observer when the marker version changes.
7. Protect project names, session titles, message bodies, account identifiers, code, inputs, model product names, and official font names.
8. Translate stable UI strings and narrow dynamic templates. For route changes and slow settings pages, schedule bounded delayed rescans instead of a fixed full-page interval.
9. Retry mixed-language nodes when they contain Latin characters. Add exact normalization rules for sentences that could be partially translated or repeatedly transformed.
10. Re-read every affected page and run the CDP verifier. Report transport reachability, authentication, and real model generation as separate states.

## Completion criteria

The task is complete only when the rendered page is healthy, the sidecar marker and dictionary are present, launcher re-entry preserves the current document, healthy recovery skips the page, protected user content is unchanged, and syntax/configuration checks pass.

## Do not infer

- A running process is not proof of a usable window.
- A local HTTP 200 is not proof of a rendered UI.
- A credential-less 400/401 is not proof of login or model generation.
- English in a user session title is not necessarily an untranslated UI label.
- A successful candidate proxy route test does not authorize switching the user's route.
