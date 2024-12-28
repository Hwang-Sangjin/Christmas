import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function BushSnow(props) {
  const { nodes, materials } = useGLTF("./Bush/bushSnow.glb");
  return (
    <group
      scale={0.5}
      rotation={[Math.PI * 0.5, 0, 0]}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SnowBall003.geometry}
        material={materials.Snow}
        position={[-0.1, 1.0, 0.1]}
      />
    </group>
  );
}

useGLTF.preload("./Bush/bushSnow.glb");
