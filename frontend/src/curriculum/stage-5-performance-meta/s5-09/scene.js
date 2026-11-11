import { Scene } from '../../../physics/Scene.js';

/**
 * TypedArraysBinaryScene
 * Dedicated Antigravity Scene for Module S5-09: ArrayBuffer, TypedArrays & DataView
 */
export default class TypedArraysBinaryScene extends Scene {
  constructor() {
    super('Binary Memory Architecture: ArrayBuffer & Typed Views');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Raw ArrayBuffer Backbone (Contiguous Memory Slab)
    const bufferBackbone = world.spawnParticle(cx, cy, {
      radius: 30,
      label: 'ArrayBuffer (16B)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // View 1: Uint8Array (Byte Granularity - 1 byte each)
    const byteView1 = world.spawnParticle(cx - 100, cy - 70, {
      radius: 16,
      label: 'Uint8 [B0]',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    const byteView2 = world.spawnParticle(cx - 50, cy - 70, {
      radius: 16,
      label: 'Uint8 [B1]',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(byteView1, byteView2, { restLength: 50, stiffness: 0.3 });
    world.addSpring(byteView1, bufferBackbone, { restLength: 80, stiffness: 0.15 });

    // View 2: Int32Array (4-byte word spanning)
    const int32Node = world.spawnParticle(cx - 75, cy + 80, {
      radius: 22,
      label: 'Int32 (4 Bytes)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(int32Node, bufferBackbone, { restLength: 85, stiffness: 0.2 });

    // DataView Endianness Probe
    const probe = world.spawnParticle(cx + 90, cy - 20, {
      radius: 18,
      label: 'DataView Probe',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.7
    });
    world.addSpring(probe, bufferBackbone, { restLength: 95, stiffness: 0.18 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('ArrayBuffer allocates contiguous raw byte blocks in native memory', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('TypedArrays project structured typed views without copying underlying memory', cx, 40);

    ctx.restore();
  }
}
