
# Edge detection filters

This filters has the purpose of detect edges on the images, and are widely used on machine learning applications, because they help to extract important features of the images. Here we are going to test three different kernels in order to compare them.


## Basic edge detection matrix

> :Formula align=center
>
> w = \begin{pmatrix}
> 1 & 0 & -1 `\\`
> 0 & 0 & 0 `\\` 
> -1 & 0 & 1 
> \end{pmatrix}

Here you can see the filter applied to an image, and check how the edge detection extract only the shapes that could be related to edges on the image. The shaders applied to all the convolutional filters is the same, the only thing that changes is the definition of the convolutional matrix on the p5.js code, so we are only going to show the code for this filter.


> :Tabs
> > :Tab title=How It looks
> > 
> > > :P5 sketch=/docs/sketches/edge_detection_hardware.js, width=768, height=393
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | gray_color_shader.js
> > let convShader;
> > let shaderTexture;
> > let kernel = [];
> > let size;
> > let offset = [];
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/lenna.png');
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
> >   kernelShader = loadShader('/vc/docs/sketches/kernel.vert', '/vc/docs/sketches/kernel.frag');
> >   video.hide();
> > }
> > 
> > function setup() {
> >   createCanvas(768, 393, WEBGL);
> >   shaderTexture = createGraphics(393, 393, WEBGL);
> >   shaderTexture.noStroke();
> >   kernel = [1, 0, -1, 0, 0, 0, -1, 0, 1];
> >   size = 3;
> >   for (let i = 0; i < size; i++) {
> >     for (let j = 0; j < size; j++) {
> >       offset.push(float(-(size-1)/2.0+j)*1.0/height);
> >       offset.push(float(-(size-1)/2.0+i)*1.0/width);
> >     }
> >   }
> > 
> >   for (let i = size*size; i < 49; i++) {
> >     offset.push(0);
> >     kernel.push(0);
> >   }
> >   video.loop();
> >   noStroke();
> > }
> > 
> > function draw() {
> >   shaderTexture.shader(kernelShader);
> >   kernelShader.setUniform('tex0', img);
> >   kernelShader.setUniform('kernel', kernel);
> >   kernelShader.setUniform('n', size);
> >   kernelShader.setUniform('size', 1);
> >   kernelShader.setUniform('ofs', offset);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,393,393);
> >   rect(-393,-393/2.0,393,393)
> >   kernelShader.setUniform('tex0', video);
> >   kernelShader.setUniform('kernel', kernel);
> >   kernelShader.setUniform('n', size);
> >   kernelShader.setUniform('size', 1);
> >   kernelShader.setUniform('ofs', offset);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,393,393);
> >   rect(0,-393/2.0,393,393)
> > }
> > 
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | kernel.vert
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > uniform int n;
> > uniform float kernel[49];
> > uniform float size;
> > uniform sampler2D tex0;
> > uniform float ofs[98];
> > 
> > 
> > vec4 conv = vec4(0.0);
> > 
> > void main(){
> > 
> > 	vec2 uv = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> > 	
> > 
> > 	for(int i = 0; i<49; i++){
> >     if (i >= int(n*n)) break;
> > 		vec4 color = texture2D(tex0, uv + vec2(ofs[i*2], ofs[i*2+1])*size);
> > 
> > 		conv += color*kernel[i] ;
> >   }
> > 		
> > 	gl_FragColor = vec4(conv.rgb, 1.0);
> > }
> > ```
>
> > :Tab title=Fragment Shader Code
> >
> > 
> > ```glsl | gray_rgb.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > 
> > uniform sampler2D tex;
> > 
> > float rgb(vec3 color) {
> >   return dot(color, vec3(1.0/3.0, 1.0/3.0, 1.0/3.0));
> > }
> > 
> > void main() {
> >   vec2 uv = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> > 
> >   vec4 tex_f = texture2D(tex, uv);
> > 
> >   float gray = rgb(tex_f.rgb);
> > 
> >   gl_FragColor = vec4(gray,gray,gray,1.0);
> > }
> > ```

## Fist Laplacian matrix

Laplacian matrices has been used a lot for edge detection because of their incredible properties and results on these tasks.

> :Formula align=center
>
> w = \begin{pmatrix}
> 0 & -1 & 0 `\\`
> -1 & 4 & -1  `\\` 
> 0 & -1 & 0 
> \end{pmatrix}

Here you can find how the filter is applied.

> :P5 sketch=/docs/sketches/second_conv_hardware.js, width=768, height=393

As we can see the edge detection has improved a lot with this matrix on the image, but it stills a bit fuzzy on the video.

## Second Laplace matrix


> :Formula align=center
>
> w = \begin{pmatrix}
> -1 & -1 & -1 `\\`
> -1 & 8 & -1  `\\` 
> -1 & -1 & -1 
> \end{pmatrix}

Here is the result of the filter.

> :P5 sketch=/docs/sketches/third_conv_hardware.js, width=768, height=393

This laplacian matrix has the best performance on the video, but on the image it takes many details of the textures as edges, which could affect the detection.


> :ToCPrevNext