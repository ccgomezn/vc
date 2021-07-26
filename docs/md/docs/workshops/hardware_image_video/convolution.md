# Kernel (image processing)

Kernel methods have been seen on the software image & video processing, but this kind of methods can be implemented using the multiplication between the image and the kernel on shaders. The idea of the implementation is to take the kernel matrix, locate it on the center of the pixel that we want to transform and apply products element by element between the adjacent pixels of the images and the kernel. The implementation of multiple kernels will be seen in detail on the following pages, but by now you can test your own filters on this section.

> :P5 sketch=/docs/sketches/kernel_hardware.js, width=1000, height=480


## Comparison with Software implementation

When we measure the framerate of both implementations using an edge detection kernel we found an improvement 867% in the frameRate, on the software implementation the value of the frameRate was around 5.84 frames per second, while in the hardware implementation we have 56.49 frames per second on average. Additionally the lag on the software implementation video is completely evident, being impossible to have a fluid image, while in the hardware implementation the fluency is evident.

> :ToCPrevNext