import { Scene } from '../../../physics/Scene.js';

/**
 * MicrotaskPriorityScene
 * Dedicated Antigravity Scene for Module S4-04: Microtask Queue Priority & Drain
 */
export default class MicrotaskPriorityScene extends Scene {
  constructor() {
    super('VIP Microtask Maglev Tube: Total Drain Priority');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Call Stack Receiver Station
    const stackStation = world.spawnParticle(cx - 120, cy, {
      radius: 30,
      label: 'Call Stack Dock',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Priority Checkpoint Gate
    const checkpoint = world.spawnParticle(cx - 10, cy, {
      radius: 20,
      label: 'VIP Drain Gate',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(stackStation, checkpoint, { restLength: 110, stiffness: 0.25 });

    // Microtask Pod 1: Promise.then
    const micro1 = world.spawnParticle(cx + 60, cy - 40, {
      radius: 16,
      label: 'Promise.then',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(checkpoint, micro1, { restLength: 70, stiffness: 0.2 });

    // Microtask Pod 2: queueMicrotask
    const micro2 = world.spawnParticle(cx + 120, cy - 40, {
      radius: 16,
      label: 'queueMicrotask',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)'
    });
    world.addSpring(micro1, micro2, { restLength: 60, stiffness: 0.25 });

    // Blocked Macrotask below
    const macroWaiting = world.spawnParticle(cx + 60, cy + 60, {
      radius: 20,
      label: 'setTimeout [Wait]',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      isPinned: true
    });
    world.addSpring(checkpoint, macroWaiting, { restLength: 90, stiffness: 0.1 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Microtasks are drained completely until queue size is 0', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Macrotasks and UI painting are held until all microtasks finish', cx, 40);

    ctx.restore();
  }
}
