# Mining Notes

This note records how the reusable workflow was selected from recent maintenance evidence. Raw transcripts, account data, local paths, and proxy identifiers are intentionally omitted.

## Sources reviewed

- Recent maintenance record for the Antigravity startup and localization work.
- One compressed rollout summary describing the recurring blank-window repair.
- A first-pass local session scan covering 28 sessions from the last 30 days: 20 Codex sessions, 1 Gemini source, and 7 compressed summaries.
- Current live verification results from the external localization sidecar.

The session scanner also found broad publish and frontend clusters. Those were not copied into this project because they are generic or unrelated to the narrow Antigravity maintenance workflow.

## Strong candidate

### Antigravity repair and external localization

- Score: 5/5.
- Recurrence: blank startup, repeated blank startup, continued localization, update recovery, and explicit proxy-boundary corrections.
- Friction: agents can stop at process existence, HTTP 200, or a transport probe without proving the rendered UI.
- Risk: a shortcut repair or proxy change can affect the whole application and user data.
- Portability: the workflow transfers to other Electron applications with local services, CDP, and update-prone launch entries.
- Validation: rendered DOM, marker version, dictionary count, launcher preservation, guarded recovery, syntax, and repository safety checks.

## Sanitized positive examples

1. "打开后空白" triggered a rendered-page investigation rather than a process-only restart.
2. "又空白了" triggered comparison of the current shortcut and the known-good launcher.
3. "顺便帮我汉化" triggered an external dictionary and sidecar workflow.
4. "有没有办法一劳永逸" triggered persistence across updates and route changes.
5. "你有关于反重力的代理你都别动" became a hard operating boundary for all later repairs.
6. "帮我再完整翻译下现在的版本" triggered versioned dictionary coverage and settings-page scans.

## Near misses the skill must prevent

1. A process can exist while the current DevTools page is still `chrome-error:`.
2. A local service can return HTTP 200 while Electron has not rendered the application root.
3. An OAuth or model endpoint can return a credential-less 400/401 while authenticated login and real generation remain unverified.
4. A route test can identify a better candidate node without authorizing a route change.
5. A mixed-language text node can look translated while still containing an untranslated UI label.
6. A repeated substring rule can corrupt a sentence by appending the same translated fragment on every rescan.

## Selected reusable assets

- `skills/antigravity-repair-localization/SKILL.md` captures the workflow and boundaries.
- `docs/operational-rules.md` captures durable user corrections and escalation limits.
- `docs/acceptance-checklist.md` separates repair, localization, preservation, and publishing gates.
- `scripts/verify-cdp-page.cjs` turns rendered-state evidence into a repeatable check.
- `scripts/check-repo-safety.ps1` turns privacy review into a deterministic pre-push check.

## Personal versus publishable details

Personal details removed or parameterized:

- Windows usernames and absolute machine paths;
- account names and email addresses;
- exact proxy node names and route choices;
- local logs, transcripts, backups, and tokens;
- version-specific shortcut identities;
- project names and conversation titles.

The remaining rules describe behavior and evidence, not one machine's private state.
