import { Scene } from '../../../physics/Scene.js';

/**
 * CallStackScene
 * Dedicated Antigravity Scene for Module S3-02: Execution Context & Call Stack (LIFO)
 */
export default class CallStackScene extends Scene {
  constructor() {
    super('Call Stack: LIFO Frames & Overflow');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top: Stack Overflow Warning Ceiling
    const ceilingLeft = world.spawnParticle(cx - 130, cy - 120, {
      radius: 14,
      label: 'MAX STACK',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    const ceilingRight = world.spawnParticle(cx + 130, cy - 120, {
      radius: 14,
      label: 'OVERFLOW ⚠️',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    world.addConstraint(ceilingLeft, ceilingRight, {
      length: 260,
      stiffness: 0.9,
      color: 'rgba(239, 68, 68, 0.5)',
      lineWidth: 3
    });

    // Bottom: Global Execution Context (Base Table)
    const gecBase = world.spawnParticle(cx, cy + 100, {
      radius: 28,
      label: 'Global Context (GEC)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Stack Frames in Vertical LIFO Alignment
    const frame1 = world.spawnParticle(cx, cy + 40, {
      radius: 22,
      label: 'Frame: first()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.7,
      isPinned: true
    });

    const frame2 = world.spawnParticle(cx, cy - 20, {
      radius: 20,
      label: 'Frame: second()',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    const frame3 = world.spawnParticle(cx, cy - 70, {
      radius: 18,
      label: 'Frame: third() [TOP]',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 1.0,
      vx: 1.5
    });

    // Vertical Stack Tether Springs
    world.addConstraint(gecBase, frame1, {
      length: 60,
      stiffness: 0.6,
      color: 'rgba(255, 255, 255, 0.2)',
      lineWidth: 2
    });

    world.addConstraint(frame1, frame2, {
      length: 60,
      stiffness: 0.6,
      color: 'rgba(255, 255, 255, 0.2)',
      lineWidth: 2
    });

    world.addConstraint(frame2, frame3, {
      length: 50,
      stiffness: 0.4,
      color: 'rgba(255, 255, 255, 0.2)',
      lineWidth: 2
    });

    // Floating tokens
    const tokens = ['Creation Phase', 'Execution Phase', 'LIFO Stack', 'Variable Environment'];
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
    ctx.fillText('CALL STACK (LIFO): Functions push frames on call and pop on return | Deep recursion causes Stack Overflow', 16, world.height - 18);
    ctx.restore();
  }
}
