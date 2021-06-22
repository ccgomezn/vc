#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 A;
uniform vec2 B;
uniform vec2 C;
varying vec2 vTexCoord;


void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec2 v0 = C - A;
  vec2 v1 = B - A;
  vec2 v2 = uv - A;

  float dot00 = dot(v0, v0);
  float dot01 = dot(v0, v1);
  float dot02 = dot(v0, v2);
  float dot11 = dot(v1, v1);
  float dot12 = dot(v1, v2);

  float det = 1.0 / (dot00 * dot11 - dot01 * dot01);
  float u = (dot11 * dot02 - dot01 * dot12) * det;
  float v = (dot00 * dot12 - dot01 * dot02) * det;

  if((u >= 0.0) && (v >= 0.0) && (u + v <= 1.0)) {
    gl_FragColor = vec4(u*1.0,v*1.0, (1.0-u-v)*1.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0,0.0,0.0,1.0);
  }
}