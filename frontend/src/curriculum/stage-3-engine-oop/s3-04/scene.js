import { Scene } from '../../../physics/Scene.js';

/**
 * ScopeChainScene
 * Dedicated Antigravity Scene for Module S3-04: Scope Chain & Lexical Environment
 */
export default class ScopeChainScene extends Scene {
  constructor() {
    super('Scope Chain: [[OuterEnv]] Ladder');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top: Global Environment (Apex)
    const globalEnv = world.spawnParticle(cx, cy - 110, {
      radius: 28,
      label: 'Global Env Record',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Middle: Outer Function Scope
    const outerEnv = world.spawnParticle(cx, cy, {
      radius: 24,
      label: 'Outer [[OuterEnv]]',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.7,
      isPinned: true
    });

    world.addConstraint(globalEnv, outerEnv, {
      length: 110,
      stiffness: 0.4,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 3
    });

    // Bottom: Inner Local Scope (Origin of variable lookup)
    const innerEnv = world.spawnParticle(cx, cy + 100, {
      radius: 22,
      label: 'Inner Local Record',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    world.addConstraint(outerEnv, innerEnv, {
      length: 100,
      stiffness: 0.4,
      color: 'rgba(139, 92, 246, 0.4)',
      lineWidth: 3
    });

    // Upward climbing variable query probe particle
    const queryProbe = world.spawnParticle(cx - 50, cy + 80, {
      radius: 16,
      label: 'Find x ↑',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 1.4,
      vy: -2
    });

    // ReferenceError trap if climbed past Global
    world.spawnParticle(cx + 120, cy - 110, {
      radius: 18,
      label: 'ReferenceError ✕',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['Lexical Scoping', '[[OuterEnv]]', 'Identifier Resolution', 'One-way climb'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 145, {
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
    ctx.fillText('SCOPE CHAIN: Lookups climb [[OuterEnv]] from Inner ➔ Outer ➔ Global (never downwards)', 16, world.height - 18);
    ctx.restore();
  }
}
