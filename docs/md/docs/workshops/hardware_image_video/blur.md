
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

Here you can see the filter applied to an image and a video

> :P5 sketch=/docs/sketches/fifth_conv_hardware.js, width=768, height=393


## Gaussian Blur 3x3

> :Formula align=center
>
> w = 1/16 \begin{pmatrix}
> 1 & 2 & 1 `\\`
> 2 & 4 & 2 `\\` 
> 1 & 2 & 1 
> \end{pmatrix}

Here you can see the filter applied.

> :P5 sketch=/docs/sketches/six_conv_hardware.js, width=768, height=393

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

Here you can see the filter applied.

> :P5 sketch=/docs/sketches/seventh_conv_hardware.js, width=768, height=393

> :ToCPrevNext