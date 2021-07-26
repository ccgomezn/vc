# Photo mosaic

Photo mosaic is the technique of creating a picture or video with a dataset of small images. In order to implement it using shaders it is necessary first to create a single texture image with all the small images that we want to use, then we tile the original image depending on the number of tiles that we want to use, and we calculate the brightness of each tile. With that brightness we can select the proper subimage on the texture image and then we draw the corresponding pixel on the original image.

## Try it with your own camera



> :Tabs
> > :Tab title=How It looks
> > 
> > > > :P5 sketch=/docs/sketches/mosaic_hardware.js, width=800, height=400
>
> > :Tab title=P5 Code
> >
> > 
> > ```js | mosaic_hardware.js
> > let camShader;
> > let input;
> > let button2;
> > let cam;
> > let tiles = 100.0;
> > let allImages = [];
> > let brightnessValues = [];
> > let imgTexture;
> > function transform(index) {
> >   let val = "";
> >   index = str(index);
> >   for (let i = 0; i < 4-index.length;i++) {
> >     val += "0";
> >   }
> >   val += index;
> >   return val;
> > }
> > 
> > function preload() {
> >   camShader = loadShader('/vc/docs/sketches/mosaic.vert', '/vc/docs/sketches/mosaic.frag');
> >   for (i = 0; i < 100; i++) {
> >     now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
> >     allImages[i] = loadImage(now);
> >   }
> > }
> > 
> > function setup() {
> >   shaderTexture = createGraphics(640, 480, WEBGL);
> >   shaderTexture.noStroke();
> >   createCanvas(800, windowHeight, WEBGL);
> >   background(0,0,0);
> > 
> >   noStroke();
> > 
> >   input = createInput(100);
> >   input.style("padding", "8px");
> >   input.style("display", "block");
> >   input.style("border", "none");
> >   input.style("border-bottom", "1px solid #ccc");
> >   input.style("font-family","'Roboto',sans-serif");
> >   input.style("font-weight","300");
> >   button2 = createButton('submit');
> >   button2.position(600, 150);
> >   button2.mousePressed(changeNumberOfTiles)
> >   button2.style("display","inline-block");
> >   button2.style("padding","0.35em 1.2em");
> >   button2.style("border","0.1em solid #FFFFFF");
> >   button2.style("margin","0 0.3em 0.3em 0");
> >   button2.style("border-radius","0.12em");
> >   button2.style("box-sizing","border-box");
> >   button2.style("text-decoration","none");
> >   button2.style("font-family","'Roboto',sans-serif");
> >   button2.style("font-weight","300");
> >   button2.style("color","#FFFFFF");
> >   button2.style("text-align","center");
> >   button2.style("background","transparent");
> >   input.position(600, 70);
> >   head = createElement('h3', 'Number of tiles per row and column');
> >   head.position(600, 0);
> >   head.style("font-family","'Roboto',sans-serif");
> >   head.style("font-weight","300");
> >   head.style("color","#FFFFFF");
> >   cam = createCapture(VIDEO);
> >   cam.size(500, 400);
> > 
> >   cam.hide();
> >   imgTexture = createImage(500/tiles*100, windowHeight/tiles)
> >   for (i = 0; i < 100; i++) {
> >     now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
> >     let image = allImages[i]
> >     allImages[i] = createImage(500/tiles, windowHeight/tiles);
> >     allImages[i].copy(image, 0, 0, image.width, image.height, 0, 0, 500/tiles, windowHeight/tiles);
> >     imgTexture.copy(image, 0, 0, image.width, image.height, i*500/tiles, 0, 500/tiles, windowHeight/tiles);
> >     image.loadPixels();
> > 
> >     let avg = 0;
> >     for (let j = 0; j < image.height; j++) {
> >       for (let k = 0; k < image.width; k++) {
> >         let index = (k + j*image.width);
> >         let r = image.pixels[index*4]/255.0;
> >         let g = image.pixels[index*4+1]/255.0;
> >         let b = image.pixels[index*4+2]/255.0;
> >         let gray = r *0.2126 + g *0.7152 + b *0.0722;
> >         avg += gray;
> >       }
> >     }
> >     avg /= (image.height*image.width);
> >     brightnessValues[i] = avg;
> >   }
> > }
> > 
> > function changeNumberOfTiles() {
> >   tiles = input.value();
> >   for (i = 0; i < 100; i++) {
> >     now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
> >     let image = allImages[i]
> >     allImages[i] = createImage(500/tiles, windowHeight/tiles);
> >     allImages[i].copy(image, 0, 0, image.width, image.height, 0, 0, 500/tiles, windowHeight/tiles);
> >     imgTexture.copy(image, 0, 0, image.width, image.height, i*500/tiles, 0, 500/tiles, windowHeight/tiles);
> >     image.loadPixels();
> >   }
> > }
> > 
> > function draw() {  
> > 
> >     shaderTexture.shader(camShader);
> >     camShader.setUniform('tex0', cam);
> >   camShader.setUniform('textures', imgTexture);
> >   camShader.setUniform('tiles', tiles);
> >   camShader.setUniform('brightValues', brightnessValues);
> >   camShader.setUniform('width', 500.0/tiles);
> > 
> >     texture(shaderTexture);
> >     shaderTexture.rect(0,0,256,256);
> >     rect(-1000  /2.0,-240.0,640,480)
> >     
> > }
> > ```
>
> > :Tab title=Vertex Shader Code
> >
> > 
> > ```glsl | mosaic.vert
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
> > ```glsl | mosaic.frag
> > #ifdef GL_ES
> > precision mediump float;
> > #endif
> > 
> > varying vec2 vTexCoord;
> > 
> > uniform sampler2D tex0;
> > uniform sampler2D textures;
> > uniform float brightValues[100];
> > uniform float tiles;
> > uniform float width;
> > 
> > 
> > float luma(vec3 color) {
> >   return dot(color, vec3(0.299, 0.587, 0.114));
> > }
> > 
> > void main() {
> > 
> >   vec2 uv = vTexCoord;
> >   vec2 uv2 = vTexCoord;
> >   uv.y = 1.0 - uv.y;
> >   uv2.y = 1.0 - uv2.y;
> >   uv = uv * tiles;
> > 
> >   uv = floor(uv);
> > 
> >   uv = uv / tiles;
> > 
> > 
> >   vec4 tex = texture2D(tex0, uv);
> >   float gray = luma(tex.rgb);
> >   vec4 img = texture2D(textures,vec2((uv2.x-uv.x)*tiles/(100.0), (uv2.y-uv.y)*tiles));
> >   float diff = abs(gray - brightValues[0]);
> >   int j = 0;
> >   for (int i = 0; i < 300; i++) {
> >     float newDiff = abs(gray - brightValues[i]);
> >     if (newDiff < diff) {
> >       img = texture2D(textures, vec2((uv2.x-uv.x)*tiles/(100.0)+(float(i)/100.0), (uv2.y-uv.y)*tiles));
> >       diff = newDiff;
> >     }
> >   }
> > 
> >   gl_FragColor = img;
> > }
> > ```

## Comparison with Software implementation

When we measure the framerate of both implementations using the same images as the base dataset we found an improvement 365% in the frameRate, on the software implementation the value of the frameRate was around 4.31 frames per second, while in the hardware implementation we have 20.04 frames per second on average.

> :ToCPrevNext