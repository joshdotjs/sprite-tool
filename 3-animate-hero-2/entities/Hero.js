import "../util/debug.js";
import Particle from "./Particle.js";
import { canvas, ctx, GRAVITY, kill, loadImg } from "../util/util.js";
import { getRandom, getRandomInt, getRandomColor } from "../util/rand.js";

// top level await! 🤯
// const image = await loadImg('hero.svg');
// const hero_run_left    = await loadImg('hero-run-left.png');
// const hero_run_left    = await loadImg('sprite-run-left.png');
// const hero_run_right   = await loadImg('hero-run-right.png');
// const hero_run_right   = await loadImg('sprite-run-right.png');

// const hero_jump_left   = await loadImg('hero-jump-left.png');
// const hero_jump_right  = await loadImg('hero-jump-right.png');

// const hero_stand_left  = await loadImg('hero-stand-left.png');
// const hero_stand_left  = await loadImg('sprite-stand-left.png');

// const hero_stand_right = await loadImg('character-groups.png');
// const hero_stand_right = await loadImg('hero-stand-right.png');
// const hero_stand_right = await loadImg('sprite-stand-right.png');


const hero_stand_right = await loadImg('sprite-sheet-stand-right.svg');
const hero_stand_left = await loadImg('sprite-sheet-stand-left.svg');

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export default function newHero({
  position,
  //color='darkorange', // this.color = color;
  //image,
}) {

  // ==============================================
  // =============== Controls =====================
  // ==============================================

  let keys = {};

  // ==============================================

  // disable touch zooming / scrolling:
  const main = document.querySelector('main');
  main.addEventListener('touchstart', e => e.preventDefault() );

  // controls UI:
  const touch_controller_up = document.querySelector('#touch-controller-up');
  const touch_controller_down = document.querySelector('#touch-controller-down');
  const touch_controller_left = document.querySelector('#touch-controller-left');
  const touch_controller_right = document.querySelector('#touch-controller-right');

  // ==============================================

  // controls interface:
  const SPEED = 3;
  const controls = { 
    get x() {
      if (keys['ArrowLeft']  || keys['a'])  return -SPEED;
      if (keys['ArrowRight'] || keys['d'])  return SPEED;
      return 0;
    }, 
    get y() {
      if (keys['ArrowUp']   || keys['w'])  return -SPEED;
      if (keys['ArrowDown'] || keys['s'])  return SPEED;
      return 0;
    }
  };

  // ==============================================
  // ================= Hero =======================
  // ==============================================

  // const [w, h] = [width, height];
  // const [w, h] = [image.width, image.height];
  
  const scale = 0.25;
  const width = 200;
  const height = 200;
  const NUM_SPRITES = 60;
  const [w, h] = [width * scale, height * scale];
  let frame = 0;
  const [crop_w, crop_h] = [width, height];
  const sprites = { // different sprites for each action
    stand: {
      r: hero_stand_right,
      l: hero_stand_left,
    },
    run: {
      r: hero_stand_right,
      l: hero_stand_left,
    },
  };
  let current_sprite = sprites.stand.r;
  const setSprite = (action) => {
    if (action === 'stand | right') current_sprite = sprites.stand.r;
    if (action === 'stand | left')  current_sprite = sprites.stand.l;
    if (action === 'run | right')   current_sprite = sprites.run.r;
    if (action === 'run | left')    current_sprite = sprites.run.l;
  };
  
  // ============================================

  // position
  let pos = {
    x: position?.x ?? canvas.width / 2 - w / 2,
    y: position?.y ?? canvas.height / 2 - h / 2,
    // xr: position?.x + w || canvas.width / 2 - w / 2 + w,
    // yb: position?.x + h || canvas.height / 2 - h / 2 + h,
  };

  // ============================================

  // velocity
  let vel = { x: 0, y: 0 };

  // ============================================

  // jump count
  let jumps = 0;

  const JUMP = 10;
  const MAX_JUMPS = 2;

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  // Collision detection

  const AXRinBXL = (A_xr, B_xl) => A_xr >= B_xl ? true : false;
  const AXLinBXR = (A_xl, B_xr) => A_xl <= B_xr ? true : false;
  const AYBinBYT = (A_yb, B_yt) => A_yb >= B_yt ? true : false;
  const AYTinBYB = (A_yt, B_yb) => A_yt <= B_yb ? true : false;

  // ============================================
  // ============================================
  // ============================================
  // ============================================

  // const update = (x, y) => {

  // ============================================

  const update = (platforms, enemies, particles, reset) => {

    const new_xl = pos.x + vel.x; // left of entity
    const new_xr = new_xl + w;    // right of entity

    const new_yt = pos.y + vel.y; // top of entity
    const new_yb = new_yt + h;    // bottom of entity

    // - - - - - - - - - - - - -
    // - - - Update X: - - - - -
    // - - - - - - - - - - - - -

    pos.x = new_xl;
    vel.x = controls.x;

    // - - - - - - - - - - - - -
    // - - - Update Y: - - - - -
    // - - - - - - - - - - - - -

    // Collision Detection: canvas bottom
    if (new_yb >= canvas.height) {
      pos.y = canvas.height - h;
      vel.y = 0;
      jumps = 0;
    } else {
      pos.y = new_yt;
      vel.y += GRAVITY;
    }

    const heroLandOnTopOf = (object) => (
      new_yb <= object.yt && // above object
      new_yb + vel.y >= object.yt && // hero is moving downwards while above object (landed on top of object)
      AXRinBXL(new_xr, object.xl) && AXLinBXR(new_xl, object.xr) // hero is within enemy's x bounds
    );

    const objectLandOnTopOf = (entity, object) => (
      entity.yb <= object.yt && // entity is above object
      entity.yb + entity.vel.y >= object.yt && // hero is moving downwards while above object (landed on top of object)
      AXRinBXL(entity.xr, object.xl) && AXLinBXR(entity.xl, object.xr) // hero is within enemy's x bounds
    );

    // Collision Detection: land on top of platform
    platforms.forEach((platform) => {

      // hero lands on top of platform
      if (heroLandOnTopOf(platform)) {
        vel.y = 0;
        jumps = 0;
      }

      // particle lands on top of platform 
      particles.forEach((particle, idx) => { // [bounce particles off of platform]
        if (objectLandOnTopOf(particle, platform)) { // particle lands on top of platform
          
          // each time particle hits floor reduce its y velocity by BOUNCE %
          particle.vel.y = -particle.vel.y * (1 - Particle.BOUNCE); 

          // recduce particle radius on each bounce - remove if below min particle radius
          if (particle.rad - 0.3 > 0) {
            particle.rad -= 0.3;
          }
          else kill(particles, idx); // Garbage Collection
        }
        
        // remove particle if has lived longer than ttl frames
        if (particle.ttl < 0) {
          kill(particles, idx); // Garbage Collection
        }

      });

    });

    // Collision Detection: Enemy
    enemies.forEach((enemy, idx) => {
      
      if (heroLandOnTopOf(enemy)) { // -land on top of enemy (kills enemy)
        vel.y = 0;
        jumps = 0;
        
        // bounce hero off of enemy
        vel.y = -JUMP / 2;   

        // spawn particles
        for (let i = 0; i < 100; i++) {
          particles.push( new Particle({ // create particles
            pos: { x: enemy.x_half, y: enemy.yt },
            vel: { 
              x: getRandom(-3, 3),
              y: getRandom(-4, 4)
            },
            rad: getRandomInt(1, 3),
            color: getRandomColor(),
          }) );
        }
        // console.log(particles);

        // kill enemy
        console.green('land on top of enemy (kills enemy)');
        kill(enemies, idx);

      } else if (
        AXRinBXL(new_xr, enemy.xl) && AXLinBXR(new_xl, enemy.xr) && // hero is within enemy's x bounds
        AYBinBYT(new_yb, enemy.yt) && AYTinBYB(new_yt, enemy.yb) // hero is within enemy's y bounds
      ) { // -hit enemy from side (kills hero)
        console.red('hit enemy from side (kills hero)');
        reset();
      }
    });

    // - - - - - - - - - - - - -
    // - -  End Update Y - - - -
    // - - - - - - - - - - - - -

    render();
  };
  
  // ============================================
  // ============================================
  // ============================================
  // ============================================

  function render () {
    // ctx.fillStyle = color;
    // ctx.fillRect(pos.x, pos.y, w, h);
    ctx.drawImage(
      current_sprite, 

      // source pos / size [crop]
      crop_w * frame,    // (sx)  The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context 
      0,                 // (sy) The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context. 
      crop_w,            // (sWidth) The width of the sub-rectangle of the source image to draw into the destination context.
      crop_h,               // (sHeight) The height of the sub-rectangle of the source image to draw into the destination context.

      // dest. pos / size
      pos.x, pos.y,  // (dx, dy)
      w, h           // (dWidth, dHeight)
    );
    frame = (frame + 1) % NUM_SPRITES;
  };

  // ==============================================
  // ========= Controls Event Listeners ===========
  // ==============================================

  // Keyboard Controls:

  document.addEventListener("keydown", (e) => {
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', ' '].indexOf(e.key) >= 0) e.preventDefault();
    keys[e.key] = true;

    if (e.key === 'ArrowLeft') setSprite('run | left');
    if (e.key === 'ArrowRight') setSprite('run | right');
    if (e.key === 'ArrowUp' && jumps < MAX_JUMPS) {
      vel.y = -JUMP;
      jumps++;
    }
  }, false);

  document.addEventListener("keyup", ({ key }) => { 
    keys[key] = false;

    if (key === 'ArrowLeft')  setSprite('stand | left');
    if (key === 'ArrowRight') setSprite('stand | right');

  }, false);

  // ==============================================

  // Touch Controls:
  
  touch_controller_down.addEventListener('touchstart',  ()  =>    keys['ArrowDown']  = true);
  touch_controller_down.addEventListener('touchend',    ()  =>    keys['ArrowDown']  = false);
 
  touch_controller_up.addEventListener('touchend',      ()  =>    keys['ArrowUp']    = false);
  touch_controller_up.addEventListener('touchstart',    ()  =>  { keys['ArrowUp']    = true;
    if (jumps < MAX_JUMPS) {
      vel.y = -JUMP;
      jumps++;
    }
  });

  touch_controller_left.addEventListener('touchstart',  ()  =>   { keys['ArrowLeft']  = true;   setSprite('run | left');    });
  touch_controller_left.addEventListener('touchend',    ()  =>   { keys['ArrowLeft']  = false;  setSprite('stand | left');  });
  
  touch_controller_right.addEventListener('touchstart', ()  =>   { keys['ArrowRight'] = true;   setSprite('run | right');   });
  touch_controller_right.addEventListener('touchend',   ()  =>   { keys['ArrowRight'] = false;  setSprite('stand | right'); });

  // ============================================

  return ({
    update,
    get xl() { return pos.x; },
    get yt() { return pos.y; },
    get xr() { return pos.x + w; },
    get yb() { return pos.y + h; },
  });
}