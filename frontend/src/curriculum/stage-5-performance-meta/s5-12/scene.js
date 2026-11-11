import { Scene } from '../../../physics/Scene.js';

/**
 * GeneratorYieldScene
 * Dedicated Antigravity Scene for Module S5-12: Generator Functions (function* & yield)
 */
export default class GeneratorYieldScene extends Scene {
  constructor() {
    super('Generator Coroutine: Pause (yield) & Resume (.next)');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Generator Coroutine Capsule (Center)
    const genCapsule = world.spawnParticle(cx, cy, {
      radius: 30,
      label: 'function* State',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Pause Anchor: yield Gate (Top)
    const yieldGate = world.spawnParticle(cx, cy - 80, {
      radius: 20,
      label: 'yield (Pause)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });
    world.addSpring(genCapsule, yieldGate, { restLength: 80, stiffness: 0.25 });

    // Outbound Value Emission (Ejected to caller)
    const outValue = world.spawnParticle(cx + 80, cy - 30, {
      radius: 14,
      label: 'yield val ➔',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(genCapsule, outValue, { restLength: 75, stiffness: 0.15 });

    // Inbound Injected Value (Passed via .next(val))
    const inValue = world.spawnParticle(cx - 80, cy + 40, {
      radius: 14,
      label: '➔ .next(in)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(genCapsule, inValue, { restLength: 75, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Generators freeze local state upon encountering "yield" and release the stack', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('.next(value) resumes execution and injects arguments bidirectionally', cx, 40);

    ctx.restore();
  }
}
