/**
 * Distance Constraint connecting two Verlet particles
 */
export class Constraint {
  constructor(p1, p2, options = {}) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = options.length !== undefined 
      ? options.length 
      : (options.restLength !== undefined ? options.restLength : p1.pos.dist(p2.pos));
    this.stiffness = options.stiffness !== undefined ? options.stiffness : 1.0; // 0 to 1
    this.color = options.color || 'rgba(0, 240, 255, 0.35)';
    this.lineWidth = options.lineWidth || 2;
  }

  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;

    const difference = (this.length - distance) / distance;
    const percent = difference * this.stiffness * 0.5;

    const offsetX = dx * percent;
    const offsetY = dy * percent;

    if (!this.p1.isPinned) {
      this.p1.pos.x -= offsetX;
      this.p1.pos.y -= offsetY;
    }

    if (!this.p2.isPinned) {
      this.p2.pos.x += offsetX;
      this.p2.pos.y += offsetY;
    }
  }

  render(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.p1.pos.x, this.p1.pos.y);
    ctx.lineTo(this.p2.pos.x, this.p2.pos.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.restore();
  }
}
