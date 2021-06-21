let capture;
let button;
let grayBtn;
let invertBtn;
let normalBtn;
let shader;
let inverseShader;
let grayShader;
let shaderName = '';
let shaderTexture;



function setup() {
  shaderTexture = createGraphics(640, 480, WEBGL);
  shaderTexture.noStroke();
  createCanvas(770, 480, WEBGL);
  background(0,0,0);
  button = createButton('Start!');
  
  
  grayBtn = createButton('Gray Filter');
  invertBtn = createButton('Invert Filter');
  normalBtn = createButton('Normal');
  
  inverseShader = loadShader('/vc/docs/sketches/inverse.vert', '/vc/docs/sketches/inverse.frag');
  grayShader = loadShader('/vc/docs/sketches/gray.vert', '/vc/docs/sketches/gray.frag');
}

function startCapture() {
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}

function changeShader(newShader, type) {
  shader = newShader;
  shaderName = type;
}

function draw() {
  [button, invertBtn, grayBtn, normalBtn].forEach(button => {
    button.style("display","inline-block");
    button.style("padding","0.35em 1.2em");
    button.style("border","0.1em solid #FFFFFF");
    button.style("margin","0 0.3em 0.3em 0");
    button.style("border-radius","0.12em");
    button.style("box-sizing","border-box");
    button.style("text-decoration","none");
    button.style("font-family","'Roboto',sans-serif");
    button.style("font-weight","300");
    button.style("color","#FFFFFF");
    button.style("text-align","center");
    button.style("background","transparent");
  })
  if (capture) {
    button.hide();
    if (shaderName !== '') {
      shaderTexture.shader(shader);
      shader.setUniform('tex', capture);
      texture(shaderTexture);
      shaderTexture.rect(0,0,256,256);
      rect(-770/2.0,-240.0,640,480)
    } else {
      texture(capture);
      rect(-770/2.0,-240,640,480)
    }

  } else {
    button.position(300, 440);
    button.mousePressed(startCapture); 
    grayBtn.position(670, 30);
    grayBtn.mousePressed(() => changeShader(grayShader, 'gray'));
    invertBtn.position(670, 60);
    invertBtn.mousePressed(() => changeShader(inverseShader, 'inverse'));
    normalBtn.position(670, 90);
    normalBtn.mousePressed(() => changeShader(null, ''));

  }
}
