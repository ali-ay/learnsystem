import { Scene } from '../../../physics/Scene.js';

/**
 * CallbackHellPyramidScene
 * Dedicated Antigravity Scene for Module S4-05: Callback Hell & Inversion of Control
 */
export default class CallbackHellPyramidScene extends Scene {
  constructor() {
    super('Pyramid of Doom: Tangled Inversion of Control');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Level 1: Outer call
    const step1 = world.spawnParticle(cx - 120, cy - 80, {
      radius: 20,
      label: 'getUser(cb1)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Level 2: Nested callback
    const step2 = world.spawnParticle(cx - 60, cy - 30, {
      radius: 18,
      label: 'getOrders(cb2)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.5
    });
    world.addSpring(step1, step2, { restLength: 70, stiffness: 0.2, color: 'rgba(239, 68, 68, 0.7)' });

    // Level 3: Deeper nested
    const step3 = world.spawnParticle(cx, cy + 20, {
      radius: 18,
      label: 'calcTax(cb3)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.5
    });
    world.addSpring(step2, step3, { restLength: 70, stiffness: 0.2, color: 'rgba(239, 68, 68, 0.7)' });

    // Level 4: Deepest (Pyramid of Doom core)
    const step4 = world.spawnParticle(cx + 60, cy + 70, {
      radius: 20,
      label: 'pay(cb4) [IoC]',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(step3, step4, { restLength: 70, stiffness: 0.2, color: 'rgba(239, 68, 68, 0.9)' });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Nested callbacks create fragile rightward drifting pyramids', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Inversion of Control surrenders execution guarantees to external callers', cx, 40);

    ctx.restore();
  }
}
