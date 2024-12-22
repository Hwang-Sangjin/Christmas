/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function ChristmasTree(props) {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("./christmasTree/christmasTree.glb");

  const bakedTexture = useTexture("./christmasTree/christmasTree.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -110) {
        mesh.current.position.set(300, 0, zPos);
      }
    }
  });

  return (
    <group
      ref={mesh}
      scale={6}
      rotation={[0, -Math.PI * 0.75, 0]}
      {...props}
      dispose={null}
    >
      <group position={[-0.01, 1.086, -0.03]} scale={0.035}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder046.geometry}
          material={materials.tree1}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder046_1.geometry}
          material={materials.tree2}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.040"]}
        position={[-0.009, 1.142, -0.03]}
        rotation={[Math.PI / 2, 0, 1.487]}
        scale={[0.071, 0.035, 0.071]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/christmasTree.glb");
