import { escapeHtml, sanitizeRichHtml } from '../core/sanitize.js';
import { quiz } from '../core/session.js';

/**
 * Interactive Quiz & Assessment Engine (header quiz). Questions come from a server-graded
 * session; answers are checked by the server.
 */
export class QuizEngine {
  constructor() {
    this.modalEl = null;
    this.currentLevel = 'beginner';
    this.sessionId = null;
    this.questions = [];
    this.reveals = new Map();
    this.currentIndex = 0;
    this.score = 0;
  }

  async open(level = 'beginner') {
    this.currentLevel = level;
    this.sessionId = null;
    this.questions = [];
    this.reveals = new Map();
    this.currentIndex = 0;
    this.score = 0;
    this.createModal();
    try {
      const started = await quiz.start('bank', level);
      this.sessionId = started.sessionId;
      this.questions = started.questions;
    } catch (err) {
      this.showMessage(`Sorular yüklenemedi: ${escapeHtml(err.message)}`);
      return;
    }
    if (this.questions.length === 0) {
      this.showMessage('Bu seviye için henüz soru yok.');
      return;
    }
    this.renderQuestion();
  }

  createModal() {
    this.close();

    this.modalEl = document.createElement('div');
    this.modalEl.className = 'quiz-modal-overlay';
    this.modalEl.innerHTML = `
      <div class="quiz-modal">
        <div class="quiz-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">🧪</span>
            <div>
              <h3 style="font-family: var(--font-display); font-size: 1.1rem; color: #fff;">
                ${escapeHtml(this.currentLevel.toUpperCase())} SEVİYE DEĞERLENDİRME SINAVI
              </h3>
              <span style="font-size: 0.75rem; color: var(--text-muted);">
                Soru <span id="quiz-curr-num">1</span> / <span id="quiz-total">…</span> • Puan: <span id="quiz-score">0</span>
              </span>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-quiz-close">✕ Kapat</button>
        </div>

        <div class="quiz-progress-container">
          <div class="quiz-progress-bar" id="quiz-progress-bar" style="width: 0%;"></div>
        </div>

        <div class="quiz-modal-body" id="quiz-modal-body">
          <p>Sorular hazırlanıyor…</p>
        </div>

        <div class="quiz-modal-footer">
          <button class="btn btn-secondary btn-sm" id="btn-quiz-prev" disabled>◀ Önceki</button>
          <button class="btn btn-primary btn-sm" id="btn-quiz-next">Sonraki ▶</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modalEl);

    this.modalEl.querySelector('#btn-quiz-close').addEventListener('click', () => this.close());
    this.modalEl.querySelector('#btn-quiz-prev').addEventListener('click', () => this.prev());
    this.modalEl.querySelector('#btn-quiz-next').addEventListener('click', () => this.next());
  }

  showMessage(html) {
    if (!this.modalEl) return;
    this.modalEl.querySelector('#quiz-modal-body').innerHTML = `<p>${html}</p>`;
    this.modalEl.querySelector('#btn-quiz-next').disabled = true;
  }

  close() {
    if (this.modalEl) {
      this.modalEl.remove();
      this.modalEl = null;
    }
  }

  renderQuestion() {
    if (!this.modalEl || this.questions.length === 0) return;

    const q = this.questions[this.currentIndex];
    const reveal = this.reveals.get(q.id);
    const body = this.modalEl.querySelector('#quiz-modal-body');

    this.modalEl.querySelector('#quiz-curr-num').textContent = this.currentIndex + 1;
    this.modalEl.querySelector('#quiz-total').textContent = this.questions.length;
    this.modalEl.querySelector('#quiz-score').textContent = this.score;
    this.modalEl.querySelector('#quiz-progress-bar').style.width = `${((this.currentIndex + 1) / this.questions.length) * 100}%`;
    this.modalEl.querySelector('#btn-quiz-prev').disabled = this.currentIndex === 0;
    this.modalEl.querySelector('#btn-quiz-next').textContent = this.currentIndex === this.questions.length - 1 ? 'Sınavı Tamamla 🏁' : 'Sonraki ▶';

    const answered = reveal !== undefined;
    body.innerHTML = `
      <span class="quiz-category-tag">${escapeHtml(q.category || '')} • ${escapeHtml((q.type || 'soru').toUpperCase())}</span>
      <h3 class="quiz-question-title">${sanitizeRichHtml(q.question)}</h3>

      ${q.code ? `<pre class="quiz-code-snippet"><code>${escapeHtml(q.code)}</code></pre>` : ''}

      <div class="quiz-options-list">
        ${q.options.map((opt, i) => {
          let extraClass = '';
          if (answered) {
            if (opt.token === reveal.correctToken) extraClass = 'correct';
            else if (opt.token === reveal.token) extraClass = 'incorrect';
          }
          return `
            <button class="quiz-option-btn ${extraClass}" data-token="${escapeHtml(opt.token)}" ${answered ? 'disabled' : ''}>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; opacity: 0.6;">[${String.fromCharCode(65 + i)}]</span>
              <span>${sanitizeRichHtml(opt.text)}</span>
            </button>
          `;
        }).join('')}
      </div>

      ${answered ? `
        <div class="quiz-explanation-box">
          <div style="font-weight: 700; color: ${reveal.correct ? 'var(--accent-emerald)' : 'var(--accent-pink)'}; margin-bottom: 6px;">
            ${reveal.correct ? '🎉 TEBRİKLER! DOĞRU CEVAP' : '❌ YANLIŞ CEVAP'}
          </div>
          <p class="quiz-explanation-text">${sanitizeRichHtml(reveal.explanation || '')}</p>
          ${reveal.engineBehavior ? `
          <div style="background: rgba(0, 240, 255, 0.08); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--accent-cyan); margin-bottom: 6px;">
            ⚙️ <strong>V8 Motor Davranışı:</strong> ${sanitizeRichHtml(reveal.engineBehavior)}
          </div>` : ''}
          ${reveal.bestPractice ? `
          <div style="background: rgba(16, 185, 129, 0.08); padding: 10px; border-radius: 6px; font-size: 0.82rem; color: var(--accent-emerald);">
            🛡️ <strong>Best Practice:</strong> ${sanitizeRichHtml(reveal.bestPractice)}
          </div>` : ''}
        </div>
      ` : ''}
    `;

    body.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.selectAnswer(btn.getAttribute('data-token')));
    });
  }

  async selectAnswer(token) {
    const q = this.questions[this.currentIndex];
    if (this.reveals.has(q.id)) return;
    try {
      const result = await quiz.answer(this.sessionId, q.id, token);
      this.reveals.set(q.id, { token, ...result });
      if (result.correct) this.score += 10;
      this.renderQuestion();
    } catch (err) {
      this.showMessage(`Cevap kaydedilemedi: ${escapeHtml(err.message)}`);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    } else {
      this.finish();
    }
  }

  async finish() {
    const body = this.modalEl.querySelector('#quiz-modal-body');
    let result;
    try {
      result = await quiz.finish(this.sessionId);
    } catch (err) {
      this.showMessage(`Sonuç hesaplanamadı: ${escapeHtml(err.message)}`);
      return;
    }
    const total = result.total * 10;
    const percent = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    body.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">🏆</div>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin-bottom: 8px;">
          Sınavı Tamamladınız!
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">
          ${escapeHtml(this.currentLevel.toUpperCase())} seviyesindeki soruları başarıyla yanıtladınız.
        </p>

        <div style="display: inline-flex; align-items: center; justify-content: center; gap: 24px; background: rgba(255, 255, 255, 0.05); padding: 18px 32px; border-radius: var(--radius-md); border: 1px solid var(--border-glow); margin-bottom: 24px;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">TOPLAM PUAN</div>
            <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--accent-cyan);">${result.correct * 10} / ${total}</div>
          </div>
          <div style="width: 1px; height: 40px; background: var(--border-subtle);"></div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">BAŞARI ORANI</div>
            <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: ${percent >= 70 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">%${percent}</div>
          </div>
        </div>

        <div>
          <button class="btn btn-primary" id="btn-finish-close">Kapat ve Eğitime Dön</button>
        </div>
      </div>
    `;
    body.querySelector('#btn-finish-close')?.addEventListener('click', () => this.close());
  }
}

export const quizEngine = new QuizEngine();
