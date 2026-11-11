import { getModuleMeta } from './catalog.js';
import { SCENE_LOADERS } from '../curriculum/scenes.js';
import { Scene } from '../physics/Scene.js';
import { curriculumApi } from './api.js';

/**
 * GenericFallbackScene
 * Used for upcoming topics that have no physics scene yet.
 */
class GenericFallbackScene extends Scene {
  constructor(title) {
    super(`Preview: ${title}`);
    this.title = title;
  }

  init(world) {
    super.init(world);
    world.clear();
    const cx = world.width / 2;
    const cy = world.height / 2;

    const centerNode = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'JS',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      isPinned: true
    });

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = cx + Math.cos(angle) * 110;
      const y = cy + Math.sin(angle) * 110;
      const satellite = world.spawnParticle(x, y, {
        radius: 13,
        label: `T-${i + 1}`,
        color: '#00f0ff',
        antigravityCharge: 0.5 + Math.random() * 0.4,
        vx: -Math.sin(angle) * 2,
        vy: Math.cos(angle) * 2
      });
      world.addConstraint(centerNode, satellite, {
        length: 110,
        stiffness: 0.2,
        color: 'rgba(0, 240, 255, 0.25)'
      });
    }
  }
}

/**
 * ModuleRegistry
 * Loads lesson content from the database and lazily imports the physics scene of a lesson.
 */
class ModuleRegistry {
  constructor() {
    this.contentCache = new Map();
    this.sceneCache = new Map();
  }

  /** Clears cached lesson content (after an admin edit). */
  invalidateCache(moduleId) {
    if (moduleId) {
      this.contentCache.delete(moduleId);
    } else {
      this.contentCache.clear();
    }
  }

  /**
   * @param {string} moduleId
   * @returns {Promise<{ metadata: Object, content: Object|null, scene: Scene }>}
   */
  async loadModule(moduleId) {
    const meta = getModuleMeta(moduleId) || { id: moduleId, stageId: '', number: '00', title: moduleId };

    let content = null;
    let metadata = meta;
    try {
      const dbData = await curriculumApi.getModule(moduleId);
      if (dbData && dbData.content) content = dbData.content;
      if (dbData && dbData.metadata) metadata = { ...meta, ...dbData.metadata };
    } catch (err) {
      console.warn(`[Registry] "${moduleId}" içeriği yüklenemedi: ${err.message}`);
    }

    let scene = null;
    if (this.sceneCache.has(moduleId)) {
      scene = new (this.sceneCache.get(moduleId))();
    } else if (SCENE_LOADERS[moduleId]) {
      try {
        const sceneExports = await SCENE_LOADERS[moduleId]();
        const SceneClass = sceneExports.default || sceneExports.SceneClass;
        if (SceneClass) {
          this.sceneCache.set(moduleId, SceneClass);
          scene = new SceneClass();
        }
      } catch (err) {
        console.warn(`Could not load scene for ${moduleId}, using fallback:`, err);
      }
    }
    if (!scene) scene = new GenericFallbackScene(metadata.title);

    return { metadata, content, scene };
  }
}

export const registry = new ModuleRegistry();
