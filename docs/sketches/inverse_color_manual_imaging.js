function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  image(img, 0, 0, 512, 512);
  loadPixels();
  for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let index = (x + y * width)*4;
        let r = pixels[index+0];
        let g = pixels[index+1];
        let b = pixels[index+2];
                
        pixels[index+0] = 255-r;
        pixels[index+1] = 255-g;
        pixels[index+2] = 255-b;
    }
  }
  updatePixels();
}
