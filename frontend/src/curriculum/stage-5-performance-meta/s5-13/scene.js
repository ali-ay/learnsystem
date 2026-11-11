import { Scene } from '../../../physics/Scene.js';

/**
 * SymbolMetaScene
 * Dedicated Antigravity Scene for Module S5-13: Symbols & Symbol.toPrimitive
 */
export default class SymbolMetaScene extends Scene {
  constructor() {
    super('Symbol Crystal: Collision-Free Keys & toPrimitive Bridge');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Unique Symbol Crystal Core
    const symbolCore = world.spawnParticle(cx, cy, {
      radius: 28,
      label: 'Symbol("id")',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Invisibility Cloak Pylon (Hidden from Object.keys)
    const cloakPylon = world.spawnParticle(cx - 100, cy - 60, {
      radius: 18,
      label: 'Non-Enumerable Cloak',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });
    world.addSpring(symbolCore, cloakPylon, { restLength: 90, stiffness: 0.2 });

    // Symbol.toPrimitive Morphing Engine (Right)
    const primitiveMorpher = world.spawnParticle(cx + 100, cy, {
      radius: 24,
      label: 'toPrimitive [hint]',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });
    world.addSpring(symbolCore, primitiveMorpher, { restLength: 100, stiffness: 0.18 });

    // Free Morphing Result Orb
    const resultOrb = world.spawnParticle(cx + 100, cy - 70, {
      radius: 14,
      label: 'Type: number / str',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.7
    });
    world.addSpring(primitiveMorpher, resultOrb, { restLength: 70, stiffness: 0.2 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Symbols provide collision-free property keys hidden from regular enumeration', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Well-known symbols like Symbol.toPrimitive intercept native language type coercion', cx, 40);

    ctx.restore();
  }
}
