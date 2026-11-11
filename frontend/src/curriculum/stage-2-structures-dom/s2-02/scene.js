import { Scene } from '../../../physics/Scene.js';

/**
 * ArrayMutatingScene
 * Dedicated Antigravity Scene for Module S2-02: Mutating Array Methods (push, pop, shift, splice, sort)
 */
export default class ArrayMutatingScene extends Scene {
  constructor() {
    super('Array Mutation: O(1) Push vs O(N) Shift');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Array Track Nodes
    const trackLabels = ['[0]', '[1]', '[2]', '[3]'];
    const trackColors = ['#00f0ff', '#3b82f6', '#8b5cf6', '#ec4899'];
    const trackNodes = [];

    trackLabels.forEach((lbl, i) => {
      const p = world.spawnParticle(cx - 120 + i * 80, cy - 30, {
        radius: 18,
        label: lbl,
        color: trackColors[i],
        glowColor: `${trackColors[i]}88`,
        antigravityCharge: 0.6,
        isPinned: i === 0
      });
      trackNodes.push(p);

      if (i > 0) {
        world.addConstraint(trackNodes[i - 1], p, {
          length: 80,
          stiffness: 0.4,
          color: 'rgba(255, 255, 255, 0.2)',
          lineWidth: 2
        });
      }
    });

    // O(1) Push Impactor at Tail (Right side)
    const pushNode = world.spawnParticle(cx + 170, cy - 30, {
      radius: 20,
      label: 'push() O(1)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 1.0,
      vx: -1.5
    });

    // O(N) Unshift Piston at Head (Left side)
    const unshiftNode = world.spawnParticle(cx - 170, cy - 30, {
      radius: 20,
      label: 'unshift() O(N)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.5,
      vx: 1.5
    });

    // Splice Laser Cutter in the middle
    const spliceLaser = world.spawnParticle(cx - 40, cy + 60, {
      radius: 17,
      label: '✂ splice()',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.8,
      vy: -1
    });

    // Timsort balance scale
    const timsortNode = world.spawnParticle(cx + 60, cy + 90, {
      radius: 22,
      label: 'sort(Timsort)',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.8)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['In-Place Mutation', 'O(1) tail', 'O(N) head shift', 'Comparator (a-b)', 'pop()'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 65, cy + 145, {
        radius: 12,
        label: t,
        color: '#94a3b8',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('MUTATION: push/pop is O(1) at tail | unshift/shift is O(N) index shift | sort() uses Timsort', 16, world.height - 18);
    ctx.restore();
  }
}
