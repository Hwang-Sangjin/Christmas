import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useEnvironment,
  CameraControls,
} from "@react-three/drei";
import Ground from "./Ground";
import { useRef } from "react";
import Frame from "./Frame";
import Snow from "./Snow";
import Moon from "./Moon";
import Star from "./Star";

export default function FiberContainer() {
  const cameraControlRef = useRef(null);

  return (
    <Canvas camera={{ position: [-100, 10, 50], fov: 35 }} shadows>
      <fog attach="fog" args={["#fbfbfb", 25, 75]} />
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Environment preset="sunset" backgroundBlurriness={0.1} />
      <directionalLight position={[6.25, 3, 4]} color="white" intensity={1.2} />
      <OrbitControls
        target={[-35, 2, -50]}
        ref={cameraControlRef}
        enablePan={true}
        minDistance={1}
        maxDistance={200}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        // minPolarAngle={Math.PI / 100}
        // maxPolarAngle={Math.PI - Math.PI / 2}
      />
    </Canvas>
  );
}
