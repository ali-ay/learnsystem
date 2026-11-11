import { Scene } from '../../../physics/Scene.js';

/**
 * RuntimeDivergenceScene
 * Dedicated Antigravity Scene for Module S1-01: JavaScript Runtimes (Browser vs Node/Bun)
 */
export default class RuntimeDivergenceScene extends Scene {
  constructor() {
    super('JavaScript Runtimes: Browser vs Node/Bun');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Core: ECMAScript & V8 Core Engine
    const core = world.spawnParticle(cx, cy, {
      radius: 26,
      label: 'V8 / Core',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      isPinned: true
    });

    // Left Sector: Browser Environment Hub
    const browserHub = world.spawnParticle(cx - 130, cy - 30, {
      radius: 22,
      label: 'Browser',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.7)',
      antigravityCharge: 0.9,
      vx: -1,
      vy: -1
    });

    // Right Sector: Node.js / Bun Environment Hub
    const nodeHub = world.spawnParticle(cx + 130, cy - 30, {
      radius: 22,
      label: 'Node/Bun',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.7)',
      antigravityCharge: 0.2,
      vx: 1,
      vy: 1
    });

    world.addConstraint(core, browserHub, { length: 130, stiffness: 0.5, color: 'rgba(0, 240, 255, 0.35)' });
    world.addConstraint(core, nodeHub, { length: 130, stiffness: 0.5, color: 'rgba(16, 185, 129, 0.35)' });

    // Browser Satellite Satellites (DOM, Window, WebAPIs)
    const browserTokens = ['window', 'DOM', 'fetch', 'Canvas'];
    browserTokens.forEach((t, i) => {
      const angle = (i / browserTokens.length) * Math.PI - Math.PI / 2;
      const p = world.spawnParticle(cx - 130 + Math.cos(angle) * 65, cy - 30 + Math.sin(angle) * 65, {
        radius: 12,
        label: t,
        color: '#38bdf8',
        antigravityCharge: 1.1,
        vx: (Math.random() - 0.5) * 2,
        vy: -1
      });
      world.addConstraint(browserHub, p, { length: 65, stiffness: 0.3, color: 'rgba(56, 189, 248, 0.25)' });
    });

    // Node / Bun Satellites (process, fs, Buffer, libuv)
    const nodeTokens = ['global', 'fs', 'process', 'Buffer'];
    nodeTokens.forEach((t, i) => {
      const angle = (i / nodeTokens.length) * Math.PI - Math.PI / 2;
      const p = world.spawnParticle(cx + 130 + Math.cos(angle) * 65, cy - 30 + Math.sin(angle) * 65, {
        radius: 12,
        label: t,
        color: '#4ade80',
        antigravityCharge: 0.1,
        vx: (Math.random() - 0.5) * 2,
        vy: 1
      });
      world.addConstraint(nodeHub, p, { length: 65, stiffness: 0.3, color: 'rgba(74, 222, 128, 0.25)' });
    });

    // Universal Bridge Node: globalThis
    const universal = world.spawnParticle(cx, cy + 120, {
      radius: 18,
      label: 'globalThis',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.7)',
      antigravityCharge: 0.6
    });
    world.addConstraint(core, universal, { length: 120, stiffness: 0.4, color: 'rgba(245, 158, 11, 0.4)' });
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '600 11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
    ctx.fillText('HOST ENVIRONMENTS: Browser (DOM/Window) ⟷ V8 Core ⟷ Node.js/Bun (OS/fs/libuv)', 16, world.height - 18);
    ctx.restore();
  }
}
