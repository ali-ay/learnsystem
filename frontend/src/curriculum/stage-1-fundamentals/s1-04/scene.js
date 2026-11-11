import { Scene } from '../../../physics/Scene.js';

export default class TDZScene extends Scene {
  constructor() {
    super('Temporal Dead Zone & Hoisting');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const barrierY = world.height * 0.45;

    // Laser Forcefield Anchors
    const leftAnchor = world.spawnParticle(40, barrierY, {
      radius: 6,
      color: 'rgba(244, 63, 94, 0.6)',
      isPinned: true
    });
    const rightAnchor = world.spawnParticle(world.width - 40, barrierY, {
      radius: 6,
      color: 'rgba(244, 63, 94, 0.6)',
      isPinned: true
    });
    world.addConstraint(leftAnchor, rightAnchor, {
      length: world.width - 80,
      stiffness: 0.9,
      color: 'rgba(244, 63, 94, 0.7)',
      lineWidth: 3
    });

    // var a: Freely drops below the barrier (Hoisted with 'undefined')
    const varParticle = world.spawnParticle(cx - 120, barrierY + 60, {
      radius: 22,
      label: 'var a',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.5)',
      vx: 1,
      vy: 1
    });

    const undefTag = world.spawnParticle(cx - 120, barrierY + 110, {
      radius: 14,
      label: 'undef',
      color: '#e2e8f0',
      mass: 0.5
    });
    world.addConstraint(varParticle, undefTag, { length: 45, stiffness: 0.6, color: 'rgba(245, 158, 11, 0.4)' });

    // let b: Suspended in the TDZ zone (above barrier)
    world.spawnParticle(cx + 40, barrierY - 70, {
      radius: 20,
      label: 'let b',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.6)',
      antigravityCharge: 0.8,
      vx: -0.5,
      vy: -1
    });

    // const c: Locked in TDZ zone (above barrier)
    world.spawnParticle(cx + 130, barrierY - 90, {
      radius: 22,
      label: 'const c',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.6)',
      antigravityCharge: 0.9,
      vx: 0.5,
      vy: -1
    });

    // TDZ Warning Tokens
    for (let i = 0; i < 4; i++) {
      world.spawnParticle(cx + (i - 1.5) * 50, barrierY - 30, {
        radius: 9,
        label: 'TDZ',
        color: '#f43f5e',
        glowColor: 'rgba(244, 63, 94, 0.8)',
        antigravityCharge: 0.4,
        vy: -0.5
      });
    }
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
    ctx.fillText('⚡ TDZ FORCEFIELD: let & const uninitialized until execution line', 16, world.height - 18);
    ctx.restore();
  }
}
