import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function LightBulb(props) {
  const { nodes, materials } = useGLTF("./christmasTree/lightbulb.glb");

  const bakedTexture = useTexture("./christmasTree/lightbulb.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group {...props} dispose={null}>
      <group position={[0.17, 0.817, -0.01]} scale={0.017}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials.lightbulb1}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials.lightbulb2}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/lightbulb.glb");
