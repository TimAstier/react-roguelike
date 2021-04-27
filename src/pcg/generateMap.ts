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
// Based on Binary Space Partitioning (BSP) Trees

// TODO: Randomize the vertical vs. horizontal split

// TODO: Split in a random position (not always in the middle)
// See: http://www.roguebasin.com/index.php?title=Basic_BSP_Dungeon_generation

export const generateMap = (): CellTile[][] => {
  // TODO: use seed as param
  // const rng = seedrandom(String(seed));
  // Get an empty map
  const emptyMap = createEmptyMap(GRID_WIDTH, GRID_HEIGHT);

  // TODO: Refactor this

  const leafsA = verticalSplitArea(fullMap);
  const leafsB = [...horizontalSplitArea(leafsA[0]), ...horizontalSplitArea(leafsA[1])];
  const leafsC = [
    ...verticalSplitArea(leafsB[0]),
    ...verticalSplitArea(leafsB[1]),
    ...verticalSplitArea(leafsB[2]),
    ...verticalSplitArea(leafsB[3]),
  ];

  // Add rectangles randomly
  const rooms = leafsC.map((leaf) => getRandomAreaWithinArea(leaf));

  // Place rectangles on the map
  let resultMap = emptyMap;
  rooms.forEach((room) => {
    resultMap = placeRectangleOnMap(resultMap, room);
  });

  return resultMap;
};
