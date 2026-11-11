import { Scene } from '../../../physics/Scene.js';

/**
 * ArrayPackedMemoryScene
 * Dedicated Antigravity Scene for Module S2-01: Arrays & V8 Elements Kinds (PACKED vs HOLEY)
 */
export default class ArrayPackedMemoryScene extends Scene {
  constructor() {
    super('Array Memory: PACKED vs HOLEY');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // PACKED_SMI Contiguous Memory Train (Top Row)
    const packedLabels = ['[0]: 42', '[1]: 84', '[2]: 126', '[3]: 168'];
    const packedNodes = [];

    packedLabels.forEach((lbl, i) => {
      const p = world.spawnParticle(cx - 150 + i * 80, cy - 70, {
        radius: 20,
        label: lbl,
        color: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.8)',
        antigravityCharge: 0.6,
        isPinned: i === 0
      });
      packedNodes.push(p);

      if (i > 0) {
        world.addConstraint(packedNodes[i - 1], p, {
          length: 80,
          stiffness: 0.9,
          color: 'rgba(16, 185, 129, 0.5)',
          lineWidth: 3
        });
      }
    });

    // HOLEY Memory Row with a Gap (Bottom Row)
    const holey0 = world.spawnParticle(cx - 130, cy + 50, {
      radius: 18,
      label: '[0]: "A"',
      color: '#00f0ff',
      isPinned: true
    });

    // THE HOLE (Sparse Gap)
    const holeNode = world.spawnParticle(cx - 20, cy + 50, {
      radius: 20,
      label: 'HOLE ✕',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    const holey2 = world.spawnParticle(cx + 90, cy + 50, {
      radius: 18,
      label: '[100]: "Z"',
      color: '#00f0ff',
      isPinned: true
    });

    // Loose weak constraints across the hole
    world.addConstraint(holey0, holeNode, {
      length: 110,
      stiffness: 0.05,
      color: 'rgba(239, 68, 68, 0.3)',
      lineWidth: 1
    });

    world.addConstraint(holeNode, holey2, {
      length: 110,
      stiffness: 0.05,
      color: 'rgba(239, 68, 68, 0.3)',
      lineWidth: 1
    });

    // Floating Degradation Tokens
    const tokens = ['PACKED_SMI', 'PACKED_DOUBLE', 'DICTIONARY', 'Array.from()'];
    const colors = ['#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy + 130, {
        radius: 14,
        label: t,
        color: colors[i],
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.6
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('V8 ELEMENTS KINDS: PACKED_SMI (fastest C-array) ➔ HOLEY drops into prototype search mode', 16, world.height - 18);
    ctx.restore();
  }
}
