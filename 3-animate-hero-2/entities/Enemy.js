import { canvas, ctx } from "../util/util.js";

const newEnemy = ({
  size: { width, height }, 
  position,
  color='darkorchid',
}) => {

  // ============================================

  const [w, h] = [width, height];

  // ============================================

  // position
  let pos = { 
    x: position?.x ?? canvas.width / 2 - w / 2,
    y: position?.y ?? canvas.height / 2 - h / 2,
    xr: position?.x + w ?? canvas.width / 2 - w / 2 + w,
    y1: position?.x + h ?? canvas.height / 2 - h / 2 + h,
  };

  // velocity
  let vel = { x: 0, y: 0 };

  // ============================================

  const update = (x, y) => {

    // move X (with wall collision detection)
    vel.x = x;
    const new_x = pos.x + vel.x; // left of entity
    const new_xr = new_x + w;    // right of entity
    if (
      0 <= new_x                 // left-wall
        && new_xr < canvas.width // right-wall
    ) { 
      pos.x = new_x;
    }

    // move Y (with wall collision detection)
    vel.y = y;
    const new_y = pos.y + vel.y; // top of entity
    const new_yb = new_y + h;    // bottom of entity
    if (
      0 <= new_y                  // top-wall
        && new_yb < canvas.height // bottom-wall
    ) { 
      pos.y = new_y;
    }

    render();
  };
  
  // ============================================

  function render () {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, w, h);
  };

  // ============================================

  return ({
    update,
    render,
    get xl() { return pos.x; },
    get xr() { return pos.x + w; },
    get x_half() { return pos.x + w / 2; },

    get yt() { return pos.y; },
    get yb() { return pos.y + h; },
    get w() { return w; },
    get h() { return h; },
  });
}

export { newEnemy };