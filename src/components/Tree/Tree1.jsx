import { Merged, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const Tree1 = ({ xPos, zPos }) => {
  const mesh = useRef();
  const { nodes, scene } = useGLTF("./Tree/tree1.glb");

  const size = Math.random() * 0.3 + 0.35;
  const rotation = Math.random() * 0.5 + 0.5;
  const textureIndex = Math.floor(Math.random() * 5);

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

  const instances = useMemo(() => {
    return nodes.Scene.children[0].children.map((child, index) => ({
      geometry: child.geometry,
      material: new THREE.MeshBasicMaterial({
        map: textures[textureIndex],
        fog: true,
      }),
    }));
  }, [nodes, textures]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0.3,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(100, 0.3, zPos);
      }
      if (mesh.current.position.z < -48) {
        mesh.current.position.set(
          (mesh.current.position.x -= delta * 0.5),
          0.3,
          -48
        );
        if (mesh.current.position.x < -100) {
          mesh.current.position.set(100, 0.3, zPos);
        }
      }
    }
  });

  return (
    <>
      <group
        ref={mesh}
        position={[xPos, 0.3, zPos]}
        scale={size}
        rotation={[0, -Math.PI * rotation, 0]}
      >
        <Merged meshes={instances}>
          {(Instance) => {
            return instances.map((instance, index) => (
              <mesh
                key={index}
                geometry={instance.geometry}
                material={instance.material}
              />
            ));
          }}
        </Merged>
      </group>
    </>
  );
};

useGLTF.preload("./Tree/tree1.glb");

export default Tree1;
