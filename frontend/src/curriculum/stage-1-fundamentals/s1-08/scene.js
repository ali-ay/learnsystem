import { Scene } from '../../../physics/Scene.js';

/**
 * EqualityComparisonScene
 * Dedicated Antigravity Scene for Module S1-08: Loose (==) vs Strict (===) Equality & Object.is()
 */
export default class EqualityComparisonScene extends Scene {
  constructor() {
    super('Equality Gates: == vs ===');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Strict Barrier (===) - Solid pinned laser wall
    const strictTop = world.spawnParticle(cx - 70, cy - 110, {
      radius: 16,
      label: '=== TOP',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    const strictBottom = world.spawnParticle(cx - 70, cy + 110, {
      radius: 16,
      label: '=== BOT',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    world.addConstraint(strictTop, strictBottom, {
      length: 220,
      stiffness: 0.9,
      color: 'rgba(239, 68, 68, 0.5)',
      lineWidth: 4
    });

    // Loose Bridge (==) - Flexible elastic mesh
    const looseNodeA = world.spawnParticle(cx + 80, cy - 70, {
      radius: 18,
      label: '== (Coerce)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.7)',
      antigravityCharge: 0.5,
      isPinned: true
    });

    const looseNodeB = world.spawnParticle(cx + 80, cy + 70, {
      radius: 18,
      label: 'ToPrimitive',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.7)',
      antigravityCharge: 0.5,
      isPinned: true
    });

    world.addConstraint(looseNodeA, looseNodeB, {
      length: 140,
      stiffness: 0.05,
      color: 'rgba(245, 158, 11, 0.3)',
      lineWidth: 2
    });

    // Object.is Chamber at center
    const objectIsNode = world.spawnParticle(cx + 5, cy, {
      radius: 24,
      label: 'Object.is()',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Tricky pairs floating around
    // 1. [0] and 0
    const arr0 = world.spawnParticle(cx + 120, cy - 40, {
      radius: 18,
      label: '[0]',
      color: '#8b5cf6',
      antigravityCharge: 0.7,
      vx: -1,
      vy: 0.5
    });

    const num0 = world.spawnParticle(cx + 140, cy + 40, {
      radius: 18,
      label: '0',
      color: '#8b5cf6',
      antigravityCharge: 0.7,
      vx: -1,
      vy: -0.5
    });

    // 2. NaN pair (they repel each other!)
    const nan1 = world.spawnParticle(cx - 130, cy - 50, {
      radius: 20,
      label: 'NaN',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 1.2,
      vx: -0.8,
      vy: -0.8
    });

    const nan2 = world.spawnParticle(cx - 150, cy + 50, {
      radius: 20,
      label: 'NaN',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 1.2,
      vx: -0.5,
      vy: 0.8
    });

    // 3. +0 and -0
    world.spawnParticle(cx - 110, cy, {
      radius: 14,
      label: '+0',
      color: '#10b981',
      antigravityCharge: 0.6,
      vx: 1.2
    });

    world.spawnParticle(cx - 90, cy + 30, {
      radius: 14,
      label: '-0',
      color: '#06b6d4',
      antigravityCharge: 0.6,
      vx: -1.2
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fillText('=== BLOCKS TYPE MISMATCH | == COERCES VIA TOPRIMITIVE | NaN !== NaN', 16, world.height - 18);
    ctx.restore();
  }
}
