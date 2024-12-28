import { useMemo, useRef } from "react";
import bushVertexShader from "../../shaders/bush/vertex.glsl";
import bushFragmentShader from "../../shaders/bush/fragment.glsl";
import * as THREE from "three";
import Perlin from "&/perlin.png";
import { BushSnow } from "./BushSnow";
import { useFrame } from "@react-three/fiber";

const Bush = ({ xPos, zPos, cellIndex, rowIndex }) => {
  const mesh = useRef();

  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const BushUniforms = useMemo(
    () => ({
      uPerlinTexture: { value: PerlinTexture },
    }),
    []
  );

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0.5,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(0, 0.5, zPos - 25 - cellIndex * 0.3);
      }
    }
  });

  return (
    <mesh
      scale={1}
      ref={mesh}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[xPos - 100, 0.5, zPos - 50]}
    >
      <boxGeometry args={[1, 1, 1, 64, 64, 64]} />
      <shaderMaterial
        vertexShader={bushVertexShader}
        fragmentShader={bushFragmentShader}
        uniforms={BushUniforms}
      />
      <BushSnow />
    </mesh>
  );
};

export default Bush;
