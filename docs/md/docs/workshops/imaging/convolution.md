# Kernel (image processing)

The kernel or convolutional matrix process is a mathematical process based on the classical convolutional operation, in which a mask is applied on subsections of the images in order the extract features as vertical or horizontal lines or transform an image to blur it or sharpen it. The following mathematical formula formalizes the kernel process.

> :Formula align=center
>
> ```
> g(x,y) = w * f(x,y) = \sum_{dx=-a}^a \sum_{dy=-b}^b w(dx,dy)f(x+dx,y+dy)
> ```

Where g(x,y)  is the function that returns the pixel (x,y) of the filtered image, f(x,y) is function that returns the pixel (x,y) of the original image, and w is the filter that we want to apply that has size (2*a+1, 2*b)+1. But what does the previous function mean?, let's go through the process with a simple example, suppose that the original image is the following matrix of size 4x4 and the kernel w is of size 3x3.

> :Formula align=center
>
> f = \begin{pmatrix}
> 1 & 2 & 3 & 4 `\\`       
> 5 & 6 & 7 & 8 `\\`
> 9 & 10 & 11 & 12 `\\`  
> 13 & 14 & 15 & 16 
> \end{pmatrix}
> w = \begin{pmatrix}
> 1 & 2 & 3 `\\`
> 4 & 5 & 6 `\\` 
> 7 & 8 & 9 
> \end{pmatrix}

Then if we want to calculate g(2,2), we need to place the matrix w over f and center it on the position (2,2), and then multiply the elements of f that are covered by w elementwise and then add them up , which gives us the following calculation.

> :Formula align=center
>
> ```
> g(2,2) = 1*1 + 2*2 + 3*3 + 4*5 + 5*6 + 6*7 + 7*9 + 8*10 + 9*11 = 348
> ```

But we have a big problem if we want to calculate the value of the position (1,1) of the filtered image, because we can not center the kernel matrix on the position (1,1) or we will end up with values outside f, so the general technique is to add (n-1)/2 rows and columns of zeros around the initial matrix, where n is the size of the kernel. So if we want to calculate g(1,1) we will have the following result.

> :Formula align=center
>
> ```
> g(1,1) = 1*0 + 2*0 + 3*0 + 4*0 + 5*1 + 6*2 + 7*0 + 8*5 + 9*6 = 111
> ```


## Common Kernel filters

### Edge detection filters

This filters has the purpose of detect edges on the images, and are widely used on machine learning applications, because they help to extract important features of the images.

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