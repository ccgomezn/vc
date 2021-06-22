let capture;
let button;
let grayBtn;
let invertBtn;
let normalBtn;
let kernelShader;
let shaderTexture;
let offset = [];
let inputs = [];
let kernel = [];
let size;
let borderButton;
let focusButton;
let blurryButton;
let blurry5Button;
let normalize = false;
function setup() {
  shaderTexture = createGraphics(640, 480, WEBGL);
  shaderTexture.noStroke();
  createCanvas(1000, 480, WEBGL);
  background(0,0,0);

  

  kernelShader = loadShader('/vc/docs/sketches/kernel.vert', '/vc/docs/sketches/kernel.frag');
  input = createInput();
  input.style("padding", "8px");
  input.style("display", "block");
  input.style("border", "none");
  input.style("border-bottom", "1px solid #ccc");
  input.style("font-family","'Roboto',sans-serif");
  input.style("font-weight","300");
  borderButton = createButton('Border Filter');
  focusButton = createButton('Focus Filter');
  blurryButton = createButton('Gaussian Blurry Filter');
  blurry5Button = createButton('Blurry 5x5 Filter');
  borderButton.position(670, 300);
  borderButton.mousePressed(() => setMatrix([-1, -1, -1, -1, 8, -1, -1, -1, -1], 3, false))
  focusButton.position(670, 350);
  focusButton.mousePressed(() => setMatrix([0, -1, 0, -1, 5, -1, 0, -1, 0], 3, true))

  blurryButton.position(670, 400);
  blurryButton.mousePressed(() => setMatrix([1/16, 2/16, 1/16, 2/16, 4/16, 2/16, 1/16, 2/16, 1/16], 3, true))

  blurry5Button.position(670, 450);
  blurry5Button.mousePressed(() => setMatrix([1/256, 4/256, 6/256, 4/256, 1/256, 4/256, 16/256, 24/256, 16/256, 4/256, 
    6/256, 24/256, 36/256, 24/256, 6/256, 4/256, 16/256, 24/256, 16/256, 4/256, 1/256, 4/256, 6/256, 4/256, 1/256], 5, true))

  button2 = createButton('submit');
  button2.position(850, 53);
  button2.mousePressed(convMatrix);
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
  input.position(670, 50);
  head = createElement('h3', 'Length and Width of the matrix');
  head.position(670, 0);
  head.style("font-family","'Roboto',sans-serif");
  head.style("font-weight","300");
  head.style("color","#FFFFFF");

  [borderButton, focusButton, blurryButton, blurry5Button].forEach(button2 => {
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
  })
}

function setMatrix(mtrx, sz, nrml) {
  size = sz;
  normalize = nrml;
  kernel = mtrx;
  offset = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      offset.push(float(-(size-1)/2.0+j)*1.0/height);
      offset.push(float(-(size-1)/2.0+i)*1.0/width);
    }
  }

  for (let i = size*size; i < 49; i++) {
    offset.push(0);
    kernel.push(0);
  }
  if (!capture) {
    capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  }
  
}

function startCapture() {
  kernel = []
  offset = []
  normalize = false;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let index = j + i*size;
      kernel.push(inputs[index].value());
    }
  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      offset.push(float(-(size-1)/2.0+j)*1.0/height);
      offset.push(float(-(size-1)/2.0+i)*1.0/width);
    }
  }

  for (let i = size*size; i < 49*2; i++) {
    offset.push(0);
    kernel.push(0);
  }
  if (!capture) {
    capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  }
  
}


function draw() {
  if (capture) {    
    shaderTexture.shader(kernelShader);
    kernelShader.setUniform('tex0', capture);
    kernelShader.setUniform('kernel', kernel);
    kernelShader.setUniform('n', size);
    kernelShader.setUniform('size', 1);
    kernelShader.setUniform('ofs', offset)
    texture(shaderTexture);
    shaderTexture.rect(0,0,256,256);
    rect(-1000  /2.0,-240.0,640,480)
  
  } 

}


function convMatrix() {
  size = input.value();
  inputs.forEach(input => {
    input.remove();
  })
  inputs = [];
  for(let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let aux = createInput();
      aux.style("display", "block");
      aux.style("border", "none");
      aux.style("border-bottom", "1px solid #ccc");
      aux.style("font-family","'Roboto',sans-serif");
      aux.style("font-weight","300");
      aux.position(670 + i*30, 100 + j*20);
      aux.size(20);
      inputs.push(aux)
    }
  }
  let button3 = createButton('Use kernel');
  button3.style("display","inline-block");
  button3.style("padding","0.35em 1.2em");
  button3.style("border","0.1em solid #FFFFFF");
  button3.style("margin","0 0.3em 0.3em 0");
  button3.style("border-radius","0.12em");
  button3.style("box-sizing","border-box");
  button3.style("text-decoration","none");
  button3.style("font-family","'Roboto',sans-serif");
  button3.style("font-weight","300");
  button3.style("color","#FFFFFF");
  button3.style("text-align","center");
  button3.style("background","transparent");
  button3.position(670, 250);
  button3.mousePressed(startCapture);
}