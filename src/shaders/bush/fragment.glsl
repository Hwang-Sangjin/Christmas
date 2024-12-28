uniform sampler2D uPerlinTexture; 

varying vec2 vUv;

void main()
{
    float perlinStrength =texture(uPerlinTexture, vec2(vUv.x,vUv.y )).r ;
    vec4 baseColor = vec4(0.184,0.341,0.2,1.0);
    gl_FragColor = vec4(perlinStrength*baseColor.x,perlinStrength*baseColor.y,perlinStrength*baseColor.z, 1.0);
}