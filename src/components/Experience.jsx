import Frame from "./Frame";
import Snow from "./Snow";
import Moon from "./Moon";
import Star from "./Star";
import Tree1 from "./Tree/Tree1";
import Ground from "./Ground";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Stand } from "./Stand/Stand";
import Stone from "./Stone";

const Experience = () => {
  const HEIGHT = 100;
  const WIDTH = 200;
  const StandLength = 20;

  const generateTown = () => {
    // Step 1: Initialize the 2D array with 0
    const town = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => 0)
    );

    const mainStreetValue = Math.floor(Math.random() * 10) + 45;
    const mainStreetStraightValue = Math.floor(Math.random() * 30) + 50;

    // 1은 길
    for (let i = mainStreetValue; i <= mainStreetValue + 2; i++) {
      for (let j = 0; j <= mainStreetStraightValue; j++) {
        town[i][j] = 1;
      }
    }

    // -1은 아무것도 없음
    for (let j = 0; j <= mainStreetStraightValue; j++) {
      town[mainStreetValue - 1][j] = -1;
      town[mainStreetValue + 3][j] = -1;
    }

    // 2는 가로등
    const standStartPoint = Math.floor(Math.random() * 5) + 5;
    for (
      let j = standStartPoint;
      j <= mainStreetStraightValue;
      j += StandLength
    ) {
      town[mainStreetValue - 3][j] = 2;
      town[mainStreetValue - 3][j + 1] = -1;
      town[mainStreetValue - 2][j] = -1;
      town[mainStreetValue - 2][j + 1] = -1;
    }

    for (
      let j = standStartPoint;
      j <= mainStreetStraightValue;
      j += StandLength
    ) {
      town[mainStreetValue + 5][j] = -1;
      town[mainStreetValue + 5][j + 1] = -1;
      town[mainStreetValue + 6][j] = -1;
      town[mainStreetValue + 6][j + 1] = 2;
    }

    const townStreetType = Math.floor(Math.random() * 3);

    const upStreetValue = Math.floor(Math.random() * 5) + 15;
    const downStreetValue = Math.floor(Math.random() * 5) + 15;

    if (townStreetType === 0) {
      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 1;
          j <= mainStreetStraightValue + 3;
          j++
        ) {
          town[i][j] = 1;
        }
      }
    } else if (townStreetType === 1) {
      for (
        let i = mainStreetValue;
        i <= mainStreetValue + downStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 1;
          j <= mainStreetStraightValue + 3;
          j++
        ) {
          town[i][j] = 1;
        }
      }
    } else if (townStreetType === 2) {
      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue + 2 + downStreetValue;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 1;
          j <= mainStreetStraightValue + 3;
          j++
        ) {
          town[i][j] = 1;
        }
      }
    }

    return town;
  };

  const [town, setTown] = useState([]);

  useEffect(() => {
    setTown(generateTown());
  }, []);

  useEffect(() => {
    console.log(town);
  }, [town]);

  return (
    <>
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Moon />
      {town.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => {
            if (cell === 2) {
              return (
                <Stand
                  key={`${rowIndex}` + cellIndex}
                  xPos={cellIndex}
                  zPos={rowIndex}
                />
              );
            } else if (cell === 1) {
              return (
                <Stone
                  key={`${rowIndex}` + cellIndex}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                />
              );
            }
          })}
        </>
      ))}
    </>
  );
};

export default Experience;
