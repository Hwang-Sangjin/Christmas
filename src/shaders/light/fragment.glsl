uniform sampler2D uTexture;
uniform float uTime;
uniform sampler2D uPerlinTexture;

varying float vAlpha;
varying vec2 vUv;
varying float vAIndex;
varying float vLightColor;

void main(){
    float maskStrength = texture2D(uTexture,gl_PointCoord).r;

    if(vLightColor==0.0){
            float strength = (sin(uTime)+1.2);
        gl_FragColor = vec4(1.0,1.0,0.7,maskStrength * vAlpha*strength);
    }
    else {
        float strength = (cos(uTime)+1.2);
        gl_FragColor = vec4(1.0,0.6,0.0,maskStrength * vAlpha*strength);
    }
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}