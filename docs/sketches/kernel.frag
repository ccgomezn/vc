#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform int n;
uniform float kernel[49];
uniform float size;
uniform sampler2D tex0;
uniform float ofs[98];


vec4 conv = vec4(0.0);

void main(){

	vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
	

	for(int i = 0; i<49; i++){
    if (i >= int(n*n)) break;
		vec4 color = texture2D(tex0, uv + vec2(ofs[i*2], ofs[i*2+1])*size);

		conv += color*kernel[i] ;
  }
		
	gl_FragColor = vec4(conv.rgb, 1.0);
}