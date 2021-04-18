# Problem Statement and Background

## Image and video processing statement

### Propósito

Introducir el análisis de imágenes/video al implementar las siguientes operaciones de análisis para imágenes/video:

### Tareas

Implementar:

* (imágenes/video) Conversión a escala de grises: promedio _rgb_ y [luma](https://en.wikipedia.org/wiki/HSL_and_HSV#Disadvantages).
* (imágenes/video) Aplicación de algunas [máscaras de convolución](https://en.wikipedia.org/wiki/Kernel_(image_processing)).
* (solo para imágenes) Conversión de la imagen a [ascii art](https://en.wikipedia.org/wiki/ASCII_art). Nota: Se puede emplear [p5.quadrille.js](https://objetos.github.io/p5.quadrille.js/).
* (solo para imágenes) Conversión de la imagen a un [foto-mosaico](https://en.wikipedia.org/wiki/Photographic_mosaic).

### Entrega

* Emplear esta página para realizar el reporte de la actividad en el formato de [blog-post](/#grading) sugerido.
* Antes de las 24h del 4/4/21.
* Exposiciones en las clase(s) subsiguiente(s). Tiempo: 7m (5m presentación del reporte + 2m preguntas).

## Background

Methods such as Image filtering, kernel methods, ASCII art, and photomosaics belong to the image and video processing area; this area has gained a lot of importance in the last years because it has been used not only in entertainment but also in security, object detection, self-driving cars, etc. Additionally, programming languages as python, java, or javascript have made these tasks easy and accessible for every programmer.

Image filtering and Kernel methods are widely used in object detection and self-driving vehicles because they can extract certain essential features of videos and images. Suppose that you have an image with a wide variety of colors and shapes, but you want to detect if it has human faces on it, then you can use a grayscale filter to normalize it and don't deal with all the colors and then apply an edge detection filter to extract the morphology of the objects and compare it with the morphology of the faces; these tasks are used in a daily basis to detect intruders for security reasons or detect pedestrians on self-driving cars. These tasks will have been incredibly hard or impossible if computer scientists haven't developed this kind of image processing methods, reinforcing the importance of these techniques for humanity.

Differently, Ascii Art and Photomosaics have been used as art forms for marketing campaigns, web development, or digital arts because these areas explore how to create beautiful visual products in a new and digital way. In the following report, you will see how these methods are formalized and how to implement them using p5.js, to show the ease of implementation and the incredible results that can be obtained.


> :ToCPrevNext