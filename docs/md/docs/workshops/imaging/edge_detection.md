
# Edge detection filters

This filters has the purpose of detect edges on the images, and are widely used on machine learning applications, because they help to extract important features of the images. Here we are going to test three different kernels in order to compare them.

For this and the following sections of kernel filters we are going to use the following image (By Michael Plotke - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=24301122)

> :P5 sketch=/docs/sketches/top_conv.js, width=256, height=256


## Basic edge detection matrix

> :Formula align=center
>
> w = \begin{pmatrix}
> 1 & 0 & -1 `\\`
> 0 & 0 & 0 `\\` 
> -1 & 0 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the edge detection extract only the shapes that could be related to edges on the image.

> :P5 sketch=/docs/sketches/first_convolution.js, width=256, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/first_convolution.js, width=256, height=256
```

And the p5 sketch that applies the convolution on the image is the following:


```js | first_convolution.js
let w = [[1, 0, -1], [0, 0, 0], [-1, 0, 1]];
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
```

On the code we create a copy of the image, in order to take it as the base image and create an empty image that will act as the filtered image, then we iterate over the base image and create the convolution pixel by pixel.

And here the filter applied to a video.

> :P5 sketch=/docs/sketches/first_convolution_video.js, width=256, height=256

The markdown of the above sketch looks like:

```md
> :P5 sketch=/docs/sketches/first_convolution_video.js, width=256, height=256
```

And the p5 sketch that applies the convolution on the video is the following:

```js | first_convolution_video.js
let w = [[1, 0, -1], [0, 0, 0], [-1, 0, 1]];
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
      let result = convolution(copy, x, y, w, 3, video.width*d, video.height*d, d);
      let index = (x + y * video.width*d) * 4;
      video.pixels[index + 0] = result[0];
      video.pixels[index + 1] = result[1];
      video.pixels[index + 2] = result[2];
      video.pixels[index + 3] = 255;
    }
  }
  video.updatePixels();

}
```

On the code we load the video and create a copy of the actual frame each time that the draw function is called, then with that copy as ground of truth we alter the current frame of the video with the convolution of the copy and the filter.

With this matrix we can see a soft edge detection that works fine for images but not so well for videos because the movements start to appear fuzzy.

## Fist Laplacian matrix

Laplacian matrices has been used a lot for edge detection because of their incredible properties and results on these tasks.

> :Formula align=center
>
> w = \begin{pmatrix}
> 0 & -1 & 0 `\\`
> -1 & 4 & -1  `\\` 
> 0 & -1 & 0 
> \end{pmatrix}


The result of the filter on an image is the following.

> :P5 sketch=/docs/sketches/second_convolution.js, width=256, height=256

The result of the filter on a video is the following.

> :P5 sketch=/docs/sketches/second_convolution_video.js, width=256, height=256

As we can see the edge detection has improved a lot with this matrix on the image, but it stills a bit fuzzy on the video.

## Second Laplace matrix


> :Formula align=center
>
> w = \begin{pmatrix}
> -1 & -1 & -1 `\\`
> -1 & 8 & -1  `\\` 
> -1 & -1 & -1 
> \end{pmatrix}


The result of the filter on an image is the following.

> :P5 sketch=/docs/sketches/third_convolution.js, width=256, height=256

The result of the filter on a video is the following.

> :P5 sketch=/docs/sketches/third_convolution_video.js, width=256, height=256

This laplacian matrix has the best performance on the video, but on the image it takes many details of the textures as edges, which could affect the detection.


> :ToCPrevNext