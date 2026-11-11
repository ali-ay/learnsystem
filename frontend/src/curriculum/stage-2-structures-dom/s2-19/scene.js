import { Scene } from '../../../physics/Scene.js';

/**
 * StorageScene
 * Dedicated Antigravity Scene for Module S2-19: Browser Storage (localStorage, sessionStorage & Cookies)
 */
export default class StorageScene extends Scene {
  constructor() {
    super('Browser Storage: Vault, Session & Cookie');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Left: Heavy Permanent Vault (localStorage ~10MB)
    const localVault = world.spawnParticle(cx - 120, cy - 30, {
      radius: 30,
      label: 'localStorage (Permanent)',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.9)',
      antigravityCharge: 0.3,
      isPinned: true
    });

    const localPayload = world.spawnParticle(cx - 120, cy + 50, {
      radius: 18,
      label: 'JSON string',
      color: '#10b981',
      antigravityCharge: 0.5,
      vx: 1
    });

    world.addConstraint(localVault, localPayload, {
      length: 80,
      stiffness: 0.8,
      color: 'rgba(16, 185, 129, 0.5)',
      lineWidth: 3
    });

    // Right: Transient Plasma Bubble (sessionStorage ~5MB)
    const sessionBubble = world.spawnParticle(cx + 120, cy - 30, {
      radius: 26,
      label: 'sessionStorage (Tab)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.9)',
      antigravityCharge: 1.2,
      isPinned: true
    });

    const sessionPayload = world.spawnParticle(cx + 120, cy + 50, {
      radius: 16,
      label: 'Tab Memory',
      color: '#ec4899',
      antigravityCharge: 1.1,
      vx: -1
    });

    world.addConstraint(sessionBubble, sessionPayload, {
      length: 80,
      stiffness: 0.1,
      color: 'rgba(236, 72, 153, 0.3)',
      lineWidth: 1.5
    });

    // Top Center: Micro 4KB Diplomatic Capsule (Cookie)
    world.spawnParticle(cx, cy - 100, {
      radius: 18,
      label: 'Cookie 4KB (HttpOnly)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.7,
      isPinned: true
    });

    // Floating tokens
    const tokens = ['Synchronous I/O', 'HttpOnly Security', 'SameSite=Strict', 'No JWT in Local'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx + (i - 1.5) * 85, cy + 135, {
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
    ctx.fillText('STORAGE: localStorage persists forever | sessionStorage dies with tab | Cookies (4KB) carry headers', 16, world.height - 18);
    ctx.restore();
  }
}
