import { Scene } from '../../../physics/Scene.js';

/**
 * StackHeapMemoryScene
 * Dedicated Antigravity Scene for Module S3-06: Stack vs Heap Memory Architecture
 */
export default class StackHeapMemoryScene extends Scene {
  constructor() {
    super('Memory: Stack Drawer vs Heap Galaxy');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Column: Stack Memory Shelf (Linear & Rigid)
    const stackHeader = world.spawnParticle(cx - 130, cy - 110, {
      radius: 20,
      label: 'STACK (Primitives)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    const stackSlot1 = world.spawnParticle(cx - 130, cy - 40, {
      radius: 17,
      label: 'a = 100',
      color: '#10b981',
      isPinned: true
    });

    const stackSlot2 = world.spawnParticle(cx - 130, cy + 30, {
      radius: 17,
      label: 'ptr ➔ 0x7A',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    // Right Area: Heap Memory Galaxy (Dynamic floating objects)
    const heapHeader = world.spawnParticle(cx + 110, cy - 110, {
      radius: 20,
      label: 'HEAP (Objects)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });

    const heapObject = world.spawnParticle(cx + 100, cy + 30, {
      radius: 26,
      label: '{ name, warp }',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8,
      vx: 1,
      vy: -0.5
    });

    // Pointer Cable from Stack pointer slot to Heap Object
    world.addConstraint(stackSlot2, heapObject, {
      length: 220,
      stiffness: 0.4,
      color: 'rgba(245, 158, 11, 0.5)',
      lineWidth: 3
    });

    // Young vs Old Space Tokens floating
    const tokens = ['New Space (Nursery)', 'Old Space', 'Pointer 64-bit', 'Mark & Sweep'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 135, {
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
    ctx.fillText('MEMORY: Stack holds fixed primitives and pointers | Heap stores dynamic objects & closures', 16, world.height - 18);
    ctx.restore();
  }
}
