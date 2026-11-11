import { Scene } from '../../../physics/Scene.js';

/**
 * StringRopeScene
 * Dedicated Antigravity Scene for Module S1-19: Strings, ConsString (Rope) & UTF-16 Surrogate Pairs
 */
export default class StringRopeScene extends Scene {
  constructor() {
    super('String Rope & UTF-16 Twins');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // ConsString / Rope Chain: "Hello" + " " + "World"
    const segments = ['"Hello"', '" "', '"Galactic"', '"World"'];
    const colors = ['#00f0ff', '#64748b', '#8b5cf6', '#10b981'];
    let prev = null;

    segments.forEach((seg, i) => {
      const p = world.spawnParticle(cx - 150 + i * 80, cy - 70, {
        radius: 18,
        label: seg,
        color: colors[i],
        glowColor: `${colors[i]}99`,
        antigravityCharge: 0.6,
        isPinned: i === 0
      });

      if (prev) {
        world.addConstraint(prev, p, {
          length: 70,
          stiffness: 0.2,
          color: 'rgba(0, 240, 255, 0.4)',
          lineWidth: 2
        });
      }
      prev = p;
    });

    // UTF-16 Surrogate Pair Twins (representing 1 emoji like 🚀 taking 2 code units)
    const twin1 = world.spawnParticle(cx - 50, cy + 50, {
      radius: 16,
      label: 'UTF-16 #1',
      color: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.8)',
      antigravityCharge: 0.9,
      vx: 1
    });

    const twin2 = world.spawnParticle(cx + 10, cy + 50, {
      radius: 16,
      label: 'UTF-16 #2',
      color: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.8)',
      antigravityCharge: 0.9,
      vx: -1
    });

    // Rigid lock between surrogate pair
    world.addConstraint(twin1, twin2, {
      length: 45,
      stiffness: 0.9,
      color: 'rgba(244, 63, 94, 0.7)',
      lineWidth: 3
    });

    // Tagged Template Filter Gate
    const tagGate = world.spawnParticle(cx + 120, cy + 40, {
      radius: 24,
      label: 'tag`...` Gate',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.7,
      isPinned: true
    });

    // Floating tokens
    const tokens = ['immutability', 'surrogate pair', 'ConsString', 'sanitize', 'XSS Shield'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 60, cy + 130, {
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
    ctx.fillText('IMMUTABLE STRINGS: Memory stored as Rope tree | Emojis take 2 UTF-16 units | Tagged templates sanitize', 16, world.height - 18);
    ctx.restore();
  }
}
