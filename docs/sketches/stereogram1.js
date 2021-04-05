let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/stereogram1.jpeg');
}

function setup() {
  createCanvas(803, 554);
  
}

function draw() {
  image(img_or, 0, 0, 803, 554);
}
