import { Scene } from '../../../physics/Scene.js';

/**
 * GarbageCollectorScene
 * Dedicated Antigravity Scene for Module S5-01: Mark-and-Sweep Garbage Collection
 */
export default class GarbageCollectorScene extends Scene {
  constructor() {
    super('Garbage Collector: Reachability Graph & Mark-and-Sweep');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Root Node (Global Scope / Stack Frame)
    const rootNode = world.spawnParticle(cx - 100, cy - 80, {
      radius: 28,
      label: 'Root (Global)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Reachable Live Object (Marked)
    const liveObj = world.spawnParticle(cx - 100, cy + 40, {
      radius: 22,
      label: 'Reachable [Marked]',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(rootNode, liveObj, { restLength: 110, stiffness: 0.2, color: 'rgba(16, 185, 129, 0.8)' });

    // Isolated Circular Reference Pair (Unreachable from Root)
    const circularA = world.spawnParticle(cx + 80, cy - 40, {
      radius: 18,
      label: 'Node A [Unmarked]',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.7)',
      antigravityCharge: 0.4
    });

    const circularB = world.spawnParticle(cx + 80, cy + 50, {
      radius: 18,
      label: 'Node B [Unmarked]',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.7)',
      antigravityCharge: 0.4
    });

    // Circular tether between A and B
    world.addSpring(circularA, circularB, {
      restLength: 80,
      stiffness: 0.25,
      color: 'rgba(239, 68, 68, 0.8)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('GC starts at Roots and marks all reachable nodes across the graph', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Isolated nodes with internal circular references are swept away cleanly', cx, 40);

    ctx.restore();
  }
}
