import { Scene } from '../../../physics/Scene.js';

/**
 * V8ASTScene
 * Dedicated Antigravity Scene for Module B-01: V8 Engine & AST Pipeline
 */
export default class V8ASTScene extends Scene {
  constructor() {
    super('V8 Engine & AST Pipeline');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const startY = 75;

    // Root AST Node (Pinned at top)
    const root = world.spawnParticle(cx, startY, {
      radius: 22,
      label: 'AST',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Scanner / Parser Node
    const parser = world.spawnParticle(cx - 90, startY + 90, {
      radius: 17,
      label: 'Parser',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.6)'
    });

    // Ignition Interpreter Bytecode Node
    const bytecode = world.spawnParticle(cx + 90, startY + 90, {
      radius: 17,
      label: 'Ignition',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.6)'
    });

    // Tokens Node
    const tokens = world.spawnParticle(cx - 130, startY + 180, {
      radius: 14,
      label: 'Tokens',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.6)'
    });

    // TurboFan Optimizing Compiler (Antigravity Charged)
    const turbofan = world.spawnParticle(cx + 130, startY + 180, {
      radius: 16,
      label: 'TurboFan',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 1.2
    });

    // Connect AST Tree with elastic spring constraints
    world.addConstraint(root, parser, { length: 95, stiffness: 0.8, color: 'rgba(0, 240, 255, 0.4)' });
    world.addConstraint(root, bytecode, { length: 95, stiffness: 0.8, color: 'rgba(16, 185, 129, 0.4)' });
    world.addConstraint(parser, tokens, { length: 95, stiffness: 0.7, color: 'rgba(245, 158, 11, 0.4)' });
    world.addConstraint(bytecode, turbofan, { length: 95, stiffness: 0.6, color: 'rgba(236, 72, 153, 0.5)' });

    // Floating JIT bytecode tokens
    const tokenNames = ['let', 'const', 'fn()', 'AST', 'JIT', '0x1F'];
    for (let i = 0; i < tokenNames.length; i++) {
      world.spawnParticle(cx + (Math.random() - 0.5) * 180, startY + 220 + Math.random() * 80, {
        radius: 11,
        label: tokenNames[i],
        color: '#38bdf8',
        antigravityCharge: 0.4 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 2,
        vy: -1
      });
    }
  }

  render(ctx, world) {
    // Custom HUD overlay for V8 Engine Architecture
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    ctx.fillText('PIPELINE: Scanner ➔ Ignition Bytecode ➔ TurboFan Machine Code', 16, world.height - 18);
    ctx.restore();
  }

  dispose(world) {
    super.dispose(world);
  }
}
