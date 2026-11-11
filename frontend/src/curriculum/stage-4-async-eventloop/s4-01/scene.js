import { Scene } from '../../../physics/Scene.js';

/**
 * ConcurrencyModelScene
 * Dedicated Antigravity Scene for Module S4-01: Concurrency & Single-Thread
 */
export default class ConcurrencyModelScene extends Scene {
  constructor() {
    super('Single-Thread Main Lane vs Multi-Thread Web APIs');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Lane: Single-Thread Main Call Stack Pylon
    const mainThread = world.spawnParticle(cx - 100, cy, {
      radius: 30,
      label: 'Main Thread (Single)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Right Sector: Background Web APIs Cluster
    const webApisHub = world.spawnParticle(cx + 100, cy, {
      radius: 30,
      label: 'Browser C++ APIs',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Delegated Asynchronous Workers orbiting Web APIs
    const timerWorker = world.spawnParticle(cx + 100, cy - 80, {
      radius: 14,
      label: 'Timer Thread',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(timerWorker, webApisHub, { restLength: 70, stiffness: 0.2 });

    const netWorker = world.spawnParticle(cx + 100, cy + 80, {
      radius: 14,
      label: 'Network Thread',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)'
    });
    world.addSpring(netWorker, webApisHub, { restLength: 70, stiffness: 0.2 });

    // Non-blocking delegation conduit
    world.addSpring(mainThread, webApisHub, {
      restLength: 180,
      stiffness: 0.08,
      damping: 0.04,
      color: 'rgba(0, 240, 255, 0.5)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('JavaScript main thread runs synchronous bytecode on a single stack', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('I/O, network requests, and timers are offloaded to multi-threaded browser APIs', cx, 40);

    ctx.restore();
  }
}
