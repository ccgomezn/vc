let imaging_top;

function preload() {
  img_or = loadImage('/vc/docs/sketches/lenna.png');
  img_gr = loadImage('/vc/docs/sketches/lenna.png');
  img_inv = loadImage('/vc/docs/sketches/lenna.png');
  fingers_or = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  fingers_gr = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  fingers_inv = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  fingers_or.hide();
  fingers_gr.hide();
  fingers_inv.hide();
}

function setup() {
  createCanvas(768, 512);
  img_gr.filter(GRAY)
  img_inv.filter(INVERT)
   

  fingers_or.loop();
  fingers_gr.loop();
  fingers_inv.loop();
}

function draw() {


  image(fingers_gr, 256, 256, 256, 256);
  filter(GRAY);
  image(fingers_inv, 512, 256, 256, 256);
  filter(INVERT);
  image(fingers_or, 0, 256, 256, 256);
  image(img_or, 0, 0, 256, 256);
  image(img_gr, 256, 0, 256, 256);
  image(img_inv, 512, 0, 256, 256);

}