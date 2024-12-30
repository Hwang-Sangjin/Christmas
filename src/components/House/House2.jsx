import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const House2 = ({ xPos, zPos, cellIndex, rowIndex, rotate }) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("./House/house2.glb");

  const bakedTexture = useTexture("./House/house2.jpg");
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
        mesh.current.position.set(100, 0, zPos + 25 - cellIndex * 0.3);
      }
    }
  });

  return (
    <group
      ref={mesh}
      position={[xPos - 100, 0, zPos - 50]}
      scale={3}
      rotation={[0, rotate, 0]}
      dispose={null}
    >
      <group
        position={[-0.0, 0.8, -2.014]}
        rotation={[Math.PI / 2, 0, -0.033]}
        scale={[0.17, 0.112, 0.211]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_1.geometry}
          material={materials["Material.015"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_2.geometry}
          material={materials["Material.019"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_3.geometry}
          material={materials["y_light.001"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_4.geometry}
          material={materials["Material.020"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane029_5.geometry}
          material={materials["Snow.007"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload("./House/house2.glb");

export default House2;
