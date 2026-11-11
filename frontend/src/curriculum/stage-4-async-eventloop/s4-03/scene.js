import { Scene } from '../../../physics/Scene.js';

/**
 * MacrotaskQueueScene
 * Dedicated Antigravity Scene for Module S4-03: Macrotask Queue & Clamping
 */
export default class MacrotaskQueueScene extends Scene {
  constructor() {
    super('Macrotask Conveyor: setTimeout FIFO & 4ms Clamping Gate');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Call Stack Docking Station (Left)
    const stackStation = world.spawnParticle(cx - 140, cy, {
      radius: 30,
      label: 'Call Stack Dock',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // 4ms Clamping Gate (Middle)
    const clampGate = world.spawnParticle(cx - 30, cy, {
      radius: 20,
      label: '4ms Clamping Gate',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });
    world.addSpring(stackStation, clampGate, { restLength: 110, stiffness: 0.2 });

    // Macrotask 1 (Ready to pass)
    const task1 = world.spawnParticle(cx + 40, cy - 30, {
      radius: 18,
      label: 'setTimeout(A)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(clampGate, task1, { restLength: 70, stiffness: 0.15 });

    // Macrotask 2 (Queued)
    const task2 = world.spawnParticle(cx + 120, cy - 30, {
      radius: 18,
      label: 'setTimeout(B)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(task1, task2, { restLength: 80, stiffness: 0.2 });

    // Macrotask 3 (Queued I/O)
    const task3 = world.spawnParticle(cx + 120, cy + 50, {
      radius: 18,
      label: 'I/O Task',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)'
    });
    world.addSpring(task2, task3, { restLength: 80, stiffness: 0.15 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Macrotask queue processes exactly one task per Event Loop tick', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Nested timers are forcibly clamped to minimum 4ms delay', cx, 40);

    ctx.restore();
  }
}
