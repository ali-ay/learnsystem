/**
 * Reactive State Manager with LocalStorage persistence and Event Pub/Sub
 */

const STORAGE_KEY = 'antigravity_js_state_v1';

class AppState {
  constructor() {
    this.listeners = new Map();

    const saved = this.loadFromStorage();
    this.data = {
      level: saved.level || 'beginner',
      activeModuleId: saved.activeModuleId || 's1-01',
      completedModules: saved.completedModules || [],
      quizScores: saved.quizScores || {
        beginner: null,
        intermediate: null,
        advanced: null
      },
      antigravityActive: false,
      gravityValue: 0.28
    };
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          level: this.data.level,
          activeModuleId: this.data.activeModuleId,
          completedModules: this.data.completedModules,
          quizScores: this.data.quizScores
        })
      );
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    const oldValue = this.data[key];
    this.data[key] = value;
    this.saveToStorage();
    this.emit(key, value, oldValue);
    this.emit('*', { key, value, oldValue });
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => cb(...args));
    }
  }

  markModuleComplete(moduleId) {
    if (!this.data.completedModules.includes(moduleId)) {
      this.data.completedModules.push(moduleId);
      this.saveToStorage();
      this.emit('progress', this.data.completedModules);
      this.emit('completed', moduleId);
    }
  }
}

export const appState = new AppState();
