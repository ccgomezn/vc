function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  image(img, 0, 0, 512, 512);
  loadPixels();
  let d = pixelDensity();
  let fullImage = (width * d) * (height * d);
  for(let i=0; i < fullImage; i++){
    let r = pixels[i*4];
    let g = pixels[i*4+1];
    let b = pixels[i*4+2];

    pixels[i*4] = 255-r;
    pixels[i*4+1] = 255-g;
    pixels[i*4+2] = 255-b;
  }
  updatePixels();
}
