import { Scene } from '../../../physics/Scene.js';

/**
 * ScopeEnclosureScene
 * Dedicated Antigravity Scene for Module S3-03: Global, Function & Block Scope
 */
export default class ScopeEnclosureScene extends Scene {
  constructor() {
    super('Scope Enclosures: Global, Function & Block');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Outer: Global Scope Pin
    const globalPin = world.spawnParticle(cx, cy - 120, {
      radius: 26,
      label: 'Global Scope',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Middle: Function Scope Boundary
    const fnScopeLeft = world.spawnParticle(cx - 130, cy - 10, {
      radius: 16,
      label: 'fn() {',
      color: '#8b5cf6',
      isPinned: true
    });

    const fnScopeRight = world.spawnParticle(cx + 130, cy - 10, {
      radius: 16,
      label: '}',
      color: '#8b5cf6',
      isPinned: true
    });

    world.addConstraint(fnScopeLeft, fnScopeRight, {
      length: 260,
      stiffness: 0.15,
      color: 'rgba(139, 92, 246, 0.3)',
      lineWidth: 2
    });

    // Inner: Block Scope Quarantine Box { let / const }
    const blockCore = world.spawnParticle(cx, cy + 50, {
      radius: 22,
      label: '{ Block }',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });

    // Confined 'let' particle bouncing strictly inside block
    world.spawnParticle(cx - 30, cy + 50, {
      radius: 16,
      label: 'let (Confined)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.9,
      vx: 1.2,
      vy: 0.5
    });

    // Leaky 'var' particle escaped to the function layer
    world.spawnParticle(cx + 80, cy - 50, {
      radius: 16,
      label: 'var (Leaked!)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      antigravityCharge: 1.2,
      vx: -1.5,
      vy: -1
    });

    // Floating tokens
    const tokens = ['Shadowing', 'Illegal Shadowing', 'Lexical Boundary', 'TDZ Safety'];
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
    ctx.fillText('SCOPES: let/const are locked inside Block { } | var breaches blocks into function scope', 16, world.height - 18);
    ctx.restore();
  }
}
