let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/lenna50x50.png');
}

function setup() {
  createCanvas(512, 512);
  
}

function draw() {
  image(img_or, 0, 0, 512, 512);
}
