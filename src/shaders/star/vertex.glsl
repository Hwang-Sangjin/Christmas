uniform float uTime;
uniform sampler2D uPerlinTexture;

attribute float aProgress;
attribute float aSize;
attribute float aAlpha;
attribute float aIndex;

varying float vAlpha;
varying vec2 vUv;
varying float vAIndex;

void main(){
    vec3 newPosition = position;

    vec4 modelPosition = modelMatrix * vec4(newPosition,1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 6000.0 * aSize;
    gl_PointSize *=(1.0/-viewPosition.z);

    vAlpha = aAlpha;
    vAIndex = aIndex;
}