import { Scene } from '../../../physics/Scene.js';

/**
 * RestParametersScene
 * Dedicated Antigravity Scene for Module S1-18: Default Parameters & Rest Operator (...args)
 */
export default class RestParametersScene extends Scene {
  constructor() {
    super('Rest Funnel & Default Gates');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Default Parameter Gate on the Left
    const defaultGate = world.spawnParticle(cx - 110, cy - 60, {
      radius: 24,
      label: 'param = 100',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.7,
      isPinned: true
    });

    const undefinedNode = world.spawnParticle(cx - 110, cy - 120, {
      radius: 16,
      label: 'undefined',
      color: '#64748b',
      glowColor: 'rgba(100, 116, 139, 0.5)',
      vy: 1.5
    });

    // Central Rest Collector Funnel (...args)
    const restFunnel = world.spawnParticle(cx + 90, cy - 20, {
      radius: 28,
      label: '...rest Funnel',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.9,
      isPinned: true
    });

    // Arguments collected into Array chain
    const argLabels = ['arg[0]', 'arg[1]', 'arg[2]'];
    const argColors = ['#00f0ff', '#f59e0b', '#ec4899'];
    let prev = restFunnel;

    argLabels.forEach((lbl, i) => {
      const p = world.spawnParticle(cx + 90, cy + 50 + i * 40, {
        radius: 15,
        label: lbl,
        color: argColors[i],
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 1.5
      });

      world.addConstraint(prev, p, {
        length: 45,
        stiffness: 0.3,
        color: 'rgba(139, 92, 246, 0.4)',
        lineWidth: 2
      });
      prev = p;
    });

    // Deprecated arguments object particle floating at the side
    world.spawnParticle(cx - 90, cy + 90, {
      radius: 17,
      label: 'arguments ⚠️',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.7)',
      antigravityCharge: 0.3,
      vx: -0.5
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(139, 92, 246, 0.85)';
    ctx.fillText('REST OPERATOR: Collects infinite args into a true Array | DEFAULTS: Triggered only on undefined', 16, world.height - 18);
    ctx.restore();
  }
}
