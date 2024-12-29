import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useEnvironment,
  CameraControls,
} from "@react-three/drei";

import { Suspense, useRef } from "react";

import { Loader } from "./Loader/Loader";
import Experience from "./Experience";
import FixedCamera from "./FixedCamera";

export default function FiberContainer() {
  return (
    <>
      <Loader />
      <Canvas camera={{ position: [-100, 20, 50], fov: 35 }} shadows>
        <Suspense fallback={null}>
          <Experience />
          <Environment preset="sunset" backgroundBlurriness={0.1} />
          <directionalLight
            position={[6.25, 10, 4]}
            color="black"
            intensity={1.2}
          />
          <FixedCamera />
        </Suspense>
        <fog attach="fog" args={["#fbfbfb", 60, 100]} />
      </Canvas>
    </>
  );
}
