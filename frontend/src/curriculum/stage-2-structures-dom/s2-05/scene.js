import { Scene } from '../../../physics/Scene.js';

/**
 * ObjectShapeScene
 * Dedicated Antigravity Scene for Module S2-05: Objects, Computed Properties & Hidden Classes
 */
export default class ObjectShapeScene extends Scene {
  constructor() {
    super('Object Core: Hidden Class & Shape');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Object Chassis (Hidden Class Anchor)
    const objCore = world.spawnParticle(cx, cy, {
      radius: 30,
      label: 'Object Chassis',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Rigidly attached property slots (representing standard Hidden Class offsets)
    const props = [
      { label: 'id: 101', color: '#10b981' },
      { label: 'name: "Ship"', color: '#3b82f6' },
      { label: '[computed]: val', color: '#f59e0b' },
      { label: 'speed: 9.8', color: '#8b5cf6' }
    ];

    const dist = 100;
    props.forEach((prop, i) => {
      const angle = (i / props.length) * Math.PI * 2;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      const p = world.spawnParticle(px, py, {
        radius: 18,
        label: prop.label,
        color: prop.color,
        glowColor: `${prop.color}99`,
        antigravityCharge: 0.7,
        vx: -Math.sin(angle) * 1.5,
        vy: Math.cos(angle) * 1.5
      });

      world.addConstraint(objCore, p, {
        length: dist,
        stiffness: 0.5,
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 2
      });
    });

    // "delete obj.prop" Hazard Laser at Bottom Left
    world.spawnParticle(cx - 140, cy + 90, {
      radius: 20,
      label: 'delete ➔ Dictionary',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 1.2,
      vx: 1,
      vy: -1
    });

    // Object.hasOwn() Scanner Badge at Top Right
    world.spawnParticle(cx + 130, cy - 80, {
      radius: 18,
      label: 'Object.hasOwn()',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.8)',
      isPinned: true
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('HIDDEN CLASSES: Keys coerce to string/symbol | delete drops object to Dictionary mode | Use Object.hasOwn()', 16, world.height - 18);
    ctx.restore();
  }
}
