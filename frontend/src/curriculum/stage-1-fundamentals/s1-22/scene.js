import { Scene } from '../../../physics/Scene.js';

/**
 * ErrorCatchScene
 * Dedicated Antigravity Scene for Module S1-22: try, catch, finally & Call Stack Unrolling
 */
export default class ErrorCatchScene extends Scene {
  constructor() {
    super('Error Catch Trampoline & Finally Vault');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Try Chamber Frame at Top
    const tryTop = world.spawnParticle(cx, cy - 110, {
      radius: 24,
      label: 'try { code }',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Throw Shockwave Orb dropping fast
    const throwOrb = world.spawnParticle(cx, cy - 50, {
      radius: 20,
      label: '⚡ throw err',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 0.2,
      vy: 3
    });

    // Catch Trampoline Net in the Middle
    const catchLeft = world.spawnParticle(cx - 100, cy + 20, {
      radius: 16,
      label: 'catch (',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    const catchRight = world.spawnParticle(cx + 100, cy + 20, {
      radius: 16,
      label: ') { handle }',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    // Elastic safety net between catch nodes
    world.addConstraint(catchLeft, catchRight, {
      length: 200,
      stiffness: 0.15,
      color: 'rgba(245, 158, 11, 0.5)',
      lineWidth: 3
    });

    // Finally Solid Vault at the Bottom (Guaranteed Execution)
    const finallyVault = world.spawnParticle(cx, cy + 110, {
      radius: 26,
      label: 'finally { cleanup }',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['Stack Unwind', 'TypeError', 'ReferenceError', 'CustomError', 're-throw'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 60, cy + 150, {
        radius: 12,
        label: t,
        color: '#64748b',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fillText('STACK UNROLLING: throw traverses up call stack | catch absorbs | finally ALWAYS executes', 16, world.height - 18);
    ctx.restore();
  }
}
