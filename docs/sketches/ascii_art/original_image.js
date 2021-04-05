// const IMAGE_LOCATION = "/vc/docs/sketches/assets/formal_wolf.jpg";
const IMAGE_LOCATION = "/vc/docs/sketches/lenna.png";

let img;

function preload() {
  img = loadImage(IMAGE_LOCATION);
}

function setup() {
  createCanvas(512, 512);
  noLoop();
}

function draw() {
  image(img, 0, 0, width, height);
}
