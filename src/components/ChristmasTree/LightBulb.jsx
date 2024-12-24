import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function LightBulb(props) {
  const { nodes, materials } = useGLTF("./christmasTree/lightbulb.glb");

  const bakedTexture = useTexture("./christmasTree/lightbulb.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere.geometry}
        material={materials.lightbulb1}
        position={[1.013, 1.789, 0.583]}
        scale={0.093}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere001.geometry}
        material={materials.lightbulb1}
        position={[0.634, 2.764, -0.038]}
        scale={0.086}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere002.geometry}
        material={materials.lightbulb1}
        position={[0.04, 2.204, 0.971]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere003.geometry}
        material={materials.lightbulb1}
        position={[0.43, 2.149, -0.997]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere004.geometry}
        material={materials.lightbulb2}
        position={[0.938, 1.851, -0.483]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere005.geometry}
        material={materials.lightbulb2}
        position={[0.57, 1.504, 1.194]}
        scale={0.102}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere006.geometry}
        material={materials.lightbulb1}
        position={[0.471, 2.548, 0.538]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere007.geometry}
        material={materials.lightbulb1}
        position={[-0.437, 1.626, -1.064]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere008.geometry}
        material={materials.lightbulb1}
        position={[0.977, 1.125, -0.997]}
        scale={0.091}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere009.geometry}
        material={materials.lightbulb2}
        position={[1.273, 1.017, 0.242]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere010.geometry}
        material={materials.lightbulb2}
        position={[0.394, 2.738, -0.706]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere011.geometry}
        material={materials.lightbulb1}
        position={[-0.299, 3.002, -0.706]}
        scale={0.088}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere012.geometry}
        material={materials.lightbulb2}
        position={[-0.067, 2.87, 0.718]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere013.geometry}
        material={materials.lightbulb1}
        position={[0.326, 3.415, 0.408]}
        scale={-0.103}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere014.geometry}
        material={materials.lightbulb2}
        position={[0.439, 3.425, -0.164]}
        scale={0.097}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere015.geometry}
        material={materials.lightbulb1}
        position={[0.067, 3.649, -0.414]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere016.geometry}
        material={materials.lightbulb2}
        position={[-0.299, 2.19, -1.014]}
        scale={0.096}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere017.geometry}
        material={materials.lightbulb1}
        position={[1.202, 1.789, 0.039]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere018.geometry}
        material={materials.lightbulb1}
        position={[0.841, 2.394, -0.278]}
        scale={0.096}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere019.geometry}
        material={materials.lightbulb2}
        position={[0.913, 2.394, 0.359]}
        scale={0.099}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Icosphere020.geometry}
        material={materials.lightbulb2}
        position={[0.519, 1.613, -1.202]}
        scale={0.109}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/lightbulb.glb");
