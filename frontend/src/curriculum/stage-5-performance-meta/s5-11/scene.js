import { Scene } from '../../../physics/Scene.js';

/**
 * IteratorProtocolScene
 * Dedicated Antigravity Scene for Module S5-11: [Symbol.iterator] & next() Protocol
 */
export default class IteratorProtocolScene extends Scene {
  constructor() {
    super('Iterator Protocol: [Symbol.iterator] ➔ next() Step Sequence');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Iterable Hub ([Symbol.iterator])
    const iterableHub = world.spawnParticle(cx - 100, cy, {
      radius: 30,
      label: '[Symbol.iterator]',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Step 1 Value Bead ({ value: 10, done: false })
    const bead1 = world.spawnParticle(cx - 20, cy - 40, {
      radius: 16,
      label: '{ val: 10 }',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(iterableHub, bead1, { restLength: 80, stiffness: 0.2 });

    // Step 2 Value Bead ({ value: 20, done: false })
    const bead2 = world.spawnParticle(cx + 40, cy - 40, {
      radius: 16,
      label: '{ val: 20 }',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(bead1, bead2, { restLength: 60, stiffness: 0.25 });

    // Terminal Done Bead ({ done: true })
    const doneNode = world.spawnParticle(cx + 110, cy + 30, {
      radius: 20,
      label: '{ done: true }',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });
    world.addSpring(bead2, doneNode, { restLength: 80, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('next() contract returns { value, done } objects sequentially', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Enables for...of, spread operator, and destructuring on custom data structures', cx, 40);

    ctx.restore();
  }
}
