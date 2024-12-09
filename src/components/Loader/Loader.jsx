import * as React from "react";
import { useProgress } from "@react-three/drei";
import "./Loader.css";

export function Loader() {
  const { active, progress } = useProgress();

  React.useEffect(() => {
    console.log(progress);
  }, [progress]);

  return active ? (
    <div className="loader">
      <span>{Math.floor(progress)}%</span>
    </div>
  ) : null;
}
