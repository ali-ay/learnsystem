import { Vector2D } from './Vector2D.js';

/**
 * Verlet Integration Particle with Antigravity capabilities
 */
export class Particle {
  constructor(x, y, options = {}) {
    this.pos = new Vector2D(x, y);
    this.oldPos = new Vector2D(
      options.oldX !== undefined ? options.oldX : x - (options.vx || 0),
      options.oldY !== undefined ? options.oldY : y - (options.vy || 0)
    );
    this.acc = new Vector2D(0, 0);

    this.radius = options.radius || 12;
    this.mass = options.mass || 1;
    this.color = options.color || '#00f0ff';
    this.glowColor = options.glowColor || 'rgba(0, 240, 255, 0.4)';
    this.label = options.label || '';
    
    // Antigravity charge: 
    // 0 = standard neutral physics
    // 1 = complete weightlessness / floats
    // -1 = inverted gravity (floats upwards towards ceiling)
    this.antigravityCharge = options.antigravityCharge !== undefined ? options.antigravityCharge : 0;
    
    this.isPinned = options.isPinned || false;
    this.friction = options.friction !== undefined ? options.friction : 0.985;
    this.restitution = options.restitution !== undefined ? options.restitution : 0.75;
    
    this.lifespan = options.lifespan || null; // null for permanent
    this.age = 0;
    this.isDead = false;
  }

  applyForce(force) {
    if (this.isPinned) return;
    // a = F / m
    this.acc.x += force.x / this.mass;
    this.acc.y += force.y / this.mass;
  }

  update(dt = 1) {
    if (this.isPinned) return;

    if (this.lifespan !== null) {
      this.age += dt;
      if (this.age >= this.lifespan) {
        this.isDead = true;
        return;
      }
    }

    // Verlet integration step
    const vx = (this.pos.x - this.oldPos.x) * this.friction;
    const vy = (this.pos.y - this.oldPos.y) * this.friction;

    this.oldPos.set(this.pos.x, this.pos.y);

    this.pos.x += vx + this.acc.x * dt * dt;
    this.pos.y += vy + this.acc.y * dt * dt;

    // Reset accumulated acceleration
    this.acc.set(0, 0);
  }

  constrainBounds(width, height) {
    if (this.isPinned) return;

    const vx = (this.pos.x - this.oldPos.x) * this.restitution;
    const vy = (this.pos.y - this.oldPos.y) * this.restitution;

    // Left & Right
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.oldPos.x = this.pos.x + vx;
    } else if (this.pos.x > width - this.radius) {
      this.pos.x = width - this.radius;
      this.oldPos.x = this.pos.x + vx;
    }

    // Top & Bottom
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.oldPos.y = this.pos.y + vy;
    } else if (this.pos.y > height - this.radius) {
      this.pos.y = height - this.radius;
      this.oldPos.y = this.pos.y + vy;
    }
  }

  render(ctx) {
    ctx.save();
    
    // Glow effect
    ctx.shadowColor = this.glowColor;
    ctx.shadowBlur = 12;

    // Outer circle
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Subtle inner highlight
    ctx.beginPath();
    ctx.arc(this.pos.x - this.radius * 0.25, this.pos.y - this.radius * 0.25, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();

    // Render Label if exists
    if (this.label) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#080b13';
      ctx.font = `bold ${Math.max(9, Math.floor(this.radius * 0.85))}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.label, this.pos.x, this.pos.y);
    }

    ctx.restore();
  }
}
