const fs = require('fs');
const path = require("path");

// ==============================================

const build = () => {

  const product_rows = ['a', 'b'];

  const output = `
<svg class="svg-sprite" width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">

  ${product_rows.join('\r\n')}

</svg>
`;

  console.blue('Writing .svg...');
  const write_path = path.join(__dirname, "dist");
  if (!fs.existsSync(write_path))
    fs.mkdirSync(write_path);

  const file_name = 'sprite-sheet.svg';
  const file_path = path.join(write_path, file_name);
  fs.writeFileSync(file_path, output, err => {
    if (err)  console.err(err);
    else      console.log('file written successfully!')
  });

  console.yellow('Copying file:\t/dist  ->  /dist-copy');
  const copy_file_path = path.join(__dirname, '/dist-copy', file_name);
  fs.copyFile(file_path, copy_file_path, () => {
    console.green('File copied successfully.');
  });
};

// ==============================================

module.exports = build;