# Radiosity Algorithm

The concept of radiosity was first used in the area of heat transfer to represent how energy radiates out from all surfaces, to greater or lesser degree; currently, it is used in the underdevelopment area of computer graphics to study how light is transferred through particular objects and surfaces. This concept was introduced in the paper "Modeling the Interaction of Light Between Diffuse Surfaces" of Goral et al, in 1984 in order to simulate light transference from diffuse surfaces.

Radiosity algorithm has evolved over the years and now is considered one of the most realistic global illumination models. Radiosity is particularly suited to diffuse environments, and the algorithm is based in object space. This means that the colors of objects are calculated before they are projected onto the screen thus, once the initial calculations have been made, they can be rendered from any point of view using fast hardware rendering techniques.


## The algorithm

In order to define the algorithm, it is necessary to see the general form of the radiosity equation (many of the concepts will not be understood at this point but will be developed during the explanation of the algorithm).


> :Formula align=center
>
> B_i = E_i + p_i\sum_{j=1}^{n}B_jF_{ij}

where {[B_i](:Formula)} is the radiosity of the patch i, {[E_i](:Formula)} is the emission of patch i, {[p_i](:Formula)} is the reflectivity of patch i, {[B_j](:Formula)} is the Radiosity of patch j and {[F_{ij}](:Formula)} is the form factor between patches i and j.

The general form of the Radiosity algorithm is the following:

* Subdivision of areas
* Compute form factors
* Solve radiosities
* Display the scene

### Subdivision of areas

Patches are how area light sources are simulated (all surfaces are viewed as diffuse reflectors and light sources as diffuse emitters). Rather than treating surfaces as large light source areas, we will split them into small light sources to make calculations for each of them; so if the surface is divided enough, we can create high-quality scenes. 

This subdivision can be done in two ways intelligently and naively. Naively subdivision is simple, it is done by defining a shape and size and subdividing surfaces using the same form; the problem with this subdivision is that high contrast areas will not have a proper subdivision, and subdivisions in areas without high contrast will be wasteful.

Intelligently subdivision is done recursively, first, an area is subdivided in a naive way, and the luminance factor or its energy is calculated, now if we detect a big difference between two patches, then we subdivide them in order to reduce that sharp contrast.

These patches are just the first part of the subdivision, patches can be subdivided into elements, in order to have a higher resolution on the image. On the first patch subdivision, the scene is divided with a fixed resolution in mind, then patches are divided into elements as in the intelligent subdivisions with the advantage that the patches and elements are maintained for two different processes, and none of them are discarded.


### Calculation of form factors

Two patches are related in the way that "figure x" shows, the surfaces i and j have two values associated with them, the illumination and the radiative energy. As shown in the general radiosity equation we need to calculate the interaction of energy from every surface to every other surface, which can be calculated by the "form factor" [F_{ij}](:Formula).


> :Formula align=center
>
> F_{ij} = \frac{1}{A_i}\int{A_i}\int{A_j}\frac{cos(\theta_i)cos(\theta_j)}{\pi r^2}dA_jdA_i

Where [A_i](:Formula) is the area of the surface i, [A_j](:Formula) is the area of the surface j, [\theta_i](:Formula) is the angle from [N_i](:Formula) (surface normal of i) to surface j,  [\theta_j](:Formula) is the angle from [N_j](:Formula) (surface normal of j) to surface i, [dA_i](:Formula) is the differential area of surface i, and [dA_j](:Formula) is the differential area of surface j (calculated dividing the transmitting path area by the receiving path area). These integrals can be fully calculated using numerical integration monte carlo methods or the Hemi-Space projection method.


## Distribution Functions

We have talked a lot about the energy emitted and reflected by some patches, but how those values are calculated ? They are modeled by the Bidirectional Reflectance Distribution Function (BRDF) and the Bidirectional Surface Scattering Distribution Function (BSSRDF).

### Bidirectional Reflectance Distribution Function