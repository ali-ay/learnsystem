import { Scene } from '../../../physics/Scene.js';

/**
 * ObjectFreezeSealScene
 * Dedicated Antigravity Scene for Module S2-06: Object.freeze, Object.seal & entries/fromEntries
 */
export default class ObjectFreezeSealScene extends Scene {
  constructor() {
    super('Object Vault: Freeze & Seal');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Chamber: Frozen Vault (Object.freeze)
    const freezeCore = world.spawnParticle(cx - 100, cy - 20, {
      radius: 26,
      label: '❄ freeze()',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.1,
      isPinned: true
    });

    // Pinned Frozen Shell around freezeCore
    const shellNodes = 4;
    for (let i = 0; i < shellNodes; i++) {
      const angle = (i / shellNodes) * Math.PI * 2;
      const sp = world.spawnParticle(cx - 100 + Math.cos(angle) * 55, cy - 20 + Math.sin(angle) * 55, {
        radius: 10,
        label: 'ice',
        color: '#38bdf8',
        isPinned: true
      });
      world.addConstraint(freezeCore, sp, {
        length: 55,
        stiffness: 0.95,
        color: 'rgba(56, 189, 248, 0.5)',
        lineWidth: 2
      });
    }

    // Right Chamber: Sealed Ring (Object.seal - allows internal value updates)
    const sealCore = world.spawnParticle(cx + 100, cy - 20, {
      radius: 26,
      label: '🔒 seal()',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    const valMutable = world.spawnParticle(cx + 100, cy + 50, {
      radius: 16,
      label: 'writable: true',
      color: '#10b981',
      antigravityCharge: 0.8,
      vx: 1.5
    });

    world.addConstraint(sealCore, valMutable, {
      length: 70,
      stiffness: 0.3,
      color: 'rgba(245, 158, 11, 0.4)',
      lineWidth: 2
    });

    // Bottom Assembler: Object.fromEntries()
    const fromEntriesCore = world.spawnParticle(cx, cy + 120, {
      radius: 22,
      label: 'fromEntries()',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Floating entry pairs: [key, val]
    const entryPairs = ['["k", 1]', '["w", 9]', 'DeepFreeze', 'Object.keys'];
    entryPairs.forEach((ep, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy - 110, {
        radius: 14,
        label: ep,
        color: '#ec4899',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('FREEZE: Locked writable & configurable | SEAL: Locks structure but allows value update | Shallow freeze trap', 16, world.height - 18);
    ctx.restore();
  }
}
