import Frame from "./Frame";
import Snow from "./Snow";
import Moon from "./Moon";
import Star from "./Star";
import Tree1 from "./Tree/Tree1";
import Ground from "./Ground";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

const Experience = () => {
  const maxTrees = 33;
  const autoGenerateCnt = 6;
  const [autoGenerateArr1, setAutoGenerateArr1] = useState([]);
  const [autoGenerateArr2, setAutoGenerateArr2] = useState([]);
  const [autoGenerateArr3, setAutoGenerateArr3] = useState([]);

  useEffect(() => {
    let treeIndex1 = 0;
    let treeIndex2 = 0;

    const timer = setInterval(() => {
      if (treeIndex1 < maxTrees) {
        const newIndex = Math.floor(Math.random() * autoGenerateCnt);

        setAutoGenerateArr1((prev) => {
          const updatedArr = [...prev, newIndex]; // Add the new tree

          return updatedArr;
        });
        treeIndex1++;
      }
    }, 4000); // Generate a tree every 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Moon />
      {autoGenerateArr1.map((index, id) => {
        return <Tree1 key={id} type={index} zPos={50} />;
      })}
    </>
  );
};

export default Experience;
