import { Scene } from '../../../physics/Scene.js';

/**
 * WeakMapGCScene
 * Dedicated Antigravity Scene for Module S2-10: WeakMap & Garbage Collection Sweeper
 */
export default class WeakMapGCScene extends Scene {
  constructor() {
    super('WeakMap & Garbage Collector Sweeper');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Garbage Collector Central Vortex
    const gcVortex = world.spawnParticle(cx, cy - 30, {
      radius: 26,
      label: 'GC Sweeper',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Left Side: Strong Map Reference (Heavy unbreakable chain)
    const strongMap = world.spawnParticle(cx - 120, cy - 80, {
      radius: 20,
      label: 'Map (Strong)',
      color: '#f59e0b',
      isPinned: true
    });

    const leakObj = world.spawnParticle(cx - 120, cy + 40, {
      radius: 18,
      label: 'Memory Leak!',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      antigravityCharge: 0.5,
      vx: 1
    });

    world.addConstraint(strongMap, leakObj, {
      length: 120,
      stiffness: 0.9,
      color: 'rgba(245, 158, 11, 0.7)',
      lineWidth: 3
    });

    // Right Side: WeakMap Reference (Faint delicate elastic thread)
    const weakMapNode = world.spawnParticle(cx + 120, cy - 80, {
      radius: 20,
      label: 'WeakMap (Weak)',
      color: '#10b981',
      isPinned: true
    });

    const ephemeralObj = world.spawnParticle(cx + 120, cy + 40, {
      radius: 18,
      label: 'Cleaned by GC',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 1.1,
      vx: -1
    });

    world.addConstraint(weakMapNode, ephemeralObj, {
      length: 120,
      stiffness: 0.05,
      color: 'rgba(16, 185, 129, 0.25)',
      lineWidth: 1
    });

    // Floating tokens
    const tokens = ['No .size', 'Non-iterable', 'Object-only keys', 'Zero Memory Leak'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 140, {
        radius: 12,
        label: t,
        color: '#64748b',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('WEAK REFERENCES: Keys must be objects | When unreferenced, GC reclaims memory automatically', 16, world.height - 18);
    ctx.restore();
  }
}
