/**
 * session.js
 * Account sign-in, server progress sync and the sign-in gate.
 *
 * The server is the source of truth for progress. The localStorage caches that the
 * screens read (completed lessons, known words, placement) are refreshed from the server
 * after sign-in. Events that could not be sent (offline, server down) wait in a local
 * queue and are sent on the next successful request.
 */
import { appState } from './state.js';
import { escapeHtml } from './sanitize.js';
import { loadCatalog } from './catalog.js';

const API = '/api';
const QUEUE_KEY = 'pending_events_v1';
const USER_KEY = 'session_user_v1';
const VOCAB_KEY = 'english_vocab_known_v1';
const PLACEMENT_KEY = 'english_placement_v1';
const QUEUE_LIMIT = 500;
const BATCH_SIZE = 100;

export class SessionError extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function call(path, { method = 'GET', body } = {}) {
  const hasBody = body !== undefined;
  const res = await fetch(`${API}${path}`, {
    method,
    credentials: 'include',
    headers: hasBody ? { 'Content-Type': 'application/json' } : {},
    body: hasBody ? JSON.stringify(body) : undefined
  });
  let data = null;
  let isJson = false;
  try {
    data = await res.json();
    isJson = true;
  } catch {
    // Empty body (204) or non-JSON response.
  }
  if (!res.ok) {
    // A bare 500 from the dev proxy means the API process is not running.
    const message = !isJson && res.status >= 500
      ? 'API sunucusu yanıt vermiyor. `npm run dev` ile başlattığından emin ol.'
      : data?.error || `HTTP ${res.status}`;
    throw new SessionError(res.status, message, data?.code);
  }
  return data;
}

/** Administrator actions on accounts (the server checks the role again). */
export const admin = {
  listUsers: (status) => call(`/admin/users${status ? `?status=${encodeURIComponent(status)}` : ''}`),
  approve: (id) => call(`/admin/users/${Number(id)}/approve`, { method: 'POST', body: {} }),
  reject: (id) => call(`/admin/users/${Number(id)}/reject`, { method: 'POST', body: {} }),
  disable: (id) => call(`/admin/users/${Number(id)}/disable`, { method: 'POST', body: {} })
};

/** Server-graded quizzes: the browser never sees the answer key. */
export const quiz = {
  start: (kind, ref = null) => call('/quiz/start', { method: 'POST', body: { kind, ref } }),
  answer: (sessionId, questionId, token) => call('/quiz/answer', { method: 'POST', body: { sessionId, questionId, token } }),
  finish: (sessionId) => call('/quiz/finish', { method: 'POST', body: { sessionId } })
};

/** Spaced-repetition reviews and learning statistics. */
export const learning = {
  reviews: (limit = 10) => call(`/me/reviews?limit=${Number(limit)}`),
  stats: () => call('/me/stats')
};

let currentUser = null;

export function getCurrentUser() {
  return currentUser;
}

export function isAdmin() {
  return currentUser?.role === 'admin';
}

/** Hides administrator-only controls for learners. */
function applyRoleUi() {
  for (const id of ['btn-header-admin', 'mob-nav-admin']) {
    const el = document.getElementById(id);
    if (el) el.style.display = isAdmin() ? '' : 'none';
  }
}

export const auth = {
  me: () => call('/auth/me'),
  login: (email, password) => call('/auth/login', { method: 'POST', body: { email, password } }),
  register: (email, password, displayName) =>
    call('/auth/register', { method: 'POST', body: { email, password, displayName } }),
  logout: () => call('/auth/logout', { method: 'POST', body: {} })
};

/* ---------- local caches ---------- */

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the server still has the data.
  }
}

function readKnownWords() {
  return readJson(VOCAB_KEY, []);
}

function localProgressPayload() {
  const completedModules = appState.get('completedModules') || [];
  const vocabKnown = readKnownWords();
  const placement = readJson(PLACEMENT_KEY, null);
  return {
    completedModules,
    vocabKnown,
    placement: placement ? { level: placement.level, score: placement.score, perLevel: placement.perLevel || {} } : null
  };
}

function hasLocalProgress(payload) {
  return payload.completedModules.length > 0 || payload.vocabKnown.length > 0 || payload.placement !== null;
}

/** Removes everything this browser cached about progress (used on sign-out). */
function clearLocalProgress() {
  appState.data.completedModules = [];
  appState.saveToStorage();
  for (const key of [VOCAB_KEY, PLACEMENT_KEY, QUEUE_KEY, USER_KEY]) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

/* ---------- event queue ---------- */

function readQueue() {
  const queue = readJson(QUEUE_KEY, []);
  return Array.isArray(queue) ? queue : [];
}

function writeQueue(queue) {
  writeJson(QUEUE_KEY, queue.slice(-QUEUE_LIMIT));
}

let flushing = null;

/** Sends queued events. 400 means the server rejected the batch (dropped); other errors keep it queued. */
export function flushQueue() {
  if (flushing) return flushing;
  flushing = (async () => {
    while (readQueue().length > 0) {
      const batch = readQueue().slice(0, BATCH_SIZE);
      try {
        await call('/me/events', { method: 'POST', body: { events: batch } });
      } catch (err) {
        if (err.status !== 400) break; // offline, not signed in or server error: keep for later
        console.warn('[sync] sunucu olayları reddetti, bu grup atlandı:', err.message);
      }
      writeQueue(readQueue().slice(batch.length));
    }
  })().finally(() => {
    flushing = null;
  });
  return flushing;
}

/** Queues learning events and tries to send them right away. Never throws. */
export function recordEvents(events) {
  writeQueue([...readQueue(), ...events]);
  flushQueue().catch(() => {});
}

/* ---------- hydration ---------- */

async function hydrate() {
  const { tracks = {} } = await call('/me/progress');
  const completed = new Set(appState.get('completedModules') || []);
  const known = new Set(readKnownWords());
  let placement = readJson(PLACEMENT_KEY, null);

  for (const track of Object.values(tracks)) {
    for (const id of track.completedModules || []) completed.add(id);
    for (const id of track.vocabKnown || []) known.add(id);
    if (track.placement) placement = { ...track.placement, stageId: placement?.stageId };
  }

  appState.data.completedModules = [...completed];
  appState.saveToStorage();
  appState.emit('progress', appState.data.completedModules);
  writeJson(VOCAB_KEY, [...known]);
  if (placement) writeJson(PLACEMENT_KEY, placement);
}

/** Runs once per account on the server; local progress from before accounts existed is uploaded here. */
async function importLocalOnce() {
  const payload = localProgressPayload();
  if (!hasLocalProgress(payload)) return;
  try {
    await call('/me/import', { method: 'POST', body: payload });
  } catch (err) {
    console.warn('[sync] yerel ilerleme aktarılamadı:', err.message);
  }
}

async function afterSignIn(user) {
  writeJson(USER_KEY, user.id);
  await importLocalOnce();
  await hydrate();
  await flushQueue();
}

/* ---------- sign-in gate ---------- */

const GATE_ID = 'auth-gate';

function gateEl() {
  return document.getElementById(GATE_ID);
}

function showGate({ message = '', mode = 'login', pending = false } = {}) {
  const el = gateEl();
  if (!el) return;
  const isRegister = mode === 'register';
  el.hidden = false;
  el.innerHTML = `
    <div class="auth-card" role="dialog" aria-labelledby="auth-title">
      <h1 id="auth-title">${isRegister ? 'Başvuru' : 'Giriş'}</h1>
      <p class="auth-lead">${isRegister
        ? 'Başvurun yönetici tarafından onaylandıktan sonra giriş yapabilirsin.'
        : 'Hesabınla giriş yap. İlerlemen hesabında saklanır.'}</p>
      ${message ? `<p class="auth-message ${pending ? 'auth-info' : 'auth-error'}" role="alert">${escapeHtml(message)}</p>` : ''}
      <form id="auth-form" class="auth-form">
        ${isRegister ? `
          <label>Ad <input name="displayName" autocomplete="name" maxlength="80"></label>` : ''}
        <label>E-posta <input name="email" type="email" autocomplete="email" required maxlength="254"></label>
        <label>Şifre <input name="password" type="password" autocomplete="${isRegister ? 'new-password' : 'current-password'}" required minlength="${isRegister ? 10 : 1}" maxlength="200"></label>
        <button class="btn btn-primary" type="submit">${isRegister ? 'Başvur' : 'Giriş yap'}</button>
      </form>
      <button class="auth-switch" type="button" id="auth-switch">${isRegister ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Başvur'}</button>
    </div>`;

  el.querySelector('#auth-switch').addEventListener('click', () => showGate({ mode: isRegister ? 'login' : 'register' }));
  el.querySelector('#auth-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    try {
      if (isRegister) {
        const res = await auth.register(data.email, data.password, data.displayName || '');
        showGate({ mode: 'login', message: res.message, pending: true });
        return;
      }
      const user = await auth.login(data.email, data.password);
      await afterSignIn(user);
      hideGate();
      window.location.reload(); // start the app with the signed-in state
    } catch (err) {
      const pendingState = err.code === 'pending' || err.code === 'rejected';
      showGate({ mode, message: err.message, pending: pendingState });
    }
  });
}

function hideGate() {
  const el = gateEl();
  if (el) {
    el.hidden = true;
    el.innerHTML = '';
  }
}

async function signOut() {
  await flushQueue().catch(() => {});
  try {
    await auth.logout();
  } catch {
    // Session may already be gone.
  }
  clearLocalProgress();
  window.location.reload();
}

/**
 * Checks the session before the app starts. Signed-in users get fresh progress and then
 * `onReady()` runs; otherwise the sign-in gate is shown and the app stays hidden.
 */
export async function startSession(onReady) {
  document.getElementById('btn-header-logout')?.addEventListener('click', signOut);

  // Progress events are recorded from any screen once the session is open.
  appState.subscribe('completed', (moduleId) => {
    // English lessons are only completed by the server when a quiz is passed.
    if (moduleId.startsWith('en-')) return;
    recordEvents([{
      kind: 'lesson_completed',
      trackId: moduleId.startsWith('en-') ? 'english' : 'js',
      itemId: moduleId,
      data: {}
    }]);
  });

  let user = null;
  try {
    user = await auth.me();
    currentUser = user;
  } catch (err) {
    if (err.status !== 401) {
      showGate({ message: 'Sunucuya ulaşılamıyor. Sunucunun çalıştığından emin ol.' });
      return;
    }
  }

  if (!user) {
    showGate();
    return;
  }

  try {
    await afterSignIn(user);
  } catch (err) {
    console.warn('[sync] ilerleme yüklenemedi:', err.message);
  }
  applyRoleUi();
  try {
    await loadCatalog();
  } catch (err) {
    showGate({ message: `Ders içeriği yüklenemedi: ${err.message}` });
    return;
  }
  hideGate();
  onReady();
}
