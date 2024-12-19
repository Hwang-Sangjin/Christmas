varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uRandomArray[8];

void main()
{
    float randomValue = uRandomArray[0]*0.1 + 0.2;
    gl_FragColor = vec4(randomValue,randomValue,randomValue, 1.0);
}