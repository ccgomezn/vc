let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/Vd-Orig.png');
}

function setup() {
  createCanvas(256, 256);
  
}

function draw() {
  image(img_or, 0, 0, 256, 256);
}
