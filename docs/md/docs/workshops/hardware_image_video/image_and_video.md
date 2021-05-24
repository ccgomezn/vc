# Image and Video filters

> :P5 sketch=/docs/sketches/imaging_top.js, width=768, height=512

The process of applying a filter to an image or video can be easily done by using the shaders functionality of P5js, so we can transform videos and images in an optimal way using hardware.

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


> :ToCPrevNext