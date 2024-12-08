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

    float strengthY = mod(newPosition.y + 30.0 - uTime*max(aIndex*5.0,3.0),30.0);

    newPosition.y =strengthY;

    // Wind
   vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * aIndex * 0.03)).r - 0.5,
        texture(uPerlinTexture, vec2(0.75, uTime * aIndex * 0.03)).r - 0.5
    );
    windOffset *= pow(30.0 -newPosition.y,2.0) *0.05;
    
    newPosition.xz += windOffset;
    newPosition.x = mod(newPosition.x,200.0)-100.0;

    vec4 modelPosition = modelMatrix * vec4(newPosition,1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 1000.0 * aSize;
    gl_PointSize *=(1.0/-viewPosition.z);

    vAlpha = aAlpha;
    vAIndex = aIndex;
}