import { Instance, Merged, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const Tree1 = ({ xPos, zPos, cellIndex }) => {
  const mesh = useRef();
  const { nodes, scene, materials } = useGLTF("./Tree/tree.glb");
  const [size, setSize] = useState(Math.random() * 2 + 2);
  const [rotation, setRotation] = useState(-Math.random() * 2.0 - 0.5);

  // Load all textures
  const bakedTexture = useTexture("./Tree/tree.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  // Configure textures

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
      rotation={[0, rotation, 0]}
      dispose={null}
      scale={size}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trump.geometry}
        material={materials["Material.001"]}
        position={[0.938, 0.317, 0.032]}
        rotation={[Math.PI, -0.244, Math.PI]}
        scale={[0.062, 0.312, 0.062]}
      >
        <meshBasicMaterial map={bakedTexture} fog={true} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree.geometry}
        material={materials["Material.010"]}
        position={[0.938, 1.356, 0.032]}
        rotation={[0, -1.52, 0]}
        scale={2.069}
      >
        <meshBasicMaterial map={bakedTexture} fog={true} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.snow.geometry}
        material={materials["Snow.007"]}
        position={[0.937, 1.077, 0.032]}
        rotation={[0, -1.52, 0]}
        scale={[2.069, 6.255, 2.069]}
      >
        <meshBasicMaterial map={bakedTexture} fog={true} />
      </mesh>
    </group>
  );
};

useGLTF.preload("./Tree/tree1.glb");

export default Tree1;
