import { Scene } from '../../../physics/Scene.js';

/**
 * PrototypeChainScene
 * Dedicated Antigravity Scene for Module S3-12: Prototype Chain & [[Prototype]]
 */
export default class PrototypeChainScene extends Scene {
  constructor() {
    super('Prototype Chain Ladder: Instance ➔ Prototype ➔ Object ➔ null');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top: null (End of Universe)
    const nullNode = world.spawnParticle(cx, cy - 120, {
      radius: 16,
      label: 'null (End of Chain)',
      color: '#475569',
      glowColor: 'rgba(71, 85, 105, 0.6)',
      isPinned: true
    });

    // Level 2: Object.prototype
    const objectProto = world.spawnParticle(cx, cy - 50, {
      radius: 22,
      label: 'Object.prototype',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });
    world.addSpring(objectProto, nullNode, {
      restLength: 70,
      stiffness: 0.2,
      color: 'rgba(245, 158, 11, 0.6)'
    });

    // Level 1: StarFighter.prototype
    const starfighterProto = world.spawnParticle(cx, cy + 30, {
      radius: 24,
      label: 'StarFighter.prototype [fire()]',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.5
    });
    world.addSpring(starfighterProto, objectProto, {
      restLength: 80,
      stiffness: 0.15,
      color: 'rgba(139, 92, 246, 0.7)'
    });

    // Level 0: shipA Instance (Own properties)
    const shipInstance = world.spawnParticle(cx, cy + 110, {
      radius: 26,
      label: 'shipA [callsign: "Red"]',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.9
    });
    world.addSpring(shipInstance, starfighterProto, {
      restLength: 80,
      stiffness: 0.12,
      color: 'rgba(0, 240, 255, 0.8)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Property lookup climbs up the [[Prototype]] chain via delegation', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('If not found at top (null), engine returns undefined', cx, 40);

    ctx.restore();
  }
}
