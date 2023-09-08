import { canvas, ctx, GRAVITY } from '../util/util.js';

// ==============================================

class Particle {

  static BOUNCE = 0.15;  // reduce particle velocity by BOUNCE % each time it hits the floor

  // --------------------------------------------

  constructor({ pos, vel, rad, color }) {
    this.pos = { x: pos.x, y: pos.y };
    this.vel = { x: vel.x, y: vel.y };
    this.rad = rad;
    this.ttl = 600; // time to live [frames]
    this.color = color;
  }

  // --------------------------------------------

  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // --------------------------------------------

  update() {
    this.ttl--;
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // gravity
    if (this.pos.y + this.rad + this.vel.y <= canvas.height) {
      //console.log('add gravity');
      this.vel.y += GRAVITY * Particle.BOUNCE;
    }
  }

  // --------------------------------------------

  get yb() { return this.pos.y + this.rad; }
  get xr() { return this.pos.x + this.rad; }
  get xl() { return this.pos.x; }
}

// ==============================================

export default Particle;