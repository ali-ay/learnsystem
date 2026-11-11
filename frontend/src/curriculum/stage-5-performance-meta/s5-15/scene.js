import { Scene } from '../../../physics/Scene.js';

/**
 * ReflectAPIScene
 * Dedicated Antigravity Scene for Module S5-15: Reflect API & Internal Methods
 */
export default class ReflectAPIScene extends Scene {
  constructor() {
    super('Reflect Mirror: Dual-Symmetry & Receiver Protocol');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Target Core
    const targetCore = world.spawnParticle(cx, cy + 40, {
      radius: 26,
      label: 'Target Engine',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });

    // Left Mirror: Proxy Trap (get/set)
    const proxyMirror = world.spawnParticle(cx - 100, cy - 60, {
      radius: 24,
      label: 'Proxy Trap',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Right Mirror: Reflect API (Reflect.get/set)
    const reflectMirror = world.spawnParticle(cx + 100, cy - 60, {
      radius: 24,
      label: 'Reflect API',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Receiver Alignment Particle (Ensures correct 'this' binding)
    const receiverToken = world.spawnParticle(cx, cy - 70, {
      radius: 16,
      label: 'receiver (this)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6
    });

    world.addSpring(proxyMirror, receiverToken, { restLength: 70, stiffness: 0.25 });
    world.addSpring(receiverToken, reflectMirror, { restLength: 70, stiffness: 0.25 });
    world.addSpring(reflectMirror, targetCore, { restLength: 110, stiffness: 0.18 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Reflect methods mirror Proxy traps with 1-to-1 signature symmetry', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Reflect.get(target, prop, receiver) guarantees correct "this" binding in getters', cx, 40);

    ctx.restore();
  }
}
