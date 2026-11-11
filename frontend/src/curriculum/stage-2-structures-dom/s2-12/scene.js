import { Scene } from '../../../physics/Scene.js';

/**
 * DOMSelectorScene
 * Dedicated Antigravity Scene for Module S2-12: DOM Selectors (Live vs Static Collections)
 */
export default class DOMSelectorScene extends Scene {
  constructor() {
    super('DOM Selectors: Live Camera vs Static Snapshot');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top Right: Direct O(1) getElementById Target
    const idAnchor = world.spawnParticle(cx, cy - 110, {
      radius: 24,
      label: '#id O(1) Hash',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Left Chamber: Live HTMLCollection (Connected dynamically to floating nodes)
    const liveCam = world.spawnParticle(cx - 110, cy - 30, {
      radius: 26,
      label: 'Live Camera (HTMLCol)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    const liveNode1 = world.spawnParticle(cx - 150, cy + 50, {
      radius: 16,
      label: '<div class="star">',
      color: '#f59e0b',
      antigravityCharge: 0.7,
      vx: 1
    });

    const liveNode2 = world.spawnParticle(cx - 70, cy + 50, {
      radius: 16,
      label: 'Auto-Update',
      color: '#f59e0b',
      antigravityCharge: 0.7,
      vx: -1
    });

    world.addConstraint(liveCam, liveNode1, {
      length: 80,
      stiffness: 0.1,
      color: 'rgba(245, 158, 11, 0.4)',
      lineWidth: 2
    });

    world.addConstraint(liveCam, liveNode2, {
      length: 80,
      stiffness: 0.1,
      color: 'rgba(245, 158, 11, 0.4)',
      lineWidth: 2
    });

    // Right Chamber: Static NodeList Snapshot (Rigidly frozen frame)
    const staticLens = world.spawnParticle(cx + 110, cy - 30, {
      radius: 26,
      label: 'querySelectorAll (Static)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    const snapshotFrame = world.spawnParticle(cx + 110, cy + 50, {
      radius: 20,
      label: 'Frozen [N=2]',
      color: '#10b981',
      isPinned: true
    });

    world.addConstraint(staticLens, snapshotFrame, {
      length: 80,
      stiffness: 0.95,
      color: 'rgba(16, 185, 129, 0.6)',
      lineWidth: 3
    });

    // Floating tokens
    const tokens = ['getElementById O(1)', 'NodeList.forEach', 'Live Infinite Loop Hazard', 'CSS Engine'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 135, {
        radius: 12,
        label: t,
        color: '#94a3b8',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('LIVE COLLECTION: HTMLCollection self-mutates with DOM | querySelectorAll: Static immutable snapshot', 16, world.height - 18);
    ctx.restore();
  }
}
