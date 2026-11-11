import { Scene } from '../../../physics/Scene.js';

/**
 * MapSetScene
 * Dedicated Antigravity Scene for Module S2-09: Map (Any-key Hash) & Set (Unique Values)
 */
export default class MapSetScene extends Scene {
  constructor() {
    super('Collections: Map Hash & Set Ring');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left Chamber: Map Key-Value Hash Anchor
    const mapCore = world.spawnParticle(cx - 110, cy - 30, {
      radius: 26,
      label: 'Map (Object Keys)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    const keyObj = world.spawnParticle(cx - 150, cy + 50, {
      radius: 18,
      label: '{ id: 1 } (Key)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      antigravityCharge: 0.6,
      vx: 1
    });

    const valPayload = world.spawnParticle(cx - 70, cy + 50, {
      radius: 18,
      label: '"Commander"',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.6,
      vx: -1
    });

    world.addConstraint(mapCore, keyObj, {
      length: 85,
      stiffness: 0.3,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 2
    });

    world.addConstraint(keyObj, valPayload, {
      length: 80,
      stiffness: 0.5,
      color: 'rgba(139, 92, 246, 0.5)',
      lineWidth: 3
    });

    // Right Chamber: Set Uniqueness Forcefield Ring
    const setCore = world.spawnParticle(cx + 110, cy - 30, {
      radius: 26,
      label: 'Set (O(1) Unique)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Unique members orbiting
    const setMembers = ['"Alpha"', '"Beta"', '"Gamma"'];
    setMembers.forEach((m, i) => {
      const angle = (i / setMembers.length) * Math.PI * 2;
      const p = world.spawnParticle(cx + 110 + Math.cos(angle) * 65, cy - 30 + Math.sin(angle) * 65, {
        radius: 15,
        label: m,
        color: '#f59e0b',
        antigravityCharge: 0.7,
        vx: -Math.sin(angle) * 1.5,
        vy: Math.cos(angle) * 1.5
      });
      world.addConstraint(setCore, p, {
        length: 65,
        stiffness: 0.1,
        color: 'rgba(245, 158, 11, 0.3)',
        lineWidth: 1.5
      });
    });

    // Rejected duplicate bouncing off the Set
    world.spawnParticle(cx + 170, cy + 70, {
      radius: 16,
      label: 'Duplicate ✕',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      antigravityCharge: 1.2,
      vx: 1.5,
      vy: 1
    });

    // Floating tokens
    const tokens = ['O(1) set.has()', 'map.size', 'Any Key Type', 'Set deduplication'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 80, cy + 140, {
        radius: 12,
        label: t,
        color: '#94a3b8',
        antigravityCharge: 0.4,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5
      });
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('MAP accepts objects/any types as keys | SET guarantees unique values with O(1) has() checks', 16, world.height - 18);
    ctx.restore();
  }
}
