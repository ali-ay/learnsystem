import { Scene } from '../../../physics/Scene.js';

/**
 * DeepCloneScene
 * Dedicated Antigravity Scene for Module S3-08: Shallow Copy vs structuredClone()
 */
export default class DeepCloneScene extends Scene {
  constructor() {
    super('Deep Clone: structuredClone vs Shallow');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Chamber: Shallow Copy Trap (Shared Sub-Node!)
    const shallowOriginal = world.spawnParticle(cx - 140, cy - 60, {
      radius: 20,
      label: 'Orig (Shallow)',
      color: '#00f0ff',
      isPinned: true
    });

    const shallowCopy = world.spawnParticle(cx - 60, cy - 60, {
      radius: 20,
      label: 'Copy { ...orig }',
      color: '#f59e0b',
      isPinned: true
    });

    // The shared nested child node trapped between both!
    const sharedChild = world.spawnParticle(cx - 100, cy + 30, {
      radius: 17,
      label: 'Shared nested!',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.8,
      vx: 1
    });

    world.addConstraint(shallowOriginal, sharedChild, {
      length: 100,
      stiffness: 0.4,
      color: 'rgba(239, 68, 68, 0.4)',
      lineWidth: 2
    });

    world.addConstraint(shallowCopy, sharedChild, {
      length: 100,
      stiffness: 0.4,
      color: 'rgba(239, 68, 68, 0.4)',
      lineWidth: 2
    });

    // Right Chamber: structuredClone() Full Independent Deep Twin
    const deepOrig = world.spawnParticle(cx + 60, cy - 60, {
      radius: 22,
      label: 'Orig (Deep)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      isPinned: true
    });

    const deepChildA = world.spawnParticle(cx + 60, cy + 30, {
      radius: 16,
      label: 'Child A',
      color: '#10b981',
      antigravityCharge: 0.6,
      vx: -0.5
    });
    world.addConstraint(deepOrig, deepChildA, { length: 90, stiffness: 0.6, color: 'rgba(16, 185, 129, 0.3)', lineWidth: 2 });

    const deepTwin = world.spawnParticle(cx + 140, cy - 60, {
      radius: 22,
      label: 'structuredClone()',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });

    const deepChildB = world.spawnParticle(cx + 140, cy + 30, {
      radius: 16,
      label: 'Cloned Child B',
      color: '#8b5cf6',
      antigravityCharge: 0.6,
      vx: 0.5
    });
    world.addConstraint(deepTwin, deepChildB, { length: 90, stiffness: 0.6, color: 'rgba(139, 92, 246, 0.3)', lineWidth: 2 });

    // Floating tokens
    const tokens = ['Circular Reference Safe', 'Date / Set Preserved', 'No JSON.stringify', 'Deep Clone'];
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
    ctx.fillText('SHALLOW: Sub-nodes are shared pointers | STRUCTUREDCLONE: Deep copy reproduces children independently', 16, world.height - 18);
    ctx.restore();
  }
}
