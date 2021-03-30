
# Sharpen filters

This filters has the ability to transform an image into a sharpen one, giving more definition to blur sections and soft edges

> :Formula align=center
>
> w = \begin{pmatrix}
> 0 & -1 & 0 `\\`
> -1 & 5 & -1 `\\` 
> 0 & -1 & 0 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the image is transformed.

> :P5 sketch=/docs/sketches/sharpen.js, width=256, height=256

And here the filter applied to a video.

> :P5 sketch=/docs/sketches/sharpen_video.js, width=256, height=256




> :ToCPrevNext