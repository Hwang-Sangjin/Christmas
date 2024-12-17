varying vec2 vUv;

uniform sampler2D uPerlinTexture; 
uniform float uCellIndex; 
uniform float uRowIndex; 

void main()
{
    float perlinValue1 = texture(uPerlinTexture, vec2(uv.x, uv.y)).r -0.5;
    float perlinValue2 = texture(uPerlinTexture, vec2(uv.x,  uv.y)).r -0.5;
    float perlinValue3 = texture(uPerlinTexture, vec2(uv.x, uCellIndex)).r -0.5;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vec3(position.x + perlinValue1*4.0,position.y+perlinValue2*4.0 ,position.z ), 1.0);
    vUv = uv;
}