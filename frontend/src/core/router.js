/**
 * router.js
 * Hash-based client router. Every route starts with a learning track:
 *   #/                         -> track picker (landing)
 *   #/js                       -> track home (first lesson of the track)
 *   #/js/stage-1/s1-01         -> lesson
 *   #/js/quiz/stage-1          -> quiz for a stage
 *   #/js/admin/s1-01           -> admin panel for a track
 * Legacy links without a track (#/stage-1/s1-01) are treated as the JavaScript
 * track and rewritten to the canonical form.
 */
import { TRACKS, DEFAULT_TRACK_ID } from './tracks.js';

const TRACK_IDS = new Set(TRACKS.map(t => t.id));

/**
 * Pure parser (exported for tests).
 * @param {string} hash  Hash without the leading '#'
 * @returns {{mode:string, trackId:string|null, stageId:string|null, moduleId:string|null, legacy:boolean, raw:string}}
 */
export function parseRoute(hash) {
  const raw = hash || '';
  const parts = raw.split('/').filter(Boolean);
  if (parts.length === 0) {
    return { mode: 'landing', trackId: null, stageId: null, moduleId: null, legacy: false, raw };
  }

  const hasTrack = TRACK_IDS.has(parts[0]);
  const trackId = hasTrack ? parts[0] : DEFAULT_TRACK_ID;
  const rest = hasTrack ? parts.slice(1) : parts;
  const base = { trackId, stageId: null, moduleId: null, legacy: !hasTrack, raw };

  if (rest.length === 0) return { ...base, mode: 'track' };
  if (rest[0] === 'placement') return { ...base, mode: 'placement' };
  if (rest[0] === 'progress') return { ...base, mode: 'progress' };
  if (rest[0] === 'vocab') return { ...base, mode: 'vocab', stageId: rest[1] || null };
  if (rest[0] === 'admin') return { ...base, mode: 'admin', moduleId: rest[1] || null };
  if (rest[0] === 'quiz') return { ...base, mode: 'quiz', stageId: rest[1] || null };
  if (rest.length >= 2) return { ...base, mode: 'lesson', stageId: rest[0], moduleId: rest[1] };
  return { ...base, mode: 'stage', stageId: rest[0] };
}

class HashRouter {
  constructor() {
    this.currentRoute = null;
    this.onRouteHandler = null;
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  init(onRoute) {
    this.onRouteHandler = onRoute;
    this.handleHashChange();
  }

  /**
   * @param {string} path  Path such as '/js/stage-1/s1-01' or '/' for the picker
   */
  navigate(path, replace = false) {
    const formatted = path.startsWith('/') ? `#${path}` : `#/${path}`;
    if (replace) {
      window.location.replace(formatted);
    } else {
      window.location.hash = formatted;
    }
  }

  handleHashChange() {
    const route = parseRoute(window.location.hash.slice(1));

    // Old links (no track) become canonical track links.
    if (route.legacy && route.mode !== 'landing') {
      const rest = route.raw.split('/').filter(Boolean);
      this.navigate(`/${route.trackId}/${rest.join('/')}`, true);
      return;
    }

    this.currentRoute = route;
    if (typeof this.onRouteHandler === 'function') {
      this.onRouteHandler(route);
    }
  }

  getRoute() {
    return this.currentRoute;
  }

  /** Current track id, falling back to the default track. */
  getTrackId() {
    return (this.currentRoute && this.currentRoute.trackId) || DEFAULT_TRACK_ID;
  }
}

export const router = new HashRouter();
