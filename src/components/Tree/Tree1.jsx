import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
const Tree1 = ({ type }) => {
  const mesh = useRef();
  const { nodes, scene } = useGLTF("./Tree/tree1.glb");

  // Load all textures
  const baked1Texture = useTexture("./Tree/tree1_baked.jpg");
  const baked2Texture = useTexture("./Tree/tree2_baked.jpg");
  const baked3Texture = useTexture("./Tree/tree3_baked.jpg");
  const baked4Texture = useTexture("./Tree/tree4_baked.jpg");
  const baked5Texture = useTexture("./Tree/tree5_baked.jpg");

  // Configure textures
  const textures = useMemo(() => {
    const textureArray = [
      baked1Texture,
      baked2Texture,
      baked3Texture,
      baked4Texture,
      baked5Texture,
    ];
    textureArray.forEach((texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
    });
    return textureArray;
  }, [
    baked1Texture,
    baked2Texture,
    baked3Texture,
    baked4Texture,
    baked5Texture,
  ]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0.3,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(100, 0.3, 0);
      }
    }
  });

  return (
    <>
      <group ref={mesh} position={[100, 0.3, 0]}>
        {nodes.Scene.children[0].children.map((child) => {
          return (
            <mesh
              key={child.name}
              geometry={child.geometry}
              rotation={[0, -Math.PI * 0.5, 0]}
              scale={0.5}
              dispose={null}
            >
              <meshBasicMaterial map={textures[type]} fog={true} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

useGLTF.preload("./Tree/tree1.glb");

export default Tree1;
