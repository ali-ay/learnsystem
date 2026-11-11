import { Scene } from '../../../physics/Scene.js';

/**
 * SpreadCloneScene
 * Dedicated Antigravity Scene for Module S2-08: Spread (...), Rest and structuredClone()
 */
export default class SpreadCloneScene extends Scene {
  constructor() {
    super('Spread Burst & structuredClone Twin');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Chamber: Spread Expander Burst (...)
    const spreadCore = world.spawnParticle(cx - 110, cy - 40, {
      radius: 26,
      label: '...spread (Burst)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 1.2,
      isPinned: true
    });

    // Particles bursting outward from spread
    const spreadLabels = ['item_1', 'item_2', 'item_3'];
    spreadLabels.forEach((lbl, i) => {
      const angle = -Math.PI / 4 + (i * Math.PI) / 4;
      world.spawnParticle(cx - 110 + Math.cos(angle) * 70, cy - 40 + Math.sin(angle) * 70, {
        radius: 15,
        label: lbl,
        color: '#f59e0b',
        antigravityCharge: 0.6,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2
      });
    });

    // Right Chamber: structuredClone Quantum Twin Machine
    const cloneChamber = world.spawnParticle(cx + 100, cy - 40, {
      radius: 28,
      label: 'structuredClone()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    const twinA = world.spawnParticle(cx + 60, cy + 50, {
      radius: 18,
      label: 'Original',
      color: '#00f0ff',
      isPinned: true
    });

    const twinB = world.spawnParticle(cx + 140, cy + 50, {
      radius: 18,
      label: 'Deep Twin',
      color: '#10b981',
      antigravityCharge: 0.7,
      vx: 1
    });

    world.addConstraint(twinA, twinB, {
      length: 80,
      stiffness: 0.05,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 2
    });

    // Bottom Rest Funnel
    world.spawnParticle(cx, cy + 120, {
      radius: 22,
      label: '...rest (Gather)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['Shallow Copy Trap', 'Deep Clone', 'Set / Map Safe', 'Circular Ref Safe'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy - 110, {
        radius: 12,
        label: t,
        color: '#64748b',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('SPREAD expands elements | REST gathers elements | structuredClone() performs true deep copies', 16, world.height - 18);
    ctx.restore();
  }
}
