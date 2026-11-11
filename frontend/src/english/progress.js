/**
 * progress.js
 * English track progress: lessons passed, vocabulary known, stage unlocking,
 * the vocabulary and review sessions (server-graded), and the statistics card.
 * The known-word set is a local cache; the server records every answer.
 */
import { getStage, getTrackModules, getTrackStages } from '../core/catalog.js';
import { getPlacementResult } from './placement.js';
import { appState } from '../core/state.js';
import { escapeHtml } from '../core/sanitize.js';
import { quiz, learning } from '../core/session.js';

const KNOWN_KEY = 'english_vocab_known_v1';
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

function readKnown() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KNOWN_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

function writeKnown(set) {
  try {
    localStorage.setItem(KNOWN_KEY, JSON.stringify([...set]));
  } catch {
    // Storage unavailable: progress for this visit is still kept in memory.
  }
}

export function markWordKnown(wordId) {
  const known = readKnown();
  known.add(wordId);
  writeKnown(known);
}

/** Known-word counts for a stage. Word ids start with the stage id (e.g. "en-a1-w001"). */
export function stageVocabStats(stageId) {
  const stage = getStage(stageId);
  const total = stage?.vocabCount || 0;
  const target = stage?.vocabTarget || 0;
  const prefix = `${stageId}-w`;
  const count = [...readKnown()].filter(id => id.startsWith(prefix)).length;
  return { total, known: count, target };
}

export function stageLessonStats(stageId) {
  const lessons = getTrackModules('english').filter(m => m.stageId === stageId);
  const completed = appState.get('completedModules') || [];
  return { total: lessons.length, done: lessons.filter(l => completed.includes(l.id)).length };
}

export function stageComplete(stageId) {
  const lessons = stageLessonStats(stageId);
  const vocab = stageVocabStats(stageId);
  const lessonsOk = lessons.total > 0 && lessons.done === lessons.total;
  const vocabOk = vocab.target === 0 || vocab.known >= vocab.target;
  return lessonsOk && vocabOk;
}

/**
 * A stage opens when: it is the first stage, the previous stage is complete,
 * or the placement test put the learner at this level or above.
 */
export function stageUnlocked(stageId) {
  const stageIds = getTrackStages('english').map(s => s.id);
  const index = stageIds.indexOf(stageId);
  if (index <= 0) return true;
  if (stageComplete(stageIds[index - 1])) return true;
  const placement = getPlacementResult();
  if (placement) {
    const placedIndex = LEVEL_ORDER.indexOf(placement.level);
    if (placedIndex >= index) return true;
  }
  return false;
}

export function stageStatus(stageId) {
  if (!stageUnlocked(stageId)) return 'locked';
  if (stageComplete(stageId)) return 'done';
  return 'active';
}

export function stageName(stageId) {
  return getStage(stageId)?.shortName || stageId;
}

function showLoading(container) {
  container.innerHTML = `<div class="track-empty"><p>Kelimeler hazırlanıyor…</p></div>`;
}

function showError(container, title, err) {
  container.innerHTML = `<div class="track-empty"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(err.message)}</p></div>`;
}

/**
 * Vocabulary session for one stage. The server picks the words and the options.
 * @param {HTMLElement} container
 * @param {string} stageId
 * @param {{ onDone: () => void }} handlers
 */
export async function mountVocabSession(container, stageId, { onDone }) {
  showLoading(container);
  let started;
  try {
    started = await quiz.start('vocab', stageId);
  } catch (err) {
    showError(container, 'Kelimeler yüklenemedi', err);
    return;
  }
  if (started.questions.length === 0) {
    container.innerHTML = `<div class="track-empty"><h2>${escapeHtml(stageName(stageId))} kelime listesi yok</h2><p>Bu seviyenin kelime listesi henüz eklenmedi.</p></div>`;
    return;
  }
  runSession(container, started, {
    stageId,
    title: 'Kelime Oturumu',
    onDone,
    restart: () => mountVocabSession(container, stageId, { onDone })
  });
}

/** Spaced-repetition review: the words the server says are due today. */
export async function mountReviewSession(container, { onDone }) {
  showLoading(container);
  let started;
  try {
    started = await quiz.start('review');
  } catch (err) {
    showError(container, 'Tekrar yüklenemedi', err);
    return;
  }
  if (started.questions.length === 0) {
    container.innerHTML = `
      <div class="track-empty placement-card">
        <span class="track-icon">🌤️</span>
        <h2>Bugün tekrar yok</h2>
        <p>Doğru bildiğin kelimeler zamanı gelince buraya düşer.</p>
        <div class="track-actions"><button class="btn btn-secondary btn-sm" id="review-back">Geri dön</button></div>
      </div>`;
    container.querySelector('#review-back')?.addEventListener('click', () => onDone());
    return;
  }
  runSession(container, started, {
    stageId: null,
    title: 'Tekrar oturumu',
    onDone,
    restart: () => mountReviewSession(container, { onDone })
  });
}

/** Renders the server-graded questions, sends each answer, and shows the summary. */
function runSession(container, started, { stageId, title, onDone, restart }) {
  const { sessionId, questions } = started;
  let index = 0;
  let correct = 0;
  let answered = null; // { token, correct, correctToken, explanation }
  let saving = false;

  const render = () => {
    const q = questions[index];
    const stats = stageId ? stageVocabStats(stageId) : null;
    const progressLabel = stats
      ? `${title} · ${index + 1} / ${questions.length} · Bilinen ${stats.known} / ${stats.target || stats.total}`
      : `${title} · ${index + 1} / ${questions.length}`;
    container.innerHTML = `
      <div class="track-empty placement-card">
        <div class="placement-head">
          <span class="placement-step">${escapeHtml(progressLabel)}</span>
          <div class="placement-progress"><span style="width:${Math.round((index / questions.length) * 100)}%"></span></div>
        </div>
        <h2 class="placement-question">${escapeHtml(q.question)}</h2>
        ${q.example ? `<p class="vocab-example">"${escapeHtml(q.example)}"</p>` : ''}
        <div class="placement-options">
          ${q.options.map((opt, i) => {
            let cls = '';
            if (answered) {
              if (opt.token === answered.correctToken) cls = 'correct';
              else if (opt.token === answered.token && !answered.correct) cls = 'wrong';
            }
            return `<button class="placement-option ${cls}" data-token="${escapeHtml(opt.token)}" ${answered || saving ? 'disabled' : ''}>
              <span class="placement-letter">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt.text)}
            </button>`;
          }).join('')}
        </div>
        <div class="track-actions">
          <span class="vocab-feedback">${answered === null ? '' : (answered.correct
            ? '✅ Doğru — kelime bilindi olarak işaretlendi'
            : `❌ Yanlış — ${escapeHtml(answered.explanation || '')}`)}</span>
          <button class="btn btn-primary btn-sm" id="vocab-next" ${answered === null ? 'disabled' : ''}>
            ${index === questions.length - 1 ? 'Sonucu gör' : 'Sonraki →'}
          </button>
        </div>
      </div>`;

    container.querySelectorAll('.placement-option').forEach(btn => {
      btn.addEventListener('click', () => choose(btn.dataset.token));
    });
    container.querySelector('#vocab-next')?.addEventListener('click', () => {
      if (answered === null) return;
      if (index < questions.length - 1) {
        index++;
        answered = null;
        render();
      } else {
        renderSummary();
      }
    });
  };

  const choose = async (token) => {
    if (saving || answered) return;
    saving = true;
    const q = questions[index];
    try {
      const result = await quiz.answer(sessionId, q.id, token);
      answered = { token, ...result };
      if (result.correct) {
        correct++;
        markWordKnown(q.id);
      }
    } catch (err) {
      container.insertAdjacentHTML('afterbegin', `<p class="auth-error">Cevap kaydedilemedi: ${escapeHtml(err.message)}</p>`);
    } finally {
      saving = false;
      render();
    }
  };

  const renderSummary = () => {
    const stats = stageId ? stageVocabStats(stageId) : null;
    const target = stats ? (stats.target || stats.total) : 0;
    container.innerHTML = `
      <div class="track-empty placement-card">
        <span class="track-icon">📚</span>
        <h2>${correct} / ${questions.length} doğru</h2>
        ${stats ? `
          <p class="placement-score">Bilinen kelime: ${stats.known} / ${target}</p>
          <p>${stats.known >= target
            ? 'Bu seviyenin kelime hedefine ulaştın.'
            : `Hedefe ${target - stats.known} kelime kaldı. Her oturumda doğru bildiklerin kalıcı olarak işaretlenir.`}</p>` : ''}
        <div class="track-actions">
          <button class="btn btn-primary btn-sm" id="vocab-again">Yeni oturum</button>
          <button class="btn btn-secondary btn-sm" id="vocab-back">İlerlemeye dön</button>
        </div>
      </div>`;
    container.querySelector('#vocab-again')?.addEventListener('click', () => restart());
    container.querySelector('#vocab-back')?.addEventListener('click', () => onDone());
  };

  render();
}

/** Activity bars for the last 14 days (UTC days, same as the server's streak). */
function activityBars(activity) {
  const counts = new Map(activity.map(a => [a.day, a.count]));
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const max = Math.max(1, ...days.map(d => counts.get(d) || 0));
  return days.map(d => {
    const n = counts.get(d) || 0;
    return `<span class="${n ? '' : 'empty'}" style="height:${Math.round((n / max) * 100)}%" title="${escapeHtml(d)}: ${n} etkinlik"></span>`;
  }).join('');
}

/**
 * Renders the English progress dashboard.
 * @param {HTMLElement} container
 * @param {{ onOpenStage: (stageId:string) => void, onVocab: (stageId:string) => void }} handlers
 */
export function renderProgressDashboard(container, handlers) {
  const { onOpenStage, onVocab } = handlers;
  const placement = getPlacementResult();
  const stages = getTrackStages('english');
  const rows = stages.map(stage => {
    const status = stageStatus(stage.id);
    const lessons = stageLessonStats(stage.id);
    const vocab = stageVocabStats(stage.id);
    const label = status === 'done' ? '✅ Tamamlandı' : status === 'locked' ? '🔒 Kilitli' : '▶️ Devam ediyor';
    const target = vocab.target || vocab.total;
    return `
      <div class="progress-row ${status}">
        <div class="progress-main">
          <strong>${escapeHtml(stage.name)}</strong>
          <span class="progress-status">${label}</span>
        </div>
        <div class="progress-meta">
          <span>Dersler: ${lessons.done} / ${lessons.total}</span>
          <span>Kelime: ${vocab.known} / ${target || 0}</span>
        </div>
        <div class="progress-actions">
          ${status !== 'locked' ? `<button class="btn btn-secondary btn-sm" data-open="${stage.id}">Derslere git</button>` : ''}
          ${status !== 'locked' && target ? `<button class="btn btn-primary btn-sm" data-vocab="${stage.id}">Kelime oturumu</button>` : ''}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="track-view-inner">
      <div class="track-hero">
        <h1>İlerleme</h1>
        <p>${placement
          ? `Seviye testi sonucun: <strong>${escapeHtml(placement.level)}</strong>.`
          : 'Henüz seviye testi yapmadın. <a href="#/english/placement">Seviye testine başla</a>.'}</p>
      </div>
      <div class="progress-stats" id="progress-stats"><p>İstatistikler yükleniyor…</p></div>
      <div class="progress-list">${rows}</div>
      <p class="progress-rule">Bir seviyeyi tamamlamak için o seviyenin tüm derslerinin testini geçmek ve kelime hedefine ulaşmak gerekir. Bir sonraki seviye, önceki seviye tamamlanınca açılır.</p>
    </div>`;

  container.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => onOpenStage(b.dataset.open)));
  container.querySelectorAll('[data-vocab]').forEach(b => b.addEventListener('click', () => onVocab(b.dataset.vocab)));

  const statsEl = container.querySelector('#progress-stats');
  learning.stats().then(stats => {
    if (!statsEl.isConnected) return;
    statsEl.innerHTML = `
      <div><strong>${stats.dueReviews}</strong> kelime bugün tekrar bekliyor · Çalışma serisi: <strong>${stats.streakDays}</strong> gün</div>
      <div class="progress-activity">${activityBars(stats.activity)}</div>
      <div class="track-actions">
        <button class="btn btn-primary btn-sm" id="btn-review" ${stats.dueReviews ? '' : 'disabled'}>Tekrar oturumu</button>
      </div>`;
    statsEl.querySelector('#btn-review')?.addEventListener('click', () => {
      mountReviewSession(container, { onDone: () => renderProgressDashboard(container, handlers) });
    });
  }).catch(err => {
    if (statsEl.isConnected) statsEl.innerHTML = `<p>İstatistikler yüklenemedi: ${escapeHtml(err.message)}</p>`;
  });
}
