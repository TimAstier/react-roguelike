// import seedrandom from 'seedrandom';

import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { Area } from '../typings/area';
import { CellTile } from '../typings/cell';
import { getRandomAreaWithinArea } from './getRandomAreaWithinArea';
import { horizontalSplitArea } from './horizontalSplitArea';
import { verticalSplitArea } from './verticalSplitArea';

const fullMap: Area = {
  origin: { x: 0, y: 0 },
  end: { x: GRID_WIDTH, y: GRID_HEIGHT },
};

const createEmptyMap = (width: number, height: number): CellTile[][] => {
  const map: CellTile[][] = [];
  for (let j = 0; j < height; j++) {
    map[j] = [];
    for (let i = 0; i < width; i++) {
      map[j][i] = ' ';
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

// Inspired by https://www.youtube.com/watch?v=TlLIOgWYVpI
const getLeaves = () => {
  // TODO: Split in a random position (not always in the middle)
  // See: http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation

  const NUMBER_0F_SPLITS = 3;
  let leaves: Area[] = [fullMap];
  let toggle = Math.random() > 0.5 ? true : false;

  for (let i = 0; i <= NUMBER_0F_SPLITS; i++) {
    const split = toggle ? horizontalSplitArea : verticalSplitArea;
    toggle = !toggle;
    leaves = [...leaves.map((leaf) => split(leaf))].flat();
  }

  return leaves;
};

export const generateMap = (): CellTile[][] => {
  // TODO: use seed as param
  // const rng = seedrandom(String(seed));

  // Get an empty map
  const emptyMap = createEmptyMap(GRID_WIDTH, GRID_HEIGHT);

  // Cut empty map into leaves using Binary Space Partitioning (BSP) Trees
  const leaves = getLeaves();

  // Get random rooms from each leaf
  const rooms = leaves.map((leaf) => getRandomAreaWithinArea(leaf));

  // Place rooms on the map
  let resultMap = emptyMap;
  rooms.forEach((room) => {
    resultMap = placeRectangleOnMap(resultMap, room);
  });

  // TODO: Connect rooms

  // TODO: Return a spawn point

  return resultMap;
};
