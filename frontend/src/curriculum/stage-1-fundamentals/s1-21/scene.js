import { Scene } from '../../../physics/Scene.js';

/**
 * DateClockScene
 * Dedicated Antigravity Scene for Module S1-21: Date, Epoch 1970 & Intl Timezones
 */
export default class DateClockScene extends Scene {
  constructor() {
    super('Epoch 1970 & Intl Chrono Clock');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Epoch 1970 Core Clock
    const epochCore = world.spawnParticle(cx, cy, {
      radius: 28,
      label: '1970 UTC Epoch',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // 0-Indexed Month Orbit (12 clock positions)
    const months = ['0: JAN', '1: FEB', '2: MAR', '3: APR', '4: MAY', '5: JUN', '6: JUL', '7: AUG', '8: SEP', '9: OCT', '10: NOV', '11: DEC'];
    const radius = 110;

    months.forEach((m, i) => {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;

      const p = world.spawnParticle(px, py, {
        radius: i === 0 ? 16 : 12,
        label: m,
        color: i === 0 ? '#f43f5e' : '#8b5cf6',
        glowColor: i === 0 ? 'rgba(244, 63, 94, 0.8)' : undefined,
        antigravityCharge: 0.4,
        vx: -Math.sin(angle) * 1.5,
        vy: Math.cos(angle) * 1.5
      });

      world.addConstraint(epochCore, p, {
        length: radius,
        stiffness: 0.05,
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1
      });
    });

    // Timezone Offset Satellite (UTC Offset)
    const tzSatellite = world.spawnParticle(cx + 140, cy - 80, {
      radius: 18,
      label: 'TZ Offset (ms)',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      antigravityCharge: 1.0,
      vx: 1.2,
      vy: 1
    });

    // Intl Formatter Lens at bottom
    const intlLens = world.spawnParticle(cx, cy + 130, {
      radius: 20,
      label: 'Intl.DateTimeFormat',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      isPinned: true
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.fillText('EPOCH TIMESTAMPS: ms since Jan 1 1970 UTC | 0-indexed months (0 = Jan) | Intl for i18n', 16, world.height - 18);
    ctx.restore();
  }
}
