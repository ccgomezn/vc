function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  video.hide();
}

function setup() {
  createCanvas(512, 256);
  video.loop();
}

function draw() {
  image(img, 0, 0, 256, 256);
  image(video, 256, 0, 256, 256);
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
