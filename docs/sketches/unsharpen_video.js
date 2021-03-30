let w = [[-1.0/256, -4.0/256, -6.0/256, -4.0/256, -1.0/256], 
[-4.0/256, -16.0/256, -24.0/256, -16.0/256, -4.0/256], 
[-6.0/256, -24.0/256, 476.0/256, -24.0/256, -6.0/256],
[-4.0/256, -16.0/256, -24.0/256, -16.0/256, -4.0/256], 
[-1.0/256, -4.0/256, -6.0/256, -4.0/256, -1.0/256]];
let video;
let copy;

function preload() {
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  video.hide();
}

function setup() {
  createCanvas(256, 256);
  video.loop();
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
  image(video, 0, 0, 256, 256);
  let copy = createImage(video.width, video.height);
  video.loadPixels();
  let d = pixelDensity();
  for (let i = 0; i < video.pixels.length; i++) {
    copy.pixels[i] = video.pixels[i];
  }

  for (let y = 0; y < video.height*d; y++) {
    for (let x = 0; x < video.width*d; x++) {
      let result = convolution(copy, x, y, w, 5, video.width*d, video.height*d, d);
      let index = (x + y * video.width*d) * 4;
      video.pixels[index + 0] = result[0];
      video.pixels[index + 1] = result[1];
      video.pixels[index + 2] = result[2];
      video.pixels[index + 3] = 255;
    }
  }
  video.updatePixels();

}
