import { Scene } from '../../../physics/Scene.js';

/**
 * RAFIdleCallbackScene
 * Dedicated Antigravity Scene for Module S5-04: rAF & requestIdleCallback
 */
export default class RAFIdleCallbackScene extends Scene {
  constructor() {
    super('rAF Metronome: 60/120Hz V-Sync & Idle Pockets');
    this.phase = 0;
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // V-Sync Metronome Pivot (Top)
    const pivot = world.spawnParticle(cx, cy - 110, {
      radius: 20,
      label: 'V-Sync Clock',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Harmonic rAF Bob (Swinging smoothly with zero tearing)
    const rafBob = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'rAF Frame Bob',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(pivot, rafBob, { restLength: 110, stiffness: 0.2, damping: 0.02 });

    // Idle Callback Reservoir (Bottom Corner)
    const idleReservoir = world.spawnParticle(cx + 120, cy + 80, {
      radius: 22,
      label: 'Idle Pocket [rIC]',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Low-priority background task resting in the idle pocket
    const lowPriTask = world.spawnParticle(cx + 80, cy + 50, {
      radius: 12,
      label: 'Telemetry',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.7)'
    });
    world.addSpring(lowPriTask, idleReservoir, { restLength: 50, stiffness: 0.2 });
  }

  update(dt, world) {
    super.update(dt, world);
    this.phase += dt * 4;
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('requestAnimationFrame aligns with display refresh rate before every paint', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('requestIdleCallback executes low-priority jobs in surplus frame idle time', cx, 40);

    ctx.restore();
  }
}
