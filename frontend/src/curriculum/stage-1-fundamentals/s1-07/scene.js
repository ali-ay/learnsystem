import { Scene } from '../../../physics/Scene.js';

/**
 * ArithmeticMomentumScene
 * Dedicated Antigravity Scene for Module S1-07: Arithmetic & Increment Operators
 */
export default class ArithmeticMomentumScene extends Scene {
  constructor() {
    super('Arithmetic & Increment Momentum');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Center divider / fulcrum
    const fulcrum = world.spawnParticle(cx, cy, {
      radius: 18,
      label: 'IEEE-754',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    // 0.1 and 0.2 floating particles
    const p01 = world.spawnParticle(cx - 100, cy - 80, {
      radius: 20,
      label: '0.1',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      antigravityCharge: 0.9,
      vx: 1.5,
      vy: -0.5
    });

    const p02 = world.spawnParticle(cx - 40, cy - 80, {
      radius: 22,
      label: '0.2',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      antigravityCharge: 0.8,
      vx: -1.2,
      vy: -0.3
    });

    // Connect them with a soft elastic spring
    world.addConstraint(p01, p02, {
      length: 80,
      stiffness: 0.08,
      color: 'rgba(0, 240, 255, 0.3)',
      lineWidth: 2
    });

    // Sum result particle drifting
    const pSum = world.spawnParticle(cx + 80, cy - 80, {
      radius: 24,
      label: '.3000..04',
      color: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.8)',
      antigravityCharge: 1.2,
      vx: 0.8,
      vy: -1.5
    });

    // Prefix (++x) rocket particle - instant high impulse
    const prefixNode = world.spawnParticle(cx - 120, cy + 80, {
      radius: 22,
      label: '++x (Instant)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 1.5,
      vy: -3
    });

    // Postfix (x++) rocket particle - delayed impulse
    const postfixNode = world.spawnParticle(cx + 120, cy + 80, {
      radius: 22,
      label: 'x++ (Delayed)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 0.5,
      vy: -0.5
    });

    // Floating operator tokens: **, %, +=, Number.EPSILON
    const opTokens = ['**', '%', '+=', '*=', 'EPSILON', 'NaN'];
    opTokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2.5) * 60, cy + 150, {
        radius: 13,
        label: t,
        color: '#94a3b8',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 2,
        vy: -0.8
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.fillText('0.1 + 0.2 === 0.30000000000000004 | ++x evaluates new value, x++ evaluates prior value', 16, world.height - 18);
    ctx.restore();
  }
}
