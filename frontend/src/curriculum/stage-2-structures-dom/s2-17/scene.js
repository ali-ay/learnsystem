import { Scene } from '../../../physics/Scene.js';

/**
 * EventPropagationScene
 * Dedicated Antigravity Scene for Module S2-17: Bubbling, Capturing & Event Delegation
 */
export default class EventPropagationScene extends Scene {
  constructor() {
    super('Event Flow: Capturing, Target & Bubbling');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top: Window / Document Root (Capturing start, Bubbling end)
    const docRoot = world.spawnParticle(cx, cy - 120, {
      radius: 26,
      label: 'window / root',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Middle: Parent Container (Delegation Watchtower)
    const parentNode = world.spawnParticle(cx, cy - 20, {
      radius: 28,
      label: 'Parent (Delegation)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    world.addConstraint(docRoot, parentNode, {
      length: 100,
      stiffness: 0.4,
      color: 'rgba(0, 240, 255, 0.3)',
      lineWidth: 2
    });

    // Bottom: Leaf Target (e.target)
    const targetNode = world.spawnParticle(cx, cy + 80, {
      radius: 22,
      label: 'e.target (Leaf)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.9,
      isPinned: true
    });

    world.addConstraint(parentNode, targetNode, {
      length: 100,
      stiffness: 0.4,
      color: 'rgba(236, 72, 153, 0.3)',
      lineWidth: 2
    });

    // Downward diving particle: Capturing (Blue)
    world.spawnParticle(cx - 70, cy - 70, {
      radius: 16,
      label: '↓ Capturing',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.8)',
      antigravityCharge: 0.1,
      vy: 2.5
    });

    // Upward rising bubbles: Bubbling (Green)
    const bubble1 = world.spawnParticle(cx + 60, cy + 40, {
      radius: 16,
      label: '↑ Bubble',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 1.5,
      vy: -2
    });

    const bubble2 = world.spawnParticle(cx + 80, cy - 40, {
      radius: 14,
      label: '↑ Bubble',
      color: '#10b981',
      antigravityCharge: 1.4,
      vy: -1.8
    });

    // Floating tokens
    const tokens = ['closest()', 'stopPropagation()', 'stopImmediatePropagation()', 'Delegation O(1)'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 140, {
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
    ctx.fillText('EVENT FLOW: 1. Capturing (down) ➔ 2. Target (hit) ➔ 3. Bubbling (up) | Delegation listens on parent', 16, world.height - 18);
    ctx.restore();
  }
}
