import { Scene } from '../../../physics/Scene.js';

/**
 * PromiseLifecycleScene
 * Dedicated Antigravity Scene for Module S4-06: Promise States & Immutability
 */
export default class PromiseLifecycleScene extends Scene {
  constructor() {
    super('Promise Tri-State: Pending ➔ Fulfilled or Rejected (Immutable)');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Center: Pending Core
    const pendingCore = world.spawnParticle(cx - 50, cy, {
      radius: 26,
      label: 'Promise [Pending]',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6
    });

    // Fulfilled Destination (Top Right - Green)
    const fulfilledNode = world.spawnParticle(cx + 100, cy - 60, {
      radius: 24,
      label: 'resolve() ➔ Fulfilled',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Rejected Destination (Bottom Right - Red)
    const rejectedNode = world.spawnParticle(cx + 100, cy + 60, {
      radius: 24,
      label: 'reject() ➔ Rejected',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // Spring tension towards resolution
    world.addSpring(pendingCore, fulfilledNode, {
      restLength: 90,
      stiffness: 0.18,
      damping: 0.05,
      color: 'rgba(16, 185, 129, 0.6)'
    });

    world.addSpring(pendingCore, rejectedNode, {
      restLength: 120,
      stiffness: 0.08,
      color: 'rgba(239, 68, 68, 0.4)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('A Promise transitions from Pending to either Fulfilled or Rejected', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Once settled, the internal state and value are permanently immutable', cx, 40);

    ctx.restore();
  }
}
