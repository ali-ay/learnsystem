import { Scene } from '../../../physics/Scene.js';

export default class BranchScene extends Scene {
  constructor() {
    super('Branch Prediction & Routing');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Prism / Router Node
    const router = world.spawnParticle(cx, cy - 20, {
      radius: 24,
      label: 'switch',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Branch 1: Antigravity Thrust Path (Upper Orbit)
    const branchUp = world.spawnParticle(cx + 120, cy - 120, {
      radius: 20,
      label: 'True 🚀',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.6)',
      antigravityCharge: 1.6,
      vy: -2
    });

    // Branch 2: Gravity Drop Path (Lower Surface)
    const branchDown = world.spawnParticle(cx - 120, cy + 100, {
      radius: 20,
      label: 'False ⚓',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      antigravityCharge: -0.2,
      vy: 2
    });

    world.addConstraint(router, branchUp, { length: 140, stiffness: 0.4, color: 'rgba(0, 240, 255, 0.4)' });
    world.addConstraint(router, branchDown, { length: 140, stiffness: 0.4, color: 'rgba(245, 158, 11, 0.4)' });

    // Incoming conditional particles stream
    for (let i = 0; i < 6; i++) {
      const isTrue = i % 2 === 0;
      world.spawnParticle(cx + (Math.random() - 0.5) * 40, cy - 150 - i * 30, {
        radius: 11,
        label: isTrue ? 'T' : 'F',
        color: isTrue ? '#10b981' : '#f43f5e',
        antigravityCharge: isTrue ? 0.8 : -0.1,
        vy: 1
      });
    }
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    ctx.fillText('BRANCH PREDICTION: True ➔ Orbit Thrust  |  False ➔ Gravity Drop', 16, world.height - 18);
    ctx.restore();
  }
}
