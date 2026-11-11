/**
 * ModuleQuizManager: inline assessment for a lesson.
 * The server builds and grades the test (see core/session.js → quiz). Each answer shows
 * the correct option and the explanation; the final score and pass decision come from the server.
 */

import { escapeHtml, sanitizeRichHtml } from '../core/sanitize.js';
import { router } from '../core/router.js';
import { getTrackModuleStage } from '../core/tracks.js';
import { quiz } from '../core/session.js';

export class ModuleQuizManager {
  constructor() {
    this.mountEl = null;
    this.metadata = null;
    this.source = null;
    this.sessionId = null;
    this.questions = [];
    this.reveals = new Map();   // questionId -> { token, correct, correctToken, explanation, ... }
    this.currentIndex = 0;
    this.score = 0;             // points: 10 per correct answer
    this.onPass = null;
    this.world = null;
    this.pending = false;
  }

  /**
   * @param {HTMLElement} mountEl
   * @param {Object} metadata lesson metadata (id, title)
   * @param {{kind:string, ref:string}} source which test to start on the server
   * @param {Object} options
   */
  mount(mountEl, metadata, source, options = {}) {
    this.mountEl = mountEl;
    this.metadata = metadata;
    this.source = source;
    this.onPass = options.onPass || (() => {});
    this.world = options.world || null;
    this.isCompleted = options.isCompleted || false;
    this.labels = { note: '⚙️ V8 / Runtime Davranışı', tip: '🛡️ Best Practice', ...(options.labels || {}) };
    this.questions = [];
    this.reveals = new Map();
    this.currentIndex = 0;
    this.score = 0;
    this.sessionId = null;
    if (!this.mountEl) return;
    this.renderMessage('Test hazırlanıyor…');
    this.start();
  }

  async start() {
    try {
      const started = await quiz.start(this.source.kind, this.source.ref);
      this.sessionId = started.sessionId;
      this.questions = started.questions;
      if (this.questions.length === 0) {
        this.renderMessage('Bu ders için henüz test eklenmedi.');
        return;
      }
      this.render();
    } catch (err) {
      this.renderMessage(`Test yüklenemedi: ${escapeHtml(err.message)}`);
    }
  }

  renderMessage(text) {
    this.mountEl.innerHTML = `<div class="module-quiz-card"><div style="padding: 24px;">${text}</div></div>`;
  }

  render() {
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;
    const reveal = this.reveals.get(q.id);
    const answered = reveal !== undefined;
    const answeredCount = this.reveals.size;
    const progressPercent = ((this.currentIndex + 1) / total) * 100;

    this.mountEl.innerHTML = `
      <div class="module-quiz-card">
        <div class="module-quiz-header-bar">
          <div class="module-quiz-meta">
            <span style="font-size: 1.1rem;">🧪</span>
            <div>
              <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">
                Modül Ustalık Sınavı
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">
                Soru ${this.currentIndex + 1} / ${total} • Geçme Barajı: %80 (En az ${Math.ceil(total * 0.8)} Doğru)
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="quiz-score-pill">Puan: ${this.score} / ${answeredCount * 10}</span>
            <span class="quiz-status-pill ${this.isCompleted ? 'passed' : ''}">
              ${this.isCompleted ? '✓ Tamamlandı' : '⏳ Değerlendirme'}
            </span>
          </div>
        </div>

        <div class="quiz-progress-container">
          <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="module-quiz-content">
          <span class="quiz-category-tag">${escapeHtml(q.category || 'MÜFREDAT')} • ${escapeHtml(q.type ? q.type.toUpperCase() : 'SORU')}</span>
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
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; opacity: 0.7;">[${String.fromCharCode(65 + i)}]</span>
                  <span>${sanitizeRichHtml(opt.text)}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${answered ? `
            <div class="quiz-explanation-box">
              <div style="font-weight: 700; color: ${reveal.correct ? 'var(--accent-emerald)' : 'var(--accent-pink)'}; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                ${reveal.correct ? '🎉 TEBRİKLER! DOĞRU CEVAP' : '❌ YANLIŞ CEVAP'}
              </div>
              <p class="quiz-explanation-text">${sanitizeRichHtml(reveal.explanation || '')}</p>

              ${reveal.engineBehavior ? `
                <div style="background: rgba(0, 240, 255, 0.08); border-left: 3px solid var(--accent-cyan); padding: 10px 14px; border-radius: 4px; font-size: 0.84rem; color: #e2e8f0; margin-bottom: 8px; line-height: 1.5;">
                  <strong style="color: var(--accent-cyan);">${escapeHtml(this.labels.note)}:</strong> ${sanitizeRichHtml(reveal.engineBehavior)}
                </div>
              ` : ''}

              ${reveal.bestPractice ? `
                <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); padding: 10px 14px; border-radius: 4px; font-size: 0.84rem; color: #e2e8f0; line-height: 1.5;">
                  <strong style="color: var(--accent-emerald);">${escapeHtml(this.labels.tip)}:</strong> ${sanitizeRichHtml(reveal.bestPractice)}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <div class="module-quiz-nav">
          <button class="btn btn-secondary btn-sm" id="btn-quiz-prev" ${this.currentIndex === 0 ? 'disabled' : ''}>
            ◀ Önceki Soru
          </button>
          <div style="display: flex; gap: 8px;">
            ${this.currentIndex === total - 1 ? `
              <button class="btn btn-primary btn-sm" id="btn-quiz-submit">
                🏁 Sınavı Bitir ve Sonucu Gör
              </button>
            ` : `
              <button class="btn btn-primary btn-sm" id="btn-quiz-next">
                Sonraki Soru ▶
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.mountEl.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.selectAnswer(btn.getAttribute('data-token')));
    });

    this.mountEl.querySelector('#btn-quiz-prev')?.addEventListener('click', () => this.prev());
    this.mountEl.querySelector('#btn-quiz-next')?.addEventListener('click', () => this.next());
    this.mountEl.querySelector('#btn-quiz-submit')?.addEventListener('click', () => this.finish());
  }

  async selectAnswer(token) {
    const q = this.questions[this.currentIndex];
    if (this.pending || this.reveals.has(q.id)) return;
    this.pending = true;
    try {
      const result = await quiz.answer(this.sessionId, q.id, token);
      this.reveals.set(q.id, { token, ...result });
      if (result.correct) {
        this.score += 10;
        if (this.world) {
          // Small celebratory particle ping
          this.world.spawnParticle(this.world.width / 2 + (Math.random() - 0.5) * 80, 60, {
            radius: 10,
            color: '#10b981',
            label: '+10',
            vy: -2,
            lifespan: 120
          });
        }
      }
      this.render();
    } catch (err) {
      this.renderMessage(`Cevap kaydedilemedi: ${escapeHtml(err.message)}`);
    } finally {
      this.pending = false;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.render();
    }
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.render();
    }
  }

  async finish() {
    let result;
    try {
      result = await quiz.finish(this.sessionId);
    } catch (err) {
      this.renderMessage(`Sonuç hesaplanamadı: ${escapeHtml(err.message)}`);
      return;
    }
    const total = result.total;
    const maxScore = total * 10;
    const correctCount = result.correct;
    const percentage = result.percentage;
    const passed = result.passed;

    if (passed) {
      this.isCompleted = true;
      if (typeof this.onPass === 'function') {
        this.onPass({
          score: correctCount * 10,
          maxScore,
          percentage,
          totalQuestions: total
        });
      }

      // Major fireworks burst on physics canvas
      if (this.world) {
        for (let i = 0; i < 24; i++) {
          this.world.spawnParticle(this.world.width / 2, this.world.height / 2, {
            radius: 8 + Math.random() * 8,
            color: ['#00f0ff', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
            label: '🏆',
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            antigravityCharge: 0.9,
            lifespan: 250
          });
        }
      }
    }

    this.mountEl.innerHTML = `
      <div class="module-quiz-card">
        <div style="text-align: center; padding: 40px 24px;">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">
            ${passed ? '🏆' : '⚠️'}
          </div>
          <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin-bottom: 8px;">
            ${passed ? 'TEBRİKLER! MODÜLÜ TAMAMLADINIZ' : 'BARAJ GEÇİLEMEDİ (%80 GEREKLİ)'}
          </h2>
          <p style="color: var(--text-secondary); max-width: 540px; margin: 0 auto 24px; line-height: 1.6;">
            ${passed
              ? `Harika bir iş çıkardınız! ${escapeHtml(this.metadata.title)} konusundaki ${total} sorunun ${correctCount} tanesini doğru yanıtlayarak modülü başarıyla tamamladınız.`
              : `Bu modülü başarıyla tamamlamak için en az %80 başarı oranı gerekmektedir. Toplam ${total} sorudan ${correctCount} doğru yaptınız. Konu anlatımını tekrar inceleyip testi baştan başlatabilirsiniz.`}
          </p>

          <div style="display: inline-flex; align-items: center; justify-content: center; gap: 28px; background: rgba(255, 255, 255, 0.04); padding: 18px 36px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 28px;">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">TOPLAM PUAN</div>
              <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--accent-cyan);">${correctCount * 10} / ${maxScore}</div>
            </div>
            <div style="width: 1px; height: 44px; background: var(--border-subtle);"></div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">BAŞARI ORANI</div>
              <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: ${passed ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">%${percentage}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <button class="btn btn-secondary" id="btn-quiz-retry">
              🔄 Testi Tekrar Çöz
            </button>
            ${passed ? `
              <button class="btn btn-primary" id="btn-quiz-next-mod">
                Sonraki Konuya Geç ➔
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    this.mountEl.querySelector('#btn-quiz-retry').addEventListener('click', () => {
      this.mount(this.mountEl, this.metadata, this.source, {
        onPass: this.onPass,
        world: this.world,
        isCompleted: this.isCompleted,
        labels: this.labels
      });
    });

    const nextModBtn = this.mountEl.querySelector('#btn-quiz-next-mod');
    if (nextModBtn) {
      nextModBtn.addEventListener('click', () => {
        const nextId = 's1-02';
        const trackId = router.getTrackId();
        router.navigate(`/${trackId}/${getTrackModuleStage(trackId, nextId) || 'stage-1'}/${nextId}`);
      });
    }
  }
}

export const moduleQuizManager = new ModuleQuizManager();
