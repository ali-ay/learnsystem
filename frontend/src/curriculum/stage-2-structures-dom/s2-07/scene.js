import { Scene } from '../../../physics/Scene.js';

/**
 * DestructuringPrismScene
 * Dedicated Antigravity Scene for Module S2-07: Destructuring & Variable Swap
 */
export default class DestructuringPrismScene extends Scene {
  constructor() {
    super('Destructuring Prism & Swap Loop');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Destructuring Prism Core (Center)
    const prismCore = world.spawnParticle(cx, cy - 20, {
      radius: 28,
      label: 'Prism { a, b }',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Separated Target Variable Slots
    const slotA = world.spawnParticle(cx - 110, cy + 80, {
      radius: 20,
      label: 'const { a }',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      isPinned: true
    });

    const slotB = world.spawnParticle(cx + 110, cy + 80, {
      radius: 20,
      label: 'const { b }',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)',
      isPinned: true
    });

    // Beam constraints from prism to variable slots
    world.addConstraint(prismCore, slotA, {
      length: 150,
      stiffness: 0.2,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 2
    });

    world.addConstraint(prismCore, slotB, {
      length: 150,
      stiffness: 0.2,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 2
    });

    // Swap Orbiters: [a, b] = [b, a]
    const swapNode1 = world.spawnParticle(cx - 50, cy - 110, {
      radius: 17,
      label: 'val_A',
      color: '#f59e0b',
      antigravityCharge: 1.0,
      vx: 2,
      vy: 0.5
    });

    const swapNode2 = world.spawnParticle(cx + 50, cy - 110, {
      radius: 17,
      label: 'val_B',
      color: '#ec4899',
      antigravityCharge: 1.0,
      vx: -2,
      vy: -0.5
    });

    world.addConstraint(swapNode1, swapNode2, {
      length: 100,
      stiffness: 0.1,
      color: 'rgba(245, 158, 11, 0.3)',
      lineWidth: 2
    });

    // Floating tokens
    const tokens = ['alias (:name)', 'default (= val)', '[a, b] = [b, a]', 'nested = {}'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 145, {
        radius: 12,
        label: t,
        color: '#94a3b8',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(139, 92, 246, 0.85)';
    ctx.fillText('DESTRUCTURING: Breaks objects into variables | [a, b] = [b, a] swaps values without temp', 16, world.height - 18);
    ctx.restore();
  }
}
