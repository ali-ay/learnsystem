import { Scene } from '../../../physics/Scene.js';

/**
 * AsyncAwaitBookmarkScene
 * Dedicated Antigravity Scene for Module S4-09: async/await & Bookmark Suspension
 */
export default class AsyncAwaitBookmarkScene extends Scene {
  constructor() {
    super('async/await Bookmark: Non-blocking Coroutine Suspension');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Suspended Coroutine Function Chamber
    const asyncChamber = world.spawnParticle(cx - 70, cy - 30, {
      radius: 28,
      label: 'async fn [Paused at await]',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.6
    });

    // Bookmark Clamp Node
    const bookmarkClamp = world.spawnParticle(cx - 70, cy - 110, {
      radius: 18,
      label: 'Bookmark Anchor',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });
    world.addSpring(asyncChamber, bookmarkClamp, { restLength: 70, stiffness: 0.25 });

    // Open Call Stack Highway (Unblocked traffic flowing below)
    const callStackHighway = world.spawnParticle(cx + 80, cy + 50, {
      radius: 24,
      label: 'Main Thread: FREE',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Flowing interaction particle (Rendering / events continue smoothly)
    const uiEventParticle = world.spawnParticle(cx + 80, cy - 40, {
      radius: 14,
      label: 'UI Paint / Clicks',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(uiEventParticle, callStackHighway, { restLength: 80, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('await suspends only the local async coroutine, releasing the Call Stack immediately', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Main thread continues rendering frames and handling user interactions', cx, 40);

    ctx.restore();
  }
}
