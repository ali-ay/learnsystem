import { getTrack, getTrackStages, getTrackManifest, getTrackModuleStage, trackHasContent, TRACKS } from './core/tracks.js';
import { registry } from './core/registry.js';
import { router } from './core/router.js';
import { appState } from './core/state.js';
import { AntigravityWorld } from './physics/AntigravityWorld.js';
import { domBridge } from './physics/interactiveDOM.js';
import { codeRunner } from './runner/codeRunner.js';
import { quizEngine } from './runner/quizEngine.js';
import { moduleQuizManager } from './runner/moduleQuiz.js';
import { AdminPanel } from './admin/AdminPanel.js';
import { mountPlacement, getPlacementResult } from './english/placement.js';
import { mountVocabSession, renderProgressDashboard, stageUnlocked, stageLessonStats, stageVocabStats, stageName } from './english/progress.js';
import { escapeHtml, sanitizeRichHtml } from './core/sanitize.js';
import { startSession, isAdmin } from './core/session.js';
import { UsersPanel } from './admin/UsersPanel.js';

// DOM Element references
const sidebarStagesAccordionEl = document.getElementById('sidebar-stages-accordion');
const btnToggleAllStages = document.getElementById('btn-toggle-all-stages');
const lessonViewportEl = document.getElementById('lesson-viewport');
const progressBadgeEl = document.getElementById('progress-badge');
const canvasEl = document.getElementById('physics-canvas');
const floatingDomCardEl = document.getElementById('floating-dom-card');
const consoleOutputEl = document.getElementById('console-output');
const btnClearConsole = document.getElementById('btn-clear-console');
const btnToggleGravity = document.getElementById('btn-toggle-gravity');
const gravityStatusText = document.getElementById('gravity-status-text');
const gravitySlider = document.getElementById('gravity-slider');
const particleCounterEl = document.getElementById('particle-counter');
const btnResetPhysics = document.getElementById('btn-reset-physics');
const btnHeaderQuiz = document.getElementById('btn-header-quiz');
const appEl = document.getElementById('app');
const btnTogglePhysicsPanel = document.getElementById('btn-toggle-physics-panel');
const btnStageClose = document.getElementById('btn-stage-close');
const btnHeaderAdmin = document.getElementById('btn-header-admin');
const brandLogoEl = document.getElementById('brand-logo');
const adminMountEl = document.getElementById('admin-mount');
const studentWorkspaceEl = document.getElementById('student-workspace');
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

// Mobile App Elements
const appSidebarEl = document.getElementById('app-sidebar');
const sidebarBackdropEl = document.getElementById('sidebar-backdrop');
const btnMobileSidebarToggle = document.getElementById('btn-mobile-sidebar-toggle');
const btnSidebarClose = document.getElementById('btn-sidebar-close');
const mobileCurrentModuleBadge = document.getElementById('mobile-current-module-badge');
const mobileHeaderTitle = document.getElementById('mobile-header-title');
const mobNavItems = document.querySelectorAll('.mob-nav-item');

let activeAdminInstance = null;

// Mobile Navigation State & Drawer Controllers
function openMobileDrawer() {
  if (appSidebarEl) appSidebarEl.classList.add('mobile-open');
  if (sidebarBackdropEl) sidebarBackdropEl.classList.add('active');
  updateMobileNavState('curriculum');
}

function closeMobileDrawer() {
  if (appSidebarEl) appSidebarEl.classList.remove('mobile-open');
  if (sidebarBackdropEl) sidebarBackdropEl.classList.remove('active');
  const currentView = appEl.getAttribute('data-mobile-view') || 'lesson';
  updateMobileNavState(currentView);
}

function updateMobileNavState(activeView) {
  mobNavItems.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === activeView);
  });
}

function setMobileView(view) {
  if (view === 'curriculum') {
    openMobileDrawer();
    return;
  }

  closeMobileDrawer();

  if (view === 'quiz') {
    openQuiz();
    return;
  }

  if (view === 'admin') {
    const route = router.getRoute();
    const currentMod = (route && route.moduleId) || 's1-01';
    router.navigate(`/${currentTrackId()}/admin/${currentMod}`);
    updateMobileNavState('admin');
    return;
  }

  const currentRoute = router.getRoute();
  if (currentRoute && currentRoute.mode === 'admin') {
    const targetMod = (activeAdminInstance && activeAdminInstance.currentModuleId) || 's1-01';
    router.navigate(lessonPath(currentTrackId(), targetMod));
  }

  appEl.setAttribute('data-mobile-view', view);
  updateMobileNavState(view);

  if (view === 'physics') {
    world.start();
    requestAnimationFrame(() => {
      setTimeout(() => {
        world.resize();
      }, 60);
    });
  }
}

// Bind Mobile Controls
mobNavItems.forEach((btn) => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    setMobileView(view);
  });
});

if (btnMobileSidebarToggle) btnMobileSidebarToggle.addEventListener('click', openMobileDrawer);
if (btnSidebarClose) btnSidebarClose.addEventListener('click', closeMobileDrawer);
if (sidebarBackdropEl) sidebarBackdropEl.addEventListener('click', closeMobileDrawer);
if (mobileCurrentModuleBadge) mobileCurrentModuleBadge.addEventListener('click', openMobileDrawer);


// Theme Management (Linear Dark & Light Theme)
const THEME_ICONS = {
  // Shown icon = the theme the button switches to
  light: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"></path></svg>',
  dark: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>'
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('dilbaz_theme', theme);
  const label = theme === 'light' ? 'Koyu temaya geç' : 'Açık temaya geç';
  if (themeToggleIcon) themeToggleIcon.innerHTML = THEME_ICONS[theme] || THEME_ICONS.light;
  if (btnThemeToggle) {
    btnThemeToggle.title = label;
    btnThemeToggle.setAttribute('aria-label', label);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

// Restore saved theme (default light)
const savedTheme = localStorage.getItem('dilbaz_theme') || 'light';
applyTheme(savedTheme);

if (btnThemeToggle) {
  btnThemeToggle.addEventListener('click', toggleTheme);
}

// Track open/collapsed state of stage groups (default Stage 1 open)
const openStages = new Set(['stage-1']);

// 1. Initialize Pure Physics Runtime
const world = new AntigravityWorld(canvasEl);
world.start();

// 2. Attach selective DOM card physics bridge (Rule #3)
if (floatingDomCardEl) {
  domBridge.attach(floatingDomCardEl, {
    maxTilt: 8,
    floatStrength: 10,
    damping: 0.1
  });
}

// Particle counter updater
setInterval(() => {
  if (particleCounterEl) {
    particleCounterEl.textContent = `${world.particles.length} Parçacık`;
  }
}, 500);

// Logging Helper
function appendConsole(method, text) {
  const line = document.createElement('div');
  line.className = `console-line ${method}`;
  
  const prompt = document.createElement('span');
  prompt.className = 'console-prompt';
  prompt.textContent = method === 'error' ? '✖' : '>';
  
  const content = document.createElement('span');
  content.textContent = text;
  
  line.appendChild(prompt);
  line.appendChild(content);
  consoleOutputEl.appendChild(line);
  consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
}

// Render Sidebar: Collapsible Accordion with all 5 Stages & 90 Modules
function renderSidebar(activeStageId, activeModuleId) {
  if (!sidebarStagesAccordionEl) return;

  // Automatically expand the active stage group
  if (activeStageId) {
    openStages.add(activeStageId);
  }

  const completed = appState.get('completedModules') || [];
  let totalCompletedAll = 0;
  let totalModulesAll = 0;

  sidebarStagesAccordionEl.innerHTML = '';

  const trackId = currentTrackId();
  getTrackStages(trackId).forEach((stage) => {
    const modules = getTrackManifest(trackId).filter(m => m.stageId === stage.id);
    totalModulesAll += modules.length;
    const stageCompleted = modules.filter(m => completed.includes(m.id)).length;
    totalCompletedAll += stageCompleted;

    const isOpen = openStages.has(stage.id);
    const isActiveStage = stage.id === activeStageId;

    const groupEl = document.createElement('div');
    groupEl.className = `stage-group ${isOpen ? 'open' : ''} ${isActiveStage ? 'active-stage' : ''}`;
    groupEl.setAttribute('data-stage', stage.id);

    // Group Header (Click to expand/collapse)
    const headerEl = document.createElement('div');
    headerEl.className = 'stage-group-header';
    headerEl.innerHTML = `
      <div class="stage-header-left">
        <svg class="stage-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span class="stage-dot" style="background: ${stage.color};"></span>
        <span class="stage-group-title" title="${escapeHtml(stage.name)}">${escapeHtml(stage.shortName || stage.name)}</span>
      </div>
      <span class="stage-group-count">${stageCompleted > 0 ? `${stageCompleted}/` : ''}${modules.length}</span>
    `;

    headerEl.addEventListener('click', () => {
      if (openStages.has(stage.id)) {
        openStages.delete(stage.id);
        groupEl.classList.remove('open');
      } else {
        openStages.add(stage.id);
        groupEl.classList.add('open');
      }
    });

    // Sub-modules List Container
    const modulesContainerEl = document.createElement('div');
    modulesContainerEl.className = 'stage-group-modules';

    modules.forEach((mod) => {
      const isCompleted = completed.includes(mod.id);
      const isActive = mod.id === activeModuleId;

      const itemLink = document.createElement('a');
      itemLink.className = `module-item ${isActive ? 'active' : ''}`;
      itemLink.setAttribute('data-id', mod.id);
      itemLink.setAttribute('href', `#/${trackId}/${stage.id}/${mod.id}`);

      itemLink.innerHTML = `
        <span class="module-badge">${isCompleted ? '✓' : escapeHtml(mod.number)}</span>
        <div class="module-info">
          <div class="module-title">${escapeHtml(mod.title)}</div>
          <div class="module-meta">
            <span>${escapeHtml(mod.duration || '25 dk')}</span>
          </div>
        </div>
      `;

      itemLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileDrawer();
        setMobileView('lesson');
        router.navigate(`/${trackId}/${stage.id}/${mod.id}`);
      });

      modulesContainerEl.appendChild(itemLink);
    });

    groupEl.appendChild(headerEl);
    groupEl.appendChild(modulesContainerEl);
    sidebarStagesAccordionEl.appendChild(groupEl);
  });

  // Overall curriculum progress
  if (progressBadgeEl) {
    progressBadgeEl.textContent = `${totalCompletedAll} / ${totalModulesAll}`;
  }
}

// Toggle all stages open/closed
if (btnToggleAllStages) {
  btnToggleAllStages.addEventListener('click', () => {
    const allStages = getTrackStages(currentTrackId());
    if (openStages.size === allStages.length) {
      openStages.clear();
    } else {
      allStages.forEach(s => openStages.add(s.id));
    }
    const route = router.getRoute();
    const stageId = route ? route.stageId : 'stage-1';
    const moduleId = route ? route.moduleId : 's1-01';
    renderSidebar(stageId, moduleId);
  });
}

// Load and Render Lesson View + Mount Scene dynamically
async function loadAndRenderModule(stageId, moduleId) {
  lessonViewportEl.innerHTML = `
    <div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span>Ders yükleniyor…</div>
  `;

  try {
    const { metadata, content, scene } = await registry.loadModule(moduleId);

    // Update Mobile App Header Active Module Text
    if (mobileHeaderTitle) {
      mobileHeaderTitle.textContent = `${metadata.number} ${metadata.title}`;
    }

    // Compute Previous and Next Modules for App Navigation
    const manifest = getTrackManifest(currentTrackId());
    const currentIndex = manifest.findIndex(m => m.id === metadata.id);
    const prevMod = currentIndex > 0 ? manifest[currentIndex - 1] : null;
    const nextMod = currentIndex < manifest.length - 1 ? manifest[currentIndex + 1] : null;

    // 1. Mount new scene into physics runtime cleanly
    world.setScene(scene);
    appendConsole('info', `[Fizik Sahnesi Yüklendi]: ${scene.name}`);

    // 2. Render curriculum content
    if (!content) {
      lessonViewportEl.innerHTML = `
        <div class="lesson-container">
          <span class="lesson-badge beginner">${escapeHtml(metadata.stageId.toUpperCase())} • MODÜL ${escapeHtml(metadata.number)}</span>
          <h1 class="lesson-title">${escapeHtml(metadata.title)}</h1>
          <div class="analogy-card">
            <div class="analogy-title">Üretim aşamasında</div>
            <p class="analogy-text">Bu modülün derinlemesine konu anlatımı ve analojisi hazırlanıyor. Fizik laboratuvarını açarak kavramın temel mekanik simülasyonunu inceleyebilirsiniz.</p>
          </div>
        </div>
      `;
      return;
    }

    lessonViewportEl.innerHTML = `
      <div class="lesson-container">
        <span class="lesson-badge beginner">${escapeHtml(metadata.stageId.toUpperCase())} • MODÜL ${escapeHtml(metadata.number)}</span>
        <h1 class="lesson-title">${escapeHtml(metadata.title)}</h1>

        <!-- 1. Derinlemesine Konu Anlatımı -->
        <section class="content-section">
          <h2 class="section-tag"><span class="section-num">1</span> Konu anlatımı</h2>
          <div class="section-body">
            ${sanitizeRichHtml(content.deepDive)}
          </div>
        </section>

        <!-- 2. Gerçek Hayat Analojisi (Mental Model) -->
        <section class="content-section">
          <h2 class="section-tag"><span class="section-num">2</span> Gerçek hayattan bir benzetme</h2>
          <div class="analogy-card" id="active-analogy-card">
            <div class="analogy-title">${escapeHtml(content.analogy.title)}</div>
            <p class="analogy-text">${sanitizeRichHtml(content.analogy.text)}</p>
          </div>
        </section>

        <!-- 3. Teknik Kod Örneği & Sandbox -->
        <section class="content-section">
          <h2 class="section-tag"><span class="section-num">3</span> Kodu dene</h2>
          <div class="code-sandbox-card">
            <div class="sandbox-header">
              <span class="sandbox-title">script.js</span>
              <div class="sandbox-actions">
                <button class="btn btn-ghost btn-sm sandbox-ghost" id="btn-test-inf-loop" title="2 saniyelik zaman aşımı korumasını dene">
                  Sonsuz döngü testi
                </button>
                <button class="btn btn-primary btn-sm" id="btn-run-code">
                  Çalıştır
                </button>
              </div>
            </div>
            <textarea class="editor-textarea" id="code-editor" spellcheck="false" aria-label="Kod düzenleyici">${escapeHtml(content.antigravityCode || '// Kod bulunamadı')}</textarea>
            <div class="sandbox-output" id="sandbox-output" aria-live="polite" hidden></div>
          </div>
        </section>

        <!-- 4. Best Practice & Sık Yapılan Hatalar -->
        <section class="content-section">
          <h2 class="section-tag"><span class="section-num">4</span> Doğru ve yanlış kullanımlar</h2>
          <div class="best-practices-grid">
            ${(content.bestPractices || []).map(bp => `
              <div class="practice-card ${escapeHtml(bp.type)}">
                <h4>${bp.type === 'good' ? 'Doğru yaklaşım' : 'Sık yapılan hata'}</h4>
                <p><strong>${escapeHtml(bp.title)}:</strong> ${sanitizeRichHtml(bp.text)}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 5. Modül Ustalık & Değerlendirme Testi -->
        <section class="content-section" id="module-quiz-section">
          <h2 class="section-tag"><span class="section-num">5</span> Değerlendirme testi <span class="section-meta">${(content.quiz && content.quiz.length) ? content.quiz.length : 0} soru</span></h2>
          <div id="module-quiz-mount">
            ${!content.quiz || content.quiz.length === 0 ? `
              <div class="empty-note">Bu modül için değerlendirme testi hazırlanıyor.</div>
            ` : ''}
          </div>
        </section>

        <div class="lesson-footer">
          <p>Testi %80 ve üzeri başarıyla bitirdiğinde modül otomatik olarak tamamlanır.</p>
          <button class="btn btn-secondary btn-sm" id="btn-complete-lesson">Tamamlandı olarak işaretle</button>
        </div>

        <!-- Mobile-First App Navigation Footer (Previous / Next Module) -->
        <div class="mobile-lesson-nav-bar">
          ${prevMod ? `
            <button class="mobile-nav-btn prev" id="btn-prev-lesson" data-stage="${escapeHtml(prevMod.stageId)}" data-module="${escapeHtml(prevMod.id)}" title="Önceki Ders">
              <span class="mobile-nav-btn-sub">← Önceki</span>
              <span class="mobile-nav-btn-title">${escapeHtml(prevMod.number)} ${escapeHtml(prevMod.title)}</span>
            </button>
          ` : '<div style="flex:1;"></div>'}
          ${nextMod ? `
            <button class="mobile-nav-btn next" id="btn-next-lesson" data-stage="${escapeHtml(nextMod.stageId)}" data-module="${escapeHtml(nextMod.id)}" title="Sonraki Ders">
              <span class="mobile-nav-btn-sub">Sonraki →</span>
              <span class="mobile-nav-btn-title">${escapeHtml(nextMod.number)} ${escapeHtml(nextMod.title)}</span>
            </button>
          ` : '<div style="flex:1;"></div>'}
        </div>
      </div>
    `;

    // Wire Previous / Next Lesson Button Navigation
    const btnPrev = document.getElementById('btn-prev-lesson');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        router.navigate(`/${currentTrackId()}/${btnPrev.dataset.stage}/${btnPrev.dataset.module}`);
        lessonViewportEl.scrollTop = 0;
      });
    }
    const btnNext = document.getElementById('btn-next-lesson');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        router.navigate(`/${currentTrackId()}/${btnNext.dataset.stage}/${btnNext.dataset.module}`);
        lessonViewportEl.scrollTop = 0;
      });
    }

    // Initialize Module Quiz if questions exist
    const quizMountEl = document.getElementById('module-quiz-mount');
    if (quizMountEl && content.quiz && content.quiz.length > 0) {
      const isCompleted = (appState.get('completedModules') || []).includes(metadata.id);
      moduleQuizManager.mount(quizMountEl, metadata, { kind: 'module', ref: metadata.id }, {
        isCompleted,
        world,
        onPass: ({ percentage, score, total }) => {
          appState.markModuleComplete(metadata.id);
          renderSidebar(stageId, moduleId);
          appendConsole('info', `🏆 [Ustalık Sınavı Başarılı]: %${percentage} (${score}/${total * 10} puan) ile "${metadata.title}" modülü tamamlandı!`);
        }
      });
    }

    // Attach subtle 3D levitation to analogy card
    const activeCard = document.getElementById('active-analogy-card');
    if (activeCard) {
      domBridge.attach(activeCard, { maxTilt: 6, floatStrength: 6 });
    }

    // Code Sandbox Run Handler
    const btnRun = document.getElementById('btn-run-code');
    const editor = document.getElementById('code-editor');
    if (btnRun && editor) {
      const outputEl = document.getElementById('sandbox-output');
      const showOutput = (method, text) => {
        if (!outputEl) return;
        outputEl.hidden = false;
        const line = document.createElement('div');
        line.className = `sandbox-line ${method}`;
        line.textContent = text;
        outputEl.appendChild(line);
      };
      btnRun.addEventListener('click', async () => {
        btnRun.disabled = true;
        btnRun.textContent = 'Çalışıyor…';
        if (outputEl) outputEl.innerHTML = '';
        appendConsole('info', `[Yürütülüyor...]: Kod Web Worker havuzuna gönderildi.`);

        const result = await codeRunner.execute(editor.value, (log) => {
          appendConsole(log.method, log.text);
          showOutput(log.method, log.text);
        });

        if (result.success) {
          showOutput('info', `Tamamlandı (${result.duration} ms) · Sonuç: ${result.result}`);
          appendConsole('info', `[Tamamlandı (${result.duration}ms)]: Çıktı: ${result.result}`);
          // Small celebration particle burst
          for (let i = 0; i < 5; i++) {
            world.spawnParticle(world.width / 2 + (Math.random() - 0.5) * 100, 50, {
              radius: 8,
              color: '#10b981',
              label: 'OK',
              vy: -2,
              vx: (Math.random() - 0.5) * 6,
              lifespan: 180
            });
          }
        }

        btnRun.disabled = false;
        btnRun.textContent = 'Çalıştır';
      });
    }

    // Infinite Loop Guard Test
    const btnLoop = document.getElementById('btn-test-inf-loop');
    if (btnLoop) {
      btnLoop.addEventListener('click', async () => {
        appendConsole('warn', '[Test Başlatıldı]: 2 saniyelik sonsuz döngü güvenlik testi...');
        const loopCode = `
          console.log("Sonsuz döngüye giriliyor: while(true)... Tarayıcınız donmayacak!");
          let count = 0;
          while(true) { count++; }
        `;
        btnLoop.disabled = true;
        await codeRunner.execute(loopCode, (log) => {
          appendConsole(log.method, log.text);
        });
        btnLoop.disabled = false;
      });
    }

    // Complete Module Handler
    const btnComplete = document.getElementById('btn-complete-lesson');
    if (btnComplete) {
      btnComplete.addEventListener('click', () => {
        appState.markModuleComplete(metadata.id);
        renderSidebar(stageId, moduleId);
        appendConsole('info', `🎉 Tebrikler! "${metadata.title}" modülünü tamamladınız.`);
      });
    }
  } catch (error) {
    console.error('Module load error:', error);
    lessonViewportEl.innerHTML = `
      <div class="lesson-container">
        <h2 style="color: var(--accent-pink);">Modül Yükleme Hatası</h2>
        <p style="color: var(--text-secondary);">${escapeHtml(error.message)}</p>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Sayfayı yenileyip tekrar deneyin. Sorun devam ederse yerel sunucunun çalıştığını kontrol edin.</p>
      </div>
    `;
  }
}

// ---- Learning tracks ("alanlar") -----------------------------------------
const trackViewEl = document.getElementById('track-view');
const btnHeaderTracks = document.getElementById('btn-header-tracks');
const brandTitleEl = document.getElementById('brand-title');
const brandBadgeEl = document.getElementById('brand-badge');

function currentTrackId() {
  return router.getTrackId();
}

/** Canonical lesson path for a module inside a track. */
function lessonPath(trackId, moduleId) {
  const stageId = getTrackModuleStage(trackId, moduleId) || 'stage-1';
  return `/${trackId}/${stageId}/${moduleId}`;
}

/** The quiz banks currently exist for JavaScript only. */
function openQuiz() {
  if (currentTrackId() !== 'js') {
    appendConsole('info', currentTrackId() === 'english'
      ? '[Sınav]: Her dersin sonundaki alıştırma testini kullanın.'
      : '[Sınav]: Bu alanın sınavları henüz hazır değil.');
    return;
  }
  const route = router.getRoute();
  const stageId = (route && route.stageId) || 'stage-1';
  appendConsole('info', `[Sınav Modülü]: ${stageId.toUpperCase()} sınavı açıldı.`);
  quizEngine.open('beginner');
}

function updateBrand(track) {
  if (brandTitleEl) brandTitleEl.textContent = track ? `Linear ${track.name}` : 'Linear';
  if (brandBadgeEl) brandBadgeEl.textContent = track ? track.name.toUpperCase() : 'ALANLAR';
  document.title = track ? `Linear · ${track.name}` : 'Linear · Öğrenme Alanları';
  if (appEl) appEl.dataset.track = track ? track.id : '';
  // The JavaScript exam bank is JavaScript-only; hide its button elsewhere.
  if (btnHeaderQuiz) btnHeaderQuiz.style.display = track && track.id !== 'js' ? 'none' : '';
}

function hideStudentAndAdmin() {
  if (studentWorkspaceEl) studentWorkspaceEl.style.display = 'none';
  if (adminMountEl) adminMountEl.style.display = 'none';
  world.stop();
}

/** Opening screen: pick a learning track. */
function renderTrackPicker() {
  hideStudentAndAdmin();
  if (btnHeaderAdmin) btnHeaderAdmin.classList.remove('active');
  updateBrand(null);
  updateMobileNavState('');
  trackViewEl.innerHTML = `
    <div class="track-hero">
      <h1>Ne öğrenmek istersin?</h1>
      <p>Bir alan seç. Site seçtiğin alanın müfredatıyla açılır; alanlar birbirinden bağımsızdır.</p>
    </div>
    <div class="track-grid">
      ${TRACKS.map(t => {
        const count = getTrackManifest(t.id).length;
        return `
          <a class="track-card ${t.status === 'planned' ? 'planned' : ''}" href="#/${t.id}" data-track="${t.id}">
            <span class="track-icon">${t.icon}</span>
            <span class="track-name">${escapeHtml(t.name)}</span>
            <span class="track-desc">${escapeHtml(t.description)}</span>
            <span class="track-meta">${count ? `${count} konu` : 'Yakında'}</span>
          </a>`;
      }).join('')}
    </div>`;
  trackViewEl.style.display = 'block';
}

/** Track selected but without content yet. */
function renderTrackEmpty(track) {
  hideStudentAndAdmin();
  updateBrand(track);
  updateMobileNavState('');
  trackViewEl.innerHTML = `
    <div class="track-empty">
      <div class="track-icon">${track.icon}</div>
      <h2>${escapeHtml(track.name)} alanı hazırlanıyor</h2>
      <p>Bu alanın müfredatı henüz eklenmedi. Hazır olduğunda konular ve dersler burada görünecek.</p>
      <div class="track-actions">
        <a class="btn btn-secondary btn-sm" href="#/">Alanlara dön</a>
        ${isAdmin() ? `<a class="btn btn-primary btn-sm" href="#/${track.id}/admin">Yönetim paneli</a>` : ''}
      </div>
    </div>`;
  trackViewEl.style.display = 'block';
}

function showStudentWorkspace() {
  if (trackViewEl) { trackViewEl.style.display = 'none'; trackViewEl.innerHTML = ''; }
  if (adminMountEl) adminMountEl.style.display = 'none';
  if (studentWorkspaceEl) studentWorkspaceEl.style.display = 'flex';
  if (btnHeaderAdmin) {
    btnHeaderAdmin.classList.remove('active');
    btnHeaderAdmin.innerHTML = `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"></path></svg> Yönetim`;
  }
}

// ---- Language lessons (non-JavaScript tracks) ------------------------------
/** Opens the lesson at the first module of a stage (or the track's first lesson). */
function startTrackAt(trackId, stageId) {
  const manifest = getTrackManifest(trackId);
  const first = manifest.find(m => m.stageId === stageId) || manifest[0];
  if (first) router.navigate(`/${trackId}/${first.stageId}/${first.id}`);
}

function renderPlacement(track) {
  hideStudentAndAdmin();
  updateBrand(track);
  updateMobileNavState('');
  trackViewEl.style.display = 'block';
  mountPlacement(trackViewEl, {
    onStart: (stageId) => startTrackAt(track.id, stageId)
  });
}

/** Shown when a level is locked: explains what is missing and where to go. */
function renderLockedStage(trackId, stageId) {
  const stages = getTrackStages(trackId);
  const idx = stages.findIndex(st => st.id === stageId);
  const prevStage = idx > 0 ? stages[idx - 1] : null;
  const lessons = stageLessonStats(prevStage ? prevStage.id : stageId);
  const vocab = stageVocabStats(prevStage ? prevStage.id : stageId);
  lessonViewportEl.innerHTML = `
    <div class="lesson-container">
      <div class="lock-card">
        <span class="track-icon">🔒</span>
        <h2>${escapeHtml(stageName(stageId))} kilitli</h2>
        <p>Bu seviyeyi açmak için önce <strong>${escapeHtml(prevStage ? prevStage.name : '')}</strong> seviyesini tamamla:</p>
        <p>Dersler: <strong>${lessons.done} / ${lessons.total}</strong> · Kelime: <strong>${vocab.known} / ${vocab.target || vocab.total}</strong></p>
        <p>Ya da seviye testinden daha yüksek bir seviye seçtiysen bu seviye zaten açılır.</p>
        <div class="track-actions">
          ${prevStage ? `<button class="btn btn-primary btn-sm" id="lock-go-prev">${escapeHtml(prevStage.shortName)} derslerine git</button>` : ''}
          <a class="btn btn-secondary btn-sm" href="#/${escapeHtml(trackId)}/progress">İlerlemem</a>
          <a class="btn btn-secondary btn-sm" href="#/${escapeHtml(trackId)}/placement">Seviye testi</a>
        </div>
      </div>
    </div>`;
  document.getElementById('lock-go-prev')?.addEventListener('click', () => startTrackAt(trackId, prevStage.id));
}

/** Lesson view for tracks other than JavaScript: text, examples, practice quiz. */
async function renderLanguageLesson(trackId, stageId, moduleId) {
  const track = getTrack(trackId);
  const manifest = getTrackManifest(trackId);
  const index = manifest.findIndex(m => m.id === moduleId);
  if (index < 0) {
    lessonViewportEl.innerHTML = '<div class="lesson-container"><p>Bu ders bulunamadı.</p></div>';
    return;
  }
  const meta = manifest[index];
  const stage = getTrackStages(trackId).find(s => s.id === meta.stageId);
  if (!stageUnlocked(meta.stageId)) {
    renderLockedStage(trackId, meta.stageId);
    return;
  }
  const prev = manifest[index - 1] || null;
  const next = manifest[index + 1] || null;

  lessonViewportEl.innerHTML = `
    <div class="loading-state"><span class="loading-spinner" aria-hidden="true"></span>Ders yükleniyor…</div>`;

  try {
    const { metadata, content } = await registry.loadModule(moduleId);
    if (mobileHeaderTitle) mobileHeaderTitle.textContent = `${metadata.number} ${metadata.title}`;
    const quiz = (content && content.quiz) || [];
    const isCompleted = (appState.get('completedModules') || []).includes(metadata.id);

    lessonViewportEl.innerHTML = `
      <div class="lesson-container">
        <span class="lesson-badge beginner">${escapeHtml(stage ? stage.shortName : '')} • DERS ${escapeHtml(metadata.number)}</span>
        <h1 class="lesson-title">${escapeHtml(metadata.title)}</h1>

        <section class="content-section">
          <h2 class="section-tag">Konu anlatımı</h2>
          <div class="section-body">${sanitizeRichHtml(content ? content.deepDive : '')}</div>
        </section>

        ${content && content.bestPractices && content.bestPractices.length ? `
        <section class="content-section">
          <h2 class="section-tag">Hatırlatmalar</h2>
          <div class="section-body">
            ${content.bestPractices.map(bp => `
              <div class="practice-card ${escapeHtml(bp.type)}">
                <h4>${bp.type === 'good' ? 'Doğru kullanım' : 'Sık yapılan hata'}</h4>
                <p><strong>${escapeHtml(bp.title)}:</strong> ${sanitizeRichHtml(bp.text)}</p>
              </div>`).join('')}
          </div>
        </section>` : ''}

        <section class="content-section">
          <h2 class="section-tag">Alıştırma testi <span class="section-meta">${quiz.length} soru</span></h2>
          <div id="module-quiz-mount"></div>
        </section>

        <div class="lang-lesson-nav">
          ${prev ? `<button class="btn btn-secondary btn-sm" id="btn-prev-lesson" data-stage="${escapeHtml(prev.stageId)}" data-module="${escapeHtml(prev.id)}">← ${escapeHtml(prev.number)} ${escapeHtml(prev.title)}</button>` : '<span></span>'}
          ${next ? `<button class="btn btn-primary btn-sm" id="btn-next-lesson" data-stage="${escapeHtml(next.stageId)}" data-module="${escapeHtml(next.id)}">${escapeHtml(next.number)} ${escapeHtml(next.title)} →</button>` : '<span></span>'}
        </div>
        ${trackId === 'english' ? `<nav class="lang-lesson-tools" aria-label="Ders araçları"><a href="#/${escapeHtml(trackId)}/vocab/${escapeHtml(meta.stageId)}">Kelime oturumu</a><a href="#/${escapeHtml(trackId)}/progress">İlerlemem</a><a href="#/${escapeHtml(trackId)}/placement">Seviye testi</a></nav>` : ''}
      </div>`;

    document.getElementById('btn-prev-lesson')?.addEventListener('click', (e) => {
      const b = e.currentTarget;
      router.navigate(`/${trackId}/${b.dataset.stage}/${b.dataset.module}`);
      lessonViewportEl.scrollTop = 0;
    });
    document.getElementById('btn-next-lesson')?.addEventListener('click', (e) => {
      const b = e.currentTarget;
      router.navigate(`/${trackId}/${b.dataset.stage}/${b.dataset.module}`);
      lessonViewportEl.scrollTop = 0;
    });

    const quizMountEl = document.getElementById('module-quiz-mount');
    if (quizMountEl && quiz.length > 0) {
      moduleQuizManager.mount(quizMountEl, metadata, { kind: 'module', ref: metadata.id }, {
        isCompleted,
        labels: track.labels,
        onPass: ({ percentage, score, total }) => {
          appState.markModuleComplete(metadata.id);
          renderSidebar(stageId, moduleId);
          appendConsole('info', `🏆 Test tamamlandı: %${percentage} (${score}/${total * 10} puan) — "${metadata.title}"`);
        }
      });
    }
  } catch (error) {
    console.error('Lesson load error:', error);
    lessonViewportEl.innerHTML = `
      <div class="lesson-container">
        <h2 style="color: var(--accent-pink);">Ders yüklenemedi</h2>
        <p style="color: var(--text-secondary);">${escapeHtml(error.message)}</p>
      </div>`;
  }
}

// Router Event Handler
async function handleRoute(route) {
  if (route.mode === 'landing') {
    renderTrackPicker();
    return;
  }

  const track = getTrack(route.trackId);
  if (!track) {
    renderTrackPicker();
    return;
  }
  updateBrand(track);

  // Track home: open its first lesson
  if (route.mode === 'track') {
    if (track.placement) {
      // Language track: placement test comes first, then the recommended level
      const result = getPlacementResult();
      if (!result) {
        router.navigate(`/${track.id}/placement`, true);
      } else {
        startTrackAt(track.id, result.stageId);
      }
      return;
    }
    const first = getTrackManifest(track.id)[0];
    if (first) {
      router.navigate(`/${track.id}/${first.stageId}/${first.id}`, true);
    } else {
      renderTrackEmpty(track);
    }
    return;
  }

  // Level placement test (language tracks)
  if (route.mode === 'placement') {
    if (track.placement) {
      renderPlacement(track);
    } else {
      router.navigate(`/${track.id}`, true);
    }
    return;
  }

  // Progress dashboard and vocabulary sessions (language track)
  if (route.mode === 'progress' || route.mode === 'vocab') {
    if (track.id !== 'english') {
      router.navigate(`/${track.id}`, true);
      return;
    }
    hideStudentAndAdmin();
    updateBrand(track);
    updateMobileNavState('');
    trackViewEl.style.display = 'block';
    if (route.mode === 'progress') {
      renderProgressDashboard(trackViewEl, {
        onOpenStage: (stageId) => startTrackAt(track.id, stageId),
        onVocab: (stageId) => router.navigate(`/${track.id}/vocab/${stageId}`)
      });
    } else {
      mountVocabSession(trackViewEl, route.stageId || 'en-a1', {
        onDone: () => router.navigate(`/${track.id}/progress`)
      });
    }
    return;
  }

  // Admin panel works for every track (also for planned ones, to add content)
  if (route.mode === 'admin') {
    if (!isAdmin()) {
      router.navigate(`/${track.id}`);
      return;
    }
    updateMobileNavState('admin');
    if (trackViewEl) trackViewEl.style.display = 'none';
    if (studentWorkspaceEl) studentWorkspaceEl.style.display = 'none';
    if (adminMountEl) adminMountEl.style.display = 'block';
    if (btnHeaderAdmin) {
      btnHeaderAdmin.classList.add('active');
      btnHeaderAdmin.innerHTML = `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"></path><path d="m11 6-6 6 6 6"></path></svg> Öğrenci görünümü`;
    }

    world.stop(); // Pause physics in admin mode

    if (route.moduleId === 'users') {
      // Account approvals: replaces the content editor until the admin goes back.
      activeAdminInstance = null;
      if (adminMountEl) await new UsersPanel(adminMountEl, track.id).mount();
      return;
    }

    if (!activeAdminInstance && adminMountEl) {
      activeAdminInstance = new AdminPanel(adminMountEl);
      await activeAdminInstance.mount(route.moduleId, track.id);
    } else if (activeAdminInstance) {
      if (activeAdminInstance.trackId !== track.id) {
        await activeAdminInstance.mount(route.moduleId, track.id);
      } else if (route.moduleId && activeAdminInstance.currentModuleId !== route.moduleId) {
        await activeAdminInstance.selectModule(route.moduleId);
      }
    }
    return;
  }

  // Track without content yet
  if (!trackHasContent(track.id)) {
    renderTrackEmpty(track);
    return;
  }

  // Student workspace
  showStudentWorkspace();
  // Physics lab belongs to JavaScript only; other tracks keep it collapsed.
  if (track.id === 'js') {
    appEl.classList.toggle('physics-collapsed', localStorage.getItem('antigravity_physics_collapsed') !== 'false');
  } else {
    appEl.classList.add('physics-collapsed');
  }
  if (!appEl.classList.contains('physics-collapsed')) {
    world.start();
  }

  if (route.mode === 'quiz') {
    updateMobileNavState('quiz');
    openQuiz();
    return;
  }

  const currentMobView = appEl.getAttribute('data-mobile-view') || 'lesson';
  updateMobileNavState(currentMobView);

  const manifest = getTrackManifest(track.id);
  const stageId = route.stageId || (manifest[0] ? manifest[0].stageId : 'stage-1');
  const stageModules = manifest.filter(m => m.stageId === stageId);
  const moduleId = route.moduleId || (stageModules[0] ? stageModules[0].id : manifest[0].id);

  renderSidebar(stageId, moduleId);
  if (track.id === 'js') {
    loadAndRenderModule(stageId, moduleId);
  } else {
    renderLanguageLesson(track.id, stageId, moduleId);
  }
}

// Admin Panel Toggle Header Button
if (btnHeaderAdmin) {
  btnHeaderAdmin.addEventListener('click', () => {
    const route = router.getRoute();
    if (route && route.mode === 'admin') {
      const targetMod = (activeAdminInstance && activeAdminInstance.currentModuleId) || 's1-01';
      router.navigate(lessonPath(currentTrackId(), targetMod));
    } else {
      const currentMod = (route && route.moduleId) || 's1-01';
      router.navigate(`/${currentTrackId()}/admin/${currentMod}`);
    }
  });
}

// Brand Logo click navigates home
if (brandLogoEl) {
  brandLogoEl.addEventListener('click', () => {
    router.navigate('/');
  });
}

// Header: go back to the track picker
if (btnHeaderTracks) {
  btnHeaderTracks.addEventListener('click', () => router.navigate('/'));
}

// Antigravity Toggle Button
btnToggleGravity.addEventListener('click', () => {
  const isAnti = world.toggleAntigravity();
  gravityStatusText.textContent = isAnti ? 'Açık' : 'Kapalı';
  btnToggleGravity.classList.toggle('btn-primary', !isAnti);
  btnToggleGravity.classList.toggle('btn-danger', isAnti);
  appendConsole('info', `[Fizik Alanı]: Yerçekimi tersine çevrildi -> Antigravity ${isAnti ? 'AKTİF' : 'DEVRE DIŞI'}`);
});

// Gravity slider
gravitySlider.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  world.setGravity(val);
});

// Reset physics
btnResetPhysics.addEventListener('click', () => {
  const route = router.getRoute();
  if (route && route.moduleId) {
    registry.loadModule(route.moduleId).then(({ scene }) => {
      world.setScene(scene);
      appendConsole('info', `[Fizik Alanı]: Sahne sıfırlandı -> ${scene.name}`);
    });
  }
});

// Clear console
btnClearConsole.addEventListener('click', () => {
  consoleOutputEl.innerHTML = '';
});

// Header Quiz Button
btnHeaderQuiz.addEventListener('click', () => {
  openQuiz();
});

// Physics Stage Visibility Management
function setPhysicsPanelCollapsed(collapsed) {
  if (collapsed) {
    appEl.classList.add('physics-collapsed');
    if (btnTogglePhysicsPanel) btnTogglePhysicsPanel.classList.remove('active');
    localStorage.setItem('antigravity_physics_collapsed', 'true');
    // Halt physics loop while hidden to prevent particle distortion and CPU waste
    world.stop();
    appendConsole('info', '[Görünüm]: Fizik alanı gizlendi. Tam ekran okuma modu aktif.');
  } else {
    appEl.classList.remove('physics-collapsed');
    if (btnTogglePhysicsPanel) btnTogglePhysicsPanel.classList.add('active');
    localStorage.setItem('antigravity_physics_collapsed', 'false');

    // Allow DOM to compute dimensions, then resize, restore particles cleanly, and resume animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        world.resize();
        world.reinitCurrentScene();
        world.start();
        appendConsole('info', '[Görünüm]: Fizik alanı açıldı ve sahne tazelendi.');
      }, 50);
    });
  }
}

function togglePhysicsPanel() {
  const isCollapsed = appEl.classList.contains('physics-collapsed');
  setPhysicsPanelCollapsed(!isCollapsed);
}

if (btnTogglePhysicsPanel) btnTogglePhysicsPanel.addEventListener('click', togglePhysicsPanel);
if (btnStageClose) btnStageClose.addEventListener('click', () => setPhysicsPanelCollapsed(true));

// Restore initial collapsed state
const savedCollapsed = localStorage.getItem('antigravity_physics_collapsed') !== 'false';
if (savedCollapsed) {
  setPhysicsPanelCollapsed(true);
}

// Boot Application with Router
startSession(() => router.init((route) => handleRoute(route)));
