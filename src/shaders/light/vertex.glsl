attribute float aAlpha;
attribute float aLightColor;

varying float vAlpha;
varying float vLightColor;

void main(){

    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = 500.0;
    gl_PointSize *=(1.0/-viewPosition.z);
    vAlpha = aAlpha;
    vLightColor = aLightColor;
}