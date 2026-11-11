import { Scene } from '../../../physics/Scene.js';

/**
 * CompositionLegoScene
 * Dedicated Antigravity Scene for Module S3-16: Composition vs Inheritance
 */
export default class CompositionLegoScene extends Scene {
  constructor() {
    super('Object Composition: Modular Lego Ability Assembly');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Entity Core (Mecha-Dragon)
    const entityCore = world.spawnParticle(cx, cy, {
      radius: 28,
      label: 'Cyborg Dragon',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.8
    });

    // Modular Ability 1: canFly
    const flyPod = world.spawnParticle(cx - 90, cy - 70, {
      radius: 18,
      label: 'canFly()',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)'
    });
    world.addSpring(entityCore, flyPod, { restLength: 85, stiffness: 0.15 });

    // Modular Ability 2: canShoot
    const shootPod = world.spawnParticle(cx + 90, cy - 70, {
      radius: 18,
      label: 'canShoot()',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(entityCore, shootPod, { restLength: 85, stiffness: 0.15 });

    // Modular Ability 3: canHack
    const hackPod = world.spawnParticle(cx, cy + 90, {
      radius: 18,
      label: 'canHack()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)'
    });
    world.addSpring(entityCore, hackPod, { restLength: 85, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Favor object composition over rigid multi-level class inheritance', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Combine capabilities as modular Lego pieces with zero fragile base-class overhead', cx, 40);

    ctx.restore();
  }
}
