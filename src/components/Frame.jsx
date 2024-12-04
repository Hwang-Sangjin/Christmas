import skyVertexShader from "../shaders/sky/vertex.glsl";
import skyFragmentShader from "../shaders/sky/fragment.glsl";

const Frame = () => {
  return (
    <mesh position={[0, 40, -50]}>
      <planeGeometry args={[2000, 180, 1, 1]} />
      <shaderMaterial
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
      />
    </mesh>
  );
};

export default Frame;
