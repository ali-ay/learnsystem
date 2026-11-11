import { Scene } from '../../../physics/Scene.js';

export default class CoercionScene extends Scene {
  constructor() {
    super('Type Coercion & Memory Primitives');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Heavy Dense Number Particle
    const numParticle = world.spawnParticle(cx - 100, cy + 80, {
      radius: 26,
      mass: 3.5,
      label: '42',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      antigravityCharge: 0
    });

    // Light Gas-filled String Particle
    const strParticle = world.spawnParticle(cx + 100, cy - 60, {
      radius: 30,
      mass: 0.8,
      label: '"px"',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      antigravityCharge: 1.2
    });

    // Central '+' Fusion Operator
    const opNode = world.spawnParticle(cx, cy, {
      radius: 18,
      mass: 1,
      label: '+',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 0.5
    });

    world.addConstraint(numParticle, opNode, { length: 80, stiffness: 0.7, color: 'rgba(245, 158, 11, 0.5)' });
    world.addConstraint(strParticle, opNode, { length: 80, stiffness: 0.7, color: 'rgba(0, 240, 255, 0.5)' });

    // Resultant Coerced String Balloon
    const resultToken = world.spawnParticle(cx, cy - 140, {
      radius: 36,
      mass: 0.6,
      label: '"42px"',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      antigravityCharge: 1.5,
      vy: -2
    });
    world.addConstraint(opNode, resultToken, { length: 90, stiffness: 0.3, color: 'rgba(139, 92, 246, 0.4)' });

    // Floating Quirks
    const edgeCases = ['[]==![]', 'NaN', 'null', 'typeof', 'Symbol'];
    for (let i = 0; i < edgeCases.length; i++) {
      world.spawnParticle(cx + (i - 2) * 60, cy + 140, {
        radius: 13,
        label: edgeCases[i],
        color: '#10b981',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 2,
        vy: -1
      });
    }
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    ctx.fillText('COERCION REACTION: Number (42) + String ("px") ➔ String ("42px")', 16, world.height - 18);
    ctx.restore();
  }
}
