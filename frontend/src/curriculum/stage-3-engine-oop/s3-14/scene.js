import { Scene } from '../../../physics/Scene.js';

/**
 * SuperStaticClassScene
 * Dedicated Antigravity Scene for Module S3-14: constructor, super, static
 */
export default class SuperStaticClassScene extends Scene {
  constructor() {
    super('Class Inheritance: super() Lifeline & static Beacon');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Static Beacon (Attached to Class, not instance)
    const staticBeacon = world.spawnParticle(cx, cy - 130, {
      radius: 18,
      label: 'static: fleetCount',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Parent Class: SpaceVessel
    const parentClass = world.spawnParticle(cx, cy - 50, {
      radius: 32,
      label: 'Base: SpaceVessel',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });
    world.addSpring(staticBeacon, parentClass, { restLength: 70, stiffness: 0.2 });

    // Derived Class: Dreadnought (Connected via super() beam)
    const derivedClass = world.spawnParticle(cx, cy + 60, {
      radius: 28,
      label: 'Derived: Dreadnought',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.6
    });

    world.addSpring(derivedClass, parentClass, {
      restLength: 100,
      stiffness: 0.18,
      damping: 0.05,
      color: 'rgba(139, 92, 246, 0.8)'
    });

    // Shield Orbit (Extra feature unlocked after super())
    const shieldOrb = world.spawnParticle(cx + 60, cy + 60, {
      radius: 14,
      label: 'Shield +super()',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)'
    });
    world.addSpring(shieldOrb, derivedClass, { restLength: 55, stiffness: 0.25 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Derived class cannot access "this" until super() allocates base object', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Static methods reside on the Class constructor function, not on instances', cx, 40);

    ctx.restore();
  }
}
