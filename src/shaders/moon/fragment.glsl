varying vec2 vUv;

uniform sampler2D uTexture;

void main()
{
    float maskStrength = texture2D(uTexture,vUv).r;
    gl_FragColor = vec4(maskStrength,maskStrength,maskStrength, 1.0);
}