// const IMAGE_LOCATION = "/vc/docs/sketches/assets/formal_wolf.jpg";
const IMAGE_LOCATION = "/vc/docs/sketches/lenna.png";
const FONT_LOCATION =
  "/vc/docs/sketches/assets/fonts/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf";

let img;
let font;
let kernel;
let fontSize;
let charWeights;
let characters;
let textGraphics;
let imgSize;
let maxCharWidth;

function preload() {
  img = loadImage(IMAGE_LOCATION);
  font = loadFont(FONT_LOCATION);
  kernel = 5;
  fontSize = 20;
  imgSize = [512, 512];
  characters = [];
  for (const x of Array(95).keys()) {
    characters.push(String.fromCharCode(" ".charCodeAt(0) + x));
  }
  textGraphics = createGraphics(fontSize, fontSize);
}

function setup() {
  createCanvas(imgSize[0], imgSize[1]);
  textFont(font);
  textSize(kernel);
  textAlign(CENTER, CENTER);
  textLeading(0);
  getMaxCharWidth();
  charWeights = GetCharactersIntensity();
  textGraphics.textFont(font);
  textGraphics.textSize(fontSize);
  textGraphics.textLeading(0);
  textGraphics.textAlign(CENTER, CENTER);
  noLoop();
}

function getGrayImage() {
  let graphics = createGraphics(imgSize[0], imgSize[1]);
  img.loadPixels();
  graphics.image(img, 0, 0, imgSize[0], imgSize[1]);
  let gray = graphics.get();
  gray.filter(GRAY);
  gray.loadPixels();
  gray.updatePixels();
  graphics.remove();
  return gray;
}

function draw() {
  const gray = getGrayImage();
  console.log(charWeights);
  const imgWeights = GetImageWeights(gray);
  console.log(imgWeights);
  printAsciiArt(imgWeights);
  textGraphics.remove();
}

function GetCharactersIntensity() {
  let weights = characters.map((c) => GetCharIntensity(c));
  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);
  const range = 255;
  const slope = range / (maxWeight - minWeight);
  const n = -minWeight * slope;
  return weights.map((w) => slope * w + n);
}

function printAsciiArt(imgWeights) {
  imgChars = imgWeights.map((value) => {
    let min = 0;
    let min_dist = Infinity;
    let dist;
    charWeights.forEach((w, idx) => {
      dist = Math.abs(value - w);
      if (dist < min_dist) {
        min = idx;
        min_dist = dist;
      }
    });
    return characters[min];
  });
  imgChars.forEach((c, idx) => {
    const x = (idx % IntegerDivision(imgSize[0], kernel)[0]) * kernel;
    const y =
      IntegerDivision(idx, IntegerDivision(imgSize[1], kernel)[0])[0] * kernel;
    text(c, x, y, kernel, kernel);
  });
}

function GetCharIntensity(character) {
  textGraphics.background(255);
  textGraphics.text(character, 0, 0, fontSize, fontSize);
  let textImg = textGraphics.get(0, 0, fontSize, fontSize);
  textImg.loadPixels();
  return getIntensity(textImg, fontSize, fontSize);
}

function GetImageWeights(img) {
  const weights = [];
  let image;
  for (let y = 0; y <= imgSize[0] - kernel; y += kernel) {
    for (let x = 0; x <= imgSize[1] - kernel; x += kernel) {
      image = img.get(x, y, kernel, kernel);
      weights.push(getIntensity(image, kernel, kernel));
    }
  }
  return weights;
}

function getIntensity(img, width, height) {
  let weight = 0;
  img.loadPixels();
  let avg;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      avg =
        (img.pixels[getPixelPosition(i, j, width, 4)] +
          img.pixels[getPixelPosition(i, j, width, 4) + 1] +
          img.pixels[getPixelPosition(i, j, width, 4) + 2]) /
        3;
      weight += avg;
    }
  }
  weight /= Math.floor(width) * Math.floor(height);
  return weight;
}

function IntegerDivision(a, b) {
  const remainder = a % b;
  const quotient = (a - remainder) / b;
  return [quotient, remainder];
}

function getPixelPosition(x, y, width, pixelSize) {
  return (x * Math.floor(width) + y) * pixelSize;
}

function getMaxCharWidth() {
  maxCharWidth = 0;
  characters.forEach((c) => {
    const tw = textWidth(c);
    if (tw > maxCharWidth) {
      maxCharWidth = tw;
    }
  });
}
