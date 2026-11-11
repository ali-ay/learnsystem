import { Scene } from '../../../physics/Scene.js';

/**
 * PromiseChainingScene
 * Dedicated Antigravity Scene for Module S4-07: Promise Chaining & Error Bubbling
 */
export default class PromiseChainingScene extends Scene {
  constructor() {
    super('Promise Chain Pipeline: then ➔ catch ➔ finally');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Node 1: then 1 (Top)
    const step1 = world.spawnParticle(cx - 60, cy - 110, {
      radius: 22,
      label: 'then(Auth)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Node 2: then 2 (Middle Left - Throws error)
    const step2 = world.spawnParticle(cx - 60, cy - 30, {
      radius: 22,
      label: 'then(Verify)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });
    world.addSpring(step1, step2, { restLength: 80, stiffness: 0.2 });

    // Node 3: then 3 (Bypassed due to error)
    const step3 = world.spawnParticle(cx - 60, cy + 50, {
      radius: 18,
      label: 'then(Save) [Bypassed]',
      color: '#475569',
      glowColor: 'rgba(71, 85, 105, 0.5)',
      isPinned: true
    });
    world.addSpring(step2, step3, { restLength: 80, stiffness: 0.1 });

    // Catch Basin (Right side emergency redirect)
    const catchNode = world.spawnParticle(cx + 80, cy + 10, {
      radius: 24,
      label: 'catch(Emergency)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.7
    });
    world.addSpring(step2, catchNode, {
      restLength: 100,
      stiffness: 0.22,
      damping: 0.05,
      color: 'rgba(239, 68, 68, 0.8)'
    });

    // Finally Base (Bottom Center)
    const finallyNode = world.spawnParticle(cx, cy + 120, {
      radius: 20,
      label: 'finally(Cleanup)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(catchNode, finallyNode, { restLength: 90, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Thrown errors in then() immediately bubble past intermediate steps to catch()', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('finally() always executes regardless of fulfillment or rejection', cx, 40);

    ctx.restore();
  }
}
