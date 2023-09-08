// Getting a random number between two values
const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

// ==============================================

// Getting a random integer between two values [exclusive max]
const getRandomIntExcusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// ==============================================

// Getting a random integer between two values [inclusive max]
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

// ==============================================

const getRandomColor = () => {
  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
};

// ==============================================

export {
  getRandom,
  getRandomIntExcusive,
  getRandomInt,
  getRandomColor
};