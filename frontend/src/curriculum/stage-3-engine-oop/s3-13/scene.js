import { Scene } from '../../../physics/Scene.js';

/**
 * ES6ClassScene
 * Dedicated Antigravity Scene for Module S3-13: ES6 Class Syntax & Syntactic Sugar
 */
export default class ES6ClassScene extends Scene {
  constructor() {
    super('ES6 Class Blueprint & Instance Factory Matrix');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Blueprint Frame (Class Constructor & Prototype Hub)
    const classHub = world.spawnParticle(cx, cy - 40, {
      radius: 34,
      label: 'class ReactorCore',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Shared Prototype Method Node
    const protoMethod = world.spawnParticle(cx, cy - 110, {
      radius: 20,
      label: 'prototype.boost()',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)',
      isPinned: true
    });
    world.addSpring(protoMethod, classHub, { restLength: 70, stiffness: 0.2 });

    // Instance 1: ARC-01
    const inst1 = world.spawnParticle(cx - 110, cy + 80, {
      radius: 24,
      label: 'core1: ARC-01',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(inst1, classHub, {
      restLength: 130,
      stiffness: 0.12,
      color: 'rgba(16, 185, 129, 0.6)'
    });

    // Instance 2: ARC-02
    const inst2 = world.spawnParticle(cx + 110, cy + 80, {
      radius: 24,
      label: 'core2: ARC-02',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(inst2, classHub, {
      restLength: 130,
      stiffness: 0.12,
      color: 'rgba(16, 185, 129, 0.6)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ES6 Class is syntactic sugar wrapping prototype delegation with strict checks', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Requires "new", non-enumerable methods, and strict mode by default', cx, 40);

    ctx.restore();
  }
}
