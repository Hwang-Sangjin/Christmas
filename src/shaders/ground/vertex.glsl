#include ../includes/simplexNoise2d.glsl

uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;
uniform float uTime;

float getElevation(vec2 position)
{
    vec2 warpedPosition = position;
    warpedPosition += uTime *1.5;
    warpedPosition += simplexNoise2d(warpedPosition* uPositionFrequency * uWarpFrequency) * uWarpStrength;

    float elevation = 0.0;
    elevation += simplexNoise2d(warpedPosition* uPositionFrequency)/2.0 ;
    elevation += simplexNoise2d(warpedPosition* uPositionFrequency*2.0)/4.0 ;
    elevation += simplexNoise2d(warpedPosition* uPositionFrequency*4.0)/8.0 ;

    float elevationSign = sign(elevation);
    elevation = pow(abs(elevation),2.0) * elevationSign;
    elevation *= uStrength;

    return elevation;
}

void main(){
 // Neighbours positions
    float shift = 0.01;
    vec3 positionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 positionB = position.xyz + vec3(0.0,shift, 0.0);

 // Elevation
    float elevation = getElevation(csm_Position.xy);
    csm_Position.z += elevation;

     positionA.z    += getElevation(positionA.xy);
    positionB.z   += getElevation(positionB.xy);

    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);

    csm_Normal = cross(toA, toB);
}