import Perlin from "&/perlin.png";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import stoneVertexShader from "../shaders/stone/vertex.glsl";
import stoneFragmentShader from "../shaders/stone/fragment.glsl";

const Stone = ({ xPos, zPos, cellIndex, rowIndex }) => {
  const mesh = useRef();

  const PerlinTexture = new THREE.TextureLoader().load(Perlin);
  PerlinTexture.wrapS = THREE.RepeatWrapping;
  PerlinTexture.wrapT = THREE.RepeatWrapping;

  const randomArray = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(Math.random());
    }
    return arr;
  }, []);

  const StoneUniforms = useMemo(
    () => ({
      uPerlinTexture: { value: PerlinTexture },
      uCellIndex: { value: cellIndex },
      uRowIndex: { value: rowIndex },
      uRandomArray: { value: randomArray },
    }),
    [randomArray]
  );

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.set(
        (mesh.current.position.x -= delta * 1.5),
        0,
        (mesh.current.position.z -= delta * 0.5)
      );

      if (mesh.current.position.x < -100) {
        mesh.current.position.set(0, 0, zPos - 50);
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[xPos - 100, 0.0, zPos - 50]}
    >
      <boxGeometry args={[0.7, 0.7, 0.1, 16, 16, 2]} />
      <shaderMaterial
        vertexShader={stoneVertexShader}
        fragmentShader={stoneFragmentShader}
        uniforms={StoneUniforms}
      />
    </mesh>
  );
};

export default Stone;
