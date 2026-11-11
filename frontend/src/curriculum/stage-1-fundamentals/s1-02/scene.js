import { Scene } from '../../../physics/Scene.js';

/**
 * CodeBlockASIScene
 * Dedicated Antigravity Scene for Module S1-02: Code Blocks & ASI (Automatic Semicolon Insertion)
 */
export default class CodeBlockASIScene extends Scene {
  constructor() {
    super('Code Blocks & ASI Gate');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Outer Code Block Frame { ... }
    const leftBracket = world.spawnParticle(cx - 140, cy - 20, {
      radius: 20,
      label: '{',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      isPinned: true
    });

    const rightBracket = world.spawnParticle(cx + 140, cy - 20, {
      radius: 20,
      label: '}',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.7)',
      isPinned: true
    });

    world.addConstraint(leftBracket, rightBracket, {
      length: 280,
      stiffness: 0.1,
      color: 'rgba(139, 92, 246, 0.25)',
      lineWidth: 2
    });

    // The 'return' keyword particle (ascending upwards)
    const returnNode = world.spawnParticle(cx, cy - 80, {
      radius: 22,
      label: 'return',
      color: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.8)',
      antigravityCharge: 1.4,
      vy: -2
    });

    // ASI Semicolon Barrier ';' in between
    const semiColon = world.spawnParticle(cx, cy, {
      radius: 16,
      label: '; (ASI)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });

    // Payload object that gets blocked below due to ASI!
    const payload = world.spawnParticle(cx, cy + 80, {
      radius: 20,
      label: '{ data }',
      color: '#64748b',
      glowColor: 'rgba(100, 116, 139, 0.4)',
      antigravityCharge: 0.1,
      vy: 1
    });

    // Block Boundary Floating tokens
    const blockTokens = ['let', 'const', 'ASI', '// JSDoc', '/* */', 'break'];
    blockTokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 2.5) * 50, cy + 140, {
        radius: 12,
        label: t,
        color: '#00f0ff',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 2,
        vy: -1
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillText('ASI HAZARD: return \\n { data } ➔ V8 inserts ";" immediately returning undefined!', 16, world.height - 18);
    ctx.restore();
  }
}
