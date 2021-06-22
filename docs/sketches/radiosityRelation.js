function preload() {
  img = loadImage('/vc/docs/sketches/radiosity.png');
}

function setup() {
  createCanvas(300, 200);
}

function draw() {
  image(img, 0, 0, 300, 200);
}
