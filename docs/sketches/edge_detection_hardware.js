let convShader;
let shaderTexture;
let kernel = [];
let size;
let offset = [];
function preload() {
  img = loadImage('/vc/docs/sketches/lenna.png');
  video = createVideo(['/vc/docs/sketches/fingers.mov', '/vc/docs/sketches/fingers.webm']);
  kernelShader = loadShader('/vc/docs/sketches/kernel.vert', '/vc/docs/sketches/kernel.frag');
  video.hide();
}

function setup() {
  createCanvas(768, 393, WEBGL);
  shaderTexture = createGraphics(393, 393, WEBGL);
  shaderTexture.noStroke();
  kernel = [1, 0, -1, 0, 0, 0, -1, 0, 1];
  size = 3;
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
  video.loop();
  noStroke();
}

function draw() {
  shaderTexture.shader(kernelShader);
  kernelShader.setUniform('tex0', img);
  kernelShader.setUniform('kernel', kernel);
  kernelShader.setUniform('n', size);
  kernelShader.setUniform('size', 1);
  kernelShader.setUniform('ofs', offset);
  kernelShader.setUniform('normalize', false);
  texture(shaderTexture);
  shaderTexture.rect(0,0,393,393);
  rect(-393,-393/2.0,393,393)
  kernelShader.setUniform('tex0', video);
  kernelShader.setUniform('kernel', kernel);
  kernelShader.setUniform('n', size);
  kernelShader.setUniform('size', 1);
  kernelShader.setUniform('ofs', offset);
  kernelShader.setUniform('normalize', false);
  texture(shaderTexture);
  shaderTexture.rect(0,0,393,393);
  rect(0,-393/2.0,393,393)
}
