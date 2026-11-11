import { Scene } from '../../../physics/Scene.js';

/**
 * MemoryLeakScene
 * Dedicated Antigravity Scene for Module S5-02: Memory Leaks & Detached DOM
 */
export default class MemoryLeakScene extends Scene {
  constructor() {
    super('Memory Leak: Detached Ghost Tether & Retainer Tree');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Root Retainer (Global array or forgotten timer)
    const rootRetainer = world.spawnParticle(cx - 110, cy - 60, {
      radius: 28,
      label: 'Root Retainer',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Detached Ghost DOM Node (Dangling outside DOM tree)
    const ghostDOM = world.spawnParticle(cx + 80, cy + 40, {
      radius: 24,
      label: 'Detached DOM [Leak]',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.8
    });

    // Sub-child 1 of Detached element
    const ghostChild = world.spawnParticle(cx + 140, cy + 90, {
      radius: 14,
      label: 'Child Node',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.7)'
    });
    world.addSpring(ghostDOM, ghostChild, { restLength: 60, stiffness: 0.25 });

    // Lingering accidental tether holding the ghost alive
    world.addSpring(rootRetainer, ghostDOM, {
      restLength: 170,
      stiffness: 0.1,
      damping: 0.04,
      color: 'rgba(239, 68, 68, 0.8)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Detached DOM nodes removed from page stay in RAM if referenced by JS', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Inspect DevTools Heap Snapshots to find and sever lingering Retainer chains', cx, 40);

    ctx.restore();
  }
}
