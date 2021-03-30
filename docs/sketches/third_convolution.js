let w = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
let img;
let copy;

function preload() {
  copy = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(256, 256);
  img = createImage(copy.width, copy.height);
}

function convolution(image, x, y, kernel, size, width, height, d) {
  let rConv = 0;
  let gConv = 0;
  let bConv = 0;
  let offset = floor(size / 2);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {

      let xpos = x + j - offset;
      let ypos = y + i - offset;

      let index = (xpos + image.width * ypos * d) * 4;

      if (!(width <= xpos || height <= ypos || xpos < 0 || ypos < 0)) {
        rConv += image.pixels[index + 0] * kernel[i][j];
        gConv += image.pixels[index + 1] * kernel[i][j];
        bConv += image.pixels[index + 2] * kernel[i][j];
      } 
      
    }
  }
  return [rConv, gConv, bConv];
}

function draw() {
  image(img, 0, 0, 256, 256);
  img.loadPixels();
  copy.loadPixels();
  let d = pixelDensity();

  for (let y = 0; y < img.height*d; y++) {
    for (let x = 0; x < img.width*d; x++) {
      let result = convolution(copy, x, y, w, 3, img.width*d, img.height*d, d);
      let index = (x + y * img.width*d) * 4;
      img.pixels[index + 0] = result[0];
      img.pixels[index + 1] = result[1];
      img.pixels[index + 2] = result[2];
      img.pixels[index + 3] = 255;
    }
  }
  img.updatePixels();

}
