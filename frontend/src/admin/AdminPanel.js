/**
 * AdminPanel.js
 * Comprehensive Management Panel for editing curriculum, V8 deep-dives, sandboxes, and quiz questions.
 * Fully backed by the SQLite database API.
 */

import { curriculumApi } from '../core/api.js';
import { registry } from '../core/registry.js';
import { router } from '../core/router.js';
import { DEFAULT_TRACK_ID } from '../core/tracks.js';
import { escapeHtml, sanitizeRichHtml } from '../core/sanitize.js';

export class AdminPanel {
  constructor(mountElement) {
    this.mountEl = mountElement;
    this.stages = [];
    this.modules = [];
    this.selectedStageId = 'all';
    this.searchQuery = '';
    this.currentModuleId = null;
    this.activeTab = 'general';
    this.currentData = null; // { metadata, content }
    this.isDirty = false;
  }

  async mount(initialModuleId = null, trackId = DEFAULT_TRACK_ID) {
    this.trackId = trackId;
    this.mountEl.innerHTML = `
      <div class="admin-viewport">
        <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--accent-cyan);font-family:var(--font-mono);gap:12px;">
          <span style="font-size:1.8rem;" class="anim-spin-slow">🌀</span>
          <span>Veritabanı ve Yönetim Paneli Yükleniyor...</span>
        </div>
      </div>
    `;

    try {
      this.stages = await curriculumApi.getStages(this.trackId);
      this.modules = await curriculumApi.getModules(null, '', this.trackId);

      if (initialModuleId && this.modules.some(m => m.id === initialModuleId)) {
        this.currentModuleId = initialModuleId;
      } else if (this.modules.length > 0) {
        this.currentModuleId = this.modules[0].id;
      }

      this.render();
      if (this.currentModuleId) {
        await this.selectModule(this.currentModuleId);
      }
      this.setupGlobalShortcuts();
    } catch (err) {
      this.mountEl.innerHTML = `
        <div class="admin-viewport" style="padding: 40px; text-align: center;">
          <h2 style="color: var(--accent-pink);">Veritabanı Bağlantı Hatası</h2>
          <p style="color: var(--text-secondary);">${escapeHtml(err.message)}</p>
          <button class="btn btn-primary" id="btn-admin-retry" style="margin-top: 16px;">Yeniden Dene</button>
        </div>
      `;
      document.getElementById('btn-admin-retry')?.addEventListener('click', () => this.mount(initialModuleId, this.trackId));
    }
  }

  setupGlobalShortcuts() {
    this._keydownHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.saveCurrentModule();
      }
    };
    window.removeEventListener('keydown', this._keydownHandler);
    window.addEventListener('keydown', this._keydownHandler);
  }

  destroy() {
    if (this._keydownHandler) {
      window.removeEventListener('keydown', this._keydownHandler);
    }
  }

  showToast(message, type = 'success') {
    let toast = document.getElementById('admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'admin-toast';
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.className = `admin-toast ${type} show`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '⚠️'}</span>
      <span>${escapeHtml(message)}</span>
    `;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  render() {
    const totalQuestions = this.modules.reduce((sum, m) => sum + (m.question_count || 0), 0);

    this.mountEl.innerHTML = `
      <div class="admin-viewport">
        <!-- Header -->
        <header class="admin-header">
          <div class="admin-header-left">
            <button class="btn btn-secondary btn-sm" id="btn-admin-exit" title="Öğrenci Arayüzüne Dön">
              ← Öğrenci Görünümü
            </button>
            <div class="admin-title-group">
              <div class="admin-main-title">
                <span>⚙️</span> YÖNETİM & VERİTABANI PANELİ
              </div>
              <div class="admin-sub-title">Antigravity Curriculum Engine • SQLite WAL Mode</div>
            </div>
            <div class="admin-stats-pills">
              <span class="admin-stat-pill active">📦 ${this.stages.length} Aşama</span>
              <span class="admin-stat-pill active">📚 <span id="stat-total-modules">${this.modules.length}</span> Modül</span>
              <span class="admin-stat-pill active">🧪 <span id="stat-total-questions">${totalQuestions}</span> Soru</span>
            </div>
          </div>

          <div class="admin-header-actions">
            <button class="btn btn-secondary btn-sm" id="btn-admin-export" title="Tüm veritabanını JSON olarak indir">
              📥 Yedek Al
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-admin-import" title="JSON yedeğinden geri yükle">
              📤 Yedek Yükle
            </button>
            <input type="file" id="admin-import-file" accept=".json" style="display:none;" />
            
            <a class="btn btn-secondary btn-sm" href="#/${this.trackId}/admin/users">👥 Kullanıcılar</a>
            <button class="btn btn-primary btn-sm" id="btn-admin-new-module">
              ➕ Yeni Modül Ekle
            </button>
            <button class="btn btn-save-master btn-sm" id="btn-admin-save-top">
              💾 Veritabanına Kaydet (Ctrl+S)
            </button>
          </div>
        </header>

        <!-- Main Workspace -->
        <div class="admin-workspace">
          <!-- Sidebar -->
          <aside class="admin-sidebar">
            <div class="admin-search-box">
              <input type="text" class="admin-input" id="admin-search-input" placeholder="🔍 Modül veya konu ara..." value="${escapeHtml(this.searchQuery)}" />
              <select class="admin-select" id="admin-stage-filter">
                <option value="all">Tüm Aşamalar (${this.modules.length})</option>
                ${this.stages.map(s => `
                  <option value="${escapeHtml(s.id)}" ${this.selectedStageId === s.id ? 'selected' : ''}>
                    ${escapeHtml(s.short_name || s.name)} (${s.modules_count || 0})
                  </option>
                `).join('')}
              </select>
            </div>
            <ul class="admin-module-list" id="admin-modules-list">
              <!-- Rendered dynamically -->
            </ul>
          </aside>

          <!-- Right Editor Container -->
          <main class="admin-editor-container" id="admin-editor-container">
            <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);">
              Sol taraftan düzenlemek istediğiniz modülü seçin.
            </div>
          </main>
        </div>
      </div>

      <!-- Modal: New Module -->
      <div class="admin-modal-overlay" id="admin-new-modal">
        <div class="admin-modal-card">
          <div class="admin-modal-header">
            <div class="admin-modal-title">➕ Yeni Modül / Konu Ekle</div>
            <button class="btn btn-secondary btn-sm" id="btn-close-new-modal" style="padding:2px 8px;">✕</button>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Aşama</label>
            <select class="admin-select" id="new-mod-stage">
              ${this.stages.map(s => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.name)}</option>`).join('')}
            </select>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-label">Modül ID <span class="admin-label-hint">(Örn: s1-24)</span></label>
              <input type="text" class="admin-input" id="new-mod-id" placeholder="s1-24" />
            </div>
            <div class="admin-form-group">
              <label class="admin-label">Sıra No <span class="admin-label-hint">(Örn: 24)</span></label>
              <input type="text" class="admin-input" id="new-mod-number" placeholder="24" />
            </div>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Başlık</label>
            <input type="text" class="admin-input" id="new-mod-title" placeholder="Konu Başlığı..." />
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Tahmini Süre</label>
            <input type="text" class="admin-input" id="new-mod-duration" value="25 dk" />
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Kısa Açıklama</label>
            <textarea class="admin-textarea" id="new-mod-desc" style="min-height:70px;" placeholder="Bu konuda öğrenilecek temel kavramlar..."></textarea>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px;">
            <button class="btn btn-secondary" id="btn-cancel-new-modal">Vazgeç</button>
            <button class="btn btn-primary" id="btn-submit-new-modal">Oluştur ve Düzenle</button>
          </div>
        </div>
      </div>
    `;

    this.bindHeaderEvents();
    this.renderModuleList();
  }

  bindHeaderEvents() {
    // Exit to student view
    document.getElementById('btn-admin-exit')?.addEventListener('click', () => {
      if (this.currentData && this.currentData.metadata) {
        const meta = this.currentData.metadata;
        router.navigate(`/${this.trackId}/${meta.stageId || 'stage-1'}/${meta.id || 's1-01'}`);
      } else {
        router.navigate(`/${this.trackId}/stage-1/s1-01`);
      }
    });

    // Save Top Button
    document.getElementById('btn-admin-save-top')?.addEventListener('click', () => {
      this.saveCurrentModule();
    });

    // Search & Filter
    document.getElementById('admin-search-input')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderModuleList();
    });

    document.getElementById('admin-stage-filter')?.addEventListener('change', (e) => {
      this.selectedStageId = e.target.value;
      this.renderModuleList();
    });

    // New Module Modal Open/Close
    const modal = document.getElementById('admin-new-modal');
    document.getElementById('btn-admin-new-module')?.addEventListener('click', () => {
      modal?.classList.add('open');
      const stageId = this.selectedStageId === 'all' ? this.stages[0]?.id : this.selectedStageId;
      const stageSelect = document.getElementById('new-mod-stage');
      if (stageSelect) stageSelect.value = stageId;
      document.getElementById('new-mod-id')?.focus();
    });

    const closeModal = () => modal?.classList.remove('open');
    document.getElementById('btn-close-new-modal')?.addEventListener('click', closeModal);
    document.getElementById('btn-cancel-new-modal')?.addEventListener('click', closeModal);

    // Submit New Module
    document.getElementById('btn-submit-new-modal')?.addEventListener('click', async () => {
      const id = document.getElementById('new-mod-id')?.value.trim();
      const stageId = document.getElementById('new-mod-stage')?.value;
      const number = document.getElementById('new-mod-number')?.value.trim() || '01';
      const title = document.getElementById('new-mod-title')?.value.trim();
      const duration = document.getElementById('new-mod-duration')?.value.trim() || '25 dk';
      const description = document.getElementById('new-mod-desc')?.value.trim();

      if (!id || !title) {
        this.showToast('Lütfen Modül ID ve Başlık alanlarını doldurun!', 'error');
        return;
      }

      try {
        await curriculumApi.createModule({
          metadata: { id, stageId, number, title, duration, description },
          content: {
            deepDive: `<h3>${escapeHtml(title)}</h3>\n<p>Bu konunun teknik analizi hazırlanmaktadır.</p>`,
            analogy: { title: 'Kavram Analojisi', text: 'Gerçek hayat analojisi burada yer alacak.' },
            antigravityCode: `// ${title}\nconsole.log('Modül başlatıldı: ${title}');`,
            bestPractices: [
              { type: 'good', title: 'Önerilen Yaklaşım', text: 'Kod yazarken temiz sözdizimi kullanın.' },
              { type: 'bad', title: 'Kaçınılması Gereken', text: 'Örtük tip dönüşümlerine güvenmeyin.' }
            ],
            quiz: [
              {
                id: `${id}-q01`,
                category: title,
                type: 'conceptual',
                question: `${title} konusundaki temel kural nedir?`,
                code: '',
                options: ['Seçenek A', 'Seçenek B', 'Seçenek C', 'Seçenek D'],
                correctIndex: 0,
                explanation: 'Açıklama metni...',
                engineBehavior: 'V8 motor optimizasyonu...',
                bestPractice: 'Temiz kod kuralı...'
              }
            ]
          }
        });

        closeModal();
        this.showToast(`"${title}" modülü başarıyla oluşturuldu!`);
        this.modules = await curriculumApi.getModules(null, '', this.trackId);
        this.renderModuleList();
        await this.selectModule(id);
      } catch (err) {
        this.showToast(`Modül oluşturulamadı: ${err.message}`, 'error');
      }
    });

    // Export Backup
    document.getElementById('btn-admin-export')?.addEventListener('click', async () => {
      try {
        const backup = await curriculumApi.exportBackup();
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute('href', dataStr);
        dlAnchor.setAttribute('download', `antigravity-backup-${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        this.showToast('Veritabanı yedeği JSON dosyası olarak indirildi.');
      } catch (err) {
        this.showToast(`Yedek alınamadı: ${err.message}`, 'error');
      }
    });

    // Import Backup
    const fileInput = document.getElementById('admin-import-file');
    document.getElementById('btn-admin-import')?.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!confirm('DİKKAT: JSON yedeği yüklendiğinde mevcut tüm veritabanı silinip yedekteki verilerle değiştirilecektir. Onaylıyor musunuz?')) {
        fileInput.value = '';
        return;
      }

      try {
        const text = await file.text();
        const json = JSON.parse(text);
        await curriculumApi.importBackup(json);
        this.showToast('Yedek başarıyla geri yüklendi!');
        registry.invalidateCache();
        await this.mount(this.currentModuleId);
      } catch (err) {
        this.showToast(`Geri yükleme hatası: ${err.message}`, 'error');
      } finally {
        fileInput.value = '';
      }
    });

  }

  renderModuleList() {
    const listEl = document.getElementById('admin-modules-list');
    if (!listEl) return;

    let filtered = this.modules;
    if (this.selectedStageId !== 'all') {
      filtered = filtered.filter(m => m.stage_id === this.selectedStageId);
    }
    if (this.searchQuery) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(this.searchQuery) ||
        m.id.toLowerCase().includes(this.searchQuery) ||
        (m.description && m.description.toLowerCase().includes(this.searchQuery))
      );
    }

    listEl.innerHTML = '';
    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
          Eşleşen modül bulunamadı.
        </div>
      `;
      return;
    }

    filtered.forEach(m => {
      const card = document.createElement('li');
      card.className = `admin-module-card ${m.id === this.currentModuleId ? 'active' : ''}`;
      card.setAttribute('data-id', m.id);

      card.innerHTML = `
        <div class="admin-mod-header">
          <span class="admin-mod-badge">${escapeHtml(m.id)}</span>
          <span style="font-size:0.68rem; color:var(--accent-cyan); font-family:var(--font-mono);">${escapeHtml(m.stage_id)}</span>
        </div>
        <div class="admin-mod-title">${escapeHtml(m.title)}</div>
        <div class="admin-mod-meta">
          <span>⏱️ ${escapeHtml(m.duration || '25 dk')}</span>
          <span>🧪 ${m.question_count || 0} soru</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectModule(m.id);
      });

      listEl.appendChild(card);
    });
  }

  async selectModule(moduleId) {
    this.currentModuleId = moduleId;
    this.renderModuleList();

    const editorEl = document.getElementById('admin-editor-container');
    if (!editorEl) return;

    editorEl.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--accent-cyan);font-family:var(--font-mono);gap:12px;">
        <span style="font-size:1.4rem;" class="anim-spin-slow">🌀</span>
        <span>"${escapeHtml(moduleId)}" veritabanından çekiliyor...</span>
      </div>
    `;

    try {
      this.currentData = await curriculumApi.getModule(moduleId);
      this.renderEditor();
    } catch (err) {
      editorEl.innerHTML = `
        <div style="padding: 30px; text-align: center;">
          <h3 style="color: var(--accent-pink);">Modül Verisi Alınamadı</h3>
          <p style="color: var(--text-secondary);">${escapeHtml(err.message)}</p>
        </div>
      `;
    }
  }

  renderEditor() {
    const editorEl = document.getElementById('admin-editor-container');
    if (!editorEl || !this.currentData) return;

    const { metadata, content } = this.currentData;
    const questions = content.quiz || [];
    const bestPractices = content.bestPractices || [];

    editorEl.innerHTML = `
      <!-- Editor Top Bar -->
      <div class="admin-editor-header">
        <div class="admin-editor-title-box">
          <span class="admin-mod-badge" style="font-size:0.85rem;padding:4px 8px;">${escapeHtml(metadata.id)}</span>
          <div>
            <h2>${escapeHtml(metadata.title)}</h2>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono); margin-top:2px;">
              Son Güncelleme: ${metadata.updatedAt ? new Date(metadata.updatedAt).toLocaleString('tr-TR') : 'Kayıtlı'}
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn btn-secondary btn-sm" id="btn-admin-preview-learner" title="Öğrenci Arayüzünde Canlı Gör">
            👀 Öğrenci Görünümü
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-admin-delete-mod" style="color:var(--accent-pink);" title="Bu modülü tamamen sil">
            🗑️ Modülü Sil
          </button>
          <button class="btn btn-save-master btn-sm" id="btn-admin-save-tab">
            💾 Kaydet
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="admin-tabs-bar">
        <button class="admin-tab-btn ${this.activeTab === 'general' ? 'active' : ''}" data-tab="general">
          <span>📋</span> Genel Bilgiler
        </button>
        <button class="admin-tab-btn ${this.activeTab === 'deepdive' ? 'active' : ''}" data-tab="deepdive">
          <span>🔬</span> Konu Anlatımı & V8
        </button>
        <button class="admin-tab-btn ${this.activeTab === 'analogy' ? 'active' : ''}" data-tab="analogy">
          <span>🧠</span> Mental Model & Analoji
        </button>
        <button class="admin-tab-btn ${this.activeTab === 'sandbox' ? 'active' : ''}" data-tab="sandbox">
          <span>⚡</span> Antigravity Sandbox
        </button>
        <button class="admin-tab-btn ${this.activeTab === 'bestpractices' ? 'active' : ''}" data-tab="bestpractices">
          <span>🛡️</span> Best Practices <span class="admin-tab-pill">${bestPractices.length}</span>
        </button>
        <button class="admin-tab-btn ${this.activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">
          <span>🧪</span> Soru & Quiz Yönetimi <span class="admin-tab-pill">${questions.length}</span>
        </button>
      </div>

      <!-- Tab Panel 1: Genel Bilgiler -->
      <div class="admin-tab-panel ${this.activeTab === 'general' ? 'active' : ''}" id="tab-general">
        <div class="admin-form-row">
          <div class="admin-form-group">
            <label class="admin-label">Modül ID</label>
            <input type="text" class="admin-input" id="field-mod-id" value="${escapeHtml(metadata.id)}" disabled style="opacity:0.6;" />
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Aşama</label>
            <select class="admin-select" id="field-mod-stage">
              ${this.stages.map(s => `<option value="${escapeHtml(s.id)}" ${metadata.stageId === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>`).join('')}
            </select>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Sıra No / Numara</label>
            <input type="text" class="admin-input" id="field-mod-number" value="${escapeHtml(metadata.number || '')}" />
          </div>
          <div class="admin-form-group">
            <label class="admin-label">Tahmini Süre</label>
            <input type="text" class="admin-input" id="field-mod-duration" value="${escapeHtml(metadata.duration || '25 dk')}" />
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Başlık</label>
          <input type="text" class="admin-input" id="field-mod-title" value="${escapeHtml(metadata.title || '')}" />
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Kısa Açıklama / Özeti</label>
          <textarea class="admin-textarea" id="field-mod-desc" style="min-height:90px;">${escapeHtml(metadata.description || '')}</textarea>
        </div>
      </div>

      <!-- Tab Panel 2: Derinlemesine Konu Anlatımı (Deep Dive) -->
      <div class="admin-tab-panel ${this.activeTab === 'deepdive' ? 'active' : ''}" id="tab-deepdive">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div class="admin-label">
            HTML & Teknik Anlatım Metni
            <span class="admin-label-hint">HTML etiketleri ve V8 motor davranış analizlerini içerebilir.</span>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-toggle-deepdive-preview">
            👁️ Canlı Önizlemeyi Aç/Kapat
          </button>
        </div>
        <div id="deepdive-container" style="display:grid;grid-template-columns:1fr;gap:16px;">
          <textarea class="admin-textarea" id="field-mod-deepdive" style="min-height:420px;">${escapeHtml(content.deepDive || '')}</textarea>
          <div id="deepdive-preview" style="display:none;background:rgba(255,255,255,0.02);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:20px;overflow-y:auto;max-height:500px;"></div>
        </div>
      </div>

      <!-- Tab Panel 3: Mental Model & Analoji -->
      <div class="admin-tab-panel ${this.activeTab === 'analogy' ? 'active' : ''}" id="tab-analogy">
        <div class="admin-form-group">
          <label class="admin-label">Analoji Başlığı</label>
          <input type="text" class="admin-input" id="field-analogy-title" value="${escapeHtml((content.analogy && content.analogy.title) || '')}" placeholder="Örn: Fabrika Bandı ve Görev Sırası" />
        </div>
        <div class="admin-form-group">
          <label class="admin-label">Analoji Hikayesi & Mental Model Metni</label>
          <textarea class="admin-textarea" id="field-analogy-text" style="min-height:220px;">${escapeHtml((content.analogy && content.analogy.text) || '')}</textarea>
        </div>
      </div>

      <!-- Tab Panel 4: Antigravity Sandbox -->
      <div class="admin-tab-panel ${this.activeTab === 'sandbox' ? 'active' : ''}" id="tab-sandbox">
        <div class="admin-form-group">
          <div class="admin-label">
            İnteraktif script.js Kodu
            <span class="admin-label-hint">Öğrencinin Web Worker sandbox içerisinde çalıştıracağı başlangıç kodu.</span>
          </div>
          <textarea class="admin-textarea admin-code-editor" id="field-antigravity-code" spellcheck="false">${escapeHtml(content.antigravityCode || '')}</textarea>
        </div>
      </div>

      <!-- Tab Panel 5: Best Practices -->
      <div class="admin-tab-panel ${this.activeTab === 'bestpractices' ? 'active' : ''}" id="tab-bestpractices">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div class="admin-label">Best Practice & Hata Kartları</div>
          <button class="btn btn-primary btn-sm" id="btn-add-practice">
            ➕ Yeni Kural Ekle
          </button>
        </div>
        <div class="admin-cards-list" id="practices-list">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- Tab Panel 6: Soru & Quiz Yönetimi -->
      <div class="admin-tab-panel ${this.activeTab === 'quiz' ? 'active' : ''}" id="tab-quiz">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <div class="admin-label">
            Modül Soru Havuzu (${questions.length} Soru)
            <span class="admin-label-hint">Öğrencilerin modülü tamamlamak için %80 başarı sağlaması gereken sınav soruları.</span>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-add-question">
            ➕ Yeni Soru Ekle
          </button>
        </div>
        <div id="questions-list">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;

    this.bindEditorEvents();
    this.renderPracticesList();
    this.renderQuestionsList();
  }

  bindEditorEvents() {
    const { metadata } = this.currentData;

    // Tab switching
    const tabBtns = this.mountEl.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.activeTab = tab;
        tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tab));
        this.mountEl.querySelectorAll('.admin-tab-panel').forEach(p => {
          p.classList.toggle('active', p.id === `tab-${tab}`);
        });
      });
    });

    // Save button in editor
    document.getElementById('btn-admin-save-tab')?.addEventListener('click', () => {
      this.saveCurrentModule();
    });

    // Preview in student view
    document.getElementById('btn-admin-preview-learner')?.addEventListener('click', () => {
      router.navigate(`/${this.trackId}/${metadata.stageId || 'stage-1'}/${metadata.id}`);
    });

    // Delete Module
    document.getElementById('btn-admin-delete-mod')?.addEventListener('click', async () => {
      if (!confirm(`"${metadata.title}" (${metadata.id}) modülünü ve tüm sorularını kalıcı olarak silmek istediğinizden emin misiniz?`)) {
        return;
      }
      try {
        await curriculumApi.deleteModule(metadata.id);
        this.showToast(`"${metadata.title}" modülü silindi.`);
        registry.invalidateCache();
        this.modules = await curriculumApi.getModules(null, '', this.trackId);
        this.currentModuleId = this.modules[0] ? this.modules[0].id : null;
        this.renderModuleList();
        if (this.currentModuleId) {
          await this.selectModule(this.currentModuleId);
        }
      } catch (err) {
        this.showToast(`Silme başarısız: ${err.message}`, 'error');
      }
    });

    // Toggle Deep Dive Preview
    const btnToggleDeepDive = document.getElementById('btn-toggle-deepdive-preview');
    const deepDiveContainer = document.getElementById('deepdive-container');
    const deepDivePreview = document.getElementById('deepdive-preview');
    const deepDiveTextarea = document.getElementById('field-mod-deepdive');

    let isPreviewOpen = false;
    btnToggleDeepDive?.addEventListener('click', () => {
      isPreviewOpen = !isPreviewOpen;
      if (isPreviewOpen) {
        deepDiveContainer.style.gridTemplateColumns = '1fr 1fr';
        deepDivePreview.style.display = 'block';
        deepDivePreview.innerHTML = sanitizeRichHtml(deepDiveTextarea.value);
        btnToggleDeepDive.textContent = '✕ Önizlemeyi Kapat';
      } else {
        deepDiveContainer.style.gridTemplateColumns = '1fr';
        deepDivePreview.style.display = 'none';
        btnToggleDeepDive.textContent = '👁️ Canlı Önizlemeyi Aç';
      }
    });

    deepDiveTextarea?.addEventListener('input', () => {
      if (isPreviewOpen && deepDivePreview) {
        deepDivePreview.innerHTML = sanitizeRichHtml(deepDiveTextarea.value);
      }
    });

    // Add Practice Button
    document.getElementById('btn-add-practice')?.addEventListener('click', () => {
      if (!this.currentData.content.bestPractices) {
        this.currentData.content.bestPractices = [];
      }
      this.currentData.content.bestPractices.push({
        type: 'good',
        title: 'Yeni Kural Başlığı',
        text: 'Bu kuralın açıklaması...'
      });
      this.renderPracticesList();
    });

    // Add Question Button
    document.getElementById('btn-add-question')?.addEventListener('click', () => {
      if (!this.currentData.content.quiz) {
        this.currentData.content.quiz = [];
      }
      const newIndex = this.currentData.content.quiz.length + 1;
      this.currentData.content.quiz.push({
        id: `${metadata.id}-q${String(newIndex).padStart(2, '0')}`,
        category: metadata.title,
        type: 'conceptual',
        question: `Yeni Soru ${newIndex}: Soru metnini buraya yazın.`,
        code: '',
        options: ['A Seçeneği', 'B Seçeneği', 'C Seçeneği', 'D Seçeneği'],
        correctIndex: 0,
        explanation: 'Sorunun doğru cevabının açıklaması...',
        engineBehavior: 'V8 motorunun çalışma mekanizması...',
        bestPractice: 'Üretim ortamı için en iyi pratik...'
      });
      this.renderQuestionsList();
      const tabQuizCount = document.querySelector('.admin-tab-btn[data-tab="quiz"] .admin-tab-pill');
      if (tabQuizCount) tabQuizCount.textContent = this.currentData.content.quiz.length;
    });
  }

  renderPracticesList() {
    const listEl = document.getElementById('practices-list');
    if (!listEl) return;

    const practices = this.currentData.content.bestPractices || [];
    listEl.innerHTML = '';

    if (practices.length === 0) {
      listEl.innerHTML = `
        <div style="padding:20px;text-align:center;color:var(--text-muted);border:1px dashed var(--border-subtle);border-radius:var(--radius-sm);">
          Henüz best practice kuralı eklenmemiş. Yukarıdaki butondan ekleyebilirsiniz.
        </div>
      `;
      return;
    }

    practices.forEach((bp, idx) => {
      const card = document.createElement('div');
      card.className = 'admin-practice-item';

      card.innerHTML = `
        <div class="admin-practice-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <select class="admin-select bp-type-select" data-idx="${idx}" style="width:180px;">
              <option value="good" ${bp.type === 'good' ? 'selected' : ''}>✅ DOĞRU YAKLAŞIM</option>
              <option value="bad" ${bp.type === 'bad' ? 'selected' : ''}>❌ SIK YAPILAN HATA</option>
            </select>
            <input type="text" class="admin-input bp-title-input" data-idx="${idx}" value="${escapeHtml(bp.title || '')}" placeholder="Kural Başlığı..." style="width:260px;" />
          </div>
          <button class="btn btn-secondary btn-sm bp-delete-btn" data-idx="${idx}" style="color:var(--accent-pink);padding:2px 8px;">
            🗑️ Sil
          </button>
        </div>
        <textarea class="admin-textarea bp-text-input" data-idx="${idx}" style="min-height:60px;" placeholder="Kural detayı ve açıklaması...">${escapeHtml(bp.text || '')}</textarea>
      `;

      listEl.appendChild(card);
    });

    // Bind inputs
    listEl.querySelectorAll('.bp-type-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        practices[idx].type = e.target.value;
      });
    });

    listEl.querySelectorAll('.bp-title-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        practices[idx].title = e.target.value;
      });
    });

    listEl.querySelectorAll('.bp-text-input').forEach(txt => {
      txt.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        practices[idx].text = e.target.value;
      });
    });

    listEl.querySelectorAll('.bp-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        practices.splice(idx, 1);
        this.renderPracticesList();
      });
    });
  }

  renderQuestionsList() {
    const listEl = document.getElementById('questions-list');
    if (!listEl) return;

    const questions = this.currentData.content.quiz || [];
    listEl.innerHTML = '';

    if (questions.length === 0) {
      listEl.innerHTML = `
        <div style="padding:30px;text-align:center;color:var(--text-muted);border:1px dashed var(--border-subtle);border-radius:var(--radius-sm);">
          Bu modüle ait sınav sorusu bulunamadı. Yukarıdaki butona tıklayarak soru ekleyebilirsiniz.
        </div>
      `;
      return;
    }

    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'admin-question-card';

      card.innerHTML = `
        <div class="admin-q-header">
          <div class="admin-q-number">
            <span>🧪</span> Soru ${idx + 1}
            <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono); font-weight:normal;">[${escapeHtml(q.id || `q${idx+1}`)}]</span>
          </div>
          <button class="btn btn-secondary btn-sm q-delete-btn" data-idx="${idx}" style="color:var(--accent-pink);padding:2px 8px;">
            🗑️ Soruyu Sil
          </button>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Soru Metni</label>
          <textarea class="admin-textarea q-question-input" data-idx="${idx}" style="min-height:70px;">${escapeHtml(q.question || '')}</textarea>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Kod Bloğu <span class="admin-label-hint">(Opsiyonel)</span></label>
          <textarea class="admin-textarea admin-code-editor q-code-input" data-idx="${idx}" style="min-height:90px;" placeholder="// Varsa kod bloğu...">${escapeHtml(q.code || '')}</textarea>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Seçenekler <span class="admin-label-hint">(Doğru seçeneği soldaki radyo butonu ile belirleyin)</span></label>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${['A', 'B', 'C', 'D'].map((letter, optIdx) => {
              const optVal = (q.options && q.options[optIdx]) || '';
              const isCorrect = q.correctIndex === optIdx;
              return `
                <div class="admin-option-row ${isCorrect ? 'correct' : ''}">
                  <input type="radio" name="correct-opt-${idx}" class="admin-option-radio q-opt-radio" data-qidx="${idx}" data-optidx="${optIdx}" ${isCorrect ? 'checked' : ''} />
                  <span style="font-family:var(--font-mono);font-weight:700;color:var(--accent-cyan);">${letter})</span>
                  <input type="text" class="admin-input q-opt-input" data-qidx="${idx}" data-optidx="${optIdx}" value="${escapeHtml(optVal)}" style="flex:1;" />
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="admin-form-row">
          <div class="admin-form-group">
            <label class="admin-label">Çözüm ve Açıklama</label>
            <textarea class="admin-textarea q-explanation-input" data-idx="${idx}" style="min-height:80px;">${escapeHtml(q.explanation || '')}</textarea>
          </div>
          <div class="admin-form-group">
            <label class="admin-label">V8 Motor Davranışı</label>
            <textarea class="admin-textarea q-v8-input" data-idx="${idx}" style="min-height:80px;">${escapeHtml(q.engineBehavior || '')}</textarea>
          </div>
        </div>

        <div class="admin-form-group">
          <label class="admin-label">Best Practice / Tavsiye</label>
          <input type="text" class="admin-input q-bp-input" data-idx="${idx}" value="${escapeHtml(q.bestPractice || '')}" />
        </div>
      `;

      listEl.appendChild(card);
    });

    // Bind question events
    listEl.querySelectorAll('.q-question-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        questions[idx].question = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-code-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        questions[idx].code = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-opt-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const qidx = parseInt(e.target.dataset.qidx, 10);
        const optidx = parseInt(e.target.dataset.optidx, 10);
        if (!questions[qidx].options) questions[qidx].options = [];
        questions[qidx].options[optidx] = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-opt-radio').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const qidx = parseInt(e.target.dataset.qidx, 10);
        const optidx = parseInt(e.target.dataset.optidx, 10);
        questions[qidx].correctIndex = optidx;
        this.renderQuestionsList();
      });
    });

    listEl.querySelectorAll('.q-explanation-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        questions[idx].explanation = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-v8-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        questions[idx].engineBehavior = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-bp-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        questions[idx].bestPractice = e.target.value;
      });
    });

    listEl.querySelectorAll('.q-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        if (confirm(`Soru ${idx + 1}'i silmek istediğinizden emin misiniz?`)) {
          questions.splice(idx, 1);
          this.renderQuestionsList();
          const tabQuizCount = document.querySelector('.admin-tab-btn[data-tab="quiz"] .admin-tab-pill');
          if (tabQuizCount) tabQuizCount.textContent = questions.length;
        }
      });
    });
  }

  gatherFormData() {
    if (!this.currentData) return null;

    const metadata = {
      ...this.currentData.metadata,
      stageId: document.getElementById('field-mod-stage')?.value || this.currentData.metadata.stageId,
      number: document.getElementById('field-mod-number')?.value || this.currentData.metadata.number,
      title: document.getElementById('field-mod-title')?.value || this.currentData.metadata.title,
      duration: document.getElementById('field-mod-duration')?.value || this.currentData.metadata.duration,
      description: document.getElementById('field-mod-desc')?.value || this.currentData.metadata.description
    };

    const content = {
      ...this.currentData.content,
      deepDive: document.getElementById('field-mod-deepdive')?.value ?? this.currentData.content.deepDive,
      analogy: {
        title: document.getElementById('field-analogy-title')?.value ?? this.currentData.content.analogy?.title ?? '',
        text: document.getElementById('field-analogy-text')?.value ?? this.currentData.content.analogy?.text ?? ''
      },
      antigravityCode: document.getElementById('field-antigravity-code')?.value ?? this.currentData.content.antigravityCode,
      bestPractices: this.currentData.content.bestPractices || [],
      quiz: this.currentData.content.quiz || []
    };

    return { metadata, content };
  }

  async saveCurrentModule() {
    if (!this.currentModuleId || !this.currentData) return;

    const dataToSave = this.gatherFormData();
    if (!dataToSave) return;

    const saveBtn = document.getElementById('btn-admin-save-top');
    const saveTabBtn = document.getElementById('btn-admin-save-tab');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '💾 Kaydediliyor...';
    }
    if (saveTabBtn) {
      saveTabBtn.disabled = true;
      saveTabBtn.innerHTML = '💾 Kaydediliyor...';
    }

    try {
      await curriculumApi.updateModule(this.currentModuleId, dataToSave);
      this.currentData = dataToSave;
      registry.invalidateCache(this.currentModuleId);

      this.showToast(`"${dataToSave.metadata.title}" veritabanına başarıyla kaydedildi!`);

      // Update module in local list
      const targetInList = this.modules.find(m => m.id === this.currentModuleId);
      if (targetInList) {
        targetInList.title = dataToSave.metadata.title;
        targetInList.duration = dataToSave.metadata.duration;
        targetInList.description = dataToSave.metadata.description;
        targetInList.question_count = (dataToSave.content.quiz || []).length;
      }
      this.renderModuleList();

      // Update editor header title
      const titleHeader = document.querySelector('.admin-editor-title-box h2');
      if (titleHeader) titleHeader.textContent = dataToSave.metadata.title;
    } catch (err) {
      this.showToast(`Kaydetme hatası: ${err.message}`, 'error');
      this.showToast(`Hata: ${err.message}`, 'error');
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '💾 Veritabanına Kaydet (Ctrl+S)';
      }
      if (saveTabBtn) {
        saveTabBtn.disabled = false;
        saveTabBtn.innerHTML = '💾 Kaydet';
      }
    }
  }
}
