import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import lightTexture from "&/light.png";
import Perlin from "&/perlin.png";
import particlesVertexShader from "../../shaders/light/vertex.glsl";
import particlesFragmentShader from "../../shaders/light/fragment.glsl";
import { LightBulb } from "./LightBulb";

export function ChristmasTreeFinal(props) {
  const mesh = useRef();
  const pointMesh = useRef();
  const { nodes, materials } = useGLTF("./christmasTree/treeFinal.glb");

  const ParticleTexture = new THREE.TextureLoader().load(lightTexture);
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

  const [particleGeometry, setParticleGeometry] = useState(
    new THREE.BufferGeometry()
  );

  const particle_cnt = 1500; //0~5000
  const radiusArr = [
    0.38, 0.32, 0.33, 0.3, 0.24, 0.22, 0.21, 0.17, 0.11, 0.06, 0.03,
  ];

  useEffect(() => {
    const temp = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particle_cnt * 3);
    const alphaArray = new Float32Array(particle_cnt);
    const aLightColorArray = new Float32Array(particle_cnt);
    for (let i = 0; i < particle_cnt; i++) {
      let i3 = i * 3;
      const theta = Math.random() * 2 * Math.PI;
      const height = Math.floor(Math.random() * 10);
      const heightRandom = (Math.random() - 0.5) * 0.08;
      positionArray[i3] = (radiusArr[height] - heightRandom) * Math.cos(theta);
      positionArray[i3 + 1] = 0.1 * height + 0.1 + heightRandom;
      positionArray[i3 + 2] =
        (radiusArr[height] - heightRandom) * Math.sin(theta);

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
        0,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -110) {
        mesh.current.position.set(300, 0, 0);
      }
    }

    const { clock } = state;
    particleUniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <group
      scale={2.5}
      rotation={[0, -Math.PI * 0.6, 0]}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree001.geometry}
        material={materials["trunk.002"]}
        position={[0, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.leaves.geometry}
          material={materials.leaves}
        />
      </mesh>
      <points ref={pointMesh} geometry={particleGeometry}>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthTest={false}
          attach="material"
          transparent={true}
          uniforms={particleUniforms}
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          fog={false}
        />
      </points>
      <LightBulb />
    </group>
  );
}

useGLTF.preload("/christmasTree/treeFinal.glb");
