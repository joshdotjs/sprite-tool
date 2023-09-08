const fs = require('fs');
const path = require("path");
require('./console.js');

// ================================================
// ================================================
// ================================================
// ================================================
// ================================================

const build = ({
  num_sprites,
}) => {

  // ==============================================

  const SHIFT = 0.33;
  const HALF_NUM_SPRITES = Math.floor(num_sprites / 2);

  // ==============================================

  const genStandRightSprites = () => {

    let sprites = [];
  
    const genSprite = (i, move_down) => `
      <g class="g-sprite-${i}" transform="translate(${i * 200}, 0)">
        <rect class="svg-background" x="0" width="200" height="100%" fill="transparent" />
    
        <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
        <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />
    
        <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75) ${move_down}" />
        <rect class="body" x="50" y="75" width="100" height="100" fill="blue"    transform="${move_down}"/>
        <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta"  transform="rotate(25, 50, 75)  ${move_down}" />
    
        <circle class="head" cx="100" cy="50" r="50" fill="green" transform="${move_down}" />
      </g>
    `;

    // move down the first half of sprites
    for (let i = 0; i < num_sprites / 2; i++) {
      const move_down = `translate(0, ${i * SHIFT})`;
      const sprite = genSprite(i, move_down);
      sprites.push(sprite);
    }
  
    for (let i = HALF_NUM_SPRITES; i < num_sprites; i++) {
      // const move_down = `translate(0, ${HALF_NUM_SPRITES * SHIFT - (i - HALF_NUM_SPRITES) * SHIFT})`;
      // const move_down = `translate(0, ${SHIFT * (HALF_NUM_SPRITES - (i - HALF_NUM_SPRITES))})`;
      // const move_down = `translate(0, ${SHIFT * (HALF_NUM_SPRITES - i + HALF_NUM_SPRITES)})`;
      const move_down = `translate(0, ${SHIFT * (2 * HALF_NUM_SPRITES - i)})`;
      const sprite = genSprite(i, move_down);
      sprites.push(sprite);
    }
  
    const output = `
      <svg class="svg-sprite"
        width="${num_sprites * 200}" height="200"
        viewBox="0 0 ${num_sprites * 200} 200"
        xmlns="http://www.w3.org/2000/svg"
      >
      
        <rect class="svg-background" width="100%" height="100%" fill="transparent" />
      
        ${sprites.join('\n')}
      
      </svg>
  `;
  return output;
  };

  const stand_right_sprite_sheet = genStandRightSprites();

  // ==============================================

  const genStandLeftSprites = () => {

    let sprites = [];
  
    const genSprite = (i, move_down) => `
      <g class="g-sprite-${i}" transform="translate(${i * 200}, 0)">
        <rect class="svg-background" x="0" width="200" height="100%" fill="transparent" />
    
        <rect class="leg-l" x="50" y="150" width="25" height="50" fill="orange"  />
        <rect class="leg-r" x="125" y="150" width="25" height="50" fill="orange" />
    
        <rect class="arm-l" x="50" y="75" width="25" height="75" fill="magenta"  transform="rotate(25, 50, 75)  ${move_down}" />
        <rect class="body" x="50" y="75" width="100" height="100" fill="blue"    transform="${move_down}"/>
        <rect class="arm-r" x="125" y="75" width="25" height="75" fill="magenta" transform="rotate(-25, 150, 75) ${move_down}" />
    
        <circle class="head" cx="100" cy="50" r="50" fill="green" transform="${move_down}" />
      </g>
    `;

    // move down the first half of sprites
    for (let i = 0; i < num_sprites / 2; i++) {
      const move_down = `translate(0, ${i * SHIFT})`;
      const sprite = genSprite(i, move_down);
      sprites.push(sprite);
    }
  
    for (let i = HALF_NUM_SPRITES; i < num_sprites; i++) {
      // const move_down = `translate(0, ${HALF_NUM_SPRITES * SHIFT - (i - HALF_NUM_SPRITES) * SHIFT})`;
      // const move_down = `translate(0, ${SHIFT * (HALF_NUM_SPRITES - (i - HALF_NUM_SPRITES))})`;
      // const move_down = `translate(0, ${SHIFT * (HALF_NUM_SPRITES - i + HALF_NUM_SPRITES)})`;
      const move_down = `translate(0, ${SHIFT * (2 * HALF_NUM_SPRITES - i)})`;
      const sprite = genSprite(i, move_down);
      sprites.push(sprite);
    }
  
    const output = `
      <svg class="svg-sprite"
        width="${num_sprites * 200}" height="200"
        viewBox="0 0 ${num_sprites * 200} 200"
        xmlns="http://www.w3.org/2000/svg"
      >
      
        <rect class="svg-background" width="100%" height="100%" fill="transparent" />
      
        ${sprites.join('\n')}
      
      </svg>
  `;
  return output;
  };

  const stand_left_sprite_sheet = genStandLeftSprites();

  // ==============================================

  const writeToFile = (file_name, sprite_sheet) => {
    console.magenta('Writing .svg...');
    const write_path = path.join(__dirname, "dist");
    if (!fs.existsSync(write_path))
      fs.mkdirSync(write_path);
  
    // const file_name = 'sprite-sheet.svg';
    const file_path = path.join(write_path, file_name);
    fs.writeFileSync(file_path, sprite_sheet, err => {
      if (err)  console.err(err); // TODO: throw error
    });
    console.blue('file written successfully!'); // NOTE: Why is this not running???
  
    console.yellow('Copying file...');
    // const copy_file_path = path.join(__dirname, '/dist-copy', file_name);
    fs.copyFile(file_path, '/Users/josh/dev/blog/svg/sprite-sheet.svg', () => {
      console.green('File copied successfully.');
    });
    fs.copyFile(file_path, '/Users/josh/dev/blog/_assets/img/sprites/sprite-sheet.svg', () => {
      console.green('File copied successfully.');
    });
  };

  // ==============================================

  writeToFile('sprite-sheet-stand-right.svg', stand_right_sprite_sheet);
  writeToFile('sprite-sheet-stand-left.svg',  stand_left_sprite_sheet);

  // ==============================================

};

// ================================================
// ================================================
// ================================================
// ================================================
// ================================================

module.exports = build;