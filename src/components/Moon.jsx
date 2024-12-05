import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import moonTexture from "&/moon.png";
import Perlin from "&/perlin.png";
import { useFrame } from "@react-three/fiber";
import moonVertexShader from "@/shaders/moon/vertex.glsl";
import moonFragmentShader from "@/shaders/moon/fragment.glsl";

const Moon = () => {
  const mesh = useRef();

  const MoonTexture = new THREE.TextureLoader().load(moonTexture);
  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const MoonUniforms = useMemo(
    () => ({
      uTexture: { value: MoonTexture },
      uTime: { value: 0.0 },
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    MoonUniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 15, -43]}
      rotation={[Math.PI / 6, -Math.PI / 4, 0]}
    >
      <circleGeometry args={[6, 100, 0.0]} />
      <shaderMaterial
        uniforms={MoonUniforms}
        vertexShader={moonVertexShader}
        fragmentShader={moonFragmentShader}
      />
    </mesh>
  );
};

export default Moon;
