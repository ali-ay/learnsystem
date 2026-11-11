import { Scene } from '../../../physics/Scene.js';

/**
 * ThisCallSiteScene
 * Dedicated Antigravity Scene for Module S3-09: this Keyword & 4 Call-Site Rules
 */
export default class ThisCallSiteScene extends Scene {
  constructor() {
    super('this Binding Compass: 4 Call-Site Rules');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Center: Swiveling 'this' Chameleon Compass Core
    const thisCore = world.spawnParticle(cx, cy, {
      radius: 28,
      label: 'this Compass',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Pylon 1: new Binding (Highest Priority - Top)
    const pylonNew = world.spawnParticle(cx, cy - 110, {
      radius: 20,
      label: '1. new Fn()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Pylon 2: Explicit Binding (Right)
    const pylonExplicit = world.spawnParticle(cx + 120, cy, {
      radius: 20,
      label: '2. call / bind',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });

    // Pylon 3: Implicit Binding (Left)
    const pylonImplicit = world.spawnParticle(cx - 120, cy, {
      radius: 20,
      label: '3. obj.method()',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Pylon 4: Default Binding (Bottom - Lowest)
    const pylonDefault = world.spawnParticle(cx, cy + 100, {
      radius: 20,
      label: '4. fn() [undefined]',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // Magnetic Springs connecting compass to all 4 binding pylons
    world.addConstraint(thisCore, pylonNew, { length: 110, stiffness: 0.5, color: 'rgba(16, 185, 129, 0.4)', lineWidth: 2 });
    world.addConstraint(thisCore, pylonExplicit, { length: 120, stiffness: 0.3, color: 'rgba(139, 92, 246, 0.3)', lineWidth: 2 });
    world.addConstraint(thisCore, pylonImplicit, { length: 120, stiffness: 0.2, color: 'rgba(245, 158, 11, 0.3)', lineWidth: 2 });
    world.addConstraint(thisCore, pylonDefault, { length: 100, stiffness: 0.1, color: 'rgba(239, 68, 68, 0.2)', lineWidth: 1 });

    // Floating tokens
    const tokens = ['Call-Site', 'Binding Loss', 'Strict: undefined', 'new overrides bind'];
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
    ctx.fillText('PRIORITY: 1. new ➔ 2. explicit (call/bind) ➔ 3. implicit (obj.) ➔ 4. default (bare call)', 16, world.height - 18);
    ctx.restore();
  }
}
