import { Scene } from '../../../physics/Scene.js';

/**
 * ArrayImmutableScene
 * Dedicated Antigravity Scene for Module S2-03: ES2023 Immutable Methods (toSorted, toReversed, with)
 */
export default class ArrayImmutableScene extends Scene {
  constructor() {
    super('Immutable Array & ES2023 Hologram Copies');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Original Immutable Array (Pinned & Protected Center)
    const originalCore = world.spawnParticle(cx, cy, {
      radius: 28,
      label: 'Original [arr]',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // ES2023 Holographic Clones orbiting
    const clones = [
      { label: 'toSorted()', color: '#10b981' },
      { label: 'toReversed()', color: '#8b5cf6' },
      { label: 'with(i, val)', color: '#f59e0b' },
      { label: 'toSpliced()', color: '#ec4899' }
    ];

    const dist = 110;
    clones.forEach((c, i) => {
      const angle = (i / clones.length) * Math.PI * 2;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      const p = world.spawnParticle(px, py, {
        radius: 20,
        label: c.label,
        color: c.color,
        glowColor: `${c.color}99`,
        antigravityCharge: 0.9,
        vx: -Math.sin(angle) * 2,
        vy: Math.cos(angle) * 2
      });

      // Elastic projection beams
      world.addConstraint(originalCore, p, {
        length: dist,
        stiffness: 0.1,
        color: `${c.color}44`,
        lineWidth: 2
      });
    });

    // Ambient floating tokens
    const tokens = ['Pure Functions', 'Zero Side-Effects', 'Negative Index with(-1)', 'React State Safe'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy + 140, {
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
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('ES2023 IMMUTABILITY: toSorted, toReversed & with() produce fresh copies without mutating source', 16, world.height - 18);
    ctx.restore();
  }
}
