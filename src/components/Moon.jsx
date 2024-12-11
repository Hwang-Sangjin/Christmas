import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";

const Moon = () => {
  const { nodes, scene } = useGLTF("./Moon/moon.glb"); // Use the correct path relative to the `public` folder
  const bakedTexture = useTexture("./Moon/moon_baked.jpg");

  bakedTexture.flipY = false;
  return (
    <mesh
      geometry={nodes.NurbsPath.geometry}
      position={[0, 23, -30]}
      rotation={[Math.PI * 0.1, -Math.PI * 0.2, -Math.PI * 0.3]}
      scale={2.7}
    >
      <meshBasicMaterial map={bakedTexture} fog={false} />
    </mesh>
  );
};

export default Moon;
