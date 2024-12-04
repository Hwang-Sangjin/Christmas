precision mediump float;
varying vec2 vUv;

    void main()
    {
        
        vec3 startColor = vec3(0.2, 0.33, 0.51);
        vec3 endColor = vec3(0.0);
        
        vec3 fincalColor = mix(startColor,endColor, vUv.y);
        vec3 skyColor = vec3(0.031, 0.525, 0.686);
        gl_FragColor = vec4(fincalColor, 1.0);
    }