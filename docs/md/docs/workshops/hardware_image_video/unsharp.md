# Unsharp filters

The Unsharp filters has the objective of create an image less blurred than the original one, they accomplish this objective applying a negative blurred filter to the image, and then merging that filtered image with the original one.

> :Formula align=center
>
> w = -1/256 \begin{pmatrix}
> 1 & 4 & 6 & 4 & 1 `\\`
> 4 & 16 & 24 & 16 & 4 `\\` 
> 6 & 24 & -476 & 24 & 6 `\\` 
> 4 & 16 & 24 & 16 & 4 `\\`
> 1 & 4 & 6 & 4 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image and a video.

> :P5 sketch=/docs/sketches/eigth_conv_hardware.js, width=768, height=393


> :ToCPrevNext