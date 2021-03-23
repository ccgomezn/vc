function preload() {
  img = loadImage('/vc/docs/sketches/illuminance.jpg');
}

function setup() {
  createCanvas(256, 360);
}

function draw() {
  image(img, 0, 0, 256, 360);
  loadPixels();
  let d = pixelDensity();
  let fullImage = (width * d) * (height * d);
  for (let i = 0; i < fullImage; i++) {
    let r = pixels[i*4];
    let g = pixels[i*4+1];
    let b = pixels[i*4+2];
    
    let gray = (r + g + b)/3.0;
    
    pixels[i*4] = gray;
    pixels[i*4+1] = gray;
    pixels[i*4+2] = gray;
  }
  updatePixels();
}
