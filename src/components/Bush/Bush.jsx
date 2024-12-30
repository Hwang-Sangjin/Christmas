import { useEffect, useMemo, useRef, useState } from "react";
import bushVertexShader from "../../shaders/bush/vertex.glsl";
import bushFragmentShader from "../../shaders/bush/fragment.glsl";
import particlesVertexShader from "../../shaders/light/vertex.glsl";
import particlesFragmentShader from "../../shaders/light/fragment.glsl";
import lightTexture from "&/light.png";
import * as THREE from "three";
import Perlin from "&/perlin.png";
import { BushSnow } from "./BushSnow";
import { useFrame } from "@react-three/fiber";

const Bush = ({ xPos, zPos, cellIndex, rowIndex }) => {
  const mesh = useRef();
  const pointMesh = useRef();
  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const ParticleTexture = new THREE.TextureLoader().load(lightTexture);

  const [particleGeometry, setParticleGeometry] = useState(
    new THREE.BufferGeometry()
  );

  const BushUniforms = useMemo(
    () => ({
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );

  const particleUniforms = useMemo(
    () => ({
      uTexture: { value: ParticleTexture },
      uTime: { value: 0.0 },
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );

  const particle_cnt = 50;

  useEffect(() => {
    const temp = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particle_cnt * 3);
    const alphaArray = new Float32Array(particle_cnt);
    const aLightColorArray = new Float32Array(particle_cnt);
    for (let i = 0; i < particle_cnt; i++) {
      let i3 = i * 3;
      positionArray[i3] = (Math.random() - 0.5) * 1.2;
      positionArray[i3 + 1] = (Math.random() * 0.7 - 0.5) * 1.2;
      positionArray[i3 + 2] = (Math.random() - 0.5) * 1.2;

      alphaArray[i] = Math.random();
      aLightColorArray[i] = Math.floor(Math.random() * 2);
    }

    temp.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positionArray), 3)
    );
    temp.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(new Float32Array(alphaArray), 1)
    );
    temp.setAttribute(
      "aLightColor",
      new THREE.BufferAttribute(new Float32Array(aLightColorArray), 1)
    );

    setParticleGeometry(temp);
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0.5,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(100, 0, zPos + 25 - cellIndex * 0.3);
      }
    }

    const { clock } = state;
    particleUniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      scale={1}
      ref={mesh}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[xPos - 100, 0, zPos - 50]}
    >
      <boxGeometry args={[1, 1, 1, 64, 64, 64]} />
      <shaderMaterial
        vertexShader={bushVertexShader}
        fragmentShader={bushFragmentShader}
        uniforms={BushUniforms}
      />
      <points ref={pointMesh} geometry={particleGeometry}>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthTest={true}
          attach="material"
          transparent={true}
          uniforms={particleUniforms}
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          fog={false}
        />
      </points>
      <BushSnow />
    </mesh>
  );
};

export default Bush;
