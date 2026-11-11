import { Scene } from '../../../physics/Scene.js';

/**
 * StrictModeScene
 * Dedicated Antigravity Scene for Module S1-23: Strict Mode ("use strict") & Safety Shield
 */
export default class StrictModeScene extends Scene {
  constructor() {
    super('Strict Mode Forcefield Shield');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Strict Mode Central Laser Barrier
    const shieldTop = world.spawnParticle(cx, cy - 120, {
      radius: 18,
      label: '"use strict"',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    const shieldBottom = world.spawnParticle(cx, cy + 120, {
      radius: 18,
      label: 'Security Core',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    world.addConstraint(shieldTop, shieldBottom, {
      length: 240,
      stiffness: 0.9,
      color: 'rgba(0, 240, 255, 0.5)',
      lineWidth: 4
    });

    // Blocked Violations (Left Side - Bouncing)
    const badVars = ['leakedGlobal = 1', 'with(obj)', 'delete Object', 'fn(a, a)'];
    const badColors = ['#ef4444', '#f43f5e', '#ec4899', '#f59e0b'];

    badVars.forEach((v, i) => {
      world.spawnParticle(cx - 100, cy - 60 + i * 45, {
        radius: 16,
        label: v,
        color: badColors[i],
        glowColor: `${badColors[i]}99`,
        antigravityCharge: 0.5,
        vx: 1.5,
        vy: (Math.random() - 0.5) * 1.5
      });
    });

    // Allowed Secure Constructs (Right Side - Protected)
    const goodConstructs = ['this === undefined', 'const / let', 'ES Modules', 'Secure Memory'];
    goodConstructs.forEach((g, i) => {
      world.spawnParticle(cx + 100, cy - 60 + i * 45, {
        radius: 16,
        label: g,
        color: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.8)',
        antigravityCharge: 0.7,
        vx: -0.5,
        vy: (Math.random() - 0.5) * 1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('STRICT MODE SHIELD: Blocks accidental globals | this === undefined | Silent errors throw TypeError', 16, world.height - 18);
    ctx.restore();
  }
}
