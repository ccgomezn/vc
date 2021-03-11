let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/lenna.png');
  img_gr = loadImage('/vc/docs/sketches/lenna.png');
  img_inv = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
  img_gr.filter(GRAY);
  img_inv.filter(INVERT);
}

function draw() {
  image(img_or, 0, 0, 256, 256);
  image(img_gr, 256, 0, 256, 256);
  image(img_inv, 128, 256, 256, 256);

}
