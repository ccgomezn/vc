function preload() {
  img = loadImage('/vc/docs/sketches/illumination.jpeg');
  img_avg = loadImage('/vc/docs/sketches/illumination.jpeg');
}

function setup() {
  createCanvas(539, 360*2);
  img.loadPixels();
  let d = pixelDensity();
  let fullImage = (width * d) * (height * d)*2;
  for (let i = 0; i < fullImage; i++) {
    let r = img.pixels[i*4];
    let g = img.pixels[i*4+1];
    let b = img.pixels[i*4+2];
    
    let gray = r *0.2126 + g *0.7152 + b *0.0722;
    
    img.pixels[i*4] = gray;
    img.pixels[i*4+1] = gray;
    img.pixels[i*4+2] = gray;
  }
  img.updatePixels();

  img_avg.loadPixels();
  d = pixelDensity();
  fullImage = (width * d) * (height * d)*2;
  for (let i = 0; i < fullImage; i++) {
    let r = img_avg.pixels[i*4];
    let g = img_avg.pixels[i*4+1];
    let b = img_avg.pixels[i*4+2];
    
    let gray = (r + g + b)/3.0;
    
    img_avg.pixels[i*4] = gray;
    img_avg.pixels[i*4+1] = gray;
    img_avg.pixels[i*4+2] = gray;
  }
  img_avg.updatePixels();
}

function draw() {
  image(img, 0, 0, 539, 360);
  image(img_avg, 0, 360, 539, 360);
}
