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

    const upStreetValue = Math.floor(Math.random() * 5) + 25;
    const downStreetValue = Math.floor(Math.random() * 5) + 25;
    const subStreetStraightValue = Math.floor(Math.random() * 10) + 40;

    //up
    if (townStreetType === 0) {
      //up
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

      //up stand
      town[mainStreetValue - upStreetValue][mainStreetStraightValue] = -1;
      town[mainStreetValue - upStreetValue][mainStreetStraightValue - 1] = 2;
      town[mainStreetValue - upStreetValue - 1][mainStreetStraightValue] = -1;
      town[mainStreetValue - upStreetValue - 1][mainStreetStraightValue - 1] =
        -1;

      //up stand
      town[mainStreetValue - upStreetValue + 4][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue - upStreetValue + 4][
        mainStreetStraightValue + 5
      ] = 2;
      town[mainStreetValue - upStreetValue + 5][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue - upStreetValue + 5][mainStreetStraightValue + 5] =
        -1;

      //up straight
      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue - upStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 4;
          j <= mainStreetStraightValue + subStreetStraightValue;
          j++
        ) {
          town[i][j] = 1;
        }
      }

      for (let i = mainStreetValue - upStreetValue; i <= mainStreetValue; i++) {
        for (
          let j = mainStreetStraightValue + subStreetStraightValue + 1;
          j <= mainStreetStraightValue + subStreetStraightValue + 3;
          j++
        ) {
          town[i][j] = 1;
        }
      }
    }
    //down
    else if (townStreetType === 1) {
      //down
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

      //up stand
      town[mainStreetValue + downStreetValue + 2][mainStreetStraightValue] = -1;
      town[mainStreetValue + downStreetValue + 2][
        mainStreetStraightValue - 1
      ] = 2;
      town[mainStreetValue + downStreetValue + 3][mainStreetStraightValue] = -1;
      town[mainStreetValue + downStreetValue + 3][mainStreetStraightValue - 1] =
        -1;

      //up stand
      town[mainStreetValue + downStreetValue - 2][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 5
      ] = 2;
      town[mainStreetValue + downStreetValue - 3][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue + downStreetValue - 3][mainStreetStraightValue + 5] =
        -1;

      //down straight
      for (
        let i = mainStreetValue + downStreetValue;
        i <= mainStreetValue + downStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 4;
          j <= mainStreetStraightValue + subStreetStraightValue;
          j++
        ) {
          town[i][j] = 1;
        }
      }

      for (
        let i = mainStreetValue;
        i <= mainStreetValue + downStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + subStreetStraightValue + 1;
          j <= mainStreetStraightValue + subStreetStraightValue + 3;
          j++
        ) {
          town[i][j] = 1;
        }
      }
    }
    //up down
    else if (townStreetType === 2) {
      //up down
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

      //up stand
      town[mainStreetValue - upStreetValue][mainStreetStraightValue] = -1;
      town[mainStreetValue - upStreetValue][mainStreetStraightValue - 1] = 2;
      town[mainStreetValue - upStreetValue - 1][mainStreetStraightValue] = -1;
      town[mainStreetValue - upStreetValue - 1][mainStreetStraightValue - 1] =
        -1;

      //up stand
      town[mainStreetValue - upStreetValue + 4][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue - upStreetValue + 4][
        mainStreetStraightValue + 5
      ] = 2;
      town[mainStreetValue - upStreetValue + 5][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue - upStreetValue + 5][mainStreetStraightValue + 5] =
        -1;

      //up stand
      town[mainStreetValue + downStreetValue + 2][mainStreetStraightValue] = -1;
      town[mainStreetValue + downStreetValue + 2][
        mainStreetStraightValue - 1
      ] = 2;
      town[mainStreetValue + downStreetValue + 3][mainStreetStraightValue] = -1;
      town[mainStreetValue + downStreetValue + 3][mainStreetStraightValue - 1] =
        -1;

      //up stand
      town[mainStreetValue + downStreetValue - 2][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 5
      ] = 2;
      town[mainStreetValue + downStreetValue - 3][mainStreetStraightValue + 4] =
        -1;
      town[mainStreetValue + downStreetValue - 3][mainStreetStraightValue + 5] =
        -1;

      //up
      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue - upStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 4;
          j <= mainStreetStraightValue + subStreetStraightValue;
          j++
        ) {
          town[i][j] = 1;
        }
      }
      //down
      for (
        let i = mainStreetValue + downStreetValue;
        i <= mainStreetValue + downStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + 4;
          j <= mainStreetStraightValue + subStreetStraightValue;
          j++
        ) {
          town[i][j] = 1;
        }
      }

      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue + downStreetValue + 2;
        i++
      ) {
        for (
          let j = mainStreetStraightValue + subStreetStraightValue + 1;
          j <= mainStreetStraightValue + subStreetStraightValue + 3;
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
