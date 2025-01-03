import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import particlesVertexShader from "../shaders/particles/vertex.glsl";
import particlesFragmentShader from "../shaders/particles/fragment.glsl";
import snowTexture from "&/snow.png";
import Perlin from "&/perlin.png";

const Snow = () => {
  const meshRef = useRef();

  const ParticleTexture = new THREE.TextureLoader().load(snowTexture);
  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const particleUniforms = useMemo(
    () => ({
      uTexture: { value: ParticleTexture },
      uTime: { value: 0.0 },
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );
  const [SnowGeometry, setSnowGeometry] = useState(new THREE.BufferGeometry());
  const particle_cnt = 3000; //0~5000

  useEffect(() => {
    const temp = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particle_cnt * 3);
    const progressArray = new Float32Array(particle_cnt);
    const sizeArray = new Float32Array(particle_cnt);
    const alphaArray = new Float32Array(particle_cnt);
    const IndexArray = new Float32Array(particle_cnt);

    for (let i = 0; i < particle_cnt; i++) {
      positionArray[i * 3] = (Math.random() - 0.5) * 200;
      positionArray[i * 3 + 1] = Math.random() * 30;
      positionArray[i * 3 + 2] = -(Math.random() - 0.5) * 100;
      progressArray[i] = Math.random();

      sizeArray[i] = Math.random();

      alphaArray[i] = Math.random();

      IndexArray[i] = Math.random();
    }

    temp.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positionArray), 3)
    );
    temp.setAttribute(
      "aProgress",
      new THREE.BufferAttribute(new Float32Array(progressArray), 1)
    );
    temp.setAttribute(
      "aSize",
      new THREE.BufferAttribute(new Float32Array(sizeArray), 1)
    );
    temp.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(new Float32Array(alphaArray), 1)
    );
    temp.setAttribute(
      "aIndex",
      new THREE.BufferAttribute(new Float32Array(IndexArray), 1)
    );

    setSnowGeometry(temp);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    particleUniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points ref={meshRef} geometry={SnowGeometry}>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthTest={false}
        attach="material"
        transparent={true}
        uniforms={particleUniforms}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
      />
    </points>
  );
};

export default Snow;
