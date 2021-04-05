let sclDiv = 100;
let w, h;
let imgAmount = 300;

let brightnessValues = [];
let allImages = [];
let brightImages = [];
let img;
let smaller;

function transform(index) {
  let val = "";
  index = str(index);
  for (let i = 0; i < 4-index.length;i++) {
    val += "0";
  }
  val += index;
  return val;
}

function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  for (i = 0; i < imgAmount; i++) {
    now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
    allImages[i] = loadImage(now);
  }
}

function setup() {
  createCanvas(img.width, img.width);
  scl = width / sclDiv;
  for (let i = 0; i < 256; i++) {
    brightImages.push(i);
  }
  for (let i = 0; i < allImages.length; i++) {
    let image = allImages[i];

    allImages[i] = createImage(scl, scl);
    allImages[i].copy(image, 0, 0, image.width, image.height, 0, 0, scl, scl);
    image.loadPixels();

    let avg = 0;
    for (let j = 0; j < image.height; j++) {
      for (let k = 0; k < image.width; k++) {
        let index = (k + j*image.width);
        let r = image.pixels[index*4];
        let g = image.pixels[index*4+1];
        let b = image.pixels[index*4+2];
        let gray = r *0.2126 + g *0.7152 + b *0.0722;
        avg += gray;
      }
    }

    avg /= image.height*image.width;
    brightnessValues[i] = avg;
  }

  for ( i = 0; i < brightImages.length; i++) {
    let record = 256;
    for ( j = 0; j < brightnessValues.length; j++) {
      let diff = abs(i - brightnessValues[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }


  w = img.width / scl;
  h = img.height / scl;
  smaller = createImage(w, h);
  smaller.copy(img, 0, 0, img.width, img.height, 0, 0, w, h);


}



function draw() {
  background(0);
  smaller.loadPixels();
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let index = x + y * w;
      let r = smaller.pixels[index*4];
      let g = smaller.pixels[index*4+1];
      let b = smaller.pixels[index*4+2];
      let gray = r *0.2126 + g *0.7152 + b *0.0722;
      let imageIndex = floor(gray);
      image(brightImages[imageIndex], x * scl, y * scl, scl, scl);
    }
  }
  noLoop();
}
