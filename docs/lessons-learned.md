# Lessons Learned

## 1. A blank window is a rendered-state problem

The useful distinction is not "the process exists" versus "the process is gone". A healthy check must answer:

- Is the actual DevTools page present?
- Is `document.readyState` complete?
- Is the application root populated and visible?
- Is the page still on `chrome-error:`?
- Does the body contain the expected UI text?

An application can return HTTP 200 from a local service while Electron is still displaying `chrome-error://chromewebdata/`. Conversely, a process can exist while the UI is unusable. The rendered DOM is the acceptance boundary.

## 2. Fix the entry point that bypasses the working path

The recurring blank startup was caused by one launcher entry invoking the executable directly while another entry used the recovery-aware launcher. The durable repair was to route the bypassing shortcut through the existing launcher and keep an original shortcut backup.

This generalizes to update-prone desktop apps:

1. Compare every user-facing entry point.
2. Identify which entry preserves the required environment and readiness checks.
3. Repair only the bypassing entry.
4. Keep a rollback copy.
5. Reopen through the repaired entry and inspect the actual page.

Do not replace a working launcher with a new wrapper unless the existing path is proven insufficient.

## 3. External localization is easier to preserve

Patching a packaged application can work temporarily but is fragile across official updates. An external sidecar is more durable when it:

- connects only to the local CDP endpoint;
- injects page-level translations after the document exists;
- keeps a versioned marker so a new injector can replace an old one;
- watches DOM mutations without scanning the entire page on a fixed interval;
- performs bounded rescans after route changes and slow page loads;
- protects user-authored content and system values;
- records dictionary size and marker version for verification.

The sidecar should be treated as a translation layer, not as a second application runtime.

## 4. DOM translation needs state discipline

Several subtle failures came from the interaction between React-style DOM reuse and translation caches:

- A page route can reuse the same root node while replacing its content later.
- A slow settings page can finish rendering after the first scan.
- A previous translation can leave mixed Chinese and English in a text node.
- Skipping every repeated text node can freeze a partially translated result.
- Reapplying substring rules to already translated text can produce repeated fragments.

The reusable pattern is:

1. Version the injected script when translation behavior changes.
2. Retry mixed-language nodes instead of treating them as final.
3. Re-scan on route changes and after bounded delayed intervals.
4. Normalize known full sentences before applying partial word rules.
5. Add exact cleanup rules for strings that may already be partially translated.
6. Keep a stable marker and disconnect the previous observer when versions change.

## 5. Protect user content explicitly

The interface and the user's content share the same DOM. A localization pass must distinguish them.

Protect at least:

- project names;
- conversation titles;
- conversation bodies and model output;
- account names and email addresses;
- code blocks and editable inputs;
- model product names and official font names.

Translate only stable UI surfaces, labels, buttons, settings descriptions, aria labels, and known dynamic templates. When uncertain, preserve the original text and add a narrower rule later.

## 6. Network probes have limited meaning

Credential-less probes can prove that a TLS connection and HTTP request reached an endpoint. They do not prove account login, quota availability, or real model generation.

Keep these states separate:

- local service readiness;
- OAuth transport reachability;
- model endpoint transport reachability;
- authenticated account state;
- real model generation.

Do not fix a model timeout by changing proxy routes unless the user explicitly authorizes that change. A route change can affect every application sharing the local proxy.

## 7. User corrections are operating rules

The correction "do not touch Antigravity's proxy" is a durable boundary, not a one-turn preference. It means:

- do not switch nodes;
- do not change proxy mode;
- do not edit system proxy settings;
- do not add proxy launch flags;
- do not change inherited proxy environment variables;
- do not add automatic route switching to recovery logic.

When a repair needs a proxy change, stop at the concrete evidence and ask for explicit authorization. Otherwise continue with the launcher, sidecar, or verification layer that does not require that change.

## 8. Completion means verified preservation

A successful maintenance run ends with evidence that the requested behavior works and unrelated state survived. The minimum proof is:

- rendered page healthy;
- localization marker and dictionary present;
- launcher re-entry does not refresh or replace the current document;
- guarded recovery skips healthy pages;
- user content and protected identifiers remain unchanged;
- syntax and configuration files parse successfully.
