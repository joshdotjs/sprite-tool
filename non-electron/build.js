const fs = require('fs');
const path = require("path");

// ==============================================

const build = () => {

  const output = `
<svg class="svg-sprite"
  width="600" height="200"
  viewBox="0 0 ${5 * 200} 200"
  xmlns="http://www.w3.org/2000/svg"
>

  <rect class="svg-background" width="100%" height="100%" fill="#E7E9EA" />

  <g class="g-sprite-0" transform="translate(${0 * 200}, 0)">
    <rect class="svg-background" x="0" width="200" height="100%" stroke="black" fill="transparent" />

    <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
    <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />

    <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75)" />
    <rect class="body" x="50" y="75" width="100" height="100" fill="blue" />
    <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta" transform="rotate(25, 50, 75)" />

    <circle class="head" cx="100" cy="50" r="50" fill="green" />
  </g>

  <g class="g-sprite-1" transform="translate(${1 * 200}, 0)">
    <rect class="svg-background" x="0" width="200" height="100%" stroke="black" fill="transparent" />

    <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
    <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />

    <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75)" />
    <rect class="body" x="50" y="75" width="100" height="100" fill="blue" />
    <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta" transform="rotate(25, 50, 75)" />

    <circle class="head" cx="100" cy="50" r="50" fill="green" />
  </g>

  <g class="g-sprite-2" transform="translate(${2 * 200}, 0)">
    <rect class="svg-background" x="0" width="200" height="100%" stroke="black" fill="transparent" />

    <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
    <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />

    <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75)" />
    <rect class="body" x="50" y="75" width="100" height="100" fill="blue" />
    <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta" transform="rotate(25, 50, 75)" />

    <circle class="head" cx="100" cy="50" r="50" fill="green" />
  </g>

  <g class="g-sprite-3" transform="translate(${3 * 200}, 0)">
    <rect class="svg-background" x="0" width="200" height="100%" stroke="black" fill="transparent" />

    <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
    <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />

    <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75)" />
    <rect class="body" x="50" y="75" width="100" height="100" fill="blue" />
    <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta" transform="rotate(25, 50, 75)" />

    <circle class="head" cx="100" cy="50" r="50" fill="green" />
  </g>

  <g class="g-sprite-4" transform="translate(${4 * 200}, 0)">
    <rect class="svg-background" x="0" width="200" height="100%" stroke="black" fill="transparent" />

    <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
    <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />

    <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75)" />
    <rect class="body" x="50" y="75" width="100" height="100" fill="blue" />
    <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta" transform="rotate(25, 50, 75)" />

    <circle class="head" cx="100" cy="50" r="50" fill="green" />
  </g>

</svg>
`;

  console.magenta('Writing .svg...');
  const write_path = path.join(__dirname, "dist");
  if (!fs.existsSync(write_path))
    fs.mkdirSync(write_path);

  const file_name = 'sprite-sheet.svg';
  const file_path = path.join(write_path, file_name);
  fs.writeFileSync(file_path, output, err => {
    if (err)  console.err(err); // TODO: throw error
  });
  console.blue('file written successfully!'); // NOTE: Why is this not running???

  console.yellow('Copying file:\t/dist  ->  /dist-copy');
  // const copy_file_path = path.join(__dirname, '/dist-copy', file_name);
  const copy_file_path = '/Users/josh/dev/blog/svg/sprite-sheet.svg';
  fs.copyFile(file_path, copy_file_path, () => {
    console.green('File copied successfully.');
  });
};

// ==============================================

module.exports = build;