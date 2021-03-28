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
  for (let i = 0; i < fullImage; i++) {
    let r = pixels[i*4];
    let g = pixels[i*4+1];
    let b = pixels[i*4+2];
    
    let gray = r *0.2126 + g *0.7152 + b *0.0722;
    
    pixels[i*4] = gray;
    pixels[i*4+1] = gray;
    pixels[i*4+2] = gray;
  }
  updatePixels();
}
