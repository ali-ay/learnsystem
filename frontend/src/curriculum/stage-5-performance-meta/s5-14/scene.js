import { Scene } from '../../../physics/Scene.js';

/**
 * ProxyTrapsScene
 * Dedicated Antigravity Scene for Module S5-14: Proxy API & Traps
 */
export default class ProxyTrapsScene extends Scene {
  constructor() {
    super('Proxy Interception Shield: Target Core & Traps (get/set)');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Target Core Object (Inside)
    const targetCore = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'Target Object',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });

    // Proxy Shield Membrane: get() Trap (Top Left)
    const getTrap = world.spawnParticle(cx - 80, cy - 60, {
      radius: 20,
      label: 'get() Trap',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });
    world.addSpring(targetCore, getTrap, { restLength: 80, stiffness: 0.25 });

    // Proxy Shield Membrane: set() Trap (Top Right)
    const setTrap = world.spawnParticle(cx + 80, cy - 60, {
      radius: 20,
      label: 'set() Trap',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      isPinned: true
    });
    world.addSpring(targetCore, setTrap, { restLength: 80, stiffness: 0.25 });

    // Client Interactor (Outside Caller)
    const client = world.spawnParticle(cx, cy + 90, {
      radius: 22,
      label: 'Client Access',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.9)',
      antigravityCharge: 0.7
    });

    // Springs mediating access through the Proxy traps only
    world.addSpring(client, getTrap, { restLength: 100, stiffness: 0.12 });
    world.addSpring(client, setTrap, { restLength: 100, stiffness: 0.12 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Proxy wraps the target object and intercepts all fundamental runtime operations', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Traps (get, set, has, deleteProperty) validate, transform, and trigger reactive workflows', cx, 40);

    ctx.restore();
  }
}
