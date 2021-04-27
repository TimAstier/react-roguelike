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

export const generateMap = (): CellTile[][] => {
  // TODO: use seed as param
  // const rng = seedrandom(String(seed));
  // Get an empty map
  const emptyMap = createEmptyMap(GRID_WIDTH, GRID_HEIGHT);

  // TODO: Refactor this

  const rectanglesA = verticalSplitArea(fullMap);
  const rectanglesB = [
    ...horizontalSplitArea(rectanglesA[0]),
    ...horizontalSplitArea(rectanglesA[1]),
  ];
  const rectanglesC = [
    ...verticalSplitArea(rectanglesB[0]),
    ...verticalSplitArea(rectanglesB[1]),
    ...verticalSplitArea(rectanglesB[2]),
    ...verticalSplitArea(rectanglesB[3]),
  ];

  // Add rectangles "randomly"
  const areas = rectanglesC.map((rectangle) => getRandomAreaWithinArea(rectangle));

  // Place rectangles on the map
  let resultMap = emptyMap;
  areas.forEach((area) => {
    resultMap = placeRectangleOnMap(resultMap, area);
  });

  return resultMap;
};
