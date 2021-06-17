let inverseShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  inverseShader = loadShader('/vc/docs/sketches/inverse.vert', '/vc/docs/sketches/inverse.frag');
  video.hide();
}

function setup() {
  createCanvas(512, 256, WEBGL);
  shaderTexture = createGraphics(256, 256, WEBGL);
  shaderTexture.noStroke();

  video.loop();
  noStroke();
}

function draw() {
  shaderTexture.shader(inverseShader);
  inverseShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(-256,-256/2.0,256,256)
  inverseShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(0,-256/2.0,256,256)
}
