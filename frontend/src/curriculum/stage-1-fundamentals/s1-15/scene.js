import { Scene } from '../../../physics/Scene.js';

/**
 * LoopControlScene
 * Dedicated Antigravity Scene for Module S1-15: break, continue & labeled statements
 */
export default class LoopControlScene extends Scene {
  constructor() {
    super('Loop Controls: break & continue');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Labeled statement beacon at the top
    const labelBeacon = world.spawnParticle(cx, cy - 130, {
      radius: 20,
      label: 'outerLabel:',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Outer Loop Guard Frame
    const outerLeft = world.spawnParticle(cx - 130, cy - 40, {
      radius: 16,
      label: 'Outer [ {',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      isPinned: true
    });

    const outerRight = world.spawnParticle(cx + 130, cy - 40, {
      radius: 16,
      label: '} ]',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      isPinned: true
    });

    world.addConstraint(outerLeft, outerRight, {
      length: 260,
      stiffness: 0.1,
      color: 'rgba(139, 92, 246, 0.25)',
      lineWidth: 2
    });

    // Inner Loop Guard Frame
    const innerLeft = world.spawnParticle(cx - 60, cy + 30, {
      radius: 14,
      label: 'Inner {',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      isPinned: true
    });

    const innerRight = world.spawnParticle(cx + 60, cy + 30, {
      radius: 14,
      label: '}',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      isPinned: true
    });

    world.addConstraint(innerLeft, innerRight, {
      length: 120,
      stiffness: 0.2,
      color: 'rgba(0, 240, 255, 0.3)',
      lineWidth: 2
    });

    // break Emergency Laser (slices out)
    const breakLaser = world.spawnParticle(cx - 80, cy + 90, {
      radius: 20,
      label: '⚡ break',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 1.6,
      vy: 2
    });

    // continue Trampoline (springs up to next iteration)
    const continueSpring = world.spawnParticle(cx + 80, cy + 90, {
      radius: 20,
      label: '↷ continue',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 1.2,
      vy: -2
    });

    // Floating tokens
    const tokens = ['break label', 'skip iteration', 'early exit', 'matrix[r][c]'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 70, cy + 150, {
        radius: 13,
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
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fillText('BREAK: Exits loop boundary | CONTINUE: Skips remaining body | LABELS: Direct multi-level jumps', 16, world.height - 18);
    ctx.restore();
  }
}
