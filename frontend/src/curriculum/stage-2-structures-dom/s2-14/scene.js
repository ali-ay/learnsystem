import { Scene } from '../../../physics/Scene.js';

/**
 * DOMAttributeScene
 * Dedicated Antigravity Scene for Module S2-14: Attributes vs Properties & dataset
 */
export default class DOMAttributeScene extends Scene {
  constructor() {
    super('Attribute vs Property & dataset RFID');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Dual-face Node Anchor
    const dualCore = world.spawnParticle(cx, cy - 30, {
      radius: 28,
      label: '<input>',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Left Face: Static HTML Attribute Metal Plate
    const attrPlate = world.spawnParticle(cx - 120, cy - 30, {
      radius: 22,
      label: 'attr: "initial"',
      color: '#64748b',
      glowColor: 'rgba(100, 116, 139, 0.6)',
      isPinned: true
    });

    world.addConstraint(dualCore, attrPlate, {
      length: 120,
      stiffness: 0.9,
      color: 'rgba(100, 116, 139, 0.4)',
      lineWidth: 3
    });

    // Right Face: Live Reactive Property Meter
    const propLive = world.spawnParticle(cx + 120, cy - 30, {
      radius: 22,
      label: 'prop: "live_input"',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 1.0,
      vx: 1.5,
      vy: -0.5
    });

    world.addConstraint(dualCore, propLive, {
      length: 120,
      stiffness: 0.2,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 2
    });

    // Bottom RFID Scanner: data-* to dataset.camelCase
    const datasetScanner = world.spawnParticle(cx, cy + 90, {
      radius: 24,
      label: 'dataset (camelCase)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    // Data-tag particles floating into scanner
    const tags = ['data-ship-id', 'data-is-active', 'data-warp-speed'];
    tags.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1) * 75, cy + 140, {
        radius: 13,
        label: t,
        color: '#ec4899',
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('ATTRIBUTE: Static HTML markup initial value | PROPERTY: Live DOM object state | dataset is always string', 16, world.height - 18);
    ctx.restore();
  }
}
