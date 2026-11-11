import { Scene } from '../../../physics/Scene.js';

/**
 * RenderPipelineScene
 * Dedicated Antigravity Scene for Module S5-03: Layout, Paint & Composite
 */
export default class RenderPipelineScene extends Scene {
  constructor() {
    super('Render Pipeline: Layout ➔ Paint ➔ GPU Composite');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Stage 1: Layout / Reflow (Heavy, slow, high friction)
    const layoutNode = world.spawnParticle(cx - 120, cy, {
      radius: 30,
      label: 'Layout (Reflow)',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.9)',
      isPinned: true
    });

    // Stage 2: Paint (Medium cost)
    const paintNode = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'Paint (Raster)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      isPinned: true
    });
    world.addSpring(layoutNode, paintNode, { restLength: 120, stiffness: 0.15 });

    // Stage 3: GPU Composite (Ultra-light, frictionless, 60/120 FPS)
    const compositeNode = world.spawnParticle(cx + 120, cy, {
      radius: 28,
      label: 'GPU Composite',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });
    world.addSpring(paintNode, compositeNode, { restLength: 120, stiffness: 0.15 });

    // Gliding GPU Particle (transform / opacity)
    const gpuGlider = world.spawnParticle(cx + 120, cy - 80, {
      radius: 16,
      label: 'transform: 120 FPS',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.9
    });
    world.addSpring(compositeNode, gpuGlider, { restLength: 80, stiffness: 0.25 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Layout (expensive geometry) ➔ Paint (pixels) ➔ Composite (GPU layers)', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('CSS transform and opacity bypass Layout and Paint completely for pure 60/120 FPS', cx, 40);

    ctx.restore();
  }
}
