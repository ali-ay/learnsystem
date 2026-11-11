import { Scene } from '../../../physics/Scene.js';

/**
 * FetchHttpStreamScene
 * Dedicated Antigravity Scene for Module S4-11: Fetch API, response.ok & Stream Parsing
 */
export default class FetchHttpStreamScene extends Scene {
  constructor() {
    super('Fetch 2-Phase Pipeline: Headers Handshake ➔ Body Stream');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Client Initiator
    const clientNode = world.spawnParticle(cx - 130, cy, {
      radius: 26,
      label: 'fetch(url)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Phase 1: Headers & Status Gate
    const headersGate = world.spawnParticle(cx - 20, cy, {
      radius: 24,
      label: 'response.ok?',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(clientNode, headersGate, { restLength: 110, stiffness: 0.2 });

    // Phase 2: JSON Body Stream Extractor
    const streamExtractor = world.spawnParticle(cx + 90, cy - 40, {
      radius: 20,
      label: 'await .json()',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(headersGate, streamExtractor, { restLength: 110, stiffness: 0.15 });

    // HTTP 404/500 Warning Beacon
    const errorBeacon = world.spawnParticle(cx + 90, cy + 50, {
      radius: 16,
      label: '404/500 (!ok)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });
    world.addSpring(headersGate, errorBeacon, { restLength: 90, stiffness: 0.1 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('fetch() only rejects on DNS/network collapse; HTTP 404/500 resolves successfully', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Validate response.ok before streaming the body with await response.json()', cx, 40);

    ctx.restore();
  }
}
