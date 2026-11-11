/**
 * codeRunner.js
 * Sandboxed code execution in a Web Worker with a hard timeout.
 */

export class CodeRunner {
  constructor(timeoutMs = 2000) {
    this.timeoutMs = timeoutMs;
    this.currentWorker = null;
    this.timeoutTimer = null;
    this.execId = 0;
    this.cancelPending = null; // settles the in-flight execute() promise
  }

  /**
   * Execute code string safely in Web Worker
   * @param {string} code
   * @param {Function} onLog Callback for realtime console lines: ({ method, text }) => void
   * @returns {Promise<{ success: boolean, result?: any, duration?: string, error?: string, timedOut?: boolean, cancelled?: boolean }>}
   */
  execute(code, onLog = () => {}) {
    // Starting a new run cancels the previous one (its promise still resolves).
    this.abort();

    const id = ++this.execId;

    return new Promise((resolve) => {
      let worker;
      try {
        worker = new Worker(new URL('./sandboxWorker.js', import.meta.url), { type: 'module' });
      } catch (e) {
        return resolve({ success: false, error: `Worker başlatılamadı: ${e.message}` });
      }

      this.currentWorker = worker;
      let isFinished = false;

      // Single exit point: every path (result, error, timeout, cancel) goes through here.
      const finish = (outcome) => {
        if (isFinished) return;
        isFinished = true;
        this.cancelPending = null;
        this.abort();
        resolve(outcome);
      };

      this.cancelPending = () => {
        if (isFinished) return;
        finish({ success: false, cancelled: true, error: 'Önceki çalıştırma iptal edildi.' });
      };

      // Guard against infinite loops (while(true), runaway recursion, ...).
      this.timeoutTimer = setTimeout(() => {
        const timeoutMsg = `[Zaman aşımı (${this.timeoutMs}ms)]: Kod çalışma süresini aştı. Sonsuz döngü olabilir; Worker zorla sonlandırıldı.`;
        onLog({ method: 'error', text: timeoutMsg });
        finish({ success: false, error: timeoutMsg, timedOut: true });
      }, this.timeoutMs);

      worker.onmessage = (event) => {
        const data = event.data;
        if (!data || data.id !== id) return;

        if (data.type === 'console') {
          onLog({ method: data.method, text: data.text });
        } else if (data.type === 'done') {
          finish({ success: true, result: data.result, duration: data.duration });
        } else if (data.type === 'error') {
          onLog({ method: 'error', text: data.message });
          finish({ success: false, error: data.message });
        }
      };

      worker.onerror = (err) => {
        const msg = `[Sözdizimi / Worker hatası]: ${err.message || 'Kod yürütülemedi'}`;
        onLog({ method: 'error', text: msg });
        finish({ success: false, error: msg });
      };

      worker.postMessage({ code, id });
    });
  }

  /**
   * Stop the current run (if any) and settle its promise.
   */
  abort() {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.currentWorker) {
      this.currentWorker.terminate();
      this.currentWorker = null;
    }
    if (this.cancelPending) {
      const cancel = this.cancelPending;
      this.cancelPending = null;
      cancel();
    }
  }
}

export const codeRunner = new CodeRunner(2000);
