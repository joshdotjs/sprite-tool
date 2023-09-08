const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// ==========================================

const GRAVITY = 0.5;

// ==========================================

// remove from array
const kill = (entities, idx) => setTimeout(() => entities.splice(idx, 1), 0);

// ==============================================

const loadImg = (str) => {

  return new Promise((resolve) => {
    const image = new Image();
    // -We reference properties on the image object
    // -The loading of the image takes time, 
    //  so we need to wait for it to finish before we can use it.

    image.onload = () => resolve(image);
    // image.src = `/_assets/img/sprites/${str}`;
    image.src = `./dist/${str}`;
  });
};

// ==============================================

export { 
  canvas, ctx, 
  GRAVITY, 
  kill, loadImg 
};