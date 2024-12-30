import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const House1 = ({ xPos, zPos, cellIndex, rowIndex, rotate }) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("./House/house1.glb");

  const bakedTexture = useTexture("./House/house1.jpg");
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
      scale={3}
      position={[xPos - 100, 0, zPos - 50]}
      rotation={[0, rotate, 0]}
      dispose={null}
    >
      <group
        position={[0.902, 0.15, -0.953]}
        rotation={[0, 0, -Math.PI]}
        scale={[0.006, 0.005, 0.004]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127.geometry}
          material={materials["Material.028"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_1.geometry}
          material={materials["Material.030"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_2.geometry}
          material={materials["Material.029"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_3.geometry}
          material={materials["Material.027"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_4.geometry}
          material={materials.y_light}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_5.geometry}
          material={materials["Material.024"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2127_6.geometry}
          material={materials["Snow.007"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload("./House/house1.glb");

export default House1;
