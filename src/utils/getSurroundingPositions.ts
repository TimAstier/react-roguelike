// Based on https://www.redblobgames.com/grids/circle-drawing/

import { GRID_HEIGHT, GRID_WIDTH } from '../constants/config';
import { Position } from '../typings/position';
import { isInsideCircle } from '../utils/isInsideCircle';

export const getSurroundingPositions = (position: Position, radius: number): Position[] => {
  const positions: Position[] = [];

  const top = Math.floor(position[1] - radius);
  const bottom = Math.ceil(position[1] + radius);
  const left = Math.floor(position[0] - radius);
  const right = Math.ceil(position[0] + radius);

  // Can be optimized further? See article.
  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (isInsideCircle({ center: position, position: [x, y], radius })) {
        if (x >= 0 && y >= 0 && x < GRID_WIDTH && y < GRID_HEIGHT) {
          positions.push([x, y]);
        }
      }
    }
  }

  return positions;
};
