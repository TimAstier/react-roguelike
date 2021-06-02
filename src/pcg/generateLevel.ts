// Inspired by https://www.youtube.com/watch?v=TlLIOgWYVpI

import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { TileType } from '../constants/tiles';
import { Area } from '../typings/area';
import { CellData } from '../typings/cell';
import { Level } from '../typings/level';
import { Position } from '../typings/position';
import { findCellsInArea } from '../utils/findCellsInArea';
import { getRandomIntInclusive } from '../utils/getRandomIntInclusive';
import { walkGrid } from '../utils/walkGrid';
import { getRandomAreaWithinArea } from './getRandomAreaWithinArea';
import { horizontalSplitArea } from './horizontalSplitArea';
import { verticalSplitArea } from './verticalSplitArea';

const NUMBER_0F_SPLITS = 3;

const fullMap: Area = {
  origin: { x: 0, y: 0 },
  end: { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 },
};

const createEmptyMap = (width: number, height: number): TileType[][] => {
  const map: TileType[][] = [];
  for (let j = 0; j < height; j++) {
    map[j] = [];
    for (let i = 0; i < width; i++) {
      map[j][i] = '#';
    }
  }
  return map;
};

const placeRectangleOnMap = (map: TileType[][], area: Area): TileType[][] => {
  const newMap = map;
  for (let i = area.origin.x; i <= area.end.x; i++) {
    for (let j = area.origin.y; j <= area.end.y; j++) {
      if (i === area.origin.x || i === area.end.x || j === area.origin.y || j === area.end.y) {
        newMap[j][i] = '#';
      } else {
        newMap[j][i] = '.';
      }
    }
  }
  return newMap;
};

const getLeavesArray = (rng: () => number) => {
  // TODO: Split in a random position (not always in the middle)
  // See: http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation
  let leaves: Area[] = [fullMap];
  const leavesArray: Area[][] = [];
  let toggle = rng() > 0.5 ? true : false;

  for (let i = 0; i <= NUMBER_0F_SPLITS; i++) {
    const split = toggle ? horizontalSplitArea : verticalSplitArea;
    toggle = !toggle;
    leaves = [...leaves.map((leaf) => split(leaf))].flat();
    leavesArray[i] = leaves;
  }

  return leavesArray;
};

const connectLeaves = (leafA: Area, leafB: Area, map: TileType[][], rng: () => number) => {
  const newMap = map;

  // Find one empty cell in boths areas
  const candidatesA = findCellsInArea({ area: leafA, map, cellTile: '.' });
  const positionA = candidatesA[Math.floor(rng() * candidatesA.length)];

  const candidatesB = findCellsInArea({ area: leafB, map, cellTile: '.' });
  const positionB = candidatesB[Math.floor(rng() * candidatesB.length)];

  // Get walking path between the two positions
  const positions = walkGrid(positionA, positionB);

  // Dig tunnel between the two positions
  positions.forEach((position) => (newMap[position[1]][position[0]] = '.'));
  return newMap;
};

interface ConnectAdjacentLeavesOptions {
  leavesArray: Area[][];
  map: TileType[][];
  index: number;
  leavesDepth: number;
  rng: () => number;
}

const connectAdjacentLeaves = ({
  leavesArray,
  map,
  index,
  leavesDepth,
  rng,
}: ConnectAdjacentLeavesOptions) => {
  return connectLeaves(
    leavesArray[leavesDepth][leavesArray[leavesDepth].length - (index - 1)],
    leavesArray[leavesDepth][leavesArray[leavesDepth].length - index],
    map,
    rng
  );
};

const connectAllLeaves = (
  leavesArray: Area[][],
  map: TileType[][],
  rng: () => number
): TileType[][] => {
  let newMap = map;
  for (let i = 0; i <= NUMBER_0F_SPLITS; i++) {
    for (let j = 1; j <= 2 ** (NUMBER_0F_SPLITS - i); j++) {
      const options = {
        leavesArray,
        map: newMap,
        index: j * 2,
        leavesDepth: NUMBER_0F_SPLITS - i,
        rng,
      };
      newMap = connectAdjacentLeaves(options);
      if (i === NUMBER_0F_SPLITS) {
        // TODO: Add more random connections like these
        newMap = connectAdjacentLeaves(options);
        newMap = connectAdjacentLeaves(options);
        newMap = connectAdjacentLeaves(options);
      }
    }
  }
  return newMap;
};

const placeDownwardStaircase = (map: TileType[][], rng: () => number) => {
  const newMap = map;

  const candidatePositions = newMap
    .map((row, j) => row.map((tile, i) => (tile === '.' ? ([i, j] as Position) : null)))
    .flat()
    .filter((p) => p !== null);

  const positionIndex = getRandomIntInclusive(0, candidatePositions.length - 1, rng);

  const position = candidatePositions[positionIndex] as Position;

  newMap[position[1]][position[0]] = '>';

  return newMap;
};

const generateMap = (rng: () => number): TileType[][] => {
  // Get an empty map
  const emptyMap = createEmptyMap(GRID_WIDTH, GRID_HEIGHT);

  // Cut empty map into leaves using Binary Space Partitioning (BSP) Trees
  const leavesArray = getLeavesArray(rng);

  // Get random rooms from each leaf
  const rooms = leavesArray[NUMBER_0F_SPLITS].map((leaf) => getRandomAreaWithinArea(leaf, rng));

  // Place rooms on the map
  let resultMap = emptyMap;
  rooms.forEach((room) => {
    resultMap = placeRectangleOnMap(resultMap, room);
  });

  // Connect rooms
  resultMap = connectAllLeaves(leavesArray, resultMap, rng);

  // Place downards staircase
  resultMap = placeDownwardStaircase(resultMap, rng);

  return resultMap;
};

export const createGameMap = (
  map: TileType[][],
  spawn: Position,
  width: number,
  height: number
): CellData[][] => {
  const gameMap: CellData[][] = [];
  for (let j = 0; j < height; j += 1) {
    gameMap[j] = [];
    for (let i = 0; i < width; i += 1) {
      gameMap[j][i] = {
        content: 0,
        tile: map[j][i],
        revealed: false,
        visibility: 'clear',
        burningRounds: 0,
      };
      if (i === spawn[0] && j === spawn[1]) {
        gameMap[j][i].content = 'Player';
      }
    }
  }
  return gameMap;
};

export const generateLevel = (rng: () => number): Level => {
  const map = generateMap(rng);

  // Find playerSpawn
  const candidatesSpawn = findCellsInArea({ area: fullMap, map, cellTile: '.' });
  const spawn = candidatesSpawn[Math.floor(rng() * candidatesSpawn.length)];

  // Place playerSpawn on map
  map[spawn[1]][spawn[0]] = '@';

  // Create gameMap
  const gameMap = createGameMap(map, spawn, GRID_WIDTH, GRID_HEIGHT);

  return { gameMap, playerSpawn: spawn };
};
