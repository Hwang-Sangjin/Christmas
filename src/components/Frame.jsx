import skyVertexShader from "../shaders/sky/vertex.glsl";
import skyFragmentShader from "../shaders/sky/fragment.glsl";
import BackgroundTexture from "&/background.jpg";
import Perlin from "&/perlin.png";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Frame = () => {
  const mesh = useRef();

  const backgroundTexture = new THREE.TextureLoader().load(BackgroundTexture);
  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const SkyUniforms = useMemo(
    () => ({
      uTexture: { value: backgroundTexture },
      uPerlinTexture: { value: PerlinTexture },
      uTime: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    SkyUniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 40, -50]}>
      <planeGeometry args={[2000, 180, 1200, 128]} />
      <shaderMaterial
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={SkyUniforms}
      />
    </mesh>
  );
};

export default Frame;
