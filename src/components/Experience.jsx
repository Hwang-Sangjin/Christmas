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
  const autoGenerateCnt = 5;
  const [curTime, setCurTime] = useState(0);
  const [autoGenerateArr, setAutoGenerateArr] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = Math.floor(Math.random() * autoGenerateCnt);
      let temp = [...autoGenerateArr];
      if (autoGenerateArr.length <= 10) {
        temp.push(newIndex);
      } else {
        let temp = autoGenerateArr;
        temp.shift();
        temp.push(newIndex);
      }

      setAutoGenerateArr(temp);
    }, 10000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    console.log(autoGenerateArr);
  }, [autoGenerateArr]);

  return (
    <>
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Moon />
      {autoGenerateArr.map((index, key) => {
        return <Tree1 key={key} type={index} />;
      })}
    </>
  );
};

export default Experience;
