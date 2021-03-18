# Image and video processing

## Image filters

> :P5 sketch=/docs/sketches/imaging_top.js, width=768, height=256

### Original Image


> :P5 sketch=/docs/sketches/original_imaging.js, width=512, height=512

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/original_imaging.js, width=512, height=512
```

And the p5 sketch that loads the original image is the following:


```js | original_imaging.js
function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  image(img, 0, 0, 512, 512);
}

```

### Inverse color Image

The process of color inversion has as primary objective transform light areas into dark, and dark areas into light. The mathematic behind this process is the following. Suppose that you have an image in normalized RGB (the values of each channel goes from 0 to 1), then in order to invert the color of the image if the values of the channels are v_red, v_green and v_blue, the values of the inverted will be v_inv_red = 1 - v_red, v_inv_green = 1 - v_green, v_inv_blue = 1 - v_blue. In p5 we can directly use the functionality filter, and apply INVERT in order to have our color inverted.


#### Image using P5 filter functionality


> :P5 sketch=/docs/sketches/inverse_color_imaging.js, width=512, height=512

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/inverse_color_imaging.js, width=512, height=512
```

And the p5 sketch that loads the original image is the following:


```js | inverse_color_imaging.js
function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
  img.filter(INVERT);
}

function draw() {
  image(img, 0, 0, 512, 512);
}

```
#### Image using manual transformation

> :P5 sketch=/docs/sketches/inverse_color_manual_imaging.js, width=512, height=512


The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/inverse_color_manual_imaging.js, width=512, height=512
```

And the p5 sketch that loads the original image is the following:


```js | inverse_color_manual_imaging.js
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
```


### Gray scale Image

The process of gray scale conversion has as primary objective transform the channels of color of the image into only one channel and extract the brightness of the image. The mathematics behind this process is the following. Suppose that you have an image in normalized RGB (the values of each channel goes from 0 to 1), then using the NTSC conversion formula we can create only one color channel that has the following intensity intensity = 0.2989 * red + 0.5870 * green + 0.1140*blue, that intensity will determined the intensity of luminance of each pixel. In p5 we can directly use the functionality filter, and apply GRAY.

#### Image using P5 filter functionality

> :P5 sketch=/docs/sketches/gray_color_imaging.js, width=512, height=512

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/gray_color_imaging.js, width=512, height=512
```

And the p5 sketch that loads the original image is the following:


```js | gray_color_imaging.js
function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
}

function setup() {
  createCanvas(512, 512);
  img.filter(GRAY);
}

function draw() {
  image(img, 0, 0, 512, 512);
}

```

#### Image using manual transformation

> :P5 sketch=/docs/sketches/gray_color_manual_imaging.js, width=512, height=512

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/gray_color_manual_imaging.js, width=512, height=512
```

And the p5 sketch that loads the original image is the following:


```js | gray_color_manual_imaging.js
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
    
    let gray = r *.299 + g *.587 + b *.0114;
    
    pixels[i*4] = gray;
    pixels[i*4+1] = gray;
    pixels[i*4+2] = gray;
  }
  updatePixels();
}
```

> :ToCPrevNext