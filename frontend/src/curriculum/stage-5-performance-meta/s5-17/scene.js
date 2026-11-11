import { Scene } from '../../../physics/Scene.js';

/**
 * ModernModulesScene
 * Dedicated Antigravity Scene for Module S5-17: ESM, Dynamic import() & Live Bindings
 */
export default class ModernModulesScene extends Scene {
  constructor() {
    super('Module Graph: Dynamic import() & Live Binding Laser');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Main App Module Hub
    const appHub = world.spawnParticle(cx - 90, cy, {
      radius: 32,
      label: 'Main Module (ESM)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Dynamic Chunk (Lazy Loaded on demand)
    const lazyChunk = world.spawnParticle(cx + 90, cy, {
      radius: 26,
      label: 'import("./chunk")',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8
    });

    // Tree-Shaking Sifter (Top)
    const sifter = world.spawnParticle(cx, cy - 80, {
      radius: 18,
      label: 'Tree-Shaking Sifter',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });
    world.addSpring(appHub, sifter, { restLength: 90, stiffness: 0.2 });

    // Live Binding Laser Link between Main and Lazy chunk
    world.addSpring(appHub, lazyChunk, {
      restLength: 160,
      stiffness: 0.15,
      damping: 0.05,
      color: 'rgba(0, 240, 255, 0.8)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Dynamic import() enables on-demand code-splitting and lazy-loading chunks', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('ESM live bindings propagate variable mutations across module boundaries instantaneously', cx, 40);

    ctx.restore();
  }
}
