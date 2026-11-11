import { Scene } from '../../../physics/Scene.js';

/**
 * DOMStyleClassScene
 * Dedicated Antigravity Scene for Module S2-15: classList, getComputedStyle & CSS Variables
 */
export default class DOMStyleClassScene extends Scene {
  constructor() {
    super('classList Badges & CSS Variables Prism');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Top: CSS Variable Prism Core
    const varPrism = world.spawnParticle(cx, cy - 110, {
      radius: 26,
      label: 'var(--accent)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Center: Card Chassis (Target Element)
    const cardChassis = world.spawnParticle(cx, cy, {
      radius: 30,
      label: 'DOM .card',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    world.addConstraint(varPrism, cardChassis, {
      length: 110,
      stiffness: 0.2,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 2
    });

    // classList Badge Satellites: .levitating, .glow, .active
    const badges = [
      { label: '.levitate', color: '#10b981' },
      { label: '.border-glow', color: '#f59e0b' },
      { label: '.active', color: '#ec4899' }
    ];

    badges.forEach((b, i) => {
      const angle = -Math.PI / 2 + ((i + 1) * Math.PI) / 2;
      const dist = 90;
      const bp = world.spawnParticle(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, {
        radius: 17,
        label: b.label,
        color: b.color,
        glowColor: `${b.color}99`,
        antigravityCharge: 0.8,
        vx: -Math.sin(angle) * 1.5,
        vy: Math.cos(angle) * 1.5
      });

      world.addConstraint(cardChassis, bp, {
        length: dist,
        stiffness: 0.3,
        color: `${b.color}44`,
        lineWidth: 2
      });
    });

    // Bottom Scanner: getComputedStyle (Reads computed pixels)
    world.spawnParticle(cx, cy + 120, {
      radius: 22,
      label: 'getComputedStyle()',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.8)',
      isPinned: true
    });

    // Floating tokens
    const tokens = ['classList.toggle()', 'setProperty(--var)', 'classList.replace()', 'No className wipe'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 150, {
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
    ctx.fillText('CLASSLIST: Token safe manipulation | getComputedStyle reads final rendered pixels | setProperty updates theme', 16, world.height - 18);
    ctx.restore();
  }
}
