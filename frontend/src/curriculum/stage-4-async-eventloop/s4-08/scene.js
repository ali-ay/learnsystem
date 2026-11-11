import { Scene } from '../../../physics/Scene.js';

/**
 * PromiseCombinatorsScene
 * Dedicated Antigravity Scene for Module S4-08: Promise Combinators (all, allSettled, race, any)
 */
export default class PromiseCombinatorsScene extends Scene {
  constructor() {
    super('Promise Combinators: all, allSettled, race & any');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Hub 1: Promise.all (Fail-Fast Link)
    const hubAll = world.spawnParticle(cx - 110, cy - 60, {
      radius: 26,
      label: 'Promise.all',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Hub 2: Promise.allSettled (Resilient Harvester)
    const hubSettled = world.spawnParticle(cx + 110, cy - 60, {
      radius: 26,
      label: 'allSettled',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Hub 3: Promise.race (Speed Trap)
    const hubRace = world.spawnParticle(cx - 110, cy + 70, {
      radius: 26,
      label: 'Promise.race',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Hub 4: Promise.any (First Success)
    const hubAny = world.spawnParticle(cx + 110, cy + 70, {
      radius: 26,
      label: 'Promise.any',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });

    // Orbiting runner pod (The racer)
    const racer = world.spawnParticle(cx, cy, {
      radius: 14,
      label: 'Fastest Result',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8
    });

    world.addSpring(racer, hubRace, { restLength: 80, stiffness: 0.15 });
    world.addSpring(racer, hubAny, { restLength: 80, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('all (fail-fast), allSettled (never rejects), race (first settled), any (first fulfilled)', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Manage concurrent asynchronous operations with targeted fault tolerance', cx, 40);

    ctx.restore();
  }
}
