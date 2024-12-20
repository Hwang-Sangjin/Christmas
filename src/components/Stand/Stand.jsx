import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Stand({ xPos, zPos }) {
  const mesh = useRef();
  const { nodes, scene, materials } = useGLTF("./Stand/stand.glb");

  const bakedTexture = useTexture("./Stand/stand.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(0, 0, zPos - 50);
      }
    }
  });

  return (
    <group
      ref={mesh}
      scale={3}
      position={[xPos - 100, 0, zPos - 50]}
      rotation={[0, -Math.PI * 0.6, 0]}
      dispose={null}
    >
      <group position={[0, 1.832, 0.027]} scale={0.098}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.stand1}
        >
          <meshBasicMaterial map={bakedTexture} fog={true} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials.stand2}
        >
          <meshBasicMaterial map={bakedTexture} fog={true} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials.stand3}
        >
          <meshBasicMaterial map={bakedTexture} fog={true} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/stand.glb");
