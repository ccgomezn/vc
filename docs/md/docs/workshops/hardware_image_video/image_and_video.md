# Image and Video Filters

> :P5 sketch=/docs/sketches/imaging_top_hardware.js, width=768, height=512


The process of applying a filter to an image or video can be easily done by using the shaders functionality of P5js, so we can transform videos and images in an optimal way using hardware.

## Inverse Color

In order to invert the color of an image or video using shaders we create a fragment shader that takes the image or video as a texture and change its rgb value with the formula rgb = 1 - rgb, in addition it is necessary to invert the y orientation of the texture, because the shader always receives it upside down. The vertex shader used is the general vertex shader described on "thebookofshaders" which just adjust the position of the texture. After the texture is processed it is applied to a rectangle in the scene as a texture.


> :Tabs
> > :Tab title=How It looks
> > 
> > > :P5 sketch=/docs/sketches/inverse_color_shader.js, width=512, height=256
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | inverse_color_shader.js
> > let inverseShader;
> > let shaderTexture;
> > 
> > 
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/lenna.png');
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
> >   inverseShader = loadShader('/vc/docs/sketches/inverse.vert', '/vc/docs/sketches/inverse.frag');
> >   video.hide();
> > }
> > 
> > function setup() {
> >   createCanvas(512, 256, WEBGL);
> >   shaderTexture = createGraphics(256, 256, WEBGL);
> >   shaderTexture.noStroke();
> > 
> >   video.loop();
> >   noStroke();
> > }
> > 
> > function draw() {
> >   shaderTexture.shader(inverseShader);
> >   inverseShader.setUniform('tex', img);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(-256,-256/2.0,256,256)
> >   inverseShader.setUniform('tex', video);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(0,-256/2.0,256,256)
> > }
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | inverse.vert
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
> > ```glsl | inverse.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > 
> > uniform sampler2D tex;
> > 
> > 
> > void main() {
> >   vec2 uv = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> > 
> >   vec4 tex_f = texture2D(tex, uv);
> > 
> >   tex_f.rgb = 1.0 - tex_f.rgb;
> > 
> >   gl_FragColor = tex_f;
> > }
> > ```


## Gray Scale Luma

To apply the gray scale Luma on an image or video using shaders we apply the same technique of the inverse color, with the difference that we create a function called luma that transform the color of the texture using the dot product between the rgb vector and the vector (0.299, 0.587, 0.114) and then replace the color of the texture by the result of that dot product.

> :Tabs
> > :Tab title=How It looks
> > 
> > > :P5 sketch=/docs/sketches/gray_color_shader.js, width=512, height=256
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | gray_color_shader.js
> > let grayShader;
> > let shaderTexture;
> > 
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/lenna.png');
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
> >   grayShader = loadShader('/vc/docs/sketches/gray.vert', '/vc/docs/sketches/gray.frag');
> >   video.hide();
> > }
> > 
> > function setup() {
> >   createCanvas(512, 256, WEBGL);
> >   shaderTexture = createGraphics(256, 256, WEBGL);
> >   shaderTexture.noStroke();
> > 
> >  video.loop();
> >   noStroke();
> > }
> > 
> > function draw() {
> >   shaderTexture.shader(grayShader);
> >   grayShader.setUniform('tex', img);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(-256,-256/2.0,256,256)
> >   grayShader.setUniform('tex', video);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(0,-256/2.0,256,256)
> > }
> > 
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | gray.vert
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
> > ```glsl | gray.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > 
> > uniform sampler2D tex;
> > 
> > float luma(vec3 color) {
> >   return dot(color, vec3(0.299, 0.587, 0.114));
> > }
> > 
> > void main() {
> >   vec2 uv = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> > 
> >   vec4 tex_f = texture2D(tex, uv);
> > 
> >   float gray = luma(tex_f.rgb);
> > 
> >   gl_FragColor = vec4(gray,gray,gray,1.0);
> > }
> > ```


## Gray Scale RGB

In order to apply the gray scale RGB on an image or video using shaders we apply the same technique of the inverse color, with the difference that we create a function called rgb that transform the color of the texture using the dot product between the rgb vector and the vector (1/3.0, 1/3.0, 1/3.0) and then replace the color of the texture by the result of that dot product.

> :Tabs
> > :Tab title=How It looks
> > 
> > > :P5 sketch=/docs/sketches/gray_color_rgb_shader.js, width=512, height=256
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | gray_color_shader.js
> > let grayShader;
> > let shaderTexture;
> > 
> > function preload() {
> >   img = loadImage('/vc/docs/sketches/lenna.png');
> >   video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
> >   grayShader = loadShader('/vc/docs/sketches/gray_rgb.vert', '/vc/docs/sketches/gray_rgb.frag');
> >   video.hide();
> > }
> > 
> > function setup() {
> >   createCanvas(512, 256, WEBGL);
> >   shaderTexture = createGraphics(256, 256, WEBGL);
> >   shaderTexture.noStroke();
> > 
> >  video.loop();
> >   noStroke();
> > }
> > 
> > function draw() {
> >   shaderTexture.shader(grayShader);
> >   grayShader.setUniform('tex', img);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(-256,-256/2.0,256,256)
> >   grayShader.setUniform('tex', video);
> >   texture(shaderTexture);
> >   shaderTexture.rect(0,0,256,256);
> >   rect(0,-256/2.0,256,256)
> > }
> > 
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | gray_rgb.vert
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


> :ToCPrevNext