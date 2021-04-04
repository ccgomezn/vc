# Photographic Mosaic
Is a picture (usually a photograph) that has been divided into (usually equal sized) tiled sections, each of which is replaced with another photograph that matches the target photo, basically swapping one pixel for an image.

the resolution of the image will determine how many images we'll have to use (one per pixel)
for example:

//lenna 512x512

if we have an image that is 512x512 we'll have to use 262144 images, but in this case the images will be very small and could not be appreciated without a good resolution so...

First we have to resize the image that we want to convert into, in order to appreciate the little images that we want to put in
like a resolution of 50x50 

//lenna 50x50

then with an image collection we take the average brightness of each one and clasiffy them into 256 brightness values,
we replace each pixel of our 50x50 image with an image that be equals with the brightness of this pixel and repeat at each pixel 

// Mosaico