# Cristhian Camilo Gomez Neira

## Bio
Algorithms Engineer at Voice123 and Systems Engineer and Mathematics student at Universidad Nacional de Colombia. I'm a full-stack developer and algorithms engineer, passionate about different tech and science areas; daily, I look forward to train and improve my tech skills. My most significant characteristic is the ease when I'm learning; I can master many advanced topics in a short time with a lot of passion and hard work. I will always be more than happy to have significant tech challenges and to think and work on new creative ideas that can push technological development—the bigger the tech challenges, the more my commitment and passion.

## Interests
My professional interests are based on areas of mathematical logic and research in data science and artificial intelligence. Every day I tried to research logics related to the computational world or how to mix areas of artificial intelligence and data science with specific logics or model theory. 

## Contributions

I have an article in development based on applying mathematical methods to agriculture measurements, and I'm starting a blog around machine learning, mathematics, and machine learning topics.

## Hobbies

When I have free time, I try to read as much as I can, practice clarinet or saxophone, improve my Russian and German abilities, and play video games.


## Geometrical Optical Illusions 

The following section is based on the paper Geometric–optical illusions and Riemannian geometry by Werner Ehma and Jiri Wackermann by 2016. Geometrical Optical Illusions has been studied for a long time, but there is a special class of Geometrical Illusions originated from the superposition of a simple geometric figure called target with an array of non-intersecting curvilinear elements called context that elicits a perceptual distortion of the target element (figure 1), and Riemannian Geometry could study that. 

> :P5 sketch=/docs/sketches/illusion.js, width=300, height=300

(Figure 1)

In order to have a mathematical model of Riemannian Geometry to study this kind of illusions, we must have the following three conditions:

* The base geometry has to have circle segments as geodesics.
* The perceptual distortions are hypothesized to obey the local interactions principle, particulary, to depend on the intersection angles between the context and the target lines.
* The relevance of geometries derived from immersions of a surface into [R^3](:Formula) appears doubtful considering that our stimulus figures are presented, and seen, on a flat screen.

And these conditions are fulfilled by Poincaré's half-plane model of hyperbolic geometry (PM).

### Poincaré model of the hyperbolic plane

The Poincaré model equips the upper complex half plane [H =](:Formula) { [\epsilon = (\epsilon_1, \epsilon_2) \in R^2, \epsilon_2 > 0](:Formula)  } with the line elements [ds^2 = (d\epsilon_1^2 + d\epsilon_2^2)/\epsilon_2^2](:Formula). All geodesics in the hyperbolic plane are intersection with [H](:Formula) of a Euclidean circle centered on the real axis or an Euclidean line perpendicular to the real axis in [C \cup ](:Formula){[\infty](:Formula)} (figure 2). Circles with center at the origin will serve as the target components, and the context components will be represented using a smooth planar vector field of unit direction [v(\epsilon)](:Formula) ([(|v(\epsilon)| = 1, \epsilon \in \Xi; v \text{ is twice continuous differentiable})](:Formula)) defined on a region [\Xi](:Formula) that contains the target.

> :P5 sketch=/docs/sketches/illusion2.js, width=300, height=300

(Figure 2)


The Poincaré mode requires decomposing the complete figure into the two parts contained in the upper and the lower half planes, respectively. At first, we will consider the upper part, and segments of upper half circles as targets. Given a parameter [\alpha \geq 0](:Formula) (strength of the distortion), the context-perturbed Riemannian geometry in the upper half plane is determined by declaring the length of a curve [x \in H](:Formula)  as

> :Formula align=center
>
> L_{\alpha}(x) = \int_{t_0}^{t_1} \sqrt{\left\langle \dot x(t), H_{\alpha}(x(t)) \dot x(t) \right\rangle} dt,

where [\dot x(t) = (dx_1/dt,dx_2/dt)](:Formula) stands for [dx/dt](:Formula), and [\langle \cdot , \cdot \rangle](:Formula) denote the inner product, and

> :Formula align=center
>
> H_\alpha(\epsilon) = \alpha_2^{-2}G_\alpha(\epsilon) \text{ where } G_\alpha(\epsilon) = I + 2\alpha v(\epsilon)\otimes v(\epsilon)

Formula that when is evaluated explicitly is transformed into.

> :Formula align=center
>
> L_{\alpha}(x) = \int_{t_0}^{t_1} \sqrt{\frac{|\dot{x}(t)|^2 + 2\alpha \langle \dot{x}(t),v(x(t))\rangle^2}{x_2(t)}} dt,

By this formula the context vector field enters [L_\alpha(x)](:Formula) only locally at the curve x; and the term [\langle \dot x(t), v(x(t))\rangle^2](:Formula) penalizes non-orthogonality (for positive α) between the vector field v and the tangents of x. [H_\alpha](:Formula) will denote de geodesics with the same endpoints as the target as [\gamma_\alpha](:Formula), and these will represent the candidates to predict the distortion generated by a visual effect.

### Prediction of the distortion

Let the vector field [v](:Formula) be fixed, and let [\gamma](:Formula) denote the half circle which is supposed to be of radius [r>0](:Formula), with center at the origin.

* Shape of the distortion. Evaluating the half upper circle is possible to create an approximate metric of the distortion in the following way.

> :Formula align=center
>
> \hat{\gamma} \dot= \gamma + \alpha \sigma =: \tilde{\gamma}

Where [\hat{\gamma}](:Formula) is the distortion perceived, [\alpha](:Formula) the effect magnitude and [\sigma](:Formula) is the limit of [(\gamma_\alpha - \gamma)/\alpha](:Formula) as [\alpha \rightarrow 0](:Formula).

* Adding the lower part. If we add the lower part it is possible to generate the same formula for the lower part, so the total distortion [\hat{\gamma} = \hat{\gamma}__ \cup \hat{\gamma}_+].

* Area conservation. Now the general form of distortion for a given parameter [\alpha](:Formula) will be the following.

> :Formula align=center
>
> \hat{\gamma} = k\tilde{\gamma}

Where the scale factor [k \equiv k\alpha > 0](:Formula) is chosen such that the area enclosed by the curve [\hat{\gamma}](:Formula) equals [r^2\pi](:Formula), the area of the target circle.





> :ToCPrevNext