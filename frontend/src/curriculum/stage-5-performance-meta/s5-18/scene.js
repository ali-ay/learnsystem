import { Scene } from '../../../physics/Scene.js';

/**
 * DesignPatternsScene
 * Dedicated Antigravity Scene for Module S5-18: JavaScript Design Patterns (Pub/Sub & Singleton)
 */
export default class DesignPatternsScene extends Scene {
  constructor() {
    super('Architecture Matrix: Pub/Sub Event Bus & Singleton Nexus');
    this.pulse = 0;
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Radio Tower (Pub/Sub Event Bus Broker)
    const eventBus = world.spawnParticle(cx, cy, {
      radius: 34,
      label: 'Pub/Sub Broker',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // Publisher Node (Left)
    const publisher = world.spawnParticle(cx - 130, cy, {
      radius: 22,
      label: 'Publisher',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 0.7
    });
    world.addSpring(publisher, eventBus, {
      restLength: 130,
      stiffness: 0.15,
      color: 'rgba(236, 72, 153, 0.7)'
    });

    // Subscriber 1: UI View
    const subUI = world.spawnParticle(cx + 100, cy - 70, {
      radius: 18,
      label: 'Sub: UI View',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(eventBus, subUI, { restLength: 100, stiffness: 0.18, color: 'rgba(16, 185, 129, 0.7)' });

    // Subscriber 2: Analytics
    const subAnalytics = world.spawnParticle(cx + 120, cy + 20, {
      radius: 18,
      label: 'Sub: Analytics',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.6
    });
    world.addSpring(eventBus, subAnalytics, { restLength: 110, stiffness: 0.18, color: 'rgba(245, 158, 11, 0.7)' });

    // Singleton Nexus (Top)
    const singletonNexus = world.spawnParticle(cx, cy - 110, {
      radius: 20,
      label: 'Singleton Instance',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(eventBus, singletonNexus, { restLength: 110, stiffness: 0.2 });
  }

  update(dt, world) {
    super.update(dt, world);
    this.pulse += dt * 3;
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    const cy = world.height / 2;

    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Pub/Sub decouples publishers from subscribers through an intermediary Event Bus', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Singleton ensures a single immutable shared instance across the entire application', cx, 40);

    // Decorative radiating radio waves from Event Bus
    const waveRadius = 45 + (Math.sin(this.pulse) + 1) * 20;
    ctx.beginPath();
    ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }
}
