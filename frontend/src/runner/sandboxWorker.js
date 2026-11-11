/**
 * sandboxWorker.js
 * Isolated Web Worker environment for safely evaluating JavaScript code
 * Intercepts console methods and serializes objects safely
 */

self.onmessage = function (e) {
  const { code, id } = e.data;
  const logs = [];

  function safeSerialize(arg) {
    if (arg === undefined) return 'undefined';
    if (arg === null) return 'null';
    if (typeof arg === 'function') return arg.toString();
    if (typeof arg === 'symbol') return arg.toString();
    if (typeof arg === 'bigint') return `${arg.toString()}n`;
    if (typeof arg === 'object') {
      try {
        const seen = new WeakSet();
        return JSON.stringify(arg, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return '[Circular Reference]';
            }
            seen.add(value);
          }
          if (typeof value === 'bigint') return `${value.toString()}n`;
          return value;
        }, 2);
      } catch (err) {
        return Object.prototype.toString.call(arg);
      }
    }
    return String(arg);
  }

  // Intercept console methods inside worker
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    table: console.table
  };

  const notifyLog = (method, args) => {
    const formatted = Array.from(args).map(safeSerialize).join(' ');
    self.postMessage({
      type: 'console',
      method,
      text: formatted,
      id
    });
  };

  console.log = (...args) => notifyLog('log', args);
  console.info = (...args) => notifyLog('info', args);
  console.warn = (...args) => notifyLog('warn', args);
  console.error = (...args) => notifyLog('error', args);
  console.table = (...args) => notifyLog('info', args);

  // The worker shares the page's origin, so a snippet could otherwise call the
  // curriculum REST API (e.g. DELETE /api/modules/:id). Block the app's own API
  // and the low-level network/loading primitives. Other fetch targets (demos
  // that hit external URLs, IndexedDB lessons, etc.) keep working.
  const realFetch = self.fetch.bind(self);
  const guardedFetch = (input, init) => {
    let target;
    try {
      target = new URL(typeof input === 'string' ? input : input.url, self.location.href);
    } catch {
      return Promise.reject(new TypeError('Geçersiz URL'));
    }
    if (target.origin === self.location.origin && target.pathname.startsWith('/api/')) {
      return Promise.reject(new TypeError('Kum havuzu uygulamanın yerel API uçlarına erişemez.'));
    }
    return realFetch(input, init);
  };
  try {
    Object.defineProperty(self, 'fetch', { value: guardedFetch, writable: false, configurable: false });
  } catch {
    // Already locked by an earlier run in this worker.
  }

  for (const name of ['XMLHttpRequest', 'WebSocket', 'EventSource', 'importScripts', 'Worker', 'SharedWorker']) {
    try {
      Object.defineProperty(self, name, { value: undefined, writable: false, configurable: false });
    } catch {
      // Not configurable in this engine; leave it as is.
    }
  }

  const startTime = performance.now();
  try {
    // Execute user code
    const fn = new Function('"use strict";\n' + code);
    const result = fn();
    const duration = (performance.now() - startTime).toFixed(2);

    self.postMessage({
      type: 'done',
      id,
      duration,
      result: safeSerialize(result)
    });
  } catch (err) {
    self.postMessage({
      type: 'error',
      id,
      message: err.name + ': ' + err.message,
      stack: err.stack
    });
  }
};
