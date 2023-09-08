import { canvas, ctx, loadImg } from "./util/util.js";
import newHero from './entities/Hero.js';
import { newEnemy } from './entities/Enemy.js';
import newPlatform from './entities/Platform.js';
import Generic from './entities/Generic.js';

// ==========================================

let hero;
let enemies = [];
let platforms = [];
let particles = [];
let generics = [];

// ==========================================

const reset = async () => {

  // const hero_img = await loadImg('hero.svg');
  const platform_img = await loadImg('platform.svg');
  const background_img = await loadImg('background.png');

  const { ENEMY, PLATFORM } = (() => {
    const ENEMY = { h: 30,         w: 30 };
    const PLATFORM = { h: platform_img.height, w: platform_img.width };
    return { ENEMY, PLATFORM };
  })();

  const floorOffset = y => canvas.height - y - PLATFORM.h; // y is from bottom of screen

  // --------------------------------------------

  hero = newHero({ 
    position: { x: 0, y: 1},
    // image: hero_img,
  });

  // --------------------------------------------

  enemies = [];
  enemies.push(newEnemy({ 
    size: { width: ENEMY.w, height: ENEMY.h },
    position: { x: 0, y: floorOffset(ENEMY.h)},
  }));
  enemies.push(newEnemy({ 
    size: { width: ENEMY.w, height: ENEMY.h },
    position: { x: 60, y: floorOffset(ENEMY.h)},
  }));
  enemies.push(newEnemy({ 
    size: { width: ENEMY.w, height: ENEMY.h },
    position: { x: 120, y: floorOffset(ENEMY.h)},
  }));

  // --------------------------------------------

  platforms = [];
  platforms.push(newPlatform({ 
    color: 'black',
    position: { x: 0, y: floorOffset(0)},
    image: platform_img,
  }));
  platforms.push(newPlatform({ 
    color: 'black',
    position: { x: 175, y: floorOffset(60)},
    image: platform_img,
  }));

  // --------------------------------------------

  generics = [
    new Generic({ x: -1, y: -1, image: background_img }),
    // new Generic({ x: 0, y: 0, image: hills_img }),
  ];

  // --------------------------------------------

  particles = [];
};
await reset(); // top level await! 🤯

// ==========================================

const reset_button = document.querySelector('#reset-button');
reset_button.addEventListener('click', () => reset());
reset_button.addEventListener('touchstart', () => reset());

// ==========================================

function animate(t1) {
  requestAnimationFrame(animate);

  // Refresh:
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update:
  generics.forEach( obj => { obj.update(); obj.velocity.x = 0; } );

  particles.forEach( particle => particle.update() );
  
  enemies.forEach((enemy) => {
    enemy.update(0, 0);
  });

  platforms.forEach((platform) => {
    platform.update(0, 0);
  });

  hero.update(platforms, enemies, particles, reset);
}
animate();