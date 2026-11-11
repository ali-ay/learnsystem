import { Scene } from '../../../physics/Scene.js';

/**
 * DebounceThrottleScene
 * Dedicated Antigravity Scene for Module S5-05: Debouncing vs Throttling
 */
export default class DebounceThrottleScene extends Scene {
  constructor() {
    super('Event Frequency Filters: Debounce Elevator vs Throttle Turnstile');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Rapid Event Emitter (Left)
    const emitter = world.spawnParticle(cx - 130, cy, {
      radius: 26,
      label: 'Rapid Events (100Hz)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // Top Filter: Debounce Chamber (Settling delay)
    const debounceGate = world.spawnParticle(cx, cy - 60, {
      radius: 24,
      label: 'Debounce (Pause to fire)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });
    world.addSpring(emitter, debounceGate, { restLength: 120, stiffness: 0.15 });

    // Bottom Filter: Throttle Turnstile (Fixed cadence)
    const throttleGate = world.spawnParticle(cx, cy + 60, {
      radius: 24,
      label: 'Throttle (Fixed cadence)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(emitter, throttleGate, { restLength: 120, stiffness: 0.15 });

    // Output Receiver (Right)
    const receiver = world.spawnParticle(cx + 120, cy, {
      radius: 24,
      label: 'Processed Output',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(debounceGate, receiver, { restLength: 120, stiffness: 0.15 });
    world.addSpring(throttleGate, receiver, { restLength: 120, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Debounce delays execution until bursts cease (ideal for search inputs)', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Throttle enforces a maximum execution frequency (ideal for scroll / resize)', cx, 40);

    ctx.restore();
  }
}
