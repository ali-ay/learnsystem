import { Scene } from '../../../physics/Scene.js';

/**
 * ReactiveStateScene
 * Dedicated Antigravity Scene for Module S5-16: Reactive State Engine (track & trigger)
 */
export default class ReactiveStateScene extends Scene {
  constructor() {
    super('Reactivity Engine: track() Subscription & trigger() Pulse');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Reactive State Core (Center)
    const stateCore = world.spawnParticle(cx - 70, cy, {
      radius: 28,
      label: 'reactive(state)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8
    });

    // Dependency Tracker Map (Top)
    const trackerMap = world.spawnParticle(cx, cy - 80, {
      radius: 20,
      label: 'WeakMap(track)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(stateCore, trackerMap, { restLength: 90, stiffness: 0.2 });

    // Subscribed Effect Pylon (Right - UI Render)
    const effectPylon = world.spawnParticle(cx + 80, cy, {
      radius: 28,
      label: 'effect() [UI Render]',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(trackerMap, effectPylon, { restLength: 90, stiffness: 0.2 });

    // Dynamic Trigger Spring between state and effect
    world.addSpring(stateCore, effectPylon, {
      restLength: 150,
      stiffness: 0.15,
      damping: 0.05,
      color: 'rgba(0, 240, 255, 0.8)'
    });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Proxy get() automatically records activeEffect dependencies into a WeakMap', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Proxy set() dispatches trigger() to execute all subscriber effects automatically', cx, 40);

    ctx.restore();
  }
}
