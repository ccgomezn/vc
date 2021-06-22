# Rasterization using Barycentric coordinates

Rasterization is the task of transforming a vector graphic image (shapes) and converting it into a raster image (a series of pixels that when displayed together creates the final image). When we want to raterize a triangle this task can be fulfilled using a wonderful mathematical method called barycentric coordinates, which are a way of representing the coordinates inside a triangle with masses on the vertices.

The idea behind the rasterization algorithm using barycentric coordinates is to take each point on the screen and calculate its Barycentric coordinate in order to determine if the point is inside the triangle or if it isn't, if it is inside the triangle we determine which color do we want to apply to the point. In order to calculate the barycentric coordinates we have to think on each point [p = (x,y)](:Formula) as [x = \lambda_1x_1 + \lambda_2x_2 + \lambda_3x_3](:Formula) and [y = \lambda_1y_1 + \lambda_2y_2 + \lambda_3y_3](:Formula), where [r_i = (x_i,y_i)](:Formula) is the ith vertex of the triangle, [\lambda_i](:Formula) is the ith Barycentric coordinate and [\lambda_1 + \lambda_2 + \lambda_3 = 1](:Formula).

Now if we replace [\lambda_3](:Formula) with [1 - \lambda_2 - \lambda_1](:Formula) we have,


> :Formula align=center
>
> \lambda_1(x_1-x_3) + \lambda_2(x_2-x_3) + x_3 - x = 0
>
> \lambda_1(y_1-y_3) + \lambda_2(y_2-y_3) + y_3 - y = 0

which can be represented as a linear transformation [T\cdot\lambda = r - r_3](:Formula) where [T = \begin{pmatrix}
x_1 - x_3 & x_2 - x_3 `\\`
y_1 - y_3 & y_2 - y_3  
\end{pmatrix}](:Formula), now [T](:Formula) is an invertible matrix, since [r_1 - r_3](:Formula) and [r_2 - r_3](:Formula) are linearly independent. So we can calculate [\lambda_1, \lambda_2](:Formula) as [\begin{pmatrix}
\lambda_1 `\\`
\lambda_2 
\end{pmatrix} = T^{-1}(r-r_3)](:Formula), then we end up with the following formulas.


> :Formula align=center
>
> \lambda_1= \frac{(y_2-y_3)(x-x_3) + (x_3-x_2)(y-y_3)}{(y_2-y_3)(x_1-x_3) + (x_3-x_2)(y_1-y_3)}
>
> \lambda_2= \frac{(y_3-y_1)(x-x_3) + (x_1-x_3)(y-y_3)}{(y_2-y_3)(x_1-x_3) + (x_3-x_2)(y_1-y_3)}
>
> \lambda_3= 1-\lambda_1-\lambda_2

With those barycentric coordinates we can know if a point is inside the triangle if and only if [0 \leq \lambda_1, \lambda_2 \leq 1](:Formula). The following sketch shows an implementation using shaders of the rasterization using as colors the three Barycentric coordinates as values for each rgb channel.



> :Tabs
> > :Tab title=How It looks
> > 
> > > :P5 sketch=/docs/sketches/barycentric.js, width=512, height=512
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | barycentric.js
> > let barycentricShader;
> > let shaderTexture;
> > let v1 = [0.25, 0.25];
> > let v2 = [0.5, 0.75];
> > let v3 = [0.9, 0.5];
> > let v1y = [0.25, 0.25];
> > let v2y = [0.5, 0.75];
> > let v3y = [1.0, 0.5];
> > function preload() {
> >   barycentricShader = loadShader('/vc/docs/sketches/barycentric.vert', '/vc/docs/sketches/barycentric.frag');
> > }
> > 
> > function setup() {
> >   createCanvas(512, 512, WEBGL);
> >   shaderTexture = createGraphics(512, 512, WEBGL);
> >   shaderTexture.noStroke();
> >   noStroke();
> > }
> > 
> > function matrixMulti(vec, matrix) {
> >   let nVec = [0,0];
> >   for(i = 0; i < 2; i++) {
> >     for (j = 0; j < 2; j++) {
> >       nVec[i] += matrix[i][j]*vec[j]
> >     }
> >   }
> >   return nVec;
> > }
> > 
> > 
> > function draw() {
> >   let rotationMatrix1 = [[0.9998476951563912391570115588139148516927403105831859396583207145,-0.0174524064372835128194189785163161924722527203071396426836124276],[0.0174524064372835128194189785163161924722527203071396426836124276,0.9998476951563912391570115588139148516927403105831859396583207145]];
> > 
> >   v1 = matrixMulti(v1, rotationMatrix1);
> >   v2 = matrixMulti(v2, rotationMatrix1);
> >   v3 = matrixMulti(v3, rotationMatrix1);
> >   v1y[0] -= 0.5;
> >   v2y[0] -= 0.5;
> >   v3y[0] -= 0.5;
> >   v1y[1] -= 0.5;
> >   v2y[1] -= 0.5;
> >   v3y[1] -= 0.5;
> >   v1y = matrixMulti(v1y, rotationMatrix1);
> >   v2y = matrixMulti(v2y, rotationMatrix1);
> >   v3y = matrixMulti(v3y, rotationMatrix1);
> >   v1y[0] += 0.5;
> >   v2y[0] += 0.5;
> >   v3y[0] += 0.5;
> >   v1y[1] += 0.5;
> >   v2y[1] += 0.5;
> >   v3y[1] += 0.5;
> >   shaderTexture.shader(barycentricShader);
> >   barycentricShader.setUniform('A', [min(abs(v1[0]),1.0), min(abs(v1y[1]),1.0)]);
> >   barycentricShader.setUniform('B', [min(abs(v2[0]),1.0), min(abs(v2y[1]),1.0)]);
> >   barycentricShader.setUniform('C', [min(abs(v3[0]),1.0), min(abs(v3y[1]),1.0)]);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,512,512);
> >   rect(-512/2,-512/2.0,512,512)
> > }
> > 
> > 
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | barycentric.vert
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > attribute vec3 aPosition;
> > attribute vec2 aTexCoord;
> > 
> > varying vec2 vTexCoord;
> > 
> > void main() {
> >   vTexCoord = aTexCoord;
> > 
> >   vec4 positionVec4 = vec4(aPosition, 1.0);
> >   positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
> > 
> >   gl_Position = positionVec4;
> > }
> > ```
>
> > :Tab title=Fragment Shader Code
> >
> > 
> > ```glsl | barycentric.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > uniform vec2 A;
> > uniform vec2 B;
> > uniform vec2 C;
> > varying vec2 vTexCoord;
> > 
> > 
> > void main() {
> >   vec2 uv = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> >   vec2 v0 = C - A;
> >   vec2 v1 = B - A;
> >   vec2 v2 = uv - A;
> > 
> >   float dot00 = dot(v0, v0);
> >   float dot01 = dot(v0, v1);
> >   float dot02 = dot(v0, v2);
> >   float dot11 = dot(v1, v1);
> >   float dot12 = dot(v1, v2);
> > 
> >   float det = 1.0 / (dot00 * dot11 - dot01 * dot01);
> >   float u = (dot11 * dot02 - dot01 * dot12) * det;
> >   float v = (dot00 * dot12 - dot01 * dot02) * det;
> > 
> >   if((u >= 0.0) && (v >= 0.0) && (u + v <= 1.0)) {
> >     gl_FragColor = vec4(u*1.0,v*1.0, (1.0-u-v)*1.0, 1.0);
> >   } else {
> >     gl_FragColor = vec4(0.0,0.0,0.0,1.0);
> >   }
> > }
> > ```
