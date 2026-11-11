import { Scene } from '../../../physics/Scene.js';

/**
 * LoopCentrifugeScene
 * Dedicated Antigravity Scene for Module S1-14: Loops & On-Stack Replacement (OSR)
 */
export default class LoopCentrifugeScene extends Scene {
  constructor() {
    super('Loop Centrifuge & OSR Vortex');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Centrifuge Core (OSR JIT Engine)
    const core = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'OSR Core',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Condition Check Gate at Top
    const gate = world.spawnParticle(cx, cy - 110, {
      radius: 18,
      label: 'i < N ?',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)',
      isPinned: true
    });

    // Orbiting Iteration Particles (i=0, i=1, i=2, i=3)
    const count = 5;
    const radius = 100;
    const loopColors = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];

    for (let k = 0; k < count; k++) {
      const angle = (k / count) * Math.PI * 2;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;

      const p = world.spawnParticle(px, py, {
        radius: 16,
        label: `i=${k}`,
        color: loopColors[k],
        glowColor: `${loopColors[k]}99`,
        antigravityCharge: 0.6,
        // Initial tangential velocity for circular spin
        vx: -Math.sin(angle) * 2.5,
        vy: Math.cos(angle) * 2.5
      });

      // Spring tether to center core
      world.addConstraint(core, p, {
        length: radius,
        stiffness: 0.06,
        color: 'rgba(255, 255, 255, 0.15)',
        lineWidth: 1.5
      });
    }

    // Outer free tokens: while, do-while, let scope, OSR
    const tokens = ['while', 'do...while', 'for(;;)', 'TurboFan OSR', 'let i scope'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 65, cy + 140, {
        radius: 13,
        label: t,
        color: '#64748b',
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
    ctx.fillText('HOT LOOP OPTIMIZATION: Hot iterations trigger On-Stack Replacement (OSR) to machine code', 16, world.height - 18);
    ctx.restore();
  }
}
