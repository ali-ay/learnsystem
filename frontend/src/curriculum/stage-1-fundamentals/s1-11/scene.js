import { Scene } from '../../../physics/Scene.js';

/**
 * BitwiseGateScene
 * Dedicated Antigravity Scene for Module S1-11: Bitwise Operators & 32-Bit Integer Tunnel
 */
export default class BitwiseGateScene extends Scene {
  constructor() {
    super('Bitwise Lojik & 32-Bit Tunnel');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // 4-bit Register Cells (Bit 0, Bit 1, Bit 2, Bit 3)
    const bitLabels = ['1 (2^0)', '2 (2^1)', '4 (2^2)', '8 (2^3)'];
    const colors = ['#00f0ff', '#8b5cf6', '#ec4899', '#f59e0b'];

    const registerNodes = [];
    bitLabels.forEach((label, i) => {
      const node = world.spawnParticle(cx - 150 + i * 100, cy - 60, {
        radius: 20,
        label: label,
        color: colors[i],
        glowColor: `${colors[i]}b3`,
        isPinned: true
      });
      registerNodes.push(node);
    });

    // Connect registers with horizontal bus line
    for (let i = 0; i < registerNodes.length - 1; i++) {
      world.addConstraint(registerNodes[i], registerNodes[i + 1], {
        length: 100,
        stiffness: 0.8,
        color: 'rgba(255, 255, 255, 0.2)',
        lineWidth: 2
      });
    }

    // Logic Gate Nodes: AND (&), OR (|), XOR (^), NOT (~)
    const andGate = world.spawnParticle(cx - 90, cy + 50, {
      radius: 22,
      label: '& (AND)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.9,
      vx: 0.5,
      vy: -0.5
    });

    const orGate = world.spawnParticle(cx + 90, cy + 50, {
      radius: 22,
      label: '| (OR)',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.8)',
      antigravityCharge: 0.9,
      vx: -0.5,
      vy: 0.5
    });

    // Floating shift particles: << 1, >> 1, >>> 0
    const shiftTokens = ['<< 1 (*2)', '>> 1 (/2)', '>>> 0 (Uint32)', '~ (NOT)', '| 0 (Trunc)'];
    shiftTokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2) * 70, cy + 130, {
        radius: 14,
        label: t,
        color: '#f8fafc',
        antigravityCharge: 0.6,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.8
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('ToInt32 CONVERSION: Operands truncated to 32-bit signed integers | bitmask flag optimization', 16, world.height - 18);
    ctx.restore();
  }
}
