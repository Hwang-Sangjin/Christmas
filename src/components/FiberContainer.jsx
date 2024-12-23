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

export default function FiberContainer() {
  const cameraControlRef = useRef(null);

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
          <OrbitControls
            target={[-45, 0, -25]}
            ref={cameraControlRef}
            enablePan={true}
            minDistance={1}
            maxDistance={200}
            // minAzimuthAngle={-Math.PI / 4}
            // maxAzimuthAngle={Math.PI / 4}
            // minPolarAngle={Math.PI / 100}
            // maxPolarAngle={Math.PI - Math.PI / 2}
          />
        </Suspense>
        <fog attach="fog" args={["#fbfbfb", 60, 100]} />
      </Canvas>
    </>
  );
}
