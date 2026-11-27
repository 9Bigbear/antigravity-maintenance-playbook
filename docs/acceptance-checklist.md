# Acceptance Checklist

## Before a change

- [ ] Confirm the installed version.
- [ ] Record the active launcher and all visible shortcuts.
- [ ] Read the DevTools target list.
- [ ] Capture the current page URL and rendered-state evidence.
- [ ] Confirm whether the page is healthy, an onboarding page, or a `chrome-error:` page.
- [ ] Create a rollback backup for the exact files or shortcuts to be changed.
- [ ] Record proxy settings as read-only context and freeze them unless explicitly authorized otherwise.

## After a startup repair

- [ ] The main window is responsive.
- [ ] `document.readyState` is complete.
- [ ] The application root has visible content.
- [ ] The URL is not `chrome-error:`.
- [ ] The expected UI is visible.
- [ ] Re-running the launcher does not replace the current document.
- [ ] Healthy guarded recovery skips the page.

## After localization changes

- [ ] The marker version matches the deployed sidecar.
- [ ] The dictionary count is above the expected floor.
- [ ] Dynamic greeting, project, model, permission, and quota templates render correctly.
- [ ] Slow settings pages are checked after they finish rendering.
- [ ] Route changes trigger a bounded rescan.
- [ ] Mixed-language cache state can be corrected.
- [ ] Known full sentences do not accumulate repeated translations.
- [ ] User projects, session titles, account identifiers, model product names, and message bodies remain unchanged.

## Before publishing a project

- [ ] Raw logs and transcripts are excluded.
- [ ] Account identifiers and email addresses are absent.
- [ ] Machine-specific absolute paths are absent or replaced with placeholders.
- [ ] Proxy nodes, tokens, cookies, and credentials are absent.
- [ ] Syntax checks pass.
- [ ] The repository safety scanner passes.
- [ ] The README states the verification boundary and remaining limits.
