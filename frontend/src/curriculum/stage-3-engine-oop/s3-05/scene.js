import { Scene } from '../../../physics/Scene.js';

/**
 * ClosureBackpackScene
 * Dedicated Antigravity Scene for Module S3-05: Closures & Private Backpack State
 */
export default class ClosureBackpackScene extends Scene {
  constructor() {
    super('Closure Backpack: Persistent Lexical State');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Dissolved Outer Function Ghost Shell (Popped from Stack)
    const ghostShell = world.spawnParticle(cx, cy - 70, {
      radius: 36,
      label: 'Parent Scope (Popped)',
      color: '#64748b',
      glowColor: 'rgba(100, 116, 139, 0.4)',
      isPinned: true
    });

    // Returning Inner Function (The Active Capsule)
    const childFunc = world.spawnParticle(cx, cy + 40, {
      radius: 26,
      label: 'innerFunction()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.9,
      isPinned: true
    });

    // The Captured Variable (Private State inside Closure Backpack)
    const privateState = world.spawnParticle(cx + 65, cy + 40, {
      radius: 17,
      label: 'privateCount',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.8,
      vx: 1
    });

    // Rigid tether keeping the private state permanently locked to inner function
    world.addConstraint(childFunc, privateState, {
      length: 65,
      stiffness: 0.8,
      color: 'rgba(245, 158, 11, 0.6)',
      lineWidth: 3
    });

    // External Attacker trying to modify privateCount directly (bounces off)
    world.spawnParticle(cx - 120, cy + 40, {
      radius: 18,
      label: 'Direct Access ✕',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      antigravityCharge: 1.2,
      vx: 1.5
    });

    // Floating tokens
    const tokens = ['[[Environment]]', 'Heap Preservation', 'Data Encapsulation', 'Currying & Memo'];
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
    ctx.fillStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.fillText('CLOSURE: Parent stack frame pops, but [[Environment]] keeps private variables alive on the Heap', 16, world.height - 18);
    ctx.restore();
  }
}
