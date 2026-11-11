import { Scene } from '../../../physics/Scene.js';

/**
 * ArrowLexicalThisScene
 * Dedicated Antigravity Scene for Module S3-11: Arrow Functions & Lexical this
 */
export default class ArrowLexicalThisScene extends Scene {
  constructor() {
    super('Lexical this Prism: Enclosing Scope Passthrough');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Outer Enclosing Object Scope
    const hostScope = world.spawnParticle(cx - 70, cy - 30, {
      radius: 36,
      label: 'Enclosing Scope (this)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Arrow Function inside (Prism Core)
    const arrowPrism = world.spawnParticle(cx - 70, cy + 70, {
      radius: 20,
      label: '() => Lexical',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.8)',
      antigravityCharge: 0.6
    });

    // Indestructible lexical link
    world.addSpring(arrowPrism, hostScope, {
      restLength: 100,
      stiffness: 0.2,
      damping: 0.08,
      color: 'rgba(0, 240, 255, 0.8)'
    });

    // Outside Intruder trying to call/bind
    const intruder = world.spawnParticle(cx + 120, cy + 20, {
      radius: 24,
      label: 'call(intruder)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });

    // Deflected beam particle
    const spark = world.spawnParticle(cx + 40, cy + 40, {
      radius: 8,
      label: '403 Reflected',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)'
    });
    world.addSpring(spark, intruder, { restLength: 70, stiffness: 0.1 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Arrow functions do not have their own "this" or prototype', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('External call() and bind() are completely deflected by lexical scoping', cx, 40);

    ctx.restore();
  }
}
