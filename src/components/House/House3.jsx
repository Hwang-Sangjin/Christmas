import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const House3 = () => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("./House/house3.glb");

  const bakedTexture = useTexture("./House/house3.jpg");
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
    <group scale={3} rotation={[0, -Math.PI * 0.5, 0]} dispose={null}>
      <group
        position={[-0.514, 1.386, -0.577]}
        rotation={[0, 0.005, 0]}
        scale={[0.784, 0.369, 0.714]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296.geometry}
          material={materials["Material.033"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_1.geometry}
          material={materials["Material.025"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_2.geometry}
          material={materials["Material.026"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_3.geometry}
          material={materials["Material.022"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_4.geometry}
          material={materials["Material.034"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_5.geometry}
          material={materials["Material.032"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1296_6.geometry}
          material={materials["Snow.007"]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload("./House/house3.glb");

export default House3;
