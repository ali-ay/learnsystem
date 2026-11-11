import { Scene } from '../../../physics/Scene.js';

/**
 * FunctionDeclarationScene
 * Dedicated Antigravity Scene for Module S1-16: Function Declaration vs Function Expression
 */
export default class FunctionDeclarationScene extends Scene {
  constructor() {
    super('Declaration Tower vs Expression Station');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // High Hoisted Declaration Tower (Reachable from top)
    const tower = world.spawnParticle(cx - 100, cy - 90, {
      radius: 26,
      label: 'function foo()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 1.2,
      isPinned: true
    });

    const towerBeacon = world.spawnParticle(cx - 100, cy - 140, {
      radius: 12,
      label: 'Hoisted',
      color: '#00f0ff',
      isPinned: true
    });

    world.addConstraint(tower, towerBeacon, {
      length: 50,
      stiffness: 0.9,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 2
    });

    // Ground Level Expression Station (const bar = ...)
    const exprStation = world.spawnParticle(cx + 100, cy + 40, {
      radius: 24,
      label: 'const bar = fn',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.5,
      isPinned: true
    });

    // TDZ Laser Barrier protecting expression from early access
    const tdzGuard = world.spawnParticle(cx + 100, cy - 30, {
      radius: 16,
      label: 'TDZ Zone',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    world.addConstraint(exprStation, tdzGuard, {
      length: 70,
      stiffness: 0.8,
      color: 'rgba(239, 68, 68, 0.4)',
      lineWidth: 2
    });

    // NFE Recursion Orb cycling between tower and station
    const nfeOrb = world.spawnParticle(cx, cy, {
      radius: 18,
      label: 'NFE fact()',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      antigravityCharge: 0.9,
      vx: 1.5,
      vy: -1
    });

    // Free floating tokens
    const tokens = ['Creation Phase', 'Call Stack', 'IIFE ()()', 'Anonymous', 'TypeError'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 60, cy + 130, {
        radius: 13,
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
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('DECLARATION: Full body hoisted at creation phase | EXPRESSION: Bound to variable at runtime', 16, world.height - 18);
    ctx.restore();
  }
}
