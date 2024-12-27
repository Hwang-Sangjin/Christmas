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

import { ChristmasTreeFinal } from "./ChristmasTree/ChristmasTreeFinal";
import House1 from "./House/House1";
import House2 from "./House/House2";
import House3 from "./House/House3";

const di = [-1, -1, 0, 1, 1, 1, 0, -1];
const dj = [0, 1, 1, 1, 0, -1, -1, -1];

const Experience = () => {
  const HEIGHT = 200;
  const WIDTH = 200;
  const StandLength = 20;

  const generateTown = () => {
    // Step 1: Initialize the 2D array with 0
    const town = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => 0)
    );

    const mainStreetValue = Math.floor(Math.random() * 10) + 60;
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
      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - 3 + di[k];
        let nj = j + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - 3][j] = 2;
    }

    for (
      let j = standStartPoint;
      j <= mainStreetStraightValue;
      j += StandLength
    ) {
      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + 5 + di[k];
        let nj = j + 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + 5][j + 1] = 2;
    }

    // 4 5 6  집 -Math.PI * 0.5
    // 7 8 9  집 Math.PI * 0.5
    // 10 11 12 집 0
    // 13 14 15 집 Math.PI
    const houseStartPoint = standStartPoint + Math.floor(StandLength / 2);
    for (
      let k = houseStartPoint;
      k <= mainStreetStraightValue - 5;
      k += StandLength
    ) {
      for (let i = mainStreetValue - 7; i <= mainStreetValue - 3; i++) {
        for (let j = k - 2; j <= k + 2; j++) {
          town[i][j] = -1;
        }
      }

      town[mainStreetValue - 5][k] = Math.floor(Math.random() * 3 + 4);
    }
    for (
      let k = houseStartPoint + 2;
      k <= mainStreetStraightValue - 5;
      k += StandLength
    ) {
      for (let i = mainStreetValue + 3; i <= mainStreetValue + 7; i++) {
        for (let j = k - 2; j <= k + 2; j++) {
          town[i][j] = -1;
        }
      }
      town[mainStreetValue + 7][k] = Math.floor(Math.random() * 3 + 7);
    }

    const townStreetType = Math.floor(Math.random());

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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 1 + di[k];
        let nj = mainStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 1][
        mainStreetStraightValue - 1
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 4 + di[k];
        let nj = mainStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 4][
        mainStreetStraightValue + 5
      ] = 2;

      //집
      const houseUpI = mainStreetValue - Math.floor(upStreetValue / 2);

      for (let i = houseUpI - 2; i <= houseUpI + 2; i++) {
        for (
          let j = mainStreetStraightValue - 6;
          j <= mainStreetStraightValue;
          j++
        ) {
          town[i][j] = -1;
        }
      }

      town[houseUpI][mainStreetStraightValue - 4] = Math.floor(
        Math.random() * 3 + 10
      );

      for (let i = houseUpI - 2; i <= houseUpI + 2; i++) {
        for (
          let j = mainStreetStraightValue + 4;
          j <= mainStreetStraightValue + 10;
          j++
        ) {
          town[i][j] = -1;
        }
      }

      town[houseUpI][mainStreetStraightValue + 8] = Math.floor(
        Math.random() * 3 + 13
      );

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
      // up straight stand
      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 2][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 5][
        mainStreetStraightValue + 20
      ] = 2;

      // up straight street
      for (
        let i = mainStreetValue - upStreetValue;
        i <= mainStreetValue + 3;
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
      // up house
      const houseUpStartPoint = mainStreetStraightValue + 7;
      for (
        let k = houseUpStartPoint;
        k <= houseUpStartPoint + subStreetStraightValue - 8;
        k += 8
      ) {
        town[mainStreetValue - upStreetValue - 5][k] = Math.floor(
          Math.random() * 3 + 4
        );
      }

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 2 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 2][
        mainStreetStraightValue + subStreetStraightValue + 2
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 3 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 5][
        mainStreetStraightValue + subStreetStraightValue - 3
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue + 5
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue - 1
      ] = 2;
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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 2 + di[k];
        let nj = mainStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 2][
        mainStreetStraightValue - 1
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 5
      ] = 2;

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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 5][
        mainStreetStraightValue + 20
      ] = 2;

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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 2 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + subStreetStraightValue - 2
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 3 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 5][
        mainStreetStraightValue + subStreetStraightValue + 3
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue + 5
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue - 1
      ] = 2;
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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 1 + di[k];
        let nj = mainStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 1][
        mainStreetStraightValue - 1
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 4 + di[k];
        let nj = mainStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue][mainStreetStraightValue + 5] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 2 + di[k];
        let nj = mainStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 2][
        mainStreetStraightValue - 1
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 5
      ] = 2;

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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 2][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 5][
        mainStreetStraightValue + 20
      ] = 2;

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

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 2][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 5][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + 20 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 5][
        mainStreetStraightValue + 20
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 2 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue - 2][
        mainStreetStraightValue + subStreetStraightValue - 2
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue - 2 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 2 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue - 2][
        mainStreetStraightValue + subStreetStraightValue + 2
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue - upStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 3 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue - upStreetValue + 5][
        mainStreetStraightValue + subStreetStraightValue - 3
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 5 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue + 5
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue - 1 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue][
        mainStreetStraightValue + subStreetStraightValue - 1
      ] = 2;

      for (let k = 0; k < 8; k++) {
        let ni = mainStreetValue + downStreetValue + 5 + di[k];
        let nj = mainStreetStraightValue + subStreetStraightValue + 3 + dj[k];

        town[ni][nj] = -1;
      }
      town[mainStreetValue + downStreetValue + 5][
        mainStreetStraightValue + subStreetStraightValue + 3
      ] = 2;
    }

    const treeOffset = 5;
    const treeZ =
      mainStreetStraightValue + Math.floor(subStreetStraightValue / 2);

    // 3 트리
    for (
      let i = mainStreetValue - treeOffset;
      i <= mainStreetValue + treeOffset;
      i++
    ) {
      for (let j = treeZ - treeOffset; j <= treeZ + treeOffset; j++) {
        town[i][j] = -1;
      }
    }
    town[mainStreetValue][treeZ] = 3;

    console.log(town);

    return town;
  };

  const [town, setTown] = useState([]);

  useEffect(() => {
    setTown(generateTown());
  }, []);

  return (
    <>
      <Frame />
      <Ground />
      <Snow />
      <Star />
      <Moon />
      {/* <House1 />
      <House3 /> */}

      {town.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => {
            if (cell === 2) {
              return (
                <Stand
                  key={`${rowIndex} + ${cellIndex} +${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                />
              );
            } else if (cell === 1) {
              return (
                <Stone
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                />
              );
            } else if (cell === 3) {
              return (
                <ChristmasTreeFinal
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                />
              );
            } else if (cell === 4) {
              return (
                <House1
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={-Math.PI * 0.5}
                />
              );
            } else if (cell === 5) {
              return (
                <House2
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={-Math.PI * 0.5}
                />
              );
            } else if (cell === 6) {
              return (
                <House3
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={-Math.PI * 0.5}
                />
              );
            } else if (cell === 7) {
              return (
                <House1
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI * 0.5}
                />
              );
            } else if (cell === 8) {
              return (
                <House2
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI * 0.5}
                />
              );
            } else if (cell === 9) {
              return (
                <House3
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI * 0.5}
                />
              );
            } else if (cell === 10) {
              return (
                <House1
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={0}
                />
              );
            } else if (cell === 11) {
              return (
                <House2
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={0}
                />
              );
            } else if (cell === 12) {
              return (
                <House3
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={0}
                />
              );
            } else if (cell === 13) {
              return (
                <House1
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI}
                />
              );
            } else if (cell === 14) {
              return (
                <House2
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI}
                />
              );
            } else if (cell === 15) {
              return (
                <House3
                  key={`${rowIndex} + ${cellIndex} + ${cell}`}
                  xPos={cellIndex}
                  zPos={rowIndex}
                  cellIndex={cellIndex}
                  rowIndex={rowIndex}
                  rotate={Math.PI}
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
