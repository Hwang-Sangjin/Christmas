import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import starVertexShader from "../shaders/star/vertex.glsl";
import starFragmentShader from "../shaders/star/fragment.glsl";
import starTexture from "&/star.png";
import Perlin from "&/perlin.png";

const Star = () => {
  const meshRef = useRef();

  const ParticleTexture = new THREE.TextureLoader().load(starTexture);
  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const starUniforms = useMemo(
    () => ({
      uTexture: { value: ParticleTexture },
      uTime: { value: 0.0 },
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );
  const [starGeometry, setStarGeometry] = useState(new THREE.BufferGeometry());
  const particle_cnt = 200;

  useEffect(() => {
    const temp = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particle_cnt * 3);
    const progressArray = new Float32Array(particle_cnt);
    const sizeArray = new Float32Array(particle_cnt);
    const alphaArray = new Float32Array(particle_cnt);
    const IndexArray = new Float32Array(particle_cnt);

    for (let i = 0; i < particle_cnt; i++) {
      positionArray[i * 3] = (Math.random() - 0.5) * 150;
      positionArray[i * 3 + 1] = Math.random() * 30 + 22;
      positionArray[i * 3 + 2] = -49;
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

    setStarGeometry(temp);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    starUniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points ref={meshRef} geometry={starGeometry}>
      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthTest={false}
        attach="material"
        transparent={true}
        uniforms={starUniforms}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
      />
    </points>
  );
};

export default Star;
