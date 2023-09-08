import { ctx } from "../util/util.js";

// ==============================================
// ==============================================
// ==============================================
// ==============================================

export default class GenericObject {

  // ============================================

  constructor({x, y, image}) {
    this.position = { x, y };

    this.velocity = { x: 0 };

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  // ============================================

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  // ============================================

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }

  // ============================================
}
