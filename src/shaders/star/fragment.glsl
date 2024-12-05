varying vec2 vUv;
varying float vAlpha;
varying float vAIndex;
uniform sampler2D uPerlinTexture;

uniform sampler2D uTexture;
uniform float uTime;

void main()
{
    vec3 starColor = vec3(0.6, 0.6, 0.0);
    float maskStrength = texture2D(uTexture,gl_PointCoord).r;
    float strength = texture2D(uPerlinTexture,vec2(vUv.x + uTime*vAIndex*0.1, 1.0)).r;
    strength = pow(strength,2.0);
    maskStrength = maskStrength*strength*vAIndex*10.0;

    gl_FragColor = vec4(starColor,maskStrength * vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}