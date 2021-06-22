let barycentricShader;
let shaderTexture;
let v1 = [0.25, 0.25];
let v2 = [0.5, 0.75];
let v3 = [0.9, 0.5];
let v1y = [0.25, 0.25];
let v2y = [0.5, 0.75];
let v3y = [1.0, 0.5];
function preload() {
  barycentricShader = loadShader('/vc/docs/sketches/barycentric.vert', '/vc/docs/sketches/barycentric.frag');
}

function setup() {
  createCanvas(512, 512, WEBGL);
  shaderTexture = createGraphics(512, 512, WEBGL);
  shaderTexture.noStroke();
  noStroke();
}

function matrixMulti(vec, matrix) {
  let nVec = [0,0];
  for(i = 0; i < 2; i++) {
    for (j = 0; j < 2; j++) {
      nVec[i] += matrix[i][j]*vec[j]
    }
  }
  return nVec;
}


function draw() {
  let rotationMatrix1 = [[0.9998476951563912391570115588139148516927403105831859396583207145,-0.0174524064372835128194189785163161924722527203071396426836124276],[0.0174524064372835128194189785163161924722527203071396426836124276,0.9998476951563912391570115588139148516927403105831859396583207145]];

  v1 = matrixMulti(v1, rotationMatrix1);
  v2 = matrixMulti(v2, rotationMatrix1);
  v3 = matrixMulti(v3, rotationMatrix1);
  v1y[0] -= 0.5;
  v2y[0] -= 0.5;
  v3y[0] -= 0.5;
  v1y[1] -= 0.5;
  v2y[1] -= 0.5;
  v3y[1] -= 0.5;
  v1y = matrixMulti(v1y, rotationMatrix1);
  v2y = matrixMulti(v2y, rotationMatrix1);
  v3y = matrixMulti(v3y, rotationMatrix1);
  v1y[0] += 0.5;
  v2y[0] += 0.5;
  v3y[0] += 0.5;
  v1y[1] += 0.5;
  v2y[1] += 0.5;
  v3y[1] += 0.5;
  shaderTexture.shader(barycentricShader);
  barycentricShader.setUniform('A', [min(abs(v1[0]),1.0), min(abs(v1y[1]),1.0)]);
  barycentricShader.setUniform('B', [min(abs(v2[0]),1.0), min(abs(v2y[1]),1.0)]);
  barycentricShader.setUniform('C', [min(abs(v3[0]),1.0), min(abs(v3y[1]),1.0)]);
  texture(shaderTexture);
  shaderTexture.rect(0,0,512,512);
  rect(-512/2,-512/2.0,512,512)
}
