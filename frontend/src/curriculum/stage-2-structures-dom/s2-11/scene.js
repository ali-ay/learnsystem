import { Scene } from '../../../physics/Scene.js';

/**
 * DOMTreeScene
 * Dedicated Antigravity Scene for Module S2-11: DOM Tree Architecture & Node Types
 */
export default class DOMTreeScene extends Scene {
  constructor() {
    super('DOM Tree: Hierarchy & Node Types');
  }

  init(world) {
    super.init(world);
    world.clear();

    const cx = world.width / 2;
    const cy = world.height / 2;

    // Root Node: Document (Top Center)
    const docRoot = world.spawnParticle(cx, cy - 120, {
      radius: 26,
      label: '#document (9)',
      color: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.9)',
      antigravityCharge: 0.8,
      isPinned: true
    });

    // Level 1: <html> element
    const htmlNode = world.spawnParticle(cx, cy - 50, {
      radius: 22,
      label: '<html> (1)',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      antigravityCharge: 0.6,
      isPinned: true
    });

    world.addConstraint(docRoot, htmlNode, {
      length: 70,
      stiffness: 0.8,
      color: 'rgba(0, 240, 255, 0.4)',
      lineWidth: 3
    });

    // Level 2: <head> and <body>
    const headNode = world.spawnParticle(cx - 100, cy + 20, {
      radius: 18,
      label: '<head>',
      color: '#3b82f6',
      antigravityCharge: 0.5,
      isPinned: true
    });

    const bodyNode = world.spawnParticle(cx + 100, cy + 20, {
      radius: 20,
      label: '<body>',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.8)',
      antigravityCharge: 0.5,
      isPinned: true
    });

    world.addConstraint(htmlNode, headNode, {
      length: 100,
      stiffness: 0.6,
      color: 'rgba(255, 255, 255, 0.2)',
      lineWidth: 2
    });

    world.addConstraint(htmlNode, bodyNode, {
      length: 100,
      stiffness: 0.6,
      color: 'rgba(255, 255, 255, 0.2)',
      lineWidth: 2
    });

    // Leaf Nodes below <body>: Element, Text, Comment
    const divElement = world.spawnParticle(cx + 40, cy + 90, {
      radius: 16,
      label: '<div> (Elem)',
      color: '#10b981',
      antigravityCharge: 0.8,
      vx: 1
    });

    const textNode = world.spawnParticle(cx + 110, cy + 90, {
      radius: 14,
      label: '#text (3)',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.8)',
      antigravityCharge: 0.9,
      vx: -1
    });

    const commentNode = world.spawnParticle(cx + 170, cy + 90, {
      radius: 12,
      label: '<!-- --> (8)',
      color: '#64748b',
      antigravityCharge: 0.4,
      vy: 1
    });

    world.addConstraint(bodyNode, divElement, {
      length: 75,
      stiffness: 0.3,
      color: 'rgba(16, 185, 129, 0.3)',
      lineWidth: 1.5
    });

    world.addConstraint(bodyNode, textNode, {
      length: 75,
      stiffness: 0.3,
      color: 'rgba(236, 72, 153, 0.3)',
      lineWidth: 1.5
    });

    world.addConstraint(bodyNode, commentNode, {
      length: 75,
      stiffness: 0.3,
      color: 'rgba(100, 116, 139, 0.3)',
      lineWidth: 1.5
    });

    // Floating tokens
    const tokens = ['EventTarget', 'DOM Bridge', 'firstElementChild', 'DocumentFragment'];
    tokens.forEach((t, i) => {
      world.spawnParticle(cx - 150 + i * 55, cy + 140, {
        radius: 11,
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
    ctx.fillText('DOM TREE: Inherits from EventTarget ➔ Node ➔ Element | childNodes includes whitespace #text', 16, world.height - 18);
    ctx.restore();
  }
}
