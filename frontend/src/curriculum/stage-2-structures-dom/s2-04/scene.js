import { Scene } from '../../../physics/Scene.js';

/**
 * FunctionalPipelineScene
 * Dedicated Antigravity Scene for Module S2-04: Functional Iterations (filter -> map -> reduce)
 */
export default class FunctionalPipelineScene extends Scene {
  constructor() {
    super('Functional Pipeline: Filter, Map & Reduce');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Stage 1: Filter Sieve Gate (Top)
    const filterGate = world.spawnParticle(cx, cy - 100, {
      radius: 22,
      label: 'filter(fn)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Stage 2: Map Transformer Core (Middle)
    const mapCore = world.spawnParticle(cx, cy - 10, {
      radius: 24,
      label: 'map(x => x*2)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    world.addConstraint(filterGate, mapCore, {
      length: 90,
      stiffness: 0.2,
      color: 'rgba(139, 92, 246, 0.3)',
      lineWidth: 2
    });

    // Stage 3: Reduce Fusion Furnace (Bottom)
    const reduceFurnace = world.spawnParticle(cx, cy + 90, {
      radius: 30,
      label: 'reduce(acc, cur)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.9,
      isPinned: true
    });

    world.addConstraint(mapCore, reduceFurnace, {
      length: 100,
      stiffness: 0.2,
      color: 'rgba(245, 158, 11, 0.3)',
      lineWidth: 2
    });

    // Flowing Data Particles cascading down the pipeline
    const inputValues = [1, 2, 3, 4, 5];
    inputValues.forEach((val, i) => {
      world.spawnParticle(cx + (i - 2) * 50, cy - 150, {
        radius: 14,
        label: `${val}`,
        color: val % 2 === 0 ? '#00f0ff' : '#ec4899',
        antigravityCharge: 0.3,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.5
      });
    });

    // flatMap satellite
    world.spawnParticle(cx + 120, cy + 20, {
      radius: 18,
      label: 'flatMap()',
      color: '#06b6d4',
      antigravityCharge: 0.7,
      vx: -0.5,
      vy: 1
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.fillText('PIPELINE: filter() selects ➔ map() transforms ➔ reduce() accumulates into single value', 16, world.height - 18);
    ctx.restore();
  }
}
