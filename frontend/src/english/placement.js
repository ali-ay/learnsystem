/**
 * placement.js
 * Level placement test for the English track. The server builds the test, shuffles it,
 * grades it and decides the level. Answers are sent as they are given; the result comes
 * from the server when the test is finished.
 * The result is kept in localStorage as a cache.
 */
import { getPlacement } from '../core/catalog.js';
import { escapeHtml } from '../core/sanitize.js';
import { quiz } from '../core/session.js';

const STORAGE_KEY = 'english_placement_v1';
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

export function getPlacementResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePlacementResult(result) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Storage may be unavailable (private mode); the result is still shown.
  }
}

/**
 * Renders the test into `container`.
 * @param {HTMLElement} container
 * @param {{ onStart: (stageId:string, moduleId:string|null) => void }} handlers
 */
export function mountPlacement(container, { onStart }) {
  container.innerHTML = `<div class="track-empty"><p>Seviye testi hazırlanıyor…</p></div>`;
  begin();

  async function begin() {
    let started;
    try {
      started = await quiz.start('placement');
    } catch (err) {
      container.innerHTML = `<div class="track-empty"><h2>Seviye testi yüklenemedi</h2><p>${escapeHtml(err.message)}</p></div>`;
      return;
    }
    if (started.questions.length === 0) {
      container.innerHTML = `<div class="track-empty"><h2>Seviye testi henüz hazır değil</h2></div>`;
      return;
    }
    runAttempt(started.sessionId, started.questions);
  }

  function runAttempt(sessionId, questions) {
    const total = questions.length;
    const answers = new Map(); // questionId -> token
    let index = 0;
    let saving = false;

    const renderQuestion = () => {
      const item = questions[index];
      const picked = answers.get(item.id);
      const progress = Math.round((index / total) * 100);
      container.innerHTML = `
        <div class="track-empty placement-card">
          <div class="placement-head">
            <span class="placement-step">Seviye Testi · ${index + 1} / ${total}</span>
            <div class="placement-progress"><span style="width:${progress}%"></span></div>
          </div>
          <h2 class="placement-question">${escapeHtml(item.question)}</h2>
          <div class="placement-options">
            ${item.options.map((opt, i) => `
              <button class="placement-option ${picked === opt.token ? 'selected' : ''}" data-token="${escapeHtml(opt.token)}" ${saving ? 'disabled' : ''}>
                <span class="placement-letter">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt.text)}
              </button>`).join('')}
          </div>
          <div class="track-actions">
            <button class="btn btn-secondary btn-sm" id="pl-prev" ${index === 0 ? 'disabled' : ''}>← Önceki</button>
            <button class="btn btn-primary btn-sm" id="pl-next" ${picked === undefined || saving ? 'disabled' : ''}>
              ${index === total - 1 ? 'Sonucu gör' : 'Sonraki →'}
            </button>
          </div>
          <p class="placement-skip"><a href="#/english/stage-1" id="pl-skip">Testi atla ve baştan başla</a></p>
        </div>`;

      container.querySelectorAll('.placement-option').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (saving) return;
          saving = true;
          const token = btn.dataset.token;
          try {
            await quiz.answer(sessionId, item.id, token);
            answers.set(item.id, token);
          } catch (err) {
            container.insertAdjacentHTML('afterbegin', `<p class="auth-error">Cevap kaydedilemedi: ${escapeHtml(err.message)}</p>`);
          } finally {
            saving = false;
            renderQuestion();
          }
        });
      });
      container.querySelector('#pl-prev')?.addEventListener('click', () => {
        if (index > 0) { index--; renderQuestion(); }
      });
      container.querySelector('#pl-next')?.addEventListener('click', () => {
        if (answers.get(item.id) === undefined) return;
        if (index < total - 1) { index++; renderQuestion(); } else { renderResult(); }
      });
      container.querySelector('#pl-skip')?.addEventListener('click', (e) => {
        e.preventDefault();
        onStart(getPlacement().levels[0].stageId, null);
      });
    };

    const renderResult = async () => {
      container.innerHTML = `<div class="track-empty"><p>Sonuç hesaplanıyor…</p></div>`;
      let result;
      try {
        result = await quiz.finish(sessionId);
      } catch (err) {
        container.innerHTML = `<div class="track-empty"><h2>Sonuç hesaplanamadı</h2><p>${escapeHtml(err.message)}</p></div>`;
        return;
      }
      savePlacementResult({
        level: result.level, score: result.score, total: result.total,
        perLevel: result.perLevel, date: new Date().toISOString(), stageId: result.stageId
      });

      const breakdown = LEVEL_ORDER.filter(lv => result.perLevel[lv]);
      container.innerHTML = `
        <div class="track-empty placement-card">
          <span class="track-icon">🎯</span>
          <h2>Seviyen: ${escapeHtml(result.label)}</h2>
          <p class="placement-score">${result.total} sorudan <strong>${result.score}</strong> doğru</p>
          <p>${escapeHtml(result.summary)}</p>
          <div class="placement-breakdown">
            ${breakdown.map(lv => `
              <div class="placement-row"><span>${lv}</span><span>${result.perLevel[lv][0]} / ${result.perLevel[lv][1]}</span></div>`).join('')}
          </div>
          <div class="track-actions">
            <button class="btn btn-primary btn-sm" id="pl-start">${escapeHtml(result.label)} derslerine başla</button>
            <button class="btn btn-secondary btn-sm" id="pl-retry">Testi tekrarla</button>
          </div>
        </div>`;

      container.querySelector('#pl-start')?.addEventListener('click', () => onStart(result.stageId, null));
      container.querySelector('#pl-retry')?.addEventListener('click', () => begin());
    };

    renderQuestion();
  }
}
