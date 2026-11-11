/**
 * api.js
 * Client REST API service connecting the frontend to SQLite Database via Vite server middleware.
 */

class CurriculumApiClient {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  async _request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, { credentials: 'include', ...options, headers });
      if (!response.ok) {
        let errMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) errMessage = errData.error;
        } catch (_) {}
        throw new Error(errMessage);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[API] İstek hatası (${url}):`, err.message);
      throw err;
    }
  }

  /**
   * Get all stages with count of modules and questions
   */
  async getStages(trackId = null) {
    const qs = trackId ? `?track=${encodeURIComponent(trackId)}` : '';
    return this._request(`/stages${qs}`);
  }

  /**
   * Get all modules, optional filter by stageId or search query
   */
  async getModules(stageId = null, search = '', trackId = null) {
    const params = new URLSearchParams();
    if (stageId) params.append('stageId', stageId);
    if (trackId) params.append('track', trackId);
    if (search) params.append('q', search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this._request(`/modules${queryString}`);
  }

  /** Placement levels and questions. */
  async getPlacement() {
    return this._request('/placement');
  }

  /**
   * Get a single module with its full content and questions
   */
  async getModule(moduleId) {
    return this._request(`/modules/${encodeURIComponent(moduleId)}`);
  }

  /**
   * Update full module content and quiz questions
   */
  async updateModule(moduleId, { metadata, content }) {
    return this._request(`/modules/${encodeURIComponent(moduleId)}`, {
      method: 'PUT',
      body: JSON.stringify({ metadata, content })
    });
  }

  /**
   * Create a new module
   */
  async createModule({ metadata, content }) {
    return this._request('/modules', {
      method: 'POST',
      body: JSON.stringify({ metadata, content })
    });
  }

  /**
   * Delete a module and its questions
   */
  async deleteModule(moduleId) {
    return this._request(`/modules/${encodeURIComponent(moduleId)}`, {
      method: 'DELETE'
    });
  }

  /**
   * Export all database data to JSON
   */
  async exportBackup() {
    return this._request('/export');
  }

  /**
   * Restore database data from JSON
   */
  async importBackup(jsonData) {
    return this._request('/import', {
      method: 'POST',
      body: JSON.stringify(jsonData)
    });
  }
}

export const curriculumApi = new CurriculumApiClient();
