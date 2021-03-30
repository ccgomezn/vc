
# Blur filters

This filters has the ability to blur or smooth an image, reducing the image noise and the definition of each detail

## Box Blur

> :Formula align=center
>
> w = 1/9 \begin{pmatrix}
> 1 & 1 & 1 `\\`
> 1 & 1 & 1 `\\` 
> 1 & 1 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the image is transformed.

> :P5 sketch=/docs/sketches/box_blur.js, width=256, height=256

And here the filter applied to a video.

> :P5 sketch=/docs/sketches/box_blur_video.js, width=256, height=256

On the video the blur function works amazing, but on the image we can see duplicated parts of the image.

## Gaussian Blur 3x3

> :Formula align=center
>
> w = 1/16 \begin{pmatrix}
> 1 & 2 & 1 `\\`
> 2 & 4 & 2 `\\` 
> 1 & 2 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the image is transformed.

> :P5 sketch=/docs/sketches/gaussian_blur.js, width=256, height=256

And here the filter applied to a video.

> :P5 sketch=/docs/sketches/gaussian_blur_video.js, width=256, height=256

As we can see with this new matrix the blur is applied to the image, but we cannot detect annoying duplicated sections.

## Gaussian Blur 5x5

> :Formula align=center
>
> w = 1/256 \begin{pmatrix}
> 1 & 4 & 6 & 4 & 1 `\\`
> 4 & 16 & 24 & 16 & 4 `\\` 
> 6 & 24 & 36 & 24 & 6 `\\` 
> 4 & 16 & 24 & 16 & 4 `\\`
> 1 & 4 & 6 & 4 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the image is transformed.

> :P5 sketch=/docs/sketches/gaussian_5_blur.js, width=256, height=256

And here the filter applied to a video.

> :P5 sketch=/docs/sketches/gaussian_5_blur_video.js, width=256, height=256

With the increase of the size of the kernel we can create bigger blurs that perform incredibly well on images and videos.


> :ToCPrevNext