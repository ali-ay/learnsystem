import { Scene } from '../../../physics/Scene.js';

/**
 * SharedMemoryAtomicsScene
 * Dedicated Antigravity Scene for Module S5-08: SharedArrayBuffer & Atomics
 */
export default class SharedMemoryAtomicsScene extends Scene {
  constructor() {
    super('Shared Memory Core: SharedArrayBuffer & Atomics Mutex');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Shared Memory Monolith
    const sabCore = world.spawnParticle(cx, cy, {
      radius: 32,
      label: 'SharedArrayBuffer',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Thread Alpha (Left - Main Thread)
    const threadA = world.spawnParticle(cx - 120, cy - 40, {
      radius: 24,
      label: 'Thread A',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Thread Beta (Right - Worker Thread)
    const threadB = world.spawnParticle(cx + 120, cy - 40, {
      radius: 24,
      label: 'Thread B',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });

    // Atomics Arbiter Clamp (Top)
    const atomicClamp = world.spawnParticle(cx, cy - 80, {
      radius: 18,
      label: 'Atomics Mutex',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    world.addSpring(threadA, sabCore, { restLength: 120, stiffness: 0.18, color: 'rgba(16, 185, 129, 0.6)' });
    world.addSpring(threadB, sabCore, { restLength: 120, stiffness: 0.18, color: 'rgba(139, 92, 246, 0.6)' });
    world.addSpring(atomicClamp, sabCore, { restLength: 80, stiffness: 0.25 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('SharedArrayBuffer allows threads to read and write the exact same RAM buffer', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Atomics provides hardware-level synchronization to eliminate race conditions', cx, 40);

    ctx.restore();
  }
}
