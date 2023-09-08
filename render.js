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

josh.build();