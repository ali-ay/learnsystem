import { Scene } from '../../../physics/Scene.js';

/**
 * ObserverSensorsScene
 * Dedicated Antigravity Scene for Module S5-06: IntersectionObserver & ResizeObserver
 */
export default class ObserverSensorsScene extends Scene {
  constructor() {
    super('Observer Sensors: Zero-Reflow Viewport Radar');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Viewport Radar Frame Center
    const viewportRadar = world.spawnParticle(cx, cy, {
      radius: 34,
      label: 'Viewport Radar',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Ingress Target Particle (Lazy Element moving towards Viewport)
    const lazyTarget = world.spawnParticle(cx - 130, cy + 50, {
      radius: 20,
      label: 'Lazy Target',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      antigravityCharge: 0.8
    });

    // Detection Threshold Ring Anchor
    const thresholdBeacon = world.spawnParticle(cx - 50, cy, {
      radius: 14,
      label: 'Threshold 0.1',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });

    world.addSpring(viewportRadar, thresholdBeacon, { restLength: 60, stiffness: 0.2 });
    world.addSpring(thresholdBeacon, lazyTarget, {
      restLength: 90,
      stiffness: 0.12,
      damping: 0.05,
      color: 'rgba(16, 185, 129, 0.7)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    const cy = world.height / 2;

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('IntersectionObserver monitors viewport boundaries in background compositor thread', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Zero scroll event overhead, zero forced synchronous reflows', cx, 40);

    // Draw sensor radar range
    ctx.beginPath();
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }
}
