precision mediump float;
varying vec2 vUv;

uniform float uTime;
uniform sampler2D uPerlinTexture;

    void main()
    {
        vec3 startColor = vec3(0.07, 0.13, 0.19);
        vec3 endColor = vec3(0.0);
        
        vec3 finalColor = mix(startColor,endColor, vUv.y);

        vec3 mountain1Color = vec3(0.9) * pow((1.0-vUv.y),4.0)*4.0;
        vec3 mountain2Color = vec3(0.2)*pow((1.0-vUv.y),5.0)*8.0;
        vec3 mountain3Color = vec3(0.0);

        float strength1= 0.0;
        float strength2= 0.0;
        float strength3= 0.0;

        float height1 =0.45;
        float height2 = 0.46;
        float height3 = 0.465;

        float perlinValue1 = texture(uPerlinTexture, vec2(vUv.x*5.0 + uTime*0.008, 0.5)).r;
        height1 -= perlinValue1 *0.25;

        float perlineValue2 = texture(uPerlinTexture, vec2(vUv.x*5.0 + uTime*0.006, 0.25)).r;
        height2 -=perlineValue2 * 0.22;

        float perlineValue3 = texture(uPerlinTexture, vec2(vUv.x*5.0 + uTime*0.004, 0.75)).r;
        height3 -=perlineValue3 * 0.22;

        if(vUv.y <=height1){
            strength1=1.0;
        }
        else if(vUv.y <=height2){
            strength2=0.8;
        }
       else if(vUv.y <=height3){
            strength3=0.6;
        }
    

        vec3 mixedColor1 = mix(finalColor,mountain1Color,strength1);
        vec3 mixedColor2 = mix(finalColor,mountain2Color,strength2);
        vec3 mixedColor3 = mix(finalColor,mountain3Color,strength3);
        
        finalColor +=mixedColor1 + mixedColor2 + mixedColor3;
        gl_FragColor = vec4(finalColor, 1.0);
    }