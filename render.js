console.log('render.js');
console.log('node version: ', versions.node());
console.log('chrome version: ', versions.chrome());
console.log('electron version: ', versions.electron());

// ==============================================

console.log('OS Home Dir:', os.homeDir());

// ==============================================

const output_path = path.join(os.homeDir(), 'build.js');
console.log('output_path:', output_path);

// ==============================================

const button = document.querySelector('#run-code');
button.addEventListener('click', (e) => {

  e.preventDefault();

  const num_sprites = +document.querySelector('#input-num-sprites')?.value;
  console.log('num_sprites: ', num_sprites);

  if (num_sprites < 2) return;

  console.log('num-sprites: ', +num_sprites);
  console.log('typof num_sprites: ', typeof num_sprites);

  josh.build({
    num_sprites,
  });
});

