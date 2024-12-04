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
      uPositionFrequency: new THREE.Uniform(0.2),
      uStrength: new THREE.Uniform(0.6),
      uWarpFrequency: new THREE.Uniform(5),
      uWarpStrength: new THREE.Uniform(0.5),
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

  useEffect(() => {
    const gui = new GUI();

    gui.add(
      mesh.current.material.uniforms.uPositionFrequency,
      "value",
      0,
      1,
      0.001
    );

    gui.add(mesh.current.material.uniforms.uStrength, "value", 0, 10, 0.001);
    gui.add(
      mesh.current.material.uniforms.uWarpFrequency,
      "value",
      0,
      10,
      0.001
    );
    gui.add(
      mesh.current.material.uniforms.uWarpStrength,
      "value",
      0,
      10,
      0.001
    );

    gui
      .addColor(debugObject, "colorWaterDeep")
      .onChange(() =>
        mesh.current.material.uniforms.uColorWaterDeep.value.set(
          debugObject.colorWaterDeep
        )
      );

    gui
      .addColor(debugObject, "colorWaterSurface")
      .onChange(() =>
        mesh.current.material.uniforms.uColorWaterSurface.value.set(
          debugObject.colorWaterSurface
        )
      );

    gui
      .addColor(debugObject, "colorSand")
      .onChange(() =>
        mesh.current.material.uniforms.uColorSand.value.set(
          debugObject.colorSand
        )
      );

    gui
      .addColor(debugObject, "colorGrass")
      .onChange(() =>
        mesh.current.material.uniforms.uColorGrass.value.set(
          debugObject.colorGrass
        )
      );

    gui
      .addColor(debugObject, "colorRock")
      .onChange(() =>
        mesh.current.material.uniforms.uColorRock.value.set(
          debugObject.colorRock
        )
      );

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <mesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[100, 100, 2048, 2048]} />
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
