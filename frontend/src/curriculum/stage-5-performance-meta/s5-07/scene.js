import { Scene } from '../../../physics/Scene.js';

/**
 * WebWorkerThreadsScene
 * Dedicated Antigravity Scene for Module S5-07: Web Workers & Multi-Threading
 */
export default class WebWorkerThreadsScene extends Scene {
  constructor() {
    super('Multi-Thread Isolation: Main Thread vs Background Worker');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Platform 1: Main Thread (DOM & UI)
    const mainThread = world.spawnParticle(cx - 120, cy, {
      radius: 32,
      label: 'Main Thread (DOM/UI)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Platform 2: Dedicated Worker Thread (Heavy compute)
    const workerThread = world.spawnParticle(cx + 120, cy, {
      radius: 32,
      label: 'Web Worker (CPU OS)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });

    // Message Packet (postMessage in transit)
    const msgPacket = world.spawnParticle(cx, cy - 30, {
      radius: 14,
      label: 'postMessage()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.7
    });

    world.addSpring(mainThread, msgPacket, { restLength: 70, stiffness: 0.15 });
    world.addSpring(msgPacket, workerThread, { restLength: 70, stiffness: 0.15 });

    // Barrier separator line anchor
    const barrier = world.spawnParticle(cx, cy + 80, {
      radius: 12,
      label: 'DOM Shield',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.7)',
      isPinned: true
    });
    world.addSpring(barrier, msgPacket, { restLength: 90, stiffness: 0.05 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Web Workers execute in a dedicated OS thread without access to window or DOM', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Communication is asynchronous via serialized postMessage or Transferable objects', cx, 40);

    ctx.restore();
  }
}
