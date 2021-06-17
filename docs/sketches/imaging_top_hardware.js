let grayShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  grayShader = loadShader('/vc/docs/sketches/gray.vert', '/vc/docs/sketches/gray.frag');
  invShader = loadShader('/vc/docs/sketches/inverse.vert', '/vc/docs/sketches/inverse.frag');
  video.hide();
}

function setup() {
  createCanvas(768, 512, WEBGL);
  shaderTexture = createGraphics(256, 256, WEBGL);
  shaderTexture.noStroke();

  video.loop();
  noStroke();
}

function draw() {
  texture(img);
  rect(-768/2.0,-256,256,256)
  texture(video);
  rect(-768/2.0,0,256,256)

  shaderTexture.shader(grayShader);
  grayShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(-256/2.0,-256,256,256)
  grayShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(-256/2.0,0,256,256)

  shaderTexture.shader(invShader);
  invShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(256/2.0,-256,256,256)
  invShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect(0,0,256,256);
  rect(256/2.0,0,256,256)

}
