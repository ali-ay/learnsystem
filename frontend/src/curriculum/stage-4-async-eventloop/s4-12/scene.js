import { Scene } from '../../../physics/Scene.js';

/**
 * AbortControllerScene
 * Dedicated Antigravity Scene for Module S4-12: AbortController & Cancellation Signals
 */
export default class AbortControllerScene extends Scene {
  constructor() {
    super('AbortController Kill Switch & AbortSignal Relay');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // AbortController Master Switch (Left)
    const masterSwitch = world.spawnParticle(cx - 120, cy, {
      radius: 26,
      label: 'AbortController',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // AbortSignal Relay Wire
    const signalRelay = world.spawnParticle(cx - 20, cy - 40, {
      radius: 18,
      label: 'AbortSignal',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });
    world.addSpring(masterSwitch, signalRelay, { restLength: 100, stiffness: 0.25 });

    // In-Flight Network Task (Target)
    const flightTask = world.spawnParticle(cx + 90, cy + 20, {
      radius: 24,
      label: 'fetch() In Flight',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.7
    });

    // Detachable tether
    world.addSpring(signalRelay, flightTask, {
      restLength: 110,
      stiffness: 0.12,
      damping: 0.05,
      color: 'rgba(239, 68, 68, 0.7)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('controller.abort() instantly transmits a cancellation signal across all listeners', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Prevents stale autocomplete race conditions and frees network sockets', cx, 40);

    ctx.restore();
  }
}
