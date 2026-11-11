import { Scene } from '../../../physics/Scene.js';

/**
 * ExplicitBindingScene
 * Dedicated Antigravity Scene for Module S3-10: Explicit Binding (call, apply, bind)
 */
export default class ExplicitBindingScene extends Scene {
  constructor() {
    super('Explicit Binding: call, apply & Hard-Bound weld');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Station Alpha (Target Object A)
    const shipAlpha = world.spawnParticle(cx - 130, cy - 40, {
      radius: 28,
      label: 'Alpha Ship',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Station Beta (Target Object B)
    const shipBeta = world.spawnParticle(cx + 130, cy - 40, {
      radius: 28,
      label: 'Beta Ship',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });

    // Portable function beam capsule
    const fnCapsule = world.spawnParticle(cx, cy + 90, {
      radius: 22,
      label: 'fireLasers()',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.8
    });

    // Beam link to Alpha
    world.addSpring(fnCapsule, shipAlpha, {
      restLength: 140,
      stiffness: 0.12,
      damping: 0.05,
      color: 'rgba(0, 240, 255, 0.6)'
    });

    // Orbiting argument packets (call vs apply representation)
    const arg1 = world.spawnParticle(cx - 40, cy + 130, {
      radius: 10,
      label: 'call(arg1, arg2)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)'
    });
    world.addSpring(fnCapsule, arg1, { restLength: 50, stiffness: 0.2 });

    const arg2 = world.spawnParticle(cx + 40, cy + 130, {
      radius: 12,
      label: 'apply([args])',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)'
    });
    world.addSpring(fnCapsule, arg2, { restLength: 50, stiffness: 0.2 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('bind() creates an unbreakable hard constraint weld to thisArg', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('call / apply dynamically dock & fire with comma args or array container', cx, 40);

    ctx.restore();
  }
}
