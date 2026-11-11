import { Scene } from '../../../physics/Scene.js';

/**
 * IndexedDBHangarScene
 * Dedicated Antigravity Scene for Module S2-20: IndexedDB, ObjectStore & Transactions
 */
export default class IndexedDBHangarScene extends Scene {
  constructor() {
    super('IndexedDB: NoSQL Hangar & Transactions');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Center: IndexedDB Database Hub
    const dbHub = world.spawnParticle(cx, cy - 30, {
      radius: 30,
      label: 'IndexedDB Hub',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // ObjectStore Storage Rack (Horizontal Shelf)
    const storeLabels = ['Record #1', 'Record #2', 'Record #3'];
    const storeColors = ['#10b981', '#3b82f6', '#8b5cf6'];
    const recordNodes = [];

    storeLabels.forEach((lbl, i) => {
      const p = world.spawnParticle(cx - 100 + i * 100, cy + 60, {
        radius: 18,
        label: lbl,
        color: storeColors[i],
        glowColor: `${storeColors[i]}88`,
        antigravityCharge: 0.6,
        isPinned: true
      });
      recordNodes.push(p);

      world.addConstraint(dbHub, p, {
        length: 110,
        stiffness: 0.3,
        color: 'rgba(0, 240, 255, 0.25)',
        lineWidth: 2
      });
    });

    // Asynchronous Transaction Shuttle (Moving between records)
    const txShuttle = world.spawnParticle(cx, cy - 110, {
      radius: 20,
      label: 'readwrite TX',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 1.0,
      vx: 2,
      vy: 0.5
    });

    // Index B-Tree Scanner
    world.spawnParticle(cx + 130, cy - 80, {
      radius: 17,
      label: 'Index (B-Tree)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['ObjectStore', 'autoIncrement', 'Non-blocking I/O', 'ACID Rollback', 'onupgradeneeded'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 65, cy + 140, {
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
    ctx.fillText('INDEXEDDB: High-capacity async NoSQL database | ObjectStore holds JS objects | ACID Transactions', 16, world.height - 18);
    ctx.restore();
  }
}
