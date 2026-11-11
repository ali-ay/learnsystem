import { Scene } from '../../../physics/Scene.js';

/**
 * MathNumberScene
 * Dedicated Antigravity Scene for Module S1-20: Numbers, MAX_SAFE_INTEGER & Math Precision
 */
export default class MathNumberScene extends Scene {
  constructor() {
    super('Safe Integers & Math Precision');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // MAX_SAFE_INTEGER Horizontal Laser Barrier
    const barLeft = world.spawnParticle(cx - 140, cy - 80, {
      radius: 16,
      label: '2^53 - 1',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    const barRight = world.spawnParticle(cx + 140, cy - 80, {
      radius: 16,
      label: 'MAX_SAFE_INT',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    world.addConstraint(barLeft, barRight, {
      length: 280,
      stiffness: 0.8,
      color: 'rgba(239, 68, 68, 0.5)',
      lineWidth: 3
    });

    // Overflowing Double Precision float (colliding above)
    const floatOverflow = world.spawnParticle(cx, cy - 130, {
      radius: 20,
      label: '9007199254740992',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      antigravityCharge: 1.2,
      vy: 1
    });

    // Unbounded BigInt Anchor at Center
    const bigIntAnchor = world.spawnParticle(cx - 80, cy + 40, {
      radius: 26,
      label: '9007199254740993n (BigInt)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    // Math Functions orbiting
    const mathOps = ['Math.trunc', 'Math.floor', 'Math.hypot', 'crypto.random'];
    const colors = ['#00f0ff', '#8b5cf6', '#ec4899', '#3b82f6'];

    mathOps.forEach((op, i) => {
      world.spawnParticle(cx + (i - 1) * 75, cy + 120, {
        radius: 14,
        label: op,
        color: colors[i],
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fillText('53-BIT LIMIT: Numbers beyond 9,007,199,254,740,991 lose precision | Use BigInt (n) for large IDs', 16, world.height - 18);
    ctx.restore();
  }
}
