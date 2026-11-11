import { Scene } from '../../../physics/Scene.js';

/**
 * Canvas2DVectorScene
 * Dedicated Antigravity Scene for Module S5-10: Canvas 2D API & Vector Rendering
 */
export default class Canvas2DVectorScene extends Scene {
  constructor() {
    super('Canvas 2D Engine: Immediate Mode Matrix & Particle Trails');
    this.rotAngle = 0;
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Canvas Matrix Core
    const matrixCore = world.spawnParticle(cx, cy, {
      radius: 32,
      label: 'Canvas 2D Core',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Orbital Vector Node 1: ctx.save()
    const p1 = world.spawnParticle(cx - 90, cy - 70, {
      radius: 18,
      label: 'ctx.save()',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(matrixCore, p1, { restLength: 85, stiffness: 0.2 });

    // Orbital Vector Node 2: beginPath()
    const p2 = world.spawnParticle(cx + 90, cy - 70, {
      radius: 18,
      label: 'beginPath()',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(matrixCore, p2, { restLength: 85, stiffness: 0.2 });

    // Orbital Vector Node 3: ctx.restore()
    const p3 = world.spawnParticle(cx, cy + 90, {
      radius: 18,
      label: 'ctx.restore()',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.8
    });
    world.addSpring(matrixCore, p3, { restLength: 85, stiffness: 0.2 });
  }

  update(dt, world) {
    super.update(dt, world);
    this.rotAngle += dt * 2;
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    const cy = world.height / 2;

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Canvas 2D operates in Immediate Mode: pixels are drawn and forgotten', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Zero DOM node overhead delivers ultra-fast 60/120 FPS physics and particle simulations', cx, 40);

    // Decorative geometric vector crosshair
    ctx.beginPath();
    ctx.arc(cx, cy, 60, this.rotAngle, this.rotAngle + Math.PI);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
