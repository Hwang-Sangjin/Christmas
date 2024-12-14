import Frame from "./Frame";
import Snow from "./Snow";
import Moon from "./Moon";
import Star from "./Star";
import Tree1 from "./Tree/Tree1";
import Ground from "./Ground";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

const Experience = () => {
  const autoGenerateTime = 10;
  const autoGenerateRow = 5;
  const maxTrees = 30;
  const autoGenerateCnt = 5;
  const [curTime, setCurTime] = useState(0);
  const [autoGenerateArr, setAutoGenerateArr] = useState([]);

  useEffect(() => {
    let treeIndex = 0;
    const timer = setInterval(() => {
      if (treeIndex < maxTrees) {
        const newIndex = Math.floor(Math.random() * autoGenerateCnt);

        setAutoGenerateArr((prev) => {
          const updatedArr = [...prev, newIndex]; // Add the new tree

          return updatedArr;
        });
        treeIndex++;
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
      {autoGenerateArr.map((index, id) => {
        return <Tree1 key={id} type={index} />;
      })}
    </>
  );
};

export default Experience;
