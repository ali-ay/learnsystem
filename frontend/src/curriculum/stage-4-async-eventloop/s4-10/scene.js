import { Scene } from '../../../physics/Scene.js';

/**
 * AsyncErrorHandlingScene
 * Dedicated Antigravity Scene for Module S4-10: Async Error Handling & try/catch
 */
export default class AsyncErrorHandlingScene extends Scene {
  constructor() {
    super('Async try/catch Blast Shield & Fuse Relay');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Outer Containment Shield (try block)
    const tryShield = world.spawnParticle(cx - 50, cy, {
      radius: 32,
      label: 'try { await op() }',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // High Voltage Error Spark (Exception)
    const errorSpark = world.spawnParticle(cx + 40, cy - 40, {
      radius: 16,
      label: 'throw Error()',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.9
    });

    // Catch Absorber Station (The Grounding Fuse)
    const catchAbsorber = world.spawnParticle(cx + 110, cy + 50, {
      radius: 24,
      label: 'catch(err) Relay',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Spring clamp absorbing the shockwave
    world.addSpring(errorSpark, catchAbsorber, {
      restLength: 80,
      stiffness: 0.25,
      damping: 0.08,
      color: 'rgba(239, 68, 68, 0.8)'
    });

    world.addSpring(tryShield, errorSpark, {
      restLength: 90,
      stiffness: 0.1,
      color: 'rgba(0, 240, 255, 0.5)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('await unrolls rejected promises into standard JavaScript exceptions', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('try/catch absorbs asynchronous failures before they trigger unhandled rejection', cx, 40);

    ctx.restore();
  }
}
