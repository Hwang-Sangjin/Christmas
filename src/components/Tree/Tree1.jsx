import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
const Tree1 = ({ type }) => {
  const mesh = useRef();
  const { nodes, scene } = useGLTF("./Tree/tree1.glb");

  const baked1Texture = useTexture("./Tree/tree1_baked.jpg");
  baked1Texture.flipY = false;
  baked1Texture.colorSpace = THREE.SRGBColorSpace;

  const baked2Texture = useTexture("./Tree/tree2_baked.jpg");
  baked2Texture.flipY = false;
  baked2Texture.colorSpace = THREE.SRGBColorSpace;

  const baked3Texture = useTexture("./Tree/tree3_baked.jpg");
  baked3Texture.flipY = false;
  baked3Texture.colorSpace = THREE.SRGBColorSpace;

  const baked4Texture = useTexture("./Tree/tree4_baked.jpg");
  baked4Texture.flipY = false;
  baked4Texture.colorSpace = THREE.SRGBColorSpace;

  const baked5Texture = useTexture("./Tree/tree5_baked.jpg");
  baked5Texture.flipY = false;
  baked5Texture.colorSpace = THREE.SRGBColorSpace;

  const { treeTypeArr, setTreeTypeArr } = useState([
    baked1Texture,
    baked2Texture,
    baked3Texture,
    baked4Texture,
    baked5Texture,
  ]);

  useFrame((state, delta) => {
    const { clock } = state;
    const strength = 0.00011;
    console.log(delta);
    mesh.current.position.set(
      (mesh.current.position.x -= delta * 1.5),
      0.3,
      (mesh.current.position.z -= delta * 0.5)
    );
  });

  return (
    <>
      <group ref={mesh} position={[-10, 0, 0]}>
        {nodes.Scene.children[0].children.map((child) => {
          console.log(child);
          return (
            <mesh
              key={child.name}
              geometry={child.geometry}
              rotation={[0, -Math.PI * 0.5, 0]}
              scale={0.5}
            >
              <meshBasicMaterial map={baked1Texture} fog={true} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

export default Tree1;
