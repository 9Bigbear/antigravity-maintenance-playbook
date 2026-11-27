# Failure Modes

| Symptom | Strong evidence | Bounded response |
| --- | --- | --- |
| Window is blank | `chrome-error:` or empty root in the actual DevTools page | Inspect the entry point, local service readiness, and current target. Repair the bypassing launcher only. |
| Local URL returns 200 but window is blank | HTTP succeeds while DevTools DOM is still an error page | Treat HTTP 200 as service evidence only. Validate the rendered page separately. |
| App works from one shortcut but not another | Different command lines or working directories | Route the failing shortcut through the known-good launcher and keep a backup. |
| Translation disappears after update | Installed version or packaged resources changed | Reload the external dictionary and reattach the sidecar. Do not assume the old marker is valid. |
| Settings page remains partly English | Slow route, reused root, or mixed-language cached text | Wait for the page, trigger a bounded root rescan, and retry mixed-language nodes. |
| One sentence repeats translated fragments | Partial substring rule runs on its own output | Add an exact normalization rule for the full sentence and version the injector. |
| Model endpoint times out | TLS or HTTP transport fails through the current route | Report transport failure separately. Do not change the route without explicit authorization. |
| Credential-less endpoint returns 400 or 401 | TLS and HTTP reached the service | Record transport reachability only; this is not login or generation proof. |
| User content changes language | Text protection boundary is too broad or too narrow | Restore from backup if needed, tighten selectors, and preserve user-authored text by default. |
