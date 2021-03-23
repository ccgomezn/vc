let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/illumination.jpeg');
}

function setup() {
  createCanvas(539, 360);
}

function draw() {
  image(img_or, 0, 0, 539, 360);
}
