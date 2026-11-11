import { Scene } from '../../../physics/Scene.js';

/**
 * CallBySharingScene
 * Dedicated Antigravity Scene for Module S3-07: Pass-by-Value vs Call-by-Sharing
 */
export default class CallBySharingScene extends Scene {
  constructor() {
    super('Call-by-Sharing: Dual Pointers & Mutation');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Shared Heap Object
    const sharedHeap = world.spawnParticle(cx, cy - 20, {
      radius: 28,
      label: 'Shared Heap Obj',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Pointer 1 (Caller Variable in Outer Scope)
    const ptr1 = world.spawnParticle(cx - 110, cy - 90, {
      radius: 20,
      label: 'ptr1 (Caller)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)',
      isPinned: true
    });

    // Pointer 2 (Function Parameter - copy of pointer value)
    const ptr2 = world.spawnParticle(cx + 110, cy - 90, {
      radius: 20,
      label: 'param (Copy of Ptr)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      isPinned: true
    });

    // Both pointers connected to the SAME shared Heap object
    world.addConstraint(ptr1, sharedHeap, {
      length: 120,
      stiffness: 0.5,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 3
    });

    world.addConstraint(ptr2, sharedHeap, {
      length: 120,
      stiffness: 0.5,
      color: 'rgba(16, 185, 129, 0.4)',
      lineWidth: 3
    });

    // Reassigned New Heap Object at Bottom (severed relationship)
    world.spawnParticle(cx + 110, cy + 90, {
      radius: 22,
      label: 'param = { newObj }',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      antigravityCharge: 0.9,
      vx: 1.2
    });

    // Floating tokens
    const tokens = ['Call by Sharing', 'Pass by Value', 'Reassignment snaps link', 'Pure Function'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 140, {
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
    ctx.fillText('CALL BY SHARING: Function receives a copy of the pointer address | param = {} snaps link', 16, world.height - 18);
    ctx.restore();
  }
}
