uniform sampler2D uTexture;

varying float vAlpha;
varying vec2 vUv;
varying float vAIndex;

void main(){
    float maskStrength = texture2D(uTexture,gl_PointCoord).r;
    gl_FragColor = vec4(1.0,1.0,1.0,maskStrength * vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}