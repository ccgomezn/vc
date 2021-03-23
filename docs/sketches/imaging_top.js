let imaging;

function preload() {
  img_or = loadImage('/vc/docs/sketches/lenna.png');
  img_gr = loadImage('/vc/docs/sketches/lenna.png');
  img_inv = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(768, 256);
  img_inv.loadPixels();
  let d = pixelDensity();
  let fullImage = (width * d) * (height * d);
  for(let i=0; i < fullImage; i++){
    let r = img_inv.pixels[i*4];
    let g = img_inv.pixels[i*4+1];
    let b = img_inv.pixels[i*4+2];

    img_inv.pixels[i*4] = 255-r;
    img_inv.pixels[i*4+1] = 255-g;
    img_inv.pixels[i*4+2] = 255-b;
  }
  img_inv.updatePixels();

  img_gr.loadPixels();
  d = pixelDensity();
  fullImage = (width * d) * (height * d);
  for(let i=0; i < fullImage; i++){
    let r = img_gr.pixels[i*4];
    let g = img_gr.pixels[i*4+1];
    let b = img_gr.pixels[i*4+2];
    let gray = r *.299 + g *.587 + b *.0114;

    img_gr.pixels[i*4] = gray;
    img_gr.pixels[i*4+1] = gray;
    img_gr.pixels[i*4+2] = gray;
  }
  img_gr.updatePixels();
}

function draw() {
  image(img_or, 0, 0, 256, 256);
  image(img_gr, 256, 0, 256, 256);
  image(img_inv, 512, 0, 256, 256);
}
