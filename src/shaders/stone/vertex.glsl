varying vec2 vUv;

uniform sampler2D uPerlinTexture; 
uniform float uCellIndex; 
uniform float uRowIndex; 
uniform float uRandomArray[8];

void main() {
    // Sample the Perlin texture
    vec2 uvSample = vec2(uv.x, uv.y);
    
    if(position.z>0.0){
        float randomValue1 = uRandomArray[int(gl_VertexID*2)];
        float randomValue2 = uRandomArray[int(gl_VertexID*2+1)];

        // Use the random value (e.g., for displacement)
        vec3 displacedPosition = vec3(position.x - randomValue1*0.5 , position.y- randomValue2*0.5,position.z);

        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(displacedPosition, 1.0);

    }
    else{
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    }
    // Pass UV to fragment shader
    vUv = uv;
}
