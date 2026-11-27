'use strict';

const fs = require('node:fs');
const path = require('node:path');

function readPort() {
  if (process.env.ANTIGRAVITY_DEVTOOLS_PORT) return process.env.ANTIGRAVITY_DEVTOOLS_PORT.trim();
  const appData = process.env.APPDATA || path.join(process.env.USERPROFILE || '', 'AppData', 'Roaming');
  return fs.readFileSync(path.join(appData, 'Antigravity', 'DevToolsActivePort'), 'utf8').split(/\r?\n/)[0].trim();
}

async function getTarget(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`);
  if (!response.ok) throw new Error(`DevTools target list returned HTTP ${response.status}`);
  const targets = await response.json();
  const target = targets.find(item => item.type === 'page' && /^https:\/\/127\.0\.0\.1:/.test(item.url || ''));
  if (!target) throw new Error('No local Antigravity page target found');
  return target;
}

function evaluate(target, expression) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(target.webSocketDebuggerUrl);
    const timer = setTimeout(() => { socket.close(); reject(new Error('CDP evaluation timed out')); }, 8000);
    socket.onopen = () => socket.send(JSON.stringify({
      id: 1,
      method: 'Runtime.evaluate',
      params: { expression, returnByValue: true }
    }));
    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.id !== 1) return;
      clearTimeout(timer);
      socket.close();
      if (message.error || message.result?.exceptionDetails) {
        reject(new Error(message.error?.message || 'Runtime.evaluate failed'));
        return;
      }
      resolve(message.result?.result?.value);
    };
    socket.onerror = () => { clearTimeout(timer); reject(new Error('CDP WebSocket failed')); };
  });
}

(async () => {
  const port = readPort();
  const target = await getTarget(port);
  const state = await evaluate(target, `({
    href: location.href,
    ready: document.readyState,
    error: location.protocol === 'chrome-error:',
    root: !!document.querySelector('#root')?.childElementCount,
    rootHeight: document.querySelector('#root')?.getBoundingClientRect().height || 0,
    bodyLength: document.body?.innerText.length || 0,
    markerVersion: window.__ANTIGRAVITY_CN_SIDECAR__?.version,
    dictionarySize: window.__ANTIGRAVITY_CN_SIDECAR__?.dictionarySize,
    labels: (document.body?.innerText || '').split(/\\r?\\n/).filter(Boolean).slice(0, 120)
  })`);

  const expectedVersion = process.env.ANTIGRAVITY_CN_EXPECTED_VERSION;
  const minDictionary = Number(process.env.ANTIGRAVITY_CN_MIN_DICTIONARY || 0);
  const expectedTexts = (process.env.ANTIGRAVITY_EXPECTED_TEXTS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  const failures = [];
  if (state.ready !== 'complete') failures.push(`document.readyState=${state.ready}`);
  if (state.error) failures.push('page is chrome-error');
  if (!state.root || state.rootHeight <= 0 || state.bodyLength <= 0) failures.push('rendered root is empty');
  if (expectedVersion && String(state.markerVersion) !== expectedVersion) failures.push(`markerVersion=${state.markerVersion}`);
  if (state.markerVersion !== undefined && state.markerVersion !== null && state.dictionarySize === undefined) failures.push('dictionary size is missing');
  if (minDictionary && Number(state.dictionarySize || 0) < minDictionary) failures.push(`dictionarySize=${state.dictionarySize}`);
  for (const expected of expectedTexts) {
    if (!state.labels.some(label => label.includes(expected))) failures.push(`missing expected text: ${expected}`);
  }

  const result = { ok: failures.length === 0, port, targetUrl: target.url, state, failures };
  console.log(JSON.stringify(result));
  if (failures.length) process.exitCode = 1;
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
