import { Scene } from '../../../physics/Scene.js';

/**
 * EncapsulationVaultScene
 * Dedicated Antigravity Scene for Module S3-15: Private Fields (#) & Accessors
 */
export default class EncapsulationVaultScene extends Scene {
  constructor() {
    super('Hard Private (#) Vault & Getter/Setter Gateway');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Secure Inner Vault (#balance, #secret)
    const vaultCore = world.spawnParticle(cx - 30, cy, {
      radius: 26,
      label: '#balance / #pin',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      isPinned: true
    });

    // Public Facade: Getter / Setter Portal
    const portal = world.spawnParticle(cx + 60, cy, {
      radius: 24,
      label: 'get/set Gateway',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });
    world.addSpring(vaultCore, portal, { restLength: 90, stiffness: 0.25 });

    // Shield Pylons around Vault Core
    const pylonTop = world.spawnParticle(cx - 30, cy - 60, {
      radius: 12,
      label: '#Shield',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });
    const pylonBottom = world.spawnParticle(cx - 30, cy + 60, {
      radius: 12,
      label: '#Shield',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });
    world.addSpring(vaultCore, pylonTop, { restLength: 60, stiffness: 0.3 });
    world.addSpring(vaultCore, pylonBottom, { restLength: 60, stiffness: 0.3 });

    // External Client Interactor
    const client = world.spawnParticle(cx + 140, cy, {
      radius: 20,
      label: 'Client deposit',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.7
    });
    world.addSpring(client, portal, { restLength: 80, stiffness: 0.1 });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('#fields are strictly unreachable outside class body (enforced by V8)', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Access is mediated exclusively through validated getter/setter channels', cx, 40);

    ctx.restore();
  }
}
