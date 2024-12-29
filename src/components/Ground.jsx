import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import CustomShaderMaterialImpl from "three-custom-shader-material/vanilla";
import groundVertexShader from "@/shaders/ground/vertex.glsl";
import groundFragmentShader from "@/shaders/ground/fragment.glsl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import GUI from "lil-gui";

const debugObject = {};
// Material
debugObject.colorWaterDeep = "#002b3d";
debugObject.colorWaterSurface = "#66a8ff";
debugObject.colorSand = "#ffe894";
debugObject.colorGrass = "#85d534";
debugObject.colorSnow = "#ffffff";
debugObject.colorRock = "#bfbd8d";
debugObject.color = "#ffffff";

const Ground = () => {
  const mesh = useRef();

  const [materialRef, setMaterialRef] = useState();

  const uniforms = useMemo(
    () => ({
      uPositionFrequency: new THREE.Uniform(0.22),
      uStrength: new THREE.Uniform(0.5),
      uWarpFrequency: new THREE.Uniform(3),
      uWarpStrength: new THREE.Uniform(0.2),
      uTime: new THREE.Uniform(0),
      uColorWaterDeep: new THREE.Uniform(
        new THREE.Color(debugObject.colorWaterDeep)
      ),
      uColorWaterSurface: new THREE.Uniform(
        new THREE.Color(debugObject.colorWaterSurface)
      ),
      uColorSand: new THREE.Uniform(new THREE.Color(debugObject.colorSand)),
      uColorGrass: new THREE.Uniform(new THREE.Color(debugObject.colorGrass)),
      uColorSnow: new THREE.Uniform(new THREE.Color(debugObject.colorSnow)),
      uColorRock: new THREE.Uniform(new THREE.Color(debugObject.colorRock)),
      uColor: new THREE.Uniform(new THREE.Color(debugObject.color)),
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[200, 100, 2048, 2048]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={groundVertexShader}
        fragmentShader={groundFragmentShader}
        uniforms={uniforms}
        color="#ffffff"
        metalness={0}
        roughness={0.5}
      />
      {materialRef && (
        <CustomShaderMaterial
          baseMaterial={THREE.MeshDepthMaterial}
          vertexShader={groundVertexShader}
          color="#ffffff"
          uniforms={uniforms}
          depthPacking={THREE.RGBADepthPacking}
        />
      )}
    </mesh>
  );
};

export default Ground;
