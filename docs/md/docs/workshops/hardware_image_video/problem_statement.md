# Image and video processing

## Propósito

Introducir el análisis de imágenes/video al implementar las siguientes operaciones de análisis para imágenes/video:

## Tareas

Implementar por hardware:

* (imágenes/video) Conversión a escala de grises: promedio _rgb_ y [luma](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages).
* (imágenes/video) Aplicación de algunas [máscaras de convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)).
* Conversión de la imagen a [ascii art](https://en.wikipedia.org/wiki/ASCII_art).

## Entrega

* Emplear esta página para realizar el reporte de la actividad en el formato de [blog-post](/#grading) sugerido.
* Exposiciones en las clase(s) subsiguiente(s). Tiempo: 7m (5m presentación del reporte + 2m preguntas).


## Background


The methods described on the software image, and video processing consume a lot of resources and when they are applied on multiple images or videos, they can crash a system entirely; that's why methods such as processing on GPUs using shaders have gained popularity in the last years. Shaders are computational programmings originally used for shading 3D scenes that run most of the graphics processing units (GPUs) to compute things efficiently as rendering effects.

Shaders are often composed of vertex and fragment shaders; vertex shaders use vertex attributes in order to compute for each vertex, what is its position and color on the screen, while fragment shaders use information such as position, color, and other per-pixel variables, in order to calculate the color that each pixel must have on the screen. Shaders are written to make fast calculations and use parallel processing on GPUs, creating an incredible advance of computer graphical applications.

In the following report you will see how shaders are applied to filter applications, ascii art and kernel methods and learn how to codify those kind of methods using P5.js, and vertex and fragment shaders.


> :ToCPrevNext