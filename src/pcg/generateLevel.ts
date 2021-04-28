// import seedrandom from 'seedrandom';

// Inspired by https://www.youtube.com/watch?v=TlLIOgWYVpI

import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { Area } from '../typings/area';
import { CellTile } from '../typings/cell';
import { Level } from '../typings/level';
import { findCellsInArea } from '../utils/findCellsInArea';
import { walkGrid } from '../utils/walkGrid';
import { getRandomAreaWithinArea } from './getRandomAreaWithinArea';
import { horizontalSplitArea } from './horizontalSplitArea';
import { verticalSplitArea } from './verticalSplitArea';

const NUMBER_0F_SPLITS = 3;

const fullMap: Area = {
  origin: { x: 0, y: 0 },
  end: { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 },
};

const createEmptyMap = (width: number, height: number): CellTile[][] => {
  const map: CellTile[][] = [];
  for (let j = 0; j < height; j++) {
    map[j] = [];
    for (let i = 0; i < width; i++) {
      map[j][i] = 'X';
    }
  }
  return map;
};

const placeRectangleOnMap = (map: CellTile[][], area: Area): CellTile[][] => {
  const newMap = map;
  for (let i = area.origin.x; i <= area.end.x; i++) {
    for (let j = area.origin.y; j <= area.end.y; j++) {
      if (i === area.origin.x || i === area.end.x || j === area.origin.y || j === area.end.y) {
        newMap[j][i] = 'X';
      } else {
        newMap[j][i] = '.';
      }
    }
  }
  return newMap;
};

const getLeavesArray = () => {
  // TODO: Split in a random position (not always in the middle)
  // See: http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation
  let leaves: Area[] = [fullMap];
  const leavesArray: Area[][] = [];
  let toggle = Math.random() > 0.5 ? true : false;

  for (let i = 0; i <= NUMBER_0F_SPLITS; i++) {
    const split = toggle ? horizontalSplitArea : verticalSplitArea;
    toggle = !toggle;
    leaves = [...leaves.map((leaf) => split(leaf))].flat();
    leavesArray[i] = leaves;
  }

  return leavesArray;
};

const connectLeaves = (leafA: Area, leafB: Area, map: CellTile[][]) => {
  const newMap = map;

  // Find one empty cell in boths areas
  const candidatesA = findCellsInArea({ area: leafA, map, cellTile: '.' });
  const pointA = candidatesA[Math.floor(Math.random() * candidatesA.length)];

  const candidatesB = findCellsInArea({ area: leafB, map, cellTile: '.' });
  const pointB = candidatesB[Math.floor(Math.random() * candidatesB.length)];

  // Get walking path between the two cells
  const points = walkGrid({ x: pointA[0], y: pointA[1] }, { x: pointB[0], y: pointB[1] });

  // Dig tunnel between the two points
  points.forEach((point) => (newMap[point.y][point.x] = '.'));

  return map;
};

const connectAllLeaves = (leavesArray: Area[][], map: CellTile[][]): CellTile[][] => {
  let newMap = map;
  for (let i = 0; i <= NUMBER_0F_SPLITS; i++) {
    for (let j = 1; j <= 2 ** (NUMBER_0F_SPLITS - i); j++) {
      newMap = connectLeaves(
        leavesArray[NUMBER_0F_SPLITS - i][leavesArray[NUMBER_0F_SPLITS - i].length - (j * 2 - 1)],
        leavesArray[NUMBER_0F_SPLITS - i][leavesArray[NUMBER_0F_SPLITS - i].length - j * 2],
        newMap
      );
      // TODO: Refactor this and add more random connections like these
      if (i === NUMBER_0F_SPLITS) {
        newMap = connectLeaves(
          leavesArray[NUMBER_0F_SPLITS - i][leavesArray[NUMBER_0F_SPLITS - i].length - (j * 2 - 1)],
          leavesArray[NUMBER_0F_SPLITS - i][leavesArray[NUMBER_0F_SPLITS - i].length - j * 2],
          newMap
        );
      }
    }
  }
  return newMap;
};

const generateMap = (): CellTile[][] => {
  // TODO: Use seed as param
  // const rng = seedrandom(String(seed));

  // Get an empty map
  const emptyMap = createEmptyMap(GRID_WIDTH, GRID_HEIGHT);

  // Cut empty map into leaves using Binary Space Partitioning (BSP) Trees
  const leavesArray = getLeavesArray();

  // Get random rooms from each leaf
  const rooms = leavesArray[NUMBER_0F_SPLITS].map((leaf) => getRandomAreaWithinArea(leaf));

  // Place rooms on the map
  let resultMap = emptyMap;
  rooms.forEach((room) => {
    resultMap = placeRectangleOnMap(resultMap, room);
  });

  // Connect rooms
  resultMap = connectAllLeaves(leavesArray, resultMap);

  return resultMap;
};

export const generateLevel = (): Level => {
  const map = generateMap();

  // Find playerSpawn
  const candidatesSpawn = findCellsInArea({ area: fullMap, map, cellTile: '.' });
  const spawn = candidatesSpawn[Math.floor(Math.random() * candidatesSpawn.length)];

  // Place playerSpawn on map
  map[spawn[1]][spawn[0]] = '@';

  return { map, playerSpawn: [spawn[0], spawn[1]] };
};
