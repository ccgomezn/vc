# Image and Video filters

> :P5 sketch=/docs/sketches/imaging_top.js, width=768, height=512

## Original Image and Video


> :P5 sketch=/docs/sketches/original_imaging.js, width=512, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/original_imaging.js, width=512, height=256
```

And the p5 sketch that loads the original image and video is the following:


```js | original_imaging.js
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
}


```

## Inverse color

The process of color inversion has as primary objective transform light areas into dark, and dark areas into light. The mathematic behind this process is the following. Suppose that you have an image in normalized RGB (the values of each channel goes from 0 to 1), then in order to invert the color of the image if the values of the channels are v_red, v_green and v_blue, the values of the inverted will be v_inv_red = 1 - v_red, v_inv_green = 1 - v_green, v_inv_blue = 1 - v_blue. In p5 we can directly use the functionality filter, and apply INVERT in order to have our color inverted.


### Image and video using P5 filter functionality


> :P5 sketch=/docs/sketches/inverse_color_imaging.js, width=512, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/inverse_color_imaging.js, width=512, height=256
```

And the p5 sketch that loads the image and video is the following:


```js | inverse_color_imaging.js
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
  filter(INVERT);
}
```
### Image and video using manual transformation

> :P5 sketch=/docs/sketches/inverse_color_manual_imaging.js, width=512, height=256


The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/inverse_color_manual_imaging.js, width=512, height=256
```

And the p5 sketch that loads the image and video is the following:


```js | inverse_color_manual_imaging.js
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


## Gray scale Image

The grayscale conversion process has as primary objective transform the channels of the color of the image into only one channel and extract the brightness of the picture. The mathematics behind this process is the following. Suppose that you have an image in RGB, then we can use the average of the channels as the value of intensity, or we can use the Luma conversion formula, which is based on how our eyes react to each channel in which the intensity has the following formula, intensity = 0.2126 * red + 0.7152 * green + 0.0.0722*blue, that intensity will determine the intensity of luminance of each pixel. In p5 we can directly use the functionality filter, and apply GRAY.

### Image and video using P5 filter functionality

> :P5 sketch=/docs/sketches/gray_color_imaging.js, width=512, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/gray_color_imaging.js, width=512, height=256
```

And the p5 sketch that loads the image and video is the following:


```js | gray_color_imaging.js
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
  image(video, 256,0,256,256);
  filter(GRAY);
}

```

### Image using manual Luma transformation

> :P5 sketch=/docs/sketches/gray_color_manual_imaging.js, width=512, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/gray_color_manual_imaging.js, width=512, height=256
```

And the p5 sketch that loads the original image is the following:


```js | gray_color_manual_imaging.js
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
```

### Comparison between average gray scale and Luma formula

We will use the following image that has a big difference in illuminance to compare the average grayscale method and Luma.

> :P5 sketch=/docs/sketches/gray_scale_comparison_base.js, width=539, height=360

We have the two processed images, on the upper side we have the one processed using Luma and on the other side the one using the average:

> :P5 sketch=/docs/sketches/gray_scale_ntsc.js, width=539, height=720

We can see that the average processing takes many bright spots as dark zones in the flame and that Luma shows the difference of brightness in a more accurate way, showing why it is better to use Luma against average processing.


## Try the filters with your own camera

Now you can test the inverse and gray scale filters with your own camera.

### Inverse filter with your own image

> :P5 sketch=/docs/sketches/video_inverse.js, width=320, height=240

### Gray scale filter with your own image

> :P5 sketch=/docs/sketches/video_gray.js, width=320, height=240


> :ToCPrevNext