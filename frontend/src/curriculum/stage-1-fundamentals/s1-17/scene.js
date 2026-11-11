import { Scene } from '../../../physics/Scene.js';

/**
 * ArrowFunctionScene
 * Dedicated Antigravity Scene for Module S1-17: Arrow Functions & Lexical Scope Tether
 */
export default class ArrowFunctionScene extends Scene {
  constructor() {
    super('Arrow Drones & Lexical Tether');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Mother Ship Node: Enclosing Lexical Scope (holds 'this')
    const motherShip = world.spawnParticle(cx, cy - 40, {
      radius: 30,
      label: 'Lexical Scope (this)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Agile Arrow Drones tethered to the mother ship
    const droneLabels = ['x => x*2', '() => ({})', '...rest', 'no prototype'];
    const droneColors = ['#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];

    droneLabels.forEach((lbl, i) => {
      const angle = (i / droneLabels.length) * Math.PI * 2;
      const dist = 110;
      const drone = world.spawnParticle(cx + Math.cos(angle) * dist, cy - 40 + Math.sin(angle) * dist, {
        radius: 17,
        label: lbl,
        color: droneColors[i],
        glowColor: `${droneColors[i]}a0`,
        antigravityCharge: 1.1,
        vx: -Math.sin(angle) * 2,
        vy: Math.cos(angle) * 2
      });

      // Elastic tether constraint to mother ship
      world.addConstraint(motherShip, drone, {
        length: dist,
        stiffness: 0.08,
        color: 'rgba(0, 240, 255, 0.3)',
        lineWidth: 1.5
      });
    });

    // "new () => {}" Blocked Warning Barrier at the bottom
    const blockedNode = world.spawnParticle(cx, cy + 120, {
      radius: 20,
      label: 'new () => ✕ (TypeError)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    // Ambient floating tokens
    const tokens = ['implicit return', 'no arguments', 'no prototype', 'lexical bind'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy + 160, {
        radius: 12,
        label: t,
        color: '#64748b',
        antigravityCharge: 0.3,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.6
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('LEXICAL "THIS": Inherits enclosing context | No [[Construct]] or prototype | () => ({}) for objects', 16, world.height - 18);
    ctx.restore();
  }
}
