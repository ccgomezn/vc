function preload() {
  img = loadImage('/vc/docs/sketches/cornell.png');
}

function setup() {
  createCanvas(300, 400);
}

function draw() {
  image(img, 0, 0, 300, 400);
}
