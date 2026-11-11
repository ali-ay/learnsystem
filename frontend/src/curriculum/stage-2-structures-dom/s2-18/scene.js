import { Scene } from '../../../physics/Scene.js';

/**
 * CustomEventBusScene
 * Dedicated Antigravity Scene for Module S2-18: CustomEvent & EventTarget Bus
 */
export default class CustomEventBusScene extends Scene {
  constructor() {
    super('EventTarget Broadcast Tower & CustomEvent');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central EventTarget Broadcast Tower
    const towerCore = world.spawnParticle(cx, cy - 30, {
      radius: 28,
      label: 'EventTarget Tower',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Subscriber Nodes listening for CustomEvents
    const subs = [
      { name: 'Sub: UI Component', color: '#10b981' },
      { name: 'Sub: Analytics', color: '#f59e0b' },
      { name: 'Sub: Audio Engine', color: '#8b5cf6' }
    ];

    subs.forEach((sub, i) => {
      const angle = -Math.PI / 2 + ((i + 1) * Math.PI) / 2;
      const dist = 110;
      const sp = world.spawnParticle(cx + Math.cos(angle) * dist, cy - 30 + Math.sin(angle) * dist, {
        radius: 18,
        label: sub.name,
        color: sub.color,
        glowColor: `${sub.color}88`,
        antigravityCharge: 0.6,
        isPinned: true
      });

      world.addConstraint(towerCore, sp, {
        length: dist,
        stiffness: 0.2,
        color: `${sub.color}44`,
        lineWidth: 2
      });
    });

    // Emitted CustomEvent packet floating between tower and listeners
    const eventPacket = world.spawnParticle(cx, cy + 60, {
      radius: 17,
      label: 'detail: { data }',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 1.1,
      vx: 1.2,
      vy: -1
    });

    // Floating tokens
    const tokens = ['dispatchEvent()', 'new CustomEvent()', 'bubbles: true', 'cancelable: true'];
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
    ctx.fillText('CUSTOM EVENTS: dispatchEvent transmits payload via detail | EventTarget decouples UI components', 16, world.height - 18);
    ctx.restore();
  }
}
