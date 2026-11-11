import { Scene } from '../../../physics/Scene.js';

/**
 * TernaryBranchScene
 * Dedicated Antigravity Scene for Module S1-13: Ternary Operator (condition ? true : false)
 */
export default class TernaryBranchScene extends Scene {
  constructor() {
    super('Ternary Switch & Expression Rail');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Center Condition Splitter (?)
    const splitter = world.spawnParticle(cx, cy - 60, {
      radius: 26,
      label: 'condition ?',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Left Target: exprTrue
    const trueNode = world.spawnParticle(cx - 120, cy + 60, {
      radius: 22,
      label: 'exprTrue',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Right Target: exprFalse
    const falseNode = world.spawnParticle(cx + 120, cy + 60, {
      radius: 22,
      label: 'exprFalse',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Connect with branch guide lines
    world.addConstraint(splitter, trueNode, {
      length: 160,
      stiffness: 0.3,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 3
    });

    world.addConstraint(splitter, falseNode, {
      length: 160,
      stiffness: 0.3,
      color: 'rgba(236, 72, 153, 0.4)',
      lineWidth: 3
    });

    // Incoming expression tokens
    const tokens = ['const x =', 'true', 'false', 'return', '`badge-${?}`'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 55, cy - 130, {
        radius: 14,
        label: t,
        color: '#00f0ff',
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillText('EXPRESSION POWER: Produces a direct value | Only the winning branch is evaluated', 16, world.height - 18);
    ctx.restore();
  }
}
