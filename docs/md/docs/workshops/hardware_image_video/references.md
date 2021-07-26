# Conclusions and References

## Conclusions 

* Shaders help optimize complex computational visual tasks such as filters application, ascii art or kernel methods, reducing performance issues on web environments, having an improvement above 196% on the frame rate on every application, having the best improvement in the convolution implementation with 867%.
* With p5.js it is possible to implement easily shader methods using WEBGL.
* It is not possible to use things such as ascii characters on shaders, that's why it is always necessary to use image textures or manage colors pixel by pixel in order to create the illusion of having those kind of elements.
* Having abstract and general shaders is the best approach to implement multiple filters, i.e. instead of having a shader for every kernel method, it is better to create an abstract shader that manage kernel methods and send the specific kernel to that shader for each application.

## Future Work

* As a future work, it is necessary to explore how to implement complex computational visual effects using shaders, such as luminosity algorithms or 3D transformations. 
* GPUs has always help machine learning to process complex images, that's why it could be interested to try to create visual effects on shaders using GAN ML networks.



## References
* [Kernel Processing](https://en.wikipedia.org/wiki/Kernel_(image_processing))
* [Shaders](https://en.wikipedia.org/wiki/Shader)
* [Shaders processing](https://processing.org/tutorials/pshader/)
* [Open GL](https://www.khronos.org/registry/OpenGL-Refpages/)
* [ASCII Art](https://www.shadertoy.com/view/lssGDj)