import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function FixedCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(-45, 0, -25); // Adjust target coordinates as needed
  }, [camera]);

  return null;
}
export default FixedCamera;
