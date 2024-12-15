import Frame from "./Frame";
import Snow from "./Snow";
import Moon from "./Moon";
import Star from "./Star";
import Tree1 from "./Tree/Tree1";
import Ground from "./Ground";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

const Experience = () => {
  const TreeCnt = 200;

  const [treeArray, setTreeArray] = useState([]);

  useEffect(() => {
    let tempArray = [];

    for (let i = 0; i < TreeCnt; i++) {
      const x = Math.floor(Math.random() * 200) - 100;
      const z = Math.floor(Math.random() * 100) - 50;
      tempArray.push([x, z]);
    }

    setTreeArray(tempArray);
  }, []);

  return (
    <>
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Moon />
      {treeArray.map((instance, index) => {
        return <Tree1 xPos={instance[0]} zPos={instance[1]} />;
      })}
    </>
  );
};

export default Experience;
