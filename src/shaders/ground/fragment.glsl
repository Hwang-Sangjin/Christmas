uniform vec3 uColor;

void main()
{
    vec3 color = vec3(0.3);

    // Final color
    csm_DiffuseColor = vec4(color, 1.0);
}