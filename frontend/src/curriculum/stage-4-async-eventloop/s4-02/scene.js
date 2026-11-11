import { Scene } from '../../../physics/Scene.js';

/**
 * EventLoopWheelScene
 * Dedicated Antigravity Scene for Module S4-02: Event Loop Wheel & Queues
 */
export default class EventLoopWheelScene extends Scene {
  constructor() {
    super('Event Loop Wheel: Call Stack, Web APIs, Micro & Macro Queues');
    this.angle = 0;
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Central Wheel Hub (The Event Loop Monitor)
    const loopHub = world.spawnParticle(cx, cy, {
      radius: 30,
      label: 'Event Loop',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      isPinned: true
    });

    // 1. Call Stack (Top)
    const callStack = world.spawnParticle(cx, cy - 110, {
      radius: 24,
      label: 'Call Stack',
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.8)',
      isPinned: true
    });
    world.addSpring(callStack, loopHub, { restLength: 110, stiffness: 0.15 });

    // 2. Web APIs (Right)
    const webApis = world.spawnParticle(cx + 120, cy, {
      radius: 22,
      label: 'Web APIs',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      isPinned: true
    });
    world.addSpring(webApis, loopHub, { restLength: 120, stiffness: 0.15 });

    // 3. Macrotask Queue (Bottom)
    const macroQueue = world.spawnParticle(cx, cy + 105, {
      radius: 22,
      label: 'Macrotask [1 at a time]',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      isPinned: true
    });
    world.addSpring(macroQueue, loopHub, { restLength: 105, stiffness: 0.15 });

    // 4. Microtask Queue (Left - VIP High Priority)
    const microQueue = world.spawnParticle(cx - 120, cy, {
      radius: 24,
      label: 'Microtask [VIP Drain]',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.9)',
      isPinned: true
    });
    world.addSpring(microQueue, loopHub, { restLength: 120, stiffness: 0.15 });

    // Orbiting Task Packet
    const activePacket = world.spawnParticle(cx - 60, cy - 60, {
      radius: 12,
      label: 'Tick Item',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 0.7
    });
    world.addSpring(activePacket, loopHub, { restLength: 75, stiffness: 0.2 });
  }

  update(dt, world) {
    super.update(dt, world);
    this.angle += dt * 1.5;
  }

  render(ctx, world) {
    ctx.save();
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';

    const cx = world.width / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Event Loop checks if Call Stack is empty, then drains ALL Microtasks', cx, 25);
    ctx.fillStyle = '#64748b';
    ctx.fillText('Only ONE Macrotask is dispatched per tick before re-checking Microtasks', cx, 40);

    // Draw rotating orbit ring around hub
    ctx.beginPath();
    ctx.arc(cx, world.height / 2, 80, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
  }
}
