/**
 * Scene.js
 * Abstract Base Class for all Antigravity Physics Scenes
 * Every curriculum module implements its own Scene with discrete lifecycle hooks.
 */

export class Scene {
  constructor(name = 'Generic Scene') {
    this.name = name;
    this.world = null;
    this.customData = {};
  }

  /**
   * Called when the scene is mounted to the physics world.
   * Spawn initial particles, constraints, and configure world settings.
   * @param {import('./AntigravityWorld.js').AntigravityWorld} world 
   */
  init(world) {
    this.world = world;
  }

  /**
   * Optional custom update hook called once per physics frame.
   * @param {import('./AntigravityWorld.js').AntigravityWorld} world 
   * @param {number} dt Delta time or sub-step
   */
  update(world, dt) {}

  /**
   * Optional custom render pass drawn above the physics simulation.
   * Draw labels, energy force-fields, or laser boundaries.
   * @param {CanvasRenderingContext2D} ctx 
   * @param {import('./AntigravityWorld.js').AntigravityWorld} world 
   */
  render(ctx, world) {}

  /**
   * Lifecycle cleanup hook called before switching to a new scene.
   * Releases custom listeners, timers, and references to prevent memory leaks.
   * @param {import('./AntigravityWorld.js').AntigravityWorld} world 
   */
  dispose(world) {
    this.world = null;
    this.customData = {};
  }
}
