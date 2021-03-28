let imaging;

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
  fingers_or.loop();
  fingers_gr.loop();
  fingers_inv.loop();
}

function draw() {
  image(img_or, 0, 0, 256, 256);
  image(img_gr, 256, 0, 256, 256);
  image(img_inv, 512, 0, 256, 256);

  image(fingers_or, 0, 256, 256, 256);
  image(fingers_gr, 256, 256, 256, 256);
  image(fingers_inv, 512, 256, 256, 256);

  fingers_gr.loadPixels();
  d = pixelDensity();
  fullImage = (width * d) * (height * d);
  for(let i=0; i < fullImage; i++){
    let r = fingers_gr.pixels[i*4];
    let g = fingers_gr.pixels[i*4+1];
    let b = fingers_gr.pixels[i*4+2];
    let gray = r *.299 + g *.587 + b *.0114;

    fingers_gr.pixels[i*4] = gray;
    fingers_gr.pixels[i*4+1] = gray;
    fingers_gr.pixels[i*4+2] = gray;
  }
  fingers_gr.updatePixels();

  fingers_inv.loadPixels();
  d = pixelDensity();
  fullImage = (width * d) * (height * d);
  for(let i=0; i < fullImage; i++){
    let r = fingers_inv.pixels[i*4];
    let g = fingers_inv.pixels[i*4+1];
    let b = fingers_inv.pixels[i*4+2];

    fingers_inv.pixels[i*4] = 255-r;
    fingers_inv.pixels[i*4+1] = 255-g;
    fingers_inv.pixels[i*4+2] = 255-b;
  }
  fingers_inv.updatePixels();
}
