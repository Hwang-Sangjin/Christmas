import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Snowman({ xPos, zPos, cellIndex, rowIndex, rotate }) {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("./Snowman/snowman.glb");

  const bakedTexture = useTexture("./Snowman/snowman.jpg");
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
        mesh.current.position.set(0, 0, zPos - 25 - cellIndex * 0.3);
      }
    }
  });

  return (
    <group
      ref={mesh}
      scale={3}
      position={[xPos - 100, 0, zPos - 50]}
      rotation={[0, rotate, 0]}
      dispose={null}
    >
      <group
        position={[0, 0.5, 0]}
        rotation={[3.031, -0.093, -2.442]}
        scale={1.154}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials.trunk}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials["Snow.002"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_3.geometry}
          material={materials.button}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_4.geometry}
          material={materials.carrot}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("./Snowman/snowman.glb");
