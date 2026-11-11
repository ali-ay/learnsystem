import { Scene } from '../../../physics/Scene.js';

/**
 * EventListenerScene
 * Dedicated Antigravity Scene for Module S2-16: Event Listeners, e.target & AbortController
 */
export default class EventListenerScene extends Scene {
  constructor() {
    super('Event Target Radar & Abort Switch');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Outer Target: e.currentTarget (Parent Frame)
    const currentTargetNode = world.spawnParticle(cx, cy - 40, {
      radius: 32,
      label: 'e.currentTarget (Parent)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Inner Target: e.target (Physical clicked leaf)
    const targetNode = world.spawnParticle(cx, cy + 40, {
      radius: 20,
      label: 'e.target (Leaf)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 1.0,
      vx: 1
    });

    world.addConstraint(currentTargetNode, targetNode, {
      length: 80,
      stiffness: 0.4,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 2
    });

    // Left: AbortController Fuse Switch
    const abortSwitch = world.spawnParticle(cx - 120, cy - 30, {
      radius: 22,
      label: 'AbortSignal ⚡',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // Right: Passive 60 FPS Scroll Slipway
    const passiveSlipway = world.spawnParticle(cx + 120, cy - 30, {
      radius: 22,
      label: '{ passive: true }',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    // Floating tokens
    const tokens = ['{ once: true }', 'preventDefault()', 'stopPropagation()', 'PointerEvent'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 130, {
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
    ctx.fillText('EVENT LISTENER: e.target (physical element) vs e.currentTarget (attached host) | AbortSignal cleanups', 16, world.height - 18);
    ctx.restore();
  }
}
