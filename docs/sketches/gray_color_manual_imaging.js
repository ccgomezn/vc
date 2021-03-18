function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  image(img, 0, 0, 512, 512);
  loadPixels();
  for (let y = 0; y < 512; y++) {
      for (let x = 0; x < 512; x++) {
        let index = (x + y * width)*4;
        let r = pixels[index+0];
        let g = pixels[index+1];
        let b = pixels[index+2];
        
        let gray = r *.299 + g *.587 + b *.0114;
        
        pixels[index+0] = gray;
        pixels[index+1] = gray;
        pixels[index+2] = gray;
    }
  }
  updatePixels();
}
