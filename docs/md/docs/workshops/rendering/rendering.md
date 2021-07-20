# Rendering

## Propósito

Realizar indagación teórica-práctica de [rendering](https://visualcomputing.github.io/Rendering).

## Tareas

Escoger al menos una de las dos siguientes actividades:

1. Realizar una indagación teórica de algún [algoritmo de visibilidad](https://en.wikipedia.org/wiki/Hidden-surface_determination) o algún método de [iluminación global](https://en.wikipedia.org/wiki/Global_illumination).
2. Visualizar algún algoritmo de computación visual, e.g., image-kernels [acá un ejemplo](https://setosa.io/ev/image-kernels/) o rasterización de un triángulo empleando coordenadas baricéntricas, etc. Nota: se puede emplear la librería [p5.quadrille.js](https://objetos.github.io/p5.quadrille.js/).

## Entrega

* Emplear esta página para realizar el reporte de la actividad en el formato de [blog-post](/#grading) sugerido.
* Antes de las 24h del ~~4/4/21~~.
* Exposiciones en las clase(s) subsiguiente(s). Tiempo: 7m (5m presentación del reporte + 2m preguntas).

## Background


Rendering is the process of generating images from a 2D or 3D model using a computer program, the resulting image will be the render. There are two different categories of rendering; real time rendering and pre rendering; real time rendering is a technique used commonly in interactive graphics and gaming, where images must be created without any kind of delay using dedicated graphic hardware.  Pre rendering is the technique used in environments where speed is not important, and the image calculations are performed using central units rather than dedicated hardware.

In the following report you will see the theory behind the rendering radiosity algorithm and a basic implementation of how barycentric coordinates are used for rasterization methods.

> :ToCPrevNext