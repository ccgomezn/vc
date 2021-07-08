#ifdef GL_ES
precision mediump float;
#endif

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform sampler2D textures;
uniform float brightValues[100];
uniform float tiles;
uniform float width;


float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {

  vec2 uv = vTexCoord;
  vec2 uv2 = vTexCoord;
  uv.y = 1.0 - uv.y;
  uv2.y = 1.0 - uv2.y;
  uv = uv * tiles;

  uv = floor(uv);

  uv = uv / tiles;


  vec4 tex = texture2D(tex0, uv);
  float gray = luma(tex.rgb);
  vec4 img = texture2D(textures,vec2((uv2.x-uv.x)*tiles/(100.0), (uv2.y-uv.y)*tiles));
  float diff = abs(gray - brightValues[0]);
  int j = 0;
  for (int i = 0; i < 300; i++) {
    float newDiff = abs(gray - brightValues[i]);
    if (newDiff < diff) {
      img = texture2D(textures, vec2((uv2.x-uv.x)*tiles/(100.0)+(float(i)/100.0), (uv2.y-uv.y)*tiles));
      diff = newDiff;
    }
  }

  gl_FragColor = img;
}