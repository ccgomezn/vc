function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
  img.filter(GRAY);
}

function draw() {
  image(img, 0, 0, 512, 512);
}
