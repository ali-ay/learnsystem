import { Scene } from '../../../physics/Scene.js';

export default class ShortCircuitScene extends Scene {
  constructor() {
    super('Short-Circuit & Logical Gates');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Relay Switch A (Power Source)
    const switchA = world.spawnParticle(cx - 120, cy, {
      radius: 22,
      label: 'false',
      color: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.7)',
      isPinned: true
    });

    // Central Short-Circuit Gate '&&'
    const gateNode = world.spawnParticle(cx, cy - 60, {
      radius: 18,
      label: '&&',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.7)',
      isPinned: true
    });

    // Relay Switch B (Target that NEVER executes due to short-circuit)
    const switchB = world.spawnParticle(cx + 120, cy, {
      radius: 22,
      label: 'fn()',
      color: '#64748b',
      glowColor: 'rgba(100, 116, 139, 0.3)',
      antigravityCharge: 1.5
    });

    world.addConstraint(switchA, gateNode, { length: 135, stiffness: 0.9, color: 'rgba(244, 63, 94, 0.6)' });
    world.addConstraint(gateNode, switchB, { length: 135, stiffness: 0.1, color: 'rgba(255, 255, 255, 0.1)' });

    // Floating Sparks & Current Tokens
    const tokens = ['0', '""', 'null', '??', '||', 'true', '42'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 3) * 45, cy + 100 + (i % 2) * 30, {
        radius: 12,
        label: t,
        color: t === '??' ? '#00f0ff' : (t === 'true' || t === '42' ? '#10b981' : '#f59e0b'),
        antigravityCharge: 0.5,
        vx: (Math.random() - 0.5) * 3,
        vy: -1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
    ctx.fillText('⚡ SHORT-CIRCUIT CUTOFF: false && fn() ➔ fn() never evaluated or energized', 16, world.height - 18);
    ctx.restore();
  }
}
