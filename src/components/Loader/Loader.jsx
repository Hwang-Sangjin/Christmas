import * as React from "react";
import { useProgress } from "@react-three/drei";
import "./Loader.css";

export function Loader() {
  const { active, progress } = useProgress();

  return active ? (
    <div className="loader">
      <span>{Math.floor(progress)}%</span>
    </div>
  ) : null;
}
