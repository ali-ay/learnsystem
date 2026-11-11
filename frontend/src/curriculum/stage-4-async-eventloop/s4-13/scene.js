import { Scene } from '../../../physics/Scene.js';

/**
 * ForAwaitOfScene
 * Dedicated Antigravity Scene for Module S4-13: Async Iterators & for-await-of
 */
export default class ForAwaitOfScene extends Scene {
  constructor() {
    super('Async Stream Waterwheel: Symbol.asyncIterator & for-await-of');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Upstream Async Generator Fountain (Top)
    const generatorFountain = world.spawnParticle(cx, cy - 110, {
      radius: 28,
      label: 'async function* Stream',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Downstream Consumer Funnel (Bottom)
    const consumerFunnel = world.spawnParticle(cx, cy + 90, {
      radius: 30,
      label: 'for-await-of Funnel',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Stream Chunk 1 (In processing)
    const chunk1 = world.spawnParticle(cx - 30, cy - 30, {
      radius: 16,
      label: 'yield Chunk 1',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.7
    });
    world.addSpring(generatorFountain, chunk1, { restLength: 70, stiffness: 0.15 });
    world.addSpring(chunk1, consumerFunnel, { restLength: 100, stiffness: 0.15 });

    // Stream Chunk 2 (Queued upstream)
    const chunk2 = world.spawnParticle(cx + 40, cy - 50, {
      radius: 14,
      label: 'yield Chunk 2',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(generatorFountain, chunk2, { restLength: 60, stiffness: 0.2 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('for-await-of consumes Symbol.asyncIterator streams sequentially as chunks resolve', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Ideal for memory-safe chunked streaming without loading massive datasets into RAM', cx, 40);

    ctx.restore();
  }
}
