varying vec2 vUv;
uniform sampler2D uPerlinTexture; 

void main() {
    vec3 newPosition = position;
    float perlinStrength =texture(uPerlinTexture, vec2(uv.x,uv.y )).r*0.1 ;
    newPosition=vec3(newPosition.x-perlinStrength, newPosition.y-perlinStrength,newPosition.z-perlinStrength);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
    // Pass UV to fragment shader
    vUv = uv;
}
