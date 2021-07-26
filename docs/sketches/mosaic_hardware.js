let camShader;
let input;
let button2;
let cam;
let tiles = 100.0;
let allImages = [];
let brightnessValues = [];
let imgTexture;
function transform(index) {
  let val = "";
  index = str(index);
  for (let i = 0; i < 4-index.length;i++) {
    val += "0";
  }
  val += index;
  return val;
}

function preload() {
  camShader = loadShader('/vc/docs/sketches/mosaic.vert', '/vc/docs/sketches/mosaic.frag');
  for (i = 0; i < 100; i++) {
    now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
    allImages[i] = loadImage(now);
  }
}

function setup() {
  shaderTexture = createGraphics(640, 480, WEBGL);
  shaderTexture.noStroke();
  // shaders require WEBGL mode to work
  createCanvas(800, windowHeight, WEBGL);
  background(0,0,0);

  noStroke();

  input = createInput(100);
  input.style("padding", "8px");
  input.style("display", "block");
  input.style("border", "none");
  input.style("border-bottom", "1px solid #ccc");
  input.style("font-family","'Roboto',sans-serif");
  input.style("font-weight","300");
  button2 = createButton('submit');
  button2.position(600, 150);
  button2.mousePressed(changeNumberOfTiles)
  button2.style("display","inline-block");
  button2.style("padding","0.35em 1.2em");
  button2.style("border","0.1em solid #FFFFFF");
  button2.style("margin","0 0.3em 0.3em 0");
  button2.style("border-radius","0.12em");
  button2.style("box-sizing","border-box");
  button2.style("text-decoration","none");
  button2.style("font-family","'Roboto',sans-serif");
  button2.style("font-weight","300");
  button2.style("color","#FFFFFF");
  button2.style("text-align","center");
  button2.style("background","transparent");
  input.position(600, 70);
  head = createElement('h3', 'Number of tiles per row and column');
  head.position(600, 0);
  head.style("font-family","'Roboto',sans-serif");
  head.style("font-weight","300");
  head.style("color","#FFFFFF");
  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(500, 400);

  // hide the html element that createCapture adds to the screen
  cam.hide();
  imgTexture = createImage(500/tiles*100, windowHeight/tiles)
  for (i = 0; i < 100; i++) {
    now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
    let image = allImages[i]
    allImages[i] = createImage(500/tiles, windowHeight/tiles);
    allImages[i].copy(image, 0, 0, image.width, image.height, 0, 0, 500/tiles, windowHeight/tiles);
    imgTexture.copy(image, 0, 0, image.width, image.height, i*500/tiles, 0, 500/tiles, windowHeight/tiles);
    image.loadPixels();

    let avg = 0;
    for (let j = 0; j < image.height; j++) {
      for (let k = 0; k < image.width; k++) {
        let index = (k + j*image.width);
        let r = image.pixels[index*4]/255.0;
        let g = image.pixels[index*4+1]/255.0;
        let b = image.pixels[index*4+2]/255.0;
        let gray = r *0.2126 + g *0.7152 + b *0.0722;
        avg += gray;
      }
    }
    avg /= (image.height*image.width);
    brightnessValues[i] = avg;
  }
}


function changeNumberOfTiles() {
  tiles = input.value();
  for (i = 0; i < 100; i++) {
    now = "/vc/docs/sketches/apmw_birds/apmw_base_birds_" + transform(i+1) + '.jpg';
    let image = allImages[i]
    allImages[i] = createImage(500/tiles, windowHeight/tiles);
    allImages[i].copy(image, 0, 0, image.width, image.height, 0, 0, 500/tiles, windowHeight/tiles);
    imgTexture.copy(image, 0, 0, image.width, image.height, i*500/tiles, 0, 500/tiles, windowHeight/tiles);
    image.loadPixels();
  }
}

function draw() {  

    shaderTexture.shader(camShader);
    camShader.setUniform('tex0', cam);
  camShader.setUniform('textures', imgTexture);
  camShader.setUniform('tiles', tiles);
  camShader.setUniform('brightValues', brightnessValues);
  camShader.setUniform('width', 500.0/tiles);

    texture(shaderTexture);
    shaderTexture.rect(0,0,256,256);
    rect(-1000  /2.0,-240.0,640,480)
    
}