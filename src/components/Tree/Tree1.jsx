import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
const Tree1 = () => {
  const mesh = useRef();
  const { nodes, scene } = useGLTF("./Tree/tree1.glb");
  const bakedTexture = useTexture("./Tree/tree1_baked.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    const { clock } = state;
    mesh.current.position.set(
      (mesh.current.position.x -= clock.getElapsedTime() * 0.00033),
      0.3,
      (mesh.current.position.z -= clock.getElapsedTime() * 0.00011)
    );
  });

  return (
    <>
      <group ref={mesh}>
        {nodes.Scene.children[0].children.map((child) => {
          console.log(child);
          return (
            <mesh
              key={child.name}
              geometry={child.geometry}
              position={[-10, 0, 0]}
              rotation={[0, -Math.PI * 0.5, 0]}
              scale={0.5}
            >
              <meshBasicMaterial map={bakedTexture} fog={true} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

export default Tree1;
