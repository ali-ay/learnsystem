import { Scene } from '../../../physics/Scene.js';

/**
 * DOMManipulationScene
 * Dedicated Antigravity Scene for Module S2-13: DOM Manipulation & DocumentFragment Batching
 */
export default class DOMManipulationScene extends Scene {
  constructor() {
    super('DOM Batching: DocumentFragment vs Reflow');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Main DOM Target Container (Bottom)
    const domTarget = world.spawnParticle(cx, cy + 90, {
      radius: 28,
      label: 'Main DOM Tree',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // DocumentFragment Batching Pallet (Center-Left)
    const fragPallet = world.spawnParticle(cx - 100, cy - 30, {
      radius: 26,
      label: 'DocumentFragment',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    // Elements collected in the fragment before batch append
    const fragItems = ['<li>1</li>', '<li>2</li>', '<li>3</li>'];
    fragItems.forEach((item, i) => {
      const p = world.spawnParticle(cx - 150 + i * 50, cy - 90, {
        radius: 15,
        label: item,
        color: '#10b981',
        antigravityCharge: 0.5,
        vx: 1
      });
      world.addConstraint(fragPallet, p, {
        length: 65,
        stiffness: 0.4,
        color: 'rgba(16, 185, 129, 0.3)',
        lineWidth: 2
      });
    });

    // Batch Bridge to Main DOM
    world.addConstraint(fragPallet, domTarget, {
      length: 120,
      stiffness: 0.2,
      color: 'rgba(245, 158, 11, 0.3)',
      lineWidth: 2
    });

    // Warning: innerHTML += Hazard at Top Right (Spikes Reflow)
    world.spawnParticle(cx + 120, cy - 40, {
      radius: 20,
      label: 'innerHTML += (1000x Reflow)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 1.1,
      vx: -0.5,
      vy: 1
    });

    // Floating tokens
    const tokens = ['append() vs appendChild()', 'prepend()', 'remove()', 'Single Reflow', 'insertAdjacentHTML'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 65, cy + 140, {
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
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillText('BATCHING: Collect nodes in DocumentFragment ➔ Append once for a single 16ms Reflow', 16, world.height - 18);
    ctx.restore();
  }
}
