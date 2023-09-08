const { contextBridge } = require('electron');
const path = require('path');
const os = require('os');
const build = require('./build');

// ========================================================

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

// ========================================================

contextBridge.exposeInMainWorld('os', {
  homeDir: () => os.homedir(),
});

// ========================================================

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
});

// ========================================================

contextBridge.exposeInMainWorld('josh', {
  build: build,
});
